# Architectural Decisions

These are settled decisions made during the sprint. They are logged here so the PM understands the reasoning and so the engineering team doesn't relitigate them mid-build.

---

## Stack: Vite + React + TypeScript + Tailwind + shadcn/ui

**Decided:** 2026-05-04

The site is built with Lovable's default output: Vite 5 + React 18 + TypeScript + Tailwind CSS + shadcn/ui component library. This is a **locked stack** — no migration to Astro, Next.js, or any other framework during this sprint.

**Why:** Lovable (the AI design tool used for visual iteration) outputs this stack. Migrating mid-sprint would cost at least a full day and break the Lovable sync workflow.

**SEO trade-off:** Client-rendered React has weaker default SEO than server-side-generated (SSG) sites. Mitigation: per-page meta tags, semantic HTML, sitemap.xml, and OG tags. If Lighthouse SEO benchmarks are unacceptable post-launch, migrating to Astro is the Phase 3 path.

---

## Hosting: GitHub Pages

**Decided:** 2026-05-04

The site deploys automatically to GitHub Pages via GitHub Actions whenever code is pushed to `main`. Staging URL: `cerebralblue-lov.github.io/techd-enterprise-solutions/`.

**Why:** Per product owner's direction. Zero hosting cost, automated deploys.

**Limitation:** GitHub Pages is static — it cannot serve 301 redirects. The 208-rule redirect map is ready but requires a Cloudflare proxy layer (Day 4) before it can go live.

**Custom domain:** `techd.com` DNS cutover is deferred to the pre-launch hardening phase. It requires coordination between product owner and IT/DNS.

---

## Public repository

**Decided:** 2026-05-04

The GitHub repository is public.

**Why:** GitHub Pages doesn't support private repos on the org's current GitHub plan. Approved by product owner. The site code will be public when the site launches anyway.

**Security:** No secrets in the codebase. API keys and Cloudflare Worker secrets live in Cloudflare dashboard and GitHub Secrets — never in code.

---

## Contact form: Cloudflare Worker (not built into React app)

**Decided:** 2026-05-04

The contact form POSTs to a Cloudflare Worker (Day 4 deliverable). The Worker validates input, rate-limits submissions, and forwards to email + a KV log. CRM routing (Salesforce/HubSpot) is a Phase 2 item.

**Why:** GitHub Pages is static — no server-side processing. Cloudflare account already exists. This approach keeps the frontend decoupled from whichever CRM TechD eventually chooses.

**Status:** Not built yet. Day 4 deliverable.

---

## Lovable + Claude Code: both commit to `main`

**Decided:** 2026-05-04

Two tools write to the repo: **Lovable** (visual components, design iteration) and **Claude Code** (infrastructure, build config, Cloudflare Worker, SEO files, content data). Both commit directly to `main`. The engineering lead always `git pull` before starting local work.

**Responsibility split:**
- Lovable → new components, visual polish, design changes
- Claude Code → build config, GitHub Actions, Cloudflare Worker, content data files, SEO

**Risk:** Merge conflicts if both tools edit the same file simultaneously. Managed by working asynchronously and pulling frequently.

---

## No 410 redirects

**Decided:** 2026-05-04

All 210 legacy URLs from techd.com get 301s to new equivalents. No pages return 410 (Gone).

**Why:** The SEO spam was injected at the WordPress theme level, not via separate spam URLs. The spam affects the homepage cloaking behavior — it can't 410 itself. The spam simply stops when WordPress is shut down.

**Recovery plan:** After launch, submit the homepage to Google Search Console for re-indexing and use the GSC Removals tool to fast-remove cached spam versions.

---

## Friday delivery is staging-quality, not production-ready

**Decided:** 2026-05-04

Friday = production-quality code, ready for **content sign-off and stakeholder review**. This is not a public launch.

The PM needs to communicate clearly to stakeholders what is deferred (see the Deferred Items page in this document set). A hardening phase is required before DNS cutover to `techd.com`.
