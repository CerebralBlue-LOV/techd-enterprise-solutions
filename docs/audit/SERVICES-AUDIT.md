# TechD — Services Audit
**Source:** https://techd.com/services/
**Audited:** 2026-05-07
**Method:** Page-by-page fetch of the live techd.com Services area (Firecrawl unavailable, used `fetch_website`). Raw markdown saved during audit; this doc is the curated catalog.
**Purpose:** Catalog every page reachable from the live techd.com Services nav, evaluate whether the offering and the underlying IBM products are still current for 2026, and flag what should carry over (or be reframed) in the new site.

---

> **Status legend**
> - ✅ Active in 2026 — offering still maps to a current IBM/TechD service line; copy is reusable (with light refresh)
> - ⚠️ Verify — offering still relevant but copy is stale, dated (e.g. "IBM Gold Business Partner" — TechD is now Platinum), or references rebranded products
> - 🔄 Rebranded — the underlying IBM product or service line has been renamed (e.g. CP4D → watsonx.data); update before reuse
> - ❌ Deprecated — page is empty, returns the WP 404 fallback, or describes a product/service that no longer exists
>
> **Copy-quality flag**
> - 📄 Substantive — has real content worth lifting
> - 🪶 Thin — boilerplate paragraph + clients strip; rewrite from scratch
> - 🚫 Broken — WP "nothing was found at this location" fallback

---

## Live nav structure (verified by crawl)

The live Services mega-menu has **5 top-level items**. Two have sub-menus:

```text
Services (/services/)
├── Strategy and Consulting              [sub-menu: 4 items]
│   ├── Solution Design
│   ├── Implementation
│   ├── Field Services
│   └── Lifecycle Services and Customer Success
├── AI & Data Assessment Services        [sub-menu: 3 items]
│   ├── Data Assessment
│   ├── Business Analytics (Cognos / Planning Analytics)
│   └── Security
├── TechD Managed Services               [flat — but page is broken]
├── Technology Expertise                 [flat]
└── Training                             [flat]
```

> **Discrepancies vs. the original brief**
> - "TechD and IBM" is **not** under Services on the live site. It's a separate top-level URL (`/techd-and-ibm/`) that renders a publications/whitepapers feed. Recommend treating it as a Resources item, not a Services item.
> - "Customer Success" is **not** a separate sub-item. It's bundled into "Lifecycle Services and Customer Success" as one page.
> - The brief listed `AI and Data Assessment` as having sub-menus inside the principal sub-menu — confirmed: it has 3 sub-pages.
> - `TechD Managed Services` link exists in the Services nav but the page returns the WordPress 404 fallback ("It looks like nothing was found at this location"). Either the page was deleted, the slug changed, or it never had content. **Decision needed.**

---

## 1. Strategy and Consulting
**Section URL:** https://techd.com/services/strategy-and-consulting/
**Status:** ✅ Active in 2026 — 📄 Substantive intro
**Copy summary:** Positions TechD as a delivery partner across AI, Big Data, Data Warehousing (on-prem + cloud), Data Science, Cognos, SPSS, Watson Analytics, ML, Data Security. Lists what they do: project plan/manage, implement, integrate, troubleshoot, design, leverage best practices.
**Note for new site:** This is the closest match to our current `services.ts` "Advisory" + "Implementation" combined. The page mixes consulting and delivery — in the new IA we keep them split (Advisory vs. Implementation). Don't lift wholesale; cherry-pick the practice list.

| Sub Menu | Page Name | Link | Status | Copy |
|---|---|---|---|---|
| Solution Design | Solution Design | https://techd.com/services/strategy-and-consulting/solution-design/ | ⚠️ Verify | 📄 Substantive — describes assessment → demo → recommend → implement flow. References "IBM Gold Business Partner" — **stale, TechD is Platinum now**. Has placeholder text "non-IBM software that can be resolved through _____ (architecture? Resource allocation?)" — never finished. |
| Implementation | Implementation | https://techd.com/services/strategy-and-consulting/implementation/ | ✅ Active | 📄 Substantive — covers install/setup/test/train/manage/support across the IBM Big Data and Security portfolio. Reusable with light refresh. |
| Field Services | Field Services | https://techd.com/services/strategy-and-consulting/field-services/ | ❌ Deprecated | 🪶 Thin — page contains only the boilerplate "TechD is dedicated to helping organizations…" CTA + clients strip. No actual offering description. **Recommend dropping** unless TechD confirms what "Field Services" is supposed to mean. |
| Lifecycle Services and Customer Success | Lifecycle Services and Customer Success (Post implementation support) | https://techd.com/services/strategy-and-consulting/lifecycle-services-and-customer-success/ | ✅ Active | 🪶 Thin — three sentences: post-deploy support, ongoing IBM support, customer success. Concept is real (this is what we'd call "Managed Services" in the new IA) but copy needs to be rewritten. |

---

## 2. AI & Data Assessment Services
**Section URL:** https://techd.com/services/advisory-assessment-services/
**Status:** ✅ Active in 2026 — 📄 Substantive
**Copy summary:** Catalog of 3 free one-day evaluation offerings. This is a strong "lead-gen" surface for TechD and should absolutely carry into the new site, probably as named offerings under Advisory.
**Note for new site:** The "free one-day evaluation" framing is repeated across all three sub-pages. We can consolidate into a single "TechD Advisor" offering with three lenses (Data, Analytics, Security).

| Sub Menu | Page Name | Link | Status | Copy |
|---|---|---|---|---|
| Data Assessment | Data Assessment: Data Repositories, Data Management Tools, ETL, Data Connections, Security Intelligence, Cloud | https://techd.com/services/advisory-assessment-services/data-assessment/ | 🔄 Rebranded | 📄 Substantive — but the product list is stale: **IBM BigInsights** (discontinued ~2018), **InfoSphere Streams / IBM Streams** (rebranded to IBM Streams Pak then folded), **PureData System for Analytics** (Netezza appliance — replaced by IBM Netezza Performance Server). DataStage, Master Data Management, QualityStage, Netezza Performance Server, Cloud Pak for Data are still current. **Rewrite the product list before reuse.** |
| Business Analytics (Cognos / Planning Analytics) | Business Analytics: IBM Cognos Analytics and IBM Planning Analytics | https://techd.com/services/advisory-assessment-services/analytics/ | ✅ Active | 📄 Substantive — Cognos Analytics, Planning Analytics, Cognos Controller all still active in 2026. Mentions TechD CogSuite, which ties into existing solutions audit. Reusable. |
| Security | Security | https://techd.com/services/advisory-assessment-services/security/ | ⚠️ Verify | 📄 Substantive but **mislabeled** — page header says "Security" but body describes a Cognos Analytics evaluation. Either the wrong content was published or this was meant to cover IBM security products (Guardium, QRadar) and never got written. Treat as broken; rewrite to cover Guardium / QRadar / Verify if those are still TechD offerings. |

---

## 3. TechD Managed Services
**Section URL:** https://techd.com/services/techd-managed-services/
**Status:** 🚫 Broken — page returns WordPress "nothing was found at this location" fallback.
**Note for new site:** The nav links to a dead page. Either Managed Services was a planned offering that never shipped on the legacy site, or the slug changed. In our new site we already have `id: "managed"` in `services.ts` describing 24×7 operations — that's the right offering to keep. **No content to import; write fresh.**

---

## 4. Technology Expertise
**Section URL:** https://techd.com/services/technology-expertise/
**Status:** ✅ Active in 2026 — 📄 Substantive
**Copy summary:** Generic intro restating TechD's positioning (Big Data, Advanced AI, Data Governance, Data Analytics, Hybrid Cloud, Security Software, Technology Consulting). Bullet list of value propositions (ROI, Agile, risk reduction, best practices, roadmaps).
**Note for new site:** This page reads like an "About our capabilities" summary, not a distinct service line. In the new IA, the content belongs on the Services index hero or the About page — not as its own service tile. **Recommend folding into Services index copy.**

---

## 5. Training
**Section URL:** https://techd.com/services/training/
**Status:** ⚠️ Verify — 📄 Substantive but stale catalog
**Copy summary:** Lists IBM training classes offered, both general (Cognos Samples DB) and custom (customer data). Catalog includes:
- Big Data, Data Science · Machine Learning · Cognos Connection · Query Studio · Report Studio Basic / Advanced · Workspace Advanced
- IBM Cloud Pak for Data (Solution + Security) · IBM Guardium · IBM Data and AI · SPSS Modeler
- IBM InfoSphere Information Governance · IBM DB2 · IBM InfoSphere Information / DataStage · IBM Planning Analytics

Delivery modes: on-line/web-based, instructor-led online, instructor-led on-site, custom.

**Stale items to verify:** "Cognos Connection" and "Query Studio" are legacy Cognos BI 10 modules — replaced in Cognos Analytics 11+. "Workspace Advanced" likewise legacy. The IBM training portfolio link references `tech-dynamics.com/advantages/ibm-partnership` — old domain, **broken**.

**Important brand correction:** Page calls TechD a "Premier IBM Business Partner". TechD is now **IBM Platinum Business Partner** — must be corrected on import.

**Note for new site:** Training is a real, named service line. Catalog is reusable but needs a 2026 refresh against the current IBM training portfolio.

---

## Cross-references

### Page that's nav'd but doesn't belong under Services
- **TechD AND IBM** (https://techd.com/techd-and-ibm/) — publications/whitepapers/webinars feed (Cognos Analytics 11.2.3 webinar, Cognos Analytics whitepaper, Cloud Pak for Data whitepaper, etc.). This is a **Resources** page, not a Services page. Re-classify in the new IA.

### Pages linked from inside Services that point elsewhere
- `data-solutions/techd-cogsuite/` — Cognos add-on suite. Already covered in `SOLUTIONS-AUDIT.md`.

---

## Gaps vs. current `src/content/services.ts`

Current `SERVICES` array has 4 items: **Advisory · Implementation · Managed Services · Training**. Mapping to the live site:

| New site service | Live techd.com source | Notes |
|---|---|---|
| Advisory | `/services/advisory-assessment-services/` (Data / Analytics / Security one-day evaluations) + `/services/strategy-and-consulting/solution-design/` | Strongest content area on the live site. The "free one-day TechD Advisor" framing is a real differentiator worth preserving as a named offering. |
| Implementation | `/services/strategy-and-consulting/implementation/` | Solid copy, reusable with light refresh. |
| Managed Services | **No usable source** — `/services/techd-managed-services/` is broken; `/services/strategy-and-consulting/lifecycle-services-and-customer-success/` is thin but conceptually correct. | Write fresh for the new site. |
| Training | `/services/training/` | Reusable catalog but: (a) drop Cognos 10 legacy modules (Query Studio, Workspace Advanced, Cognos Connection), (b) fix "Premier" → "Platinum", (c) fix broken `tech-dynamics.com` link. |

### Items on the live site with no home in the new IA
- **Field Services** — empty page. Drop unless TechD wants this back.
- **Technology Expertise** — folds into Services index hero / About page. Don't make it a tile.
- **Solution Design** — currently a sub-page of Strategy & Consulting. In the new IA, this is an Advisory deliverable, not a standalone service.
- **Lifecycle Services / Customer Success** — folds into Managed Services (post-implementation support is exactly what Managed Services is).

### Net recommendation
Keep the 4-item `services.ts` shape. Use the live site as a **content source**, not a structural guide — the live nav has redundancy (Solution Design / Implementation / Lifecycle all describe phases of the same engagement) that the new IA already fixes.

---

## What was NOT verified in this pass
- Each individual IBM product mentioned was sanity-checked against general 2026 knowledge (BigInsights deprecated, Netezza rebranded as Performance Server, Cloud Pak for Data still current, DataStage still current, Cognos / Planning Analytics still current, Guardium still current). A formal cross-check against the current IBM product catalog (`ibm.com/products`) is recommended before we publish service descriptions that name specific products.
- Whether TechD still actively delivers on every offering listed (e.g. Field Services). **Action: confirm with TechD which service lines they want represented in the new site before final copy.**
