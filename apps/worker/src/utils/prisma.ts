import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export interface Env {
  /** Hyperdrive binding (recommended for Workers - prevents connection hangs) */
  HYPERDRIVE?: { connectionString: string };
  /** Direct DB URL (used when HYPERDRIVE is not configured, e.g. local dev) */
  DATABASE_URL?: string;
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
  // Prefer Hyperdrive (prevents Neon WebSocket hangs in Workers)
  const connectionString =
    env.HYPERDRIVE?.connectionString ?? env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Database not configured: set HYPERDRIVE binding or DATABASE_URL secret"
    );
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}
