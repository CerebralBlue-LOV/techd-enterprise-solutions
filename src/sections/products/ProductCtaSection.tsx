import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

export const ProductCtaSection = ({ practice, product }: Props) => (
  <section className="section">
    <SectionMarker page="Product" name={`${product.name} — CTA`} />
    <div className="container-page">
      <Reveal>
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Ready to get started?</p>
          <h2 className="text-3xl md:text-4xl leading-[1.1]">
            Talk to an expert
          </h2>
          <p className="mt-5 text-base font-light text-muted-foreground">
            Our senior engineers have shipped {product.name} in production for Fortune 500
            organizations. Tell us your challenge.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-glow">
              <Link to="/contact">
                Get in touch <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={`/solutions/${practice.id}`}>
                Explore {practice.name}
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ProductCtaSection;
