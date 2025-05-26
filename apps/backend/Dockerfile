FROM oven/bun:1

WORKDIR /usr/src/app

USER root

RUN apt-get update -y && apt-get install -y openssl
RUN chown -R bun:bun /usr/src/app

USER bun

COPY bun.lockb package.json ./

RUN bun install --frozen-lockfile

COPY apps/backend/ ./

RUN bunx prisma generate
RUN bun run build

EXPOSE 3000

CMD ["bun", "dist/index.js"]