export type Resource = {
  id: string;
  type: "case-studies" | "blog" | "webinars" | "events";
  title: string;
  summary: string;
  meta: string;
};

export const RESOURCES: Resource[] = [
  { id: "cs-1", type: "case-studies", title: "US retailer rebuilds online shopping on Db2, watsonx Assistant, and NeuralSeek", summary: "Personalized product descriptions via RAG, call-center efficiency gains, and real-time shopper behavior insight — co-delivered with IBM and Cerebral Blue.", meta: "Retail · IBM Published" },
  { id: "cs-2", type: "case-studies", title: "Tier-1 carrier modernizes claims at scale", summary: "A modular claims platform replaced a 30-year-old mainframe path — without a single missed cycle.", meta: "Insurance · 5 min read" },
  { id: "cs-3", type: "case-studies", title: "R1 university stands up secure research cloud", summary: "Identity, governance, and FinOps for grant-funded research workloads across three campuses.", meta: "Higher Ed · 4 min read" },

  { id: "bl-1", type: "blog", title: "Agentic AI is an operating model, not a feature", summary: "Why the org chart matters more than the model size.", meta: "May 2026" },
  { id: "bl-2", type: "blog", title: "What watsonx gets right that the hyperscalers miss", summary: "Governance, lineage, and the boring parts that make AI auditable.", meta: "April 2026" },
  { id: "bl-3", type: "blog", title: "Zero-trust without slowing the business", summary: "A pragmatic sequence for regulated enterprises.", meta: "March 2026" },

  { id: "wb-1", type: "webinars", title: "Building AI agents that pass an audit", summary: "60-minute walkthrough with TechD and IBM principal engineers.", meta: "On-demand · (confirm recording exists before launch)" },
  { id: "wb-2", type: "webinars", title: "From data lake to data product", summary: "How to ship governed datasets the business will actually use.", meta: "On-demand · (confirm recording exists before launch)" },

  { id: "ev-1", type: "events", title: "IBM Think 2026 — TechD lounge", summary: "Meet our principals at the Partner Pavilion.", meta: "Boston · May 2026 · (confirm with TechD before launch)" },
  { id: "ev-2", type: "events", title: "Enterprise AI roundtable, NYC", summary: "Closed-door session for CIOs and CDAOs.", meta: "New York · June 2026 · (confirm with TechD before launch)" },
];
