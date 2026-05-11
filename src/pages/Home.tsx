import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import HeroSection from "@sections/home/HeroSection";
import LogoStripSection from "@sections/home/LogoStripSection";
import SolutionsGridSection from "@sections/home/SolutionsGridSection";
import EngineeredFieldSection from "@sections/home/EngineeredFieldSection";
import WhyTechDSection from "@sections/home/WhyTechDSection";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";

/**
 * Page: Home (route "/")
 * Marketing landing page. Thin composition of section components — all real
 * markup lives under @sections/home. Keep this file as a table of contents.
 *
 * Section order:
 *   1. Hero                 — value prop + primary CTA
 *   2. Logo Strip           — Fortune 500 social proof
 *   3. Solutions Grid       — 5 practice areas
 *   4–5. Engineered Field   — Industries + Featured Case Study (shared backdrop)
 *   6. Why TechD            — IBM credential + differentiators
 *   7. Final CTA            — closer
 */
const Home = () => (
  <Layout>
    <SEO
      title="TechD — IBM Platinum Partner for Enterprise AI, Data & Hybrid Cloud"
      description="TechD has helped Fortune 500 enterprises turn data into trustworthy AI since 2009. IBM Platinum Business Partner specializing in watsonx, Db2, hybrid cloud, and security for regulated industries."
    />
    <HeroSection />
    <LogoStripSection />
    <SolutionsGridSection />
    <EngineeredFieldSection />
    <WhyTechDSection />
      <PageFinalCtaSection
        pageLabel="Home"
        eyebrow="Ready to talk?"
        title="Talk to an expert."
        lede="30-minute conversation with a senior IBM-certified architect. No sales pass-through, no slide deck. Just engineering."
      />
  </Layout>
);

export default Home;
