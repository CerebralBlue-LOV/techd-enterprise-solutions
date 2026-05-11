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
                <li className="group relative h-full flex flex-col rounded-2xl border border-border bg-background p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.4)]">
                  {/* Ghost numeral — large, parallaxes in on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-4 -right-2 text-[7rem] leading-none font-bold text-primary/[0.06] tracking-tighter select-none transition-all duration-700 ease-out group-hover:text-primary/[0.12] group-hover:-translate-y-1 group-hover:scale-105"
                  >
                    {num}
                  </span>

                  {/* Hover sheen — diagonal cyan wash that sweeps across */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-br from-transparent via-primary/[0.04] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                  />

                  {/* Top row: step number + animated connector line */}
                  <div className="relative flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                      Step
                    </span>
                    <span aria-hidden className="relative h-px flex-1 bg-border overflow-hidden">
                      <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-[width] duration-700 ease-out group-hover:w-full" />
                    </span>
                  </div>

                  <h3 className="relative mt-5 text-xl md:text-2xl font-bold text-secondary leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-0.5">
                    {step.step}
                  </h3>

                  <p className="relative mt-3 text-sm font-light text-muted-foreground leading-relaxed">
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
