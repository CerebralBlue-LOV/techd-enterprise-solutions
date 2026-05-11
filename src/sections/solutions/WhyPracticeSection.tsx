import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <section id="why" className="section scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why this practice" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why this practice"
            title={`What you get with TechD's ${practice.name} practice`}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {extras.whyPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="group h-full overflow-hidden rounded-xl border border-primary/15 bg-background shadow-[0_4px_18px_-10px_hsl(var(--primary)/0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_14px_32px_-14px_hsl(var(--primary)/0.4)]">
                <div className="bg-primary/10 px-5 py-4 border-b border-primary/15">
                  <h3 className="text-base font-bold text-primary leading-tight">
                    {p.title}
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
