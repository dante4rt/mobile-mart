# MobileMart Frontend

Frontend for MobileMart, a B2B used mobile phones marketplace built for the AKP Technical Test.

## Tech Stack

- Bun (runtime & package manager)
- React (with React Router v7)
- Vite
- Tailwind CSS & shadcn/ui
- tRPC (API layer)
- Zod (schema validation)
- TypeScript
- Biome, ESLint, Prettier (lint/format)

## Features

- Responsive, mobile-first UI
- Product grid, details, search, filter, and sort
- Authentication and profile pages
- Admin dashboard (optional)
- tRPC for type-safe API calls
- Shared types with backend

## Getting Started

1. **Install dependencies:**

   ```sh
   bun install
   ```

2. **Start the dev server:**

   ```sh
   bun run dev
   ```

   App runs at [http://localhost:5173](http://localhost:5173)

## Build & Deploy

- **Build:**

  ```sh
  bun run build
  ```

- Deploy `dist/` to Vercel, Railway, or any static host.
- Use root Dockerfile for full-stack Docker/Railway deployment.

## Database Schema & Seeds

- See [`../backend/prisma/schema.prisma`](../backend/prisma/schema.prisma) for the Product model and other tables.
- Seed script: [`../backend/src/db/seed.ts`](../backend/src/db/seed.ts) (at least 10 realistic phone entries).

## Code Quality

- Modular folder structure
- Consistent linting/formatting (Biome, ESLint, Prettier)
- Comments in code for key logic (see `src/components`, `src/pages`)

## Development Notes

- Used Bun for fast dev/build and monorepo support.
- Used tRPC for type-safe API calls and shared types.
- Used Tailwind and shadcn/ui for modern, accessible UI.
- Ensured all main actions/buttons are large and touch-friendly for mobile/tablet.
- Challenges: Bun native module support, Docker monorepo context, and full mobile responsiveness.

## Assignment Reference

- [AKP Technical Test Brief](https://go.catamyst.com/akp-test)
- [GitHub Repo](https://github.com/dante4rt/mobile-mart)
- [Backend README](../backend/README.md)
- [Root README](../../README.md)

---

> For full-stack setup and deployment, see the main repo README. Key UI logic is commented in the codebase.
