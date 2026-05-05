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
        className={`marquee marquee-slow gap-14 md:gap-20 px-8 items-center ${
          reverse ? "marquee-reverse" : ""
        }`}
      >
        {doubled.map((c, i) => (
          <a
            key={`${c.name}-${i}`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap text-lg md:text-xl font-bold tracking-tight text-secondary/55 transition-colors hover:text-primary"
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
      className="py-16 border-y border-border bg-background"
    >
      <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        Trusted by leaders in healthcare, media, energy & the public sector
      </p>

      <div className="mt-10">
        <Row items={CUSTOMERS} />
      </div>

      <p className="mt-10 text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        25+ years
        <span className="mx-3 text-muted-foreground/50">·</span>
        Fortune 500 clients
        <span className="mx-3 text-muted-foreground/50">·</span>
        6 regulated industries
      </p>
    </section>
  );
};

export default LogoStrip;
