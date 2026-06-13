import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
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

import heroImg from "@/assets/pets/hero-living-room.jpg";
import bioticaImg from "@/assets/pets/biotica-lifestyle.jpg";
import bundleImg from "@/assets/pets/bundle-lifestyle.jpg";
import miniImg from "@/assets/pets/mini-lifestyle.jpg";
import petBedImg from "@/assets/pets/surfaces-lifestyle.jpg";
import familyImg from "@/assets/family-clean-home.avif";

const PROMO = "PETS";

const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const BIOTICA_URL = withDiscount(shopifyProductUrl("biotica-800", "pets-landing"));
const MINI_URL = withDiscount(shopifyProductUrl("biologic-mini", "pets-landing"));
const BUNDLE_URL = withDiscount(shopifyUrl("/products/home-complete-bundle", "pets-landing"));

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

type Angle = "a" | "b" | "c";

const ITALIC_FONT: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  textShadow: "0 2px 24px rgba(247, 243, 236, 0.65), 0 1px 6px rgba(247, 243, 236, 0.45)",
};

const HERO_VARIANTS: Record<Angle, { headline: React.ReactNode; sub: string }> = {
  a: {
    headline: (
      <>
        It&apos;s not the hair you can see.
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          It&apos;s the dander you can&apos;t.
        </span>
      </>
    ),
    sub: "The hair you vacuum is the easy part. Dander and odor are microscopic - they settle deep into the couch, carpet, and bedding your pet loves, where vacuums and filters can't reach. EnviroBiotics breaks them down right there, at the source.",
  },
  b: {
    headline: (
      <>
        You can&apos;t vacuum your way
        <br />
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          out of dander.
        </span>
      </>
    ),
    sub: "Dander is microscopic and constant - it settles back into the couch and carpet faster than you can clean. EnviroBiotics keeps working on those surfaces around the clock, breaking down dander and odor at the source.",
  },
  c: {
    headline: (
      <>
        Odor and dander don&apos;t live in the air.
        <br />
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          They live in your couch.
        </span>
      </>
    ),
    sub: "Air purifiers clean the air. But dander and odor settle into the couch, carpet, and curtains your pet loves - where filters can't reach. EnviroBiotics works right there, breaking them down at the source.",
  },
};

const PetsLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const angle: Angle = useMemo(() => {
    if (typeof window === "undefined") return "a";
    const v = new URLSearchParams(window.location.search).get("v");
    return v === "b" || v === "c" ? v : "a";
  }, []);
  const hero = HERO_VARIANTS[angle];

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, eventName?: string) => {
    e.preventDefault();
    if (eventName) trackEvent(eventName);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };




  return (
    <>
      <SEOHead
        title="Pet Dander & Odor Control for Your Home | EnviroBiotics"
        description="Vacuuming gets the hair. EnviroBiotics gets what you can't see - breaking down pet dander and odor in the couch, carpet, and bedding where they settle. No chemicals. Meet Biotica."
        path="/pets"
      />

      <main className="bg-background text-foreground">
        {/* ============ HERO — matches homepage look & feel ============ */}
        <section className="relative w-full overflow-hidden bg-background text-foreground">
          <style>{`
            @keyframes pets-rise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
            .pets-rise { animation: pets-rise 1s cubic-bezier(.2,.7,.2,1) both; }
            @keyframes pets-fade { from{opacity:0} to{opacity:1} }
            .pets-fade { animation: pets-fade 1.4s ease-out both; }
            @keyframes pets-pulse { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.15);opacity:.6} }
            .pets-pulse { animation: pets-pulse 2.2s ease-in-out infinite; }
          `}</style>

          {/* Soft ambient backdrop, same vocabulary as homepage */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 78% 18%, hsl(var(--primary) / 0.10) 0%, transparent 60%), radial-gradient(50% 40% at 8% 88%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-[1320px] px-5 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24 lg:px-16 lg:pt-32 lg:pb-28">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

              {/* TEXT — left, ~7 cols */}
              <div className="lg:col-span-7">
                <div className="pets-rise inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/60 px-3 py-1.5 backdrop-blur">
                  <span className="pets-pulse inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary">
                    For homes with pets
                  </span>
                </div>

                <h1
                  className="pets-rise mt-7 font-display font-bold tracking-[-0.035em] text-foreground"
                  style={{
                    fontSize: "clamp(2.75rem, 7.2vw, 5.75rem)",
                    lineHeight: 0.95,
                    animationDelay: "0.08s",
                  }}
                >
                  Pet odor isn&apos;t just in the air.
                  <span
                    className="mt-3 block font-serif font-normal italic text-heading-accent"
                    style={{
                      fontSize: "clamp(2.25rem, 6vw, 4.75rem)",
                      lineHeight: 1.02,
                    }}
                  >
                    It&apos;s in the couch.
                  </span>
                </h1>

                <p
                  className="pets-rise mt-7 max-w-[58ch] text-[1.05rem] leading-[1.65] sm:text-[1.15rem]"
                  style={{ color: "hsl(var(--foreground) / 0.78)", animationDelay: "0.16s" }}
                >
                  Dander and odor settle into the rug, the bedding, the places your pet loves — where vacuums and air filters can&apos;t reach. EnviroBiotics works right there, quietly, between cleanings. No chemicals.
                </p>

                <div className="pets-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.24s" }}>
                  <a
                    href="#products"
                    onClick={(e) => smoothScroll(e, "products", "click_pets_hero_cta")}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                  >
                    Get the Starter Kit — $229
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#products"
                    onClick={(e) => smoothScroll(e, "products", "click_pets_hero_secondary")}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-all hover:-translate-y-0.5"
                  >
                    How it works
                  </a>
                </div>

                <div className="pets-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem]" style={{ color: "hsl(var(--foreground) / 0.7)", animationDelay: "0.32s" }}>
                  <span>
                    Code <span className="font-semibold text-foreground">PETS</span> applied at checkout
                  </span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-foreground/25" />
                  <span>Free U.S. shipping</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-foreground/25" />
                  <span>30-day guarantee</span>
                </div>

                {/* Mission-statement style follow-on, identical voice to homepage */}
                <p
                  className="pets-rise mt-10 max-w-[52ch] border-l-2 pl-5 text-[1rem] italic leading-[1.6] sm:text-[1.05rem]"
                  style={{
                    color: "hsl(var(--foreground) / 0.75)",
                    borderColor: "hsl(var(--primary) / 0.5)",
                    animationDelay: "0.4s",
                  }}
                >
                  A new layer of home care that works where your vacuum, candle, and air purifier can&apos;t reach.
                </p>
              </div>

              {/* IMAGE — right, ~5 cols */}
              <div className="lg:col-span-5">
                <figure className="pets-fade relative" style={{ animationDelay: "0.15s" }}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-foreground/[0.04] ring-1 ring-foreground/10 shadow-[0_30px_80px_-30px_hsl(var(--foreground)/0.35)]">
                    <img
                      src={heroImg}
                      alt="A calm dog resting on a sofa in a sunlit modern living room with the Biotica device nearby"
                      className="h-full w-full object-cover"
                      fetchPriority="high"
                      loading="eager"
                      decoding="async"
                      width={1200}
                      height={1500}
                    />
                  </div>

                  {/* Floating caption card — homepage button vocabulary */}
                  <figcaption className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-background/95 px-5 py-4 ring-1 ring-foreground/10 shadow-[0_20px_50px_-20px_hsl(var(--foreground)/0.3)] backdrop-blur sm:left-6 sm:right-auto sm:max-w-[280px]">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary">
                      Surface tech
                    </p>
                    <p className="mt-1 text-[0.95rem] font-medium leading-snug text-foreground">
                      Works on couches, rugs &amp; pet beds — quietly, 24/7.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STARTER KIT — MOVED UP ============ */}
        <section id="products" className="scroll-mt-24 bg-background py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-2 ring-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-[1.05fr_1fr]">
                <div className="absolute right-5 top-5 z-10 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                  Pet parents&apos; pick
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] lg:aspect-auto lg:min-h-[460px]">
                  <img
                    src={bioticaImg}
                    alt="Biotica 800 on an oak side table in a sunlit living room with a cat resting nearby"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#D92B2B] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Special Offer
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                      Code: PETS
                    </span>
                  </div>
                  <h2 className="font-display text-[1.85rem] font-bold tracking-[-0.02em] text-foreground sm:text-[2.4rem] lg:text-[2.6rem] leading-[1.05]">
                    Pet-Proof Home <span className="font-serif italic font-normal">Starter Kit</span>
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                    Built around Biotica 800. The layer your vacuum, candle, and air purifier keep missing — couch, rug, pet bed.
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {[
                      "Biotica 800 device — up to 800 sq ft",
                      "90-day probiotic cartridge",
                      "Pet Reset Guide: couch, rug, pet bed, litter zone",
                      "Continuous freshness between cleanings",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-foreground/80 sm:text-[15px]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={2.25} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <div className="mb-1 flex items-baseline gap-3">
                      <span className="font-display text-4xl font-bold tracking-[-0.02em] text-[#D92B2B]">$229</span>
                      <span className="font-display text-2xl font-medium tracking-[-0.01em] text-foreground/40 line-through">$299</span>
                      <span className="text-[12px] text-muted-foreground">Free shipping · 30-day guarantee</span>
                    </div>
                    <a
                      href={BIOTICA_URL}
                      onClick={() => trackEvent("click_pets_top_biotica")}
                      className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                    >
                      Get the Pet-Proof Home Starter Kit
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Quick proof strip */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
              {[
                { q: "The couch stopped smelling like dog two weeks in.", who: "Golden retriever home" },
                { q: "My eyes stopped itching when I sit down. Litter corner feels lighter too.", who: "Two cats" },
                { q: "I stopped lighting candles before guests come over.", who: "Three-dog household" },
              ].map((t) => (
                <figure key={t.who} className="rounded-2xl bg-card p-5 ring-1 ring-black/[0.06] sm:p-6">
                  <blockquote className="font-display text-[15px] font-medium leading-[1.5] text-foreground sm:text-[15.5px]">
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                    {t.who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ MECHANISM + EMPATHY ============ */}
        <section className="bg-[#F5F3EE] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
            <Reveal>
              <div className="overflow-hidden rounded-3xl ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.22)]">
                <img
                  src={petBedImg}
                  alt="A pet curled on a clean modern couch"
                  className="h-64 w-full object-cover sm:h-[420px]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                The whole point
              </p>
              <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[2.3rem] lg:text-[2.6rem]">
                Pet odor isn&apos;t in the air. <span className="font-serif italic font-normal">It&apos;s on your surfaces.</span>
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.65] text-foreground/80 sm:text-[16.5px]">
                You&apos;re not failing at cleaning. You&apos;re solving the wrong layer of the problem. Dander and odor settle into the couch, rug, pet bed, and bedroom corners — below the reach of a vacuum, out of range of a spray, where no air purifier can catch them.
              </p>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-foreground/80 sm:text-[16.5px]">
                EnviroBiotics works right there, quietly, between cleanings.
              </p>
            </Reveal>
          </div>
        </section>


        {/* ============ COMPARISON TABLE ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  What&apos;s left after the vacuum
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  You&apos;ve got the hair handled. Here&apos;s the part that&apos;s left.
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 overflow-hidden rounded-3xl bg-background ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)]">
                <div className="grid grid-cols-3 border-b border-border/60 bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:text-[12px]">
                  <div className="px-4 py-4 sm:px-6 sm:py-5"></div>
                  <div className="px-4 py-4 sm:px-6 sm:py-5">What you do now</div>
                  <div className="px-4 py-4 text-foreground sm:px-6 sm:py-5">EnviroBiotics</div>
                </div>
                {[
                  { label: "Visible hair", a: "Vacuum handles it - you've got this", b: "You've got this" },
                  { label: "Microscopic dander", a: "Settles back fast", b: "Breaks it down on the surface" },
                  { label: "Lingering odor", a: "Masked by sprays or candles", b: "Removed at the source" },
                  { label: "Deep in couch & carpet", a: "Out of reach", b: "Works right there" },
                  { label: "Between cleanings", a: "Builds back up", b: "Keeps working continuously" },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 text-[14px] leading-snug sm:text-[15px] ${
                      i % 2 === 1 ? "bg-[#FBF9F4]" : ""
                    }`}
                  >
                    <div className="px-4 py-4 font-semibold text-foreground sm:px-6 sm:py-5">
                      {row.label}
                    </div>
                    <div className="px-4 py-4 text-muted-foreground sm:px-6 sm:py-5">{row.a}</div>
                    <div className="px-4 py-4 font-medium text-foreground sm:px-6 sm:py-5">
                      {row.b}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[14px] italic text-muted-foreground sm:text-[15px]">
                A vacuum gets what you can see. This gets what you can&apos;t.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  How it works
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  Set it once. Let it handle the rest.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-7">
              {[
                {
                  step: "01",
                  title: "Place Biotica",
                  copy: "Set it in the main living space - wherever your pet spends the most time.",
                },
                {
                  step: "02",
                  title: "Switch it on",
                  copy: "It works silently in the background. No spray, no scent.",
                },
                {
                  step: "03",
                  title: "Let it run",
                  copy: "It keeps breaking down dander and odor at the source, so your surfaces stay cleaner on their own.",
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-3xl bg-background p-8 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-10"
                >
                  <span className="font-display text-[2.5rem] font-bold leading-none tracking-tight text-foreground sm:text-[3rem]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-[1.7] text-muted-foreground sm:text-[1.05rem]">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal>
              <div className="mt-12 flex flex-col items-center gap-3">
                <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_how_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Get the Starter Kit — $229
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <span className="text-[12px] text-muted-foreground">
                  <span className="line-through opacity-50">$299</span> with code <span className="font-semibold text-foreground">PETS</span>
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PRODUCTS - MORE OPTIONS ============ */}
        <section id="more-options" className="scroll-mt-24 bg-[#F5F3EE] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  More options
                </p>
                <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[2.4rem] lg:text-[2.75rem]">
                  Bigger home? <span className="font-serif italic font-normal">Add a bedroom or pet zone.</span>
                </h2>
              </div>
            </Reveal>


            {/* Upsell row: Bundle + Mini */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 lg:grid-cols-2 lg:gap-6">
              {/* Home Bundle */}
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
                    <img
                      src={bundleImg}
                      alt="Biotica 800 and BioLogic Mini styled together on an oak surface"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Multi-pet homes · Best value
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Multi-Pet Home Bundle
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Biotica 800 for the living room + Mini for the bedroom or pet zone. Consistent support wherever your pet roams.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Multi-room coverage for pet homes",
                        "Living room + bedroom from day one",
                        "Best per-room value",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$399</span>
                      </div>
                      <a
                        href={BUNDLE_URL}
                        onClick={() => trackEvent("click_pets_products_bundle")}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Get the Bundle
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        30-day risk-free trial · Free shipping
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* BioLogic Mini */}
              <Reveal>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
                    <img
                      src={miniImg}
                      alt="BioLogic Mini on a bedroom nightstand next to a sleeping dog"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Bedrooms &amp; pet zones
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      BioLogic Mini
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Compact and quiet - sized for bedrooms, crates, and the corner where your
                      pet naps.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Covers up to 300 sq ft - one pet zone",
                        "Whisper-quiet for shared sleeping spaces",
                        "Add to a Biotica for two-room coverage",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$98</span>
                      </div>
                      <a
                        href={MINI_URL}
                        onClick={() => trackEvent("click_pets_products_mini")}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Shop the Mini
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        30-day risk-free trial
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIAL ============ */}
        <section className="bg-[#F4EFE6] py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[860px] px-5 text-center sm:px-10">
            <Reveal>
              <p className="font-display text-[1.4rem] font-medium leading-[1.45] text-foreground sm:text-[1.75rem] lg:text-[2rem]">
                &ldquo;My eyes used to itch the second I sat on the couch. A few weeks in, I stopped
                noticing it - and so did my sister, who&apos;s allergic.&rdquo;
              </p>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                Two-dog home
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[880px] px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                FAQ
              </p>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                Pet parent questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full space-y-4 sm:mt-12">
              {[
                {
                  q: "What about pet dander and allergies?",
                  a: "EnviroBiotics works by breaking down the dander that settles on your soft surfaces, so less of it builds up where you sit and sleep. It is not a medical treatment - if you have a clinical allergy, keep following your doctor's plan. Many pet owners use it alongside vacuuming and filtration.",
                },
                {
                  q: "Is it safe around my pets and family?",
                  a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list (Generally Recognized As Safe) - the same kind of beneficial cultures found in yogurt and on healthy skin. It's chemical-free and designed for use in homes with cats, dogs, and kids. See our safety page for full certifications and testing.",
                },
                {
                  q: "Will my house smell like fragrance or chemicals?",
                  a: "No. EnviroBiotics removes odor at the source rather than adding scent - the goal is a room that smells like nothing in particular.",
                },
                {
                  q: "Does it replace my air purifier or vacuum?",
                  a: "No - different jobs. Keep vacuuming the hair and running the purifier for airborne particles. EnviroBiotics handles what settles into the surfaces: dander and odor.",
                },
                {
                  q: "What if it doesn't work for us?",
                  a: "Try it for 30 days. If your place doesn't feel fresher and cleaner, send it back for a full refund. No questions.",
                },
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`q${idx}`}
                  className="group rounded-2xl border border-border/60 bg-card px-6 transition-all hover:border-foreground/40 data-[state=open]:border-foreground/50 data-[state=open]:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] sm:px-8"
                >
                  <AccordionTrigger className="py-6 text-left text-[17px] font-semibold text-foreground hover:no-underline sm:py-7 sm:text-[18px]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[15px] leading-[1.7] text-muted-foreground sm:text-[16px]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>


        {/* ============ FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[#F4EFE6] py-20 sm:py-28 lg:py-36">
          <img
            src={familyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#F4EFE6] via-[#F4EFE6]/92 to-[#F4EFE6]"
          />
          <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <h2 className="font-display text-[2.1rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.85rem] lg:text-[3.5rem]">
                Pet odor isn&apos;t in the air. <span className="font-serif italic font-normal">It&apos;s on your surfaces.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1rem] font-medium leading-[1.7] text-foreground/85 sm:text-[1.15rem]">
                Keep the cuddles, the couch naps, the bedroom-door-open chaos. Skip the candles, sprays, and recurring smell. The Pet-Proof Home Starter Kit works where your vacuum, purifier, and cleaning routine can&apos;t — quietly, chemical-free, around the clock.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3">
                <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_final_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Get the Starter Kit — $229
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <span className="text-[12px] text-muted-foreground">
                  <span className="line-through opacity-50">$299</span> with code <span className="font-semibold text-foreground">PETS</span> · Free shipping
                </span>
              </div>
              <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-medium text-foreground/70 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                  30-day guarantee
                </span>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                  Free shipping
                </span>
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
            <p className="truncate text-sm font-semibold text-foreground">Starter Kit — <span className="text-[#D92B2B]">$229</span></p>
            <p className="truncate text-xs text-muted-foreground"><span className="line-through opacity-50">$299</span> · Code: PETS</p>
          </div>
          <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_sticky_cta")}>
            <Button className="h-11 shrink-0 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Get it now
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default PetsLandingPage;
