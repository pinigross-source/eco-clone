import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/hero/ParticleField";
import heroBgAsset from "@/assets/hero-homepage-bg-v2.avif.asset.json";

const heroBg = heroBgAsset.url;

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
        imgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.0)`;
      }
      if (contentRef.current) {
        const fade = Math.max(0, 1 - y / 700);
        contentRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
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
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-start overflow-hidden bg-background">
      {/* Wide hero background */}
      <img
        ref={imgRef}
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-[112%] w-full object-cover will-change-transform"
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
        <div className="max-w-2xl text-left lg:max-w-[980px] lg:pl-40">
          <h1 className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-8 sm:mb-9 whitespace-nowrap">
            <span className="text-[2.6rem] sm:text-[3.3rem] md:text-[4rem]">
              Your Health.
            </span>{" "}
            <span className="text-[2.25rem] sm:text-[2.85rem] md:text-[3.55rem] text-heading-accent italic font-normal">
              Your Choice.
            </span>
          </h1>

          <p
            className="mb-7 text-[1.05rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[1.7] font-normal tracking-[0.005em]"
            style={{ color: "hsl(var(--foreground) / 0.9)" }}
          >
            You make every effort to stay healthy. You eat well and exercise often because you want to be at your best for yourself and for the people who depend on you.
          </p>

          <p
            className="mb-7 font-serif italic font-semibold leading-[1.2] tracking-[-0.015em] text-[2rem] sm:text-[2.55rem] md:text-[3rem]"
            style={{ color: "hsl(var(--primary))" }}
          >
            Now, you can add a new <br />
            layer of wellness <br />
            with zero extra effort.
          </p>

          <p
            className="mb-6 text-[1.05rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[1.7] font-normal tracking-[0.005em]"
            style={{ color: "hsl(var(--foreground) / 0.85)" }}
          >
            EnviroBiotics is a smart device that automatically disperses micro-droplets of environmental probiotics into your home or office. It effortlessly restores balance to your indoor spaces, improving your environment's health and protecting everyone under your roof: children, partners, and pets.
          </p>

          <p
            className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.55rem] leading-[1.45] font-medium tracking-[-0.005em]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Choosing EnviroBiotics is choosing health.
          </p>
        </div>
      </div>

      {/* Smooth transition into the next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-16 bg-gradient-to-t from-background/90 to-transparent" />
    </section>
  );
};
