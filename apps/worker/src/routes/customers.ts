import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, adminOnly } from "../middleware/auth";
import { getPrisma } from "../utils/prisma";

const customerSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().length(10),
  email: z.string().email().nullable().optional(),
  address: z.string().nullable().optional(),
  whatsappMobile: z.string().length(10),
  boxNumber: z.string().min(1),
  idNumber: z.string().nullable().optional(),
  packageId: z.string().uuid(),
  assignedEmployeeId: z.string().uuid().optional(),
});

const customers = new Hono().basePath("/customers");

// Get all customers (Admin sees all, Employee sees only assigned)
customers.get("/", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const prisma = getPrisma(c.env);

    const where: any = {};
    if (user.role === "EMPLOYEE") {
      where.assignedEmployeeId = user.id;
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return c.json({ customers });
  } catch (error: any) {
    return c.json({ error: error.message || "Failed to fetch customers" }, 500);
  }
});

// Search customers
customers.get("/search", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const query = c.req.query("q") || "";
    const prisma = getPrisma(c.env);

    const where: any = {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { boxNumber: { contains: query, mode: "insensitive" } },
        { mobile: { contains: query } },
      ],
    };

    if (user.role === "EMPLOYEE") {
      where.assignedEmployeeId = user.id;
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 20,
    });

    return c.json({ customers });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to search customers" },
      500
    );
  }
});

// Export customers as CSV (Admin only) - MUST be before /:id route
customers.get("/export", authMiddleware, adminOnly, async (c) => {
  try {
    const prisma = getPrisma(c.env);

    const customers = await prisma.customer.findMany({
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV with all fields including package name and employee name
    const headers = [
      "Name",
      "Mobile",
      "Email",
      "Address",
      "WhatsApp Mobile",
      "Box Number",
      "ID Number",
      "Package Name",
      "Employee Name",
      "Pending Balance",
      "Created At",
    ];

    const rows = customers.map((customer) => [
      customer.name || "",
      customer.mobile || "",
      customer.email || "",
      customer.address || "",
      customer.whatsappMobile || "",
      customer.boxNumber || "",
      customer.idNumber || "",
      customer.package?.name || "",
      customer.assignedEmployee?.name || "",
      customer.pendingBalance.toString() || "0",
      customer.createdAt.toISOString().split("T")[0],
    ]);

    // Escape CSV values (handle commas and quotes)
    const escapeCsvValue = (value: string): string => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csvRows = rows.map((row) => row.map(escapeCsvValue).join(","));
    const csv = [headers.map(escapeCsvValue).join(","), ...csvRows].join("\n");

    // Set headers for file download with CORS
    c.header("Content-Type", "text/csv; charset=utf-8");
    c.header(
      "Content-Disposition",
      `attachment; filename="customers-${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );

    return c.text(csv);
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to export customers" },
      500
    );
  }
});

// Get customer by ID
customers.get("/:id", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
            mobile: true,
            email: true,
          },
        },
      },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    // Employee can only see assigned customers
    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "Forbidden" }, 403);
    }

    return c.json({ customer });
  } catch (error: any) {
    return c.json({ error: error.message || "Failed to fetch customer" }, 500);
  }
});

// Get customer transactions
customers.get("/:id/transactions", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const id = c.req.param("id");
    const prisma = getPrisma(c.env);

    // Check if customer exists and employee has access
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return c.json({ error: "Customer not found" }, 404);
    }

    if (user.role === "EMPLOYEE" && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: "Forbidden" }, 403);
    }

    const transactions = await prisma.transaction.findMany({
      where: { customerId: id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            mobile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return c.json({ transactions });
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to fetch transactions" },
      500
    );
  }
});

// Create customer (Admin only)
customers.post("/", authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = customerSchema.parse(body);

    const prisma = getPrisma(c.env);

    // Check if box number already exists
    const existing = await prisma.customer.findUnique({
      where: { boxNumber: data.boxNumber },
    });

    if (existing) {
      return c.json({ error: "Box number already exists" }, 400);
    }

    const customer = await prisma.customer.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        whatsappMobile: data.whatsappMobile,
        boxNumber: data.boxNumber,
        idNumber: data.idNumber,
        packageId: data.packageId,
        assignedEmployeeId: data.assignedEmployeeId,
        pendingBalance: 0,
      },
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({ customer }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to create customer" }, 500);
  }
});

// Update customer (Admin only)
customers.put("/:id", authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const data = customerSchema.partial().parse(body);

    const prisma = getPrisma(c.env);

    const customer = await prisma.customer.update({
      where: { id },
      data,
      include: {
        package: true,
        assignedEmployee: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({ customer });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }
    return c.json({ error: error.message || "Failed to update customer" }, 500);
  }
});

// Import customers from CSV (Admin only)
customers.post("/import", authMiddleware, adminOnly, async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");

    if (!file) {
      return c.json({ error: "No file uploaded" }, 400);
    }

    // In Cloudflare Workers, FormData entries are File-like objects
    let fileContent: string;
    if (file instanceof File) {
      fileContent = await file.text();
    } else if (typeof file === "string") {
      fileContent = file;
    } else {
      // Convert Blob/File-like to text
      fileContent = await new Response(file).text();
    }

    // Parse file content
    const lines = fileContent.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return c.json(
        { error: "CSV file must have at least a header and one data row" },
        400
      );
    }

    // Parse CSV (simple parser - handles quoted values)
    const parseCsvLine = (line: string): string[] => {
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++; // Skip next quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());

    // Expected headers (case-insensitive matching)
    const expectedHeaders = [
      "name",
      "mobile",
      "email",
      "address",
      "whatsapp mobile",
      "box number",
      "id number",
      "package name",
      "employee name",
      "pending balance",
      "created at",
    ];

    // Map header indices
    const headerMap: Record<string, number> = {};
    expectedHeaders.forEach((expected) => {
      const index = headers.findIndex(
        (h) => h.toLowerCase().trim() === expected.toLowerCase()
      );
      if (index !== -1) {
        headerMap[expected] = index;
      }
    });

    // Validate required headers
    const requiredHeaders = [
      "name",
      "mobile",
      "whatsapp mobile",
      "box number",
      "package name",
    ];
    const missingHeaders = requiredHeaders.filter(
      (h) => headerMap[h] === undefined
    );
    if (missingHeaders.length > 0) {
      return c.json(
        {
          error: `Missing required headers: ${missingHeaders.join(", ")}`,
        },
        400
      );
    }

    const prisma = getPrisma(c.env);

    // Get all packages and employees for validation
    const [packages, employees] = await Promise.all([
      prisma.package.findMany(),
      prisma.user.findMany({
        where: { role: "EMPLOYEE" },
      }),
    ]);

    // Create lookup maps (case-sensitive)
    const packageMap = new Map<string, string>();
    packages.forEach((pkg) => {
      packageMap.set(pkg.name, pkg.id);
    });

    const employeeMap = new Map<string, string>();
    employees.forEach((emp) => {
      employeeMap.set(emp.name, emp.id);
    });

    const errors: Array<{ row: number; error: string }> = [];
    const validRows: any[] = [];

    // Process each row (skip header)
    for (let i = 1; i < lines.length; i++) {
      const row = parseCsvLine(lines[i]);
      const rowNumber = i + 1; // 1-indexed for user

      try {
        // Extract values
        const name = row[headerMap["name"]]?.trim() || "";
        const mobile = row[headerMap["mobile"]]?.trim() || "";
        const email = row[headerMap["email"]]?.trim() || "";
        const address = row[headerMap["address"]]?.trim() || "";
        const whatsappMobile = row[headerMap["whatsapp mobile"]]?.trim() || "";
        const boxNumber = row[headerMap["box number"]]?.trim() || "";
        const idNumber = row[headerMap["id number"]]?.trim() || "";
        const packageName = row[headerMap["package name"]]?.trim() || "";
        const employeeName = row[headerMap["employee name"]]?.trim() || "";
        const pendingBalance = row[headerMap["pending balance"]]?.trim() || "0";

        // Validate required fields
        if (!name) {
          errors.push({ row: rowNumber, error: "Name is required" });
          continue;
        }
        if (!mobile || mobile.length !== 10) {
          errors.push({
            row: rowNumber,
            error: "Mobile must be exactly 10 digits",
          });
          continue;
        }
        if (!whatsappMobile || whatsappMobile.length !== 10) {
          errors.push({
            row: rowNumber,
            error: "WhatsApp Mobile must be exactly 10 digits",
          });
          continue;
        }
        if (!boxNumber) {
          errors.push({ row: rowNumber, error: "Box Number is required" });
          continue;
        }
        if (!packageName) {
          errors.push({ row: rowNumber, error: "Package Name is required" });
          continue;
        }

        // Validate package name (case-sensitive)
        const packageId = packageMap.get(packageName);
        if (!packageId) {
          errors.push({
            row: rowNumber,
            error: `Package "${packageName}" not found (case-sensitive match required)`,
          });
          continue;
        }

        // Validate employee name if provided (case-sensitive)
        let assignedEmployeeId: string | undefined = undefined;
        if (employeeName) {
          const employeeId = employeeMap.get(employeeName);
          if (!employeeId) {
            errors.push({
              row: rowNumber,
              error: `Employee "${employeeName}" not found (case-sensitive match required)`,
            });
            continue;
          }
          assignedEmployeeId = employeeId;
        }

        // Validate email format if provided
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.push({ row: rowNumber, error: "Invalid email format" });
          continue;
        }

        // Check if box number already exists
        const existing = await prisma.customer.findUnique({
          where: { boxNumber },
        });
        if (existing) {
          errors.push({
            row: rowNumber,
            error: `Box Number "${boxNumber}" already exists`,
          });
          continue;
        }

        // Add to valid rows
        validRows.push({
          name,
          mobile,
          email: email || null,
          address: address || null,
          whatsappMobile,
          boxNumber,
          idNumber: idNumber || null,
          packageId,
          assignedEmployeeId,
          pendingBalance: parseFloat(pendingBalance) || 0,
        });
      } catch (error: any) {
        errors.push({
          row: rowNumber,
          error: error.message || "Invalid row data",
        });
      }
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return c.json(
        {
          error: "Import validation failed",
          errors,
          validRowsCount: validRows.length,
        },
        400
      );
    }

    // Import all valid rows
    const importedCustomers = [];
    for (const rowData of validRows) {
      try {
        const customer = await prisma.customer.create({
          data: rowData,
          include: {
            package: true,
            assignedEmployee: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        importedCustomers.push(customer);
      } catch (error: any) {
        // If duplicate box number or other DB error, add to errors
        errors.push({
          row: validRows.indexOf(rowData) + 2, // Approximate row number
          error: error.message || "Failed to create customer",
        });
      }
    }

    // If some imports failed, return partial success
    if (errors.length > 0) {
      return c.json(
        {
          message: "Partial import completed",
          imported: importedCustomers.length,
          errors,
        },
        207 // Multi-Status
      );
    }

    return c.json(
      {
        message: "Import completed successfully",
        imported: importedCustomers.length,
        customers: importedCustomers,
      },
      201
    );
  } catch (error: any) {
    return c.json(
      { error: error.message || "Failed to import customers" },
      500
    );
  }
});

export default customers;
