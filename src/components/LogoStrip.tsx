import { CUSTOMERS, type Customer } from "@/content/site";

const Row = ({
  items,
  reverse = false,
}: {
  items: Customer[];
  reverse?: boolean;
}) => {
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-wrap overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`marquee marquee-slow gap-16 md:gap-24 px-8 items-center ${
          reverse ? "marquee-reverse" : ""
        }`}
      >
        {doubled.map((c, i) => (
          <a
            key={`${c.name}-${i}`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap text-2xl md:text-4xl font-bold tracking-tight text-secondary/70 transition-colors hover:text-primary"
            aria-hidden={i >= items.length ? "true" : undefined}
            tabIndex={i >= items.length ? -1 : 0}
          >
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export const LogoStrip = () => {
  return (
    <section
      aria-label="Trusted by Fortune 500 leaders"
      className="py-10 border-y border-border bg-background"
    >
      <p className="px-4 text-center text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground whitespace-normal md:whitespace-nowrap">
        <span className="text-secondary">Trusted by leaders in healthcare, media, energy &amp; the public sector</span>
        <span className="mx-3 text-primary">·</span>
        25+ years
        <span className="mx-3 text-primary">·</span>
        Fortune 500 clients
        <span className="mx-3 text-primary">·</span>
        6 regulated industries
      </p>

      <div className="mt-8">
        <Row items={CUSTOMERS} />
      </div>
    </section>
  );
};

export default LogoStrip;
