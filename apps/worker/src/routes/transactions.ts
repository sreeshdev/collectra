import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";
import { csvField } from "../utils";

const manualTransactionSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.number().positive(),
  remarks: z.string().optional(),
});

const transactions = new Hono().basePath("/transactions");

// Get all transactions with filters
transactions.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const fromDate = c.req.query("fromDate");
    const toDate = c.req.query("toDate");
    const month = c.req.query("month");
    const year = c.req.query("year");
    const search = c.req.query("search")?.trim();
    const filter = c.req.query("filter"); // All | Manual_Paid | Payment_Link_Pending | Payment_Link_Paid

    const prisma = getPrisma(c);

    let startDate: Date;
    let endDate: Date;

    // Support both new from/to date format and legacy month/year format
    if (fromDate && toDate) {
      startDate = new Date(fromDate);
      endDate = new Date(toDate);
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999);
    } else if (month && year) {
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
    } else {
      return c.json(
        {
          error: "Either fromDate/toDate or month/year parameters are required",
        },
        400,
      );
    }

    const where: any = {
      transactionDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    // Filter by customer name or box number (admin and employee)
    if (search) {
      where.customer = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { boxNumber: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    // Filter by type+status
    if (filter && filter !== "All") {
      if (filter === "Manual_Paid") {
        where.transactionType = "manual";
        where.status = "paid";
      } else if (filter === "Payment_Link_Pending") {
        where.transactionType = "payment_link";
        where.status = "pending";
      } else if (filter === "Payment_Link_Paid") {
        // payment_link becomes 'online' when paid via webhook
        where.transactionType = "online";
        where.status = "paid";
      }
    }

    // Employee can only see transactions for assigned customers and their own transactions
    if (user.role === "EMPLOYEE") {
      const assignedCustomers = await prisma.customer.findMany({
        where: { assignedEmployeeId: user.id },
        select: { id: true },
      });

      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { customerId: { in: assignedCustomers.map((c) => c.id) } },
            { transactionBy: user.id },
          ],
        },
      ];
      delete where.OR;
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            mobile: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { transactionDate: "desc" },
    });

    return c.json({ transactions });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch transactions" },
      500,
    );
  }
});

// Export transactions as Excel (Admin only)
transactions.get("/export", authMiddleware, adminOnly, async (c) => {
  try {
    const fromDate = c.req.query("fromDate");
    const toDate = c.req.query("toDate");
    const month = c.req.query("month");
    const year = c.req.query("year");

    const prisma = getPrisma(c);

    let startDate: Date;
    let endDate: Date;
    let filename: string;

    // Support both new from/to date format and legacy month/year format
    if (fromDate && toDate) {
      startDate = new Date(fromDate);
      endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);
      filename = `transactions-${fromDate}-to-${toDate}.csv`;
    } else if (month && year) {
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);
      filename = `transactions-${month}-${year}.csv`;
    } else {
      return c.json(
        {
          error: "Either fromDate/toDate or month/year parameters are required",
        },
        400,
      );
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        transactionDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        customer: {
          select: {
            name: true,
            boxNumber: true,
            mobile: true,
          },
        },
        user: {
          select: {
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { transactionDate: "desc" },
    });

    const headers = [
      "Customer Name",
      "Box Number",
      "Transaction ID",
      "Date",
      "Type",
      "Amount",
      "Status",
      "Collected By",
    ];
    const rows = transactions.map((t) => [
      csvField(t.customer.name),
      csvField(t.customer.boxNumber, true),
      csvField(t.transactionId), // force text so Excel doesn't show scientific notation
      csvField(t.transactionDate.toISOString()),
      csvField(t.transactionType),
      csvField(t.amount),
      csvField(t.status),
      csvField(t.user.name),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    // Set headers for file download with CORS
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header("Content-Disposition", `attachment; filename="${filename}"`);

    return c.text(csv);
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to export transactions" },
      500,
    );
  }
});

// Create manual transaction
transactions.post("/manual", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const { customerId, amount, remarks } = manualTransactionSchema.parse(body);

    const prisma = getPrisma(c);

    // Check customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    // Employee can only collect for assigned customers
    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json(
        { error: "Forbidden - You can only collect for assigned customers" },
        403,
      );
    }

    // Check if amount exceeds pending balance
    const pendingBalance = Number(customer.pendingBalance);
    if (amount > pendingBalance) {
      return c.json({ error: "Amount exceeds pending balance" }, 400);
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        customerId,
        transactionId: `MANUAL-${Date.now()}`,
        transactionType: "manual",
        transactionBy: user.id,
        amount,
        status: "paid",
        remarks,
      },
    });

    // Update customer pending balance
    const newPendingBalance = Math.max(0, pendingBalance - amount);
    await prisma.customer.update({
      where: { id: customerId },
      data: { pendingBalance: newPendingBalance },
    });

    return c.json({ transaction }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json(
      { error: error.message || "Failed to create transaction" },
      500,
    );
  }
});

// Delete transaction (Admin only). Reverses customer pending balance if transaction was paid.
transactions.delete("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c);

    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!transaction) {
      return c.json({ error: "Transaction not found" }, 404);
    }

    const amount = Number(transaction.amount);
    const customerId = transaction.customerId;

    // If transaction was paid, add amount back to customer's pending balance
    if (transaction.status === "paid") {
      const currentPending = Number(transaction.customer.pendingBalance);
      await prisma.customer.update({
        where: { id: customerId },
        data: { pendingBalance: currentPending + amount },
      });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return c.json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to delete transaction" },
      500,
    );
  }
});

export default transactions;
