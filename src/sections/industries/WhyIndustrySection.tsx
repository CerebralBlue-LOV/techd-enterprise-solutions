import PageWhySection from "@shared/page/PageWhySection";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

export const WhyIndustrySection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <PageWhySection
      pageLabel={`Industries / ${industry.name}`}
      title={`What you get with TechD in ${industry.name}`}
      points={extras.whyPoints}
    />
  );
};

export default WhyIndustrySection;
