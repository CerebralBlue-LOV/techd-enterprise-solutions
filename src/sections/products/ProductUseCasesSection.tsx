import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
}

export const ProductUseCasesSection = ({ product }: Props) => {
  const useCases = product.detail?.useCases;
  if (!useCases?.length) return null;

  return (
    <section id="use-cases" className="py-20 md:py-24 bg-muted/40 scroll-mt-24">
      <SectionMarker page="Product" name={`${product.name} — Use Cases`} />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Use Cases"
            title="Where TechD delivers this in practice"
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 max-w-5xl mx-auto">
          {useCases.map((uc, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={uc} delay={i * 80}>
                <div className="group relative flex flex-col gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-primary text-3xl md:text-4xl font-extralight tracking-tighter opacity-40 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-translate-y-0.5">
                      {num}
                    </span>
                    <div className="relative h-px flex-grow mt-2 bg-border overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-full bg-primary origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    </div>
                  </div>
                  <p className="text-secondary/90 text-base md:text-lg font-light leading-relaxed transition-colors duration-300 group-hover:text-secondary">
                    {uc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductUseCasesSection;
