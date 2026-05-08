# Architecture decisions

Architectural and product decisions, dated, with rationale. Future-me and Claude Code read this to avoid relitigating settled questions.

Format: most recent first.

---

## 2026-05-08 — Contact form backend: AWS SES + Lambda (not Cloudflare Worker)

**Decision:** The contact form will POST to an AWS Lambda function, which validates, rate-limits, and forwards via Amazon SES. Cloudflare Worker is off the table.

**Why:** TechD manages AWS infrastructure, not Cloudflare. Using AWS keeps the form backend on infrastructure the team already owns and can operate.

**Trade-offs accepted:** Lambda cold starts are negligible for a low-volume contact form. SES requires domain verification before sending, which must be done before the form goes live.

**Replaces:** The earlier Cloudflare Worker decision (2026-05-04) — that decision is superseded by this one.

---

## 2026-05-08 — Hosting confirmed: GitHub Pages (supersedes PRD)

**Decision:** GitHub Pages is the confirmed hosting platform. The original PRD mentioned ECS + Fargate / AWS App Runner, but Cesar confirmed GitHub Pages.

**Why:** Simpler operational model for a static marketing site. Zero infra to manage. GitHub Actions CI/CD already in place and working.

**Constraint:** GitHub Pages cannot serve HTTP 301 redirects natively. When the domain cutover to `techd.com` happens, a Cloudflare proxy layer (or AWS CloudFront) will be needed in front of GitHub Pages to enforce the 208 legacy URL redirects from `docs/REDIRECT-MAP.md`.

---

## 2026-05-04 — Repo set to public

**Decision:** Repository is public (was private initially).

**Why:** GitHub Pages doesn't support private repos on the org's current GitHub plan. Approved by product owner. Site code will be public anyway when site launches. No secrets in the codebase — secrets stay in GitHub Secrets and AWS environment variables.

**Trade-offs accepted:** Brand assets and placeholder copy visible to anyone with the repo URL during the build week. Acceptable.

---

## 2026-05-04 — Hosting: GitHub Pages + Vite base path

**Decision:** Deploy to `cerebralblue-lov.github.io/techd-enterprise-solutions/` via GitHub Actions. `vite.config.ts` sets `base: "/techd-enterprise-solutions/"` in production. React Router uses matching `basename`.

**Why:** Per product owner's stated stack. SPA-on-Pages requires the `404.html` fallback pattern (handled in deploy workflow: `cp dist/index.html dist/404.html`).

**Revisit if:** Custom domain (`staging.techd.com` or `techd.com`) becomes available — base path changes back to `/`.

---

## 2026-05-04 — Stack locked: Lovable → Vite/React/Tailwind/shadcn → GitHub Pages

**Decision:** Use Lovable's default output (Vite 5 + React 18 + TS + Tailwind + shadcn/ui). No migration to Astro this week.

**Why:** Lovable can't output Astro. Migration mid-sprint costs a day minimum. Acceptable for staging-quality launch. If SEO benchmarks fail post-launch, revisit Astro in a hardening phase.

**Trade-off accepted:** Client-rendered React means weaker default SEO than SSG. Mitigation: per-page meta tags via `<SEO>` component, semantic HTML, sitemap.xml, OG tags.

---

## 2026-05-04 — Lovable + Claude Code: bidirectional, both work on `main`

**Decision:** Lovable's GitHub integration stays connected. Both Lovable and Claude Code commit directly to `main`. Always `git pull` before local work.

**Why:** Tested — bidirectional sync works. Splitting tools by responsibility (Lovable = visual/components, Claude Code = infra/build/Worker/SEO/content) keeps conflicts rare.

**Risk:** Merge conflicts if both tools touch the same file in the same session. Mitigated by working asynchronously and pulling frequently.

---

## 2026-05-04 — No 410 redirects in the redirect map

**Decision:** All 210 legacy URLs from techd.com get 301'd to new equivalents. No 410s.

**Why:** Spam was theme-level PHP injection on `/` only, served conditionally to crawlers via cloaking. Not a separate spam URL path. The homepage can't 410 itself. Spam dies when WordPress dies. Recovery via Google Search Console post-launch.

**See:** `docs/SPAM-REPORT.md`

---

## 2026-05-04 — Contact form: separate backend, not in React app

**Decision:** Form POSTs to a backend endpoint. Validation, rate-limiting, and email forwarding happen server-side. CRM integration deferred.

**Why:** GitHub Pages is static — no backend can run in the React app.

**Superseded:** Original plan was Cloudflare Worker. Decision updated 2026-05-08 to AWS Lambda + SES. See the 2026-05-08 entry above.

---

## 2026-05-04 — 3D hero: react-three-fiber + drei (lazy-loaded)

**Decision:** Hero particle field built with `three` + `@react-three/fiber` + `@react-three/drei`. Component loaded via `React.lazy` + `Suspense`. Not mounted on mobile (`< md`).

**Why:** Lovable's hero plan specified this stack. Packages pinned: `three@^0.160`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`.

**Trade-off accepted:** ~200KB additional bundle (lazy-loaded, so no impact on initial paint). Static fallback rendered on reduced-motion. Canvas omitted on mobile to save battery.

---

## 2026-05-04 — Friday is staging-quality, not production-ready

**Decision:** Friday delivery is "production-quality build, ready for review and content sign-off, with a defined hardening phase before public launch." Not a public-launchable site.

**Why:** PRD scopes a multi-phase project. 5-day compression means deferring: full WCAG 2.2 AA audit, third-party pen test, Lighthouse 90+ across all pages, real CRM integration, 6 legal-approved case studies, CMS, dark mode, ROI calculator. Product owner must understand the gap.

**See:** `docs/GRAND.md` deferred section.

---

## Template for new entries

```
## YYYY-MM-DD — Short decision title

**Decision:** What was decided.

**Why:** Reasoning, constraints considered.

**Trade-offs accepted:** What we're giving up.

**Revisit if:** Conditions that would prompt reconsideration.
```
