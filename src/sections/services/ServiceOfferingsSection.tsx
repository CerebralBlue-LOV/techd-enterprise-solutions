import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceOfferingsSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.engagements?.length) return null;

  return (
    <section id="offerings" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Offerings" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Engagements"
            title="What you can buy"
            subtitle="Named, scoped offerings — each with a defined output and a start date."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {extras.engagements.map((e, i) => (
            <Reveal key={e.name} delay={i * 50}>
              <div className="card-hover h-full rounded-xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-secondary leading-tight">{e.name}</h3>
                  <span className="shrink-0 rounded-full border border-primary/30 bg-primary/5 px-3 py-0.5 text-xs font-medium text-primary">
                    {e.duration}
                  </span>
                </div>
                <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
                  {e.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferingsSection;
