import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionMarker from "@shared/SectionMarker";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Compact cross-link strip to sibling internal products in the same practice.
 * One quiet row — eyebrow + inline links. No heading, minimal padding.
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

  return (
    <section className="py-10 border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Related`} />
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0">More in {practice.name}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siblings.map((sib) => {
              if (sib.link.kind !== "internal") return null;
              return (
                <li key={sib.link.slug}>
                  <Link
                    to={`/solutions/${practice.id}/${sib.link.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-bold text-secondary transition-colors duration-200 hover:text-primary"
                  >
                    {sib.name}
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductRelatedSection;
