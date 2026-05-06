import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import GeometricAccent from "@shared/GeometricAccent";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

export const ProductHeroSection = ({ practice, product }: Props) => (
  <section className="relative overflow-hidden">
    <SectionMarker page="Product" name={product.name} />
    <GeometricAccent />
    <div className="container-page relative pt-20 pb-16 md:pt-28">
      <Reveal>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link to="/solutions" className="hover:text-primary transition-colors">
            Solutions
          </Link>
          <ChevronRight className="size-3 shrink-0" />
          <Link
            to={`/solutions#${practice.id}`}
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
            <Button asChild>
              <Link to="/contact">
                Talk to an expert <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/solutions#${practice.id}`}>
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
