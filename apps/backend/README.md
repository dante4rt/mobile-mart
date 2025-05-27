# MobileMart Backend

Backend API for MobileMart, a B2B used mobile phones marketplace built for the AKP Technical Test.

## Tech Stack

- Bun (runtime & package manager)
- Hono (backend framework)
- tRPC (API layer)
- Prisma (ORM)
- PostgreSQL (production), SQLite (local dev)
- Zod (schema validation)
- TypeScript
- JWT & bcrypt (authentication)
- NanoID, ULID (ID generation)
- ESLint, Prettier (lint/format)

## Features

- RESTful and tRPC endpoints
- Secure authentication (JWT, bcrypt)
- Product, user, and admin models
- Seed scripts for demo data
- Modular, commented codebase

## Getting Started

1. **Install dependencies:**

   ```sh
   bun install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in values (DB, JWT_SECRET, etc).

3. **Run migrations & seed:**

   ```sh
   bunx prisma migrate dev --name init
   bunx prisma db seed
   ```

4. **Start the server:**

   ```sh
   bun run dev
   ```

## Database Schema & Seeds

- Schema: [`prisma/schema.prisma`](./prisma/schema.prisma)
- Seed: [`src/db/seed.ts`](./src/db/seed.ts)

## Docker & Deployment

- Use root Dockerfile for Railway or local Docker.
- Set env vars in Railway dashboard for deployment.

## Code Quality

- Modular folder structure
- Consistent linting/formatting (ESLint, Prettier)
- Comments in code for key logic (see `src/api`, `src/db`, `src/utils`)

## Development Notes

- Used Bun for fast dev/build and monorepo support.
- Used tRPC for type-safe API and shared types.
- Used Prisma for type-safe DB access and easy migrations.
- Used JWT, bcrypt, NanoID, and ULID for secure, modern backend logic.
- Challenges: Bun native module support, Docker monorepo context, and Prisma with Bun.

## Assignment Reference

- [AKP Technical Test Brief](https://go.catamyst.com/akp-test)
- [GitHub Repo](https://github.com/dante4rt/mobile-mart)
- [Frontend README](../frontend/README.md)
- [Root README](../../README.md)
