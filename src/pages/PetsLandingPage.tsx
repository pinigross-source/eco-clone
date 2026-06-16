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

const PROMO = "PETS";
const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const BIOTICA_URL = withDiscount(shopifyProductUrl("biotica-800", "pets-landing"));
const MINI_URL = withDiscount(shopifyProductUrl("biologic-mini", "pets-landing"));
const BUNDLE_URL = withDiscount(shopifyUrl("/products/home-complete-bundle", "pets-landing"));

/* Dyson-inspired type stack: heavy, neutral, technical */
const DISPLAY = `"Helvetica Neue", "Inter", system-ui, -apple-system, sans-serif`;

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
        description="Engineered for homes with pets. EnviroBiotics breaks down dander and odor at the surface — in the couch, the rug, the bedding — where filters can't reach."
        path="/pets"
      />


      <main className="bg-white text-[#1A1A1A]" style={{ fontFamily: DISPLAY }}>
        {/* ============ HERO — soft pastel editorial ============ */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(120deg, #FDE7DA 0%, #F5E4F0 45%, #D8E8F4 100%)",
          }}
        >
          <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-10 px-5 pb-14 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:pb-24 lg:pt-32">
            <div className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A5A47]">
                Pets · EnviroBiotics
              </p>
              <h1
                className="max-w-[18ch] font-bold tracking-[-0.035em] text-[#1A1A1A]"
                style={{
                  fontSize: "clamp(2.4rem, 6.4vw, 5.6rem)",
                  lineHeight: 0.96,
                }}
              >
                Engineered for homes with pets.
              </h1>
              <p className="mt-7 max-w-[52ch] text-[15.5px] leading-[1.55] text-[#1A1A1A]/70 sm:text-[17px]">
                Vacuums get the hair. EnviroBiotics goes after the dander and odor woven into the
                couch, the rug, and the bedding — where filters can&apos;t reach.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={BUNDLE_URL}
                  onClick={() => trackEvent("click_pets_hero_cta")}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1A1A1A] px-7 py-4 text-[13px] font-semibold tracking-tight text-white transition-colors hover:bg-[#2A2A2A]"
                >
                  Shop pet solutions
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#1A1A1A] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
                <a
                  href="#how"
                  onClick={(e) => scrollTo(e, "how", "click_pets_hero_how")}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/20 bg-white/40 px-7 py-4 text-[13px] font-semibold tracking-tight text-[#1A1A1A] backdrop-blur transition-colors hover:bg-white/70"
                >
                  See how it stops dander
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#1A1A1A]/55">
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

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(122,90,71,0.35)]">
                <img
                  src={heroImg}
                  alt="Golden retriever resting on a cream sofa in a sunlit pastel living room"
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============ COMPARISON — Filter vs Surface ============ */}
        <section className="bg-[#F4F6F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#10B981]">
                Why not air purifiers?
              </p>
              <h2
                className="mx-auto max-w-[20ch] text-center font-semibold tracking-[-0.025em] text-black"
                style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)", lineHeight: 1.1 }}
              >
                Air purifiers stop at the filter.
                <br />
                We start at the surface.
              </h2>
              <p className="mx-auto mt-5 max-w-[58ch] text-center text-[15px] leading-[1.6] text-black/60 sm:text-[16.5px]">
                80% of infections move by touch — not through the air. Traditional purifiers only
                treat what floats past. EnviroBiotics treats everything.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-2xl bg-white p-7 shadow-[0_2px_18px_-6px_rgba(0,0,0,0.06)] sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-black/5 text-black/50">
                      <X className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <h3 className="text-[18px] font-semibold tracking-tight text-black">
                      Traditional Purifiers
                    </h3>
                  </div>
                  <ul className="mt-6 space-y-3.5 text-[14.5px] leading-[1.5] text-black/60">
                    {[
                      "Only filter air particles",
                      "Can't reach surfaces where 80% of germs live",
                      "Passive — waits for air to circulate",
                      "Creates a sterile, unnatural environment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-black/30" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="h-full rounded-2xl bg-white p-7 shadow-[0_2px_18px_-6px_rgba(16,185,129,0.18)] ring-1 ring-[#10B981]/30 sm:p-9">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#10B981] text-white">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <h3 className="text-[18px] font-semibold tracking-tight text-black">
                      EnviroBiotics
                    </h3>
                  </div>
                  <ul className="mt-6 space-y-3.5 text-[14.5px] leading-[1.5] text-black/75">
                    {[
                      "Treats air and every surface in your home",
                      "1-micron probiotics penetrate fabrics, keyboards, counters",
                      "Active — continuously disperses beneficial bacteria",
                      "Creates a balanced biome that strengthens your immune system",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ SECTION TITLE — Dyson-style 'Air treatment' header ============ */}
        <section className="bg-white pt-16 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2
                className="font-semibold tracking-[-0.025em] text-black"
                style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05 }}
              >
                Pet care.
              </h2>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.55] text-black/65 sm:text-[17.5px]">
                Shop the EnviroBiotics range for pet households — engineered to break down dander and
                odor where they settle, quietly, around the clock.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ PRODUCT TILES — Dyson grid ============ */}
        <section id="products" className="scroll-mt-20 bg-white pb-20 pt-10 sm:pb-28 sm:pt-14">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {/* Biotica 800 */}
              <Reveal>
                <a
                  href={BIOTICA_URL}
                  onClick={() => trackEvent("click_pets_card_biotica")}
                  className="group block h-full overflow-hidden rounded-2xl bg-[#EEF2F4] transition-colors hover:bg-[#E5EBEE]"
                >
                  <div className="relative aspect-[4/3.4] w-full overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(238,242,244,0) 70%)",
                      }}
                    />
                    <img
                      src={bioticaProduct}
                      alt="Biotica 800"
                      loading="lazy"
                      className="absolute inset-0 m-auto h-[78%] w-auto max-w-[78%] object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      Best for pets
                    </span>
                  </div>
                  <div className="flex items-end justify-between px-6 pb-7 pt-6 sm:px-7">
                    <div>
                      <h3 className="text-[19px] font-semibold tracking-tight text-black sm:text-[20px]">
                        Biotica 800
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-black/60">
                        Living rooms & open-plan homes up to 800 sq ft
                      </p>
                      <p className="mt-3 text-[15px] font-semibold text-black">
                        $299
                      </p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </Reveal>

              {/* BioLogic Mini */}
              <Reveal>
                <a
                  href={MINI_URL}
                  onClick={() => trackEvent("click_pets_card_mini")}
                  className="group block h-full overflow-hidden rounded-2xl bg-[#F1EEEA] transition-colors hover:bg-[#E9E5E0]"
                >
                  <div className="relative aspect-[4/3.4] w-full overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(241,238,234,0) 70%)",
                      }}
                    />
                    <img
                      src={miniProduct}
                      alt="BioLogic Mini"
                      loading="lazy"
                      className="absolute inset-0 m-auto h-[70%] w-auto max-w-[58%] object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-end justify-between px-6 pb-7 pt-6 sm:px-7">
                    <div>
                      <h3 className="text-[19px] font-semibold tracking-tight text-black sm:text-[20px]">
                        BioLogic Mini
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-black/60">
                        Bedrooms, crates & the corner where your pet naps
                      </p>
                      <p className="mt-3 text-[15px] font-semibold text-black">$98</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </Reveal>

              {/* Home Bundle */}
              <Reveal>
                <a
                  href={BUNDLE_URL}
                  onClick={() => trackEvent("click_pets_card_bundle")}
                  className="group block h-full overflow-hidden rounded-2xl bg-[#F0E6F2] transition-colors hover:bg-[#E7DBEB]"
                >
                  <div className="relative aspect-[4/3.4] w-full overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(240,230,242,0) 70%)",
                      }}
                    />
                    <img
                      src={bundleAsset.url}
                      alt="Home Complete Bundle — Biotica 800 with two BioLogic Mini units"
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-5 top-5 rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      Best value
                    </span>
                  </div>
                  <div className="flex items-end justify-between px-6 pb-7 pt-6 sm:px-7">
                    <div>
                      <h3 className="text-[19px] font-semibold tracking-tight text-[#1A1A1A] sm:text-[20px]">
                        Home Bundle
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-[#1A1A1A]/60">
                        Biotica 800 + BioLogic Mini · multi-pet homes
                      </p>
                      <p className="mt-3 text-[15px] font-semibold text-[#1A1A1A]">$395</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1A1A1A] text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ============ FEATURE STRIP — soft pastel editorial ============ */}
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
                  The dander and odor that trigger allergies and lingering smell are microscopic —
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

        {/* ============ HOW IT WORKS — Dyson tech-spec rhythm ============ */}
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
                  copy: "Set it where your pet spends time — living room, bedroom, the favorite spot.",
                },
                {
                  step: "02",
                  title: "Switch it on",
                  copy: "It runs silently in the background. No spray, no fragrance, no upkeep.",
                },
                {
                  step: "03",
                  title: "Let it run",
                  copy: "It keeps breaking down dander and odor at the source so surfaces stay cleaner.",
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
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
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
                    a: "EnviroBiotics breaks down the dander that settles on your soft surfaces, so less of it builds up where you sit and sleep. It's not a medical treatment — if you have a clinical allergy, keep following your doctor's plan.",
                  },
                  {
                    q: "Is it safe around my pets and family?",
                    a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list — the same kind of beneficial cultures found in yogurt. Chemical-free and designed for homes with cats, dogs, and kids.",
                  },
                  {
                    q: "Will my house smell like fragrance or chemicals?",
                    a: "No. EnviroBiotics removes odor at the source rather than adding scent — the goal is a room that smells like nothing in particular.",
                  },
                  {
                    q: "Does it replace my air purifier or vacuum?",
                    a: "No — different jobs. Keep vacuuming the hair and running the purifier for airborne particles. EnviroBiotics handles what settles into the surfaces.",
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

        {/* ============ FINAL CTA — soft pastel outro ============ */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            background:
              "linear-gradient(120deg, #D8E8F4 0%, #F5E4F0 50%, #FDE7DA 100%)",
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
                Bundle both units and save $100 with code PETS. Free shipping, 30-day guarantee — because your furry family deserves the best.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  onClick={(e) => scrollTo(e, "products", "click_pets_final_cta")}
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
            Get the pet bundle — $299
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  );
};

export default PetsLandingPage;
