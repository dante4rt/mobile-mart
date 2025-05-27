# MobileMart

A full-stack B2B used mobile phones marketplace, inspired by Alibaba.com, built for the AKP Technical Test.

## Tech Stack

- Bun (runtime & package manager)
- React (with React Router v7), Vite, Tailwind CSS, shadcn/ui (frontend)
- Hono (backend framework)
- tRPC (API layer)
- Prisma (ORM)
- PostgreSQL (production DB), SQLite (local dev)
- Zod (schema validation)
- Docker & Docker Compose
- Biome, ESLint, Prettier (lint/format)
- Railway (deployment)
- Monorepo (Bun workspaces)

## Features

- List, search, filter, and view details for used mobile phones
- Responsive, accessible UI (mobile/tablet/desktop)
- Authentication (JWT, bcrypt)
- Admin dashboard (optional)
- Seeded with 10+ realistic products
- Modular, commented codebase

## Getting Started

1. **Clone repo & install dependencies:**

   ```sh
   git clone https://github.com/dante4rt/mobile-mart.git
   cd mobile-mart
   bun install
   ```

2. **Set up environment variables:**

   - Copy `apps/backend/.env.example` to `apps/backend/.env` and fill in values.

3. **Run database migrations & seed:**

   ```sh
   cd apps/backend
   bunx prisma migrate dev --name init
   bunx prisma db seed
   ```

4. **Start backend & frontend:**

   ```sh
   bun run dev # in apps/backend and apps/frontend
   ```

5. **Build & deploy with Docker:**

   - See Dockerfile at root for monorepo/Railway support.

## Database Schema & Seeds

- See `apps/backend/prisma/schema.prisma` and `apps/backend/src/db/seed.ts`.

## Deployment

- Railway, Vercel, Neon, or any Docker-compatible host.
- See each app's README for details.

## Code Quality

- Modular folder structure
- Consistent linting/formatting (Biome, ESLint, Prettier)
- Comments in code for key logic

## Development Notes

- Used Bun for fast dev/build and monorepo support.
- Used tRPC for type-safe API and shared types.
- Used Prisma for type-safe DB access and easy migrations.
- Used Tailwind and shadcn/ui for modern, accessible UI.
- Challenges: Bun native module support, Docker monorepo context, and full mobile responsiveness.

## Assignment Reference

- [AKP Technical Test Brief](https://go.catamyst.com/akp-test)
- [Frontend README](./apps/frontend/README.md)
- [Backend README](./apps/backend/README.md)
