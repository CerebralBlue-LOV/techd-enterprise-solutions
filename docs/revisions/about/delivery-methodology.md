# Delivery Methodology

## 1. Extracted & Verified Data

Core facts from legacy pages (`/ibm-business-partner/`, `/our-story/`, `/depth-of-experience/`, service pages) that remain accurate and defensible in 2026:

- **Engagement model:** Advisory → Implementation → Training → Post-Go-Live Support. This four-stage sequence appears consistently across the legacy Quick Start Advisory Services description.
- **IBM Platform Assessment (one-day evaluation format):** Documented in `docs/revisions/services/advisory.md`. Stages: discovery session → architecture and configuration review → security and user-role review → licensing assessment → written findings report. Deliverable: written comprehensive report covering findings summary, best-practice recommendations, patching and maintenance requirements, licensing summary, expansion and upgrade recommendations, and complementary solution recommendations.
- **Delivery available on-site or remote** for all engagement types.
- **Practitioner certifications confirmed across:** IBM Db2, Cognos Analytics 12, Planning Analytics, IBM DataStage, Cloud Pak for Data, IBM QRadar, IBM Guardium, IBM watsonx suite.
- **"Proven practices" methodology** — referenced consistently across legacy content as the foundation for delivery governance.
- **Post-go-live sustainability:** Quick Start Advisory Services package explicitly includes post-implementation support. This is a differentiator versus project-only engagements.
- **Client verticals with confirmed delivery depth:** Healthcare, insurance, public sector, media & entertainment, higher education, energy & utilities.
- **Compliance frameworks we have implemented against:** HIPAA (healthcare), PCI-DSS (insurance, financial), FedRAMP (public sector), NERC-CIP (energy & utilities).
- **Advisory and implementation staffed by the same certified practitioners** — documented in service structure; no separate advisory-only and delivery-only teams.
- **15+ years IBM implementation experience** (founded 2009, now 2026).

## 2. Legacy Data Discarded

- **CogSuite as a methodology component** — proprietary Cognos tools (Administrator, Content Manager, License Manager) were framed in legacy copy as part of the delivery methodology. They are a separate product question. Remove from all methodology narrative.
- **Hadoop / BigInsights / Tivoli in methodology product references** — all end-of-life or withdrawn. Remove from any methodology descriptions referencing specific technologies.
- **"Maximizing performance management to reduce risk while improving efficiency"** — generic, unverifiable. Drop.
- **"Our quest to future proof your business"** — marketing filler with no delivery content. Drop.
- **"10+ years of experience"** — now 15+ years (2009–2026). Update if experience length is cited.
- **"We know that the success of your organization is due to its people. We believe in the same formula."** — filler. Drop.
- **"Our team is unmatched in terms of breadth and depth"** — unverifiable superlative. Drop.
- **Generic process language:** "we hear you," "we partner with you," "we work closely with clients" — none of these describe an actual methodology. Replace with specific engagement stages and deliverables.
- **"Complimentary Cognos Analytics & Data Warehouse Assessments"** — if this offer is still active, confirm with PM before publishing. Do not carry over from legacy without verification.

## 3. 2026 IBM Partner Alignment

IBM's AI Operating Model (announced Think 2026) — **govern, integrate, orchestrate, automate** — maps directly to TechD's engagement stages:

| IBM AI Operating Model pillar | TechD engagement stage |
|---|---|
| Govern | Advisory Assessment: current-state review, compliance posture, licensing |
| Integrate | Architecture Design + Implementation: data pipeline, platform deployment |
| Orchestrate | Implementation + Knowledge Transfer: agentic AI, workflow automation |
| Automate | Post-Go-Live Support: sustained automation, managed services, optimization |

We use this four-pillar framework to structure client roadmaps. It provides shared vocabulary with IBM's own field teams and gives enterprise buyers a standard maturity framework they can reference against analyst guidance.

## 4. Content to Update

**No current methodology content exists in `src/content/`.**
- The Advisory, Implementation, Managed Services, and Training page components contain service-level methodology copy. An About-level methodology section should sit above these, linking to each service page.
- A new methodology content block is needed — either in `src/content/about.ts` or as a section within the About page component.

**On the About page component (to be built):**
- Replace generic "proven practices" references with the specific engagement stage model: Advisory Assessment → Architecture Design → Implementation → Knowledge Transfer → Post-Go-Live Support.
- Add the IBM AI Operating Model alignment table.
- Add the compliance frameworks callout (HIPAA, FedRAMP, PCI-DSS, NERC-CIP).
- Add the "same practitioners" commitment (advisory and delivery are not separate teams).

## 5. Proposed New Sections

**Engagement model stage flow**
A five-stage visual or scannable list: Advisory Assessment → Architecture Design → Implementation → Knowledge Transfer → Post-Go-Live Support. Each stage with a one-sentence description of what we deliver. No generic consulting language — deliverables only. Example: "Advisory Assessment — structured one-day engagement producing a written findings report: architecture review, security posture, licensing summary, and upgrade path."

**IBM Platform Assessment block**
Surface the one-day evaluation as a named, bookable offer. Scope table: what we review (architecture, configuration, security posture, licensing, upgrade paths) → what we deliver (written report with findings, recommendations, and next steps) → what happens next (Implementation or standalone findings). This existed as a buried list on the legacy site; it deserves a named section.

**Regulated-industry depth callout**
Four compliance frameworks, four industries: HIPAA (healthcare), FedRAMP (public sector), PCI-DSS (insurance), NERC-CIP (energy & utilities). One sentence each: what the framework requires, what we configure to meet it. Demonstrates vertical depth without requiring named client references.

**"Same practitioners, advisory to delivery" commitment**
One focused paragraph: "We do not hand off between advisory and delivery teams. The practitioners who assess your environment design the architecture and execute the implementation. There is no translation layer, no account management layer between our recommendations and the people who build." This addresses a documented CIO pain point when evaluating IBM Business Partners. No filler — just the commitment.

**Delivery governance block**
A concise description of how we manage complex IBM implementations: milestone-based delivery, defined sign-off points, post-go-live SLAs. PM to confirm current delivery governance model before copy is finalized — this should reflect actual practice, not aspirational language.
