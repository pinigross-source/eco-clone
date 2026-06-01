import { Wind, Droplets, Leaf, Bed, PawPrint, AirVent, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import pillowImg from "@/assets/problem-pillow.avif";
import dogFurImg from "@/assets/problem-dogfur.avif";
import hvacImg from "@/assets/problem-hvac.avif";
import knitImg from "@/assets/problem-knit.avif";

const surfaces = [
  { img: pillowImg, label: "Soft, Delicate Surfaces", category: "Surface", note: "Pillows, bedding, upholstery", icon: Bed, stat: "62%", statNote: "Soft objects hold odor-generating germs that linger for a long duration." },
  { img: dogFurImg, label: "Pet Dander", category: "Airborne", note: "Fur, beds, shared corners", icon: PawPrint, stat: "24/7", statNote: "Continuous shedding settles into fabrics and carpets throughout the home." },
  { img: hvacImg, label: "HVAC Ducts", category: "Pathways", note: "Ducts and shared air paths", icon: AirVent, stat: "100%", statNote: "Air circulates between shared spaces easily, spreading microscopic debris." },
  { img: knitImg, label: "Sensitive Objects", category: "Intricacy", note: "Soft toys, electronics, keyboards", icon: Sparkles, stat: "48h", statNote: "Hidden grooves trap germs that conventional detergents simply cannot reach." },
];


const cards = [
  { title: "Air Purifiers", text: "Air filters trap the air they can suck. They do not reach contaminants that are not airborne. Settled on bedding, carpets, fabrics and other objects, including those in pets' areas.", coverage: "Air only", duration: "When running", icon: Wind, highlight: false },
  { title: "Detergents & Disinfecting Spray", text: "Evaporate quickly. Do not reach hidden places. Disallowed on delicate objects. Foster germ resistance.", coverage: "Spot treatment", duration: "Minutes", icon: Droplets, highlight: false },
  { title: "EnviroBiotics", text: "24/7 automated protection by healthy microbial restoration.", coverage: "Everything; Surfaces · Objects · Air", duration: "Continuous", icon: Leaf, highlight: true },
];


export const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 80% 0%, hsl(var(--primary) / 0.04), transparent 70%), radial-gradient(50% 40% at 0% 100%, hsl(var(--foreground) / 0.025), transparent 70%)",
        }}
      />

      <div className="relative container max-w-6xl mx-auto px-5 sm:px-6">
        <ScrollReveal variant="fadeUp" className="mb-16 lg:mb-24">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-8 bg-primary/60" />
                <p className="text-[10.5px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
                  The Difference
                </p>
              </div>
              <h2 className="font-display font-semibold text-foreground text-balance leading-[1.02] tracking-[-0.035em] text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem]">
                The problem was never the air.{" "}
                <em className="not-italic text-heading-accent">It's the surfaces.</em>
              </h2>

            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <span className="hidden lg:block h-px w-10 bg-foreground/15 mb-5" />
              <p className="text-base sm:text-[1.05rem] text-foreground/80 leading-[1.65] max-w-md">
                Air purifiers move air. Sprays mask odors. Both stop where the real problem lives on the surfaces and fabrics you touch every day. EnviroBiotics works there.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="relative max-w-5xl mx-auto rounded-[1.75rem] overflow-hidden bg-card/40 backdrop-blur-xl ring-1 ring-foreground/[0.04] shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.18)]">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/[0.05]">
              {cards.map(({ title, text, coverage, duration, icon: Icon, highlight }, idx) => (
                <div
                  key={title}
                  className={cn(
                    "relative p-7 sm:p-9 flex flex-col transition-colors duration-500",
                    highlight
                      ? "bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-transparent ring-1 ring-primary/30 md:scale-[1.03] md:-my-2 md:rounded-[1.5rem] md:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.35)] z-10"
                      : "opacity-90"
                  )}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-[0.18em] uppercase shadow-md">
                      Recommended
                    </span>
                  )}

                  <div className="flex items-center justify-between mb-7">
                    <span className={cn(
                      "text-[10px] font-semibold tracking-[0.3em] uppercase tabular-nums",
                      highlight ? "text-primary/80" : "text-foreground/50"
                    )}>
                      0{idx + 1}
                    </span>
                    <Icon className={cn("h-4 w-4", highlight ? "text-primary" : "text-foreground/60")} strokeWidth={1.5} />
                  </div>

                  <h3
                    className={cn(
                      "font-display tracking-[-0.022em] mb-3 leading-[1.1]",
                      highlight
                        ? "text-[1.7rem] sm:text-[1.9rem] font-semibold text-foreground"
                        : "text-[1.3rem] sm:text-[1.4rem] font-medium text-foreground/85"
                    )}
                  >
                    {title}
                  </h3>

                  <p
                    className={cn(
                      "text-[15.5px] sm:text-base leading-[1.65] mb-8",
                      highlight ? "text-foreground font-medium" : "text-foreground/75"
                    )}
                  >
                    {text}
                  </p>

                  <dl className="mt-auto space-y-3 pt-6 border-t border-foreground/[0.08]">
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
                        Coverage
                      </dt>
                      <dd className={cn("text-[13px] font-semibold text-right", highlight ? "text-primary" : "text-foreground/85")}>
                        {coverage}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-[10px] font-semibold tracking-[0.22em] uppercase text-foreground/60">
                        Duration
                      </dt>
                      <dd className={cn("text-[13px] font-semibold text-right inline-flex items-center gap-2", highlight ? "text-primary" : "text-foreground/85")}>
                        {duration}
                      </dd>

                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.15} className="mt-24 lg:mt-32">
          <div className="flex flex-col lg:flex-row justify-between items-baseline border-b border-foreground/[0.1] pb-12 lg:pb-16 mb-16 lg:mb-20 gap-10">
            <div className="max-w-2xl">
              <span className="block uppercase tracking-[0.3em] text-[10px] font-semibold text-foreground/40 mb-7">
                Where It Settles
              </span>
              <h3 className="font-display font-normal text-foreground leading-[1.05] tracking-[-0.025em] text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
                EnviroBiotics reach where{" "}
                <em className="italic font-normal text-heading-accent">no other product can.</em>
              </h3>
            </div>
            <div className="max-w-xs">
              <p className="text-sm leading-[1.7] text-foreground/55 font-light">
                Soft surfaces and shared rooms hold the allergens and odor-causing
                bacteria you actually live with. EnviroBiotics works exactly there.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-14 lg:gap-y-16"
          staggerDelay={0.08}
        >
          {surfaces.map((surface, idx) => {
            const isOffset = idx % 2 === 1;
            return (
              <StaggerItem key={surface.label} variant="fadeUp">
                <figure className={cn("flex flex-col h-full", isOffset && "lg:translate-y-10")}>
                  <div className="mb-8 overflow-hidden rounded-sm">
                    <img
                      src={surface.img}
                      alt={surface.label}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="space-y-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/40 font-semibold mb-2 block tabular-nums">
                        0{idx + 1}. {surface.category}
                      </span>
                      <h4 className="font-display text-[1.35rem] sm:text-[1.45rem] font-medium text-foreground tracking-[-0.015em] leading-tight">
                        {surface.label}
                      </h4>
                    </div>
                    <div className="pt-5 border-t border-foreground/[0.1]">
                      <div className="flex items-baseline mb-3">
                        <span className="font-display text-[2.5rem] sm:text-[2.75rem] font-light text-heading-accent tracking-[-0.02em] leading-none">
                          {surface.stat}
                        </span>
                      </div>
                      <p className="text-[13px] leading-[1.65] text-foreground/60 mb-4">
                        {surface.statNote}
                      </p>
                      <p className="text-[9.5px] uppercase tracking-[0.22em] text-foreground/40 font-medium">
                        {surface.note}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
