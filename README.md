# Dish Hobby Cable Vision - Payment Collection App

A production-ready internal web application for payment collection and customer management for cable TV business operations.

## Tech Stack

- **Frontend**: React + Vite + Ant Design (Cloudflare Pages)
- **Backend**: Cloudflare Workers + Hono Framework
- **Database**: Neon Postgres with Prisma ORM
- **Cron**: Cloudflare Cron Triggers (runs monthly on 5th)
- **Messaging**: Meta WhatsApp Cloud API
- **Payments**: Razorpay Payment Links + Webhooks

## Project Structure

```
pay/
├── apps/
│   ├── worker/          # Cloudflare Workers backend
│   │   ├── src/
│   │   │   ├── routes/  # API routes
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   └── wrangler.toml
│   └── web/             # React frontend
│       ├── src/
│       │   ├── pages/
│       │   ├── components/
│       │   └── contexts/
│       └── vite.config.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── README.md
```

## Features

### Role-Based Access
- **Admin**: Full access to all modules
- **Employee**: Restricted access to assigned customers only

### Modules
1. **Dashboard**: Summary cards for collection, pending, and customer count
2. **Employee Management**: Create and manage employees (Admin only)
3. **Package Management**: Create packages with monthly/bi-monthly billing
4. **Customer Management**: Manage customers with assigned employees
5. **Transaction Management**: View and export transactions
6. **Payment Initiation**: Bulk payment link generation (Admin only)
7. **Manual Payment Collection**: Collect payments manually
8. **Settings**: Update profile and change password

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Neon Postgres database account
- Cloudflare account
- Razorpay account
- Meta WhatsApp Business API access

### 1. Database Setup (Neon)

1. Create a new Neon Postgres database
2. Copy the connection string (use the connection pooling URL)
3. Update `DATABASE_URL` in `.dev.vars` and Cloudflare Workers environment variables

### 2. Backend Setup (Cloudflare Workers)

```bash
cd apps/worker
npm install
```

#### Local Development

1. Copy `.dev.vars.example` to `.dev.vars`:
```bash
cp .dev.vars.example .dev.vars
```

2. Update `.dev.vars` with your credentials:
```env
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-razorpay-webhook-secret"
WHATSAPP_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-phone-number-id"
WHATSAPP_TEMPLATE_NAME="payment_reminder"
APP_BASE_URL="http://localhost:5173"
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Run migrations:
```bash
npx prisma migrate deploy
```

5. Seed database:
```bash
npx tsx prisma/seed.ts
```

6. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:8787`

### 3. Frontend Setup

```bash
cd apps/web
npm install
```

#### Local Development

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env`:
```env
VITE_API_BASE_URL=http://localhost:8787
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Default Login Credentials

After seeding:
- **Mobile**: `9999999999`
- **Password**: `Admin@123`

**Important**: Change the password after first login!

## Deployment

### Backend Deployment (Cloudflare Workers)

1. Install Wrangler CLI globally (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Update `wrangler.toml` with your configuration

4. Set environment variables in Cloudflare Dashboard or via CLI:
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

5. Deploy:
```bash
cd apps/worker
npm run deploy
```

### Frontend Deployment (Cloudflare Pages)

1. Build the frontend:
```bash
cd apps/web
npm run build
```

2. Deploy via Cloudflare Dashboard:
   - Go to Cloudflare Pages
   - Create a new project
   - Connect your Git repository or upload the `dist` folder
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable: `VITE_API_BASE_URL` = your Workers URL

3. Or deploy via Wrangler:
```bash
cd apps/web
npm run build
wrangler pages deploy dist
```

### Cron Trigger Setup

The cron trigger is configured in `wrangler.toml`:
```toml
[[triggers.crons]]
cron = "0 5 5 * *"  # Runs on 5th of every month at 5 AM UTC (10:30 AM IST)
```

The cron handler is automatically set up in `src/index.ts`. It will:
- Check if it's the 5th of the month
- Find customers due for billing
- Generate Razorpay payment links
- Send WhatsApp reminders
- Create pending transactions

## Razorpay Webhook Configuration

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-worker-url.workers.dev/webhooks/razorpay`
3. Select events:
   - `payment_link.paid`
   - `payment_link.cancelled`
   - `payment.captured`
   - `payment.failed`
4. Copy the webhook secret and add it to `RAZORPAY_WEBHOOK_SECRET`

## WhatsApp Cloud API Setup

1. Create a Meta App and get WhatsApp Business API access
2. Get your:
   - Access Token (`WHATSAPP_TOKEN`)
   - Phone Number ID (`WHATSAPP_PHONE_NUMBER_ID`)
3. Create a message template (optional, currently using plain text)
4. Add credentials to environment variables

## API Endpoints

### Auth
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user
- `POST /auth/change-password` - Change password

### Users (Admin only)
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `PUT /api/users/me` - Update own profile

### Packages
- `GET /api/packages` - List packages
- `POST /api/packages` - Create package (Admin only)
- `PUT /api/packages/:id` - Update package (Admin only)

### Customers
- `GET /api/customers` - List customers
- `GET /api/customers/search?q=...` - Search customers
- `GET /api/customers/:id` - Get customer details
- `GET /api/customers/:id/transactions` - Get customer transactions
- `POST /api/customers` - Create customer (Admin only)
- `PUT /api/customers/:id` - Update customer (Admin only)

### Transactions
- `GET /api/transactions?month=&year=` - List transactions
- `GET /api/transactions/export?month=&year=` - Export as CSV (Admin only)
- `POST /api/transactions/manual` - Create manual transaction

### Payments
- `POST /api/payments/initiate-bulk` - Initiate bulk payments (Admin only)

### Webhooks
- `POST /webhooks/razorpay` - Razorpay webhook handler

### Messaging
- `POST /api/messaging/whatsapp/send-payment-link` - Send WhatsApp message

## Database Schema

The application uses Prisma with the following main models:
- `User` - Admin and Employee users
- `Package` - Service packages
- `Customer` - Customer records
- `Transaction` - Payment transactions
- `PaymentLink` - Razorpay payment links

See `prisma/schema.prisma` for full schema.

## Development

### Running Locally

1. Start backend:
```bash
cd apps/worker
npm run dev
```

2. Start frontend (in another terminal):
```bash
cd apps/web
npm run dev
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**: Ensure `DATABASE_URL` uses the connection pooling URL from Neon
2. **CORS Errors**: Check `APP_BASE_URL` matches your frontend URL
3. **JWT Errors**: Ensure `JWT_SECRET` is set and consistent
4. **Razorpay Webhook**: Verify webhook secret matches in both Razorpay dashboard and environment variables

## Security Notes

- Change default admin password immediately
- Use strong `JWT_SECRET` in production
- Keep all secrets in environment variables
- Enable HTTPS in production
- Regularly update dependencies

## License

Private - Internal Use Only

## Support

For issues or questions, contact the development team.

