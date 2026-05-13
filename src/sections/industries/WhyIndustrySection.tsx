import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import HoverGridBackdrop from "@shared/HoverGridBackdrop";
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
        <div className="space-y-4">
          {/* Featured solid-secondary hero card with soft primary orb */}
          <Reveal>
            <article
              className="group relative overflow-hidden rounded-2xl bg-secondary p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_hsl(var(--secondary)/0.45)]"
            >
              <HoverGridBackdrop variant="dark" topRim={false} spotlightRadius={400} />

              {/* Soft primary orb — bottom-right corner, clipped by overflow-hidden */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl transition-opacity duration-700 opacity-70 group-hover:opacity-90"
              />

              <div className="relative z-10 max-w-3xl">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-background/70 mb-4">
                  Why TechD · {industry.name}
                </p>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-background">
                  {featured.title}
                </h3>
                <p className="mt-4 md:mt-5 text-base md:text-lg font-light leading-relaxed text-background/90 max-w-2xl">
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
                  <article className="group relative h-full overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-[0_12px_32px_-16px_hsl(var(--secondary)/0.25)]">
                    {/* Top hairline reveal on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    {/* Static secondary top accent (resting state) */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-secondary/50 transition-all duration-300 group-hover:bg-secondary"
                    />
                    <h4 className="text-secondary text-xs md:text-sm font-bold uppercase tracking-widest mt-2 mb-3 md:mb-4 transition-colors">
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

export default WhyIndustrySection;
