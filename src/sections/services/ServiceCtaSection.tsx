import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceCtaSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];

  return (
    <section className="section">
      <SectionMarker page={`Services / ${service.name}`} name="Final CTA" />
      <div className="container-page">
        <Reveal>
          <div className="rounded-2xl border border-border bg-background p-10 md:p-14 text-center">
            {extras?.stats?.length ? (
              <div className="flex flex-wrap justify-center gap-8 mb-10">
                {extras.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary leading-none">
                      {s.value}
                    </p>
                    <p className="mt-1.5 text-sm font-light text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <p className="eyebrow mb-3">Ready when you are</p>
            <h2 className="text-3xl md:text-4xl leading-[1.1] max-w-3xl mx-auto">
              {service.promise}
            </h2>
            <p className="mt-5 text-base md:text-lg font-light text-muted-foreground max-w-2xl mx-auto">
              Tell us what you're working on — we'll bring the right senior practitioners to the first call.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="btn-glow">
                <Link to="/contact">
                  Talk to an expert <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#offerings">Browse offerings</a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceCtaSection;
