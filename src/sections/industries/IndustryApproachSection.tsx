import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Industry } from "@content/industries";

const STEPS = [
  { step: "Discover", detail: "Workshop with your stakeholders to map use cases, regulated data, and success metrics." },
  { step: "Architect", detail: "Reference architecture grounded in IBM products you already own — minus the rip-and-replace." },
  { step: "Deliver",   detail: "Senior IBM-certified engineers build and integrate, paired with your team for handoff." },
  { step: "Operate",   detail: "Production support, optimization, and roadmap reviews from the same people who built it." },
];

interface Props {
  industry: Industry;
}

export const IndustryApproachSection = ({ industry }: Props) => (
  <section id="approach" className="section bg-muted/30 scroll-mt-24">
    <SectionMarker page={`Industries / ${industry.name}`} name="Approach" />
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="How we engage"
          title="A delivery model built for regulated enterprises that can't afford a stalled program"
        />
      </Reveal>
      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.step} delay={i * 60}>
            <li className="rounded-xl border border-border p-6 h-full bg-background">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-bold text-secondary">{s.step}</h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {s.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default IndustryApproachSection;
