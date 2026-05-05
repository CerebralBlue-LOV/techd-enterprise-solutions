import { ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import ParticleOrbit from "./_shared/ParticleOrbit";

/** Differentiator cards — edit copy here when messaging changes. */
const DIFFERENTIATORS = [
  {
    icon: Sparkles,
    title: "Senior people on the keyboard",
    body: "Principals deliver, not just sell. Our technical team averages 10+ years of certified IBM delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Built for regulators",
    body: "Auditable AI, governed data, and defensible architecture across HIPAA, FedRAMP, and PCI environments.",
  },
  {
    icon: Workflow,
    title: "Outcome-aligned engagements",
    body: "We commit to business outcomes — not staff augmentation hours.",
  },
  {
    icon: Sparkles,
    title: "IBM-deep, multi-cloud fluent",
    body: "watsonx, Db2, OpenShift, and Z — plus AWS, Azure, and GCP at enterprise scale.",
  },
];

/**
 * Section: Home / Why TechD
 * Purpose: Build trust through a centered hero composition — a particle orbit
 *          ring framing a glassmorphic IBM Platinum Business Partner credential
 *          card, followed by a 2x2 grid of differentiator cards.
 * Order:   6 of 7 on the Home page.
 * Notes:   Background uses bg-muted/40 to break visual rhythm before the final
 *          CTA. The ParticleOrbit decoration is brand-cyan and respects
 *          prefers-reduced-motion. Do not restyle the IBM badge without brand
 *          sign-off.
 */
export const WhyTechDSection = () => (
  <section className="section bg-muted/40">
    <SectionMarker page="Home" name="Why TechD" />
    <div className="container-page">
      {/* Section heading — centered above the orbit hero. */}
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Why TechD"
          title="A different kind of partner."
        />
      </Reveal>

      {/* Centered orbit hero — ParticleOrbit fills the square; IBM glass badge sits in its center. */}
      <Reveal delay={80}>
        <div className="relative mx-auto mt-12 flex aspect-square w-full max-w-[420px] items-center justify-center md:mt-16 md:max-w-[520px]">
          <ParticleOrbit />

          {/* Glassmorphic IBM Platinum Business Partner credential card */}
          <div className="relative z-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-background/60 px-8 py-7 text-center shadow-2xl shadow-primary/10 backdrop-blur-xl md:px-10 md:py-8">
            <div className="grid h-16 w-16 place-items-center rounded-lg bg-secondary text-2xl font-bold text-background">
              IBM
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Platinum
              </div>
              <div className="mt-1 text-xl font-bold text-secondary">
                Business Partner
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                15+ years · Platinum since 2009
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Differentiator grid — 2x2 on sm+, single column on mobile. */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-20">
        {DIFFERENTIATORS.map((d, i) => (
          <Reveal key={d.title} delay={i * 50}>
            <div className="card-hover h-full rounded-xl p-6">
              <d.icon className="text-primary" />
              <h3 className="mt-4 text-lg">{d.title}</h3>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                {d.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyTechDSection;
