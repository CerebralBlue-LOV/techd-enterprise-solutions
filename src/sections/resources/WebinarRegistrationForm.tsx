import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitWebinarRegistration } from "@/lib/webinar-submit";
import { WEBINAR_ENDPOINT_READY } from "@content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

/**
 * Webinar registration form. Same architecture as the contact form: RHF + zod,
 * submitting to a separate endpoint.
 *
 * Renders <FormMessage> where ContactForm does not, so a failed validation is
 * announced rather than only outlining the field.
 */

const INDUSTRIES = ["Healthcare", "Financial Services", "Other"] as const;

const schema = z
  .object({
    firstName: z.string().trim().min(1, "Required").max(100),
    lastName: z.string().trim().min(1, "Required").max(100),
    email: z.string().trim().email("Enter a valid work email").max(255),
    company: z.string().trim().min(1, "Required").max(120),
    jobTitle: z.string().trim().min(1, "Required").max(120),
    industry: z.enum(INDUSTRIES, { required_error: "Pick one" }),
    industryOther: z.string().trim().max(120).optional().or(z.literal("")),
    // Honeypot — hidden from real users; bots tend to fill every field.
    website: z.string().max(200).optional().or(z.literal("")),
  })
  // Picking "Other" and leaving the box empty tells us nothing, so require it
  // there and only there.
  .superRefine((v, ctx) => {
    if (v.industry === "Other" && !v.industryOther?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["industryOther"],
        message: "Tell us which industry",
      });
    }
  });

type FormValues = z.infer<typeof schema>;

const FIELD_INPUT =
  "h-12 bg-background/70 border-border/70 focus-visible:ring-primary/40 focus-visible:border-primary focus-visible:bg-background transition-all duration-200 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30";

const RequiredMark = () => (
  <span aria-hidden="true" className="ml-0.5 text-primary">*</span>
);

/**
 * One id per filled-in form, so a double-submit is recognised as the same
 * registration rather than a second one. The submit is fire-and-forget, so the
 * page can never confirm it worked — which is exactly when people press
 * Register again.
 */
const newSubmissionId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `fallback-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

type Props = {
  /** Slug of the event being registered for; sent with the payload. */
  eventSlug: string;
  /** Shown back to the registrant on the confirmation screen. */
  eventTitle: string;
  /** Human-readable date/time, e.g. "September 15, 2026 · 1:00 PM ET". */
  whenLabel: string;
};

const WebinarRegistrationForm = ({ eventSlug, eventTitle, whenLabel }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submissionIdRef = useRef<string>(newSubmissionId());

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      industry: undefined as unknown as FormValues["industry"],
      industryOther: "",
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

    if (!WEBINAR_ENDPOINT_READY) {
      // Better a visible error than a false "you're registered".
      setSubmitError(
        "Registration isn't open yet. Please try again shortly.",
      );
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitWebinarRegistration({
        ...values,
        // Someone can pick Other, type a value, then switch back — don't ship
        // the leftover.
        industryOther:
          values.industry === "Other" ? values.industryOther?.trim() : "",
        website: undefined,
        eventSlug,
        submissionId: submissionIdRef.current,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        page: typeof window !== "undefined" ? window.location.href : "",
      });
      setSubmitted(true);
    } catch (err) {
      console.error("[webinar] submit failed", err);
      setSubmitError(
        "We couldn't complete your registration. Please try again in a moment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="register"
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
            You're registered.
          </h2>
          <p className="mt-4 mx-auto max-w-md text-base font-light text-muted-foreground leading-relaxed">
            You're in for {eventTitle} on {whenLabel}. A confirmation email with
            your joining link is on its way — check your spam folder if it hasn't
            arrived in a few minutes.
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative z-10 grid gap-6"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name<RequiredMark /></FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="given-name"
                        placeholder="Jane"
                        className={FIELD_INPUT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name<RequiredMark /></FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="family-name"
                        placeholder="Doe"
                        className={FIELD_INPUT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work email<RequiredMark /></FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className={FIELD_INPUT}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company<RequiredMark /></FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="organization"
                        placeholder="Acme Health"
                        className={FIELD_INPUT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title<RequiredMark /></FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="organization-title"
                        placeholder="Director of IT Security"
                        className={FIELD_INPUT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry<RequiredMark /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={FIELD_INPUT}>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {INDUSTRIES.map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("industry") === "Other" && (
              <FormField
                control={form.control}
                name="industryOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which industry?<RequiredMark /></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Manufacturing, public sector, higher education…"
                        className={FIELD_INPUT}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Honeypot: off-screen and hidden from assistive tech, so only a
                bot fills it. `hidden` would let some bots skip it. */}
            <div
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            >
              <label htmlFor="webinar-website">Leave this field empty</label>
              <input
                id="webinar-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("website")}
              />
            </div>

            {submitError && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2.5 text-sm font-light text-destructive"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                {submitError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow h-12 px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Reserving your seat…
                  </>
                ) : (
                  "Register for the webinar"
                )}
              </Button>
              <p className="text-xs font-light text-muted-foreground">
                All fields required. We'll only email you about this session.
              </p>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default WebinarRegistrationForm;
