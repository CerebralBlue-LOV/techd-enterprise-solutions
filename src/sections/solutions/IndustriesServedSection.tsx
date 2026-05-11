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

  const items = extras.industries
    .map((i) => {
      const ind = INDUSTRIES.find((x) => x.id === i.id);
      return ind ? { ind, proof: i.proof } : null;
    })
    .filter((x): x is { ind: (typeof INDUSTRIES)[number]; proof: string } => Boolean(x));

  return (
    <section id="industries" className="section scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Industries served" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Industries we serve"
            title="Where this practice has shipped"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(({ ind, proof }, i) => (
            <Reveal key={ind.id} delay={i * 80}>
              <Link
                to={`/industries/${ind.id}`}
                className="group relative flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-border bg-background p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_40px_-20px_hsl(var(--primary)/0.35)]"
              >
                <div>
                  <p className="eyebrow">{ind.regulation}</p>
                  <h3 className="mt-3 text-2xl md:text-3xl font-bold text-secondary leading-tight">
                    {ind.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-light text-muted-foreground leading-relaxed">
                    {proof}
                  </p>
                </div>
                <span className="mt-8 flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                  View industry <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesServedSection;
