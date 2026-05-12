import { Check } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
}

export const ProductWhyTechDSection = ({ product }: Props) => {
  const whyTechD = product.detail?.whyTechD;
  const stats = product.detail?.stats;
  if (!whyTechD?.length) return null;

  return (
    <section className="section border-t border-border">
      <SectionMarker page="Product" name={`${product.name} — Why TechD`} />
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Why TechD"
              title={`Delivering ${product.name} in production`}
            />
            <ul className="mt-8 space-y-5">
              {whyTechD.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="size-4 text-primary shrink-0 mt-1" />
                  <span className="text-base font-light text-muted-foreground leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {stats?.length ? (
            <Reveal delay={80}>
              <div className="grid grid-cols-2 gap-8 lg:mt-14">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-t-2 border-primary pt-5">
                    <p className="text-4xl font-bold text-secondary">{stat.value}</p>
                    <p className="mt-2 text-sm font-light text-muted-foreground leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ProductWhyTechDSection;
