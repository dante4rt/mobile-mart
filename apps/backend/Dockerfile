FROM oven/bun:1

WORKDIR /usr/src/app

USER root

RUN apt-get update -y && \
	apt-get install -y --no-install-recommends openssl=3.* libstdc++6=12.* && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*
RUN chown -R bun:bun /usr/src/app

USER bun

COPY bun.lockb package.json ./
COPY apps/backend/ ./

RUN bun install --frozen-lockfile && \
	bunx prisma generate && \
	bun run build

EXPOSE 3000

CMD ["bun", "dist/index.js"]