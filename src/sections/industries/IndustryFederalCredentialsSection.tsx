import { Link } from "react-router-dom";
import { ShieldCheck, FileLock, Landmark, Award } from "lucide-react";

import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import DarkGlowPanel from "@shared/DarkGlowPanel";
import { Button } from "@ui/button";
import { type Industry } from "@content/industries";

interface Props {
  industry: Industry;
}

const FRAMEWORKS = [
  {
    icon: ShieldCheck,
    label: "FedRAMP",
    body: "Architectures designed against FedRAMP Moderate and High control baselines.",
  },
  {
    icon: FileLock,
    label: "FISMA",
    body: "NIST 800-53 control mapping and continuous-monitoring posture for agency ATOs.",
  },
  {
    icon: Landmark,
    label: "Section 508",
    body: "Accessible delivery aligned with federal procurement and accessibility requirements.",
  },
  {
    icon: Award,
    label: "IBM Platinum Partner",
    body: "Top-tier IBM partnership — watsonx, Cloud Pak, Guardium, and QRadar at federal scale.",
  },
];

export const IndustryFederalCredentialsSection = ({ industry }: Props) => {
  return (
    <section id="credentials" className="section scroll-mt-24 px-0">
      <SectionMarker page={`Industries / ${industry.name}`} name="Credentials" />
      <Reveal>
        <DarkGlowPanel intensity="soft" rounded="rounded-none">
          <div className="container-page relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 py-16 md:py-20 lg:py-24 items-start">
            {/* Left — copy */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="space-y-4">
                <p className="eyebrow text-primary">Federal posture</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight">
                  Federal engagements under NDA.
                </h2>
                <p className="text-base font-light text-white/65 leading-relaxed max-w-md">
                  We don't publish agency or program names. What we can share is
                  the compliance posture, partner credentials, and architectural
                  patterns we bring to every federal engagement.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="btn-glow">
                  <Link to="/contact">Talk to an expert</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
                >
                  <Link to="/services/advisory">Our delivery approach</Link>
                </Button>
              </div>
            </div>

            {/* Right — frameworks grid */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-white/15 p-6 md:p-8 grid sm:grid-cols-2 gap-px bg-white/10">
                {FRAMEWORKS.map(({ icon: Icon, label, body }) => (
                  <div
                    key={label}
                    className="bg-[hsl(var(--background))] p-5 md:p-6 flex flex-col gap-3"
                    style={{ background: "rgb(10 10 14)" }}
                  >
                    <Icon className="size-6 text-primary" aria-hidden />
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {label}
                    </h3>
                    <p className="text-sm font-light text-white/65 leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DarkGlowPanel>
      </Reveal>
    </section>
  );
};

export default IndustryFederalCredentialsSection;
