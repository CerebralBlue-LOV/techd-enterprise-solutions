export type Service = {
  id: string;
  name: string;
  promise: string;
  description: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    id: "advisory",
    name: "Advisory",
    promise: "Strategy that survives the boardroom.",
    description:
      "Executive-grade roadmaps for AI, data, security, and cloud — built around your P&L, not a vendor's catalog.",
    deliverables: ["AI readiness assessments", "Architecture reviews", "Investment cases"],
  },
  {
    id: "implementation",
    name: "Implementation",
    promise: "From PowerPoint to production.",
    description:
      "Engineering teams that ship. Reference architectures, accelerators, and senior practitioners on every engagement.",
    deliverables: ["Greenfield builds", "Migrations and replatforming", "Integration delivery"],
  },
  {
    id: "managed",
    name: "Managed Services",
    promise: "Run with predictable economics.",
    description:
      "24×7 operations for AI, data, and security platforms. SLAs that map to business KPIs, not ticket counts.",
    deliverables: ["Platform operations", "Security operations", "FinOps and optimization"],
  },
  {
    id: "training",
    name: "Training",
    promise: "Lift the whole organization, not just the lab.",
    description:
      "Role-based enablement for executives, architects, and engineering teams — IBM-certified curricula and hands-on labs.",
    deliverables: ["Executive briefings", "Architect bootcamps", "Hands-on engineering labs"],
  },
];
