import Reveal from "@shared/Reveal";
import ContactChannels, { DEFAULT_CONTACT_CHANNELS } from "@shared/ContactChannels";

const ContactInfo = () => (
  <div id="contact-info" className="lg:sticky lg:top-24 scroll-mt-24">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-secondary">
        Let's talk about your next <span className="text-primary">initiative</span>.
      </h2>
      <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
        Reach out for guidance on IBM AI, big data, business analytics, security intelligence, cloud, and data warehousing — from early scoping through production delivery. Your note routes straight to a senior practitioner, no SDR queue.
      </p>

      <ContactChannels items={DEFAULT_CONTACT_CHANNELS} className="mt-8" />
    </Reveal>
  </div>
);

export default ContactInfo;
