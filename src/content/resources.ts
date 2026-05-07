export type Resource = {
  id: string;
  slug: string;
  type: "case-studies" | "blog" | "webinars" | "events";
  title: string;
  summary: string;
  /** Display date string, e.g. "2025" or "May 2026". */
  date: string;
  /** Industry or vertical label shown as an eyebrow on cards and detail pages. */
  industry?: string;
  /** Byline for blog posts. */
  author?: string;
  /** Body paragraphs rendered on the detail page. */
  body?: string[];
  /** Link to the original external source (e.g. IBM case study page). */
  externalUrl?: string;
  /** When true, the entry is hidden from list pages and detail pages return 404. */
  draft?: boolean;
};

export const RESOURCES: Resource[] = [
  // ─── Case Studies ────────────────────────────────────────────────────────────

  {
    id: "cs-1",
    slug: "retail-ai-platform-watsonx-neuroseek",
    type: "case-studies",
    title: "US retailer rebuilds its customer platform on Db2, watsonx Assistant, and NeuralSeek",
    summary:
      "Personalized product descriptions via RAG, call-center efficiency, and real-time shopper analytics — co-delivered with IBM and Cerebral Blue.",
    date: "2025",
    industry: "Retail",
    externalUrl:
      "https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai",
    body: [
      "A prominent US family-owned retail enterprise was running a fragmented data environment that made personalized customer experiences and real-time analytics impossible to deliver at scale. Their product catalog spanned thousands of SKUs with inconsistent descriptions, and contact center teams spent significant time searching for accurate product information without a reliable way to surface it quickly.",
      "TechD, IBM, and Cerebral Blue co-delivered an AI data platform built on IBM Db2, watsonx Assistant, and NeuralSeek. The platform applies retrieval-augmented generation to the retailer's existing product knowledge base — generating accurate, personalized product descriptions at scale and enabling contact center staff to surface precise answers grounded in verified catalog content. A real-time analytics layer built on Db2 gives the business clear visibility into shopper behavior across channels.",
      "This engagement is an IBM-published reference and represents TechD's current production AI reference architecture. It demonstrates the practical playbook for data-intensive enterprises that need generative AI outputs to be accurate, sourced, and explainable — without sacrificing the speed that real business use cases require.",
    ],
  },

  {
    id: "cs-2",
    slug: "insurance-claims-modernization",
    type: "case-studies",
    title: "Tier-1 carrier modernizes claims at scale",
    summary:
      "A modular claims platform replaced a 30-year-old mainframe path — without a single missed cycle.",
    date: "2025",
    industry: "Insurance",
    draft: true,
  },

  {
    id: "cs-3",
    slug: "university-research-cloud",
    type: "case-studies",
    title: "R1 university stands up secure research cloud",
    summary:
      "Identity, governance, and FinOps for grant-funded research workloads across three campuses.",
    date: "2025",
    industry: "Higher Education",
    draft: true,
  },

  // ─── Blog ────────────────────────────────────────────────────────────────────

  {
    id: "bl-1",
    slug: "agentic-ai-operating-model",
    type: "blog",
    title: "Agentic AI is an operating model, not a feature",
    summary: "Why the org chart matters more than the model size.",
    date: "May 2026",
    draft: true,
  },

  {
    id: "bl-2",
    slug: "watsonx-enterprise-governance",
    type: "blog",
    title: "What watsonx gets right that the hyperscalers miss",
    summary: "Governance, lineage, and the boring parts that make AI auditable.",
    date: "April 2026",
    draft: true,
  },

  {
    id: "bl-3",
    slug: "zero-trust-regulated-enterprises",
    type: "blog",
    title: "Zero-trust without slowing the business",
    summary: "A pragmatic sequence for regulated enterprises.",
    date: "March 2026",
    draft: true,
  },

  // ─── Webinars ─────────────────────────────────────────────────────────────────

  {
    id: "wb-1",
    slug: "ai-agents-that-pass-an-audit",
    type: "webinars",
    title: "Building AI agents that pass an audit",
    summary: "60-minute walkthrough with TechD and IBM principal engineers.",
    date: "On-demand",
    draft: true,
  },

  {
    id: "wb-2",
    slug: "data-lake-to-data-product",
    type: "webinars",
    title: "From data lake to data product",
    summary: "How to ship governed datasets the business will actually use.",
    date: "On-demand",
    draft: true,
  },

  // ─── Events ──────────────────────────────────────────────────────────────────

  {
    id: "ev-1",
    slug: "ibm-think-2026",
    type: "events",
    title: "IBM Think 2026 — TechD lounge",
    summary: "Meet our principals at the Partner Pavilion.",
    date: "May 2026",
    industry: "Boston",
    draft: true,
  },

  {
    id: "ev-2",
    slug: "enterprise-ai-roundtable-nyc",
    type: "events",
    title: "Enterprise AI roundtable, NYC",
    summary: "Closed-door session for CIOs and CDAOs.",
    date: "June 2026",
    industry: "New York",
    draft: true,
  },
];
