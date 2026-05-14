/**
 * Per-industry extras for the 6 industry landing pages.
 * Keyed by `Industry.id` from `src/content/industries.ts`.
 *
 * Headline + lede are short editorial forms used by the hero.
 * Client list is verified-only (per docs/audit/INDUSTRIES-AUDIT.md).
 * Practices reference Solution.id from `src/content/solutions.ts`.
 */

export type WhyPoint = { title: string; body: string };
/**
 * `name` must match a `Customer.name` in `src/content/site.ts` so logo, url,
 * and sizing flow from the single CUSTOMERS source of truth (Logo Lab).
 */
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
      { title: "HIPAA-grade by default",   body: "Lineage, access controls, and de-identification patterns built in — not bolted on at audit time." },
      { title: "Five named health systems", body: "Active or recent work across Genesis HealthCare, Jefferson Health, Temple Health, Johns Hopkins Medicine, and CHOP." },
      { title: "Life sciences fluency",     body: "Pharmacovigilance, commercial analytics, and regulated data work for global pharma — including Johnson & Johnson." },
      { title: "Clinical-grade outputs",    body: "RAG architectures that cite their sources, governance that satisfies your CMIO, and the operational support to keep them running." },
    ],
    clients: [
      { name: "Admed",              note: "Brazilian medical platform — clinical data and decision support." },
      { name: "Netcare",            note: "South Africa's leading private hospital network." },
      { name: "Children's Health",  note: "Pediatric health system, North Texas." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Clinical knowledge agents and grounded RAG built on watsonx, deployed inside health systems." },
      { id: "data-analytics",      proof: "Clinical and operational dashboards on Cognos and Db2, plus open lakehouse foundations on watsonx.data." },
      { id: "security-compliance", proof: "HIPAA-grade data protection, audit readiness, and zero-downtime data movement." },
    ],
  },

  "media-entertainment": {
    headline: "AI and analytics for studios, networks, and the platforms behind them.",
    lede:
      "Content intelligence, audience analytics, and operational AI built for the scale and pace of major studios, streamers, and platform businesses.",
    whyPoints: [
      { title: "Platform-scale fluency", body: "Work shipped inside global media and platform businesses like Snap, Adobe, and Verizon — not pitched at them." },
      { title: "Content + audience",     body: "Two sides of the same coin: tag and search the catalog, then understand who's watching what." },
      { title: "Operational AI",         body: "Workflow assistants, knowledge agents, and automation that take cost out of post, ops, and customer support." },
      { title: "Built on watsonx",       body: "Foundation-model governance and RAG patterns that hold up to legal review and rights management." },
    ],
    clients: [
      { name: "Snap Inc.", note: "Camera-first social platform — content and audience scale." },
      { name: "Adobe",     note: "Creative software platform — media tooling and asset workflows." },
      { name: "Verizon",   note: "Telecom and media — distribution and customer experience at scale." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Content intelligence and operational AI for studios, networks, and streamers." },
      { id: "data-analytics",      proof: "Audience analytics and content performance for major media platforms." },
      { id: "security-compliance", proof: "CCPA and SOC 2 data protection for media platforms and streaming services." },
    ],
  },

  // Insurance was folded into Financial Services & Insurance — see the
  // "financial-services" entry below.

  "energy-utilities": {
    headline: "Grid, OT/IT, and analytics for regulated utilities and ISOs.",
    lede:
      "Grid analytics, asset performance management, and OT/IT security for regulated utilities and the independent system operators that keep the lights on.",
    whyPoints: [
      { title: "NERC-CIP fluency",     body: "Security, identity, and data movement patterns aligned with the controls regulated utilities answer for." },
      { title: "Grid-scale data work", body: "Engagements with operators like TEPSCO (Tokyo Electric Power Services) across power engineering and grid analytics." },
      { title: "OT/IT under one roof", body: "Observability and security that span operational technology and IT — not two disconnected programs." },
      { title: "Built to be audited",  body: "Lineage, access controls, and reporting that satisfy state PUCs and FERC, not just internal audit." },
    ],
    clients: [
      { name: "TEPSCO", note: "Tokyo Electric Power Services — engineering for power generation and grid." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Grid analytics and operational dashboards for regulated utilities and ISOs." },
      { id: "automation-finops",   proof: "Grid-system observability and OT/IT cost management." },
      { id: "security-compliance", proof: "NERC-CIP and OT/IT security for utilities and ISOs." },
    ],
  },

  "higher-education": {
    headline: "Research, identity, and student data — built for the modern university.",
    lede:
      "Research computing platforms, identity and access, and student data infrastructure for universities and research institutions that need to move fast without losing FERPA posture.",
    whyPoints: [
      { title: "Research-grade compute", body: "Platforms that handle research workloads alongside administrative analytics on a shared, governed foundation." },
      { title: "FERPA by design",        body: "Access controls and lineage that protect student data from the catalog up — not patched at the report layer." },
      { title: "Named institutions",     body: "Active or recent work with Harvard, Penn State, NUS, Stony Brook, and NYIT." },
      { title: "BI muscle",              body: "Cognos and Planning Analytics depth applied to enrollment, finance, and research analytics." },
    ],
    clients: [
      { name: "Harvard University",                    note: "Ivy League — research computing and administrative analytics." },
      { name: "Penn State",                            note: "R1 public research university." },
      { name: "National University of Singapore",      note: "Top-ranked Asia-Pacific research university." },
      { name: "Stony Brook University",                note: "SUNY flagship — research and student data." },
      { name: "New York Institute of Technology",      note: "Private polytechnic — applied research." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Student, research, and finance analytics for top-tier universities." },
      { id: "ai-generative",       proof: "Knowledge agents and research assistants grounded in institutional content." },
      { id: "security-compliance", proof: "Identity, access, and FERPA-aligned data protection for higher ed." },
    ],
  },

  "public-sector": {
    headline: "Auditable AI and modernized data for federal missions.",
    lede:
      "Auditable AI systems and modernized records management for federal agencies and the defense technology organizations that support them.",
    whyPoints: [
      { title: "FedRAMP-aligned posture", body: "Architectures designed against FedRAMP and FISMA controls — not retrofitted to them." },
      { title: "Federal experience",      body: "Engagements aligned with U.S. federal mission requirements and defense technology programs." },
      { title: "Auditable AI",            body: "watsonx-based RAG and governance patterns that produce explainable, source-cited outputs." },
      { title: "Records modernization",   body: "Data movement, catalog, and lineage work that brings legacy records into a governed, queryable state." },
    ],
    clients: [
      // Placeholder until a public-sector logo is cleared for display.
      { name: "Federal Agency", note: "Engagement details under NDA." },
    ],
    practices: [
      { id: "ai-generative",       proof: "Auditable AI systems for federal agencies and defense technology organizations." },
      { id: "security-compliance", proof: "FedRAMP-aligned security architectures for federal missions." },
    ],
  },

  "financial-services": {
    headline: "Banking, payments, and insurance — engineered for the regulator and the customer.",
    lede:
      "Core banking analytics, fraud and AML intelligence, underwriting copilots, claims acceleration, and customer experience platforms built for global universal banks, regional carriers, payments networks, cooperative finance, and insurance carriers — under PCI-DSS, SOX, NAIC, and Basel III posture.",
    whyPoints: [
      { title: "Bank-grade controls",    body: "PCI-DSS, SOX, NAIC, and Basel III control patterns implemented at scale across retail, commercial, cooperative finance, and insurance carriers." },
      { title: "Payments depth",         body: "Card, real-time payments, and core banking experience — from issuer-acquirer to switch infrastructure to fintech rails." },
      { title: "Underwriting copilots",  body: "RAG and agentic workflows grounded in your underwriting guidelines and historical book — outputs that hold up to actuarial review." },
      { title: "Claims acceleration",    body: "Document intelligence, automation, and observability that take days out of the claims cycle for life, group benefits, and P&C carriers." },
    ],
    clients: [
      { name: "Santander",            note: "Global universal bank — retail and commercial banking across Europe and the Americas." },
      { name: "Mizuho",               note: "Japanese megabank — corporate, retail, and global wholesale banking." },
      { name: "NatWest",              note: "UK retail and commercial bank — personal, business, and corporate banking." },
      { name: "Itaú",                 note: "Largest private bank in Latin America — retail, wholesale, and wealth management." },
      { name: "MetLife",              note: "Global insurer — life, group benefits, and annuities." },
      { name: "Banorte",              note: "Mexican financial group — retail, commercial, and insurance services." },
      { name: "Sicoob",               note: "Brazilian credit cooperative system — cooperative finance at national scale." },
      { name: "Dah Sing Bank",        note: "Hong Kong commercial bank — retail and SME banking across greater China." },
      { name: "Banco del Pacífico",   note: "Ecuadorian commercial bank — retail and corporate banking." },
      { name: "BROU",                 note: "Banco República — Uruguay's state-owned commercial bank." },
      { name: "Fiserv",               note: "Global payments and financial technology platform — issuer, acquirer, and core banking." },
      { name: "Clip",                 note: "Mexican payments platform — card acceptance and SME financial services." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Core banking analytics, actuarial reporting, and customer 360 for global banks and insurance carriers." },
      { id: "security-compliance", proof: "PCI-DSS, SOX, NAIC, and AML compliance tooling across card, core, digital channels, and carrier policy admin." },
      { id: "automation-finops",   proof: "Payments-platform and claims-platform observability with IT cost transparency for global financial groups and carriers." },
      { id: "ai-generative",       proof: "Customer-service copilots, underwriting assistants, and document intelligence grounded in policy and regulatory content." },
    ],
  },

  manufacturing: {
    headline: "Operational analytics and OT/IT security for global industrials.",
    lede:
      "Plant-floor analytics, supply-chain intelligence, and OT/IT security for automotive, materials, industrial equipment, storage technology, and global trading enterprises.",
    whyPoints: [
      { title: "OT/IT under one roof",  body: "Observability, identity, and data movement that span operational technology and IT — not two disconnected programs." },
      { title: "Global industrial fit", body: "Engagements with global industrials including Mercedes-Benz, Dow, Wabtec, NSK, Seagate, and Itochu." },
      { title: "Supply-chain visibility", body: "Lakehouse and analytics patterns that join MES, ERP, and logistics signals for the planning team and the plant manager." },
      { title: "ISO 27001 alignment",   body: "Security and data protection patterns aligned to ISO 27001 and NIST CSF — what global industrials' customers ask for." },
    ],
    clients: [
      { name: "Mercedes-Benz", note: "Global automotive manufacturer — premium passenger vehicles and commercial mobility." },
      { name: "Dow",           note: "Global materials science company — chemicals, plastics, and performance materials." },
      { name: "Seagate",       note: "Global storage technology — hard drive and data storage manufacturing." },
      { name: "Wabtec",        note: "Global rail equipment manufacturer — locomotives, braking, and freight technology." },
      { name: "NSK",           note: "Japanese industrial manufacturer — bearings and precision machinery components." },
      { name: "Itochu",        note: "Japanese general trading company — industrial, energy, and consumer trading at global scale." },
      { name: "Great Day Improvements", note: "US home improvement manufacturer — windows, doors, and outdoor living products." },
    ],
    practices: [
      { id: "data-analytics",      proof: "Operational and supply-chain analytics across automotive, materials, and industrial equipment." },
      { id: "automation-finops",   proof: "Full-stack observability and IT cost management for global industrial estates." },
      { id: "security-compliance", proof: "OT/IT security and ISO 27001-aligned data protection for global manufacturers." },
    ],
  },
};
