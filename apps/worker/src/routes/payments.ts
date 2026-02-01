import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const initiateBulkSchema = z.object({
  customerIds: z.array(z.string().uuid()).min(1),
});

const payments = new Hono().basePath("/payments");

async function createRazorpayPaymentLink(customer: any, env: any) {
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
        sms: true,
        email: true,
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

// Initiate bulk payment (Admin only)
payments.post("/initiate-bulk", authMiddleware, adminOnly, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { customerIds } = initiateBulkSchema.parse(body);

    const prisma = getPrisma(c.env);

    const results = [];

    for (const customerId of customerIds) {
      try {
        const customer = await prisma.customer.findUnique({
          where: { id: customerId },
          include: { package: true },
        });

        if (!customer) {
          results.push({
            customerId,
            success: false,
            error: "Customer not found",
          });
          continue;
        }

        // Create payment link
        // commented out for now to avoid Razorpay API calls
        // const paymentLink = await createRazorpayPaymentLink(customer, c.env);

        // Create transaction
        // const transaction = await prisma.transaction.create({
        //   data: {
        //     customerId: customer.id,
        //     transactionId: "",
        //     transactionType: "payment_link",
        //     transactionBy: user.id,
        //     amount: customer.package.price,
        //     status: "pending",
        //   },
        // });

        // Send WhatsApp message
        // await sendWhatsAppMessage(
        //   customer,
        //   paymentLink.short_url || paymentLink.id,
        //   customer.package.price.toString(),
        //   c.env
        // );

        // Update customer pending balance
        await prisma.customer.update({
          where: { id: customerId },
          data: {
            pendingBalance: {
              increment: customer.package.price,
            },
          },
        });

        results.push({
          customerId,
          success: true,
          // transactionId: transaction.id,
          // paymentLink: paymentLink.short_url || paymentLink.id,
        });
      } catch (error: any) {
        results.push({
          customerId,
          success: false,
          error: error.message,
        });
      }
    }

    return c.json({ results });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json(
      { error: error.message || "Failed to initiate payments" },
      500,
    );
  }
});

export default payments;
