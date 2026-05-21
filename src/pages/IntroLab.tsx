import { useState } from "react";
import Layout from "@layout/Layout";
import { Button } from "@/components/ui/button";
import IntroSplash from "@/components/shared/IntroSplash";
import GearSpinInspector from "@/components/shared/GearSpinInspector";
import LockupAlignmentInspector from "@/components/shared/LockupAlignmentInspector";
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
          First-load splash animation (~5.1s): overlay fades in, gear spins, wordmark slides in,
          lockup holds, then gently dissolves. In production this plays only once per browser
          session. Use the button below to replay it here.
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-light text-muted-foreground border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 pr-6 font-normal text-secondary">Step</th>
                  <th className="pb-2 pr-6 font-normal text-secondary">Start</th>
                  <th className="pb-2 pr-6 font-normal text-secondary">End</th>
                  <th className="pb-2 font-normal text-secondary">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-2 pr-6">Gear fade-in (scale + opacity)</td><td className="py-2 pr-6">100ms</td><td className="py-2 pr-6">1100ms</td><td className="py-2">1000ms</td></tr>
                <tr><td className="py-2 pr-6">Gear spin (0°→720°)</td><td className="py-2 pr-6">384ms</td><td className="py-2 pr-6">1984ms</td><td className="py-2">1600ms</td></tr>
                <tr><td className="py-2 pr-6">Trail echoes peak</td><td className="py-2 pr-6">448ms</td><td className="py-2 pr-6">1984ms</td><td className="py-2">~1150ms</td></tr>
                <tr><td className="py-2 pr-6">Gear slides left</td><td className="py-2 pr-6">1984ms</td><td className="py-2 pr-6">2496ms</td><td className="py-2">512ms</td></tr>
                <tr><td className="py-2 pr-6">Wordmark slides in</td><td className="py-2 pr-6">2304ms</td><td className="py-2 pr-6">2560ms</td><td className="py-2">256ms</td></tr>
                <tr><td className="py-2 pr-6">Full lockup holds</td><td className="py-2 pr-6">2560ms</td><td className="py-2 pr-6">3560ms</td><td className="py-2">1000ms</td></tr>
                <tr className="font-normal"><td className="py-2 pr-6">Overlay dissolves out</td><td className="py-2 pr-6">3560ms</td><td className="py-2 pr-6">4560ms</td><td className="py-2">1000ms</td></tr>
                <tr className="border-t-2 border-border text-secondary"><td className="pt-3 pr-6 font-bold">Total</td><td className="pt-3 pr-6"></td><td className="pt-3 pr-6"></td><td className="pt-3 font-bold">4560ms</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">
            Asset: <code className="bg-muted px-1.5 py-0.5 rounded">/apple-touch-icon.png</code>.
            Honors <code className="bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code>.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-10 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-secondary">Frame-by-frame inspector</h2>
            <p className="mt-2 text-sm font-light text-muted-foreground max-w-2xl">
              The gear in isolation, paused. Drag the slider to scrub through the spin, or scan
              the strip below to see the whole rotation at a glance. The cyan crosshair marks
              the rotation pivot — if the gear appears to orbit it instead of rotate around it,
              the artwork isn't centered in its canvas.
            </p>
          </div>
          <GearSpinInspector />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-10 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-secondary">Lockup alignment</h2>
            <p className="mt-2 text-sm font-light text-muted-foreground max-w-2xl">
              Original <code className="bg-muted px-1.5 py-0.5 rounded">techd-logo.webp</code> next
              to the final gear + wordmark lockup. Tweak the sliders until the
              proportions match the original, then copy the snippet and paste
              it back to bake the values into <code className="bg-muted px-1.5 py-0.5 rounded">IntroSplash</code>.
            </p>
          </div>
          <LockupAlignmentInspector />
        </div>
      </section>

      <div className="container-page py-16" />
    </Layout>
  );
};

export default IntroLab;
