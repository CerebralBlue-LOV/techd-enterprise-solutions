import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import { type Service } from "@content/services";

interface Props {
  service: Service;
}

export const ServiceCtaSection = ({ service }: Props) => (
  <PageFinalCtaSection
    pageLabel={`Services / ${service.name}`}
    eyebrow={service.name}
    title={service.promise}
    lede="Tell us what you're working on — we'll bring the right senior practitioners to the first call."
  />
);

export default ServiceCtaSection;
