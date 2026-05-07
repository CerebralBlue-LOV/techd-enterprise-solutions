import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";
import { SOLUTIONS } from "@content/solutions";

interface Props {
  service: Service;
}

export const ServicePracticesSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.solutions?.length) return null;

  return (
    <section id="practices" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Practices" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Solution practices"
            title="Applies across our entire practice portfolio"
            subtitle="Every engagement is staffed by practitioners from the relevant practice — not generalists."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {extras.solutions.map((sol, i) => {
            const practice = SOLUTIONS.find((s) => s.id === sol.id);
            if (!practice) return null;
            return (
              <Reveal key={sol.id} delay={i * 50}>
                <Link
                  to={`/solutions/${sol.id}`}
                  className="group block h-full"
                >
                  <div className="card-hover h-full rounded-xl p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-secondary leading-tight">
                        {practice.name}
                      </h3>
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                      {sol.proof}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicePracticesSection;
