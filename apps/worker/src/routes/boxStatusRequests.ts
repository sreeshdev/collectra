import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const createRequestSchema = z.object({
  customerId: z.string().uuid(),
  requestedStatus: z.enum(["ACTIVE", "INACTIVE"]),
  remarks: z.string().optional(),
});

const boxStatusRequests = new Hono().basePath("/box-status-requests");

// Create status change request (Employee only)
boxStatusRequests.post("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");

    if (user.role !== "EMPLOYEE") {
      return c.json(
        { error: "Only employees can create box status change requests" },
        403,
      );
    }

    const body = await c.req.json();
    const data = createRequestSchema.parse(body);

    const prisma = getPrisma(c);

    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    if (customer.assignedEmployeeId !== user.id) {
      return c.json(
        {
          error: "You can only request status changes for your assigned customers",
        },
        403,
      );
    }

    if (customer.status === data.requestedStatus) {
      return c.json(
        {
          error: `Customer is already ${data.requestedStatus.toLowerCase()}`,
        },
        400,
      );
    }

    const existingRequest = await prisma.customerStatusChangeRequest.findFirst({
      where: {
        customerId: data.customerId,
        status: "pending",
      },
    });

    if (existingRequest) {
      return c.json(
        {
          error: "A pending status change request already exists for this customer",
        },
        400,
      );
    }

    const request = await prisma.customerStatusChangeRequest.create({
      data: {
        customerId: data.customerId,
        requestedBy: user.id,
        requestedStatus: data.requestedStatus,
        remarks: data.remarks,
        status: "pending",
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            status: true,
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
    });

    return c.json({ request }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json(
      { error: error.message || "Failed to create request" },
      500,
    );
  }
});

// Get all status change requests
boxStatusRequests.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c);

    const where: any = {};
    if (user.role === "EMPLOYEE") {
      where.requestedBy = user.id;
    }

    const requests = await prisma.customerStatusChangeRequest.findMany({
      where,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            mobile: true,
            status: true,
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return c.json({ requests });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch requests" },
      500,
    );
  }
});

// Approve status change request (Admin only)
boxStatusRequests.put("/:id/approve", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const prisma = getPrisma(c);

    const request = await prisma.customerStatusChangeRequest.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (!request) {
      return c.json({ error: "Request not found" }, 404);
    }

    if (request.status !== "pending") {
      return c.json({ error: "Request is not pending" }, 400);
    }

    await prisma.customer.update({
      where: { id: request.customerId },
      data: { status: request.requestedStatus },
    });

    const updatedRequest = await prisma.customerStatusChangeRequest.update({
      where: { id },
      data: {
        status: "approved",
        reviewedBy: user.id,
        reviewedAt: new Date(),
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            status: true,
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
    });

    return c.json({ request: updatedRequest });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to approve request" },
      500,
    );
  }
});

// Reject status change request (Admin only)
boxStatusRequests.put("/:id/reject", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const prisma = getPrisma(c);

    const request = await prisma.customerStatusChangeRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return c.json({ error: "Request not found" }, 404);
    }

    if (request.status !== "pending") {
      return c.json({ error: "Request is not pending" }, 400);
    }

    const updatedRequest = await prisma.customerStatusChangeRequest.update({
      where: { id },
      data: {
        status: "rejected",
        reviewedBy: user.id,
        reviewedAt: new Date(),
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
            status: true,
          },
        },
        requester: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
    });

    return c.json({ request: updatedRequest });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to reject request" },
      500,
    );
  }
});

export default boxStatusRequests;
