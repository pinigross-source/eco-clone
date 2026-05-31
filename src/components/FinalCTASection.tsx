import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/tracking";
import finalCtaFamily from "@/assets/find-solution-nature.avif";

const promises = [
  { icon: RotateCcw, title: "30-day trial", description: "Live with it in your space. If it isn't right, send it back." },
  { icon: Truck, title: "Free returns", description: "Prepaid return label. No restocking fees, no questions asked." },
  { icon: ShieldCheck, title: "Backed by warranty", description: "Every device covered, with support from real humans." },
];

export const FinalCTASection = () => {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden">
      <img
        src={finalCtaFamily}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background) / 0) 14%, hsl(var(--background) / 0) 86%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="relative py-24 sm:py-32 lg:py-40">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-xl rounded-[1.5rem] bg-background/55 backdrop-blur-sm ring-1 ring-foreground/5 p-7 sm:p-9 lg:p-10">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground/70 mb-6">
                Risk-Free
              </p>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-5">
                Try it in your space
                <br />
                <span className="text-heading-accent">for 30 days.</span>
              </h2>

              <p className="text-base sm:text-lg text-foreground/80 max-w-md mb-8 leading-relaxed">
                Plug it in, breathe it in. If it doesn't feel right for your space, return it within 30 days. No pressure, no commitment.
              </p>

              <div className="flex items-center">
                <Button
                  variant="hero"
                  size="impact-lg"
                  onClick={() => trackEvent("click_start_trial_final")}
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <a href="#solutions">
                    Start My Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>

              <p className="mt-5 text-[11px] sm:text-xs text-foreground/65 tracking-wide">
                U.S. customers only · Free returns
              </p>

              <div className="mt-8 pt-7 border-t border-foreground/10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                {promises.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex sm:block items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center sm:mb-3">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[14px] sm:text-[15px] font-semibold tracking-[-0.01em] text-foreground mb-0.5 sm:mb-1 leading-tight">
                        {title}
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] text-foreground/70 leading-snug">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
