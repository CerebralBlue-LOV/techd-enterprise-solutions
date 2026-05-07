import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";
import { INDUSTRIES } from "@content/industries";

interface Props {
  practice: Solution;
}

export const IndustriesServedSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.industries?.length) return null;

  const rows = extras.industries
    .map((i) => {
      const ind = INDUSTRIES.find((x) => x.id === i.id);
      return ind ? { ind, proof: i.proof } : null;
    })
    .filter((x): x is { ind: (typeof INDUSTRIES)[number]; proof: string } => Boolean(x));

  return (
    <section className="section">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Industries served" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Industries we serve"
            title="Where this practice has shipped"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {rows.map(({ ind, proof }, i) => (
            <Reveal key={ind.id} delay={i * 60}>
              <Link
                to={`/industries/${ind.id}`}
                className="card-hover group block h-full rounded-xl p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow mb-2">{ind.regulation}</p>
                    <h3 className="text-lg font-bold text-secondary leading-tight">{ind.name}</h3>
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

export default IndustriesServedSection;
