import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const dashboard = new Hono().basePath("/dashboard");

// Get dashboard stats
dashboard.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c.env);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (user.role === "EMPLOYEE") {
      // Employee Dashboard
      // Get assigned customers
      const assignedCustomers = await prisma.customer.findMany({
        where: { assignedEmployeeId: user.id },
        select: { id: true },
      });
      const customerIds = assignedCustomers.map((c) => c.id);

      // 1. Total no of that employee's customer Manual collection for today
      const todayManualTransactions = await prisma.transaction.count({
        where: {
          customerId: { in: customerIds },
          transactionType: "manual",
          status: "paid",
          transactionDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      // 2. Total no of that employee's customer Online collection for today
      const todayOnlineTransactions = await prisma.transaction.count({
        where: {
          customerId: { in: customerIds },
          transactionType: "online",
          status: "paid",
          transactionDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      });

      // 3. Total no of pending customers for that employee
      const pendingCustomers = await prisma.customer.count({
        where: {
          assignedEmployeeId: user.id,
          pendingBalance: {
            gt: 0,
          },
        },
      });

      // 4. Total amount manually collected today
      const todayManualAmount = await prisma.transaction.aggregate({
        where: {
          customerId: { in: customerIds },
          transactionType: "manual",
          status: "paid",
          transactionDate: {
            gte: today,
            lt: tomorrow,
          },
        },
        _sum: {
          amount: true,
        },
      });

      return c.json({
        todayManualCount: todayManualTransactions,
        todayOnlineCount: todayOnlineTransactions,
        pendingCustomersCount: pendingCustomers,
        todayManualAmount: Number(todayManualAmount._sum.amount || 0),
      });
    } else {
      // Admin Dashboard
      // 1. Total no. of customers
      const totalCustomers = await prisma.customer.count();

      // 2. Today no. of manual collections with amount
      const todayManualStats = await prisma.transaction.aggregate({
        where: {
          transactionType: "manual",
          status: "paid",
          transactionDate: {
            gte: today,
            lt: tomorrow,
          },
        },
        _count: true,
        _sum: {
          amount: true,
        },
      });

      // 3. Today No. of online collection with amount
      const todayOnlineStats = await prisma.transaction.aggregate({
        where: {
          transactionType: "online",
          status: "paid",
          transactionDate: {
            gte: today,
            lt: tomorrow,
          },
        },
        _count: true,
        _sum: {
          amount: true,
        },
      });

      // 4. Monthly comparison data for chart (last 12 months)
      const monthlyData = [];
      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        monthStart.setHours(0, 0, 0, 0);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);

        const manualStats = await prisma.transaction.aggregate({
          where: {
            transactionType: "manual",
            status: "paid",
            transactionDate: {
              gte: monthStart,
              lt: monthEnd,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const onlineStats = await prisma.transaction.aggregate({
          where: {
            transactionType: "online",
            status: "paid",
            transactionDate: {
              gte: monthStart,
              lt: monthEnd,
            },
          },
          _sum: {
            amount: true,
          },
        });

        monthlyData.push({
          month: monthStart.toLocaleString("default", { month: "short", year: "numeric" }),
          manual: Number(manualStats._sum.amount || 0),
          online: Number(onlineStats._sum.amount || 0),
        });
      }

      return c.json({
        totalCustomers,
        todayManualCount: todayManualStats._count,
        todayManualAmount: Number(todayManualStats._sum.amount || 0),
        todayOnlineCount: todayOnlineStats._count,
        todayOnlineAmount: Number(todayOnlineStats._sum.amount || 0),
        monthlyData,
      });
    }
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch dashboard data" },
      500
    );
  }
});

export default dashboard;
