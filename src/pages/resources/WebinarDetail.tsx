import { useParams, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import ScrollToSectionLink from "@shared/ScrollToSectionLink";
import { Button } from "@ui/button";
import ibmLogoWhite from "@/assets/brand/ibm-logo-white.png";
import ResourcesFigure from "@shared/heroFigures/ResourcesFigure";
import PageHero from "@shared/page/PageHero";
import PageFinalCtaSection from "@shared/page/PageFinalCtaSection";
import NotFound from "@pages/NotFound";
import WebinarRegistrationForm from "@sections/resources/WebinarRegistrationForm";
import { RESOURCES } from "@content/resources";

const WebinarDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const webinar = RESOURCES.find(
    (r) => r.type === "webinars" && r.slug === slug && !r.draft,
  );

  if (!webinar) return <NotFound />;

  // An open registration keeps the visitor on techd.com, so it wins over an
  // external registrationUrl when a webinar somehow carries both.
  const registrationOpen = webinar.registrationOpen === true;

  const cta =
    !registrationOpen && webinar.registrationUrl
      ? {
          label: "Register",
          to: webinar.registrationUrl,
        }
      : undefined;

  return (
    <Layout>
      <SEO
        title={webinar.seoTitle ?? `${webinar.title} — TechD`}
        description={webinar.seoDescription ?? webinar.summary}
      />

      <PageHero
        pageLabel="Resources / Webinars"
        backLink={{ to: "/resources/webinars", label: "Webinars" }}
        eyebrow={
          <>
            <span className="inline-block h-px w-8 bg-primary" />
            <span>{webinar.date}</span>
            {webinar.products && webinar.products.length > 0 && (
              <>
                <span className="text-muted-foreground/60">·</span>
                <span>{webinar.products.join(" · ")}</span>
              </>
            )}
          </>
        }
        headline={webinar.title}
        lede={webinar.summary}
        figure={<ResourcesFigure />}
        minHeight="min-h-[55vh]"
        maxWidth="max-w-3xl"
        headlineSize="text-3xl md:text-4xl lg:text-5xl"
      />

      {/* Co-brand band. On a dark panel in both themes so the white partner
          logos read either way — DarkGlowPanel does not follow the theme.
          IBM is first and larger, NeuralSeek second and smaller: Fusion is the
          foundation, NeuralSeek the layer on it. TechD frames the page as host
          through the site header, not inside this lockup. */}
      {registrationOpen && (
        <section id="at-a-glance" className="section pt-0">
          <SectionMarker page="Resources / Webinars" name="At a glance" />
          <div className="container-page">
            <Reveal>
              <DarkGlowPanel intensity="soft">
                {/* `relative` matters: DarkGlowPanel's shimmer and blobs are
                    absolutely positioned and sit before {children} in the DOM,
                    so static content renders underneath them and the logos come
                    out washed. */}
                <div className="relative flex flex-col gap-8 px-8 pb-6 pt-10 md:flex-row md:items-center md:justify-between md:px-12">
                  <div>
                    {/* "Storage Fusion" is set as type above the 8-bar mark
                        because IBM's brand system has no separate product
                        logo — without it the lockup says "IBM" and the actual
                        subject of the session goes unnamed. */}
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
                      Storage Fusion
                    </p>

                    {/* IBM first and larger; NeuralSeek second and smaller,
                        always paired with it. */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <img
                        src={ibmLogoWhite}
                        alt="IBM"
                        className="h-9 w-auto md:h-10"
                      />
                      <span
                        aria-hidden="true"
                        className="h-8 w-px bg-white/20 md:h-9"
                      />
                      <img
                        src="/images/partners/neuralseek-white.png"
                        alt="NeuralSeek"
                        className="h-6 w-auto md:h-7"
                      />
                    </div>
                  </div>

                  <Button asChild size="lg" className="btn-glow shrink-0">
                    <ScrollToSectionLink sectionId="register" path={pathname}>
                      Register Now
                      <ArrowRight className="ml-1 size-4" />
                    </ScrollToSectionLink>
                  </Button>
                </div>

                <div className="relative px-8 pb-10 md:px-12">
                  <p className="text-sm font-light text-white/80">
                    {webinar.date} · free, 30-minute session · online
                  </p>
                </div>
              </DarkGlowPanel>
            </Reveal>
          </div>
        </section>
      )}

      {webinar.highlights && webinar.highlights.length > 0 && (
        <section id="what-youll-see" className="section">
          <SectionMarker page="Resources / Webinars" name="What you'll see" />
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-6 bg-primary/60" /> What you'll see
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl font-bold text-secondary leading-tight">
                What you'll see in this session.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-4 md:max-w-4xl md:grid-cols-2">
              {webinar.highlights.map((h) => (
                <Reveal key={h}>
                  <li className="flex h-full items-start gap-4 rounded-xl border border-border/70 bg-background/60 p-5 transition-colors duration-200 hover:border-primary/40">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-base font-light text-secondary/80 leading-relaxed">
                      {h}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {webinar.body && webinar.body.length > 0 && (
        <section id="body" className="section">
          <SectionMarker page="Resources / Webinars" name="Detail Body" />
          <div className="container-page">
            <Reveal>
              <div className="max-w-2xl space-y-6">
                {webinar.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg font-light text-secondary/80 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}


      {webinar.agenda && webinar.agenda.length > 0 && (
        <section id="agenda" className="section bg-muted/30">
          <SectionMarker page="Resources / Webinars" name="Agenda" />
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-6 bg-primary/60" /> Agenda
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl font-bold text-secondary leading-tight">
                Thirty minutes, start to finish.
              </h2>
            </Reveal>
            <ol className="mt-10 grid gap-4 md:max-w-3xl">
              {webinar.agenda.map((item, i) => (
                <Reveal key={item.title}>
                  <li className="flex items-start gap-5 rounded-xl border border-border/70 bg-background/60 p-5 transition-colors duration-200 hover:border-primary/40">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-sm font-bold text-primary"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-secondary">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-light text-secondary/70 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {webinar.audienceLede && (
        <section id="who-should-attend" className="section">
          <SectionMarker page="Resources / Webinars" name="Who should attend" />
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-6 bg-primary/60" /> Who it's for
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl font-bold text-secondary leading-tight">
                Built for regulated enterprise teams.
              </h2>
              <p className="mt-5 max-w-2xl text-base md:text-lg font-light text-secondary/80 leading-relaxed">
                {webinar.audienceLede}
              </p>
            </Reveal>

            {webinar.audienceTags && webinar.audienceTags.length > 0 && (
              <Reveal>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {webinar.audienceTags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-light text-secondary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {webinar.speakers && webinar.speakers.length > 0 && (
        <section id="speakers" className="section bg-muted/30">
          <SectionMarker page="Resources / Webinars" name="Speakers" />
          <div className="container-page">
            <Reveal>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-6 bg-primary/60" /> Featuring
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-secondary leading-tight">
                Your presenters.
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:max-w-3xl">
              {webinar.speakers.map((s) => (
                <Reveal key={s.name}>
                  <li className="h-full rounded-xl border border-border/70 bg-background/60 p-6 transition-colors duration-200 hover:border-primary/40">
                    <h3 className="text-lg font-bold text-secondary">{s.name}</h3>
                    {s.title && (
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                        {s.title}
                      </p>
                    )}
                    {s.bio && (
                      <p className="mt-3 text-sm font-light text-secondary/70 leading-relaxed">
                        {s.bio}
                      </p>
                    )}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal>
              <p className="mt-6 text-sm font-light text-muted-foreground">
                The IBM Fusion foundation section is presented by the IBM Fusion team.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {registrationOpen && (
        <section id="registration" className="section">
          <SectionMarker page="Resources / Webinars" name="Registration" />
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <Reveal>
                <div className="max-w-md lg:sticky lg:top-28">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    <span className="h-px w-6 bg-primary/60" /> Save your seat
                  </p>
                  <h2 className="mt-4 text-3xl md:text-4xl font-bold text-secondary leading-tight">
                    Register for this session.
                  </h2>
                  <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
                    {webinar.date} · 30 minutes · free.
                  </p>

                  {webinar.registrationLede && (
                    <p className="mt-5 text-base font-light text-secondary/80 leading-relaxed">
                      {webinar.registrationLede}
                    </p>
                  )}

                  {webinar.registrationNotes &&
                    webinar.registrationNotes.length > 0 && (
                      <>
                        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary/60">
                          What happens next
                        </p>
                        <ul className="mt-4 space-y-3 border-t border-border/60 pt-4">
                          {webinar.registrationNotes.map((n) => (
                            <li
                              key={n}
                              className="flex items-start gap-3 text-sm font-light text-secondary/70 leading-relaxed"
                            >
                              <ArrowRight className="mt-1 size-3.5 shrink-0 text-primary" />
                              {n}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                </div>
              </Reveal>

              <Reveal>
                <WebinarRegistrationForm
                  eventSlug={webinar.slug}
                  eventTitle={webinar.title}
                  whenLabel={webinar.date}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <PageFinalCtaSection
        pageLabel="Resources / Webinars"
        eyebrow={cta ? "Save your seat" : "Want it for your team?"}
        title={cta ? "Register for this session." : "Talk to an architect who's done it."}
        lede="Senior IBM-certified engineers, no slideware. Tell us where you are — we'll bring the right people to the first call."
        secondary={{ label: "More webinars", to: "/resources/webinars" }}
      />
    </Layout>
  );
};

export default WebinarDetail;
