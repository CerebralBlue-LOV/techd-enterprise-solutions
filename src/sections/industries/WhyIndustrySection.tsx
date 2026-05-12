import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

/**
 * Industries-specific "Why TechD" — distinct from the Solutions/Services bento.
 * Featured cyan-gradient hero card (matches SectionLab "Cyan-gradient hero card")
 * + 3 supporting hairline tiles + fading accent strip. Brand tokens only
 * (the deep-cyan `hsl(195 100% 38%)` stop matches the existing hero variant).
 */
export const WhyIndustrySection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  const points = extras?.whyPoints ?? [];
  if (!points.length) return null;

  const [featured, ...rest] = points;
  const supporting = rest.slice(0, 3);

  return (
    <section
      id="why"
      className="py-14 md:py-20 scroll-mt-24 border-t border-border bg-background"
    >
      <SectionMarker page={`Industries / ${industry.name}`} name="Why TechD" />
      <div className="container-page">
        {/* Section header — quiet, typography-led */}
        <Reveal>
          <div className="mb-10">
            <h2 className="text-secondary text-xs font-bold tracking-[0.4em] uppercase">
              Why TechD
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-primary" />
          </div>
        </Reveal>

        <div className="space-y-4">
          {/* Featured cyan-gradient hero card */}
          <Reveal>
            <article
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-[hsl(195_100%_38%)] p-8 md:p-12 lg:p-16 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.55)]"
            >
              {/* Ambient radial highlights */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 80% at 80% 20%, hsl(var(--background) / 0.30) 0%, transparent 60%), radial-gradient(40% 60% at 20% 100%, hsl(var(--secondary) / 0.40) 0%, transparent 70%)",
                }}
              />
              {/* Slow-shimmer slash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-72 bg-background/5 skew-x-[-20deg] translate-x-32 transition-transform duration-700 ease-out group-hover:translate-x-20"
              />

              <div className="relative z-10 max-w-3xl">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-background/70 mb-5">
                  {industry.name}
                </p>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-background">
                  {featured.title}
                </h3>
                <p className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-background/90 max-w-2xl">
                  {featured.body}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Supporting tiles */}
          {supporting.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supporting.map((p, i) => (
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

        {/* Fading accent strip */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-primary via-secondary to-transparent opacity-30" />
      </div>
    </section>
  );
};

export default WhyIndustrySection;
