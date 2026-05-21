import PageHero from "@shared/page/PageHero";
import PracticeFigure from "./_components/PracticeFigure";
import { type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
}

const ANCHORS = [
  { href: "#why-practice", label: "Why this practice" },
  { href: "#products", label: "Products" },
  { href: "#industries", label: "Industries" },
  { href: "#approach", label: "Approach" },
  { href: "#cta", label: "Contact" },
];

export const PracticeHeroSection = ({ practice }: Props) => (
  <PageHero
    pageLabel={`Solutions / ${practice.name}`}
    parent="Solutions"
    child={practice.name}
    headline={practice.outcome}
    lede={practice.description}
    primaryCta={{ label: "Talk to an expert", to: "/contact" }}
    anchors={ANCHORS}
    figure={<PracticeFigure practiceId={practice.id} />}
  />
);

export default PracticeHeroSection;
