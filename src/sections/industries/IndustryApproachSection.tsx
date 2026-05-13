import PageApproachSection from "@shared/page/PageApproachSection";
import { type Industry } from "@content/industries";

const STEPS = [
  { step: "Discover", detail: "Workshop with your stakeholders to map use cases, regulated data, and success metrics." },
  { step: "Architect", detail: "Reference architecture grounded in IBM products you already own — minus the rip-and-replace." },
  { step: "Deliver",   detail: "Senior IBM-certified engineers build and integrate, paired with your team for handoff." },
  { step: "Operate",   detail: "Production support, optimization, and roadmap reviews from the same people who built it." },
];

interface Props {
  industry: Industry;
}

export const IndustryApproachSection = ({ industry }: Props) => (
  <PageApproachSection
    pageLabel={`Industries / ${industry.name}`}
    title="Four phases. One team. No handoffs."
    subtitle="Senior IBM-certified engineers take your program from discovery through production support — the same people who build it stay on to run it."
    steps={STEPS}
  />
);

export default IndustryApproachSection;
