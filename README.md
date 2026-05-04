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
  components/       # Shared layout and UI components
  components/ui/    # shadcn/ui primitives (do not edit)
  content/          # Typed TS data modules — edit these for content changes
  pages/            # Route-level page components
  hooks/            # Custom React hooks
  lib/              # Utility functions
docs/               # Project documentation (grand plan, decisions, progress, brand)
public/             # Static assets (robots.txt, favicon, sitemap)
.github/workflows/  # GitHub Actions CI/CD pipeline
```

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
