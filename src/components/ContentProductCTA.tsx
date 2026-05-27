import { Link } from "@/lib/link";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import biologicMiniImg from "@/assets/biologic-mini-nobg-new.avif";
import biotica800Img from "@/assets/shop/biotica-800.png";
import ba2080Img from "@/assets/shop/ba2080.png";

interface RecommendedProduct {
  name: string;
  slug: string;
  price: string;
  coverage: string;
  image: string;
  alt: string;
}

const defaultProducts: RecommendedProduct[] = [
  {
    name: "BioLogic Mini",
    slug: "biologic-mini",
    price: "$98",
    coverage: "Up to 300 sq ft",
    image: biologicMiniImg,
    alt: "BioLogic Mini Probiotic Surface Purifier by EnviroBiotics — compact room purifier",
  },
  {
    name: "Biotica 800",
    slug: "biotica-800",
    price: "$299",
    coverage: "Up to 800 sq ft",
    image: biotica800Img,
    alt: "Biotica 800 Probiotic Air Purifier by EnviroBiotics — continuous environmental probiotic dispersion",
  },
  {
    name: "BA-2080",
    slug: "ba-2080",
    price: "$995",
    coverage: "Up to 2,600 sq ft",
    image: ba2080Img,
    alt: "BA-2080 Advanced Probiotic Air Purification System by EnviroBiotics — 2,600 sq ft coverage",
  },
];

interface ContentProductCTAProps {
  headline?: string;
  subtitle?: string;
  products?: RecommendedProduct[];
}

export const ContentProductCTA = ({
  headline = "Ready to experience the difference?",
  subtitle = "Choose the right EnviroBiotics device for your space.",
  products = defaultProducts,
}: ContentProductCTAProps) => {
  return (
    <section className="my-12 p-6 md:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
          {headline}
        </h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            to={`/product/${product.slug}`}
            className="group flex flex-col items-center p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            <div className="w-20 h-20 mb-3 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.alt}
                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">{product.coverage}</p>
            <span className="text-sm font-bold text-primary mt-1">{product.price}</span>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="rounded-full">
          <Link to="/shop">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Browse All Products
          </Link>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link to="/shop#compare-section">
            <Star className="w-4 h-4 mr-2" />
            Compare Models
          </Link>
        </Button>
      </div>
    </section>
  );
};
