import { Link } from "react-router-dom";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Product, type Solution } from "@content/solutions";

interface Props {
  practice: Solution;
  product: Product;
}

/**
 * Quiet "More in {practice}" cross-link block — minimal row with a hairline
 * header (label + view-all) and a 3-up typographic grid of sibling products
 * separated by vertical hairlines. No arrows, no learn-more CTA.
 */
export const ProductRelatedSection = ({ practice, product }: Props) => {
  const siblings = practice.products.filter(
    (p) =>
      p.link.kind === "internal" &&
      !(
        product.link.kind === "internal" &&
        p.link.kind === "internal" &&
        p.link.slug === product.link.slug
      ),
  );
  if (!siblings.length) return null;

  return (
    <section className="bg-background">
      <SectionMarker page="Product" name={`${product.name} — Related`} />
      <div className="container-page py-12 md:py-14">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-border pb-3 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              More in {practice.name}
            </h2>
            <Link
              to={`/solutions/${practice.id}`}
              className="text-xs font-bold uppercase tracking-wider text-primary hover:underline shrink-0"
            >
              View all solutions
            </Link>
          </div>
        </Reveal>

        <div
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseDown={(e) => {
            const el = e.currentTarget;
            const startX = e.pageX;
            const startScroll = el.scrollLeft;
            const onMove = (ev: MouseEvent) => {
              el.scrollLeft = startScroll - (ev.pageX - startX);
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          {siblings.map((sib, i) => {
            if (sib.link.kind !== "internal") return null;
            return (
              <Reveal key={sib.link.slug} delay={i * 70}>
                <Link
                  to={`/solutions/${practice.id}/${sib.link.slug}`}
                  className={`group block shrink-0 snap-start w-64 ${
                    i > 0 ? "border-l border-border pl-8" : ""
                  }`}
                >
                  <h3 className="text-base font-bold text-secondary transition-colors duration-200 group-hover:text-primary">
                    {sib.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                    {sib.tagline}
                  </p>
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
