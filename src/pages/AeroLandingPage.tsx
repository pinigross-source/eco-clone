import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, ShieldCheck, Leaf, Wind, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import miniImg from "@/assets/shop/biologic-mini.png";
import bioticaImg from "@/assets/shop/biotica-800.png";
import bundleImg from "@/assets/shop/home-complete-bundle.avif";
import heroImg from "@/assets/health-scandi-livingroom.jpg";
import heroImgMobile from "@/assets/health-scandi-window.jpg";
import mindfulImg from "@/assets/health-scandi-bedroom.jpg";
import convenienceImg from "@/assets/family-clean-home.jpg";
import petsImg from "@/assets/family-pet-living-room.jpg";
import sanctuaryImg from "@/assets/guarantee-calm-home.avif";
import endorsementImg from "@/assets/mini-lifestyle-family-new.avif";

const PROMO = "AERO";

const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const LINKS = {
  mini: withDiscount(shopifyProductUrl("biologic-mini", "aero-landing")),
  biotica: withDiscount(shopifyProductUrl("biotica-800", "aero-landing")),
  bundle: withDiscount(shopifyUrl("/products/home-complete-bundle", "aero-landing")),
};

const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

type ProductCardProps = {
  name: string;
  tagline: string;
  description?: string;
  price: string;
  oldPrice?: string;
  features: string[];
  image: string;
  href: string;
  highlight?: boolean;
  ctaText: string;
  offerNote?: string;
  onClick: () => void;
};

const ProductCard = ({
  name,
  tagline,
  description,
  price,
  oldPrice,
  features,
  image,
  href,
  highlight,
  ctaText,
  offerNote,
  onClick,
}: ProductCardProps) => (
  <div
    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card transition-transform duration-500 hover:-translate-y-1 ${
      highlight
        ? "ring-2 ring-primary shadow-[0_50px_120px_-40px_hsl(var(--primary)/0.35)]"
        : "ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
    }`}
  >
    {highlight && (
      <div className="absolute right-5 top-5 z-10 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
        Premium Pick
      </div>
    )}
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))]">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {tagline}
        </p>
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
          {name}
        </h3>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]"
          >
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border/60 pt-5">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
            {price}
          </span>
          {oldPrice && (
            <span className="text-base text-muted-foreground line-through">{oldPrice}</span>
          )}
        </div>
        {offerNote && <p className="mb-4 text-xs font-semibold text-primary">{offerNote}</p>}
        <a
          href={href}
          onClick={onClick}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors ${
            highlight
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">30-day risk-free trial</p>
      </div>
    </div>
  </div>
);

type Persona = {
  title: string;
  copy: string;
  img: string;
};

const PERSONAS: Persona[] = [
  {
    title: "Mindful Homes",
    copy: "Breathe deep, live easy. Beneficial probiotics keep working on the air and the surfaces a filter never reaches, so the room you sit in feels as cared for as the air you breathe.",
    img: mindfulImg,
  },
  {
    title: "Convenience Seekers",
    copy: "Effortless wellness, effortless living. Plug it in, set it once, and let probiotic protection run quietly in the background of your day.",
    img: convenienceImg,
  },
  {
    title: "Allergy & Pet Households",
    copy: "Dander, pollen, and dust-mite allergens settle into bedding, sofas, and rugs. Probiotic care keeps competing on those exact surfaces, day and night.",
    img: petsImg,
  },
];

const COMPARE = [
  {
    tier: "Essential",
    name: "BioLogic Mini",
    sub: "For focused rooms.",
    price: "$98",
    coverage: "Up to 300 sq. ft.",
    runtime: "24/7 continuous",
    noise: "Whisper-quiet",
    surfaces: "Bedding, pillows, upholstery",
    best: "Bedrooms, offices, nurseries",
    href: LINKS.mini,
    cta: "Get the Mini",
    img: miniImg,
    event: "click_aero_compare_mini",
  },
  {
    tier: "Pro",
    name: "Biotica 800",
    sub: "For open living areas.",
    price: "$299",
    coverage: "Up to 800 sq. ft.",
    runtime: "24/7 continuous",
    noise: "Whisper-quiet",
    surfaces: "Sofas, rugs, curtains, great rooms",
    best: "Open-plan homes, great rooms",
    href: LINKS.biotica,
    cta: "Upgrade to 800",
    img: bioticaImg,
    event: "click_aero_compare_biotica",
  },
  {
    tier: "Premium",
    name: "Home Complete Bundle",
    sub: "Our zero-compromise system.",
    price: "$399",
    coverage: "Whole-home coverage",
    runtime: "24/7 across every room",
    noise: "Whisper-quiet",
    surfaces: "Every soft surface in the home",
    best: "Clean freaks, wellness fans",
    href: LINKS.bundle,
    cta: "Go All-in-One",
    img: bundleImg,
    event: "click_aero_compare_bundle",
  },
];

const AeroLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackMini = () => trackEvent("click_aero_mini");
  const trackBiotica = () => trackEvent("click_aero_biotica");
  const trackBundle = () => trackEvent("click_aero_bundle");

  return (
    <>
      <SEOHead
        title="EnviroBiotics Aero: Effortless, Probiotic Clean Air | EnviroBiotics"
        description="A beautifully engineered probiotic system for the modern home. Effortless wellness for the air, bedding, sofas, and every surface. Save 10% with code AERO."
        path="/aero"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden sm:min-h-[680px]">
          <picture>
            <source media="(max-width: 1023px)" srcSet={heroImgMobile} />
            <img
              src={heroImg}
              alt="A beautifully designed, calm modern home"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] sm:object-[50%_35%] lg:object-[30%_center]"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-black/5 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35 sm:via-40% sm:to-transparent"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-5 pb-8 text-center sm:px-8 sm:pb-16 sm:text-left md:px-10 md:pb-20 lg:px-16 lg:pb-28">
            <div className="mx-auto max-w-[36rem] sm:mx-0 lg:max-w-3xl">
              <Reveal className="hidden sm:block">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  EnviroBiotics Aero &middot; Effortless Probiotic Air
                </p>
              </Reveal>
              <Reveal>
                <h1
                  className="font-display text-[2.5rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[clamp(3rem,6.2vw,4.25rem)] lg:text-[clamp(4.5rem,8vw,6.25rem)]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                >
                  <span className="block sm:inline">Effortless air.</span>{" "}
                  <span className="block sm:inline text-primary">Endless calm.</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="mx-auto mt-3 max-w-[22rem] text-[1.0625rem] font-medium leading-[1.45] text-white/95 sm:hidden [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                  <span className="block">A beautifully engineered</span>
                  <span className="block">probiotic system for the modern home.</span>
                </p>
                <p className="mt-5 hidden max-w-[31rem] text-lg font-medium leading-relaxed text-white/92 sm:block md:text-[1.15rem] lg:max-w-2xl lg:text-[1.6rem] lg:leading-[1.35] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Quietly engineered, sculpted to disappear into the room, and built around a simple
                  idea: clean air should feel as good as it looks. EnviroBiotics Aero keeps working
                  on the air and every surface a filter can&apos;t reach.
                </p>
              </Reveal>
              <Reveal>
                <p
                  className="mt-4 text-[0.95rem] font-semibold text-white sm:mt-6 sm:text-lg lg:text-xl"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
                >
                  Use code{" "}
                  <span className="font-extrabold uppercase tracking-wider text-primary">
                    {PROMO}
                  </span>{" "}
                  <span className="sm:hidden">for 10% off.</span>
                  <span className="hidden sm:inline">at checkout to save 10%.</span>
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                  <a href="#products" onClick={() => trackEvent("click_aero_hero_shop")}>
                    <Button
                      size="lg"
                      className="h-[3.25rem] w-full rounded-full bg-white px-7 text-base font-semibold text-foreground hover:bg-white/90 sm:h-14 sm:w-auto sm:px-8"
                    >
                      Shop the Aero Offer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="#designed-for"
                    className="hidden h-14 items-center justify-center rounded-full border border-white/40 px-7 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/10 sm:inline-flex"
                  >
                    Designed For You
                  </a>
                </div>
              </Reveal>
              <Reveal className="hidden md:block">
                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 lg:mt-10">
                  <span>EPA</span>
                  <span className="opacity-50">·</span>
                  <span>FDA GRAS</span>
                  <span className="opacity-50">·</span>
                  <span>MADE SAFE</span>
                  <span className="opacity-50">·</span>
                  <span>Free Shipping</span>
                  <span className="opacity-50">·</span>
                  <span>30-day risk-free trial</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-5 gap-y-8 px-5 sm:gap-10 sm:px-10 lg:grid-cols-4 lg:px-16">
            {[
              { n: "24/7", label: "Always-on protection" },
              { n: "0", label: "Harsh chemicals or fragrance" },
              { n: "800", label: "sq. ft. peak coverage" },
              { n: "30-day", label: "Risk-free trial" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold tracking-[-0.03em] text-primary sm:text-5xl lg:text-[3.5rem]">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:mt-3 sm:text-[11px] sm:tracking-[0.22em]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ 3. THE PROBLEM ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.24)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28)]">
                <img
                  src={endorsementImg}
                  alt="A calm, modern living room with diffused light"
                  className="h-64 w-full object-cover sm:h-[clamp(360px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-background sm:via-background/70 sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[460px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    Welcome to your sanctuary
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                    Your home should feel
                    <br />
                    as clean as it looks.
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-foreground/85 sm:mt-5 sm:text-base">
                    The air inside can silently work against you, filled with allergens, odors, and
                    settled dust. EnviroBiotics Aero clears the air, calms the space, and restores
                    your sense of balance, beautifully.
                  </p>
                  <a
                    href="#how-it-works"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    See how it works
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 4. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  How It Works
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Engineered for effortless calm.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  A quiet, beautifully designed system that disappears into the room and runs in the
                  background of your day.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-7 sm:mt-14 lg:mt-20 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Disperse",
                  copy: "A whisper-quiet device releases a fine mist of beneficial probiotics, with no fans, no fragrance, no harsh chemistry.",
                },
                {
                  step: "02",
                  title: "Colonize",
                  copy: "Probiotics settle on bedding, sofas, rugs, and the surfaces of your home, the places filters never reach.",
                },
                {
                  step: "03",
                  title: "Protect 24/7",
                  copy: "They keep working around the clock to support a cleaner, calmer indoor environment, beautifully and invisibly.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-foreground/15 pt-6">
                  <span className="font-display text-2xl font-semibold tracking-tight text-primary">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal>
              <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                Air purifiers only treat the air passing through a filter. EnviroBiotics Aero keeps
                working on the air <em>and</em> every surface that surrounds you.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 5. DESIGNED FOR (PERSONAS) ============ */}
        <section id="designed-for" className="bg-background py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  Designed For
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  A home that takes care of itself.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {PERSONAS.map((p) => (
                <Reveal key={p.title}>
                  <div className="group overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-1">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                        {p.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. PRODUCTS ============ */}
        <section id="products" className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  Choose Your Device
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Pick your Aero.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  Three beautifully engineered options. Save 10% on any device with code{" "}
                  <span className="font-semibold text-foreground">{PROMO}</span> at checkout.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-7 xl:mt-16 xl:grid-cols-3">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="Essential · Focused Rooms"
                  description="A compact, whisper-quiet device sized for bedrooms, offices, and nurseries."
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  ctaText="Shop BioLogic Mini"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackMini}
                  features={[
                    "Covers up to 300 sq. ft.",
                    "Whisper-quiet, no blue lights",
                    "Cares for bedding, pillows, and upholstery",
                    "Family-, pet-, and child-friendly",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Complete Bundle"
                  tagline="Premium · Whole Home"
                  description="Our zero-compromise system. Cover every room with a beautifully coordinated, multi-device set."
                  price="$399"
                  image={bundleImg}
                  href={LINKS.bundle}
                  highlight
                  ctaText="Get the Bundle"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBundle}
                  features={[
                    "Whole-home, multi-room coverage",
                    "Bedroom, living room, office, and more",
                    "Consistent care across every soft surface",
                    "Best per-room value",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="Pro · Open Living Areas"
                  description="A powerful device for great rooms, basements, and open layouts."
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Shop Biotica 800"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBiotica}
                  features={[
                    "Covers up to 800 sq. ft.",
                    "Great for open-plan homes",
                    "Stronger coverage for high-traffic spaces",
                    "Supports fresher sofas, rugs, and curtains",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 7. COMPARE THE RANGE ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                  Compare the Range
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-5xl">
                  Choose your perfect Aero.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Compare our range of beautifully engineered, whisper-quiet probiotic devices.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-7">
              {COMPARE.map((c, i) => (
                <Reveal key={c.name}>
                  <div
                    className={`flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.16)] ${
                      i === 1 ? "lg:scale-[1.02]" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))]">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="h-full w-full object-contain p-10"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                        {c.tier}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
                      <div className="mt-5 flex-1 space-y-3 border-t border-border/60 pt-5 text-sm">
                        {[
                          ["Retail Price", c.price],
                          ["Coverage", c.coverage],
                          ["Runtime", c.runtime],
                          ["Noise", c.noise],
                          ["Surfaces", c.surfaces],
                          ["Best For", c.best],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-start justify-between gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                              {k}
                            </span>
                            <span className="text-right text-sm font-medium text-foreground">
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={c.href}
                        onClick={() => trackEvent(c.event)}
                        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background hover:bg-foreground/90"
                      >
                        {c.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              All coverage figures tested in-house in typical residential conditions.
            </p>
          </div>
        </section>

        {/* ============ 8. THE EDGE ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[280px] bg-muted sm:min-h-[420px]">
                  <img
                    src={endorsementImg}
                    alt="A calm, beautifully designed living space"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 backdrop-blur sm:bottom-6 sm:left-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      EPA · FDA GRAS · MADE SAFE
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    The EnviroBiotics Edge
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    The new standard for home wellness.
                  </h2>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        icon: Wind,
                        label: "Beyond the filter",
                        copy: "Works on the air and every surface around you.",
                      },
                      {
                        icon: Leaf,
                        label: "Zero harsh chemicals",
                        copy: "Probiotic-based, fragrance-free, MADE SAFE certified.",
                      },
                      {
                        icon: Sparkles,
                        label: "Beautifully effortless",
                        copy: "Whisper-quiet, design-led, runs in the background of your day.",
                      },
                      {
                        icon: ShieldCheck,
                        label: "FDA GRAS strains",
                        copy: "Backed by recognized safety standards and EPA review.",
                      },
                    ].map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <li key={pillar.label} className="flex gap-3">
                          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Icon className="h-4 w-4" strokeWidth={2.5} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">
                              {pillar.label}
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {pillar.copy}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <a href="#products" onClick={() => trackEvent("click_aero_edge_cta")}>
                    <Button
                      size="lg"
                      className="h-12 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
                    >
                      Claim 10% Off
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 9. TESTIMONIALS ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                What Aero homes are saying.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Real reviews coming soon.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-3 lg:gap-6">
              {[0, 1, 2].map((i) => (
                <Reveal key={i}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-dashed border-border bg-card/50 p-5 sm:gap-5 sm:p-7">
                    <div className="flex gap-0.5 text-muted-foreground/40">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-4 w-4" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm italic leading-relaxed text-muted-foreground">
                      No reviews yet.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 10. FEATURE ICONS ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
                {[
                  { label: "Design-led" },
                  { label: "Fragrance-free" },
                  { label: "Family-safe" },
                  { label: "Whisper-quiet" },
                  { label: "Low-maintenance" },
                  { label: "Ships free" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-start gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </div>
                    <div className="text-sm font-semibold text-foreground sm:text-base">
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 11. FAQ ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Aero questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {[
                {
                  q: "What makes EnviroBiotics Aero different from an air purifier?",
                  a: "Air purifiers move air through a filter. Aero releases beneficial probiotics that settle on the air and every surface in the room, the places filters never reach. Many homes use both together.",
                },
                {
                  q: "Is it really quiet?",
                  a: "Yes. Aero devices are whisper-quiet and designed to disappear into the room, including bedrooms and nurseries where silence matters most.",
                },
                {
                  q: "Is it safe to run continuously?",
                  a: "Yes. Aero is fragrance-free, chemical-free, and uses FDA GRAS probiotic strains. It is designed for continuous use in homes with kids, pets, and the whole family.",
                },
                {
                  q: "How much maintenance does it need?",
                  a: "Very little. Most users top up the BioLogic Mini every few weeks. The device shows when a refill is due.",
                },
                {
                  q: "Which device should I choose?",
                  a: "Choose the BioLogic Mini for bedrooms, offices, and nurseries. Choose the Biotica 800 for great rooms or open-plan layouts. Choose the Home Complete Bundle for whole-home coverage at the best per-room value.",
                },
                {
                  q: "How long is the trial?",
                  a: "Every Aero device ships with a 30-day risk-free trial, free shipping, and a 2-year warranty.",
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`q${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ 12. FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-16 sm:py-28 lg:py-44">
          <img
            src={sanctuaryImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))] via-[hsl(var(--primary-soft))]/80 to-transparent"
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                EnviroBiotics Aero &middot; Save 10% with Code {PROMO}
              </p>
              <h2 className="font-display text-[2.7rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
                Welcome to
                <br />
                your sanctuary.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
                Beautifully engineered probiotic protection for the air, bedding, sofas, and every
                surface around you. Use code{" "}
                <span className="font-bold text-foreground">{PROMO}</span> at checkout to save 10%.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#products" onClick={() => trackEvent("click_aero_final_shop")}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-foreground px-10 text-base font-semibold text-background hover:bg-foreground/90"
                  >
                    Shop the Aero Offer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Free shipping &middot; 30-day risk-free trial &middot; 2-year warranty
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ STICKY MOBILE CTA ============ */}
        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur transition-transform duration-300 sm:hidden ${
            showSticky ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <a
            href={LINKS.mini}
            onClick={() => trackEvent("click_aero_sticky_mini")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background"
          >
            Shop Aero &middot; Save 10% with {PROMO}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
    </>
  );
};

export default AeroLandingPage;
