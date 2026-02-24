import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { getPrisma } from '../utils/prisma';

const packageSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  recurringType: z.enum(['MONTHLY', 'BIMONTHLY']),
});

const packages = new Hono().basePath('/packages');


// Get all packages
packages.get('/', authMiddleware, async (c) => {
  try {
    const prisma = getPrisma(c);
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({ packages });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch packages' }, 500);
  }
});

// Create package (Admin only)
packages.post('/', authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = packageSchema.parse(body);
    
    const prisma = getPrisma(c);
    
    const pkg = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        recurringType: data.recurringType,
      },
    });
    
    return c.json({ package: pkg }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to create package' }, 500);
  }
});

// Update package (Admin only)
packages.put('/:id', authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const data = packageSchema.parse(body);
    
    const prisma = getPrisma(c);
    
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        recurringType: data.recurringType,
      },
    });
    
    return c.json({ package: pkg });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to update package' }, 500);
  }
});

export default packages;

