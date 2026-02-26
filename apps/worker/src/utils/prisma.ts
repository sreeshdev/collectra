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

declare module "hono" {
  interface ContextVariableMap {
    prisma: PrismaClient;
  }
}

/** Create a fresh Prisma client. Caller must $disconnect() when done (e.g. for cron). */
export function createPrisma(env: Env): PrismaClient {
  const connectionString =
    env.HYPERDRIVE?.connectionString ?? env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Database not configured: set HYPERDRIVE binding or DATABASE_URL secret"
    );
  }

  const pool = new Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 5_000,
    // Shorter timeout so we fail fast and can retry (Neon cold start ~1-5s)
    connectionTimeoutMillis: 10_000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

/**
 * Get Prisma for a request. Creates per request, schedules $disconnect via waitUntil.
 * Must be used with context that has __executionCtx in env (injected by Worker fetch handler).
 */
export function getPrisma(
  c: { env: Env & { __executionCtx?: ExecutionContext }; get: (k: "prisma") => PrismaClient | undefined; set: (k: "prisma", v: PrismaClient) => void }
): PrismaClient {
  const existing = c.get("prisma");
  if (existing) return existing;

  const prisma = createPrisma(c.env);
  c.set("prisma", prisma);

  const execCtx = c.env.__executionCtx;
  if (execCtx) {
    execCtx.waitUntil(prisma.$disconnect());
  }

  return prisma;
}
