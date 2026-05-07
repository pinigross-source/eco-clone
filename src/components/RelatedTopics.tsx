import { Link } from "@/lib/link";
import {
  Lightbulb,
  Heart,
  Wind,
  Bug,
  Building2,
  LayoutGrid,
  ShieldCheck,
  GraduationCap,
  FileBarChart,
  FlaskConical,
  HelpCircle,
  PenLine,
  ShoppingBag,
  Fan,
  Users,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RelatedLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

const allLinks: RelatedLink[] = [
  { label: "How It Works", href: "/how-it-works", icon: Lightbulb, description: "The science behind probiotic purification" },
  { label: "Benefits", href: "/health-benefits", icon: Heart, description: "Health advantages for your family" },
  { label: "Probiotic Air Purification", href: "/probiotic-air-purification", icon: Wind, description: "Our core technology explained" },
  { label: "Mold & Allergen Reduction", href: "/mold-and-allergens", icon: Bug, description: "Combat mold, dander, and dust mites" },
  { label: "HVAC Applications", href: "/hvac-applications", icon: Building2, description: "Whole-building probiotic treatment" },
  { label: "Product Use Cases", href: "/product-use-cases", icon: LayoutGrid, description: "Room-by-room placement guide" },
  { label: "Proof & Trust", href: "/proof-and-trust", icon: ShieldCheck, description: "Certifications and lab results" },
  { label: "Safety & Certifications", href: "/safety", icon: ShieldCheck, description: "FDA GRAS and safety data" },
  { label: "Education Center", href: "/education", icon: GraduationCap, description: "Deep-dive articles and guides" },
  { label: "Case Studies", href: "/case-studies", icon: FileBarChart, description: "Documented real-world results" },
  { label: "Research", href: "/research", icon: FlaskConical, description: "Published studies and whitepapers" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, description: "Common questions answered" },
  { label: "Blog", href: "/blog", icon: PenLine, description: "Latest news and insights" },
  { label: "Shop Products", href: "/shop", icon: ShoppingBag, description: "Browse all devices and refills" },
  { label: "HVAC Solutions", href: "/hvac", icon: Fan, description: "Commercial HVAC integration" },
  { label: "About", href: "/about", icon: Users, description: "Our mission and story" },
  { label: "Support", href: "/support", icon: LifeBuoy, description: "Get help from our team" },
  { label: "Glossary", href: "/glossary", icon: GraduationCap, description: "Key terms and definitions" },
  { label: "BetterAir → EnviroBiotics", href: "/betterair-rebrand", icon: Users, description: "Our rebrand explained" },
  { label: "EnviroBiotics vs HEPA", href: "/compare/hepa", icon: Wind, description: "Probiotic vs filter comparison" },
  { label: "EnviroBiotics vs UV-C", href: "/compare/envirobiotics-vs-uvc", icon: Lightbulb, description: "Safety and effectiveness compared" },
  { label: "EnviroBiotics vs Chemical Fresheners", href: "/compare/envirobiotics-vs-chemical-fresheners", icon: FlaskConical, description: "Natural vs chemical odor removal" },
  { label: "EnviroBiotics vs Bio Healing", href: "/compare/envirobiotics-vs-bio-healing", icon: ShieldCheck, description: "Certification and technology comparison" },
];

interface RelatedTopicsProps {
  currentPath: string;
  links?: RelatedLink[];
  max?: number;
  title?: string;
}

export const RelatedTopics = ({
  currentPath,
  links,
  max = 8,
  title = "Explore More",
}: RelatedTopicsProps) => {
  const items = (links ?? allLinks)
    .filter((l) => l.href !== currentPath)
    .slice(0, max);

  if (items.length === 0) return null;

  return (
    <section className="section-padding py-12 md:py-16">
      <div className="container max-w-4xl mx-auto px-5">
        <nav aria-label="Related topics" className="pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">{title}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  {Icon && (
                    <div className="icon-container icon-container-md shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
};
