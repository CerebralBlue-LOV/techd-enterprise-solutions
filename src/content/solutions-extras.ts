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
  whyTitle: string;
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

export const PRACTICE_EXTRAS: Record<string, PracticeExtras> = {
  "ai-generative": {
    whyTitle: "Governed AI built on watsonx — grounded in your data, ready for production",
    whyPoints: [
      { title: "Grounded, not guessing", body: "RAG architectures sourced from your governed data — not the open web. Outputs cite the documents they came from." },
      { title: "Built on watsonx",       body: "IBM Granite, Llama, Mistral, and your own fine-tuned models behind a single enterprise control plane." },
      { title: "Governed from day one",  body: "Lineage, drift detection, and auditable prompts via IBM Knowledge Catalog and watsonx.governance." },
      { title: "Production, not pilots", body: "Patterns we've shipped into healthcare, media, insurance, and public sector — not lab demos." },
    ],
    industries: [
      { id: "healthcare",          proof: "Clinical knowledge agents and HIPAA-grade data platforms for major U.S. health systems. Retrieval grounded in your EHR, ontologies, and clinical guidelines — every answer traceable to the source document." },
      { id: "financial-services",           proof: "Underwriting copilots and claims acceleration for property and specialty carriers. Models grounded in your policy language, loss history, and submission documents — outputs that hold up to actuarial and compliance review." },
      { id: "public-sector",       proof: "Auditable AI for federal agencies and defense technology organizations. FedRAMP-aligned deployments with end-to-end lineage, prompt governance, and air-gapped options where the mission requires them." },
      { id: "media-entertainment", proof: "Content intelligence and operational AI for studios, networks, and streamers. Metadata enrichment, rights-aware semantic search, and production workflow agents built on watsonx." },
    ],
    approach: APPROACH_AI,
    stats: [
      { value: "watsonx",     label: "IBM platform of record" },
      { value: "Platinum",    label: "IBM Business Partner" },
    ],
  },

  "data-analytics": {
    whyTitle: "Fifteen years deep on IBM data — Db2, Cognos, and the lakehouse under one roof",
    whyPoints: [
      { title: "Open lakehouse",        body: "watsonx.data on Iceberg/Parquet with Presto and Spark — no proprietary lock-in." },
      { title: "15+ years of Cognos",   body: "One of the deepest Cognos Analytics and Planning Analytics practices in the IBM partner ecosystem." },
      { title: "Db2 to dashboard",      body: "End-to-end ownership: Db2, DataStage pipelines, lakehouse, BI, and planning under one roof." },
      { title: "AI-ready by design",    body: "Cataloged, lineage-traced datasets that watsonx.ai can train on without a remediation project." },
    ],
    industries: [
      { id: "healthcare",          proof: "Clinical and operational dashboards for major U.S. health systems. Trusted data pipelines from Epic, Cerner, and claims systems into Db2 and Cognos — the same numbers from the bedside to the board." },
      { id: "higher-education",    proof: "Student, research, and finance analytics for top-tier universities. Cognos and Planning Analytics models that connect enrollment, advancement, and grant accounting into a single source of truth." },
      { id: "media-entertainment", proof: "Audience analytics and content performance for studios and streamers. Lakehouse pipelines that join viewership, ad telemetry, and rights data — ready for both BI and the next watsonx use case." },
      { id: "financial-services",           proof: "Actuarial analytics and regulatory reporting for property and specialty carriers. Db2, DataStage, and Cognos pipelines built for the audit trail, the rate filing, and the planning cycle." },
    ],
    approach: APPROACH_DATA,
    stats: [
      { value: "15+ yrs",  label: "Cognos & TM1 in production" },
      { value: "Platinum", label: "IBM Business Partner" },
    ],
  },

  "automation-finops": {
    whyTitle: "Full-stack observability and IT financial management, owned as one practice",
    whyPoints: [
      { title: "See the whole stack",   body: "Instana for full-stack observability — application, runtime, infrastructure, and the network in between." },
      { title: "Right-size the spend",  body: "Apptio for IT financial management and Turbonomic for workload-level cost optimization." },
      { title: "Eliminate manual toil", body: "Automated remediation playbooks tied to the alerts that actually matter." },
      { title: "FinOps that scales",    body: "Cost allocation models that survive a re-org, a cloud migration, or an M&A." },
    ],
    industries: [
      { id: "financial-services",         proof: "Claims platform observability and IT cost transparency for specialty carriers. Instana traces every transaction end-to-end; Apptio gives the CFO the cost-per-policy view the business has been asking for." },
      { id: "energy-utilities",  proof: "Grid-system observability and OT/IT cost management for regulated utilities. Instana watches the SCADA-adjacent stack; Turbonomic and Apptio align infrastructure spend with rate-case discipline." },
      { id: "public-sector",     proof: "Federal-grade observability and FinOps for agencies and defense technology. Mission-critical workloads instrumented, governed, and cost-allocated against your appropriation structure." },
    ],
    approach: APPROACH_AUTOMATION,
  },

  "security-compliance": {
    whyTitle: "Compliance-grade security from practitioners who've passed the audits you're facing",
    whyPoints: [
      { title: "Pass the audit",        body: "Guardium delivers the data activity monitoring, access controls, and pre-built compliance reports your auditors ask for by name." },
      { title: "Detect, then respond",  body: "QRadar correlates events across your entire estate; Resilient runs the structured playbook when an incident triggers." },
      { title: "Built for regulated",   body: "HIPAA, FedRAMP, PCI-DSS, NERC-CIP, NAIC — compliance frameworks we've implemented in production, not slides from a vendor briefing." },
      { title: "Senior practitioners",  body: "IBM-certified architects who have stood up security programs at health systems, insurers, and federal agencies — not generalists learning on your dime." },
    ],
    industries: [
      { id: "healthcare",       proof: "HIPAA-grade data protection and audit readiness for major U.S. health systems. Guardium policies tuned to PHI workloads; QRadar use cases mapped to the HIPAA Security Rule controls auditors actually test." },
      { id: "public-sector",    proof: "FedRAMP-aligned security architectures for federal agencies and defense technology. Layered controls, continuous monitoring, and response playbooks that pass authorization and survive ATO renewal." },
      { id: "financial-services",        proof: "NAIC and SOX compliance tooling for property and specialty carriers. Guardium and QRadar built around the data flows examiners follow — claims, policy admin, and financial close." },
      { id: "energy-utilities", proof: "NERC-CIP and OT/IT security for regulated utilities and ISOs. Asset-level monitoring at the IT/OT boundary, with response playbooks that recognize the operational risk of a wrong move." },
    ],
    approach: APPROACH_SECURITY,
  },

};
