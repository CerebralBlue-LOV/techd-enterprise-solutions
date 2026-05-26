# Phase 2 — Keyword & Competitor Research

Goal: ground every page's title, description, and H1 in real search behavior. Deliverable: `docs/SEO-KEYWORD-MAP.md` — a page-by-page table of primary keyword + supporting terms + difficulty + monthly volume, ready to drive Phase 3 copy rewrites.

All research uses Semrush (US database — TechD's primary market is Fortune 500 US clients).

---

## 1. Baseline — where techd.com stands today

- `domain_analysis(techd.com)` — current organic traffic, total ranking keywords, authority score, top 25 ranking terms
- `top_pages(techd.com, limit=25)` — which pages drive the existing traffic (so we don't accidentally cannibalize what's already working)
- `seo_trend(techd.com)` — 12-month trajectory; flag whether the WordPress compromise tanked rankings

## 2. Competitive landscape

- `competitive_analysis(techd.com, limit=15)` — auto-discover real organic competitors
- Cross-check against a curated peer set of IBM partners and enterprise-AI SIs:
  Mainline, Sirius/CDW, Presidio, Ensono, Kyndryl, NTT Data, Protegrity, Prolifics
- `compare_domains(techd.com, <top auto-discovered competitor>)` — head-to-head benchmark
- For 2–3 strongest competitors: `top_pages` to see which pages and topics they win on

## 3. Keyword research per practice / service / industry

Run `keyword_research` (and `serp_analysis` for the most commercial-intent terms) on these seed clusters, then pick the 1 primary + 2–3 supporting terms per page:

**Solutions (5 pages)**
- AI & Generative: `ibm watsonx implementation`, `watsonx partner`, `watsonx.ai consulting`, `watsonx orchestrate partner`, `neuralseek partner`
- Data & Analytics: `ibm cognos partner`, `ibm cognos implementation`, `ibm planning analytics partner`, `ibm cloud pak for data`, `watsonx.data consulting`, `db2 migration partner`
- Automation & FinOps: `ibm apptio partner`, `ibm turbonomic partner`, `ibm instana partner`, `finops ibm`
- Security & Compliance: `ibm guardium partner`, `ibm qradar partner`, `ibm resilient consulting`
- Infrastructure: `ibm storage fusion partner`, `cloud pak on-prem`

**Services (4 pages)**
- `ibm advisory services`, `ibm implementation partner`, `ibm managed services partner`, `ibm training partner`, `watsonx training`

**Industries (7 pages)**
- `ibm partner healthcare`, `hipaa watsonx`, `cognos for hospitals`
- `ibm partner financial services`, `watsonx banking`, `aml ibm`
- `ibm partner public sector`, `fedramp watsonx`, `government ai consulting`
- `ibm partner higher education`, `cognos for universities`
- `ibm partner manufacturing`, `maximo partner`
- `ibm partner energy utilities`, `nerc-cip ibm`
- `ibm partner media entertainment`

**Brand / company**
- `techd`, `ibm gold business partner`, `ibm gold partner miami`, `enterprise ai consulting`

## 4. SERP difficulty triage

For the ~12 most commercially valuable keywords (the ones we most want pages to rank for), run `serp_analysis` to read top-10 competitors and KDI. Mark each in the keyword map as:
- **Realistic** (KDI <40) — target outright
- **Stretch** (KDI 40–60) — go after a long-tail variant first
- **Big-site territory** (KDI 60+) — recommend a more specific phrase

## 5. Output — `docs/SEO-KEYWORD-MAP.md`

Single markdown file with one row per indexable route. Columns:

| URL | Primary keyword | Volume | KDI | Verdict | Supporting terms | Recommended title (≤60 chars) | Recommended description (≤160 chars) |

Plus three appendix sections:
- **Baseline snapshot** — current rankings, authority score, traffic trend
- **Competitor gap shortlist** — 10–15 keywords competitors rank for that we don't, scored by volume × realistic-to-win
- **Quick wins** — pages already ranking positions 4–20 where minor copy improvements should lift them onto page 1

---

## What this phase does NOT touch

No code changes. No page copy edits. No content-file edits. The map is the deliverable; Phase 3 applies it.

## Verification

- Map covers every URL in `public/sitemap.xml` (53 entries)
- Every recommended title <60 chars, every description <160 chars
- Every primary keyword has a Semrush-sourced volume and KDI
- All competitive claims cite a Semrush call

## Note on Semrush quota

This phase is read-heavy (≈40–60 Semrush calls). I'll batch carefully and surface any quota errors immediately rather than partial-fill the map.

## After Phase 2

You review `docs/SEO-KEYWORD-MAP.md`, approve/edit, then I run Phase 3 (per-page copy rewrites) one page-group at a time so you can review each batch before the next.
