FROM debian:bullseye-slim

WORKDIR /usr/src/app

# Install bun
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends curl && \
    curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin/bun && \
    apt-get install -y --no-install-recommends openssl libstdc++6 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    ldconfig

# Create bun user
RUN useradd -ms /bin/bash bun && chown -R bun:bun /usr/src/app
USER bun

COPY bun.lockb package.json ./
COPY apps/backend/ ./

RUN bun install --frozen-lockfile && \
    bunx prisma generate && \
    bun run build

EXPOSE 3000

CMD ["bun", "dist/index.js"]