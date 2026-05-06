## Goal

Apply the Codepen #1 "Hover Glow Effect" to every **Talk to an expert** CTA across the site, on-brand: cyan button face, animated cyan→soft blue→violet halo that fades in on hover.

## Visual spec

- **Resting state:** solid cyan (`hsl(var(--primary))` = #00B3E3) background, white text, rounded — same silhouette as today, no glow visible.
- **Hover state:** a softly blurred animated halo appears around the button (≈4px outset). Halo gradient cycles through `#00B3E3 → #4A8BFF → #7A4DFF → #00B3E3` (cyan → soft blue → violet → loop), `background-size: 400%`, sliding via keyframes over ~8s. Halo fades in over 300ms.
- **Inside the halo:** the cyan button face stays crisp (an inner solid layer covers the gradient center, only the blurred edges leak out).
- **Reduced motion:** respect `prefers-reduced-motion` — show a static soft cyan glow on hover, no animation.

## Files touched

1. **`tailwind.config.ts`** — add `keyframes.glow-shift` (`background-position 0% → 400% → 0%`) and `animation['glow-shift']: 'glow-shift 8s linear infinite'`.
2. **`src/index.css`** — add a `.btn-glow` utility class implementing the layered `::before` (animated gradient, blurred, opacity 0 → 1 on hover) and `::after` (solid cyan face) pattern. Uses HSL brand tokens, no raw hex outside the gradient stops.
3. **CTA call sites** — append `btn-glow` to the className of the "Talk to an expert" button at every site-wide instance:
   - `src/layout/Header.tsx` (desktop + mobile)
   - `src/sections/home/HeroSection.tsx`
   - `src/sections/home/FinalCtaSection.tsx` (the actual button under the heading)
   - `src/sections/products/ProductHeroSection.tsx`
   - `src/sections/products/ProductCtaSection.tsx`
   - `src/sections/solutions/PracticesListSection.tsx`
   - `src/pages/NotFound.tsx`

   Skipped (not buttons, just copy): the heading text in `FinalCtaSection`, page metadata in `Contact.tsx`.

## Technical details

The `.btn-glow` class follows the Kocsten Codepen pattern adapted to our stack:

```text
.btn-glow              → position: relative; isolate; overflow visible; z-index: 0
.btn-glow::before      → inset: -3px; border-radius: inherit; z-index: -1;
                         background: linear-gradient(45deg, cyan, blue, violet, cyan);
                         background-size: 400%; filter: blur(6px); opacity: 0;
                         transition: opacity 300ms; animation: glow-shift 8s linear infinite (paused)
.btn-glow:hover::before→ opacity: 1; animation-play-state: running
.btn-glow::after       → inset: 0; border-radius: inherit; z-index: -1;
                         background: hsl(var(--primary))   ← keeps the face solid cyan
@media (prefers-reduced-motion: reduce)
                       → ::before uses static radial cyan glow, no keyframes
```

Because shadcn `Button` already has `bg-primary` and rounded corners, `.btn-glow` only adds the halo machinery — no visual change at rest. The class works whether `asChild` wraps a `<Link>` or not, since the pseudo-elements attach to the rendered button element.

No changes to `src/components/ui/button.tsx` (per CLAUDE.md: don't touch shadcn primitives).

## Out of scope

- Other CTAs ("Explore solutions", "View case study", etc.) — unchanged.
- Color-token changes — palette stays as defined in `BRAND.md`.
- Animation on focus-visible (keyboard) — current focus ring is sufficient; can be added later if desired.
