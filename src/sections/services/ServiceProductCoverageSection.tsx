import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Product Coverage
 *
 * 4-row grid (AI & Generative · Data & Analytics · Automation & FinOps ·
 * Security & Compliance) listing the IBM products covered for this service.
 * The single biggest content gap on the legacy services pages — gives a
 * procurement-stage architect a quick scope reference without paragraphs.
 */
export const ServiceProductCoverageSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const coverage = extras?.productCoverage;
  if (!coverage?.rows?.length) return null;

  return (
    <section id="coverage" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Product Coverage" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="IBM platform coverage"
            title={`${coverage.verb} — across the four practice areas`}
            subtitle="Confirmed IBM 2026 nomenclature. Legacy product names (Watson Studio, BigInsights, Streams, Cloud Pak for Data System appliance) are not in our portfolio."
          />
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-background">
          <ul className="divide-y divide-border">
            {coverage.rows.map((row, i) => (
              <Reveal key={row.practice} delay={i * 60}>
                <li className="grid gap-4 p-6 md:grid-cols-12 md:gap-6 md:p-7">
                  <div className="md:col-span-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                      Practice
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-secondary leading-tight">
                      {row.practice}
                    </h3>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">
                      {coverage.verb}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {row.products.map((p) => (
                        <li
                          key={p}
                          className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-secondary"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceProductCoverageSection;
