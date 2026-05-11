import PageWhySection from "@shared/page/PageWhySection";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <PageWhySection
      pageLabel={`Solutions / ${practice.name}`}
      title={`Why enterprises choose TechD for ${practice.name}`}
      points={extras.whyPoints}
      markerName="Why this practice"
    />
  );
};

export default WhyPracticeSection;
