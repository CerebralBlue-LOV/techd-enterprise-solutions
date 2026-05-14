import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import ContactHero from "@sections/contact/ContactHero";
import ContactInfo from "@sections/contact/ContactInfo";
import ContactForm from "@sections/contact/ContactForm";
import ContactLocationSection from "@sections/contact/ContactLocationSection";

const Contact = () => (
  <Layout>
    <SEO
      title="Contact — TechD"
      description="Talk to a senior IBM-certified architect. No SDR queue, no discovery-call relay. One business day response."
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
  </Layout>
);

export default Contact;
