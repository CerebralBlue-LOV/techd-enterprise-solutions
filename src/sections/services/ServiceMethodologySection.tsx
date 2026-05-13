import PageApproachSection from "@shared/page/PageApproachSection";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

/**
 * Section: Services / Methodology — DARK centerpiece.
 *
 * Renders the per-service methodology (AI Operating Model for Advisory,
 * 4-phase delivery for Implementation, onboarding+agentic for Managed,
 * delivery formats for Training) inside a full-bleed dark section so the
 * page has a centered dark beat between Offerings and Coverage.
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
      tone="dark"
      steps={methodology.items.map((i) => ({ step: i.name, detail: i.body }))}
    />
  );
};

export default ServiceMethodologySection;
