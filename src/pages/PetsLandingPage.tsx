import { useState, useEffect } from "react";
import { ArrowRight, X, Check } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImg from "@/assets/pets/hero-soft.jpg";
import bioticaProduct from "@/assets/biotica-800.png";
import miniProduct from "@/assets/biologic-mini-nobg-new.png";
import surfacesImg from "@/assets/pets/surfaces-soft.jpg";
import bundleAsset from "@/assets/bundle-product.webp.asset.json";
import testimonialDogOwner from "@/assets/testimonial-dog-owner.avif";

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

const PROMO = "PETS";
const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const BIOTICA_URL = withDiscount(shopifyProductUrl("biotica-800", "pets-landing"));
const MINI_URL = withDiscount(shopifyProductUrl("biologic-mini", "pets-landing"));
const BUNDLE_URL = withDiscount(shopifyUrl("/products/home-complete-bundle", "pets-landing"));

/* Dyson-inspired type stack: heavy, neutral, technical */
const DISPLAY = `"Helvetica Neue", "Inter", system-ui, -apple-system, sans-serif`;

const certifications = [
  { label: "EPA Registered", image: epaAsset.url },
  { label: "FDA GRAS", image: fdaGrasAsset.url },
  { label: "PTPA Winner", image: ptpaAsset.url },
  { label: "Instituto de Salud Pública", image: ispAsset.url },
  { label: "Società Italiana di Medicina Ambientale", image: simaAsset.url },
  { label: "ISO 9001:2015", image: isoAsset.url },
  { label: "AllergyUK", image: allergyAsset.url },
  { label: "MADE SAFE®", image: madeSafeAsset.url },
  { label: "Sensitive Choice", image: sensitiveAsset.url },
  { label: "EcoCert", image: ecocertAsset.url },
];

/* Reveal-on-scroll */
const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [visible, setVisible] = useState(true);
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
      { threshold: 0.12, rootMargin: "200px" },
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return (
    <div
      ref={setRef}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const PetsLandingPage = () => {
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
        title="Pet Dander & Odor Control for Your Home | EnviroBiotics"
        description="Engineered for homes with pets. EnviroBiotics breaks down dander and odor at the surface - in the couch, the rug, the bedding - where filters can't reach."
        path="/pets"
      />


      <main className="bg-white text-[#1A1A1A]" style={{ fontFamily: DISPLAY }}>
        {/* ============ HERO - soft pastel editorial ============ */}
        <section className="relative w-full overflow-hidden">
          <div
            className="absolute inset-0 -z-0"
            style={{
              background:
                "linear-gradient(to top right, #fff7f0 0%, #f8f7ff 50%, #f0f9ff 100%)",
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-28 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-32 lg:pt-32">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                <span>Pets</span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                <span>EnviroBiotics</span>
              </div>
              <h1
                className="font-bold tracking-tight text-neutral-900"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                  lineHeight: 0.92,
                }}
              >
                You're up against something you can't see.
              </h1>
              <div className="mt-8 space-y-6">
                <p className="text-[18px] font-semibold text-neutral-800">
                  Pet dander and odor are microscopic.
                </p>
                <p className="max-w-md text-[15.5px] leading-relaxed text-neutral-600">
                  You vacuum the hair and wash the covers, but the real problem settles deep into the couch, carpet, bedding, and other soft surfaces your pet loves. EnviroBiotics works at the source, breaking them down where they live.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#best-for-pets"
                  onClick={(e) => scrollTo(e, "best-for-pets", "click_pets_hero_cta")}
                  className="group inline-flex items-center rounded-full bg-neutral-900 px-8 py-4 text-[14px] font-medium text-white transition-all hover:bg-neutral-800"
                >
                  Shop pet solutions
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-neutral-500">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#10B981]" strokeWidth={3} />
                  100% pet-safe
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#10B981]" strokeWidth={3} />
                  Non-toxic probiotics
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#10B981]" strokeWidth={3} />
                  30-day guarantee
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[16/11] overflow-hidden rounded-[2.5rem] bg-neutral-100 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Golden retriever resting on a cream sofa in a sunlit pastel living room"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-indigo-100/40 blur-3xl" />
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full bg-orange-100/50 blur-3xl" />
            </div>
          </div>
        </section>


        {/* ============ BENEFIT STRIP ============ */}
        <section className="bg-white border-b border-black/5 py-12 sm:py-16">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {[
                "Reaches where vacuums can't",
                "Breaks down dander and odor",
                "No chemicals",
                "Safe around the people you love",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[15px] font-medium leading-[1.4] text-black/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ THE SIMPLEST WAY - probiotics explanation ============ */}
        <section className="bg-[#F4F6F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white px-8 py-16 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.08)] sm:px-12 sm:py-20 lg:px-20">
                {/* Decorative orbs */}
                <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl" />

                <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
                  {/* Headline */}
                  <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EB8B59]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#B4623A]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#EB8B59]" />
                      How it works
                    </div>
                    <h2
                      className="font-bold tracking-tight text-neutral-900"
                      style={{
                        fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                        lineHeight: 0.92,
                      }}
                    >
                      The simplest way to explain it.
                    </h2>
                  </div>

                  {/* Explanation */}
                  <div className="relative md:pl-8 md:border-l md:border-neutral-200">
                    <p className="text-[16.5px] leading-[1.65] text-neutral-600 sm:text-[18px]">
                      You've heard of probiotics for your gut - the beneficial microbes that keep things balanced and healthy.{" "}
                      <span className="font-semibold text-neutral-900">
                        EnviroBiotics brings that same idea to your home.
                      </span>
                    </p>
                    <p className="mt-5 text-[16.5px] leading-[1.65] text-neutral-600 sm:text-[18px]">
                      Beneficial probiotics settle onto surfaces and quietly break down the organic residue pets leave behind - dander and odor-causing compounds - <span className="text-[#B4623A] font-medium">continuously and naturally</span>.
                    </p>

                    <div className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white">
                        Bio
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Proven probiotic technology
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </section>

        {/* ============ MADE FOR HOMES WITH PETS - Biotica highlight ============ */}
        <section id="best-for-pets" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">
                    Best for pets
                  </p>
                  <h2
                    className="font-semibold tracking-[-0.03em] text-[#1A1A1A]"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.02 }}
                  >
                    Made for homes with pets
                  </h2>
                  <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.6] text-[#1A1A1A]/70 sm:text-[17.5px]">
                    The Biotica 800 covers up to 800 sq ft - living rooms, open-plan spaces, and anywhere your pet roams. It continuously releases beneficial probiotics that break down dander and odor woven into fabric surfaces, so your home stays fresher without sprays or fragrances.
                  </p>
                  <a
                    href={BIOTICA_URL}
                    onClick={() => trackEvent("click_pets_biotica_cta")}
                    className="group mt-8 inline-flex items-center rounded-full bg-neutral-900 px-8 py-4 text-[14px] font-medium text-white transition-all hover:bg-neutral-800"
                  >
                    Buy Biotica 800
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Reveal>
              </div>
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(122,90,71,0.25)]">
                  <img
                    src={bioticaProduct}
                    alt="Biotica 800 unit designed for homes with pets"
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PRODUCT LINEUP - Apple minimalist ============ */}
        <section id="products" className="scroll-mt-20 bg-[#f5f5f7] py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
            <div className="mb-14 text-center sm:mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86868b]">
                The lineup
              </p>
              <h2
                className="mt-3 font-semibold tracking-tight text-[#1d1d1f]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.02 }}
              >
                Pick the size of your home.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Biotica 800 */}
              <Reveal>
                <div className="group flex h-full flex-col items-center rounded-[32px] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] sm:p-10">
                  <div className="mb-10 flex w-full items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[280px]">
                      <img
                        src={bioticaProduct}
                        alt="Biotica 800"
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-center">
                    <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[24px]">
                      Biotica 800
                    </h3>
                    <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-[#86868b] sm:text-[16px]">
                      Living rooms & open-plan homes up to 800 sq ft
                    </p>
                    <div className="mt-4 text-[21px] font-medium text-[#1d1d1f]">
                      $299
                    </div>
                  </div>
                  <div className="mt-8 flex w-full flex-col items-center gap-3">
                    <a
                      href={BIOTICA_URL}
                      onClick={() => trackEvent("click_pets_card_biotica")}
                      className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-7 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ed]"
                    >
                      Buy
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* BioLogic Mini */}
              <Reveal>
                <div className="group flex h-full flex-col items-center rounded-[32px] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] sm:p-10">
                  <div className="mb-10 flex w-full items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[280px]">
                      <img
                        src={miniProduct}
                        alt="BioLogic Mini"
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-center">
                    <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[24px]">
                      BioLogic Mini
                    </h3>
                    <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-[#86868b] sm:text-[16px]">
                      Bedrooms, crates & the corner where your pet naps
                    </p>
                    <div className="mt-4 text-[21px] font-medium text-[#1d1d1f]">
                      $98
                    </div>
                  </div>
                  <div className="mt-8 flex w-full flex-col items-center gap-3">
                    <a
                      href={MINI_URL}
                      onClick={() => trackEvent("click_pets_card_mini")}
                      className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-7 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ed]"
                    >
                      Buy
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Home Bundle */}
              <Reveal>
                <div className="group flex h-full flex-col items-center rounded-[32px] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] sm:p-10">
                  <div className="mb-10 flex w-full items-center justify-center">
                    <div className="relative aspect-square w-full max-w-[280px]">
                      <img
                        src={bundleAsset.url}
                        alt="Home Bundle"
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-center">
                    <span className="mb-2 inline-block rounded-md bg-[#f5f5f7] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#bf4800]">
                      Best value
                    </span>
                    <h3 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f] sm:text-[24px]">
                      Home Bundle
                    </h3>
                    <p className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-[#86868b] sm:text-[16px]">
                      Biotica 800 + 2 BioLogic Mini · multi-pet homes
                    </p>
                    <div className="mt-4 text-[21px] font-medium text-[#1d1d1f]">
                      $395
                    </div>
                  </div>
                  <div className="mt-8 flex w-full flex-col items-center gap-3">
                    <a
                      href={BUNDLE_URL}
                      onClick={() => trackEvent("click_pets_card_bundle")}
                      className="inline-flex items-center justify-center rounded-full bg-[#0071e3] px-7 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0077ed]"
                    >
                      Buy
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ FEATURE STRIP - soft pastel editorial ============ */}
        <section className="relative w-full overflow-hidden bg-[#FBF3EC]">
          <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">
                  The problem
                </p>
                <h2
                  className="font-semibold tracking-[-0.03em] text-[#1A1A1A]"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.02 }}
                >
                  It&apos;s not the hair. It&apos;s what you can&apos;t see.
                </h2>
                <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.6] text-[#1A1A1A]/70 sm:text-[17.5px]">
                  The dander and odor that trigger allergies and lingering smell are microscopic -
                  woven into the couch, the rug, the bedding. Filters can&apos;t reach them. Sprays
                  just mask them.
                </p>
                <p className="mt-4 max-w-[58ch] text-[16px] font-medium leading-[1.6] text-[#1A1A1A] sm:text-[17.5px]">
                  EnviroBiotics works right where they live.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(122,90,71,0.25)]">
                <img
                  src={surfacesImg}
                  alt="Cat curled on a cream rug in a soft pastel sunlit room"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS - Dyson tech-spec rhythm ============ */}
        <section id="how" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">
                How it works
              </p>
              <h2
                className="max-w-[20ch] font-semibold tracking-[-0.025em] text-black"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05 }}
              >
                Set it once. It handles the rest.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-3">
              {[
              {
                step: "01",
                title: "Place it",
                copy: "Place it wherever your pet spends the most time.",
              },
              {
                step: "02",
                title: "Switch it on",
                copy: "It runs silently in the background. No fragrance, no upkeep.",
              },
              {
                step: "03",
                title: "Let it run",
                copy: "It breaks down dander and odor embedded in fabric - where your vacuum can't reach.",
              },
              ].map((item) => (
                <div key={item.step} className="bg-white p-8 sm:p-10">
                  <span className="text-[12px] font-semibold tracking-[0.24em] text-black/40">
                    {item.step}
                  </span>
                  <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-black sm:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-black/65">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CERTIFICATIONS ============ */}
        <section className="relative w-full overflow-hidden bg-white py-20 sm:py-28">
          <div className="relative mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center sm:mb-16">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">
                  Safety First
                </p>
                <h2
                  className="font-semibold tracking-[-0.025em] text-[#1A1A1A]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}
                >
                  Independently verified for safety
                </h2>
                <p className="mt-4 max-w-[58ch] text-[15.5px] leading-[1.6] text-[#1A1A1A]/70 sm:text-[17px]">
                  Collected from nature in its pure state, never modified and free of added chemicals. Our probiotics are safe for children, people with illnesses, pets, and the elderly.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-7">
              {certifications.map((c) => (
                <div
                  key={c.label}
                  title={c.label}
                  className="group relative flex aspect-square items-center justify-center rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 24px 48px -28px rgba(122,90,71,0.28)",
                  }}
                >
                  <img
                    src={c.image}
                    alt={`${c.label} certification`}
                    loading="lazy"
                    className="max-h-[78%] max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center lg:mt-16">
              <span className="text-[13px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Pure, beneficial probiotics from nature
              </span>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                <span>No chemicals</span>
                <span className="text-[#7A5A47]">·</span>
                <span>No gases</span>
                <span className="text-[#7A5A47]">·</span>
                <span>No artificial substances</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="bg-[#F4F5F6] py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2
                className="max-w-[18ch] font-semibold tracking-[-0.025em] text-black"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05 }}
              >
                Owners notice the difference.
              </h2>
            </Reveal>

            {/* Featured testimonial with photo */}
            <Reveal>
              <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.08)] sm:rounded-[2.5rem]">
                <div className="grid grid-cols-1 items-center lg:grid-cols-12">
                  <div className="relative aspect-[4/3] w-full overflow-hidden lg:col-span-5 lg:aspect-auto lg:h-full">
                    <img
                      src={testimonialDogOwner}
                      alt="Happy pet owner with their dog"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-16">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">
                      Pet owner
                    </p>
                    <blockquote className="text-[18px] font-medium leading-[1.5] tracking-[-0.005em] text-neutral-900 sm:text-[21px]">
                      &ldquo;Six months in. I sleep through the night now. My wife says the bedroom doesn&apos;t feel like our cats live there anymore.&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-[13px] font-bold text-white">
                        M
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-neutral-900">Jay NJ&nbsp;</p>
                        <p className="text-[12px] text-neutral-500">Verified buyer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {[
                {
                  q: "The couch stopped smelling like dog two weeks in.",
                  who: "Golden retriever home",
                },
                {
                  q: "My eyes stopped itching when I sit down. Litter corner feels lighter too.",
                  who: "Two cats",
                },
                {
                  q: "I stopped lighting candles before guests come over.",
                  who: "Three-dog household",
                },
              ].map((t) => (
                <figure
                  key={t.who}
                  className="flex h-full flex-col justify-between rounded-2xl bg-white p-7 sm:p-8"
                >
                  <blockquote className="text-[17px] font-medium leading-[1.45] tracking-[-0.005em] text-black sm:text-[18.5px]">
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/50">
                    {t.who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">
                  Support
                </p>
                <h2
                  className="font-semibold tracking-[-0.025em] text-black"
                  style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.8rem)", lineHeight: 1.05 }}
                >
                  Pet owner questions, answered.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "What about pet dander and allergies?",
                    a: "EnviroBiotics breaks down the dander that settles on your soft surfaces, so less of it builds up where you sit and sleep. It's not a medical treatment - if you have a clinical allergy, keep following your doctor's plan.",
                  },
                  {
                    q: "Is it safe around my pets and family?",
                    a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list - the same kind of beneficial cultures found in yogurt. Chemical-free and designed for homes with cats, dogs, and kids.",
                  },
                  {
                    q: "Will my house smell like fragrance or chemicals?",
                    a: "No. EnviroBiotics removes odor at the source rather than adding scent - the goal is a room that smells like nothing in particular.",
                  },
                  {
                    q: "Does it replace my air purifier or vacuum?",
                    a: "No - they do different jobs. Keep vacuuming the pet hair and running the purifier for airborne particles. EnviroBiotics handles the dander and odor that settle into the surfaces.",
                  },
                  {
                    q: "What if it doesn't work for us?",
                    a: "Try it for 30 days. If your place doesn't feel fresher and cleaner, send it back for a full refund. No questions.",
                  },
                ].map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`q${idx}`}
                    className="border-b border-black/10"
                  >
                    <AccordionTrigger className="py-6 text-left text-[16.5px] font-semibold tracking-tight text-black hover:no-underline sm:text-[18px]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-[15.5px] leading-[1.65] text-black/70 sm:text-[16.5px]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA - soft pastel outro ============ */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(to top right, #f0f9ff 0%, #f8f7ff 50%, #fff7f0 100%)",
          }}
        >
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
            <Reveal>
              <h2
                className="max-w-[20ch] font-semibold tracking-[-0.03em] text-[#1A1A1A]"
                style={{ fontSize: "clamp(2.2rem, 5.4vw, 4.4rem)", lineHeight: 1 }}
              >
                Give your pet the clean home they deserve.
              </h2>
              <p className="mt-7 max-w-[55ch] text-[16px] leading-[1.55] text-[#1A1A1A]/70 sm:text-[17.5px]">
                Bundle and save $100. Free shipping, 30-day guarantee - because your furry family deserves the best.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={BUNDLE_URL}
                  onClick={() => trackEvent("click_pets_final_cta")}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-8 py-4 text-[13px] font-semibold tracking-tight text-white transition-colors hover:bg-[#2A2A2A]"
                >
                  Shop pet solutions
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#1A1A1A] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      {showSticky && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white p-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] sm:hidden">
          <a
            href={BIOTICA_URL}
            onClick={() => trackEvent("click_pets_sticky_cta")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-[13px] font-semibold tracking-tight text-white"
          >
            Get the pet bundle - $299
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  );
};

export default PetsLandingPage;
