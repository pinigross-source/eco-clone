import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Solutions", href: "/solutions" },
      { label: "Room Solutions", href: "/solutions/room" },
      { label: "HVAC Solutions", href: "/hvac" },
      { label: "Safety & Certifications", href: "/safety" },
      { label: "Subscribe & Save", href: "/subscribe" },
      { label: "About Us", href: "/about" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Biotica 800", href: "/product/biotica-800" },
      { label: "BioLogic Mini", href: "/product/biologic-mini" },
      { label: "E-Biotic Pro (HVAC)", href: "/product/ebiotic-pro" },
      { label: "BA-2080", href: "/product/ba-2080" },
      { label: "BetterAir 2080", href: "/product/betterair-2080" },
    ],
  },
  {
    title: "Content Hub",
    links: [
      { label: "Probiotic Air Purification", href: "/probiotic-air-purification" },
      { label: "Mold & Allergen Reduction", href: "/mold-and-allergens" },
      { label: "HVAC Applications", href: "/hvac-applications" },
      { label: "Product Use Cases", href: "/product-use-cases" },
      { label: "Proof & Trust", href: "/proof-and-trust" },
      { label: "Health Benefits", href: "/benefits" },
      { label: "Education Center", href: "/education" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { label: "EnviroBiotics vs HEPA", href: "/compare/envirobiotics-vs-hepa" },
      { label: "EnviroBiotics vs UV-C", href: "/compare/envirobiotics-vs-uvc" },
      { label: "EnviroBiotics vs Chemical Fresheners", href: "/compare/envirobiotics-vs-chemical-fresheners" },
      { label: "EnviroBiotics vs Bio Healing", href: "/compare/envirobiotics-vs-bio-healing" },
    ],
  },
  {
    title: "Blog",
    links: [
      { label: "Blog Home", href: "/blog" },
      { label: "What Is a Probiotic Air Purifier?", href: "/blog/what-is-probiotic-air-purifier" },
      { label: "Probiotic vs HEPA Air Purifier", href: "/blog/probiotic-vs-hepa-air-purifier" },
      { label: "Best Air Purifier for Mold", href: "/blog/best-air-purifier-for-mold" },
      { label: "How to Reduce Indoor Allergens Naturally", href: "/blog/how-to-reduce-indoor-allergens-naturally" },
      { label: "Do Probiotic Air Purifiers Work?", href: "/blog/do-probiotic-air-purifiers-work" },
      { label: "Are Environmental Probiotics Safe?", href: "/blog/are-environmental-probiotics-safe" },
      { label: "Biological Air Filtration Technology", href: "/blog/biological-air-filtration-technology" },
      { label: "Candida Auris Emerging Threat", href: "/blog/candida-auris-threat" },
      { label: "5 Tips for a Healthier Home", href: "/blog/5-tips-healthier-home" },
      { label: "Indoor Conditions & Chronic Disease", href: "/blog/indoor-living-chronic-disease" },
      { label: "AMR – Antimicrobial Resistance", href: "/blog/amr-antimicrobial-resistance" },
      { label: "Indoor Allergens & Asthma", href: "/blog/indoor-allergens-asthma" },
      { label: "Stop Over-Sanitization", href: "/blog/stop-over-sanitization" },
    ],
  },
  {
    title: "Resources & Media",
    links: [
      { label: "Videos", href: "/videos" },
      { label: "Research", href: "/research" },
      { label: "BetterAir → EnviroBiotics Rebrand", href: "/betterair-to-envirobiotics" },
      { label: "Nursery Landing Page", href: "/nursery" },
    ],
  },
  {
    title: "Account & Programs",
    links: [
      { label: "Sign In / Sign Up", href: "/auth" },
      { label: "My Account", href: "/account" },
      { label: "Order History", href: "/orders" },
      { label: "Manage Subscription", href: "/manage-subscription" },
      { label: "Product Registration", href: "/register" },
      { label: "Affiliate Program", href: "/affiliate/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Warranty & Returns Policy", href: "/warranty-policy" },
    ],
  },
];

const SitemapPage = () => (
  <>
    <SEOHead
      title="Sitemap | EnviroBiotics"
      description="Complete site map of EnviroBiotics.com. Find every product, resource, blog post, and page on our website."
      path="/sitemap"
    />
    <Navbar />
    <main id="main-content" className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Site Map</h1>
        <div className="grid gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                {section.title}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default SitemapPage;
