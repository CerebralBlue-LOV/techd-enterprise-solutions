import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import SectionBackdrop from "@shared/SectionBackdrop";
import PracticeBadge from "@shared/PracticeBadge";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Product Coverage.
 *
 * 4-row grid (AI & Generative · Data & Analytics · Automation & FinOps ·
 * Security & Compliance) listing the IBM products covered for this service.
 * Sits on an engineered-grid backdrop so the densest block carries weight.
 * Each row has a left rail with an oversized 2-letter ghost initial, a
 * count badge, and product chips.
 */
export const ServiceProductCoverageSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const coverage = extras?.productCoverage;
  if (!coverage?.rows?.length) return null;

  return (
    <section id="coverage" className="relative section overflow-hidden scroll-mt-24 bg-background">
      <SectionBackdrop intensity="soft" vignettes />
      <SectionMarker page={`Services / ${service.name}`} name="Product Coverage" />
      <div className="relative container-page">
        <Reveal>
          <SectionHeading
            eyebrow="IBM platform coverage"
            title={`${coverage.verb} — across the four practice areas`}
            subtitle="Confirmed IBM 2026 nomenclature. Legacy product names (Watson Studio, BigInsights, Streams, Cloud Pak for Data System appliance) are not in our portfolio."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-sm">
            {/* Typography column header */}
            <div className="hidden md:grid md:grid-cols-12 gap-6 border-b border-border bg-muted/40 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              <div className="md:col-span-3">Practice</div>
              <div className="md:col-span-9">{coverage.verb}</div>
            </div>

            <ul className="divide-y divide-border">
              {coverage.rows.map((row, i) => (
                <Reveal key={row.practice} delay={i * 60}>
                  <li className="group relative grid gap-5 p-6 md:grid-cols-12 md:gap-6 md:p-7">
                    {/* Practice rail */}
                    <div className="relative md:col-span-3 overflow-hidden">
                      <PracticeBadge
                        practice={row.practice}
                        className="pointer-events-none absolute -bottom-6 -left-2 text-[7rem] md:text-[8rem]"
                      />
                      <div className="relative">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                          Practice
                        </p>
                        <h3 className="text-lg md:text-xl font-bold text-secondary leading-tight">
                          {row.practice}
                        </h3>
                        <p className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                          <span className="font-bold text-secondary">{row.products.length}</span>
                          <span>{row.products.length === 1 ? "platform" : "platforms"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Product chips */}
                    <div className="md:col-span-9">
                      <ul className="flex flex-wrap gap-2">
                        {row.products.map((p) => (
                          <li
                            key={p}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-secondary transition-colors duration-200 hover:border-primary/40 hover:text-primary"
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
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceProductCoverageSection;
