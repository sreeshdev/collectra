import { Hono } from 'hono';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth';
import { getPrisma } from '../utils/prisma';

const sendPaymentLinkSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.string(),
  link: z.string().url(),
  dueMonth: z.string(),
});

const messaging = new Hono().basePath('/messaging');


// Send WhatsApp payment link
messaging.post('/whatsapp/send-payment-link', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const { customerId, amount, link, dueMonth } = sendPaymentLinkSchema.parse(body);
    
    const prisma = getPrisma(c);
    
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });
    
    if (!customer) {
      return c.json({ error: 'Customer not found' }, 404);
    }
    
    const message = `Hello ${customer.name},\n\nYour payment of ₹${amount} for ${dueMonth} is due.\n\nPlease pay using this link: ${link}\n\nThank you!`;
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${c.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: customer.whatsappMobile,
          type: 'text',
          text: {
            body: message,
          },
        }),
      }
    );
    
    if (!response.ok) {
      const error = await response.text();
      return c.json({ error: `WhatsApp API error: ${error}` }, 500);
    }
    
    const result = await response.json();
    
    return c.json({ success: true, messageId: result.messages?.[0]?.id });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    return c.json({ error: error.message || 'Failed to send message' }, 500);
  }
});

export default messaging;

