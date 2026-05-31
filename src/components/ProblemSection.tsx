import { Wind, Droplets, Leaf, Bed, PawPrint, AirVent, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import pillowImg from "@/assets/problem-pillow.avif";
import dogFurImg from "@/assets/problem-dogfur.avif";
import hvacImg from "@/assets/problem-hvac.avif";
import knitImg from "@/assets/problem-knit.avif";

const surfaces = [
  { img: pillowImg, label: "Soft Surfaces", note: "Pillows, bedding, upholstery", icon: Bed, stat: "62%", statNote: "of allergens settle in fabrics" },
  { img: dogFurImg, label: "Pet Dander", note: "Fur, beds, shared corners", icon: PawPrint, stat: "24/7", statNote: "continuous shedding" },
  { img: hvacImg, label: "Whole-Home", note: "Ducts and shared air paths", icon: AirVent, stat: "100%", statNote: "of rooms share the same air" },
  { img: knitImg, label: "Bacteria & Odor", note: "Textiles that hold smells", icon: Sparkles, stat: "48h", statNote: "odors linger in soft materials" },
];

const cards = [
  { title: "Air Purifiers", text: "Air filters trap the air they can suck. They do not reach contaminants that are not airborne — settled on bedding, carpets, fabrics and other objects, including those in pets' areas.", coverage: "Air only", duration: "When running", icon: Wind, highlight: false },
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
                Solving the Root Cause of{" "}
                <em className="not-italic text-heading-accent">Building Sickness.</em>
              </h2>

            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <span className="hidden lg:block h-px w-10 bg-foreground/15 mb-5" />
              <p className="text-base sm:text-[1.05rem] text-foreground/80 leading-[1.65] max-w-md">
                Air filters clean the air that passes through them. The allergens and
                odor-causing bacteria that bother you most are already settled, on
                bedding, carpets, furniture, and pet areas.
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
                        {highlight && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                        {duration}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.15} className="mt-20 lg:mt-28 mb-10 lg:mb-14">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary/60" />
                <p className="text-[10.5px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
                  Where it Settles
                </p>
              </div>
              <h3 className="font-display font-medium text-foreground tracking-[-0.025em] leading-[1.1] text-[1.9rem] sm:text-[2.25rem] lg:text-[2.75rem] max-w-3xl">
                The places filters{" "}
                <em className="not-italic text-heading-accent">can't reach.</em>
              </h3>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <span className="hidden lg:block h-px w-10 bg-foreground/15 mb-5" />
              <p className="text-[14px] sm:text-sm text-foreground/75 leading-[1.7] max-w-sm">
                Soft surfaces and shared rooms hold the allergens and odor-causing
                bacteria you actually live with. EnviroBiotics works exactly there.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer
          className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-7 lg:gap-x-8"
          staggerDelay={0.08}
        >
          {surfaces.map((surface, idx) => {
            const Icon = surface.icon;
            return (
              <StaggerItem key={surface.label} variant="fadeUp">
                <figure className="group relative flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-muted shadow-[0_20px_50px_-30px_hsl(var(--foreground)/0.35)]">
                    <img
                      src={surface.img}
                      alt={surface.label}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                      style={{ filter: "saturate(0.78) brightness(1.04) contrast(0.98) hue-rotate(-6deg)" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                      style={{ background: "linear-gradient(180deg, hsl(210 30% 96% / 0.35) 0%, hsl(210 20% 92% / 0.18) 100%)" }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(180deg, transparent 50%, hsl(0 0% 0% / 0.18) 78%, hsl(0 0% 0% / 0.55) 100%)" }}
                    />
                    <span className="absolute top-3.5 left-4 text-[10px] font-semibold tracking-[0.32em] uppercase text-white/90 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/85 backdrop-blur-md flex items-center justify-center ring-1 ring-foreground/[0.06] shadow-sm">
                      <Icon className="w-4 h-4 text-foreground/75" strokeWidth={1.5} />
                    </span>
                    <div className="absolute left-4 right-4 bottom-3.5">
                      <p className="font-display text-[1.05rem] sm:text-[1.15rem] font-semibold text-white tracking-[-0.01em] leading-tight">
                        {surface.label}
                      </p>
                    </div>
                  </div>

                  <figcaption className="pt-5 px-0.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-[1.4rem] sm:text-[1.55rem] font-semibold text-heading-accent tracking-[-0.02em] leading-none">
                        {surface.stat}
                      </span>
                      <span className="h-px flex-1 bg-foreground/[0.08] translate-y-[-0.15em]" />
                    </div>
                    <p className="mt-2.5 text-[12.5px] text-muted-foreground/85 leading-snug">
                      {surface.statNote}
                    </p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground/60 leading-snug">
                      {surface.note}
                    </p>
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
