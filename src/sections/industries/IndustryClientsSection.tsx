import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS, type ClientEntry } from "@content/industries-extras";
import { CUSTOMERS, type Customer } from "@content/site";
import { cn } from "@/lib/utils";

interface Props {
  industry: Industry;
}

type ResolvedClient = ClientEntry & { customer?: Customer };

const ClientCard = ({ client }: { client: ResolvedClient }) => {
  const c = client.customer;
  const url = c?.url;
  const Wrapper = url ? "a" : "div";
  const wrapperProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Visit ${client.name}` }
    : {};

  const initials = client.name
    .replace(/[^A-Za-z0-9& ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group flex flex-col items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 text-center",
        "transition-all duration-300",
        "hover:border-primary hover:bg-white/10 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5",
        url && "cursor-pointer",
      )}
    >
      <div className="flex h-12 items-center justify-center">
        {c?.logo ? (
          <img
            src={`${import.meta.env.BASE_URL}${c.logo.replace(/^\//, "")}`}
            alt={`${c.name} logo`}
            loading="lazy"
            className={cn(
              c.logoClass ?? "h-9 md:h-10",
              "w-auto max-w-[140px] object-contain opacity-45 brightness-0 invert transition duration-500 group-hover:opacity-95 group-hover:brightness-100 group-hover:invert-0",
            )}
          />
        ) : (
          <span className="font-bold text-white/70 text-2xl tracking-tight leading-none">
            {initials}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-tight transition-colors duration-300 group-hover:text-primary">
          {client.name}
        </p>
        <p className="mt-1 text-xs font-light text-white/55 leading-relaxed">
          {client.note}
        </p>
      </div>
    </Wrapper>
  );
};

export const IndustryClientsSection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  if (!extras?.clients?.length) return null;

  const resolved: ResolvedClient[] = extras.clients.map((c) => ({
    ...c,
    customer: CUSTOMERS.find((x) => x.name === c.name),
  }));

  return (
    <section id="clients" className="section scroll-mt-24">
      <SectionMarker page={`Industries / ${industry.name}`} name="Clients" />
      <div className="container-page">
        <Reveal>
          <DarkGlowPanel intensity="medium" rounded="rounded-3xl">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 p-8 md:p-12 lg:p-0">

              {/* Left — copy */}
              <div className="relative lg:col-span-5 flex flex-col justify-center px-0 lg:p-14 xl:p-16">
                <div
                  aria-hidden
                  className="hidden lg:block absolute right-0 inset-y-8 w-px bg-white/10"
                />
                <p className="eyebrow mb-4 text-primary">Clients we serve</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                  The proof,<br />in one paragraph.
                </h2>
                <p className="mt-5 text-base font-light text-white/65 leading-relaxed">
                  Active or recent engagements in {industry.name}. Every logo here
                  represents a live or completed project — we don't list a name we
                  haven't earned.
                </p>
                <dl className="mt-8 flex gap-10">
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Active clients
                    </dt>
                    <dd className="mt-1 text-4xl font-bold text-white leading-none">
                      {resolved.length}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Regulation
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-primary leading-tight">
                      {industry.regulation}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Right — logo grid */}
              <div className="relative lg:col-span-7 flex flex-col justify-center px-0 lg:p-12 xl:p-14">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resolved.map((c) => (
                    <ClientCard key={c.name} client={c} />
                  ))}
                </div>
                <p className="mt-5 text-[11px] font-light text-white/30">
                  Logos remain the property of their respective owners.
                </p>
              </div>

            </div>
          </DarkGlowPanel>
        </Reveal>
      </div>
    </section>
  );
};

export default IndustryClientsSection;
