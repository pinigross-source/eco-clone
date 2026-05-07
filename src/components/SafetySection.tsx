import { ShieldCheck, Users, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const safetyPoints = [
  { icon: ShieldCheck, text: "No filters to replace" },
  { icon: Users, text: "No noise, no chemical sprays" },
  { icon: Heart, text: "Fits naturally into any daily routine." },
];

const stats = [
  { value: "3M+", label: "Spaces protected" },
  { value: "15+", label: "Years of research" },
  { value: "99.9%", label: "Satisfaction" },
];

export const SafetySection = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const iframe = videoRef.current;
    if (!iframe) return;
    const send = (method: string, value?: unknown) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ method, value }), "*");
    };
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "ready") {
          send("addEventListener", "play");
          send("addEventListener", "playing");
          send("setPlaybackRate", 0.08);
          send("play");
        }
        if (data.event === "play" || data.event === "playing") {
          setVideoLoaded(true);
        }
      } catch {}
    };
    window.addEventListener("message", onMessage);
    const fallback = setTimeout(() => setVideoLoaded(true), 2500);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(fallback);
    };
  }, []);
  return (
    <section id="safety" className="py-20 sm:py-32 lg:py-44 bg-background">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Right image (mobile-first order) */}
          <ScrollReveal variant="fadeRight" delay={0.2} className="order-first lg:order-last">
            <div className="relative rounded-[1.75rem] sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-foreground/5 bg-foreground/5">
              <div className="relative w-full aspect-[3/4]">
                <iframe
                  ref={videoRef}
                  src="https://player.vimeo.com/video/1187060240?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1&api=1"
                  className="absolute inset-0 w-full h-full block"
                  style={{ filter: "brightness(1.7) contrast(1.02) saturate(1.08)" }}
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Safety & Science"
                  loading="lazy"
                />
              </div>
              {/* Mobile: glass eyebrow chip */}
              <div className="lg:hidden absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase text-primary shadow-sm border border-border/50">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Safety & Science
                </span>
              </div>
              {/* Mobile: bottom gradient + certification strip */}
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent pointer-events-none" />
              <div className="lg:hidden absolute bottom-4 left-4 right-4">
                <div className="backdrop-blur-xl bg-background/85 border border-border/50 rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-[13px] text-foreground leading-snug font-medium">
                    Independently verified non-toxic for people and pets.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Left content */}
          <div>
            <ScrollReveal variant="fadeUp">
              <p className="hidden lg:block text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
                Safety & Science
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.05}>
              <h2 className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] sm:leading-[1.02] tracking-[-0.035em] text-foreground mb-6 sm:mb-10 text-balance text-center lg:text-left">
                Safe for every&nbsp;space,
                <br />
                <span className="text-primary whitespace-nowrap">every day.</span>
              </h2>
            </ScrollReveal>

            <StaggerContainer className="flex flex-col gap-2.5 sm:gap-4 mb-7 sm:mb-10" staggerDelay={0.1}>
              {safetyPoints.map(({ icon: Icon, text }) => (
                <StaggerItem key={text}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 px-4 py-3.5 shadow-sm sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:gap-5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={2} />
                    </div>
                    <span className="text-[14px] sm:text-base text-foreground font-medium leading-snug">{text}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <ScrollReveal variant="fadeUp" delay={0.4}>
              <p className="text-[14px] sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12 max-w-md font-light">
                Works quietly in the background without disrupting your daily routine or increasing your electricity bill.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.5}>
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-7 sm:pt-10 border-t border-border/60">
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-left">
                    <p className="font-display text-[1.65rem] sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-primary leading-none">
                      {value}
                    </p>
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-muted-foreground leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
