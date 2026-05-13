import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@sections/home/_components/FlipCard";

const PRACTICE_TO_ID: Record<string, string> = {
  "AI & Generative":       "ai-generative",
  "Data & Analytics":      "data-analytics",
  "Automation & FinOps":   "automation-finops",
  "Security & Compliance": "security-compliance",
};

const StaticMotif = ({ initials }: { initials: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-primary/10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`svc-grid-${initials}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#svc-grid-${initials})`} />
    </svg>
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
  service: Service;
}

export const ServiceProductCoverageSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const coverage = extras?.productCoverage;
  if (!coverage?.rows?.length) return null;

  const cards = coverage.rows.flatMap((row) => {
    const sol = SOLUTIONS.find((s) => s.id === PRACTICE_TO_ID[row.practice]);
    return sol ? [{ sol, row }] : [];
  });

  if (!cards.length) return null;

  return (
    <section id="coverage" className="section scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Product Coverage" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="IBM platform coverage"
            title={`${coverage.verb} — across the four practice areas`}
            subtitle="Confirmed IBM 2026 nomenclature. Legacy product names are not in our portfolio."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ sol, row }, i) => (
            <Reveal key={sol.id} delay={i * 50}>
              <FlipCard
                to={`/solutions/${sol.id}`}
                eyebrow={sol.name}
                title={sol.outcome}
                footer={`${row.products.length} platforms`}
                backTitle={coverage.verb}
                backBody={row.products.join(" · ")}
                chips={[]}
                ctaLabel={sol.ctaLabel}
                motif={<StaticMotif initials={initialsFor(sol.name)} />}
                compact
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProductCoverageSection;
