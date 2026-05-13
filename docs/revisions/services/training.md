# Training

## 1. Extracted & Verified Data

Core facts from the legacy training page that remain accurate and defensible in 2026:

- TechD offers IBM training across four delivery formats: online/web-based, instructor-led online, instructor-led on-site, and custom.
- General training uses IBM sample data. Custom training uses the customer's own data and environment.
- TechD is an IBM Platinum Business Partner (IBM Partner Plus program) with access to IBM training portfolio pricing programs.
- Confirmed training products include: Cognos Analytics (currently version 12.1.x), Planning Analytics, IBM Db2, IBM DataStage, IBM Guardium, IBM SPSS Modeler, and Cloud Pak for Data platform orientation.
- Training audience spans multiple roles: business analysts, report developers, data engineers, data scientists, and platform administrators.
- Custom training packages are available and scoped to client-specific data, use cases, and deployment environments.
- IBM training portfolio discounts are available through the IBM Partner Plus Platinum tier.

## 2. Legacy Data Discarded

- **"Premier IBM Business Partner"** — IBM retired the "Premier" tier in January 2023. Correct current tier is IBM Platinum Business Partner (Partner Plus). Update all occurrences.
- **Broken link to `tech-dynamics.com/advantages/ibm-partnership`** — Old domain. Remove entirely.
- **"IBM Cloud Pak for Data for Security"** (as a course title) — Tied to CP4D 3.x positioning. Current security platform course is IBM Guardium. Current platform administration course is Cloud Pak for Data Platform Operations.
- **"IBM InfoSphere Information/DataStage"** (as a course listing name) — Current product name is IBM DataStage. Update.
- **"IBM InfoSphere Information Governance"** (as a course topic) — Not in confirmed portfolio. IBM Knowledge Catalog and watsonx.governance are not TechD products. Remove.
- **"IBM DB2" (all-caps)** — Correct to IBM Db2.
- **"IBM Cloud Pak for Data Solution"** (as a generic course title) — Replace with "Cloud Pak for Data Platform Operations" and "watsonx Platform Orientation" as distinct course tracks.
- **"Machine Learning"** (generic, unattributed) — Not specific enough. Replace with IBM SPSS Modeler and watsonx.ai as distinct platform-specific course tracks.
- **"Big Data, Data Science"** (generic) — "Big Data" is not an IBM product category in 2026. Replace with platform-specific titles.
- **"Cognos Connection" and "Query Studio"** (as standalone course topics) — Query Studio was deprecated in Cognos Analytics 11.x; Connection is a portal layer, not a capability course. Fold into IBM Cognos Analytics 12 course tracks.
- **"Workspace Advanced"** — The legacy Planning Analytics interface. Current interface is Planning Analytics Workspace. Update the course listing name.
- **Cognos Samples database framing** — Implementation detail, not a selling point. Remove from customer-facing copy; keep in engagement logistics documentation.
- **watsonx.governance** — Not in TechD's confirmed portfolio. Remove any training references.
- **IBM Cognos Controller** — Not in confirmed portfolio. Remove.
- **IBM SPSS Statistics** — Not in confirmed portfolio. Only IBM SPSS Modeler is listed.

## 3. 2026 IBM Alignment

TechD training maps to all four confirmed practice areas. Course tracks by practice:

**AI & Generative Solutions**
- watsonx.ai — Studio interface, foundation model selection, prompt engineering, fine-tuning, RAG pipeline construction, model deployment and inference APIs. Audience: data scientists, ML engineers, application developers.
- watsonx Orchestrate — agent design patterns, orchestration configuration, policy enforcement. Course development tracking GA release timeline. Audience: automation architects, enterprise AI leads.
- IBM Bob — IDE integration, prompt usage patterns, code review workflows, governance guardrails. Audience: software engineers, developer leads.
- NeuralSeek — knowledge base setup, conversational AI configuration, integration with IBM data sources. Audience: AI solution developers, content strategists.
- IBM SPSS Modeler — data preparation, visual model design, deployment pipeline. Audience: business analysts without programming backgrounds.

**Data & Analytics**
- IBM Db2 — database administration (v12.1, including AI query optimization), SQL fundamentals, performance tuning. Audience: DBAs, application developers.
- watsonx.data — lakehouse architecture, Iceberg table design, Presto query fundamentals. Audience: data engineers, platform architects.
- watsonx.data intelligence — AI-augmented analytics layer usage, integration with Cognos and Planning Analytics. Audience: analytics leads, BI architects.
- Cloud Pak for Data — OpenShift foundations, platform administration, service provisioning, identity management. Audience: platform administrators, DevOps engineers.
- IBM DataStage — job design, parallel framework, connector configuration, pipeline monitoring. Audience: data engineers, ETL developers.
- Cognos Analytics 12 — foundational (self-service reporting, dashboard design, AI Assistant) and advanced (Framework Manager, Cognos Reporting, administration). Audience: business analysts, report developers, Cognos administrators.
- Planning Analytics — TM1 cube design, Planning Analytics Workspace, budgeting and forecasting model development, Cognos Analytics integration. Audience: finance analysts, TM1 developers.

**Automation & FinOps**
- IBM Apptio — TBM framework orientation, cost allocation model design, reporting configuration. Audience: IT finance managers, FinOps practitioners.
- IBM Instana — APM platform navigation, alert configuration, performance baseline interpretation. Audience: SREs, platform operations teams.
- IBM Turbonomic — resource optimization action review, policy configuration, cloud cost reporting. Audience: cloud architects, FinOps teams.

**Security & Compliance**
- IBM Guardium — data activity monitoring policy design, compliance reporting, vulnerability assessment interpretation. Audience: data security analysts, DBAs, compliance officers.
- IBM QRadar — SIEM fundamentals, use case configuration, alert triage workflows. Audience: security analysts, SOC teams.
- IBM Resilient (QRadar SOAR) — playbook design, automated response configuration, incident lifecycle management. Audience: security operations leads, SOC engineers.

All tracks are available in all four delivery formats. Custom engagements use client data and client environments.

## 4. Content to Update

**In `src/content/services.ts`:**
- The `training` entry is solid. `promise`, `description`, and `highlights` are voice-compliant and accurate. Retain as-is.
- Highlights ("Executive briefings," "Architect bootcamps," "Hands-on engineering labs") map correctly to the three role tiers. No changes needed.

**On the Training page component:**
- Remove the entire legacy course list. Replace with courses organized by IBM practice area (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance).
- Remove all references to "Premier IBM Business Partner." Replace with "IBM Platinum Business Partner (IBM Partner Plus)."
- Remove the broken `tech-dynamics.com` link.
- Remove Query Studio, Cognos Connection as standalone line items.
- Remove "IBM Workspace Advanced" — replace with IBM Planning Analytics Workspace.
- Remove "Big Data, Data Science" and "Machine Learning" as generic line items.
- Replace "IBM InfoSphere Information/DataStage" with IBM DataStage.
- Replace "IBM Cloud Pak for Data for Security" with IBM Guardium.
- Replace "IBM Cloud Pak for Data Solution" with Cloud Pak for Data Platform Operations.
- Replace "IBM InfoSphere Information Governance" — remove (not in portfolio).
- Replace "IBM DB2" with IBM Db2.
- Add the Automation & FinOps practice (Apptio, Instana, Turbonomic) — entirely absent from legacy training page.
- Add IBM QRadar and QRadar SOAR to security training alongside Guardium.
- Add NeuralSeek and IBM Bob to AI training.
- Add watsonx.data intelligence and watsonx.data integration as distinct course areas.

## 5. Proposed New Sections

**Role-Based Course Tracks**
Organize the course catalog into three tracks matching the `highlights` in `services.ts`:
1. **Executive Briefings** — half-day or full-day sessions for CIOs and business leaders: IBM AI Operating Model overview, watsonx platform capabilities, ROI framing for confirmed practice areas
2. **Architect Bootcamps** — 2–5 day deep dives for solution architects: platform design, reference architectures, integration patterns across AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance
3. **Engineering Labs** — hands-on configuration courses for data engineers, developers, and administrators: platform-specific, uses client data where possible

Structure makes it immediately clear which track fits which buyer role.

**Custom Training Engagement Description**
Give custom training a named section beyond a bullet point: "We build training curricula using your data, your environments, and your team's role context. A custom engagement begins with a scoping session to map skills gaps to IBM platform capabilities, then delivers materials designed for your deployment — not a generic IBM sample environment." This is a genuine differentiator for organizations with non-standard deployments or sensitive data.

**Delivery Format Selector**
A structured block presenting all four delivery formats with a note on when each fits:
- Online/web-based — self-paced, individual contributors, asynchronous teams
- Instructor-led online — cohort learning, distributed teams, live Q&A
- Instructor-led on-site — hands-on labs, on-premises platform access required, team cohesion goal
- Custom — bespoke curriculum, client data, client environment

Reduces friction for procurement teams evaluating logistics before a sales call.

**IBM Platinum Partner Training Advantage**
"As an IBM Platinum Business Partner, we deliver IBM-certified curricula with access to IBM training materials and pricing programs. Our instructors hold active IBM certifications on the platforms they teach." Replaces the defunct "Premier" tier claim with an accurate, auditable statement.

**Training as a Post-Implementation Deliverable**
"We include structured knowledge transfer in every implementation engagement. After go-live, we offer role-specific training sprints to accelerate adoption across analyst, engineering, and operations teams." Positions training as a continuous engagement across the services lifecycle, not a standalone purchase.

**Agentic AI Enablement Track (Forward-Looking)**
"As IBM watsonx Orchestrate moves toward general availability, we are developing enablement curricula for teams designing and operating multi-agent AI systems: agent design patterns, orchestration configuration, production operations, and policy governance." Forward-looking signal without overclaiming current inventory.
