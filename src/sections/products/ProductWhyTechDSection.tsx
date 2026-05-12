import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Product } from "@content/solutions";

interface Props {
  product: Product;
}

const splitPoint = (point: string): { title: string; body: string } => {
  const idx = point.indexOf(" — ");
  if (idx === -1) return { title: "", body: point };
  return { title: point.slice(0, idx).trim(), body: point.slice(idx + 3).trim() };
};

const splitStat = (label: string): { lead: string; tail: string } => {
  const parts = label.split(" ");
  if (parts.length <= 2) return { lead: label, tail: "" };
  const mid = Math.ceil(parts.length / 2);
  return { lead: parts.slice(0, mid).join(" "), tail: parts.slice(mid).join(" ") };
};

export const ProductWhyTechDSection = ({ product }: Props) => {
  const whyTechD = product.detail?.whyTechD;
  const stats = product.detail?.stats;
  if (!whyTechD?.length) return null;

  return (
    <section id="why-techd" className="section border-t border-border scroll-mt-24">
      <SectionMarker page="Product" name={`${product.name} — Why TechD`} />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Why TechD"
            title={`Delivering ${product.name} in production`}
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Value props grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {whyTechD.map((point, i) => {
              const { title, body } = splitPoint(point);
              return (
                <Reveal key={i} delay={i * 70}>
                  <div className="group space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-4 bg-primary transition-all duration-500 ease-out group-hover:w-8" />
                      {title && (
                        <h3 className="font-bold text-base uppercase tracking-tight text-secondary">
                          {title}
                        </h3>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base font-light">
                      {body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Side stats */}
          {stats?.length ? (
            <div className="md:col-span-4 md:border-l md:border-border md:pl-10 space-y-14">
              {stats.map((stat, i) => {
                const { lead, tail } = splitStat(stat.label);
                return (
                  <Reveal key={stat.label} delay={i * 100}>
                    <div className="group">
                      <div className="text-5xl lg:text-6xl font-bold text-secondary tabular-nums tracking-tighter leading-none transition-colors duration-300 group-hover:text-primary">
                        {stat.value}
                      </div>
                      <div className="relative mt-4 mb-3 h-px bg-border">
                        <div className="absolute inset-y-0 left-0 h-px w-10 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                      </div>
                      <p className="text-xs uppercase tracking-widest font-bold text-secondary/80">
                        {lead}
                        {tail && (
                          <span className="block mt-1 text-xs font-light normal-case tracking-normal text-muted-foreground">
                            {tail}
                          </span>
                        )}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ProductWhyTechDSection;
