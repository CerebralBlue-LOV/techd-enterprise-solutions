# Restore webp motifs + per-card cool effects

## Goal

Switch the FlipLab motifs back to the original webp images and remove the traced SVG versions. On hover (and subtly at rest), each card gets its own distinctive, lightweight effect — overlays/lights/particles layered on top of the static image, not transforms of the image itself.

## Scope of changes

1. `src/pages/FlipLab.tsx`
   - Re-import the 5 `.webp` files instead of `.svg`.
   - Pass a new `variant` prop per card (`ai | data | automation | security | cloud`) so each motif can render a different effect.
   - Update title/copy on the page from "SVG plexus" back to the original wording.

2. `src/sections/flip-lab/PlexusMotif.tsx`
   - Keep the static webp image + cyan glow halo (current look).
   - Add a `variant` prop and render an extra absolutely-positioned effect layer per variant.
   - All effects are pure CSS/SVG overlays — the `<img>` itself does NOT scale, rotate, or move.
   - All effects respect `prefers-reduced-motion` (disabled when set).
   - Effects intensify on the parent `[data-hover="true"]` (already set by FlipCard).

3. `src/index.css`
   - Add the keyframes used by the variants (scoped under a `.flip-motif-fx-*` namespace).

4. Delete the 5 traced SVGs in `src/assets/flip-lab/plexus-*.svg` (no longer referenced).

## Per-card effect (cool, not "image animation")

| Card | Variant | Effect |
|---|---|---|
| AI & Generative | `ai` | Slow conic-gradient cyan "thinking" sweep behind the brain + 3 pulsing synapse dots that fire in sequence. |
| Data & Analytics | `data` | Vertical scanline that sweeps top→bottom every 4s + faint binary "0/1" ticker drifting left. |
| Automation & FinOps | `automation` | Two cyan orbit rings rotating in opposite directions behind the gears + a pulsing core dot. |
| Security & Compliance | `security` | Hex-grid SVG mask that fades in on hover + a radar-style sweep arc rotating 360° every 6s. |
| Hybrid Cloud | `cloud` | Soft floating cyan particles (8 dots) drifting upward + a slow horizontal shimmer band across the cloud. |

Common rules:
- Layers sit between the glow halo and the `<img>`, with `mix-blend-mode: screen` and low opacity so the image stays the hero.
- At rest: subtle (opacity ~0.25). On hover: opacity ramps to ~0.7 and animation speeds slightly up.
- All animations are CSS keyframes (transform/opacity only) — GPU-cheap, no JS, no canvas.
- `@media (prefers-reduced-motion: reduce)` disables the keyframes; the static decorative layer stays.

## Out of scope

- No changes to FlipCard flip behavior, copy, chips, or CTAs.
- No changes to other pages.
- No new dependencies (no framer-motion, no lottie, no canvas libs).

## Technical notes

- Effect layers use `pointer-events-none` and `aria-hidden="true"`.
- Particle dots are rendered as a fixed array of `<span>` with staggered `animation-delay` — no runtime randomness, deterministic SSR-safe output.
- Hex grid + radar sweep are inline SVG in the security variant (no extra asset files).
- Keyframes named `flip-fx-sweep`, `flip-fx-scan`, `flip-fx-orbit`, `flip-fx-radar`, `flip-fx-float`, `flip-fx-pulse` — all added once to `index.css`.
- Variant→effect mapping lives inside `PlexusMotif.tsx` as a small switch; no new files needed.
