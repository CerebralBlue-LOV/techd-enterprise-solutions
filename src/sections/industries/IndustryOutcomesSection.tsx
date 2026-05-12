import HoverGridBackdrop from "@shared/HoverGridBackdrop";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

export const IndustryOutcomesSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.stats?.length) return null;

  return (
    <section id="outcomes" className="section bg-secondary scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Outcomes" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <Reveal>
            <p className="eyebrow mb-3">The proof, in one paragraph</p>
            <p className="text-2xl md:text-3xl leading-[1.25] text-white font-light">
              {industry.outcome}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {extras.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/20 bg-white/[0.08] p-6 transition-all duration-300 hover:border-primary hover:bg-white/[0.14] hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.4)]"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary leading-none">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm font-light text-white/55 leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default IndustryOutcomesSection;
