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
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {extras.approach.map((step, i) => (
            <Reveal key={step.step} delay={i * 60}>
              <li className="group relative min-h-[260px] flex items-center justify-center rounded-xl overflow-hidden cursor-default bg-background border border-border transition-shadow duration-[600ms] hover:shadow-[0_20px_40px_-12px_hsl(var(--primary)/0.5)]">
                {/* Front: step number + title */}
                <div className="flex flex-col items-center justify-center p-6 text-center transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover:[transform:scale(0)_rotate(-45deg)]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/70">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-secondary leading-tight">{step.step}</h3>
                </div>

                {/* Back: white panel rotates in on hover */}
                <div className="absolute top-1/2 left-1/2 w-full h-full p-6 flex flex-col justify-center bg-background opacity-0 [transform:translate(-50%,-50%)_rotate(-45deg)] transition-all duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none group-hover:opacity-100 group-hover:[transform:translate(-50%,-50%)_rotate(0deg)]">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-secondary">{step.step}</h3>
                  <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ApproachSection;
