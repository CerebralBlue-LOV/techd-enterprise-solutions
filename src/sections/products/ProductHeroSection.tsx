import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import PageHeroBackdrop from "@shared/page/PageHeroBackdrop";
import PracticeFigure from "@sections/solutions/_components/PracticeFigure";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Product detail hero. Original two-line breadcrumb + practice eyebrow
 * styling, with the parent practice's wireframe figure on the right
 * (via the shared `PageHeroBackdrop`). No CTA buttons in the hero —
 * the bottom `ProductCtaSection` carries the closer.
 */
export const ProductHeroSection = ({ practice, product }: Props) => (
  <section className="relative overflow-hidden min-h-[60vh] flex items-center">
    <SectionMarker page={`Product / ${product.name}`} name="Hero" />
    <PageHeroBackdrop figure={<PracticeFigure practiceId={practice.id} />} />

    <div className="container-page relative z-10 pt-20 pb-16 md:pt-28 w-full">
      <Reveal>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link
            to={`/solutions/${practice.id}`}
            className="hover:text-primary transition-colors"
          >
            {practice.name}
          </Link>
          <ChevronRight className="size-3.5 shrink-0" />
          <span className="text-secondary font-medium">{product.name}</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-secondary">
            {product.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ProductHeroSection;
