import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/hero/ParticleField";
import heroBgAsset from "@/assets/hero-homepage-bg-v2.avif.asset.json";
import heroMobileAsset from "@/assets/hero-mobile-health.avif.asset.json";

const heroBg = heroBgAsset.url;
const heroMobile = heroMobileAsset.url;

export const HeroSection = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const isMobile = window.matchMedia("(max-width: 639px)");

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.0)`;
      }
      if (contentRef.current) {
        if (isMobile.matches) {
          contentRef.current.style.transform = "";
          contentRef.current.style.opacity = "";
        } else {
          const fade = Math.max(0, 1 - y / 700);
          contentRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
          contentRef.current.style.opacity = `${fade}`;
        }
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
    <section className="relative flex w-full flex-col justify-start overflow-hidden bg-background sm:min-h-[100dvh]">
      {/* Wide hero background - hidden on mobile */}
      <img
        ref={imgRef}
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden h-[112%] w-full object-cover will-change-transform sm:block"
        style={{ transform: "translate3d(0,0,0) scale(1.0)", objectPosition: "42% center" }}
        loading="eager"
        fetchPriority="high"
      />

      {/* Readability overlays — gentle so the photo stays visible */}
      <div
        className="absolute inset-0 z-[2] sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.65) 0%, hsl(var(--background) / 0.25) 55%, transparent 95%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] hidden sm:block lg:hidden"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.78) 0%, hsl(var(--background) / 0.35) 38%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.82) 0%, hsl(var(--background) / 0.5) 28%, hsl(var(--background) / 0.15) 50%, transparent 70%)",
        }}
      />

      {/* Cursor particle effect, contained inside hero */}
      <ParticleField className="pointer-events-none absolute inset-0 z-[3] h-full w-full bg-transparent" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1440px] px-5 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14 lg:px-12 lg:pt-14 lg:pb-16 will-change-transform"
      >
        <div className="max-w-2xl text-center sm:text-left lg:max-w-[980px] lg:pl-40">
          <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-8 sm:mb-9 text-center">
            <span className="text-[2.6rem] sm:text-[3.3rem] md:text-[4rem]">
              Your Health.
            </span>
            <br className="sm:hidden" />
            <span className="text-[2.25rem] sm:text-[2.85rem] md:text-[3.55rem] text-heading-accent italic font-normal">
              Your Choice.
            </span>
          </h1>

          <p
            className="mb-7 text-[1rem] leading-[1.7] sm:text-[1.0625rem]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            You make every effort to stay healthy. You eat well and exercise often because you want to be at your best for yourself and for the people who depend on you.
          </p>

          <img
            src={heroMobile}
            alt="Healthy lifestyle"
            className="mb-7 block w-full rounded-2xl object-cover sm:hidden"
            loading="lazy"
          />

          <div className="mb-7 space-y-2">
            <h2 className="font-display font-bold leading-[1.05] tracking-[-0.025em] text-[2rem] text-foreground sm:text-[2.5rem] lg:text-[3rem]">
              Now, you can add a new layer of wellness.
            </h2>
            <p className="font-serif text-[1.35rem] italic leading-[1.2] text-foreground sm:text-[1.65rem]">
              With zero extra effort.
            </p>
          </div>

          <p
            className="mb-6 text-[1rem] leading-[1.7] sm:text-[1.0625rem]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            EnviroBiotics is a smart device that automatically disperses micro-droplets of environmental probiotics into your home or office. It effortlessly restores balance to your indoor spaces, improving your environment's health and protecting everyone under your roof: children, partners, and pets.
          </p>

          <div
            className="mt-2 pt-6"
            style={{ borderTop: "1px solid hsl(var(--foreground) / 0.1)" }}
          >
            <h3 className="font-display text-[1.25rem] font-bold leading-tight text-foreground">
              Choosing EnviroBiotics is choosing health.
            </h3>
            <p
              className="mt-1 text-[0.95rem] leading-[1.6]"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              A simple choice, with daily benefits for everyone under your roof.
            </p>
          </div>
        </div>
      </div>

      {/* Smooth transition into the next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-16 bg-gradient-to-t from-background/90 to-transparent" />
    </section>
  );
};
