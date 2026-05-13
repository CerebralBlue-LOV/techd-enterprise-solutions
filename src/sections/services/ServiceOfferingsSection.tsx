import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

const parseDuration = (d: string): [string, string] => {
  if (/ongoing/i.test(d))    return ["∞",   "RETAINER"];
  if (/annual/i.test(d))     return ["12",  "MONTHS"];
  if (/quarterly/i.test(d))  return ["90",  "DAYS"];
  if (/project/i.test(d))    return ["→",   "PROJECT"];
  if (/half.+full/i.test(d)) return ["01",  "DAY"];
  const idx = d.indexOf(" ");
  if (idx === -1) return [d, ""];
  const num = d.slice(0, idx);
  const unit = d.slice(idx + 1).toUpperCase();
  return [/^\d$/.test(num) ? `0${num}` : num, unit];
};


export const ServiceOfferingsSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.engagements?.length) return null;
  const count = extras.engagements.length;

  return (
    <section id="offerings" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Services / ${service.name}`} name="Offerings" />
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Engagements"
              title="What you can buy"
              subtitle="Named, scoped offerings — each with a defined output and a start date."
            />
            <span className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground tabular-nums">
              {count} engagement{count !== 1 ? "s" : ""}
            </span>
          </div>
        </Reveal>

        <div className="mt-14">
          {extras.engagements.map((e, i) => (
              <Reveal key={e.name} delay={i * 100}>
                <div
                  className={`group grid grid-cols-1 gap-y-3 py-8 md:grid-cols-[5rem_5fr_6fr] md:items-start md:gap-x-10 md:gap-y-0 ${
                    i < count - 1 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Duration — number big, unit stacked below */}
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-3xl md:text-4xl font-bold tabular-nums leading-none select-none text-primary/25 transition-colors duration-300 group-hover:text-primary/70">
                      {parseDuration(e.duration)[0]}
                    </span>
                    <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50 transition-colors duration-300 group-hover:text-primary/50">
                      {parseDuration(e.duration)[1]}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl md:text-2xl font-bold leading-tight text-secondary transition-colors duration-200 group-hover:text-primary">
                    {e.name}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm md:text-[15px] font-light text-muted-foreground leading-relaxed">
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
