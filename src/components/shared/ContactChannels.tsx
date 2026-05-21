import { Mail, Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ContactChannel = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
};

interface Props {
  items: ContactChannel[];
  className?: string;
}

/**
 * Editorial stacked list of contact channels (phone, emails, etc.).
 * No card chrome — designed to sit inside long-form copy columns.
 */
export const ContactChannels = ({ items, className }: Props) => (
  <ul className={cn("space-y-5", className)}>
    {items.map(({ icon: Icon, label, value, href }) => (
      <li key={label} className="group">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <a
          href={href}
          className="mt-1.5 inline-flex items-center gap-2.5 text-base md:text-lg font-normal text-secondary transition-colors duration-200 hover:text-primary"
        >
          <Icon className="size-4 text-primary" aria-hidden="true" />
          <span>{value}</span>
        </a>
      </li>
    ))}
  </ul>
);

export const DEFAULT_CONTACT_CHANNELS: ContactChannel[] = [
  {
    icon: Phone,
    label: "Call us",
    value: "888-98-TECHD (83243)",
    href: "tel:+18889883243",
  },
  {
    icon: Mail,
    label: "General & technical inquiries",
    value: "info@techd.com",
    href: "mailto:info@techd.com",
  },
  {
    icon: Mail,
    label: "Sales",
    value: "sales@techd.com",
    href: "mailto:sales@techd.com",
  },
];

export default ContactChannels;
