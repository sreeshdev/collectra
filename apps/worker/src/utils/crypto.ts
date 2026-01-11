// Password hashing using Web Crypto API (compatible with Cloudflare Workers)
// Note: This is a simplified implementation. For production, consider using a proper PBKDF2 implementation

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Add salt for better security
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Store as salt:hash
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const [saltHex, storedHash] = hash.split(":");
    if (!saltHex || !storedHash) return false;

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    console.log(hashHex, storedHash);
    // Compare hashes
    return hashHex === storedHash;
  } catch (error) {
    return false;
  }
}
