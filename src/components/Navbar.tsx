import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Link } from "@/lib/link";
import { Menu, X, ArrowRight, User, Sparkles, ChevronDown, Home, Fan, Beaker, Layers, ShieldCheck, Leaf, Building2, Baby, ShoppingCart, CreditCard, Video, BookOpen, FlaskConical, LifeBuoy, HelpCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import { shopifyCart } from "@/lib/shopify";
// Use public path to avoid bundling; preloaded in index.html
const logo = "/assets/logo.avif";

const NavbarSearch = lazy(() => import("./NavbarSearch").then(m => ({ default: m.NavbarSearch })));

const ShopifyCartLink = () => (
  <a
    href={shopifyCart()}
    aria-label="Open cart on Shopify"
    title="Cart"
    className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors hover:scale-105 active:scale-95"
  >
    <ShoppingCart className="w-5 h-5 text-foreground/80" />
  </a>
);

type NavItem = {
  label: string;
  href: string;
  bold?: boolean;
  dropdown?: { label: string; href: string; icon: React.ElementType; desc: string }[];
};

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Technology", href: "/how-it-works" },
  {
    label: "Products",
    href: "https://shop.envirobiotics.com/",
    dropdown: [
      { label: "BioLogic Mini", href: "https://shop.envirobiotics.com/products/biologic-mini", icon: Home, desc: "Portable room protection" },
      { label: "Biotica 800", href: "https://shop.envirobiotics.com/products/biotica-800", icon: Layers, desc: "Medium-coverage device" },
      { label: "E Biotic - Home", href: "/hvac#ebiotic-pro", icon: Fan, desc: "Whole-home via HVAC" },
      { label: "Subscribe & Save", href: "/subscribe", icon: CreditCard, desc: "Recurring refills, save more" },
      { label: "Refills", href: "/product/refills", icon: Beaker, desc: "Probiotic refill cartridges" },
    ],
  },
  {
    label: "Resources",
    href: "/education",
    dropdown: [
      { label: "Blog", href: "/blog", icon: BookOpen, desc: "Articles & guides" },
      { label: "Videos", href: "/videos", icon: Video, desc: "Watch our library" },
      { label: "Research & Case Studies", href: "/research", icon: FlaskConical, desc: "Studies & results" },
      { label: "Case Studies", href: "/case-studies", icon: FileText, desc: "Real-world outcomes" },
      { label: "FAQ", href: "/faq", icon: HelpCircle, desc: "Frequently asked questions" },
      { label: "Help Center", href: "/support", icon: LifeBuoy, desc: "Get support" },
    ],
  },
  { label: "Shop", href: "https://shop.envirobiotics.com/", bold: true },
];

const storeDropdown: NavItem = {
  label: "Shop",
  href: "https://shop.envirobiotics.com/",
};

// Desktop dropdown component
const NavDropdown = ({ item, scrolled, useLight }: { item: NavItem; scrolled: boolean; useLight: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  if (!item.dropdown) {
    const className = cn(
      "relative px-4 xl:px-5 py-2.5 text-[17px] xl:text-lg transition-all duration-200 flex items-center gap-1.5 rounded-lg whitespace-nowrap",
      item.bold
        ? "font-bold text-foreground hover:text-foreground/80"
        : scrolled
          ? "font-medium text-foreground hover:text-foreground hover:bg-muted/50"
          : useLight
            ? "font-medium text-white hover:text-white hover:bg-white/10"
            : "font-medium text-foreground hover:text-foreground hover:bg-muted/50"
    );
    if (/^https?:\/\//.test(item.href)) {
      return (
        <a href={item.href} target="_top" rel="noopener" className={className}>
          {item.label}
        </a>
      );
    }
    return (
      <Link to={item.href} className={className}>
        {item.label}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(item.href);
  const triggerClassName = cn(
    "relative px-4 xl:px-5 py-2.5 text-[17px] xl:text-lg transition-all duration-200 flex items-center gap-1.5 rounded-lg whitespace-nowrap",
    item.bold ? "font-bold" : "font-medium",
    item.bold
      ? "text-foreground hover:text-foreground/80"
      : scrolled
        ? (open ? "text-foreground bg-muted/50" : "text-foreground hover:text-foreground hover:bg-muted/50")
        : useLight
          ? (open ? "text-white bg-white/10" : "text-white hover:text-white hover:bg-white/10")
          : (open ? "text-foreground bg-muted/50" : "text-foreground hover:text-foreground hover:bg-muted/50")
  );

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {isExternal ? (
        <a href={item.href} target="_top" rel="noopener" className={triggerClassName}>
          {item.label}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
        </a>
      ) : (
        <Link to={item.href} className={triggerClassName}>
          {item.label}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
        </Link>
      )}

      <div
        className={cn(
          "absolute top-full left-0 pt-2 z-[10000] transition-all duration-200",
          open ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-1 invisible pointer-events-none"
        )}
      >
      <div className="bg-background border border-border rounded-xl shadow-xl shadow-foreground/5 p-2 min-w-[260px]">
        {item.dropdown.map(({ label, href, icon: Icon, desc }) => {
          const itemExternal = /^https?:\/\//.test(href);
          const itemClass = "flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors group";
          const inner = (
            <>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </>
          );
          return itemExternal ? (
            <a key={label} href={href} target="_top" rel="noopener" className={itemClass} onClick={() => setOpen(false)}>
              {inner}
            </a>
          ) : (
            <Link key={label} to={href} className={itemClass} onClick={() => setOpen(false)}>
              {inner}
            </Link>
          );
        })}
        <div className="border-t border-border mt-1 pt-1">
          {isExternal ? (
            <a
              href={item.href}
              target="_top"
              rel="noopener"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors text-sm font-medium text-primary"
              onClick={() => setOpen(false)}
            >
              View All {item.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              to={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors text-sm font-medium text-primary"
              onClick={() => setOpen(false)}
            >
              View All {item.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [session, setSession] = useState<{ user: { email?: string } } | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    const timer = setTimeout(async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = supabase.auth.onAuthStateChange((_event, sess) => {
        setSession(sess);
      });
      subscription = data.subscription;
      supabase.auth.getSession().then(({ data: { session: sess } }) => {
        setSession(sess);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Detect if navbar overlaps a dark hero section
      const darkSection = document.querySelector('.hero-dark-section');
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect();
        setIsOverDark(rect.top < 80 && rect.bottom > 40);
      } else {
        setIsOverDark(false);
      }
    };
    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar is now always solid background, so always use dark text
  const useLight = false;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-[9999] w-full transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-foreground/5"
            : "bg-background backdrop-blur-xl border-b border-border/50"
        )}
      >
        {/* Scroll Progress */}
        <div
          className={cn(
            "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="container flex h-18 sm:h-20 md:h-[88px] items-center px-4 sm:px-6 relative">
          {/* Mobile: Hamburger */}
          <div className="lg:hidden absolute left-4 z-20">
            <button
              className={cn(
                "relative flex h-11 w-11 items-center justify-center rounded-full border shadow-sm transition-all duration-300 active:scale-95",
                isOpen
                  ? "border-primary/30 bg-primary text-primary-foreground"
                  : "border-border/70 bg-background/92 text-foreground hover:bg-background"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <X className={cn("h-5 w-5 absolute transition-all duration-200", isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90")} />
              <Menu className={cn("h-5 w-5 absolute transition-all duration-200", isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0")} />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center group relative lg:relative mx-auto lg:mx-0 lg:mr-6 xl:mr-8 flex-shrink-0">
            <img
              src={logo}
              alt="EnviroBiotics - Environmental Probiotics"
              className="h-10 sm:h-12 md:h-[82px] w-auto relative z-10"
              width="210"
              height="72"
              fetchPriority="high"
            />
          </Link>

          {/* Mobile: Search + Cart on right */}
          <div className="lg:hidden absolute right-3 z-20 flex items-center gap-1.5">
            <div className="hidden sm:block"><Suspense fallback={null}><NavbarSearch /></Suspense></div>
            <ShopifyCartLink />
          </div>

          {/* Desktop Navigation — absolutely centered */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            {navLinks.map((link) => (
              <NavDropdown key={link.label} item={link} scrolled={scrolled} useLight={useLight} />
            ))}
          </nav>

          {/* Desktop: Right side icons (search, account, cart) */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <Suspense fallback={null}><NavbarSearch /></Suspense>
            <Link to="/account" title={session ? "My Account" : "Sign In"} aria-label={session ? "My Account on Shopify" : "Sign in on Shopify"}>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:scale-105 active:scale-95",
                scrolled ? "bg-muted/50 hover:bg-muted" : useLight ? "bg-white/10 hover:bg-white/20" : "bg-muted/50 hover:bg-muted"
              )}>
                <User className={cn("w-5 h-5", scrolled || !useLight ? (session ? "text-primary" : "text-muted-foreground") : "text-white/80")} />
              </div>
            </Link>
            <ShopifyCartLink />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[150] bg-foreground/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={cn(
          "lg:hidden fixed top-16 sm:top-18 md:top-20 left-0 right-0 z-[200] bg-background border-b border-border shadow-xl transition-all duration-300 ease-in-out overflow-y-auto",
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>



        <nav aria-label="Mobile navigation" className="container pb-4 sm:pb-6 flex flex-col gap-0.5 sm:gap-1 px-4 sm:px-6">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <>
                  <button
                    className="w-full text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-between"
                    onClick={() => setExpandedMobile(expandedMobile === link.label ? null : link.label)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", expandedMobile === link.label && "rotate-180")} />
                  </button>
                  <div className={cn(
                    "overflow-hidden transition-all duration-200",
                    expandedMobile === link.label ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="pl-4 pr-2 pb-1 space-y-0.5">
                      {link.dropdown.map(({ label, href, icon: Icon, desc }) => {
                        const mExt = /^https?:\/\//.test(href);
                        const mClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors";
                        const mInner = (
                          <>
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{label}</p>
                              <p className="text-[11px] text-muted-foreground">{desc}</p>
                            </div>
                          </>
                        );
                        return mExt ? (
                          <a key={label} href={href} target="_top" rel="noopener" className={mClass} onClick={() => setIsOpen(false)}>{mInner}</a>
                        ) : (
                          <Link key={label} to={href} className={mClass} onClick={() => setIsOpen(false)}>{mInner}</Link>
                        );
                      })}
                      <Link
                        to={link.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        View All {link.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : /^https?:\/\//.test(link.href) ? (
                <a
                  href={link.href}
                  target="_top"
                  rel="noopener"
                  className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
