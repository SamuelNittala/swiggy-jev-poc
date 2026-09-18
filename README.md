# Swiggy × Jev POC

A small dine-in restaurant recommendation app. The current step is a **local input
form and preference preview**: it does not connect to Swiggy or TypeSafe, collect
credentials, or return restaurant recommendations.

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

Open http://localhost:3000. No API keys are needed for this step.

## Try the form

1. Choose a demo location (Indiranagar or Koramangala, Bengaluru).
2. Enter a positive whole-rupee target budget for two, such as `1000`.
3. Enter a single search concept, such as `Chinese`, or click an example chip.
4. Optionally add preferences such as `Quiet, preferably outdoors`.
5. Click **Preview preferences** to review the validated input.

Editing any field clears the previous preview; **Clear form** resets all fields.
Values stay in browser memory and are lost on reload. No API request is sent.
Required-field errors are associated with their controls; invalid submissions
focus the first invalid field.

The location selector is deliberately a demo, not a geocoder. Its two coordinates
come from the [Swiggy search reference](https://mcp.swiggy.com/builders/docs/reference/dineout/search_restaurants_dineout/).
Live location lookup will replace it in a later step. Budget is labelled as a
target, not a hard maximum or guaranteed bill. The form guides users to enter a
single search concept but does not attempt semantic query parsing.

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
  page.tsx         Landing page with the discovery form
  page.test.tsx    Landing-page smoke test
  globals.css      Base styles and responsive layout
src/features/discovery/
  preferences.ts           Pure validation and typed preference data
  preferences.test.ts      Validation tests
  search-form.tsx          Client-side input form and preview
  search-form.test.tsx     Interaction tests using Testing Library and jsdom
```

## Planned boundaries

1. **UI:** location selection, budget for two, one Swiggy search term, and optional
   free-text preferences.
2. **Server-side adapters:** Swiggy MCP search and TypeSafe/Jev evaluation.
   Credentials must remain server-side, never in `NEXT_PUBLIC_*` variables.
3. **Pure application functions:** validate inputs, apply budget rules, and rank
   candidates from restaurant facts and evidence-aware preference judgments.

Remaining modules will be added when implemented, rather than as empty abstractions.
Swiggy will supply restaurant facts; Jev will assess subjective preference fit
only where evidence is available. Unknown attributes must remain unknown.
Restaurant details will be fetched only after a user selects a search result.
Booking and payment are outside the POC scope.
