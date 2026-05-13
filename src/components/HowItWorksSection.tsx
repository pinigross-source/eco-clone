import { SprayCan, Wind, ShieldCheck } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import livingRoomImage from "@/assets/how-it-works-living.avif";

const steps = [
  {
    icon: SprayCan,
    number: "01",
    title: "Releases",
    text: "EnviroBiotics shifts the paradigm from reactive cleaning to proactive biological protection: a 100% natural living probiotic layer that continuously suppresses harmful organisms on every surface, 24 hours a day.",
  },
  {
    icon: Wind,
    number: "02",
    title: "Travels",
    text: "Carried by air currents, probiotics settle on every surface they touch: furniture, flooring, desks, shared surfaces, walls, and the hidden crevices other solutions miss entirely.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Protects",
    text: "Through competitive exclusion, beneficial probiotics consume what harmful organisms need to survive, suppressing mold, dust mite allergens, pet dander, and odor-causing bacteria.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 lg:py-24 bg-card">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        {/* Editorial header + lifestyle visual */}
        <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-10 lg:gap-20 xl:gap-24 items-center mb-16 sm:mb-24 lg:mb-32">
          {/* Mobile-first eyebrow above image */}
          <ScrollReveal variant="fadeUp" className="lg:hidden -mb-6">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/70 text-center">
              How It Works
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp">
            <div className="relative aspect-[4/5] sm:aspect-square rounded-[1.75rem] sm:rounded-3xl overflow-hidden bg-muted shadow-xl shadow-foreground/5 ring-1 ring-border/40">
              <img
                src={livingRoomImage}
                alt="Probiotic mist gently dispersing through a calm modern living room"
                loading="lazy"
                width={1080}
                height={1350}
                className="w-full h-full object-cover object-left sm:object-center"
              />
              {/* Soft vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-foreground/0 to-transparent pointer-events-none sm:from-foreground/15" />
              {/* Floating caption chip - positioned far right */}
              <div className="absolute bottom-4 left-4 right-4 sm:top-8 sm:right-6 sm:bottom-auto sm:left-auto sm:max-w-xs">
                <div className="backdrop-blur-xl bg-background/85 border border-border/50 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-xl">
                  <p className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-primary mb-1.5 sm:mb-2">
                    Always on
                  </p>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    A living layer of protection, working quietly in the background.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="min-w-0">
              <p className="hidden lg:block text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
                How It Works
              </p>
              <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
                A living system.
                <br />
                <span className="inline-block lg:whitespace-nowrap text-[0.92em] sm:text-[0.88em] xl:text-[0.9em] text-primary">
                  Working while you do.
                </span>
              </h2>
              <p className="mt-5 sm:mt-8 text-[15px] sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                EnviroBiotics shifts the paradigm from reactive cleaning to proactive biological protection: a 100% natural living probiotic layer that continuously suppresses harmful organisms on every surface, 24 hours a day.
              </p>

              {/* Hero metric */}
              <div className="mt-8 sm:mt-12 border-t border-border/60 pt-6 sm:pt-8 flex items-center gap-5 sm:gap-6">
                <div className="text-[3.5rem] sm:text-7xl lg:text-8xl font-display font-bold text-primary tracking-[-0.04em] leading-none">
                  24<span className="text-foreground/20">/</span>7
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-1">
                    Always working
                  </p>
                  <p className="text-[13px] sm:text-base text-foreground leading-snug font-medium">
                    Continuous protection, even while you sleep.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Horizontal connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
          {/* Vertical connector line on mobile */}
          <div className="md:hidden absolute top-8 bottom-8 left-[31px] w-px bg-gradient-to-b from-transparent via-border to-transparent" aria-hidden="true" />

          <StaggerContainer className="grid md:grid-cols-3 gap-7 md:gap-8 lg:gap-12 relative" staggerDelay={0.15}>
            {steps.map(({ icon: Icon, number, title, text }, idx) => (
              <StaggerItem key={title} variant="fadeUp" className="h-full">
                <div className="flex md:block items-start gap-5 text-left md:text-left relative">
                  {/* Numbered node */}
                  <div className="relative inline-flex items-center justify-center mb-0 md:mb-8 flex-shrink-0">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-background border border-border flex items-center justify-center shadow-sm relative z-10">
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-7 h-7 md:w-9 md:h-9 rounded-full bg-primary text-primary-foreground text-[10px] md:text-xs font-bold flex items-center justify-center z-20 shadow-md">
                      {number}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-1 md:pt-0">
                    <h3 className="text-[1.25rem] md:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1.5 md:mb-4 tracking-[-0.02em] leading-tight">
                      {title}
                    </h3>
                    <p className="text-[14px] md:text-base text-muted-foreground leading-relaxed max-w-sm md:mx-0">
                      {text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
};
