import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/shop/biotica-800.png";
import ebiotic from "@/assets/ebiotic-pro.avif";

const products = [
  {
    name: "BioLogic Mini",
    image: biologicMini,
    sizeLine: "One room. Up to 300 sq ft.",
    useLine: "Bedroom, office, nursery.",
    href: "/product/biologic-mini",
  },
  {
    name: "Biotica 800",
    image: biotica800,
    sizeLine: "Larger living areas. 300 to 800 sq ft.",
    useLine: "Living room, family room, open kitchen.",
    href: "/product/biotica-800",
  },
  {
    name: "E-Biotic Home & Small Office",
    image: ebiotic,
    sizeLine: "Whole space. 800+ sq ft.",
    useLine: "Apartments, small offices, multi-room coverage.",
    href: "/product/e-biotic-home-and-small-office",
  },
];

export const ProductsTriadSection = () => {
  return (
    <section id="products" className="relative py-24 sm:py-32 lg:py-40 bg-background">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <ScrollReveal variant="fadeUp" className="text-center mb-14 sm:mb-20">
          <h2 className="font-display font-semibold text-foreground text-balance leading-[1.04] tracking-[-0.03em] text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] max-w-4xl mx-auto">
            Your indoor air. Your indoor surfaces.{" "}
            <span className="text-heading-accent">They affect more than you think.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three devices for three kinds of spaces. Pick the one that fits yours.
          </p>
          <p className="mt-5 text-[13px] sm:text-sm font-medium text-foreground/70 tracking-wide">
            Headaches. Fatigue. Sleep that doesn&apos;t feel restful.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 sm:gap-7" staggerDelay={0.1}>
          {products.map((p) => (
            <StaggerItem key={p.name} variant="fadeUp">
              <div className="group relative h-full flex flex-col rounded-[1.5rem] bg-card border border-border/60 p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-28px_hsl(var(--foreground)/0.18)]">
                <div className="aspect-[4/3] mb-6 flex items-center justify-center bg-gradient-to-br from-muted/40 to-transparent rounded-2xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={360}
                    className="max-h-[80%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-[1.45rem] sm:text-[1.55rem] font-semibold text-foreground leading-tight tracking-[-0.02em] mb-3">
                  {p.name}
                </h3>
                <p className="text-[15px] text-foreground/85 leading-snug mb-1.5">
                  {p.sizeLine}
                </p>
                <p className="text-[14px] text-muted-foreground leading-snug mb-7">
                  {p.useLine}
                </p>
                <Link
                  to={p.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors self-start"
                >
                  See details
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
