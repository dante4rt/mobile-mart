FROM oven/bun:1

WORKDIR /usr/src/app

USER root
RUN apt-get update -y && apt-get install -y openssl libstdc++6
RUN chown -R bun:bun /usr/src/app

USER bun

COPY bun.lockb package.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/ ./apps/backend/

WORKDIR /usr/src/app/apps/backend

RUN bun install --frozen-lockfile
RUN bunx prisma generate
RUN bunx tsc -p tsconfig.json

EXPOSE 3000
CMD ["bun", "dist/index.js"]
