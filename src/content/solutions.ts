export type ProductLink =
  | { kind: "internal"; slug: string }
  | { kind: "external"; url: string };

export type ProductDetail = {
  overview: string[];
  capabilities: string[];
  useCases?: string[];
};

export type Product = {
  name: string;
  tagline: string;
  description: string;
  link: ProductLink;
  /** Optional URL to the vendor's official product page (e.g. ibm.com). */
  vendorUrl?: string;
  detail?: ProductDetail;
};

export type Solution = {
  id: string;
  name: string;
  outcome: string;
  description: string;
  /** 3 short capability phrases (kept for future use; not on home grid). */
  highlights: [string, string, string];
  /** Short pitch paragraph shown on the back of the card after flip. */
  pitch: string;
  /** Short verb phrase used as the card CTA, e.g. "Explore AI practice". */
  ctaLabel: string;
  products: Product[];
  /** Non-IBM tools built by Cerebral Blue that TechD also delivers in this practice. */
  ownTools?: Product[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-generative",
    name: "AI & Generative Solutions",
    outcome: "Ship trustworthy gen AI on top of governed enterprise data.",
    description:
      "Production RAG, agentic workflows, and conversational interfaces built on IBM watsonx — grounded in your data, governed from day one.",
    highlights: [
      "Grounded RAG on your data",
      "Foundation model governance",
      "Agentic workflows in production",
    ],
    pitch:
      "Production-ready generative AI grounded in your enterprise data — built on watsonx with the governance, observability, and lineage your auditors expect.",
    ctaLabel: "Explore AI practice",
    products: [
      {
        name: "NeuralSeek",
        tagline: "Turn your existing knowledge base into a cited, grounded AI assistant.",
        description:
          "NeuralSeek connects to what you already have — SharePoint, Confluence, or any document repository — and returns cited, traceable answers to complex queries in seconds. Designed to layer on top of watsonx Assistant or run as a standalone API, closing the gap between raw document retrieval and enterprise-grade conversational AI.",
        link: { kind: "external", url: "https://neuralseek.com" },
      },
      {
        name: "watsonx.ai",
        tagline: "Build and deploy enterprise AI on foundation models you can trust.",
        description:
          "IBM's enterprise AI studio for training, fine-tuning, and deploying foundation models alongside your own machine learning assets — with built-in governance and MLOps.",
        link: { kind: "internal", slug: "watsonx-ai" },
        vendorUrl: "https://www.ibm.com/products/watsonx-ai",
        detail: {
          overview: [
            "watsonx.ai is IBM's enterprise-grade AI and data science platform for the full model lifecycle — from experimentation and fine-tuning through production deployment. It provides access to IBM-curated foundation models (Granite series), open-source models (Llama, Mistral), and the tooling to adapt them securely to your own data.",
            "TechD designs and implements watsonx.ai environments for regulated enterprises that need AI outputs they can explain to an auditor. Our architects handle data ingestion, vector store design, prompt engineering, and MLOps pipelines — so your data science team spends time on models, not infrastructure.",
          ],
          capabilities: [
            "Foundation model access — IBM Granite, Llama, Mistral, and more",
            "Prompt Lab for rapid prototyping and evaluation",
            "Fine-tuning and domain adaptation on proprietary data",
            "MLOps pipelines: versioning, A/B testing, automated retraining",
            "Model governance — explainability, drift detection, audit logs",
            "Integration with watsonx.data for governed training datasets",
            "Deployment to IBM Cloud, on-prem, or hybrid via Cloud Pak for Data",
          ],
          useCases: [
            "Healthcare document summarization and clinical decision support",
            "Financial services regulatory document analysis and extraction",
            "Internal knowledge retrieval across unstructured enterprise content",
            "Predictive maintenance and anomaly detection on sensor data",
          ],
        },
      },
      {
        name: "watsonx Assistant",
        tagline: "Conversational AI that understands your business — not just your words.",
        description:
          "IBM's enterprise virtual agent platform for deploying AI-powered assistants across web, mobile, phone, and internal tools — with no-hallucination guardrails and deep integration hooks.",
        link: { kind: "internal", slug: "watsonx-assistant" },
        vendorUrl: "https://www.ibm.com/products/watsonx-assistant",
        detail: {
          overview: [
            "watsonx Assistant is IBM's enterprise conversational AI platform. It handles customer-facing and employee-facing virtual agents with a low-hallucination architecture: answers are grounded in your verified content, not generated from open web data.",
            "TechD has deployed watsonx Assistant for healthcare payers, media companies, and public sector agencies. Our implementations connect the assistant to existing knowledge bases, CRM systems, and backend APIs — so users get accurate, actionable answers without a live agent in the loop.",
          ],
          capabilities: [
            "Multi-channel deployment — web chat, SMS, voice (via telephony connectors), Slack, Teams",
            "No-hallucination RAG: answers grounded in your vetted content",
            "Actions-based dialog design (no complex dialog trees required)",
            "Search skill integration with existing knowledge bases and SharePoint",
            "Custom extensions for REST API calls to backend systems",
            "Human escalation routing with full conversation context handoff",
            "Analytics dashboard — intent trends, containment rate, drop-off points",
          ],
          useCases: [
            "Patient self-service and appointment management for health systems",
            "Employee HR and IT helpdesk automation",
            "Customer onboarding flows for insurance and financial services",
            "Benefits and policy Q&A for government agencies",
          ],
        },
      },
      {
        name: "IBM SPSS Modeler",
        tagline: "Build and deploy predictive models on enterprise data — without writing a line of code.",
        description:
          "IBM SPSS Modeler is a visual predictive analytics platform for building, evaluating, and deploying machine learning models — from classical regression and decision trees to neural networks — on structured enterprise data.",
        link: { kind: "internal", slug: "ibm-spss-modeler" },
        vendorUrl: "https://www.ibm.com/products/spss-modeler",
        detail: {
          overview: [
            "IBM SPSS Modeler is IBM's visual machine learning and predictive analytics workbench. It provides a drag-and-drop interface for data preparation, model building, evaluation, and scoring — covering a broad algorithm library from logistic regression and gradient boosting to deep learning and text analytics. Models can be deployed as REST APIs, integrated into batch scoring pipelines, or published into Watson Studio.",
            "TechD uses SPSS Modeler for clients who need production predictive models without a dedicated data science engineering team. Our engagements span healthcare readmission prediction, insurance claims propensity modeling, and workforce attrition forecasting — using the SPSS node library to iterate quickly and deploy via Cloud Pak for Data.",
          ],
          capabilities: [
            "Visual ML workflow: data prep, modeling, evaluation, and deployment nodes",
            "Algorithm breadth — regression, decision trees, SVM, neural networks, time series, text analytics",
            "In-database scoring push-down for Db2, Netezza, and cloud data warehouses",
            "SPSS Modeler as a Service on IBM Cloud Pak for Data — no on-premises install required",
            "Model management and batch scoring integration with Watson Studio",
            "Automated model building — AutoML for rapid baseline comparison across algorithm families",
            "Python and R extension nodes for custom algorithm integration",
          ],
          useCases: [
            "Healthcare readmission and chronic disease risk prediction",
            "Insurance claims propensity and fraud detection scoring",
            "Workforce attrition and HR analytics modeling",
            "Customer churn and lifetime value modeling for media and financial services",
          ],
        },
      },
      {
        name: "IBM Knowledge Catalog",
        tagline: "Find, trust, and govern every data asset across your enterprise.",
        description:
          "IBM's data catalog and governance layer for classifying, tagging, and enforcing policies across data assets — the metadata backbone that makes AI outputs defensible.",
        link: { kind: "internal", slug: "ibm-knowledge-catalog" },
        vendorUrl: "https://www.ibm.com/products/knowledge-catalog",
        detail: {
          overview: [
            "IBM Knowledge Catalog (part of the watsonx.governance platform) is the central inventory and governance layer for enterprise data and AI assets. It connects to data sources, classifies assets automatically, enforces data protection policies, and provides a searchable catalog that data engineers, scientists, and stewards use to find trusted data.",
            "TechD implements Knowledge Catalog as the foundation of enterprise data governance programs — particularly in heavily regulated industries where data lineage and access control are audit requirements, not optional. Our engagements typically run alongside watsonx.data or Cloud Pak for Data deployments.",
          ],
          capabilities: [
            "Automated data discovery and classification across multi-cloud sources",
            "Business glossary with ownership, stewardship, and policy linkage",
            "Data lineage visualization — upstream sources to downstream consumers",
            "Policy enforcement: masking, encryption, access restriction",
            "AI model catalog — track models alongside their training datasets",
            "Integration with DataStage, Db2, and third-party sources via connectors",
            "Compliance reporting for GDPR, CCPA, HIPAA data inventories",
          ],
          useCases: [
            "Regulatory data inventory and audit preparation (HIPAA, GDPR)",
            "AI model governance and responsible AI documentation",
            "Self-service data marketplace for internal data consumers",
            "Data quality scoring and remediation workflows",
          ],
        },
      },
    ],
  },

  {
    id: "data-analytics",
    name: "Data & Analytics",
    outcome: "Make your data AI-ready, governed, and defensible.",
    description:
      "Fifteen years of Db2, Cognos, and TM1 in production — now extended with open lakehouse, DataStage, and the modern analytics stack your AI depends on.",
    highlights: [
      "Open lakehouse architecture",
      "Cataloged, lineage-traced data",
      "Modern BI and planning",
    ],
    pitch:
      "Open lakehouse, governed pipelines, and a decade-plus of Db2, Cognos, and TM1 in production — the data foundation your AI roadmap stands on.",
    ctaLabel: "Explore data practice",
    products: [
      {
        name: "IBM Db2",
        tagline: "The enterprise-grade relational database that keeps Fortune 500 systems running.",
        description:
          "IBM Db2 is the production relational database at the core of TechD's data platform engagements — on-premises, containerized, or on cloud — with built-in AI extensions and hybrid query capabilities.",
        link: { kind: "internal", slug: "ibm-db2" },
        vendorUrl: "https://www.ibm.com/products/db2",
        detail: {
          overview: [
            "IBM Db2 is a high-performance relational database system used across TechD's enterprise client base for transactional workloads, analytics, and hybrid data architectures. Db2 Warehouse extends the engine with columnar BLU Acceleration and in-database ML for analytical workloads without a separate data warehouse infrastructure.",
            "TechD has deployed, optimized, and migrated Db2 environments for healthcare systems, media companies, and energy utilities. Our engagements range from schema design and query optimization to containerized Db2 deployments on OpenShift and full migrations from legacy platforms.",
          ],
          capabilities: [
            "On-premises, cloud, and containerized deployment via OpenShift",
            "BLU Acceleration for columnar in-memory analytics",
            "Db2 Warehouse with in-database Apache Spark and ML",
            "High availability — HADR, PureScale clustering",
            "Hybrid query federation across heterogeneous sources",
            "REST API and JDBC/ODBC connectivity for application integration",
            "Automated backup, recovery, and storage optimization",
          ],
          useCases: [
            "Core ERP and clinical system transaction databases",
            "Operational data stores feeding Cognos and Planning Analytics",
            "Hybrid lakehouse foundation alongside watsonx.data",
            "Legacy Oracle or SQL Server migrations to IBM stack",
          ],
        },
      },
      {
        name: "watsonx.data / Cloud Pak for Data",
        tagline: "The open lakehouse platform that connects your data to your AI.",
        description:
          "watsonx.data delivers open lakehouse architecture — Parquet/Iceberg on object storage, Presto/Spark query engines, and unified governance — deployed via IBM Cloud Pak for Data on any infrastructure.",
        link: { kind: "internal", slug: "watsonx-data" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data",
        detail: {
          overview: [
            "watsonx.data is IBM's open lakehouse platform, providing a cost-efficient alternative to proprietary data warehouses by running multiple query engines (Presto, Spark, Db2) against a shared open-format data store. It is deployed via Cloud Pak for Data — IBM's unified data and AI platform — which also hosts watsonx.ai, Knowledge Catalog, and DataStage in a single environment.",
            "TechD architects have worked with Cloud Pak for Data since its earliest releases. Our engagements help clients consolidate fragmented analytics infrastructure onto a single governed platform — reducing data copy sprawl and preparing data assets for AI consumption.",
          ],
          capabilities: [
            "Open lakehouse on object storage (Apache Iceberg, Parquet, ORC)",
            "Multi-engine query: Presto, Spark, Db2, Netezza integration",
            "Data sharing across watsonx.ai, DataStage, and Cognos Analytics",
            "Built-in data governance via IBM Knowledge Catalog",
            "On-premises, IBM Cloud, AWS, or Azure deployment",
            "Cost optimization — tiered storage with hot/warm/cold data routing",
            "Zero-ETL access to live operational Db2 and streaming sources",
          ],
          useCases: [
            "Replacing legacy Hadoop / Cloudera environments with open lakehouse",
            "Unified analytics platform consolidating multiple BI data sources",
            "AI training dataset management with lineage and governance",
            "Cross-cloud data federation for M&A integration scenarios",
          ],
        },
      },
      {
        name: "IBM DataStage",
        tagline: "Enterprise data integration that moves, transforms, and delivers at scale.",
        description:
          "IBM DataStage is TechD's primary ETL and data pipeline tool — available as SaaS on IBM Cloud and as part of Cloud Pak for Data — for building and operating the data flows AI and analytics depend on.",
        link: { kind: "internal", slug: "ibm-datastage" },
        vendorUrl: "https://www.ibm.com/products/datastage",
        detail: {
          overview: [
            "IBM DataStage is a high-throughput ETL and ELT platform used to build, orchestrate, and monitor data pipelines across on-premises, cloud, and hybrid environments. It handles structured and semi-structured data transformations at the scale enterprise clients require — millions of records per minute with parallel execution.",
            "TechD teams have built and maintained DataStage pipelines for health systems, media companies, and financial institutions. We design pipeline architecture, optimize job performance, and manage migrations from legacy ETL tools (Informatica, SSIS, ODI) to DataStage running on Cloud Pak for Data.",
          ],
          capabilities: [
            "Parallel execution engine for high-throughput batch and near-real-time pipelines",
            "Connectors for 100+ sources — Db2, Oracle, SQL Server, Salesforce, S3, HDFS",
            "ELT push-down to warehouse engines for in-database transformation",
            "DataStage as a Service (SaaS) on IBM Cloud with no infrastructure management",
            "Visual pipeline designer with parameterization and job scheduling",
            "CDC integration with IBM Data Replication for streaming ingest",
            "Lineage tracking into IBM Knowledge Catalog",
          ],
          useCases: [
            "Nightly EDW loads for Cognos Analytics and Planning Analytics",
            "HL7/FHIR patient data pipelines for health systems",
            "Legacy ETL tool migrations (Informatica, SSIS) to Cloud Pak for Data",
            "Real-time data feeds from operational systems into lakehouse storage",
          ],
        },
      },
      {
        name: "IBM Netezza Performance Server",
        tagline: "Purpose-built MPP analytics that delivers sub-second results on petabyte-scale datasets.",
        description:
          "IBM Netezza Performance Server is IBM's high-throughput analytics appliance — massively parallel processing and FPGA-accelerated query execution for clients where BI query performance is the bottleneck, on-premises or on IBM Cloud.",
        link: { kind: "internal", slug: "ibm-netezza" },
        vendorUrl: "https://www.ibm.com/products/netezza",
        detail: {
          overview: [
            "IBM Netezza Performance Server is a purpose-built data warehouse and analytics appliance designed for extreme query performance at scale. Its massively parallel processing (MPP) architecture and FPGA-based query accelerators deliver sub-second results on datasets that would take minutes in general-purpose databases. Netezza is available as an on-premises appliance (NPS 1000) and as a managed service on IBM Cloud.",
            "TechD deploys Netezza for clients with heavy analytical query workloads — particularly in media, insurance, and healthcare — where BI platform performance is the bottleneck. Our engagements include appliance sizing and installation, schema design for MPP workloads, Cognos Analytics integration, and migrations from legacy Teradata and Sybase IQ environments.",
          ],
          capabilities: [
            "Massively parallel processing — queries distributed across hundreds of processing nodes",
            "FPGA-accelerated scan and compression for sub-second large-dataset queries",
            "In-database analytics — run Python and R models directly against the data",
            "Netezza on IBM Cloud — SaaS deployment with zero infrastructure management",
            "Native Cognos Analytics integration as a high-performance BI data source",
            "Transparent data encryption and row-level security for sensitive datasets",
            "Migration support from Teradata, Sybase IQ, and Vertica environments",
          ],
          useCases: [
            "High-frequency ad-hoc analytics for media audience and subscriber data",
            "Actuarial and claims analytics at petabyte scale for insurance",
            "Population health analytics for large health systems",
            "Legacy Teradata migration to the IBM stack with performance parity",
          ],
        },
      },
      {
        name: "Cognos Analytics",
        tagline: "Self-service BI and dashboarding for the enterprise — backed by 15 years of TechD delivery.",
        description:
          "IBM Cognos Analytics is TechD's flagship BI platform — AI-assisted report creation, governed dashboards, and enterprise scheduling for the clients who have trusted it for over a decade.",
        link: { kind: "internal", slug: "cognos-analytics" },
        vendorUrl: "https://www.ibm.com/products/cognos-analytics",
        detail: {
          overview: [
            "IBM Cognos Analytics is an AI-powered business intelligence and dashboarding platform that lets business users create reports, explore data, and build dashboards with minimal IT involvement — while IT retains governance over data sources, security, and distribution.",
            "TechD has more Cognos Analytics delivery hours than nearly any other IBM Business Partner. Our practice spans initial deployment, content migration from legacy versions, SDK customization, performance tuning, and the TechD CogSuite administration tool built specifically to reduce Cognos administrative overhead. Clients include major health systems, media companies, insurers, and universities.",
          ],
          capabilities: [
            "AI Assistant for natural language data exploration and report generation",
            "Drag-and-drop dashboard and report authoring for business users",
            "Governed data modules with row/column-level security",
            "Pixel-perfect formatted report output (PDF, Excel, HTML)",
            "Scheduled distribution — burst reports to thousands of recipients",
            "Embedded analytics via SDK and JavaScript API",
            "Upgrade and migration services from Cognos 10.x / 11.x",
          ],
          useCases: [
            "Executive and operational dashboards for health system leadership",
            "Regulatory and financial reporting for insurance and banking",
            "Student and faculty analytics for higher education",
            "Subscriber and content performance analytics for media companies",
          ],
        },
      },
      {
        name: "Planning Analytics",
        tagline: "Enterprise planning, budgeting, and forecasting on the TM1 engine.",
        description:
          "IBM Planning Analytics (powered by TM1) is TechD's core FP&A platform — fast multi-dimensional modeling for budgeting, forecasting, and scenario analysis in finance teams that outgrew spreadsheets.",
        link: { kind: "internal", slug: "planning-analytics" },
        vendorUrl: "https://www.ibm.com/products/planning-analytics",
        detail: {
          overview: [
            "IBM Planning Analytics is the enterprise performance management platform built on the TM1 in-memory OLAP engine. It powers budgeting, forecasting, financial close, and workforce planning for complex organizations — with a combination of spreadsheet-familiar interfaces (TM1 Web, Planning Analytics for Excel) and browser-based workspace.",
            "TechD has delivered Planning Analytics and TM1 implementations for over 15 years across healthcare, insurance, energy, and media clients. Our engagements span greenfield builds, legacy Hyperion and Anaplan migrations, model optimization, and the ongoing administration support that keeps planning processes running through budget cycles.",
          ],
          capabilities: [
            "In-memory TM1 OLAP engine for sub-second multi-dimensional calculations",
            "Driver-based financial modeling — P&L, balance sheet, cash flow",
            "Planning Analytics Workspace — browser-based authoring and contribution",
            "Planning Analytics for Excel (PAX) for familiar spreadsheet workflows",
            "Workflow and approval routing for distributed budgeting",
            "Integration with Cognos Analytics for combined planning and BI",
            "Migration from Hyperion, SAP BPC, Anaplan to Planning Analytics",
          ],
          useCases: [
            "Annual operating plan and rolling forecast processes",
            "Workforce planning and headcount modeling",
            "Capital expenditure and project portfolio planning",
            "Regulatory reserve and claims forecasting for insurance",
          ],
        },
      },
      {
        name: "Cognos Controller",
        tagline: "Automate financial close, consolidation, and statutory reporting.",
        description:
          "IBM Cognos Controller streamlines intercompany eliminations, currency translation, and GAAP/IFRS consolidation for finance teams that need to close faster and report with confidence.",
        link: { kind: "internal", slug: "cognos-controller" },
        vendorUrl: "https://www.ibm.com/products/cognos-controller",
        detail: {
          overview: [
            "IBM Cognos Controller is a financial consolidation and close management application designed for CFO offices and corporate finance teams. It handles the complexity of multi-entity consolidations — intercompany eliminations, minority interest, currency translation, and group-level statutory reporting — in a controlled, auditable environment.",
            "TechD delivers Cognos Controller implementations for mid-market and enterprise organizations that need faster close cycles and defensible financial statements. Our engagements include requirements design, chart of accounts setup, group structure configuration, and integration with ERP source systems.",
          ],
          capabilities: [
            "Multi-entity consolidation with automated intercompany elimination",
            "Currency translation and foreign exchange restatement (GAAP, IFRS)",
            "Workflow-driven close process with task assignment and status tracking",
            "Audit trail — every submission, override, and journal entry logged",
            "Reporting packages for statutory, management, and segment reporting",
            "ERP integration — SAP, Oracle, Microsoft Dynamics source connections",
            "Drill-through from consolidated group figures to entity-level detail",
          ],
          useCases: [
            "Monthly and quarterly group financial close for multi-entity organizations",
            "IFRS 16 lease accounting consolidation",
            "Post-merger integration — rapid consolidation of acquired entities",
            "Regulatory reporting for insurance and financial services groups",
          ],
        },
      },
      {
        name: "IBM MDM",
        tagline: "One trusted record for every customer, product, and entity across your enterprise.",
        description:
          "IBM Master Data Management creates and maintains the authoritative golden record for your most critical data domains — eliminating duplicates, resolving identity, and enforcing consistency across systems.",
        link: { kind: "internal", slug: "ibm-mdm" },
        vendorUrl: "https://www.ibm.com/products/master-data-management",
        detail: {
          overview: [
            "IBM Master Data Management (MDM) is the enterprise platform for creating, governing, and distributing trusted master records across customer, product, supplier, location, and other critical data domains. It resolves entity identities probabilistically, manages hierarchies, and synchronizes the golden record back to consuming applications.",
            "TechD implements IBM MDM for enterprises where duplicated, inconsistent, or incomplete reference data creates compliance risk, poor customer experience, or failed analytics. Our engagements span architecture design, match-merge rule development, domain model configuration, and integration with downstream CRM, ERP, and analytics systems.",
          ],
          capabilities: [
            "Multi-domain MDM — customer, product, supplier, location, and custom domains",
            "Probabilistic and deterministic match-merge for entity resolution",
            "Hierarchy management — corporate family trees, product taxonomies",
            "Stewardship workflow — human review queues for unresolved matches",
            "Survivorship rules — configure which source system wins per attribute",
            "Real-time and batch synchronization to downstream applications",
            "Integration with IBM Knowledge Catalog for governed data lineage",
          ],
          useCases: [
            "Patient identity resolution and EMPI for health systems",
            "Customer 360 for insurance, financial services, and retail",
            "Product master for manufacturers and distributors",
            "Supplier consolidation and vendor de-duplication post-merger",
          ],
        },
      },
    ],
  },

  {
    id: "automation-finops",
    name: "Automation & FinOps",
    outcome: "Observe everything, optimize spend, and eliminate manual toil.",
    description:
      "IBM Apptio, Instana, and Turbonomic give your IT and finance teams full-stack visibility — from application traces to cloud bill line items — with AI-driven recommendations that act.",
    highlights: [
      "Full-stack APM and tracing",
      "Cloud FinOps and showback",
      "AI-driven resource actions",
    ],
    pitch:
      "Full-stack observability, AI-driven resource optimization, and Technology Business Management — so IT leaders can see everything, cut waste, and prove the value of every dollar spent.",
    ctaLabel: "Explore automation practice",
    products: [
      {
        name: "IBM Apptio",
        tagline: "Align IT spending to business value with Technology Business Management.",
        description:
          "IBM Apptio is the TBM platform for IT financial management — translating infrastructure invoices, headcount, and vendor contracts into the cost-per-service view that CIOs and CFOs need to make investment decisions.",
        link: { kind: "internal", slug: "ibm-apptio" },
        vendorUrl: "https://www.ibm.com/products/apptio",
        detail: {
          overview: [
            "IBM Apptio (acquired by IBM in 2019) is the leading Technology Business Management platform for understanding, communicating, and optimizing what IT spends and delivers. It ingests data from financial systems, CMDB, cloud billing APIs, and project tools to build a consumption-based cost model across applications, services, and business units.",
            "TechD implements Apptio for enterprises that need to move from IT as a cost center to IT as a transparent business partner. Our engagements include TBM taxonomy design, data integration from ERP and ITSM sources, chargeback/showback model configuration, and executive dashboard delivery.",
          ],
          capabilities: [
            "TBM taxonomy: map infrastructure spend to towers, services, and business units",
            "Cloud cost allocation — AWS, Azure, GCP bill ingestion and tagging",
            "Chargeback and showback reporting for internal IT consumers",
            "Benchmark against industry peers via Apptio's anonymized dataset",
            "IT budget planning and variance tracking",
            "Project portfolio investment analysis — run vs. grow vs. transform split",
            "Integration with ServiceNow, SAP, Oracle, and cloud billing APIs",
          ],
          useCases: [
            "CIO transparency programs — monthly IT cost by business unit",
            "Cloud spend governance and accountability reporting",
            "M&A IT cost integration and baseline comparison",
            "FinOps program launch and cloud financial operating model design",
          ],
        },
      },
      {
        name: "IBM Instana",
        tagline: "Full-stack observability with automated discovery and AI-powered alerting.",
        description:
          "IBM Instana delivers real-time distributed tracing, infrastructure monitoring, and incident root-cause analysis across microservices, containers, and hybrid environments — without manual instrumentation.",
        link: { kind: "internal", slug: "ibm-instana" },
        vendorUrl: "https://www.ibm.com/products/instana",
        detail: {
          overview: [
            "IBM Instana (acquired by IBM in 2020) is a full-stack observability platform designed for cloud-native and hybrid environments. It auto-discovers services, containers, and hosts; instruments applications automatically; and correlates traces, logs, and metrics into a unified topology map — refreshed every second.",
            "TechD implements Instana for organizations running complex microservice architectures where traditional monitoring tools create alert storms without actionable root cause. Our engagements cover agent deployment, SLO configuration, alerting channel setup, and integration with ITSM platforms for incident automation.",
          ],
          capabilities: [
            "Automatic service discovery and distributed tracing (no manual instrumentation)",
            "Full-stack metrics: infrastructure, containers, Kubernetes, services, databases",
            "AI-powered root cause analysis and incident correlation",
            "1-second granularity — detect spikes traditional 1-minute polling tools miss",
            "Application Perspectives — custom service grouping for team-level SLO tracking",
            "Smart alerting — anomaly detection reduces noise vs. threshold-based rules",
            "Webhooks and integrations: PagerDuty, Slack, ServiceNow, OpsGenie",
          ],
          useCases: [
            "Microservices observability for cloud-native streaming and media platforms",
            "Kubernetes cluster monitoring and pod-level performance visibility",
            "SLO dashboards for platform engineering and site reliability teams",
            "Pre- and post-deployment health validation in CI/CD pipelines",
          ],
        },
      },
      {
        name: "IBM Turbonomic",
        tagline: "Continuously right-size your cloud and Kubernetes workloads — automatically.",
        description:
          "IBM Turbonomic is an Application Resource Management platform that analyzes workload demand in real time and autonomously resizes, moves, or reschedules resources to hit performance targets at minimum cost.",
        link: { kind: "internal", slug: "ibm-turbonomic" },
        vendorUrl: "https://www.ibm.com/products/turbonomic",
        detail: {
          overview: [
            "IBM Turbonomic (acquired by IBM in 2021) applies AI-driven Application Resource Management to continuously balance application performance and infrastructure cost. It monitors demand, projects resource needs, and issues — or executes — scaling actions across VMware, Kubernetes, and public cloud environments.",
            "TechD implements Turbonomic for enterprises looking to reduce cloud waste without sacrificing SLAs. Our engagements cover initial scoping of the resource management scope, policy configuration, and the governance model that decides which actions Turbonomic executes autonomously versus which require human approval.",
          ],
          capabilities: [
            "Automated right-sizing recommendations for VMs, containers, and cloud instances",
            "Kubernetes workload optimization — CPU/memory requests, node scheduling",
            "Multi-cloud support: AWS, Azure, GCP, IBM Cloud, VMware vSphere",
            "Application-aware actions — performance constraints embedded in resize decisions",
            "Policy engine — define which actions are autonomous vs. manual approval",
            "Integration with Instana and Apptio for full-stack observability + cost context",
            "Savings reports — projected and realized cost reduction over time",
          ],
          useCases: [
            "Cloud FinOps — continuous right-sizing to reduce idle and over-provisioned spend",
            "Kubernetes cluster efficiency and node utilization improvement",
            "Pre-migration sizing analysis for data center to cloud lift-and-shift",
            "Hybrid cloud workload placement and balancing",
          ],
        },
      },
    ],
  },

  {
    id: "security-compliance",
    name: "Security & Compliance",
    outcome: "Pass the audit. Protect the data. Respond to the breach.",
    description:
      "IBM Guardium, QRadar, Resilient, MDM, and Data Replication — the data security, threat detection, and governance tooling that keeps regulated enterprises compliant and resilient.",
    highlights: [
      "Data activity monitoring",
      "Threat detection and SOAR",
      "Audit-ready evidence trails",
    ],
    pitch:
      "Identity, threat detection, and data protection engineered for regulated enterprises — IBM Security and Guardium delivered by senior practitioners.",
    ctaLabel: "Explore security practice",
    products: [
      {
        name: "IBM Guardium",
        tagline: "Protect sensitive data wherever it lives — on-premises, cloud, or mainframe.",
        description:
          "IBM Guardium is the enterprise data security and activity monitoring platform for detecting unauthorized access, enforcing encryption policies, and producing the audit trails regulators require.",
        link: { kind: "internal", slug: "ibm-guardium" },
        vendorUrl: "https://www.ibm.com/products/guardium",
        detail: {
          overview: [
            "IBM Guardium provides continuous monitoring of data access across databases, data warehouses, big data environments, and cloud storage. It captures every query, tracks who accessed what data and when, detects anomalous activity, and generates the compliance reports required for HIPAA, PCI-DSS, SOX, and GDPR audits.",
            "TechD implements Guardium for health systems, financial institutions, and government agencies where data protection is a regulatory requirement. Our engagements cover sensor deployment, classification policies, alert tuning, and integration with SIEM platforms for centralized security event correlation.",
          ],
          capabilities: [
            "Real-time database activity monitoring across Db2, Oracle, SQL Server, MongoDB, and more",
            "Sensitive data discovery and classification (PII, PHI, PCI, financial identifiers)",
            "Vulnerability assessment — scanning for known database misconfigurations",
            "Encryption and key management via Guardium Data Encryption",
            "Pre-built compliance reports: HIPAA, PCI-DSS, SOX, GDPR",
            "Anomaly detection — baseline user behavior and alert on deviations",
            "SIEM integration — forward events to QRadar or third-party SIEM platforms",
          ],
          useCases: [
            "HIPAA database audit trail generation for health systems",
            "PCI-DSS cardholder data environment (CDE) monitoring",
            "Insider threat detection for privileged database accounts",
            "Cloud database protection for RDS, Azure SQL, and IBM Db2 on Cloud",
          ],
        },
      },
      {
        name: "IBM QRadar",
        tagline: "Security intelligence that correlates threats across your entire environment.",
        description:
          "IBM QRadar SIEM collects logs, flows, and events from across the enterprise, correlates them against threat intelligence, and surfaces the security incidents that matter — before they become breaches.",
        link: { kind: "internal", slug: "ibm-qradar" },
        vendorUrl: "https://www.ibm.com/qradar",
        detail: {
          overview: [
            "IBM QRadar is a SIEM (Security Information and Event Management) platform that ingests log and flow data from network devices, servers, applications, and cloud services, then applies correlation rules and behavioral analytics to detect threats. On-premises QRadar deployments remain a core IBM product actively supported in 2026.",
            "TechD implements QRadar for enterprises that need a centralized security operations view across hybrid environments. Our engagements include log source configuration, use case rule development, and integration with IBM Guardium and Resilient for a coordinated detect-and-respond workflow.",
          ],
          capabilities: [
            "Log and flow collection from 500+ supported data sources",
            "Correlation rules and custom use case development",
            "Offense management — prioritized security incident tracking",
            "Network flow analysis (QRadar QFlow) for behavioral anomaly detection",
            "IBM X-Force threat intelligence integration",
            "User behavior analytics (UBA) — detect compromised credentials and insider threats",
            "Integration with Guardium, Resilient, and third-party SOAR/ticketing platforms",
          ],
          useCases: [
            "24/7 SOC monitoring for hybrid enterprise environments",
            "Regulatory compliance reporting — security event evidence for audits",
            "Insider threat and privileged account monitoring",
            "Cloud security posture monitoring across AWS, Azure, IBM Cloud",
          ],
        },
      },
      {
        name: "IBM Resilient",
        tagline: "Orchestrate and accelerate security incident response across your team.",
        description:
          "IBM Resilient SOAR provides the playbooks, case management, and automation that turn detected threats into structured, documented response — cutting mean time to respond for security operations teams.",
        link: { kind: "internal", slug: "ibm-resilient" },
        vendorUrl: "https://www.ibm.com/products/qradar-soar",
        detail: {
          overview: [
            "IBM Resilient is a Security Orchestration, Automation, and Response (SOAR) platform that provides incident case management, dynamic playbooks, and integration with existing security tools to coordinate response actions across teams and reduce manual effort during active incidents.",
            "TechD implements Resilient alongside QRadar and Guardium to close the detect-to-respond loop. When QRadar raises an offense or Guardium detects anomalous data access, Resilient creates a structured case, assigns owners, triggers playbook tasks, and documents every action — building the incident record regulators and cyber insurers expect.",
          ],
          capabilities: [
            "Dynamic playbooks — automated task assignment triggered by incident type",
            "Case management with full timeline, evidence, and action documentation",
            "200+ third-party integrations via SOAR App Exchange (ticketing, threat intel, EDR)",
            "Bi-directional QRadar integration — offenses become Resilient incidents automatically",
            "Regulatory reporting assistance — GDPR 72-hour breach notification workflows",
            "Metrics and KPI dashboards — MTTD, MTTR, analyst workload",
            "Tabletop exercise support — simulate breach scenarios against documented playbooks",
          ],
          useCases: [
            "Security operations center (SOC) workflow automation and case management",
            "Ransomware and data breach response playbooks",
            "GDPR / CCPA breach notification process management",
            "Coordinated response across IT security, legal, and communications teams",
          ],
        },
      },
    ],
  },

  {
    id: "hybrid-cloud",
    name: "Hybrid Cloud & Infrastructure",
    outcome: "Run mission workloads where they belong — and move them when you need to.",
    description:
      "IBM Cloud, Red Hat OpenShift, and mainframe integration — hybrid architecture that connects where your data actually lives with where your AI needs to run.",
    highlights: [
      "OpenShift across any cloud",
      "Mainframe data integration",
      "Portable, policy-driven workloads",
    ],
    pitch:
      "OpenShift, Cloud Pak, and modern platform engineering — portable workloads across on-prem, IBM Cloud, AWS, and Azure with a single operating model.",
    ctaLabel: "Explore hybrid cloud practice",
    products: [
      {
        name: "IBM Cloud",
        tagline: "The hybrid cloud platform built for regulated enterprise workloads.",
        description:
          "IBM Cloud delivers VPC infrastructure, managed Kubernetes, and compliance-ready services — the deployment target for watsonx.ai, Db2 on Cloud, and the regulated workloads that cannot go to hyperscalers.",
        link: { kind: "internal", slug: "ibm-cloud" },
        vendorUrl: "https://www.ibm.com/cloud",
        detail: {
          overview: [
            "IBM Cloud is IBM's public and hybrid cloud platform, built with compliance certifications (FedRAMP, HIPAA, SOC 2, PCI-DSS) that hyperscalers typically offer as add-ons. For TechD clients in healthcare, government, and financial services, these built-in compliance controls make IBM Cloud the path of least resistance for moving regulated data to the cloud.",
            "TechD designs IBM Cloud architectures for clients deploying Cloud Pak for Data, watsonx.ai, and Db2 on Cloud. Our engagements cover landing zone design, network topology (VPC, Direct Link for private connectivity), IAM policy configuration, and the security baseline that allows production workloads to meet regulatory requirements.",
          ],
          capabilities: [
            "VPC infrastructure with bare metal, virtual server, and managed Kubernetes (IKS/ROKS)",
            "Built-in compliance: FedRAMP Moderate, HIPAA, PCI-DSS, SOC 2",
            "IBM Cloud Direct Link — dedicated private connectivity from data center to cloud",
            "Managed database services: Db2 on Cloud, PostgreSQL, MongoDB, Redis",
            "IBM Cloud Object Storage — S3-compatible, geo-redundant, used by watsonx.data",
            "Key Protect and Hyper Protect Crypto Services — bring-your-own-key encryption",
            "Security and Compliance Center — continuous compliance posture monitoring",
          ],
          useCases: [
            "Regulated workload migration for healthcare and government agencies",
            "watsonx.ai and Cloud Pak for Data SaaS deployment environment",
            "Hybrid connectivity between on-premises Db2 and cloud analytics",
            "FedRAMP-authorized environment for federal agency data workloads",
          ],
        },
      },
      {
        name: "Red Hat OpenShift",
        tagline: "Enterprise Kubernetes for deploying containerized workloads anywhere.",
        description:
          "Red Hat OpenShift is the container platform that TechD uses to run Cloud Pak for Data, watsonx, and modern application workloads — on IBM Cloud, on-premises, or at the edge.",
        link: { kind: "internal", slug: "red-hat-openshift" },
        vendorUrl: "https://www.redhat.com/en/technologies/cloud-computing/openshift",
        detail: {
          overview: [
            "Red Hat OpenShift is an enterprise Kubernetes platform that adds developer tooling, integrated CI/CD, and hardened security policies on top of the upstream Kubernetes project. IBM's entire watsonx and Cloud Pak portfolio runs on OpenShift — making it the required runtime for any on-premises deployment of TechD's AI and data platform work.",
            "TechD architects are experienced with OpenShift cluster design and operations across bare metal, VMware, IBM Cloud, and AWS. Our engagements include cluster sizing and installation, storage configuration for stateful workloads (Db2, watsonx.data), network policy design, and the ongoing Day 2 operations model that keeps clusters healthy.",
          ],
          capabilities: [
            "Enterprise Kubernetes with built-in pod security, network policy, and RBAC",
            "Operator framework — automated lifecycle management for stateful applications",
            "OpenShift Pipelines (Tekton) and GitOps (Argo CD) for CI/CD",
            "Multi-cluster management via Red Hat Advanced Cluster Management",
            "Integrated container registry and image scanning",
            "Storage integration — Portworx, IBM Spectrum Scale, ODF for persistent volumes",
            "Deployment targets: IBM Cloud ROKS, on-premises, AWS ROSA, Azure ARO",
          ],
          useCases: [
            "On-premises Cloud Pak for Data and watsonx platform deployment",
            "Application modernization — re-platforming Java EE / WebSphere workloads",
            "Hybrid CI/CD pipelines spanning on-premises and cloud environments",
            "Edge compute deployments for manufacturing and energy utilities",
          ],
        },
      },
      {
        name: "Mainframe Integration",
        tagline: "Connect your IBM Z investment to modern cloud, AI, and analytics without risk.",
        description:
          "TechD's mainframe integration practice bridges IBM Z systems to watsonx, Db2, and hybrid cloud — offloading analytics workloads, feeding real-time data pipelines, and modernizing interfaces without touching core transaction code.",
        link: { kind: "internal", slug: "mainframe-integration" },
        vendorUrl: "https://www.ibm.com/it-infrastructure/z",
        detail: {
          overview: [
            "IBM Z (mainframe) systems continue to run the most critical transaction workloads for financial services, insurance, and healthcare clients — processing trillions of dollars in transactions annually. The challenge isn't replacing the mainframe; it's connecting it to modern analytics, AI, and cloud architectures without disrupting the transaction system of record.",
            "TechD's mainframe integration practice focuses on data access, offload, and API modernization. We use IBM Data Replication (IIDR) to stream Db2 for z/OS changes to distributed targets, IBM z/OS Connect to expose mainframe programs as RESTful APIs, and watsonx.data federation to run analytics queries against z/OS data without extraction.",
          ],
          capabilities: [
            "Db2 for z/OS change data capture via IBM Data Replication (IIDR)",
            "z/OS Connect EE — expose COBOL programs and IMS/CICS transactions as REST APIs",
            "Mainframe data federation via watsonx.data and Db2 Big SQL",
            "Offload analytics from MIPS-intensive batch jobs to distributed engines",
            "Real-time z/OS data feeds into Kafka and lakehouse architectures",
            "IBM Z observability integration with Instana for end-to-end tracing",
            "Incremental modernization patterns — extend, not replace, core transaction systems",
          ],
          useCases: [
            "Core banking and insurance system data exposure for cloud analytics",
            "Mainframe batch offload to reduce MIPS costs and cycle time",
            "API modernization — wrapping COBOL transactions for mobile and web consumers",
            "Real-time event streaming from z/OS into event-driven microservice architectures",
          ],
        },
      },
      {
        name: "IBM Data Replication",
        tagline: "Zero-downtime data migration and continuous replication for hybrid environments.",
        description:
          "IBM Data Replication (IIDR) uses log-based change data capture to replicate data between heterogeneous sources and targets with sub-second latency — and no application downtime during migration.",
        link: { kind: "internal", slug: "ibm-data-replication" },
        vendorUrl: "https://www.ibm.com/products/data-replication",
        detail: {
          overview: [
            "IBM InfoSphere Data Replication (IIDR) is a change data capture (CDC) platform that reads database transaction logs to stream inserts, updates, and deletes to target systems in near real time. It supports migrations between heterogeneous platforms (Oracle to Db2, SQL Server to cloud), continuous replication for active-active architectures, and feeding event streams to Kafka.",
            "TechD uses IBM Data Replication in cloud migration projects, mainframe offload programs, and hybrid integration architectures. It is a critical tool for any project requiring zero downtime during database platform transitions — the source database keeps serving production traffic while the target is built and validated.",
          ],
          capabilities: [
            "Log-based CDC from Oracle, SQL Server, Db2, Informix, z/OS, and more",
            "Heterogeneous replication — any source to any supported target",
            "Sub-second latency for near real-time replication",
            "Zero-downtime cutover support — run source and target in parallel",
            "Kafka integration for event streaming architectures",
            "Transformation and filtering rules applied in-flight",
            "Monitoring dashboard — lag metrics, throughput, and error alerting",
          ],
          useCases: [
            "Oracle to IBM Db2 cloud migration with zero production downtime",
            "Mainframe (z/OS Db2) offload to distributed or cloud targets",
            "Active-active replication for geographically distributed read replicas",
            "Real-time data feeds from OLTP systems into analytics platforms",
          ],
        },
      },
    ],
  },
];
