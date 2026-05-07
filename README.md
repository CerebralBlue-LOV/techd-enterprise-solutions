# TechD Enterprise Solutions — Marketing Website

Marketing website for **TechD**, an IBM Platinum Business Partner delivering AI, data, security, automation, cloud, and application modernization to Fortune 500 clients.

**Staging:** [cerebralblue-lov.github.io/techd-enterprise-solutions](https://cerebralblue-lov.github.io/techd-enterprise-solutions/)
**Production target:** techd.com

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Vite 5 + React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Routing | react-router-dom v6 |
| Forms | react-hook-form + zod |
| 3D / Hero | three.js + @react-three/fiber + @react-three/drei |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Contact backend | Cloudflare Worker (planned) |
| Design tool | Lovable (bidirectional sync) |

## Local development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

> Note: Lovable may push commits to `main` at any time. Always `git pull` before starting local work.

## Project structure

```
src/
  app/                    # App shell — App.tsx, routes.tsx, providers.tsx
  assets/
    plexus/               # Practice motif images (used on homepage + solution pages)
  components/
    ui/                   # shadcn/ui primitives — do not edit
    layout/               # Header, Footer, Layout, NavLink
    shared/               # Reveal, SectionHeading, SectionMarker, GeometricAccent,
                          # LogoStrip, IBMPlatinumBadge, SectionBackdrop, SEO
  content/                # Typed TS data modules — edit these for content changes
  hooks/                  # Custom React hooks
  lib/                    # Utility functions
  pages/                  # Route-level page components
    solutions/            # AIGenerative, DataAnalytics, AutomationFinOps, SecurityCompliance, HybridCloud
    services/             # Advisory, Implementation, ManagedServices, Training
    industries/           # Healthcare, MediaEntertainment, Insurance, EnergyUtilities, HigherEducation, PublicSector
    resources/            # CaseStudies, Blog, Webinars, Events
  sections/               # Page section components, organized by route
    home/
      _components/        # Private sub-components (FlipCard, PlexusMotif, backdrops, motifs)
    solutions/
      _components/        # Private sub-components (PracticeHeroBackdrop)
    industries/
      _components/        # Private sub-components (IndustryHeroBackdrop)
    products/
public/
  logos/                  # Client logo images for the logo strip
docs/                     # Project documentation (grand plan, decisions, progress, brand)
.github/workflows/        # GitHub Actions CI/CD pipeline
```

### Path aliases

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@app` | `src/app/` |
| `@components` | `src/components/` |
| `@layout` | `src/components/layout/` |
| `@shared` | `src/components/shared/` |
| `@ui` | `src/components/ui/` |
| `@pages` | `src/pages/` |
| `@sections` | `src/sections/` |
| `@content` | `src/content/` |
| `@hooks` | `src/hooks/` |
| `@lib` | `src/lib/` |

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, solutions overview, industries, proof |
| `/solutions` | Solutions overview (AI, Data, Security, Cloud, App Mod) |
| `/industries` | Industries served (Healthcare, FinServ, Insurance, Energy, Education, Public) |
| `/services` | Services (Advisory, Implementation, Managed, Training) |
| `/resources` | Resources hub (Case Studies, Blog, Webinars, Events) |
| `/contact` | Contact form + company info |

## Deployment

Pushes to `main` trigger GitHub Actions, which builds and deploys to GitHub Pages automatically. The `404.html` fallback pattern enables client-side routing on the static host.

Vite sets `base: "/techd-enterprise-solutions/"` in production. React Router uses a matching `basename`.

## Working with Lovable

This project uses [Lovable](https://lovable.dev) for visual iteration. Lovable and Claude Code both commit directly to `main`.

- Lovable handles: new components, visual design, layout tweaks
- Claude Code handles: build config, CI/CD, Cloudflare Worker, SEO, content data, infrastructure

## Documentation

See `docs/` for full project context:

| File | Contents |
|---|---|
| `docs/GRAND.md` | Full project scope, phases, and long-term vision |
| `docs/DECISIONS.md` | Architectural decisions with rationale |
| `docs/progress.md` | Day-by-day engineering log |
| `docs/BRAND.md` | Colors, fonts, logo rules, voice |

## Brand

- Primary: `#00B3E3` (cyan-blue) — CTAs, accents
- Secondary: `#56565A` (warm dark gray) — body text, structure
- Accent: `#A7A5A8` (warm light gray) — borders, secondary
- Font: Roboto Condensed (300/400/700)

No colors outside this palette. No raw hex in code — use Tailwind tokens only.
