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
    <section className="section bg-muted/40">
      <SectionMarker page="Product" name={`${product.name} — Use Cases`} />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Use Cases"
            title="Where TechD delivers this in practice"
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <Reveal key={uc} delay={i * 60}>
              <div className="card-hover rounded-xl p-6 h-full">
                <p className="text-sm font-bold text-secondary leading-snug">{uc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductUseCasesSection;
