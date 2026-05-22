# CLAUDE.md

Operational context for Claude Code. Loaded every session. Keep tight.

## What this is

Marketing website rebuild for **TechD** (IBM Gold Business Partner serving Fortune 500 clients: J&J, Comcast, Sony, Princeton, Johns Hopkins). Replacing a compromised WordPress site.

**Status: Not live.** The site is still in development. Do not assume the staging URL reflects the final state or that any deadline has passed.

**Staging URL:** `cerebralblue-lov.github.io/techd-enterprise-solutions/`

## Public repo — security rules

This repository is **public**. Before committing anything, verify:

- No personal names, email addresses, or phone numbers in any file
  - Exception: Executive leadership names and career details (prior employers, education, tenure) are permitted in `docs/revisions/`, `docs/audit/`, and `src/content/about.ts`. No personal contact details (home address, personal phone, personal email) in any file.
- No API keys, tokens, secrets, or credentials anywhere (use GitHub Secrets / AWS environment variables)
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
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Contact backend | AWS Lambda + SES (not built yet) |
| Design tool | Lovable (bidirectional sync with `main`) |

## Working agreement

- **Always `git pull` before starting work.** Lovable may have pushed changes between sessions.
- **Lovable handles:** new components, visual iteration, design tweaks.
- **Claude Code handles:** build config, GitHub Actions, AWS Lambda form backend, SEO files, content data files in `src/content/`, brand tokens, infrastructure — anything Lovable does badly.
- **Don't edit a file Lovable just touched** without checking — overwrite risk when Lovable pulls.
- **Push frequently.** Small commits, descriptive messages. Lovable must stay in sync.

## Repo structure

```
src/
  app/              # App shell, route table (App.tsx, routes.tsx, providers.tsx)
  assets/
    brand/          # Brand images imported as ES modules (techd-logo.webp, ibm-logo-white.png, techd-gear.png, techd-wordmark.png)
    team/           # Leadership headshots imported as ES modules (garrett-rowe.jpg, marc-martina.jpg)
  components/
    ui/             # shadcn/ui primitives — DO NOT touch
    layout/         # Header, Footer, Layout, NavLink  (alias: @layout)
    shared/         # Reveal, SectionHeading, SectionMarker, GeometricAccent,
                    # LogoStrip, IBMGoldBadge, SectionBackdrop, SEO, DarkModeToggle
                    # (aliases: @shared and @seo both resolve here)
  content/          # Typed TS data modules (see Content files below)  (alias: @content)
  hooks/            # use-mobile, use-toast, use-dark-mode  (alias: @hooks)
  lib/              # utils.ts  (alias: @lib)
  pages/            # Route-level components  (alias: @pages)
    Home.tsx
    Contact.tsx
    NotFound.tsx
    ProductDetail.tsx
    solutions/      # AIGenerative, DataAnalytics, AutomationFinOps, SecurityCompliance, HybridCloud, _PracticePage
    services/       # Advisory, Implementation, ManagedServices, Training
    industries/     # Healthcare, MediaEntertainment, Insurance, EnergyUtilities, HigherEducation, PublicSector
    resources/      # CaseStudies, Blog, Webinars, Events
  sections/         # Section-level components organized by page  (alias: @sections)
    home/
    solutions/
    industries/
    products/
docs/               # All project documentation (PROJECT-SCOPE, ARCHITECTURE, REDIRECT-MAP, etc.)
public/             # Favicons at root; public/images/ for all other static assets
.github/workflows/  # deploy.yml (GitHub Pages CI/CD)
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
- Layout shell (Header/Footer/Layout) in `src/components/layout/`.
- Reusable shared components in `src/components/shared/`.
- Page components in `src/pages/`.
- Content data in `src/content/` as typed TS modules — this is what marketing edits later.
- All colors via Tailwind tokens (`bg-primary`, `text-foreground`), never raw hex.
- Roboto Condensed only: `font-bold` headings, `font-normal` subheads, `font-light` body (see `src/index.css`).
- **In-page section links: always use `ScrollToSectionLink`** (`@shared/ScrollToSectionLink`) — never `<Link to="/#section">` or raw hash anchors. It smooth-scrolls on the same page and navigates with router state `{ scrollTo }` across pages, so the URL stays clean and repeat clicks always work. `ScrollToTop` (`src/app/ScrollToTop.tsx`) handles the post-navigation scroll. `PageFinalCtaSection` auto-detects `#section` in its `secondary.to` and routes through `ScrollToSectionLink`.

## Brand tokens (configured in `tailwind.config.ts` and `src/index.css`)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary` | `#00B3E3` | `#00BFEF` | CTAs, accents, link hovers, focus rings |
| `secondary` | `#56565A` | `#F2F2F2` | Structural text — flips light in dark mode |
| `foreground` | `#56565A` | `#FAFAFA` | Default text, headings |
| `muted-foreground` | `#A7A5A8` | `#B3B0B4` | Borders, dividers, secondary text |
| `background` | `#FFFFFF` | `#16161A` | Page background |

All tokens are defined as paired light/dark values in `src/index.css`. If a design needs a color outside this palette, **stop and ask** — don't introduce colors silently.

## Dark mode

Dark mode is active on the `feature/dark-mode` branch. Architecture uses three layers — see `docs/DARK-MODE.md` for the full model, decision tree, and per-page audit checklist.

**Key files:**
- `src/index.css` — all color tokens, light and dark paired with comments
- `src/hooks/use-dark-mode.ts` — toggles `.dark` on `<html>`, persists to `localStorage`
- `src/components/shared/DarkModeToggle.tsx` — reusable Moon/Sun icon button
- `src/components/layout/Header.tsx` — renders `<DarkModeToggle />` in the navbar

**Rules:**
- Fix tokens in `src/index.css` first — one change propagates everywhere.
- Use `dark:` Tailwind variants only for hardcoded colors that don't go through tokens.
- For images that don't render on dark backgrounds, use the `logoOnDark` pattern (`src/content/site.ts` + `public/images/partners/white/`).

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

CMS integration · real CRM-routed form · ROI calculator · multi-language · full WCAG 2.2 AA audit · third-party pen test · 6 approved case studies.

## When you're unsure

Read `docs/PROJECT-SCOPE.md` for full project scope and `docs/ARCHITECTURE.md` for settled architectural decisions. Then ask a clarifying question rather than guessing.

## Git conventions

- Short, descriptive commit messages. No `Co-Authored-By` trailers.
- Small commits, push frequently — Lovable needs to stay in sync.

## Image asset structure

Two locations, two rules:

**`src/assets/`** — brand and team images. Always use ES module imports (`import logo from "@/assets/brand/techd-logo.webp"`). Vite fingerprints these files, handles the GitHub Pages base path automatically, and tree-shakes unused ones.

**`public/images/`** — customer logos and deprecated assets. Referenced as string paths. Consumer components prepend `import.meta.env.BASE_URL` so they resolve correctly on GitHub Pages.

| Location | Contents | How to reference |
|---|---|---|
| `src/assets/brand/` | techd-logo.webp, ibm-logo-white.png, techd-gear.png, techd-wordmark.png | ES module import |
| `src/assets/team/` | garrett-rowe.jpg, marc-martina.jpg | ES module import |
| `public/images/partners/` | Active customer logos (light) — defined in `site.ts` | String path via BASE_URL |
| `public/images/partners/white/` | Active customer logos (dark background) | String path via BASE_URL |
| `public/images/partners-deprecated/` | Orphaned logos — kept pending PM sign-off. Do not reference from any component. Use `/admin-lab` to review. | n/a |

Favicons (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`) stay at `public/` root — browser convention.

To regenerate brand PNGs from the logo: `python3 scripts/crop-logo.py`
To regenerate white logo variants: `python3 scripts/generate-white-logos.py`
To regenerate favicons: `python3 scripts/generate-favicon.py`

## Anti-patterns to avoid

- Don't suggest switching to Astro, Next.js, or any other framework. Stack is locked.
- Don't add CMS integration. Deferred.
- Don't build form backends in the React app. Forms POST to an AWS Lambda function (not built yet).
- Don't add new dependencies without flagging the trade-off.
- Don't touch `src/components/ui/` — those are shadcn defaults.
- Don't introduce raw hex colors anywhere.
- Don't write or apply 410 redirects (see `docs/ARCHITECTURE.md` — spam was theme-level, not URL-based).
- Don't reference files in `public/images/partners-deprecated/` from any component or content file — those are orphaned logos awaiting PM sign-off for deletion.
- Don't add images to `src/assets/` — all images belong in `public/images/` and should be referenced as path strings, not ES module imports.

## Content copy rules (when editing `src/content/`)

Rules that must hold in every content edit:

- **Voice:** practitioner-to-practitioner. The reader is a CIO or senior engineer who has seen every vendor pitch. No superlatives ("world-class," "cutting-edge," "best-in-class," "industry-leading"), no filler adjectives ("robust," "powerful"), no passive voice in delivery claims.
- **Taglines:** one sentence under 20 words. Lead with a specific differentiating fact. Never restate the product name. Must include at least one concrete, current claim.
- **Capabilities:** 7 bullets, named current features only. Reference 2025/2026 release facts where available. Format: `Feature name — what it does`. No generic descriptions.
- **Why TechD bullets:** sell TechD as implementer, not the product. Write in first person ("we configure," "we build"). Focus on delivery governance, cross-product integration, regulated-industry depth, and post-go-live sustainability. Never duplicate product capabilities.
- **Stats:** only use numbers from Forrester TEI, Gartner MQ, official IBM benchmarks, or documented customer results. Always format as `{ value: "X", label: "source context" }`. Never invent or round up.
- **Industry framing:** anchor use cases to TechD's six verticals — healthcare, insurance, public sector, media & entertainment, higher education, energy & utilities. Name compliance frameworks (HIPAA, FedRAMP, PCI-DSS, NERC-CIP) where they apply naturally.

---

## Documentation index

| File | When to read it |
|---|---|
| `docs/PROJECT-SCOPE.md` | Full project scope, phases, and long-term vision. Read when scope is ambiguous. |
| `docs/ARCHITECTURE.md` | Architectural and product decisions, dated with rationale. Read when in doubt. |
| `docs/BRAND.md` | Colors, fonts, voice, logo rules. Read for any visual or copy work. |
| `docs/SPAM-REPORT.md` | What was wrong with the old site, why no 410s needed. Read if asked about redirects. |
| `docs/REDIRECT-MAP.md` | Legacy URL → new URL mapping. Needed at domain cutover for 301 enforcement. |
| `docs/rebuild/solutions.md` | IBM product naming rules and rationale for the 5-practice IA. Read before editing solutions content. |
| `docs/rebuild/services.md` | Service line consolidation rationale. |
| `docs/rebuild/industries.md` | Industry selection rationale (why Financial Services is out, Media & Entertainment is in). |
| `docs/rebuild/resources.md` | Resources hub rebuild rationale. Clean slate decision. |
| `docs/audit/` | Raw per-section audits from techd.com crawl. Reference if PM asks why something was included or excluded. |
| `docs/DARK-MODE.md` | Dark mode architecture (three layers), decision tree, per-route audit checklist, verification steps. |
