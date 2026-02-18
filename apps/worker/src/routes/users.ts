import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { hashPassword } from "../utils/crypto";
import { getPrisma } from "../utils/prisma";

const userSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().length(10),
  email: z.string().email(),
  address: z.string().nullable().optional(),
  displayPictureUrl: z.string().url().optional(),
  password: z.string().min(6).optional(),
});

const updateUserSchema = userSchema.partial();

const users = new Hono().basePath("/users");

// Get all users (Admin only)
users.get("/", authMiddleware, adminOnly, async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const users = await prisma.user.findMany({
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
      orderBy: { createdAt: "desc" },
    });

    return c.json({ users });
  } catch (error: any) {
    return c.json({ error: error.message || "Failed to fetch users" }, 500);
  }
});

// Create user (Admin only)
users.post("/", authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = userSchema.parse(body);

    const prisma = getPrisma(c.env);

    // Check if mobile already exists
    const existing = await prisma.user.findUnique({
      where: { mobile: data.mobile },
    });

    if (existing) {
      return c.json({ error: "Mobile number already exists" }, 400);
    }

    const passwordHash = data.password
      ? await hashPassword(data.password)
      : await hashPassword("Default@123");

    const user = await prisma.user.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        displayPictureUrl: data.displayPictureUrl,
        passwordHash,
        role: "EMPLOYEE",
      },
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
    });

    return c.json({ user }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create user" }, 500);
  }
});

// Update user (Admin only)
users.put("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const data = updateUserSchema.parse(body);

    const prisma = getPrisma(c.env);

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
      delete updateData.password;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
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
    });

    return c.json({ user });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update user" }, 500);
  }
});

// Update current user profile
users.put("/me", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const data = updateUserSchema.parse(body);

    const prisma = getPrisma(c.env);

    const updateData: any = { ...data };
    delete updateData.password; // Don't allow password change here

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
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
    });

    return c.json({ user: updatedUser });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update profile" }, 500);
  }
});

// Get customers assigned to an employee (Admin only)
users.get("/:id/customers", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, name: true },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    if (user.role !== "EMPLOYEE") {
      return c.json({ error: "User is not an employee" }, 400);
    }

    const customers = await prisma.customer.findMany({
      where: { assignedEmployeeId: id },
      include: {
        package: { select: { id: true, name: true } },
      },
      orderBy: { name: "asc" },
    });

    return c.json({ customers });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch employee customers" },
      500,
    );
  }
});

// Get employee collection stats (Admin only)
users.get("/:id/employee-stats", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
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
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Only allow viewing stats for employees
    if (user.role !== "EMPLOYEE") {
      return c.json({ error: "User is not an employee" }, 400);
    }

    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );

    // Current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    // Today's collections by this employee
    const todayCollections = await prisma.transaction.findMany({
      where: {
        transactionBy: id,
        status: "paid",
        transactionDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const todayCollectionCount = todayCollections.length;
    const todayCollectionAmount = todayCollections.reduce(
      (sum, t) => sum + Number(t.amount),
      0,
    );

    // Monthly collections by this employee
    const monthlyCollections = await prisma.transaction.findMany({
      where: {
        transactionBy: id,
        status: "paid",
        transactionDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const monthlyCollectionCount = monthlyCollections.length;
    const monthlyCollectionAmount = monthlyCollections.reduce(
      (sum, t) => sum + Number(t.amount),
      0,
    );

    // Monthly data for last 12 months for bar chart
    const monthlyData = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      const monthCollections = await prisma.transaction.findMany({
        where: {
          transactionBy: id,
          status: "paid",
          transactionDate: {
            gte: monthStart,
            lt: monthEnd,
          },
        },
      });

      monthlyData.push({
        month: monthStart.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        count: monthCollections.length,
        amount: monthCollections.reduce((sum, t) => sum + Number(t.amount), 0),
      });
    }

    return c.json({
      employee: user,
      collectionStats: {
        todayCollectionCount,
        todayCollectionAmount,
        monthlyCollectionCount,
        monthlyCollectionAmount,
      },
      monthlyData,
    });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch employee collection stats" },
      500,
    );
  }
});

// Delete user (Admin only)
users.delete("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Prevent deleting admin users
    if (user.role === "ADMIN") {
      return c.json({ error: "Cannot delete admin user" }, 400);
    }

    // Check if user has assigned customers
    const assignedCustomersCount = await prisma.customer.count({
      where: { assignedEmployeeId: id },
    });

    if (assignedCustomersCount > 0) {
      return c.json(
        {
          error:
            "Cannot delete employee with assigned customers. Please reassign customers first.",
        },
        400,
      );
    }

    // Reassign any box number / status change requests created by this user to the current admin
    const currentUser = c.get("user");
    await prisma.boxNumberRequest.updateMany({
      where: { requestedBy: id },
      data: { requestedBy: currentUser.id },
    });
    await prisma.customerStatusChangeRequest.updateMany({
      where: { requestedBy: id },
      data: { requestedBy: currentUser.id },
    });

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    return c.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return c.json({ error: error.message || "Failed to delete user" }, 500);
  }
});

export default users;
