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
      <p className="group mt-8 inline-flex flex-wrap items-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-secondary motion-reduce:transition-none">
        <span className="transition-colors duration-300 group-hover:text-primary">IBM Platinum</span>
        <span className="mx-2 text-muted-foreground/50 transition-transform duration-300 group-hover:scale-125">·</span>
        <span className="transition-colors duration-300 group-hover:text-primary">15+ years</span>
        <span className="mx-2 text-muted-foreground/50 transition-transform duration-300 group-hover:scale-125">·</span>
        <span className="transition-colors duration-300 group-hover:text-primary">Since 2009</span>
      </p>
    </Reveal>
  </div>
);

export default ContactInfo;
