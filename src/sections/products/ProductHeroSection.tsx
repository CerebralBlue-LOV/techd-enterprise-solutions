import PageHero from "@shared/page/PageHero";
import PracticeFigure from "@sections/solutions/_components/PracticeFigure";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Product detail hero. Uses the shared `PageHero` so it matches the practice
 * page exactly — same backdrop, grid, masking, and figure slot. The figure
 * on the right is the same wireframe used on the parent practice's banner.
 *
 * No CTAs in the hero — the bottom `ProductCtaSection` carries the
 * site-wide "Talk to an expert" closer.
 */
export const ProductHeroSection = ({ practice, product }: Props) => (
  <PageHero
    pageLabel={`Product / ${product.name}`}
    parent={practice.name}
    child={product.name}
    backLink={{ to: `/solutions/${practice.id}`, label: `Back to ${practice.name}` }}
    headline={product.name}
    lede={product.tagline}
    headlineSize="text-4xl md:text-5xl"
    minHeight="min-h-[60vh]"
    figure={<PracticeFigure practiceId={practice.id} />}
  />
);

export default ProductHeroSection;
