# PRD: TechD.com Website Replacement

**Owner:** Cesar Anzola
**Stakeholders:** Marc Martina, Cesar Anzola
**Engineering:** Fabio
**Status:** Draft v1.0
**Updated:** April 21, 2026

---

## 1. Summary

Replace techd.com with a modern, fast, secure marketing site that reflects TechD's standing as an IBM Platinum Business Partner serving Fortune 500 clients (J&J, Comcast, Sony, Princeton, Johns Hopkins). The current site is dated, runs on WordPress, and has been compromised — the homepage contains injected SEO spam for Kenyan sports betting sites. Rebuild on a modern stack, clean break.

---

## 2. Problem

1. **Security compromise.** Homepage contains injected spam content unrelated to the business. Unacceptable for a company that sells IBM Security services.
2. **Dated design.** 2020-era WordPress template. Weak hierarchy, low-res icons, deep nested nav, no design system.
3. **No conversion path.** One generic "Schedule a Demo" CTA. Logos shown but no linked case studies, no outcomes, no segmentation.

---

## 3. Goals

Deliver a site that is:

- Fast, accessible, and secure
- Visually aligned with premium enterprise brands
- Editable by marketing without engineering for routine updates
- Built on a stack that scales for 5+ years

**Out of scope:** NeuralSeek site, Converlistics site, daidemos.com, customer portals, martech tool selection.

---

## 4. Success criteria

| # | Criterion | Target |
|---|---|---|
| 1 | Lighthouse Performance (mobile, median page) | ≥ 90 |
| 2 | Core Web Vitals on top 10 pages | All green |
| 3 | WCAG 2.2 AA conformance | Pass, zero critical issues |
| 4 | Spam-injected content on site | Zero |
| 5 | Broken legacy links / missing 301s | Zero |
| 6 | Pages marketing can edit without engineering | ≥ 90% |
| 7 | Third-party penetration test | Pass, no high/critical unresolved |
| 8 | Cross-browser + responsive QA | Pass |

---

## 5. Scope

### Information architecture

Collapse the current 4-level nav into 5 top-level items, max 2 levels deep:

1. Solutions — organized by outcome, not IBM product SKU
2. Industries — Healthcare, Financial Services, Insurance, Energy, Higher Ed, Public Sector
3. Services — Advisory, Implementation, Managed Services, Training
4. Resources — Case Studies, Blog, Webinars, Events
5. Company — About, IBM Partnership, Customers, Contact

Persistent "Talk to an Expert" CTA in the top-right.

### Must have (P0)

- Redesigned homepage with clear hero and value prop
- Solutions section, one page per outcome
- 6+ case studies with quantified results
- Filterable resources hub
- Smart contact form routed to the right sales pod, CRM-integrated
- Headless CMS
- WCAG 2.2 AA, Lighthouse 90+ mobile
- Full 301 redirect map from legacy URLs

### Should have (P1)

- Industry-specific pages with tailored logos and case studies
- Dark mode
- ROI calculator for one flagship offering
- Multi-language framework (English only at launch)

### Later (P2)

- NeuralSeek-powered chat
- A/B testing framework

---

## 6. Technical direction

**Stack:** Lovable + Claude Code → GitHub Pages
**Why:** Hits performance targets, gets us off WordPress (which is how the current site got compromised), automated deploys via GitHub Actions.
**Migration:** Every legacy URL mapped to a 301. Redirect map built before IA is finalized. Spam pages fully de-indexed via Search Console.

---

## 7. Timeline

| Phase | Deliverable |
|---|---|
| 0. Discovery | IA, brand direction, content audit, signed-off success criteria |
| 1. Design + architecture | Design system, P0 templates, content model, security review |
| 2. Build | All P0 pages live in staging, form backend wired |
| 3. Hardening | QA, accessibility audit, pen test, redirect map validated |
| 4. Launch | Cutover, 72-hour war room, retro |

---

## 8. Roles

| Role | Owner |
|---|---|
| Product lead | Cesar Anzola |
| Executive stakeholder | Marc Martina |
| Engineering lead | Fabio |
| Design lead | Cesar Anzola |
| Content | Marc Martina |

---

## 9. Risks

- Current site compromise may run deeper than the visible spam. **Mitigation:** clean-slate build on new stack; don't migrate WordPress.
- SEO ranking loss during migration. **Mitigation:** redirect map built in Phase 0, not Phase 3.
- Scope creep from stakeholder requests. **Mitigation:** strict MoSCoW, Cesar holds the scope line.
- Case study legal approvals delay content. **Mitigation:** legal review starts Phase 0.

---

## 10. Open questions

1. Budget envelope?
2. CRM and marketing automation locked? If not, when?
3. Consolidate NeuralSeek, Converlistics, daidemos.com under one domain?
4. Who owns the P0 spam incident independent of this rebuild, and by when?
5. Is brand being defined here, or is there a parallel refresh?
