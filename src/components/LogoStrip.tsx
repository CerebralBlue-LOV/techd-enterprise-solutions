import { CUSTOMERS } from "@/content/site";

export const LogoStrip = () => {
  const items = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <section aria-label="Trusted by Fortune 500 leaders" className="py-12 border-y border-border bg-background">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by Fortune 500 leaders
      </p>
      <div className="marquee-wrap mt-6 overflow-hidden">
        <div className="marquee gap-16 px-8">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl md:text-2xl font-bold tracking-tight text-muted-foreground/80 hover:text-secondary transition-colors"
              aria-hidden={i >= CUSTOMERS.length ? "true" : undefined}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
