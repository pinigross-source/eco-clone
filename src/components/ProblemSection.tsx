import { Wind, Droplets, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import reachesImg from "@/assets/where-it-reaches-toys-keyboard.jpg";

const cards = [
  {
    title: "Air Purifiers",
    text: "Air filters trap the air they can suck in. They don't reach contaminants settled on bedding, carpets, fabrics, and other objects, including pet areas.",
    icon: Wind,
    highlight: false,
  },
  {
    title: "Detergents / Sprays",
    text: "Evaporate quickly. Don't reach hidden places. Disallowed on delicate objects. Foster germ resistance.",
    icon: Droplets,
    highlight: false,
  },
  {
    title: "EnviroBiotics",
    text: "24/7 automated protection by healthy microbial restoration.",
    icon: Leaf,
    highlight: true,
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden">
      <div className="relative container max-w-6xl mx-auto px-5 sm:px-6">
        {/* Comparison cards */}
        <ScrollReveal variant="fadeUp" className="mb-14 lg:mb-20">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16 items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display font-semibold text-foreground text-balance leading-[1.02] tracking-[-0.035em] text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem]">
                Where the problem{" "}
                <em className="not-italic text-heading-accent">actually lives.</em>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-base sm:text-[1.05rem] text-foreground/80 leading-[1.65] max-w-md">
                Air filters clean the air that passes through them. The allergens and
                odor-causing bacteria that bother you most are already settled — on
                bedding, carpets, furniture, and pet areas.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="relative max-w-5xl mx-auto rounded-[1.75rem] overflow-hidden bg-card/40 backdrop-blur-xl ring-1 ring-foreground/[0.04] shadow-[0_30px_80px_-40px_hsl(var(--foreground)/0.18)]">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/[0.05]">
              {cards.map(({ title, text, icon: Icon, highlight }, idx) => (
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
                      "font-display tracking-[-0.022em] mb-4 leading-[1.1]",
                      highlight
                        ? "text-[1.7rem] sm:text-[1.9rem] font-semibold text-foreground"
                        : "text-[1.3rem] sm:text-[1.4rem] font-medium text-foreground/85"
                    )}
                  >
                    {title}
                  </h3>

                  <p
                    className={cn(
                      "text-[15.5px] sm:text-base leading-[1.65]",
                      highlight ? "text-foreground font-medium" : "text-foreground/75"
                    )}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2} className="text-center mt-10">
          <p className="text-[12px] sm:text-sm font-semibold tracking-[0.22em] uppercase text-foreground/70">
            Everything: Surfaces. Objects. Air.
          </p>
        </ScrollReveal>

        {/* Where it Reaches */}
        <div className="mt-24 lg:mt-32 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollReveal variant="fadeUp">
            <h3 className="font-display font-semibold text-foreground tracking-[-0.025em] leading-[1.1] text-[1.85rem] sm:text-[2.25rem] lg:text-[2.75rem]">
              EnviroBiotics reaches and treats where no other product does —{" "}
              <span className="text-heading-accent">soft and delicate surfaces, pet dander, HVAC ducts, sensitive objects.</span>
            </h3>
            <ul className="mt-8 space-y-4 text-[15.5px] sm:text-base text-foreground/80 leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                Soft objects hold odor-generating bacteria that linger for long durations.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                Air circulates between shared spaces easily.
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_28px_70px_-30px_hsl(var(--foreground)/0.3)]">
              <img
                src={reachesImg}
                alt="Plush soft toys next to a PC keyboard on a desk"
                loading="lazy"
                decoding="async"
                width={1280}
                height={960}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
