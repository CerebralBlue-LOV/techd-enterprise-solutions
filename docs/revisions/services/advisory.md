# Advisory

## 1. Extracted & Verified Data

Core facts from legacy advisory pages that remain accurate and defensible in 2026:

- TechD offers a structured one-day evaluation engagement covering architecture review, hardware specifications, software configuration, security and user-role review, stakeholder discovery session, and licensing or upgrade path assessment.
- A "Quick Start Advisory Services Package" exists with a defined scope: pre-implementation solution design, solution installation and configuration, data connection setup, model and template creation, knowledge transfer, customized training, and post-implementation support.
- TechD's advisory practice spans four IBM solution domains: AI and data science, data integration and analytics, automation and FinOps, and security and compliance.
- TechD is an IBM Platinum Business Partner (Partner Plus program, highest commercial tier).
- Delivery is available on-site or remote for all advisory engagements.
- The deliverable from a one-day evaluation is a written comprehensive report: findings summary, best-practice recommendations, patching and maintenance requirements, licensing summary, expansion and upgrade recommendations, complementary solution recommendations.
- TechD has documented advisory depth across Cloud Pak for Data, IBM DataStage, Cognos Analytics, Planning Analytics, IBM Db2, and the watsonx product suite.
- The advisory offering is structured as customized to each client's specific needs and use cases — not a fixed-scope product.

## 2. Legacy Data Discarded

- **"IBM Gold Business Partner"** — TechD is now an IBM Platinum Business Partner under the IBM Partner Plus program. Gold is a lower tier. Drop everywhere.
- **"Premier IBM Business Partner"** — IBM retired the "Premier" tier in January 2023 when it launched Partner Plus. Correct current tier is Platinum.
- **IBM BigInsights** — Withdrawn from marketing. Remove from all advisory product lists.
- **IBM Streams** — End of support September 30, 2024. Remove from all product lists.
- **IBM Netezza appliance (hardware)** — Original Netezza appliance line is end-of-life. Advisory reference should be IBM Netezza Performance Server (software only).
- **PureData System for Analytics** — All models end-of-life by April 2023. Remove entirely.
- **Watson Studio / Watson Machine Learning (standalone)** — Consolidated into watsonx.ai. Update all references.
- **IBM Watson Assistant (standalone name)** — Renamed to IBM watsonx Assistant. Update references.
- **IBM Cognos Controller** — Not in TechD's confirmed product portfolio. Remove.
- **IBM DB2 (all-caps)** — Correct product name is IBM Db2. Update throughout.
- **InfoSphere Information Server, InfoSphere QualityStage (as standalone products)** — Not in confirmed portfolio. IBM DataStage is the correct advisory reference for data integration.
- **IBM Master Data Management** — Not in TechD's confirmed portfolio. Remove.
- **IBM Knowledge Catalog / InfoSphere Information Governance** — Not in confirmed portfolio. Remove.
- **IBM Db2 Warehouse (as a separate line item)** — Not in confirmed portfolio. Only IBM Db2 is listed.
- **IBM SPSS Statistics** — Not in confirmed portfolio. Only IBM SPSS Modeler is listed.
- **watsonx.governance** — Not in TechD's confirmed portfolio. Remove from advisory coverage.
- **"1st IBM Partner to Sell and Implement CP4D"** — Unverifiable. IBM does not publish partner-sequence records for product launches. Drop. Replace with factual Platinum tier credential.
- **"IBM Cloud Pak for Data System" appliance** — The CP4D System hardware appliance is end-of-life. Advisory reference should be Cloud Pak for Data (software platform).
- **"World-class solutions," "decades of experience"** — Violates practitioner-to-practitioner voice. Remove all superlatives and filler.
- **"IBM Software Hub"** — TechD's confirmed product name is Cloud Pak for Data. Use that.

## 3. 2026 IBM Alignment

TechD's advisory practice maps to four confirmed practice areas and 21 products:

**AI & Generative Solutions**
- watsonx.ai — foundation model development, prompt engineering, fine-tuning, RAG pipeline design, model deployment
- watsonx (platform) — IBM's unified AI platform umbrella; advisory engagements scope platform architecture across this suite
- watsonx Orchestrate — agentic AI design; advisory covers agent topology, orchestration patterns, policy requirements
- IBM Bob — AI-powered code generation and developer productivity; advisory covers adoption roadmap and governance
- NeuralSeek — conversational AI and answer generation on enterprise content; advisory covers knowledge base scoping, integration with IBM data sources
- IBM SPSS Modeler — predictive analytics and ML for analysts; advisory covers model governance and deployment path

**Data & Analytics**
- IBM Db2 — database modernization assessment, upgrade path advisory, AI-powered query optimization (v12.1)
- watsonx.data — open lakehouse architecture design, Iceberg table strategy, Presto engine sizing
- watsonx.data intelligence — AI-augmented analytics layer; advisory covers augmentation of existing Cognos/Planning Analytics deployments
- watsonx.data integration — data integration services within the watsonx.data ecosystem
- Cloud Pak for Data — on-premises AI/data platform; advisory covers deployment architecture, service cartridge selection, resource planning
- IBM DataStage — ETL/ELT pipeline design, migration from legacy integration platforms, real-time streaming architecture
- IBM Netezza Performance Server — migration advisory from legacy Netezza appliances; cloud vs. on-prem deployment options
- Cognos Analytics 12 — BI environment assessment, version upgrade paths (12.1.x current), AI Assistant adoption
- Planning Analytics — TM1 model design advisory, Planning Analytics Workspace migration from legacy interfaces

**Automation & FinOps**
- IBM Apptio — Technology Business Management (TBM) framework advisory, IT financial management maturity assessment, cost allocation model design
- IBM Instana — APM deployment advisory, observability coverage gap assessment, integration with existing monitoring stacks
- IBM Turbonomic — AIOps resource optimization advisory, cloud cost efficiency assessment, hybrid cloud workload placement

**Security & Compliance**
- IBM Guardium — data security posture assessment, compliance gap analysis (SOX, PCI-DSS, HIPAA, NERC-CIP), data activity monitoring policy design
- IBM QRadar — SIEM deployment advisory, use case prioritization, integration with endpoint and identity sources
- IBM Resilient (QRadar SOAR) — security orchestration readiness assessment, playbook design advisory, integration with QRadar and ticketing systems

Advisory engagements align to IBM's AI Operating Model framework (announced Think 2026): govern, integrate, orchestrate, automate. We map client current state to each pillar and identify high-leverage investments.

## 4. Content to Update

**In `src/content/services.ts`:**
- The `advisory` entry is voice-compliant and accurate. `promise` and `description` require no changes.
- Highlights are solid: "AI readiness assessments," "Architecture reviews," "Investment cases." No changes required.

**On the Advisory page component:**
- Replace generic "AI readiness assessments" section language with the specific one-day evaluation deliverable structure: discovery session → architecture and configuration review → licensing review → written findings report.
- Remove all references to "IBM Gold" or "Premier" partner tier. Replace with "IBM Platinum Business Partner (IBM Partner Plus)."
- Remove all legacy Watson product standalone names; update to watsonx equivalents.
- Remove BigInsights, IBM Streams, Netezza appliance, PureData from any product lists.
- Replace "IBM Cloud Pak for Data System" appliance references with Cloud Pak for Data (software platform).
- Add the four confirmed practice areas as the organizing structure for advisory scope: AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance.
- Add IBM Apptio, Instana, and Turbonomic to advisory coverage — the entire Automation & FinOps practice was absent from legacy advisory pages.
- Add IBM QRadar and QRadar SOAR to security advisory coverage alongside Guardium.
- Add NeuralSeek and IBM Bob to AI advisory coverage.
- Add watsonx.data intelligence and watsonx.data integration as distinct advisory areas.
- Remove "1st IBM Partner to implement CP4D." Replace with: "IBM Platinum Business Partner with certified practitioners across the full IBM watsonx, data, automation, and security portfolio."
- Change "IBM DB2" to "IBM Db2" throughout.

## 5. Proposed New Sections

**TechD IBM Platform Assessment (formalize the one-day offering)**
Give the free one-day evaluation a defined name and structured scope table on the page. Present it as: "TechD IBM Platform Assessment — a structured one-day engagement that produces a written findings report covering architecture, configuration, security posture, licensing, and upgrade paths." Include a clear scope table: what we review, what we deliver, what happens next. This makes a named, bookable offer out of content that existed only as a buried list on the legacy site.

**Practice Coverage Grid**
A two-column scannable grid: IBM Practice / Products We Assess. Four rows (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance), each listing the relevant products from the confirmed portfolio. Gives a procurement-stage architect a quick scope reference without requiring them to read paragraphs.

**Engagement Model — Advisory to Implementation**
A short section explaining how advisory leads to delivery: "We design roadmaps we are accountable for executing. Advisory and implementation are staffed by the same certified practitioners — the architecture we recommend in an assessment is the architecture we build. There is no handoff to a different team." Addresses a documented CIO pain point when evaluating IBM Business Partners.

**IBM Think 2026 AI Operating Model Context**
A brief framing section for executive audiences: "IBM's AI Operating Model — govern, integrate, orchestrate, automate — provides a structured maturity framework for enterprise AI investment. We use this model to structure our advisory engagements: mapping your current state, identifying gaps, and sequencing investments by business impact." Shared vocabulary positions TechD as current on IBM strategy without making unverifiable claims.

**IBM Platinum Partner Credential Block**
A factual credentials callout replacing the unverifiable "1st to implement CP4D" claim: IBM Platinum Business Partner, IBM Partner Plus. List active domain certifications if available. This is auditable and survives CIO scrutiny; the sequence claim does not.
