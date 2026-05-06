import Layout from "@layout/Layout";
import { Sparkles, Database, Workflow, ShieldCheck, Cloud } from "lucide-react";
import FlipCard from "@/sections/flip-lab/FlipCard";
import AiMotif from "@/sections/flip-lab/motifs/AiMotif";
import DataMotif from "@/sections/flip-lab/motifs/DataMotif";
import AutomationMotif from "@/sections/flip-lab/motifs/AutomationMotif";
import SecurityMotif from "@/sections/flip-lab/motifs/SecurityMotif";
import CloudMotif from "@/sections/flip-lab/motifs/CloudMotif";

/**
 * /flip-lab — internal sandbox for the next-generation solution card.
 * Tests flip-on-hover with per-practice animated SVG motifs on the back.
 */
const cards = [
  {
    eyebrow: "AI & Generative",
    title: "Ship trustworthy gen AI on governed enterprise data.",
    meta: "Practice 01",
    footer: "United States",
    icon: <Sparkles size={22} strokeWidth={1.75} />,
    backTitle: "Production-grade AI",
    backBody:
      "Watsonx, RAG, evaluation, guardrails — everything needed to put gen AI in front of customers safely.",
    ctaLabel: "Explore AI",
    motif: <AiMotif />,
  },
  {
    eyebrow: "Data & Analytics",
    title: "Make your data AI-ready, governed, and defensible.",
    meta: "Practice 02",
    footer: "United States",
    icon: <Database size={22} strokeWidth={1.75} />,
    backTitle: "Data foundations",
    backBody:
      "Db2, lakehouse, lineage, and governance so your analytics — and your AI — stand up to scrutiny.",
    ctaLabel: "Explore Data",
    motif: <DataMotif />,
  },
  {
    eyebrow: "Automation & FinOps",
    title: "Observe, optimize, and eliminate manual toil.",
    meta: "Practice 03",
    footer: "Global",
    icon: <Workflow size={22} strokeWidth={1.75} />,
    backTitle: "Run smarter",
    backBody:
      "Apptio, Turbonomic, Instana — see every workload, cut waste, and automate the boring parts.",
    ctaLabel: "Explore Automation",
    motif: <AutomationMotif />,
  },
  {
    eyebrow: "Security & Compliance",
    title: "Pass audits, protect data, respond to breaches.",
    meta: "Practice 04",
    footer: "Regulated industries",
    icon: <ShieldCheck size={22} strokeWidth={1.75} />,
    backTitle: "Defense in depth",
    backBody:
      "Guardium, QRadar, identity, and zero-trust patterns hardened on real Fortune 500 environments.",
    ctaLabel: "Explore Security",
    motif: <SecurityMotif />,
  },
  {
    eyebrow: "Hybrid Cloud",
    title: "Run mission workloads where they belong.",
    meta: "Practice 05",
    footer: "United States",
    icon: <Cloud size={22} strokeWidth={1.75} />,
    backTitle: "Anywhere, governed",
    backBody:
      "OpenShift, Power, and IBM Cloud — modern infrastructure that respects your existing investments.",
    ctaLabel: "Explore Cloud",
    motif: <CloudMotif />,
  },
];

const FlipLab = () => (
  <Layout>
    <section className="container py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Internal · Flip-card lab
      </p>
      <h1 className="mt-3 text-4xl font-bold text-secondary">
        Solution cards — flip prototype
      </h1>
      <p className="mt-3 max-w-2xl text-base font-light text-muted-foreground">
        Hover any card to flip and reveal a per-practice animated motif. Brand
        palette only — primary cyan, secondary, muted, border.
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
