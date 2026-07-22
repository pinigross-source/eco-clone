import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Wind, Sparkles, ShieldCheck, Star } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImgAsset from "@/assets/allergy-hero.avif.asset.json";
const heroImg = heroImgAsset.url;

import epaAsset from "@/assets/certs/cert_0.png.asset.json";
import ispAsset from "@/assets/certs/cert_1.png.asset.json";
import simaAsset from "@/assets/certs/cert_2.png.asset.json";
import isoAsset from "@/assets/certs/cert_3.png.asset.json";
import allergyAsset from "@/assets/certs/cert_4.png.asset.json";
import madeSafeAsset from "@/assets/certs/cert_5.png.asset.json";
import fdaGrasAsset from "@/assets/certs/fda_gras_v2.png.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";

const PROMO = "ALLERGY";
const BIOTICA_URL = `${shopifyProductUrl("biotica-800", "allergy-landing")}`;
const MINI_URL = `${shopifyProductUrl("biologic-mini", "allergy-landing")}`;
const BUNDLE_URL = `${shopifyProductUrl("home-complete-bundle", "allergy-landing")}?discount=${PROMO}`;

const certifications = [
  { label: "EPA Registered", image: epaAsset.url },
  { label: "FDA GRAS", image: fdaGrasAsset.url },
  { label: "AllergyUK", image: allergyAsset.url },
  { label: "PTPA Winner", image: ptpaAsset.url },
  { label: "MADE SAFE®", image: madeSafeAsset.url },
  { label: "ISO 9001:2015", image: isoAsset.url },
  { label: "Instituto de Salud Pública", image: ispAsset.url },
  { label: "Società Italiana di Medicina Ambientale", image: simaAsset.url },
];

const reviews = [
  {
    quote: "We have two cats and a guinea pig, and the odors are completely gone. EnviroBiotics didn't mask the smell — it eliminated it.",
    name: "Amanda I.",
    verified: false,
  },
  {
    quote: "What won me over is that it treats the environment itself instead of just masking symptoms. My home genuinely changed — I only wish I'd started sooner.",
    name: "Randy W.",
    verified: false,
  },
  {
    quote: "I've used these for a couple of years, and everyone who walks into my home says how clean and fresh it feels. Every home should have at least one.",
    name: "Verified homeowner",
    verified: true,
  },
  {
    quote: "The product is unbelievable — I noticed a difference very quickly. Customer service was excellent, and my order shipped the same day.",
    name: "Lynn",
    verified: false,
  },
  {
    quote: "EnviroBiotics has made a big difference in the quality of my sleep. I highly recommend it.",
    name: "Greg H.",
    verified: false,
  },
];

const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const track = (name: string, extra: Record<string, unknown> = {}) => {
  try {
    trackEvent(name, { page: "allergy_landing", ...extra });
  } catch {
    /* noop */
  }
};

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const AllergyLandingPage = () => {
  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      <Navbar />

      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-cream pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8 grid gap-10 md:gap-14 md:grid-cols-2 items-center">
          <Reveal>
            <p className="mb-4 text-xs md:text-sm uppercase tracking-[0.18em] text-sage font-semibold">
              For allergy &amp; asthma-sensitive homes
            </p>
            <h1 className="text-[2.25rem] leading-[1.05] sm:text-5xl md:text-6xl font-bold tracking-tight text-ink">
              Clean the whole room.<br />
              <span className="text-sage">Not just the air.</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-ink/80 max-w-xl">
              Environmental probiotics that continuously reduce allergens on
              every surface and in the air, between cleanings.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-sage hover:bg-sage/90 text-white text-base px-8 shadow-lg shadow-sage/20"
              >
                <a
                  href={BUNDLE_URL}
                  onClick={() => track("cta_click", { section: "hero", target: "bundle" })}
                >
                  Shop EnviroBiotics <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  track("cta_click", { section: "hero", target: "how_it_works" });
                  scrollToId("differentiator");
                }}
                className="h-14 rounded-full border-ink/20 text-ink hover:bg-ink/5 text-base px-8"
              >
                See how it works
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
              {[
                "EPA Registered",
                "FDA GRAS",
                "AllergyUK",
                "30-day money-back",
              ].map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-sage" strokeWidth={2.5} />
                  <span>{c}</span>
                </li>
              ))}
              <li className="flex items-center gap-1.5">
                <span className="flex text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </span>
                <span>Rated 5.0 from 43 verified reviews</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-3xl overflow-hidden shadow-2xl shadow-ink/10">
              <img
                src={heroImg}
                alt="A bright sunlit bedroom where allergens settle on bedding, floors, and soft surfaces"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. PROBLEM / MESSAGE MATCH */}
      <section className="bg-cream pb-14 md:pb-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
              If your allergies flare up indoors, your air purifier isn&apos;t enough.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Dust, dander, pollen, and mold don&apos;t just float in the air. They
              settle onto bedding, sofas, rugs, curtains, and floors. The
              surfaces you and your family touch every day. Filters only clean
              the air that passes through them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. DIFFERENTIATOR */}
      <section
        id="differentiator"
        className="bg-white border-y border-ink/5 py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-sage font-semibold">
              The difference
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Air purifiers filter air. EnviroBiotics treats the whole room.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-ink/10 bg-cream/60 p-8">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-ink/5 flex items-center justify-center">
                    <Wind className="h-5 w-5 text-ink/60" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink/80">
                    A typical air purifier
                  </h3>
                </div>
                <p className="mt-4 text-ink/70 leading-relaxed">
                  Cleans only the air that passes through the filter. Allergens
                  on your mattress, sofa, and floors stay where they are.
                </p>
                <ul className="mt-6 space-y-2 text-ink/60 text-sm">
                  <li>· The air passing through the machine</li>
                  <li>· Nothing on surfaces</li>
                  <li>· Nothing embedded in fabrics</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl bg-sage text-white p-8 shadow-xl shadow-sage/20">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">EnviroBiotics</h3>
                </div>
                <p className="mt-4 text-white/90 leading-relaxed">
                  An active probiotic solution disperses into the room and keeps
                  working on every surface and object, plus the air, 24/7.
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  {[
                    "Mattresses",
                    "Bedding",
                    "Sofas & chairs",
                    "Rugs & carpets",
                    "Floors",
                    "Curtains",
                    "Toys & objects",
                    "The air",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3.5 THE SIMPLEST WAY */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="rounded-3xl bg-white border border-ink/5 px-8 py-12 md:px-14 md:py-16 shadow-sm">
              <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-start">
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-sage font-semibold mb-5">
                    How it works
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
                    The simplest way to explain it.
                  </h2>
                </div>
                <div className="md:border-l md:border-ink/10 md:pl-10">
                  <p className="text-lg leading-relaxed text-ink/75">
                    You&apos;ve heard of probiotics for your gut - the beneficial microbes that keep things balanced and healthy.{" "}
                    <span className="font-semibold text-ink">
                      EnviroBiotics brings that same idea to your home.
                    </span>
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-ink/75">
                    Beneficial probiotics settle onto surfaces and quietly break down the organic residue allergens feed on - dust, dander, pollen, and mold -{" "}
                    <span className="text-sage font-medium">continuously and naturally</span>.
                  </p>
                  <div className="mt-8 flex items-center gap-3 border-t border-ink/10 pt-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
                      Bio
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                      Proven probiotic technology
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
              How it works.
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              Three steps. Then it just runs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Plug in",
                b: "Place the device in the room you use most, bedroom, living room, or nursery.",
              },
              {
                n: "02",
                t: "Probiotic mist disperses",
                b: "A fine, fragrance-free solution of beneficial probiotics reaches every surface in the room.",
              },
              {
                n: "03",
                t: "Continuous reduction",
                b: "Allergens on surfaces and in the air are continuously reduced, between and after every cleaning.",
              },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="h-full rounded-3xl bg-white p-8 border border-ink/5 shadow-sm">
                  <div className="text-sm font-semibold text-sage tracking-widest">
                    {s.n}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-ink/70 leading-relaxed">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROOF / CERTIFICATIONS */}
      <section className="bg-white border-y border-ink/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-sage font-semibold">
              Independently verified
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink">
              Trusted by allergy-sensitive households.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-6 items-center">
              {certifications.map((c) => (
                <div key={c.label} className="flex items-center justify-center">
                  <img
                    src={c.image}
                    alt={c.label}
                    title={c.label}
                    loading="lazy"
                    className="max-h-14 w-auto opacity-80 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </section>

      {/* 6. REVIEWS */}
      <section id="reviews" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-sage font-semibold">
              Loved by real homes
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Rated 5.0 from 43 verified reviews
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-amber-500">
              <span className="flex" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </span>
              <span className="text-sm text-ink/70">
                100% of verified reviews published — Judge.me Diamond Transparent Shop.
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-start rounded-3xl bg-white p-7 border border-ink/5 shadow-sm flex flex-col h-full"
                >
                  <div className="flex text-amber-500 mb-4" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-ink/80 leading-relaxed text-[15px] flex-grow">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between gap-3">
                    <p className="font-semibold text-sm text-ink">{review.name}</p>
                    {review.verified && (
                      <span className="inline-flex items-center rounded-full bg-sage/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-sage">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 text-center">
              <a
                href="https://shop.envirobiotics.com/products/biologic-mini"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-sage hover:text-sage/80 underline underline-offset-4"
                onClick={() => track("cta_click", { section: "reviews", target: "read_all_reviews" })}
              >
                Read all reviews <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. PRICING */}
      <section id="pricing" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-ink">
              Choose your coverage.
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              One-time purchase. No subscription required.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Mini */}
            <Reveal>
              <PriceCard
                name="BioLogic Mini"
                price="$98"
                best="Best for a single room, up to 300 sq ft."
                href={MINI_URL}
                onBuy={() => track("cta_click", { section: "pricing_mini" })}
                subHref={MINI_URL}
              />
            </Reveal>
            {/* Biotica */}
            <Reveal delay={80}>
              <PriceCard
                name="Biotica"
                price="$299"
                best="Best for whole-home coverage."
                href={BIOTICA_URL}
                onBuy={() => track("cta_click", { section: "pricing_biotica" })}
                subHref={BIOTICA_URL}
              />
            </Reveal>
            {/* Bundle */}
            <Reveal delay={160}>
              <PriceCard
                name="Home Bundle"
                price="$395"
                compareAt="$495"
                saveBadge="Save $100"
                topBadge="Most popular · Best value"
                best="2 BioLogic Minis + 1 Biotica, whole home plus two rooms."
                href={BUNDLE_URL}
                onBuy={() => track("cta_click", { section: "pricing_bundle" })}
                subHref={BUNDLE_URL}
                highlight
              />
            </Reveal>
          </div>

          {/* 7. GUARANTEE */}
          <Reveal>
            <div className="mt-12 rounded-3xl bg-sage-soft border border-sage/20 p-8 md:p-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-sage/15 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-sage" />
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-ink">
                Try it in your home for 30 days, risk-free.
              </h3>
              <p className="mt-3 text-ink/70">
                If you&apos;re not happy, return it within 30 days for a full
                refund. Free shipping. Easy returns.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-white border-y border-ink/5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Accordion type="single" collapsible className="mt-10">
              {[
                {
                  q: "How is this different from an air purifier?",
                  a: "Air purifiers filter only the air that passes through the device. EnviroBiotics disperses an active probiotic solution that continuously reduces allergens on every surface and object in the room, plus the air.",
                },
                {
                  q: "Do I have to subscribe?",
                  a: "No. Every device is a one-time purchase. Subscription is optional for automatic refill deliveries if you want them.",
                },
                {
                  q: "Is it safe around kids and pets?",
                  a: "Yes. The probiotic cultures used are on the FDA's GRAS list and the product is fragrance-free. It is designed for continuous use in homes with children and pets.",
                },
                {
                  q: "Any chemicals or fragrances?",
                  a: "No harsh chemicals and no added fragrance. The active solution is water-based and built around beneficial probiotics.",
                },
                {
                  q: "How soon will I notice a difference?",
                  a: "Most households report a fresher, cleaner-feeling room within the first few weeks of continuous use. Results vary by space and conditions.",
                },
                {
                  q: "What's the return policy?",
                  a: "30-day money-back guarantee. Free shipping and easy returns.",
                },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-ink/10">
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-ink hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink/70 leading-relaxed text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Clean the whole room, <span className="text-sage">not just the air.</span>
            </h2>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-sage hover:bg-sage/90 text-white text-base px-10 shadow-xl shadow-sage/30"
              >
                <a
                  href={BUNDLE_URL}
                  onClick={() => track("cta_click", { section: "final_cta", target: "bundle" })}
                >
                  Shop EnviroBiotics <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/60">
              30-day money-back guarantee · Free shipping · Easy returns
            </p>
          </Reveal>
        </div>
      </section>

      {/* Compliance disclaimer */}
      <div className="bg-cream border-t border-ink/10">
        <p className="mx-auto max-w-4xl px-5 md:px-8 py-6 text-xs text-ink/55 text-center leading-relaxed">
          Results vary by space and conditions. Not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>

      <Footer />
    </div>
  );
};

/* ------------ Price card ------------ */
function PriceCard({
  name,
  price,
  compareAt,
  saveBadge,
  topBadge,
  best,
  href,
  subHref,
  onBuy,
  highlight = false,
}: {
  name: string;
  price: string;
  compareAt?: string;
  saveBadge?: string;
  topBadge?: string;
  best: string;
  href: string;
  subHref: string;
  onBuy: () => void;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative h-full rounded-3xl p-7 md:p-8 flex flex-col ${
        highlight
          ? "bg-white border-2 border-sage shadow-xl shadow-sage/15"
          : "bg-white border border-ink/10 shadow-sm"
      }`}
    >
      {topBadge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow">
          {topBadge}
        </span>
      )}
      <h3 className="text-xl font-semibold text-ink">{name}</h3>

      <div className="mt-4 flex items-end gap-3">
        <div className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
          {price}
        </div>
        {compareAt && (
          <div className="pb-2 text-ink/50 line-through text-lg">{compareAt}</div>
        )}
        {saveBadge && (
          <div className="pb-2 text-sage text-sm font-semibold">{saveBadge}</div>
        )}
      </div>

      <p className="mt-4 text-ink/70 leading-relaxed text-[15px] min-h-[3.5rem]">
        {best}
      </p>

      <div className="mt-auto pt-6">
        <Button
          asChild
          size="lg"
          className="w-full h-13 rounded-full bg-sage hover:bg-sage/90 text-white text-base font-semibold"
        >
          <a href={href} onClick={onBuy}>
            Buy Once
          </a>
        </Button>
        <div className="mt-3 text-center">
          <a
            href={subHref}
            className="text-xs text-ink/55 hover:text-ink underline underline-offset-2"
          >
            or Subscribe &amp; Save on refills
          </a>
        </div>
      </div>
    </div>
  );
}

export default AllergyLandingPage;
