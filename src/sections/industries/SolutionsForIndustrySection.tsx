import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@sections/home/_components/FlipCard";

/**
 * Static, typographic motif per practice — visually rhymes with the home
 * SolutionsGridSection FlipCards (same component grammar) but skips the r3f
 * canvases. Keeps industry pages light and avoids duplicating the home page's
 * signature 3D moment.
 */
const StaticMotif = ({ initials }: { initials: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Soft cyan wash */}
    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    {/* Hairline grid */}
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-primary/10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`grid-${initials}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${initials})`} />
    </svg>
    {/* Oversized typographic mark */}
    <span
      aria-hidden="true"
      className="absolute -right-2 -bottom-6 text-[7rem] md:text-[9rem] font-bold leading-none tracking-tighter text-primary/[0.07] select-none"
    >
      {initials}
    </span>
  </div>
);

const initialsFor = (name: string) =>
  name
    .split(/[\s&/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

interface Props {
  industry: Industry;
}

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

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {rows.map(({ sol, proof }, i) => {
            const CAP = 6;
            const all = sol.products.map((p) => ({
              label: p.name,
              to:
                p.link.kind === "internal"
                  ? `/solutions/${sol.id}/${p.link.slug}`
                  : p.link.url,
              external: p.link.kind === "external",
            }));
            const chips =
              all.length <= CAP
                ? all
                : [
                    ...all.slice(0, CAP),
                    { label: `+${all.length - CAP} more`, to: `/solutions/${sol.id}` },
                  ];

            return (
              <Reveal key={sol.id} delay={i * 50}>
                <FlipCard
                  to={`/solutions/${sol.id}`}
                  eyebrow={sol.name}
                  title={sol.outcome}
                  footer={industry.name}
                  backTitle={sol.outcome}
                  backBody={proof}
                  chips={chips}
                  ctaLabel={sol.ctaLabel}
                  motif={<StaticMotif initials={initialsFor(sol.name)} />}
                />
              </Reveal>
            );
          })}
        </div>

        {/* Fading accent strip */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-primary via-secondary to-transparent opacity-30" />
      </div>
    </section>
  );
};

export default SolutionsForIndustrySection;
