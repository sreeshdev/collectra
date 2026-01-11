import { Hono } from 'hono';
import { getPrisma } from '../utils/prisma';

const webhooks = new Hono().basePath('/razorpay');


async function verifyRazorpaySignature(webhookSecret: string, payload: string, signature: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(webhookSecret);
    const payloadData = encoder.encode(payload);
    
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, payloadData);
    const generatedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return generatedSignature === signature;
  } catch (error) {
    return false;
  }
}

// Razorpay webhook
webhooks.post('/razorpay', async (c) => {
  try {
    const signature = c.req.header('X-Razorpay-Signature');
    const rawBody = await c.req.text();
    
    if (!signature) {
      return c.json({ error: 'Missing signature' }, 400);
    }
    
    const isValid = await verifyRazorpaySignature(c.env.RAZORPAY_WEBHOOK_SECRET, rawBody, signature);
    
    if (!isValid) {
      return c.json({ error: 'Invalid signature' }, 401);
    }
    
    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const entity = payload.payload?.payment_link?.entity || payload.payload?.payment?.entity;
    
    if (!entity) {
      return c.json({ error: 'Invalid payload' }, 400);
    }
    
    const prisma = getPrisma(c.env);
    
    // Find transaction by Razorpay payment link ID
    const transaction = await prisma.transaction.findFirst({
      where: {
        transactionId: entity.id,
        transactionType: 'payment_link',
      },
      include: {
        customer: true,
      },
    });
    
    if (!transaction) {
      console.log('Transaction not found for payment link:', entity.id);
      return c.json({ message: 'Transaction not found' }, 200);
    }
    
    // Handle payment success
    if (event === 'payment_link.paid' || (event === 'payment.captured' && entity.status === 'captured')) {
      // Update transaction status
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'paid',
          transactionType: 'online',
        },
      });
      
      // Update customer pending balance
      const amount = Number(transaction.amount);
      const currentPending = Number(transaction.customer.pendingBalance);
      const newPending = Math.max(0, currentPending - amount);
      
      await prisma.customer.update({
        where: { id: transaction.customerId },
        data: {
          pendingBalance: newPending,
          lastBillingDate: new Date(),
        },
      });
    } else if (event === 'payment_link.cancelled' || (event === 'payment.failed')) {
      // Update transaction status to failed
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'failed',
        },
      });
    }
    
    return c.json({ message: 'Webhook processed' }, 200);
  } catch (error: any) {
    console.error('Webhook error:', error);
    return c.json({ error: error.message || 'Webhook processing failed' }, 500);
  }
});

export default webhooks;

