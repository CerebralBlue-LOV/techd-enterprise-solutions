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
        name: "watsonx",
        tagline: "The unified platform for enterprise AI — data, models, and governance under one roof.",
        description:
          "IBM watsonx is the integrated AI and data platform that brings model development (watsonx.ai), governed data (watsonx.data), and responsible AI controls (watsonx.governance) into a single operating environment for the enterprise.",
        link: { kind: "internal", slug: "watsonx" },
        vendorUrl: "https://www.ibm.com/products/watsonx",
        detail: {
          overview: [
            "watsonx is IBM's flagship enterprise AI platform, combining three pillars — watsonx.ai for model development, watsonx.data for governed lakehouse storage, and watsonx.governance for responsible AI lifecycle management — under a single control plane. It is the foundation IBM expects regulated enterprises to standardize on for production AI.",
            "TechD architects watsonx environments end-to-end: landing zone design, identity and access integration, foundation model selection, and the connective tissue between watsonx.data, your existing Db2 estate, and the downstream applications that consume AI outputs. Our engagements deliver a platform your team can extend long after we leave.",
          ],
          capabilities: [
            "Unified access to watsonx.ai, watsonx.data, and watsonx.governance",
            "Foundation model catalog — IBM Granite plus curated open-source models",
            "Governed lakehouse access via watsonx.data and Apache Iceberg",
            "Responsible AI lifecycle: lineage, drift detection, fact sheets, audit trails",
            "Single sign-on, RBAC, and policy enforcement across the platform",
            "Hybrid deployment — IBM Cloud, on-premises via Cloud Pak for Data, or air-gapped",
            "Integration with watsonx Orchestrate for agentic workflow execution",
          ],
          useCases: [
            "Enterprise AI platform standardization for regulated industries",
            "Governed foundation model adoption with auditable outputs",
            "Cross-business-unit AI shared services",
            "Hybrid AI workloads spanning on-prem data and cloud compute",
          ],
        },
      },
      {
        name: "watsonx Orchestrate",
        tagline: "Agentic AI that gets enterprise work done — across the apps your teams already use.",
        description:
          "IBM watsonx Orchestrate runs AI agents that take action across your business systems — Salesforce, Workday, ServiceNow, SAP, and custom APIs — with the governance and observability enterprises require.",
        link: { kind: "internal", slug: "watsonx-orchestrate" },
        vendorUrl: "https://www.ibm.com/products/watsonx-orchestrate",
        detail: {
          overview: [
            "watsonx Orchestrate is IBM's agentic AI platform for automating multi-step business work. It coordinates AI agents that combine foundation model reasoning with pre-built skills against the SaaS and custom systems enterprises run on — turning natural-language instructions into executed workflows across HR, sales, IT, and operations.",
            "TechD implements Orchestrate for organizations that have proven AI value in pilots and need a path to scaled, governed agent deployment. Our engagements cover skill library design, integration with your identity and audit infrastructure, and the human-in-the-loop controls that keep agentic actions defensible at the board level.",
          ],
          capabilities: [
            "Agent builder grounded in watsonx.ai foundation models",
            "Pre-built skill catalog for Salesforce, Workday, ServiceNow, SAP, Microsoft 365",
            "Custom skill creation against any REST API or internal system",
            "Multi-agent orchestration with handoff and supervision patterns",
            "Conversational and triggered execution modes",
            "Audit log of every agent action — input, decision, system call, outcome",
            "Role-based access and human-in-the-loop approval gates",
          ],
          useCases: [
            "HR self-service — onboarding, leave, benefits across Workday and ServiceNow",
            "Sales operations — quote generation, opportunity hygiene in Salesforce",
            "IT operations — ticket triage, password reset, software request automation",
            "Procure-to-pay assistance across SAP, Coupa, and approval workflows",
          ],
        },
      },
      {
        name: "NeuralSeek",
        tagline: "Turn your existing knowledge base into a cited, grounded AI assistant.",
        description:
          "NeuralSeek connects to what you already have — SharePoint, Confluence, or any document repository — and returns cited, traceable answers to complex queries in seconds. Designed to layer on top of watsonx or run as a standalone API, closing the gap between raw document retrieval and enterprise-grade conversational AI.",
        link: { kind: "external", url: "https://neuralseek.com" },
      },
      {
        name: "IBM Bob",
        tagline: "An AI assistant for IBM software — built into the products your teams already operate.",
        description:
          "IBM Bob is the conversational AI assistant embedded across IBM's enterprise software portfolio, helping operators, developers, and analysts get answers, troubleshoot issues, and execute tasks against the products they already run.",
        link: { kind: "internal", slug: "ibm-bob" },
        vendorUrl: "https://bob.ibm.com",
        detail: {
          overview: [
            "IBM Bob is IBM's product-embedded AI assistant — a watsonx-grounded conversational layer that lives inside IBM software products (Db2, Cloud Pak for Data, AIOps tooling, and more) to help users navigate features, diagnose problems, and execute tasks faster. It draws on IBM product documentation, telemetry, and best-practice patterns to give contextual, grounded answers.",
            "TechD helps clients adopt IBM Bob alongside the IBM platforms they already run. We configure Bob for the specific product surface area in scope, integrate it with your support and observability tooling, and train your operators on the prompt patterns that get the most value from an embedded assistant.",
          ],
          capabilities: [
            "Embedded inside IBM enterprise products — no separate UI to roll out",
            "Grounded in IBM product documentation and best practices",
            "Contextual help — understands the screen and resource you are looking at",
            "Diagnostic assistance for performance, configuration, and error states",
            "Action execution against IBM product APIs (where enabled)",
            "Powered by IBM watsonx foundation models with audit trail",
            "Deployed alongside IBM Cloud and Cloud Pak for Data installations",
          ],
          useCases: [
            "Db2 administration assistance — query tuning, configuration guidance",
            "Cloud Pak for Data operator support and troubleshooting",
            "AIOps and platform engineering team productivity",
            "Onboarding new operators to IBM platform tooling",
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
            "IBM SPSS Modeler is IBM's visual machine learning and predictive analytics workbench. It provides a drag-and-drop interface for data preparation, model building, evaluation, and scoring — covering a broad algorithm library from logistic regression and gradient boosting to deep learning and text analytics. Models can be deployed as REST APIs, integrated into batch scoring pipelines, or published into watsonx.ai.",
            "TechD uses SPSS Modeler for clients who need production predictive models without a dedicated data science engineering team. Our engagements span healthcare readmission prediction, insurance claims propensity modeling, and workforce attrition forecasting — using the SPSS node library to iterate quickly and deploy via Cloud Pak for Data.",
          ],
          capabilities: [
            "Visual ML workflow: data prep, modeling, evaluation, and deployment nodes",
            "Algorithm breadth — regression, decision trees, SVM, neural networks, time series, text analytics",
            "In-database scoring push-down for Db2, Netezza, and cloud data warehouses",
            "SPSS Modeler as a Service on IBM Cloud Pak for Data — no on-premises install required",
            "Model management and batch scoring integration with watsonx.ai",
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
    ],
  },

  {
    id: "data-analytics",
    name: "Data & Analytics",
    outcome: "Make your data AI-ready, governed, and defensible.",
    description:
      "Fifteen years of Db2, Cognos, and TM1 in production — extended with watsonx.data, Cloud Pak for Data, DataStage, and the modern analytics stack your AI depends on.",
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
        name: "watsonx.data",
        tagline: "The open lakehouse platform that connects your data to your AI.",
        description:
          "watsonx.data delivers open lakehouse architecture — Parquet/Iceberg on object storage, Presto/Spark query engines, and unified governance — for analytics and AI workloads on any infrastructure.",
        link: { kind: "internal", slug: "watsonx-data" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data",
        detail: {
          overview: [
            "watsonx.data is IBM's open lakehouse platform, providing a cost-efficient alternative to proprietary data warehouses by running multiple query engines (Presto, Spark, Db2) against a shared open-format data store. It is the governed data layer that watsonx.ai trains on and that BI tools query directly.",
            "TechD architects have worked with the Cloud Pak for Data and watsonx.data lineage since the earliest releases. Our engagements help clients consolidate fragmented analytics infrastructure onto a single governed platform — reducing data copy sprawl and preparing data assets for AI consumption.",
          ],
          capabilities: [
            "Open lakehouse on object storage (Apache Iceberg, Parquet, ORC)",
            "Multi-engine query: Presto, Spark, Db2, Netezza integration",
            "Data sharing across watsonx.ai, DataStage, and Cognos Analytics",
            "Built-in data governance integration",
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
        name: "Cloud Pak for Data",
        tagline: "The unified data and AI platform — deployed where your data already lives.",
        description:
          "IBM Cloud Pak for Data is the integrated platform that hosts watsonx.ai, watsonx.data, DataStage, and IBM's data and AI services on a single OpenShift-based runtime — on-premises, on IBM Cloud, or on any hyperscaler.",
        link: { kind: "internal", slug: "cloud-pak-for-data" },
        vendorUrl: "https://www.ibm.com/products/cloud-pak-for-data",
        detail: {
          overview: [
            "IBM Cloud Pak for Data is IBM's containerized platform for delivering data and AI services together. It packages watsonx.ai, watsonx.data, DataStage, IBM Match 360, and dozens of other services as Kubernetes operators on Red Hat OpenShift — giving enterprises a single deployable platform they can install on-premises, on IBM Cloud, or on AWS, Azure, and GCP.",
            "TechD has implemented Cloud Pak for Data since its earliest releases. Our engagements cover OpenShift sizing and cluster build, service catalog selection, identity and storage integration, and the operational model that lets your platform team run a multi-tenant data and AI environment without an army of specialists.",
          ],
          capabilities: [
            "Unified runtime for watsonx.ai, watsonx.data, DataStage, and 60+ IBM services",
            "Runs on Red Hat OpenShift — on-premises, IBM Cloud, AWS, Azure, GCP",
            "Multi-tenant project workspaces with role-based access",
            "Integrated data virtualization across heterogeneous sources",
            "Built-in governance, lineage, and policy enforcement",
            "Air-gapped installation option for regulated and classified workloads",
            "Operator-based lifecycle management — install, upgrade, scale via Kubernetes",
          ],
          useCases: [
            "Enterprise data and AI platform consolidation",
            "On-premises watsonx deployment for data sovereignty requirements",
            "Multi-cloud AI platform with consistent operating model",
            "Regulated industry data science environment with audit controls",
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
            "CDC integration for streaming ingest",
            "Lineage tracking into the watsonx.data and Cloud Pak for Data governance layer",
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
        name: "watsonx.data intelligence",
        tagline: "Catalog, classify, and govern every data asset that feeds your AI.",
        description:
          "watsonx.data intelligence (the evolution of IBM's data catalog and metadata services) discovers, classifies, and governs data and AI assets across your enterprise — the metadata backbone that makes AI outputs defensible.",
        link: { kind: "internal", slug: "watsonx-data-intelligence" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data-intelligence",
        detail: {
          overview: [
            "watsonx.data intelligence is IBM's enterprise data and AI catalog — the central inventory, classification, and governance layer for the data assets that feed analytics and watsonx.ai workloads. It connects to data sources, classifies assets automatically, enforces protection policies, and exposes a searchable catalog for data engineers, scientists, and stewards.",
            "TechD implements watsonx.data intelligence as the foundation of enterprise data governance programs — particularly in regulated industries where data lineage and access control are audit requirements, not optional. Our engagements typically run alongside watsonx.data and Cloud Pak for Data deployments.",
          ],
          capabilities: [
            "Automated data discovery and classification across multi-cloud sources",
            "Business glossary with ownership, stewardship, and policy linkage",
            "Data lineage visualization — upstream sources to downstream consumers",
            "Policy enforcement: masking, encryption, access restriction",
            "AI asset cataloging — track models alongside their training datasets",
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
      {
        name: "watsonx.data integration",
        tagline: "Move, transform, and unify data across your hybrid estate — built for the watsonx era.",
        description:
          "watsonx.data integration is IBM's modern data integration service — combining ETL, ELT, replication, and streaming patterns into a single platform that feeds watsonx.data, watsonx.ai, and downstream analytics.",
        link: { kind: "internal", slug: "watsonx-data-integration" },
        vendorUrl: "https://www.ibm.com/products/watsonx-data-integration",
        detail: {
          overview: [
            "watsonx.data integration is IBM's unified data integration platform, bringing batch ETL/ELT, change data capture, and streaming integration patterns under a single design and operations surface. It is purpose-built to move data into watsonx.data and other governed targets at the scale enterprise AI demands.",
            "TechD implements watsonx.data integration for clients consolidating fragmented integration tooling onto a single IBM-supported stack. Our engagements include source system inventory, pipeline design, performance tuning, and migrations from legacy ETL platforms — with the lineage and observability your governance program requires.",
          ],
          capabilities: [
            "Unified batch ETL/ELT, CDC, and streaming integration patterns",
            "Native targets for watsonx.data and Cloud Pak for Data",
            "Heterogeneous connectivity — Db2, Oracle, SQL Server, SAP, Salesforce, S3",
            "Visual designer plus code-based pipeline authoring",
            "End-to-end lineage into watsonx.data intelligence",
            "Hybrid deployment — IBM Cloud, on-premises, or air-gapped",
            "Operations dashboard for pipeline health, lag, and throughput",
          ],
          useCases: [
            "Consolidating legacy ETL tools onto a single modern platform",
            "Feeding watsonx.data lakehouse with governed source data",
            "Real-time data movement from operational systems to analytics targets",
            "Hybrid data integration spanning on-premises and cloud sources",
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
      "IBM Guardium, QRadar, and Resilient — the data security, threat detection, and incident response tooling that keeps regulated enterprises compliant and resilient.",
    highlights: [
      "Data activity monitoring",
      "Threat detection and SOAR",
      "Audit-ready evidence trails",
    ],
    pitch:
      "Data protection, threat detection, and structured response engineered for regulated enterprises — IBM Guardium, QRadar, and Resilient delivered by senior practitioners.",
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
        name: "IBM Resilient (QRadar SOAR)",
        tagline: "Orchestrate and accelerate security incident response across your team.",
        description:
          "IBM Resilient — now packaged as QRadar SOAR — provides the playbooks, case management, and automation that turn detected threats into structured, documented response, cutting mean time to respond for security operations teams.",
        link: { kind: "internal", slug: "ibm-resilient" },
        vendorUrl: "https://www.ibm.com/products/qradar-soar",
        detail: {
          overview: [
            "IBM Resilient (delivered today as QRadar SOAR) is a Security Orchestration, Automation, and Response platform that provides incident case management, dynamic playbooks, and integration with existing security tools to coordinate response actions across teams and reduce manual effort during active incidents.",
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
];
