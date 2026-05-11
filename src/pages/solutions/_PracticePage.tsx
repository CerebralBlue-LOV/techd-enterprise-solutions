import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { SOLUTIONS, type Solution } from "@content/solutions";
import PracticeHeroSection from "@sections/solutions/PracticeHeroSection";
import WhyPracticeSection from "@sections/solutions/WhyPracticeSection";
import ProductsGridSection from "@sections/solutions/ProductsGridSection";
import IndustriesServedSection from "@sections/solutions/IndustriesServedSection";
import ApproachSection from "@sections/solutions/ApproachSection";

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
      <IndustriesServedSection practice={practice} />
      <ApproachSection practice={practice} />
      <PracticeCtaSection practice={practice} />
    </Layout>
  );
};

export default PracticePage;
