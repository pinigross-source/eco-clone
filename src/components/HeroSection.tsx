import { useState, useEffect, useRef } from "react";
import { Link } from "@/lib/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
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
          post("play");
        }
        if (data.event === "play" || data.event === "playing") {
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
      post("play");
    };
    iframe.addEventListener("load", onLoad);
    // Fallback: reveal after 1.5s even if events don't fire
    const fallback = setTimeout(() => setVideoLoaded(true), 1500);
    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="hero-dark-section relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 z-0 bg-foreground" />

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
            filter: "brightness(1.6) contrast(1.05) saturate(1.05)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 z-[3] sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--foreground) / 0.14) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3] hidden sm:block"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--foreground) / 0.02) 0%, hsl(var(--foreground) / 0.08) 100%)",
        }}
      />

      <div className="container relative z-10 pb-12 pt-24 sm:pb-20 sm:pt-32 lg:pb-24">
        <div className="max-w-3xl text-left">
          <h1
            className="mb-4 font-display font-bold tracking-[-0.04em] text-[2.65rem] leading-[1.05] sm:mb-8 sm:text-[clamp(2.8rem,9.5vw,6.5rem)] sm:tracking-[-0.03em] sm:leading-[1.02]"
            style={{
              color: "hsl(var(--primary-foreground))",
              textShadow: "0 2px 24px hsl(var(--foreground) / 0.35)",
            }}
          >
            <span className="block sm:inline">Every surface.</span>
            <span className="hidden sm:inline"> </span>
            <span className="block sm:inline">Every space.</span>
            <span className="block">Always clean.</span>
          </h1>

          <p
            className="mb-7 max-w-xl text-lg font-medium leading-snug sm:mb-10 sm:text-xl sm:leading-relaxed lg:text-2xl"
            style={{
              color: "hsl(var(--primary-foreground))",
              textShadow: "0 2px 18px hsl(var(--foreground) / 0.55)",
            }}
          >
            From mold, allergens, and odors, on every surface, object, and corner your air touches.
          </p>

          <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:gap-4">
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
                Buy now
              </Button>
            </a>
          </div>
        </div>
      </div>

      
    </section>
  );
};
