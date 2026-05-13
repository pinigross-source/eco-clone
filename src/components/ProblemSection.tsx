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
    <section id="problem" className="py-14 sm:py-20 lg:py-24 bg-background">
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

        {/* Where the difference shows up — 4 high-touch surfaces */}
        <div>
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
