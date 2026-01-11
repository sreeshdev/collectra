import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

export interface AuthUser {
  id: string;
  role: 'ADMIN' | 'EMPLOYEE';
  mobile: string;
}

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
  }
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const token = authHeader.substring(7);
  const jwtSecret = c.env.JWT_SECRET;
  
  try {
    const payload = await verify(token, jwtSecret);
    c.set('user', payload as AuthUser);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
}

export function adminOnly(c: Context, next: Next) {
  const user = c.get('user');
  if (user.role !== 'ADMIN') {
    return c.json({ error: 'Forbidden - Admin only' }, 403);
  }
  return next();
}

