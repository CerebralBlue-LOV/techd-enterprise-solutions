import PageApproachSection from "@shared/page/PageApproachSection";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";

interface Props {
  practice: Solution;
}

export const ApproachSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  if (!extras?.approach?.length) return null;

  return (
    <PageApproachSection
      pageLabel={`Solutions / ${practice.name}`}
      title="A delivery model built for enterprises that can't afford a stalled program"
      steps={extras.approach}
    />
  );
};

export default ApproachSection;
