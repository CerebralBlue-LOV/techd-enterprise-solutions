import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { SOLUTIONS, type Solution } from "@content/solutions";
import PracticeHeroSection from "@sections/solutions/PracticeHeroSection";
import WhyPracticeSection from "@sections/solutions/WhyPracticeSection";
import ProductsGridSection from "@sections/solutions/ProductsGridSection";
import CerebralBlueToolsSection from "@sections/solutions/CerebralBlueToolsSection";
import IndustriesServedSection from "@sections/solutions/IndustriesServedSection";
import ApproachSection from "@sections/solutions/ApproachSection";
import OutcomesSection from "@sections/solutions/OutcomesSection";
import PracticeCtaSection from "@sections/solutions/PracticeCtaSection";
import NotFound from "@pages/NotFound";

interface Props {
  practiceId: Solution["id"];
}

/**
 * Shared composition for all 5 practice landing pages.
 * Section order locked to the approved IA template.
 */
const PracticePage = ({ practiceId }: Props) => {
  const practice = SOLUTIONS.find((s) => s.id === practiceId);
  if (!practice) return <NotFound />;

  return (
    <Layout>
      <SEO
        title={`${practice.name} — TechD`}
        description={practice.outcome}
      />
      <PracticeHeroSection practice={practice} />
      <WhyPracticeSection practice={practice} />
      <ProductsGridSection practice={practice} />
      <CerebralBlueToolsSection practice={practice} />
      <IndustriesServedSection practice={practice} />
      <ApproachSection practice={practice} />
      <OutcomesSection practice={practice} />
      <PracticeCtaSection practice={practice} />
    </Layout>
  );
};

export default PracticePage;
