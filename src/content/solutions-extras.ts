/**
 * Practice-level extras for the 5 solutions landing pages.
 * Keyed by `Solution.id` from `src/content/solutions.ts`.
 *
 * Industry proof lines reference the existing INDUSTRIES data in
 * `src/content/industries.ts` — no fabricated client claims here.
 */

export type WhyPoint = { title: string; body: string };
export type IndustryProof = { id: string; proof: string };
export type ApproachStep = { step: string; detail: string };
export type StatCallout = { value: string; label: string };

export type PracticeExtras = {
  whyPoints: WhyPoint[];
  industries: IndustryProof[];
  approach: ApproachStep[];
  stats?: StatCallout[];
};

const COMMON_APPROACH: ApproachStep[] = [
  { step: "Discover", detail: "Workshop with your stakeholders to map use cases, data sources, and success metrics." },
  { step: "Architect", detail: "Reference architecture grounded in IBM products you already own — minus the rip-and-replace." },
  { step: "Deliver",   detail: "Senior IBM-certified engineers build and integrate, paired with your team for handoff." },
  { step: "Operate",   detail: "Production support, optimization, and roadmap reviews from the same people who built it." },
];

export const PRACTICE_EXTRAS: Record<string, PracticeExtras> = {
  "ai-generative": {
    whyPoints: [
      { title: "Grounded, not guessing", body: "RAG architectures sourced from your governed data — not the open web. Outputs cite the documents they came from." },
      { title: "Built on watsonx",       body: "IBM Granite, Llama, Mistral, and your own fine-tuned models behind a single enterprise control plane." },
      { title: "Governed from day one",  body: "Lineage, drift detection, and auditable prompts via IBM Knowledge Catalog and watsonx.governance." },
      { title: "Production, not pilots", body: "Patterns we've shipped into healthcare, media, insurance, and public sector — not lab demos." },
    ],
    industries: [
      { id: "healthcare",          proof: "Clinical knowledge agents and HIPAA-grade data platforms for major U.S. health systems." },
      { id: "insurance",           proof: "Underwriting copilots and claims acceleration for property and specialty carriers." },
      { id: "public-sector",       proof: "Auditable AI systems for federal agencies and defense technology organizations." },
      { id: "media-entertainment", proof: "Content intelligence and operational AI for studios, networks, and streamers." },
    ],
    approach: COMMON_APPROACH,
    stats: [
      { value: "watsonx",     label: "IBM platform of record" },
      { value: "Platinum",    label: "IBM Business Partner" },
    ],
  },

  "data-analytics": {
    whyPoints: [
      { title: "Open lakehouse",        body: "watsonx.data on Iceberg/Parquet with Presto and Spark — no proprietary lock-in." },
      { title: "15+ years of Cognos",   body: "One of the deepest Cognos Analytics and Planning Analytics practices in the IBM partner ecosystem." },
      { title: "Db2 to dashboard",      body: "End-to-end ownership: Db2, DataStage pipelines, lakehouse, BI, and planning under one roof." },
      { title: "AI-ready by design",    body: "Cataloged, lineage-traced datasets that watsonx.ai can train on without a remediation project." },
    ],
    industries: [
      { id: "healthcare",          proof: "Clinical and operational dashboards for major U.S. health systems." },
      { id: "higher-education",    proof: "Student, research, and finance analytics for top-tier universities." },
      { id: "media-entertainment", proof: "Audience analytics and content performance for studios and streamers." },
      { id: "insurance",           proof: "Actuarial analytics and regulatory reporting for property and specialty carriers." },
    ],
    approach: COMMON_APPROACH,
    stats: [
      { value: "15+ yrs",  label: "Cognos & TM1 in production" },
      { value: "Platinum", label: "IBM Business Partner" },
    ],
  },

  "automation-finops": {
    whyPoints: [
      { title: "See the whole stack",   body: "Instana for full-stack observability — application, runtime, infrastructure, and the network in between." },
      { title: "Right-size the spend",  body: "Apptio for IT financial management and Turbonomic for workload-level cost optimization." },
      { title: "Eliminate manual toil", body: "Automated remediation playbooks tied to the alerts that actually matter." },
      { title: "FinOps that scales",    body: "Cost allocation models that survive a re-org, a cloud migration, or an M&A." },
    ],
    industries: [
      { id: "insurance",         proof: "Claims platform observability and IT cost transparency for specialty carriers." },
      { id: "energy-utilities",  proof: "Grid-system observability and OT/IT cost management for regulated utilities." },
      { id: "public-sector",     proof: "Federal-grade observability and FinOps for agencies and defense technology." },
    ],
    approach: COMMON_APPROACH,
  },

  "security-compliance": {
    whyPoints: [
      { title: "Pass the audit",        body: "Guardium and IBM MDM deliver the data lineage and access controls your auditors ask for." },
      { title: "Detect, then respond",  body: "QRadar for detection, Resilient SOAR for the playbook that runs at 2 a.m." },
      { title: "Zero-downtime moves",   body: "IBM Data Replication (IIDR) for log-based CDC across mainframe, on-prem, and cloud targets." },
      { title: "Built for regulated",   body: "HIPAA, FedRAMP, NERC-CIP, NAIC — patterns we've delivered, not slides we've written." },
    ],
    industries: [
      { id: "healthcare",       proof: "HIPAA-grade data protection and audit readiness for major U.S. health systems." },
      { id: "public-sector",    proof: "FedRAMP-aligned security architectures for federal agencies and defense technology." },
      { id: "insurance",        proof: "NAIC and SOX compliance tooling for property and specialty carriers." },
      { id: "energy-utilities", proof: "NERC-CIP and OT/IT security for regulated utilities and ISOs." },
    ],
    approach: COMMON_APPROACH,
  },

  "hybrid-cloud": {
    whyPoints: [
      { title: "Run it anywhere",        body: "Workloads on IBM Cloud, AWS, Azure, on-premises, or back on the mainframe — by design." },
      { title: "OpenShift everywhere",   body: "Red Hat OpenShift as the common runtime for Cloud Pak for Data and watsonx workloads." },
      { title: "Mainframe, modernized",  body: "z/OS Connect, IBM Data Replication, and watsonx.data federation — no big-bang migration required." },
      { title: "Governed by default",    body: "One control plane for identity, networking, and data movement across every environment." },
    ],
    industries: [
      { id: "healthcare",       proof: "Hybrid Db2 and OpenShift platforms for major U.S. health systems." },
      { id: "energy-utilities", proof: "Mainframe-to-cloud data flows for regulated utilities and ISOs." },
      { id: "public-sector",    proof: "FedRAMP-aligned hybrid architectures for federal agencies and defense technology." },
    ],
    approach: COMMON_APPROACH,
  },
};
