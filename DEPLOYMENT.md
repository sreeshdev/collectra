# Deployment Guide

## Quick Deployment Checklist

### 1. Database (Neon Postgres)
- [ ] Create Neon database
- [ ] Copy connection string (use pooling URL)
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Seed database: `npx tsx prisma/seed.ts`

### 2. Backend (Cloudflare Workers)
- [ ] Install Wrangler: `npm install -g wrangler`
- [ ] Login: `wrangler login`
- [ ] Set secrets:
  ```bash
  wrangler secret put DATABASE_URL
  wrangler secret put JWT_SECRET
  wrangler secret put RAZORPAY_KEY_ID
  wrangler secret put RAZORPAY_KEY_SECRET
  wrangler secret put RAZORPAY_WEBHOOK_SECRET
  wrangler secret put WHATSAPP_TOKEN
  wrangler secret put WHATSAPP_PHONE_NUMBER_ID
  wrangler secret put WHATSAPP_TEMPLATE_NAME
  wrangler secret put APP_BASE_URL
  ```
- [ ] Deploy: `cd apps/worker && npm run deploy`
- [ ] Note the Workers URL

### 3. Frontend (Cloudflare Pages)
- [ ] Build: `cd apps/web && npm run build`
- [ ] Deploy via Dashboard or CLI:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `VITE_API_BASE_URL` = your Workers URL

### 4. Razorpay Webhook
- [ ] Go to Razorpay Dashboard → Settings → Webhooks
- [ ] Add webhook: `https://your-worker-url.workers.dev/webhooks/razorpay`
- [ ] Select events: `payment_link.paid`, `payment_link.cancelled`, `payment.captured`, `payment.failed`
- [ ] Copy webhook secret to `RAZORPAY_WEBHOOK_SECRET`

### 5. WhatsApp Setup
- [ ] Create Meta App
- [ ] Get WhatsApp Business API access
- [ ] Get Access Token and Phone Number ID
- [ ] Add to environment variables

### 6. Cron Verification
- [ ] Verify cron trigger in `wrangler.toml`: `0 5 5 * *`
- [ ] Test cron manually if possible
- [ ] Monitor logs on the 5th of each month

## Environment Variables Summary

### Backend (Cloudflare Workers)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
WHATSAPP_TOKEN=...
WHATSAPP_PHONE_NUMBER_ID=...
WHATSAPP_TEMPLATE_NAME=payment_reminder
APP_BASE_URL=https://your-frontend.pages.dev
```

### Frontend (Cloudflare Pages)
```
VITE_API_BASE_URL=https://your-worker.workers.dev
```

## Testing After Deployment

1. **Login Test**
   - Use default credentials: Mobile `9999999999`, Password `Admin@123`
   - Change password immediately

2. **API Test**
   - Check health: `https://your-worker.workers.dev/`
   - Test login endpoint

3. **Webhook Test**
   - Use Razorpay test webhook or manual trigger
   - Check logs for webhook processing

4. **Cron Test**
   - Wait for 5th of month or trigger manually
   - Check logs for cron execution

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` uses pooling URL
- Check Neon dashboard for connection status
- Ensure IP allowlist is configured (if required)

### CORS Issues
- Verify `APP_BASE_URL` matches frontend URL exactly
- Check browser console for CORS errors
- Ensure credentials are included in requests

### Webhook Not Working
- Verify webhook URL is accessible
- Check webhook secret matches
- Review Razorpay webhook logs
- Check Workers logs for errors

### Cron Not Running
- Verify cron schedule in `wrangler.toml`
- Check Cloudflare dashboard for cron triggers
- Review Workers logs on scheduled time

