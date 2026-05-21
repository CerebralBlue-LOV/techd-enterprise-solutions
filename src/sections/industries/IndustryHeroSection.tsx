import IndustriesFigure from "@/components/shared/heroFigures/IndustriesFigure";
import PageHero from "@shared/page/PageHero";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

export const IndustryHeroSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  const isPublicSector = industry.id === "public-sector";
  const anchors = [
    { href: "#why", label: "Why TechD" },
    isPublicSector
      ? { href: "#credentials", label: "Credentials" }
      : { href: "#clients", label: "Clients" },
    { href: "#solutions", label: "Solutions" },
    { href: "#approach", label: "Approach" },
    { href: "#cta", label: "Contact" },
  ];
  return (
    <PageHero
      pageLabel={`Industries / ${industry.name}`}
      parent="Industries"
      child={industry.name}
      headline={extras?.headline ?? industry.outcome}
      lede={extras?.lede ?? industry.outcome}
      meta={industry.regulation}
      primaryCta={{ label: "Talk to an expert", to: "/contact" }}
      anchors={anchors}
      figure={<IndustriesFigure />}
    />
  );
};

export default IndustryHeroSection;
