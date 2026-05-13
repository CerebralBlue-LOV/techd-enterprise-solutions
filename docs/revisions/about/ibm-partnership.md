# IBM Partnership

## 1. Extracted & Verified Data

Core facts from legacy pages (`/ibm-business-partner/`, `/our-story/`) that remain accurate and defensible in 2026:

- **IBM Platinum Business Partner** under the IBM Partner Plus program (highest commercial tier). Relationship active since 2009.
- **Authorized IBM reseller and implementer** — we design, resell, implement, and deliver training for IBM solutions.
- **Practice coverage:** AI & Generative Solutions, Data & Analytics, Automation & FinOps, Security & Compliance.
- **Quick Start Advisory Services** — a defined offering combining advisory, implementation, training, and post-implementation support. Available for organizations of all sizes and across industries.
- **IBM Partner Directory listing** confirms active partner status. Listing ID: `69abd900-4f1d-11df-ac68-020031000011` (Technology Dynamics, Inc.).
- **Confirmed product portfolio — 21 products across four practices** (per `docs/revisions/services/advisory.md`):
  - *AI & Generative:* watsonx.ai, watsonx (platform), watsonx Orchestrate, IBM watsonx Assistant, NeuralSeek, IBM SPSS Modeler
  - *Data & Analytics:* IBM Db2, watsonx.data, watsonx.data intelligence, watsonx.data integration, Cloud Pak for Data, IBM DataStage, IBM Netezza Performance Server, Cognos Analytics 12, Planning Analytics
  - *Automation & FinOps:* IBM Apptio, IBM Instana, IBM Turbonomic
  - *Security & Compliance:* IBM Guardium, IBM QRadar, IBM QRadar SOAR
- Delivery available on-site or remote.
- Engagement structured around IBM's AI Operating Model: govern, integrate, orchestrate, automate.

## 2. Legacy Data Discarded

- **"Premier IBM Business Partner"** — IBM retired this tier January 2023. Correct term is IBM Platinum Business Partner under IBM Partner Plus. Remove from all copy.
- **IBM Watson Assistant** (standalone pre-watsonx name) — renamed to IBM watsonx Assistant. Update references.
- **IBM Watson Discovery** — product has been substantially repositioned under the watsonx umbrella; not in TechD's confirmed portfolio. Remove.
- **IBM Watson Natural Language Understanding** — not in confirmed portfolio. Remove.
- **"Watson Applications" / "Watson AI Applications"** — vague legacy grouping. Remove entirely.
- **IBM Watson Knowledge Catalog** — not in confirmed portfolio. If needed, reference IBM Knowledge Catalog with PM confirmation.
- **"DB2 Warehouse"** — not in confirmed portfolio. Use IBM Db2 only.
- **IBM InfoSphere** (as a standalone product line) — not in confirmed portfolio. IBM DataStage is the correct data integration reference.
- **IBM Master Data Management (MDM)** — not in confirmed portfolio. Remove.
- **IBM BigInsights** — withdrawn from marketing. Remove.
- **IBM Cloud Pak for Data System** (the hardware appliance) — all models end-of-life by April 2023. References should be to Cloud Pak for Data (software platform).
- **IBM Cloud** (as a generic line item) — too broad. Current references should be specific: watsonx.data, Cloud Pak for Data, IBM Db2 on Cloud, etc.
- **IBM Tivoli** — end-of-support products in TechD's confirmed portfolio. Remove.
- **IBM Business Partner Certificate PDF** (techd.com WordPress URL) — dead link. Do not republish.
- **"As a leading IBM Analytics and Security software systems integration company"** — filler. Drop.
- **CogSuite as a partnership differentiator** — legacy proprietary tooling framed as a core IBM partnership credential. It is not. Remove from partnership copy.
- **"underpinned by IBM Watson" custom app development** — outdated framing. Custom application development using IBM AI means watsonx.ai and watsonx Orchestrate in 2026, not Watson APIs.
- **"companies of all size, large, mid-sized business, and start-ups"** — TechD's documented client base is enterprise and regulated-industry. Remove the start-up reference; it undercuts the credibility positioning.

## 3. 2026 IBM Partner Alignment

IBM Partner Plus Platinum is the current and correct credential. The portfolio has expanded significantly beyond the legacy copy: Automation & FinOps (Apptio, Turbonomic, Instana) was entirely absent from the legacy IBM Business Partner page. The IBM AI Operating Model announced at Think 2026 — govern, integrate, orchestrate, automate — is the current strategic framework IBM presents to enterprise buyers. We use this model to structure client conversations: it gives a shared vocabulary with IBM's own field teams and positions TechD as current on IBM strategy.

The Quick Start Advisory Services concept is sound and should be retained as a named, structured offering — it is the most concrete service deliverable described in the legacy partnership copy.

## 4. Content to Update

**IBM Partnership page component:**
- Does not exist yet. Will need to be built.
- Remove all pre-watsonx product name references.
- Replace "Premier" tier mention with "IBM Platinum Business Partner (IBM Partner Plus)."
- Add Automation & FinOps practice area — entirely absent from legacy page.
- Add IBM QRadar SOAR to security coverage (legacy page lists only Guardium and QRadar).
- Add NeuralSeek and IBM watsonx Orchestrate to AI coverage.
- Remove CogSuite from the partnership narrative.
- Remove IBM Partner Certificate PDF link (dead).

**`src/content/site.ts` or a new `src/content/about.ts`:**
- No IBM partnership data is currently structured in any content module. A new `IBM_PARTNERSHIP` export is needed.

## 5. Proposed New Sections

**IBM Partner Plus Platinum credentials block**
A factual callout replacing unverifiable "first to implement" claims: IBM Platinum Business Partner, IBM Partner Plus. Link to the IBM Partner Directory listing. List active domain certifications if confirmed by PM. This is auditable and survives procurement scrutiny; sequence claims do not.

**Practice-to-product grid**
A scannable table: four rows (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance) × confirmed product lists. Gives a procurement-stage architect a fast scope reference. This was entirely absent from the legacy partnership page.

**IBM Think 2026 AI Operating Model alignment**
A brief framing paragraph for executive audiences: "IBM's AI Operating Model — govern, integrate, orchestrate, automate — provides a structured framework for enterprise AI investment. We use it to scope advisory engagements: map current state, identify gaps, sequence investments by business impact." Positions TechD as aligned with IBM's current go-to-market without making unverifiable claims.

**Quick Start Advisory Services block**
Give the offering a structured summary on the IBM Partnership page: scope (advisory + implementation + training + support), target (organizations in any of the four practice areas), format (customized per client), and a clear CTA to the Advisory service page. The legacy copy buries this under generic partnership language — it should be surfaced as the primary named offer.

**IBM Partner Directory link**
A simple factual link to the live IBM Partner Directory listing. Gives buyers an external verification point for our partnership status. No editorial copy needed — the link is the credential.
