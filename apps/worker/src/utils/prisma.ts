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

// Reuse Pool + Prisma across requests in the same Worker isolate.
// Creating a new Pool per request exhausts DB connections → 500/503 errors.
let cached:
  | { connectionString: string; prisma: PrismaClient }
  | null = null;

export function getPrisma(env: Env) {
  const connectionString =
    env.HYPERDRIVE?.connectionString ?? env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Database not configured: set HYPERDRIVE binding or DATABASE_URL secret"
    );
  }

  if (cached?.connectionString === connectionString) {
    return cached.prisma;
  }

  const pool = new Pool({
    connectionString,
    max: 2,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  cached = { connectionString, prisma };
  return prisma;
}
