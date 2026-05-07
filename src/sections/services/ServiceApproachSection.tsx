import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceApproachSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.approach?.length) return null;

  return (
    <section id="approach" className="section scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Approach" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title="A delivery model built for enterprises that can't afford a stalled program"
          />
        </Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {extras.approach.map((step, i) => (
            <Reveal key={step.step} delay={i * 60}>
              <li className="rounded-xl border border-border p-6 h-full">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-bold text-secondary">{step.step}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {step.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ServiceApproachSection;
