import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check, X, ShoppingBag } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroAsset from "@/assets/wellness-hero.jpg.asset.json";
import bioticaProduct from "@/assets/biotica-800.png";
import miniProduct from "@/assets/biologic-mini-nobg-new.png";
import bundleAsset from "@/assets/bundle-product.webp.asset.json";

import epaAsset from "@/assets/certs/cert_0.png.asset.json";
import ispAsset from "@/assets/certs/cert_1.png.asset.json";
import simaAsset from "@/assets/certs/cert_2.png.asset.json";
import isoAsset from "@/assets/certs/cert_3.png.asset.json";
import allergyAsset from "@/assets/certs/cert_4.png.asset.json";
import madeSafeAsset from "@/assets/certs/cert_5.png.asset.json";
import sensitiveAsset from "@/assets/certs/cert_6.png.asset.json";
import ecocertAsset from "@/assets/certs/cert_7.png.asset.json";
import fdaGrasAsset from "@/assets/certs/fda_gras_v2.png.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";

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
  warm: "#F8F6F1",
  charcoal: "#1E2A3A",
  green: "#2F5B4B",
  sage: "#DCE8DF",
  mint: "#EFF6F1",
  orange: "#FF8039",
};

const DISPLAY = `"Poppins", "Hanken Grotesk", system-ui, -apple-system, sans-serif`;

const certifications = [
  { label: "EPA Registered", image: epaAsset.url },
  { label: "FDA GRAS", image: fdaGrasAsset.url },
  { label: "PTPA Winner", image: ptpaAsset.url },
  { label: "Instituto de Salud Pública", image: ispAsset.url },
  { label: "SIMA", image: simaAsset.url },
  { label: "ISO 9001:2015", image: isoAsset.url },
  { label: "AllergyUK", image: allergyAsset.url },
  { label: "MADE SAFE®", image: madeSafeAsset.url },
  { label: "Sensitive Choice", image: sensitiveAsset.url },
  { label: "EcoCert", image: ecocertAsset.url },
];

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [visible, setVisible] = useState(true);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setVisible(true), io.disconnect())),
      { threshold: 0.12, rootMargin: "200px" },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      className={`transition-all duration-[900ms] ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
    >
      {children}
    </div>
  );
};

/* ---------- Reusable primary CTA ---------- */
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
    className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_-14px_rgba(255,128,57,0.55)] transition-all hover:-translate-y-0.5 ${className}`}
    style={{ background: C.orange }}
  >
    {children}
    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
  </a>
);

const SecondaryCTA = ({
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
    className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5 ${className}`}
    style={{ borderColor: "rgba(30,42,58,0.2)", color: C.charcoal, background: "rgba(255,255,255,0.6)" }}
  >
    {children}
  </a>
);

const WellnessLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string, evt?: string) => {
    e.preventDefault();
    if (evt) trackEvent(evt);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title="Environmental Wellness for Your Home | EnviroBiotics"
        description="Your wellness routine shouldn't end at your skin. EnviroBiotics is the missing environmental layer of a complete wellness routine - supporting the air and surfaces in your main living area and bedroom, continuously and naturally."
        path="/wellness"
      />

      <Navbar />

      <main
        className="pt-16 lg:pt-[124px]"
        style={{ fontFamily: DISPLAY, background: C.warm, color: C.charcoal }}
      >
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden" style={{ background: C.warm }}>
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:grid-cols-12 lg:gap-14 lg:px-12 lg:pb-32 lg:pt-16">
            {/* Copy */}
            <div className="order-2 lg:order-1 lg:col-span-6 max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ borderColor: "rgba(47,91,75,0.2)", color: C.green, background: C.mint }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.green }} />
                Environmental Wellness
              </div>

              <h1
                className="font-semibold tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.4rem, 5.6vw, 4.5rem)", lineHeight: 0.98, color: C.charcoal }}
              >
                Your wellness routine
                <br />
                shouldn&apos;t end at your skin.
              </h1>

              <p className="mt-6 max-w-[52ch] text-[16.5px] leading-[1.6] sm:text-[18px]" style={{ color: "rgba(30,42,58,0.75)" }}>
                You eat clean. You move daily. You choose low-tox products.
                EnviroBiotics is the missing environmental layer — continuous probiotic
                support for the air and surfaces of your main living area and bedroom,
                so your home feels as considered as the rest of your routine.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PrimaryCTA
                  href="#offer"
                  onClick={(() => trackEvent("click_wellness_hero_primary")) as any}
                >
                  Complete My Wellness Routine
                </PrimaryCTA>
                <SecondaryCTA
                  href="#how"
                  onClick={(() => trackEvent("click_wellness_hero_secondary")) as any}
                >
                  See How It Works
                </SecondaryCTA>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]" style={{ color: "rgba(30,42,58,0.6)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  Setup in ~60 seconds
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  No filters, no sprays
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: C.green }} />
                  30-day guarantee
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="relative">
                <div className="aspect-[16/11] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-30px_rgba(30,42,58,0.25)] sm:rounded-[2.5rem]">
                  <img
                    src={heroAsset.url}
                    alt="Bright Scandinavian bedroom with a woman stretching in the morning light next to an EnviroBiotics device on an oak nightstand"
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    width={1600}
                    height={1104}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full blur-3xl" style={{ background: C.sage, opacity: 0.55 }} />
                <div className="absolute -top-6 -right-6 -z-10 h-40 w-40 rounded-full blur-3xl" style={{ background: "#FFE1CB", opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ============ PROBLEM: WELLNESS ROUTINE GAP ============ */}
        <section className="py-20 sm:py-28" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                  The wellness gap
                </p>
                <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", lineHeight: 1.05, color: C.charcoal }}>
                  You&apos;ve optimized your body. What about the room around it?
                </h2>
                <p className="mt-5 text-[16.5px] leading-[1.65]" style={{ color: "rgba(30,42,58,0.72)" }}>
                  You spend most of your day inside — sleeping, working, recovering.
                  Filters clean some of the air. Cleaners hit the visible surfaces.
                  Between those, everyday residue keeps building up on the sofa, bedding,
                  rugs, and counters your routine relies on.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {[
                { t: "You breathe indoor air ~90% of the day", s: "Your bedroom and living room set the baseline your body works from." },
                { t: "Cleaning is a moment, not a state", s: "Surfaces start collecting again the minute you finish." },
                { t: "Sprays mask. Filters miss surfaces.", s: "Neither one supports the space between cleanings." },
              ].map((c) => (
                <div key={c.t} className="rounded-[24px] p-7 sm:p-8" style={{ background: C.mint }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: C.green, color: "#fff" }}>
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </div>
                  <p className="mt-5 text-[16px] font-semibold" style={{ color: C.charcoal }}>{c.t}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.55]" style={{ color: "rgba(30,42,58,0.7)" }}>{c.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ COMPARISON TABLE ============ */}
        <section className="py-20 sm:py-28" style={{ background: C.warm }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mb-10 max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                  How it compares
                </p>
                <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", lineHeight: 1.05, color: C.charcoal }}>
                  A different layer than the ones you already own.
                </h2>
              </div>
            </Reveal>

            <div className="overflow-hidden rounded-[28px] border bg-white" style={{ borderColor: "rgba(30,42,58,0.08)" }}>
              <div className="grid grid-cols-4 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ background: C.mint, color: C.green }}>
                <div className="p-5 sm:p-6" />
                <div className="p-5 sm:p-6 text-center">Air purifier</div>
                <div className="p-5 sm:p-6 text-center">Manual cleaning</div>
                <div className="p-5 sm:p-6 text-center" style={{ background: C.sage }}>EnviroBiotics</div>
              </div>
              {[
                ["Cleans airborne particles", true, false, "partial"],
                ["Supports surfaces you live on", false, "partial", true],
                ["Works between cleanings", false, false, true],
                ["Quiet, automatic, always on", "partial", false, true],
                ["No harsh chemicals or fragrance", true, false, true],
                ["Setup in ~60 seconds", true, false, true],
              ].map(([label, a, b, c], i) => (
                <div key={i} className={`grid grid-cols-4 items-center text-[14.5px] ${i % 2 ? "bg-[#FBFBF9]" : "bg-white"}`}>
                  <div className="p-5 sm:p-6 font-medium" style={{ color: C.charcoal }}>{label as string}</div>
                  {[a, b, c].map((v, j) => (
                    <div key={j} className={`p-5 sm:p-6 text-center ${j === 2 ? "" : ""}`} style={j === 2 ? { background: "rgba(220,232,223,0.35)" } : undefined}>
                      {v === true ? (
                        <Check className="mx-auto h-5 w-5" strokeWidth={3} style={{ color: C.green }} />
                      ) : v === false ? (
                        <X className="mx-auto h-5 w-5" style={{ color: "rgba(30,42,58,0.25)" }} />
                      ) : (
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(30,42,58,0.5)" }}>Partial</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ DESIRED OUTCOME ============ */}
        <section className="py-20 sm:py-28" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16 text-center">
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                What changes
              </p>
              <h2 className="mx-auto max-w-[22ch] font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.05, color: C.charcoal }}>
                A home that feels as clean as your routine.
              </h2>
              <p className="mx-auto mt-5 max-w-[62ch] text-[16.5px] leading-[1.65]" style={{ color: "rgba(30,42,58,0.72)" }}>
                Rooms that feel fresher when you walk in. Sheets and sofas that stay
                that way longer. A quiet, continuous layer of environmental support
                that shows up for you the same way your morning walk and your greens do.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {[
                "Fresher-feeling air",
                "Cleaner-feeling surfaces",
                "Balanced indoor ecosystem",
                "Support between cleanings",
              ].map((t) => (
                <div key={t} className="rounded-2xl px-4 py-6 text-[14.5px] font-semibold" style={{ background: C.mint, color: C.charcoal }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THREE STEPS ============ */}
        <section id="how" className="scroll-mt-20 py-20 sm:py-28" style={{ background: C.warm }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                How it works
              </p>
              <h2 className="max-w-[22ch] font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", lineHeight: 1.05, color: C.charcoal }}>
                Setup in about 60 seconds. Then it just runs.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {[
                { n: "01", t: "Place", c: "Set one device in your main living area and one in your bedroom. No installation, no tools." },
                { n: "02", t: "Power on", c: "Insert the probiotic cartridge and switch it on. Runs quietly in the background." },
                { n: "03", t: "Let it work", c: "Beneficial probiotics settle onto the air and surfaces around you, continuously." },
              ].map((s) => (
                <div key={s.n} className="rounded-[24px] bg-white p-8" style={{ boxShadow: "0 20px 60px -30px rgba(30,42,58,0.15)" }}>
                  <span className="text-[12px] font-bold tracking-[0.22em]" style={{ color: C.green }}>{s.n}</span>
                  <h3 className="mt-4 text-[22px] font-semibold tracking-tight" style={{ color: C.charcoal }}>{s.t}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: "rgba(30,42,58,0.7)" }}>{s.c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRIMARY OFFER ============ */}
        <section id="offer" className="scroll-mt-20 py-20 sm:py-28" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mb-10 text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                  The recommended setup
                </p>
                <h2 className="mx-auto max-w-[22ch] font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.05, color: C.charcoal }}>
                  The Environmental Wellness System
                </h2>
              </div>
            </Reveal>

            <div className="relative overflow-hidden rounded-[36px] p-6 sm:p-10 lg:p-14" style={{ background: C.mint, border: `1px solid ${C.sage}` }}>
              <span
                className="absolute right-6 top-6 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
                style={{ background: C.green }}
              >
                Recommended
              </span>

              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="relative">
                  <div className="aspect-square overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(47,91,75,0.25)]">
                    <img
                      src={bundleAsset.url}
                      alt="Biotica 800 and BioLogic Mini bundle"
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-[26px] font-semibold sm:text-[32px]" style={{ color: C.charcoal }}>
                    Main living area + one bedroom
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6]" style={{ color: "rgba(30,42,58,0.72)" }}>
                    One Biotica 800 for where you live. One BioLogic Mini for where you rest,
                    work, or recover. Continuous environmental wellness in the two rooms your
                    routine actually happens in.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {[
                      "1× Biotica 800 (main living area)",
                      "1× BioLogic Mini (bedroom / home office / wellness space)",
                      "Included probiotic cartridges",
                      "Environmental Wellness Placement Guide",
                      "7-Day Home Wellness Reset",
                      "Free shipping",
                      "30-day money-back guarantee",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15.5px]" style={{ color: C.charcoal }}>
                        <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.75} style={{ color: C.green }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-baseline gap-3">
                    <span className="text-[36px] font-semibold" style={{ color: C.charcoal }}>{PRICING.bundle.price}</span>
                    <span className="text-[16px] line-through" style={{ color: "rgba(30,42,58,0.4)" }}>{PRICING.bundle.compare}</span>
                    <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.green }}>Bundle savings</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryCTA
                      href={URLS.bundle}
                      onClick={() => trackEvent("click_wellness_bundle")}
                    >
                      Get the Environmental Wellness System
                    </PrimaryCTA>
                  </div>

                  <p className="mt-4 text-[12.5px]" style={{ color: "rgba(30,42,58,0.55)" }}>
                    Covers your main living area + one bedroom. Not a full-home configuration.
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Secondary configurations ---- */}
            <div className="mt-16">
              <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(30,42,58,0.55)" }}>
                Or start with a single room
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
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
                    tag: "Bedroom, office or wellness space · up to 300 sq ft",
                    price: PRICING.mini.price,
                    img: miniProduct,
                    url: URLS.mini,
                    evt: "click_wellness_mini",
                  },
                ].map((p) => (
                  <div key={p.name} className="flex items-center gap-5 rounded-[24px] border bg-white p-5 sm:p-6" style={{ borderColor: "rgba(30,42,58,0.08)" }}>
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FBFBF9] p-2 sm:h-28 sm:w-28">
                      <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[17px] font-semibold" style={{ color: C.charcoal }}>{p.name}</h4>
                      <p className="mt-1 text-[13.5px]" style={{ color: "rgba(30,42,58,0.6)" }}>{p.tag}</p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-[18px] font-semibold" style={{ color: C.charcoal }}>{p.price}</span>
                        <a
                          href={p.url}
                          onClick={() => trackEvent(p.evt)}
                          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5"
                          style={{ borderColor: "rgba(30,42,58,0.2)", color: C.charcoal }}
                        >
                          Add
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ BENEFITS / DIFFERENTIATION ============ */}
        <section className="py-20 sm:py-28" style={{ background: C.warm }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                    Why it fits a wellness routine
                  </p>
                  <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.8rem)", lineHeight: 1.05, color: C.charcoal }}>
                    Designed to disappear into your day.
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.65]" style={{ color: "rgba(30,42,58,0.7)" }}>
                    No daily spraying. No filter changes. No strong artificial fragrance.
                    Just quiet, automatic environmental support that works between the
                    cleanings you already do.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {[
                    ["No daily spraying", "Runs on its own once you switch it on."],
                    ["No filter changes", "Replace cartridges on a simple schedule."],
                    ["Quiet operation", "Blends into the room like a candle would."],
                    ["No strong fragrance", "Neutral — no cover-up scent."],
                    ["Works between cleanings", "Supports your surfaces continuously."],
                    ["Natural balance", "Beneficial microbes from nature, unmodified."],
                  ].map(([t, s]) => (
                    <div key={t} className="rounded-2xl bg-white p-5 sm:p-6" style={{ boxShadow: "0 10px 30px -18px rgba(30,42,58,0.15)" }}>
                      <div className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0" strokeWidth={2.75} style={{ color: C.green }} />
                        <div>
                          <p className="text-[15.5px] font-semibold" style={{ color: C.charcoal }}>{t}</p>
                          <p className="mt-1 text-[13.5px] leading-[1.55]" style={{ color: "rgba(30,42,58,0.65)" }}>{s}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section className="py-20 sm:py-28" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto mb-12 max-w-3xl text-center">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                  Verified proof
                </p>
                <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, color: C.charcoal }}>
                  Independently certified. Safe by design.
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.6]" style={{ color: "rgba(30,42,58,0.7)" }}>
                  Probiotic strains collected from nature, unmodified, and free of added
                  chemicals — reviewed under global safety programs.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {certifications.map((c) => (
                <div
                  key={c.label}
                  title={c.label}
                  className="flex aspect-square items-center justify-center rounded-2xl bg-white p-5 sm:p-6"
                  style={{ border: "1px solid rgba(30,42,58,0.08)", boxShadow: "0 20px 40px -28px rgba(30,42,58,0.2)" }}
                >
                  <img src={c.image} alt={`${c.label} certification`} loading="lazy" className="max-h-[78%] max-w-[82%] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BEFORE / AFTER ROUTINE ============ */}
        <section className="py-20 sm:py-28" style={{ background: C.warm }}>
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                  Your routine
                </p>
                <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, color: C.charcoal }}>
                  Same routine. New environmental layer.
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              <div className="rounded-[28px] bg-white p-8" style={{ border: "1px solid rgba(30,42,58,0.08)" }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(30,42,58,0.55)" }}>Before</p>
                <h3 className="mt-3 text-[22px] font-semibold" style={{ color: C.charcoal }}>Filters + occasional cleaning</h3>
                <ul className="mt-5 space-y-3 text-[15px]" style={{ color: "rgba(30,42,58,0.72)" }}>
                  {[
                    "Air feels handled only when the purifier runs",
                    "Surfaces reset every time you clean, then drift",
                    "Fragrance sprays mask, not resolve",
                    "Manual effort every few days",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <X className="mt-0.5 h-4.5 w-4.5 shrink-0" style={{ color: "rgba(30,42,58,0.35)" }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] p-8" style={{ background: C.mint, border: `1px solid ${C.sage}` }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.green }}>With EnviroBiotics</p>
                <h3 className="mt-3 text-[22px] font-semibold" style={{ color: C.charcoal }}>Continuous environmental layer</h3>
                <ul className="mt-5 space-y-3 text-[15px]" style={{ color: "rgba(30,42,58,0.85)" }}>
                  {[
                    "Air and surfaces supported around the clock",
                    "Your cleaning routine lasts longer between resets",
                    "No masking scents — a neutral, fresher-feeling room",
                    "Setup once, then it disappears into the space",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4.5 w-4.5 shrink-0" strokeWidth={2.75} style={{ color: C.green }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GUARANTEE ============ */}
        <section className="py-20 sm:py-24" style={{ background: "#FFFFFF" }}>
          <div className="mx-auto max-w-[900px] px-5 text-center sm:px-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ background: C.mint, color: C.green }}>
                30-day promise
              </div>
              <h2 className="mt-5 font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", lineHeight: 1.05, color: C.charcoal }}>
                Try the Wellness Reset for 30 days.
              </h2>
              <p className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.65]" style={{ color: "rgba(30,42,58,0.72)" }}>
                If your rooms don&apos;t feel cleaner, fresher, and more supportive of the
                routine you already run — send it back for a full refund within 30 days.
              </p>
              <div className="mt-8">
                <PrimaryCTA
                  href={URLS.bundle}
                  onClick={() => trackEvent("click_wellness_guarantee")}
                >
                  Start My 30-Day Wellness Reset
                </PrimaryCTA>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="py-20 sm:py-28" style={{ background: C.warm }}>
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
            <div className="lg:col-span-4">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.green }}>
                Support
              </p>
              <h2 className="font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", lineHeight: 1.05, color: C.charcoal }}>
                Wellness questions, answered.
              </h2>
            </div>
            <div className="lg:col-span-8">
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
                  <AccordionItem key={idx} value={`q${idx}`} className="border-b" style={{ borderColor: "rgba(30,42,58,0.1)" }}>
                    <AccordionTrigger className="py-6 text-left text-[16.5px] font-semibold hover:no-underline sm:text-[18px]" style={{ color: C.charcoal }}>
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[15.5px] leading-[1.65]" style={{ color: "rgba(30,42,58,0.72)" }}>
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="py-20 sm:py-28" style={{ background: C.green, color: "#fff" }}>
          <div className="mx-auto max-w-[1000px] px-5 text-center sm:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: C.sage }}>
              Complete the routine
            </p>
            <h2 className="mt-4 font-semibold tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4.6vw, 3.4rem)", lineHeight: 1.05 }}>
              The layer of wellness the rest of your routine has been waiting for.
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.82)" }}>
              Set it up in about a minute. Let the air and surfaces of your main
              living area and bedroom carry the same intention as the rest of your day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCTA
                href={URLS.bundle}
                onClick={() => trackEvent("click_wellness_final")}
              >
                Complete My Wellness Routine
              </PrimaryCTA>
              <a
                href="#how"
                onClick={(e) => scrollTo(e, "how", "click_wellness_final_secondary")}
                className="inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all hover:-translate-y-0.5"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
              >
                See How It Works
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ============ MOBILE STICKY CTA ============ */}
      <div className="md:hidden h-[72px]" aria-hidden="true" />
      {showSticky && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t md:hidden"
          style={{ background: "rgba(255,255,255,0.96)", borderColor: "rgba(30,42,58,0.1)", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.green }}>
                Wellness System
              </p>
              <p className="truncate text-[13px] font-semibold" style={{ color: C.charcoal }}>
                {PRICING.bundle.price} · 30-day guarantee
              </p>
            </div>
            <a
              href={URLS.bundle}
              onClick={() => trackEvent("click_wellness_sticky")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white"
              style={{ background: C.orange }}
            >
              <ShoppingBag className="h-4 w-4" />
              Complete Your Wellness Routine
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default WellnessLandingPage;
