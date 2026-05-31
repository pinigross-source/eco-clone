import { Button } from "@/components/ui/button";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { trackEvent } from "@/lib/tracking";

const promises = [
  { icon: RotateCcw, title: "30-day trial" },
  { icon: Truck, title: "Free returns" },
  { icon: ShieldCheck, title: "Backed by warranty" },
];

export const FinalCTASection = () => {
  return (
    <section id="final-cta" className="relative isolate overflow-hidden bg-background">
      <div className="relative py-24 sm:py-32 lg:py-40">
        <div className="container max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <ScrollReveal variant="fadeUp">
            <h2 className="font-display font-semibold text-foreground tracking-[-0.03em] leading-[1.05] text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] text-balance">
              Everywhere you live. Everything you touch.{" "}
              <span className="text-heading-accent">Now actively protected.</span>
            </h2>

            <div className="mt-10 flex justify-center">
              <Button
                size="impact-lg"
                onClick={() => trackEvent("click_build_home_protection_final")}
                asChild
                className="h-[64px] rounded-full bg-foreground text-background hover:bg-foreground/90 px-10 text-[13px] font-semibold uppercase tracking-[0.18em]"
              >
                <a href="#products">
                  Build my home protection
                  <ArrowRight className="ml-3 h-4 w-4" />
                </a>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {promises.map(({ icon: Icon, title }) => (
                <li key={title} className="flex items-center gap-2 text-[13px] font-medium text-foreground/80">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
                  </span>
                  {title}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
