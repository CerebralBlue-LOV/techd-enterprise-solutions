import { useParams } from "react-router-dom";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import NotFound from "@pages/NotFound";
import ProductHeroSection from "@sections/products/ProductHeroSection";
import ProductOverviewSection from "@sections/products/ProductOverviewSection";
import ProductCapabilitiesSection from "@sections/products/ProductCapabilitiesSection";
import ProductUseCasesSection from "@sections/products/ProductUseCasesSection";
import ProductWhyTechDSection from "@sections/products/ProductWhyTechDSection";
import ProductCtaSection from "@sections/products/ProductCtaSection";
import { SOLUTIONS } from "@content/solutions";

/**
 * Page: Product Detail (route "/solutions/:practice/:product")
 * Single data-driven page for all 20 internal product pages.
 * Unknown slugs fall through to NotFound without changing the URL.
 */
const ProductDetail = () => {
  const { practice: practiceSlug, product: productSlug } = useParams<{
    practice: string;
    product: string;
  }>();

  const solution = SOLUTIONS.find((s) => s.id === practiceSlug);
  const product = solution?.products.find(
    (p) => p.link.kind === "internal" && p.link.slug === productSlug,
  );

  if (!solution || !product || !product.detail) {
    return <NotFound />;
  }

  return (
    <Layout>
      <SEO
        title={`${product.name} — ${solution.name} — TechD`}
        description={product.tagline}
      />
      <ProductHeroSection practice={solution} product={product} />
      <ProductOverviewSection
        product={product}
        hideCapabilities={solution.id === "ai-generative"}
      />
      {solution.id === "ai-generative" && (
        <ProductCapabilitiesSection product={product} />
      )}
      <ProductUseCasesSection product={product} />
      <ProductWhyTechDSection product={product} />
      <div id="talk" className="scroll-mt-24">
        <ProductCtaSection practice={solution} product={product} />
      </div>
    </Layout>
  );
};

export default ProductDetail;
