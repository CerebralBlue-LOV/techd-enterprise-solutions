# Logo Strip Upgrade — Monochrome, Enterprise-Confident

## Goal

Replace the plain text marquee in `home:logo-strip` with a refined monochrome wordmark strip — the Linear / Anthropic / Stripe approach. No color shift, no hover gimmicks. With 22 featured clients, the marquee finally has enough mass to feel substantial rather than thin.

## Approach

### 1. Expand client list (`src/content/site.ts`)

Replace the current 5-name `CUSTOMERS` array with all 22 featured clients in the order provided. Keep export name so nothing else breaks.

### 2. Build inline SVG wordmark set (`src/components/logos/index.tsx`)

A single new file exporting one React component per client. Each is a hand-tuned inline SVG wordmark (text-based, set in a weight close to each brand's actual logo) so we get crisp rendering at any size and full control over color via `currentColor`.

- All wordmarks normalized to the same visual height (~28px on desktop, ~22px on mobile) via a shared `viewBox` height and a wrapper that sets `h-7 md:h-8 w-auto`.
- All use `fill="currentColor"` so a single Tailwind text color drives the whole strip.
- Each component accepts `className` so the strip controls sizing/color.
- Names rendered as styled text inside SVG (using web-safe stack — actual brand fonts are licensed). This is standard practice for B2B logo walls when official SVGs aren't licensed; visually reads as "wordmark," not "label."

A `LOGOS` array exports `{ name, Component }` tuples in the same order as `CUSTOMERS`, so the strip iterates one source of truth.

> Note: if later you obtain official SVGs from any client (with permission), we swap the inline component for the real asset — the strip's API doesn't change.

### 3. Rebuild `src/components/LogoStrip.tsx`

```text
┌─────────────────────────────────────────────────────────┐
│           TRUSTED BY FORTUNE 500 LEADERS                │  ← eyebrow
│                                                         │
│   [J&J]  [Comcast]  [Sony]  [JH]  [Princeton]  [DHS]…  │  ← marquee, monochrome
│                                                         │
│   25+ years  ·  Fortune 500 clients  ·  6 industries    │  ← proof line
└─────────────────────────────────────────────────────────┘
```

- Section: `py-16 border-y border-border bg-background` (more breathing room than current `py-12`).
- Eyebrow stays, slightly upgraded copy: **"Trusted by leaders in healthcare, media, energy, and the public sector"**.
- Marquee track keeps the existing `marquee` keyframe but slows to 60s (was 45s) — with 22 logos doubled = 44 items, slower feels more confident.
- Each logo wrapped in a flex item: `shrink-0 h-8 flex items-center text-secondary/60 hover:text-secondary transition-colors duration-300`. (Hover only deepens the gray — no color shift, satisfies your "monochrome, no color shift" pick. Can remove the hover entirely if you want it fully static — flag it and we drop it.)
- Gap between logos: `gap-14 md:gap-20`.
- Edge fade masks (left/right) so logos fade into the page background instead of hard-clipping at the marquee edges. Pure CSS `mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent)`.
- Pause-on-hover: `.marquee-wrap:hover .marquee { animation-play-state: paused; }` (already standard pattern; add to `index.css` if not present).
- Below the marquee: a centered proof line in `text-xs uppercase tracking-[0.18em] text-muted-foreground`:
  **`25+ years  ·  Fortune 500 clients  ·  6 regulated industries`**
  Separated by `·` characters with `mx-3` spacing.

### 4. Reduced motion

In `src/index.css`'s reduced-motion block, ensure `.marquee { animation: none; }` and switch the strip to a static centered wrap (`flex-wrap justify-center`). Already partially handled — verify and extend.

## Files touched

- `src/content/site.ts` — expand `CUSTOMERS` to 22 entries.
- `src/components/logos/index.tsx` — new, 22 inline SVG wordmark components + `LOGOS` array.
- `src/components/LogoStrip.tsx` — rebuilt to render `LOGOS`, edge-fade mask, proof line, slower marquee.
- `src/index.css` — pause-on-hover + reduced-motion fallback for the strip (only if not already present).

## Open questions

1. **Hover behavior** — keep the subtle gray-deepen on hover, or fully static (no hover at all)? You said "no hover gimmick"; I lean fully static. Confirm and I'll drop it.
2. **Proof line copy** — the suggested `25+ years · Fortune 500 clients · 6 regulated industries` — good, or want different metrics (e.g. swap "6 regulated industries" for "$2B+ in client outcomes" or similar)?
3. **Order** — keep your provided order, or reshuffle so the most recognizable names (J&J, Sony, Comcast, Johns Hopkins, Princeton, DHS) lead the visible window?

Answer those three and I'll switch to build mode and ship it.
