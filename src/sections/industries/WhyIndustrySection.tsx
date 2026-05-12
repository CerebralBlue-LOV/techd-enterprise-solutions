import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

/**
 * Industries-specific "Why TechD" — distinct from the Solutions/Services bento.
 * Layout: tiny eyebrow + cyan rule, one featured cyan card on top (first point),
 * then 3 supporting hairline cards below, closed by a fading cyan→grey strip.
 * Brand tokens only.
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
          {/* Featured cyan card */}
          <Reveal>
            <article className="relative overflow-hidden bg-primary p-8 md:p-12 lg:p-16 text-primary-foreground rounded-2xl shadow-sm">
              <div className="relative z-10 max-w-3xl">
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 mb-4">
                  {industry.name}
                </span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
                  {featured.title}
                </h3>
                <p className="mt-5 md:mt-6 text-base md:text-lg lg:text-xl font-light opacity-90 leading-relaxed">
                  {featured.body}
                </p>
              </div>
              {/* Subtle decorative slash */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-64 bg-background/5 skew-x-[-20deg] translate-x-32"
              />
            </article>
          </Reveal>

          {/* Supporting row */}
          {supporting.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supporting.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <article className="h-full border-t-2 border-primary bg-background p-6 md:p-8 transition-colors duration-300 hover:bg-muted/20 rounded-b-md">
                    <h4 className="text-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4">
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
