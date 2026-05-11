import PageApproachSection from "@shared/page/PageApproachSection";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceApproachSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.approach?.length) return null;

  return (
    <PageApproachSection
      pageLabel={`Services / ${service.name}`}
      eyebrow="How we work"
      title="A delivery model built for enterprises that can't afford a stalled program"
      steps={extras.approach}
    />
  );
};

export default ServiceApproachSection;
