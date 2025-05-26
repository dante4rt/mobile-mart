FROM oven/bun:1

WORKDIR /usr/src/app

USER root

RUN apt-get update -y && apt-get install -y openssl
RUN chown -R bun:bun /usr/src/app

USER bun

COPY ../../bun.lockb ../../package.json ./
COPY . .

RUN bun install --frozen-lockfile

RUN bunx prisma generate
RUN bun run build

EXPOSE 3000

CMD ["bun", "dist/index.js"]