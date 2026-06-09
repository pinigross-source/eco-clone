import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/tracking";
import finalCtaFamily from "@/assets/find-solution-nature.avif";

export const FinalCTASection = () => {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src={finalCtaFamily}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Top/bottom edge fades to blend into the page */}
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
            <div className="relative max-w-2xl">
              <div aria-hidden className="absolute -inset-4 bg-primary/5 blur-3xl rounded-3xl -z-10" />

              <div className="relative overflow-hidden rounded-[2.5rem] bg-background/80 backdrop-blur-2xl border border-background/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 sm:p-12 lg:p-16">
                <div aria-hidden className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none">
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="45" stroke="hsl(var(--primary))" strokeWidth="2" />
                    <path d="M50 20C40 20 30 30 30 50C30 70 40 80 50 80C60 80 70 70 70 50C70 30 60 20 50 20Z" fill="hsl(var(--primary))" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-10 bg-primary/60" aria-hidden />
                  <span className="text-[11px] font-medium tracking-[0.32em] uppercase text-primary">
                    Risk-Free
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-[1.05] tracking-[-0.02em] mb-3">
                  Easy to return within 30 days for a full refund.
                </h2>
                <p className="text-2xl sm:text-3xl font-display italic font-light text-heading-accent mb-10">
                  No questions asked.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <Button
                    variant="hero"
                    size="impact-lg"
                    onClick={() => trackEvent("cta_click", { location: "final", label: "start_trial" })}
                    asChild
                    className="group bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.4)] transition-all duration-300 rounded-full"
                  >
                    <a
                      href="https://shop.envirobiotics.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="final_start_trial"
                    >
                      Start My Trial
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>

                  <div className="text-foreground/55 text-sm font-medium tracking-wide flex items-center gap-2">
                    <span>U.S. customers only</span>
                    <span className="w-1 h-1 bg-foreground/30 rounded-full" />
                    <span>Free returns</span>
                    <span className="w-1 h-1 bg-foreground/30 rounded-full" />
                    <span>5,000+ homes</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
