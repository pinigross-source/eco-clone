import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, ShieldCheck, Leaf, Clock, Heart } from "lucide-react";
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
import nurseryAltImg from "@/assets/health-scandi-nursery.jpg";
import bedroomImg from "@/assets/difference-kidsroom.jpg";
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
        Parent Pick
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

const ParentsLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackMini = () => trackEvent("click_parents_mini");
  const trackBiotica = () => trackEvent("click_parents_biotica");
  const trackBundle = () => trackEvent("click_parents_bundle");

  return (
    <>
      <SEOHead
        title="Probiotic Air & Surface Care for Families | EnviroBiotics"
        description="Cleaner air and safer surfaces for nurseries, playrooms, and bedrooms. Chemical-free, safe for kids and pets. Save 10% with code PARENTS."
        path="/parents"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden sm:min-h-[680px]">
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
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-black/5 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35 sm:via-40% sm:to-transparent"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-5 pb-8 text-center sm:px-8 sm:pb-16 sm:text-left md:px-10 md:pb-20 lg:px-16 lg:pb-28">
            <div className="mx-auto max-w-[36rem] sm:mx-0 lg:max-w-3xl">
              <Reveal className="hidden sm:block">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Built for Parents · Safe for Kids &amp; Pets
                </p>
              </Reveal>
              <Reveal>
                <h1
                  className="font-display text-[2.5rem] font-bold leading-[1.02] tracking-[-0.035em] text-white sm:text-[clamp(3rem,6.2vw,4.25rem)] lg:text-[clamp(4.5rem,8vw,6.25rem)]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                >
                  <span className="block sm:inline">The air they breathe.</span>{" "}
                  <span className="block sm:inline text-primary">Protected 24/7.</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="mx-auto mt-3 max-w-[22rem] text-[1.0625rem] font-medium leading-[1.45] text-white/95 sm:hidden [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                  <span className="block">Probiotic protection for the air,</span>
                  <span className="block">cribs, toys &amp; surfaces kids touch.</span>
                </p>
                <p className="mt-5 hidden max-w-[31rem] text-lg font-medium leading-relaxed text-white/92 sm:block md:text-[1.15rem] lg:max-w-2xl lg:text-[1.6rem] lg:leading-[1.35] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  HEPA filters move air. Sprays mask odors. EnviroBiotics releases beneficial
                  probiotics that keep working on every surface a filter can&apos;t reach &mdash;
                  cribs, playmats, stuffies, bedding &mdash; without harsh chemicals.
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
                  <span className="hidden sm:inline">at checkout to save 10% on your order.</span>
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
                  <a href="#products" onClick={() => trackEvent("click_parents_hero_shop")}>
                    <Button
                      size="lg"
                      className="h-[3.25rem] w-full rounded-full bg-white px-7 text-base font-semibold text-foreground hover:bg-white/90 sm:h-14 sm:w-auto sm:px-8"
                    >
                      Shop the Parent Offer
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
                  <span>EPA</span>
                  <span className="opacity-50">·</span>
                  <span>FDA GRAS</span>
                  <span className="opacity-50">·</span>
                  <span>MADE SAFE</span>
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
              { n: "24/7", label: "Surface protection" },
              { n: "0", label: "Harsh chemicals or fragrance" },
              { n: "300", label: "sq. ft. nursery coverage" },
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
                  src={nurseryImg}
                  alt="A clean, modern nursery"
                  className="h-64 w-full object-cover sm:h-[clamp(360px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-background sm:via-background/70 sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[460px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    What Your HEPA Can&apos;t Reach
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                    The nursery looks spotless.
                    <br />
                    But the crib rail tells a different story.
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-foreground/85 sm:mt-5 sm:text-base">
                    Dust, dander, dust-mite allergens and odor-causing microbes settle on cribs,
                    bedding, playmats, and stuffed animals &mdash; the surfaces filters never
                    touch. EnviroBiotics works where kids actually live.
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

            <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
              {[
                {
                  img: bedroomImg,
                  title: "The Kids&apos; Room",
                  caption:
                    "Help support a fresher sleep environment on bedding, plush toys, and the surfaces little hands touch all day.",
                },
                {
                  img: nurseryAltImg,
                  title: "The Nursery",
                  caption:
                    "A gentle, chemical-free approach to caring for the space where they nap, play, and grow.",
                },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[5/3]">
                    <img
                      src={item.img}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-6 sm:right-6">
                      <p
                        className="text-base font-semibold sm:text-lg"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <p
                        className="mt-1 text-xs leading-snug text-white/85 sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: item.caption }}
                      />
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
                  Friendly probiotics. Every surface. All night.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  A simple, parent-safe system that goes beyond a filter to care for the rooms
                  your kids spend the most time in.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-7 sm:mt-14 lg:mt-20 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Disperse",
                  copy: "The device quietly releases a fine mist of beneficial environmental probiotics into the room throughout the day.",
                },
                {
                  step: "02",
                  title: "Colonize",
                  copy: "Probiotics settle on cribs, bedding, plush toys, playmats and everyday surfaces &mdash; the places kids actually touch.",
                },
                {
                  step: "03",
                  title: "Protect 24/7",
                  copy: "They keep competing with allergens and odor-causing microbes around the clock &mdash; naturally, no chemicals required.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-foreground/15 pt-6">
                  <span className="font-display text-2xl font-semibold tracking-tight text-primary">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-base leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: item.copy }}
                  />
                </li>
              ))}
            </ol>

            <Reveal>
              <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                Air purifiers only treat the air passing through a filter. EnviroBiotics keeps
                working on the air <em>and</em> every surface in your child&apos;s room.
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
                  Pick the protection for their room.
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  The Mini is purpose-built for nurseries and kids&apos; rooms. Save 10% on any
                  device with code{" "}
                  <span className="font-semibold text-foreground">{PROMO}</span> at checkout.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-7 xl:mt-16 xl:grid-cols-3">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="Parent Pick · Nursery & Kids' Rooms"
                  description="A compact, quiet probiotic device sized for nurseries, kids' rooms, and bedrooms. Fits on a dresser or nightstand."
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  highlight
                  ctaText="Shop BioLogic Mini"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackMini}
                  features={[
                    "Covers up to 300 sq. ft. &mdash; perfect nursery size",
                    "Whisper-quiet, no blue lights, won't disturb sleep",
                    "Safe to run around babies, kids, and pets",
                    "Helps care for cribs, bedding, and plush toys",
                  ].map((s) => s.replace("&mdash;", "—"))}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Bundle"
                  tagline="Best Value · Whole Home"
                  description="Cover the nursery, the playroom, and the rest of the house with the best-value bundle for growing families."
                  price="$399"
                  image={bundleImg}
                  href={LINKS.bundle}
                  ctaText="Get the Home Bundle"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBundle}
                  features={[
                    "Multi-room coverage for growing families",
                    "Nursery, kids' room, living room, and more",
                    "Consistent protection wherever they play",
                    "Best per-room value",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="Best for Open Living Areas"
                  description="A powerful device for playrooms, basements, and open living spaces where the whole family gathers."
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Shop Biotica 800"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBiotica}
                  features={[
                    "Covers up to 800 sq. ft.",
                    "Great for playrooms and open-plan homes",
                    "Stronger room coverage for high-traffic spaces",
                    "Helps support fresher fabrics and furniture",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 6. THE EDGE (Why parents choose EnviroBiotics) ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-40">
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
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    The EnviroBiotics Edge
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    Why parents pick us over a filter.
                  </h2>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        icon: Heart,
                        label: "Safe for kids &amp; pets",
                        copy: "Designed to run safely around babies, toddlers, and animals.",
                      },
                      {
                        icon: Leaf,
                        label: "Zero harsh chemicals",
                        copy: "Probiotic-based, fragrance-free, MADE SAFE certified.",
                      },
                      {
                        icon: Clock,
                        label: "Works 24/7 on surfaces",
                        copy: "Goes beyond air to crib rails, toys, bedding, and floors.",
                      },
                      {
                        icon: ShieldCheck,
                        label: "FDA GRAS probiotic strains",
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
                            <div
                              className="text-sm font-semibold text-foreground"
                              dangerouslySetInnerHTML={{ __html: pillar.label }}
                            />
                            <div className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {pillar.copy}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <a href="#products" onClick={() => trackEvent("click_parents_edge_cta")}>
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

        {/* ============ 7. TESTIMONIALS (empty structure per reviews policy) ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                What parents are saying.
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

        {/* ============ 8. FEATURE ICONS ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
                {[
                  { label: "Nursery-safe" },
                  { label: "Fragrance-free" },
                  { label: "Pet-safe" },
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

        {/* ============ 9. FAQ ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Parent questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {[
                {
                  q: "Is it safe to run around a newborn?",
                  a: "EnviroBiotics is fragrance-free, chemical-free, and uses FDA GRAS probiotic strains. It's designed to run safely in nurseries and around babies. Always follow product instructions and place the device where it can operate as directed.",
                },
                {
                  q: "Will it trigger my kid's allergies?",
                  a: "EnviroBiotics doesn't add fragrance, dyes, or harsh chemicals to the air. Many parents use it specifically to help support a cleaner environment for kids sensitive to dust and dander. If your child has known allergies, introduce gradually and consult your pediatrician.",
                },
                {
                  q: "Does this replace my HEPA air purifier?",
                  a: "No &mdash; they do different jobs. HEPA filters trap particles in the air that passes through them. EnviroBiotics releases beneficial probiotics that settle on the air and on every surface in the room. Many families use both together.",
                },
                {
                  q: "Is it safe with pets?",
                  a: "Yes. EnviroBiotics is designed for homes with pets and is widely used in households with cats, dogs, and small animals.",
                },
                {
                  q: "How often do I need to refill it?",
                  a: "Refill cycles depend on the device and room size. Most parents refill the BioLogic Mini every few weeks. The device makes it easy to tell when a refill is due.",
                },
                {
                  q: "When will I notice a difference?",
                  a: "Many parents notice a fresher-smelling room within the first few days. Probiotic colonization on surfaces builds over time with consistent use.",
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`q${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    <span dangerouslySetInnerHTML={{ __html: item.a }} />
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
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))] via-[hsl(var(--primary-soft))]/80 to-transparent"
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Parents Save 10% &middot; Code {PROMO}
              </p>
              <h2 className="font-display text-[2.7rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
                Give them air
                <br />
                you can trust.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
                Probiotic protection for the air, cribs, bedding, and every surface your kids
                touch. Use code{" "}
                <span className="font-bold text-foreground">{PROMO}</span> at checkout to save 10%.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#products" onClick={() => trackEvent("click_parents_final_shop")}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-foreground px-10 text-base font-semibold text-background hover:bg-foreground/90"
                  >
                    Shop the Parent Offer
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
                Use code <span className="font-bold text-foreground">{PROMO}</span> for 10% off ·
                30-day risk-free trial · Free shipping
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
            <p className="text-sm font-semibold text-foreground">Save 10% with code {PROMO}</p>
            <p className="text-xs text-muted-foreground">Parents exclusive</p>
          </div>
          <a href="#products" onClick={() => trackEvent("click_parents_sticky_shop")}>
            <Button className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Shop offer
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ParentsLandingPage;
