import { useState } from "react";
import { Link } from "@/lib/link";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroMediaAsset from "@/assets/hero.gif.asset.json";

const heroMedia = heroMediaAsset.url;

const HERO_FONT = '"Hanken Grotesk", system-ui, -apple-system, sans-serif';

export const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      className="relative w-full overflow-hidden min-h-[640px] sm:min-h-[720px] lg:min-h-0"
      style={{ background: "#FFFFFF", fontFamily: HERO_FONT }}
    >
      {/* Full-bleed background media */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroMedia}
          alt="EnviroBiotics environmental probiotics in motion"
          className="h-full w-full object-cover object-[70%_center] sm:object-[65%_center] lg:object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Readability veil on mobile/tablet so copy stays legible over the GIF */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden bg-gradient-to-b from-white/70 via-white/55 to-white/75"
        />
      </div>


      {/* Copy column — right-aligned on desktop, centered on mobile */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-28 pb-20 sm:px-10 sm:pt-32 sm:pb-24 lg:px-16 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-[720px] text-center lg:mr-0 lg:ml-[35%]">
          <h1
            className="font-display font-bold text-balance text-foreground text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem]"
            style={{ lineHeight: 1.05, letterSpacing: "normal" }}
          >
            Your Health.
            <br />
            <strong className="font-bold">Your Choice.</strong>
          </h1>

          <p
            className="mt-6 font-display italic font-bold text-heading-accent text-balance text-[1.15rem] sm:text-[1.5rem] lg:text-[1.75rem]"
            style={{ lineHeight: 1.2 }}
          >
            Healthy diet. Active lifestyle.
            <br className="hidden sm:block" />
            But true wellness starts with your indoor environment,
            <br className="hidden sm:block" />
            where you spend 90% of your life.
          </p>

          <p
            className="mt-6 mx-auto max-w-[640px] text-muted-foreground text-[1.05rem] sm:text-[1.15rem] lg:text-[1.25rem]"
            style={{ lineHeight: 1.6 }}
          >
            Restore the natural balance of your indoor ecosystem.
            <br className="hidden sm:block" />
            Reduce harmful pathogens, mold, bacteria, and allergens
            <br className="hidden sm:block" />
            with Active Environmental Probiotics®.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">

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
