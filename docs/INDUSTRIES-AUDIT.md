# TechD — Industries Audit
**Source:** https://techd.com/ + crawl data at `/home/fabio/Documents/TechD/techd-crawl/`
**Audited:** 2026-05-06
**Purpose:** Determine what industry verticals TechD actually serves, where that evidence comes from on the live site, and what the new site's `/industries` page should say.

---

## Critical Finding: No "Industries" Section Exists on techd.com

The live techd.com navigation has **no "Industries" top-level item**:

```
NeuralSeek | Converlistics | Data Solutions | Services | Resources | Demos | About Us | Contact Us
```

The Industries page in our new site was **not scraped from techd.com** — it was inferred by Lovable when building the scaffold. The content in `src/content/industries.ts` was constructed from the client logos visible on the homepage and case studies page.

This means:
1. There is no source page to audit against (unlike Solutions, which has a full `/data-solutions/` nav tree)
2. Every industry vertical we list must be justified by actual named clients or confirmed webinar/event history
3. The shape of the page is a design decision, not a migration from existing content

---

## Evidence Base: What the Crawl Actually Shows

### Client logos confirmed on live techd.com (homepage + about)

| Client | Industry Vertical | Notes |
|---|---|---|
| Genesis HealthCare | Healthcare | Long-term care / skilled nursing |
| Jefferson Health | Healthcare | Health system, Philadelphia region |
| Temple Health | Healthcare | Academic health system |
| Johns Hopkins Medicine | Healthcare | Academic medical center |
| CHOP | Healthcare | Children's Hospital of Philadelphia |
| Johnson & Johnson | Life Sciences / Pharma | Global pharmaceutical / consumer health |
| Dominion Energy | Energy & Utilities | Regulated electric utility |
| MISO Energy | Energy & Utilities | Midcontinent ISO, grid operator |
| Comcast / Peacock | Media & Entertainment | Cable, streaming, broadband |
| Sony Interactive Entertainment | Media & Entertainment | PlayStation platform |
| Sony Pictures | Media & Entertainment | Film and TV production |
| National General Insurance | Insurance | P&C carrier |
| Pure Insurance | Insurance | High-net-worth homeowner insurance |
| Princeton University | Higher Education | Research university |
| VCU | Higher Education | Virginia Commonwealth University |
| Department of Homeland Security | Public Sector / Government | Federal agency |
| L3Harris | Defense / Technology | Defense electronics contractor |
| The Kennedy Center | Nonprofit / Arts | National performing arts center |
| Corning | Manufacturing | Specialty glass and materials |
| Hamilton Beach | Manufacturing / Consumer | Consumer appliance manufacturer |
| Burlington | Retail | Off-price retail chain |
| KenSeal | Construction / Distribution | Specialty building products |

### Industry-specific webinar/event pages in crawl

These pages confirm TechD has historically marketed to these verticals:

| Page / Event | Vertical Confirmed |
|---|---|
| `techd-announces-big-data-webinar-for-healthcare-providers` | Healthcare |
| `webinar-big-data-and-analytics-for-healthcare` | Healthcare |
| `webinar-future-healthcare-big-data` | Healthcare |
| `webinar-improving-patient-outcomes-at-childrens-hospital-of-philadelphia` | Healthcare |
| `techd-workshop-*-modern-healthcare-organization` (3 cities) | Healthcare |
| `techd-webinar-spss-healthcare` | Healthcare |
| `webinar-predictive-analytics-changing-higher-education` | Higher Education |
| `webinar-universities-competitive-advantage` | Higher Education |
| `techd-webinar-webinar-big-data-cloud-for-higher-ed` | Higher Education |
| `techd-webinar-spss-highered` | Higher Education |
| `webinar-transform-retail-with-big-data` | Retail |
| `webinardata-science-new-age-analytics-communications-utilities` | Communications / Utilities |

### Case study pages in crawl (most return HTTP 500 — server-side dead)

| URL | Status | Inferred Vertical |
|---|---|---|
| `/cancer-treatment-center/` | 500 — dead | Healthcare (Oncology) |
| `/large-hospital/` | 500 — dead | Healthcare |
| `/pharmaceutical-sales-and-marketing/` | 500 — dead | Life Sciences / Pharma |
| `/communications-firm/` | 500 — dead | Telecom / Media |

These pages existed but their content is no longer accessible. They confirm TechD has delivered in Healthcare and Pharma/Life Sciences at minimum.

---

## Verdict on Each Industry in Current `industries.ts`

### 1. Healthcare & Life Sciences
**Evidence strength: Strong**
Five named healthcare clients (Genesis HealthCare, Jefferson Health, Temple Health, Johns Hopkins Medicine, CHOP), plus J&J, plus multiple healthcare-specific webinars and workshops across 3 cities, plus two dead case study pages (cancer treatment center, large hospital). This is TechD's single most documented vertical.

**Recommendation: Keep. Merge J&J into this vertical ("Life Sciences" already in the name).**

> Current copy in `industries.ts` includes "Quest Diagnostics" — not confirmed in crawl data. Verify with TechD before publishing.

---

### 2. Media & Entertainment
**Evidence strength: Strong**
Three named clients: Sony Interactive Entertainment, Sony Pictures, Comcast/Peacock. Dead case study page `/communications-firm/` also points here. These are also featured prominently in marketing copy.

**Recommendation: Keep.**

---

### 3. Insurance
**Evidence strength: Moderate**
Two named clients: National General Insurance, Pure Insurance. No webinar or event pages targeting insurance specifically found in crawl.

> Current copy in `industries.ts` includes "Affinion" — not confirmed anywhere in crawl data. Affinion is a loyalty/marketing technology company, not a classic insurance client. Verify with TechD or remove.

**Recommendation: Keep, but remove or verify "Affinion."**

---

### 4. Energy & Utilities
**Evidence strength: Moderate**
Two named clients: Dominion Energy, MISO Energy. One webinar page targets "Communications / Utilities" jointly. No dedicated energy webinar series found.

**Recommendation: Keep.**

---

### 5. Higher Education & Research
**Evidence strength: Strong**
Two named clients: Princeton University, VCU. Four separate webinar/event pages explicitly targeting higher education. Webinar titles include "predictive analytics changing higher education" and "universities competitive advantage."

> Current copy in `industries.ts` includes "Villanova, Smith College, VCU Health, Temple" — VCU is confirmed. Villanova, Smith College not found in crawl. "Temple" appears as Temple Health (healthcare), not Temple University. Verify each with TechD before publishing.

**Recommendation: Keep. Audit the client list carefully — some may be healthcare clients being misclassified as higher ed.**

---

### 6. Public Sector
**Evidence strength: Weak**
Two clients: DHS (federal government) and L3Harris (defense tech contractor — not a government agency itself). No public-sector-specific webinars or events in crawl.

> These are very different organizations: DHS is a direct government agency; L3Harris is a defense contractor. Grouping them as "Public Sector" is reasonable marketing shorthand, but the vertical is thin.

**Recommendation: Keep for now, but this is the weakest vertical. Flag to TechD — if they have more government/defense clients not listed publicly, this gets stronger. If not, consider folding these clients into the other verticals as supporting evidence.**

---

## Verticals With Evidence But NOT in Current `industries.ts`

### Retail
**Evidence:** Burlington (named client), webinar page `webinar-transform-retail-with-big-data`
**Recommendation:** Do not add a standalone Retail vertical — one client is too thin for a dedicated section. Could mention Burlington as an example of cross-industry reach.

### Manufacturing / Consumer Goods
**Evidence:** Corning, Hamilton Beach, KenSeal (named clients)
**Recommendation:** Do not add — three clients across different manufacturing sub-sectors is too fragmented to make a coherent vertical claim. Could be grouped under "Enterprise" if needed.

### Nonprofit / Arts
**Evidence:** The Kennedy Center (named client)
**Recommendation:** Do not add — single client, too niche.

---

## What to Do with the `/industries` Page

**Option A — Keep as-is (6 verticals)**
The page works as a "proof by client" section. Just clean up unverified client names. The lack of a source page on techd.com is not a problem — this can be a forward-looking differentiator on the new site.

**Option B — Fold industries into the homepage**
Instead of a dedicated `/industries` route, show a 2-row client logo strip on the homepage organized by vertical. Eliminates the thin-evidence problem for Public Sector and Insurance.

**Option C — Reduce to 4 strong verticals**
Drop Public Sector (thin) and merge Insurance into Financial Services (hypothetical expansion). Keep Healthcare, Media, Energy, Higher Ed.

> **My read:** Option A is the right call for launch. The six verticals are defensible, the page is already built, and it gives TechD a place to point prospects from specific sectors. Just clean the unverified client names before going live.

---

## Unverified Client Names to Confirm Before Publishing

These appear in the current `src/content/industries.ts` but are **not confirmed anywhere in the techd.com crawl data**:

| Name | Appears In | Action |
|---|---|---|
| Quest Diagnostics | Healthcare outcome | Verify with TechD or remove |
| Affinion | Insurance outcome | Verify with TechD or remove — may be wrong vertical |
| Villanova | Higher Ed outcome | Verify with TechD or remove |
| Smith College | Higher Ed outcome | Verify with TechD or remove |
| Temple (Higher Ed) | Higher Ed outcome | Likely Temple Health (healthcare) — clarify |
| VCU Health | Higher Ed outcome | Crawl confirms VCU as a client; "VCU Health" is the medical center arm — may be healthcare, not higher ed |

---

## Quick Reference

| Vertical | Keep? | Evidence | Unverified Names |
|---|---|---|---|
| Healthcare & Life Sciences | ✅ Yes | 5 named clients + 6+ webinars | Quest Diagnostics |
| Media & Entertainment | ✅ Yes | 3 named clients | None |
| Insurance | ✅ Yes (clean client list) | 2 named clients | Affinion |
| Energy & Utilities | ✅ Yes | 2 named clients | None |
| Higher Education & Research | ✅ Yes | 2 named clients + 4 webinars | Villanova, Smith College, Temple (Higher Ed), VCU Health |
| Public Sector | ⚠️ Keep, verify | 2 thin clients | None |
| Retail | ❌ Do not add | 1 client | — |
| Manufacturing | ❌ Do not add | 3 clients, fragmented | — |
| Nonprofit | ❌ Do not add | 1 client | — |
