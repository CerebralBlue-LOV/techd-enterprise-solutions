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

## Sprint summary (Week of 2026-05-04)

| Day | Focus | Status |
|---|---|---|
| Day 1 (Mon) | Foundation — repo, CI/CD, brand tokens, scaffold | ✅ Complete |
| Day 2 (Tue) | Content audit (210 pages) + redirect map | ✅ Complete |
| Day 3 (Wed) | Page build — real content in all routes | ✅ Complete |
| Day 4 (Thu) | Sub-pages, company section, resources | ✅ Complete |
| Day 5 (Fri) | Docs cleanup, handoff | ✅ Complete |

---

## What was delivered

### Pages built

| Section | Routes |
|---|---|
| Homepage | `/` |
| Solutions | `/solutions/ai-generative`, `/solutions/data-analytics`, `/solutions/automation-finops`, `/solutions/security-compliance`, `/solutions/hybrid-cloud` |
| Services | `/services/advisory`, `/services/implementation`, `/services/managed-services`, `/services/training` |
| Industries | `/industries/healthcare`, `/industries/media-entertainment`, `/industries/insurance`, `/industries/energy-utilities`, `/industries/higher-education`, `/industries/public-sector` |
| Resources | `/resources/case-studies`, `/resources/blog`, `/resources/webinars`, `/resources/events` |
| Company | `/company/about`, `/company/ibm-partnership`, `/company/customers` |
| Contact | `/contact` |
| 404 | `*` |

### Infrastructure

- GitHub Actions CI/CD → auto-deploys to GitHub Pages on every push to `main`
- Brand tokens wired (TechD cyan `#00B3E3`, Roboto Condensed font)
- SEO component on every page (meta tags, Open Graph, canonical URLs)
- 208-rule redirect map built and ready (`docs/REDIRECT-MAP.md`)
- Content freshness audit complete — stale IBM product names corrected, unverifiable stats removed
- Industry list rebalanced: "Financial Services" removed (no verified clients), "Media & Entertainment" added (Sony, Comcast confirmed)

---

## What still needs to happen before public launch

See the **Deferred Items** document for the full list. Key blockers:

| Item | Owner | Notes |
|---|---|---|
| **Logo SVG files** (color + white) | Product owner | Wordmark placeholder in use — cannot launch with this |
| **Hero copy / mission statement sign-off** | Product owner | Placeholder text in hero until approved |
| **Contact form backend** | Engineering | AWS Lambda + SES function not yet built |
| **301 redirect activation** | Engineering + IT | Redirect map is ready; needs Cloudflare proxy or CloudFront in front of GitHub Pages |
| **WordPress server decommission** | Product owner decision | Fully compromised — needs forensic review or explicit decision to skip |
| **DNS cutover to techd.com** | Product owner + IT | Coordinate timing and rollback plan |

---

## Friday handoff

This staging build is **production-quality code, ready for content review and stakeholder sign-off.** It is not a public launch.

Before the site goes live at `techd.com`, a hardening phase is required. See the Deferred Items document for what that includes.
