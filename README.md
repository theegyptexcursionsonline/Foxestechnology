# Foxes Technology

Marketing website and AI-powered search experience for Foxes Technology — a booking and POS platform for tours & activities operators across Egypt and the GCC region.

## Tech stack

- **Framework:** Next.js 15 (App Router) with Turbopack
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS, Framer Motion
- **Search:** Algolia (autocomplete + React InstantSearch)
- **Data libs:** MongoDB / Mongoose, Firebase (installed)
- **Testing:** Vitest, Testing Library

## Features

- Marketing pages: home, about, pricing, contact, careers, docs, and solution pages
- Bilingual content with an English/Arabic route (`/ar`)
- Site-wide Algolia search with autocomplete and a `CMD/CTRL+K` search modal
- Full search results page with category filters and pagination
- Animated, mobile-first responsive UI
- Coming-soon lead-capture modal

## Getting started

### Prerequisites

- Node.js 20+
- pnpm (preferred; npm also works)

### Install

```bash
pnpm install
```

### Environment variables

Create `.env.local` with your Algolia credentials:

- `NEXT_PUBLIC_ALGOLIA_APP_ID`
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY`
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME`
- `ALGOLIA_ADMIN_API_KEY` (server-side, used for indexing)

### Scripts

```bash
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm algolia:upload   # Index searchable content to Algolia
pnpm test             # Run Vitest
pnpm test:coverage    # Run tests with coverage
```

## Project structure

```
app/          App Router pages, /ar locale, and API routes
components/   Reusable UI components
lib/          Algolia config, search data, i18n, currency helpers
scripts/      Algolia upload and tooling scripts
public/       Static assets
__tests__/    Vitest suites
```

## Deployment

Deploys to Netlify (`pnpm build`, publishes `.next`).
