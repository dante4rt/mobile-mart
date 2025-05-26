FROM oven/bun:1 AS base

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate

RUN bun run build

EXPOSE 3000
CMD ["bun", "src/index.ts"]