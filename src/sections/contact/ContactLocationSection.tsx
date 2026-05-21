import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import ContactMap from "./ContactMap";

const ContactLocationSection = () => (
  <section className="border-t border-border">
    <SectionMarker page="Contact" name="Location" />
    <div className="container-page pt-24 md:pt-28 pb-20 md:pb-24 space-y-12">
      <Reveal>
        <SectionHeading
          eyebrow="Visit"
          title="Where to find us."
          subtitle="Headquartered in Miami, serving Fortune 500 clients across North America."
        />
      </Reveal>

      <Reveal delay={80}>
        <ContactMap className="aspect-[21/9] rounded-2xl" />
      </Reveal>
    </div>
  </section>
);

export default ContactLocationSection;
