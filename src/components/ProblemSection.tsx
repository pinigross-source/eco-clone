import { X, Check } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import sofaImg from "@/assets/difference-kidsroom.jpg";
import beddingImg from "@/assets/difference-bedding.jpg";
import kitchenImg from "@/assets/difference-office-warm.jpg";
import bathroomImg from "@/assets/difference-petbed.jpg";

const surfaces = [
  { img: sofaImg, label: "Living spaces", sub: "Plush toys, rugs, and floor-level play" },
  { img: beddingImg, label: "Bedding & pillows", sub: "8 hours of skin contact, daily" },
  { img: kitchenImg, label: "The office", sub: "Keyboards, remotes, and daily-touch surfaces" },
  { img: bathroomImg, label: "Pet beds & blankets", sub: "Dander and fur build up fast" },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="py-28 sm:py-36 lg:py-44 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-16 lg:mb-24">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            The Difference
          </p>
          <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold leading-[1.08] sm:leading-[1.05] tracking-[-0.03em] text-foreground max-w-4xl mx-auto text-balance">
            Other solutions stop at the&nbsp;air.{" "}
            <span className="text-primary whitespace-nowrap">Ours goes further.</span>
          </h2>
          <p className="mt-8 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Air purifiers filter what passes through them. EnviroBiotics releases beneficial probiotics that travel through your air and colonize every surface: furniture, flooring, soft furnishings, shared surfaces, and the hidden crevices other solutions miss entirely.
          </p>
        </ScrollReveal>

        {/* Comparison cards — Sonos style */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-8 max-w-5xl mx-auto">
          {/* Other solutions */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="relative h-full rounded-3xl bg-muted/40 border border-border/60 p-8 sm:p-10 lg:p-12 overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
                  <X className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Air Purifiers
                </span>
              </div>
              <p className="text-xl sm:text-2xl lg:text-[1.6rem] font-display font-semibold leading-[1.25] tracking-[-0.01em] text-muted-foreground">
                Air purifiers only capture what passes through a filter.{" "}
                <span className="text-foreground/80">Surfaces stay untouched.</span>
              </p>
            </div>
          </ScrollReveal>

          {/* EnviroBiotics */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="relative h-full rounded-3xl bg-card border border-primary/30 p-8 sm:p-10 lg:p-12 overflow-hidden shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.18)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                    EnviroBiotics
                  </span>
                </div>
                <p className="text-xl sm:text-2xl lg:text-[1.6rem] font-display font-semibold leading-[1.25] tracking-[-0.01em] text-foreground">
                  EnviroBiotics reaches every surface, crack, and object your air touches{" "}
                  <span className="text-primary">continuously.</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Where the difference shows up — 4 high-touch surfaces */}
        <div className="mt-20 lg:mt-28">
          <ScrollReveal variant="fadeUp" className="text-center mb-10 lg:mb-14">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-4">
              Where the difference shows up
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-[1.15] tracking-[-0.02em] text-foreground max-w-2xl mx-auto">
              The high-touch surfaces a filter never reaches.
            </h3>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" staggerDelay={0.1}>
            {surfaces.map(({ img, label, sub }) => (
              <StaggerItem key={label} variant="fadeUp">
                <figure className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={img}
                      alt={label}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-4 px-1">
                    <div className="text-sm sm:text-base font-display font-semibold text-foreground">
                      {label}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-muted-foreground leading-snug">
                      {sub}
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
