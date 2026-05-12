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
    <section className="py-10 md:py-12 border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Related`} />
      <div className="container-page">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-5">
            <div>
              <p className="eyebrow mb-1">Explore the practice</p>
              <h2 className="text-lg md:text-xl font-bold text-secondary leading-tight">
                More in {practice.name}
              </h2>
            </div>
            <Link
              to={`/solutions/${practice.id}`}
              className="text-xs font-bold text-primary hover:underline shrink-0"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className={`grid gap-px bg-border border border-border ${cols}`}>
          {siblings.map((sib, i) => {
            if (sib.link.kind !== "internal") return null;
            return (
              <Reveal key={sib.link.slug} delay={i * 60}>
                <Link
                  to={`/solutions/${practice.id}/${sib.link.slug}`}
                  className="group relative flex h-full items-start justify-between gap-4 bg-background p-4 transition-colors duration-300 hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-secondary leading-tight transition-colors duration-300 group-hover:text-primary">
                      {sib.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground font-light leading-snug line-clamp-2">
                      {sib.tagline}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground shrink-0 mt-0.5 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
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
