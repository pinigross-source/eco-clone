import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Mail, ShieldCheck, Star, Wind, Home, Infinity as InfinityIcon, Sparkles, Waves, Microscope } from "lucide-react";
import { Link } from "@/lib/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyDiscountUrl, shopifyProductDiscountUrl } from "@/lib/shopify";
import { trackFBEvent } from "@/lib/fb-pixel";

import logo from "@/assets/logo.avif";
import heroImg from "@/assets/pets/hero-soft.jpg";
import bioticaProduct from "@/assets/pets/biotica-800-card.avif";
import miniProduct from "@/assets/biologic-mini-nobg-new.avif";
import surfacesImg from "@/assets/pets/surfaces-soft.jpg";
import bundleAsset from "@/assets/bundle-product.webp.asset.json";
import epaAsset from "@/assets/certs/epa-new.webp.asset.json";
import madeSafeAsset from "@/assets/certs/made-safe-new.png.asset.json";
import allergyukAsset from "@/assets/certs/allergyuk.webp.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";
import isoAsset from "@/assets/certs/iso-new.webp.asset.json";

const BIOTICA_URL = shopifyDiscountUrl("META15", "/products/biotica-800", "pets-landing");
const MINI_URL = shopifyProductDiscountUrl("biologic-mini", "META15", "pets-landing");
const BUNDLE_URL = shopifyDiscountUrl("META15", "/products/home-complete-bundle", "pets-landing");
const DISPLAY = '"Helvetica Neue", "Inter", system-ui, -apple-system, sans-serif';
const EXIT_KEY = "eb_pets_offer_seen";
const EXIT_DONE_KEY = "eb_pets_offer_done";
const EXIT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const CERTS = [
  { label: "EPA Registered", image: epaAsset.url },
  { label: "MADE SAFE®", image: madeSafeAsset.url },
  { label: "AllergyUK", image: allergyukAsset.url },
  { label: "PTPA Winner", image: ptpaAsset.url },
  { label: "ISO Certified", image: isoAsset.url },
];

const products = [
  {
    name: "BioLogic Mini",
    description: "Bedrooms, litter areas, small spaces",
    originalPrice: "$98",
    offerPrice: "$83.30",
    image: miniProduct,
    href: MINI_URL,
    event: "click_pets_card_mini",
  },
  {
    name: "Biotica 800",
    description: "Living rooms & open spaces up to 800 sq ft",
    originalPrice: "$299",
    offerPrice: "$254.15",
    image: bioticaProduct,
    href: BIOTICA_URL,
    event: "click_pets_card_biotica",
    badge: "Most popular for pet homes",
    featured: true,
    freeShipping: true,
  },
  {
    name: "The Pet Home Reset",
    description: "Biotica 800 + 2 Minis for the whole home",
    originalPrice: "$395",
    offerPrice: "$335.75",
    image: bundleAsset.url,
    href: BUNDLE_URL,
    event: "click_pets_card_bundle",
    badge: "Best value",
    note: "Save $85 vs. buying separately",
    freeShipping: true,
    valueStack: [
      "Biotica 800 ($299)",
      "+ 2× BioLogic Mini ($196)",
      "+ Free shipping ($15)",
    ],
  },
];

const testimonials = [
  { quote: "The litter box smell was gone in four days.", person: "Dana, 2 cats" },
  { quote: "Our living room stopped smelling like dog after the first week.", person: "Melissa, golden retriever" },
  { quote: "I can sit on the couch without my eyes feeling irritated.", person: "Alex, 2 cats" },
];

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 ${className}`}>{children}</div>
);

function LogoOnlyHeader() {
  return (
    <>
      <div className="sticky top-0 z-[60] bg-[#EB8B59] px-4 py-2.5 text-center text-[12px] font-semibold leading-snug text-[#1A1A1A] sm:text-[13px]">
        🎉 Your 15% off is applied automatically at checkout - no code needed.
      </div>
      <header className="relative z-50 border-b border-black/5 bg-[#F0F0F0]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-center px-5 lg:h-20">
          <Link to="/" aria-label="EnviroBiotics home">
            <img src={logo} alt="EnviroBiotics" className="h-10 w-auto lg:h-12" width="210" height="80" />
          </Link>
        </div>
      </header>
    </>
  );
}

function ProductSection() {
  return (
    <section id="products" className="scroll-mt-12 bg-[#f5f5f7] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-12">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86868b]">The lineup</p>
          <h2 className="mt-3 text-[34px] font-semibold leading-none tracking-tight text-[#1d1d1f] sm:text-[48px]">
            Pick the size of your home.
          </h2>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {products.map((product) => (
            <article
              key={product.name}
              className={`relative flex h-full flex-col items-center rounded-[32px] bg-white p-7 text-center shadow-sm transition-transform duration-300 sm:p-9 ${product.featured ? "md:-translate-y-3 md:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] md:ring-2 md:ring-primary" : ""}`}
            >
              <div className="flex min-h-7 items-center justify-center">
                {product.badge ? (
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${product.featured ? "bg-primary text-primary-foreground" : "bg-[#f5f5f7] text-[#bf4800]"}`}>
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <div className="my-5 aspect-square w-full max-w-[230px] sm:max-w-[250px]">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="900" height="900" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-1 flex-col items-center">
                <h3 className="text-[23px] font-semibold tracking-tight text-[#1d1d1f]">{product.name}</h3>
                <p className="mt-2 min-h-12 max-w-[30ch] text-[15px] leading-relaxed text-[#68686d]">{product.description}</p>
                {"valueStack" in product && product.valueStack ? (
                  <ul className="mt-5 w-full max-w-[280px] space-y-1 text-[13px] leading-relaxed text-[#68686d]">
                    {product.valueStack.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                    <li className="pt-1 text-[13px] font-medium text-[#86868b] line-through">$510 value</li>
                  </ul>
                ) : null}
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[15px] text-[#86868b] line-through">{product.originalPrice}</span>
                  <span className="text-[28px] font-semibold text-[#1d1d1f]">{product.offerPrice}</span>
                </div>
                <p className="mt-1 text-[12px] font-medium text-[#68686d]">15% applied at checkout</p>
                {"freeShipping" in product && product.freeShipping ? (
                  <p className="mt-1 text-[12px] font-medium text-[#1d1d1f]">Free shipping</p>
                ) : null}
                {"note" in product && product.note ? (
                  <p className="mt-1 text-[12px] font-semibold text-[#bf4800]">{product.note}</p>
                ) : null}
              </div>
              <Button asChild size="lg" className="mt-7 w-full max-w-[220px]">
                <a href={product.href} onClick={() => trackEvent(product.event)}>Buy {product.name}</a>
              </Button>
              <a
                href="#guarantee"
                className="mt-3 text-[11px] text-[#68686d] underline underline-offset-2 hover:text-[#1d1d1f]"
              >
                Fresh Home Guarantee ✓ - 30 days, return shipping on us
              </a>
            </article>
          ))}
        </div>

        <div id="guarantee" className="mx-auto mt-12 max-w-[820px] scroll-mt-24 rounded-[28px] border border-primary/25 bg-white p-8 text-center shadow-[0_24px_60px_-32px_rgba(0,0,0,0.28)] sm:mt-16 sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={2} />
          </div>
          <h3 className="mt-5 text-[26px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[32px]">The Fresh Home Guarantee</h3>
          <p className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-relaxed text-[#68686d]">
            Notice the difference in your first month, or your money back. If you’re not satisfied within 30 days, we’ll refund every cent and cover the return shipping.
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <ul className="mx-auto grid max-w-[900px] grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
            {CERTS.map((cert) => (
              <li
                key={cert.label}
                title={cert.label}
                className="group flex aspect-square items-center justify-center rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_36px_-24px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_26px_48px_-24px_rgba(0,0,0,0.4)] sm:p-4"
              >
                <img
                  src={cert.image}
                  alt={cert.label}
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="160"
                  className="max-h-[80%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[#86868b]">Independently verified for safety</p>

        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-12">
        <h2 className="text-center text-[32px] font-semibold leading-none tracking-tight text-black sm:text-[44px]">Pet owners notice the difference.</h2>
        <p className="mt-4 text-center text-[15px] font-semibold text-black/70">★ 4.8 average - from 1,000+ pet homes</p>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.person} className="flex h-full flex-col rounded-2xl bg-[#F4F5F6] p-7 sm:p-8">
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-primary text-primary" />)}
              </div>
              <blockquote className="mt-5 flex-1 text-[18px] font-medium leading-[1.45] text-black">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 text-[13px] font-semibold text-black/60">- {testimonial.person}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExitOffer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const response = await fetch("/api/public/pets-offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, website: "" }),
    }).catch(() => null);
    if (response?.ok) {
      setStatus("sent");
      trackEvent("submit_pets_exit_offer");
      trackFBEvent("Lead", { content_name: "pets_exit_offer" });
      try { localStorage.setItem(EXIT_DONE_KEY, "1"); } catch { /* storage unavailable */ }
    } else {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-0 p-7 sm:p-9">
        {status === "sent" ? (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-[28px] leading-tight">Done - check your inbox 📬</DialogTitle>
              <DialogDescription className="pt-2 text-[16px] leading-relaxed">Your one-click link is on its way. The 15% applies automatically.</DialogDescription>
            </DialogHeader>
            <Button size="lg" className="mt-3 w-full" onClick={() => onOpenChange(false)}>Keep browsing</Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="pr-6 text-[28px] leading-tight">Not ready yet?</DialogTitle>
              <DialogDescription className="pt-2 text-[16px] leading-relaxed">We’ll save your 15% and email you a one-click link to come back, it applies automatically. Backed by our 30-day Fresh Home Guarantee.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="mt-2 space-y-3">
              <label htmlFor="pets-offer-email" className="sr-only">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input id="pets-offer-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="h-12 w-full rounded-full border border-input bg-background pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>{status === "sending" ? "Saving…" : "Save my 15%"}</Button>
              <p className="text-center text-[11px] text-muted-foreground">No spam - just your discount link.</p>
              <button type="button" onClick={() => onOpenChange(false)} className="mx-auto block text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">No thanks</button>
              {status === "error" ? <p className="text-center text-xs text-destructive">Please try again.</p> : null}
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CompactFooter() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-5 py-10 text-center sm:py-12">
        <img src={logo} alt="EnviroBiotics" loading="lazy" width="210" height="80" className="h-11 w-auto brightness-0 invert" />
        <p className="text-sm text-white/75">30-day money-back guarantee</p>
        <a href="mailto:contact@envirobiotics.com" className="text-sm text-white/80 hover:text-white">contact@envirobiotics.com</a>
        <nav aria-label="Legal" className="flex gap-6 text-xs text-white/65">
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}

const PetsLandingPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [showExitOffer, setShowExitOffer] = useState(false);

  const scrollToProducts = () => {
    trackEvent("click_pets_products_scroll");
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.05 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(EXIT_DONE_KEY)) return;
      const seenAt = Number(localStorage.getItem(EXIT_KEY) ?? 0);
      if (seenAt && Date.now() - seenAt < EXIT_TTL_MS) return;
    } catch {
      return;
    }

    let done = false;
    const cleanupFns: Array<() => void> = [];
    const reveal = () => {
      if (done) return;
      done = true;
      cleanupFns.forEach((fn) => fn());
      try { localStorage.setItem(EXIT_KEY, String(Date.now())); } catch { /* storage unavailable */ }
      setShowExitOffer(true);
      trackEvent("view_pets_exit_offer");
    };

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      const timer = window.setTimeout(reveal, 60000);
      cleanupFns.push(() => window.clearTimeout(timer));
      const onScroll = () => {
        const scrolled = window.scrollY + window.innerHeight;
        if (scrolled / document.documentElement.scrollHeight >= 0.5) reveal();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", onScroll));
    } else {
      const onMouseOut = (event: MouseEvent) => {
        if (event.clientY <= 0 && !event.relatedTarget) reveal();
      };
      document.addEventListener("mouseout", onMouseOut);
      cleanupFns.push(() => document.removeEventListener("mouseout", onMouseOut));
    }

    return () => cleanupFns.forEach((fn) => fn());
  }, []);


  return (
    <>
      <SEOHead title="Pet Dander & Odor Control for Your Home | EnviroBiotics" description="Engineered for homes with pets. EnviroBiotics breaks down dander and odor at the surface, where filters can't reach." path="/pets" />
      <LogoOnlyHeader />
      <main className="bg-white text-[#1A1A1A]" style={{ fontFamily: DISPLAY }}>
        <section ref={heroRef} className="relative overflow-hidden bg-[linear-gradient(to_top_right,#fff7f0_0%,#f8f7ff_50%,#f0f9ff_100%)]">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-9 px-5 pb-14 pt-8 sm:px-10 sm:pb-20 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
            <div className="max-w-xl">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Pets · EnviroBiotics</p>
              <h1 className="text-[43px] font-bold leading-[0.94] tracking-tight text-neutral-900 sm:text-[60px] lg:text-[72px]">You’re up against something you can’t see.</h1>
              <p className="mt-6 text-[18px] font-semibold text-neutral-800">Pet dander and odor are microscopic.</p>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-neutral-600">You vacuum the hair and wash the covers, but the real problem settles deep into the couch, carpet, bedding, and other soft surfaces your pet loves. EnviroBiotics works at the source.</p>
              <Button size="lg" className="mt-7 w-full sm:w-auto" onClick={scrollToProducts}>Shop pet solutions - from $83.30 <ArrowRight /></Button>
              <p className="mt-4 max-w-xl text-[11px] font-medium leading-relaxed text-neutral-600 sm:text-[12px]">✓ Fresh Home Guarantee&nbsp;&nbsp; ✓ Pet-safe & non-toxic</p>
            </div>
            <div className="aspect-[16/11] overflow-hidden rounded-[32px] bg-neutral-100 shadow-2xl sm:rounded-[40px]">
              <img src={heroImg} alt="Golden retriever resting on a cream sofa in a sunlit living room" className="h-full w-full object-cover" fetchPriority="high" loading="eager" decoding="async" width="1920" height="1080" />
            </div>
          </div>
        </section>

        <ProductSection />
        <Testimonials />

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-12">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">Made for homes with pets</p>
              <h2 className="mt-4 text-[34px] font-semibold leading-none tracking-tight sm:text-[48px]">Continuous care where your pet lives.</h2>
              <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-black/70">Beneficial probiotics settle onto surfaces and quietly break down the organic residue pets leave behind, including dander and odor-causing compounds. No sprays, fragrances, or complicated upkeep.</p>
            </Reveal>
            <img src={bioticaProduct} alt="Biotica 800 for pet homes" loading="lazy" decoding="async" width="900" height="900" className="mx-auto w-full max-w-[480px] object-contain" />
          </div>
        </section>

        <section className="bg-[#FBF3EC] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-12">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">The problem</p>
              <h2 className="mt-4 text-[34px] font-semibold leading-none tracking-tight sm:text-[48px]">It’s not the hair. It’s what you can’t see.</h2>
              <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed text-black/70">Dander and odor are microscopic, woven into the couch, rug, and bedding. Filters can’t reach them. Sprays just mask them. EnviroBiotics works right where they live.</p>
            </div>
            <img src={surfacesImg} alt="Cat curled on a cream rug" loading="lazy" decoding="async" width="1600" height="1067" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[28px] border border-black/10 bg-[#F4F5F6] p-7 sm:p-9">
                <h3 className="text-[22px] font-semibold tracking-tight text-black/80">Masking it</h3>
                <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-black/65">
                  <li>Candles</li>
                  <li>Sprays</li>
                  <li>Carpet cleaner</li>
                  <li>Filters</li>
                </ul>
                <p className="mt-6 text-[16px] font-semibold text-black/75">~$40/month, forever</p>
                <p className="mt-1 text-[15px] text-black/60">And the smell comes back.</p>
              </div>
              <div className="rounded-[28px] border border-primary/30 bg-[#FBF3EC] p-7 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.3)] sm:p-9">
                <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">Removing it</h3>
                <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-black/70">
                  <li>Biotica 800</li>
                  <li>$254 once</li>
                  <li>About $0.70/day</li>
                  <li>Works while you sleep</li>
                </ul>
                <p className="mt-6 text-[16px] font-semibold text-[#bf4800]">One purchase. No refills of scent.</p>
              </div>
            </div>
            <p className="mt-8 text-center text-[18px] font-semibold tracking-tight text-black sm:text-[22px]">
              The expensive option is the one you’re already paying for.
            </p>
          </div>
        </section>



        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
            <h2 className="text-[34px] font-semibold leading-none tracking-tight sm:text-[48px]">Set it once. It handles the rest.</h2>
            <div className="mt-9 grid overflow-hidden rounded-2xl border border-black/10 sm:grid-cols-3">
              {[{ title: "Place it", copy: "Place it wherever your pet spends the most time." }, { title: "Switch it on", copy: "It runs silently with no fragrance or daily upkeep." }, { title: "Let it run", copy: "It works continuously on residue embedded in surfaces." }].map((item, index) => (
                <div key={item.title} className="border-b border-black/10 p-7 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-9">
                  <span className="text-xs font-semibold text-black/40">0{index + 1}</span><h3 className="mt-4 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-[15px] leading-relaxed text-black/65">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4F5F6] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-[34px] font-semibold leading-none tracking-tight sm:text-[44px]">Pet owner questions, answered.</h2>
            <Accordion type="single" collapsible>
              {[{ q: "Is it safe around my pets and family?", a: "Yes. It is chemical-free and designed for homes with cats, dogs, children, and adults." }, { q: "Will my house smell like fragrance?", a: "No. It addresses odor at the source rather than adding scent." }, { q: "Does it replace my purifier or vacuum?", a: "No. Keep vacuuming hair and using your purifier for airborne particles. EnviroBiotics works on residue that settles onto surfaces." }, { q: "What does it cost to run?", a: "Very little. The devices draw about the same power as a small LED nightlight, roughly 2 to 5 watts, which works out to a few dollars a year on your electricity bill. The only other cost is the probiotic refill cartridge: one cartridge lasts about 2 to 3 months in continuous use, and refills start at around $29, so most pet homes spend roughly $10 to $15 a month." }, { q: "What if it doesn’t work for us?", a: "Then it costs you nothing. You have a full month to see the difference. If you’re not satisfied, we refund 100% and pay the return shipping. No forms, no arguing." }].map((item, index) => (
                <AccordionItem key={item.q} value={`pets-${index}`}><AccordionTrigger className="text-left text-[17px]">{item.q}</AccordionTrigger><AccordionContent className="text-[15px] leading-relaxed text-black/70">{item.a}</AccordionContent></AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[#FBF3EC] py-16 sm:py-24">
          <div className="mx-auto max-w-[720px] px-5 text-center sm:px-10">
            <h2 className="text-[34px] font-semibold leading-[1.05] tracking-tight sm:text-[48px]">Give your pet the clean home they deserve</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-black/70">15% off + free shipping over $200, 30-day guarantee</p>
            <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={scrollToProducts}>Shop pet solutions - from $83.30 <ArrowRight /></Button>
          </div>
        </section>
      </main>


      {showSticky ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] backdrop-blur sm:hidden">
          <Button className="h-12 w-full" onClick={scrollToProducts}>Shop from $83.30 - 15% off <ArrowRight /></Button>
        </div>
      ) : null}
      <CompactFooter />
      <ExitOffer open={showExitOffer} onOpenChange={setShowExitOffer} />
    </>
  );
};

export default PetsLandingPage;