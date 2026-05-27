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

export type Customer = { name: string; url: string; logo?: string; logoOnDark?: string; logoClass?: string };

export const CUSTOMERS: Customer[] = [
  // Lead-in trio (per request)
  { name: "Admed", url: "https://www.admed.com.br", logo: "/images/partners/admed.svg", logoOnDark: "/images/partners/white/admed.png" },
  { name: "Great Day Improvements", url: "https://greatdayimprovements.com", logo: "/images/partners/greatday.png", logoOnDark: "/images/partners/white/greatday.png", logoClass: "h-8 md:h-9" },
  { name: "Clip", url: "https://www.clip.mx", logo: "/images/partners/clip.svg", logoOnDark: "/images/partners/white/clip.png", logoClass: "h-12 md:h-14" },

  // Tier 1 — global blue-chip enterprises (most recognizable F500 / global brands)
  { name: "Adobe", url: "https://www.adobe.com", logo: "/images/partners/adobe.svg", logoOnDark: "/images/partners/white/adobe.png", logoClass: "h-12 md:h-14" },
  { name: "Mercedes-Benz", url: "https://www.mercedes-benz.com", logo: "/images/partners/benz.svg", logoOnDark: "/images/partners/white/benz.png", logoClass: "h-14 md:h-16" },
  { name: "Verizon", url: "https://www.verizon.com", logo: "/images/partners/verizon.svg", logoOnDark: "/images/partners/white/verizon.png", logoClass: "h-8 md:h-9" },
  { name: "Snap Inc.", url: "https://www.snap.com", logo: "/images/partners/snap.webp", logoOnDark: "/images/partners/white/snap.png", logoClass: "h-12 md:h-14" },
  { name: "Santander", url: "https://www.santander.com", logo: "/images/partners/santander.svg", logoOnDark: "/images/partners/white/santander.png", logoClass: "h-8 md:h-9" },
  { name: "MetLife", url: "https://www.metlife.com", logo: "/images/partners/metlife.svg", logoOnDark: "/images/partners/white/metlife.png", logoClass: "h-7 md:h-8" },
  { name: "Mizuho", url: "https://www.mizuho-financial.com", logo: "/images/partners/mizuho.svg", logoOnDark: "/images/partners/white/mizuho.png", logoClass: "h-8 md:h-9" },
  { name: "NatWest", url: "https://www.natwest.com", logo: "/images/partners/natwest.svg", logoOnDark: "/images/partners/white/natwest.png", logoClass: "h-14 md:h-16" },
  { name: "Itaú", url: "https://www.itau.com.br", logo: "/images/partners/itau.svg", logoOnDark: "/images/partners/white/itau.png", logoClass: "h-14 md:h-16" },
  { name: "Dow", url: "https://www.dow.com", logo: "/images/partners/dow.webp", logoOnDark: "/images/partners/white/dow.png", logoClass: "h-16 md:h-20" },
  { name: "Fiserv", url: "https://www.fiserv.com", logo: "/images/partners/fiserv.svg", logoOnDark: "/images/partners/white/fiserv.png", logoClass: "h-8 md:h-9" },
  { name: "Seagate", url: "https://www.seagate.com", logo: "/images/partners/seagate.svg", logoOnDark: "/images/partners/white/seagate.png", logoClass: "h-10 md:h-12" },
  { name: "Wabtec", url: "https://www.wabteccorp.com", logo: "/images/partners/wabtec.webp", logoOnDark: "/images/partners/white/wabtec.png", logoClass: "h-12 md:h-14" },
  { name: "Itochu", url: "https://www.itochu.co.jp/en/", logo: "/images/partners/itochu.svg", logoOnDark: "/images/partners/white/itochu.png" },
  { name: "NSK", url: "https://www.nsk.com", logo: "/images/partners/nsk.svg", logoOnDark: "/images/partners/white/nsk.png", logoClass: "h-8 md:h-9" },

  // Tier 2 — top-tier universities and major institutions
  { name: "Harvard University", url: "https://www.harvard.edu", logo: "/images/partners/harvard.svg", logoOnDark: "/images/partners/white/harvard.png", logoClass: "h-14 md:h-16" },
  { name: "Penn State", url: "https://www.psu.edu", logo: "/images/partners/pennstate.svg", logoOnDark: "/images/partners/white/pennstate.png" },
  { name: "National University of Singapore", url: "https://www.nus.edu.sg", logo: "/images/partners/nus.svg", logoOnDark: "/images/partners/white/nus.png", logoClass: "h-10 md:h-12" },
  { name: "Stony Brook University", url: "https://www.stonybrook.edu", logo: "/images/partners/stonybrook.svg", logoOnDark: "/images/partners/white/stonybrook.png", logoClass: "h-8 md:h-9" },
  { name: "New York Institute of Technology", url: "https://www.nyit.edu", logo: "/images/partners/nyit.svg", logoOnDark: "/images/partners/white/nyit.png" },

  // Tier 3 — strong regional / sector leaders
  { name: "Banorte", url: "https://www.banorte.com", logo: "/images/partners/banorte.svg", logoOnDark: "/images/partners/white/banorte.png", logoClass: "h-6 md:h-7" },
  { name: "Vornado Realty Trust", url: "https://www.vno.com", logo: "/images/partners/vornado.png", logoOnDark: "/images/partners/white/vornado.png", logoClass: "h-8 md:h-9" },
  { name: "Sicoob", url: "https://www.sicoob.com.br", logo: "/images/partners/sicoob.svg", logoOnDark: "/images/partners/white/sicoob.png", logoClass: "h-6 md:h-7" },
  { name: "Dah Sing Bank", url: "https://www.dahsing.com", logo: "/images/partners/dahsing.svg", logoOnDark: "/images/partners/white/dahsing.png", logoClass: "h-8 md:h-9" },
  { name: "Banco del Pacífico", url: "https://www.bancodelpacifico.com", logo: "/images/partners/banco-del-pacifico.svg", logoOnDark: "/images/partners/white/banco-del-pacifico.png" },
  { name: "BROU", url: "https://www.brou.com.uy", logo: "/images/partners/brou.svg", logoOnDark: "/images/partners/white/brou.png", logoClass: "h-7 md:h-8" },
  { name: "TEPSCO", url: "https://www.tepsco.co.jp", logo: "/images/partners/tepsco.webp", logoOnDark: "/images/partners/white/tepsco.png", logoClass: "h-12 md:h-14" },
  { name: "Netcare", url: "https://www.netcare.co.za", logo: "/images/partners/netcare.webp", logoOnDark: "/images/partners/white/netcare.png", logoClass: "h-16 md:h-20" },
  { name: "Children's Health", url: "https://www.childrens.com", logo: "/images/partners/childrens-health.svg", logoOnDark: "/images/partners/white/childrens-health.png", logoClass: "h-8 md:h-9" },

  // TechD-true clients (Marc's list — appended; no dark variants yet)
  { name: "Hamilton Beach", url: "https://hamiltonbeach.com", logo: "/images/partners/hamilton-beach.png", logoClass: "h-10 md:h-12" },
  { name: "Concord Music", url: "https://concord.com", logo: "/images/partners/concord-music.png", logoClass: "h-16 md:h-20" },
  { name: "State of Delaware", url: "https://delaware.gov", logo: "/images/partners/state-of-delaware.png", logoClass: "h-14 md:h-16" },
  { name: "FIA Tech", url: "https://fia-tech.com", logo: "/images/partners/fia-tech.jpg", logoClass: "h-10 md:h-12" },
  { name: "L3Harris", url: "https://www.l3harris.com", logo: "/images/partners/l3harris.png", logoClass: "h-10 md:h-12" },
  { name: "MISO", url: "https://www.misoenergy.org", logo: "/images/partners/miso-energy.png", logoClass: "h-12 md:h-14" },
  { name: "Noresco", url: "https://www.noresco.com", logo: "/images/partners/noresco.png", logoClass: "h-9 md:h-10" },
  { name: "Sony Pictures", url: "https://www.sonypictures.com", logo: "/images/partners/sony-pictures.png", logoClass: "h-16 md:h-20" },
];
