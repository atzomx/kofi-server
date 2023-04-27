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
ENV PORT 5000
ENV MONGO_URL mongodb://localhost:27017/kofi-database
ENV JWT_SECRET aa94589d5c9ba798fd9ade7cd8b19ddb9528b34b
ENV JWT_EXPIRED_TIME 30

CMD ["node", "dist/index.js"]