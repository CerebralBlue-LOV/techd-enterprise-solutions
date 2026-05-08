## Mobile hero refinements

Scope: `src/sections/home/HeroSection.tsx` only. Desktop layout unchanged. Brand tokens, fonts, and existing animations untouched.

### Changes

1. **Headline scale**
   - From `text-6xl md:text-8xl` → `text-4xl md:text-8xl`
   - Remove the hard `<br/>` so the line breaks naturally on mobile; desktop still reads cleanly because the `<span>` for "trustworthy AI." sits inline.
   - Tighten leading on mobile: `leading-[1.05] md:leading-[1.02]`.

2. **Vertical rhythm**
   - Container padding: `pt-20 pb-16 md:pt-40 md:pb-40`.
   - Section: drop `min-h-[88vh]` on mobile, keep on desktop → `md:min-h-[88vh]`.
   - Result: eyebrow + headline + body + both CTAs visible above the fold on a 390×844 viewport.

3. **IBM proof chip** (replaces text eyebrow)
   - Render `<IBMPlatinumBadge size="sm" />` inline as a pill at the top of the stack, then "· Since 2009" muted text next to it on `sm+`, stacked under it on mobile.
   - Reuses existing component → keeps the badge link to `/company/ibm-partnership` consistent with the footer.
   - Remove the `eyebrow` paragraph.

4. **Body copy**
   - `text-xl md:text-2xl` → `text-base md:text-2xl` (better mobile readability, no other change).

5. **CTAs**
   - Wrapper: `flex flex-col sm:flex-row gap-3 sm:gap-4`.
   - Each button: `w-full sm:w-auto`.
   - Primary on top, outline below — standard mobile pattern, full-width tap targets.

### What is NOT changing

- Particle field still desktop-only (already gated `hidden md:block`).
- HeroBackdrop grid + gradient drift untouched.
- Reveal animation, brand colors, Roboto Condensed weights — all preserved.
- No new dependencies, no content/copy edits.

### Verification

After implementation, take a fresh 390×844 screenshot to confirm: badge chip visible, headline in 2–3 lines, both CTAs above the fold, spacing balanced.
