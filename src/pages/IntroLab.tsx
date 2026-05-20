import { useState } from "react";
import Layout from "@layout/Layout";
import { Button } from "@/components/ui/button";
import IntroSplash from "@/components/shared/IntroSplash";
import { RotateCw } from "lucide-react";

const IntroLab = () => {
  const [playKey, setPlayKey] = useState(1);

  return (
    <Layout>
      <IntroSplash force playKey={playKey} />

      <div className="container-page pt-12 pb-6">
        <p className="eyebrow">Internal · Intro Lab</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-secondary tracking-tight">
          Intro Splash
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground font-light">
          First-load splash animation (~1.8s): gear spins, then the "TechD" wordmark slides in
          beside it. In production this plays only once per browser session. Use the button
          below to replay it here.
        </p>
      </div>

      <section className="border-t border-border">
        <div className="container-page py-10 flex flex-wrap items-center gap-4">
          <Button onClick={() => setPlayKey((k) => k + 1)} className="btn-glow">
            <RotateCw className="size-4" />
            Replay animation
          </Button>
          <span className="text-sm text-muted-foreground font-light">
            Plays #{playKey} · ignores sessionStorage in this lab only
          </span>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-10 space-y-4">
          <h2 className="text-xl font-bold text-secondary">Timeline</h2>
          <ul className="text-sm font-light text-muted-foreground space-y-1">
            <li>0.00s · gear fades in, scale 0.85 → 1.0 (250ms)</li>
            <li>0.10s · gear rotates 540° / 1.5 turns (1100ms)</li>
            <li>0.90s · gear slides left to make room (450ms)</li>
            <li>1.05s · "TechD" wordmark slides in from left (500ms)</li>
            <li>1.55s · cyan underline draws under wordmark (200ms)</li>
            <li>1.80s · overlay fades out (250ms)</li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Asset: <code className="bg-muted px-1.5 py-0.5 rounded">/apple-touch-icon.png</code>.
            Honors <code className="bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code>.
          </p>
        </div>
      </section>

      <div className="container-page py-16" />
    </Layout>
  );
};

export default IntroLab;
