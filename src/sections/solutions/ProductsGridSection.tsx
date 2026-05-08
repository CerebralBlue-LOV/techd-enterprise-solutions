import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product, type Solution } from "@content/solutions";

const ProductCard = ({ product, practiceId }: { product: Product; practiceId: string }) => {
  const inner = (
    <div className="card-hover h-full rounded-xl p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-secondary leading-tight">{product.name}</h3>
        {product.link.kind === "external" ? (
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-primary" />
        ) : (
          <ArrowRight className="mt-1 size-4 shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-secondary leading-snug">{product.tagline}</p>
      <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
        {product.description}
      </p>
    </div>
  );
  if (product.link.kind === "external") {
    return (
      <a href={product.link.url} target="_blank" rel="noreferrer noopener" className="group block h-full">
        {inner}
      </a>
    );
  }
  return (
    <Link to={`/solutions/${practiceId}/${product.link.slug}`} className="group block h-full">
      {inner}
    </Link>
  );
};

interface Props {
  practice: Solution;
}

export const ProductsGridSection = ({ practice }: Props) => (
  <section id="products" className="section bg-muted/30 scroll-mt-24">
    <SectionMarker page={`Solutions / ${practice.name}`} name="Products" />
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Products in this practice"
          title="The platforms and tools we deliver"
          subtitle="Select any product to explore capabilities, use cases, and how we engage."
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {practice.products.map((p, i) => (
          <Reveal key={p.name} delay={i * 50}>
            <ProductCard product={p} practiceId={practice.id} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsGridSection;
