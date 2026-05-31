import { SprayCan, Wind, ShieldCheck } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import livingRoomImage from "@/assets/how-it-works-living.avif";

const steps = [
  { icon: SprayCan, number: "01", title: "Release", text: "Good bacteria are released into your space." },
  { icon: Wind, number: "02", title: "Settle", text: "They land on surfaces throughout the room." },
  { icon: ShieldCheck, number: "03", title: "Keep working", text: "They help reduce buildup between regular cleanings." },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 sm:py-44 lg:py-56 bg-transparent">
      <div className="container max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-10 lg:gap-20 xl:gap-24 items-center mb-16 sm:mb-24 lg:mb-32">



          <ScrollReveal variant="fadeUp">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 sm:-inset-12 -z-10 rounded-[2.75rem] blur-3xl"
                style={{
                  background:
                    "radial-gradient(70% 60% at 50% 45%, hsl(40 30% 96% / 0.9) 0%, hsl(36 22% 90% / 0.55) 55%, transparent 85%)",
                  opacity: 0.85,
                }}
              />

              <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] shadow-[0_30px_70px_-30px_hsl(var(--foreground)/0.25)]">
                <img
                  src={livingRoomImage}
                  alt="EnviroBiotics device on a nursery dresser beside a sleeping baby in a crib"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover object-center"
                />


                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{ left: "82%", top: "78%", transform: "translate(-50%, -50%)" }}
                >
                  <span className="hiw-dispersion-ring" />
                  <span className="hiw-dispersion-ring hiw-dispersion-ring--2" />
                  <span className="hiw-dispersion-ring hiw-dispersion-ring--3" />
                  <span className="hiw-dispersion-core" />
                </div>

                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{ left: "82%", top: "78%", width: 1, height: 1 }}
                >
                  {Array.from({ length: 14 }).map((_, i) => {
                    const left = (i * 37) % 80 - 40;
                    const delay = (i * 0.7) % 6;
                    const dur = 6 + ((i * 1.3) % 5);
                    const size = 3 + (i % 3);
                    return (
                      <span
                        key={i}
                        className="hiw-micro-particle"
                        style={{
                          left: `${left}px`,
                          width: `${size}px`,
                          height: `${size}px`,
                          animationDelay: `${delay}s`,
                          animationDuration: `${dur}s`,
                        }}
                      />
                    );
                  })}
                </div>

              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="min-w-0">
              <h2 className="text-[2rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.1rem] 2xl:text-[3.8rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
                A living system.
                <br />
                <span className="inline-block lg:whitespace-nowrap text-[0.92em] sm:text-[0.88em] xl:text-[0.9em] text-heading-accent">
                  Working while you do.
                </span>
              </h2>
              <p className="mt-5 sm:mt-8 text-[15px] sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                EnviroBiotics releases beneficial probiotics into your indoor environment. They move through the air, settle on surfaces, and help reduce the allergens and bacteria that filters miss.
              </p>

              <div className="mt-8 sm:mt-12 border-t border-border/60 pt-6 sm:pt-8 flex items-center gap-5 sm:gap-6">
                <div className="text-[3.5rem] sm:text-7xl lg:text-8xl font-display font-bold text-heading-accent tracking-[-0.04em] leading-none">
                  24<span className="text-foreground/20">/</span>7
                </div>
                <div className="flex-1">
                  <p className="text-[13px] sm:text-base text-foreground leading-snug font-medium">
                    An Active, Quiet Device that protects us 24/7 even when we sleep.
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
          <div className="md:hidden absolute top-8 bottom-8 left-[31px] w-px bg-gradient-to-b from-transparent via-border to-transparent" aria-hidden="true" />

          <StaggerContainer className="grid md:grid-cols-3 gap-7 md:gap-8 lg:gap-12 relative" staggerDelay={0.15}>
            {steps.map(({ icon: Icon, number, title, text }) => (
              <StaggerItem key={title} variant="fadeUp" className="h-full">
                <div className="flex md:block items-start gap-5 text-left md:text-left relative">
                  <div className="relative inline-flex items-center justify-center mb-0 md:mb-8 flex-shrink-0">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-background/70 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_30px_-10px_hsl(var(--foreground)/0.15)] relative z-10">
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

        <ScrollReveal variant="fadeUp" delay={0.4} className="text-center mt-14 sm:mt-20">
          <p className="text-[12px] sm:text-sm text-muted-foreground/70 tracking-wide px-4">
            No chemicals · No spray · No ozone · Just good bacteria doing what they do in nature
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
