# Architecture decisions

Settled decisions with rationale. Read this before relitigating stack choices, IA structure, or build configuration.

---

## Contact form: Google Apps Script

**Decision:** The contact form POSTs directly to a Google Apps Script web app inside TechD's Google Workspace. No Lambda, no Cloudflare Worker.

**Why:** TechD's Google Workspace owns the email infrastructure. The script URL is the only credential — safe to commit because anyone with it can only POST a lead payload to TechD's own sheet and mailbox. `mode: "no-cors"` + `Content-Type: text/plain` avoids the CORS preflight that Apps Script cannot satisfy.

**Trade-offs accepted:** Opaque response (status 0) — frontend treats any non-thrown fetch as success. No server-side validation errors surfaceable. Apps Script daily quota (~1500 emails on Workspace) is fine for marketing-site lead volume. See CLAUDE.md for full integration details.

---

## Hosting: GitHub Pages

**Decision:** GitHub Pages is the hosting platform. `vite.config.ts` sets `base: "/techd-enterprise-solutions/"` in production. React Router uses a matching `basename`. SPA fallback: `cp dist/index.html dist/404.html` in the deploy workflow.

**Why:** Static marketing site — zero infra to manage. GitHub Actions CI/CD already in place.

**Constraint:** GitHub Pages cannot serve HTTP 301 redirects natively. Domain cutover to `techd.com` will require a Cloudflare proxy or AWS CloudFront in front of GitHub Pages to enforce legacy URL redirects.

**Revisit if:** Custom domain is confirmed — base path changes back to `/`.

---

## Repo is public

**Decision:** Repository is public.

**Why:** GitHub Pages doesn't support private repos on the org's current plan. No secrets in the codebase — secrets stay in GitHub Secrets and environment variables.

---

## Stack: locked

**Decision:** Vite 5 + React 18 + TypeScript + Tailwind CSS + shadcn/ui. No migration to Astro, Next.js, or any other framework.

**Trade-off accepted:** Client-rendered React means weaker default SEO than SSG. Mitigation: per-page `<SEO>` component, semantic HTML, `sitemap.xml`, OG tags.

---

## Lovable + Claude Code: bidirectional on main

**Decision:** Both Lovable and Claude Code commit directly to `main`. Always `git pull` before local work.

**Responsibility split:** Lovable = visual iteration and components. Claude Code = build config, infra, content data files, SEO, anything Lovable does badly.

---

## 3D figures: react-three-fiber, lazy-loaded

**Decision:** Hero particle field and practice figures built with `three` + `@react-three/fiber` + `@react-three/drei`. All figure components loaded via `React.lazy` + `Suspense`. Route-level code splitting via lazy imports in `routes.tsx`. Figures not rendered on mobile.

**Trade-off accepted:** three.js vendor chunk (~666 KB) loads lazily — no impact on initial paint. `HeroFigureFallback` (CSS radial glow) renders while loading and on mobile.

---

## No 410 redirects

**Decision:** All legacy techd.com URLs get 301'd to new equivalents. No 410s.

**Why:** Spam on the legacy WordPress site was theme-level PHP injection on `/` only, served conditionally to crawlers via cloaking. Spam dies when WordPress dies. All 210 legacy URLs map to real new destinations — none need to be declared gone.

---

## Information architecture

### Solutions: 5 outcome-based practices

**Decision:** Collapsed IBM's 10-product-family taxonomy into 5 outcome-based practices. Buyers search by pain point, not IBM product family. Products get individual detail pages at `/solutions/<practice>/<product>`.

| Practice | Outcome |
|---|---|
| AI & Generative | Ship trustworthy gen AI on governed enterprise data |
| Data & Analytics | Make data AI-ready, governed, and defensible |
| Automation & FinOps | Observe everything, optimize spend, eliminate manual toil |
| Security & Compliance | Pass the audit. Protect the data. Respond to the breach. |
| Infrastructure | Run watsonx and Cloud Pak for Data on-prem, cloud-grade operations |

**IBM brand naming:** Watson → watsonx equivalents throughout; InfoSphere brand dropped; "Cloud Private for Data" removed; InfoSphere MDM → IBM MDM.

**Excluded:** Watson AI Applications (discontinued), SPSS (no active TechD delivery evidence), BigInsights (replaced by watsonx.data), InfoSphere Information Server (superseded by DataStage). TechD CogSuite is a differentiator callout on the Cognos Analytics product page — not a nav item.

---

### Services: 4 lines

**Decision:** 15+ legacy service sub-pages consolidated into 4 routes — Advisory, Implementation, Managed Services, Training. "Consulting" and "Advisory" merged into Advisory.

**Open question (awaiting Cesar):** Should reactive post-go-live support be a 5th service line (`/services/support`) separate from proactive Managed Services, or a named tier within Managed Services? If yes: new entry in `src/content/services.ts`, new route, new page `src/pages/services/Support.tsx`.

---

### Industries: 6 verticals

**Decision:** Industries section added (no equivalent existed on legacy techd.com). Six verticals backed by verified client evidence.

**Financial Services removed:** Appeared on old site but no verifiable client evidence found.

**Media & Entertainment added:** Sony Pictures, Sony Interactive, Comcast/Peacock are confirmed TechD clients.

---

### Resources: clean slate

**Decision:** All ~86 legacy webinar and event URLs dropped — no historical archive. Four routes (case-studies, blog, webinars, events) are placeholders awaiting CMS integration.

**One verified case study:** IBM-published TechD/NeuralSeek retail stack (Db2 + watsonx Assistant). All other case study cards are placeholders pending legal approval.
