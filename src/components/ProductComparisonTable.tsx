import { Check, X, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/lib/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { useStripeCartStore } from "@/stores/stripeCartStore";
import { getProductBySlug } from "@/lib/stripe-products";

import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/biotica800-hero.avif";
import ba2080 from "@/assets/shop/ba2080.png";

interface ComparisonProduct {
  name: string;
  slug: string;
  price: number;
  image: string;
  coverage: string;
  idealFor: string;
  power: string;
  noiseLevel: string;
  cartridgeLife: string;
  warranty: string;
  warrantySubscriber: string;
  hasHEPA: boolean;
  portable: boolean;
  commercial: boolean;
  featured?: boolean;
}

const comparisonProducts: ComparisonProduct[] = [
  {
    name: "BioLogic Mini",
    slug: "biologic-mini",
    price: 98,
    image: biologicMini,
    coverage: "Up to 300 sq ft",
    idealFor: "Personal spaces, travel, desks",
    power: "Battery (USB rechargeable)",
    noiseLevel: "< 5 dB",
    cartridgeLife: "90 days",
    warranty: "1 year",
    warrantySubscriber: "Lifetime",
    hasHEPA: false,
    portable: true,
    commercial: false,
  },
  {
    name: "Biotica 800",
    slug: "biotica-800",
    price: 299,
    image: biotica800,
    coverage: "Up to 800 sq ft",
    idealFor: "Living rooms, bedrooms, offices",
    power: "110–230 VAC",
    noiseLevel: "< 30 dB",
    cartridgeLife: "90 days",
    warranty: "1 year",
    warrantySubscriber: "Lifetime",
    hasHEPA: false,
    portable: false,
    commercial: false,
    featured: false,
  },
  {
    name: "BA 2080",
    slug: "ba-2080",
    price: 995,
    image: ba2080,
    coverage: "Up to 2,600 sq ft",
    idealFor: "Large homes, offices, clinics",
    power: "100-220V",
    noiseLevel: "25-55 dB",
    cartridgeLife: "180 days",
    warranty: "1 year",
    warrantySubscriber: "Lifetime",
    hasHEPA: true,
    portable: false,
    commercial: true,
  },
];

const specRows: { label: string; key: string; type: "text" | "bool" }[] = [
  { label: "Coverage Area", key: "coverage", type: "text" },
  { label: "Ideal For", key: "idealFor", type: "text" },
  { label: "Power Source", key: "power", type: "text" },
  { label: "Noise Level", key: "noiseLevel", type: "text" },
  { label: "Cartridge Life", key: "cartridgeLife", type: "text" },
  { label: "Warranty", key: "warranty", type: "text" },
  { label: "Warranty w/ Subscription", key: "warrantySubscriber", type: "text" },
  { label: "HEPA Filtration", key: "hasHEPA", type: "bool" },
  { label: "Portable / Travel", key: "portable", type: "bool" },
  { label: "Commercial Ready", key: "commercial", type: "bool" },
  { label: "Probiotic Technology", key: "_probioticTech", type: "bool" },
  { label: "MADE SAFE® Certified", key: "_madeSafe", type: "bool" },
];

const FeatureCheck = ({ value }: { value: boolean }) => (
  <div className={`flex items-center justify-center ${value ? "text-primary" : "text-muted-foreground/40"}`}>
    {value ? (
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Check className="w-4 h-4" />
      </div>
    ) : (
      <X className="w-5 h-5" />
    )}
  </div>
);

const AddToCartButton = ({
  slug,
  productName,
  size = "sm",
}: {
  slug: string;
  productName: string;
  size?: "sm" | "default" | "lg";
}) => {
  const addItem = useStripeCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const product = getProductBySlug(slug);
    if (product) {
      addItem(product, 1);
      toast.success("Added to cart", {
        description: productName,
        position: "top-center",
      });
    } else {
      toast.error("Product not found");
    }
  };

  return (
    <Button variant="hero" size={size} onClick={handleAddToCart}>
      <ShoppingCart className="mr-1 h-3 w-3" />
      Buy
    </Button>
  );
};

const getSpecValue = (product: ComparisonProduct, key: string): string | boolean => {
  if (key === "_probioticTech" || key === "_madeSafe") return true;
  return (product as any)[key];
};

/* ── Mobile: swipeable card view ─────────────────── */
const MobileComparison = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const product = comparisonProducts[activeIndex];

  return (
    <div className="lg:hidden">
      {/* Product selector tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {comparisonProducts.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setActiveIndex(i)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              i === activeIndex
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary/20"
            }`}
          >
            <img src={p.image} alt="" className="w-6 h-6 object-contain" aria-hidden="true" />
            {p.name}
          </button>
        ))}
      </div>

      {/* Active product card */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Product header */}
        <div className="p-5 text-center border-b border-border bg-muted/20">
          <div className="h-28 flex items-center justify-center mb-3">
            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>
          <p className="font-display font-bold text-xl">{product.name}</p>
          <p className="text-2xl font-bold text-primary mt-1">${product.price}</p>
          <div className="flex gap-2 justify-center mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/product/${product.slug}`}>Details</Link>
            </Button>
            <AddToCartButton slug={product.slug} productName={product.name} />
          </div>
        </div>

        {/* Specs list */}
        <div>
          {specRows.map((row, i) => {
            const val = getSpecValue(product, row.key);
            return (
              <div
                key={row.key}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i % 2 === 0 ? "bg-muted/20" : ""
                } ${i > 0 ? "border-t border-border/50" : ""}`}
              >
                <span className="font-medium text-sm text-foreground">{row.label}</span>
                {row.type === "bool" ? (
                  <FeatureCheck value={val as boolean} />
                ) : (
                  <span className={`text-sm text-right max-w-[55%] ${row.key === "warrantySubscriber" ? "font-medium text-primary" : "text-muted-foreground"}`}>
                    {val as string}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick compare hint */}
      <p className="text-xs text-muted-foreground text-center mt-3 pointer-events-none select-none">
        Tap a model above to compare specs
      </p>
    </div>
  );
};

/* ── Desktop: original grid table ────────────────── */
const DesktopComparison = () => (
  <div className="hidden lg:block">
    <div>
      {/* Header Row with Products */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4">
          <h3 className="font-display font-bold text-xl text-foreground">Compare Models</h3>
          <p className="text-sm text-muted-foreground mt-1">Find your perfect fit</p>
        </div>

        {comparisonProducts.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl text-center ${
              product.featured ? "bg-primary/5 border-2 border-primary/30" : "bg-card border border-border"
            }`}
          >
            {product.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground shadow-lg">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Most Popular
              </Badge>
            )}

            <div className="h-24 flex items-center justify-center mb-4 overflow-hidden">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full w-auto object-contain" />
            </div>

            <p className="font-display font-bold text-lg mb-1">{product.name}</p>
            <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/product/${product.slug}`}>Details</Link>
              </Button>
              <AddToCartButton slug={product.slug} productName={product.name} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Rows */}
      <div className="rounded-2xl border border-border overflow-hidden bg-card">
        {specRows.map((row, i) => (
          <div
            key={row.key}
            className={`grid grid-cols-4 gap-4 p-4 ${i % 2 === 0 ? "bg-muted/30" : ""} ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className="font-semibold text-foreground flex items-center">{row.label}</div>
            {comparisonProducts.map((product) => {
              const val = getSpecValue(product, row.key);
              return row.type === "bool" ? (
                <FeatureCheck key={product.slug} value={val as boolean} />
              ) : (
                <div
                  key={product.slug}
                  className={`text-center text-sm ${row.key === "warrantySubscriber" ? "font-medium text-primary" : "text-muted-foreground"}`}
                >
                  {val as string}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom CTA Row */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div />
        {comparisonProducts.map((product) => (
          <div key={product.slug} className="text-center">
            <AddToCartButton slug={product.slug} productName={product.name} size="default" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ProductComparisonTable = () => (
  <div className="w-full">
    <MobileComparison />
    <DesktopComparison />
  </div>
);
