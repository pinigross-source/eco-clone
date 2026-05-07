import { ReactNode } from "react";
import { Link } from "@/lib/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LifestyleHeroProps {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: ReactNode;
  subcopy: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export const LifestyleHero = ({
  image,
  imageAlt,
  eyebrow,
  title,
  subcopy,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: LifestyleHeroProps) => {
  const ctaContent = (
    <>
      {ctaLabel}
      <ArrowRight className="ml-2 h-4 w-4" />
    </>
  );

  return (
    <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
      <div className="relative min-h-[70vh] md:min-h-[82vh] w-full">
        {/* Full-bleed lifestyle image */}
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />

        {/* Soft dark gradient: concentrated behind text (bottom on mobile, left on desktop), photo stays bright elsewhere */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[70vh] md:min-h-[82vh] items-end md:items-center">
          <div className="container px-5 sm:px-6 pb-10 md:pb-0">
            <div className="max-w-2xl text-white" style={{ textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}>
              {eyebrow && (
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-white/90 mb-4 sm:mb-5">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5 sm:mb-6 !text-white">
                {title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-xl mb-7 sm:mb-9">
                {subcopy}
              </p>
              {onCtaClick ? (
                <Button variant="hero" size="lg" onClick={onCtaClick} className="rounded-full shadow-none hover:shadow-none transform-none hover:translate-y-0">
                  {ctaContent}
                </Button>
              ) : ctaHref ? (
                <Button variant="hero" size="lg" asChild className="rounded-full shadow-none hover:shadow-none transform-none hover:translate-y-0">
                  {ctaHref.startsWith("#") || ctaHref.startsWith("http") || ctaHref.startsWith("mailto:") || ctaHref.startsWith("tel:") ? (
                    <a href={ctaHref}>{ctaContent}</a>
                  ) : (
                    <Link to={ctaHref}>{ctaContent}</Link>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
