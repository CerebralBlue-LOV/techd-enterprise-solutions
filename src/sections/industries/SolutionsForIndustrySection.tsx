import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import { SOLUTIONS } from "@content/solutions";

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

  return (
    <section id="solutions" className="section scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Solutions in this industry" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Solutions in this industry"
            title={`Where TechD's practices have shipped in ${industry.name}`}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {rows.map(({ sol, proof }, i) => (
            <Reveal key={sol.id} delay={i * 60}>
              <Link
                to={`/solutions/${sol.id}`}
                className="card-hover group block h-full rounded-xl p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow mb-2">Practice</p>
                    <h3 className="text-lg font-bold text-secondary leading-tight">{sol.name}</h3>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                  {proof}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsForIndustrySection;
