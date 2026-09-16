import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import bgImage from "@/assets/let-nature-bg.avif.asset.json";
import bgImageMobile from "@/assets/science-balance-mobile.webp.asset.json";

export const ScienceOfBalanceSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      aria-label="Let nature into your space"
      className="home-science-section relative w-full overflow-hidden border-y border-foreground/10"
    >
      {/* Full-bleed background — mobile */}
      <img
        src={bgImageMobile.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center lg:hidden"
      />
      {/* Full-bleed background — desktop */}
      <img
        src={bgImage.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover hidden lg:block"
      />
      {/* Readability wash — mobile only: very light so the device stays visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-transparent lg:hidden"
      />



      <div className="site-container relative grid grid-cols-1 lg:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col items-center justify-start px-1 pb-[390px] pt-14 text-center sm:justify-center sm:py-28 lg:items-start lg:py-36 lg:text-left">

          <h2
            className="font-display font-bold text-balance text-foreground text-[2.05rem] sm:text-[3.25rem] lg:text-[4rem] max-w-[14ch] lg:max-w-none"
            style={{ lineHeight: 1.08, letterSpacing: "-0.01em" }}
          >
            The Science of{" "}
            <span className="italic font-light text-heading-accent">Balance.</span>
          </h2>
          <p
            className="mt-3.5 sm:mt-5 font-display italic font-light text-heading-accent text-balance max-w-[24ch] lg:max-w-[55ch] text-[1.2rem] sm:text-[2rem] lg:text-[2.35rem]"
            style={{ lineHeight: 1.3 }}
          >
            Environmental probiotics, intelligently dispersed.
          </p>
          <p
            className="mt-4 sm:mt-6 max-w-[34ch] lg:max-w-[55ch] text-pretty text-foreground/80 text-[0.975rem] sm:text-[1.15rem]"
            style={{ lineHeight: 1.6 }}
          >
            When nature is invited in, allergies, fatigue, headaches, sleep disorders, low mood, and stubborn odors quietly fade.
          </p>

          <h3
            className="mt-6 sm:mt-8 font-display font-medium text-balance text-foreground text-[1.55rem] sm:text-[3rem] lg:text-[3.5rem] max-w-[20ch] lg:max-w-none"
            style={{ lineHeight: 1.12, letterSpacing: "-0.01em" }}
          >
            Let Nature Back Indoors
          </h3>


          <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-none">
            <a
              href="https://shop.envirobiotics.com/"
              target="_top"
              rel="noopener"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                minHeight: 48,
                boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
              }}
            >
              Choose Your System
            </a>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground/5"
              style={{ borderColor: "hsl(var(--foreground) / 0.2)", minHeight: 48 }}
            >
              <Play className="w-4 h-4" />
              Watch how it works
            </button>
          </div>
        </div>


        {/* Empty spacer to let the background image show on the right */}
        <div className="hidden lg:block" />
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="w-[95vw] max-w-4xl overflow-hidden rounded-lg border-none bg-foreground p-0 [&>button]:text-background">
          <DialogTitle className="sr-only">How EnviroBiotics works</DialogTitle>
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
