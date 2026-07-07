import { useState } from "react";
import { Link } from "@/lib/link";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroMediaAsset from "@/assets/hero.gif.asset.json";
import heroMobileAsset from "@/assets/science-balance-mobile.webp.asset.json";

const heroMedia = heroMediaAsset.url;
const heroMobile = heroMobileAsset.url;

const HERO_FONT = '"Hanken Grotesk", system-ui, -apple-system, sans-serif';

export const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      className="relative w-full overflow-hidden min-h-[720px] sm:min-h-[820px] lg:min-h-0"
      style={{ background: "#FFFFFF", fontFamily: HERO_FONT }}
    >
      {/* Full-bleed background media */}
      <div className="absolute inset-0 z-0">
        {/* Mobile / tablet: device-on-nightstand still */}
        <img
          src={heroMobile}
          alt="EnviroBiotics device on a bedside table"
          className="h-full w-full object-cover object-center lg:hidden"
          loading="eager"
          fetchPriority="high"
        />
        {/* Desktop: animated GIF */}
        <img
          src={heroMedia}
          alt="EnviroBiotics environmental probiotics in motion"
          className="hidden lg:block h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Readability veil on mobile/tablet: soft left-to-right wash so copy stays legible without hiding the device on the right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden bg-gradient-to-r from-white/75 via-white/45 to-transparent"
        />
      </div>


      {/* Copy column — left-aligned narrow column on mobile so the device stays visible; right-aligned on desktop */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-14 pb-[380px] sm:px-10 sm:pt-24 sm:pb-24 lg:px-16 lg:pt-40 lg:pb-32">
        <div className="max-w-[720px] text-left lg:mx-auto lg:mr-0 lg:ml-[35%] lg:text-center">
          <h1
            className="font-display font-bold text-balance text-foreground text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] max-w-[9ch] lg:max-w-none"
            style={{ lineHeight: 1.05, letterSpacing: "normal" }}
          >
            Your Health.
            <br />
            <strong className="font-bold">Your Choice.</strong>
          </h1>

          <p
            className="mt-6 font-display italic font-bold text-heading-accent text-balance text-[1.05rem] sm:text-[1.5rem] lg:text-[1.75rem] max-w-[22ch] lg:max-w-none"
            style={{ lineHeight: 1.25 }}
          >
            Healthy diet. Active lifestyle.
            <br className="hidden sm:block" />
            But true wellness starts with your indoor environment,
            <br className="hidden sm:block" />
            where you spend 90% of your life.
          </p>

          <p
            className="mt-6 max-w-[30ch] lg:mx-auto lg:max-w-[640px] text-muted-foreground text-[0.98rem] sm:text-[1.15rem] lg:text-[1.25rem]"
            style={{ lineHeight: 1.55 }}
          >
            Restore the natural balance of your indoor ecosystem.
            <br className="hidden sm:block" />
            Reduce harmful pathogens, mold, bacteria, and allergens
            <br className="hidden sm:block" />
            with Active Environmental Probiotics®.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start lg:justify-center gap-3 sm:gap-4 w-full max-w-[320px] sm:max-w-none">



            <a
              href="https://shop.envirobiotics.com/"
              target="_top"
              rel="noopener"
              className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "#1F2328",
                color: "#F4F0E7",
                fontWeight: 600,
                fontSize: "1.08rem",
                padding: "0.72em 0.72em 0.72em 1.4em",
                minHeight: 48,
                boxShadow: "0 12px 30px -12px rgba(31,35,40,0.55)",
              }}
            >
              Choose Your System
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: 32, height: 32, background: "rgba(244,240,231,0.18)" }}
              >
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/5"
              style={{
                borderColor: "rgba(31,35,40,0.25)",
                color: "#1F2328",
                fontWeight: 600,
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.85em 1.6em",
                minHeight: 48,
              }}
            >
              <Play className="w-4 h-4" />
              Watch how it works
            </button>
          </div>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:text-white [&>button]:hover:text-white/80">
          <div className="aspect-video w-full">
            {videoOpen && (
              <iframe
                src="https://player.vimeo.com/video/1198422138?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                title="How EnviroBiotics Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
