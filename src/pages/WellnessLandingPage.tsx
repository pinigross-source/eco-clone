import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, X, ShoppingBag, Leaf, Wind, Sparkles } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImage from "@/assets/wellness-hero.jpg.asset.json";
import livingImage from "@/assets/wellness-living.jpg";
import ritualImage from "@/assets/wellness-ritual.jpg";
import bedroomWide from "@/assets/wellness-bedroom-wide.jpg";
import bioticaProduct from "@/assets/biotica-800.png";
import miniProduct from "@/assets/biologic-mini-nobg-new.png";
import bundleAsset from "@/assets/bundle-product.webp.asset.json";

import epaAsset from "@/assets/certs/cert_0.png.asset.json";
import isoAsset from "@/assets/certs/cert_3.png.asset.json";
import madeSafeAsset from "@/assets/certs/cert_5.png.asset.json";
import fdaGrasAsset from "@/assets/certs/fda_gras_v2.png.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";
import allergyAsset from "@/assets/certs/cert_4.png.asset.json";

/* ---------- Editable pricing / offer config ---------- */
const PROMO = "WELLNESS";
const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const PRICING = {
  bundle: { price: "$395", compare: "$495" },
  biotica: { price: "$299" },
  mini: { price: "$98" },
};

const URLS = {
  bundle: withDiscount(shopifyUrl("/products/home-complete-bundle", "wellness-landing")),
  biotica: withDiscount(shopifyProductUrl("biotica-800", "wellness-landing")),
  mini: withDiscount(shopifyProductUrl("biologic-mini", "wellness-landing")),
};

/* ---------- Palette ---------- */
const C = {
  ivory: "#F7F4EE",
  sand: "#EDE7DD",
  offwhite: "#FCFBF8",
  sage: "#DCE7DD",
  green: "#2F5A4B",
  greenDeep: "#243F35",
  charcoal: "#1F2933",
  muted: "rgba(31,41,51,0.66)",
  hairline: "rgba(31,41,51,0.12)",
  orange: "#F68B45",
};

const DISPLAY = `"Manrope", "Inter", system-ui, -apple-system, sans-serif`;
const ITALIC_SERIF = `"Instrument Serif", "Playfair Display", Georgia, serif`;
const SANS = `"Inter", "Hanken Grotesk", system-ui, -apple-system, sans-serif`;
// Legacy alias kept so existing heading styles pick up the new Sonos-style sans.
const SERIF = DISPLAY;

/* ---------- Small primitives ---------- */
const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    className="inline-flex items-center gap-2.5 text-[10.5px] font-medium uppercase tracking-[0.32em]"
    style={{ color: light ? "rgba(255,255,255,0.72)" : C.green }}
  >
    <span className="h-px w-6" style={{ background: light ? "rgba(255,255,255,0.4)" : C.green }} />
    {children}
  </div>
);

const H2 = ({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <h2
    className={`font-bold ${className}`}
    style={{
      fontFamily: DISPLAY,
      fontWeight: 800,
      fontSize: "clamp(2.4rem, 5vw, 4.25rem)",
      lineHeight: 1.02,
      letterSpacing: "-0.025em",
      color: C.charcoal,
      ...style,
    }}
  >
    {children}
  </h2>
);

const PrimaryCTA = ({
  href,
  onClick,
  children,
  className = "",
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-[15px] text-[13px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_-14px_rgba(246,139,69,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-14px_rgba(246,139,69,0.7)] ${className}`}
    style={{ background: C.orange }}
  >
    {children}
    <ArrowRight className="ml-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
  </a>
);

const GhostCTA = ({
  href,
  onClick,
  children,
  dark = false,
  className = "",
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.22em] transition-colors ${className}`}
    style={{
      color: dark ? "rgba(255,255,255,0.9)" : C.charcoal,
      borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.5)" : "rgba(31,41,51,0.35)"}`,
      paddingBottom: "6px",
    }}
  >
    {children}
    <ArrowRight className="h-3.5 w-3.5" />
  </a>
);

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setVisible(true), io.disconnect())),
      { threshold: 0.08, rootMargin: "120px" },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      className={`transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${className}`}
    >
      {children}
    </div>
  );
};

/* ============ PAGE ============ */
const WellnessLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <SEOHead
        title="Environmental Wellness for Your Home | EnviroBiotics"
        description="Your wellness routine shouldn't end at your skin. EnviroBiotics is the missing environmental layer — continuous probiotic support for the air and surfaces of your main living area and bedroom."
        path="/wellness"
      />

      <Navbar />

      <main
        className="pt-16 lg:pt-[124px]"
        style={{ fontFamily: SANS, background: C.ivory, color: C.charcoal }}
      >
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden" style={{ background: C.ivory }}>
          {/* Warm ambient background wash */}
          <div
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(1000px 500px at 88% 8%, rgba(246,139,69,0.10), transparent 60%), radial-gradient(900px 500px at 5% 100%, rgba(220,231,221,0.55), transparent 65%)",
            }}
          />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-14 lg:pb-32 lg:pt-16">
            {/* Copy */}
            <div className="order-2 lg:order-1">
              <Eyebrow>Environmental Wellness</Eyebrow>

              <h1
                className="mt-7 font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: "clamp(2.75rem, 6.4vw, 5.75rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.02em",
                  color: C.charcoal,
                }}
              >
                Your wellness routine
                shouldn&rsquo;t end at your{" "}
                <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>
                  skin.
                </span>
              </h1>

              <p
                className="mt-8 max-w-[46ch] text-[17px] leading-[1.65] sm:text-[18px]"
                style={{ color: C.muted }}
              >
                You eat clean. You move daily. You choose low-tox products.
                EnviroBiotics is the missing environmental layer — continuous
                probiotic support for the air and surfaces of the rooms you
                actually live in.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <PrimaryCTA
                  href="#offer"
                  onClick={(() => trackEvent("click_wellness_hero_primary")) as any}
                >
                  Complete My Routine
                </PrimaryCTA>
                <GhostCTA
                  href="#how"
                  onClick={(() => trackEvent("click_wellness_hero_secondary")) as any}
                >
                  See how it works
                </GhostCTA>
              </div>

              {/* Trust strip */}
              <div
                className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6 text-[12.5px]"
                style={{ borderColor: C.hairline, color: "rgba(31,41,51,0.62)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  Setup in ~60 seconds
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  No sprays, no filters
                </span>
                <span className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  30-day guarantee
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Sage backdrop card */}
                <div
                  className="absolute -inset-x-3 -inset-y-3 rounded-[36px] sm:-inset-4"
                  style={{ background: C.sage, opacity: 0.55 }}
                />
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/6] sm:rounded-[32px]"
                  style={{ boxShadow: "0 40px 80px -40px rgba(31,41,51,0.35)" }}
                >
                  <img
                    src={heroImage.url}
                    alt="Sunlit Scandinavian bedroom with a woman stretching in morning light, an EnviroBiotics device on a light oak nightstand"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    width={1200}
                    height={1500}
                  />
                </div>

                {/* Floating quote card */}
                <div
                  className="absolute -bottom-8 -left-4 hidden max-w-[280px] rounded-2xl p-5 sm:block lg:-left-10"
                  style={{
                    background: C.offwhite,
                    boxShadow: "0 24px 60px -24px rgba(31,41,51,0.25)",
                    border: `1px solid ${C.hairline}`,
                  }}
                >
                  <p
                    className="text-[15px] italic leading-snug"
                    style={{ fontFamily: SERIF, color: C.charcoal }}
                  >
                    &ldquo;It&rsquo;s the layer of my wellness routine I didn&rsquo;t know was missing.&rdquo;
                  </p>
                  <p
                    className="mt-3 text-[10.5px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: C.green }}
                  >
                    — Verified customer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROBLEM — editorial two column ============ */}
        <section className="relative py-24 sm:py-32" style={{ background: C.offwhite }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 sm:px-10 lg:grid-cols-12 lg:gap-24 lg:px-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <Eyebrow>The wellness gap</Eyebrow>
                <H2 className="mt-6">
                  You&rsquo;ve optimized your body.
                   What about the room around <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>it?</span>
                </H2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p
                  className="text-[19px] leading-[1.7] sm:text-[21px]"
                  style={{ fontFamily: SERIF, color: C.charcoal }}
                >
                  You spend nine out of ten hours indoors — sleeping, working,
                  recovering. Filters clean some of the air. Cleaners hit the
                  visible surfaces. Between them, everyday residue keeps
                  settling on the sofa, bedding, rugs, and counters your
                  routine relies on.
                </p>

                <div
                  className="mt-12 grid grid-cols-1 divide-y border-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                  style={{ borderColor: C.hairline, ["--tw-divide-opacity" as any]: 1 }}
                >
                  {[
                    { k: "90%", t: "of your day is spent indoors" },
                    { k: "24/7", t: "your surfaces are working" },
                    { k: "0", t: "sprays, filters, or fragrance" },
                  ].map((s) => (
                    <div key={s.k} className="py-8 sm:px-8" style={{ borderColor: C.hairline }}>
                      <p
                        className="font-normal"
                        style={{ fontFamily: SERIF, fontSize: "clamp(2.5rem, 4.2vw, 3.5rem)", lineHeight: 1, color: C.green }}
                      >
                        {s.k}
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.5]" style={{ color: C.muted }}>
                        {s.t}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ FULL-BLEED LIFESTYLE 1 ============ */}
        <section className="relative">
          <div className="relative h-[62vh] min-h-[440px] w-full overflow-hidden sm:h-[78vh]">
            <img
              src={bedroomWide}
              alt="Serene bedroom in warm morning light with linen bedding and an EnviroBiotics device"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1088}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(31,41,51,0.05) 0%, rgba(31,41,51,0.0) 40%, rgba(31,41,51,0.55) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
                <p
                  className="max-w-[24ch] text-white font-normal italic"
                  style={{
                    fontFamily: SERIF,
                    fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                    lineHeight: 1.05,
                    textShadow: "0 2px 20px rgba(0,0,0,0.35)",
                  }}
                >
                  A quieter kind of clean — one that lives in the room, not on it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ EDITORIAL SPLIT — LIVING ROOM (image right) ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.ivory }}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
            <Reveal className="order-2 lg:order-1">
              <Eyebrow>The living area</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}>
                For the room your day actually happens in.
              </H2>
              <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.7]" style={{ color: C.muted }}>
                The sofa you unwind on. The rug your kids stretch on. The
                counter your morning routine lives around. EnviroBiotics runs
                quietly in the background, dispersing beneficial probiotics
                that settle onto the air and surfaces you already share your
                day with.
              </p>

              <ul className="mt-9 space-y-4">
                {[
                  { icon: Wind, t: "Continuous, silent probiotic layer" },
                  { icon: Leaf, t: "Beneficial microbes, collected from nature" },
                  { icon: Sparkles, t: "No fragrance, no residue, no cleanup" },
                ].map(({ icon: Icon, t }) => (
                  <li key={t} className="flex items-center gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: C.sage, color: C.green }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="text-[15.5px]" style={{ color: C.charcoal }}>
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-[32px]"
                  style={{ background: C.sand, opacity: 0.7 }}
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/6]" style={{ boxShadow: "0 40px 80px -40px rgba(31,41,51,0.35)" }}>
                  <img
                    src={livingImage}
                    alt="Warm sunlit Scandinavian living room with linen sofa, oak side table and an EnviroBiotics device"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={1408}
                    height={1600}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ EDITORIAL SPLIT — RITUAL (image left) ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.sand }}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[5/6]" style={{ boxShadow: "0 40px 80px -40px rgba(31,41,51,0.4)" }}>
                  <img
                    src={ritualImage}
                    alt="Woman wrapped in a linen blanket with warm tea beside a small EnviroBiotics device on an oak nightstand"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={1408}
                    height={1600}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <Eyebrow>The bedroom</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}>
                For the room your body repairs in.
              </H2>
              <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.7]" style={{ color: C.muted }}>
                Sleep is where your recovery happens. EnviroBiotics gives the
                bedroom the same intention as your evening tea, your skincare,
                and your morning practice — a continuous, natural layer of
                environmental support while you rest.
              </p>

              <blockquote
                className="mt-10 border-l-2 pl-6 text-[19px] italic leading-[1.55]"
                style={{ fontFamily: SERIF, borderColor: C.green, color: C.charcoal }}
              >
                &ldquo;Now that it&rsquo;s next to my bed, it&rsquo;s become as
                automatic as my nightly wind-down.&rdquo;
                <footer
                  className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] not-italic"
                  style={{ color: C.green, fontFamily: SANS }}
                >
                  — Wellness reader review
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        {/* ============ HOW IT WORKS — minimal 3 step ============ */}
        <section id="how" className="scroll-mt-20 py-24 sm:py-32" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <Reveal className="max-w-3xl">
              <Eyebrow>How it works</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)" }}>
                Setup in about a minute.
                 Then it just <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>runs.</span>
              </H2>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-12 sm:grid-cols-3">
              {[
                { n: "01", t: "Place", c: "One device in your main living area. One in your bedroom. No installation, no tools." },
                { n: "02", t: "Power on", c: "Insert the probiotic cartridge and switch it on. It runs quietly in the background." },
                { n: "03", t: "Let it work", c: "Beneficial probiotics settle onto the air and surfaces around you, continuously." },
              ].map((s) => (
                <div key={s.n} className="border-t pt-6" style={{ borderColor: C.hairline }}>
                  <p
                    className="text-[13px] font-semibold uppercase tracking-[0.3em]"
                    style={{ color: C.green }}
                  >
                    Step {s.n}
                  </p>
                  <h3
                    className="mt-4"
                    style={{ fontFamily: SERIF, fontSize: "1.9rem", lineHeight: 1.05, color: C.charcoal }}
                  >
                    {s.t}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.65]" style={{ color: C.muted }}>
                    {s.c}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRIMARY OFFER — visual centerpiece ============ */}
        <section id="offer" className="scroll-mt-20 py-24 sm:py-32" style={{ background: C.ivory }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-14">
            <Reveal className="mb-14 text-center">
              <Eyebrow>The recommended system</Eyebrow>
              <H2 className="mx-auto mt-6 max-w-[20ch]">
                The Environmental
                 Wellness <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>System.</span>
              </H2>
            </Reveal>

            <div
              className="relative overflow-hidden rounded-[32px] sm:rounded-[40px]"
              style={{
                background: `linear-gradient(135deg, ${C.offwhite} 0%, ${C.sand} 100%)`,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 50px 120px -60px rgba(31,41,51,0.3)",
              }}
            >
              <span
                className="absolute left-8 top-8 z-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.24em] text-white sm:left-10 sm:top-10"
                style={{ background: C.green }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Recommended
              </span>

              <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.05fr_1fr]">
                {/* Product image half */}
                <div
                  className="relative flex items-center justify-center px-6 py-16 sm:px-12 sm:py-20 lg:py-24"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 60%, rgba(220,231,221,0.55) 0%, transparent 70%)",
                  }}
                >
                  <img
                    src={bundleAsset.url}
                    alt="Biotica 800 and BioLogic Mini — the Environmental Wellness System"
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 max-h-[440px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(31,41,51,0.18)]"
                  />
                </div>

                {/* Copy half */}
                <div className="border-t p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14" style={{ borderColor: C.hairline }}>
                  <h3
                    className="font-normal"
                    style={{ fontFamily: SERIF, fontSize: "clamp(1.85rem, 3vw, 2.5rem)", lineHeight: 1.1, color: C.charcoal }}
                  >
                    Main living area <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>+</span> one bedroom.
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.65]" style={{ color: C.muted }}>
                    One Biotica 800 for where you live. One BioLogic Mini for
                    where you rest. Continuous environmental wellness in the
                    two rooms your routine actually happens in.
                  </p>

                  <ul className="mt-8 space-y-3.5">
                    {[
                      "1× Biotica 800 (main living area, up to 800 sq ft)",
                      "1× BioLogic Mini (bedroom, up to 300 sq ft)",
                      "Included probiotic cartridges",
                      "7-Day Home Wellness Reset guide",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]" style={{ color: C.charcoal }}>
                        <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} style={{ color: C.green }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-9 flex flex-wrap items-baseline gap-3 border-t pt-6"
                    style={{ borderColor: C.hairline }}
                  >
                    <span
                      className="font-normal"
                      style={{ fontFamily: SERIF, fontSize: "3rem", lineHeight: 1, color: C.charcoal }}
                    >
                      {PRICING.bundle.price}
                    </span>
                    <span className="text-[17px] line-through" style={{ color: "rgba(31,41,51,0.4)" }}>
                      {PRICING.bundle.compare}
                    </span>
                    <span
                      className="ml-1 rounded-full px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
                      style={{ background: C.sage, color: C.green }}
                    >
                      Bundle savings
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <PrimaryCTA
                      href={URLS.bundle}
                      onClick={() => trackEvent("click_wellness_bundle")}
                    >
                      Add to Cart
                    </PrimaryCTA>
                    <span className="text-[12.5px]" style={{ color: "rgba(31,41,51,0.6)" }}>
                      Free shipping · 30-day guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary configurations — quiet, minimal */}
            <div className="mt-20">
              <div className="mb-6 flex items-baseline justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(31,41,51,0.55)" }}>
                  Or start with a single room
                </p>
                <span className="h-px flex-1 mx-6" style={{ background: C.hairline }} />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  {
                    name: "Biotica 800",
                    tag: "Main living area · up to 800 sq ft",
                    price: PRICING.biotica.price,
                    img: bioticaProduct,
                    url: URLS.biotica,
                    evt: "click_wellness_biotica",
                  },
                  {
                    name: "BioLogic Mini",
                    tag: "Bedroom or wellness space · up to 300 sq ft",
                    price: PRICING.mini.price,
                    img: miniProduct,
                    url: URLS.mini,
                    evt: "click_wellness_mini",
                  },
                ].map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    onClick={() => trackEvent(p.evt)}
                    className="group flex items-center gap-6 rounded-[24px] border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: C.hairline, boxShadow: "0 20px 40px -30px rgba(31,41,51,0.15)" }}
                  >
                    <div
                      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl sm:h-32 sm:w-32"
                      style={{ background: C.ivory }}
                    >
                      <img src={p.img} alt={p.name} loading="lazy" className="max-h-[85%] max-w-[85%] object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 style={{ fontFamily: SERIF, fontSize: "1.5rem", lineHeight: 1.1, color: C.charcoal }}>
                        {p.name}
                      </h4>
                      <p className="mt-1.5 text-[13.5px]" style={{ color: C.muted }}>
                        {p.tag}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span
                          style={{ fontFamily: SERIF, fontSize: "1.5rem", color: C.charcoal }}
                        >
                          {p.price}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: C.green }}
                        >
                          Shop
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ COMPARISON — refined table ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal className="mb-14 max-w-3xl">
              <Eyebrow>How it compares</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)" }}>
                A different layer than the ones you already own.
              </H2>
            </Reveal>

            <div
              className="overflow-hidden rounded-[24px]"
              style={{ border: `1px solid ${C.hairline}`, background: "#fff" }}
            >
              <div className="grid grid-cols-4 text-[11.5px] font-semibold uppercase tracking-[0.2em]" style={{ background: C.ivory, color: "rgba(31,41,51,0.55)" }}>
                <div className="p-5 sm:p-7" />
                <div className="p-5 text-center sm:p-7">Air purifier</div>
                <div className="p-5 text-center sm:p-7">Manual cleaning</div>
                <div
                  className="p-5 text-center sm:p-7"
                  style={{ background: C.sage, color: C.green }}
                >
                  EnviroBiotics
                </div>
              </div>
              {[
                ["Cleans airborne particles", true, false, "partial"],
                ["Supports the surfaces you live on", false, "partial", true],
                ["Works between cleanings", false, false, true],
                ["Quiet, automatic, always on", "partial", false, true],
                ["No harsh chemicals or fragrance", true, false, true],
                ["Setup in ~60 seconds", true, false, true],
              ].map(([label, a, b, c], i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 items-center text-[14.5px] border-t"
                  style={{ borderColor: C.hairline }}
                >
                  <div className="p-5 font-medium sm:p-7" style={{ color: C.charcoal }}>
                    {label as string}
                  </div>
                  {[a, b, c].map((v, j) => (
                    <div
                      key={j}
                      className="p-5 text-center sm:p-7"
                      style={j === 2 ? { background: "rgba(220,231,221,0.35)" } : undefined}
                    >
                      {v === true ? (
                        <Check className="mx-auto h-5 w-5" strokeWidth={2.5} style={{ color: C.green }} />
                      ) : v === false ? (
                        <X className="mx-auto h-4 w-4" style={{ color: "rgba(31,41,51,0.22)" }} />
                      ) : (
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                          style={{ color: "rgba(31,41,51,0.5)" }}
                        >
                          Partial
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROOF — elevated certifications + testimonials ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.ivory }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <Reveal className="mx-auto mb-16 max-w-3xl text-center">
              <Eyebrow>Verified proof</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Independently certified.
                 Safe by <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>design.</span>
              </H2>
              <p className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-[1.7]" style={{ color: C.muted }}>
                Probiotic strains collected from nature, unmodified, and free
                of added chemicals — reviewed under global safety programs.
              </p>
            </Reveal>

            {/* Cert row: fewer, larger, calmer */}
            <div
              className="grid grid-cols-3 items-center gap-y-10 rounded-[24px] border py-10 px-6 sm:grid-cols-6 sm:py-12 sm:px-10"
              style={{ borderColor: C.hairline, background: C.offwhite }}
            >
              {[
                { label: "FDA GRAS", image: fdaGrasAsset.url },
                { label: "EPA Registered", image: epaAsset.url },
                { label: "PTPA Winner", image: ptpaAsset.url },
                { label: "ISO 9001:2015", image: isoAsset.url },
                { label: "MADE SAFE®", image: madeSafeAsset.url },
                { label: "AllergyUK", image: allergyAsset.url },
              ].map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-3" title={c.label}>
                  <img
                    src={c.image}
                    alt={`${c.label} certification`}
                    loading="lazy"
                    className="h-16 w-auto object-contain opacity-90 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:h-20"
                  />
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(31,41,51,0.6)" }}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[
                {
                  q: "It fits the same shelf as my books and my diffuser. I forget it's on — and that's the point.",
                  n: "Maya L.",
                  r: "Yoga instructor",
                },
                {
                  q: "The rooms feel calmer somehow. It's the layer of my wellness routine I didn't know was missing.",
                  n: "Jordan P.",
                  r: "Verified customer",
                },
              ].map((t) => (
                <figure
                  key={t.n}
                  className="rounded-[24px] border p-8 sm:p-10"
                  style={{ borderColor: C.hairline, background: C.offwhite }}
                >
                  <blockquote
                    className="text-[20px] leading-[1.45] sm:text-[22px]"
                    style={{ fontFamily: SERIF, color: C.charcoal }}
                  >
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.green }}>
                    <span className="h-px w-6" style={{ background: C.green }} />
                    {t.n} · <span style={{ color: "rgba(31,41,51,0.55)" }}>{t.r}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ GUARANTEE — editorial banner ============ */}
        <section
          className="relative overflow-hidden py-24 sm:py-32"
          style={{ background: C.greenDeep, color: "#fff" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(700px 400px at 20% 20%, rgba(246,139,69,0.25), transparent 60%), radial-gradient(700px 400px at 90% 80%, rgba(220,231,221,0.25), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-10">
            <Eyebrow light>30-day promise</Eyebrow>
            <h2
              className="mt-6 font-normal"
              style={{ fontFamily: SERIF, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
            >
              Try the Wellness Reset for
               thirty <span className="italic font-normal" style={{ color: C.sage, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>days.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.78)" }}>
              If your rooms don&rsquo;t feel cleaner, fresher, and more
              supportive of the routine you already run — send it back for
              a full refund. No forms, no friction.
            </p>
            <div className="mt-10">
              <PrimaryCTA
                href={URLS.bundle}
                onClick={() => trackEvent("click_wellness_guarantee")}
              >
                Start My 30-Day Reset
              </PrimaryCTA>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.offwhite }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 sm:px-10 lg:grid-cols-12 lg:gap-24 lg:px-16">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Support</Eyebrow>
              <H2 className="mt-6" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}>
                Wellness questions,
                 <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>answered.</span>
              </H2>
            </div>
            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "Is this a medical device or a health treatment?",
                    a: "No. EnviroBiotics is an environmental wellness product. It supports the air and surfaces of your space — it does not prevent, treat, cure, or eliminate any medical condition.",
                  },
                  {
                    q: "How does it fit next to my air purifier?",
                    a: "They complement each other. Purifiers focus on airborne particles; EnviroBiotics adds a continuous probiotic layer for the surfaces you actually sit, sleep, and stretch on.",
                  },
                  {
                    q: "Is it safe around kids, pets, and low-tox routines?",
                    a: "Yes. The probiotics are collected from nature, unmodified, and covered by global safety certifications including FDA GRAS status. No harsh chemicals, no artificial fragrance.",
                  },
                  {
                    q: "What does the setup actually look like?",
                    a: "Unbox, insert the cartridge, place on a shelf or nightstand, plug in. About sixty seconds per device. No app required.",
                  },
                  {
                    q: "Does the recommended system cover my whole home?",
                    a: "It covers your main living area plus one bedroom — the two rooms your routine typically lives in. It is not a full-home configuration.",
                  },
                  {
                    q: "What if it doesn't feel like a fit?",
                    a: "Use it for 30 days. If your space doesn't feel cleaner and more supportive of your routine, return it for a full refund.",
                  },
                ].map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`q${idx}`}
                    className="border-b"
                    style={{ borderColor: C.hairline }}
                  >
                    <AccordionTrigger
                      className="py-6 text-left text-[17px] font-medium hover:no-underline sm:text-[18.5px]"
                      style={{ color: C.charcoal, fontFamily: SERIF }}
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent
                      className="pb-6 text-[15.5px] leading-[1.7]"
                      style={{ color: C.muted }}
                    >
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-24 sm:py-32" style={{ background: C.ivory }}>
          <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-10">
            <Eyebrow>Complete the routine</Eyebrow>
            <h2
              className="mx-auto mt-6 max-w-[22ch] font-normal"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
                color: C.charcoal,
              }}
            >
              The layer of wellness the rest of your routine has been
               waiting <span className="italic font-normal" style={{ color: C.green, fontFamily: ITALIC_SERIF, fontWeight: 400 }}>for.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.7]" style={{ color: C.muted }}>
              Set it up in about a minute. Let the air and surfaces of your
              main living area and bedroom carry the same intention as the
              rest of your day.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <PrimaryCTA
                href={URLS.bundle}
                onClick={() => trackEvent("click_wellness_final")}
              >
                Complete My Routine
              </PrimaryCTA>
              <GhostCTA
                href="#offer"
                onClick={() => trackEvent("click_wellness_final_secondary")}
              >
                See the system
              </GhostCTA>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile sticky CTA */}
      <div className="md:hidden h-[72px]" aria-hidden="true" />
      {showSticky && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden"
          style={{
            background: "rgba(252,251,248,0.96)",
            borderColor: C.hairline,
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.green }}>
                Wellness System
              </p>
              <p
                className="truncate text-[15px]"
                style={{ fontFamily: SERIF, color: C.charcoal }}
              >
                {PRICING.bundle.price} · 30-day guarantee
              </p>
            </div>
            <a
              href={URLS.bundle}
              onClick={() => trackEvent("click_wellness_sticky")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white"
              style={{ background: C.orange }}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default WellnessLandingPage;
