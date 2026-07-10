import { useState } from "react";
import { Link } from "@/lib/link";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroWebmAsset from "@/assets/hero-loop-forward.webm.asset.json";
import heroMp4Asset from "@/assets/hero-loop-forward.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";

const heroWebm = heroWebmAsset.url;
const heroMp4 = heroMp4Asset.url;
const heroPoster = heroPosterAsset.url;

const HERO_FONT = '"Hanken Grotesk", system-ui, -apple-system, sans-serif';

export const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      className="relative w-full overflow-hidden min-h-[880px] sm:min-h-[820px] lg:min-h-[860px] xl:min-h-[900px]"
      style={{ background: "#FFFFFF", fontFamily: HERO_FONT }}
    >
      {/* Full-bleed background media */}
      <div className="absolute inset-0 z-0">
        {/* Looping background video on all viewports; keep device in frame on mobile/tablet */}
        <video
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[75%_center] lg:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
        >
          <source src={heroWebm} type="video/webm" />
          <source src={heroMp4} type="video/mp4" />
        </video>

        {/* Readability veil on mobile/tablet so dark copy on the left stays legible over the bright scene */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden bg-gradient-to-r from-white/85 via-white/55 to-transparent"
        />
      </div>




      {/* Copy column — left-aligned narrow column on mobile so the device stays visible; right-aligned on desktop */}
      <div className="site-container relative z-10 pt-28 pb-16 sm:pt-24 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-[720px] text-center lg:mx-0 lg:ml-[26%] lg:mr-auto lg:max-w-[600px] xl:ml-[30%] xl:max-w-[640px]">
          <h1
            className="mx-auto font-display font-bold text-foreground text-[3rem] sm:text-[3.5rem] lg:text-[4rem] max-w-[12ch] lg:max-w-none"
            style={{ lineHeight: 1.02, letterSpacing: "-0.02em" }}
          >
            Your Health.
            <br />
            <strong className="font-bold">Your Choice.</strong>
          </h1>

          <p
            className="mx-auto mt-16 sm:mt-5 font-display italic font-semibold text-heading-accent text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem] max-w-[22ch] sm:max-w-[46ch] lg:max-w-[42ch]"
            style={{ lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            Healthy diet. Active lifestyle. But true wellness starts with your indoor environment, where you spend 90% of your life.
          </p>


          <p
            className="mt-16 sm:mt-5 text-left sm:text-center lg:mx-auto lg:max-w-[640px] max-w-[14rem] sm:max-w-none text-foreground/85 font-medium text-[1.25rem] sm:text-[1.15rem] lg:text-[1.25rem]"
            style={{ lineHeight: 1.5 }}
          >
            Restore the natural balance of your indoor ecosystem.{" "}
            <br className="hidden sm:block" />
            Reduce harmful pathogens, mold, bacteria, and allergens{" "}
            <br className="hidden sm:block" />
            with Active Environmental Probiotics®.
          </p>

          <div className="mt-28 sm:mt-8 lg:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-start sm:justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-none">







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
