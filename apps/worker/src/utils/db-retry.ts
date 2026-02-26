/**
 * DB retry utility for Neon (and other DBs) that scale to zero.
 * When the DB is suspended, the first connection attempt can timeout or hang.
 * This wrapper retries on connection-related errors and returns a clear error message.
 */

const DB_CONNECTION_ERROR_PATTERNS = [
  /timeout exceeded when trying to connect/i,
  /connection timeout/i,
  /ETIMEDOUT/i,
  /ECONNREFUSED/i,
  /ECONNRESET/i,
  /Connection terminated unexpectedly/i,
  /the database is starting up/i,
  /server closed the connection unexpectedly/i,
  /terminating connection due to administrator command/i,
];

export function isDbConnectionError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return DB_CONNECTION_ERROR_PATTERNS.some((p) => p.test(msg));
}

export const DB_UNAVAILABLE_MESSAGE =
  "Database is temporarily unavailable (waking from sleep). Please try again in a few seconds.";

export interface DbRetryOptions {
  /** Max retry attempts (default: 3). Total attempts = maxRetries + 1 */
  maxRetries?: number;
  /** Delay in ms between retries (default: 1500). Neon cold start is ~1-5s */
  retryDelayMs?: number;
}

const DEFAULT_OPTIONS: Required<DbRetryOptions> = {
  maxRetries: 2, // 3 total attempts
  retryDelayMs: 1500,
};

/**
 * Wraps an async DB operation with retry logic. Retries only on connection errors.
 * Use for operations that fail when Neon (or similar) is suspended.
 */
export async function withDbRetry<T>(
  fn: () => Promise<T>,
  options: DbRetryOptions = {},
): Promise<T> {
  const { maxRetries, retryDelayMs } = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isDbConnectionError(err) || attempt === maxRetries) {
        throw err;
      }
      await sleep(retryDelayMs);
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
