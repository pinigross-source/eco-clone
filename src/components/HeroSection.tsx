import { useState, useEffect, useRef } from "react";
import { Link } from "@/lib/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  /** Video brightness multiplier (1 = normal). Default 1.6 */
  videoBrightness?: number;
  /** Video contrast multiplier (1 = normal). Default 1.05 */
  videoContrast?: number;
  /** Video saturation multiplier (1 = normal). Default 1.05 */
  videoSaturation?: number;
  /** Top overlay darkness (0-1). Default 0.02 (desktop) */
  overlayTopOpacity?: number;
  /** Bottom overlay darkness (0-1). Default 0.08 (desktop) */
  overlayBottomOpacity?: number;
}

export const HeroSection = ({
  videoBrightness = 1,
  videoContrast = 1,
  videoSaturation = 1,
  overlayTopOpacity = 0,
  overlayBottomOpacity = 0,
}: HeroSectionProps = {}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const post = (method: string, value?: unknown) => {
      iframe.contentWindow?.postMessage(JSON.stringify({ method, value }), "*");
    };
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "ready") {
          post("addEventListener", "play");
          post("addEventListener", "playing");
          post("addEventListener", "timeupdate");
          post("play");
        }
        if (data.event === "timeupdate" && typeof data.data?.seconds === "number" && data.data.seconds > 0.2) {
          setVideoLoaded(true);
        }
      } catch {}
    };
    window.addEventListener("message", onMessage);
    const onLoad = () => {
      // Kick off Vimeo player API handshake
      post("ping");
      post("addEventListener", "play");
      post("addEventListener", "playing");
      post("addEventListener", "timeupdate");
      post("play");
    };
    iframe.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section
      className="hero-dark-section relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-cover bg-center"
      style={{ backgroundColor: "#978276", backgroundImage: "url('/hero-vimeo-poster.jpg')" }}
    >
      <div className="absolute inset-0 z-0 bg-transparent" />

      <img
        src="/hero-vimeo-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      <div className="absolute inset-0 z-[2] overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1121439167?background=1&autoplay=1&loop=1&muted=1&playsinline=1&quality=auto&dnt=1&api=1"
          title="EnviroBiotics hero background"
          allow="autoplay; fullscreen; picture-in-picture"
          loading="eager"
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            border: "none",
            width: "max(100vw, 177.78vh)",
            height: "max(100vh, 56.25vw)",
            filter: `brightness(${videoBrightness}) contrast(${videoContrast}) saturate(${videoSaturation})`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[3] sm:hidden"
        style={{
          background: `linear-gradient(180deg, hsl(var(--foreground) / ${overlayTopOpacity + 0.02}) 0%, hsl(var(--foreground) / ${overlayBottomOpacity + 0.06}) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 z-[3] hidden sm:block"
        style={{
          background: `linear-gradient(180deg, hsl(var(--foreground) / ${overlayTopOpacity}) 0%, hsl(var(--foreground) / ${overlayBottomOpacity}) 100%)`,
        }}
      />

      {/* Top-right certifications strip */}
      <div
        className="absolute right-4 top-4 z-10 hidden text-[11px] font-bold uppercase tracking-[0.18em] sm:right-8 sm:top-6 sm:flex sm:items-center sm:gap-3"
        style={{
          color: "hsl(var(--primary-foreground))",
          textShadow: "0 2px 8px hsl(var(--foreground) / 0.9), 0 4px 16px hsl(var(--foreground) / 0.7)",
        }}
      >
        <span>EPA</span>
        <span className="opacity-50">·</span>
        <span>FDA GRAS</span>
        <span className="opacity-50">·</span>
        <span>MADE SAFE</span>
        <span className="opacity-50">·</span>
        <span>ISO</span>
      </div>

      <div className="container relative z-10 pb-12 pt-24 sm:pb-20 sm:pt-32 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7 text-left">


            <h1
              className="mb-5 font-display font-bold tracking-[-0.04em] text-[2.65rem] leading-[1.02] sm:mb-7 sm:text-[clamp(2.8rem,9.5vw,6.5rem)] sm:tracking-[-0.035em] sm:leading-[1.0]"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow:
                  "0 2px 8px hsl(var(--foreground) / 0.85), 0 4px 24px hsl(var(--foreground) / 0.7), 0 0 60px hsl(var(--foreground) / 0.5)",
              }}
            >
              <span className="block">The dust. The mold.</span>
              <span className="block">
                The smell that{" "}
                <span className="text-[hsl(24_95%_53%)]">won't leave.</span>
              </span>
            </h1>

            <p
              className="mb-8 max-w-[34rem] text-[1.05rem] font-medium leading-[1.55] sm:mb-10 sm:text-lg sm:leading-[1.6] lg:text-xl"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow:
                  "0 1px 2px hsl(var(--foreground) / 1), 0 2px 12px hsl(var(--foreground) / 0.95), 0 4px 24px hsl(var(--foreground) / 0.85), 0 0 60px hsl(var(--foreground) / 0.6)",
              }}
            >
              Air purifiers move air. Sprays mask odors. Our device releases living probiotics that break down the source on every high-touch surface a filter never reaches. 24 hours a day, every day.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="https://shop.envirobiotics.com/"
                target="_top"
                onClick={() => trackEvent("click_buy_now_hero")}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="impact-light"
                  size="impact-md"
                  className="h-[58px] w-full bg-[hsl(24_95%_53%)] px-7 text-base font-semibold text-white hover:bg-[hsl(24_95%_48%)] sm:h-16 sm:w-auto sm:px-10 sm:text-lg"
                >
                  Start your 30-day trial
                </Button>
              </a>

              <Link to="/how-it-works" onClick={() => trackEvent("click_see_how_it_works")} className="w-full sm:w-auto">
                <Button
                  variant="impact-light"
                  size="impact-md"
                  className="group h-[58px] w-full px-7 text-base font-semibold sm:h-16 sm:w-auto sm:px-10 sm:text-lg"
                >
                  See how it works
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right-side trust card */}
          <div className="lg:col-span-5 lg:pb-2">
            <div
              className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-6"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              <div className="flex items-center gap-3 border-b border-white/15 pb-4">
                <div className="flex items-center gap-0.5 text-[hsl(24_95%_53%)]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-sm opacity-80">· 12,400 reviews</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm sm:text-base">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[hsl(24_95%_53%)]" strokeWidth={3} />
                  <span>Safe for <span className="font-semibold">kids &amp; pets</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[hsl(24_95%_53%)]" strokeWidth={3} />
                  <span><span className="font-semibold">60-day</span> money-back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};
