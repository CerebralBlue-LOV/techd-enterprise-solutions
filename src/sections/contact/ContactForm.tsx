import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import GridBackdrop from "@shared/GridBackdrop";

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

const PILL =
  "h-10 px-4 rounded-md border border-border/70 bg-background/70 text-xs font-bold uppercase tracking-wider text-secondary ring-1 ring-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary data-[state=on]:ring-primary/30 data-[state=on]:shadow-[0_6px_20px_-10px_hsl(var(--primary)/0.7)] hover:border-primary hover:text-primary transition-all duration-200";

const FIELD_INPUT =
  "h-12 bg-background/70 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200";

const SECTION_EYEBROW =
  "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary";

const ContactForm = () => {
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
    <div
      className="group relative rounded-2xl border border-border bg-gradient-to-br from-background via-background to-muted/20 p-7 md:p-10 shadow-[0_1px_0_hsl(var(--border)),0_30px_60px_-32px_hsl(var(--primary)/0.3)] ring-1 ring-border/60 overflow-hidden transition-shadow duration-500 hover:shadow-[0_1px_0_hsl(var(--border)),0_36px_70px_-28px_hsl(var(--primary)/0.4)]"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <GridBackdrop tone="border" cellSize={56} opacity={0.55} mask="top" />

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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className={FIELD_INPUT} {...field} />
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
                        <Input
                          type="email"
                          placeholder="jane@company.com"
                          className={FIELD_INPUT}
                          {...field}
                        />
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
                        <Input placeholder="Acme Corp" className={FIELD_INPUT} {...field} />
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
                        <Input placeholder="VP Engineering" className={FIELD_INPUT} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                          <ToggleGroupItem key={a} value={a} className={PILL}>
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
                    <FormLabel className="text-muted-foreground font-normal">
                      Timeline{" "}
                      <span className="text-muted-foreground/60">(optional)</span>
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
                        className="min-h-[160px] resize-none bg-muted/30 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                We respond within one business day.
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
