import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowRight, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/contact-submit";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const HEARD_ABOUT = [
  "Web search",
  "AI assistant (ChatGPT, Claude, Gemini, Perplexity…)",
  "IBM",
  "Event",
  "Email",
  "Social media",
  "Referral",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(1, "Required").max(120),
  role: z.string().trim().min(1, "Required").max(120),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  heardAbout: z.enum(HEARD_ABOUT, { required_error: "Required" }),
  heardAboutOther: z.string().trim().max(120).optional().or(z.literal("")),
  area: z.enum(AREAS, { required_error: "Pick an area" }),
  timeline: z.enum(TIMELINES).optional(),
  message: z.string().trim().min(1, "Required").max(2000),
});

type FormValues = z.infer<typeof schema>;

const PILL =
  "h-10 px-4 rounded-md border border-border/70 bg-background/70 text-xs font-bold uppercase tracking-wider text-secondary ring-1 ring-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=on]:ring-primary/30 data-[state=on]:shadow-[0_6px_20px_-10px_hsl(var(--primary)/0.7)] hover:border-primary hover:text-primary transition-all duration-200";

const FIELD_INPUT =
  "h-12 bg-background/70 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30";

const SECTION_EYEBROW =
  "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary";

const RequiredMark = () => (
  <span aria-hidden="true" className="ml-0.5 text-primary">*</span>
);

const OptionalMark = () => (
  <span className="ml-1 font-normal text-muted-foreground/60">(optional)</span>
);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      phone: "",
      heardAbout: undefined,
      heardAboutOther: "",
      area: undefined as unknown as FormValues["area"],
      timeline: undefined,
      message: "",
      // honeypot: must stay empty for real humans
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (values.website && values.website.trim() !== "") {
      setSubmitted(true);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitContact({
        ...values,
        website: undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        page: typeof window !== "undefined" ? window.location.href : "",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("[contact] submit failed", err);
      setSubmitError(
        "We couldn't send your message. Please try again, or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact-form"
      className="group relative rounded-2xl border border-border bg-gradient-to-br from-background via-background to-muted/20 p-7 md:p-10 shadow-[0_30px_60px_-32px_hsl(var(--primary)/0.3)] overflow-hidden transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_40px_80px_-24px_hsl(var(--primary)/0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 scroll-mt-24"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-opacity duration-500 group-hover:via-primary" />

      {submitted ? (
        <div className="relative z-10 py-10 md:py-16 text-center">
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative z-10 grid gap-8"
            noValidate
          >
            {/* About you */}
            <div className="grid gap-5">
              <p className={SECTION_EYEBROW}>
                <span className="h-px w-6 bg-primary/60" /> About you
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name<RequiredMark /></FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className={FIELD_INPUT} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work email<RequiredMark /></FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="jane@company.com"
                          className={FIELD_INPUT}
                          {...field}
                        />
                      </FormControl>
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
                      <FormLabel>Company<RequiredMark /></FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" className={FIELD_INPUT} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role<RequiredMark /></FormLabel>
                      <FormControl>
                        <Input placeholder="VP Engineering" className={FIELD_INPUT} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground font-normal">
                        Phone<OptionalMark />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className={FIELD_INPUT}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heardAbout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How did you hear about us?<RequiredMark />
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(v) => field.onChange(v || undefined)}
                      >
                        <FormControl>
                          <SelectTrigger className={FIELD_INPUT}>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {HEARD_ABOUT.map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {form.watch("heardAbout") === "Other" && (
                <FormField
                  control={form.control}
                  name="heardAboutOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground font-normal">
                        Please specify<OptionalMark />
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tell us how you found us"
                          className={FIELD_INPUT}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="relative">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* About the project */}
            <div className="grid gap-5">
              <p className={SECTION_EYEBROW}>
                <span className="h-px w-6 bg-primary/60" /> About the project
              </p>

              <FormField
                control={form.control}
                name="area"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.invalid ? "text-destructive" : undefined}
                    >
                      Area of interest<RequiredMark />
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(v) => v && field.onChange(v)}
                        className={`flex flex-wrap justify-start gap-2 ${
                          fieldState.invalid
                            ? "rounded-md ring-1 ring-destructive/60 p-1 -m-1"
                            : ""
                        }`}
                      >
                        {AREAS.map((a) => (
                          <ToggleGroupItem key={a} value={a} className={PILL}>
                            {a}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground font-normal">
                      Timeline<OptionalMark />
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        value={field.value}
                        onValueChange={(v) => field.onChange(v || undefined)}
                        className="flex flex-wrap justify-start gap-2"
                      >
                        {TIMELINES.map((t) => (
                          <ToggleGroupItem key={t} value={t} className={PILL}>
                            {t}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you trying to ship?<RequiredMark /></FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="A few sentences is plenty — what's the outcome, what's blocking it, and what does success look like?"
                        className="min-h-[160px] resize-none bg-muted/30 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col-reverse gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                We respond within one business day. Fields marked <span className="text-primary">*</span> are required.
              </p>
              <Button type="submit" size="lg" className="btn-glow group/btn h-12 px-8 w-full sm:w-auto">
                Send to a principal
                <ArrowUpRight className="ml-1 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ContactForm;
