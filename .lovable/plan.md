## Goal

On every product detail page (e.g. `/solutions/ai-generative/watsonx-ai`, `/solutions/data-analytics/db2`):

- **Remove** the two buttons in the hero: "Talk to an expert" and "View all {practice} products".
- **Add** the same wireframe figure used on the parent practice's main banner, on the right side of the hero.
- Keep the bottom "Ready to get started?" CTA section unchanged — it stays site-wide.

## How it fits the existing architecture

There is already a one-stop component for this:

- `src/sections/solutions/_components/PracticeFigure.tsx` selects the right figure per `practice.id` (AI & Generative → `AiGenerativeFigure`, Data & Analytics → `DataAnalyticsFigure`, Automation → `AutomationFinOpsFigure`, Security → `SecurityComplianceFigure`, Hybrid Cloud → `HybridCloudFigure`).
- The practice landing pages already use it via `PageHero` — same shape we want here.

So one change in `ProductHeroSection.tsx` covers all 20 product pages automatically — no per-product work.

## Changes

**1. `src/sections/products/ProductHeroSection.tsx` — rewrite to a two-column hero**

- Left column (existing copy): breadcrumb, eyebrow (practice name), H1 (product name), tagline. **Buttons removed.**
- Right column (new): `<PracticeFigure practiceId={practice.id} />` inside a hidden-on-mobile slot, wrapped with the same masking + cyan washes the practice hero uses (so it blends, doesn't look pasted in).
- Pattern mirrors `PageHero` / `PageHeroBackdrop` — reuse those primitives instead of duplicating the figure framing. The cleanest path is: stop hand-rolling the hero markup here and switch to `PageHero`, passing `figure={<PracticeFigure practiceId={practice.id} />}`. That gives us the standardized backdrop, grid, and figure slot for free, matching the practice page exactly.
- Page label / breadcrumb props: `pageLabel="Product / {product.name}"`, `parent={practice.name}` (linking back to the practice page), `child={product.name}`. The existing `PageHero` already handles the "parent / child" eyebrow.

**2. No other files change.**

- `ProductDetail.tsx` — unchanged (still composes the same 4 sections).
- `ProductCtaSection.tsx` — **unchanged**. Keeps the bottom "Talk to an expert" closer.
- `ProductOverviewSection.tsx`, `ProductUseCasesSection.tsx` — unchanged.

## Notes

- The hero CTAs were the *only* "Talk to an expert" entry above the fold on product pages. Bottom CTA is preserved per your answer, so the site-wide pattern holds.
- Existing `PageHero` exposes `headlineSize` and `maxWidth` props, so we can dial the H1 to match the current product look (a touch smaller than the practice page) if needed.
- Mobile: figure stays hidden below `md`, same as every other `PageHero` usage — no layout regression.
- Accessibility: figure is decorative (already `aria-hidden` inside `WireframePanel`), so removing the buttons doesn't strip any meaningful interaction; the bottom CTA covers the conversion path.

## Verification

After the change, spot-check one product page per practice:

- `/solutions/ai-generative/watsonx-ai` → spherical neural mesh figure
- `/solutions/data-analytics/db2` → Data & Analytics figure
- `/solutions/automation-finops/...` → Automation figure
- `/solutions/security-compliance/...` → Security figure
- `/solutions/hybrid-cloud/...` → Hybrid Cloud figure

Confirm: hero buttons gone, figure present on the right, bottom CTA still there.
