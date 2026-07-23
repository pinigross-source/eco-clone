import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Check,
  X,
  ShoppingBag,
  Wind,
  Sun,
  Moon,
  Leaf,
  SprayCan,
  Filter,
  Volume2,
  Feather,
  ShieldCheck,
  Sparkles,
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

import heroImage from "@/assets/eb_well.avif.asset.json";
import livingImageAsset from "@/assets/let-it-work-living.avif.asset.json";
const livingImage = livingImageAsset.url;
import ritualAsset from "@/assets/final-cta-wellness.avif.asset.json";
const ritualImage = ritualAsset.url;
import placeStepAsset from "@/assets/place-step-cozy.avif.asset.json";
const placeStep = placeStepAsset.url;
import beforeAsset from "@/assets/before-envirobiotics.avif.asset.json";
import withAsset from "@/assets/with-envirobiotics.avif.asset.json";
const bedroomWide = beforeAsset.url;
const withImage = withAsset.url;
import powerOnBedroomAsset from "@/assets/power-on-bedroom.avif.asset.json";
const powerOnBedroom = powerOnBedroomAsset.url;
import bioticaProduct from "@/assets/biotica-lifestyle.jpg.asset.json";
import miniProduct from "@/assets/mini-lifestyle.jpg.asset.json";
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
  bundle: { price: "$395", compare: "$495", save: "$100 OFF" },
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
  white: "#FFFFFF",
  sage: "#DCE7DD",
  green: "#2F5A4B",
  greenDeep: "#243F35",
  brownBand: "#A18869",
  brownBandDeep: "#8B6F52",
  charcoal: "#1F2933",
  softInk: "#2B3138",
  muted: "rgba(31,41,51,0.66)",
  mutedSoft: "rgba(31,41,51,0.52)",
  hairline: "rgba(31,41,51,0.10)",
  hairlineStrong: "rgba(31,41,51,0.16)",
  orange: "#F68B45",
  orangeDeep: "#E4762E",
};

const DISPLAY = `"Manrope", "Inter", system-ui, -apple-system, sans-serif`;
const ITALIC_SERIF = `"Instrument Serif", "Playfair Display", Georgia, serif`;
const SANS = `"Manrope", "Inter", "Hanken Grotesk", system-ui, -apple-system, sans-serif`;

/* ---------- Small primitives ---------- */
type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const H2 = ({ children, className = "", style = {} }: HeadingProps) => (
  <h2
    className={`font-bold ${className}`}
    style={{
      fontFamily: DISPLAY,
      fontWeight: 800,
      fontSize: "clamp(2.1rem, 4vw, 3.4rem)",
      lineHeight: 1.05,
      letterSpacing: "-0.025em",
      color: C.charcoal,
      ...style,
    }}
  >
    {children}
  </h2>
);

const Ital = ({
  children,
  color = C.charcoal,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <span
    className="italic font-normal"
    style={{ fontFamily: ITALIC_SERIF, fontWeight: 400, color }}
  >
    {children}
  </span>
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
    className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-[14px] text-[12.5px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_-12px_rgba(228,118,46,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(228,118,46,0.75)] ${className}`}
    style={{ background: C.orange, fontFamily: DISPLAY }}
  >
    {children}
  </a>
);

const OutlineCTA = ({
  href,
  onClick,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}) => {
  const isLight = variant === "light";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-[14px] text-[12.5px] font-bold uppercase tracking-[0.16em] transition-colors ${className}`}
      style={{
        fontFamily: DISPLAY,
        color: isLight ? "#fff" : C.charcoal,
        borderColor: isLight ? "rgba(255,255,255,0.65)" : C.hairlineStrong,
        background: isLight ? "transparent" : C.white,
      }}
    >
      {children}
    </a>
  );
};

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
      className={`transition-all duration-[800ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"} ${className}`}
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
        description="Your wellness routine shouldn't end at your skin. EnviroBiotics is the missing environmental layer, living, beneficial microbes for the air and surfaces of the rooms you actually live in."
        path="/wellness"
      />

      <Navbar />

      <main
        className="pt-16 lg:pt-[124px]"
        style={{ fontFamily: SANS, background: C.ivory, color: C.charcoal }}
      >
        {/* ============================================================
           HERO, split, text left, lifestyle image right, chip trust row
           ============================================================ */}
        <section style={{ background: C.ivory }}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-0 lg:grid-cols-[1.05fr_1fr]">
            {/* Copy */}
            <div className="order-2 flex flex-col justify-center px-5 pb-14 pt-10 sm:px-10 sm:pb-20 sm:pt-14 lg:order-1 lg:px-16 lg:py-24">
              <h1
                className="font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  color: C.charcoal,
                  maxWidth: "18ch",
                }}
              >
                Your wellness routine shouldn&rsquo;t end at your <Ital>Body.</Ital>
              </h1>

              <p
                className="mt-7 max-w-[46ch] text-[16px] leading-[1.65] sm:text-[17.5px]"
                style={{ color: C.muted }}
              >
                <strong style={{ color: C.charcoal, fontWeight: 700 }}>
                  You eat well. You exercise. You prioritize sleep, hydration, and recovery.
                </strong>
                <br /><br />
                EnviroBiotics adds the environmental layer to your routine, using beneficial probiotics to continuously support the air, surfaces, and objects around you.
                <br /><br />
                No harsh sprays. No noisy fan. No extra daily task.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PrimaryCTA
                  href="#offer"
                  onClick={(() => trackEvent("click_wellness_hero_primary")) as any}
                >
                  Shop the System
                </PrimaryCTA>
                <OutlineCTA
                  href="#how"
                  onClick={(() => trackEvent("click_wellness_hero_secondary")) as any}
                >
                  How It Works
                </OutlineCTA>
              </div>

            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div
                className="relative h-[54vh] min-h-[380px] w-full overflow-hidden sm:h-[68vh] lg:h-full lg:min-h-[640px]"
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
            </div>
          </div>
        </section>

        {/* ============================================================
           PROBLEM, "You've optimized your body." 3-col benefits row
           ============================================================ */}
        <section className="py-20 sm:py-28" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
              <Reveal>
                <span
                  className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: C.green }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
                  The invisible layer
                </span>
                <H2>
                  You&rsquo;ve optimized your body. What about the room around <Ital>it?</Ital>
                </H2>
              </Reveal>
              <Reveal>
                <p
                  className="max-w-[46ch] text-[16px] leading-[1.75] lg:text-[17px]"
                  style={{ color: C.muted }}
                >
                  We spend 90% of our time indoors. Traditional cleaning removes dirt. EnviroBiotics supports the invisible environment you actually live in.
                </p>
              </Reveal>
            </div>

            <div
              className="mt-16 grid grid-cols-1 overflow-hidden rounded-[22px] sm:grid-cols-3"
              style={{
                background: C.white,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 30px 80px -60px rgba(31,41,51,0.35)",
              }}
            >
              {[
                {
                  icon: SprayCan,
                  n: "01",
                  t: "Built-up invisible load",
                  c: "Microbes, VOCs, and odors build up in the air, on surfaces, and in soft materials.",
                },
                {
                  icon: Moon,
                  n: "02",
                  t: "Disruption while you rest",
                  c: "Poor environmental conditions can impact sleep quality, recovery, and focus.",
                },
                {
                  icon: Wind,
                  n: "03",
                  t: "Surface cleaning isn't enough",
                  c: "Wiping and vacuuming don't get to the root of what's living in your space.",
                },
              ].map(({ icon: Icon, n, t, c }, i, arr) => (
                <div
                  key={t}
                  className={`relative p-8 sm:p-10 ${
                    i < arr.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""
                  }`}
                  style={{ borderColor: C.hairline }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: C.sage, color: C.green }}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                    </span>
                    <span
                      className="text-[11px] font-bold tracking-[0.2em]"
                      style={{ color: C.mutedSoft, fontFamily: DISPLAY }}
                    >
                      {n}
                    </span>
                  </div>
                  <h3
                    className="mt-8 font-bold"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.25rem",
                      color: C.charcoal,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {t}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-[14.5px] leading-[1.7]" style={{ color: C.muted }}>
                    {c}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ============================================================
           COMPARISON TABLE
           ============================================================ */}
        <section className="py-20 sm:py-28" style={{ background: C.ivory }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 sm:px-10 lg:grid-cols-[0.85fr_1.65fr] lg:gap-20 lg:px-16">
            <Reveal>
              <div className="lg:sticky lg:top-32 lg:self-start">
                <span
                  className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: C.green }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
                  The comparison
                </span>
                <H2 style={{ fontSize: "clamp(1.9rem, 3.4vw, 3rem)" }}>
                  A different layer than the ones you already <Ital>own.</Ital>
                </H2>
                <p
                  className="mt-5 max-w-[38ch] text-[15px] leading-[1.7]"
                  style={{ color: C.muted }}
                >
                  Filters trap. Sprays wipe. EnviroBiotics works with your home&rsquo;s ecosystem, quietly, continuously, on air and every surface you touch.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div
                className="overflow-hidden rounded-[22px]"
                style={{
                  border: `1px solid ${C.hairline}`,
                  background: C.white,
                  boxShadow: "0 30px 80px -60px rgba(31,41,51,0.35)",
                }}
              >
                <div
                  className="grid grid-cols-[1.5fr_1fr_1fr_1.05fr] text-[10.5px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: C.offwhite, color: C.mutedSoft }}
                >
                  <div className="p-5 sm:p-6" />
                  <div className="p-5 text-center sm:p-6">Air purifier</div>
                  <div className="p-5 text-center sm:p-6">Manual cleaning</div>
                  <div
                    className="relative p-5 text-center sm:p-6"
                    style={{ background: C.sage, color: C.green }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-3 top-0 h-[3px] rounded-b-full"
                      style={{ background: C.green }}
                    />
                    EnviroBiotics
                  </div>
                </div>
                {[
                  ["Targets the source", false, false, true],
                  ["Works while you live", false, false, true],
                  ["No filters to replace", true, true, true],
                  ["Supports long-term balance", false, false, true],
                  ["Works on soft surfaces", false, "partial", true],
                  ["Quiet & effortless", "partial", false, true],
                  ["Uses beneficial microbes", false, false, true],
                ].map(([label, a, b, c], i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1.5fr_1fr_1fr_1.05fr] items-center border-t text-[14px] transition-colors hover:bg-[rgba(220,231,221,0.12)]"
                    style={{ borderColor: C.hairline }}
                  >
                    <div className="p-5 font-semibold sm:p-6" style={{ color: C.charcoal, fontFamily: DISPLAY }}>
                      {label as string}
                    </div>
                    {[a, b, c].map((v, j) => (
                      <div
                        key={j}
                        className="p-5 text-center sm:p-6"
                        style={j === 2 ? { background: "rgba(220,231,221,0.35)" } : undefined}
                      >
                        {v === true ? (
                          <span
                            className="mx-auto inline-flex h-7 w-7 items-center justify-center rounded-full"
                            style={{
                              background: j === 2 ? C.green : "transparent",
                              border: j === 2 ? "none" : `1px solid ${C.hairlineStrong}`,
                            }}
                          >
                            <Check
                              className="h-3.5 w-3.5"
                              strokeWidth={2.6}
                              style={{ color: j === 2 ? C.white : C.green }}
                            />
                          </span>
                        ) : v === false ? (
                          <X className="mx-auto h-3.5 w-3.5" style={{ color: "rgba(31,41,51,0.28)" }} />
                        ) : (
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.16em]"
                            style={{ color: C.mutedSoft }}
                          >
                            Partial
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
           WARM BROWN PROMISE BAND, 4 circle benefits
           ============================================================ */}
        <section
          className="relative overflow-hidden py-20 sm:py-24"
          style={{
            background: `linear-gradient(90deg, ${C.brownBandDeep} 0%, ${C.brownBand} 100%)`,
            color: C.white,
          }}
        >
          {/* subtle plant vignette on the right */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-40 lg:block"
            style={{
              background:
                "radial-gradient(ellipse at 90% 50%, rgba(220,231,221,0.35), transparent 65%)",
            }}
          />
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-5 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:px-16">
            <Reveal>
              <h2
                className="font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: C.white,
                  maxWidth: "16ch",
                }}
              >
                A home that feels as clean as your <Ital color="rgba(255,255,255,0.92)">routine.</Ital>
              </h2>
              <p
                className="mt-5 max-w-[42ch] text-[15.5px] leading-[1.7]"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                A fresher, calmer, more supportive space, night and day.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                {[
                  { icon: Wind, t: "Cleaner air", s: "you can feel" },
                  { icon: Sun, t: "Fresher home", s: "naturally" },
                  { icon: Moon, t: "Restful sleep", s: "& recovery" },
                  { icon: Leaf, t: "Peace of mind", s: "in every breath" },
                ].map(({ icon: Icon, t, s }) => (
                  <div key={t} className="flex flex-col items-center text-center">
                    <span
                      className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full"
                      style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)" }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <p className="text-[14px] font-bold" style={{ fontFamily: DISPLAY, letterSpacing: "-0.01em" }}>
                      {t}
                    </p>
                    <p className="mt-1 text-[12.5px]" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
           THE SIMPLEST WAY TO EXPLAIN IT, split editorial card
           ============================================================ */}
        <section id="how" className="scroll-mt-24 py-12 sm:py-16" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <div
              className="overflow-hidden rounded-[28px]"
              style={{ background: `linear-gradient(90deg, ${C.sand} 0%, ${C.white} 60%)` }}
            >
              <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
                {/* Left headline */}
                <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-14 lg:py-16">
                  <span
                    className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ borderColor: C.hairline, color: C.brownBandDeep, fontFamily: DISPLAY }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.orange }} />
                    How It Works
                  </span>
                  <h2
                    className="font-bold"
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 800,
                      fontSize: "clamp(2rem, 3.3vw, 2.8rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                      color: C.charcoal,
                      maxWidth: "18ch",
                    }}
                  >
                    The simplest way<br />to explain it.
                  </h2>
                </div>

                {/* Right body */}
                <div
                  className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:border-l lg:px-14 lg:py-16"
                  style={{ borderColor: C.hairline }}
                >
                  <p className="text-[16px] leading-[1.7] sm:text-[17.5px]" style={{ color: C.muted }}>
                    You&rsquo;ve heard of probiotics for your gut - the beneficial microbes that keep things balanced and healthy.{" "}
                    <strong style={{ color: C.charcoal }}>EnviroBiotics brings that same idea to your home.</strong>
                  </p>
                  <p className="mt-5 text-[16px] leading-[1.7] sm:text-[17.5px]" style={{ color: C.muted }}>
                    Beneficial probiotics settle onto surfaces and quietly break down the organic residue pets leave behind - dander and odor-causing compounds -{" "}
                    <em style={{ color: C.brownBandDeep, fontStyle: "normal", fontWeight: 600 }}>continuously and naturally.</em>
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: C.charcoal, fontFamily: DISPLAY }}
                    >
                      Bio
                    </span>
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: C.muted, fontFamily: DISPLAY }}
                    >
                      Proven Probiotic Technology
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           HOW IT WORKS, 3 numbered photo cards
           ============================================================ */}
        <section id="setup" className="scroll-mt-20 py-20 sm:py-28" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <Reveal className="mx-auto max-w-3xl text-center">
              <H2 style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.75rem)" }}>
                Setup in about 60 seconds. Then it just <Ital>runs.</Ital>
              </H2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  n: 1,
                  t: "Place",
                  c: "Position the units in your bedroom and main living area.",
                  img: placeStep,
                  alt: "EnviroBiotics device placed on a warm oak nightstand",
                },
                {
                  n: 2,
                  t: "Power On",
                  c: "Plug in and power on. The system starts immediately.",
                  img: powerOnBedroom,
                  alt: "EnviroBiotics device powered on in a serene bedroom",
                },
                {
                  n: 3,
                  t: "Let It Work",
                  c: "Beneficial microbes get to work 24/7, so you can live well.",
                  img: livingImage,
                  alt: "Sunlit living room with an EnviroBiotics device running quietly in the background",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="overflow-hidden rounded-[20px] border bg-white"
                  style={{ borderColor: C.hairline, boxShadow: "0 20px 40px -30px rgba(31,41,51,0.15)" }}
                >
                  <div className="relative aspect-[4/3] w-full">
                    <img
                      src={s.img}
                      alt={s.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
                      style={{ background: C.green, fontFamily: DISPLAY }}
                    >
                      {s.n}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3
                      className="font-bold"
                      style={{ fontFamily: DISPLAY, fontSize: "1.125rem", color: C.charcoal, letterSpacing: "-0.01em" }}
                    >
                      {s.t}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.6]" style={{ color: C.muted }}>
                      {s.c}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           PRIMARY OFFER, image left / copy right
           ============================================================ */}
        <section id="offer" className="scroll-mt-20 pb-20 pt-6 sm:pb-28 sm:pt-8" style={{ background: C.offwhite }}>
          <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
            <Reveal className="mb-8 text-center">
              <h2
                className="mx-auto font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)",
                  color: C.charcoal,
                  letterSpacing: "-0.02em",
                }}
              >
                The Environmental Wellness <Ital>System.</Ital>
              </h2>
            </Reveal>

            <div
              className="relative overflow-hidden rounded-[28px]"
              style={{
                background: `linear-gradient(135deg, ${C.sand} 0%, ${C.offwhite} 100%)`,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 40px 100px -50px rgba(31,41,51,0.25)",
              }}
            >
              <div className="grid grid-cols-1 items-stretch lg:grid-cols-[1.1fr_1fr]">
                {/* Product image */}
                <div
                  className="relative flex items-center justify-center px-6 py-14 sm:px-10 sm:py-20 lg:py-24"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 60%, rgba(220,231,221,0.55) 0%, transparent 70%)",
                  }}
                >
                  <img
                    src={bundleAsset.url}
                    alt="Biotica 800 and BioLogic Mini, the Environmental Wellness System"
                    loading="lazy"
                    decoding="async"
                    className="max-h-[420px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(31,41,51,0.18)]"
                  />
                </div>

                {/* Copy */}
                <div className="border-t p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14" style={{ borderColor: C.hairline }}>
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white"
                      style={{ background: C.green, fontFamily: DISPLAY }}
                    >
                      Best Value
                    </span>
                  </div>

                  <h3
                    className="font-bold"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: "1.35rem",
                      color: C.charcoal,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    Includes Biotica 800 + BioLogic Mini
                  </h3>

                  <ul className="mt-6 space-y-3">
                    {[
                      "Beneficial microbes for the air & surfaces",
                      "Works 24/7 in the background",
                      "No filters. No refills. No harsh chemicals.",
                      "Covers up to 1,800 sq ft",
                      "Designed to complement your wellness routine",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14.5px]" style={{ color: C.charcoal }}>
                        <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} style={{ color: C.green }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-8 flex flex-wrap items-baseline gap-3 border-t pt-6"
                    style={{ borderColor: C.hairline }}
                  >
                    <span
                      className="font-bold"
                      style={{ fontFamily: DISPLAY, fontSize: "2.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {PRICING.bundle.price}
                    </span>
                    <span className="text-[15px]" style={{ color: C.mutedSoft }}>
                      {PRICING.bundle.compare} value
                    </span>
                    <span
                      className="ml-1 rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em]"
                      style={{ background: C.sage, color: C.green, fontFamily: DISPLAY }}
                    >
                      {PRICING.bundle.save}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <PrimaryCTA
                      href={URLS.bundle}
                      onClick={() => trackEvent("click_wellness_bundle")}
                      className="w-full sm:w-auto"
                    >
                      Add the System to Cart
                    </PrimaryCTA>
                    <p className="text-[12px]" style={{ color: C.mutedSoft }}>
                      Free shipping · 30-day risk-free trial
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prefer to start small */}
            <div className="mt-20">
              <div className="mb-10 text-center">
                <h3
                  className="font-bold tracking-tight"
                  style={{
                    color: C.charcoal,
                    fontFamily: DISPLAY,
                    fontSize: "clamp(1.75rem, 3.2vw, 2.6rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  Prefer to start <Ital>small?</Ital>
                </h3>
                <p
                  className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-[1.7]"
                  style={{ color: C.muted }}
                >
                  Risk-free for 30 days. Try it at home. If it does not fit your needs,
                  return it for a full refund. No questions asked.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  {
                    name: "BioLogic Mini",
                    tag: "Portable · a single room",
                    desc: "Your personal, take-anywhere unit. Compact enough to plug in at home and pack for the road.",
                    price: PRICING.mini.price,
                    img: miniProduct.url,
                    badge: "UP TO 300 SQ FT",
                    url: URLS.mini,
                    evt: "click_wellness_mini",
                  },
                  {
                    name: "Biotica 800",
                    tag: "Set-and-forget · a larger shared space",
                    desc: "Set-and-forget coverage for the spaces you spend the most time in.",
                    price: PRICING.biotica.price,
                    img: bioticaProduct.url,
                    badge: "UP TO 800 SQ FT",
                    url: URLS.biotica,
                    evt: "click_wellness_biotica",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex flex-col overflow-hidden rounded-[24px] border bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                    style={{ borderColor: C.hairline }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]" style={{ background: C.ivory }}>
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                      />
                      <span
                        className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] shadow-sm"
                        style={{ color: C.charcoal, fontFamily: DISPLAY }}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <h4
                        className="font-bold"
                        style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.charcoal, letterSpacing: "-0.01em" }}
                      >
                        {p.name}
                      </h4>
                      <p className="mt-1.5 text-[13.5px] font-semibold" style={{ color: C.muted, fontFamily: DISPLAY }}>
                        {p.tag}
                      </p>
                      <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: C.muted }}>
                        {p.desc}
                      </p>
                      <p
                        className="mt-5 font-bold"
                        style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: C.charcoal, letterSpacing: "-0.01em" }}
                      >
                        {p.price}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                          href={p.url}
                          onClick={() => trackEvent(p.evt)}
                          className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-neutral-800"
                          style={{ background: C.charcoal, fontFamily: DISPLAY }}
                        >
                          Buy
                        </a>
                        <a
                          href={p.url}
                          onClick={() => trackEvent(p.evt + "_learn")}
                          className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors hover:bg-[color:var(--hover-bg)]"
                          style={{ fontFamily: DISPLAY, color: C.charcoal, borderColor: C.hairlineStrong }}
                        >
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
           "Designed to disappear into your day", 2x3 feature grid
           ============================================================ */}
        <section className="py-20 sm:py-28" style={{ background: C.ivory }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 sm:px-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16 lg:px-16">
            <Reveal>
              <H2 style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)" }}>
                Designed to disappear into your <Ital>day.</Ital>
              </H2>
              <p className="mt-5 max-w-[38ch] text-[15.5px] leading-[1.7]" style={{ color: C.muted }}>
                Powerful, quiet, and effortless. Our system works in the
                background so you can focus on what matters.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
                {[
                  {
                    icon: SprayCan,
                    t: "No daily spraying",
                    c: "No manual mixing or interaction required.",
                  },
                  {
                    icon: Filter,
                    t: "No filter changes",
                    c: "Save time, money, and landfill waste.",
                  },
                  {
                    icon: Volume2,
                    t: "Ultra-quiet operation",
                    c: "Designed to be silent day and night.",
                  },
                  {
                    icon: Wind,
                    t: "No strong fragrance",
                    c: "Fragrance-free and never overpowering.",
                  },
                  {
                    icon: Sparkles,
                    t: "Works between cleanings",
                    c: "Supports your home 24/7, not just after cleaning.",
                  },
                  {
                    icon: Leaf,
                    t: "Natural balance",
                    c: "Uses beneficial microbes to support balance.",
                  },
                ].map(({ icon: Icon, t, c }) => (
                  <div key={t}>
                    <span
                      className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border"
                      style={{ borderColor: C.hairlineStrong, color: C.green }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <h3
                      className="font-bold"
                      style={{ fontFamily: DISPLAY, fontSize: "0.98rem", color: C.charcoal, letterSpacing: "-0.005em" }}
                    >
                      {t}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: C.muted }}>
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
           CERTIFICATIONS ROW, inline, calm
           ============================================================ */}
        <section className="border-y py-14 sm:py-16" style={{ background: C.offwhite, borderColor: C.hairline }}>
          <div className="mx-auto flex max-w-[1300px] flex-col items-start gap-8 px-5 sm:px-10 lg:flex-row lg:items-center lg:gap-14 lg:px-16">
            <div className="lg:w-[280px] lg:shrink-0">
              <h3
                className="font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: "1.15rem",
                  color: C.charcoal,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                }}
              >
                Independently certified. Safe by <Ital>design.</Ital>
              </h3>
            </div>
            <div className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
              {[
                { label: "EPA Registered", image: epaAsset.url },
                { label: "FDA GRAS", image: fdaGrasAsset.url },
                { label: "ISO 9001", image: isoAsset.url },
                { label: "PTPA Winner", image: ptpaAsset.url },
                { label: "MADE SAFE®", image: madeSafeAsset.url },
                { label: "AllergyUK", image: allergyAsset.url },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-center" title={c.label}>
                  <img
                    src={c.image}
                    alt={`${c.label} certification`}
                    loading="lazy"
                    className="h-12 w-auto object-contain opacity-85 transition-opacity duration-300 hover:opacity-100 sm:h-14"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
           BEFORE / AFTER
           ============================================================ */}
        <section className="py-20 sm:py-28" style={{ background: C.ivory }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-6 px-5 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:px-16">
            {/* Before */}
            <Reveal>
              <div
                className="relative overflow-hidden rounded-[24px]"
                style={{ boxShadow: "0 30px 60px -30px rgba(31,41,51,0.35)" }}
              >
                <img
                  src={bedroomWide}
                  alt="A bedroom before EnviroBiotics"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
                  decoding="async"
                  style={{ filter: "brightness(0.55) saturate(0.7)" }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9" style={{ color: "#fff" }}>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: DISPLAY, fontSize: "1.35rem", letterSpacing: "-0.015em" }}
                  >
                    Before EnviroBiotics
                  </h3>
                  <ul className="mt-4 space-y-2 text-[13.5px]" style={{ color: "rgba(255,255,255,0.9)" }}>
                    {[
                      "Stale air and musty odors",
                      "Dust, dander & invisible build-up",
                      "Restless nights & morning grogginess",
                      "Surfaces re-contaminate between cleanings",
                      "Harsh products & artificial scents",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/70" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* After */}
            <Reveal>
              <div
                className="relative overflow-hidden rounded-[24px]"
                style={{ boxShadow: "0 30px 60px -30px rgba(31,41,51,0.25)" }}
              >
                <img
                  src={withImage}
                  alt="A bright bedroom with EnviroBiotics"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                  loading="lazy"
                  decoding="async"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0.95) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
                  <h3
                    className="font-bold"
                    style={{ fontFamily: DISPLAY, fontSize: "1.35rem", color: C.charcoal, letterSpacing: "-0.015em" }}
                  >
                    With <Ital>EnviroBiotics</Ital>
                  </h3>
                  <ul className="mt-4 space-y-2 text-[13.5px]" style={{ color: C.softInk }}>
                    {[
                      "Fresher, cleaner air you can feel",
                      "Support for better sleep & recovery",
                      "A calmer, more balanced home",
                      "Long-lasting results between cleanings",
                      "Clean, natural, and worry-free",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3} style={{ color: C.green }} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================================================
           GUARANTEE, soft cream with plant vignettes
           ============================================================ */}
        <section
          className="relative overflow-hidden py-20 sm:py-24"
          style={{ background: C.ivory }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(500px 300px at 5% 100%, rgba(220,231,221,0.6), transparent 60%), radial-gradient(500px 300px at 95% 0%, rgba(220,231,221,0.5), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-[820px] px-5 text-center sm:px-10">
            <Leaf className="mx-auto mb-5 h-5 w-5" strokeWidth={1.4} style={{ color: C.green }} />
            <h2
              className="font-bold"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: C.charcoal,
              }}
            >
              Try the Wellness Reset for <Ital>30 days.</Ital>
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-[1.7]" style={{ color: C.muted }}>
              If you don&rsquo;t feel the difference, return it, no questions asked.
            </p>
            <div className="mt-8">
              <PrimaryCTA
                href={URLS.bundle}
                onClick={() => trackEvent("click_wellness_guarantee")}
              >
                Start My 30-Day Trial
              </PrimaryCTA>
            </div>
          </div>
        </section>

        {/* ============================================================
           FAQ, sticky heading + accordion
           ============================================================ */}
        <section className="py-20 sm:py-28" style={{ background: C.offwhite }}>
          <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-14 px-5 sm:px-10 lg:grid-cols-[0.85fr_1.65fr] lg:gap-20 lg:px-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span
                className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: C.green }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
                FAQ
              </span>
              <H2 style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)" }}>
                Wellness questions, <Ital>answered.</Ital>
              </H2>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.7]" style={{ color: C.muted }}>
                Everything you might wonder before you bring EnviroBiotics into your routine.
              </p>
              <a
                href="mailto:hello@envirobiotics.com"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                style={{ color: C.charcoal, borderBottom: `1px solid ${C.hairlineStrong}`, paddingBottom: 4 }}
              >
                Still curious? Talk to us
              </a>
            </div>
            <div
              className="overflow-hidden rounded-[22px]"
              style={{
                background: C.white,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 30px 80px -60px rgba(31,41,51,0.35)",
              }}
            >
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "What makes EnviroBiotics different?",
                    a: "We use living, beneficial microbes, not chemicals or filters, to support the environment you actually live in. It works continuously on both air and surfaces, quietly in the background.",
                  },
                  {
                    q: "Is it safe for kids and pets?",
                    a: "Yes. Our probiotics are collected from nature, unmodified, and covered by global safety certifications including FDA GRAS status. No harsh chemicals, no artificial fragrance.",
                  },
                  {
                    q: "How big of a space does it cover?",
                    a: "The Environmental Wellness System covers up to 1,800 sq ft, a main living area plus one bedroom. Individual units start at 300 sq ft.",
                  },
                  {
                    q: "Where should I place the units?",
                    a: "The bedroom for sleep and recovery, and your main living area for the room your day happens in. Placement on a shelf or nightstand works, no installation required.",
                  },
                  {
                    q: "How often do I need to do anything?",
                    a: "Setup takes about a minute. After that, cartridges swap on a simple schedule, no filters, no daily interaction, no app required.",
                  },
                ].map((item, idx, arr) => (
                  <AccordionItem
                    key={idx}
                    value={`q${idx}`}
                    className={idx === arr.length - 1 ? "" : "border-b"}
                    style={{ borderColor: C.hairline }}
                  >
                    <AccordionTrigger
                      className="group px-6 py-6 text-left text-[16px] font-semibold hover:no-underline sm:px-8 sm:py-7 sm:text-[17.5px]"
                      style={{ color: C.charcoal, fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.005em" }}
                    >
                      <span className="flex items-baseline gap-5">
                        <span
                          className="text-[11px] font-bold tracking-[0.18em]"
                          style={{ color: C.mutedSoft, fontFamily: DISPLAY }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{item.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-6 pb-7 text-[15px] leading-[1.75] sm:px-8"
                      style={{ color: C.muted }}
                    >
                      <div className="max-w-[62ch] pl-[calc(1.25rem+16px)]">{item.a}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============================================================
           FINAL CTA, dark green split with bedroom image
           ============================================================ */}
        <section
          className="relative overflow-hidden"
          style={{ background: C.greenDeep, color: "#fff" }}
        >
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch lg:grid-cols-[1.1fr_1fr]">
            <div className="px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
              <h2
                className="font-bold"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: "clamp(1.9rem, 3.6vw, 2.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: C.white,
                  maxWidth: "22ch",
                }}
              >
                The layer of wellness the rest of your routine has been <Ital color="rgba(255,255,255,0.92)">waiting for.</Ital>
              </h2>
              <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.78)" }}>
                Support your air. Support your life.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryCTA
                  href={URLS.bundle}
                  onClick={() => trackEvent("click_wellness_final")}
                >
                  Shop the System
                </PrimaryCTA>
                <OutlineCTA
                  href="#how"
                  variant="light"
                  onClick={() => trackEvent("click_wellness_final_secondary")}
                >
                  Learn More
                </OutlineCTA>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:min-h-[480px]">
              <img
                src={ritualImage}
                alt="EnviroBiotics on an oak nightstand beside a linen-dressed bed"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
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
              <p className="truncate text-[10.5px] font-bold uppercase tracking-[0.2em]" style={{ color: C.green, fontFamily: DISPLAY }}>
                Wellness System
              </p>
              <p
                className="truncate text-[14px] font-bold"
                style={{ fontFamily: DISPLAY, color: C.charcoal }}
              >
                {PRICING.bundle.price} · 30-day guarantee
              </p>
            </div>
            <a
              href={URLS.bundle}
              onClick={() => trackEvent("click_wellness_sticky")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: C.orange, fontFamily: DISPLAY }}
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
