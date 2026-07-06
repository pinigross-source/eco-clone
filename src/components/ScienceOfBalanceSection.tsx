import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import bgImage from "@/assets/let-nature-bg.avif.asset.json";

export const ScienceOfBalanceSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section
      aria-label="Let nature into your space"
      className="relative w-full overflow-hidden border-y border-foreground/10"
    >
      {/* Full-bleed background */}
      <img
        src={bgImage.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Readability wash — solid on mobile/tablet, right-fade on desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/85 lg:bg-gradient-to-r lg:from-background/90 lg:via-background/40 lg:via-40% lg:to-transparent lg:to-60%"
      />


      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col justify-center px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40 text-center lg:text-left items-center lg:items-start">
          <h2
            className="font-display font-bold text-balance text-foreground text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem]"
            style={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            The Science of{" "}
            <span className="italic font-light text-heading-accent">Balance.</span>
          </h2>
          <p
            className="mt-5 font-display italic font-light text-heading-accent max-w-[55ch] text-[1.5rem] sm:text-[2rem] lg:text-[2.35rem]"
            style={{ lineHeight: 1.2 }}
          >
            Environmental probiotics, intelligently dispersed.
          </p>
          <p
            className="mt-8 max-w-[55ch] text-foreground/80 text-[1.05rem] sm:text-[1.15rem]"
            style={{ lineHeight: 1.6 }}
          >
            When nature is invited in, allergies, fatigue, headaches, sleep disorders, low mood, and stubborn odors quietly fade.
          </p>

          <h3
            className="mt-10 font-display font-medium text-balance text-foreground text-[2rem] sm:text-[3rem] lg:text-[3.5rem]"
            style={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
          >
            Let Nature Back Indoors
          </h3>

          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
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
              className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-foreground hover:bg-foreground/5 transition-colors"
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
