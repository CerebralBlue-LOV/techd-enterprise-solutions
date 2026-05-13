import { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import HeroBackdrop from "@sections/home/_components/HeroBackdrop";

const HeroParticleField = lazy(
  () => import("@sections/home/_components/HeroParticleField"),
);
import StatBand from "@shared/StatBand";
import StepFlow from "@shared/StepFlow";
import IBMPlatinumBadge from "@shared/IBMPlatinumBadge";
import LogoStrip from "@shared/LogoStrip";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AREAS = [
  "AI & Automation",
  "Data Solutions",
  "Security",
  "Cloud & Infrastructure",
  "Application Modernization",
  "Other",
] as const;

const TIMELINES = ["Now", "This quarter", "Exploring"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Required").max(120),
  role: z.string().trim().min(1, "Required").max(120),
  area: z.enum(AREAS, { required_error: "Pick an area" }),
  timeline: z.enum(TIMELINES).optional(),
  message: z.string().trim().min(1, "Required").max(2000),
});

type FormValues = z.infer<typeof schema>;

const HERO_STATS = [
  { value: "1 day", label: "Response time" },
  { value: "2009", label: "IBM Platinum since" },
  { value: "Senior", label: "Architect on first call" },
];

const NEXT_STEPS = [
  { label: "You submit the form", detail: "30 seconds. Just enough to route you correctly." },
  { label: "A senior principal reviews it the same day", detail: "No SDR queue. No discovery-call relay." },
  { label: "We schedule a 30-minute working call", detail: "Within one business day, with the practitioner who'd lead the work." },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      area: undefined as unknown as FormValues["area"],
      timeline: undefined,
      message: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.info("[contact] submission", values);
    setSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Contact — TechD"
        description="Talk to a senior IBM-certified architect. No SDR queue, no discovery-call relay. One business day response."
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <SectionMarker page="Contact" name="Hero" />
        <RingsHeroBackdrop />
        <div className="container-page relative pt-24 pb-20 md:pt-32 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <Reveal>
              <p className="eyebrow mb-4">Contact</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight text-secondary">
                Talk to an <span className="text-primary">expert</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg md:text-xl font-light text-muted-foreground leading-relaxed">
                No SDR queue. No discovery-call routing. Tell us what you're trying to ship and we'll match you with the right senior practitioner — usually within one business day.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <StatBand items={HERO_STATS} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKING AREA */}
      <section className="section">
        <SectionMarker page="Contact" name="Form + Context" />
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
          {/* Left rail */}
          <Reveal>
            <aside className="lg:sticky lg:top-24 space-y-10">
              <div>
                <p className="eyebrow mb-4">Where to find us</p>
                <ul className="divide-y divide-border border-y border-border">
                  <li className="flex items-center gap-4 py-4">
                    <MapPin className="size-4 text-primary shrink-0" />
                    <span className="text-sm font-light text-secondary">Miami, FL — Headquarters</span>
                  </li>
                  <li className="flex items-center gap-4 py-4">
                    <Mail className="size-4 text-primary shrink-0" />
                    <span className="text-sm font-light text-muted-foreground">Contact details available at launch</span>
                  </li>
                  <li className="flex items-center gap-4 py-4">
                    <Phone className="size-4 text-primary shrink-0" />
                    <span className="text-sm font-light text-muted-foreground">Contact details available at launch</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-5">What happens next</p>
                <StepFlow orientation="vertical" steps={NEXT_STEPS} />
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-5 flex items-start gap-4">
                <IBMPlatinumBadge size="sm" />
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  21 IBM products. 6 regulated industries. The senior architect on your first call is the same one who'd lead the engagement.
                </p>
              </div>
            </aside>
          </Reveal>

          {/* Form card */}
          <Reveal delay={100}>
            <div
              className="relative rounded-2xl border border-border bg-background p-7 md:p-10 shadow-[0_1px_0_hsl(var(--border)),0_24px_48px_-32px_hsl(var(--primary)/0.25)] ring-1 ring-border/60"
              aria-live="polite"
            >
              {submitted ? (
                <div className="py-10 md:py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <h2 className="mt-6 text-3xl md:text-4xl font-bold text-secondary leading-tight">
                    Thanks — we've got it.
                  </h2>
                  <p className="mt-4 mx-auto max-w-md text-base font-light text-muted-foreground leading-relaxed">
                    A senior principal will review your note today and reach out within one business day to schedule a 30-minute working call.
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Button asChild className="btn-glow">
                      <Link to="/">Back to home <ArrowRight /></Link>
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        form.reset();
                        setSubmitted(false);
                      }}
                      className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                    >
                      Send another
                    </button>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8" noValidate>
                    {/* Group: About you */}
                    <div className="grid gap-5">
                      <p className="eyebrow text-primary/80">About you</p>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" className="h-11 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors" {...field} />
                              </FormControl>
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
                              <FormControl>
                                <Input type="email" placeholder="jane@company.com" className="h-11 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors" {...field} />
                              </FormControl>
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
                              <FormControl>
                                <Input placeholder="Acme Corp" className="h-11 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors" {...field} />
                              </FormControl>
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
                              <FormControl>
                                <Input placeholder="VP Engineering" className="h-11 focus-visible:ring-primary/50 focus-visible:border-primary transition-colors" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="border-t border-border" />

                    {/* Group: About the project */}
                    <div className="grid gap-5">
                      <p className="eyebrow text-primary/80">About the project</p>

                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area of interest</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(v) => v && field.onChange(v)}
                                className="flex flex-wrap justify-start gap-2"
                              >
                                {AREAS.map((a) => (
                                  <ToggleGroupItem
                                    key={a}
                                    value={a}
                                    className="h-9 px-4 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-secondary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary hover:border-primary hover:text-primary transition-colors"
                                  >
                                    {a}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground font-normal">Timeline <span className="text-muted-foreground/60">(optional)</span></FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={(v) => field.onChange(v || undefined)}
                                className="flex flex-wrap justify-start gap-2"
                              >
                                {TIMELINES.map((t) => (
                                  <ToggleGroupItem
                                    key={t}
                                    value={t}
                                    className="h-9 px-4 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-secondary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary hover:border-primary hover:text-primary transition-colors"
                                  >
                                    {t}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
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
                              <Textarea
                                rows={6}
                                placeholder="A few sentences is plenty — what's the outcome, what's blocking it, and what does success look like?"
                                className="resize-none focus-visible:ring-primary/50 focus-visible:border-primary transition-colors"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-light text-muted-foreground">
                        We respond within one business day.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        className="btn-glow h-12 px-8 w-full sm:w-auto"
                      >
                        Send to a principal
                        <ArrowUpRight className="ml-1" />
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust strip */}
      <LogoStrip />
    </Layout>
  );
};

export default Contact;
