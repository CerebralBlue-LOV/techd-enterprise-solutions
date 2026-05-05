## Redesign: Why TechD Section

Centered composition: a particle ring orbit with a glassmorphic IBM Platinum Business Partner badge floating in its center, then the existing 2x2 differentiator cards below.

---

### 1. New component: `ParticleOrbit`

**File:** `src/sections/home/_shared/ParticleOrbit.tsx`
**Component name:** `ParticleOrbit` (export both named + default, matching `ParticleGlobe` convention)

Built with the same stack as `ParticleGlobe` and `HeroParticleField`:
- `@react-three/fiber` `<Canvas>` with `alpha: true`, `dpr={[1, 1.5]}`
- A `<points>` cloud — ~2200 particles distributed on a torus/ring (random angle around Y axis, radius jittered ±15%, slight Z thickness for depth)
- Brand cyan: main points `#00B3E3` at low opacity, additive-blend highlight points `#7CE6FF` for the sparkle effect — matches the user-uploaded reference but recolored to brand
- Slow rotation on Y axis (~0.05 rad/s) + gentle highlight opacity pulse, both gated by `prefers-reduced-motion` (same pattern as `ParticleGlobe`)
- Wrapper: `aria-hidden`, `pointer-events-none`, square aspect, centered absolute fill of its parent
- Soft radial fade overlay so edges dissolve into background

JSDoc header explains: "decorative orbit ring, sits behind the centered IBM credential card on the Why TechD section."

---

### 2. Rewrite `WhyTechDSection.tsx`

New layout (replaces current 2-column grid):

```text
┌─────────────────────────────────────────────┐
│           eyebrow + title (centered)        │
│                                             │
│         ╭───── ParticleOrbit ─────╮         │
│         │                          │         │
│         │   ┌──────────────────┐   │         │
│         │   │ IBM glass badge  │   │         │
│         │   └──────────────────┘   │         │
│         │                          │         │
│         ╰──────────────────────────╯         │
│                                             │
│   ┌──────┐ ┌──────┐                         │
│   │ card │ │ card │   (2x2 grid below)      │
│   ├──────┤ ├──────┤                         │
│   │ card │ │ card │                         │
│   └──────┘ └──────┘                         │
└─────────────────────────────────────────────┘
```

Structure:
- `SectionHeading` with `align="center"`, eyebrow "Why TechD", title "A different kind of partner."
- Centered hero block: `relative` square container (~`h-[420px] md:h-[520px]`) with `<ParticleOrbit />` absolute-filling it and the IBM card centered via flex
- IBM glassmorphic card (centered):
  - `bg-background/60 backdrop-blur-xl`, `border border-primary/30`, `rounded-2xl`, soft `shadow-2xl shadow-primary/10`
  - Larger than current: ~`px-8 py-6 md:px-10 md:py-8`
  - "IBM" mark block scaled up (h-14/w-14), "Platinum" eyebrow, "Business Partner" bold, "15+ years · Platinum since 2009" muted
- Differentiator cards: existing 2x2 grid moved below the hero block, unchanged styling, full-width within `container-page`

Keep `SectionMarker`, `Reveal` wrappers, `bg-muted/40` section background.

---

### 3. Files touched

- **Create** `src/sections/home/_shared/ParticleOrbit.tsx`
- **Edit** `src/sections/home/WhyTechDSection.tsx` — restructure as above

No new dependencies (`three`, `@react-three/fiber` already installed). No brand token changes. No content changes.

---

### Out of scope

- No edits to other sections, hero, or globe component
- No changes to differentiator card copy
- No mobile-specific orbit replacement — orbit renders at all breakpoints, just smaller container on mobile