# Implementation

## 1. Extracted & Verified Data

Core facts from legacy implementation pages that remain accurate and defensible in 2026:

- TechD provides end-to-end implementation of IBM data, AI, automation, and security software: installation, configuration, testing, and integration.
- Delivery is available on-site or remote.
- Scope includes project planning, project team building, resource management, and post-deployment training.
- TechD can integrate IBM solutions with non-IBM tools and third-party environments — not limited to IBM-to-IBM integrations.
- After deployment, TechD provides ongoing support and partnership (linked to Managed Services).
- Cloud Pak for Data was explicitly called out as an implementation competency in legacy content.
- Implementation follows solution design: the same team that designs also delivers.

## 2. Legacy Data Discarded

- **"IBM Big Data and Security Solution portfolio"** — "Big Data" is Hadoop-era positioning (2012–2016). IBM does not use "Big Data" as a primary marketing category in 2026. Replace with named current platforms.
- **IBM Streams** — End of support September 30, 2024. Remove from implementation scope.
- **IBM BigInsights** — Withdrawn from marketing. Remove.
- **PureData System for Analytics** — All models end-of-life by April 2023. Remove.
- **IBM Netezza appliance (hardware)** — End-of-life. IBM Netezza Performance Server (software) is the current path.
- **"IBM DB2" (all-caps)** — Correct to IBM Db2.
- **Watson Studio / Watson Machine Learning (standalone)** — Now watsonx.ai. Update.
- **IBM Watson Assistant** — Now watsonx Assistant. Update.
- **IBM Cognos Controller** — Not in TechD's confirmed portfolio. Remove.
- **"IBM Cloud Pak for Data System" appliance** — Hardware end-of-life. Implementation reference should be Cloud Pak for Data (software platform on standard infrastructure).
- **InfoSphere Information Server, InfoSphere QualityStage (as separate deliverables)** — Not in confirmed portfolio. IBM DataStage is the correct implementation reference for data integration work.
- **IBM Master Data Management** — Not in confirmed portfolio. Remove.
- **IBM Knowledge Catalog** — Not in confirmed portfolio. Remove.
- **IBM Db2 Warehouse (separate line item)** — Not in confirmed portfolio. Only IBM Db2 is listed.
- **watsonx.governance** — Not in TechD's confirmed portfolio. Remove.
- **Thin generic implementation copy** — The legacy sub-page body ("We can implement IBM in any environment") provided no differentiation. Nothing is salvageable as production copy. Rewrite entirely from the confirmed product and methodology basis.
- **"IBM Software Hub"** — TechD's confirmed product name is Cloud Pak for Data.

## 3. 2026 IBM Alignment

TechD's implementation practice covers the following confirmed products across four practice areas:

**AI & Generative Solutions**
- watsonx.ai — provisioning on Cloud Pak for Data or IBM Cloud; model deployment pipelines, prompt tuning, fine-tuning workflows, RAG pipeline builds, inference endpoint configuration
- watsonx (platform) — platform architecture, service wiring, and integration across the watsonx suite
- watsonx Orchestrate — agent design and deployment, multi-agent workflow wiring, orchestration policy configuration; implementation services tracking GA release timeline
- IBM Bob — developer toolchain integration, IDE plugin deployment, governance guardrail configuration
- NeuralSeek — knowledge base ingestion pipeline setup, conversational AI deployment, integration with IBM data sources and enterprise search
- IBM SPSS Modeler — predictive model deployment, scoring pipeline configuration, integration with downstream BI and data platforms

**Data & Analytics**
- IBM Db2 — version 12.1 installation and migration, AI-powered query optimization configuration, replication and HA setup
- watsonx.data — open lakehouse provisioning, Iceberg table design and ingestion pipeline configuration, Presto engine tuning
- watsonx.data intelligence — deployment and integration with existing Cognos and Planning Analytics environments
- watsonx.data integration — data integration pipeline implementation within the watsonx.data ecosystem
- Cloud Pak for Data — OpenShift-based cluster provisioning, service cartridge installation, identity and access configuration, namespace and resource management
- IBM DataStage — ETL/ELT pipeline design and deployment, batch and real-time streaming, migration from legacy integration platforms
- IBM Netezza Performance Server — deployment on cloud or on-premises infrastructure for clients migrating off legacy Netezza appliances
- Cognos Analytics 12 — environment build, content migration from prior versions, AI Assistant configuration, Framework Manager semantic layer design
- Planning Analytics — TM1 model design and deployment, Planning Analytics Workspace configuration, Cognos Analytics integration

**Automation & FinOps**
- IBM Apptio — TBM framework deployment, cost allocation model build, cloud cost reporting configuration, integration with ITSM and cloud billing sources
- IBM Instana — agent deployment across application tiers, dashboard configuration, alerting policy setup, integration with incident management platforms
- IBM Turbonomic — resource optimization policy deployment, hybrid cloud workload analysis configuration, integration with cloud management platforms

**Security & Compliance**
- IBM Guardium — data activity monitoring policy deployment, database vulnerability scanning, compliance report configuration (SOX, PCI-DSS, HIPAA, NERC-CIP)
- IBM QRadar — SIEM environment build, use case and detection rule deployment, data source integration, tuning and noise reduction
- IBM Resilient (QRadar SOAR) — playbook deployment, integration with QRadar for automated triage, ticketing system and communication tool wiring

We configure IBM environments from a verified reference architecture baseline, not from vendor defaults. All implementations include a post-go-live stabilization period with documented runbooks before handoff.

## 4. Content to Update

**In `src/content/services.ts`:**
- The `implementation` entry is solid. `promise` ("From PowerPoint to production."), `description`, and `highlights` are voice-compliant and accurate. Retain as-is.

**On the Implementation page component:**
- Remove all references to "IBM Big Data" — replace with the four confirmed practice areas.
- Remove IBM Streams, IBM BigInsights, PureData from any product or coverage lists.
- Remove "IBM Cloud Pak for Data System" appliance references; replace with Cloud Pak for Data (software).
- Update all Watson product names to watsonx equivalents.
- Replace "IBM DB2" with "IBM Db2."
- Replace generic "we can implement IBM in any environment" with the four-phase delivery methodology and product coverage grid (see Section 5).
- Add the entire Automation & FinOps practice (Apptio, Instana, Turbonomic) to implementation coverage — entirely absent from legacy pages.
- Add IBM QRadar and QRadar SOAR to security implementation coverage alongside Guardium.
- Add NeuralSeek and IBM Bob to AI implementation coverage.
- Add watsonx.data intelligence and watsonx.data integration as distinct implementation deliverables.
- Add explicit post-go-live stabilization period as a named implementation phase.

## 5. Proposed New Sections

**Four-Phase Delivery Methodology**
A scannable block answering "what does an implementation engagement look like?":
1. **Design** — solution architecture blueprint, infrastructure sizing, integration map, security and access design
2. **Build** — platform provisioning, pipeline and model deployment, integration wiring, data connection setup
3. **Validate** — load testing, user acceptance, security review, performance baseline
4. **Stabilize** — 30-day post-go-live support, runbook documentation, knowledge transfer, handoff to operations or Managed Services

Each phase lists TechD's specific accountability — not generic project management language.

**Practice Coverage Grid**
A two-column grid: IBM Practice / What We Implement. Four rows (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance), each listing relevant confirmed products. Scannable for a procurement-stage architect.

**"We Build What We Design" Statement**
A short paragraph connecting advisory and implementation: "Our advisory and implementation teams are the same practitioners. The architecture we recommend in an assessment is the architecture we are accountable for delivering — there is no handoff to a separate delivery organization. We own the outcome from whiteboard to production." This is a factual differentiator for a firm of TechD's size and directly addresses a CIO pain point when shortlisting IBM partners.

**Integration Scope Statement**
The legacy site's claim of connecting IBM to non-IBM tools is a genuine differentiator. Make it specific: "We integrate IBM platforms with Salesforce, ServiceNow, Azure Data Factory, Informatica, and enterprise ERP systems. Our scope includes the connector layer and data contract, not just the IBM stack in isolation." Name technologies rather than saying "any tools."

**Hybrid and Multi-Cloud Deployment Note**
IBM's 2026 platform positioning covers IBM Cloud, AWS, Azure, Oracle Cloud, and on-premises. A short section confirming TechD implements Cloud Pak for Data and the watsonx suite across all these deployment targets signals technical breadth without inventing credentials.

**Reference Architecture Artifacts**
A brief mention that TechD brings reusable reference architectures and accelerators to each engagement — substantiating the claim in `services.ts` ("reference architectures, accelerators") without fabricating statistics. If specific accelerators exist (e.g., a DataStage migration script, a Cognos content migration tool), name them here.
