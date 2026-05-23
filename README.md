# Zylo Avenue Frontend

Modern storefront and admin frontend for **Zylo Avenue**, built with Next.js App Router.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- React Query
- Zustand
- React Hook Form + Zod
- Axios

## Features

- Public storefront pages
- Product listing and product detail views
- Cart and checkout flow
- Login flow with token-based auth
- Admin shell and dashboard routes
- Shared UI primitives and API helpers

## Prerequisites

- Node.js 20+
- npm

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Environment variables

Create a `.env.local` file if you need to point the frontend at a different API:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

If `NEXT_PUBLIC_API_URL` is not set, the app falls back to `http://localhost:8080`.

## Project structure

```text
src/
  app/        App Router pages and layouts
  components/ Shared UI and page components
  lib/        API clients and utilities
  store/      Zustand state
```

## Notes

- The frontend expects a backend API that serves the catalog, auth, and order endpoints.
- Cart and auth state are persisted locally in the browser.
