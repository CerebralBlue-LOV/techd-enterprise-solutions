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

const APPROACH_AI: ApproachStep[] = [
  { step: "Discover", detail: "Map your highest-value AI use cases to the governed data sources that can ground them — workshop with business owners and data stewards together." },
  { step: "Architect", detail: "RAG pipeline, vector store selection, and foundation model alignment scoped to your compliance tier and latency requirements." },
  { step: "Deliver",   detail: "Production deployment on watsonx.ai — prompt governance, observability instrumentation, and a handoff your team can operate without us in the room." },
  { step: "Operate",   detail: "Model drift monitoring, prompt library updates, and quarterly capability reviews as the watsonx platform and your use cases evolve." },
];

const APPROACH_DATA: ApproachStep[] = [
  { step: "Discover", detail: "Audit your data landscape — source inventory, quality gaps, and the Cognos, TM1, or BI workloads that depend on them." },
  { step: "Architect", detail: "Lakehouse or warehouse design that connects your Db2 environments, DataStage pipelines, and the analytics surfaces your teams use today." },
  { step: "Deliver",   detail: "IBM-certified engineers build, migrate, and tune — working alongside your data team so nothing is a black box at handoff." },
  { step: "Operate",   detail: "Production support, Cognos and TM1 administration, and optimization through every budget cycle and planning season." },
];

const APPROACH_AUTOMATION: ApproachStep[] = [
  { step: "Discover", detail: "Map your observability blind spots and IT cost allocation gaps — from application performance to cloud invoice line items." },
  { step: "Architect", detail: "Instrument the stack with Instana, align cost models with Apptio's TBM taxonomy, and define Turbonomic action policies before anything is automated." },
  { step: "Deliver",   detail: "Configured, integrated, and tuned — alerts connected to your ITSM, cost models in your CFO's dashboard, autonomous actions governed by your policy." },
  { step: "Operate",   detail: "Continuous tuning, new-service onboarding, and FinOps review cycles tied to your cloud billing cadence and organizational changes." },
];

const APPROACH_SECURITY: ApproachStep[] = [
  { step: "Discover", detail: "Map your compliance obligations — HIPAA, PCI-DSS, FedRAMP, NERC-CIP — against your current data protection and threat detection controls." },
  { step: "Architect", detail: "Layered control design: Guardium for data activity monitoring, QRadar for event correlation, Resilient for the response playbooks that run at 2 a.m." },
  { step: "Deliver",   detail: "IBM-certified deployment with use-case rule development, integration testing, and compliance report validation before go-live." },
  { step: "Operate",   detail: "Ongoing rule tuning, threat intelligence updates, and incident response support — keeping pace with your evolving regulatory and threat environment." },
];

const APPROACH_HYBRID: ApproachStep[] = [
  { step: "Discover", detail: "Inventory workloads by compliance tier, infrastructure dependency, and cloud-readiness — across on-premises, mainframe, and existing cloud environments." },
  { step: "Architect", detail: "Hybrid topology design — OpenShift as the common runtime, IBM Cloud or multi-cloud for regulated services, mainframe data integration without disruption." },
  { step: "Deliver",   detail: "Cluster build, storage configuration, workload migration, and a Day 2 operations model your platform team can own." },
  { step: "Operate",   detail: "Cluster health monitoring, capacity planning, and platform engineering support across your full hybrid estate." },
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
    approach: APPROACH_AI,
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
    approach: APPROACH_DATA,
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
    approach: APPROACH_AUTOMATION,
  },

  "security-compliance": {
    whyPoints: [
      { title: "Pass the audit",        body: "Guardium delivers the data activity monitoring, access controls, and pre-built compliance reports your auditors ask for by name." },
      { title: "Detect, then respond",  body: "QRadar correlates events across your entire estate; Resilient runs the structured playbook when an incident triggers." },
      { title: "Built for regulated",   body: "HIPAA, FedRAMP, PCI-DSS, NERC-CIP, NAIC — compliance frameworks we've implemented in production, not slides from a vendor briefing." },
      { title: "Senior practitioners",  body: "IBM-certified architects who have stood up security programs at health systems, insurers, and federal agencies — not generalists learning on your dime." },
    ],
    industries: [
      { id: "healthcare",       proof: "HIPAA-grade data protection and audit readiness for major U.S. health systems." },
      { id: "public-sector",    proof: "FedRAMP-aligned security architectures for federal agencies and defense technology." },
      { id: "insurance",        proof: "NAIC and SOX compliance tooling for property and specialty carriers." },
      { id: "energy-utilities", proof: "NERC-CIP and OT/IT security for regulated utilities and ISOs." },
    ],
    approach: APPROACH_SECURITY,
  },

  "hybrid-cloud": {
    whyPoints: [
      { title: "Run it anywhere",        body: "Workloads on IBM Cloud, AWS, Azure, on-premises, or back on the mainframe — by design, not by accident." },
      { title: "OpenShift everywhere",   body: "Red Hat OpenShift as the common runtime for Cloud Pak for Data and watsonx — the same operating model on every cloud." },
      { title: "Mainframe, modernized",  body: "z/OS Connect and IBM Data Replication expose mainframe data as APIs and real-time feeds — no big-bang migration required." },
      { title: "Zero-downtime moves",    body: "IBM Data Replication (IIDR) keeps the source system live while the target is built, validated, and cut over — no planned outage." },
    ],
    industries: [
      { id: "healthcare",       proof: "Hybrid Db2 and OpenShift platforms for major U.S. health systems." },
      { id: "energy-utilities", proof: "Mainframe-to-cloud data flows for regulated utilities and ISOs." },
      { id: "public-sector",    proof: "FedRAMP-aligned hybrid architectures for federal agencies and defense technology." },
    ],
    approach: APPROACH_HYBRID,
  },
};
