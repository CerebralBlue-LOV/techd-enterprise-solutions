import { CUSTOMERS } from "@/content/site";

const half = Math.ceil(CUSTOMERS.length / 2);
const rowA = CUSTOMERS.slice(0, half);
const rowB = CUSTOMERS.slice(half);

const Row = ({
  names,
  reverse = false,
}: {
  names: string[];
  reverse?: boolean;
}) => {
  const items = [...names, ...names];
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
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 whitespace-nowrap text-lg md:text-xl font-bold tracking-tight text-secondary/55"
            aria-hidden={i >= names.length ? "true" : undefined}
          >
            {name}
          </span>
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

      <div className="mt-10 space-y-6">
        <Row names={rowA} />
        <Row names={rowB} reverse />
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
