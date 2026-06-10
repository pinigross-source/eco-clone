import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  VolumeX,
  Leaf,
  Sparkles,
  Baby,
  PawPrint,
  User,
} from "lucide-react";
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
import heroImg from "@/assets/health-scandi-bedroom.jpg";
import beddingImg from "@/assets/difference-bedding.jpg";
import finalBgImg from "@/assets/edu-bedroom-allergens.jpg";
import allergyBadge from "@/assets/allergy-free-badge.png";

const PROMO = "ALLERGY";
const BIOTICA_URL = `${shopifyProductUrl("biotica-800", "allergy-landing")}?discount=${PROMO}`;
const MINI_URL = `${shopifyProductUrl("biologic-mini", "allergy-landing")}`;
const BUNDLE_URL = `${shopifyProductUrl("home-complete-bundle", "allergy-landing")}?discount=${PROMO}`;

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
        Your air purifier
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          can&apos;t clean your mattress.
        </span>
      </>
    ),
    sub: "A HEPA filter only catches allergens while they're airborne. But most of them live settled into your mattress, pillows, carpet, and couch, out of the filter's reach. EnviroBiotics works on those surfaces, breaking down the organic debris allergens come from, right where it collects.",
  },
  b: {
    headline: (
      <>
        Allergens don&apos;t float.
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          They settle into everything you touch.
        </span>
      </>
    ),
    sub: "Dust, pollen, dander, and dust-mite waste spend almost all their time settled on surfaces: the bedding, the rug, the upholstery, not in the air. EnviroBiotics works right there, breaking down the debris at the source.",
  },
  c: {
    headline: (
      <>
        Your purifier cleans the air.
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          The allergens live in the room.
        </span>
      </>
    ),
    sub: "A filter only treats the air passing through it. The allergen reservoir in your sheets, carpet, and couch sits untouched. EnviroBiotics treats the surfaces, where allergens actually settle and build up.",
  },
};

const AllergyLandingPage = () => {
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

  const trackCta = (where: string) => trackEvent(`click_allergy_${where}`);

  const [quizAnswer, setQuizAnswer] = useState<"baby" | "pets" | "me" | null>(null);

  return (
    <>
      <SEOHead
        title="Surface Allergen Control for Your Home | EnviroBiotics"
        description="Air purifiers only catch airborne particles. Most household allergens settle into your mattress, carpet, and couch, out of the filter's reach. EnviroBiotics works on those surfaces. Meet Biotica."
        path="/allergy"
      />

      <main className="bg-background text-foreground">
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden h-[92svh] min-h-[620px] sm:h-[760px] lg:h-[780px]">
          <img
            src={heroImg}
            alt="Calm, naturally lit bedroom with crisp linens"
            className="absolute inset-0 h-full w-full object-cover object-[70%_35%] sm:object-[68%_center] lg:object-[62%_center]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#f7f3ec]/90 via-[#f7f3ec]/45 to-transparent sm:bg-gradient-to-r sm:from-[#f7f3ec]/92 sm:via-[#f7f3ec]/45 sm:via-40% sm:to-transparent"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-center px-5 pb-8 pt-24 text-center sm:items-start sm:px-10 sm:pb-0 sm:pt-0 sm:text-left lg:px-16">
            <div className="mx-auto w-full max-w-[36rem] sm:mx-0 sm:max-w-[48rem]">
              <Reveal>
                <h1
                  className="font-display font-semibold tracking-[-0.035em] text-foreground text-[clamp(2.5rem,9vw,3rem)] leading-[1.02] sm:text-[clamp(3.25rem,6vw,4.5rem)] sm:leading-[1.02] lg:text-[clamp(4rem,5.2vw,5.5rem)] lg:leading-[1.0]"
                  style={{ textShadow: "0 2px 20px rgba(247,243,236,0.5), 0 1px 4px rgba(247,243,236,0.3)" }}
                >
                  {hero.headline}
                </h1>
              </Reveal>
              <Reveal>
                <p
                  className="mx-auto mt-7 max-w-[36rem] text-[1.15rem] font-normal leading-[1.6] text-foreground/80 sm:mx-0 sm:mt-9 sm:max-w-[38rem] sm:text-[1.25rem] sm:leading-[1.55] lg:text-[1.3rem]"
                  style={{ textShadow: "0 2px 16px rgba(247,243,236,0.5), 0 1px 3px rgba(247,243,236,0.3)" }}
                >
                  {hero.sub}
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
                  <a
                    href={BIOTICA_URL}
                    onClick={() => trackEvent("click_allergy_hero_cta")}
                    className="sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="h-[3.75rem] w-full rounded-full bg-foreground px-10 text-[16px] font-semibold tracking-[-0.01em] text-background shadow-[0_20px_50px_-14px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90 sm:h-[4rem] sm:w-auto sm:px-12 sm:text-[17px]"
                    >
                      Reach What Your Filter Can&apos;t
                      <ArrowRight className="ml-2.5 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <p className="mt-5 text-center text-[12.5px] font-medium leading-relaxed text-foreground/70 sm:mt-6 sm:text-left sm:text-[13px]">
                  Takes 60 seconds · Silent · Works while your purifier handles the air
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ PROBLEM / PAIN ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[880px] px-5 sm:px-10">
            <Reveal>
              <h2
                role="button"
                tabIndex={0}
                onClick={(e) => smoothScroll(e as unknown as React.MouseEvent<HTMLAnchorElement>, "products", "click_allergy_h2_pain")}
                className="cursor-pointer font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground transition-colors hover:text-foreground/80 sm:text-[2.6rem] lg:text-[3rem]"
              >
                You did everything right. The purifier still isn&apos;t enough.
              </h2>
              <div className="mt-7 space-y-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                <p>
                  You bought the HEPA. You run it every night. You wash the sheets, you dust, you
                  vacuum. And the dust keeps coming back like none of it happened.
                </p>
                <p>
                  Here&apos;s what no one selling you a filter mentions: allergens don&apos;t spend
                  their lives in the air. Dust-mite waste, pollen, pet dander, mold spores. They
                  settle, and they live in the soft surfaces of the room. The mattress. The pillows.
                  The carpet. The couch. A purifier can only catch the small fraction that happens to
                  be airborne at any moment. The reservoir, the part that keeps refilling the air,
                  sits in your surfaces, completely out of its reach.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ THE SHIFT ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="overflow-hidden rounded-3xl ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.22)]">
                  <img
                    src={beddingImg}
                    alt="Crisp bedding where dust and dander settle"
                    className="h-72 w-full object-cover sm:h-[460px]"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                    The shift
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.4rem] lg:text-[2.75rem]">
                    Treat the air <span className="italic font-serif font-normal">and</span> the surfaces.
                  </h2>
                  <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    EnviroBiotics settles good cultures onto the surfaces of the room, where they
                    quietly break down the organic debris that allergens come from, and keep
                    working between cleanings.
                  </p>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    It&apos;s not a filter and it&apos;s not a spray. It&apos;s the half of the room
                    your purifier was never built to handle, finally covered.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ COMPARISON TABLE ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Air purifier vs. EnviroBiotics
                </p>
                <h2
                  role="button"
                  tabIndex={0}
                  onClick={(e) => smoothScroll(e as unknown as React.MouseEvent<HTMLAnchorElement>, "products", "click_allergy_h2_compare")}
                  className="cursor-pointer font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground transition-colors hover:text-foreground/80 sm:text-[2.6rem] lg:text-[3rem]"
                >
                  Two halves of one room. You&apos;ve only been treating one.
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 overflow-hidden rounded-3xl bg-background ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)]">
                <div className="grid grid-cols-3 border-b border-border/60 bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:text-[12px]">
                  <div className="px-4 py-4 sm:px-6 sm:py-5"></div>
                  <div className="px-4 py-4 sm:px-6 sm:py-5">HEPA Air Purifier</div>
                  <div className="px-4 py-4 text-foreground sm:px-6 sm:py-5">EnviroBiotics</div>
                </div>
                {[
                  { label: "Treats", a: "Air passing through the unit", b: "The surfaces allergens settle into" },
                  { label: "Reaches mattress, carpet, couch?", a: "No", b: "Yes" },
                  { label: "Where allergens actually live", a: "Briefly, while airborne", b: "Settled in soft surfaces" },
                  { label: "Sound", a: "Loud at the speed that works", b: "Silent" },
                  { label: "Works between cleanings?", a: "Only while running", b: "Continuously" },
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
                    <div className="px-4 py-4 font-medium text-foreground sm:px-6 sm:py-5">{row.b}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[14px] italic text-muted-foreground sm:text-[15px]">
                Keep the purifier for the air. Add EnviroBiotics for everything the air settles onto.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ THE SCIENCE ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[820px] px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                The simplest way to explain it
              </p>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                You already know how this works, for your gut.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.15rem]">
                You&apos;ve heard of probiotics for your gut: good cultures that keep things in
                balance. EnviroBiotics is the same idea for the room. Good cultures settle onto your
                surfaces and break down the organic debris that dust mites feed on and that
                allergens cling to, quietly, continuously, the natural way. No harsh chemicals. No
                fragrance. Less of the buildup that keeps the room from ever feeling clean.
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
                  Set it once. Let it cover the room.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-7">
              {[
                {
                  step: "01",
                  title: "Place",
                  copy: "Put Biotica in the bedroom, the room where you spend a third of your life, and where the allergen reservoir is biggest.",
                },
                {
                  step: "02",
                  title: "Switch on",
                  copy: "It works silently in the background. No filter swaps, no spray, no fragrance.",
                },
                {
                  step: "03",
                  title: "Let it run",
                  copy: "It keeps breaking down allergen debris on your surfaces, between every cleaning.",
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
              <div className="mt-12 flex justify-center">
                <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_allergy_how_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Reach What Your Filter Can&apos;t
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ BUILT FOR THE ALLERGY-AWARE HOME ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <a
                href="#products"
                onClick={(e) => smoothScroll(e, "products", "click_allergy_h2_built")}
                className="block max-w-2xl cursor-pointer no-underline"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Built for the allergy-aware home
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground transition-colors hover:text-foreground/80 sm:text-[2.6rem] lg:text-[3rem]">
                  Covers what a filter can&apos;t.
                </h2>
              </a>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {[
                {
                  icon: ShieldCheck,
                  title: "Reaches the soft surfaces",
                  copy: "Mattress, pillows, carpet, upholstery, curtains, where allergens actually settle.",
                },
                {
                  icon: VolumeX,
                  title: "Bedroom-quiet",
                  copy: "Silent operation, so it can run overnight without the 62 dB fan.",
                },
                {
                  icon: Leaf,
                  title: "No chemicals, no fragrance",
                  copy: "Nothing added to the room. Just less of the debris that builds up in it.",
                },
                {
                  icon: Sparkles,
                  title: "Works with your purifier",
                  copy: "Air and surfaces, finally both covered. Keep the HEPA running.",
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title}>
                    <div className="h-full rounded-3xl bg-card p-7 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/10 text-foreground">
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </div>
                      <h3 className="mt-5 text-[1.05rem] font-semibold text-foreground sm:text-[1.125rem]">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground sm:text-[15px]">
                        {p.copy}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PRODUCTS ============ */}
        <section id="products" className="scroll-mt-24 bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Choose your setup
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3.25rem]">
                  Start with <span className="font-serif italic font-normal">Biotica.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
                  Biotica is sized for the bedroom or main living room, the rooms with the biggest
                  allergen reservoirs. Add a Mini for the second room, or size up with the bundle.
                </p>
              </div>
            </Reveal>

            {/* FEATURED: Biotica 800 */}
            <div className="mt-12 sm:mt-16">
              <Reveal>
                <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-2 ring-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-2">
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                    Recommended
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-6 lg:aspect-auto lg:min-h-[420px]">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bioticaImg}
                        alt="Biotica bedroom probiotic device"
                        className="h-full w-full object-contain p-6 sm:p-10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Biotica · For the bedroom / main room
                    </p>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                      Biotica
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                      Sits quietly in the room and keeps surfaces, fabrics, and air working in your
                      favor, between every cleaning.
                    </p>
                    <ul className="mt-5 flex flex-col gap-3">
                      {[
                        "Covers up to 800 sq ft, built for bedrooms and main rooms",
                        "Silent, runs overnight without the fan noise",
                        "No sprays, no chemicals, no fragrance",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="mb-1 flex items-baseline gap-3">
                        <span className="font-display text-4xl font-bold tracking-[-0.02em] text-foreground">
                          $299
                        </span>
                      </div>
                      <a
                        href={BIOTICA_URL}
                        onClick={() => trackEvent("click_allergy_products_biotica")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Reach What Your Filter Can&apos;t
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        Free shipping · 30-day money-back · Cancel anytime
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Upsell row: Bundle + Mini */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 lg:grid-cols-2 lg:gap-6">
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bundleImg}
                        alt="Home Bundle full-home coverage"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Bedroom + living room · Save $100
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Home Bundle
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Cover the two rooms with the biggest allergen reservoirs, your bedroom and
                      living room, from day one.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Full-home surface coverage",
                        "Bedroom + main living space",
                        "Best value per square foot",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
                          $395
                        </span>
                        <span className="text-base text-muted-foreground line-through">$495</span>
                        <span className="text-[0.78rem] font-bold text-foreground">Save $100</span>
                      </div>
                      <a
                        href={BUNDLE_URL}
                        onClick={() => trackEvent("click_allergy_products_bundle")}
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

              <Reveal>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={miniImg}
                        alt="The Mini small-room coverage"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <a
                      href={MINI_URL}
                      onClick={() => trackEvent("click_allergy_mini_title")}
                      className="block cursor-pointer no-underline"
                    >
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Small rooms & travel
                      </p>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors hover:text-foreground/80 sm:text-[1.75rem]">
                        The Mini
                      </h3>
                    </a>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Compact, portable surface coverage for a study, guest room, or hotel, wherever
                      you sleep.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Covers up to 300 sq ft",
                        "Whisper-quiet on the nightstand",
                        "Plug-and-go simplicity",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
                          $98
                        </span>
                      </div>
                      <a
                        href={MINI_URL}
                        onClick={() => trackEvent("click_allergy_products_mini")}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Add The Mini
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

        {/* ============ TRUST BADGE ============ */}
        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[920px] px-5 sm:px-10">
            <Reveal>
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
                <div className="flex flex-none items-center justify-center">
                  <img
                    src={allergyBadge}
                    alt="Allergy-aware home seal"
                    className="h-28 w-auto object-contain sm:h-36"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-display text-[1.15rem] font-medium leading-[1.55] text-foreground sm:text-[1.35rem]">
                    &ldquo;The furniture doesn&apos;t get that grey film between dustings anymore.
                    The room just stays cleaner.&rdquo;
                  </p>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Verified customer · Bedroom setup
                  </p>
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
                &ldquo;I kept the HEPA running. Adding Biotica is what finally stopped the dust from
                rebuilding on the dresser between cleanings.&rdquo;
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
              {[
                {
                  q: "Does this replace my air purifier?",
                  a: "No. They do opposite jobs. The purifier treats airborne particles; EnviroBiotics treats the surfaces those particles settle into. Run both.",
                },
                {
                  q: "What does it actually work on?",
                  a: "It breaks down the organic debris on your surfaces, the kind dust mites feed on and that dust, dander, and pollen collect in. It works continuously on soft, hard, and high-touch surfaces between cleanings.",
                },
                {
                  q: "Is it safe to have in the bedroom?",
                  a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list (Generally Recognized As Safe), the same kind of beneficial cultures found in yogurt. Fragrance-free, chemical-free, and independently tested for use in homes with kids and pets.",
                },
                {
                  q: "Is there anything to spray, refill, or replace?",
                  a: "No filters. No sprays. Biotica runs continuously on a single cartridge that lasts months at a time in a typical bedroom.",
                },
                {
                  q: "Will I hear it overnight?",
                  a: "Silent operation, designed to disappear into the background of a sleeping room. No fan noise.",
                },
                {
                  q: "What if I don't notice a difference?",
                  a: "Try it for 30 days. If your home doesn't stay cleaner between dustings, send it back for a full refund.",
                },
              ].map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`q${idx}`}
                  className="group rounded-2xl border border-border/60 bg-card px-6 transition-all hover:border-foreground/40 data-[state=open]:border-foreground/50 data-[state=open]:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] sm:px-8"
                >
                  <AccordionTrigger className="cursor-pointer py-6 text-left text-[17px] font-semibold text-foreground hover:no-underline sm:py-7 sm:text-[18px]">
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


        {/* ============ BLOG BRIDGE ============ */}
        <section className="bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-[820px] px-5 sm:px-10">
            <Reveal>
              <a
                href="/blog"
                onClick={() => trackCta("blog_bridge")}
                className="group flex flex-col gap-3 rounded-3xl border border-border/60 bg-card p-7 transition hover:border-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                    Read next
                  </p>
                  <h3 className="mt-2 font-display text-[1.25rem] font-semibold tracking-[-0.015em] text-foreground sm:text-[1.4rem]">
                    Where Household Allergens Actually Live (Hint: Not the Air)
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted-foreground sm:text-[15px]">
                    Why a HEPA purifier alone never clears the dust, and what the filter
                    can&apos;t reach.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[#F4EFE6] py-20 sm:py-28 lg:py-36">
          <img
            src={finalBgImg}
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
                Stop treating half the room.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1rem] font-medium leading-[1.7] text-foreground/85 sm:text-[1.15rem]">
                Your purifier handles the air. EnviroBiotics handles the surfaces allergens actually
                settle into, the mattress, the carpet, the couch, quietly, chemical-free, around
                the clock.
              </p>
              <div className="mt-10 flex justify-center">
                <a href="#quiz" onClick={(e) => smoothScroll(e, "quiz", "click_allergy_final_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Reach What Your Filter Can&apos;t
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
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
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                  Cancel anytime
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
            <p className="truncate text-sm font-semibold text-foreground">30-day guarantee</p>
            <p className="truncate text-xs text-muted-foreground">Silent · Chemical-free</p>
          </div>
          <a href="#quiz" onClick={(e) => smoothScroll(e, "quiz", "click_allergy_sticky_cta")}>
            <Button className="h-11 shrink-0 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Reach What Filter Can&apos;t
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default AllergyLandingPage;
