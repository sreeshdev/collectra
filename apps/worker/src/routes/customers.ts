import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getPrisma } from '../utils/prisma';

const customerSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().length(10),
  email: z.string().email().optional(),
  address: z.string().optional(),
  whatsappMobile: z.string().length(10),
  boxNumber: z.string().min(1),
  idNumber: z.string().optional(),
  packageId: z.string().uuid(),
  assignedEmployeeId: z.string().uuid().optional(),
});

const customers = new Hono().basePath('/customers');


// Get all customers (Admin sees all, Employee sees only assigned)
customers.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const prisma = getPrisma(c.env);
    
    const where: any = {};
    if (user.role === 'EMPLOYEE') {
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
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({ customers });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch customers' }, 500);
  }
});

// Search customers
customers.get('/search', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const query = c.req.query('q') || '';
    const prisma = getPrisma(c.env);
    
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { boxNumber: { contains: query, mode: 'insensitive' } },
        { mobile: { contains: query } },
      ],
    };
    
    if (user.role === 'EMPLOYEE') {
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
    return c.json({ error: error.message || 'Failed to search customers' }, 500);
  }
});

// Get customer by ID
customers.get('/:id', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const id = c.req.param('id');
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
      return c.json({ error: 'Customer not found' }, 404);
    }
    
    // Employee can only see assigned customers
    if (user.role === 'EMPLOYEE' && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
    }
    
    return c.json({ customer });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch customer' }, 500);
  }
});

// Get customer transactions
customers.get('/:id/transactions', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const id = c.req.param('id');
    const prisma = getPrisma(c.env);
    
    // Check if customer exists and employee has access
    const customer = await prisma.customer.findUnique({
      where: { id },
    });
    
    if (!customer) {
      return c.json({ error: 'Customer not found' }, 404);
    }
    
    if (user.role === 'EMPLOYEE' && customer.assignedEmployeeId !== user.id) {
      return c.json({ error: 'Forbidden' }, 403);
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
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({ transactions });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch transactions' }, 500);
  }
});

// Create customer (Admin only)
customers.post('/', authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = customerSchema.parse(body);
    
    const prisma = getPrisma(c.env);
    
    // Check if box number already exists
    const existing = await prisma.customer.findUnique({
      where: { boxNumber: data.boxNumber },
    });
    
    if (existing) {
      return c.json({ error: 'Box number already exists' }, 400);
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to create customer' }, 500);
  }
});

// Update customer (Admin only)
customers.put('/:id', authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param('id');
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to update customer' }, 500);
  }
});

export default customers;

