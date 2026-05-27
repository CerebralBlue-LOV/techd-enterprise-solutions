/**
 * Per-industry extras for the 7 industry landing pages.
 * Keyed by `Industry.id` from `src/content/industries.ts`.
 *
 * Headline + lede are short editorial forms used by the hero.
 * Client list is verified-only. Each `clients[].name` must match a
 * `Client.name` in `src/content/site.ts` (which derives from
 * `src/sections/clients-lab/clients-lab-data.ts` — the single source of
 * truth for the client list).
 * Practices reference Solution.id from `src/content/solutions.ts`.
 */

export type WhyPoint = { title: string; body: string };
export type ClientEntry = {
  name: string;
  note: string;
};
export type PracticeProof = { id: string; proof: string };
export type StatCallout = { value: string; label: string };

export type IndustryExtras = {
  /** Short editorial headline used in the hero (overrides industry.outcome). */
  headline: string;
  /** Short paragraph lede used in the hero. */
  lede: string;
  whyPoints: WhyPoint[];
  clients: ClientEntry[];
  practices: PracticeProof[];
  /** Optional — only when defensible per the audit. */
  stats?: StatCallout[];
};

export const INDUSTRIES_EXTRAS: Record<string, IndustryExtras> = {
  healthcare: {
    headline: "Care-grade data and AI for the systems patients depend on.",
    lede:
      "From clinical knowledge agents to HIPAA-grade data platforms, TechD delivers the data and AI work health systems and life sciences leaders trust to put in front of clinicians.",
    whyPoints: [
      { title: "HIPAA-grade by default",   body: "We build HIPAA controls into every layer — lineage, access controls, and de-identification patterns are part of the architecture, not bolted on at audit time." },
      { title: "Academic medical depth",   body: "We've delivered active work with Memorial Sloan Kettering and Thomas Jefferson University Hospital — NCI-designated cancer care and a major academic health system." },
      { title: "Life sciences fluency",    body: "We've delivered pharmacovigilance, commercial analytics, and regulated data work for life sciences organizations operating under HIPAA and HITECH." },
      { title: "Clinical-grade outputs",   body: "We build RAG architectures that cite their sources, governance your CMIO can sign off on, and the operational support to keep them running." },
    ],
    clients: [
      { name: "Memorial Sloan Kettering",            note: "NCI-designated cancer center, New York — clinical data and oncology informatics." },
      { name: "Thomas Jefferson University Hospital", note: "Jefferson Health academic medical system, Philadelphia." },
      { name: "Children's Hospital of Philadelphia",  note: "Top-ranked pediatric academic medical center — clinical data and research informatics." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Clinical knowledge agents and grounded RAG built on watsonx, deployed inside health systems." },
      { id: "data-analytics",      proof: "Clinical and operational dashboards on Cognos and Db2, plus open lakehouse foundations on watsonx.data." },
      { id: "security-compliance", proof: "HIPAA-grade data protection, audit readiness, and zero-downtime data movement." },
      { id: "infrastructure",      proof: "On-prem Fusion HCI runtime for watsonx and Cloud Pak for Data — keeps PHI inside the hospital's own four walls under HIPAA." },
    ],
  },

  "media-entertainment": {
    headline: "AI and analytics for studios, networks, and the platforms behind them.",
    lede:
      "Content intelligence, audience analytics, and operational AI built for the scale and pace of major studios, streamers, and platform businesses.",
    whyPoints: [
      { title: "Studio-scale delivery",  body: "We've shipped inside major film and music businesses — Sony Pictures and Concord Music — not just pitched at them." },
      { title: "Content + audience",     body: "We address both sides: tag and search the catalog, then build the analytics to understand who's watching what." },
      { title: "Operational AI",         body: "We build workflow assistants, knowledge agents, and automation that take cost out of post, ops, and customer support." },
      { title: "Built on watsonx",       body: "We implement foundation-model governance and RAG patterns that hold up to legal review and rights management." },
    ],
    clients: [
      { name: "Sony Pictures", note: "Global film and television studio — content operations and analytics." },
      { name: "Concord Music", note: "Independent music rights and publishing — catalog and royalty data." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Content intelligence and operational AI for studios, networks, and streamers." },
      { id: "data-analytics",      proof: "Audience analytics and content performance for major media platforms." },
      { id: "security-compliance", proof: "CCPA and SOC 2 data protection for media platforms and streaming services." },
    ],
  },

  "energy-utilities": {
    headline: "Grid, OT/IT, and analytics for regulated utilities and ISOs.",
    lede:
      "Grid analytics, asset performance management, and OT/IT security for regulated utilities and the independent system operators that keep the lights on.",
    whyPoints: [
      { title: "NERC-CIP fluency",     body: "We implement security, identity, and data movement patterns aligned with the controls regulated utilities answer to." },
      { title: "ISO and utility scale", body: "We've delivered engagements with MISO, Dominion Energy, and Noresco — spanning grid operations, regulated generation and distribution, and energy-as-a-service portfolios." },
      { title: "OT/IT under one roof", body: "We deploy observability and security that span operational technology and IT — not two disconnected programs." },
      { title: "Built to be audited",  body: "We deliver lineage, access controls, and reporting that satisfy state PUCs and FERC, not just internal audit." },
    ],
    clients: [
      { name: "MISO",            note: "Midcontinent Independent System Operator — grid operations across 15 US states and Manitoba." },
      { name: "Dominion Energy", note: "Regulated electric and natural gas utility — multi-state generation, transmission, and distribution." },
      { name: "Noresco",         note: "Energy-as-a-service and efficiency programs for federal, state, and commercial portfolios." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Grid analytics and operational dashboards for regulated utilities and ISOs." },
      { id: "automation-finops",   proof: "Grid-system observability and OT/IT cost management." },
      { id: "security-compliance", proof: "NERC-CIP and OT/IT security for utilities and ISOs." },
      { id: "infrastructure",      proof: "On-prem Fusion HCI runtime for watsonx and Cloud Pak for Data — keeps grid and OT-adjacent workloads inside the NERC-CIP perimeter." },
    ],
  },

  "higher-education": {
    headline: "Research, identity, and student data — built for the modern university.",
    lede:
      "Research computing platforms, identity and access, and student data infrastructure for universities and research institutions that need to move fast without losing FERPA posture.",
    whyPoints: [
      { title: "Research-grade compute", body: "We build platforms that handle research workloads alongside administrative analytics on a shared, governed foundation." },
      { title: "FERPA by design",        body: "We configure access controls and lineage that protect student data from the catalog up — not patched at the report layer." },
      { title: "R1 delivery experience", body: "Multi-year delivery across R1 research universities — research computing, identity and SSO, and FERPA-aligned student data platforms." },
      { title: "BI muscle",              body: "We apply Cognos and Planning Analytics depth to enrollment, finance, and research analytics for higher-ed institutions." },
    ],
    clients: [],
    practices: [
      { id: "data-analytics",      proof: "Student, research, and finance analytics for top-tier universities." },
      { id: "ai-generative",       proof: "Knowledge agents and research assistants grounded in institutional content." },
      { id: "security-compliance", proof: "Identity, access, and FERPA-aligned data protection for higher ed." },
    ],
  },

  "public-sector": {
    headline: "Auditable AI and modernized data for federal and state missions.",
    lede:
      "Auditable AI systems and modernized records management for federal agencies, state governments, and the defense technology organizations that support them.",
    whyPoints: [
      { title: "FedRAMP-aligned posture", body: "We design architectures against FedRAMP and FISMA controls from the start — not retrofitted to them after the platform is live." },
      { title: "State and defense reach", body: "We've delivered engagements with the State of Delaware and L3Harris — spanning state government data modernization and defense-prime mission systems." },
      { title: "Auditable AI",            body: "We implement watsonx-based RAG and governance patterns that produce explainable, source-cited outputs your ATO reviewers can follow." },
      { title: "Records modernization",   body: "We deliver data movement, catalog, and lineage work that brings legacy records into a governed, queryable state." },
    ],
    clients: [
      { name: "State of Delaware", note: "US state government — enterprise data and records modernization." },
      { name: "L3Harris",          note: "Defense technology prime — mission systems and integrated programs." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Auditable AI systems for federal agencies and defense technology organizations." },
      { id: "security-compliance", proof: "FedRAMP-aligned security architectures for federal missions." },
      { id: "infrastructure",      proof: "On-prem and air-gapped Fusion HCI runtime for watsonx and Cloud Pak for Data — built for FedRAMP-High and sovereign-cloud missions." },
    ],
  },

  "financial-services": {
    headline: "Banking, payments, and insurance — engineered for the regulator and the customer.",
    lede:
      "Core banking analytics, fraud and AML intelligence, underwriting copilots, claims acceleration, and customer experience platforms built for global universal banks, regional carriers, payments networks, cooperative finance, and insurance carriers — under PCI-DSS, SOX, NAIC, and Basel III posture.",
    whyPoints: [
      { title: "Bank-grade controls",    body: "We implement PCI-DSS, SOX, NAIC, and Basel III control patterns at scale across retail, commercial, cooperative finance, and insurance carriers." },
      { title: "Post-trade depth",       body: "We've delivered with FIA Tech — derivatives post-trade infrastructure used across the exchange-traded futures and options industry." },
      { title: "Underwriting copilots",  body: "We build RAG and agentic workflows grounded in your underwriting guidelines and historical book — outputs that hold up to actuarial review." },
      { title: "Claims acceleration",    body: "We deploy document intelligence, automation, and observability that take days out of the claims cycle for life, group benefits, and P&C carriers." },
    ],
    clients: [
      { name: "FIA Tech", note: "Derivatives post-trade infrastructure — exchange-traded futures and options industry utility." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Core banking analytics, actuarial reporting, and customer 360 for global banks and insurance carriers." },
      { id: "security-compliance", proof: "PCI-DSS, SOX, NAIC, and AML compliance tooling across card, core, digital channels, and carrier policy admin." },
      { id: "automation-finops",   proof: "Payments-platform and claims-platform observability with IT cost transparency for global financial groups and carriers." },
      { id: "ai-generative",       proof: "Customer-service copilots, underwriting assistants, and document intelligence grounded in policy and regulatory content." },
      { id: "infrastructure",      proof: "On-prem Fusion HCI runtime for watsonx and Cloud Pak for Data — keeps core banking, card data, and policy admin workloads inside data-residency and latency boundaries the regulator can verify." },
    ],
  },

  manufacturing: {
    headline: "Operational analytics and OT/IT security for global industrials.",
    lede:
      "Plant-floor analytics, supply-chain intelligence, and OT/IT security for consumer products, storage technology, and rail-equipment manufacturers.",
    whyPoints: [
      { title: "OT/IT under one roof",    body: "We deploy observability, identity, and data movement that span operational technology and IT — not two disconnected programs." },
      { title: "Industrial track record",  body: "We've delivered engagements with Hamilton Beach, Seagate, and Wabtec — spanning consumer appliances, storage manufacturing, and global rail equipment." },
      { title: "Supply-chain visibility", body: "We build lakehouse and analytics patterns that join MES, ERP, and logistics signals for the planning team and the plant manager." },
      { title: "ISO 27001 alignment",     body: "We implement security and data protection patterns aligned to ISO 27001 and NIST CSF — what global industrials' customers require." },
    ],
    clients: [
      { name: "Hamilton Beach", note: "US small-appliance manufacturer — supply chain and commerce data." },
      { name: "Seagate",        note: "Global storage manufacturer — manufacturing analytics and operations." },
      { name: "Wabtec",         note: "Global rail-equipment manufacturer — locomotives, braking, and freight systems." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Operational and supply-chain analytics across consumer products, storage, and rail equipment." },
      { id: "automation-finops",   proof: "Full-stack observability and IT cost management for global industrial estates." },
      { id: "security-compliance", proof: "OT/IT security and ISO 27001-aligned data protection for global manufacturers." },
    ],
  },
};
