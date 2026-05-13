# 3 new "Why TechD" proposals in `/section-lab`

## Context

The `id="why"` section exists on every Solutions, Industries, and Services page via:
- `src/sections/solutions/WhyPracticeSection.tsx` — cyan-gradient hero card + 2×2 white tiles
- `src/sections/industries/WhyIndustrySection.tsx` — solid `secondary` (gray) hero card + 3 white tiles
- `src/sections/services/ServiceWhySection.tsx` — cyan-gradient hero card + 3 white tiles
- `src/components/shared/page/PageWhySection.tsx` — older bento (dark/light/accent/outline mix)

Structurally identical (featured headline + N supporting tiles), differentiated only by background fill (cyan gradient vs. solid gray). You want to break out of that pattern: less reliance on flat cyan/gray panels, more editorial / typographic / textural personality, while staying inside the locked brand palette.

## Where it lands

All 3 proposals will be **prepended** to the top of `src/pages/SectionLab.tsx` (above the existing "Solutions in this industry" experiments) inside a clearly labeled group: **"Why TechD — proposals"**. Existing variants stay untouched.

Each proposal is rendered with **real data** from `INDUSTRIES_EXTRAS["healthcare"].whyPoints` (already imported in the file) so you can judge with production copy. The `VariantShell` wrapper already in the file will be reused for consistent framing.

No content files are touched. No changes to live Solutions/Industries/Services pages until you pick a direction.

## The 3 proposals

### Proposal A — Editorial manifesto (typography-led, no color blocks)
- Two-column layout: left = oversized eyebrow + a single very large headline statement (`Why TechD`); right = a numbered list of points, each as `01 — Title` with body text on a hairline-divided rail.
- Background stays `bg-background` (white). Zero gradient fills. Color is reserved for: a single primary cyan vertical rule on the left margin, and the numerals.
- Reuses: `Reveal`, `SectionMarker`, `SectionHeading` (eyebrow only).
- Personality: Linear / Stripe long-form essay. Quiet, confident, all weight carried by typography.

### Proposal B — Featured quote + ledger
- Top: a large editorial pull-quote rendered as `text-secondary` body type at hero scale (no card, no fill) — the first `whyPoint.title` becomes the quote, body becomes the attribution-style sub-line.
- Below: a horizontal "ledger" of remaining points — 3 or 4 columns separated by hairlines (`divide-x divide-border`), each column = uppercase micro-label + short body. Looks like the back page of a magazine masthead.
- One subtle texture: a faint `SectionBackdrop` dot grid behind the quote at very low opacity. No solid color blocks.
- Personality: editorial / print, very different from the current "card-heavy" rhythm.

### Proposal C — Off-white inset frame with cyan corner accent
- Single full-bleed inset block in `bg-muted/30` (the warm off-white we already use), with internal `border border-border` rounded-2xl frame; *no* cyan or secondary fills.
- Inside the frame: SectionHeading at top; below it a 4-up grid of "spec card" tiles styled like technical data sheets — small monospace numeral, hairline top border, title in bold, body in light. On hover, the top hairline animates from left to right in primary cyan (the only place cyan appears).
- One small fixed corner detail: a 24px primary cyan corner bracket (`border-t-2 border-l-2`) anchored to the top-left of the frame as a single brand "stamp."
- Personality: technical / instrument-panel, similar feel to Vercel docs or Anthropic specs.

## Technical notes

- New code lives only in `src/pages/SectionLab.tsx`. Three new local components: `WhyProposalEditorial`, `WhyProposalQuote`, `WhyProposalSpec`.
- Data source: `INDUSTRIES_EXTRAS["healthcare"]?.whyPoints ?? []` (already imported). For the page-context label inside `SectionMarker`, use `"Why TechD — Lab"`.
- Strict palette: only `primary` (`#00B3E3`), `secondary`, `muted`, `border`, `background`. No raw hex, no new tokens.
- Reused primitives: `Reveal`, `SectionHeading`, `SectionMarker`, `SectionBackdrop` (Proposal B only), `cn`. No new shared components, no new dependencies.
- Each proposal is wrapped in the existing `VariantShell` for label + index consistency with the rest of the lab page.
- Respects `prefers-reduced-motion` (only existing `Reveal` motion is used; no new keyframes).

## Out of scope

- Editing the live `WhyPracticeSection` / `WhyIndustrySection` / `ServiceWhySection` / `PageWhySection`. Once you pick a direction in the lab, a follow-up will roll it into the shared component and retire the others.
- Content / copy changes in `src/content/`.
- New shared components — kept local to `SectionLab.tsx` until a winner is chosen.
