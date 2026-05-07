# Practice Hero Redesign — Editorial Typographic

Replace the current image-based hero on all 5 practice pages (`/solutions/ai-generative`, `/data-analytics`, `/automation-finops`, `/security-compliance`, `/hybrid-cloud`) with a compact, typography-first banner. No motif image. No primary CTAs.

## New layout (~50vh, single column, left-aligned, generous whitespace)

```text
[ ambient gradient backdrop, very subtle ]

  Solutions ─── AI & Generative                      ← eyebrow with cyan rule

  Ship trustworthy gen AI on top of                  ← H1 = practice.outcome
  governed enterprise data.                            (5xl/7xl, bold, tight leading)

  ─────────                                          ← short animated cyan accent stroke

  Production RAG, agentic workflows, and             ← lede (practice.description)
  conversational interfaces built on IBM
  watsonx — grounded in your data, governed
  from day one.

  Why this practice · Products · Industries · Approach   ← quick-jump anchors
```

## What changes

- `PracticeHeroSection.tsx`: rewrite to the layout above. Drop `PlexusMotif`, drop both buttons, drop the two-column grid. Keep `SectionMarker` and `GeometricAccent` (toned down).
- Add an animated cyan accent stroke (thin SVG line, 64px wide, slow draw-in via existing `Reveal` or a CSS keyframe) between H1 and lede.
- Add an inline anchor-link row beneath the lede with 4 links scrolling to: `#why`, `#products`, `#industries`, `#approach`. Small, muted text, primary on hover, separators are `·`.
- Add matching `id` attributes to `WhyPracticeSection`, `ProductsGridSection`, `IndustriesServedSection`, `ApproachSection`.
- Section becomes `min-h-[50vh]` with reduced vertical padding (`pt-16 pb-12 md:pt-20 md:pb-16`).
- `PRACTICE_MOTIFS` and `practice-motifs.ts` stay (still used elsewhere later) — no deletion.

## What stays

- All sections below the hero are unchanged.
- `PracticeCtaSection` still has the "Talk to an expert" CTA at the bottom of every page, so removing hero CTAs does not strand the page.

## Out of scope

- Changing the home hero, product detail hero, or any other page hero.
- New copy for outcome/description (reuses `SOLUTIONS` data).
- Per-practice color theming (kept neutral; cyan accent is shared).
