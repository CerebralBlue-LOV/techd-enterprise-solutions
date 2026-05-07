# CLAUDE.md

Operational context for Claude Code. Loaded every session. Keep tight.

## What this is

Marketing website rebuild for **TechD** (IBM Platinum Business Partner serving Fortune 500 clients: J&J, Comcast, Sony, Princeton, Johns Hopkins). Replacing a compromised WordPress site.

**Status: Not live.** The site is still in development. Do not assume the staging URL reflects the final state or that any deadline has passed.

**Staging URL:** `cerebralblue-lov.github.io/techd-enterprise-solutions/`

## Public repo — security rules

This repository is **public**. Before committing anything, verify:

- No personal names, email addresses, or phone numbers in any file
- No API keys, tokens, secrets, or credentials anywhere (use Cloudflare dashboard / GitHub Secrets)
- No internal Slack handles, Google Drive links, or internal URLs
- No local filesystem paths (`~/Documents/...`, `/home/...`)
- No client-confidential data beyond what is already public on `techd.com`

If unsure whether something is sensitive, leave it out of the commit.

## Stack (locked — do not propose alternatives)

| Layer | Technology |
|---|---|
| Framework | Vite 5 + React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Routing | react-router-dom v6 |
| Forms | react-hook-form + zod |
| 3D / Hero | three.js + @react-three/fiber + @react-three/drei |
| Hosting | GitHub Pages (served from `/techd-enterprise-solutions/`) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml` + `sync-to-clickup.yml`) |
| Contact backend | Cloudflare Worker (Day 4 deliverable — not built yet) |
| Design tool | Lovable (bidirectional sync with `main`) |

## Working agreement

- **Always `git pull` before starting work.** Lovable may have pushed changes between sessions.
- **Lovable handles:** new components, visual iteration, design tweaks.
- **Claude Code handles:** build config, GitHub Actions, Cloudflare Worker, SEO files, content data files in `src/content/`, brand tokens, infrastructure — anything Lovable does badly.
- **Don't edit a file Lovable just touched** without checking — overwrite risk when Lovable pulls.
- **Push frequently.** Small commits, descriptive messages. Lovable must stay in sync.

## Repo structure

```
src/
  app/              # App shell, route table (App.tsx, routes.tsx)
  components/       # Shared components (Header, Footer, Layout, Reveal, SEO, etc.)
  components/ui/    # shadcn/ui primitives — DO NOT touch
  content/          # Typed TS data modules (see Content files below)
  pages/            # Route-level components
    Home.tsx
    Contact.tsx
    NotFound.tsx
    ProductDetail.tsx
    solutions/      # AIGenerative, DataAnalytics, AutomationFinOps, SecurityCompliance, HybridCloud, _PracticePage
    services/       # Advisory, Implementation, ManagedServices, Training
    industries/     # Healthcare, MediaEntertainment, Insurance, EnergyUtilities, HigherEducation, PublicSector
    resources/      # CaseStudies, Blog, Webinars, Events
  sections/         # Section-level components organized by page (solutions/, etc.)
  hooks/            # use-mobile, use-toast
  lib/              # utils.ts
docs/               # All project documentation (PRD, DECISIONS, GRAND, PROGRESS, BRAND, etc.)
clickup-docs/       # Markdown files synced to ClickUp docs on every push to main
public/             # robots.txt, favicon, placeholder assets
.github/workflows/  # deploy.yml (GitHub Pages CI/CD), sync-to-clickup.yml (ClickUp doc sync)
```

## Content files (`src/content/`)

| File | Contents |
|---|---|
| `site.ts` | Nav items, footer copy, contact details |
| `solutions.ts` | Solutions list with titles, descriptions, icons, slugs |
| `solutions-extras.ts` | Extended content for practice pages (outcomes, products, approach, etc.) |
| `practice-motifs.ts` | Visual motif/accent data per practice |
| `industries.ts` | Industry list with names and icons |
| `services.ts` | Services list |
| `resources.ts` | Resources hub entries |

## Code conventions

- TypeScript strict — no `any` unless justified with a comment.
- Functional components only.
- shadcn/ui components live in `src/components/ui/`. Don't recreate; extend.
- Custom components in `src/components/`.
- Page components in `src/pages/`.
- Content data in `src/content/` as typed TS modules — this is what marketing edits later.
- All colors via Tailwind tokens (`bg-primary`, `text-foreground`), never raw hex.
- Roboto Condensed only: `font-bold` headings, `font-normal` subheads, `font-light` body (see `src/index.css`).

## Brand tokens (configured in `tailwind.config.ts` and `src/index.css`)

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#00B3E3` | CTAs, accents, link hovers, focus rings |
| `secondary` | `#56565A` | Body text, headings, structural |
| `muted` / `accent` | `#A7A5A8` | Borders, dividers, secondary text |
| `background` | `#FFFFFF` | Page background |

If a design needs a color outside this palette, **stop and ask** — don't introduce colors silently.

## Aesthetic

Stripe / Linear / Vercel / Anthropic. Quiet, confident, typography-led, generous whitespace. Not Dribbble-flashy.

- Subtle scroll-reveals (16px translate + fade, 500ms)
- Button hovers: 200ms color transition + 1–2px lift on primary CTAs
- Card hovers: border shifts to primary cyan, subtle shadow lift
- Slow ambient gradient drift on hero (15–20s loop)
- Logo strip: gentle marquee, pauses on hover (45s loop)
- Float animation on hero cards (7s, per-card delay)
- **Never:** parallax, scroll-jacking, typewriter effects, animated cursors, page transitions
- Always respect `prefers-reduced-motion`

## Route table

**IA model:** Top-level `/solutions`, `/services`, `/industries`, `/resources` redirect to their first child — they are not standalone pages. Each child has its own full page.

| Route | Component |
|---|---|
| `/` | `Home.tsx` |
| `/solutions` | → redirects to `/solutions/ai-generative` |
| `/solutions/ai-generative` | `solutions/AIGenerative.tsx` |
| `/solutions/data-analytics` | `solutions/DataAnalytics.tsx` |
| `/solutions/automation-finops` | `solutions/AutomationFinOps.tsx` |
| `/solutions/security-compliance` | `solutions/SecurityCompliance.tsx` |
| `/solutions/hybrid-cloud` | `solutions/HybridCloud.tsx` |
| `/solutions/:practice/:product` | `ProductDetail.tsx` |
| `/services` | → redirects to `/services/advisory` |
| `/services/advisory` | `services/Advisory.tsx` |
| `/services/implementation` | `services/Implementation.tsx` |
| `/services/managed-services` | `services/ManagedServices.tsx` |
| `/services/training` | `services/Training.tsx` |
| `/industries` | → redirects to `/industries/healthcare` |
| `/industries/healthcare` | `industries/Healthcare.tsx` |
| `/industries/media-entertainment` | `industries/MediaEntertainment.tsx` |
| `/industries/insurance` | `industries/Insurance.tsx` |
| `/industries/energy-utilities` | `industries/EnergyUtilities.tsx` |
| `/industries/higher-education` | `industries/HigherEducation.tsx` |
| `/industries/public-sector` | `industries/PublicSector.tsx` |
| `/resources` | → redirects to `/resources/case-studies` |
| `/resources/case-studies` | `resources/CaseStudies.tsx` |
| `/resources/blog` | `resources/Blog.tsx` |
| `/resources/webinars` | `resources/Webinars.tsx` |
| `/resources/events` | `resources/Events.tsx` |
| `/contact` | `Contact.tsx` |
| `*` | `NotFound.tsx` |

## What is deferred (do not build)

CMS integration · real CRM-routed form · dark mode · ROI calculator · multi-language · full WCAG 2.2 AA audit · third-party pen test · 6 approved case studies.

## ClickUp doc sync

Markdown files in `clickup-docs/` are automatically pushed to ClickUp on every commit to `main` that touches those files. The workflow is `.github/workflows/sync-to-clickup.yml`. IDs are stored in the `CLICKUP_SYNC_CONFIG` GitHub secret.

| File | ClickUp doc |
|---|---|
| `clickup-docs/brand-guidelines.md` | Brand Guidelines Summary |
| `clickup-docs/decisions.md` | Architectural Decisions |
| `clickup-docs/deferred.md` | Deferred Items |
| `clickup-docs/page-status.md` | Page Status by Route |
| `clickup-docs/project-overview.md` | Project Overview |

## When you're unsure

Read `docs/GRAND.md` for full project scope, `docs/DECISIONS.md` for settled architectural decisions, `docs/progress.md` for current state. Then ask a clarifying question rather than guessing.

## Git conventions

- Short, descriptive commit messages. No `Co-Authored-By` trailers.
- Small commits, push frequently — Lovable needs to stay in sync.

## Anti-patterns to avoid

- Don't suggest switching to Astro, Next.js, or any other framework. Stack is locked.
- Don't add CMS integration. Deferred.
- Don't build form backends in the React app. Forms POST to a Cloudflare Worker (TBD Day 4).
- Don't add new dependencies without flagging the trade-off.
- Don't touch `src/components/ui/` — those are shadcn defaults.
- Don't introduce raw hex colors anywhere.
- Don't write or apply 410 redirects (see `docs/DECISIONS.md` — spam was theme-level, not URL-based).

---

## Documentation index

| File | When to read it |
|---|---|
| `docs/GRAND.md` | Full project scope, phases, and long-term vision. Read when scope is ambiguous. |
| `docs/DECISIONS.md` | Architectural and product decisions, dated with rationale. Read when in doubt. |
| `docs/progress.md` | Current state, day-by-day tasks, blockers. Read at session start. |
| `docs/BRAND.md` | Colors, fonts, voice, logo rules. Read for any visual or copy work. |
| `docs/SPAM-REPORT.md` | What was wrong with the old site, why no 410s needed. Read if asked about redirects. |
| `docs/CONTENT-AUDIT.md` | Per-page content status from current techd.com. Day 2 deliverable. |
| `docs/REDIRECT-MAP.md` | Legacy URL → new URL mapping. Day 2–3 deliverable. |
