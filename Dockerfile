# Install dependencies only when needed
FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile --production

# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prod:build

# Production image, copy all the files and run node
FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 graphql

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN chown -R graphql:nodejs ./dist

USER graphql

EXPOSE 5000
ENV PORT ${PORT}
ENV MONGO_URL ${MONGO_URL}
ENV JWT_SECRET ${JWT_SECRET}
ENV JWT_EXPIRED_TIME {JWT_EXPIRED_TIME}
ENV REDIS_HOST ${REDIS_HOST}
ENV REDIS_PORT ${REDIS_PORT}

CMD ["node", "dist/index.js"]