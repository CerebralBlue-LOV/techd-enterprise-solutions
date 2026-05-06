import Layout from "@layout/Layout";
import FlipCard from "@/sections/flip-lab/FlipCard";
import PlexusMotif from "@/sections/flip-lab/PlexusMotif";
import plexusBrain from "@/assets/flip-lab/plexus-brain.svg";
import plexusDatabase from "@/assets/flip-lab/plexus-database.svg";
import plexusGears from "@/assets/flip-lab/plexus-gears.svg";
import plexusShield from "@/assets/flip-lab/plexus-shield.svg";
import plexusCloud from "@/assets/flip-lab/plexus-cloud.svg";

const cards = [
  {
    eyebrow: "AI & Generative",
    title: "Ship trustworthy gen AI on governed enterprise data.",
    footer: "United States",
    backTitle: "Production-grade AI",
    backBody:
      "Watsonx, RAG pipelines, evaluation harnesses, and policy guardrails. We put generative AI in front of customers and employees safely — grounded in your governed data, observable in production, and defensible to legal, risk, and compliance.",
    chips: ["Watsonx", "RAG", "Guardrails", "Evals", "LLMOps"],
    ctaLabel: "Explore AI",
    motif: <PlexusMotif image={plexusBrain} alt="Plexus brain" />,
  },
  {
    eyebrow: "Data & Analytics",
    title: "Make your data AI-ready, governed, and defensible.",
    footer: "United States",
    backTitle: "Data foundations",
    backBody:
      "Db2, lakehouse architectures, lineage, and governance. We modernize data estates so analytics and AI stand up to audit, scale across business units, and deliver answers your executives actually trust.",
    chips: ["Db2", "Lakehouse", "Lineage", "Governance", "Quality"],
    ctaLabel: "Explore Data",
    motif: <PlexusMotif image={plexusDatabase} alt="Plexus database" />,
  },
  {
    eyebrow: "Automation & FinOps",
    title: "Observe, optimize, and eliminate manual toil.",
    footer: "Global",
    backTitle: "Run smarter",
    backBody:
      "Apptio, Turbonomic, and Instana deployed end-to-end. See every workload and dollar, cut cloud waste, automate change, and free engineers from the repetitive work that drains your roadmap.",
    chips: ["Apptio", "Turbonomic", "Instana", "FinOps", "AIOps"],
    ctaLabel: "Explore Automation",
    motif: <PlexusMotif image={plexusGears} alt="Plexus gears" />,
  },
  {
    eyebrow: "Security & Compliance",
    title: "Pass audits, protect data, respond to breaches.",
    footer: "Regulated industries",
    backTitle: "Defense in depth",
    backBody:
      "Guardium, QRadar, identity, and zero-trust patterns hardened on real Fortune 500 environments. We help regulated organizations protect crown-jewel data, satisfy auditors, and respond to incidents with confidence.",
    chips: ["Guardium", "QRadar", "Zero Trust", "IAM", "SOC"],
    ctaLabel: "Explore Security",
    motif: <PlexusMotif image={plexusShield} alt="Plexus shield" />,
  },
  {
    eyebrow: "Hybrid Cloud",
    title: "Run mission workloads where they belong.",
    footer: "United States",
    backTitle: "Anywhere, governed",
    backBody:
      "OpenShift, Power, and IBM Cloud delivered as one architecture. Modern infrastructure that respects existing investments, gives platform teams control, and lets product teams ship without waiting on tickets.",
    chips: ["OpenShift", "Power", "IBM Cloud", "Kubernetes", "Edge"],
    ctaLabel: "Explore Cloud",
    motif: <PlexusMotif image={plexusCloud} alt="Plexus cloud" />,
  },
];

const FlipLab = () => (
  <Layout>
    <section className="container py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Internal · Flip-card lab
      </p>
      <h1 className="mt-3 text-4xl font-bold text-secondary">
        Solution cards — SVG plexus
      </h1>
      <p className="mt-3 max-w-2xl text-base font-light text-muted-foreground">
        Vector versions of the original plexus motifs, traced from the webps.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <FlipCard key={c.eyebrow} {...c} />
        ))}
      </div>
    </section>
  </Layout>
);

export default FlipLab;
