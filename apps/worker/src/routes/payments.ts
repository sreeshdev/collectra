import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const initiateBulkSchema = z.object({
  customerIds: z.array(z.string().uuid()).min(1),
  sendRazorpayLink: z.boolean().optional().default(true),
});

const resendSchema = z.object({
  transactionIds: z.array(z.string().min(1)).min(1).max(50), // Razorpay plink IDs (plink_xxx)
});

const payments = new Hono().basePath("/payments");

const RESEND_BATCH_SIZE = 20;

async function createRazorpayPaymentLink(
  customer: any,
  env: any,
  sendLink: boolean = true,
) {
  const amount = Number(customer.package.price) * 100; // Convert to paise

  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(
        `${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`,
      )}`,
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      description: `Payment for ${customer.boxNumber} - ${customer.package.name} - ${customer.name}`,
      customer: {
        name: customer.name,
        contact: customer.mobile,
        email: customer.email || undefined,
      },
      upi_link: true,
      notify: {
        sms: sendLink,
        email: sendLink,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Razorpay API error: ${error}`);
  }

  return await response.json();
}

async function sendWhatsAppMessage(
  customer: any,
  link: string,
  amount: string,
  env: any,
) {
  const month = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const message = `Hello ${customer.name},\n\nYour payment of ₹${amount} for ${month} is due.\n\nPlease pay using this link: ${link}\n\nThank you!`;

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: customer.whatsappMobile,
        type: "text",
        text: {
          body: message,
        },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`WhatsApp API error: ${error}`);
  }

  return await response.json();
}

// Max customers per request to avoid Worker timeout/503 (Cloudflare CPU and request limits).
const BULK_MAX_CUSTOMERS_PER_REQUEST = 15;
const BULK_TX_TIMEOUT_MS = 60_000; // 1 min per request

// Initiate bulk payment (Admin only). Uses a single transaction per request: all customers
// in this request updated or none (rollback on first error). Call with ≤50 IDs per request.
payments.post("/initiate-bulk", authMiddleware, adminOnly, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { customerIds, sendRazorpayLink } = initiateBulkSchema.parse(body);

    if (customerIds.length > BULK_MAX_CUSTOMERS_PER_REQUEST) {
      return c.json(
        {
          error: `Maximum ${BULK_MAX_CUSTOMERS_PER_REQUEST} customers per request. Send fewer IDs or use the app (it will batch automatically).`,
        },
        400,
      );
    }

    const prisma = getPrisma(c);

    // Single batch for this request (we already cap at BULK_MAX_CUSTOMERS_PER_REQUEST)
    const batches: string[][] = [customerIds];

    const result = await prisma.$transaction(
      async (tx) => {
        const updatedIds: string[] = [];

        for (let b = 0; b < batches.length; b++) {
          const batchIds = batches[b];

          const customers = await tx.customer.findMany({
            where: {
              id: { in: batchIds },
              pendingBalance: { equals: 0 },
              status: "ACTIVE",
            },
            include: { package: true },
          });

          const foundIds = new Set(customers.map((c) => c.id));
          const missingIds = batchIds.filter((id) => !foundIds.has(id));
          if (missingIds.length > 0) {
            continue;
            // throw new Error(
            //   `Customer(s) not found (batch ${b + 1}/${batches.length}): ${missingIds.slice(0, 5).join(", ")}${missingIds.length > 5 ? ` and ${missingIds.length - 5} more` : ""}`,
            // );
          }

          for (const customer of customers) {
            const price = Number(customer.package.price);
            if (sendRazorpayLink) {
              const paymentLink = await createRazorpayPaymentLink(
                customer,
                c.env,
              );
              await tx.transaction.create({
                data: {
                  customerId: customer.id,
                  transactionId: paymentLink?.id || "",
                  transactionType: "payment_link",
                  transactionBy: user.id, // Admin who initiated bulk payment
                  amount: customer.package.price,
                  status: "pending",
                },
              });
            }
            await tx.customer.update({
              where: { id: customer.id },
              data: {
                pendingBalance: { increment: price },
              },
            });
            updatedIds.push(customer.id);
          }
        }

        return { updatedIds, total: customerIds.length };
      },
      { timeout: BULK_TX_TIMEOUT_MS },
    );

    return c.json({
      success: true,
      updated: result.updatedIds.length,
      total: result.total,
      message: `Successfully updated pending balance for ${result.updatedIds.length} customer(s).`,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    // Transaction rolled back; return the error that caused the rollback
    const message =
      error?.message ||
      "Bulk update failed. No customers were updated (rollback).";
    return c.json({ error: message }, 500);
  }
});

// Resend payment link notifications. Accepts Razorpay plink IDs directly, hits Razorpay API.
payments.post("/resend", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { transactionIds } = resendSchema.parse(body);

    const auth = btoa(
      `${c.env.RAZORPAY_KEY_ID}:${c.env.RAZORPAY_KEY_SECRET}`,
    );
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < transactionIds.length; i += RESEND_BATCH_SIZE) {
      const batch = transactionIds.slice(i, i + RESEND_BATCH_SIZE);
      for (const plinkId of batch) {
        try {
          const res = await fetch(
            `https://api.razorpay.com/v1/payment_links/${plinkId}/notify_by/sms`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${auth}`,
              },
            },
          );
          if (res.ok) sent++;
          else failed++;
        } catch {
          failed++;
        }
      }
    }

    return c.json({ sent, failed, total: transactionIds.length });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json(
      { error: error?.message || "Resend failed" },
      500,
    );
  }
});

export default payments;
