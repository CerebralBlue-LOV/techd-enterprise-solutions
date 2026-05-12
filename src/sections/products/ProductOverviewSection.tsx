import { Check } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
}

export const ProductOverviewSection = ({ product }: Props) => {
  if (!product.detail) return null;
  const { overview, capabilities } = product.detail;

  return (
    <section className="section border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Overview`} />
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Overview paragraphs */}
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title={`What ${product.name} does for your organization`}
            />
            <div className="mt-8 space-y-5">
              {overview.map((para, i) => (
                <p key={i} className="text-base font-light text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Capabilities */}
          <Reveal delay={80}>
            <div className="rounded-xl border border-border p-7 md:p-9">
              <p className="eyebrow mb-5">Key Capabilities</p>
              <ul className="space-y-3">
                {capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm text-secondary leading-snug">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ProductOverviewSection;
