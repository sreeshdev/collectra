import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const createRequestSchema = z.object({
  customerId: z.string().uuid(),
  newBoxNumber: z.string().min(1),
  remarks: z.string().optional(),
});

const boxNumberRequests = new Hono().basePath("/box-number-requests");

// Create box number update request (Employee only)
boxNumberRequests.post("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    
    // Only employees can create requests
    if (user.role !== "EMPLOYEE") {
      return c.json({ error: "Only employees can create box number requests" }, 403);
    }

    const body = await c.req.json();
    const data = createRequestSchema.parse(body);

    const prisma = getPrisma(c.env);

    // Check if customer exists and is assigned to this employee
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    if (customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "You can only request updates for your assigned customers" }, 403);
    }

    // Check if new box number already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { boxNumber: data.newBoxNumber },
    });

    if (existingCustomer && existingCustomer.id !== customer.id) {
      return c.json({ error: "Box number already exists" }, 400);
    }

    // Check if there's already a pending request for this customer
    const existingRequest = await prisma.boxNumberRequest.findFirst({
      where: {
        customerId: data.customerId,
        status: "pending",
      },
    });

    if (existingRequest) {
      return c.json({ error: "A pending request already exists for this customer" }, 400);
    }

    // Create request
    const request = await prisma.boxNumberRequest.create({
      data: {
        customerId: data.customerId,
        requestedBy: user.id,
        oldBoxNumber: customer.boxNumber,
        newBoxNumber: data.newBoxNumber,
        remarks: data.remarks,
        status: "pending",
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            boxNumber: true,
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
    return c.json({ error: error.message || "Failed to create request" }, 500);
  }
});

// Get all box number requests
boxNumberRequests.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c.env);

    const where: any = {};
    
    // Employees can only see their own requests
    if (user.role === "EMPLOYEE") {
      where.requestedBy = user.id;
    }

    const requests = await prisma.boxNumberRequest.findMany({
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
    return c.json({ error: error.message || "Failed to fetch requests" }, 500);
  }
});

// Approve box number request (Admin only)
boxNumberRequests.put("/:id/approve", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const prisma = getPrisma(c.env);

    const request = await prisma.boxNumberRequest.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    if (!request) {
      return c.json({ error: "Request not found" }, 404);
    }

    if (request.status !== "pending") {
      return c.json({ error: "Request is not pending" }, 400);
    }

    // Check if new box number already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { boxNumber: request.newBoxNumber },
    });

    if (existingCustomer && existingCustomer.id !== request.customerId) {
      return c.json({ error: "Box number already exists" }, 400);
    }

    // Update customer box number
    await prisma.customer.update({
      where: { id: request.customerId },
      data: { boxNumber: request.newBoxNumber },
    });

    // Update request status
    const updatedRequest = await prisma.boxNumberRequest.update({
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
            mobile: true,
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
    return c.json({ error: error.message || "Failed to approve request" }, 500);
  }
});

// Reject box number request (Admin only)
boxNumberRequests.put("/:id/reject", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const user = c.get("user");
    const prisma = getPrisma(c.env);

    const request = await prisma.boxNumberRequest.findUnique({
      where: { id },
    });

    if (!request) {
      return c.json({ error: "Request not found" }, 404);
    }

    if (request.status !== "pending") {
      return c.json({ error: "Request is not pending" }, 400);
    }

    // Update request status
    const updatedRequest = await prisma.boxNumberRequest.update({
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
            mobile: true,
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
    return c.json({ error: error.message || "Failed to reject request" }, 500);
  }
});

export default boxNumberRequests;
