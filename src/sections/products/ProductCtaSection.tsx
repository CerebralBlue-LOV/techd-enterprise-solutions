import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Thin adapter — uses the shared `PageFinalCtaSection` so every page across
 * the site shares one CTA treatment. Primary CTA is the site-wide
 * "Talk to an expert" → /contact; secondary returns the visitor to the
 * practice page they came from.
 */
export const ProductCtaSection = ({ practice, product }: Props) => (
  <PageFinalCtaSection
    pageLabel="Product"
    markerName={`${product.name} — CTA`}
    eyebrow="Ready to get started?"
    title="Talk to an expert."
    lede={`Our senior engineers have shipped ${product.name} in production for Fortune 500 organizations. Tell us your challenge.`}
    secondary={{
      label: `Explore ${practice.name}`,
      to: `/solutions/${practice.id}`,
    }}
  />
);

export default ProductCtaSection;
