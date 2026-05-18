import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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

import miniImg from "@/assets/shop/biologic-mini.png";
import bioticaImg from "@/assets/shop/biotica-800.png";
import bundleImg from "@/assets/shop/home-complete-bundle.avif";
import heroImg from "@/assets/dorm/dorm-hero-moving-in.jpg";
import livingImg from "@/assets/dorm/dorm-clean-bedroom.avif";
import familyImg from "@/assets/dorm/dorm-students-studying.jpg";
import bobbyImg from "@/assets/dorm/dorm-student-reading.jpg";
import particlesImg from "@/assets/dorm/dorm-airborne-particles.avif";
import bathroomImg from "@/assets/dorm/dorm-bathroom-moisture.avif";

const LINKS = {
  mini: shopifyProductUrl("biologic-mini", "bobby-parrish"),
  biotica: shopifyProductUrl("biotica-800", "bobby-parrish"),
  bundle: shopifyUrl("/products/home-complete-bundle", "bobby-parrish"),
};

/* Reveal-on-scroll (matches dorm page pattern) */
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
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
  price: string;
  oldPrice?: string;
  features: string[];
  image: string;
  href: string;
  highlight?: boolean;
  ctaText: string;
  onClick: () => void;
};

const ProductCard = ({
  name,
  tagline,
  price,
  oldPrice,
  features,
  image,
  href,
  highlight,
  ctaText,
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
        Bobby&apos;s Pick
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
      </div>
      <ul className="flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-[0.95rem]">
            <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border/60 pt-5">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground">{price}</span>
          {oldPrice && (
            <span className="text-base text-muted-foreground line-through">{oldPrice}</span>
          )}
        </div>
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
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Free shipping · 30-day guarantee
        </p>
      </div>
    </div>
  </div>
);

const BobbyParrishLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackMini = () => trackEvent("click_bobby_mini");
  const trackBiotica = () => trackEvent("click_bobby_biotica");
  const trackBundle = () => trackEvent("click_bobby_bundle");

  return (
    <>
      <SEOHead
        title="Bobby Parrish × EnviroBiotics | Probiotic Air & Surface Care"
        description="Bobby Parrish's favorite holistic purifier. Probiotic protection for every surface, 24/7. Chemical-free, safe for pets and kids."
        path="/bobby"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Bright, natural-light home"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
            <div className="max-w-3xl">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Bobby Parrish Exclusive
                </p>
              </Reveal>
              <Reveal>
                <h1
                  className="font-display font-bold tracking-[-0.035em] text-white text-[2.75rem] leading-[1.02] sm:text-[clamp(3rem,8vw,6.25rem)]"
                  style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
                >
                  Breathe Easier, Live <span className="text-primary">Healthier!</span>
                </h1>
              </Reveal>
              <Reveal>
                <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white sm:text-xl lg:text-[1.6rem] lg:leading-[1.35] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                  Air purifiers move air. Sprays mask odors. Our probiotics reach every surface a
                  filter can&apos;t — 24 hours a day, every day.
                </p>
              </Reveal>
              <Reveal>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a href="#products" onClick={() => trackEvent("click_hero_shop_picks")}>
                    <Button
                      size="lg"
                      className="h-14 rounded-full bg-white px-8 text-base font-semibold text-foreground hover:bg-white/90"
                    >
                      Shop Bobby&apos;s Picks
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 px-7 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                  >
                    How it works
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                  <span>FDA GRAS</span>
                  <span className="opacity-50">·</span>
                  <span>Chemical-free</span>
                  <span className="opacity-50">·</span>
                  <span>Safe for pets & kids</span>
                  <span className="opacity-50">·</span>
                  <span>Free shipping</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 2. STATS STRIP ============ */}
        <section className="bg-[#F5F3EE] py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-10 px-6 sm:px-10 md:grid-cols-4 lg:px-16">
            {[
              { n: "80%", label: "Allergens live on surfaces" },
              { n: "300", label: "sq ft · BioLogic Mini" },
              { n: "800", label: "sq ft · Biotica 800" },
              { n: "30-day", label: "Money-back guarantee" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <div className="font-display text-4xl font-bold tracking-[-0.03em] text-primary sm:text-5xl lg:text-[3.5rem]">
                    {s.n}
                  </div>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ 3. THE PROBLEM ============ */}
        <section className="bg-background py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28)]">
                <img
                  src={livingImg}
                  alt="A clean-looking home interior"
                  className="h-[clamp(360px,52vw,560px)] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/55 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex w-full max-w-xl flex-col justify-center p-8 sm:p-14 lg:p-20">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                    The reality
                  </p>
                  <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                    Your space looks clean.
                    <br />
                    What&apos;s on your surfaces isn&apos;t.
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Up to 80% of indoor allergens, mold spores, and bacteria live on surfaces — not
                    in the air your filter catches.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { img: bathroomImg, title: "Bedrooms", caption: "Dust mites thrive in pillows and bedding." },
                { img: particlesImg, title: "Kitchens", caption: "Mold and bacteria colonize counters between cleanings." },
              ].map((item) => (
                <Reveal key={item.title}>
                  <div className="relative aspect-[5/3] w-full overflow-hidden rounded-2xl">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute bottom-5 left-6 right-6 text-white">
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-white/85">{item.caption}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-[#F5F3EE] py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="max-w-2xl">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                  The science
                </p>
                <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  How EnviroBiotics works.
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Three quiet steps. No chemicals, no ozone, no filters to replace.
                </p>
              </div>
            </Reveal>

            <ol className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-12">
              {[
                {
                  step: "01",
                  title: "Release",
                  copy: "Devices continuously disperse beneficial Bacillus probiotics into the air around you.",
                },
                {
                  step: "02",
                  title: "Settle",
                  copy: "Probiotics land on every surface — desks, fabrics, vents — coating the spaces a filter can't reach.",
                },
                {
                  step: "03",
                  title: "Protect",
                  copy: "They outcompete harmful microbes for resources, 24/7, without chemicals or fragrance.",
                },
              ].map((item) => (
                <li key={item.step} className="border-t border-foreground/15 pt-6">
                  <span className="font-display text-2xl font-semibold tracking-tight text-primary">{item.step}</span>
                  <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 5. PRODUCTS ============ */}
        <section id="products" className="bg-background py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                  Bobby&apos;s picks
                </p>
                <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  Choose your protection.
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  Every device ships free with a 30-day money-back guarantee.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
              <Reveal>
                <ProductCard
                  name="BioLogic Mini"
                  tagline="Portable · Up to 300 sq ft"
                  price="$98"
                  image={miniImg}
                  href={LINKS.mini}
                  ctaText="Shop BioLogic Mini"
                  onClick={trackMini}
                  features={[
                    "Bedrooms, offices, cars, pet areas",
                    "Cordless & USB-C rechargeable",
                    "Whisper-quiet automatic operation",
                    "Refills last up to 3 months",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Home Bundle"
                  tagline="Best value · Whole home"
                  price="$399"
                  oldPrice="$497"
                  image={bundleImg}
                  href={LINKS.bundle}
                  highlight
                  ctaText="Get the Bundle · Save $98"
                  onClick={trackBundle}
                  features={[
                    "2× BioLogic Mini (300 sq ft each)",
                    "1× Biotica 800 (800 sq ft)",
                    "Covers living room + 2 bedrooms",
                    "All refills & hardware included",
                  ]}
                />
              </Reveal>
              <Reveal>
                <ProductCard
                  name="Biotica 800"
                  tagline="Whole room · Up to 800 sq ft"
                  price="$299"
                  image={bioticaImg}
                  href={LINKS.biotica}
                  ctaText="Shop Biotica 800"
                  onClick={trackBiotica}
                  features={[
                    "Living rooms, kitchens, open plans",
                    "Continuous probiotic dispersion",
                    "Targets mold, allergens, pet dander",
                    "Plug-in for permanent protection",
                  ]}
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ 6. BOBBY ENDORSEMENT ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-card ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.18)] lg:grid-cols-2">
                <div className="relative min-h-[420px] bg-muted">
                  <img
                    src={bobbyImg}
                    alt="Bobby Parrish"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-4 py-2 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-foreground">10M+ followers</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-7 p-10 sm:p-14 lg:p-16">
                  <span className="font-display text-6xl leading-none text-primary/40">&ldquo;</span>
                  <p className="font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
                    Probiotics that clean your home the way nature intended. No chemicals, no
                    nonsense. This is exactly what I put in my own home.
                  </p>
                  <div>
                    <div className="text-base font-bold text-foreground">Bobby Parrish</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Founder of FlavCity · Chef & Clean Living Advocate
                    </div>
                  </div>
                  <a href="#products" onClick={() => trackEvent("click_bobby_endorsement_cta")}>
                    <Button
                      size="lg"
                      className="h-12 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
                    >
                      Shop Bobby&apos;s Picks
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 7. TESTIMONIALS ============ */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                What families are saying.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  text: "My son's allergies improved within the first two weeks. We have one in his bedroom and one in the living room. Life-changing.",
                  author: "Sarah M.",
                  tag: "Verified Buyer",
                },
                {
                  text: "No more sneezing and coughing. The Biotica 800 runs silently and we noticed a difference almost immediately.",
                  author: "James R.",
                  tag: "Verified Buyer",
                },
                {
                  text: "Bobby recommended this and I'm so glad I listened. We have two cats and the pet dander difference is incredible.",
                  author: "Michelle T.",
                  tag: "FlavCity Community",
                },
              ].map((t) => (
                <Reveal key={t.author}>
                  <div className="flex h-full flex-col gap-5 rounded-2xl border border-border/60 bg-card p-7">
                    <div className="flex gap-0.5 text-primary">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-base italic leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.tag}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. TRUST BAND ============ */}
        <section className="bg-[#F5F3EE] py-20 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {[
                  { label: "FDA GRAS Certified", desc: "Generally Recognized as Safe" },
                  { label: "MADE SAFE Certified", desc: "Screened for harmful chemicals" },
                  { label: "EPA Registered", desc: "Meets EPA standards" },
                  { label: "Lab-tested", desc: "Measurable allergen reduction" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col gap-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </div>
                    <div className="mt-2 text-sm font-bold text-foreground">{b.label}</div>
                    <div className="text-xs text-muted-foreground">{b.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 9. FAQ ============ */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 sm:px-10">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
                Common questions
              </h2>
            </Reveal>
            <Accordion type="single" collapsible className="mt-10 w-full">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-left text-base font-medium">
                  Is it safe for my family and pets?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  All probiotic strains are FDA GRAS certified, MADE SAFE certified, and EPA
                  registered. No ozone, no VOCs, no chemical residues. Safe for infants, children,
                  pregnant women, elderly, and all pets.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="text-left text-base font-medium">
                  How is this different from a regular air purifier?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Traditional purifiers only trap what passes through a filter — and only treat
                  air. EnviroBiotics disperses probiotics that settle on every surface, consuming
                  the organic matter allergens and mold need to survive.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="text-left text-base font-medium">
                  How long do refills last?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  BioLogic Mini refills last about 90 days. Biotica 800 refills last up to 6
                  months. Subscribe for automatic deliveries with free shipping and a lifetime
                  warranty.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="text-left text-base font-medium">
                  What&apos;s in the Home Bundle?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Two BioLogic Minis (for bedrooms, office, or car) plus one Biotica 800 (for your
                  main living area). All refills, USB-C cables, and mounting hardware included. You
                  save $98 vs. buying separately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="text-left text-base font-medium">
                  What if it doesn&apos;t work for me?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Every purchase includes a 30-day satisfaction guarantee. If you&apos;re not fully
                  satisfied, return it for a full refund — no questions asked.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ============ 10. FINAL CTA ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-28 sm:py-36 lg:py-44">
          <img
            src={familyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-soft))] via-[hsl(var(--primary-soft))]/80 to-transparent" />
          <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Bobby Parrish × EnviroBiotics
              </p>
              <h2 className="font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
                Every surface.
                <br />
                Always clean.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Join thousands of families who&apos;ve switched to probiotic purification.
                Bobby-approved, science-backed, risk-free.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={LINKS.bundle} onClick={trackBundle}>
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-foreground px-10 text-base font-semibold text-background hover:bg-foreground/90"
                  >
                    Get the Home Bundle · Save $98
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a
                  href={shopifyUrl("/collections/all", "bobby-parrish")}
                  className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-7 text-base font-medium text-foreground transition hover:bg-foreground/5"
                >
                  Browse all products
                </a>
              </div>
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
          <div>
            <p className="text-sm font-semibold text-foreground">Home Bundle</p>
            <p className="text-xs text-muted-foreground">$399 · Save $98</p>
          </div>
          <a href={LINKS.bundle} onClick={trackBundle}>
            <Button className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90">
              Shop now
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default BobbyParrishLandingPage;
