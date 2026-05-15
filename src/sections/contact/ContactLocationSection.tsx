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
        "group relative flex h-full flex-col rounded-xl border border-border bg-background p-5",
        "transition-all duration-300 ease-out",
        isLink && "hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="grid place-items-center size-9 rounded-md bg-secondary text-white transition-colors duration-300 group-hover:bg-primary">
          <Icon className="size-4" />
        </div>
        <p className="eyebrow">{eyebrow}</p>
        {isLink && (
          <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </div>

      <p
        className={cn(
          "mt-4 text-base md:text-lg font-bold leading-tight tracking-tight",
          pending ? "text-muted-foreground" : "text-secondary",
        )}
      >
        {title}
      </p>
      <p className="mt-1.5 text-xs font-light text-muted-foreground leading-relaxed">{sub}</p>

      {cta && (
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
          {cta}
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
