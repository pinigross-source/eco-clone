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
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden bg-[#f7f3ec] min-h-[100svh] flex items-center">
          {/* local kinetic styles */}
          <style>{`
            @keyframes pets-scroll-y { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
            .pets-ticker { animation: pets-scroll-y 22s linear infinite; }
            @keyframes pets-scroll-x { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
            .pets-marquee { animation: pets-scroll-x 38s linear infinite; }
            .pets-marquee-rev { animation: pets-scroll-x 52s linear infinite reverse; }
            @keyframes pets-pulse-gentle { 0%,100%{transform:scale(1);opacity:.15} 50%{transform:scale(1.18);opacity:.32} }
            .pets-blob { animation: pets-pulse-gentle 5s ease-in-out infinite; }
            @keyframes pets-blob-2 { 0%,100%{transform:translate(0,0) scale(1);opacity:.18} 50%{transform:translate(20px,-30px) scale(1.2);opacity:.32} }
            .pets-blob-2 { animation: pets-blob-2 9s ease-in-out infinite; }
            @keyframes pets-ping-soft { 0%{transform:scale(1);opacity:.9} 75%,100%{transform:scale(2.4);opacity:0} }
            .pets-ping::after { content:""; position:absolute; inset:0; border-radius:9999px; background:#8A9A8A; animation: pets-ping-soft 2.2s cubic-bezier(0,0,.2,1) infinite; }
            @keyframes pets-float { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-14px) rotate(-1deg)} }
            .pets-float { animation: pets-float 7s ease-in-out infinite; }
            @keyframes pets-rise { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
            .pets-rise { animation: pets-rise 1s cubic-bezier(.2,.7,.2,1) both; }
            @keyframes pets-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
            .pets-shimmer { background: linear-gradient(90deg, #1A1F2C 0%, #1A1F2C 40%, #E67E66 50%, #1A1F2C 60%, #1A1F2C 100%); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; color:transparent; animation: pets-shimmer 6s linear infinite; }
            @keyframes pets-grain { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-3%,2%)} 50%{transform:translate(2%,-2%)} 75%{transform:translate(-1%,3%)} }
            .pets-grain { animation: pets-grain 6s steps(4) infinite; }
            @keyframes pets-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            .pets-orbit { animation: pets-orbit 40s linear infinite; }
          `}</style>

          {/* GIANT background marquees */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-between py-8 overflow-hidden select-none">
            <div className="pets-marquee flex whitespace-nowrap text-foreground/[0.045] font-display font-black tracking-[-0.04em] text-[18vw] leading-none">
              <span className="pr-12">DANDER · ODOR · SURFACES ·&nbsp;</span>
              <span className="pr-12">DANDER · ODOR · SURFACES ·&nbsp;</span>
            </div>
            <div className="pets-marquee-rev flex whitespace-nowrap text-[#E67E66]/[0.07] font-display font-black italic tracking-[-0.04em] text-[18vw] leading-none">
              <span className="pr-12">probiotic · probiotic ·&nbsp;</span>
              <span className="pr-12">probiotic · probiotic ·&nbsp;</span>
            </div>
          </div>

          {/* Ambient blobs */}
          <div aria-hidden className="pets-blob pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[#E67E66] opacity-25 blur-[120px]" />
          <div aria-hidden className="pets-blob-2 pointer-events-none absolute bottom-[-160px] right-[-120px] h-[560px] w-[560px] rounded-full bg-[#8A9A8A] opacity-25 blur-[140px]" />

          {/* Grain */}
          <div
            aria-hidden
            className="pets-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
            }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-0 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-0 lg:px-12 lg:py-20">

            {/* Vertical ticker rail */}
            <div className="relative hidden lg:col-span-1 lg:flex flex-col items-center justify-center overflow-hidden border-r border-foreground/10 py-12">
              <div className="pets-ticker flex flex-col gap-10 whitespace-nowrap">
                {[...Array(2)].flatMap((_, k) =>
                  ["Better Air", "Clean Surfaces", "Pet Logic", "Probiotic Mist", "No Chemicals", "Always On"].map((t, i) => (
                    <span key={`${k}-${i}`} className="rotate-90 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 items-center gap-10 lg:col-span-11 lg:grid-cols-11 lg:gap-12">

              {/* Image stack */}
              <div className="relative order-2 lg:order-1 lg:col-span-6 pets-rise" style={{ animationDelay: "0.15s" }}>
                {/* Orbiting badge */}
                <div aria-hidden className="pets-orbit pointer-events-none absolute -top-10 -right-6 h-28 w-28 hidden lg:block">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path id="petsCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-foreground/70" style={{ fontSize: 9, letterSpacing: 3, fontWeight: 700 }}>
                      <textPath href="#petsCircle">CHEMICAL FREE · PET SAFE · ALWAYS ON · </textPath>
                    </text>
                  </svg>
                </div>

                <div className="pets-float relative z-10 overflow-hidden rounded-[28px] border border-foreground/5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)] lg:-rotate-1">
                  <img
                    src={heroImg}
                    alt="A calm dog resting on a beige sofa in a sunlit modern living room with the Biotica device nearby"
                    className="aspect-[4/3] w-full object-cover scale-[1.02]"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    width={1200}
                    height={900}
                  />
                  {/* Gradient veil */}
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-foreground/40 via-transparent to-transparent" />

                  {/* Top metric chip */}
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-background/85 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground shadow-lg">
                    <span className="pets-ping relative inline-block h-1.5 w-1.5 rounded-full bg-[#8A9A8A]" />
                    Live · 800 sq ft shield
                  </div>

                  {/* Floating spec badge */}
                  <div className="absolute bottom-5 right-5 rounded-xl bg-foreground p-4 text-background shadow-2xl sm:bottom-6 sm:right-6 max-w-[200px]">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#E67E66]">Surface Tech</p>
                    <p className="text-[13px] font-medium leading-tight sm:text-sm">
                      Works on couches, rugs<br />&amp; pet beds — 24/7
                    </p>
                  </div>
                </div>

                {/* Decorative sage offset */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -right-4 -z-10 h-full w-full translate-x-4 translate-y-4 rounded-[28px] border-2 border-[#8A9A8A]"
                />

                {/* Stat card — floating bottom-left */}
                <div className="absolute -bottom-8 -left-4 z-20 hidden sm:block rounded-2xl bg-background px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-foreground/5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold tracking-tight text-foreground">94%</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9A8A]">odor drop</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-foreground/60">14 days · pet households</p>
                </div>
              </div>

              {/* Kinetic typography */}
              <div className="order-1 flex flex-col gap-7 lg:order-2 lg:col-span-5">
                <div className="pets-rise">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8A9A8A] bg-background/60 backdrop-blur px-3 py-1">
                    <span className="pets-ping relative inline-block h-2 w-2 rounded-full bg-[#8A9A8A]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Live Probiotic Shield</span>
                  </div>
                </div>

                <div className="pets-rise" style={{ animationDelay: "0.1s" }}>
                  <h1 className="font-display text-[3.2rem] font-bold leading-[0.85] tracking-[-0.04em] text-foreground sm:text-7xl lg:text-[5.5rem]">
                    Pet odor<br />
                    isn&apos;t <span className="pets-shimmer italic font-serif font-normal">just</span><br />
                    in the air.
                  </h1>
                </div>

                <div className="pets-rise" style={{ animationDelay: "0.2s" }}>
                  <p className="max-w-md text-lg font-medium leading-snug text-foreground/75 sm:text-xl">
                    It&apos;s on the couch. It&apos;s in the rug. It&apos;s where they sleep.
                    <span className="block mt-1 text-foreground">EnviroBiotics cleans where it matters — chemical-free.</span>
                  </p>
                </div>

                <div className="pets-rise" style={{ animationDelay: "0.3s" }}>
                  <div className="group relative">
                    <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-sm bg-foreground transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                    <a
                      href="#products"
                      onClick={(e) => smoothScroll(e, "products", "click_pets_hero_cta")}
                      className="relative flex w-full items-center justify-between bg-[#E67E66] px-6 py-5 text-background transition-transform active:scale-[0.98] sm:px-8 sm:py-6 overflow-hidden"
                    >
                      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <span className="relative text-lg font-bold uppercase tracking-tighter sm:text-2xl">
                        Get the Starter Kit — $229
                      </span>
                      <ArrowRight className="relative h-7 w-7 transition-transform group-hover:translate-x-2" strokeWidth={3} />
                    </a>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#D92B2B] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                        Code: PETS
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground">Applied at checkout</span>
                      <div className="hidden h-px flex-grow bg-foreground/10 sm:block" />
                      <span className="text-xs font-bold text-[#8A9A8A]">Ships Free</span>
                    </div>
                  </div>
                </div>

                {/* Inline trust row */}
                <div className="pets-rise flex items-center gap-5 pt-2" style={{ animationDelay: "0.4s" }}>
                  <div className="flex -space-x-2">
                    {["#E67E66", "#8A9A8A", "#1A1F2C", "#D4A574"].map((c) => (
                      <span key={c} className="h-7 w-7 rounded-full ring-2 ring-[#f7f3ec]" style={{ background: c }} />
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-foreground">12,000+ pet homes</p>
                    <p className="text-[11px] text-foreground/60">★★★★★ 4.8 · verified buyers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom scroll cue */}
          <div aria-hidden className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">
            scroll
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
