import { ArrowUpRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS, type ClientEntry } from "@content/industries-extras";
import { cn } from "@/lib/utils";

interface Props {
  industry: Industry;
}

const ClientLogo = ({ client }: { client: ClientEntry }) => {
  if (!client.logo) {
    // Monogram fallback
    const initials = client.name
      .replace(/[^A-Za-z0-9& ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <span className="font-bold text-secondary text-2xl tracking-tight leading-none">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}${client.logo.replace(/^\//, "")}`}
      alt={`${client.name} logo`}
      loading="lazy"
      className={cn(
        client.logoClass ?? "h-9 md:h-10",
        "w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0",
      )}
    />
  );
};

const ClientRow = ({ client, index }: { client: ClientEntry; index: number }) => {
  const Wrapper = client.url ? "a" : "div";
  const wrapperProps = client.url
    ? {
        href: client.url,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Visit ${client.name}`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative grid items-center gap-6 border-b border-border last:border-b-0 px-2 py-7 md:py-8",
        "grid-cols-[2.5rem_7.5rem_1fr_auto] md:grid-cols-[3rem_10rem_1fr_auto]",
        "transition-colors duration-300",
        client.url && "hover:bg-muted/20 cursor-pointer",
      )}
    >
      {/* Vertical cyan rail on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-primary transition-all duration-500 group-hover:h-12"
      />

      {/* Index */}
      <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Logo plate */}
      <span className="flex h-12 items-center">
        <ClientLogo client={client} />
      </span>

      {/* Name + note */}
      <span className="min-w-0">
        <span className="block text-lg md:text-xl font-bold text-secondary leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary">
          {client.name}
        </span>
        <span className="mt-1 block text-sm font-light text-muted-foreground leading-relaxed">
          {client.note}
        </span>
      </span>

      {/* Outbound link icon */}
      <span
        aria-hidden
        className={cn(
          "shrink-0 hidden md:flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground transition-all duration-300",
          client.url &&
            "group-hover:border-primary group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
          !client.url && "opacity-0",
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Wrapper>
  );
};

export const IndustryClientsSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.clients?.length) return null;

  return (
    <section id="clients" className="section bg-muted/30 scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Clients" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                eyebrow="Clients we serve"
                title="Named in the work, not the slides."
                subtitle="Active or recent engagements in this industry. We don't list a logo we haven't earned."
              />
            </Reveal>
            <Reveal delay={80}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 max-w-sm">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Active clients
                  </dt>
                  <dd className="mt-1 text-3xl md:text-4xl font-bold text-secondary leading-none">
                    {extras.clients.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Regulation
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-primary leading-tight">
                    {industry.regulation}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="border-t border-border bg-background rounded-xl px-3 md:px-5">
                {extras.clients.map((c, i) => (
                  <ClientRow key={c.name} client={c} index={i} />
                ))}
              </div>
            </Reveal>
            <p className="mt-5 text-xs font-light text-muted-foreground">
              Logos shown remain the property of their respective owners. Listed only where TechD has active or recent engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryClientsSection;
