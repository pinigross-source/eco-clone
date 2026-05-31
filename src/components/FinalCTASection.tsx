import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
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

      <div className="relative py-20 sm:py-24 lg:py-28">
        <div className="container">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-3xl mx-auto rounded-[1.5rem] bg-background/70 backdrop-blur-sm ring-1 ring-foreground/5 p-7 sm:p-9 lg:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-8 sm:mb-10">
                Everywhere you live. Everything you touch.
                <br />
                <span className="text-heading-accent">Now actively protected.</span>
              </h2>

              <div className="pt-7 border-t border-foreground/10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-left">
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
