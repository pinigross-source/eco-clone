import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import desktopHeroAsset from "@/assets/home-hero-static-desktop-3.avif.asset.json";
import mobileHeroAsset from "@/assets/home-hero-mobile-3.avif.asset.json";
import { trackEvent } from "@/lib/tracking";

export const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollToProducts = () => {
    trackEvent("homepage_cta_click", { placement: "hero_primary" });
    document.getElementById("find-your-system")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-background" aria-labelledby="home-hero-title">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted sm:aspect-[16/9] md:absolute md:inset-0 md:aspect-auto">
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileHeroAsset.url} type="image/avif" />
            <img
              src={desktopHeroAsset.url}
              alt="A mother, her daughter, and their dog in a bright living room, with an EnviroBiotics device on the side table."
              width="1672"
              height="941"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center md:object-[center_center]"
            />
          </picture>
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-background via-background/85 via-40% to-transparent md:block" />
        </div>

        <div className="site-container relative z-10 py-8 sm:py-10 md:flex md:min-h-[760px] md:items-center md:py-24 lg:min-h-[820px]">
          <div className="max-w-xl md:w-[48%]">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Beyond air filtration</p>
            <h1 id="home-hero-title" className="max-w-[18ch] font-display text-[2.35rem] font-bold leading-[1.08] text-foreground sm:text-[3rem] lg:text-[4rem]">
              You take probiotics. Your home doesn’t.
            </h1>
            <p className="mt-5 max-w-[42ch] text-base leading-7 text-muted-foreground sm:text-lg">
              Probiotic purification designed for the air, surfaces, and objects throughout your room.&nbsp;
            </p>
            <div className="mt-6 max-w-md rounded-lg bg-muted/85 px-4 py-3 text-sm leading-6 text-foreground backdrop-blur-sm sm:text-base">
              <strong className="block">Kits from $98.</strong>
              <span className="block">Device plus first cartridge. No subscription required.</span>
            </div>
            <div className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
              <Button type="button" size="lg" onClick={scrollToProducts} className="min-h-12 flex-1 rounded-full text-base">
                Find My System
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => {
                  setVideoOpen(true);
                  trackEvent("click_see_how_it_works_video", { placement: "hero" });
                }}
                className="min-h-12 flex-1 rounded-full text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <Play className="size-4" aria-hidden="true" />
                Watch how it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="w-[95vw] max-w-4xl overflow-hidden rounded-lg border-none bg-foreground p-0 [&>button]:text-background">
          <div className="aspect-video w-full">
            {videoOpen ? (
              <iframe
                src="https://player.vimeo.com/video/1198422138?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                title="How EnviroBiotics Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
