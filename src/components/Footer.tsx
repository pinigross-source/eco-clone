import { ShieldCheck, FlaskConical, PawPrint, ArrowUpRight, Phone, Mail, Clock, BookOpen, Video, Microscope, FileText, ClipboardList } from "lucide-react";
import { Link } from "@/lib/link";
import logo from "@/assets/logo.avif";

const exploreLinks = [
  { label: "Shop", href: "https://shop.envirobiotics.com/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Certified & Verified", href: "/safety" },
  { label: "Solutions", href: "/solutions" },
  { label: "Central Air & Heating", href: "/hvac" },
  { label: "Benefits", href: "/health-benefits" },
  { label: "Help Center", href: "/support" },
];

const resourceLinks = [
  { label: "Blog & Articles", href: "/blog" },
  { label: "Videos", href: "/videos" },
  { label: "Research & Case Studies", href: "/research" },
  { label: "Subscribe & Save", href: "https://shop.envirobiotics.com/collections/subscribe-save" },
  { label: "Register Product", href: "/product-registration" },
  { label: "About Us", href: "/about" },
  { label: "Glossary", href: "/glossary" },
  { label: "BetterAir Rebrand", href: "/betterair-rebrand" },
  { label: "Affiliate Program", href: "https://shop.envirobiotics.com/pages/affiliate-signup" },
  { label: "FAQ", href: "/faq" },
  
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

const contactInfo = [
  { icon: Phone, label: "(833) 692 3883" },
  { icon: Mail, label: "contact@envirobiotics.com" },
  { icon: Clock, label: "Mon-Fri, 9AM - 4PM EST" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Safety tested" },
  { icon: FlaskConical, label: "Science backed" },
  { icon: PawPrint, label: "Family safe" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        {/* Mobile: Centered Logo Section */}
        <div className="lg:hidden text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="EnviroBiotics - Environmental Probiotics"
              className="h-14 sm:h-16 w-auto brightness-0 invert"
              width="200"
              height="80"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-background/70 max-w-sm mx-auto mb-6 leading-relaxed text-sm">
            Environmental probiotics for every indoor space. Designed to work continuously between cleanings.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-background/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-background/80">{label}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-background/10 mb-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Logo & Description - Desktop only */}
          <div className="hidden lg:block col-span-2">
            <div className="mb-6">
              <img
                src={logo}
                alt="EnviroBiotics - Environmental Probiotics"
                className="h-12 w-auto brightness-0 invert"
                width="200"
                height="80"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-background/70 max-w-sm mb-6 leading-relaxed text-base">
              Environmental probiotics for every indoor space. Designed to work continuously between cleanings.
            </p>

            <div className="flex flex-wrap gap-4">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-background/80">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="text-center sm:text-left">
            <p className="font-display font-bold mb-4 text-background text-lg border-b border-background/10 pb-2 sm:border-0 sm:pb-0">
              Explore
            </p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const className = "group inline-flex items-center gap-1 text-sm text-background/80 hover:text-primary transition-colors";
                const content = (
                  <>
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </>
                );
                return (
                  <li key={link.label}>
                    {isExternal ? (
                      <a href={link.href} target="_top" rel="noopener" className={className}>
                        {content}
                      </a>
                    ) : (
                      <Link to={link.href} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <p className="font-display font-bold mb-4 text-background text-lg border-b border-background/10 pb-2 sm:border-0 sm:pb-0">
              Resources
            </p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                const className = "group inline-flex items-center gap-1 text-sm text-background/80 hover:text-primary transition-colors";
                const content = (
                  <>
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </>
                );
                return (
                  <li key={link.label}>
                    {isExternal ? (
                      <a href={link.href} target="_top" rel="noopener" className={className}>
                        {content}
                      </a>
                    ) : (
                      <Link to={link.href} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <p className="font-display font-bold mb-4 text-background text-lg border-b border-background/10 pb-2 sm:border-0 sm:pb-0">
              Get in Touch
            </p>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label} className="flex items-center justify-center sm:justify-start gap-2 text-sm text-background/80">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span>{info.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business Identity */}
        <div className="pt-6 sm:pt-8 border-t border-background/10">
          <div className="mb-6 text-center md:text-left">
            <p className="text-sm font-semibold text-background/90 mb-1">Ecological Balancing Technologies Corporation</p>
            <address className="not-italic text-xs text-background/60 leading-relaxed">
              5 Lenape Road, Unit 2C, Andover, NJ 07821, United States
            </address>
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-[11px] text-background/40">Results vary by space and conditions.</p>
            <p className="text-[11px] text-background/40">*Not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-background/70 text-center md:text-left">
              © 2026 Ecological Balancing Technologies Corporation, d/b/a EnviroBiotics. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link to="/contact" className="text-xs text-background/70 hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/privacy" className="text-xs text-background/70 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-background/70 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/warranty-policy" className="text-xs text-background/70 hover:text-primary transition-colors">
                Shipping &amp; Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
