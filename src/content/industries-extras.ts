/**
 * Per-industry extras for the 6 industry landing pages.
 * Keyed by `Industry.id` from `src/content/industries.ts`.
 *
 * Headline + lede are short editorial forms used by the hero.
 * Client list is verified-only (per docs/audit/INDUSTRIES-AUDIT.md).
 * Practices reference Solution.id from `src/content/solutions.ts`.
 */

export type WhyPoint = { title: string; body: string };
export type ClientEntry = {
  name: string;
  note: string;
  /** External site for outbound link. */
  url?: string;
  /** Path under /public — e.g. "/logos/johns-hopkins.png". */
  logo?: string;
  /** Optional override of logo height utility classes. */
  logoClass?: string;
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
      { name: "Johns Hopkins Medicine", note: "Academic medical center",                  url: "https://www.hopkinsmedicine.org", logo: "/logos/johns-hopkins.png" },
      { name: "CHOP",                   note: "Children's Hospital of Philadelphia",      url: "https://www.chop.edu",            logo: "/logos/chop.png" },
      { name: "Jefferson Health",       note: "Health system, Philadelphia region",        url: "https://www.jeffersonhealth.org", logo: "/logos/jefferson-health.png" },
      { name: "Temple Health",          note: "Academic health system",                    url: "https://www.templehealth.org",    logo: "/logos/temple-health.png" },
      { name: "Genesis HealthCare",     note: "Long-term care and skilled nursing",       url: "https://www.genesishcc.com",       logo: "/logos/genesis-healthcare.png" },
      { name: "Johnson & Johnson",      note: "Global pharmaceutical and consumer health", url: "https://www.jnj.com",             logo: "/logos/johnson-and-johnson.png" },
    ],
    practices: [
      { id: "ai-generative",       proof: "Clinical knowledge agents and grounded RAG built on watsonx, deployed inside health systems." },
      { id: "data-analytics",      proof: "Clinical and operational dashboards on Cognos and Db2, plus open lakehouse foundations on watsonx.data." },
      { id: "security-compliance", proof: "HIPAA-grade data protection, audit readiness, and zero-downtime data movement." },
      { id: "hybrid-cloud",        proof: "Hybrid Db2 and OpenShift platforms spanning on-prem and cloud." },
    ],
    stats: [
      { value: "5+",   label: "Named U.S. health systems served" },
      { value: "6+",   label: "Healthcare-focused webinars and workshops delivered" },
      { value: "HIPAA", label: "Engagement standard" },
    ],
  },

  "media-entertainment": {
    headline: "AI and analytics for studios, networks, and the platforms behind them.",
    lede:
      "Content intelligence, audience analytics, and operational AI built for the scale and pace of major studios, streamers, and platform businesses.",
    whyPoints: [
      { title: "Platform-scale fluency", body: "Work shipped inside Sony Interactive Entertainment, Sony Pictures, and Comcast/Peacock — not pitched at them." },
      { title: "Content + audience",     body: "Two sides of the same coin: tag and search the catalog, then understand who's watching what." },
      { title: "Operational AI",         body: "Workflow assistants, knowledge agents, and automation that take cost out of post, ops, and customer support." },
      { title: "Built on watsonx",       body: "Foundation-model governance and RAG patterns that hold up to legal review and rights management." },
    ],
    clients: [
      { name: "Sony Interactive Entertainment", note: "PlayStation platform",                url: "https://www.sie.com",        logo: "/logos/sony-interactive.svg" },
      { name: "Sony Pictures",                  note: "Film and TV production",              url: "https://www.sonypictures.com", logo: "/logos/sony-pictures.png" },
      { name: "Comcast / Peacock",              note: "Cable, streaming, and broadband",     url: "https://corporate.comcast.com", logo: "/logos/comcast-peacock.svg" },
    ],
    practices: [
      { id: "ai-generative",  proof: "Content intelligence and operational AI for studios, networks, and streamers." },
      { id: "data-analytics", proof: "Audience analytics and content performance for major media platforms." },
      { id: "hybrid-cloud",   proof: "Hybrid OpenShift and data architectures for global media operations." },
    ],
  },

  insurance: {
    headline: "Underwriting, claims, and analytics — engineered for regulated carriers.",
    lede:
      "Underwriting copilots, claims acceleration, and actuarial analytics built for property, casualty, and specialty carriers who can't ship anything an auditor can't explain.",
    whyPoints: [
      { title: "Carrier-grade controls", body: "NAIC and SOX compliance tooling, lineage-traced data, and the audit posture regulated carriers need." },
      { title: "Specialty carrier fit",  body: "Active work with PURE Insurance and National General — high-net-worth and standard P&C." },
      { title: "Underwriting copilots",  body: "RAG and agentic workflows grounded in your underwriting guidelines and historical book." },
      { title: "Claims acceleration",    body: "Document intelligence, automation, and observability that take days out of the claims cycle." },
    ],
    clients: [
      { name: "PURE Insurance",     note: "High-net-worth homeowner insurance", url: "https://www.pureinsurance.com",         logo: "/logos/pure-insurance.png" },
      { name: "National General",   note: "Property and casualty carrier",       url: "https://www.nationalgeneral.com",       logo: "/logos/national-general.png" },
    ],
    practices: [
      { id: "ai-generative",       proof: "Underwriting copilots and claims acceleration for property and specialty carriers." },
      { id: "data-analytics",      proof: "Actuarial analytics and regulatory reporting for P&C carriers." },
      { id: "security-compliance", proof: "NAIC and SOX-aligned compliance tooling and audit readiness." },
      { id: "automation-finops",   proof: "Claims platform observability and IT cost transparency." },
    ],
  },

  "energy-utilities": {
    headline: "Grid, OT/IT, and analytics for regulated utilities and ISOs.",
    lede:
      "Grid analytics, asset performance management, and OT/IT security for regulated utilities and the independent system operators that keep the lights on.",
    whyPoints: [
      { title: "NERC-CIP fluency",     body: "Security, identity, and data movement patterns aligned with the controls regulated utilities answer for." },
      { title: "Grid-scale data work", body: "Active engagements with Dominion Energy and MISO Energy across grid operations and analytics." },
      { title: "OT/IT under one roof", body: "Observability and security that span operational technology and IT — not two disconnected programs." },
      { title: "Built to be audited",  body: "Lineage, access controls, and reporting that satisfy state PUCs and FERC, not just internal audit." },
    ],
    clients: [
      { name: "Dominion Energy", note: "Regulated electric utility",              url: "https://www.dominionenergy.com", logo: "/logos/dominion-energy.png" },
      { name: "MISO Energy",     note: "Midcontinent independent system operator", url: "https://www.misoenergy.org",     logo: "/logos/miso-energy.png" },
    ],
    practices: [
      { id: "data-analytics",      proof: "Grid analytics and operational dashboards for regulated utilities and ISOs." },
      { id: "automation-finops",   proof: "Grid-system observability and OT/IT cost management." },
      { id: "security-compliance", proof: "NERC-CIP and OT/IT security for utilities and ISOs." },
      { id: "hybrid-cloud",        proof: "Mainframe-to-cloud data flows for regulated utilities." },
    ],
  },

  "higher-education": {
    headline: "Research, identity, and student data — built for the modern university.",
    lede:
      "Research computing platforms, identity and access, and student data infrastructure for universities and research institutions that need to move fast without losing FERPA posture.",
    whyPoints: [
      { title: "Research-grade compute", body: "Platforms that handle research workloads alongside administrative analytics on a shared, governed foundation." },
      { title: "FERPA by design",        body: "Access controls and lineage that protect student data from the catalog up — not patched at the report layer." },
      { title: "Named institutions",     body: "Active or recent work with Princeton University and Virginia Commonwealth University." },
      { title: "BI muscle",              body: "Cognos and Planning Analytics depth applied to enrollment, finance, and research analytics." },
    ],
    clients: [
      { name: "Princeton University", note: "Research university",            url: "https://www.princeton.edu", logo: "/logos/princeton-university.png" },
      { name: "VCU",                  note: "Virginia Commonwealth University", url: "https://www.vcu.edu",       logo: "/logos/vcu.png" },
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
      { title: "Federal experience",      body: "Direct work with the Department of Homeland Security and defense contractor L3Harris." },
      { title: "Auditable AI",            body: "watsonx-based RAG and governance patterns that produce explainable, source-cited outputs." },
      { title: "Records modernization",   body: "Data movement, catalog, and lineage work that brings legacy records into a governed, queryable state." },
    ],
    clients: [
      { name: "Department of Homeland Security", note: "Federal agency" },
      { name: "L3Harris",                        note: "Defense electronics contractor" },
    ],
    practices: [
      { id: "ai-generative",       proof: "Auditable AI systems for federal agencies and defense technology organizations." },
      { id: "security-compliance", proof: "FedRAMP-aligned security architectures for federal missions." },
      { id: "hybrid-cloud",        proof: "FedRAMP-aligned hybrid architectures for federal agencies." },
    ],
  },
};
