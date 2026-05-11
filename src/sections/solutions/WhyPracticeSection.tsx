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
              <div className="group flex h-full flex-col rounded-2xl bg-primary px-1 pt-2 pb-1 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_hsl(var(--primary)/0.6)]">
                <h3 className="px-3 pb-2 text-base font-bold leading-tight text-background">
                  {p.title}
                </h3>
                <div className="flex-1 rounded-xl bg-background p-5 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
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
