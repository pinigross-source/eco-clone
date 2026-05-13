import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";

const stats = [
  {
    value: "80%",
    text: "of indoor allergens live on surfaces, not floating in the air",
  },
  {
    value: "24/7",
    text: "mold, dust mites, and bacteria are active in your space",
  },
  {
    value: "0%",
    text: "of surfaces are reached by traditional air purifiers",
  },
];

export const ShiftSection = () => {
  return (
    <section id="shift" className="py-10 sm:py-10 lg:py-12 bg-card">
      <div className="container max-w-5xl mx-auto px-5 sm:px-6">
        <ScrollReveal variant="fadeUp">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70 text-center mb-4 sm:mb-6">
            The Reality
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <h2 className="text-[1.85rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.1] sm:leading-[1.06] tracking-[-0.03em] text-foreground text-center max-w-3xl mx-auto mb-12 sm:mb-20 text-balance px-2 sm:px-0">
            Your space looks clean.
            <br />
            What's living on your&nbsp;surfaces{" "}
            <span className="text-primary whitespace-nowrap">isn't.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-6 lg:gap-10"
          staggerDelay={0.12}
        >
          {stats.map(({ value, text }) => (
            <StaggerItem key={value} variant="fadeUp">
              {/* Mobile: premium card row. Desktop: centered stat */}
              <div className="flex items-center gap-5 rounded-2xl border border-border/60 bg-background/60 px-5 py-5 shadow-sm sm:block sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:text-center">
                <div className="text-[2.75rem] sm:text-5xl md:text-6xl font-display font-bold text-primary tracking-[-0.03em] leading-none flex-shrink-0 sm:mb-4">
                  {value}
                </div>
                <p className="text-[15px] sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed sm:max-w-xs sm:mx-auto text-left sm:text-center">
                  {text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
