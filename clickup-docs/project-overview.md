# TechD Website Rebuild — Project Overview

## What this project is

TechD is an IBM Platinum Business Partner delivering AI, data, security, automation, cloud, and application modernization to Fortune 500 clients (J&J, Comcast, Sony, Princeton, Johns Hopkins).

The current `techd.com` runs on a **fully compromised WordPress install** with SEO spam injected at the theme level. This project replaces it with a modern, fast marketing site — a clean break with no file migration from WordPress.

**Business goal:** A credible digital face that matches the sophistication of TechD's enterprise clients and supports lead generation.

---

## Key links

| | |
|---|---|
| **Staging URL** | `cerebralblue-lov.github.io/techd-enterprise-solutions/` |
| **GitHub repo** | `github.com/CerebralBlue-LOV/techd-enterprise-solutions` (public) |
| **Production target** | `techd.com` (DNS cutover deferred to pre-launch hardening phase) |

---

## Sprint timeline

| Day | Focus | Status |
|---|---|---|
| Day 1 (Mon 2026-05-04) | Foundation — repo, CI/CD, brand tokens, scaffold | ✅ Complete |
| Day 2 (Tue 2026-05-05) | Content audit (210 pages) + redirect map | ✅ Complete |
| Day 3 (Wed 2026-05-06) | Build pages — real content in all routes | 🟡 In progress |
| Day 4 (Thu 2026-05-07) | Contact form (Cloudflare Worker) + SEO | ⬜ Upcoming |
| Day 5 (Fri 2026-05-08) | QA, accessibility pass, handoff package | ⬜ Upcoming |

---

## What's built (as of Day 3 AM)

- GitHub repo with Lovable bidirectional sync
- GitHub Actions CI/CD → GitHub Pages deploy (auto-deploys on push to `main`)
- Brand tokens wired (TechD cyan `#00B3E3`, Roboto Condensed font)
- shadcn/ui design system layer
- All 6 page routes scaffolded: `/`, `/solutions`, `/industries`, `/services`, `/resources`, `/contact`
- `<SEO>` component on every page (meta, OG, canonical)
- Header, Footer, Layout components
- Hero redesign: particle field + floating glass cards
- 210 legacy URL content audit complete (`docs/CONTENT-AUDIT.md`)
- 208-rule redirect map built (`docs/REDIRECT-MAP.md`) — ready to deploy via Cloudflare

---

## Active blockers

| Blocker | Owner | Impact |
|---|---|---|
| **Logo SVG files** (color + white) | Product owner to provide | Wordmark placeholder in place — can't launch with placeholder |
| **Mission statement / hero copy approval** | Product owner to approve | Hero has placeholder until sign-off |
| **301 redirect enforcement** | Depends on Day 4 Cloudflare Worker decision | Redirect map ready but GitHub Pages can't serve 301s |
| **WordPress server decommission plan** | Product owner decision | Server is fully compromised — needs explicit forensic review or deliberate skip |

---

## Day 3 progress (content freshness audit)

- Pulled live copy from `/our-story`, `/about-us`, `/depth-of-experience` and the IBM-published TechD + NeuralSeek case study
- Confirmed what's still true: IBM Platinum since 2009, client list (J&J, Comcast, Sony, Princeton, Johns Hopkins), Miami HQ, "gain truth from data" mission
- Removed stale content: CogSuite references, "Watson Assistant" branding, "Premier" tier, "25+ years" math, Wayne PA HQ
- Placeholder pharma stat block removed — replaced with real IBM-published retail case (Db2 + watsonx Assistant + NeuralSeek)
- Industry list rebalanced: dropping unverified "Financial Services", adding "Media & Entertainment" (Sony Pictures + Sony Interactive + Comcast/Peacock)

---

## Friday delivery: what the PM should expect

Friday = **staging-quality build, ready for content sign-off and stakeholder review.** Not a public launch.

The handoff package will include:
- Staging URL (all 7 pages working)
- Contact form live via Cloudflare Worker
- SEO basics in place (sitemap, robots.txt, OG tags)
- A hardening list of what must be done before `techd.com` DNS cutover
