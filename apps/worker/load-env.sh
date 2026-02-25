#!/bin/bash
# Load environment variables from .dev.vars for Prisma commands and wrangler dev

# Read .dev.vars and export variables
if [ -f .dev.vars ]; then
  export $(grep -v '^#' .dev.vars | xargs)
  # Emulate Hyperdrive locally: wrangler dev needs this to connect to DB
  # Set both env var names (Wrangler uses WRANGLER_*, docs mention CLOUDFLARE_*)
  if [ -n "$DATABASE_URL" ]; then
    [ -z "$WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE" ] && export WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="$DATABASE_URL"
    [ -z "$CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE" ] && export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="$DATABASE_URL"
  fi
fi

# Execute the command passed as arguments
exec "$@"

