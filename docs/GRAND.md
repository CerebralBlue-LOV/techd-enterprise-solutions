# TechD Website — Grand Plan

Full project scope, phases, and long-term vision. Read this when sprint scope feels ambiguous.

**Started:** 2026-05-04 (Monday)
**Staging:** `cerebralblue-lov.github.io/techd-enterprise-solutions/`
**Production target:** `techd.com`

---

## Context

TechD is an IBM Platinum Business Partner delivering AI, data, security, automation, cloud, and application modernization to Fortune 500 clients (J&J, Comcast, Sony, Princeton, Johns Hopkins). The current `techd.com` runs on a compromised WordPress install with SEO cloaking spam injected at theme level. The WordPress server is fully compromised and must be abandoned — clean break, no file migration.

This project replaces it with a modern, fast marketing site. The business goal is not just a pretty website — it's a credible digital face that matches the sophistication of TechD's enterprise clientele and supports lead generation.

---

## Phase 0 — Foundation (Days 1–2, in progress)

**Goal:** Repo, CI/CD, brand tokens, page scaffolds, design system. Everything that enables the rest of the work.

### Deliverables
- [x] GitHub repo (`techd-enterprise-solutions`) with Lovable bidirectional sync
- [x] GitHub Actions deploy → GitHub Pages
- [x] Vite base path configured for production
- [x] Brand tokens (colors, Roboto Condensed) wired into Tailwind
- [x] shadcn/ui primitive layer intact
- [x] `src/content/` data modules: site nav, solutions, industries, services, resources
- [x] `src/components/SEO.tsx` — per-page meta, OG, canonical
- [x] `src/components/Layout.tsx`, `Header.tsx`, `Footer.tsx`
- [x] Hero redesign: `HeroBackdrop`, `HeroParticleField` (r3f), floating glass cards
- [ ] `public/sitemap.xml`
- [ ] `public/robots.txt` (in place, verify content)
- [ ] Day 1 project confirmation to product owner

---

## Phase 1 — Page Build (Days 2–3)

**Goal:** All P0 pages built with real content, audited from current site.

### Pages
| Page | Route | Priority |
|---|---|---|
| Homepage | `/` | P0 |
| Solutions overview | `/solutions` | P0 |
| Industries overview | `/industries` | P0 |
| Services overview | `/services` | P0 |
| Resources hub | `/resources` | P0 |
| Contact | `/contact` | P0 |
| 404 | `*` | P0 |

### Content strategy
- Pull real copy from `techd.com` audit (210 HTML pages crawled Day 1)
- All content lives in `src/content/` as typed TS modules — not hardcoded in JSX
- Placeholder copy only where product owner has not approved final text

### Deliverables
- [ ] All 7 pages built with audited content
- [ ] `<SEO>` component on every page with unique title/description/OG
- [ ] `docs/CONTENT-AUDIT.md` — per-page content status
- [ ] Logo SVGs (color + white) from product owner — replace wordmark placeholder

---

## Phase 2 — SEO, Form, Polish (Days 4–5)

**Goal:** Search-ready, form-working, QA-passing staging build.

### Deliverables
- [ ] Cloudflare Worker: form POST → validation + rate limit → email + KV log
- [ ] Contact form wired to Worker endpoint
- [ ] `public/sitemap.xml` finalized with canonical URLs
- [ ] `public/robots.txt` correct (allow all, point to sitemap)
- [ ] OG images (1200×630) per page — static, not dynamic
- [ ] `docs/REDIRECT-MAP.md` — 210 legacy URL → new URL 301 mapping
- [ ] Cross-browser QA: Chrome, Firefox, Safari, Edge
- [ ] Mobile QA: iOS Safari, Android Chrome
- [ ] Lighthouse audit baseline — note scores, not blocking
- [ ] Accessibility pass: focus states, alt text, skip nav, ARIA labels
- [ ] Day 5: handoff package to product owner (staging URL + scope summary + hardening list)

---

## Friday handoff: staging-quality, not launch-ready

Friday delivery = production-quality build, ready for **content sign-off and stakeholder review**. Not a public launch.

Engineering lead must communicate to product owner:
- What's done (all P0 pages, form, SEO basics)
- What's deferred (see below)
- What a hardening phase looks like before going live at `techd.com`

---

## Deferred — explicitly out of scope this sprint

These are logged here so they don't creep into sprint scope.

| Item | Phase | Why deferred |
|---|---|---|
| CMS integration (Contentful, Sanity, etc.) | Phase 3 | 5-day window, Lovable constraints |
| Full CRM-routed form (Salesforce, HubSpot) | Phase 2+ | API access not confirmed |
| Dark mode | Phase 3 | Low priority, design complexity |
| ROI calculator | Phase 3 | Requires data model + stakeholder sign-off |
| Individual solution/industry/service detail pages | Phase 2+ | Content not audited yet |
| Multi-language | Phase 4 | No content strategy defined |
| Full WCAG 2.2 AA audit | Hardening | Requires dedicated accessibility sprint |
| Third-party penetration test | Pre-launch | Timeline and vendor TBD |
| 6 legal-approved case studies | Phase 2+ | Legal review cycle |
| Custom domain (`techd.com`) DNS cutover | Pre-launch | Requires product owner + IT coordination |
| Blog / news publishing workflow | Phase 3 | CMS dependency |
| Analytics (GA4, Segment, etc.) | Phase 2+ | Tracking plan not defined |

---

## Long-term architecture vision

**Phase 3 — CMS + full content ops**
- Headless CMS (Contentful or Sanity) for blog, case studies, events
- Editorial workflow for content team, no engineer needed for content updates
- Consider Astro for SSG at this point — better SEO than client-rendered React

**Phase 4 — Lead generation & conversion**
- CRM integration: Salesforce or HubSpot lead routing from contact form
- ROI calculator
- Gated content (whitepapers, webinars) behind email capture
- Analytics and attribution: GA4 + LinkedIn Insight Tag + intent data

**Phase 5 — Personalization & scale**
- ABM landing pages per target account
- Industry-specific content paths
- A/B testing framework

---

## Success criteria for staging sign-off (Friday)

- [ ] All 7 pages render correctly on desktop and mobile
- [ ] Contact form submits without error (Worker endpoint live)
- [ ] No console errors in production build
- [ ] `robots.txt` and `sitemap.xml` accessible
- [ ] Google Search Console verification file in place (if requested)
- [ ] Lovable stays in sync — no broken builds after Lovable push
- [ ] Product owner can navigate the full site and see real TechD content
