import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const dashboard = new Hono().basePath("/dashboard");

// Shared filter for active customers (used in subqueries - no need to fetch IDs first)
const activeCustomerFilter = { status: "ACTIVE" as const };

// Get dashboard stats - optimized: parallel queries, no 24-query loop
dashboard.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (user.role === "EMPLOYEE") {
      // Employee Dashboard - run all 6 queries in parallel
      const [assignedCustomers, todayManualTransactions, todayOnlineTransactions, pendingCustomers, todayManualAmount, todayOnlineAmount] =
        await Promise.all([
          prisma.customer.findMany({
            where: { assignedEmployeeId: user.id, status: "ACTIVE" },
            select: { id: true },
          }),
          prisma.transaction.findMany({
            where: {
              customer: { assignedEmployeeId: user.id },
              transactionType: "manual",
              status: "paid",
              transactionDate: { gte: today, lt: tomorrow },
            },
            distinct: ["customerId"],
            select: { customerId: true },
          }),
          prisma.transaction.findMany({
            where: {
              customer: { assignedEmployeeId: user.id },
              transactionType: "online",
              status: "paid",
              transactionDate: { gte: today, lt: tomorrow },
            },
            distinct: ["customerId"],
            select: { customerId: true },
          }),
          prisma.customer.count({
            where: {
              assignedEmployeeId: user.id,
              status: "ACTIVE",
              pendingBalance: { gt: 0 },
            },
          }),
          prisma.transaction.aggregate({
            where: {
              customer: { assignedEmployeeId: user.id },
              transactionType: "manual",
              status: "paid",
              transactionDate: { gte: today, lt: tomorrow },
            },
            _sum: { amount: true },
          }),
          prisma.transaction.aggregate({
            where: {
              customer: { assignedEmployeeId: user.id },
              transactionType: "online",
              status: "paid",
              transactionDate: { gte: today, lt: tomorrow },
            },
            _sum: { amount: true },
          }),
        ]);

      return c.json({
        todayManualCount: todayManualTransactions.length || 0,
        todayOnlineCount: todayOnlineTransactions.length || 0,
        pendingCustomersCount: pendingCustomers,
        todayManualAmount: Number(todayManualAmount._sum.amount || 0),
        todayOnlineAmount: Number(todayOnlineAmount._sum.amount || 0),
      });
    }

    // Admin Dashboard - parallelize everything, batch monthly queries
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
    const currentMonthEnd = new Date(currentMonthStart);
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);

    // Build 12 month date ranges for parallel monthly queries
    const monthRanges = Array.from({ length: 12 }, (_, i) => {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - (11 - i));
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      return { monthStart, monthEnd, label: monthStart.toLocaleString("default", { month: "short", year: "numeric" }) };
    });

    // Run base queries + all 12 months in parallel (14 queries total, not 31)
    const [totalCustomers, todayManualTransactions, todayOnlineTransactions, todayManualStats, todayOnlineStats, monthlyStats, ...monthlyResults] =
      await Promise.all([
        prisma.customer.count({ where: activeCustomerFilter }),
        prisma.transaction.findMany({
          where: {
            customer: activeCustomerFilter,
            transactionType: "manual",
            status: "paid",
            transactionDate: { gte: today, lt: tomorrow },
          },
          distinct: ["customerId"],
          select: { customerId: true },
        }),
        prisma.transaction.findMany({
          where: {
            customer: activeCustomerFilter,
            transactionType: "online",
            status: "paid",
            transactionDate: { gte: today, lt: tomorrow },
          },
          distinct: ["customerId"],
          select: { customerId: true },
        }),
        prisma.transaction.aggregate({
          where: {
            customer: activeCustomerFilter,
            transactionType: "manual",
            status: "paid",
            transactionDate: { gte: today, lt: tomorrow },
          },
          _count: true,
          _sum: { amount: true },
        }),
        prisma.transaction.aggregate({
          where: {
            customer: activeCustomerFilter,
            transactionType: "online",
            status: "paid",
            transactionDate: { gte: today, lt: tomorrow },
          },
          _count: true,
          _sum: { amount: true },
        }),
        prisma.transaction.aggregate({
          where: {
            customer: activeCustomerFilter,
            status: "paid",
            transactionDate: { gte: currentMonthStart, lt: currentMonthEnd },
          },
          _count: true,
          _sum: { amount: true },
        }),
        ...monthRanges.map(({ monthStart, monthEnd }) =>
          Promise.all([
            prisma.transaction.aggregate({
              where: {
                customer: activeCustomerFilter,
                transactionType: "manual",
                status: "paid",
                transactionDate: { gte: monthStart, lt: monthEnd },
              },
              _count: true,
              _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
              where: {
                customer: activeCustomerFilter,
                transactionType: "online",
                status: "paid",
                transactionDate: { gte: monthStart, lt: monthEnd },
              },
              _count: true,
              _sum: { amount: true },
            }),
          ])
        ),
      ]);

    const monthlyData = monthRanges.map(({ label }, i) => {
      const [manual, online] = monthlyResults[i] as [Awaited<ReturnType<typeof prisma.transaction.aggregate>>, Awaited<ReturnType<typeof prisma.transaction.aggregate>>];
      return {
        month: label,
        manual: Number(manual?._sum?.amount ?? 0),
        online: Number(online?._sum?.amount ?? 0),
        manualCount: manual?._count ?? 0,
        onlineCount: online?._count ?? 0,
      };
    });

    return c.json({
      totalCustomers,
      todayManualCount: todayManualTransactions.length || 0,
      todayManualAmount: Number(todayManualStats._sum.amount || 0),
      todayOnlineCount: todayOnlineTransactions.length || 0,
      todayOnlineAmount: Number(todayOnlineStats._sum.amount || 0),
      monthlyCollectionCount: monthlyStats._count,
      monthlyCollectionAmount: Number(monthlyStats._sum.amount || 0),
      monthlyData,
    });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch dashboard data" },
      500,
    );
  }
});

export default dashboard;
