import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Mid-weight cross-link block to sibling internal products in the same
 * practice. Compact eyebrow + title row, then a horizontal grid of link
 * cards with cyan hover treatment matching the rest of the page.
 */
export const ProductRelatedSection = ({ practice, product }: Props) => {
  const siblings = practice.products.filter(
    (p) =>
      p.link.kind === "internal" &&
      !(
        p.link.kind === "internal" &&
        product.link.kind === "internal" &&
        p.link.slug === product.link.slug
      ),
  );
  if (!siblings.length) return null;

  const cols = siblings.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Related`} />
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <p className="eyebrow mb-2">Explore the practice</p>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary leading-tight">
                More in {practice.name}
              </h2>
            </div>
            <Link
              to={`/solutions/${practice.id}`}
              className="text-sm font-bold text-primary hover:underline shrink-0"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className={`mt-8 grid gap-px bg-border border border-border ${cols}`}>
          {siblings.map((sib, i) => {
            if (sib.link.kind !== "internal") return null;
            return (
              <Reveal key={sib.link.slug} delay={i * 70}>
                <Link
                  to={`/solutions/${practice.id}/${sib.link.slug}`}
                  className="group relative flex h-full flex-col justify-between gap-6 bg-background p-6 transition-colors duration-300 hover:bg-muted/40"
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-secondary leading-tight transition-colors duration-300 group-hover:text-primary">
                      {sib.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light leading-snug line-clamp-3">
                      {sib.tagline}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                      Learn more
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden
                    />
                  </div>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductRelatedSection;
