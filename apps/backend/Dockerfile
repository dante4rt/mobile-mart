FROM oven/bun:1 AS base

WORKDIR /usr/src/app

USER root
RUN apt-get update -y && apt-get install -y openssl
RUN chown -R bun:bun /usr/src/app

USER bun

COPY bun.lockb package.json ./
COPY apps/backend/ ./

RUN bun install --frozen-lockfile && \
    COPY . . && \
    bunx prisma generate && \
    bun run build && \
    bun run start

EXPOSE 3000
CMD ["bun", "dist/index.js"]