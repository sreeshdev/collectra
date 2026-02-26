import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/crypto";
import { authMiddleware } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";
import { withDbRetry, isDbConnectionError, DB_UNAVAILABLE_MESSAGE } from "../utils/db-retry";

const loginSchema = z.object({
  mobile: z.string().min(10).max(10),
  password: z.string().min(6),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const auth = new Hono();

// Login
auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { mobile, password } = loginSchema.parse(body);

    const prisma = getPrisma(c);
    const user = await withDbRetry(() =>
      prisma.user.findUnique({ where: { mobile } }),
    );

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const token = await sign(
      {
        id: user.id,
        role: user.role,
        mobile: user.mobile,
      },
      c.env.JWT_SECRET,
      "HS256"
    );

    return c.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        address: user.address,
        displayPictureUrl: user.displayPictureUrl,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    const message = isDbConnectionError(error)
      ? DB_UNAVAILABLE_MESSAGE
      : error.message || "Login failed";
    return c.json({ error: message }, 500);
  }
});

// Get current user
auth.get("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c);

    const userData = await withDbRetry(() =>
      prisma.user.findUnique({
        where: { id: user.id },
        select: {
        id: true,
        role: true,
        name: true,
        mobile: true,
        email: true,
        address: true,
        displayPictureUrl: true,
        createdAt: true,
      },
      }),
    );

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ user: userData });
  } catch (error: any) {
    const message = isDbConnectionError(error)
      ? DB_UNAVAILABLE_MESSAGE
      : error.message || "Failed to fetch user";
    return c.json({ error: message }, 500);
  }
});

// Change password
auth.post("/change-password", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { currentPassword, newPassword } = changePasswordSchema.parse(body);

    const prisma = getPrisma(c);
    const userData = await withDbRetry(() =>
      prisma.user.findUnique({ where: { id: user.id } }),
    );

    if (!userData) {
      return c.json({ error: "User not found" }, 404);
    }

    const isValid = await verifyPassword(
      currentPassword,
      userData.passwordHash
    );
    if (!isValid) {
      return c.json({ error: "Current password is incorrect" }, 400);
    }

    const newHash = await hashPassword(newPassword);
    await withDbRetry(() =>
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: newHash },
      }),
    );

    return c.json({ message: "Password changed successfully" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    const message = isDbConnectionError(error)
      ? DB_UNAVAILABLE_MESSAGE
      : error.message || "Failed to change password";
    return c.json({ error: message }, 500);
  }
});

export default auth;
