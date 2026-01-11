#!/bin/bash
# Load environment variables from .dev.vars for Prisma commands

# Read .dev.vars and export variables
if [ -f .dev.vars ]; then
  export $(grep -v '^#' .dev.vars | xargs)
fi

# Execute the command passed as arguments
exec "$@"

