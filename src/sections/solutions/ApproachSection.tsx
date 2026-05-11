import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const ApproachSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.approach?.length) return null;

  return (
    <section id="approach" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Approach" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How we engage"
            title="A delivery model built for enterprises that can't afford a stalled program"
          />
        </Reveal>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {extras.approach.map((step, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={step.step} delay={i * 80}>
                <li className="group relative h-full flex flex-col rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.35)]">
                  {/* Top row: step number + accent line */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Step {num}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-border group-hover:bg-primary/40 transition-colors duration-500" />
                  </div>

                  <h3 className="mt-5 text-xl md:text-2xl font-bold text-secondary leading-tight tracking-tight">
                    {step.step}
                  </h3>

                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                    {step.detail}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ApproachSection;
