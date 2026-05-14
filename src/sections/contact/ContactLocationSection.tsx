import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `TechD ${CONTACT.address.city} ${CONTACT.address.state}`,
    )}`,
    cta: "Open in Google Maps",
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
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 md:p-7",
        "transition-all duration-300 ease-out",
        isLink
          ? "hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_40px_-24px_hsl(var(--primary)/0.45)]"
          : "",
      ].join(" ")}
    >
      {/* Ambient cyan wash on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="grid place-items-center size-12 rounded-xl bg-secondary text-white transition-colors duration-300 group-hover:bg-primary">
          <Icon className="size-5" />
        </div>
        {isLink && (
          <span className="grid place-items-center size-9 rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary group-hover:-rotate-12">
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </div>

      <p className="eyebrow mt-6">{eyebrow}</p>
      <p
        className={[
          "mt-2 text-xl md:text-2xl font-bold leading-tight tracking-tight",
          pending ? "text-muted-foreground" : "text-secondary",
        ].join(" ")}
      >
        {title}
      </p>
      <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">{sub}</p>

      {cta && (
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          {cta}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
