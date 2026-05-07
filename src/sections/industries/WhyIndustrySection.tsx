import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

export const WhyIndustrySection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <section id="why" className="section scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Why TechD" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why TechD"
            title={`What you get with TechD in ${industry.name}`}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {extras.whyPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="card-hover h-full rounded-xl p-6">
                <h3 className="text-base font-bold text-secondary leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyIndustrySection;
