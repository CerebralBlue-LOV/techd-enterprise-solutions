import PageWhySection from "@shared/page/PageWhySection";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

export const ServiceWhySection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  if (!extras?.whyPoints?.length) return null;

  return (
    <PageWhySection
      pageLabel={`Services / ${service.name}`}
      title={`What sets our ${service.name.toLowerCase()} practice apart`}
      points={extras.whyPoints}
    />
  );
};

export default ServiceWhySection;
