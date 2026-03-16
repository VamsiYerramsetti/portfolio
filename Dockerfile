# Multi-purpose Dockerfile.
# Dev: docker compose up
# Export preview: docker compose --profile export up

FROM node:20-alpine AS base
WORKDIR /app

# Install deps first (better layer caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# We don't assume a lockfile exists; npm will generate one if needed.
RUN npm install --no-audit --no-fund || npm install --no-audit --no-fund

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
