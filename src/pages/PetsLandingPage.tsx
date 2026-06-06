import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Leaf,
  Clock,
  Heart,
  BedDouble,
  Sofa,
  Home as HomeIcon,
  PawPrint,
  Box,
  Layers,
  Volume2,
  Sparkles,
  Filter,
  Dot,
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
import heroImg from "@/assets/pet-scandinavian-bright.jpg";
import petBedImg from "@/assets/difference-petbed.jpg";
import petScandiImg from "@/assets/mold-scandi-pet.jpg";
import petSofaImg from "@/assets/difference-sofa.jpg";
import familyImg from "@/assets/family-clean-home.avif";
import endorsementImg from "@/assets/testimonial-dog-owner.avif";

const PROMO = "PETS";

const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const LINKS = {
  mini: withDiscount(shopifyProductUrl("biologic-mini", "pets-landing")),
  biotica: withDiscount(shopifyProductUrl("biotica-800", "pets-landing")),
  bundle: withDiscount(shopifyUrl("/products/home-complete-bundle", "pets-landing")),
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
  starterNote?: string;
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
  starterNote,
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
        Pet Pick
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
        {starterNote && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {starterNote}
          </p>
        )}
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

const PetsLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackMini = () => trackEvent("click_pets_mini");
  const trackBiotica = () => trackEvent("click_pets_biotica");
  const trackBundle = () => trackEvent("click_pets_bundle");

  return (
    <>
      <SEOHead
        title="Pet Dander & Odor Control for Your Home | EnviroBiotics"
        description="Vacuuming gets the hair. EnviroBiotics gets what you can't see — breaking down pet dander and odor in the couch, carpet, and bedding where they settle. No fragrance, no chemicals. Meet Biotica."
        path="/pets"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative w-full overflow-hidden h-[84svh] min-h-[600px] sm:h-[720px] lg:h-[760px]">
          <img
            src={heroImg}
            alt="A calm dog and owner in a bright, airy Scandinavian living room"
            className="absolute inset-0 h-full w-full object-cover object-[60%_40%] sm:object-[58%_center] lg:object-[55%_center]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#f7f3ec]/85 via-[#f7f3ec]/35 to-transparent sm:bg-gradient-to-r sm:from-[#f7f3ec]/90 sm:via-[#f7f3ec]/40 sm:via-40% sm:to-transparent"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-center px-5 pb-8 pt-24 text-center sm:items-start sm:px-10 sm:pb-0 sm:pt-0 sm:text-left lg:px-16">
            <div className="mx-auto w-full max-w-[36rem] sm:mx-0 sm:max-w-[40.625rem]">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Built for pet homes
                </p>
              </Reveal>
              <Reveal>
                <h1 className="font-display font-bold tracking-[-0.03em] text-foreground text-[clamp(2.125rem,7.5vw,2.5rem)] leading-[1.06] sm:text-[clamp(2.875rem,5vw,3.375rem)] sm:leading-[1.05] lg:text-[clamp(3.625rem,4.4vw,4.375rem)] lg:leading-[1.04]">
                  It&apos;s not the hair
                  <br />
                  you can see. It&apos;s the
                  <br />
                  <span className="text-primary">dander you can&apos;t.</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="mx-auto mt-5 max-w-[34rem] text-[1rem] font-medium leading-[1.6] text-foreground/85 sm:mx-0 sm:mt-6 sm:max-w-[38.75rem] sm:text-[1.1rem] sm:leading-[1.6] lg:text-[1.15rem]">
                  The hair you vacuum is the easy part. Dander and odor are microscopic &mdash; they settle deep into the couch, carpet, and bedding your pet loves, where vacuums and filters can&apos;t reach. EnviroBiotics breaks them down right there, at the source.
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
                  <a
                    href="#products"
                    onClick={() => trackEvent("click_pets_hero_shop")}
                    className="sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="h-[3.5rem] w-full rounded-full bg-primary px-9 text-[16px] font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.65)] hover:bg-primary/90 sm:w-auto"
                    >
                      Get the Pet-Proof Home
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={() => trackEvent("click_pets_hero_how")}
                    className="inline-flex h-[3.5rem] w-full items-center justify-center rounded-full border border-foreground/25 bg-background/80 px-8 text-[15px] font-semibold text-foreground backdrop-blur-md transition hover:bg-background sm:w-auto"
                  >
                    See How It Works
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <p className="mt-7 text-[12.5px] font-medium leading-relaxed text-foreground/70 sm:mt-8 sm:text-[13px]">
                  Takes 60 seconds &middot; No sprays &middot; No fragrance &middot; 30-day risk-free trial
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-5 sm:grid-cols-3 sm:gap-8 sm:px-10 lg:px-16">
            {[
              { n: "24/7", label: "Surface-focused support" },
              { n: "300 sq ft", label: "Per-room coverage" },
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

        {/* ============ 3. DIRECT COMPARISON ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  The Real Problem
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.05]">
                  You&apos;re not a messy pet owner.
                  <br />
                  <span className="text-primary">You&apos;re up against something you can&apos;t see.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  You vacuum the hair. You wash the covers. You stay on top of it. But two things your pet leaves behind never show up on a lint roller: dander and odor. Both are microscopic. Both settle deep into the soft surfaces where your pet spends its days &mdash; the couch, the rug, the bed, the curtains.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-7">
              {/* What you do now */}
              <Reveal>
                <div className="flex h-full flex-col rounded-3xl bg-card p-7 ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.16)] sm:p-9">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Filter className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      What you&apos;re doing now
                    </h3>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-4">
                    {[
                      "Vacuum handles the visible hair — you&apos;ve got this",
                      "Microscopic dander settles back fast",
                      "Lingering odor masked by sprays or candles",
                      "Deep in couch &amp; carpet — out of reach",
                      "Builds back up between cleanings",
                    ].map((row) => (
                      <li
                        key={row}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted-foreground"
                      >
                        <Dot className="mt-0.5 h-5 w-5 flex-none text-muted-foreground/60" strokeWidth={4} />
                        <span dangerouslySetInnerHTML={{ __html: row }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* EnviroBiotics column */}
              <Reveal>
                <div className="relative flex h-full flex-col rounded-3xl bg-card p-7 ring-2 ring-primary/40 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)] sm:p-9">
                  <div className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                    The Part That&apos;s Left
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Sparkles className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                      EnviroBiotics
                    </h3>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-4">
                    {[
                      "Breaks down dander on the surface",
                      "Removes odor at the source — no fragrance layered on top",
                      "Works right in the couch, rug, and bedding",
                      "Keeps working continuously between cleanings",
                      "Chemical-free around the pets and people in the room",
                    ].map((row) => (
                      <li
                        key={row}
                        className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-foreground/85"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-none text-primary" strokeWidth={2.6} />
                        <span>{row}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <p className="mx-auto mt-8 max-w-xl text-center text-sm italic text-muted-foreground sm:text-base">
                A vacuum gets what you can see. This gets what you can&apos;t.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex justify-center sm:mt-12">
                <a href="#products" onClick={() => trackEvent("click_pets_compare_cta")}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-primary px-9 text-[15px] font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.55)] hover:bg-primary/90"
                  >
                    Get the Pet-Proof Home
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 4. PET BED STORY + ZONE CARDS ============ */}
        <section className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.24)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28)]">
                <img
                  src={petBedImg}
                  alt="A pet bed in a clean living room"
                  className="h-64 w-full object-cover sm:h-[clamp(360px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-card sm:via-card/80 sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[480px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    The Shift
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                    Don&apos;t just clean the surface.
                    <br />
                    Keep it clean.
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-foreground/85 sm:mt-5 sm:text-base">
                    EnviroBiotics settles good cultures onto your soft surfaces, where they quietly break down the dander and odor-causing residue your pet leaves behind &mdash; and keep working between cleanings. Not a scent layered on top. Not a once-and-done wipe. A surface that stays cleaner on its own, long after the vacuum&apos;s put away.
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

            {/* Surface zone cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
              {[
                { icon: BedDouble, title: "Pet Beds", copy: "Where fur, oils, and everyday pet odors build up." },
                { icon: Sofa, title: "Sofas", copy: "For the shared spaces pets and people use together." },
                { icon: Layers, title: "Rugs", copy: "Where paws, hair, and daily pet life settle." },
                { icon: HomeIcon, title: "Floors", copy: "Support for the surfaces pets walk, nap, and play on." },
                { icon: Box, title: "Crates", copy: "Another layer for enclosed pet rest areas." },
                { icon: PawPrint, title: "Litter Areas", copy: "Surface-focused support around high-use pet zones." },
              ].map((zone) => {
                const Icon = zone.icon;
                return (
                  <Reveal key={zone.title}>
                    <div className="flex h-full flex-col gap-3 rounded-2xl bg-card p-4 ring-1 ring-black/[0.05] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)] sm:p-5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-[0.95rem] font-semibold text-foreground">{zone.title}</div>
                        <p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">
                          {zone.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 5. SURFACE ZONES (3 BIG CARDS) ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.875rem]">
                  Pet mess does not stay in the air.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
                  It settles into the soft surfaces, corners, and favorite spots your pets return to every day.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[
                {
                  img: petBedImg,
                  title: "Pet Beds & Crates",
                  caption:
                    "Support the spaces where pets sleep, shed, and spend hours every day.",
                },
                {
                  img: petSofaImg,
                  title: "Sofas & Rugs",
                  caption:
                    "Help maintain a fresher-feeling living space on upholstery, throws, and floors.",
                },
                {
                  img: petScandiImg,
                  title: "The Whole Home",
                  caption:
                    "Add surface-focused support to the rooms your pets and family share.",
                },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="group relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-background">
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-snug text-background/90">{item.caption}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-[#F5F3EE] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  How It Works
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                  Friendly probiotics.
                  <br />
                  Every surface. All day.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  A simple surface-focused system that goes beyond a filter to support the rooms your animals spend the most time in.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-7 sm:mt-14 lg:mt-20 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Disperse",
                  copy: "The device quietly disperses beneficial environmental probiotics into the room throughout the day.",
                },
                {
                  step: "02",
                  title: "Settle",
                  copy: "They travel through the air and settle on pet beds, sofas, rugs, floors, crates, and everyday surfaces.",
                },
                {
                  step: "03",
                  title: "Support",
                  copy: "They help maintain a fresher surface environment between regular cleaning, vacuuming, and filtration.",
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
                EnviroBiotics does not replace cleaning, ventilation, or air filtration. It adds another layer of support for the surfaces pets use most.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 7. PRODUCTS ============ */}
        <section id="products" className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  Choose Your Device
                </p>
                <h2 className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
                  Pick the protection for their favorite spot.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  Start with one pet bed, one bedroom, or one favorite corner. Add more coverage whenever your home needs it.
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-primary">
                  Use code {PROMO} for 10% off at checkout.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-7 xl:mt-16 xl:grid-cols-3">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="Pet Pick · Bedrooms & Pet Zones"
                  starterNote="Best starter choice"
                  description="A compact, quiet probiotic device sized for bedrooms, pet zones, crates, and the corners where your animals nap."
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  highlight
                  ctaText="Shop BioLogic Mini"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackMini}
                  features={[
                    "Covers up to 300 sq ft, ideal for one pet zone",
                    "Quiet enough for bedrooms and shared spaces",
                    "Designed for homes with pets and family",
                    "Helps support pet beds, blankets, crates, and floors",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Bundle"
                  tagline="Best Value · Whole Home"
                  description="Cover the living room, bedroom, and every pet zone with the best-value bundle for multi-pet homes."
                  price="$399"
                  image={bundleImg}
                  href={LINKS.bundle}
                  ctaText="Get the Home Bundle"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBundle}
                  features={[
                    "Multi-room coverage for pet homes",
                    "Great for living rooms, bedrooms, mudrooms, and more",
                    "Consistent support wherever pets roam",
                    "Best per-room value",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="Best for Open Living Areas"
                  description="A powerful device for larger rooms, basements, and open layouts where pets and people gather."
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Shop Biotica 800"
                  offerNote={`Use code ${PROMO} for 10% off.`}
                  onClick={trackBiotica}
                  features={[
                    "Covers up to 800 sq ft",
                    "Great for open-plan homes with multiple pets",
                    "Stronger coverage for high-shed, high-traffic spaces",
                    "Helps support sofas, rugs, bedding, and floors",
                  ]}
                />
              </Reveal>
            </div>

            <Reveal>
              <p className="mx-auto mt-10 max-w-xl text-center text-sm italic text-muted-foreground sm:text-base">
                Less than the price of many pet air purifiers. Built for the surfaces they miss.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 8. PROOF & TRUST ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[280px] bg-muted sm:min-h-[420px]">
                  <img
                    src={endorsementImg}
                    alt="A pet owner relaxing on a light sofa with their dog in a bright Scandinavian home"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 backdrop-blur sm:bottom-6 sm:left-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      No ozone · No harsh chemicals
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    The EnviroBiotics Edge
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.5rem]">
                    Why pet parents pick us over another filter.
                  </h2>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        icon: Layers,
                        label: "Beyond the air",
                        copy: "Supports pet beds, sofas, rugs, crates, floors, and the surfaces pets use every day &mdash; not only air passing through a device.",
                      },
                      {
                        icon: Leaf,
                        label: "No harsh chemicals",
                        copy: "A probiotic-based approach without bleach, ozone, or strong fragrance.",
                      },
                      {
                        icon: Heart,
                        label: "Built for pet homes",
                        copy: "Designed for use in homes with cats, dogs, and family members when used as directed.",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Easy to try",
                        copy: `Start with one room, use code ${PROMO} for 10% off, and test it for 30 days risk-free.`,
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
                            <div
                              className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                              dangerouslySetInnerHTML={{ __html: pillar.copy }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
                    <span>No ozone</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>No harsh chemicals</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>30-day risk-free trial</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span>Designed for pet homes</span>
                  </div>
                  <a href="#products" onClick={() => trackEvent("click_pets_edge_cta")}>
                    <Button
                      size="lg"
                      className="h-12 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Claim 10% Off
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="/safety"
                    className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                  >
                    View safety and certification details
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 9. TRUST ALTERNATIVE (no fake reviews) ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.875rem]">
                  Built for pet homes like yours.
                </h2>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                  Start with the room where your pet spends the most time.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {[
                { title: "Dog Homes", copy: "For beds, rugs, sofas, and the corners dogs return to every day." },
                { title: "Cat Homes", copy: "For litter-area surfaces, blankets, cat beds, and favorite sunny spots." },
                { title: "Multi-Pet Homes", copy: "For rooms where fur, odors, and everyday pet life build up faster." },
                { title: "Shared Family Spaces", copy: "For the sofas, rugs, and floors pets and people use together." },
              ].map((card) => (
                <Reveal key={card.title}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)] sm:p-7">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <PawPrint className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 10. TRUST ICON STRIP ============ */}
        <section className="bg-[#F5F3EE] py-12 sm:py-20">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
                {[
                  { icon: PawPrint, label: "Pet-home friendly", copy: "Designed for homes with cats and dogs when used as directed." },
                  { icon: Heart, label: "Family-home friendly", copy: "Made for shared spaces where people and pets live together." },
                  { icon: Volume2, label: "Whisper-quiet", copy: "Designed to run quietly in the background." },
                  { icon: Sparkles, label: "Low-maintenance", copy: "Simple cartridge-based support for everyday use." },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.label} className="flex flex-col items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground sm:text-base">
                          {b.label}
                        </div>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-[13px]">
                          {b.copy}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 11. FAQ ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                Pet parent questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {[
                {
                  q: "Is EnviroBiotics safe to run around cats and dogs?",
                  a: "EnviroBiotics is designed for use in homes with cats and dogs when used as directed. It uses beneficial environmental probiotics and does not rely on ozone, bleach, or harsh chemical sprays. Always follow the product instructions and keep cartridges and devices out of reach of pets and children.",
                },
                {
                  q: "How is this different from a pet air purifier?",
                  a: "A pet air purifier filters air that passes through the device. EnviroBiotics disperses beneficial probiotics that travel through the room and settle on pet beds, sofas, rugs, crates, floors, and other surfaces. It is a surface-focused layer of support, not a replacement for filtration.",
                },
                {
                  q: "Will it help with pet odors?",
                  a: "EnviroBiotics helps support a fresher-feeling environment on the surfaces where pet odors and organic residue often settle. Results can vary by room, pet habits, cleaning routine, ventilation, and how consistently the device is used.",
                },
                {
                  q: "What about pet dander and allergies?",
                  a: "Pet dander can settle into soft surfaces like bedding, sofas, rugs, and blankets. EnviroBiotics does not treat allergies or replace medical advice. It adds surface-focused support for the rooms pets use most and can be used alongside cleaning, vacuuming, and air filtration.",
                },
                {
                  q: "Does this replace my HEPA air purifier?",
                  a: "No. A HEPA air purifier can be helpful for airborne particles. EnviroBiotics supports the surfaces filters cannot directly reach. Many pet owners may choose to use both: a purifier for the air and EnviroBiotics for pet beds, sofas, rugs, crates, floors, and everyday surfaces.",
                },
                {
                  q: "Does this replace cleaning or vacuuming?",
                  a: "No. EnviroBiotics does not replace cleaning, vacuuming, washing pet beds, ventilation, or filtration. It adds another layer of support between regular cleanings.",
                },
                {
                  q: "How often do I need to refill it?",
                  a: "Refill timing depends on the device and usage settings. Please check the product instructions or cartridge details for the recommended replacement schedule.",
                },
                {
                  q: "When will I notice a difference?",
                  a: "Some customers may notice a fresher-feeling room sooner, while others may need more time depending on room size, pet habits, airflow, cleaning routine, and product usage. For best results, use consistently in the room or pet zone where your animals spend the most time.",
                },
                {
                  q: "Can I use it near a litter box or crate?",
                  a: "Yes, EnviroBiotics can be used in rooms with litter areas, crates, pet beds, or other pet zones when used as directed. Place the device according to the product instructions and keep it out of reach of pets.",
                },
                {
                  q: "What if I do not notice a difference?",
                  a: "Start with one room and try it consistently. The page offer includes a 30-day risk-free trial, so you can test it in the pet zone that matters most.",
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`q${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium sm:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ 12. FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-16 sm:py-28 lg:py-40">
          <img
            src={familyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))]/95 via-[hsl(var(--primary-soft))]/75 to-[hsl(var(--primary-soft))]/45"
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Pet Parents Save 10% &middot; Code <span className="text-primary">{PROMO}</span>
              </p>
              <h2 className="font-display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                Protect the places
                <br />
                your pet actually lives.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-foreground/85 sm:mt-6 sm:text-lg">
                Start with one pet bed, one sofa, or one favorite corner. EnviroBiotics supports the surfaces filters cannot directly reach.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#products" onClick={() => trackEvent("click_pets_final_shop")}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.55)] hover:bg-primary/90"
                  >
                    Shop the Pet Offer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="#products"
                  onClick={() => trackEvent("click_pets_final_compare")}
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/25 bg-background/70 px-7 text-base font-semibold text-foreground backdrop-blur transition hover:bg-background"
                >
                  Compare Devices
                </a>
              </div>
              <p className="mt-8 text-sm font-medium text-foreground/75">
                Use code <span className="font-bold text-primary">{PROMO}</span> for 10% off ·
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
            <p className="text-xs text-muted-foreground">Pet parents exclusive</p>
          </div>
          <a href="#products" onClick={() => trackEvent("click_pets_sticky_shop")}>
            <Button className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Shop the Pet Offer
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default PetsLandingPage;
