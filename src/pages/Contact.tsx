import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GeometricAccent from "@/components/GeometricAccent";
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
import SectionMarker from "@/components/SectionMarker";

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
        description="Talk to a TechD principal about your AI, data, security, or cloud program."
      />

      <section data-section="contact:hero" className="relative overflow-hidden">
        <SectionMarker page="Contact" name="Hero" />
        <GeometricAccent />
        <div className="container-page relative pt-20 pb-16 md:pt-28">
          <Reveal>
            <SectionHeading
              as="h1"
              eyebrow="Contact"
              title="Talk to a principal."
              subtitle="No SDR queue. No discovery call routing. Tell us what you're trying to ship and we'll match you with the right senior practitioner."
            />
          </Reveal>
        </div>
      </section>

      <section data-section="contact:form" className="pb-24">
        <SectionMarker page="Contact" name="Contact Info + Form" />
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl">Where to find us</h2>
                <ul className="mt-4 space-y-3 text-sm font-light text-muted-foreground">
                  <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-primary shrink-0" /> hello@techd.example</li>
                  <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-primary shrink-0" /> +1 (212) 555-0142</li>
                  <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-primary shrink-0" /> Offices in NYC · Boston · Princeton</li>
                </ul>
              </div>

              <div id="ibm" className="rounded-xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-secondary text-background grid place-items-center text-sm font-bold">IBM</div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">Platinum</div>
                    <div className="text-sm font-bold text-secondary">Business Partner</div>
                  </div>
                </div>
                <p className="mt-3 text-sm font-light text-muted-foreground">
                  IBM's highest partner tier. Direct access to watsonx, Z, and OpenShift engineering.
                </p>
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
    </Layout>
  );
};

export default Contact;
