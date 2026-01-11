import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { hashPassword } from '../utils/crypto';
import { getPrisma } from '../utils/prisma';

const userSchema = z.object({
  name: z.string().min(1),
  mobile: z.string().length(10),
  email: z.string().email(),
  address: z.string().optional(),
  displayPictureUrl: z.string().url().optional(),
  password: z.string().min(6).optional(),
});

const updateUserSchema = userSchema.partial();

const users = new Hono().basePath('/users');


// Get all users (Admin only)
users.get('/', authMiddleware, adminOnly, async (c) => {
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
      orderBy: { createdAt: 'desc' },
    });
    
    return c.json({ users });
  } catch (error: any) {
    return c.json({ error: error.message || 'Failed to fetch users' }, 500);
  }
});

// Create user (Admin only)
users.post('/', authMiddleware, adminOnly, async (c) => {
  try {
    const body = await c.req.json();
    const data = userSchema.parse(body);
    
    const prisma = getPrisma(c.env);
    
    // Check if mobile already exists
    const existing = await prisma.user.findUnique({
      where: { mobile: data.mobile },
    });
    
    if (existing) {
      return c.json({ error: 'Mobile number already exists' }, 400);
    }
    
    const passwordHash = data.password ? await hashPassword(data.password) : await hashPassword('Default@123');
    
    const user = await prisma.user.create({
      data: {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        displayPictureUrl: data.displayPictureUrl,
        passwordHash,
        role: 'EMPLOYEE',
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to create user' }, 500);
  }
});

// Update user (Admin only)
users.put('/:id', authMiddleware, adminOnly, async (c) => {
  try {
    const id = c.req.param('id');
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to update user' }, 500);
  }
});

// Update current user profile
users.put('/me', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to update profile' }, 500);
  }
});

export default users;

