import { useState } from "react";
import { Wind, Droplets, Leaf, Check, X, Play } from "lucide-react";
import comparisonVideoThumb from "@/assets/comparison-video-thumb.jpg";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const comparisons = [
  {
    title: "Air Purifiers",
    text: "Only treat air passing through filters",
    limitation: "Can't reach surfaces where pollutants live",
    icon: Wind,
    highlight: false,
  },
  {
    title: "Cleaning Sprays",
    text: "Work at the moment of application",
    limitation: "Re-contamination begins immediately after",
    icon: Droplets,
    highlight: false,
  },
  {
    title: "EnviroBiotics",
    text: "Treats surfaces where pollutants live and resurface",
    benefit: "Continuous balanced environment, harder for harmful microbes to dominate",
    icon: Leaf,
    highlight: true,
  },
];

const ComparisonVideo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <ScrollReveal variant="fadeUp" delay={0.4} className="mt-14 sm:mt-20 max-w-4xl mx-auto px-1 sm:px-0">
      <div
        className="group relative rounded-[1.5rem] sm:rounded-2xl overflow-hidden border border-border/60 aspect-[4/5] sm:aspect-video bg-foreground/5 cursor-pointer shadow-xl shadow-foreground/10 ring-1 ring-foreground/5"
        onClick={() => !playing && setPlaying(true)}
      >
        {playing ? (
          <iframe
            src="https://player.vimeo.com/video/1050657976?autoplay=1&title=0&byline=0&portrait=0&controls=1&sidedock=0"
            title="How EnviroBiotics works"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          />
        ) : (
          <>
            <img
              src={comparisonVideoThumb}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            {/* Gradient wash for premium feel + readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20 sm:from-black/40 sm:via-transparent sm:to-black/10" />
            {/* Mobile eyebrow chip */}
            <div className="sm:hidden absolute top-4 left-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground shadow-sm">
                Watch · 1 min
              </span>
            </div>
            {/* Glowing play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" aria-hidden="true" />
                <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-1 ring-white/60 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-foreground fill-foreground ml-1" />
                </div>
              </div>
            </div>
            {/* Bottom caption overlay (mobile only) */}
            <div className="sm:hidden absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70 mb-1.5">
                See It In Action
              </p>
              <p className="text-[17px] font-display font-bold text-white leading-tight tracking-[-0.01em]">
                How probiotics protect every surface.
              </p>
            </div>
          </>
        )}
      </div>
    </ScrollReveal>
  );
};

export const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-28 sm:py-36 lg:py-44 bg-background">
      <div className="container max-w-5xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-20">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            Why Probiotics
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
            Beyond filters
            <br />
            <span className="text-primary">and sprays.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {comparisons.map(({ title, text, limitation, benefit, icon: Icon, highlight }) => (
            <StaggerItem key={title} variant="fadeUp">
              <div
                className={cn(
                  "relative rounded-2xl p-7 sm:p-8 h-full text-center transition-all duration-300",
                  highlight
                    ? "bg-primary/6 border-2 border-primary/20"
                    : "bg-card border border-border/60"
                )}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground text-background rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Recommended
                  </div>
                )}

                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6",
                  highlight ? "bg-primary/12" : "bg-muted"
                )}>
                  <Icon className={cn("h-6 w-6", highlight ? "text-primary" : "text-muted-foreground")} />
                </div>

                <h3 className={cn(
                  "text-lg font-display font-bold mb-3",
                  highlight ? "text-primary" : "text-foreground"
                )}>
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground mb-6">{text}</p>

                <div className={cn(
                  "flex items-start gap-2 text-sm justify-center",
                  highlight ? "text-foreground" : "text-muted-foreground/70"
                )}>
                  {highlight ? (
                    <>
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                      <span className="font-medium text-left">{benefit}</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="text-left">{limitation}</span>
                    </>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Video introduction */}
        <ComparisonVideo />
        <p className="text-center text-sm text-muted-foreground/60 mt-6">
          Different mechanism · Different outcome
        </p>
      </div>
    </section>
  );
};
