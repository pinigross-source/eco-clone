import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Star,
  ShieldCheck,
  Leaf,
  Clock,
  Heart,
  Baby,
  Bed,
  Sparkles,
  PawPrint,
  Footprints,
  X,
} from "lucide-react";
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
import heroImg from "@/assets/hero-luxury-family.jpg";
import heroImgMobile from "@/assets/mother-child-moment.avif";
import nurseryImg from "@/assets/nursery-lifestyle-1.avif";
import familyImg from "@/assets/family-clean-home.avif";
import endorsementImg from "@/assets/mini-lifestyle-family-new.avif";

const PROMO = "PARENTS";

const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const LINKS = {
  mini: withDiscount(shopifyProductUrl("biologic-mini", "parents-landing")),
  biotica: withDiscount(shopifyProductUrl("biotica-800", "parents-landing")),
  bundle: withDiscount(shopifyUrl("/products/home-complete-bundle", "parents-landing")),
};

/* Reveal-on-scroll */
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
  subtitle?: string;
  description?: string;
  price: string;
  oldPrice?: string;
  features: string[];
  image: string;
  href: string;
  highlight?: boolean;
  badge?: string;
  ctaText: string;
  offerNote?: string;
  onClick: () => void;
};

const ProductCard = ({
  name,
  tagline,
  subtitle,
  description,
  price,
  oldPrice,
  features,
  image,
  href,
  highlight,
  badge,
  ctaText,
  offerNote,
  onClick,
}: ProductCardProps) => (
  <div
    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card transition-transform duration-500 hover:-translate-y-1 ${
      highlight
        ? "ring-2 ring-primary shadow-[0_50px_120px_-40px_hsl(var(--primary)/0.4)]"
        : "ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
    }`}
  >
    {highlight && (
      <div className="absolute right-5 top-5 z-10 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-sm">
        {badge ?? "Parent Favorite"}
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
        {subtitle && (
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-3.5">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-[15px] leading-snug text-muted-foreground sm:text-[15px]"
          >
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
            <span>{f}</span>
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
          className={`flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all ${
            highlight
              ? "bg-primary text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.65)] hover:bg-primary/90"
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

const ParentsLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth-scroll anchor handler
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, eventName?: string) => {
    e.preventDefault();
    if (eventName) trackEvent(eventName);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trackMini = () => trackEvent("click_parents_mini");
  const trackBiotica = () => trackEvent("click_parents_biotica");
  const trackBundle = () => trackEvent("click_parents_bundle");

  return (
    <>
      <SEOHead
        title="Probiotic Room Protection for Families | EnviroBiotics"
        description="Air purifiers help with the air. EnviroBiotics supports the surfaces filters can't reach, crib rails, bedding, toys, rugs, and floors. 30-day risk-free trial."
        path="/parents"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden sm:min-h-[700px]">
          <picture>
            <source media="(max-width: 1023px)" srcSet={heroImgMobile} />
            <img
              src={heroImg}
              alt="Parent and child in a calm, clean home"
              className="absolute inset-0 h-full w-full object-cover object-[50%_25%] sm:object-[50%_30%] lg:object-[30%_center]"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
          {/* Lighter gradient: brighter image, still readable */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/35 sm:via-45% sm:to-transparent"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-5 pb-10 text-center sm:px-8 sm:pb-20 sm:text-left md:px-10 md:pb-24 lg:px-16 lg:pb-32">
            <div className="mx-auto max-w-[36rem] sm:mx-0 lg:max-w-3xl">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  A different kind of room protection
                </p>
              </Reveal>
              <Reveal>
                <h1
                  className="font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-[clamp(2.85rem,5.8vw,4.25rem)] lg:text-[clamp(4.25rem,7.4vw,5.75rem)]"
                  style={{ textShadow: "0 2px 28px rgba(0,0,0,0.55)" }}
                >
                  Their room looks clean.
                  <br />
                  But filters can&apos;t reach the{" "}
                  <span className="text-primary">crib rail.</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="mx-auto mt-6 max-w-[34rem] text-[1.05rem] font-medium leading-[1.55] text-white/95 sm:mt-7 sm:max-w-[34rem] sm:text-lg lg:max-w-2xl lg:text-[1.35rem] lg:leading-[1.4] [text-shadow:0_1px_14px_rgba(0,0,0,0.6)]">
                  EnviroBiotics releases beneficial probiotics that travel through the room and
                  settle on bedding, toys, floors, corners, and the surfaces your child touches
                  every day.
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href="#products"
                    onClick={(e) => smoothScroll(e, "products", "click_parents_hero_shop")}
                  >
                    <Button
                      size="lg"
                      className="h-[3.6rem] w-full rounded-full bg-primary px-10 text-[17px] font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.65)] hover:bg-primary/90 sm:h-[3.75rem] sm:w-auto sm:text-[17px]"
                    >
                      Protect Their Room
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={(e) => smoothScroll(e, "how-it-works", "click_parents_hero_how")}
                    className="inline-flex h-[3.6rem] w-full items-center justify-center rounded-full border border-white/70 bg-white/10 px-8 text-[16px] font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:h-[3.75rem] sm:w-auto"
                  >
                    See How It Works
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <p
                  className="mt-8 text-[13px] font-medium leading-relaxed text-white/95 sm:mt-9 sm:text-[14px]"
                  style={{ textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
                >
                  30-day risk-free trial · No ozone · No harsh chemicals · Up to 300 sq ft
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-5 sm:grid-cols-3 sm:gap-8 sm:px-10 lg:px-16">
            {[
              { n: "24/7", label: "Continuous probiotic support" },
              { n: "Up to 300 sq ft", label: "Made for bedrooms and nurseries" },
              { n: "30-day trial", label: "Love it or send it back" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="rounded-2xl bg-background/60 px-5 py-6 text-center ring-1 ring-black/[0.04] sm:bg-transparent sm:ring-0">
                  <div className="font-display text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-primary sm:text-[2.4rem] lg:text-[2.8rem]">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/70 sm:mt-3 sm:text-[12px] sm:tracking-[0.18em]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ 3. COMPARISON (moved higher) ============ */}
        <section id="compare" className="bg-background py-16 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Why filters aren&apos;t the whole story
                </p>
                <h2 className="font-display text-[2.25rem] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-[2.85rem] lg:text-[3.5rem] lg:leading-[1.04]">
                  Air filters help with the air.
                  <br />
                  <span className="text-primary">Kids live on the surfaces.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.7] text-muted-foreground sm:text-[1.15rem]">
                  Traditional air purifiers only treat air that passes through the device. But the
                  things your child touches every day &mdash; crib rails, blankets, toys, rugs, and
                  floors &mdash; need support too.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-2 md:gap-6">
                {/* Air purifier column */}
                <div className="rounded-3xl bg-card p-7 ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Traditional Air Purifier
                  </p>
                  <h3 className="mt-3 font-display text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                    Air that moves through a filter
                  </h3>
                  <ul className="mt-7 space-y-5">
                    {[
                      "Filters air that passes through it",
                      "Focuses mainly on airborne particles",
                      "Works in one device location",
                      "Requires filter replacement",
                      "Does not treat surfaces directly",
                    ].map((row) => (
                      <li
                        key={row}
                        className="flex items-start gap-3.5 text-[15px] leading-relaxed text-muted-foreground sm:text-base"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-foreground/8 text-foreground/55 ring-1 ring-foreground/10">
                          <X className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {row}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* EnviroBiotics column */}
                <div className="relative rounded-3xl bg-[hsl(var(--primary-soft))] p-7 ring-2 ring-primary/40 shadow-[0_30px_80px_-40px_hsl(var(--primary)/0.4)] sm:p-10">
                  <div className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-sm">
                    Room-wide
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                    EnviroBiotics
                  </p>
                  <h3 className="mt-3 font-display text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                    Air <em>and</em> the surfaces kids touch
                  </h3>
                  <ul className="mt-7 space-y-5">
                    {[
                      "Reaches air, surfaces, fabrics, and objects",
                      "Supports the room between regular cleanings",
                      "Settles on bedding, toys, rugs, and floors",
                      "Runs quietly 24/7",
                      "Uses beneficial probiotics, not harsh chemicals",
                    ].map((row) => (
                      <li
                        key={row}
                        className="flex items-start gap-3.5 text-[15px] leading-relaxed text-foreground/90 sm:text-base"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {row}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 flex justify-center">
                <a
                  href="#products"
                  onClick={(e) => smoothScroll(e, "products", "click_parents_compare_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-primary px-9 text-[16px] font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90"
                  >
                    Protect More Than the Air
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 4. NURSERY STORY ============ */}
        <section className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.24)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28)]">
                <img
                  src={nurseryImg}
                  alt="A clean, modern nursery"
                  className="h-64 w-full object-cover sm:h-[clamp(380px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-background sm:from-25% sm:via-background/85 sm:via-55% sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[520px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    What filters miss
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
                    The nursery looks spotless.
                    <br />
                    But the <span className="text-primary">crib rail</span> tells a different story.
                  </h2>
                  <p className="mt-5 text-[1rem] font-medium leading-[1.7] text-foreground/85 sm:mt-6 sm:text-[1.05rem]">
                    Dust settles. Tiny hands explore. Plush toys collect what air filters never
                    touch. EnviroBiotics helps support the surfaces around your child, not just the
                    air above them.
                  </p>
                  <a
                    href="#how-it-works"
                    onClick={(e) => smoothScroll(e, "how-it-works")}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    See how it works
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Visual callouts */}
            <Reveal>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                {[
                  { icon: Bed, label: "Crib rail" },
                  { icon: Heart, label: "Plush toys" },
                  { icon: Sparkles, label: "Bedding" },
                  { icon: Footprints, label: "Rugs" },
                  { icon: Baby, label: "Changing table" },
                  { icon: PawPrint, label: "Pet areas" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-background p-5 text-center ring-1 ring-black/[0.05] shadow-[0_8px_24px_-18px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:ring-primary/30 sm:p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <span className="text-[14px] font-semibold leading-tight text-foreground sm:text-[15px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 5. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  How it works
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
                  Friendly probiotics.
                  <br />
                  Every surface. All night.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Disperse",
                  copy: "The device gently releases beneficial probiotics into the room, without spraying harsh chemicals or adding noise.",
                },
                {
                  step: "02",
                  title: "Settle",
                  copy: "The probiotics travel through the air and settle on bedding, toys, fabrics, floors, corners, and everyday surfaces.",
                },
                {
                  step: "03",
                  title: "Support 24/7",
                  copy: "They help support a balanced indoor microbiome between regular cleanings.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-3xl bg-card p-8 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.22)] sm:p-10"
                >
                  <span className="font-display text-[2.5rem] font-bold leading-none tracking-tight text-primary sm:text-[3rem]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-[1.6rem] font-semibold tracking-tight text-foreground sm:text-[1.85rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.7] text-muted-foreground sm:text-[1.05rem]">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal>
              <p className="mt-12 max-w-3xl text-[15px] italic leading-relaxed text-muted-foreground sm:text-base">
                EnviroBiotics does not replace cleaning, ventilation, or filtration. It adds another
                layer of room support.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 6. PRODUCTS ============ */}
        <section id="products" className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Choose your room protection
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
                  Pick the protection for their room.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Start with one nursery, bedroom, or playroom. Add more coverage whenever your home
                  needs it.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-7">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="For nurseries &amp; kids' bedrooms"
                  subtitle="Best starter choice"
                  description="Best for nurseries and kids' bedrooms. Up to 300 sq ft. Quiet, continuous probiotic support for one room."
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  highlight
                  badge="Parent Favorite"
                  ctaText="Protect Their Room"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackMini}
                  features={[
                    "Up to 300 sq ft of coverage",
                    "Quiet, continuous probiotic support",
                    "Ideal for one room",
                    "30-day trial included",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Bundle"
                  tagline="Best for the whole home"
                  description="Best for room-by-room family protection. Great for bedrooms, playrooms, and shared spaces."
                  price="$399"
                  image={bundleImg}
                  href={LINKS.bundle}
                  ctaText="Choose This Option"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBundle}
                  features={[
                    "Covers multiple rooms at once",
                    "Best per-room value",
                    "Great for bedrooms, playrooms, and family areas",
                    "Consistent protection wherever they play",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="For larger &amp; shared spaces"
                  description="Best for larger rooms and open family areas. Up to 800 sq ft of continuous probiotic support."
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Choose This Option"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBiotica}
                  features={[
                    "Up to 800 sq ft of coverage",
                    "Great for living rooms and open areas",
                    "Stronger coverage for high-traffic spaces",
                    "Helps support fresher fabrics and furniture",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 7. WHY PARENTS PICK US ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[280px] bg-muted sm:min-h-[420px]">
                  <img
                    src={endorsementImg}
                    alt="Family with EnviroBiotics device in a calm living room"
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
                <div className="flex flex-col justify-center gap-7 p-6 sm:gap-8 sm:p-14 lg:p-16">
                  <div>
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                      Why parents pick us
                    </p>
                    <h2 className="font-display text-[1.95rem] font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.6rem]">
                      Why parents pick us over another filter.
                    </h2>
                  </div>
                  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
                    {[
                      {
                        icon: Sparkles,
                        label: "Beyond the air",
                        copy: "Supports surfaces, fabrics, toys, bedding, and corners, not only air passing through a device.",
                      },
                      {
                        icon: Leaf,
                        label: "No harsh chemicals",
                        copy: "Continuous room support without sprays, bleach, ozone, or strong fragrance.",
                      },
                      {
                        icon: Clock,
                        label: "Built for everyday life",
                        copy: "Quiet, simple, and made to work in the background while your child sleeps, plays, and grows.",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Easy to try",
                        copy: "Start with one room and test it for 30 days risk-free.",
                      },
                    ].map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <li key={pillar.label} className="flex gap-4">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-primary/15 text-primary">
                            <Icon className="h-5 w-5" strokeWidth={2.25} />
                          </div>
                          <div>
                            <div className="text-[15px] font-semibold text-foreground sm:text-base">
                              {pillar.label}
                            </div>
                            <div className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                              {pillar.copy}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <a
                    href="#products"
                    onClick={(e) => smoothScroll(e, "products", "click_parents_edge_cta")}
                  >
                    <Button
                      size="lg"
                      className="h-[3.25rem] rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90"
                    >
                      Protect Their Room
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 8. TESTIMONIALS ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Testimonials
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                  What parents are saying.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-6">
              {[
                {
                  quote:
                    "I liked that it was not another loud machine in the nursery. We plugged it in and it simply became part of the room.",
                  name: "Parent of a toddler",
                },
                {
                  quote:
                    "The idea of supporting the surfaces my child touches made more sense to me than only filtering the air.",
                  name: "Nursery customer",
                },
                {
                  quote:
                    "We still clean like normal, but this gives us an extra layer of confidence between cleanings.",
                  name: "Family customer",
                },
              ].map((t, i) => (
                <Reveal key={i}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-7">
                    <div className="flex gap-0.5 text-primary">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-primary" />
                      ))}
                    </div>
                    <p className="flex-1 text-[15px] leading-relaxed text-foreground sm:text-base">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      &mdash; {t.name}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. FAQ ============ */}
        <section className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                Q&amp;A
              </p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                Parent questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-8 w-full space-y-3 sm:mt-10">
              {[
                {
                  q: "Is EnviroBiotics safe to use around children?",
                  a: "Yes. EnviroBiotics is fragrance-free and uses probiotics on the FDA's GRAS list (Generally Recognized As Safe), the same kinds of beneficial microbes already present in nature, soil, and on healthy skin. It's designed for everyday use in homes with babies, kids, and pets. As with any product, follow the included instructions and place the device where it can operate as directed.",
                },
                {
                  q: "How is this different from a HEPA air purifier?",
                  a: "A HEPA purifier traps particles in the air that pass through its filter. EnviroBiotics works on the whole room: it releases beneficial probiotics that settle on bedding, toys, rugs, and surfaces a filter cannot reach. Many families use both, the purifier for airflow, EnviroBiotics for surfaces.",
                },
                {
                  q: "Does this replace regular cleaning?",
                  a: "No. EnviroBiotics is a layer of support between cleanings, not a substitute for them. Keep cleaning, washing bedding, and ventilating as you normally would. EnviroBiotics simply helps maintain the room in the hours and days in between.",
                },
                {
                  q: "Can I use it with an air purifier?",
                  a: "Yes. The two are complementary. A purifier focuses on air that moves through its filter. EnviroBiotics supports the air and the everyday surfaces around it. Running them together is completely fine.",
                },
                {
                  q: "Where do the probiotics go?",
                  a: "Once dispersed, the probiotics travel through the room's air currents and settle on the surfaces around them, bedding, plush toys, rugs, floors, dresser tops, and corners. That is where they help support a balanced indoor microbiome over time.",
                },
                {
                  q: "Will I smell anything?",
                  a: "There is no added fragrance and nothing perfumed. Most parents describe the room as simply smelling clean and neutral, not scented.",
                },
                {
                  q: "How long does one cartridge last?",
                  a: "Refill cycles depend on the device model and the size of the room. For the BioLogic Mini in a typical nursery, many parents refill every few weeks. The device makes it easy to tell when a refill is due.",
                },
                {
                  q: "What if I do not notice a difference?",
                  a: "Every home is different. That is why every device comes with a 30-day risk-free trial. Try it in your child's room. If it is not a fit, send it back for a full refund, no questions asked.",
                },
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`q${idx}`}
                  className="group rounded-2xl border border-border/60 bg-background px-5 transition-all data-[state=open]:border-primary/40 sm:px-6"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline sm:text-[17px]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ 10. FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-16 sm:py-28 lg:py-40">
          <img
            src={familyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))] via-[hsl(var(--primary-soft))]/85 to-[hsl(var(--primary-soft))]/40"
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Start with one room
              </p>
              <h2 className="font-display text-[2.4rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                Give them air you can trust.
                <br />
                <span className="text-primary">
                  And surfaces you do not have to worry about.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground/85 sm:text-lg">
                Start with one room. Support the places your child sleeps, plays, crawls, and
                touches every day.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="#products"
                  onClick={(e) => smoothScroll(e, "products", "click_parents_final_shop")}
                >
                  <Button
                    size="lg"
                    className="h-14 w-full rounded-full bg-primary px-9 text-base font-semibold text-primary-foreground shadow-[0_12px_30px_-10px_hsl(var(--primary)/0.55)] hover:bg-primary/90 sm:w-auto"
                  >
                    Protect Their Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="#compare"
                  onClick={(e) => smoothScroll(e, "compare", "click_parents_final_compare")}
                  className="inline-flex h-14 w-full items-center justify-center rounded-full border border-foreground/25 bg-background/60 px-7 text-base font-medium text-foreground backdrop-blur transition hover:bg-background sm:w-auto"
                >
                  Compare Your Options
                </a>
              </div>
              <p className="mt-8 text-sm font-medium text-foreground/75">
                30-day risk-free trial · No ozone · No harsh chemicals
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Sticky mobile bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur sm:hidden transition-transform duration-300 ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              30-day risk-free trial
            </p>
            <p className="truncate text-xs text-muted-foreground">No ozone · No harsh chemicals</p>
          </div>
          <a
            href="#products"
            onClick={(e) => smoothScroll(e, "products", "click_parents_sticky_shop")}
          >
            <Button className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Protect Their Room
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ParentsLandingPage;
