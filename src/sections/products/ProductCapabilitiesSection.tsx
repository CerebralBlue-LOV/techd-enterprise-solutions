import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
}

/**
 * Dedicated Key Capabilities section rendered on a dark cyan-glow panel.
 * Typography-led — mono index + light capability text, divided by hairlines.
 * Currently wired only on AI & Generative product detail pages.
 */
export const ProductCapabilitiesSection = ({ product }: Props) => {
  const capabilities = product.detail?.capabilities;
  if (!capabilities?.length) return null;

  // Split into two roughly even columns on lg+
  const mid = Math.ceil(capabilities.length / 2);
  const left = capabilities.slice(0, mid);
  const right = capabilities.slice(mid);

  return (
    <section className="section bg-muted/30">
      <SectionMarker page="Product" name={`${product.name} — Key Capabilities`} />
      <div className="container-page">
        <Reveal>
          <DarkGlowPanel intensity="vivid">
            <div className="relative px-8 py-16 md:px-14 md:py-20 lg:px-16 lg:py-24">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                  Key Capabilities
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] text-background tracking-tight">
                  What {product.name} delivers in production
                </h2>
              </div>

              <div className="mt-12 grid gap-x-12 gap-y-0 lg:grid-cols-2">
                <CapabilityList items={left} startIndex={0} />
                {right.length > 0 && (
                  <CapabilityList items={right} startIndex={left.length} />
                )}
              </div>
            </div>
          </DarkGlowPanel>
        </Reveal>
      </div>
    </section>
  );
};

const CapabilityList = ({
  items,
  startIndex,
}: {
  items: string[];
  startIndex: number;
}) => (
  <ul className="divide-y divide-white/10 border-t border-white/10">
    {items.map((cap, i) => (
      <li key={cap} className="flex items-start gap-5 py-5">
        <span className="font-mono text-xs text-background/40 tabular-nums pt-1 shrink-0">
          {String(startIndex + i + 1).padStart(2, "0")}
        </span>
        <span className="text-base font-light text-background/90 leading-relaxed">
          {cap}
        </span>
      </li>
    ))}
  </ul>
);

export default ProductCapabilitiesSection;
