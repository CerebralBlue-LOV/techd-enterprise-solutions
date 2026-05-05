import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import SolutionsHeroSection from "@sections/solutions/SolutionsHeroSection";
import PracticesListSection from "@sections/solutions/PracticesListSection";

/**
 * Page: Solutions (route "/solutions")
 * Detail page for the five practice areas.
 *
 * Section order:
 *   1. Hero            — page intro
 *   2. Practices List  — one row per practice (anchor targets for deep links)
 */
const Solutions = () => (
  <Layout>
    <SEO
      title="Solutions — TechD"
      description="AI & Automation, Data, Security, Cloud & Infrastructure, and Application Modernization for the Fortune 500."
    />
    <SolutionsHeroSection />
    <PracticesListSection />
  </Layout>
);

export default Solutions;
