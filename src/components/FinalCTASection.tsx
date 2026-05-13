import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/tracking";

export const FinalCTASection = () => {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-card">
      <div className="relative py-12 sm:py-10 lg:py-12">
        <div className="container max-w-4xl mx-auto text-center">
          <ScrollReveal variant="fadeUp">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/70 mb-8">
              Get Started
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-display font-bold leading-[1.05] tracking-[-0.03em] text-foreground mb-6">
              A cleaner space,
              <br />
              on autopilot.
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
              Probiotics that work around the clock on every surface the air touches. Set it up once, then forget about it.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="flex justify-center items-center">
              <Button
                variant="hero"
                size="impact-lg"
                onClick={() => trackEvent("click_shop_devices_final")}
                asChild
              >
                <Link to="/shop">
                  Shop now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.4}>
            <p className="mt-10 text-sm text-muted-foreground/60">
              30-day risk-free trial · Free shipping on bundles · No commitment
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
