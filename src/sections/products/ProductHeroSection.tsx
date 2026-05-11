import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionBackdrop from "@shared/SectionBackdrop";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

export const ProductHeroSection = ({ practice, product }: Props) => (
  <section className="relative overflow-hidden min-h-[50vh] flex items-center">
    <SectionMarker page="Product" name={product.name} />
    <SectionBackdrop intensity="strong" />

    {/* Gradient blobs */}
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 h-[320px] w-[320px] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-background/60 blur-2xl" />
      <div className="absolute right-48 -bottom-20 h-[240px] w-[240px] rounded-full bg-primary/8 blur-3xl" />
    </div>

    <div className="container-page relative pt-20 pb-16 md:pt-28 w-full">
      <Reveal>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link
            to={`/solutions/${practice.id}`}
            className="hover:text-primary transition-colors"
          >
            {practice.name}
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <span className="text-secondary font-medium">{product.name}</span>
        </nav>

        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{practice.name}</p>
          <h1 className="text-4xl md:text-5xl leading-[1.05]">{product.name}</h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground font-light">
            {product.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild className="btn-glow">
              <Link to="/contact">
                Talk to an expert <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/solutions/${practice.id}`}>
                View all {practice.name} products
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ProductHeroSection;
