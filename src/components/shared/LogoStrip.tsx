import { CUSTOMERS, type Customer } from "@/content/site";

const Row = ({
  items,
  reverse = false,
}: {
  items: Customer[];
  reverse?: boolean;
}) => {
  // Duplicate the list once for a seamless marquee loop. Use negative
  // animation-delay (set in CSS via inline style below) to offset the start
  // so top-tier brands hit center a few seconds into the loop.
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
        style={{ animationDelay: "-12s" }}
      >
        {doubled.map((c, i) => (
          <a
            key={`${c.name}-${i}`}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            title={c.name}
            aria-label={c.name}
            className="group shrink-0 flex items-center"
            aria-hidden={i >= items.length ? "true" : undefined}
            tabIndex={i >= items.length ? -1 : 0}
          >
            {c.logo && (
              <img
                src={`${import.meta.env.BASE_URL}${c.logo.replace(/^\//, "")}`}
                alt={c.name}
                loading="lazy"
                className={`${c.logoClass ?? "h-10 md:h-12"} w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0`}
              />
            )}
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
      <div className="px-4 text-center text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
        <p className="whitespace-normal lg:whitespace-nowrap">
          Trusted by leaders in healthcare, media, energy &amp; the public sector
        </p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>25+ years</span>
          <span className="text-primary" aria-hidden="true">·</span>
          <span>Fortune 500 clients</span>
          <span className="text-primary" aria-hidden="true">·</span>
          <span>6 regulated industries</span>
        </p>
      </div>

      <div className="mt-8">
        <Row items={CUSTOMERS} />
      </div>
    </section>
  );
};

export default LogoStrip;
