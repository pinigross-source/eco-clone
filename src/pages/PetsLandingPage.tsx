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
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import miniImg from "@/assets/shop/biologic-mini.png";
import bioticaImg from "@/assets/shop/biotica-800.png";
import bundleImg from "@/assets/shop/home-complete-bundle.avif";
import heroAsset from "@/assets/pets-lp-hero.avif.asset.json";
const heroImg = heroAsset.url;
import petBedImg from "@/assets/difference-petbed.jpg";
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

  const trackCta = (where: string) => trackEvent(`click_pets_${where}`);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<"baby" | "pets" | "me" | null>(null);

  return (
    <>
      <SEOHead
        title="Pet Dander & Odor Control for Your Home | EnviroBiotics"
        description="Vacuuming gets the hair. EnviroBiotics gets what you can't see - breaking down pet dander and odor in the couch, carpet, and bedding where they settle. No chemicals. Meet Biotica."
        path="/pets"
      />

      <main className="bg-background text-foreground">
        {/* ============ HERO ============ */}
        <section className="relative w-full overflow-hidden h-[92svh] min-h-[620px] sm:h-[760px] lg:h-[780px]">
          <img
            src={heroImg}
            alt="A calm dog and owner in a bright, airy Scandinavian living room"
            className="absolute inset-0 h-full w-full object-cover object-[60%_40%] sm:object-[58%_center] lg:object-[55%_center]"
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
                <h1 className="font-display font-bold tracking-[-0.035em] leading-[0.95] text-foreground">
                  <span className="block text-[clamp(2.25rem,8vw,2.75rem)] sm:text-[clamp(3rem,5.6vw,4.25rem)] lg:text-[clamp(3.75rem,4.8vw,5.25rem)]">
                    Your home should smell clean
                  </span>
                  <span className="block mt-2 text-heading-accent italic font-normal leading-[1] text-[clamp(2rem,7vw,2.5rem)] sm:text-[clamp(2.6rem,4.8vw,3.8rem)] lg:text-[clamp(3.25rem,4.2vw,4.5rem)]">
                    even with pets on the couch.
                  </span>
                </h1>
              </Reveal>
              <Reveal>
                <p
                  className="mx-auto mt-6 max-w-[34rem] text-[1.05rem] font-normal leading-[1.55] text-foreground/80 sm:mx-0 sm:mt-7 sm:max-w-[34rem] sm:text-[1.15rem] lg:text-[1.2rem]"
                  style={{ textShadow: "0 2px 16px rgba(247,243,236,0.5), 0 1px 3px rgba(247,243,236,0.3)" }}
                >
                  Pet odor isn&apos;t in the air. It&apos;s on your couch, rug, and pet bed. EnviroBiotics handles that layer — quietly, chemical-free.
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-7 flex flex-col items-stretch gap-3.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-5">
                  <a
                    href="#products"
                    onClick={(e) => smoothScroll(e, "products", "click_pets_hero_cta")}
                    className="sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="h-[3.5rem] w-full rounded-full bg-foreground px-9 text-[16px] font-semibold tracking-[-0.01em] text-background shadow-[0_20px_50px_-14px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90 sm:h-[3.75rem] sm:w-auto sm:px-11 sm:text-[17px]"
                    >
                      Get the Starter Kit — $299
                      <ArrowRight className="ml-2.5 h-5 w-5" />
                    </Button>
                  </a>
                  <p className="text-[12.5px] font-medium leading-tight text-foreground/70 sm:text-[13px]">
                    Free shipping · 30-day guarantee
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ EARLY OFFER + MECHANISM BAND ============ */}
        <section className="bg-foreground text-background py-10 sm:py-14">
          <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 px-5 sm:px-10 lg:px-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-background/70">
                The mechanism, in one line
              </p>
              <p className="mt-2 font-display text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-[1.85rem] lg:text-[2.15rem]">
                Pet odor isn&apos;t in the air. <span className="italic font-normal">It&apos;s on your surfaces.</span>
              </p>
              <p className="mt-2 text-[14px] leading-[1.6] text-background/75 sm:text-[15px]">
                Couch, rug, pet bed, curtains, bedroom corners — that&apos;s where dander and odor settle and rebuild between cleanings.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 lg:items-end">
              <a
                href="#products"
                onClick={(e) => smoothScroll(e, "products", "click_pets_band_cta")}
              >
                <Button
                  size="lg"
                  className="h-[3.25rem] rounded-full bg-background px-8 text-[15px] font-semibold text-foreground hover:bg-background/90 sm:text-[16px]"
                >
                  Get the Pet-Proof Home Starter Kit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <p className="text-[12px] text-background/70">From $299 · 30-day guarantee · Free shipping</p>
            </div>
          </div>
        </section>

        {/* ============ PROBLEM / PAIN ============ */}
        <section className="bg-[#F5F3EE] py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[880px] px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                You&apos;re not failing at cleaning
              </p>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                You&apos;re not failing at cleaning. You&apos;re solving the wrong layer of the problem.
              </h2>
              <div className="mt-7 space-y-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                <p>
                  You vacuum the couch. You wash the pet bed covers. You light a candle before guests come over. But two things your pet leaves behind never show up on a lint roller: dander and odor.
                </p>
                <p>
                  Both are microscopic. Both settle deep into the soft surfaces where your pet spends its days — the couch, the rug, the bedroom corner, the curtains, the spot near the litter box. Dander is the part that sets off allergies. Odor is the recurring smell that comes back two days after you cleaned. And neither one lives in the air where a purifier can catch it — they&apos;re pressed into the fabric, below the reach of a vacuum and out of range of a spray.
                </p>
                <p className="font-display text-[1.15rem] font-semibold text-foreground sm:text-[1.25rem]">
                  Pet odor isn&apos;t in the air. It&apos;s on your surfaces. That&apos;s the layer nothing in your routine is built for.
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
                    src={petBedImg}
                    alt="A pet curled on a clean modern couch"
                    className="h-72 w-full object-cover sm:h-[460px]"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                    The shift
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.4rem] lg:text-[2.75rem]">
                    Don&apos;t just clean the surface. Keep it clean.
                  </h2>
                  <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    EnviroBiotics settles good cultures onto your soft surfaces, where they quietly
                    break down the dander and odor-causing residue your pet leaves behind - and
                    keep working between cleanings.
                  </p>
                  <p className="mt-4 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.125rem]">
                    Not a scent layered on top. Not a once-and-done wipe. A surface that stays
                    cleaner on its own, long after the vacuum&apos;s put away.
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

        {/* ============ THE SCIENCE, GENTLY ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[820px] px-5 sm:px-10">
            <Reveal>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                The simplest way to explain it
              </p>
              <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                It works like the probiotics you already trust.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.15rem]">
                You&apos;ve heard of probiotics for your gut - the good cultures that keep things
                balanced and healthy. And you&apos;ve probably used an enzyme cleaner that breaks a
                mess down instead of covering it up. EnviroBiotics combines both ideas for your
                home: good cultures that settle onto surfaces and quietly break down the organic
                stuff pets leave behind - dander and odor residue - continuously, the natural way.
              </p>
              <p className="mt-4 text-[1.05rem] leading-[1.75] text-foreground/85 sm:text-[1.15rem]">
                No harsh chemicals. Just less of what you can&apos;t see.
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
              <div className="mt-12 flex justify-center">
                <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_how_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Get the Pet-Proof Home Starter Kit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MADE FOR PET HOMES ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  Biotica
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
                  Made for homes with pets.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
              {[
                {
                  icon: PawPrint,
                  title: "Reaches where vacuums can&apos;t",
                  copy: "Couch, rug, curtains, pet bed - the soft surfaces dander settles into.",
                },
                {
                  icon: Sparkles,
                  title: "Dander and odor, not just smell",
                  copy: "Breaks down the allergen too, instead of layering scent on top.",
                },
                {
                  icon: Leaf,
                  title: "No chemicals",
                  copy: "Removes what&apos;s there instead of covering it. The goal: a room that smells like nothing.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safe around the family",
                  copy: "Chemical-free around the pets and people you share the room with.",
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title}>
                    <div className="h-full rounded-3xl bg-card p-7 ring-1 ring-black/[0.05] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/10 text-foreground">
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </div>
                      <h3
                        className="mt-5 text-[1.05rem] font-semibold text-foreground sm:text-[1.125rem]"
                        dangerouslySetInnerHTML={{ __html: p.title }}
                      />
                      <p
                        className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground sm:text-[15px]"
                        dangerouslySetInnerHTML={{ __html: p.copy }}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PET OWNER PROBLEM STACK ============ */}
        <section className="bg-background py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1100px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  The pet owner problem stack
                </p>
                <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.4rem] lg:text-[2.85rem]">
                  You&apos;re already doing the work. <span className="font-serif italic font-normal">Here&apos;s what each step misses.</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]">
                  Pet allergens become airborne and stick to furniture, bedding, and fabrics. Most pet-home routines only cover part of the picture.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:mt-14">
                {/* Header row - desktop */}
                <div className="hidden grid-cols-3 gap-0 border-b border-border/60 bg-[#F4EFE6] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70 sm:grid sm:px-8">
                  <div>What pet owners try</div>
                  <div>Why it&apos;s not enough</div>
                  <div>What EnviroBiotics adds</div>
                </div>
                {[
                  { try: "Vacuuming", gap: "Removes visible hair", adds: "Helps address what settles deeper into surfaces" },
                  { try: "Candles / sprays", gap: "Covers odor", adds: "Works without fragrance" },
                  { try: "Air purifier", gap: "Helps airborne particles", adds: "Adds surface-level support" },
                  { try: "Washing covers", gap: "Helps temporarily", adds: "Keeps working between cleanings" },
                ].map((row, i) => (
                  <div
                    key={row.try}
                    className={`grid grid-cols-1 gap-3 px-6 py-5 sm:grid-cols-3 sm:gap-6 sm:px-8 sm:py-6 ${
                      i !== 3 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60 sm:hidden">
                        What you try
                      </p>
                      <p className="font-display text-[1.05rem] font-semibold text-foreground sm:text-[1.125rem]">
                        {row.try}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60 sm:hidden">
                        Why it&apos;s not enough
                      </p>
                      <p className="text-[14.5px] leading-[1.6] text-muted-foreground sm:text-[15px]">
                        {row.gap}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/60 sm:hidden">
                        What EnviroBiotics adds
                      </p>
                      <p className="text-[14.5px] leading-[1.6] text-foreground sm:text-[15px]">
                        {row.adds}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PROOF BEFORE OFFER ============ */}
        <section className="bg-background pt-14 pb-6 sm:pt-20 sm:pb-10">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {[
                { q: "The couch stopped smelling like dog two weeks in. Guests notice — I notice.", who: "Golden retriever home" },
                { q: "My eyes used to itch the second I sat down. Not anymore — and the litter-box corner feels lighter too.", who: "Two cats, one bedroom" },
                { q: "I stopped lighting candles before people come over. The room just smells like nothing.", who: "Three-dog household" },
              ].map((t) => (
                <Reveal key={t.who}>
                  <figure className="flex h-full flex-col justify-between rounded-3xl bg-card p-6 ring-1 ring-black/[0.06] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] sm:p-7">
                    <blockquote className="font-display text-[1.05rem] font-medium leading-[1.5] text-foreground sm:text-[1.125rem]">
                      &ldquo;{t.q}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/70">
                      {t.who}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
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
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={bundleImg}
                        alt="Home Bundle - multi-room coverage"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
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
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6] p-4 sm:p-5">
                    <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                      <img
                        src={miniImg}
                        alt="BioLogic Mini - compact device for bedrooms and pet zones"
                        className="h-full w-full object-contain p-4 sm:p-6"
                        loading="lazy"
                      />
                    </div>
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
              <div className="mt-10 flex justify-center">
                <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_final_cta")}>
                  <Button
                    size="lg"
                    className="h-[3.5rem] rounded-full bg-foreground px-10 text-[16px] font-semibold text-background shadow-[0_18px_40px_-12px_hsl(var(--foreground)/0.6)] hover:bg-foreground/90"
                  >
                    Get the Pet-Proof Home Starter Kit
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
            <p className="truncate text-xs text-muted-foreground">Pet-safe</p>
          </div>
          <a href="#products" onClick={(e) => smoothScroll(e, "products", "click_pets_sticky_cta")}>
            <Button className="h-11 shrink-0 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Get the Starter Kit
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default PetsLandingPage;
