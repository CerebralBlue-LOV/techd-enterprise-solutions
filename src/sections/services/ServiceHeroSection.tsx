import ServicesFigure from "@/components/shared/heroFigures/ServicesFigure";
import PageHero from "@shared/page/PageHero";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";

interface Props {
  service: Service;
}

const ANCHORS = [
  { href: "#why",         label: "Why TechD" },
  { href: "#spotlight",   label: "Spotlight" },
  { href: "#offerings",   label: "Offerings" },
  { href: "#methodology", label: "Methodology" },
  { href: "#coverage",    label: "Coverage" },
  { href: "#cta",         label: "Contact" },
];

export const ServiceHeroSection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
  return (
    <PageHero
      pageLabel={`Services / ${service.name}`}
      parent="Services"
      child={service.name}
      headline={extras?.headline ?? service.promise}
      lede={extras?.lede ?? service.description}
      primaryCta={{ label: "Talk to an expert", to: "/contact" }}
      anchors={ANCHORS}
      figure={<ServicesFigure />}
    />
  );
};

export default ServiceHeroSection;
