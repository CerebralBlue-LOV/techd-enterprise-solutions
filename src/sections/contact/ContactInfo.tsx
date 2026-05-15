import Reveal from "@shared/Reveal";

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
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">IBM Platinum</span>
        <span className="mx-2 text-muted-foreground/50">·</span>
        <span>15+ years</span>
        <span className="mx-2 text-muted-foreground/50">·</span>
        <span>Since 2009</span>
      </p>
    </Reveal>
  </div>
);

export default ContactInfo;
