FROM oven/bun:1 AS base

WORKDIR /usr/src/app

USER root
RUN apt-get update -y && apt-get install -y openssl
USER bun

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

RUN bun run build

EXPOSE 3000
CMD ["bun", "src/index.ts"]