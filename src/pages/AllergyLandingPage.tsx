import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import miniImg from "@/assets/shop/biologic-mini.png";
import bioticaImg from "@/assets/shop/biotica-800.png";
import bundleImg from "@/assets/shop/home-complete-bundle.avif";
import heroImgAsset from "@/assets/allergy-hero.avif.asset.json";
const heroImg = heroImgAsset.url;
import finalBgImg from "@/assets/edu-bedroom-allergens.jpg";

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

const PROMO = "ALLERGY";
const BIOTICA_URL = `${shopifyProductUrl("biotica-800", "allergy-landing")}?discount=${PROMO}`;
const MINI_URL = `${shopifyProductUrl("biologic-mini", "allergy-landing")}`;
const BUNDLE_URL = `${shopifyProductUrl("home-complete-bundle", "allergy-landing")}?discount=${PROMO}`;

const certifications: { label: string; image: string; caption: string }[] = [
  { label: "EPA Registered", image: epaAsset.url, caption: "Registered with the U.S. EPA." },
  { label: "FDA GRAS", image: fdaGrasAsset.url, caption: "Uses cultures on the FDA's GRAS list." },
  { label: "PTPA Winner", image: ptpaAsset.url, caption: "Parent Tested, Parent Approved." },
  { label: "Instituto de Salud Pública", image: ispAsset.url, caption: "Reviewed by Chile's public health institute." },
  { label: "Società Italiana di Medicina Ambientale", image: simaAsset.url, caption: "Recognized by the Italian Society of Environmental Medicine." },
  { label: "ISO 9001:2015", image: isoAsset.url, caption: "ISO 9001:2015 quality management." },
  { label: "AllergyUK", image: allergyAsset.url, caption: "Seal of approval from AllergyUK." },
  { label: "MADE SAFE®", image: madeSafeAsset.url, caption: "MADE SAFE® certified ingredients." },
  { label: "Sensitive Choice", image: sensitiveAsset.url, caption: "Approved by Sensitive Choice." },
  { label: "EcoCert", image: ecocertAsset.url, caption: "EcoCert environmental certification." },
];

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

const ITALIC_FONT: React.CSSProperties = {
  fontFamily: "'Instrument Serif', 'Playfair Display', serif",
  fontWeight: 400,
  letterSpacing: "-0.01em",
};

const PROOF_ROW = [
  "Treats air + surfaces",
  "No spraying or wiping",
  "Set-and-forget coverage",
  "Independently tested for safety",
];

const HOW_STEPS = [
  {
    step: "01",
    title: "Place it",
    copy: "Set up the device in the room you want to cover.",
  },
  {
    step: "02",
    title: "Activate it",
    copy: "The system releases environmental probiotics into the indoor environment.",
  },
  {
    step: "03",
    title: "Let it cover",
    copy: "They disperse through the room and settle on surfaces your purifier cannot treat.",
  },
];

const COMPARISON_ROWS: { a: string; b: string }[] = [
  { a: "Filters air that passes through the unit", b: "Disperses throughout the room" },
  { a: "Does not treat mattresses or furniture", b: "Helps cover mattresses, bedding, furniture, and surfaces" },
  { a: "Depends on airflow", b: "Works quietly in the background" },
  { a: "Focuses on airborne particles", b: "Supports air + surface coverage" },
  { a: "Requires filter changes", b: "Uses environmental probiotic refills" },
];

const PROOF_CARDS = [
  {
    title: "Independently tested",
    copy: "Tested by third-party laboratories for safety and indoor use.",
  },
  {
    title: "Air + surface coverage",
    copy: "Designed to move through the room and settle on surfaces air purifiers miss.",
  },
  {
    title: "Works with your purifier",
    copy: "Keep your HEPA purifier. Add the surface coverage it cannot provide.",
  },
  {
    title: "No chemical spraying",
    copy: "A set-and-forget environmental probiotic system with no wiping or daily routine.",
  },
];

const FAQS = [
  {
    q: "Does EnviroBiotics replace my air purifier?",
    a: "No. It is designed to work alongside your purifier. Your purifier filters the air. EnviroBiotics helps treat surfaces and spaces your purifier cannot reach.",
  },
  {
    q: "Can I use it in a bedroom?",
    a: "Yes. It is designed for indoor spaces such as bedrooms, nurseries, home offices, living rooms, and other occupied rooms when used as directed.",
  },
  {
    q: "Does it require spraying or wiping?",
    a: "No. The system is designed to work in the background with no daily spraying, wiping, or manual application.",
  },
  {
    q: "What surfaces does it help cover?",
    a: "It is designed to disperse through the room and settle on indoor surfaces such as mattresses, bedding, furniture, rugs, carpets, and other objects in the space.",
  },
  {
    q: "Is it safe for everyday use?",
    a: "The technology has been independently tested for safety and is designed for continuous indoor use when used as directed.",
  },
  {
    q: "How do I choose the right product?",
    a: "Choose BioLogic Mini for bedrooms and smaller rooms. Choose Biotica 800 for larger rooms and open spaces. [Add exact coverage] to help you choose confidently.",
  },
];

const AllergyLandingPage = () => {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string, eventName?: string) => {
    e.preventDefault();
    if (eventName) trackEvent(eventName);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title="Whole-Room Coverage for Your Home | EnviroBiotics"
        description="Air purifiers only treat the air. EnviroBiotics helps cover the surfaces your purifier cannot reach — mattresses, bedding, furniture, carpets, and other indoor surfaces."
        path="/allergy"
      />

      <Navbar />
      <main className="bg-background text-foreground pt-16 lg:pt-[124px]">
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden h-[100svh] min-h-[680px] sm:min-h-[760px]">
          <img
            src={heroImg}
            alt="Calm, naturally lit bedroom with crisp linens"
            className="absolute inset-0 h-full w-full object-cover object-center scale-105"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#f7f3ec]/85 via-[#f7f3ec]/30 to-[#f7f3ec]"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1120px] flex-col items-center justify-center px-6 text-center">
            <Reveal>
              <h1 className="font-display font-semibold text-foreground tracking-[-0.04em] text-[clamp(2.75rem,8.5vw,3.5rem)] leading-[1.02] sm:text-[clamp(3.75rem,7vw,5.5rem)] sm:leading-[1.0] lg:text-[clamp(4.5rem,5.5vw,6.5rem)]">
                Your air purifier
                <span className="block mt-1 sm:mt-2 italic" style={ITALIC_FONT}>
                  can&apos;t clean your mattress.
                </span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-6 max-w-[36rem] text-[1.05rem] font-normal leading-[1.55] text-foreground/70 sm:mt-8 sm:max-w-[42rem] sm:text-[1.2rem] sm:leading-[1.5]">
                Air purifiers filter what passes through them. But your bedding, furniture, carpets,
                and surfaces still collect what the air leaves behind. EnviroBiotics helps treat the
                whole room &mdash; air and surfaces.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-9 flex flex-col items-center gap-4 sm:mt-11 sm:flex-row">
                <a
                  href="#offer"
                  onClick={(e) => smoothScroll(e, "offer", "click_allergy_hero_primary")}
                >
                  <Button
                    size="lg"
                    className="h-[3.25rem] rounded-full bg-foreground px-9 text-[15px] font-medium tracking-[-0.01em] text-background hover:bg-foreground/90 sm:h-[3.5rem] sm:px-10 sm:text-[16px]"
                  >
                    Treat the Whole Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => smoothScroll(e, "how-it-works", "click_allergy_hero_secondary")}
                  className="text-[15px] font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline sm:text-[16px]"
                >
                  See How It Works
                </a>
              </div>
            </Reveal>
            <Reveal>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium text-foreground/60 sm:mt-10 sm:text-[13px]">
                {PROOF_ROW.map((item, i) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={2.5} />
                    <span>{item}</span>
                    {i < PROOF_ROW.length - 1 && (
                      <span className="ml-3 text-foreground/30">·</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ============ PROBLEM ============ */}
        <section className="bg-[#F5F3EE] py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[920px] px-6 text-center">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/60">
                The problem
              </p>
              <h2 className="font-display font-semibold leading-[1.05] tracking-[-0.035em] text-foreground text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem]">
                You did everything right.
                <span className="block italic font-normal text-foreground/70" style={ITALIC_FONT}>
                  The purifier still isn&apos;t enough.
                </span>
              </h2>
              <div className="mx-auto mt-8 max-w-[680px] space-y-5 text-[1.05rem] leading-[1.7] text-foreground/70 sm:text-[1.15rem]">
                <p>
                  You bought the purifier. You changed the filters. You vacuumed. You washed the
                  bedding.
                </p>
                <p>The problem is not your routine.</p>
                <p>
                  The problem is that most indoor solutions only treat part of the room. Air
                  purifiers clean the air that passes through the machine, but they do not treat
                  your mattress, bedding, furniture, carpets, or the surfaces you touch every day.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="#offer"
                  onClick={(e) => smoothScroll(e, "offer", "click_allergy_problem_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.25rem] rounded-full bg-foreground px-9 text-[15px] font-medium text-background hover:bg-foreground/90"
                  >
                    Stop Treating Half the Room
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ AIR + SURFACES / HOW IT WORKS ============ */}
        <section id="how-it-works" className="scroll-mt-24 bg-background py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-[1100px] px-6">
            <Reveal>
              <div className="text-center">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/60">
                  The shift
                </p>
                <h2 className="font-display font-semibold leading-[1.05] tracking-[-0.035em] text-foreground text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem]">
                  Clean air is only{" "}
                  <span className="italic font-normal text-foreground/70" style={ITALIC_FONT}>
                    half the room.
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-[680px] text-[1.05rem] leading-[1.65] text-foreground/70 sm:text-[1.2rem]">
                  Traditional air purifiers wait for airborne particles to pass through the unit.
                  EnviroBiotics works differently. It releases environmental probiotics into the
                  room so they can disperse through the space and settle on surfaces that filters
                  cannot reach.
                </p>
              </div>
            </Reveal>

            <ol className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-3 lg:gap-7">
              {HOW_STEPS.map((item) => (
                <Reveal key={item.step}>
                  <li className="h-full rounded-3xl bg-card p-8 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-10">
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
                </Reveal>
              ))}
            </ol>

            <p className="mt-10 text-center text-[15px] italic text-muted-foreground sm:text-[16px]">
              No spraying. No wiping. No daily routine.
            </p>
          </div>
        </section>

        {/* ============ COMPARISON ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Air purifier vs. EnviroBiotics
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  Two halves of one room.
                  <span className="block italic font-normal text-foreground/70" style={ITALIC_FONT}>
                    Your purifier only treats one.
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 overflow-hidden rounded-3xl bg-background ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)]">
                <div className="grid grid-cols-2 border-b border-border/60 bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:text-[12px]">
                  <div className="px-4 py-4 sm:px-6 sm:py-5">Air Purifier</div>
                  <div className="px-4 py-4 text-foreground sm:px-6 sm:py-5">EnviroBiotics</div>
                </div>
                {COMPARISON_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 text-[14px] leading-snug sm:text-[15px] ${
                      i % 2 === 1 ? "bg-[#FBF9F4]" : ""
                    }`}
                  >
                    <div className="px-4 py-4 text-muted-foreground sm:px-6 sm:py-5">{row.a}</div>
                    <div className="px-4 py-4 font-medium text-foreground sm:px-6 sm:py-5">
                      {row.b}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="#offer"
                  onClick={(e) => smoothScroll(e, "offer", "click_allergy_comparison_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.25rem] rounded-full bg-foreground px-9 text-[15px] font-medium text-background hover:bg-foreground/90"
                  >
                    Choose My Coverage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PROOF SECTION ============ */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/60">
                  Proof
                </p>
                <h2 className="font-display font-semibold tracking-[-0.025em] text-foreground text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
                  A new category needs{" "}
                  <span className="italic font-normal text-foreground/70" style={ITALIC_FONT}>
                    real proof.
                  </span>
                </h2>
                <p className="mt-5 text-[1.05rem] leading-[1.65] text-foreground/70 sm:text-[1.15rem]">
                  EnviroBiotics is not another air purifier. It uses environmental probiotic
                  technology designed to disperse through indoor spaces and reach surfaces
                  traditional filters cannot treat. Our technology has been independently tested for
                  safety and is designed for continuous indoor use when used as directed.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {PROOF_CARDS.map((c) => (
                <Reveal key={c.title}>
                  <div className="h-full rounded-3xl bg-card p-7 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground">
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                    <h3 className="mt-5 text-[1.05rem] font-semibold text-foreground sm:text-[1.125rem]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground sm:text-[15px]">
                      {c.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section className="bg-[#F5F3EE] py-20 sm:py-28">
          <div className="relative mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-16">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/60">
                  Verified
                </p>
                <h2
                  className="font-display font-semibold tracking-[-0.025em] text-foreground"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}
                >
                  Independently verified for safety
                </h2>
                <p className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.6] text-foreground/70 sm:text-[17px]">
                  Collected from nature, never modified and free of added chemicals. Reviewed and
                  recognized by the following organizations.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-7">
              {certifications.map((c) => (
                <div key={c.label} className="flex flex-col items-center">
                  <div
                    title={c.label}
                    className="group relative flex aspect-square w-full items-center justify-center rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow:
                        "0 1px 2px rgba(0,0,0,0.04), 0 24px 48px -28px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img
                      src={c.image}
                      alt={`${c.label} certification`}
                      loading="lazy"
                      className="max-h-[78%] max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-center text-[12px] leading-[1.45] text-foreground/65 sm:text-[12.5px]">
                    {c.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ OFFER INTRO ============ */}
        <section id="offer" className="scroll-mt-24 bg-background pt-20 sm:pt-28">
          <div className="mx-auto max-w-[920px] px-6 text-center">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/60">
                The offer
              </p>
              <h2 className="font-display font-semibold leading-[1.05] tracking-[-0.035em] text-foreground text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem]">
                Choose your{" "}
                <span className="italic font-normal text-foreground/70" style={ITALIC_FONT}>
                  whole-room coverage system.
                </span>
              </h2>
              <div className="mx-auto mt-6 max-w-[680px] space-y-4 text-[1.05rem] leading-[1.65] text-foreground/70 sm:text-[1.15rem]">
                <p>
                  You do not need another air purifier. You need to cover what your purifier cannot
                  reach.
                </p>
                <p className="text-[14.5px] text-foreground/60 sm:text-[15.5px]">
                  Every system is designed to work quietly in the background with no spraying, no
                  wiping, and no daily routine.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PRODUCTS ============ */}
        <section id="products" className="scroll-mt-24 bg-background py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Bedroom Coverage Kit (Mini) */}
              <Reveal>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-6">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={miniImg}
                        alt="BioLogic Mini bedroom coverage kit"
                        className="h-full w-full object-contain p-6 sm:p-10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-10">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Bedroom Coverage Kit · BioLogic Mini
                    </p>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                      Bedroom Coverage Kit
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                      Best for bedrooms, nurseries, home offices, and smaller indoor spaces.
                    </p>

                    <dl className="mt-6 grid grid-cols-1 gap-3 text-[14.5px] sm:text-[15px]">
                      {[
                        ["Best for", "Bedrooms & smaller rooms"],
                        ["Coverage area", "Up to 300 sq ft"],
                        ["What's included", "BioLogic Mini device + starter cartridge"],
                        ["Refill duration", "90 days"],
                        ["Guarantee", "30-day money-back"],
                        ["Shipping", "Free shipping on orders over $200"],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-start justify-between gap-4 border-b border-border/50 pb-2.5 last:border-0"
                        >
                          <dt className="font-medium text-foreground/70">{k}</dt>
                          <dd className="text-right font-medium text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl font-bold tracking-[-0.02em] text-foreground">
                          $98
                        </span>
                      </div>
                      <a
                        href={MINI_URL}
                        onClick={() => trackEvent("click_allergy_products_mini")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Protect My Bedroom
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        Free shipping · 30-day money-back
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Large Room Coverage Kit (Biotica 800) */}
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-2 ring-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                    Most popular
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-6">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bioticaImg}
                        alt="Biotica 800 large room coverage kit"
                        className="h-full w-full object-contain p-6 sm:p-10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-10">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Large Room Coverage Kit · Biotica 800
                    </p>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                      Large Room Coverage Kit
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                      Built for larger rooms, living areas, and open spaces that need broader
                      coverage.
                    </p>

                    <dl className="mt-6 grid grid-cols-1 gap-3 text-[14.5px] sm:text-[15px]">
                      {[
                        ["Best for", "Larger rooms & open spaces"],
                        ["Coverage area", "Up to 800 sq ft"],
                        ["What's included", "Biotica 800 device + starter cartridge"],
                        ["Refill duration", "90 days"],
                        ["Guarantee", "30-day money-back"],
                        ["Shipping", "Free shipping"],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-start justify-between gap-4 border-b border-border/50 pb-2.5 last:border-0"
                        >
                          <dt className="font-medium text-foreground/70">{k}</dt>
                          <dd className="text-right font-medium text-foreground">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-4xl font-bold tracking-[-0.02em] text-foreground">
                          $299
                        </span>
                      </div>
                      <a
                        href={BIOTICA_URL}
                        onClick={() => trackEvent("click_allergy_products_biotica")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Cover My Larger Room
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        Free shipping · 30-day money-back
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bundle (tertiary) */}
            <Reveal>
              <div className="mt-6 flex flex-col items-center gap-6 rounded-3xl bg-[#F5F3EE] p-6 sm:flex-row sm:p-8 lg:p-10">
                <div className="aspect-square w-32 flex-none overflow-hidden rounded-2xl bg-white sm:w-40">
                  <img
                    src={bundleImg}
                    alt="Home Bundle full-home coverage"
                    className="h-full w-full object-contain p-3"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                    Bedroom + living room · Save $100
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.6rem]">
                    Home Bundle
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                    Cover the bedroom and main living space from day one.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3 sm:items-end">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
                      $395
                    </span>
                    <span className="text-base text-muted-foreground line-through">$495</span>
                  </div>
                  <a
                    href={BUNDLE_URL}
                    onClick={() => trackEvent("click_allergy_products_bundle")}
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                  >
                    Get the Bundle
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TESTIMONIAL ============ */}
        <section className="bg-[#F4EFE6] py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[860px] px-5 text-center sm:px-10">
            <Reveal>
              <p className="font-display text-[1.4rem] font-medium leading-[1.45] text-foreground sm:text-[1.75rem] lg:text-[2rem]">
                &ldquo;I kept the HEPA running. Adding EnviroBiotics is what finally helped the room
                stay cleaner between cleanings.&rdquo;
              </p>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                Verified customer
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
                Questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full space-y-4 sm:mt-12">
              {FAQS.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`q${idx}`}
                  className="group rounded-2xl border border-border/60 bg-card px-6 transition-all hover:border-foreground/40 data-[state=open]:border-foreground data-[state=open]:bg-[#F5F3EE] data-[state=open]:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] sm:px-8"
                >
                  <AccordionTrigger className="cursor-pointer py-6 text-left text-[17px] font-semibold text-foreground hover:no-underline [&[data-state=open]]:text-foreground [&>svg]:transition-transform [&>svg]:text-foreground/60 [&[data-state=open]>svg]:text-foreground sm:py-7 sm:text-[18px]">
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
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32 lg:py-40">
          <img
            src={finalBgImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18] grayscale"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]"
          />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <h2 className="font-display font-semibold leading-[1.04] tracking-[-0.04em] text-white text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]">
                Stop treating
                <span className="block italic font-normal text-white/70" style={ITALIC_FONT}>
                  half the room.
                </span>
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-[1.65] text-white/65 sm:text-[1.2rem]">
                Your purifier helps clean the air. EnviroBiotics helps cover the surfaces it leaves
                behind &mdash; including your mattress, bedding, furniture, carpets, and more.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center">
                <a
                  href="#offer"
                  onClick={(e) => smoothScroll(e, "offer", "click_allergy_final_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-white px-10 text-[16px] font-medium tracking-[-0.01em] text-[#0a0a0a] hover:bg-white/90"
                  >
                    Start Whole-Room Coverage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <p className="mt-5 text-[13.5px] text-white/55 sm:text-[14.5px]">
                  Keep your purifier. Add the missing layer of surface coverage.
                </p>
              </div>
              <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-medium text-white/55 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  30-day guarantee
                </span>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  Free shipping
                </span>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  Independently tested
                </span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AllergyLandingPage;
