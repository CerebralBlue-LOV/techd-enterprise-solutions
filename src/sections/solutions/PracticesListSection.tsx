import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@ui/button";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS, type Product, type Solution } from "@content/solutions";

const ProductCard = ({
  product,
  practiceId,
}: {
  product: Product;
  practiceId: string;
}) => {
  const inner = (
    <div className="card-hover rounded-lg p-4 h-full">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-secondary leading-tight">{product.name}</p>
        {product.link.kind === "external" ? (
          <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
        ) : (
          <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className="mt-1.5 text-xs font-light text-muted-foreground leading-relaxed">
        {product.tagline}
      </p>
    </div>
  );

  if (product.link.kind === "external") {
    return (
      <a
        href={product.link.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group block h-full"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      to={`/solutions/${practiceId}/${product.link.slug}`}
      className="group block h-full"
    >
      {inner}
    </Link>
  );
};

const PracticeCard = ({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) => (
  <Reveal>
    <article id={solution.id} className="grid gap-10 lg:grid-cols-[1fr_1.4fr] scroll-mt-24">
      <div>
        <p className="eyebrow">
          0{index + 1} · {solution.name}
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl leading-[1.1]">{solution.outcome}</h2>
      </div>

      <div className="rounded-xl border border-border p-7 md:p-9">
        <p className="text-base font-light text-muted-foreground">{solution.description}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {solution.products.map((p) => (
            <ProductCard key={p.name} product={p} practiceId={solution.id} />
          ))}
        </div>

        <div className="mt-7 pt-6 border-t border-border">
          <Button asChild variant="link" className="px-0 text-primary">
            <Link to="/contact">
              Talk to an expert <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  </Reveal>
);

/**
 * Section: Solutions / Practices List
 * Purpose: One row per practice area. Each practice card contains product link cards.
 * Order:   2 of 2 on the Solutions page.
 * Data:    @content/solutions (SOLUTIONS array).
 */
export const PracticesListSection = () => (
  <section className="pb-24">
    <SectionMarker page="Solutions" name="Practices List" />
    <div className="container-page space-y-20">
      {SOLUTIONS.map((s, i) => (
        <PracticeCard key={s.id} solution={s} index={i} />
      ))}
    </div>
  </section>
);

export default PracticesListSection;
