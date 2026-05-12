# Improve AI & Generative product detail pages

Scope: only the four product detail pages under `/solutions/ai-generative/*` (NeuralSeek, watsonx.ai, watsonx, watsonx Orchestrate). Practice and other practices stay untouched.

## What I found

Right now the same dark animated cyan-on-secondary panel (rotating conic shimmer + 3 drifting blobs + dotted overlay) is duplicated in two places:

- `src/sections/solutions/ProductsGridSection.tsx` (featured product carousel, full-fidelity)
- `src/components/shared/page/PageFinalCtaSection.tsx` (final CTA, lower-opacity variant)

Both build the same layer stack inline. There is no shared primitive — duplicated CSS is the reason every section that wants this look re-implements it.

The four product detail pages are fully data-driven through `ProductDetail` in `src/content/solutions.ts` and rendered by:

- `ProductHeroSection` — light, breadcrumb + title + tagline
- `ProductOverviewSection` — 2-col: prose left, numbered capabilities list right
- `ProductUseCasesSection` — light grey 4-up card grid
- `ProductWhyTechDSection` — 2-col: bulleted points + stat callouts
- `ProductCtaSection` — already uses the dark panel via `PageFinalCtaSection`

Visual rhythm today: light → light → light(grey) → light → dark CTA. It's flat. Adding one dark panel mid-page (Key Capabilities) breaks the monotony and earns its weight, especially since capabilities are the densest, most scannable list on the page.

## Step 1 — Extract the shared dark panel

New file: `src/components/shared/DarkGlowPanel.tsx`

A single primitive that owns the cyan-on-secondary background system (the gradient base + conic shimmer + 3 animated blobs + dotted overlay + ring + shadow). Pure presentational wrapper — children render on top.

```tsx
interface Props {
  children: React.ReactNode;
  /** "vivid" = featured-card intensity, "soft" = CTA intensity. Default "soft". */
  intensity?: "vivid" | "soft";
  className?: string;          // outer wrapper extras
  rounded?: string;            // override radius (default rounded-3xl)
}
```

Two intensities so we keep both existing looks:
- `vivid` matches `ProductsGridSection` featured card (blob alphas ~0.75–0.9, shimmer 0.5–0.7)
- `soft` matches `PageFinalCtaSection` (blob alphas ~0.3–0.4, shimmer ~0.25–0.35)

Respects `prefers-reduced-motion` (already handled via `motion-reduce:[&_*]:!animate-none`).

Then refactor the two existing call-sites to use `<DarkGlowPanel intensity="vivid">` and `<DarkGlowPanel intensity="soft">` so we delete ~80 lines of duplicated JSX without any visual change. Verify by eye on `/solutions/ai-generative` (featured card) and the CTA at the bottom.

## Step 2 — Redesign Key Capabilities (AI & Generative product pages only)

Replace the current right-column numbered list inside `ProductOverviewSection`. New layout:

- The Overview section stays a 2-col light section — prose left, but the right column becomes a compact "At a glance" panel (eyebrow + 2–3 bullet highlights + vendor link). This keeps the section calm.
- Pull **Key Capabilities** out into its own dedicated full-width section between Overview and Use Cases.
- That new section uses `<DarkGlowPanel intensity="vivid">` as the background.
- Inside the panel: eyebrow + headline + a 2-column list of capabilities. Each row = mono index `01`, `02`… in `text-white/40`, capability text in `text-white` with `font-light leading-relaxed`, separated by `divide-y divide-white/10`. No icons, no boxes — same typography-led discipline as the rest of the site, just inverted on dark.

```text
┌────────── DarkGlowPanel (vivid) ─────────────┐
│ KEY CAPABILITIES                             │
│ What NeuralSeek delivers in production       │
│                                              │
│ 01  Automated RAG against 40+ LLMs ...       │
│ 02  Cited, fact-checkable responses ...      │
│ 03  mAIstro multi-agent canvas ...           │
│ ...                                          │
└──────────────────────────────────────────────┘
```

New file: `src/sections/products/ProductCapabilitiesSection.tsx`. `ProductOverviewSection` is trimmed to just the prose + at-a-glance side panel.

Wired only on AI & Generative product pages. Easiest gate: add the new section to `ProductDetail.tsx` conditionally on `solution.id === "ai-generative"` so the other 3 practices keep the existing single-section overview until you greenlight rollout. (Once approved we can promote it to all practices in one edit.)

## Step 3 — Stop here, regroup

You said start with one. After Step 2 you'll see the dark Key Capabilities panel live on the 4 AI pages. Then we decide separately how to refresh Overview / Use Cases / Why TechD — the shared `DarkGlowPanel` will already exist so any future sections that want this treatment are a one-liner.

## Files

**New**
- `src/components/shared/DarkGlowPanel.tsx`
- `src/sections/products/ProductCapabilitiesSection.tsx`

**Modified**
- `src/sections/solutions/ProductsGridSection.tsx` — swap inline layers for `<DarkGlowPanel intensity="vivid">`
- `src/components/shared/page/PageFinalCtaSection.tsx` — swap inline layers for `<DarkGlowPanel intensity="soft">`
- `src/sections/products/ProductOverviewSection.tsx` — drop the right-column capabilities list, replace with quiet "At a glance" panel
- `src/pages/ProductDetail.tsx` — render `ProductCapabilitiesSection` between Overview and Use Cases when `solution.id === "ai-generative"`

## Out of scope (this round)

- Other 3 practices' product pages
- Hero, Use Cases, Why TechD, CTA visual changes
- Content edits in `solutions.ts`
- Practice-page changes (`/solutions/ai-generative` itself)
