## Goal

Replace the current Services "Why TechD" section (cyan gradient hero card + 3 supporting tiles) with the same pull-quote + clickable ledger pattern used on Solutions, so the Services pages match the editorial feel of `/solutions/ai-generative`.

## Changes

**1. Rewrite `src/sections/services/ServiceWhySection.tsx`**

Mirror `src/sections/solutions/WhyPracticeSection.tsx` exactly, with these adaptations:

- Props stay `{ service: Service }` (not `practice`).
- `SectionMarker` page label: `Services / ${service.name}`.
- Eyebrow: `Why TechD · ${service.name}`.
- Data source: `SERVICES_EXTRAS[service.id]?.whyPoints` (already exists — same `WhyPoint` shape).
- First point shown as the active pull-quote; remaining points become the clickable ledger row at the bottom.
- Carry over the exact behavior from the Solutions version:
  - `active` / `displayed` / `phase` state machine for soft cross-fade (200ms fade-out + 250ms fade-in, `prefers-reduced-motion` respected via `motion-reduce:` classes).
  - Timeout cleanup on unmount.
  - `border-y border-border py-6 md:py-16` ledger with `divide-y md:divide-x` between notes.
  - Same responsive type ramp: `text-2xl sm:text-3xl md:text-5xl lg:text-6xl` for the quote.
  - Same hover/focus styles on note buttons (cyan title hover, focus ring, subtle lift).

**2. No other files touched**

- `_ServicePage.tsx` already renders `<ServiceWhySection service={service} />` — no change.
- `services-extras.ts` already provides `whyPoints` for every service — no change.
- The old `HoverGridBackdrop` import is dropped from this file (no other usage to clean up).

## Out of scope

- No content edits to `services-extras.ts`.
- No changes to other Service sections (Hero, Methodology, Offerings, etc.).
- No changes to the Solutions version.