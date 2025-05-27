FROM oven/bun:1

WORKDIR /usr/src/app

USER root
RUN apt-get update -y && apt-get install -y openssl libstdc++6

COPY bun.lockb package.json ./
COPY tsconfig.base.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/ ./apps/backend/

RUN chown -R bun:bun /usr/src/app

USER bun

WORKDIR /usr/src/app/apps/backend

RUN bun install
RUN bunx prisma generate
RUN bunx tsc -p tsconfig.json

EXPOSE 3000
CMD ["bun", "dist/index.js"]
