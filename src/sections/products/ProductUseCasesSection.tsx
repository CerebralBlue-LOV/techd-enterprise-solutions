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
    <section id="use-cases" className="section bg-muted/40 scroll-mt-24">
      <SectionMarker page="Product" name={`${product.name} — Use Cases`} />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Use Cases"
            title="Where TechD delivers this in practice"
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2 max-w-6xl mx-auto">
          {useCases.map((uc, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={uc} delay={i * 90}>
                <div className="group relative flex flex-col gap-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-primary text-5xl md:text-6xl font-extralight tracking-tighter opacity-30 transition-opacity duration-500 group-hover:opacity-100">
                      {num}
                    </span>
                    <div className="h-px flex-grow bg-border mt-2 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  </div>
                  <p className="text-secondary text-xl md:text-2xl font-normal leading-snug tracking-tight transition-colors duration-300 group-hover:text-foreground">
                    {uc}
                  </p>
                  <div className="h-[2px] w-10 bg-primary origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
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
