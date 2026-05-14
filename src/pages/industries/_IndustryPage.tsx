import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { INDUSTRIES, type Industry } from "@content/industries";
import IndustryHeroSection from "@sections/industries/IndustryHeroSection";
import WhyIndustrySection from "@sections/industries/WhyIndustrySection";
import IndustryClientsSection from "@sections/industries/IndustryClientsSection";
import IndustryFederalCredentialsSection from "@sections/industries/IndustryFederalCredentialsSection";
import SolutionsForIndustrySection from "@sections/industries/SolutionsForIndustrySection";
import IndustryApproachSection from "@sections/industries/IndustryApproachSection";
import IndustryOutcomesSection from "@sections/industries/IndustryOutcomesSection";
import IndustryCtaSection from "@sections/industries/IndustryCtaSection";
import NotFound from "@pages/NotFound";

interface Props {
  industryId: Industry["id"];
}

/** Shared composition for all 6 industry landing pages. */
const IndustryPage = ({ industryId }: Props) => {
  const industry = INDUSTRIES.find((i) => i.id === industryId);
  if (!industry) return <NotFound />;

  return (
    <Layout>
      <SEO
        title={`${industry.name} — TechD`}
        description={industry.outcome}
      />
      <IndustryHeroSection industry={industry} />
      <WhyIndustrySection industry={industry} />
      <IndustryClientsSection industry={industry} />
      <SolutionsForIndustrySection industry={industry} />
      <IndustryApproachSection industry={industry} />
      <IndustryOutcomesSection industry={industry} />
      <IndustryCtaSection industry={industry} />
    </Layout>
  );
};

export default IndustryPage;
