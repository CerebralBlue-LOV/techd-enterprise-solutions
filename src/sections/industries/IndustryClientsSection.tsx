import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

export const IndustryClientsSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.clients?.length) return null;

  return (
    <section id="clients" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Clients" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Clients we serve"
            title="Named in the work, not the slides"
            subtitle="Active or recent engagements. We don't list a logo we haven't earned."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {extras.clients.map((c, i) => (
            <Reveal key={c.name} delay={i * 50}>
              <div className="rounded-xl border border-border p-6 h-full bg-background">
                <h3 className="text-base font-bold text-secondary leading-tight">{c.name}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {c.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryClientsSection;
