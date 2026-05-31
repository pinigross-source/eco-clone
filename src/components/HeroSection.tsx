import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/hero/ParticleField";
import heroBg from "@/assets/hero-luxury-interior.avif";

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
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-background">
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "radial-gradient(55% 65% at 22% 50%, hsl(var(--background) / 0.7) 0%, transparent 70%)",
        }}
      />

      <ParticleField className="absolute inset-0 z-[3] h-full w-full" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32 will-change-transform"
      >
        <div className="max-w-3xl text-left lg:max-w-[640px]">

          <h1
            className="mb-7 font-sans font-bold tracking-[-0.04em] text-[2.25rem] leading-[1.05] sm:mb-9 sm:text-[clamp(2.5rem,5.5vw,4.25rem)] sm:leading-[1.02]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Sickness of our Indoor environments makes us sick.
          </h1>

          <ul
            className="mb-8 space-y-2 text-[1rem] font-semibold tracking-[-0.005em] sm:text-[1.15rem]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            <li>Allergies. Headaches. Depression. Sleeping Disorders. Fatigue.</li>
            <li>A weaker Immune system that struggles to protect.</li>
            <li className="font-normal" style={{ color: "hsl(var(--foreground) / 0.78)" }}>
              Air filters, detergents, UV radiation do little.
            </li>
            <li style={{ color: "hsl(var(--primary))" }}>You need EnviroBiotics.</li>
          </ul>

          <p
            className="mb-10 max-w-[58ch] text-[0.95rem] font-normal leading-[1.7] sm:mb-12 sm:text-[1.05rem] sm:leading-[1.65]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              Allergens cause more than Allergies.
            </span>{" "}
            Dust mites, pet dander, mold spores, pollen and odor-causing germs settle on the surfaces your air purifier cannot reach. EnviroBiotics Does.
          </p>

          <div className="flex flex-col items-start gap-6 sm:gap-7">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#find-my-solution"
                onClick={() => trackEvent("click_review_best_option")}
                className="w-full sm:w-auto"
              >
                <Button
                  size="impact-md"
                  className="group h-[60px] w-full rounded-full bg-foreground px-9 text-[13px] font-bold uppercase tracking-[0.18em] text-background shadow-[0_18px_50px_-18px_hsl(var(--foreground)/0.45)] hover:bg-foreground/90 sm:h-[64px] sm:w-auto sm:px-11 sm:text-[13px]"
                >
                  Build My Home Protection
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>

              <a
                href="/how-it-works"
                onClick={() => trackEvent("click_watch_how_it_works")}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="impact-md"
                  className="h-[60px] w-full rounded-full border-foreground/25 bg-transparent px-9 text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground/5 sm:h-[64px] sm:w-auto sm:px-11"
                >
                  Watch How It Works
                </Button>
              </a>
            </div>

            <ul
              className="flex flex-nowrap items-center gap-x-3 sm:gap-x-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.18em] whitespace-nowrap"
              style={{ color: "hsl(var(--foreground) / 0.65)" }}
            >
              <li>Safe for kids &amp; pets</li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li>EPA Registered</li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li>FDA GRAS</li>
              <li aria-hidden="true" className="h-3 w-px bg-foreground/20" />
              <li className="flex items-center gap-1.5">
                <span style={{ color: "hsl(var(--primary))" }}>4.8★</span>
                <span className="font-light opacity-85">Verified reviews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-16 bg-gradient-to-t from-background/90 to-transparent" />
    </section>
  );
};
