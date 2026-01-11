import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  RAZORPAY_WEBHOOK_SECRET: string;
  WHATSAPP_TOKEN: string;
  WHATSAPP_PHONE_NUMBER_ID: string;
  WHATSAPP_TEMPLATE_NAME: string;
  APP_BASE_URL: string;
}

export function getPrisma(env: Env) {
  try {
    // Create Pool with connection string as an object
    // The Pool constructor expects { connectionString: string }
    const pool = new Pool({ connectionString: env.DATABASE_URL });

    // Create the Neon adapter with the pool
    const adapter = new PrismaNeon(pool);

    // Create and return Prisma Client with the adapter
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Error creating Prisma client:", error);
    throw error;
  }
}
