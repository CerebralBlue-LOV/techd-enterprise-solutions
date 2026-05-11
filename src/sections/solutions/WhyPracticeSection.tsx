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
        <div className="mt-16 grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {extras.whyPoints.map((p, i) => {
            const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
            const rotate = rotations[i % rotations.length];
            return (
              <Reveal key={p.title} delay={i * 60}>
                <div
                  className={`group relative h-full transform-gpu ${rotate} transition-transform duration-500 ease-out hover:rotate-0 hover:-translate-y-1 motion-reduce:rotate-0 motion-reduce:transform-none`}
                >
                  <div className="h-full overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.25)] transition-shadow duration-500 group-hover:shadow-[0_20px_45px_-15px_hsl(var(--primary)/0.35)]">
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
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
