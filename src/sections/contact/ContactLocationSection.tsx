import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { CONTACT } from "@content/site";
import ContactMap from "./ContactMap";

const DETAILS = [
  {
    icon: MapPin,
    label: `${CONTACT.address.city}, ${CONTACT.address.state}`,
    sub: CONTACT.address.lines[0],
  },
  {
    icon: Mail,
    label: "Email",
    sub: CONTACT.email.status === "pending" ? "Available at launch" : CONTACT.email.value,
  },
  {
    icon: Phone,
    label: "Phone",
    sub: CONTACT.phone.status === "pending" ? "Available at launch" : CONTACT.phone.value,
  },
];

const ContactLocationSection = () => (
  <section className="border-t border-border">
    <SectionMarker page="Contact" name="Location" />
    <div className="container-page py-16 md:py-20 space-y-8">
      <Reveal>
        <ContactMap className="aspect-[21/9] rounded-2xl" />
      </Reveal>

      <Reveal delay={80}>
        <ul className="grid gap-6 sm:grid-cols-3">
          {DETAILS.map(({ icon: Icon, label, sub }) => (
            <li key={label} className="flex items-start gap-4">
              <div className="grid place-items-center rounded-md bg-secondary size-9 shrink-0 mt-0.5">
                <Icon className="size-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-secondary">{label}</p>
                <p className="text-xs font-light text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

export default ContactLocationSection;
