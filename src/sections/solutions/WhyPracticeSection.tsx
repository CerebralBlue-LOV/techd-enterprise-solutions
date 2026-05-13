import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import HoverGridBackdrop from "@shared/HoverGridBackdrop";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  const points = extras?.whyPoints ?? [];
  if (!extras?.whyTitle && !points.length) return null;

  return (
    <section
      id="why"
      className="py-14 md:py-20 scroll-mt-24 border-t border-border bg-background"
    >
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why this practice" />
      <div className="container-page">
        <div className="space-y-4">
          {/* Featured primary gradient hero card */}
          <Reveal>
            <article
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-[hsl(195_100%_38%)] p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.55)]"
            >
              <HoverGridBackdrop variant="primary" background={false} topRim={false} spotlightRadius={400} />

              {/* Ambient radial highlights */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 80% at 80% 20%, hsl(var(--background) / 0.30) 0%, transparent 60%), radial-gradient(40% 60% at 20% 100%, hsl(var(--secondary) / 0.40) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 max-w-3xl">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-background/70 mb-4">
                  Why TechD · {practice.name}
                </p>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-background">
                  {extras.whyTitle}
                </h3>
              </div>
            </article>
          </Reveal>

          {/* Supporting tiles — 2×2 grid */}
          {points.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.35)]">
                    {/* Top hairline reveal on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    {/* Static cyan top accent (resting state) */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-primary/70 transition-all duration-300 group-hover:bg-primary"
                    />
                    <h4 className="text-primary text-xs md:text-sm font-bold uppercase tracking-widest mt-2 mb-3 md:mb-4 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-secondary font-light text-sm md:text-base leading-relaxed">
                      {p.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
