import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const OutcomesSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];

  return (
    <section className="section">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Outcomes" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <Reveal>
            <p className="eyebrow mb-3">The pitch, in one paragraph</p>
            <p className="text-2xl md:text-3xl leading-[1.25] text-secondary font-light">
              {practice.pitch}
            </p>
          </Reveal>
          {extras?.stats?.length ? (
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-5">
                {extras.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-border p-6">
                    <p className="text-3xl md:text-4xl font-bold text-primary leading-none">
                      {s.value}
                    </p>
                    <p className="mt-2 text-sm font-light text-muted-foreground leading-snug">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
