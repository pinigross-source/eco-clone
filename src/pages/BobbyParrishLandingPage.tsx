import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
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
import heroImg from "@/assets/bobby/bobby-hero.avif";
import livingImg from "@/assets/bobby/bobby-ambient.jpg";
import familyImg from "@/assets/bobby/bobby-ambient.jpg";
import bobbyImg from "@/assets/bobby/bobby-portrait.jpg";
import particlesImg from "@/assets/bobby/bobby-kitchen.jpg";
import bathroomImg from "@/assets/bobby/bobby-bedroom.jpg";

const withDiscount = (url: string, code = "Bobby") =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const LINKS = {
  mini: withDiscount(shopifyProductUrl("biologic-mini", "bobby-parrish")),
  biotica: withDiscount(shopifyProductUrl("biotica-800", "bobby-parrish")),
  bundle: withDiscount(shopifyUrl("/products/home-complete-bundle", "bobby-parrish")),
};

/* Reveal-on-scroll (matches dorm page pattern) */
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
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
        Most Popular
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
          <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border/60 pt-5">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">{price}</span>
          {oldPrice && (
            <span className="text-base text-muted-foreground line-through">{oldPrice}</span>
          )}
        </div>
        {offerNote && (
          <p className="mb-4 text-xs font-semibold text-primary">{offerNote}</p>
        )}
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
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          30-day risk-free trial
        </p>
      </div>
    </div>
  </div>
);

const BobbyParrishLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackMini = () => trackEvent("click_bobby_mini");
  const trackBiotica = () => trackEvent("click_bobby_biotica");
  const trackBundle = () => trackEvent("click_bobby_bundle");

  return (
    <>
      <SEOHead
        title="EnviroBiotics Bobby Offer - Save 10% with Code Bobby"
        description="Bobby followers save 10% on EnviroBiotics with code Bobby. Bring probiotic cleaning into your home and support cleaner air, surfaces, fabrics, and everyday spaces without harsh chemicals."
        path="/bobby"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden sm:min-h-[680px]">
          <img
            src={heroImg}
            alt="Bobby Parrish at home"
            className="absolute inset-0 h-full w-full object-cover object-[28%_center] sm:object-[34%_center] lg:object-center"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-black/5 sm:from-black/78 sm:via-black/24" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-5 pb-8 sm:px-8 sm:pb-16 md:px-10 md:pb-20 lg:px-16 lg:pb-28">
            <div className="max-w-[36rem] lg:max-w-3xl">
              <Reveal className="hidden sm:block">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Special Offer for Bobby Followers
                </p>
              </Reveal>
              <Reveal>
                <h1
                  className="font-display text-[2.3rem] font-bold leading-[1.03] tracking-[-0.035em] text-white sm:text-[clamp(3rem,6.2vw,4.25rem)] lg:text-[clamp(4.5rem,8vw,6.25rem)]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                >
                  Breathe Easier. Live <span className="text-primary">Healthier.</span> Save 10%.
                </h1>
              </Reveal>
              <Reveal>
                <p className="mt-4 max-w-[18rem] text-[1rem] font-medium leading-relaxed text-white/92 sm:hidden [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Probiotic home cleaning for air, surfaces, fabrics, and everyday spaces.
                </p>
                <p className="mt-5 hidden max-w-[31rem] text-lg font-medium leading-relaxed text-white/92 sm:block md:text-[1.15rem] lg:max-w-2xl lg:text-[1.6rem] lg:leading-[1.35] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Bring probiotic cleaning into your home with EnviroBiotics. Our system releases
                  beneficial environmental probiotics that help support cleaner air, surfaces,
                  fabrics, and everyday spaces - without harsh chemicals.
                </p>
              </Reveal>
              <Reveal>
                <p className="mt-4 inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-2xl bg-primary/95 px-4 py-2 text-sm font-semibold leading-snug text-primary-foreground shadow-lg shadow-black/20 sm:mt-5 sm:rounded-full sm:px-5 sm:text-base">
                  <span className="sm:hidden">Code</span><span className="hidden sm:inline">Use code</span> <span className="rounded-md bg-white/95 px-2 py-0.5 font-extrabold uppercase tracking-wider text-primary shadow-sm">Bobby</span> <span className="sm:hidden">for 10% off.</span><span className="hidden sm:inline">at checkout to get 10% off your order.</span>
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                  <a href="#products" onClick={() => trackEvent("click_hero_shop_picks")}>
                    <Button
                      size="lg"
                      className="h-[3.25rem] w-full rounded-full bg-white px-7 text-base font-semibold text-foreground hover:bg-white/90 sm:h-14 sm:w-auto sm:px-8"
                    >
                      Shop the Bobby Offer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="#how-it-works"
                    className="hidden h-14 items-center justify-center rounded-full border border-white/40 px-7 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/10 sm:inline-flex"
                  >
                    How It Works
                  </a>
                </div>
              </Reveal>
              <Reveal className="hidden md:block">
                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 lg:mt-10">
                  <span>30-day risk-free trial</span>
                  <span className="opacity-50">·</span>
                  <span>Easy to use</span>
                  <span className="opacity-50">·</span>
                  <span>Designed for everyday home care</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-5 gap-y-8 px-5 sm:gap-10 sm:px-10 lg:grid-cols-4 lg:px-16">
            {[
              { n: "10%", label: "Off with code Bobby" },
              { n: "300", label: "sq. ft. Mini coverage" },
              { n: "800", label: "sq. ft. large space coverage" },
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
                  src={livingImg}
                  alt="A clean-looking home interior"
                  className="h-64 w-full object-cover sm:h-[clamp(360px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-background sm:via-background/70 sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[440px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    Beyond the Air
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                    Your home looks clean.
                    <br />
                    But surfaces collect what you can&apos;t see.
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-foreground/85 sm:mt-5 sm:text-base">
                    Dust, odors, allergens, and microscopic buildup can settle on fabrics,
                    furniture, floors, and everyday surfaces. EnviroBiotics helps support a
                    fresher, more balanced home with beneficial probiotics.
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

            <Reveal>
              <div className="mt-5 overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-black/[0.06] sm:mt-6 sm:p-12">
                <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                  Cleaner support for the spaces you use every day.
                </h3>
                <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
                  Designed to work quietly in the background, helping maintain balance on air,
                  surfaces, fabrics, and objects throughout your home.
                </p>
              </div>
            </Reveal>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
              {[
                {
                  img: bathroomImg,
                  title: "Bedrooms",
                  caption:
                    "Support a fresher sleep environment on bedding, fabrics, furniture, and surrounding surfaces.",
                },
                {
                  img: particlesImg,
                  title: "Kitchens & Living Areas",
                  caption:
                    "Help care for the everyday spaces where your family gathers, eats, relaxes, and spends time together.",
                },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[5/3]">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-6 sm:right-6">
                      <p className="text-base font-semibold sm:text-lg">{item.title}</p>
                      <p className="mt-1 text-xs leading-snug text-white/85 sm:text-sm">{item.caption}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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
                  How EnviroBiotics works.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  A simple probiotic system designed to help clean beyond the air.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-7 sm:mt-14 lg:mt-20 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Release",
                  copy: "The device gently releases beneficial environmental probiotics into your indoor space throughout the day.",
                },
                {
                  step: "02",
                  title: "Settle",
                  copy: "The probiotics move through the room and settle on surfaces, fabrics, furniture, floors, and everyday objects.",
                },
                {
                  step: "03",
                  title: "Support",
                  copy: "They help support a cleaner, fresher, more balanced indoor environment - continuously, naturally, and without harsh chemicals.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-foreground/15 pt-6">
                  <span className="font-display text-2xl font-semibold tracking-tight text-primary">{item.step}</span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.copy}</p>
                </li>
              ))}
            </ol>

            <Reveal>
              <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                Unlike air purifiers that only treat the air passing through a filter, EnviroBiotics
                is designed to support the air, surfaces, and objects throughout your space.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 5. PRODUCTS ============ */}
        <section id="products" className="bg-background py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  Choose Your Device
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Choose your probiotic protection.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  Start small, cover a larger room, or protect multiple spaces. Bobby followers
                  save 10% with code <span className="font-semibold text-foreground">Bobby</span> at checkout.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-7 xl:mt-16 xl:grid-cols-3">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="Best for Small Rooms"
                  description="A compact probiotic device designed for bedrooms, nurseries, home offices, bathrooms, and smaller spaces."
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  ctaText="Shop BioLogic Mini"
                  offerNote="Use code Bobby for 10% off."
                  onClick={trackMini}
                  features={[
                    "Covers up to 300 sq. ft.",
                    "Great for bedrooms and personal spaces",
                    "Easy to place on a shelf, desk, or nightstand",
                    "Helps support cleaner air and surfaces",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Bundle"
                  tagline="Most Popular"
                  description="The best choice for Bobby followers who want broader probiotic support in more than one room."
                  price="$399"
                  image={bundleImg}
                  href={LINKS.bundle}
                  highlight
                  ctaText="Get the Home Bundle"
                  offerNote="Use code Bobby for 10% off."
                  onClick={trackBundle}
                  features={[
                    "Ideal for multi-room coverage",
                    "Great for bedrooms, living rooms, and shared spaces",
                    "Helps support cleaner surfaces throughout the home",
                    "Best value for families",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="Best for Larger Spaces"
                  description="A powerful probiotic device designed for larger rooms, open living areas, basements, and bigger indoor spaces."
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Shop Biotica 800"
                  offerNote="Use code Bobby for 10% off."
                  onClick={trackBiotica}
                  features={[
                    "Covers up to 800 sq. ft.",
                    "Great for open-plan living areas",
                    "Designed for stronger room coverage",
                    "Helps support fresher air, surfaces, and fabrics",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 6. BOBBY ENDORSEMENT ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[280px] bg-muted sm:min-h-[420px]">
                  <img
                    src={bobbyImg}
                    alt="Bobby Parrish"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 backdrop-blur sm:bottom-6 sm:left-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">10M+ followers</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:gap-6 sm:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    A Natural Way to Support Your Home
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    Probiotics that clean your home the way nature intended.
                  </h2>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:text-lg">
                    No harsh chemical sprays. No artificial masking fragrances. No complicated
                    routine. EnviroBiotics works quietly in the background, releasing beneficial
                    environmental probiotics that help support a cleaner, fresher indoor
                    environment every day.
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Bobby followers get 10% off with code <span className="text-primary">Bobby</span>.
                  </p>
                  <a href="#products" onClick={() => trackEvent("click_bobby_endorsement_cta")}>
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

        {/* ============ 7. TESTIMONIALS ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                What families are saying.
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-3 lg:gap-6">
              {[
                {
                  text: "I wanted something that felt more natural than sprays and fragrances. EnviroBiotics gives me a simple way to support a cleaner home every day.",
                  author: "Verified Customer",
                },
                {
                  text: "It was easy to set up, and I love that it works quietly in the background. It feels like a smarter way to care for our indoor space.",
                  author: "Verified Customer",
                },
                {
                  text: "I like knowing it goes beyond the air and helps support the surfaces and fabrics around our home.",
                  author: "Verified Customer",
                },
              ].map((t, i) => (
                <Reveal key={i}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 sm:gap-5 sm:p-7">
                    <div className="flex gap-0.5 text-primary">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-[0.95rem] italic leading-relaxed text-muted-foreground sm:text-base">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.author}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. FEATURE ICONS ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {[
                  {
                    label: "Probiotic Cleaning",
                    desc: "Uses beneficial environmental probiotics to help support a cleaner indoor environment.",
                  },
                  {
                    label: "Beyond the Air",
                    desc: "Designed to reach air, surfaces, fabrics, furniture, and everyday objects.",
                  },
                  {
                    label: "No Harsh Chemicals",
                    desc: "A natural approach to home care without heavy chemical sprays or artificial fragrance.",
                  },
                  {
                    label: "Easy Daily Support",
                    desc: "Simple to use and designed to work quietly in the background.",
                  },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Check className="h-5 w-5" strokeWidth={3} />
                    </div>
                    <div className="mt-2 text-base font-bold text-foreground">{b.label}</div>
                    <div className="text-sm leading-relaxed text-muted-foreground">{b.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 9. FAQ ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Common questions
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {[
                {
                  q: "Is EnviroBiotics an air purifier?",
                  a: "No. EnviroBiotics is different from a traditional air purifier. Air purifiers filter air that passes through the unit. EnviroBiotics releases beneficial environmental probiotics that can move through your space and settle on surfaces, fabrics, and everyday objects.",
                },
                {
                  q: "How do Bobby followers get 10% off?",
                  a: "Use code Bobby at checkout to receive 10% off your EnviroBiotics order.",
                },
                {
                  q: "Does EnviroBiotics replace regular cleaning?",
                  a: "No. EnviroBiotics is designed to support your home between regular cleanings. Continue your normal cleaning routine while using EnviroBiotics to help maintain a fresher, more balanced indoor environment.",
                },
                {
                  q: "Which device should I choose?",
                  a: "Choose BioLogic Mini for bedrooms, nurseries, bathrooms, offices, and smaller rooms up to 300 sq. ft. Choose Biotica 800 for larger rooms and open spaces up to 800 sq. ft. Choose the Home Bundle if you want probiotic support in multiple areas of your home.",
                },
                {
                  q: "Is it safe for everyday home use?",
                  a: "EnviroBiotics is designed for everyday indoor use. For best results, follow the product instructions and use as directed.",
                },
                {
                  q: "How long does it take to start working?",
                  a: "EnviroBiotics begins releasing environmental probiotics once the device is active. Consistent use helps support ongoing probiotic coverage throughout your space.",
                },
                {
                  q: "Can I use it around kids and pets?",
                  a: "EnviroBiotics is designed for home environments. Always use according to the product instructions and place the device where it can operate safely and effectively.",
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

        {/* ============ 10. FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-16 sm:py-28 lg:py-44">
          <img
            src={familyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))] via-[hsl(var(--primary-soft))]/80 to-transparent" />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Bobby Followers Save 10%
              </p>
              <h2 className="font-display text-[2.7rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
                Every surface.
                <br />
                Every room.
                <br />
                A cleaner way to care for your home.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
                Start supporting your indoor environment with beneficial environmental probiotics
                that help clean beyond the air. Use code{" "}
                <span className="font-bold text-foreground">Bobby</span> at checkout to save
                10% on your EnviroBiotics order.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#products" onClick={() => trackEvent("click_final_shop_bobby_offer")}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-foreground px-10 text-base font-semibold text-background hover:bg-foreground/90"
                  >
                    Shop the Bobby Offer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="#products"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-7 text-base font-medium text-foreground transition hover:bg-foreground/5"
                >
                  Compare Devices
                </a>
              </div>
              <p className="mt-8 text-sm font-medium text-foreground/75">
                Use code <span className="font-bold text-foreground">Bobby</span> for 10% off · 30-day risk-free trial · Easy home setup
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
          <div>
            <p className="text-sm font-semibold text-foreground">Save 10% with code Bobby</p>
            <p className="text-xs text-muted-foreground">Bobby followers exclusive</p>
          </div>
          <a href="#products" onClick={() => trackEvent("click_sticky_bobby_offer")}>
            <Button className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Shop offer
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BobbyParrishLandingPage;
