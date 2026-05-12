import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
  /**
   * When true, hide the right-column capabilities list (used when a dedicated
   * `ProductCapabilitiesSection` is rendered separately). The overview prose
   * then expands to a single, wider column for a calmer rhythm.
   */
  hideCapabilities?: boolean;
}

export const ProductOverviewSection = ({ product, hideCapabilities }: Props) => {
  if (!product.detail) return null;
  const { overview, capabilities } = product.detail;

  return (
    <section className="section border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Overview`} />
      <div className="container-page">
        {hideCapabilities ? (
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title={`What ${product.name} does for your organization`}
            />
            <div className="mt-8 max-w-3xl space-y-5">
              {overview.map((para, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg font-light text-muted-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            {product.vendorUrl && (
              <a
                href={product.vendorUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Visit the official {product.name} page
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </Reveal>
        ) : (
          <div className="grid gap-16 lg:grid-cols-2">
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

              {product.vendorUrl && (
                <a
                  href={product.vendorUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  Visit the official {product.name} page
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </Reveal>

            <Reveal delay={80}>
              <p className="eyebrow mb-6">Key Capabilities</p>
              <ul className="divide-y divide-border border-t border-border">
                {capabilities.map((cap, i) => (
                  <li key={cap} className="flex items-start gap-5 py-4">
                    <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-light text-secondary leading-relaxed">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductOverviewSection;
