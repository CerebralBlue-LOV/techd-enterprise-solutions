import { ShieldCheck, Sparkles, Workflow } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";

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
 * Purpose: Build trust by stacking the IBM Platinum credential alongside four
 *          differentiator cards (people, regulators, outcomes, multi-cloud).
 * Order:   6 of 7 on the Home page.
 * Notes:   Background uses bg-muted/40 to break visual rhythm before the final
 *          CTA. Keep the IBM credential card prominent on the left column.
 */
export const WhyTechDSection = () => (
  <section className="section bg-muted/40">
    <SectionMarker page="Home" name="Why TechD" />
    <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] items-start">
      {/* Credential card — IBM Platinum badge. Do not restyle without brand sign-off. */}
      <Reveal>
        <SectionHeading eyebrow="Why TechD" title="A different kind of partner." />
        <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-border bg-background px-5 py-4">
          <div className="h-12 w-12 rounded-md bg-secondary text-background grid place-items-center font-bold">
            IBM
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold uppercase tracking-wider text-primary">
              Platinum
            </div>
            <div className="text-base font-bold text-secondary">
              Business Partner
            </div>
            <div className="text-xs text-muted-foreground">
              15+ years · Platinum since 2009
            </div>
          </div>
        </div>
      </Reveal>

      {/* Differentiator grid — 2x2 on sm+, single column on mobile. */}
      <div className="grid gap-6 sm:grid-cols-2">
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
