import { CLIENTS as LAB_CLIENTS, toLogoClass } from "@sections/clients-lab/clients-lab-data";

export type ContactEntry = { value: string; status: "pending" | "live" };

export const CONTACT = {
  email: { value: "—", status: "pending" as "pending" | "live" },
  phone: { value: "—", status: "pending" as "pending" | "live" },
  address: {
    city: "Miami",
    state: "FL",
    lines: ["Headquarters"],
  },
  responseSla: "1 business day",
  ibmPartnerSince: 2009,
};

/**
 * Public Google Apps Script web app URL that receives contact form submissions.
 * Safe to commit: the script runs as the @techd.com owner and only appends to
 * a private Sheet + sends email to the configured recipient list.
 */
export const CONTACT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxZzWP0YBibJKvj7Q7zJ5879_cFc_AQ1mhnlPrMgpORp-IEBF0zKqlutkcDdzIMELWqcg/exec";

export type NavItem = {
  label: string;
  /** Optional href. Top-level dropdown labels omit href and act as menu triggers only. */
  href?: string;
  children?: { label: string; href: string; description?: string; latest?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Solutions",
    children: [
      { label: "AI & Generative Solutions",     href: "/solutions/ai-generative",       description: "NeuralSeek, watsonx.ai, watsonx, watsonx Orchestrate, IBM Bob, SPSS Modeler." },
      { label: "Data & Analytics",              href: "/solutions/data-analytics",      description: "Db2, watsonx.data, Cloud Pak for Data, Cognos Analytics, Planning Analytics, DataStage, Netezza." },
      { label: "Automation & FinOps",           href: "/solutions/automation-finops",   description: "IBM Apptio, Instana, Turbonomic, Concert." },
      { label: "Security & Compliance",         href: "/solutions/security-compliance", description: "Guardium, QRadar, Resilient — data protection and threat detection." },
      { label: "Infrastructure",                href: "/solutions/infrastructure",      description: "IBM Storage Fusion HCI — on-prem runtime for watsonx and Cloud Pak for Data." },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Financial Services & Insurance", href: "/industries/financial-services", description: "Core banking analytics, fraud and AML, underwriting copilots, claims acceleration, regulator-ready data platforms." },
      { label: "Healthcare & Life Sciences",  href: "/industries/healthcare",        description: "Clinical knowledge agents, HIPAA-grade data platforms, pharmacovigilance automation." },
      { label: "Manufacturing & Industrials", href: "/industries/manufacturing",      description: "Operational analytics, supply-chain intelligence, OT/IT security." },
      { label: "Higher Education & Research", href: "/industries/higher-education",   description: "Research computing, identity and SSO, student data platforms." },
      { label: "Media & Entertainment",       href: "/industries/media-entertainment", description: "Content intelligence, audience analytics, operational AI." },
      { label: "Energy & Utilities",          href: "/industries/energy-utilities",   description: "Grid analytics, asset performance management, OT/IT security." },
      { label: "Public Sector",               href: "/industries/public-sector",      description: "Auditable AI systems, FedRAMP-aligned cloud, records modernization." },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Advisory",         href: "/services/advisory",         description: "Strategy, roadmaps, and AI readiness assessments." },
      { label: "Implementation",   href: "/services/implementation",   description: "Engineering delivery — greenfield builds, migrations, and integrations." },
      { label: "Managed Services", href: "/services/managed-services", description: "24×7 platform and security operations, FinOps." },
      { label: "Training",         href: "/services/training",         description: "Role-based IBM enablement for executives, architects, and engineers." },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Case Studies", href: "/resources/case-studies", description: "Client stories from named enterprise engagements.", latest: "2025" },
      { label: "Blog",         href: "/resources/blog",         description: "Insights on AI, data governance, and enterprise architecture." },
      // Webinars and Events exist as routes but are hidden from nav until content is confirmed ready.
    ],
  },
  {
    label: "Company",
    href: "/company/about",
    children: [
      { label: "About",                href: "/company/about",                 description: "Our story, four-practice coverage, and leadership." },
      { label: "IBM Partnership",      href: "/company/ibm-partnership",       description: "Gold tier under IBM Partner Plus — 21 products across four practices." },
      { label: "Delivery Methodology", href: "/company/delivery-methodology",  description: "Five engagement stages, IBM Platform Assessment, and compliance posture." },
      { label: "Contact",              href: "/contact",                       description: "Talk to a senior practitioner — no SDR queue." },
    ],
  },
];

/**
 * Client = the public shape consumed by the home `LogoStrip` and the
 * industry "Clients we serve" carousel. The list is derived from
 * `src/sections/clients-lab/clients-lab-data.ts` — the sandbox at
 * `/clients-lab` is the editing surface. Do not hand-edit this list.
 */
export type Client = {
  name: string;
  url: string;
  logo?: string;
  logoOnDark?: string;
  logoClass?: string;
};

export const CLIENTS: Client[] = LAB_CLIENTS.map((c) => ({
  name: c.name,
  url: c.url,
  logo: c.currentLogo ?? c.logo,
  logoOnDark: c.currentLogoDark,
  logoClass: toLogoClass(c.defaultHeight),
}));
