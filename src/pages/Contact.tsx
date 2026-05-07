import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import GeometricAccent from "@shared/GeometricAccent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import SectionMarker from "@shared/SectionMarker";
import LogoStrip from "@shared/LogoStrip";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Required").max(120),
  role: z.string().trim().min(1, "Required").max(120),
  area: z.string().min(1, "Pick an area"),
  message: z.string().trim().min(1, "Required").max(2000),
});

type FormValues = z.infer<typeof schema>;

const AREAS = [
  "AI & Automation",
  "Data Solutions",
  "Security",
  "Cloud & Infrastructure",
  "Application Modernization",
  "Other",
];

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", role: "", area: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    // No backend wired in this iteration.
    console.info("[contact] submission", values);
    toast({
      title: "Thanks — we'll be in touch.",
      description: "A TechD principal will reach out within one business day.",
    });
    form.reset();
  };

  return (
    <Layout>
      <SEO
        title="Contact — TechD"
        description="Talk to an expert about your AI, data, security, or cloud program."
      />

      <section className="relative overflow-hidden">
        <SectionMarker page="Contact" name="Hero" />
        <GeometricAccent />
        <div className="container-page relative pt-20 pb-16 md:pt-28">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="Talk to an expert."
              subtitle="No SDR queue. No discovery call routing. Tell us what you're trying to ship and we'll match you with the right senior practitioner."
            />
          </Reveal>
        </div>
      </section>

      <section id="about" className="pb-16 scroll-mt-24">
        <SectionMarker page="Contact" name="About TechD" />
        <div className="container-page">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 rounded-xl border border-border p-8 md:p-12">
              <div>
                <p className="eyebrow">About TechD</p>
                <h2 className="mt-3 text-3xl leading-tight">IBM's partner for regulated enterprise delivery.</h2>
                <p className="mt-4 text-base font-light text-muted-foreground">
                  TechD has helped Fortune 500 organizations turn data into trustworthy AI since 2009. We design, build, and run secure AI, data, and hybrid cloud systems for healthcare, media, energy, and public sector enterprises — on IBM watsonx, Db2, and the open stack around them.
                </p>
                <p className="mt-3 text-base font-light text-muted-foreground">
                  Headquartered in Miami, FL. Delivering across the US and Canada.
                </p>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Founder &amp; President</p>
                  <p className="mt-1 text-sm font-light text-muted-foreground">Co-founded TechD in 2009. 15+ years of IBM Cognos, TM1, and enterprise data warehousing delivery.</p>
                </div>
                <div className="rounded-lg border border-border p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">VP of AI &amp; Managing Partner</p>
                  <p className="mt-1 text-sm font-light text-muted-foreground">Joined TechD after 15 years at IBM in Data &amp; AI sales and engineering. AI practice lead.</p>
                </div>
                <div className="rounded-lg border border-border p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">VP of Delivery</p>
                  <p className="mt-1 text-sm font-light text-muted-foreground">Oversees implementation and managed services delivery across all client engagements.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ibm" className="pb-16 scroll-mt-24">
        <SectionMarker page="Contact" name="IBM Partnership" />
        <div className="container-page">
          <Reveal>
            <div className="rounded-2xl border border-border p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="eyebrow">IBM Partnership</p>
                  <h2 className="mt-3 text-3xl leading-tight">
                    Platinum. IBM's highest partner classification.
                  </h2>
                  <p className="mt-4 text-base font-light text-muted-foreground">
                    IBM Platinum Business Partner status is reserved for partners with the deepest technical certifications, the broadest client delivery track record, and direct relationships with IBM product engineering teams. TechD has held Platinum status since 2009.
                  </p>
                  <p className="mt-3 text-base font-light text-muted-foreground">
                    That means direct access to watsonx, IBM Z, Red Hat OpenShift, and IBM Security engineering — and early participation in IBM beta programs before products reach general availability.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 content-start">
                  {[
                    { label: "Data & AI",          detail: "watsonx, Db2, Cognos, Planning Analytics, DataStage, Netezza, SPSS" },
                    { label: "Security",            detail: "Guardium, QRadar, Resilient — data protection and threat detection" },
                    { label: "Hybrid Cloud",        detail: "IBM Cloud, Red Hat OpenShift, IBM Z integration" },
                    { label: "Automation & FinOps", detail: "Apptio, Instana, Turbonomic" },
                  ].map((spec) => (
                    <div key={spec.label} className="rounded-xl border border-border p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{spec.label}</p>
                      <p className="mt-1.5 text-xs font-light text-muted-foreground leading-relaxed">{spec.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <SectionMarker page="Contact" name="Contact Info + Form" />
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl">Where to find us</h2>
                <ul className="mt-4 space-y-3 text-sm font-light text-muted-foreground">
                  <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-primary shrink-0" /> Contact details available at launch</li>
                  <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-primary shrink-0" /> Contact details available at launch</li>
                  <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-primary shrink-0" /> Miami, FL</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-xl border border-border bg-background p-7 md:p-9 grid gap-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work email</FormLabel>
                        <FormControl><Input type="email" placeholder="jane@company.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl><Input placeholder="Acme Corp" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl><Input placeholder="VP Engineering" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area of interest</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select an area" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AREAS.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you trying to ship?</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="A few sentences is plenty." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-muted-foreground">
                    We respond within one business day.
                  </p>
                  <Button type="submit" size="lg" className="transition-transform duration-200 hover:-translate-y-0.5">
                    Send
                  </Button>
                </div>
              </form>
            </Form>
          </Reveal>
        </div>
      </section>
      <section id="customers" className="pb-24 scroll-mt-24">
        <SectionMarker page="Contact" name="Customers" />
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-6">Trusted by regulated enterprises</p>
          </Reveal>
          <LogoStrip />
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
