# Company Overview

## 1. Extracted & Verified Data

Core facts from legacy pages (`/our-story/`, `/about-us/`, `/depth-of-experience/`) that remain accurate and defensible in 2026:

- **Legal name:** Technology Dynamics, Inc. — brand name: TechD.
- **Founded:** 2009 by Marc Martina, Miami, FL.
- **Headquarters:** 50 Biscayne Blvd, Suite 4902, Miami, FL 33132.
- **Geographic reach:** Resources distributed across USA and Canada.
- **IBM relationship:** IBM Platinum Business Partner under the IBM Partner Plus program (highest commercial tier) since 2009. Authorized reseller and implementer.
- **Mission:** "TechD is dedicated to helping organizations gain truth from their data."
- **Delivery model:** Design → Resell → Implement → Educate and Enable.
- **Four practice areas:** AI & Generative Solutions, Data & Analytics, Automation & FinOps, Security & Compliance.
- **Confirmed product portfolio:** 21 products across four practices (documented in `docs/revisions/services/advisory.md`).
- **Client verticals served:** Healthcare, insurance, public sector, media & entertainment, higher education, energy & utilities.
- **Service lines:** Advisory, Implementation, Managed Services, Training.

## 2. Legacy Data Discarded

- **"Premier IBM Business Partner"** — IBM retired this tier in January 2023 when it launched the IBM Partner Plus program. The correct current tier is **IBM Platinum Business Partner**. Drop everywhere, including the `/our-story/` page which uses "Premier" inconsistently alongside "Platinum" in the same copy.
- **Pennsylvania HQ address** (489 Devon Park Drive, Suite 318, Wayne PA 19087) — surfaced in a historical news item. Superseded by the Miami HQ. Do not republish.
- **CogSuite product suite** (TechD Administrator, Content Manager, License Manager) — proprietary Cognos tooling from the legacy era. Not part of the current go-forward company narrative. If there is ongoing CogSuite revenue, it belongs under a specific product page, not the company overview.
- **Pre-watsonx product names throughout:** Watson Assistant, Watson Discovery, Watson NLU, "Watson Applications," "Watson AI Applications," Watson Knowledge Catalog, Tivoli, BigInsights, Hadoop, PureData System, InfoSphere (as standalone) — all either renamed, withdrawn, end-of-life, or not in the confirmed portfolio. Remove from any overview copy.
- **"IBM DB2" (all-caps)** — correct name is IBM Db2.
- **"TechD is the single source for end-to-end expertise"** — an unverifiable superlative. Drop.
- **"best-in-class," "world-class," "our quest to bring the best technologies," "future proof your business"** — generic filler. None of these survive the practitioner-to-practitioner voice filter.
- **Raw legacy client list** — the 28-name client list on `/our-story/` overlaps significantly with the deprecated logos folder in `public/logos/deprecated/`. Do not republish the raw list. Use only the active `CUSTOMERS` array in `src/content/site.ts` as the source of truth for logos displayed on the site.

## 3. 2026 IBM Partner Alignment

TechD holds IBM Partner Plus Platinum tier — the highest commercial tier under IBM's current partner program. The IBM AI Operating Model announced at Think 2026 (govern, integrate, orchestrate, automate) provides the current strategic framing for how we position our four practices. TechD's practice structure (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance) maps directly to each pillar, and the About page should use this alignment as the organizing logic, not the legacy "Big Data, Hybrid Cloud, Security" taxonomy.

## 4. Content to Update

**In `src/content/site.ts`:**
- No company/about data is currently structured here beyond a nav entry pointing to `/company/about`. A new `COMPANY` content export is needed — or a dedicated `src/content/about.ts` module.
- The nav entry exists but the backing page component and data do not.

**In CLAUDE.md:**
- Leadership name exception has been added to the public repo security rules.

**Route:**
- The `/company/about` route appears in the nav but has no page component yet. This will need to be built after content planning is complete.

## 5. Proposed New Sections

**Founding story block**
Two to three sentences. 2009, Miami, IBM ecosystem entry point, current scale. No filler adjectives. Example structure: "We founded TechD in 2009 to deliver IBM analytics implementations directly, without the overhead of a generalist SI. Seventeen years later, we operate as an IBM Platinum Business Partner with practitioners certified across the full watsonx, data, automation, and security portfolio."

**Four-practice coverage summary**
Scannable two-column table or icon grid: Practice area + one-sentence description. Links to the relevant solutions pages. Gives a CIO a fast orientation without requiring them to read paragraphs.

**Geographic reach**
One line: "Headquartered in Miami, FL. Delivery teams distributed across the United States and Canada." No exaggeration about global reach.

**IBM Platinum credential callout**
A factual badge block: IBM Platinum Business Partner, IBM Partner Plus. List active domain certifications if confirmed by PM. This is the auditable replacement for any "first to implement X" claims. Do not list credentials that cannot be verified from an IBM Partner directory lookup.

**Client industry depth**
Six-vertical callout grid (healthcare, insurance, public sector, media & entertainment, higher education, energy & utilities) with named compliance frameworks where applicable (HIPAA, FedRAMP, PCI-DSS, NERC-CIP). Anchors the company's regulated-industry depth without requiring named client references.
