import PageApproachSection from "@shared/page/PageApproachSection";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Methodology
 *
 * Per-service methodology block: AI Operating Model framing for Advisory,
 * 4-phase delivery for Implementation, onboarding + agentic for Managed,
 * delivery formats for Training. Renders via the shared PageApproachSection
 * styling so the visual treatment matches the rest of the site.
 */
export const ServiceMethodologySection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  const methodology = extras?.methodology;
  if (!methodology?.items?.length) return null;

  return (
    <PageApproachSection
      id="methodology"
      markerName="Methodology"
      pageLabel={`Services / ${service.name}`}
      eyebrow={methodology.eyebrow}
      title={methodology.title}
      steps={methodology.items.map((i) => ({ step: i.name, detail: i.body }))}
    />
  );
};

export default ServiceMethodologySection;
