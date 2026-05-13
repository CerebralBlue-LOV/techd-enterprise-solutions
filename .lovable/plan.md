# 3 more "Why TechD" proposals — compact, divider-led, with subtle backdrops

## Goals from your direction

- Keep the existing W1/W2/W3 untouched.
- Add **3 new proposals (W4, W5, W6)** with distinct personalities.
- Stay **compact** — these sit right under the page hero, so they should feel like a confident "second beat", not a second hero.
- Use **lines / dividers / hairlines** as the dominant structural device (not cards or fills).
- Reuse the **dot-grid particle backdrop** from W2 in at least one new proposal, and try other subtle backdrops (e.g. existing `SectionBackdrop` engineered grid, faint diagonal hatch).
- Strict brand palette only — `primary`, `secondary`, `muted`, `border`, `background`. No raw hex.

## Where it lands

All 3 new proposals are appended to the "Why TechD — proposals" group at the top of `src/pages/SectionLab.tsx`, immediately after W3, before the existing 01-07. They use the same `VariantShell` framing and the same `WHY_POINTS` data already defined in the file.

## The 3 new proposals

### W4 — Horizontal rail (4-up, divider-led)
- Single row layout. Eyebrow + small section title sit on a top hairline. Below: a 4-column grid where each column is a `whyPoint` separated by **vertical hairlines** (`md:divide-x divide-border`).
- Each column: small mono numeral (`01`) on top, bold short title, light body. No background fills, no cards.
- Bottom hairline closes the section. Total visible height stays well under one screen — pure "data row" feel.
- Backdrop: faint `SectionBackdrop intensity="soft"` (existing component) — engineered grid + drifting cyan blob, very low opacity, gives the rail some atmosphere without competing.
- Personality: a Bloomberg/FT-style data strip. Maximum density per pixel.

### W5 — Diagonal stack with running rule
- Vertical list, each row is a single line of structure: left = micro number + uppercase tag, middle = bold title, right = body text — separated by horizontal hairlines (`divide-y divide-border`).
- A **single primary cyan vertical "running rule"** spans the full height on the left edge of the title column, tying all rows together visually (the cyan line *is* the design).
- On row hover, the row slides 2px right and the title shifts to `text-primary` — only motion in the section.
- Backdrop: the **same dot-grid particle pattern from W2**, but masked to the upper-left corner only so it acts as an "incoming" texture.
- Personality: Linear changelog meets Anthropic spec table. Compact, scannable, very type-driven.

### W6 — Asymmetric split with diagonal hatch backdrop
- Two-column split (5/7): **left** = sticky-feeling tall block holding the eyebrow + title + a single short "credentials line" (e.g. `IBM Platinum · 25+ years`); **right** = the four `whyPoints` rendered as a vertical list, each separated by hairlines.
- Connector: a single horizontal cyan hairline runs across the full width *behind* both columns at the title baseline, tying them.
- Backdrop: a faint **diagonal hatch pattern** (45° linear-gradient stripes at very low opacity, masked with a radial fade) — new but built inline with brand tokens, no new files.
- Each right-side row uses a small `→` indicator that animates on hover (`group-hover:translate-x-1`).
- Personality: editorial split layout. Frames the section as a statement + supporting evidence, very different rhythm from the symmetric grids in W1/W3.

## Technical notes

- All three are local components in `src/pages/SectionLab.tsx`: `WhyProposalRail`, `WhyProposalRunningRule`, `WhyProposalSplit`.
- Reuses already-imported `cn`, `Reveal`, `SectionHeading` (where useful), and the existing `WHY_POINTS` / `WHY_TITLE` constants.
- New import: `SectionBackdrop` from `@shared/SectionBackdrop` (used in W4 only).
- The dot-grid pattern in W5 is the same inline `radial-gradient(hsl(var(--border)) 1px, transparent 1px)` snippet from W2 — copied locally, not extracted, to keep the lab self-contained until a winner is picked.
- Diagonal hatch in W6: inline `repeating-linear-gradient(45deg, hsl(var(--border)/0.5) 0 1px, transparent 1px 14px)` with a radial mask. No new tokens.
- Compact vertical rhythm: each proposal targets ~`py-12 md:py-14` (vs. ~`py-16 md:py-20` for W1/W2). Titles top out at `text-2xl md:text-3xl` (vs. up to `text-6xl` in W2). They will read as "supporting beat after hero", not as a second hero.
- Respects `prefers-reduced-motion` (only `Reveal` + simple `transition-transform` / `transition-colors`; no keyframes).
- Three new `VariantShell` entries (W4 / W5 / W6) added in order after W3.

## Out of scope

- Editing the live `WhyPracticeSection` / `WhyIndustrySection` / `ServiceWhySection` / `PageWhySection`.
- Extracting any of the proposals into a shared component — that happens after you pick a winner.
- Touching `src/content/`.
