import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

export const PracticeCtaSection = ({ practice }: Props) => (
  <PageFinalCtaSection
    pageLabel={`Solutions / ${practice.name}`}
    eyebrow={practice.name}
    secondary={{ label: "View our clients", to: "/company/customers" }}
  />
);

export default PracticeCtaSection;
