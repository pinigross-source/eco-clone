import { ScrollReveal } from "@/components/ui/scroll-reveal";
import babyImg from "@/assets/sleeping-baby.jpg";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 lg:py-40 bg-transparent">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="fadeUp">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="relative aspect-[3/4] rounded-[1.25rem] overflow-hidden bg-gradient-to-br from-muted to-background flex items-center justify-center p-6">
                <img
                  src={biologicMini}
                  alt="BioLogic Mini probiotic device"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-[1.25rem] overflow-hidden shadow-[0_20px_50px_-25px_hsl(var(--foreground)/0.3)]">
                <img
                  src={babyImg}
                  alt="A sleeping baby in a crib"
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={1280}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <h2 className="font-display font-semibold text-foreground tracking-[-0.03em] leading-[1.05] text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] text-balance">
              An active, quiet device{" "}
              <span className="text-heading-accent">that protects us 24/7, even when we sleep.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              EnviroBiotics releases beneficial probiotics into your indoor environment.
              They move through the air, settle on surfaces, and help reduce the
              allergens and odor-causing bacteria that filters miss.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
