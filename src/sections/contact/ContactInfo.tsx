import Reveal from "@shared/Reveal";
import ContactChannels, { DEFAULT_CONTACT_CHANNELS } from "@shared/ContactChannels";

const ContactInfo = () => (
  <div className="lg:sticky lg:top-24">
    <Reveal>
      <p className="eyebrow mb-3">Contact</p>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-secondary">
        Let's talk about your next{" "}
        <span className="text-primary">IBM initiative</span>.
      </h2>
      <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
        Reach out for guidance on IBM AI, big data, business analytics, security intelligence, cloud, and data warehousing — from early scoping through production delivery. Your note routes straight to a senior practitioner, no SDR queue.
      </p>

      <ContactChannels items={DEFAULT_CONTACT_CHANNELS} className="mt-8" />

      <p className="group mt-10 inline-flex flex-wrap items-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-secondary motion-reduce:transition-none">
        <span className="transition-colors duration-300 group-hover:text-primary">IBM Gold</span>
        <span className="mx-2 text-muted-foreground/50 transition-transform duration-300 group-hover:scale-125">·</span>
        <span className="transition-colors duration-300 group-hover:text-primary">15+ years</span>
        <span className="mx-2 text-muted-foreground/50 transition-transform duration-300 group-hover:scale-125">·</span>
        <span className="transition-colors duration-300 group-hover:text-primary">Since 2009</span>
      </p>
    </Reveal>
  </div>
);

export default ContactInfo;
