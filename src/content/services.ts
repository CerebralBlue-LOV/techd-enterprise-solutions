export type Service = {
  id: string;
  name: string;
  /** H1 on the service hero (overridden by ServiceExtras.headline on the page) */
  promise: string;
  /** Subhead — overridden by ServiceExtras.lede on the page */
  description: string;
  /** 3 short phrases for nav/card contexts */
  highlights: [string, string, string];
};

export const SERVICES: Service[] = [
  {
    id: "advisory",
    name: "Advisory",
    promise: "Strategy that survives the boardroom.",
    description:
      "Executive-grade roadmaps for AI, data, security, and cloud — built around your P&L, not a vendor's catalog.",
    highlights: ["AI readiness assessments", "Architecture reviews", "Investment cases"],
  },
  {
    id: "implementation",
    name: "Implementation",
    promise: "From PowerPoint to production.",
    description:
      "Engineering teams that ship. Reference architectures, accelerators, and senior IBM-certified practitioners on every engagement.",
    highlights: ["Greenfield platform builds", "Migrations & replatforming", "Integration delivery"],
  },
  {
    id: "managed",
    name: "Managed Services",
    promise: "Run with predictable economics.",
    description:
      "24×7 operations for AI, data, and security platforms. SLAs that map to business KPIs, not ticket counts.",
    highlights: ["Platform operations", "Security operations", "FinOps & optimization"],
  },
  {
    id: "training",
    name: "Training",
    promise: "Lift the whole organization, not just the lab.",
    description:
      "Role-based enablement for executives, architects, and engineering teams — IBM-certified curricula and hands-on labs.",
    highlights: ["Executive briefings", "Architect bootcamps", "Hands-on engineering labs"],
  },
];
