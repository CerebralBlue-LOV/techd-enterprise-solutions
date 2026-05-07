# TechD — Resources Audit
**Source:** https://techd.com/resources/ (and sub-areas)
**Audited:** 2026-05-07
**Method:** Page-by-page fetch of the live techd.com Resources area (Firecrawl unavailable, used `fetch_website`). Hub pages crawled in full; per-item pages spot-checked. Raw markdown saved during audit; this doc is the curated catalog.
**Purpose:** Catalog every page reachable from the live techd.com Resources area, evaluate whether the asset is still useful in 2026 (vs. tied to discontinued products like Cognos 10/11.x, BigInsights, Watson Knowledge Catalog, IBM Integrated Analytics System, Netezza Performance Server, Cloud Pak for Data v3.x/v4.0), and decide what — if anything — carries over to the new site.

---

> **Status legend**
> - ✅ Keep — still useful in 2026, can be lifted with light refresh
> - ⚠️ Refresh — concept is fine but copy/products are dated; rewrite before reuse
> - 🔄 Merge — overlaps with another item; combine into one new asset
> - ❌ Drop — tied to a discontinued product, dated event, or has no reusable substance
>
> **Asset-type flag** (the live taxonomy is messy — items appear under multiple "categories")
> - 📰 Blog · 🎓 Webinar · 📅 Event · 📄 Whitepaper · 🏆 Case study · 📣 Press release · 🗣️ User group

---

## TL;DR

**Recommendation: drop the entire historical Resources archive.** Confirms the Day 2 decision (`docs/CONTENT-AUDIT.md`: 112 URLs → `/resources` hub starts clean).

- **Newest content is from late 2022.** Nothing 2023, 2024, 2025, or 2026. The entire library predates watsonx, the rebrand of Cloud Pak for Data, and the current IBM partner-tier program.
- **The "Case Studies" category has 3 items**, and none of them are actually case studies — they're a whitepaper, a webinar, and a product release announcement. The few real client case studies (CHOP, Harrisburg University, large pharma, large hospital) live as dated webinar/event posts, not as proper case studies.
- **The "Webinars" page itself is broken** — returns the WordPress "nothing was found at this location" fallback, identical to the dead `/services/techd-managed-services/` page.
- **Blog ≠ blog.** The "Blogs and Insights" feed is webinar announcements with `Blog` tags slapped on. There's no editorial/thought-leadership content in the modern sense.
- **`/techd-and-ibm/` is a publications/whitepapers feed** (flagged during the Services audit). Same pattern: 2018–2022 Cognos/CP4D content, nothing current.

**What to actually carry over:** zero historical assets. The new `src/content/resources.ts` should be populated from scratch with **net-new 2026 content** — the IBM-published TechD + NeuralSeek + Db2 + watsonx Assistant retail case study (already in `docs/COPY-SOURCE.md`), plus 2–3 new pieces commissioned by TechD post-launch.

---

## Live Resources structure (verified by crawl)

```text
Resources hub (/resources/)
├── Case Studies          (/case-studies/)            — 3 items, mislabeled
├── Blogs and Insights    (/blog/)                    — ~50+ items, mostly webinar promos
├── Webinars              (/webinars/)                — page is BROKEN (404 fallback)
├── Events and Webinars   (/events/)                  — 66 items, all 2015–2022
└── TechD AND IBM         (/techd-and-ibm/)           — publications feed, 2018–2022
```

The hub uses a single tag-based taxonomy: `TechD News`, `Events`, `White Papers`, `Blogs and Insights`, `Webinars`, `Success Stories`, `Publications`, `IBM Data Solutions`, `Cognos User Groups`. **The same item routinely appears under 4–6 tags simultaneously**, which is why the per-section item counts overlap heavily.

> **Discrepancies vs. original brief**
> - The brief assumed Resources, Demos, and About Us. **There is no Demos section** in the live nav or the live mega-menu — it doesn't exist on techd.com. If the new site needs a Demos page, it's net-new content, not a migration.
> - The case-study category is essentially empty (3 items, none real). Real client logos (CHOP, J&J, Sony, Comcast, Princeton, etc.) appear only in the "Featured Clients" strip on every Resources page — **the logos exist, the case studies don't**.

---

## 1. Case Studies (`/case-studies/`)

**Section URL:** https://techd.com/case-studies/
**Status:** ❌ Drop — section is mislabeled and effectively empty

| Item | URL | Type | Date | Status | Note |
|---|---|---|---|---|---|
| Making Data Ready for AI: IBM Cloud Pak for Data — Whitepaper | `/making-data-ready-for-ai-ibm-cloud-pak-for-data-whitepaper/` | 📄 | 2020 | ❌ Drop | Whitepaper, not a case study. CP4D has been rebranded into watsonx.data / watsonx.ai. |
| IBM DataStage on Cloud Pak for Data — IBM & TechD Webinar July 22nd | `/ibm-datastage-on-cloud-pak-for-data-webinar-july-22nd/` | 🎓 | 2020 | ❌ Drop | Webinar, not a case study. Dated. |
| What's New with IBM Cognos Analytics 11.1.6? | `/whats-new-with-ibm-cognos-analytics11-1-6-webinar-may-7th/` | 🎓 | 2020 | ❌ Drop | Cognos 11.1.x is several major versions behind current 12.x. |

**Recommendation:** Don't migrate any of these. The new site's `case-studies` slot should be populated with the IBM-published TechD + NeuralSeek + Db2 + watsonx Assistant retail case (already documented in `docs/COPY-SOURCE.md`) plus any new wins TechD can clear with clients post-launch.

---

## 2. Blogs and Insights (`/blog/`)

**Section URL:** https://techd.com/blog/
**Status:** ❌ Drop — there is no real blog content
**Inventory size:** ~50+ items (sampled top 30)

This is not a blog. Every item under "Blogs and Insights" is one of:
- A webinar announcement with the date in the title (e.g. "Live Webinar Nov 29, 2022")
- A workshop event listing
- A quarterly events digest ("Q1 2018 Upcoming Events", "Q2 2018 Upcoming Events", "Q1 & Q2 2019 Upcoming Events")
- A user-group meeting recap

There are **zero editorial / opinion / thought-leadership posts**. The most recent item is from November 2022. The feed is heavily weighted to 2017–2020 Cognos R8/R9/R10/R11 release announcements.

**Recommendation:** Drop all. The new `/resources?tab=blog` should launch with 2–3 net-new pieces (e.g. "Agentic AI is an operating model, not a feature", "What watsonx gets right that the hyperscalers miss" — the placeholders already in `src/content/resources.ts` are a fine starting list).

---

## 3. Webinars (`/webinars/`)

**Section URL:** https://techd.com/webinars/
**Status:** 🚫 Broken — WP "nothing was found at this location" fallback (same as the dead `/services/techd-managed-services/` page)

The dedicated `/webinars/` page does not render any content. Webinar items are reachable instead via `/events/` (which is titled "Events and Webinars") and via the cross-tagged feeds.

**Recommendation:** Treat as deleted. See section 4 for the actual webinar inventory.

---

## 4. Events and Webinars (`/events/`)

**Section URL:** https://techd.com/events/
**Status:** ❌ Drop — 66 items, all dated 2015–2022, all tied to legacy products
**Inventory size:** 66 unique items

**Date distribution (sampled):**
- 2022: 3 items (Cognos 11.2.3 webinar, IBM vs. AWS lunch-and-learn, Cognos vs. Power BI)
- 2021: 3 items (CP4D v4.0, Cognos 11.2.0)
- 2020: ~12 items (CP4D 3.5, Planning Analytics, Watson Data Science, DataStage, Netezza Performance Server, etc.)
- 2019: ~10 items (Cognos 11.1.x release webinars, Guardium, Planning Analytics)
- 2018: ~10 items (Cognos R6/R9/R10/R11, IIAS, DataStage v11.7, CHOP healthcare workshops)
- 2017 and earlier: ~25 items (Cognos workshops in NYC/Philadelphia/Columbus/Durham, Cognos R6/R7/R8/R9, Big Data, Star Analytics, Harrisburg University Data Analytics Summit)

**Product references that are now dead or rebranded:**
- Cognos Analytics 11.1.x / 11.2.x → current is 12.x
- IBM Cloud Pak for Data 3.5 / 4.0 → rebranded into watsonx.data + watsonx.ai
- Watson Knowledge Catalog → folded into watsonx.governance
- Watson Data Science / Watson Assistant (pre-watsonx) → watsonx.ai
- IBM Integrated Analytics System (IIAS) → discontinued
- Netezza Performance Server / "Next Generation Netezza" → rebranded under Db2 Warehouse on Cloud
- IBM InfoSphere DataStage v11.7 → DataStage on Cloud Pak / IBM DataStage SaaS
- IBM Security Guardium → still exists, but the 2018–2019 messaging is stale

**A few items reference real client engagements** (worth flagging only as *evidence* that the work happened, not as content to migrate):
- Children's Hospital of Philadelphia — improving patient outcomes with IBM Advanced Analytics (2018, 2019)
- Harrisburg University Data Analytics Summit (2015)
- "Pharmaceutical Sales and Marketing", "Large Hospital Data Warehouse", "Cancer Treatment Center", "Large University System", "Major Communications Firm" — appear as bare titles in the Blog feed; the linked pages are likely 1-paragraph stubs (not re-fetched, low-value).

**Recommendation:** Drop the entire archive. Keep the *fact* that TechD ran 60+ public webinars from 2015–2022 as a credibility point we can mention in About copy ("a decade of practitioner-led IBM enablement"), but do not migrate any individual asset.

---

## 5. TechD AND IBM Publications (`/techd-and-ibm/`)

**Section URL:** https://techd.com/techd-and-ibm/
**Status:** ❌ Drop — 502-line publications feed, all 2018–2022

This is the page flagged during the Services audit as "not actually a Services item — belongs under Resources." Confirmed: it's a publications/whitepapers feed using the same WordPress feed template as `/blog/` and `/events/`, just filtered to the `Publications` tag.

**Notable items** (none are 2026-current):
- "Cognos Analytics: The Answers you Need in One Place" — Whitepaper (2020)
- "Making Data Ready for AI: IBM Cloud Pak for Data" — Whitepaper (2020)
- All the same Cognos 11.x / CP4D 3.x / 4.0 webinars cross-listed from the events feed

**Recommendation:** Drop. If TechD wants a "Publications" or "Whitepapers" sub-tab on the new Resources page, commission 1–2 net-new 2026 pieces (suggested topics: "Agentic AI governance for regulated enterprises", "Migrating from Cognos to watsonx").

---

## Cross-cutting findings

1. **The site is frozen at late 2022.** No content has been published in ~3.5 years. This matches the "compromised WordPress, theme-level PHP injection" finding from Day 1 — the site is effectively abandoned.
2. **Taxonomy is broken.** A single Cognos 11.2.3 webinar shows up under Cognos User Groups, Current Events, Event Presentations, Events, and Publications. Don't try to mirror this in the new IA — the Day 1 4-tab structure (Case Studies / Blog / Webinars / Events) is correct.
3. **Featured-clients logo strip is the only durable asset.** It's reused on every Resources page and the client list (CHOP, J&J, Sony, Comcast, Princeton, Dominion, L3Harris, DHS, Burlington, Genesis HealthCare, Jefferson Health, Temple Health, Kennedy Center, Corning CCU, Pure Insurance, National General Insurance, KenSeal) is the strongest credibility signal techd.com has. **Already migrated** in `src/shared/LogoStrip.tsx` and the homepage `LogoStripSection`. Done.
4. **No Demos section exists** on the live site. If the brief calls for a Demos page on the new site, it's a from-scratch build, not a migration.

---

## Gaps vs current `src/content/resources.ts`

Current state (as of audit): 10 hard-coded placeholder entries — 3 case studies, 3 blog posts, 2 webinars, 2 events. All copy is invented.

| Tab | Current placeholders | Action after this audit |
|---|---:|---|
| Case Studies | 3 | Replace 1 placeholder with the **real** IBM-published TechD + NeuralSeek + Db2 + watsonx Assistant retail case (`docs/COPY-SOURCE.md`). Keep other 2 slots empty or use "Coming soon" until TechD clears 2 more client wins. |
| Blog | 3 | Keep the 3 placeholder titles as the editorial backlog. Commission real posts post-launch. |
| Webinars | 2 | Drop both placeholders. Replace with "On-demand webinars coming soon" empty state, or remove the tab entirely until TechD records new sessions. |
| Events | 2 | Verify the IBM Think 2026 + NYC roundtable placeholders are real before launch. If not real, drop the tab. |

**Bottom line:** The migration from techd.com Resources is **0 assets**. The new Resources hub starts clean and is built up from net-new 2026 content. This audit's job is done by *confirming the drop*, not by curating items to keep.
