FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/mikro-orm.config.ts ./mikro-orm.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV NODE_ENV=production

CMD ["sh", "-c", "npm run mikro-orm migration:create && npm run mikro-orm migration:up && node dist/src/main.js"]