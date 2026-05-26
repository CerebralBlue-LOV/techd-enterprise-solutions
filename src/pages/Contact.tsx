import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import LogoStrip from "@shared/LogoStrip";
import ContactHero from "@sections/contact/ContactHero";
import ContactInfo from "@sections/contact/ContactInfo";
import ContactForm from "@sections/contact/ContactForm";
import ContactLocationSection from "@sections/contact/ContactLocationSection";

const Contact = () => (
  <Layout>
    <SEO
      title="Contact TechD — Talk to an IBM Practitioner"
      description="Talk to a certified IBM practitioner about watsonx, Cognos, Guardium, or Apptio. US-based delivery team. Typical reply within one business day."
      canonical="/contact"
    />
    <ContactHero />
    <section className="section">
      <SectionMarker page="Contact" name="Split" />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <ContactInfo />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
    <ContactLocationSection />
    <div className="py-20 md:py-32">
      <LogoStrip bordered={false} />
    </div>
  </Layout>
);

export default Contact;
