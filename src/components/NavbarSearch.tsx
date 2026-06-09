import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, ShoppingBag, FileText, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { products, type ProductData } from "@/data/productData";
import { blogPosts, type BlogPost } from "@/data/blogData";

/* ── static content pages ── */
const contentPages = [
  { title: "How It Works", description: "Learn how probiotic air purification works", href: "/how-it-works", category: "page" as const, keywords: ["probiotics", "envirobiotics", "surfaces", "air cycle", "settle", "mechanism", "science", "technology"] },
  { title: "HVAC Solutions", description: "Whole-building probiotic treatment for HVAC", href: "/hvac", category: "page" as const, keywords: ["ducted", "central air", "whole home", "building", "commercial", "duct", "ventilation", "ebiotic pro", "installation"] },
  { title: "Room Purifiers", description: "Clean air solutions for homes and offices", href: "/solutions/room", category: "page" as const, keywords: ["portable", "bedroom", "living room", "office", "nursery", "room device"] },
  { title: "Safety & Certifications", description: "FDA GRAS, EPA, MADE SAFE certified", href: "/safety", category: "page" as const, keywords: ["safe", "non-toxic", "chemical free", "kids", "pets", "baby", "certified", "fda", "epa", "iso", "made safe", "allergy", "ptpa"] },
  { title: "Research & Case Studies", description: "Scientific evidence and clinical results", href: "/research", category: "page" as const, keywords: ["study", "clinical", "hospital", "evidence", "data", "results", "lab", "peer reviewed", "microbial"] },
  { title: "Subscribe & Save", description: "Subscription plans for refill cartridges", href: "/subscribe", category: "page" as const, keywords: ["refill", "cartridge", "subscription", "save", "discount", "auto-ship", "delivery", "plan"] },
  { title: "Health Benefits", description: "Probiotic air purification health benefits", href: "/health-benefits", category: "page" as const, keywords: ["allergy", "asthma", "respiratory", "immune", "wellness", "breathing", "comfort", "sensitivity", "dust", "mold"] },
  { title: "About Us", description: "Our mission, team, and values", href: "/about", category: "page" as const, keywords: ["mission", "team", "story", "company", "who we are", "founded"] },
  { title: "Support", description: "Get help with your products", href: "/support", category: "page" as const, keywords: ["help", "contact", "troubleshoot", "setup", "install", "manual", "guide", "warranty", "return"] },
  { title: "FAQ", description: "Frequently asked questions", href: "/faq", category: "page" as const, keywords: ["question", "answer", "how long", "how often", "refill", "replace", "noise", "power", "coverage", "safe"] },
  { title: "Warranty Policy", description: "Product warranty information", href: "/warranty-policy", category: "page" as const, keywords: ["warranty", "guarantee", "return", "repair", "replacement", "lifetime"] },
  { title: "Product Registration", description: "Register your EnviroBiotics product", href: "/product-registration", category: "page" as const, keywords: ["register", "serial number", "activate", "warranty registration"] },
  { title: "Videos", description: "Watch our video library", href: "/videos", category: "page" as const, keywords: ["video", "watch", "demo", "tutorial", "unboxing", "review"] },
  { title: "Mold & Allergens", description: "How probiotics combat mold and allergens", href: "/mold-and-allergens", category: "page" as const, keywords: ["mold", "mildew", "allergen", "dust mite", "pollen", "dander", "pet", "musty", "damp", "basement"] },
  { title: "Probiotic Air Purification", description: "Everything about probiotic air purification", href: "/probiotic-air-purification", category: "page" as const, keywords: ["probiotic", "purifier", "air quality", "indoor", "iaq", "microbiome", "beneficial bacteria", "biofilm"] },
  { title: "Nursery Air Quality", description: "Clean air for baby nurseries", href: "/nursery", category: "page" as const, keywords: ["baby", "nursery", "newborn", "infant", "crib", "safe for baby", "child", "toddler"] },
  { title: "Shop", description: "Browse all EnviroBiotics products", href: "/shop", category: "page" as const, keywords: ["buy", "price", "order", "purchase", "shop", "store", "bundle", "deal"] },
  { title: "Case Studies", description: "Real-world results and success stories", href: "/case-studies", category: "page" as const, keywords: ["case study", "results", "before after", "success", "testimonial", "review", "covid", "pets", "allergies"] },
  { title: "Refills & Accessories", description: "Replacement cartridges and accessories", href: "/shop#refills-section", category: "page" as const, keywords: ["refill", "cartridge", "replacement", "accessory", "filter", "hepa", "probiotic cartridge", "spare"] },
  { title: "Bundles", description: "Value bundles and combo packs", href: "/shop#bundles-section", category: "page" as const, keywords: ["bundle", "combo", "pack", "family pack", "complete", "kit", "value", "deal", "savings"] },
  { title: "Best Sellers", description: "Our most popular products", href: "/shop#products-section", category: "page" as const, keywords: ["best seller", "popular", "top rated", "most sold", "favorite", "recommended", "trending"] },
  { title: "Subscribe & Save", description: "Auto-ship refills and save on every delivery", href: "/shop#subscriptions-section", category: "page" as const, keywords: ["subscribe", "subscription", "auto-ship", "save", "recurring", "delivery", "monthly", "quarterly", "discount"] },
  { title: "Compare All Models", description: "Side-by-side comparison of all purifier models", href: "/shop#compare-section", category: "page" as const, keywords: ["compare", "comparison", "versus", "vs", "difference", "which one", "side by side", "models", "specs", "features"] },
];

type SearchResult =
  | { type: "product"; data: ProductData }
  | { type: "blog"; data: BlogPost }
  | { type: "page"; data: (typeof contentPages)[number] };

export const NavbarSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  /* keyboard shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* search logic */
  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const matched: SearchResult[] = [];

    products.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.coverage.toLowerCase().includes(q)
      ) {
        matched.push({ type: "product", data: p });
      }
    });

    blogPosts.forEach((b) => {
      if (
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      ) {
        matched.push({ type: "blog", data: b });
      }
    });

    contentPages.forEach((p) => {
      const keywordMatch = p.keywords?.some((kw) => kw.toLowerCase().includes(q)) ?? false;
      if (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        keywordMatch
      ) {
        matched.push({ type: "page", data: p });
      }
    });

    return matched.slice(0, 8);
  }, [query]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      const [path, hash] = href.split("#");
      navigate({ to: (path || href) as never });
      if (hash) {
        // Retry scroll to handle lazy-loaded sections
        let attempts = 0;
        const tryScroll = () => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (attempts < 20) {
            attempts++;
            setTimeout(tryScroll, 200);
          }
        };
        setTimeout(tryScroll, 100);
      }
    },
    [navigate],
  );

  const iconFor = (type: string) => {
    if (type === "product") return <ShoppingBag className="w-4 h-4 text-primary shrink-0" />;
    if (type === "blog") return <BookOpen className="w-4 h-4 text-accent shrink-0" />;
    return <FileText className="w-4 h-4 text-muted-foreground shrink-0" />;
  };

  return (
    <>
      {/* trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center text-foreground transition-transform hover:scale-110 active:scale-95"
        aria-label="Search"
      >
        <Search className="h-[22px] w-[22px]" strokeWidth={1.75} />
      </button>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto mt-[15vh] w-[90vw] max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* input row */}
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, articles, pages…"
                className="flex-1 h-14 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* results */}
            <div className="max-h-[50vh] overflow-y-auto overscroll-contain">
              {query && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results for "<span className="font-medium text-foreground">{query}</span>"
                </p>
              )}

              {results.map((r, i) => {
                const title = r.type === "product" ? r.data.name : r.type === "blog" ? r.data.title : r.data.title;
                const desc = r.type === "product" ? r.data.tagline : r.type === "blog" ? r.data.description : r.data.description;
                const href = r.type === "product" ? `/product/${r.data.slug}` : r.type === "blog" ? `/blog/${r.data.slug}` : r.data.href;

                return (
                  <button
                    key={`${r.type}-${i}`}
                    onClick={() => go(href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/60 transition-colors group",
                      i !== results.length - 1 && "border-b border-border/40"
                    )}
                  >
                    {iconFor(r.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{title}</p>
                      <p className="text-xs text-muted-foreground truncate">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* footer hint */}
            {!query && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                Search products, blog articles, and pages
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
