import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import { SOLUTIONS } from "@content/solutions";

interface Props {
  industry: Industry;
}

/**
 * "Solutions in this industry" — mirrors WhyIndustrySection's 1+3 rhythm but
 * inverts the treatment: featured tile is a calm light/outline card, supporting
 * tiles get the cyan hairline + hover lift. Visually rhymes without competing
 * with the cyan hero above.
 */
export const SolutionsForIndustrySection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.practices?.length) return null;

  const rows = extras.practices
    .map((p) => {
      const sol = SOLUTIONS.find((s) => s.id === p.id);
      return sol ? { sol, proof: p.proof } : null;
    })
    .filter((x): x is { sol: (typeof SOLUTIONS)[number]; proof: string } => Boolean(x));
  if (!rows.length) return null;

  const [featured, ...rest] = rows;
  const supporting = rest.slice(0, 3);

  return (
    <section id="solutions" className="section scroll-mt-24">
      <SectionMarker
        page={`Industries / ${industry.name}`}
        name="Solutions in this industry"
      />
      <div className="container-page">
        {/* Header — quiet, hairline rule, same grammar as WhyIndustry */}
        <Reveal>
          <div className="mb-10">
            <h2 className="text-secondary text-xs font-bold tracking-[0.4em] uppercase">
              Solutions · {industry.name}
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-primary" />
          </div>
        </Reveal>

        <div className="space-y-4">
          {/* Featured practice — light/outline */}
          <Reveal>
            <Link
              to={`/solutions/${featured.sol.id}`}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-background p-6 md:p-8 lg:p-10 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.35)]"
            >
              {/* Cyan rule reveal */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <div className="relative z-10 max-w-3xl">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                  Featured practice
                </p>
                <div className="flex items-start justify-between gap-6">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-tight text-secondary">
                    {featured.sol.name}
                  </h3>
                  <ArrowRight className="mt-2 size-6 md:size-7 shrink-0 text-primary opacity-0 -translate-x-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <p className="mt-4 md:mt-5 text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  {featured.proof}
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Supporting tiles */}
          {supporting.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supporting.map(({ sol, proof }, i) => (
                <Reveal key={sol.id} delay={i * 80}>
                  <Link
                    to={`/solutions/${sol.id}`}
                    className="group relative block h-full overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_hsl(var(--primary)/0.35)]"
                  >
                    {/* Static cyan top accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-primary/70 transition-colors duration-300 group-hover:bg-primary"
                    />
                    <div className="flex items-start justify-between gap-3 mt-2">
                      <h4 className="text-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-3 md:mb-4">
                        {sol.name}
                      </h4>
                      <ArrowRight className="size-4 shrink-0 text-primary opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <p className="text-secondary font-light text-sm md:text-base leading-relaxed">
                      {proof}
                    </p>
                  </Link>
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

export default SolutionsForIndustrySection;
