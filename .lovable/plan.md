## Goal

Replace the bespoke "Practice → product" section on `/company/ibm-partnership` with a presentation that reuses patterns already proven elsewhere on the site (Solutions practice pages, Home solutions grid), and rewrite the copy so it talks in terms of **solutions** — not "practices" — to match the rest of the marketing voice.

## Wording rules for this section

- Drop the word "practice" from headings, eyebrows, chips, and body copy. The four buckets become **solution areas** (or just "solutions").
- Keep the four bucket names exactly as they exist in `PRACTICE_AREAS` / `PORTFOLIO_BY_PRACTICE`: *AI & Generative Solutions*, *Data & Analytics*, *Automation & FinOps*, *Security & Compliance*.
- Practitioner-to-practitioner voice (per CLAUDE.md): no superlatives, no "world-class", no filler adjectives. Lead with concrete facts ("21 IBM products across four solution areas", "certified across watsonx, Db2, Guardium…").
- Eyebrow becomes `Solutions → products` (replaces `Practice → product`).
- Section heading stays factual: `Certified across {totalProducts} IBM products`.
- Per-card label `Practice 0X` → `Solution 0X`.
- "See the practice" link → `Explore the solution`.
- Hover-card "Open product" stays as-is.

## What to reuse

1. **`SectionHeading`, `SectionMarker`, `Reveal`** — already used; keep.
2. **`PracticeBadge`** — keep as the oversized ghost initial backdrop. It's already practice-agnostic (just renders 2-letter initials), so no rename needed.
3. **`HoverCard`** for product chip details — keep.
4. **Card pattern from `WHAT_PLATINUM_MEANS` block + Home `SolutionsGridSection` chip treatment** — adopt the same card chrome we already use elsewhere on this same page (numbered eyebrow `01`, bold title, hover border-primary, animated bottom underline) so the four solution-area cards visually rhyme with the "What Platinum means" grid directly above and the home solutions grid.
5. **Chip styling from `FlipCard` chips** (Home `SolutionsGridSection`) — same rounded-full bordered chip with hover lift and primary border, so the IBM page feels like a natural extension of the home grid rather than a one-off.
6. **`useProductMeta` hook** — keep; it's the right bridge between the flat `PORTFOLIO_BY_PRACTICE` strings and the typed `SOLUTIONS` product entries.
7. **CTA pattern** — each solution-area card gets the standard `Explore the solution →` link (matches the "See the practice" link style used elsewhere; arrow translates on hover).

## New section structure

Replace the current single-column stack of four wide rows with a **2×2 grid of solution-area cards** that mirrors the home `SolutionsGridSection` rhythm:

```text
┌──────────────────────────────────────┐
│ Eyebrow: Solutions → products        │
│ H2:      Certified across 21 IBM…    │
│ Sub:     One-line scope reference    │
│                                      │
│ Counter pill: 21 products · 4        │
│ solution areas · Hover any chip      │
│                                      │
│ ┌──────────────┐  ┌──────────────┐   │
│ │ Solution 01  │  │ Solution 02  │   │
│ │ AI & Gen…    │  │ Data & Anal… │   │
│ │ [PracticeBadge ghost initial]│   │
│ │ N certified products         │   │
│ │ [chips…]                     │   │
│ │ Explore the solution →       │   │
│ └──────────────┘  └──────────────┘   │
│ ┌──────────────┐  ┌──────────────┐   │
│ │ Solution 03  │  │ Solution 04  │   │
│ └──────────────┘  └──────────────┘   │
└──────────────────────────────────────┘
```

Why 2×2 instead of the current 1-up rows: matches the home solutions grid and the "What Platinum means" 4-up directly above on the same page; reads faster; gives every solution area equal visual weight.

## Technical changes

- File: `src/pages/company/IBMPartnership.tsx` only.
- Section markup swapped from `space-y-3` rows to `grid gap-6 md:grid-cols-2`.
- Card markup borrowed from the existing "What Platinum means" card on this same page (consistent border, hover border-primary, animated bottom underline) plus the chip-list pattern.
- Chip rendering logic (HoverCard wrap when `meta?.tagline` exists, internal `Link` when `meta?.href` exists) — keep as-is; only the wrapping card and copy strings change.
- All copy strings touched:
  - `eyebrow="Practice → product"` → `eyebrow="Solutions → products"`
  - Counter pill `{count} practices` → `{count} solution areas`
  - Per-card `Practice 0{i+1}` → `Solution 0{i+1}`
  - Per-card `{n} certified products` — kept
  - Per-card link `See the practice` → `Explore the solution`
- No changes to `src/content/about.ts` (the `PORTFOLIO_BY_PRACTICE` constant name stays; only user-facing strings change).
- No changes to `PracticeBadge.tsx`, `SectionHeading`, `Reveal`, `HoverCard`, or any shared component.
- No new dependencies, no new files.

## Out of scope

- Renaming the `PORTFOLIO_BY_PRACTICE` / `PRACTICE_AREAS` constants or the `PracticeBadge` component (internal naming, no user impact — leave for a future rename pass).
- Any change to other sections on the page (Credential, What Platinum means, AI Operating Model, Quick Start Advisory).
- Any change to home, solutions, services, or industries pages.