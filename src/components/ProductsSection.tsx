import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/shop/biotica-800.png";
import ebioticPro from "@/assets/ebiotic-pro.avif";

const products = [
  {
    category: "Single Room",
    name: "BioLogic Mini",
    description: "Ultra-quiet, USB-C rechargeable probiotic diffuser for personal spaces, nurseries, and travel.",
    image: biologicMini,
    href: "/product/biologic-mini",
  },
  {
    category: "Home & Small Office",
    name: "Biotica 800",
    description: "Whole-room protection up to 800 sq ft. Set-and-forget probiotic coverage for living spaces.",
    image: biotica800,
    href: "/product/biotica-800",
  },
  {
    category: "HVAC Whole Home",
    name: "eBiotic Pro",
    description: "Integrates directly with your HVAC to disperse probiotics through every room, automatically.",
    image: ebioticPro,
    href: "/product/ebiotic-pro",
  },
];

export const ProductsSection = () => {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-background overflow-hidden">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px w-10 bg-foreground/20" />
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
            Our Products
          </p>
        </div>

        <div className="max-w-2xl mb-14 sm:mb-20">
          <h2 className="text-[2.25rem] sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-[1.02] tracking-[-0.035em] text-balance">
            One probiotic system.
            <br />
            <span className="text-heading-accent italic font-normal">Three ways to protect.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <Link
              key={product.name}
              to={product.href}
              className="group relative flex flex-col rounded-[24px] bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_hsl(var(--foreground)/0.25)] hover:border-foreground/30"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/60 to-secondary/20 overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-background/95 backdrop-blur-sm text-[10px] font-semibold tracking-[0.18em] uppercase text-foreground border border-border/50">
                  {product.category}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-6 sm:p-7">
                <h3 className="font-display text-2xl font-bold text-foreground tracking-tight mb-3">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground border-b border-foreground/30 group-hover:border-foreground pb-1 w-fit transition-colors">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
