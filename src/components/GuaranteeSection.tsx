import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import calmHomeImage from "@/assets/guarantee-calm-home.avif";

const promises = [
  {
    icon: RotateCcw,
    title: "30-day trial",
    description: "Live with it in your space. If it isn't right, send it back.",
  },
  {
    icon: Truck,
    title: "Free returns",
    description: "Prepaid return label. No restocking fees, no questions asked.",
  },
  {
    icon: ShieldCheck,
    title: "Backed by warranty",
    description: "Every device covered, with support from real humans.",
  },
];

export const GuaranteeSection = () => {
  return (
    <section id="guarantee" className="py-20 sm:py-32 lg:py-44 bg-card">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        {/* Editorial split: image + headline */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center mb-14 sm:mb-20 lg:mb-28">
          {/* Image with floating badge (mobile-premium) */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="relative rounded-[1.75rem] sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-foreground/5 aspect-[4/5]">
              <img
                src={calmHomeImage}
                alt="A calm sunlit home interior with a cozy armchair"
                className="w-full h-full object-cover"
                width="1080"
                height="1350"
                loading="lazy"
                decoding="async"
              />
              {/* Eyebrow chip on mobile, sitting on the image */}
              <div className="lg:hidden absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase text-primary shadow-sm border border-border/50">
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Risk-Free
                </span>
              </div>
              {/* Bottom gradient + glass guarantee badge for mobile/tablet */}
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent pointer-events-none" />
              <div className="lg:hidden absolute bottom-4 left-4 right-4">
                <div className="backdrop-blur-xl bg-background/85 border border-border/50 rounded-2xl px-5 py-4 shadow-xl flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary mb-0.5">
                      30-Day Trial
                    </p>
                    <p className="text-[13px] text-foreground leading-snug font-medium">
                      Love it or send it back, free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Headline + supporting copy */}
          <div>
            <ScrollReveal variant="fadeUp">
              <p className="hidden lg:block text-[11px] font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-8">
                Risk-Free
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.05}>
              <h2 className="font-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] sm:leading-[1.02] tracking-[-0.035em] text-foreground mb-5 sm:mb-8 text-balance text-center lg:text-left">
                Try it in&nbsp;your space
                <br />
                <span className="text-primary whitespace-nowrap">for 30 days.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.1}>
              <p className="text-[15px] sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-7 sm:mb-10 max-w-lg">
                Plug it in. If it doesn't feel right for your space, return it within 30 days. No pressure, no commitment.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.15}>
              <Button variant="hero" size="impact-lg" asChild className="w-full sm:w-auto">
                <a href="https://shop.envirobiotics.com/" target="_top">
                  Start My Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <p className="mt-5 sm:mt-6 text-[11px] sm:text-xs text-muted-foreground/70 tracking-wide text-center sm:text-left">
                U.S. customers only · Free returns
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Three promises */}
        <StaggerContainer
          className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-10 pt-10 sm:pt-16 border-t border-border/60"
          staggerDelay={0.1}
        >
          {promises.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              {/* Mobile: refined card row. Desktop: editorial column */}
              <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background/60 p-5 shadow-sm md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none">
                <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center md:mb-6">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.05rem] md:text-2xl font-semibold tracking-[-0.02em] text-foreground mb-1 md:mb-3 leading-tight">
                    {title}
                  </h3>
                  <p className="text-[13.5px] md:text-base text-muted-foreground leading-snug md:leading-relaxed font-light">
                    {description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
