
# TechD Marketing Website — Build Plan

A premium, typography-led marketing site for TechD (IBM Platinum Business Partner). Built with React + TypeScript + Tailwind + shadcn/ui. Quiet, confident motion (Stripe/Linear/Vercel-toned). No backend, no CMS — content lives in editable TS modules.

## 1. Design System

- `index.css` HSL tokens for the brand palette:
  - `--primary` #00B3E3 (cyan) — CTAs, accents, focus rings
  - `--foreground` #56565A (warm dark gray) — body text
  - `--muted` / `--border` #A7A5A8 (warm light gray)
  - `--background` #FFFFFF
- `tailwind.config.ts`:
  - Map semantic tokens to brand palette (no raw hex in components)
  - `fontFamily.sans = ['"Roboto Condensed"', 'sans-serif']`
  - Add brand keyframes: `fade-up` (opacity 0→1, translateY 16px→0), `marquee` (logo strip), `gradient-drift` (15–20s ambient hero loop)
- Roboto Condensed (300/400/700) loaded via Google Fonts in `index.html`
- Type scale set in `@layer base`: bold display, regular subheads, light body
- Generous whitespace via shared section padding utilities

## 2. Logo Asset

- Copy uploaded `TechD-home-logo.webp` to `src/assets/techd-logo.webp`
- Imported as ES module by `Header` and `Footer`
- Sized appropriately, with `alt="TechD"`

## 3. Shared Components (`src/components/`)

- `Header.tsx` — sticky, white bg, subtle bottom border on scroll; logo left, shadcn `NavigationMenu` center (5 items with dropdowns), persistent "Talk to an Expert" primary CTA right; mobile hamburger via `Sheet`
- `Footer.tsx` — secondary nav columns, contact info, IBM Platinum Partner badge (typographic), copyright
- `Layout.tsx` — Header + `<main>` + Footer wrapper
- `SEO.tsx` — sets per-page `<title>`, meta description, OG tags via a small `useEffect` head hook (no extra deps)
- `Reveal.tsx` — Intersection Observer wrapper applying `fade-up` once on enter; supports `delay` prop for 50ms stagger; respects `prefers-reduced-motion` (renders instantly)
- `SectionHeading.tsx`, `CTAButton.tsx`
- `LogoStrip.tsx` — typographic placeholder logos (J&J, Comcast, Sony, Princeton, Johns Hopkins) in a duplicated marquee track, 40s+ loop, `pause-on-hover` via `animation-play-state`
- `SolutionCard.tsx`, `IndustryCard.tsx`, `ServiceCard.tsx`, `ResourceCard.tsx` — shared hover treatment: border shifts to cyan, soft shadow, `translateY(-2px)`, 200ms ease-out
- `GeometricAccent.tsx` — abstract SVG (arcs, gradient blobs) with a single slow `gradient-drift` CSS animation for hero ambience

## 4. Routing (`src/App.tsx`)

```text
/             Home
/solutions    Solutions overview
/industries   Industries overview
/services     Services overview
/resources    Resources hub (tabs)
/contact      Contact form
*             404
```

All routes wrapped in `Layout`. Nav sub-items deep-link to anchors on overview pages (`/solutions#ai-automation`). No page-transition animations.

## 5. Pages

### Homepage
1. Hero — "Enterprise AI, Engineered for Outcomes", subhead, primary "Talk to an Expert" + secondary "Explore Solutions"; `GeometricAccent` background
2. Customer logo strip — marquee, "Trusted by Fortune 500 leaders"
3. Solutions — 5 outcome-led cards
4. Industries — 6-card grid
5. Featured case study — large card, quantified outcome, pull quote, CTA
6. Why TechD — IBM Platinum badge, years in business, 3–4 differentiators
7. Final CTA — "Ready to talk?" → `/contact`
8. Footer

Each section wrapped in `Reveal` with 50ms staggered children.

### Solutions overview (`/solutions`)
Hero + 5 detailed sections (anchor IDs): outcome statement, capability bullets, related industries.

### Industries overview (`/industries`)
Hero + 6 industry sections with sector outcomes and example use cases.

### Services overview (`/services`)
Hero + 4 service tiers (Advisory, Implementation, Managed Services, Training) as comparison cards.

### Resources hub (`/resources`)
Hero + shadcn `Tabs`: Case Studies / Blog / Webinars / Events. Responsive card grid per tab from local TS arrays.

### Contact (`/contact`)
Two-column: left = headline, contact details, IBM badge; right = form using shadcn `Form` + `react-hook-form` + `zod`. Fields: name, email, company, role, area of interest (`Select`), message (`Textarea`). Submit shows success toast (no backend per spec).

### 404
Branded replacement of `NotFound.tsx`: large 404, short copy, CTA back home, geometric accent.

## 6. Motion Spec

- **Scroll-reveal**: `Reveal` component — fade in + translateY(16px → 0), 400ms ease-out, triggers once via Intersection Observer (`threshold: 0.15`), 50ms stagger on children
- **Button hover**: 200ms background-color transition + 1–2px lift on primary CTA; no scale > 1.02
- **Card hover**: border → cyan, soft shadow, `translateY(-2px)`, 200ms ease-out
- **Hero accent**: single CSS `gradient-drift` keyframe, 18s ease-in-out infinite alternate
- **Logo marquee**: 45s linear infinite, pause on hover
- **Nav dropdowns**: shadcn defaults (150ms slide-fade)
- **Reduced motion**: global `@media (prefers-reduced-motion: reduce)` rule disables all keyframes, transitions, and the marquee; `Reveal` short-circuits and renders content instantly
- Explicitly NOT building: parallax, scroll-jacking, typewriter, animated cursors, page transitions

## 7. Content (`src/content/`)

Typed TS modules: `solutions.ts`, `industries.ts`, `services.ts`, `resources.ts`, `caseStudies.ts`. Placeholder copy in brand voice (confident, modern, no fluff). Easy to hand-edit in VSCode.

## 8. Accessibility & Performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- All interactive elements keyboard-reachable; visible cyan focus rings
- Alt text on logo and meaningful SVGs; decorative SVGs `aria-hidden`
- `loading="lazy"` on any `<img>`
- Mobile-first responsive (single-column under `md`, expanding grids at `md`/`lg`)

## 9. Technical

- Existing stack: Vite + React 18 + TS + Tailwind + shadcn/ui
- Add `react-hook-form` + `zod` + `@hookform/resolvers` if not already present (for contact form)
- No Framer Motion needed — Intersection Observer + CSS keyframes cover the spec and ship lighter
- Flat, component-based file structure for hand-editability

## Out of Scope (per brief)

CMS, contact form backend, auth, dashboards, individual solution/industry/service detail pages, individual case study/blog post pages.
