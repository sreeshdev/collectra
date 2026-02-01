import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { getPrisma, type Env } from "./utils/prisma";

// Import routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import packageRoutes from "./routes/packages";
import customerRoutes from "./routes/customers";
import transactionRoutes from "./routes/transactions";
import paymentRoutes from "./routes/payments";
import webhookRoutes from "./routes/webhooks";
import messagingRoutes from "./routes/messaging";
import dashboardRoutes from "./routes/dashboard";
import boxNumberRequestRoutes from "./routes/boxNumberRequests";
import { authMiddleware } from "./middleware/auth";

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", async (c, next) => {
  const origin = c.req.header("Origin") || "";
  const allowedOrigins = [
    c.env.APP_BASE_URL || "http://localhost:5173",
    "http://localhost:5173",
    "http://localhost:3000",
  ];
  const allowedOrigin = allowedOrigins.includes(origin)
    ? origin
    : allowedOrigins[0];

  c.header("Access-Control-Allow-Origin", allowedOrigin);
  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  c.header(
    "Access-Control-Expose-Headers",
    "Content-Disposition, Content-Type",
  );

  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  await next();
});

// Health check
app.get("/", (c) => {
  return c.json({ message: "Dish Hobby Cable Vision API", status: "ok" });
});

// Public routes
app.route("/auth", authRoutes);

// Protected routes
app.use("/api/*", authMiddleware);
app.route("/api", userRoutes);
app.route("/api", packageRoutes);
app.route("/api", customerRoutes);
app.route("/api", transactionRoutes);
app.route("/api", paymentRoutes);
app.route("/api", messagingRoutes);
app.route("/api", dashboardRoutes);
app.route("/api", boxNumberRequestRoutes);

// Webhook (no auth)
app.route("/webhooks", webhookRoutes);

// Cron handler
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    return app.fetch(request, env, ctx);
  },
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(handleCron(env));
  },
};

async function handleCron(env: Env) {
  try {
    console.log("Cron triggered: Processing monthly payment reminders");

    const prisma = getPrisma(env);

    const today = new Date();
    const currentDay = today.getDate();

    // Only process on the 5th
    if (currentDay !== 2) {
      console.log("Not the 5th, skipping cron");
      return;
    }

    // Get all customers
    const customers = await prisma.customer.findMany({
      include: { package: true },
    });

    for (const customer of customers) {
      try {
        // Check if customer is due for billing
        const isDue = checkIfDue(customer, today);

        if (isDue) {
          // Generate payment link
          // const paymentLink = await createRazorpayPaymentLink(customer, env);

          // Create transaction
          // await prisma.transaction.create({
          //   data: {
          //     customerId: customer.id,
          //     transactionId: paymentLink.id,
          //     transactionType: "payment_link",
          //     transactionBy: "system", // System user
          //     amount: customer.package.price,
          //     status: "pending",
          //   },
          // });

          // Send WhatsApp reminder
          // await sendWhatsAppMessage(
          //   customer,
          //   paymentLink.short_url || paymentLink.id,
          //   customer.package.price.toString(),
          //   env
          // );

          await prisma.customer.update({
            where: { id: customer.id },
            data: {
              pendingBalance: {
                increment: customer.package.price,
              },
            },
          });

          console.log(`Processed customer ${customer.id}`);
        }
      } catch (error) {
        console.error(`Error processing customer ${customer.id}:`, error);
        // Continue with next customer
      }
    }

    console.log("Cron completed");
  } catch (error) {
    console.error("Cron error:", error);
  }
}

function checkIfDue(customer: any, today: Date): boolean {
  if (!customer.lastBillingDate) return true;

  const lastBilling = new Date(customer.lastBillingDate);
  const monthsDiff =
    (today.getFullYear() - lastBilling.getFullYear()) * 12 +
    (today.getMonth() - lastBilling.getMonth());

  if (customer.package.recurringType === "MONTHLY") {
    return monthsDiff >= 1;
  } else if (customer.package.recurringType === "BIMONTHLY") {
    return monthsDiff >= 2;
  }

  return false;
}

async function createRazorpayPaymentLink(customer: any, env: Env) {
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
      description: `Payment for ${customer.package.name} - ${customer.name}`,
      customer: {
        name: customer.name,
        contact: customer.mobile,
        email: customer.email || undefined,
      },
      notify: {
        sms: true,
        email: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Razorpay API error: ${response.statusText}`);
  }

  return await response.json();
}

async function sendWhatsAppMessage(
  customer: any,
  link: string,
  amount: string,
  env: Env,
) {
  const templateParams = {
    name: customer.name,
    amount: amount,
    link: link,
    month: new Date().toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    }),
  };

  // Format message with template
  const message = `Hello ${templateParams.name},\n\nYour payment of ₹${templateParams.amount} for ${templateParams.month} is due.\n\nPlease pay using this link: ${templateParams.link}\n\nThank you!`;

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
    throw new Error(`WhatsApp API error: ${response.statusText}`);
  }

  return await response.json();
}
