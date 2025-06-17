# INSTALL ALL DEPENDENCIES
FROM node:23-alpine3.21 AS deps 
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-workspace.yaml ./
COPY pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile --prod=false

# COMPILE SOURCE CODE
FROM node:23-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Compile TypeScript seed file (only if needed in production)
RUN npx tsc prisma/seed.ts --target ES2017 --module commonjs --esModuleInterop --skipLibCheck

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm build

# Production image - use minimal Alpine
FROM node:23-alpine3.21 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create system group and user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Clean up Alpine package cache and unnecessary files
RUN rm -rf /var/cache/apk/* \
    && rm -rf /tmp/* \
    && rm -rf /root/.npm \
    && rm -rf /root/.cache \
    && rm -rf /usr/local/share/.cache

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy minimal Prisma files, only those that are needed at runtime
COPY --from=builder --chown=nextjs:nodejs /app/src/generated/client ./src/generated/client
COPY --from=builder --chown=nextjs:nodejs /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma/init.sh ./prisma/init.sh
COPY --from=builder --chown=nextjs:nodejs /app/prisma/seed.js ./prisma/seed.js

# Switch to non-root user for security, ensuring the app runs with limited permissions
RUN chown -R nextjs:nodejs /app && \
    chmod +x ./prisma/init.sh
    
USER nextjs
# Test for action
CMD ["sh", "-c", "sh prisma/init.sh && node server.js"]
