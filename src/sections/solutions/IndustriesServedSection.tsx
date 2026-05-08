import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";
import { INDUSTRIES } from "@content/industries";
import PracticeIndustriesCarousel from "./_components/PracticeIndustriesCarousel";

interface Props {
  practice: Solution;
}

export const IndustriesServedSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.industries?.length) return null;

  const items = extras.industries
    .map((i) => {
      const ind = INDUSTRIES.find((x) => x.id === i.id);
      return ind ? { ind, proof: i.proof } : null;
    })
    .filter((x): x is { ind: (typeof INDUSTRIES)[number]; proof: string } => Boolean(x));

  return (
    <section id="industries" className="section scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Industries served" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Industries we serve"
            title="Where this practice has shipped"
          />
        </Reveal>
        <Reveal>
          <PracticeIndustriesCarousel items={items} />
        </Reveal>
      </div>
    </section>
  );
};

export default IndustriesServedSection;
