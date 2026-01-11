# Quick Start Guide

## Local Development Setup (5 minutes)

### 1. Install Dependencies

```bash
# Root
npm install

# Backend
cd apps/worker
npm install
npx prisma generate

# Frontend
cd ../web
npm install
```

### 2. Database Setup

1. Create a Neon Postgres database
2. Copy the connection string
3. Create `apps/worker/.dev.vars`:

```env
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="dev-secret-key-change-in-production"
RAZORPAY_KEY_ID="your-key-id"
RAZORPAY_KEY_SECRET="your-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-webhook-secret"
WHATSAPP_TOKEN="your-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-id"
WHATSAPP_TEMPLATE_NAME="payment_reminder"
APP_BASE_URL="http://localhost:5173"
```

### 3. Run Migrations & Seed

```bash
cd apps/worker
npx prisma migrate dev --schema=../../prisma/schema.prisma --name init
npx tsx ../../prisma/seed.ts
```

### 4. Start Development Servers

**Terminal 1 - Backend:**

```bash
cd apps/worker
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd apps/web
npm run dev
```

### 5. Login

- Open http://localhost:5173
- Mobile: `9999999999`
- Password: `Admin@123`

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Key Features to Test

1. **Dashboard**: View collection and pending amounts
2. **Employees**: Create employee accounts (Admin only)
3. **Packages**: Create monthly/bi-monthly packages
4. **Customers**: Add customers and assign employees
5. **Initiate Payment**: Generate Razorpay links (Admin only)
6. **Manual Payment**: Collect payments manually
7. **Transactions**: View and export transaction history
8. **Settings**: Update profile and change password

## Common Issues

### Database Connection Error

- Ensure `DATABASE_URL` uses Neon's connection pooling URL
- Check if database is accessible

### CORS Error

- Verify `APP_BASE_URL` in `.dev.vars` matches frontend URL
- Check browser console for specific CORS errors

### Prisma Client Not Generated

```bash
cd apps/worker
npm run db:generate
# Or directly:
npx prisma generate --schema=../../prisma/schema.prisma
```

### Port Already in Use

- Backend default: 8787
- Frontend default: 5173
- Change ports in `wrangler.toml` or `vite.config.ts` if needed

## Next Steps

1. Change default admin password
2. Configure Razorpay webhook
3. Set up WhatsApp API credentials
4. Test payment flow end-to-end
5. Deploy to production

For detailed documentation, see [README.md](./README.md).
