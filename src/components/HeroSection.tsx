import { useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/hero/ParticleField";
import heroBg from "@/assets/hero-luxury-interior.avif";
import fdaGrasBadge from "@/assets/fda-gras-badge.jpg";

export const HeroSection = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.06)`;
      }
      if (contentRef.current) {
        const fade = Math.max(0, 1 - y / 700);
        contentRef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
        contentRef.current.style.opacity = `${fade}`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex min-h-[92dvh] w-full flex-col justify-center overflow-hidden bg-background">
      <img
        ref={imgRef}
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-[112%] w-full object-cover object-[100%_70%] will-change-transform"
        style={{ transform: "translate3d(0,0,0) scale(1.06)" }}
        loading="eager"
        fetchPriority="high"
        width={1920}
        height={1280}
      />

      <div
        className="absolute inset-0 z-[2] sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.55) 45%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] hidden sm:block lg:hidden"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.7) 30%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.96) 0%, hsl(var(--background) / 0.9) 32%, hsl(var(--background) / 0.55) 50%, transparent 68%)",
        }}
      />

      <ParticleField className="absolute inset-0 z-[3] h-full w-full" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 will-change-transform"
      >
        <div className="max-w-3xl text-left lg:max-w-[660px]">
          <h1
            className="mb-7 font-sans font-bold tracking-[-0.04em] text-[2.5rem] leading-[1.02] sm:mb-8 sm:text-[clamp(2.75rem,6vw,4.75rem)] sm:leading-[1]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Allergens cause more than allergies.
          </h1>

          <p
            className="mb-10 max-w-[54ch] text-[1rem] font-normal leading-[1.7] sm:mb-12 sm:text-[1.1rem] sm:leading-[1.6]"
            style={{ color: "hsl(var(--foreground) / 0.82)" }}
          >
            EnviroBiotics is a beneficial probiotic home system that works beyond the
            air — reaching the surfaces, fabrics, pet areas, and hidden spaces where
            allergens and unwanted microbes collect.{" "}
            <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              The same type of helpful microbe found in yogurt, soil, and the human gut.
            </span>
          </p>

          <div className="flex flex-col items-start gap-6 sm:gap-7">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#products"
                onClick={() => trackEvent("click_build_home_protection_hero")}
                className="w-full sm:w-auto"
              >
                <Button
                  size="impact-md"
                  className="group h-[60px] w-full rounded-full bg-foreground px-9 text-[13px] font-semibold uppercase tracking-[0.18em] text-background shadow-[0_18px_50px_-18px_hsl(var(--foreground)/0.45)] hover:bg-foreground/90 sm:h-[64px] sm:w-auto sm:px-11"
                >
                  Build my home protection
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>

              <a
                href="#video"
                onClick={() => trackEvent("click_watch_how_it_works_hero")}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="impact-md"
                  className="h-[60px] w-full rounded-full border-foreground/25 bg-transparent px-9 text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground/5 sm:h-[64px] sm:w-auto sm:px-11"
                >
                  Watch how it works
                </Button>
              </a>
            </div>

            <ul
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em]"
              style={{ color: "hsl(var(--foreground) / 0.7)" }}
            >
              <li className="flex items-center gap-1.5 font-bold text-foreground">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: "hsl(var(--primary))" }} />
                Safe for kids &amp; pets
              </li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li>EPA Registered</li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li className="flex items-center gap-1.5">
                <img
                  src={fdaGrasBadge}
                  alt="FDA GRAS"
                  width={20}
                  height={20}
                  className="h-5 w-5 rounded-full object-contain bg-background/80 p-0.5"
                  loading="eager"
                />
                FDA GRAS
              </li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li className="flex items-center gap-1">
                <span style={{ color: "hsl(var(--primary))" }}>4.8★</span>
                <span className="font-light opacity-85">reviews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-16 bg-gradient-to-t from-background/90 to-transparent" />
    </section>
  );
};
