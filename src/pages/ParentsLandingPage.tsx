import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  X,
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
import heroAsset from "@/assets/parents-hero.avif.asset.json";
import nurseryImg from "@/assets/nursery-scandinavian-bright.jpg";
import ptpaBadge from "@/assets/ptpa-award.png";

const heroImg = heroAsset.url;

const PROMO = "PARENTS";
const MINI_URL = `${shopifyProductUrl("biologic-mini", "parents-landing")}`;
const BUNDLE_URL = `${shopifyProductUrl("home-complete-bundle", "parents-landing")}?discount=${PROMO}`;
const BIOTICA_URL = `${shopifyProductUrl("biotica-800", "parents-landing")}`;

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
        Clean air is great.
        <br />
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          But your baby lives
          <br />
          on the floor.
        </span>
      </>
    ),
    sub: "Air purifiers clean the air. EnviroBiotics works on the surfaces your baby touches - crib, playmat, floor. No sprays, no filters, no noise.",
  },
  b: {
    headline: (
      <>
        You can&apos;t wipe down the nursery every hour.
        <br />
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          So we made something that does it for you.
        </span>
      </>
    ),
    sub: "EnviroBiotics keeps working on the surfaces your baby lives on, long after the last wipe-down. No sprays, no filters, no noise.",
  },
  c: {
    headline: (
      <>
        It all ends up in their mouth eventually.
        <br />
        <span className="italic font-semibold block mt-2" style={ITALIC_FONT}>
          Start with cleaner surfaces.
        </span>
      </>
    ),
    sub: "Air purifiers handle the air. EnviroBiotics works on the floors, mats, and crib your baby actually touches. No sprays, no filters, no noise.",
  },
};


const ParentsLandingPage = () => {
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

  const trackCta = (where: string) => trackEvent(`click_parents_${where}`);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<"baby" | "pets" | "me" | null>(null);

  return (
    <>
      <SEOHead
        title="Nursery Surface & Air Care for Babies | EnviroBiotics"
        description="Air purifiers only clean the air. EnviroBiotics keeps the surfaces your baby lives on cleaner - crib, playmat, floor. No sprays, no filters, no noise. Meet The Mini."
        path="/parents"
      />

      <main className="parents-apple bg-background text-foreground">
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden h-[92svh] min-h-[620px] sm:h-[760px] lg:h-[780px]">
          <img
            src={heroImg}
            alt="Soft, warm nursery in morning light"
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
                <h1 className="font-display font-semibold tracking-[-0.035em] text-foreground text-[clamp(2.5rem,9vw,3rem)] leading-[1.02] sm:text-[clamp(3.25rem,6vw,4.5rem)] sm:leading-[1.02] lg:text-[clamp(4rem,5.2vw,5.5rem)] lg:leading-[1.0]" style={{ textShadow: '0 2px 20px rgba(247,243,236,0.5), 0 1px 4px rgba(247,243,236,0.3)' }}>
                  {hero.headline}
                </h1>
              </Reveal>
              <Reveal>
                <p className="mx-auto mt-7 max-w-[36rem] text-[1.25rem] font-normal leading-[1.6] text-foreground/80 sm:mx-0 sm:mt-9 sm:max-w-[38rem] sm:text-[1.35rem] sm:leading-[1.55] lg:text-[1.45rem]" style={{ textShadow: '0 2px 16px rgba(247,243,236,0.5), 0 1px 3px rgba(247,243,236,0.3)' }}>
                  {hero.sub}
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
                  <a
                    href="https://shop.envirobiotics.com/products/biologic-mini"
                    onClick={() => trackEvent("click_parents_hero_cta")}
                    className="sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="h-[3.75rem] w-full rounded-full bg-foreground px-10 text-[17px] font-semibold tracking-[-0.01em] text-background shadow-[0_20px_50px_-14px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90 sm:h-[4rem] sm:w-auto sm:px-12 sm:text-[18px]"
                    >
                      Secure My Baby&apos;s Space
                      <ArrowRight className="ml-2.5 h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <p className="mt-5 text-[12.5px] font-medium leading-relaxed text-foreground/70 sm:mt-6 sm:text-[13px]">
                  {"\n"}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ PROBLEM / PAIN ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[880px] px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                You clean everything. So why is it never enough?
              </h2>
              <div className="mt-7 space-y-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                <p>
                  You wash the sheets on hot. You wipe the rails. You run the purifier all night.
                  And still - the dust returns, settling on the crib, the carpet, the soft
                  spaces where your baby spends almost every hour of the day.
                </p>
                <p>
                  Here&apos;s what no one tells you: a purifier only treats the air passing
                  through it. It can&apos;t reach surfaces. And surfaces are where dust
                  and everyday buildup settles - exactly where your baby plays, sleeps,
                  and explores.
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
                    src={nurseryImg}
                    alt="Calm, naturally lit nursery"
                    className="h-72 w-full object-cover sm:h-[460px]"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                    The shift
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.4rem] lg:text-[2.75rem]">
                    {"\u00a0"}Stop only cleaning the air. Start cleaning the surfaces too.
                  </h2>
                  <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    EnviroBiotics works continuously on the surfaces in the room - quietly, in the
                    background, long after a wipe-down or a purifier cycle is done. EnviroBiotics
                    keeps the nursery cleaner between cleanings all by itself.
                  </p>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    No chemicals. No filters. No noise.
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
                  {"\n"}
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  The purifier handles air, EnviroBiotics handles surfaces. Your nursery needs both.
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 overflow-hidden rounded-3xl bg-background ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)]">
                <div className="grid grid-cols-3 border-b border-border/60 bg-card text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 sm:text-[12px]">
                  <div className="px-4 py-4 sm:px-6 sm:py-5"></div>
                  <div className="px-4 py-4 sm:px-6 sm:py-5">Air Purifier</div>
                  <div className="px-4 py-4 text-foreground sm:px-6 sm:py-5">EnviroBiotics</div>
                </div>
                {[
                  { label: "Works on", a: "Air passing through the unit", b: "The surfaces baby touches" },
                  { label: "Reaches crib, playmat, floor?", a: "No", b: "Yes" },
                  { label: "Sound", a: "Constant fan noise", b: "Silent" },
                  { label: "How long it works", a: "Only while running", b: "Continuously" },
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
                It&apos;s not one or the other. It&apos;s air and surfaces - the two halves of a
                clean nursery.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ THE SCIENCE, GENTLY ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[820px] px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                The simplest way to explain it
              </p>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                You already trust this idea.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.15rem]">
                You give your little one probiotics - the good cultures in yogurt that keep their
                gut balanced and healthy. EnviroBiotics works on the same simple idea, for the room:
                it settles a layer of beneficial cultures onto surfaces that keeps them cleaner and
                more balanced over time. The gentle, natural way. No harsh chemicals.
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
                  Set it once. Forget the rest.
                </h2>
              </div>
            </Reveal>

            <ol className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-3 lg:gap-7">
              {[
                {
                  step: "01",
                  title: "Place",
                  copy: "Place The Mini in the nursery - shelf, dresser, anywhere out of reach.",
                },
                {
                  step: "02",
                  title: "Switch on",
                  copy: "It works silently in the background. No spray, no fuss.",
                },
                {
                  step: "03",
                  title: "Let it run",
                  copy: "It keeps the room cleaner between cleanings, on its own.",
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
                <a
                  href="#products"
                  onClick={(e) => smoothScroll(e, "products", "click_parents_how_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Secure My Baby&apos;s Space
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MADE WITH NURSERY IN MIND ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  {"\n"}
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  Made with the nursery in mind.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {[
                {
                  icon: ShieldCheck,
                  title: "Out of reach, out of mind",
                  copy: "Compact enough to sit high on a shelf.",
                },
                {
                  icon: VolumeX,
                  title: "Nap-proof quiet",
                  copy: "Whisper-soft - designed to disappear into the background.",
                },
                {
                  icon: Leaf,
                  title: "No harsh chemicals",
                  copy: "Nothing to spray near where baby sleeps.",
                },
                {
                  icon: Sparkles,
                  title: "Set-and-forget",
                  copy: "Covers one room continuously. No filters, no refills to remember.",
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

        {/* ============ PRODUCTS - 3 OPTIONS ============ */}
        <section id="products" className="scroll-mt-24 bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Choose your setup
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3.25rem]">
                  Start with <span className="font-serif italic font-normal">The Mini.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
                  The Mini is what most parents start with for the nursery. Add a second for full-home coverage, or size up for open-plan spaces.
                </p>
              </div>
            </Reveal>

            {/* FEATURED: The Mini */}
            <div className="mt-12 sm:mt-16">
              <Reveal>
                <div className="relative grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-2 ring-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-2">
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-background">
                    Parents' pick
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-6 lg:aspect-auto lg:min-h-[420px]">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={miniImg}
                        alt="The Mini - nursery probiotic dispenser"
                        className="h-full w-full object-contain p-6 sm:p-10"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      The Mini · For the nursery
                    </p>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                      The Mini
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                      Sits quietly on a shelf and keeps surfaces, fabrics, and air in one room cleaner - between every wipe-down.
                    </p>
                    <ul className="mt-5 flex flex-col gap-3">
                      {[
                        "Covers up to 300 sq ft - perfect for a nursery",
                        "Whisper-quiet, nap-safe",
                        "No sprays, no filters, no chemicals",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="mb-1 flex items-baseline gap-3">
                        <span className="font-display text-4xl font-bold tracking-[-0.02em] text-foreground">$98</span>
                      </div>
                      <a
                        href={MINI_URL}
                        onClick={() => trackEvent("click_parents_products_mini")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Secure My Baby's Space
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

            {/* Upsell row: Bundle + Biotica 800 */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 lg:grid-cols-2 lg:gap-6">
              {/* Home Bundle */}
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bundleImg}
                        alt="Home Bundle - two devices"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                      Most parents get two · Save $100
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Home Bundle
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Two Minis - one for the nursery, one for the living room or your bedroom. Full-home coverage from day one.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Covers up to 600 sq ft across two rooms",
                        "Nursery + main living space",
                        "Best value per square foot",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$395</span>
                        <span className="text-base text-muted-foreground line-through">$495</span>
                        <span className="text-[0.78rem] font-bold text-foreground">Save $100</span>
                      </div>
                      <a
                        href="https://shop.envirobiotics.com/products/home-complete-bundle"
                        onClick={() => trackEvent("click_parents_products_bundle")}
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

              {/* Biotica 800 */}
              <Reveal>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.08]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bioticaImg}
                        alt="Biotica 800 - larger home coverage"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Open-plan homes
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Biotica 800
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      One high-coverage device for open layouts where baby plays, crawls, and naps across multiple zones.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      {[
                        "Covers up to 800 sq ft",
                        "Designed for open-plan layouts",
                        "Single-device simplicity",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.75} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$299</span>
                      </div>
                      <a
                        href="https://shop.envirobiotics.com/products/biotica-800"
                        onClick={() => trackEvent("click_parents_products_biotica")}
                        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Larger home? Get the 800
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

        {/* ============ PTPA TESTIMONIAL ============ */}

        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[920px] px-5 sm:px-10">
            <Reveal>
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
                <div className="flex flex-none items-center justify-center">
                  <img
                    src={ptpaBadge}
                    alt="Parent Tested Parent Approved seal"
                    className="h-28 w-auto object-contain sm:h-36"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-display text-[1.15rem] font-medium leading-[1.55] text-foreground sm:text-[1.35rem]">
                    &ldquo;As a mom, I love that I can create a healthier home for my
                    family without worrying about harsh chemicals. EnviroBiotics gives
                    me peace of mind.&rdquo;
                  </p>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    PTPA Winner &mdash; Parent Tested Parent Approved
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
                &ldquo;The room just stopped feeling stuffy, and I stopped reaching for the spray
                bottle every morning.&rdquo;
              </p>
              <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                Mom of an 8-month-old
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
                Parent questions, answered.
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full space-y-4 sm:mt-12">
              {[
                {
                  q: "Is it safe around babies?",
                  a: "Yes. EnviroBiotics uses probiotics from the FDA's GRAS list (Generally Recognized As Safe) - the same kind of beneficial cultures found in yogurt and on healthy skin. It's chemical-free and independently tested for use in homes with babies and pets. See our safety page for full certifications and testing.",
                },
                {
                  q: "Do I have to get rid of my air purifier?",
                  a: "No. They do different jobs - the purifier handles air, EnviroBiotics handles surfaces. Most parents run both.",
                },
                {
                  q: "Is there anything to spray, refill, or replace?",
                  a: "No sprays. No filters. The Mini runs continuously on a single cartridge that lasts months at a time in a typical nursery.",
                },
                {
                  q: "Will I hear it during naps?",
                  a: "Whisper-quiet - designed to disappear into the background of a sleeping room.",
                },
                {
                  q: "What if it's not for us?",
                  a: "Try it for 30 nights. If your nursery doesn't feel calmer, send it back for a full refund. No questions.",
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
                    5 Hidden Toxins in Your Nursery
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted-foreground sm:text-[15px]">
                    The everyday sources of dust, VOCs, and buildup most parents miss.
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
            src={heroImg}
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
                Give the nursery the other half of clean.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1rem] font-medium leading-[1.7] text-foreground/85 sm:text-[1.15rem]">
                Air handled. Now handle the surfaces your baby touches - quietly, with
                nothing to spray and nothing to remember.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  href="#products"
                  onClick={(e) => smoothScroll(e, "products", "click_parents_final_cta")}
                >
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Secure My Baby&apos;s Space
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
              <p className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-medium text-foreground/70 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                  30-night guarantee
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
            <p className="truncate text-sm font-semibold text-foreground">30-night guarantee</p>
            <p className="truncate text-xs text-muted-foreground">Quiet · Chemical-free</p>
          </div>
          <a
            href="#products"
            onClick={(e) => smoothScroll(e, "products", "click_parents_sticky_cta")}
          >
            <Button className="h-11 shrink-0 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Secure My Baby&apos;s Space
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default ParentsLandingPage;
