/**
 * Curated Q&A for the NeuralSeek knowledge base.
 * These entries are uploaded as `99-chatbot-faq.md` via `npm run kb:build`.
 * They give the chatbot direct, citable answers to the highest-frequency questions.
 *
 * Voice rules (CLAUDE.md): practitioner-to-practitioner. No superlatives.
 * Answers must reference only information already public on techd.com.
 */

export type FaqEntry = {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
  tags?: string[];
};

export const CHATBOT_FAQ: FaqEntry[] = [
  // ── Contact ───────────────────────────────────────────────────────────────
  {
    question: "How do I contact TechD?",
    answer:
      "Call 888-98-TECHD (888-988-3243) or submit the contact form at /contact. We respond within one business day.",
    links: [{ label: "Contact page", href: "/contact" }],
    tags: ["contact", "phone", "email", "reach out", "talk to someone"],
  },
  {
    question: "Where is TechD headquartered?",
    answer:
      "TechD is headquartered in Miami, FL, with delivery across the US and Canada.",
    tags: ["location", "office", "headquarters", "where"],
  },
  {
    question: "How do I get a quote or start an engagement?",
    answer:
      "Use the contact form at /contact or call 888-98-TECHD. All engagements start with a scoping conversation with a senior architect — no SDR queue.",
    links: [{ label: "Contact page", href: "/contact" }],
    tags: ["quote", "pricing", "start", "engagement", "scope", "proposal"],
  },

  // ── Company & IBM ────────────────────────────────────────────────────────
  {
    question: "Is TechD an IBM Business Partner?",
    answer:
      "TechD has been an IBM Gold Business Partner under IBM Partner Plus since 2009. We hold active authorizations across 23 IBM products spanning AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance, and Infrastructure.",
    links: [{ label: "IBM Partnership page", href: "/company/ibm-partnership" }],
    tags: ["ibm", "partner", "gold", "certification", "authorized"],
  },
  {
    question: "When was TechD founded?",
    answer:
      "TechD was founded in 2009 and has operated as an IBM Gold Business Partner since that year.",
    links: [{ label: "About TechD", href: "/company/about" }],
    tags: ["founded", "history", "years", "experience", "since"],
  },
  {
    question: "What IBM products does TechD implement?",
    answer:
      "TechD implements 23 IBM products across five practices: AI & Generative (watsonx.ai, watsonx platform, watsonx Orchestrate, watsonx Assistant, NeuralSeek, IBM SPSS Modeler); Data & Analytics (IBM Db2, watsonx.data, Cloud Pak for Data, IBM DataStage, IBM Netezza Performance Server, Cognos Analytics 12, Planning Analytics); Automation & FinOps (IBM Apptio, IBM Instana, IBM Turbonomic, IBM Concert); Security & Compliance (IBM Guardium, IBM QRadar, IBM QRadar SOAR); Infrastructure (IBM Storage Fusion HCI).",
    links: [{ label: "IBM Partnership", href: "/company/ibm-partnership" }],
    tags: ["products", "ibm", "watsonx", "cognos", "db2", "guardium", "qradar", "apptio", "concert", "fusion", "infrastructure"],
  },

  // ── Solutions practices ──────────────────────────────────────────────────
  {
    question: "What AI products and services does TechD offer?",
    answer:
      "TechD's AI & Generative Solutions practice delivers production RAG, agentic workflows, and conversational interfaces built on IBM watsonx — grounded in your enterprise data and governed from day one. Key products: watsonx.ai, watsonx Orchestrate, watsonx Assistant, NeuralSeek, and IBM SPSS Modeler.",
    links: [{ label: "AI & Generative Solutions", href: "/solutions/ai-generative" }],
    tags: ["ai", "generative ai", "watsonx", "llm", "rag", "chatbot", "agent"],
  },
  {
    question: "What does TechD do for data and analytics?",
    answer:
      "TechD's Data & Analytics practice covers Db2, watsonx.data, Cloud Pak for Data, Cognos Analytics, Planning Analytics, DataStage, and Netezza — from lakehouse foundations to BI dashboards and planning models.",
    links: [{ label: "Data & Analytics", href: "/solutions/data-analytics" }],
    tags: ["data", "analytics", "cognos", "db2", "bi", "reporting", "lakehouse", "watsonx.data"],
  },
  {
    question: "What is TechD's Automation & FinOps practice?",
    answer:
      "TechD's Automation & FinOps practice delivers full-stack observability with IBM Instana, IT financial management with IBM Apptio, workload cost optimization with IBM Turbonomic, and agentic cross-domain orchestration with IBM Concert (preview).",
    links: [{ label: "Automation & FinOps", href: "/solutions/automation-finops" }],
    tags: ["automation", "finops", "instana", "apptio", "turbonomic", "concert", "observability", "cost"],
  },
  {
    question: "What does TechD do for cybersecurity and compliance?",
    answer:
      "TechD's Security & Compliance practice implements IBM Guardium for data activity monitoring and compliance reporting, IBM QRadar for SIEM and threat detection, and IBM QRadar SOAR for incident response playbooks. We have active delivery experience with HIPAA, FedRAMP, PCI-DSS, NERC-CIP, NAIC, and SOX.",
    links: [{ label: "Security & Compliance", href: "/solutions/security-compliance" }],
    tags: ["security", "compliance", "guardium", "qradar", "hipaa", "fedramp", "pci", "siem", "soar"],
  },
  {
    question: "Does TechD deploy on-prem hardware or appliances?",
    answer:
      "Yes. TechD's Infrastructure practice implements IBM Storage Fusion HCI — a hyperconverged appliance bundling Red Hat OpenShift, IBM container-native storage, and integrated backup/DR as the on-prem runtime for watsonx and Cloud Pak for Data. The client procures the appliance from IBM; TechD owns the landing-zone design, cluster deployment, watsonx and Cloud Pak for Data integration, and day-2 operations. Used by clients with data-residency, low-latency, or air-gap requirements that rule out public cloud.",
    links: [{ label: "Infrastructure", href: "/solutions/infrastructure" }],
    tags: ["infrastructure", "hardware", "appliance", "fusion", "fusion hci", "on-prem", "on premises", "sovereign", "air gap", "openshift", "hyperconverged", "hci"],
  },

  // ── Services ────────────────────────────────────────────────────────────
  {
    question: "What advisory services does TechD provide?",
    answer:
      "TechD Advisory produces opinionated architecture roadmaps, AI readiness assessments, and the IBM Platform Assessment — a structured one-day engagement that delivers a written findings report covering architecture, security posture, licensing, and upgrade paths.",
    links: [{ label: "Advisory services", href: "/services/advisory" }],
    tags: ["advisory", "roadmap", "assessment", "consulting", "strategy"],
  },
  {
    question: "Does TechD do implementation and engineering work?",
    answer:
      "Yes. TechD Implementation delivers greenfield platform builds, migrations, replatforming, and integrations. The same certified practitioners who scope the engagement execute the build — there is no handoff between advisory and delivery teams.",
    links: [{ label: "Implementation", href: "/services/implementation" }],
    tags: ["implementation", "engineering", "build", "deploy", "migration", "integration"],
  },
  {
    question: "Does TechD offer managed services?",
    answer:
      "TechD Managed Services provides 24×7 operations for AI, data, and security platforms with SLAs tied to business outcomes. Services include platform operations, security operations, and FinOps optimization.",
    links: [{ label: "Managed Services", href: "/services/managed-services" }],
    tags: ["managed services", "support", "operations", "24x7", "sla", "maintenance"],
  },
  {
    question: "Does TechD offer IBM training?",
    answer:
      "TechD Training delivers IBM-certified, role-based enablement for executives, architects, and engineering teams — covering all four practice areas in online, instructor-led, on-site, or custom formats. We train on watsonx, Cognos Analytics 12, Planning Analytics, Db2, DataStage, Apptio, Instana, Turbonomic, Concert, Guardium, and QRadar.",
    links: [{ label: "Training", href: "/services/training" }],
    tags: ["training", "certification", "ibm", "course", "enablement", "bootcamp", "education"],
  },

  // ── Industries ──────────────────────────────────────────────────────────
  {
    question: "Does TechD work with healthcare organizations?",
    answer:
      "Yes. TechD has delivered HIPAA-grade data platforms, clinical knowledge agents, and pharmacovigilance automation for health systems and life sciences organizations including Children's Health, Netcare, and Admed.",
    links: [{ label: "Healthcare & Life Sciences", href: "/industries/healthcare" }],
    tags: ["healthcare", "health", "hospital", "hipaa", "clinical", "life sciences"],
  },
  {
    question: "Does TechD work with financial services or insurance companies?",
    answer:
      "Yes. TechD has delivered core banking analytics, fraud and AML tooling, underwriting copilots, and claims acceleration for global banks, insurance carriers, payments networks, and cooperative finance organizations — under PCI-DSS, SOX, NAIC, and Basel III posture.",
    links: [{ label: "Financial Services & Insurance", href: "/industries/financial-services" }],
    tags: ["finance", "banking", "insurance", "fintech", "pci", "sox", "naic", "underwriting", "claims"],
  },
  {
    question: "Does TechD work with government or federal agencies?",
    answer:
      "Yes. TechD delivers auditable AI, FedRAMP-aligned architectures, and records modernization for federal agencies and defense technology organizations.",
    links: [{ label: "Public Sector", href: "/industries/public-sector" }],
    tags: ["government", "federal", "public sector", "fedramp", "fisma", "defense", "agency"],
  },
  {
    question: "Does TechD work with universities or higher education institutions?",
    answer:
      "Yes. TechD has delivered research computing platforms, identity and access management, and student data infrastructure for institutions including Harvard University, Penn State, National University of Singapore, Stony Brook University, and NYIT.",
    links: [{ label: "Higher Education & Research", href: "/industries/higher-education" }],
    tags: ["education", "university", "higher ed", "research", "ferpa", "campus"],
  },
  {
    question: "Does TechD work with energy and utility companies?",
    answer:
      "Yes. TechD delivers grid analytics, asset performance management, and OT/IT security for regulated utilities and independent system operators, with experience aligned to NERC-CIP and FERC requirements.",
    links: [{ label: "Energy & Utilities", href: "/industries/energy-utilities" }],
    tags: ["energy", "utility", "grid", "nerc", "ot", "operational technology", "power"],
  },
  {
    question: "Does TechD work with media or entertainment companies?",
    answer:
      "Yes. TechD delivers content intelligence, audience analytics, and operational AI for studios, networks, and streaming platforms. We have worked with Snap, Adobe, and Verizon on media and platform-scale engagements.",
    links: [{ label: "Media & Entertainment", href: "/industries/media-entertainment" }],
    tags: ["media", "entertainment", "streaming", "studio", "content", "audience", "broadcast"],
  },
  {
    question: "Does TechD work with manufacturing or industrial companies?",
    answer:
      "Yes. TechD delivers plant-floor analytics, supply-chain intelligence, and OT/IT security for automotive, materials, industrial equipment, and global trading enterprises including Mercedes-Benz, Dow, Wabtec, NSK, Seagate, and Itochu.",
    links: [{ label: "Manufacturing & Industrials", href: "/industries/manufacturing" }],
    tags: ["manufacturing", "industrial", "automotive", "supply chain", "ot", "iso 27001"],
  },

  // ── Compliance ──────────────────────────────────────────────────────────
  {
    question: "Is TechD FedRAMP compliant or authorized?",
    answer:
      "TechD designs architectures to FedRAMP and FISMA control frameworks and has delivered FedRAMP-aligned platforms for federal agencies. Platform authorization depends on the specific environment and agency; we scope this during the advisory assessment.",
    links: [{ label: "Security & Compliance", href: "/solutions/security-compliance" }],
    tags: ["fedramp", "fisma", "federal", "authorization", "ato", "government"],
  },
  {
    question: "Can TechD help with HIPAA compliance?",
    answer:
      "Yes. TechD builds HIPAA controls into every layer of data platform work for healthcare clients — lineage, access controls, and de-identification are part of the architecture, not bolted on at audit time. We implement these patterns on IBM Db2, Cloud Pak for Data, and Guardium.",
    links: [{ label: "Healthcare", href: "/industries/healthcare" }],
    tags: ["hipaa", "hitech", "phi", "healthcare", "compliance", "audit"],
  },

  // ── Engagement model ──────────────────────────────────────────────────
  {
    question: "How does a TechD engagement work?",
    answer:
      "TechD engagements follow five stages: Advisory Assessment → Architecture Design → Implementation → Knowledge Transfer → Post-Go-Live Support. The same certified practitioners who assess your environment design the architecture and execute the build. There is no handoff between teams.",
    links: [{ label: "Delivery Methodology", href: "/company/delivery-methodology" }],
    tags: ["engagement", "process", "methodology", "stages", "how it works"],
  },
  {
    question: "What is the IBM Platform Assessment?",
    answer:
      "The IBM Platform Assessment is a one-day structured engagement, on-site or remote, covering architecture review, security posture, licensing summary, and upgrade recommendations. It produces a written findings report your CIO can act on. Contact TechD to schedule.",
    links: [
      { label: "Advisory services", href: "/services/advisory" },
      { label: "Contact", href: "/contact" },
    ],
    tags: ["assessment", "platform", "ibm", "advisory", "evaluation", "review"],
  },
];
