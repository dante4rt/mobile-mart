FROM oven/bun:1 AS base

WORKDIR /usr/src/app

USER root

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl=3.0.2-0ubuntu1.10 && \
    rm -rf /var/lib/apt/lists/*
RUN chown -R bun:bun /usr/src/app

USER bun

COPY bun.lockb ./bun.lockb
COPY apps/backend/package.json ./package.json

RUN bun install --frozen-lockfile --production

COPY apps/backend/ ./

RUN bunx prisma generate && \
	bun run build

EXPOSE 3000
CMD ["bun", "dist/index.js"]