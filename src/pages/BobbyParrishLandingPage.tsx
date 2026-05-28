import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, ShieldCheck, Sparkles, Clock } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import miniImg from "@/assets/shop/biologic-mini.png";
import bioticaImg from "@/assets/shop/biotica-800.png";
import bundleImg from "@/assets/shop/home-complete-bundle.avif";
import heroImg from "@/assets/bobby/bobby-hero-bright.avif";
import heroImgMobile from "@/assets/bobby/bobby-hero-mobile-bright.avif";
import ctaBgImg from "@/assets/bobby/bobby-cta-bg.jpg";
import livingImg from "@/assets/bobby/bobby-ambient.jpg";
import familyImg from "@/assets/bobby/bobby-ambient.jpg";
import bobbyImg from "@/assets/bobby/bobby-portrait.jpg";
import particlesImg from "@/assets/bobby/bobby-kitchen.jpg";
import bathroomImg from "@/assets/bobby/bobby-bedroom.jpg";
import travelImg from "@/assets/bobby-travel.avif";

const withDiscount = (url: string, code = "Bobby") =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const LINKS = {
  biotica: withDiscount("https://shop.envirobiotics.com/products/biotica-800-bobby"),
  bundle: withDiscount("https://shop.envirobiotics.com/products/home-complete-bundle"),
  mini: withDiscount("https://shop.envirobiotics.com/products/biologic-mini-bobby"),
};

/* Smooth scroll to in-page anchor that re-aligns after layout shifts
   (Reveal animations + lazy images can throw off the first click on mobile). */
const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, hash: string, eventName?: string) => {
  e.preventDefault();
  if (eventName) trackEvent(eventName);
  const target = document.getElementById(hash);
  if (!target) return;
  const scroll = () => target.scrollIntoView({ behavior: "smooth", block: "start" });
  scroll();
  // Re-align after images/animations settle so the first tap lands correctly.
  window.setTimeout(scroll, 350);
  window.setTimeout(scroll, 800);
};

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

type ProductCardProps = {
  name: string;
  tagline: string;
  description?: string;
  price: string;
  oldPrice?: string;
  features: string[];
  image: string;
  href: string;
  highlight?: boolean;
  ctaText: string;
  offerNote?: string;
  onClick: () => void;
};

const ProductCard = ({
  name,
  tagline,
  description,
  price,
  oldPrice,
  features,
  image,
  href,
  highlight,
  ctaText,
  offerNote,
  onClick,
}: ProductCardProps) => (
  <div
    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card transition-transform duration-500 hover:-translate-y-1 ${
      highlight
        ? "ring-2 ring-primary shadow-[0_50px_120px_-40px_hsl(var(--primary)/0.35)]"
        : "ring-1 ring-black/[0.06] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
    }`}
  >
    {highlight && (
      <div className="absolute right-5 top-5 z-10 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
        Most Popular
      </div>
    )}
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))]">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="flex flex-1 flex-col gap-5 p-7 sm:p-8">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {tagline}
        </p>
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
          {name}
        </h3>
        {description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]"
          >
            <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border/60 pt-5">
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">
            {price}
          </span>
          {oldPrice && (
            <span className="text-base text-muted-foreground line-through">{oldPrice}</span>
          )}
        </div>
        {offerNote && <p className="mb-4 text-xs font-semibold text-primary">{offerNote}</p>}
        <a
          href={href}
          onClick={onClick}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors ${
            highlight
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">30-day risk-free trial</p>
      </div>
    </div>
  </div>
);

const BobbyParrishLandingPage = () => {
  // Email-capture modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailModalDismissed, setEmailModalDismissed] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("bobby_email_modal_dismissed") === "1") {
      setEmailModalDismissed(true);
      return;
    }

    const open = () => {
      setShowEmailModal((s) => {
        if (!s) trackEvent("bobby_email_modal_open");
        return true;
      });
    };

    const timer = window.setTimeout(open, 15000);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) open();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const dismissEmailModal = () => {
    setShowEmailModal(false);
    setEmailModalDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bobby_email_modal_dismissed", "1");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue || !/^\S+@\S+\.\S+$/.test(emailValue)) return;
    trackEvent("bobby_email_modal_submit");
    setEmailSubmitted(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bobby_email_modal_dismissed", "1");
    }
    window.setTimeout(() => {
      setShowEmailModal(false);
      setEmailModalDismissed(true);
    }, 2000);
  };

  const trackBiotica = () => trackEvent("click_bobby_biotica");
  const trackBundle = () => trackEvent("click_bobby_bundle");


  return (
    <>
      <SEOHead
        title="EnviroBiotics Bobby Offer - Save 15% with Code Bobby"
        description="Bobby followers save 15% on EnviroBiotics with code Bobby. Bring probiotic cleaning into your home and support cleaner air, surfaces, fabrics, and everyday spaces without harsh chemicals."
        path="/bobby"
      />

      <main className="bobby-page bg-background text-foreground pb-24 sm:pb-0">
        {/* ============ STICKY DISCOUNT BAR ============ */}
        <div className="sticky top-0 z-50 bg-foreground text-background border-b border-white/10">
          <div className="hidden sm:block text-center py-2.5 px-4">
            <span className="text-sm font-medium">
              🎁 Code BOBBY auto-applied — Mini just $83 · free shipping · 30-day money-back
            </span>{" "}
            <a
              href={LINKS.mini}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_sticky_bar_shop")}
              className="text-sm font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
            >
              Get the Mini →
            </a>
          </div>
          <a
            href={LINKS.mini}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_sticky_bar_shop_mobile")}
            className="block sm:hidden text-center py-2.5 px-3 text-xs font-medium"
          >
            🎁 Code BOBBY auto-applied — Mini just $83 · free shipping · 30-day money-back →
          </a>

        </div>

        {/* ============ 1. HERO ============ */}

        {/* MOBILE: stacked layout (below 768px) */}
        <section className="md:hidden w-full bg-background">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <img
              src={heroImgMobile}
              alt="Bobby Parrish at home"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%]"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
            {/* soft fade into cream */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          </div>
          <div className="px-6 pt-8 pb-12">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/60" />
                <p className="text-[10.5px] font-semibold tracking-[0.32em] uppercase text-muted-foreground/70">
                  As featured by Bobby Parrish
                </p>
              </div>
            </Reveal>
            <Reveal>
              <h1 className="mt-6 font-display font-semibold tracking-[-0.03em] text-foreground text-balance text-[2.125rem] leading-[1.05]">
                The probiotic dispenser{" "}
                <em className="not-italic text-heading-accent">Bobby Parrish keeps in his home and on the go.</em>
              </h1>
            </Reveal>
            <Reveal>
              <p className="mt-5 text-[0.95rem] font-light leading-[1.6] text-muted-foreground">
                It sprays beneficial probiotics all over your room — air, surfaces, and fabrics — working quietly between cleanings. Small enough to take anywhere. No bleach, no ammonia.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-[54px] w-full rounded-full bg-primary px-6 text-[0.95rem] font-semibold tracking-[-0.01em] text-white shadow-[0_8px_24px_-8px_rgba(232,93,58,0.55)] hover:bg-primary/90"
                >
                  <a
                    href={LINKS.mini}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_hero_mini_mobile")}
                  >
                    Get the BioLogic Mini — $83
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <a
                  href="#products"
                  onClick={(e) => scrollToHash(e, "products", "click_hero_bundle_link_mobile")}
                  className="text-center text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Want full-home coverage? See the 2-device bundle ↓
                </a>
              </div>
            </Reveal>
            <Reveal>
              <div className="mt-6 flex items-center justify-between gap-2 text-[0.7rem] font-medium tracking-[0.02em] text-muted-foreground">
                <span>✓ Free shipping</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span>✓ 30-day money-back</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <span>✓ Cancel anytime</span>
              </div>
            </Reveal>
            <Reveal>
              <figure className="mt-9 border-l-2 border-primary/60 pl-5">
                <blockquote className="font-display text-[1.05rem] italic leading-[1.45] text-foreground">
                  "This is the BioLogic Mini, I keep one in my kitchen and one in our bedroom."
                </blockquote>
                <figcaption className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Bobby Parrish · FlavCity
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* DESKTOP / TABLET: editorial single-column with background image (768px and up) */}
        <section className="hidden md:block relative w-full bg-background overflow-hidden">
          {/* Background image */}
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          {/* Readability overlay: stronger on the left where text sits, fading right */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

          <div className="relative mx-auto flex min-h-[88svh] max-w-6xl px-6 py-24 lg:py-32">
            <div className="max-w-2xl flex flex-col justify-center">
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-primary" />
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-foreground/70">
                    As featured by Bobby Parrish
                  </p>
                </div>
                <h1 className="font-display font-medium tracking-[-0.025em] text-foreground text-balance text-[3.25rem] leading-[1.05] lg:text-[4.25rem]">
                  The probiotic dispenser{" "}
                  <em className="font-normal italic text-heading-accent" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Bobby Parrish
                  </em>{" "}
                  keeps in his home and on the go.
                </h1>
              </Reveal>
              <Reveal>
                <p className="mt-8 max-w-xl text-lg lg:text-xl font-light leading-[1.6] text-foreground/75">
                  It sprays beneficial probiotics all over your room — air, surfaces, and fabrics — working quietly between cleanings. Small enough to take anywhere. No bleach, no ammonia.
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 rounded-full bg-primary px-10 text-base font-semibold text-white hover:bg-primary/90 group shadow-[0_12px_32px_-12px_rgba(232,93,58,0.55)]"
                  >
                    <a
                      href={LINKS.mini}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("click_hero_mini_desktop")}
                    >
                      Get the BioLogic Mini — $83
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <a
                    href="#products"
                    onClick={(e) => scrollToHash(e, "products", "click_hero_bundle_link_desktop")}
                    className="text-sm font-medium text-foreground/80 border-b border-foreground/30 pb-0.5 hover:text-foreground hover:border-foreground transition-colors"
                  >
                    Want full-home coverage? See the 2-device bundle ↓
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-foreground/10">
                  {["Free shipping", "30-day money-back", "Cancel anytime"].map((label) => (
                    <div key={label} className="flex items-center gap-2 text-xs font-medium text-foreground/60">
                      <Check className="h-4 w-4 text-heading-accent" strokeWidth={2.5} />
                      {label}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>





        {/* ============ GUARANTEE STRIP ============ */}
        <section className="w-full bg-background">
          <div className="max-w-3xl mx-auto px-5 py-6 sm:py-8 text-center">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-foreground leading-relaxed">
              Try it for 30 days. Don't love it? Full refund - free return shipping.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-2">
              We're confident you'll feel the difference within the first week.
            </p>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-gradient-to-b from-background to-muted py-12 sm:py-20 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-5 gap-y-8 px-5 sm:gap-10 sm:px-10 lg:grid-cols-4 lg:px-16">
            {[
              { n: "15%", label: "Off with code Bobby" },
              { n: "300", label: "sq. ft. Mini coverage" },
              { n: "800", label: "sq. ft. large space coverage" },
              { n: "30-day", label: "Risk-free trial" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-3xl font-bold tracking-[-0.03em] text-primary sm:text-5xl lg:text-[3.5rem]">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:mt-3 sm:text-[11px] sm:tracking-[0.22em]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ 3. FAQ TRUST CARDS ============ */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-32">
          {/* Decorative background flourishes */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(214,158,46,0.10),_transparent_70%)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_rgba(193,127,71,0.08),_transparent_70%)] blur-2xl" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mb-14 flex flex-col items-center text-center sm:mb-20">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-primary sm:text-[11px]">
                    The Questions Everyone Asks First
                  </p>
                  <span className="h-px w-10 bg-primary/40" />
                </div>
                <h2 className="mt-5 max-w-2xl font-display text-balance font-semibold tracking-[-0.035em] text-foreground text-[2.5rem] leading-[1.02] sm:text-[3.25rem] md:text-[3.75rem]">
                  Considered answers, <em className="not-italic text-heading-accent">before you ask.</em>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  icon: ShieldCheck,
                  num: "01",
                  title: "Safe around kids and pets?",
                  body: "Yes. EnviroBiotics uses beneficial environmental probiotics, the same family of microbes naturally present in healthy homes. No harsh chemicals, no fragrances, no respiratory irritants. Safe to run continuously around children, pets, and sensitive family members.",
                },
                {
                  icon: Sparkles,
                  num: "02",
                  title: "Do I still clean normally?",
                  body: "Yes, keep using whatever cleaners you love. EnviroBiotics works alongside your routine, supporting the in-between moments your regular cleaning can't reach: fabrics, soft surfaces, and the air itself.",
                },
                {
                  icon: Clock,
                  num: "03",
                  title: "What will I actually notice?",
                  body: "Most Bobby followers report a fresher-feeling home within the first 7 days, less stuffiness, calmer-smelling fabrics, and noticeably less dust settling on surfaces.",
                },
              ].map((card) => (
                <Reveal key={card.title}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-card to-background p-8 ring-1 ring-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_50px_-30px_rgba(120,80,30,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_3px_rgba(0,0,0,0.04),0_40px_80px_-30px_rgba(120,80,30,0.28)] sm:p-10">
                    {/* Top hairline accent on hover */}
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="mb-8 flex items-start justify-between">
                      <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 ring-1 ring-foreground/15">
                        <card.icon className="h-[18px] w-[18px] text-foreground" strokeWidth={1.5} />
                      </div>
                      <span className="font-display text-xs font-normal italic tracking-[0.2em] text-foreground/50">
                        {card.num}
                      </span>
                    </div>

                    <h3 className="font-display text-[1.35rem] font-normal tracking-[-0.015em] text-foreground sm:text-[1.5rem] sm:leading-[1.2]">
                      {card.title}
                    </h3>

                    <div className="mt-5 h-px w-10 bg-foreground/20" />

                    <p className="mt-5 text-[0.95rem] leading-[1.7] text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. THE PROBLEM ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.24)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28)]">
                <img
                  src={livingImg}
                  alt="A clean-looking home interior"
                  className="h-64 w-full object-cover sm:h-[clamp(360px,52vw,560px)]"
                  loading="lazy"
                />
                <div className="hidden sm:absolute sm:inset-0 sm:block sm:bg-gradient-to-r sm:from-background sm:via-background/70 sm:to-transparent" />
                <div className="relative flex w-full flex-col justify-center p-6 sm:absolute sm:inset-y-0 sm:left-0 sm:max-w-[440px] sm:p-12 lg:p-16">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                    BEYOND THE AIR
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                    Your home looks clean.
                    <br />
                    But surfaces collect what you can&apos;t see.
                  </h2>
                  <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-foreground/85 sm:mt-5 sm:text-base">
                    Dust, allergens, and everyday buildup settle into fabrics, furniture, floors, and air long after the surface looks spotless. EnviroBiotics quietly supports a fresher, more balanced home in the spaces your regular cleaning can&apos;t reach.
                  </p>
                  <a
                    href="#how-it-works"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    See how it works
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-5 overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-black/[0.06] sm:mt-6 sm:p-12">
                <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                  Cleaner support for the spaces you use every day.
                </h3>
                <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
                  Designed to work quietly in the background, helping maintain balance on air,
                  surfaces, fabrics, and objects throughout your home.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 sm:mt-20 lg:mt-28">
              <Reveal>
                <p className="mb-10 sm:mb-14 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                  WHAT TO EXPECT
                </p>
              </Reveal>
              <Reveal>
                <h3 className="text-center font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] mb-10 sm:mb-14">
                  The first 30 days in your home.
                </h3>
              </Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                {[
                  {
                    week: "Week 1",
                    title: "A fresher first impression",
                    body: "Most Bobby followers notice a calmer, less stuffy feeling within the first 7 days - especially in bedrooms and closed-door spaces.",
                  },
                  {
                    week: "Week 2",
                    title: "Softer-smelling fabrics",
                    body: "Bedding, towels, upholstery, and curtains start holding scents less stubbornly. Pet smells and cooking lingers fade faster.",
                  },
                  {
                    week: "Week 4",
                    title: "Less buildup, more balance",
                    body: "Surfaces stay cleaner between wipes. Allergy-prone family members often report easier breathing in the rooms with EnviroBiotics running.",
                  },
                ].map((item) => (
                  <Reveal key={item.week}>
                    <div className="flex h-full flex-col rounded-2xl bg-card p-6 ring-1 ring-black/[0.06] sm:p-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary mb-4">
                        {item.week}
                      </p>
                      <h4 className="font-display text-lg font-bold tracking-[-0.02em] text-foreground sm:text-xl mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-gradient-to-b from-background to-muted py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  How It Works
                </p>
                <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  How EnviroBiotics works.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  A simple probiotic system designed to help clean beyond the air.
                </p>
              </div>
            </Reveal>

            <ol className="mt-10 grid grid-cols-1 gap-7 sm:mt-14 lg:mt-20 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "Release",
                  copy: "The device gently releases beneficial environmental probiotics into your indoor space throughout the day.",
                },
                {
                  step: "02",
                  title: "Settle",
                  copy: "The probiotics move through the room and settle on surfaces, fabrics, furniture, floors, and everyday objects.",
                },
                {
                  step: "03",
                  title: "Support",
                  copy: "They help support a cleaner, fresher, more balanced indoor environment - continuously, naturally, and without harsh chemicals.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-foreground/15 pt-6">
                  <span className="font-display text-2xl font-semibold tracking-tight text-primary">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>

            <Reveal>
              <p className="mt-12 max-w-3xl text-sm italic leading-relaxed text-muted-foreground sm:text-base">
                Unlike air purifiers that only treat the air passing through a filter, EnviroBiotics
                is designed to support the air, surfaces, and objects throughout your space.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 5. PRODUCTS ============ */}
        <section id="products" className="bg-gradient-to-b from-background via-card to-background py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1480px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                  CHOOSE YOUR DEVICE
                </p>
                <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Start with the Mini Bobby showed you.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
                  The $83 BioLogic Mini is what Bobby keeps in his kitchen and bedroom. Most families end up with two for full-home coverage — that's the bundle, $100 off.
                </p>
              </div>
            </Reveal>

            {/* FEATURED: BioLogic Mini — first and largest */}
            <div className="mt-10 sm:mt-14 xl:mt-16">
              <Reveal>
                <div className="relative grid grid-cols-1 overflow-hidden rounded-2xl bg-card ring-2 ring-primary shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.35)] sm:rounded-3xl lg:grid-cols-2">
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                    What Bobby Showed You
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))] lg:aspect-auto lg:min-h-[420px]">
                    <img
                      src={miniImg}
                      alt="BioLogic Mini"
                      className="h-full w-full object-contain p-8 sm:p-12"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-2">
                      BOBBY'S PICK · $83
                    </p>
                    <h3 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                      BioLogic Mini
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                      The exact probiotic dispenser Bobby keeps in his kitchen and bedroom. Sprays beneficial probiotics all over the room — air, surfaces, and fabrics — quietly between cleanings.
                    </p>
                    <ul className="mt-5 flex flex-col gap-3">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Covers up to 300 sq ft — perfect for kitchen, bedroom, or office</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Compact and quiet — also Bobby's travel essential</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>No bleach, no ammonia, no fragrances</span>
                      </li>
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="mb-1 flex items-baseline gap-3">
                        <span className="font-display text-4xl font-bold tracking-[-0.02em] text-foreground">$83</span>
                        <span className="text-base text-muted-foreground line-through">$98</span>
                        <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-primary">Code BOBBY applied</span>
                      </div>
                      <a
                        href={LINKS.mini}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("click_bobby_mini")}
                        className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Get the BioLogic Mini — $83
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

            {/* Upsell row: Bundle (second) + Biotica (third) */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 lg:grid-cols-2 lg:gap-6">
              {/* Card 2 - Home Bundle */}
              <Reveal>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-black/[0.06] sm:rounded-3xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))]">
                    <img
                      src={bundleImg}
                      alt="Home Bundle"
                      className="h-full w-full object-contain p-6 sm:p-8"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary mb-2">
                      MOST PEOPLE GET TWO — SAVE $100
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Home Bundle
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      Two devices for full-home coverage — living spaces plus bedrooms. Built for families, pets, and multi-room homes.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Covers up to 800 sq ft across multiple rooms</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Two devices: living spaces + bedrooms</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Best value per square foot</span>
                      </li>
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="mb-1">
                        <span className="text-[1.1rem] text-muted-foreground line-through">$495</span>
                      </div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$395</span>
                        <span className="text-[0.85rem] font-bold text-primary">Save $100</span>
                      </div>
                      <a
                        href={LINKS.bundle}
                        onClick={trackBundle}
                        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Get the Bundle — $395
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        30-day risk-free trial · Free shipping
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Card 3 - Biotica 800 */}
              <Reveal>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-muted/40 ring-1 ring-black/[0.06] sm:rounded-3xl">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[hsl(var(--primary-soft))]">
                    <img
                      src={bioticaImg}
                      alt="Biotica 800"
                      className="h-full w-full object-contain p-6 sm:p-8"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      LARGER HOMES
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                      Biotica 800
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      A single high-coverage device for open-plan homes, basements, and larger spaces up to 800 sq ft.
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-3">
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Covers up to 800 sq ft</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Designed for open-plan layouts</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                        <span>Single-device simplicity</span>
                      </li>
                    </ul>
                    <div className="mt-6 border-t border-border/60 pt-5">
                      <div className="mb-1 flex items-baseline gap-2">
                        <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">$254</span>
                        <span className="text-sm text-muted-foreground line-through">$299</span>
                      </div>
                      <a
                        href={LINKS.biotica}
                        onClick={trackBiotica}
                        className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                      >
                        Larger home? Get the 800
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <p className="mt-3 text-center text-[11px] text-muted-foreground">30-day risk-free trial</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ============ 6. ON THE GO ============ */}
        <section className="bg-gradient-to-b from-background to-background py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[320px] bg-muted sm:min-h-[480px] lg:order-2">
                  <img
                    src={travelImg}
                    alt="Bobby Parrish traveling with BioLogic Mini"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-black/10 bg-card/85 px-4 py-2 backdrop-blur sm:bottom-6 sm:left-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">Bobby&apos;s travel essential</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:gap-6 sm:p-14 lg:order-1 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    ON THE GO
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    Bobby doesn&apos;t leave home without it.
                  </h2>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:text-lg">
                    The BioLogic Mini is compact enough to pack in a suitcase and powerful enough to keep hotel rooms, Airbnbs, and temporary spaces feeling fresh. Wherever Bobby travels, his probiotic support comes with him.
                  </p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                      <span>Fits easily in luggage or a carry-on</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                      <span>Plug in anywhere for instant probiotic coverage</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" strokeWidth={1.5} />
                      <span>Covers up to 300 sq ft - perfect for hotel rooms and rentals</span>
                    </li>
                  </ul>
                  <a
                    href={LINKS.mini}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_travel_mini")}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-base font-semibold text-background transition-colors hover:bg-foreground/90"
                  >
                    Get the BioLogic Mini
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 7. BOBBY ENDORSEMENT ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-card ring-1 ring-black/[0.06] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem] sm:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[280px] bg-muted sm:min-h-[420px]">
                  <img
                    src={bobbyImg}
                    alt="Bobby Parrish"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 sm:gap-6 sm:p-14 lg:p-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:text-[11px] sm:tracking-[0.32em]">
                    A Natural Way to Support Your Home
                  </p>
                  <h2 className="font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
                    Probiotics that clean your home the way nature intended.
                  </h2>
                  <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:text-lg">
                    No harsh chemical sprays. No artificial masking fragrances. No complicated
                    routine. EnviroBiotics works quietly in the background, releasing beneficial
                    environmental probiotics that help support a cleaner, fresher indoor environment
                    every day.
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Bobby followers get 15% off with code{" "}
                    <span className="text-primary">Bobby</span>.
                  </p>
                  <a href="#products" onClick={(e) => scrollToHash(e, "products", "click_bobby_endorsement_cta")}>
                    <Button
                      size="lg"
                      className="h-12 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
                    >
                      Claim 15% Off
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 8. TESTIMONIALS ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-4 sm:text-[11px] sm:tracking-[0.32em]">
                FROM THE BOBBY COMMUNITY
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                What Bobby&apos;s followers are noticing.
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 lg:grid-cols-3 lg:gap-6">
              {[
                {
                  text: "I wanted something that felt more natural than sprays and fragrances. EnviroBiotics gives me a simple way to support a cleaner home every day.",
                },
                {
                  text: "It was easy to set up, and I love that it works quietly in the background. It feels like a smarter way to care for our indoor space.",
                },
                {
                  text: "I like knowing it goes beyond the air and helps support the surfaces and fabrics around our home.",
                },
              ].map((t, i) => (
                <Reveal key={i}>
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-card p-5 sm:gap-5 sm:p-7">
                    <div className="flex gap-0.5 text-foreground">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-[0.95rem] italic leading-relaxed text-muted-foreground sm:text-base">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. FEATURE ICONS ============ */}
        <section className="bg-gradient-to-b from-background to-muted py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {[
                  {
                    label: "Probiotic Cleaning",
                    desc: "Uses beneficial environmental probiotics - the same microbes naturally present in healthy homes.",
                  },
                  {
                    label: "Works With Your Routine",
                    desc: "Doesn't replace your regular cleaning. Quietly supports the gaps your wipes and sprays can't reach.",
                  },
                  {
                    label: "No Harsh Chemicals",
                    desc: "No bleach, no ammonia, no synthetic fragrances. Safe around kids, pets, and sensitive family members.",
                  },
                  {
                    label: "Set It and Forget It",
                    desc: "Runs quietly in the background. No daily routine. No moving parts to maintain.",
                  },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
                      <Check className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div className="mt-2 text-base font-bold text-foreground">{b.label}</div>
                    <div className="text-sm leading-relaxed text-muted-foreground">{b.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 10. FAQ ============ */}
        <section className="bg-background py-14 sm:py-24 lg:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Common questions
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {[
                {
                  q: "Is EnviroBiotics safe for kids and pets?",
                  a: "Yes. EnviroBiotics uses beneficial environmental probiotics - the same family of microbes naturally present in healthy homes. No harsh chemicals, no fragrances, no respiratory irritants. Safe to run continuously around children, pets, and sensitive family members.",
                },
                {
                  q: "Do I need to stop using my regular cleaners?",
                  a: "No. EnviroBiotics is designed to support your home between regular cleanings. Continue your normal cleaning routine while using EnviroBiotics to help maintain a fresher, more balanced indoor environment.",
                },
                {
                  q: "What will I actually notice in my home?",
                  a: "Most Bobby followers report a fresher-feeling home within the first 7 days. You may notice calmer-smelling fabrics, less stuffiness in closed-door spaces, and less dust settling on surfaces between wipes.",
                },
                {
                  q: "Is this an air purifier?",
                  a: "No. EnviroBiotics is different from a traditional air purifier. Air purifiers filter air that passes through the unit. EnviroBiotics releases beneficial environmental probiotics that can move through your space and settle on surfaces, fabrics, and everyday objects.",
                },
                {
                  q: "Which device should I choose?",
                  a: "Choose BioLogic Mini for bedrooms, nurseries, bathrooms, offices, and smaller rooms up to 300 sq. ft. Choose Biotica 800 for larger rooms and open spaces up to 800 sq. ft. Choose the Home Bundle if you want probiotic support in multiple areas of your home.",
                },
                {
                  q: "How long does it take to start working?",
                  a: "EnviroBiotics begins releasing environmental probiotics once the device is active. Consistent use helps support ongoing probiotic coverage throughout your space.",
                },
                {
                  q: "Does this replace regular cleaning?",
                  a: "No. EnviroBiotics is designed to support your home between regular cleanings. Continue your normal cleaning routine while using EnviroBiotics to help maintain a fresher, more balanced indoor environment.",
                },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`q${idx}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ============ 11. FINAL CTA ============ */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <img
            src={ctaBgImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Reveal>
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Bundle $100 off · Singles 15% off
              </span>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-balance font-display font-semibold leading-[1.02] tracking-[-0.035em] text-foreground text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
                Every surface. Every room.{" "}
                <em className="not-italic text-heading-accent">A cleaner way to care for your home.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Start supporting your home with beneficial environmental probiotics that work quietly in the background, every day. The Home Bundle is already discounted $100 - or choose a single device and code BOBBY saves you 15%.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <a href={LINKS.bundle} onClick={() => trackEvent("click_final_cta_bundle")}>
                    Get the Bundle - $395 (Save $100)
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-full border border-foreground/15 bg-card px-8 text-base font-semibold text-foreground hover:bg-card/90"
                >
                  <a href="#products" onClick={(e) => scrollToHash(e, "products", "click_final_cta_browse_all")}>
                    Shop singles from $83 (15% off)
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Free shipping · 30-day money-back guarantee · Cancel anytime
              </p>
            </Reveal>
          </div>
        </section>

      </main>

      {/* Sticky mobile buy bar — always visible on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.12)] sm:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">BioLogic Mini · $83</p>
            <p className="text-[11px] text-muted-foreground">Code BOBBY applied</p>
          </div>
          <a
            href={LINKS.mini}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_mobile_sticky_mini")}
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            aria-label="Buy the BioLogic Mini with code BOBBY"
          >
            Buy with code BOBBY
          </a>
        </div>
      </div>

      {/* Email capture modal */}
      {showEmailModal && !emailModalDismissed && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bobby-email-heading"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismissEmailModal();
          }}
        >
          <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] sm:p-8">
            <button
              type="button"
              onClick={dismissEmailModal}
              aria-label="Dismiss"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              ✕
            </button>
            {emailSubmitted ? (
              <div className="py-6 text-center">
                <p className="font-display text-2xl font-bold text-foreground">Thanks — check your inbox.</p>
                <p className="mt-2 text-sm text-muted-foreground">Code BOBBY is on its way.</p>
              </div>
            ) : (
              <>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-primary">
                  Bobby Parrish · FlavCity
                </p>
                <h3 id="bobby-email-heading" className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                  Not ready yet?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  Get the BOBBY code and a reminder sent to your inbox.
                </p>
                <form onSubmit={handleEmailSubmit} className="mt-5 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-full border border-border bg-background px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Send me the code
                  </button>
                </form>
                <button
                  type="button"
                  onClick={dismissEmailModal}
                  className="mt-3 w-full text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  No thanks
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default BobbyParrishLandingPage;
