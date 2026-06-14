import { useState, useEffect } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
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
      className={`transition-all duration-[800ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* Perfect Keto-inspired palette  pastel, bold-black, friendly */
const COLORS = {
  heroBg: "#D9ECF5",      // soft sky blue
  ticker: "#FBE9D2",      // peachy cream
  mint: "#CDEBC3",
  pink: "#F8D6D6",
  cream: "#F4ECDB",
  blue: "#C7E0F1",
  ink: "#111111",
};

const benefits = [
  "Cleaner Surfaces",
  "Less Pet Odor",
  "Breaks Down Dander",
  "Whisper Quiet",
  "Chemical Free",
  "Safe for Pets",
];

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
        description="Vacuuming gets the hair. EnviroBiotics gets what you can't see — breaking down pet dander and odor in the couch, carpet, and bedding where they settle."
        path="/pets"
      />

      {/* ============ PROMO BAR ============ */}
      <div
        className="w-full text-center text-[13px] sm:text-sm py-2.5 px-4"
        style={{ background: COLORS.heroBg, color: COLORS.ink }}
      >
        <span className="font-medium">Free U.S. Shipping on All Orders $75+</span>
        <a
          href="#products"
          onClick={(e) => scrollTo(e, "products", "click_pets_promobar")}
          className="ml-4 inline-flex items-center gap-1 rounded-full bg-black px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-black/90"
        >
          Shop Now
        </a>
      </div>

      <main className="bg-white text-[#111]">
        {/* ============ HERO ============ */}
        <section
          className="relative w-full overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${COLORS.heroBg} 0%, ${COLORS.heroBg} 70%, #EAF3F8 100%)`,
          }}
        >
          <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-5 pt-14 pb-10 sm:px-10 sm:pt-20 sm:pb-16 lg:grid-cols-2 lg:gap-12 lg:px-16 lg:pt-24 lg:pb-24">
            <div>
              <div className="mb-5 flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                  2K+ PET PARENTS
                </span>
              </div>

              <h1
                className="font-display font-extrabold tracking-[-0.035em] text-black"
                style={{
                  fontSize: "clamp(2.6rem, 6.8vw, 5.5rem)",
                  lineHeight: 0.96,
                }}
              >
                Your Pet&apos;s Home,
                <br />
                Made Fresh.
              </h1>

              <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-[1.55] text-black/75 sm:text-[1.15rem]">
                Powerful probiotics that break down pet dander and odor where they live - in the couch, the rug, and the pet bed. No sprays. No chemicals.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  onClick={(e) => scrollTo(e, "products", "click_pets_hero_cta")}
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a8753]"
                >
                  Shop Now
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#1a8753] text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
                <a
                  href="#how"
                  onClick={(e) => scrollTo(e, "how", "click_pets_hero_how")}
                  className="text-sm font-semibold underline decoration-2 underline-offset-[6px] hover:opacity-70"
                >
                  How it works
                </a>
              </div>
            </div>

            {/* Hero image cluster on yellow pedestal block, Perfect Keto-style */}
            <div className="relative">
              <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
                <img
                  src={heroImg}
                  alt="A calm pet at home with EnviroBiotics device nearby"
                  className="absolute inset-0 h-full w-full rounded-[28px] object-cover"
                  fetchPriority="high"
                  loading="eager"
                />
                {/* Pedestal block */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-b-3xl"
                  style={{ background: "#F2C84B" }}
                />
              </div>
            </div>
          </div>

          {/* ============ TICKER BAND ============ */}
          <div
            className="relative w-full overflow-hidden border-y border-black/5"
            style={{ background: COLORS.ticker }}
          >
            <div className="flex animate-[ticker_38s_linear_infinite] gap-12 whitespace-nowrap py-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-black sm:py-5 sm:text-[17px]">
              {[...benefits, ...benefits, ...benefits].map((b, i) => (
                <span key={i} className="flex items-center gap-12">
                  <Check className="h-4 w-4" strokeWidth={3} />
                  {b}
                </span>
              ))}
            </div>
            <style>{`
              @keyframes ticker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.333%); }
              }
            `}</style>
          </div>
        </section>

        {/* ============ SHOP BY CATEGORY ============ */}
        <section id="products" className="scroll-mt-24 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="text-center font-display text-[2.2rem] font-extrabold tracking-[-0.02em] text-black sm:text-[3rem] lg:text-[3.5rem]">
                Shop by Solution
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-center text-[15.5px] text-black/65 sm:text-base">
                Pick the device that fits your space. Use code{" "}
                <span className="font-bold text-black">PETS</span> for $70 off.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
              {/* Card: Biotica 800 */}
              <Reveal>
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-[28px]"
                  style={{ background: COLORS.mint }}
                >
                  <div className="px-7 pt-8 sm:px-8 sm:pt-10">
                    <h3 className="font-display text-[1.85rem] font-extrabold tracking-[-0.01em] text-black sm:text-[2.1rem]">
                      Biotica 800
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-snug text-black/75 sm:text-[15px]">
                      Best for living rooms & open-plan homes up to 800 sq ft. The pet parents&apos; pick.
                    </p>
                  </div>
                  <div className="relative mt-6 aspect-[5/4] w-full overflow-hidden">
                    <img
                      src={bioticaImg}
                      alt="Biotica 800 device"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-6 sm:px-8 sm:pb-10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-extrabold text-[#D92B2B]">$229</span>
                      <span className="font-display text-lg font-medium text-black/40 line-through">$299</span>
                    </div>
                    <a
                      href={BIOTICA_URL}
                      onClick={() => trackEvent("click_pets_card_biotica")}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1a8753]"
                    >
                      Shop Biotica
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>

              {/* Card: Bundle */}
              <Reveal>
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px]"
                  style={{ background: COLORS.pink }}
                >
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Best Value
                  </div>
                  <div className="px-7 pt-8 sm:px-8 sm:pt-10">
                    <h3 className="font-display text-[1.85rem] font-extrabold tracking-[-0.01em] text-black sm:text-[2.1rem]">
                      Home Bundle
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-snug text-black/75 sm:text-[15px]">
                      Biotica 800 + Mini. Living room + bedroom or pet zone. Multi-pet homes.
                    </p>
                  </div>
                  <div className="relative mt-6 aspect-[5/4] w-full overflow-hidden">
                    <img
                      src={bundleImg}
                      alt="Biotica 800 and BioLogic Mini"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-6 sm:px-8 sm:pb-10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-extrabold text-black">$395</span>
                    </div>
                    <a
                      href={BUNDLE_URL}
                      onClick={() => trackEvent("click_pets_card_bundle")}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1a8753]"
                    >
                      Shop Bundle
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>

              {/* Card: Mini */}
              <Reveal>
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-[28px]"
                  style={{ background: COLORS.blue }}
                >
                  <div className="px-7 pt-8 sm:px-8 sm:pt-10">
                    <h3 className="font-display text-[1.85rem] font-extrabold tracking-[-0.01em] text-black sm:text-[2.1rem]">
                      BioLogic Mini
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-snug text-black/75 sm:text-[15px]">
                      Compact, whisper-quiet. Bedrooms, crates, and the corner where your pet naps.
                    </p>
                  </div>
                  <div className="relative mt-6 aspect-[5/4] w-full overflow-hidden">
                    <img
                      src={miniImg}
                      alt="BioLogic Mini device"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-6 sm:px-8 sm:pb-10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-extrabold text-black">$98</span>
                    </div>
                    <a
                      href={MINI_URL}
                      onClick={() => trackEvent("click_pets_card_mini")}
                      className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#1a8753]"
                    >
                      Shop Mini
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ THE PROBLEM ============ */}
        <section className="py-16 sm:py-24" style={{ background: COLORS.cream }}>
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
            <Reveal>
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src={petBedImg}
                  alt="A pet curled on a clean modern couch"
                  className="h-72 w-full object-cover sm:h-[460px]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-black/60">
                The Real Problem
              </p>
              <h2 className="font-display text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-black sm:text-[2.6rem] lg:text-[3rem]">
                It&apos;s not the hair. It&apos;s what you can&apos;t see.
              </h2>
              <p className="mt-5 text-[16px] leading-[1.65] text-black/75 sm:text-[17px]">
                Vacuums grab the hair you can see. The dander and odor that actually trigger allergies and lingering smell are microscopic — woven deep into the couch, the rug, the bedding. Filters can&apos;t reach them. Sprays just mask them.
              </p>
              <p className="mt-4 text-[16px] font-semibold leading-[1.6] text-black sm:text-[17px]">
                EnviroBiotics works right where they live — quietly, around the clock.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="scroll-mt-24 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="text-center">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-black/60">
                  How it works
                </p>
                <h2 className="font-display text-[2rem] font-extrabold tracking-[-0.02em] text-black sm:text-[2.6rem] lg:text-[3rem]">
                  Set it once. It handles the rest.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-6">
              {[
                { step: "01", color: COLORS.mint, title: "Place it", copy: "Set it wherever your pet spends the most time — living room, bedroom, the favorite spot." },
                { step: "02", color: COLORS.pink, title: "Switch it on", copy: "It works silently in the background. No spray, no scent, no upkeep." },
                { step: "03", color: COLORS.blue, title: "Let it run", copy: "It keeps breaking down dander and odor at the source so surfaces stay cleaner on their own." },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-[28px] p-8 sm:p-10"
                  style={{ background: item.color }}
                >
                  <span className="font-display text-[2.5rem] font-extrabold leading-none text-black sm:text-[3rem]">
                    {item.step}
                  </span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-extrabold tracking-tight text-black sm:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.65] text-black/75">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="py-16 sm:py-24" style={{ background: COLORS.ticker }}>
          <div className="mx-auto max-w-[1180px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="text-center font-display text-[2rem] font-extrabold tracking-[-0.02em] text-black sm:text-[2.6rem] lg:text-[3rem]">
                Pet parents love it.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-6">
              {[
                { q: "The couch stopped smelling like dog two weeks in.", who: "Golden retriever home" },
                { q: "My eyes stopped itching when I sit down. Litter corner feels lighter too.", who: "Two cats" },
                { q: "I stopped lighting candles before guests come over.", who: "Three-dog household" },
              ].map((t) => (
                <figure key={t.who} className="rounded-[24px] bg-white p-6 sm:p-7">
                  <div className="mb-3 flex">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-black text-black" />
                    ))}
                  </div>
                  <blockquote className="font-display text-[16.5px] font-medium leading-[1.5] text-black sm:text-[17.5px]">
                    &ldquo;{t.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.2em] text-black/55">
                    {t.who}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[880px] px-5 sm:px-10">
            <Reveal>
              <h2 className="text-center font-display text-[2rem] font-extrabold tracking-[-0.02em] text-black sm:text-[2.6rem] lg:text-[3rem]">
                Pet owner questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full space-y-3 sm:mt-12">
              {[
                { q: "What about pet dander and allergies?", a: "EnviroBiotics breaks down the dander that settles on your soft surfaces, so less of it builds up where you sit and sleep. It's not a medical treatment — if you have a clinical allergy, keep following your doctor's plan." },
                { q: "Is it safe around my pets and family?", a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list — the same kind of beneficial cultures found in yogurt. Chemical-free and designed for homes with cats, dogs, and kids." },
                { q: "Will my house smell like fragrance or chemicals?", a: "No. EnviroBiotics removes odor at the source rather than adding scent — the goal is a room that smells like nothing in particular." },
                { q: "Does it replace my air purifier or vacuum?", a: "No — different jobs. Keep vacuuming the hair and running the purifier for airborne particles. EnviroBiotics handles what settles into the surfaces." },
                { q: "What if it doesn't work for us?", a: "Try it for 30 days. If your place doesn't feel fresher and cleaner, send it back for a full refund. No questions." },
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`q${idx}`}
                  className="rounded-2xl border-0 bg-[#F6F4EF] px-6 sm:px-8"
                  style={{ background: idx % 2 === 0 ? "#F6F4EF" : "#EEF6F1" }}
                >
                  <AccordionTrigger className="py-5 text-left text-[16px] font-bold text-black hover:no-underline sm:py-6 sm:text-[17px]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-[1.65] text-black/75 sm:text-[16px]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section
          className="py-20 sm:py-28"
          style={{ background: COLORS.heroBg }}
        >
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-10">
            <Reveal>
              <h2 className="font-display text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.02em] text-black sm:text-[3rem] lg:text-[3.5rem]">
                A fresher home for you and your pet.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.65] text-black/75 sm:text-[17px]">
                Keep the cuddles, the couch naps, the open-door chaos. Skip the candles, sprays, and the lingering smell.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3">
                <a
                  href="#products"
                  onClick={(e) => scrollTo(e, "products", "click_pets_final_cta")}
                  className="group inline-flex items-center gap-2 rounded-full bg-black px-10 py-5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a8753]"
                >
                  Shop Now
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1a8753] text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <span className="text-[12px] text-black/60">
                  Use code <span className="font-bold text-black">PETS</span> · Free shipping · 30-day guarantee
                </span>
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
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-[13px] font-bold uppercase tracking-wider text-white"
          >
            Shop Biotica · $229
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  );
};

export default PetsLandingPage;
