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
        "group relative flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6",
        "transition-all duration-300",
        "hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-0.5",
        url && "cursor-pointer",
      )}
    >
      <div className="flex h-12 w-full items-center justify-start">
        {c?.logo ? (
          <img
            src={`${import.meta.env.BASE_URL}${c.logo.replace(/^\//, "")}`}
            alt={`${c.name} logo`}
            loading="lazy"
            className={cn(
              c.logoClass ?? "h-9 md:h-10",
              "w-auto max-w-[120px] object-contain brightness-0 invert opacity-90 transition-opacity duration-300 group-hover:opacity-100",
            )}
          />
        ) : (
          <span className="font-bold text-white/80 text-2xl tracking-tight leading-none">
            {initials}
          </span>
        )}
      </div>

      <div className="flex flex-col border-t border-white/10 pt-4 min-w-0">
        <p className="text-base font-bold text-white leading-tight transition-colors duration-300 group-hover:text-primary">
          {client.name}
        </p>
        <p className="mt-1 text-sm font-light text-white/55 leading-snug">
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
          <DarkGlowPanel intensity="soft" rounded="rounded-3xl">
            <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-12 p-8 md:p-12 lg:p-16 items-center">

              {/* Left — copy */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="space-y-4">
                  <p className="eyebrow text-primary">Clients we serve</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                    Partners in {industry.name}.
                  </h2>
                  <p className="text-base font-light text-white/65 leading-relaxed max-w-md">
                    Active or recent engagements in {industry.name}. Every logo
                    here represents a live or completed project — we don't list
                    a name we haven't earned.
                  </p>
                </div>

                <dl className="flex gap-12 pt-2">
                  <div className="flex flex-col gap-1">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Active clients
                    </dt>
                    <dd className="text-4xl font-bold text-white leading-none">
                      {resolved.length}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Regulation
                    </dt>
                    <dd className="text-base font-bold text-primary tracking-tight uppercase">
                      {industry.regulation}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Right — logo cards (single column rows) */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resolved.map((c) => (
                    <ClientCard key={c.name} client={c} />
                  ))}
                </div>
                <p className="mt-6 text-[10px] font-light uppercase tracking-widest text-white/25">
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
