import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Cross-link to sibling internal products within the same practice.
 * Quiet, typography-led list — no cards, no images. Hides if there are
 * no other internal products in this practice.
 */
export const ProductRelatedSection = ({ practice, product }: Props) => {
  const siblings = practice.products.filter(
    (p) =>
      p.link.kind === "internal" &&
      !(p.link.kind === "internal" && product.link.kind === "internal" && p.link.slug === product.link.slug),
  );
  if (!siblings.length) return null;

  return (
    <section className="section border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Related`} />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                eyebrow="Explore the practice"
                title={`More in ${practice.name}`}
              />
              <p className="mt-5 text-base text-muted-foreground font-light leading-relaxed">
                Other {practice.name.toLowerCase()} products TechD delivers in production.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-border border-y border-border">
              {siblings.map((sib, i) => {
                if (sib.link.kind !== "internal") return null;
                return (
                  <li key={sib.link.slug}>
                    <Reveal delay={i * 60}>
                      <Link
                        to={`/solutions/${practice.id}/${sib.link.slug}`}
                        className="group flex items-center gap-6 py-6 transition-colors"
                      >
                        <span className="text-xs font-bold tracking-widest text-primary tabular-nums w-8">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold text-secondary leading-tight transition-colors duration-300 group-hover:text-primary">
                            {sib.name}
                          </h3>
                          <p className="mt-1.5 text-sm text-muted-foreground font-light leading-snug line-clamp-2">
                            {sib.tagline}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="size-5 text-muted-foreground shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                          aria-hidden
                        />
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductRelatedSection;
