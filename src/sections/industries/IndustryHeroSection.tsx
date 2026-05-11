import IndustriesFigure from "@/components/shared/heroFigures/IndustriesFigure";
import PageHero from "@shared/page/PageHero";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";

interface Props {
  industry: Industry;
}

const ANCHORS = [
  { href: "#why", label: "Why TechD" },
  { href: "#clients", label: "Clients" },
  { href: "#solutions", label: "Solutions" },
  { href: "#approach", label: "Approach" },
];

export const IndustryHeroSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  return (
    <PageHero
      pageLabel={`Industries / ${industry.name}`}
      parent="Industries"
      child={industry.name}
      headline={extras?.headline ?? industry.outcome}
      lede={extras?.lede ?? industry.outcome}
      meta={industry.regulation}
      anchors={ANCHORS}
      figure={<IndustriesFigure />}
    />
  );
};

export default IndustryHeroSection;
