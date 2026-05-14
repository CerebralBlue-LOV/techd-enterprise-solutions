import Reveal from "@shared/Reveal";
import IBMPlatinumBadge from "@shared/IBMPlatinumBadge";

const ContactInfo = () => (
  <div className="lg:sticky lg:top-24">
    <Reveal>
      <p className="eyebrow mb-3">Get in touch</p>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-secondary">
        The right expert,<br />within <span className="text-primary">one business day</span>.
      </h2>
      <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
        Your note goes directly to a senior practitioner — no account team, no discovery relay. We read it, match it to the right engineer by practice area, and follow up within one business day.
      </p>
      <IBMPlatinumBadge size="md" showTenure className="mt-8" />
    </Reveal>
  </div>
);

export default ContactInfo;
