import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { CONTACT } from "@content/site";
import ContactMap from "./ContactMap";

type Detail = {
  icon: typeof MapPin;
  eyebrow: string;
  title: string;
  sub: string;
  href?: string;
  cta?: string;
  pending?: boolean;
};

const emailPending = CONTACT.email.status === "pending";
const phonePending = CONTACT.phone.status === "pending";

const DETAILS: Detail[] = [
  {
    icon: MapPin,
    eyebrow: "Headquarters",
    title: `${CONTACT.address.city}, ${CONTACT.address.state}`,
    sub: CONTACT.address.lines[0],
  },
  {
    icon: Mail,
    eyebrow: "Email",
    title: emailPending ? "Available at launch" : CONTACT.email.value,
    sub: "Senior practitioner replies within one business day.",
    href: emailPending ? undefined : `mailto:${CONTACT.email.value}`,
    cta: emailPending ? undefined : "Send a message",
    pending: emailPending,
  },
  {
    icon: Phone,
    eyebrow: "Phone",
    title: phonePending ? "Available at launch" : CONTACT.phone.value,
    sub: "Direct line to our Miami delivery team.",
    href: phonePending ? undefined : `tel:${CONTACT.phone.value.replace(/[^0-9+]/g, "")}`,
    cta: phonePending ? undefined : "Call now",
    pending: phonePending,
  },
];

const DetailCard = ({ detail }: { detail: Detail }) => {
  const { icon: Icon, eyebrow, title, sub, href, cta, pending } = detail;
  const isLink = Boolean(href);
  const Wrapper = (isLink ? "a" : "div") as "a" | "div";
  const linkProps = isLink && href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <Wrapper
      {...(isLink ? { href } : {})}
      {...linkProps}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background p-5",
        "transition-all duration-300 ease-out",
        isLink &&
          "hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_40px_-24px_hsl(var(--primary)/0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      {/* Hover sheen */}
      {isLink && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary"
        />
      )}
      {/* Corner glow on hover */}
      {isLink && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/20"
        />
      )}

      <div className="relative flex items-center gap-3">
        <div className="relative grid place-items-center size-9 rounded-md bg-secondary text-white transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-[0_8px_20px_-8px_hsl(var(--primary)/0.6)]">
          <Icon className="size-4 transition-transform duration-300 group-hover:rotate-[-6deg]" />
        </div>
        <p className="eyebrow">{eyebrow}</p>
        {isLink && (
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </div>

      <p
        className={cn(
          "relative mt-4 text-base md:text-lg font-bold leading-tight tracking-tight transition-colors duration-300",
          pending ? "text-muted-foreground" : "text-secondary group-hover:text-primary",
        )}
      >
        {title}
      </p>
      <p className="relative mt-1.5 text-xs font-light text-muted-foreground leading-relaxed">{sub}</p>

      {cta && (
        <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
          {cta}
          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
    </Wrapper>
  );
};

const ContactLocationSection = () => (
  <section className="border-t border-border">
    <SectionMarker page="Contact" name="Location" />
    <div className="container-page py-16 md:py-20 space-y-10">
      <Reveal>
        <ContactMap className="aspect-[21/9] rounded-2xl" />
      </Reveal>

      <Reveal delay={80}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DETAILS.map((detail) => (
            <li key={detail.eyebrow} className="h-full">
              <DetailCard detail={detail} />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ContactLocationSection;
