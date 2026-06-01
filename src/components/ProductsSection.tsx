import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/shop/biotica-800.png";
import hvacHomeAsset from "@/assets/hvac-home.avif.asset.json";

const hvacHome = hvacHomeAsset.url;


const roomOptions = [
  {
    spaceLabel: "A single room",
    sqft: "Up to 300 sq ft",
    spaceDescription: "Bedroom, nursery, or home office.",
    product: "BioLogic Mini",
    productNote: "Compact and fully portable. Plug it in anywhere — and pack it when you travel.",
    image: biologicMini,
    href: "/product/biologic-mini",
    badge: "Portable",
  },
  {
    spaceLabel: "A larger living space",
    sqft: "300–800 sq ft",
    spaceDescription: "Living rooms and open-plan areas where life happens.",
    product: "Biotica 800",
    productNote: "Set-and-forget coverage for the spaces you spend the most time in.",
    image: biotica800,
    href: "/product/biotica-800",
    badge: "Whole-room",
  },
];

const hvacOption = {
  spaceLabel: "Your whole home",
  sqft: "Every room, from one device",
  spaceDescription:
    "Connects directly to your home's HVAC system, so your probiotics travel everywhere the air does. Completely hands-off.",
  product: "E-Biotic",
  productNote: "Integrated probiotic coverage for the entire home, refilled on schedule.",
  image: hvacHome,
  href: "/product/ebiotic-pro",
};


export const ProductsSection = () => {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        {/* Eyebrow + heading */}
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-10 bg-foreground/20" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
            Find your system
          </p>
        </div>

        <div className="max-w-3xl mb-14 sm:mb-20">
          <h2 className="text-[2.25rem] sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.02] tracking-[-0.035em] text-balance">
            One probiotic formula.
            <br />
            <span className="text-heading-accent italic font-normal">Sized to your space.</span>
          </h2>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The same proven probiotics power every device. Just pick the space you want to balance —
            we'll match you with the right one and keep it refilled automatically.
          </p>
        </div>

        {/* SECTION 1 — Room-by-room */}
        <div className="mb-20 sm:mb-28">
          <div className="flex items-baseline justify-between gap-6 mb-8 sm:mb-10 pb-5 border-b border-border/60">
            <div className="flex items-baseline gap-4 sm:gap-5">
              <span className="font-display text-sm sm:text-base font-semibold text-muted-foreground/70 tabular-nums">
                01
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                For a room you live in
              </h3>
            </div>
            <span className="hidden sm:inline text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/60">
              Portable · Plug-in
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {roomOptions.map((option) => (
              <Link
                key={option.product}
                to={option.href}
                className="group relative flex flex-col rounded-[24px] bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.25)] hover:border-foreground/30"
              >
                <div className="relative aspect-[5/4] bg-gradient-to-br from-secondary/60 to-secondary/20 overflow-hidden flex items-center justify-center">
                  <img
                    src={option.image}
                    alt={option.product}
                    className="w-full h-full object-contain p-10 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-background/95 backdrop-blur-sm text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground border border-border/50">
                    {option.badge}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-7 sm:p-8">
                  <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70 mb-3">
                    {option.sqft}
                  </p>
                  <h4 className="font-display text-2xl sm:text-[1.75rem] font-bold text-foreground tracking-tight leading-[1.1] mb-3">
                    {option.spaceLabel}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {option.spaceDescription}
                  </p>

                  <div className="mt-auto pt-5 border-t border-border/60">
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/60 mb-1.5">
                      Paired with
                    </p>
                    <p className="font-display text-lg font-semibold text-foreground tracking-tight mb-2">
                      {option.product}
                    </p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
                      {option.productNote}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground/30 group-hover:border-foreground pb-1 w-fit transition-colors">
                      Choose this space
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SECTION 2 — Whole home / HVAC */}
        <div>
          <div className="flex items-baseline justify-between gap-6 mb-8 sm:mb-10 pb-5 border-b border-border/60">
            <div className="flex items-baseline gap-4 sm:gap-5">
              <span className="font-display text-sm sm:text-base font-semibold text-muted-foreground/70 tabular-nums">
                02
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                For your entire home
              </h3>
            </div>
            <span className="hidden sm:inline text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/60">
              HVAC · Hands-off
            </span>
          </div>

          <Link
            to={hvacOption.href}
            className="group relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] rounded-[28px] overflow-hidden bg-foreground text-background border border-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_80px_-30px_hsl(var(--foreground)/0.45)]"
          >
            <div className="relative aspect-[5/4] lg:aspect-auto bg-gradient-to-br from-background/10 via-background/5 to-transparent overflow-hidden flex items-center justify-center order-last lg:order-first">
              <img
                src={hvacOption.image}
                alt={hvacOption.product}
                className="w-full h-full object-contain p-10 sm:p-14 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute top-5 left-5 inline-flex items-center px-3 py-1 rounded-full bg-background/15 backdrop-blur-md text-[10px] font-semibold tracking-[0.18em] uppercase text-background border border-background/20">
                Whole-home
              </span>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase text-background/60 mb-5">
                {hvacOption.sqft}
              </p>
              <h4 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-[-0.02em] leading-[1.05] mb-6 text-balance">
                {hvacOption.spaceLabel}
                <span className="block italic font-normal text-background/70 text-2xl sm:text-3xl md:text-[2rem] mt-2">
                  Every room, all at once.
                </span>
              </h4>
              <p className="text-base sm:text-lg text-background/75 leading-relaxed mb-8 max-w-md">
                {hvacOption.spaceDescription}
              </p>

              <div className="pt-6 border-t border-background/15">
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-background/55 mb-1.5">
                  Paired with
                </p>
                <p className="font-display text-xl font-semibold tracking-tight mb-2">
                  {hvacOption.product}
                </p>
                <p className="text-sm text-background/70 leading-relaxed mb-6 max-w-md">
                  {hvacOption.productNote}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-background border-b border-background/40 group-hover:border-background pb-1 w-fit transition-colors">
                  Cover my whole home
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>

          <p className="mt-10 text-center text-[12px] sm:text-[13px] text-muted-foreground/80 tracking-wide">
            Every option ships with an automatic probiotic refill subscription — so your space stays balanced without you thinking about it.
          </p>
        </div>
      </div>
    </section>
  );
};
