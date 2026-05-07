# Deferred Items

These items are **explicitly out of scope** for the 5-day sprint. They are logged here to:

1. Prevent scope creep during the build week
2. Give the PM a clear picture of what comes next
3. Provide a starting point for Phase 2+ planning

---

## Deferred this sprint

| Item | Target Phase | Why deferred |
|---|---|---|
| Individual solution/industry/service detail pages | Phase 2 | Content not fully audited; legal review needed for case studies |
| CRM-routed contact form (Salesforce, HubSpot) | Phase 2 | API access not confirmed; basic Cloudflare Worker ships first |
| Analytics (GA4, Segment, LinkedIn Insight Tag) | Phase 2 | Tracking plan not defined |
| 6 legal-approved case studies | Phase 2 | Legal review cycle takes time |
| OG images (1200×630, per page) | Phase 2 | Static images, not blocking staging |
| CMS integration (Contentful, Sanity) | Phase 3 | 5-day window; Lovable doesn't support CMS sync |
| Blog / news publishing workflow | Phase 3 | Depends on CMS |
| Dark mode | Phase 3 | Low priority; design complexity |
| ROI calculator | Phase 3 | Requires data model + stakeholder sign-off |
| Multi-language | Phase 4 | No content strategy defined |
| Full WCAG 2.2 AA accessibility audit | Pre-launch hardening | Requires dedicated accessibility sprint |
| Third-party penetration test | Pre-launch hardening | Timeline and vendor TBD |
| Custom domain (`techd.com`) DNS cutover | Pre-launch hardening | Requires product owner + IT coordination |
| ABM landing pages / personalization | Phase 5 | Requires analytics + content strategy foundation first |

---

## What must happen before public launch (`techd.com`)

Even after a successful Friday staging sign-off, these items must be resolved before the site goes live at `techd.com`:

1. **Logo SVG files** — typographic wordmark placeholder must be replaced
2. **Hero copy / mission statement** — product owner sign-off required
3. **DNS coordination** — product owner + IT must coordinate Cloudflare proxy setup and DNS cutover
4. **301 redirect activation** — the 208-rule redirect map is built but not live yet (depends on Cloudflare proxy)
5. **WordPress server decommission** — fully compromised server must be taken offline. Needs either forensic review or explicit decision to skip
6. **Google Search Console** — submit new site, request indexing of homepage, use GSC Removals for cached spam
7. **WCAG accessibility pass** — recommended before public launch
8. **Pen test** — recommended before processing any contact form submissions

---

## Phase roadmap summary

| Phase | Name | When | Key deliverables |
|---|---|---|---|
| Phase 0–2 | This sprint | Week of 2026-05-04 | All P0 pages, contact form Worker, SEO basics, redirect map |
| Hardening | Pre-launch | TBD | DNS cutover, accessibility, pen test, logo/copy sign-off |
| Phase 3 | Content ops | TBD | Headless CMS, blog, full case studies, Astro migration consideration |
| Phase 4 | Lead gen | TBD | CRM integration, ROI calculator, analytics, gated content |
| Phase 5 | Scale | TBD | ABM landing pages, personalization, A/B testing |
