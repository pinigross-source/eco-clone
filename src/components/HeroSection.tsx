import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/hero/ParticleField";
import heroBgAsset from "@/assets/hero-desktop-family.avif.asset.json";
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
        contentRef.current.style.transform = "";
        contentRef.current.style.opacity = "";
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
      {/* DESKTOP: full above-the-fold background image */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[100dvh] overflow-hidden sm:block">
        <img
          ref={imgRef}
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-[112%] w-full object-cover will-change-transform"
          style={{ transform: "translate3d(0,0,0) scale(1.0)", objectPosition: "75% center" }}
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* MOBILE soft overlay */}
      <div
        className="absolute inset-0 z-[2] sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.65) 0%, hsl(var(--background) / 0.25) 55%, transparent 95%)",
        }}
      />

      {/* DESKTOP readability overlay — keep the LEFT side (where text sits) bright and readable, photo visible on the right */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] hidden h-[100dvh] sm:block lg:hidden"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.94) 0%, hsl(var(--background) / 0.82) 40%, hsl(var(--background) / 0.35) 65%, transparent 85%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] hidden h-[100dvh] lg:block"
        style={{
          background:
            "linear-gradient(95deg, hsl(var(--background) / 0.96) 0%, hsl(var(--background) / 0.9) 38%, hsl(var(--background) / 0.55) 55%, hsl(var(--background) / 0.1) 72%, transparent 85%)",
        }}
      />

      {/* Soft fade from image into the page background below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-[2] hidden h-40 sm:block"
        style={{
          top: "calc(100dvh - 10rem)",
          background:
            "linear-gradient(180deg, transparent 0%, hsl(var(--background) / 0.85) 70%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Cursor particle effect, contained inside hero */}
      <ParticleField className="pointer-events-none absolute inset-0 z-[3] h-full w-full bg-transparent" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1440px] px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-16 lg:pt-44 lg:pb-20 will-change-transform"
      >
        <div className="max-w-2xl text-center sm:ml-6 sm:max-w-[520px] sm:text-left md:ml-12 md:max-w-[560px] lg:ml-20 lg:max-w-[620px]">

          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.035em] text-foreground mb-4 sm:mb-5">
            <span className="block text-[2.8rem] xs:text-[3.2rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.75rem]">
              Your Health.
            </span>
            <span className="block text-[2.4rem] xs:text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[5rem] text-heading-accent italic font-normal leading-[1]">
              Your Choice.
            </span>
          </h1>

          <p
            className="mb-5 text-[1.15rem] leading-[1.6] sm:text-[1.25rem] sm:max-w-[480px] lg:text-[1.35rem]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            You make every effort to stay healthy. You eat well and exercise often because you want to be at your best for yourself and for the people who depend on you.
          </p>




          <img
            src={heroMobile}
            alt="Healthy lifestyle"
            className="mt-7 mb-7 block w-full rounded-2xl object-cover sm:hidden"
            loading="lazy"
          />

          {/* Below-the-fold continuation */}
          <div className="mt-10 mb-5 space-y-2 sm:mt-14 lg:mt-20">
            <h2 className="font-display font-bold leading-[1.05] tracking-[-0.025em] text-[2.2rem] text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
              Now, you can add a new layer of wellness.
            </h2>
            <p className="font-serif text-[1.45rem] italic leading-[1.2] text-foreground sm:text-[1.8rem]">
              With zero extra effort.
            </p>
          </div>

          <p
            className="mb-5 text-[1.05rem] leading-[1.7] sm:text-[1.125rem] lg:text-[1.2rem]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            EnviroBiotics is a smart device that automatically disperses micro-droplets of environmental probiotics into your home or office. It effortlessly restores balance to your indoor spaces, improving your environment's health and protecting everyone under your roof: children, partners, and pets.
          </p>

          <div
            className="mt-2 pt-4"
            style={{ borderTop: "1px solid hsl(var(--foreground) / 0.1)" }}
          >
            <h3 className="font-display text-[1.35rem] font-bold leading-tight text-foreground sm:text-[1.5rem]">
              Choosing EnviroBiotics is choosing health.
            </h3>
            <p
              className="mt-1 text-[1rem] leading-[1.6] sm:text-[1.05rem]"
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

