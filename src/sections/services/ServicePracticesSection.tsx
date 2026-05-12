import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@sections/home/_components/FlipCard";

const StaticMotif = ({ initials }: { initials: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
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

export const ServicePracticesSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.solutions?.length) return null;

  const rows = extras.solutions
    .map((p) => {
      const sol = SOLUTIONS.find((s) => s.id === p.id);
      return sol ? { sol, proof: p.proof } : null;
    })
    .filter((x): x is { sol: (typeof SOLUTIONS)[number]; proof: string } => Boolean(x));
  if (!rows.length) return null;

  return (
    <section id="practices" className="section scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Practices" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Solution practices"
            title="Applies across our entire practice portfolio"
            subtitle="Every engagement is staffed by practitioners from the relevant practice — not generalists."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ sol, proof }, i) => {
            const CAP = 2;
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
                  footer={service.name}
                  backTitle={sol.outcome}
                  backBody={proof}
                  chips={chips}
                  ctaLabel={sol.ctaLabel}
                  motif={<StaticMotif initials={initialsFor(sol.name)} />}
                  compact
                />
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-primary via-secondary to-transparent opacity-30" />
      </div>
    </section>
  );
};

export default ServicePracticesSection;
