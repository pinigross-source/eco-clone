import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@/lib/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { ShopAccountIcon, ShopCartIcon } from "@/components/ShopIcons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import { shopifyCart } from "@/lib/shopify";
import { NavbarSearch } from "./NavbarSearch";
// Use public path to avoid bundling; preloaded in index.html
const logo = "/assets/logo.avif";

const ShopifyCartLink = () => (
  <a
    href={shopifyCart()}
    aria-label="Open cart on Shopify"
    title="Cart"
    className="w-11 h-11 flex items-center justify-center text-foreground transition-transform hover:scale-110 active:scale-95"
  >
    <ShopCartIcon className="w-[26px] h-[26px]" />
  </a>
);

type NavItem = {
  label: string;
  href: string;
  bold?: boolean;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Technology", href: "/how-it-works" },
  {
    label: "Products",
    href: "https://shop.envirobiotics.com/",
    dropdown: [
      { label: "BioLogic Mini", href: "https://shop.envirobiotics.com/products/biologic-mini" },
      { label: "Biotica 800", href: "https://shop.envirobiotics.com/products/biotica-800" },
      { label: "E Biotic - Home", href: "/hvac#ebiotic-pro" },
      { label: "Subscribe & Save", href: "/subscribe" },
    ],
  },
  {
    label: "Resources",
    href: "/education",
    dropdown: [
      { label: "Blog", href: "/blog" },
      { label: "Videos", href: "/videos" },
      { label: "Research & Case Studies", href: "/research" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/support" },
    ],
  },
  { label: "Shop", href: "https://shop.envirobiotics.com/" },
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
      "relative px-2 xl:px-3 py-2 text-base xl:text-lg 2xl:text-xl font-bold transition-all duration-200 flex items-center gap-1.5 rounded-lg whitespace-nowrap",
      scrolled
        ? "text-foreground hover:text-foreground hover:bg-muted/50"
        : useLight
          ? "text-white hover:text-white hover:bg-white/10"
          : "text-foreground hover:text-foreground hover:bg-muted/50"
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
    "relative px-4 xl:px-5 py-2.5 text-lg xl:text-xl font-bold transition-all duration-200 flex items-center gap-1.5 rounded-lg whitespace-nowrap",
    scrolled
      ? (open ? "text-foreground bg-muted/50" : "text-foreground hover:text-foreground hover:bg-muted/50")
      : useLight
        ? (open ? "text-white bg-white/10" : "text-white hover:text-white hover:bg-white/10")
        : (open ? "text-foreground bg-muted/50" : "text-foreground hover:text-foreground hover:bg-muted/50")
  );

  return (
    <div className="relative group/dropdown" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {isExternal ? (
        <a href={item.href} target="_top" rel="noopener" className={triggerClassName}>
          {item.label}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180 group-focus-within/dropdown:rotate-180", open && "rotate-180")} />
        </a>
      ) : (
        <Link to={item.href} className={triggerClassName}>
          {item.label}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 group-hover/dropdown:rotate-180 group-focus-within/dropdown:rotate-180", open && "rotate-180")} />
        </Link>
      )}

      <div
        className={cn(
          "absolute top-full left-0 pt-2 z-[10000] transition-all duration-200 group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:visible group-hover/dropdown:pointer-events-auto group-focus-within/dropdown:opacity-100 group-focus-within/dropdown:translate-y-0 group-focus-within/dropdown:visible group-focus-within/dropdown:pointer-events-auto",
          open ? "opacity-100 translate-y-0 visible pointer-events-auto" : "opacity-0 -translate-y-1 invisible pointer-events-none"
        )}
      >
      <div className="bg-background border border-border rounded-xl shadow-xl shadow-foreground/5 p-2 min-w-[280px]">
        {item.dropdown.map(({ label, href }) => {
          const itemExternal = /^https?:\/\//.test(href);
          const itemClass = "block px-5 py-3 rounded-lg hover:bg-muted/60 transition-colors text-xl font-normal text-foreground";
          return itemExternal ? (
            <a key={label} href={href} target="_top" rel="noopener" className={itemClass} onClick={() => setOpen(false)}>
              {label}
            </a>
          ) : (
            <Link key={label} to={href} className={itemClass} onClick={() => setOpen(false)}>
              {label}
            </Link>
          );
        })}
        <div className="border-t border-border mt-1 pt-1">
          {isExternal ? (
            <a
              href={item.href}
              target="_top"
              rel="noopener"
              className="block px-5 py-3 rounded-lg hover:bg-muted/60 transition-colors text-xl font-normal text-primary"
              onClick={() => setOpen(false)}
            >
              View All {item.label}
            </a>
          ) : (
            <Link
              to={item.href}
              className="block px-5 py-3 rounded-lg hover:bg-muted/60 transition-colors text-xl font-normal text-primary"
              onClick={() => setOpen(false)}
            >
              View All {item.label}
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
        style={{ fontFamily: "'Montserrat', sans-serif" }}
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

        <div className="container flex h-20 sm:h-[88px] md:h-[100px] items-center px-4 sm:px-6 relative">
          {/* Mobile: Hamburger */}
          <div className="lg:hidden absolute left-4 z-20">
            <button
              className={cn(
                "relative flex h-12 w-12 items-center justify-center rounded-full border shadow-sm transition-all duration-300 active:scale-95",
                isOpen
                  ? "border-primary/30 bg-primary text-primary-foreground"
                  : "border-border/70 bg-background/92 text-foreground hover:bg-background"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <X className={cn("h-6 w-6 absolute transition-all duration-200", isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90")} />
              <Menu className={cn("h-6 w-6 absolute transition-all duration-200", isOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0")} />
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center group relative lg:relative mx-auto lg:mx-0 lg:mr-4 xl:mr-6 flex-shrink-0">
            <img
              src={logo}
              alt="EnviroBiotics - Environmental Probiotics"
              className="h-12 sm:h-14 md:h-[92px] w-auto relative z-10"
              width="210"
              height="72"
              fetchPriority="high"
            />
          </Link>

          {/* Mobile: Search + Cart on right */}
          <div className="lg:hidden absolute right-3 z-20 flex items-center gap-1.5">
            <div className="hidden sm:block"><NavbarSearch /></div>
            <ShopifyCartLink />
          </div>

          {/* Desktop Navigation — centered, flex-grow */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex flex-1 items-center justify-center gap-3 xl:gap-6 2xl:gap-10"
          >
            {navLinks.map((link) => (
              <NavDropdown key={link.label} item={link} scrolled={scrolled} useLight={useLight} />
            ))}
          </nav>

          {/* Desktop: Right side icons (search, account, cart) */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <NavbarSearch />
            <Link to="/account" title={session ? "My Account" : "Sign In"} aria-label={session ? "My Account on Shopify" : "Sign in on Shopify"}>
              <div className="w-11 h-11 flex items-center justify-center text-foreground transition-transform hover:scale-110 active:scale-95">
                <ShopAccountIcon className={cn("w-[26px] h-[26px]", session && "text-primary")} />
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
          "lg:hidden fixed top-20 sm:top-[88px] md:top-[100px] left-0 right-0 z-[200] bg-background border-b border-border shadow-xl transition-all duration-300 ease-in-out overflow-y-auto",
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
                    className="w-full text-base sm:text-lg font-bold text-foreground hover:bg-muted/50 px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all flex items-center justify-between"
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
                      {link.dropdown.map(({ label, href }) => {
                        const mExt = /^https?:\/\//.test(href);
                        const mClass = "block px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors text-lg font-normal text-foreground";
                        return mExt ? (
                          <a key={label} href={href} target="_top" rel="noopener" className={mClass} onClick={() => setIsOpen(false)}>{label}</a>
                        ) : (
                          <Link key={label} to={href} className={mClass} onClick={() => setIsOpen(false)}>{label}</Link>
                        );
                      })}
                      <Link
                        to={link.href}
                        className="block px-3 py-3 text-lg font-normal text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        View All {link.label}
                      </Link>
                    </div>
                  </div>
                </>
              ) : /^https?:\/\//.test(link.href) ? (
                <a
                  href={link.href}
                  target="_top"
                  rel="noopener"
                  className="text-base sm:text-lg font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                </a>
              ) : (
                <Link
                  to={link.href}
                  className="text-base sm:text-lg font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
