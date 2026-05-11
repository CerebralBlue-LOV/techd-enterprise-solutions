import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import { type Industry } from "@content/industries";

interface Props {
  industry: Industry;
}

export const IndustryCtaSection = ({ industry }: Props) => (
  <PageFinalCtaSection
    pageLabel={`Industries / ${industry.name}`}
    eyebrow={industry.name}
    title={`Talk to a team that's shipped in ${industry.name}.`}
    lede="Tell us where you are — we'll bring senior IBM-certified architects who know your regulatory posture to the first call."
  />
);

export default IndustryCtaSection;
