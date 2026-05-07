import { Home, Fan, Check, ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import roomLifestyle from "@/assets/mini-home-lifestyle.avif";
import hvacDevice from "@/assets/ebiotic-pro-lifestyle-v4.avif";

const solutions = [
  {
    title: "Room Solutions",
    subtitle: "For targeted, single-room protection",
    icon: Home,
    bullets: ["Bedrooms, offices, living spaces", "Portable and easy to place", "Ideal starting point"],
    buttonLabel: "Explore Room Solutions",
    href: "/solutions/room",
    featured: true,
    image: roomLifestyle,
    lifestyle: true,
  },
  {
    title: "HVAC Series",
    subtitle: "For whole-space coverage",
    icon: Fan,
    bullets: ["For any space with central air, home, office, or commercial building", "Professional installation", "Whole-space impact"],
    buttonLabel: "Learn About HVAC",
    href: "/hvac",
    featured: false,
    image: hvacDevice,
    lifestyle: true,
  },
];

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="py-28 sm:py-36 lg:py-44 bg-background">
      <div className="container max-w-5xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-20">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            Our Solutions
          </p>
          <h2 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.08] sm:leading-[1.06] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
            Solutions for
            <br />
            <span className="text-primary">real spaces.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Every space is shaped by the people in it, not lab conditions. Choose the approach that fits you.
          </p>
        </ScrollReveal>

        <StaggerContainer className="flex flex-col gap-8 max-w-5xl mx-auto" staggerDelay={0.2}>
          {solutions.map(({ title, subtitle, icon: Icon, bullets, buttonLabel, href, featured, image, lifestyle }, i) => (
            <StaggerItem key={title} variant="fadeUp">
              <div className="relative rounded-3xl overflow-hidden bg-card border border-border/60 shadow-sm">
                <div className="grid md:grid-cols-2 items-stretch gap-0">
                  <div className={`relative ${i === 1 ? "md:order-2" : ""} ${lifestyle ? "min-h-[320px] md:min-h-[460px]" : "flex justify-center items-center py-12 md:py-16 bg-muted/40"}`}>
                    {lifestyle ? (
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)" }}
                        />
                        <img
                          src={image}
                          alt={title}
                          width="360"
                          height="360"
                          loading="lazy"
                          decoding="async"
                          className="relative z-10 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
                        />
                      </>
                    )}
                  </div>

                  <div className={`relative z-10 px-8 pb-10 pt-10 md:px-12 md:py-14 ${i === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        featured ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {featured ? "Popular" : "Whole Space"}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>

                    <ul className="space-y-3 mb-10">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3">
                          <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={href}
                      className={`group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                        featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      {buttonLabel}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
