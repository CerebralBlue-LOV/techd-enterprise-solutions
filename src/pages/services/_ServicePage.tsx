import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { SERVICES, type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";
import ServiceHeroSection from "@sections/services/ServiceHeroSection";
import ServiceWhySection from "@sections/services/ServiceWhySection";
import ServiceOfferingsSection from "@sections/services/ServiceOfferingsSection";
import ServiceApproachSection from "@sections/services/ServiceApproachSection";
import ServicePracticesSection from "@sections/services/ServicePracticesSection";
import ServiceCtaSection from "@sections/services/ServiceCtaSection";
import NotFound from "@pages/NotFound";

interface Props {
  serviceId: Service["id"];
}

const ServicePage = ({ serviceId }: Props) => {
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) return <NotFound />;

  const extras = SERVICES_EXTRAS[service.id];

  return (
    <Layout>
      <SEO
        title={`${service.name} — TechD`}
        description={extras?.lede ?? service.description}
      />
      <ServiceHeroSection service={service} />
      <ServiceWhySection service={service} />
      <ServiceOfferingsSection service={service} />
      <ServiceApproachSection service={service} />
      <ServicePracticesSection service={service} />
      <ServiceCtaSection service={service} />
    </Layout>
  );
};

export default ServicePage;
