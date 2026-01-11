#!/bin/bash

# Setup script for local environment files

echo "Setting up local environment files..."

# Create worker .dev.vars if it doesn't exist
if [ ! -f "apps/worker/.dev.vars" ]; then
  echo "Creating apps/worker/.dev.vars..."
  cat > apps/worker/.dev.vars << 'EOF'
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
DIRECT_URL="postgresql://user:password@host:5432/database?sslmode=require"
JWT_SECRET="dev-secret-key-change-this-in-production-min-32-chars"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-razorpay-webhook-secret"
WHATSAPP_TOKEN="your-whatsapp-token"
WHATSAPP_PHONE_NUMBER_ID="your-whatsapp-phone-number-id"
WHATSAPP_TEMPLATE_NAME="payment_reminder"
APP_BASE_URL="http://localhost:5173"
EOF
  echo "✓ Created apps/worker/.dev.vars"
else
  echo "✓ apps/worker/.dev.vars already exists"
fi

# Create web .env if it doesn't exist
if [ ! -f "apps/web/.env" ]; then
  echo "Creating apps/web/.env..."
  cat > apps/web/.env << 'EOF'
VITE_API_BASE_URL=http://localhost:8787
EOF
  echo "✓ Created apps/web/.env"
else
  echo "✓ apps/web/.env already exists"
fi

echo ""
echo "Environment files created!"
echo ""
echo "⚠️  IMPORTANT: Update the following files with your actual credentials:"
echo "   1. apps/worker/.dev.vars - Add your Neon database URL and API keys"
echo "   2. apps/web/.env - Should be fine as-is for local development"
echo ""

