# Swiggy × Jev POC

A small dine-in restaurant recommendation app. This first step is **scaffolding
only**: it does not connect to Swiggy or TypeSafe, collect credentials, or return
restaurant recommendations.

## Stack

- Next.js App Router, React, and strict TypeScript
- Plain CSS, with no component library
- ESLint and Vitest
- Node.js 22.13+ or 24+ (`.nvmrc` selects Node 22)

ESLint is pinned to 9 because the current Next.js React lint plugin is not
compatible with ESLint 10. npm reports ESLint 9 as deprecated; revisit this pin
when the plugin supports ESLint 10.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. No API keys are needed for the scaffold.

## Validate

```sh
npm run check
npm run build
```

`check` runs linting, type-checking, and tests. `npm run start` serves a production
build after `npm run build`. Use `npm run test:watch` during development.

## Current structure

```text
src/app/
  layout.tsx       Root document and metadata
  page.tsx         Static landing page
  page.test.tsx    Landing-page smoke test
  globals.css      Base styles and responsive layout
```

## Planned boundaries

1. **UI:** location selection, budget for two, one Swiggy search term, and optional
   free-text preferences.
2. **Server-side adapters:** Swiggy MCP search and TypeSafe/Jev evaluation.
   Credentials must remain server-side, never in `NEXT_PUBLIC_*` variables.
3. **Pure application functions:** validate inputs, apply budget rules, and rank
   candidates from restaurant facts and evidence-aware preference judgments.

These modules will be added when implemented, rather than as empty abstractions.
Swiggy will supply restaurant facts; Jev will assess subjective preference fit
only where evidence is available. Unknown attributes must remain unknown.
Restaurant details will be fetched only after a user selects a search result.
Booking and payment are outside the POC scope.
