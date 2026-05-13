## Goal

Lift the visual quality of the new `/services/*` sections — Spotlight, Offerings, Methodology, Product Coverage, Cross-links — so the page reads with rhythm and weight instead of five similar light-cards-on-pale-grey blocks in a row.

**Untouched (already on-brand):**
- **Hero** — keep as-is.
- **Why TechD** — keep as-is.
- **CTA** — keep as-is.

## Current visual rhythm (the problem)

```text
Hero            → primary cyan + r3f figure          ✅ keep
Why TechD       → cyan gradient hero card + 3 tiles  ✅ keep
Spotlight       → light bg, 2-col text + tile grid   ⚠ flat
Offerings       → muted/30 bg, light card grid       ⚠ same as Spotlight
Methodology     → muted/30 bg, numbered tile grid    ⚠ same as Offerings
Product Coverage → muted/30 bg, white table          ⚠ third muted/30 in a row
Cross-links     → light bg, 4 small tiles            ⚠ flat
CTA             → DarkGlowPanel                      ✅ keep
```

Five consecutive "light card on pale background" sections between Why and CTA. No dark beat. The most informationally dense block (Coverage) carries the least visual weight.

## Target rhythm

```text
Hero                                                 ✅ unchanged
  → Why TechD                                        ✅ unchanged
  → Spotlight             LIGHT — editorial split    🔵 new layout
  → Offerings             LIGHT — catalog list       🔵 new layout
  → Methodology           DARK  — DarkGlowPanel sec. ⚫ new
  → Product Coverage      LIGHT — engineered grid    🔵 upgraded
  → Cross-links           DARK  — compact dark rail  ⚫ new
  → CTA                                              ✅ unchanged
```

Two dark beats (Methodology, Cross-links) frame the densest light beat (Coverage). No new colors introduced.

## Section-by-section design moves

### 1. Spotlight — editorial split, not a tile grid

- Drop the right-side 2×2 bullet grid.
- 12-col editorial layout: left = eyebrow + huge headline + lede + the numbered "what happens next" rail (already in `spotlight.next`).
- Right = a single oversized "deliverable card" — promote one bullet (e.g. for Advisory: "What we deliver — written report") as the hero artifact, with subtle engineered-grid backdrop and a corner ghost numeral.
- Remaining bullets render as a 3-up hairline-separated typography strip below — no boxes.
- Cues: Stripe-style ghost numerals, primary cyan top hairline reveal on hover, generous whitespace.

### 2. Offerings — engagement catalog, not equal cards

- Replace the equal 2-col grid with a vertical catalog list inside a single rounded card: each engagement is a full-width row with `name` left, `duration` chip mid, `summary` right, hairline-separated.
- Hover: row gains a left primary cyan rule + content shifts 2px right.
- Reads like a service menu — buyer can scan duration column in one pass.

### 3. Methodology — DARK section, the centerpiece

- New shared primitive `DarkSection` wraps `DarkGlowPanel`'s gradient/shimmer/blob system as a full-bleed section (today DarkGlowPanel only handles cards).
- Inside: 4-step grid styling but tones inverted — translucent cards on dark surface, primary cyan numeric markers, hairline connector animation between steps on desktop.
- Eyebrow + heading get the cyan/white treatment from DarkGlowPanel CTA.

### 4. Product Coverage — engineered backdrop + better row anatomy

- Stay light, but add a `SectionBackdrop intensity="soft"` so the densest section doesn't sit on flat muted/30.
- Row anatomy: practice cell becomes a small left rail with an oversized 2-letter ghost initial (AI / DA / AF / SC) plus the practice name; products list becomes pill chips with subtle borders, aligned in tidy rows.
- Add a count badge per row ("12 platforms") as a scanning anchor.
- Typography-only column header row ("Practice" · "What we {assess|implement|manage|train on}") — no chrome.

### 5. Cross-links — DARK compact rail

- Convert from light tiles to a dark band: 4-up at lg, 2-up at md, single row.
- Each tile keeps the kind chip (Service / Practice), label, blurb, ArrowUpRight — on dark surface with primary cyan hairline on hover.
- Acts as a visual transition into the dark CTA below; uses a slightly softer dark tone than CTA so the two read as a sequence, not a monolith.

## Reusable additions (used beyond services later)

- `src/components/shared/DarkSection.tsx` — full-bleed dark section wrapper using DarkGlowPanel's gradient + shimmer + blob system. Variants: `vivid` | `soft`.
- `src/components/shared/PracticeBadge.tsx` — 2-letter ghost initial badge for the 4 practice areas. Reusable on /solutions tiles later.
- Extend `SectionBackdrop` with optional `tone="dark"` (default light, no behavior change for existing call sites).
- Extend `PageApproachSection` with optional `tone="dark"` so Methodology can keep using the shared component.

## File-level changes

**New files**
- `src/components/shared/DarkSection.tsx`
- `src/components/shared/PracticeBadge.tsx`

**Edited section components (visual only — no content/data changes)**
- `src/sections/services/ServiceSpotlightSection.tsx`
- `src/sections/services/ServiceOfferingsSection.tsx`
- `src/sections/services/ServiceMethodologySection.tsx`
- `src/sections/services/ServiceProductCoverageSection.tsx`
- `src/sections/services/ServiceCrossLinksSection.tsx`

**Edited shared (additive only)**
- `src/components/shared/SectionBackdrop.tsx` — optional `tone` prop.
- `src/components/shared/page/PageApproachSection.tsx` — optional `tone="dark"`.

**Not touched**
- Hero (`ServiceHeroSection.tsx`), Why (`ServiceWhySection.tsx`), CTA (`ServiceCtaSection.tsx`).
- `src/content/services.ts`, `src/content/services-extras.ts`.
- Routes, navigation, Solutions/Industries/Resources pages.

## Out of scope

- No new colors, fonts, or motion library. Tailwind + existing motion patterns + `prefers-reduced-motion` respected.
- No new dependencies.
- Solutions/Industries/Resources styling untouched (new shared primitives are *available* for them later but not retrofitted in this pass).
