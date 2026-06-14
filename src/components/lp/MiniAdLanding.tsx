import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Check } from "lucide-react";
import { shopifyProductUrl } from "@/lib/shopify";
import { trackEvent } from "@/lib/tracking";

import miniDevice from "@/assets/biologic-mini-nobg-new.avif";

export interface Pillar {
  title: string;
  body: string;
}
export interface Step {
  title: string;
  body: string;
}
export interface FAQ {
  q: string;
  a: string;
}
export interface MiniAdLandingProps {
  variant: "v1" | "v2" | "v3" | "v4";
  campaign: string;
  eyebrow?: string;
  headline: ReactNode;
  subhead: string;
  heroImage: string;
  heroImageAlt: string;
  primaryCta?: string;
  secondaryCta?: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionBody: string;
  pillars: Pillar[];
  blockTitle: string;
  blockBody: string;
  steps: Step[];
  faqs: FAQ[];
  closingNote?: string;
}

const OFFER_HEAD = "Get 15% off + free shipping";
const OFFER_SUB = "Today only  for new EnviroBiotics families.";

export const MiniAdLanding = ({
  variant,
  campaign,
  eyebrow,
  headline,
  subhead,
  heroImage,
  heroImageAlt,
  primaryCta = "Get 15% off",
  secondaryCta = "See how",
  sectionLabel,
  sectionTitle,
  sectionBody,
  pillars,
  blockTitle,
  blockBody,
  steps,
  faqs,
  closingNote,
}: MiniAdLandingProps) => {
  const shopUrl = `${shopifyProductUrl("biologic-mini", campaign)}?discount=BIOLP15`;

  const onClick = (label: string) =>
    trackEvent("cta_click", { location: `lp_${variant}`, label });

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-foreground">
      {/* Minimal top bar (no site nav) */}
      <header className="border-b border-foreground/10 bg-[#fbf9f5]/95 backdrop-blur sticky top-0 z-30">
        <div className="container flex items-center justify-between py-3.5">
          <div className="font-display font-bold tracking-tight text-lg">
            BioLogic Mini
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
            {variant.toUpperCase()}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container pt-10 sm:pt-16 pb-12 sm:pb-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#d4641e] mb-4">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-5">
              {headline}
            </h1>
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-xl mb-7">
              {subhead}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[#e85d3a] hover:bg-[#d4501f] text-white px-7"
              >
                <a
                  href={shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onClick("hero_primary")}
                  data-cta={`lp_${variant}_hero`}
                >
                  {primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-foreground/20"
              >
                <a href="#how" onClick={() => onClick("hero_secondary")}>
                  {secondaryCta}
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs text-foreground/55 tracking-wide">
              30-day money-back  Free U.S. shipping  5,000+ homes
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-[2rem] overflow-hidden bg-[#efe9df]">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-lg">
                <p className="text-xs sm:text-sm font-medium text-foreground/80">
                  Your child touches more surfaces than you think.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="how" className="container py-14 sm:py-20">
        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-foreground/55 mb-3">
          {sectionLabel}
        </p>
        <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl max-w-3xl mb-5">
          {sectionTitle}
        </h2>
        <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mb-10">
          {sectionBody}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-foreground/10 bg-white p-6"
            >
              <h3 className="font-semibold text-lg mb-1.5">{p.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK */}
      <section className="bg-[#f3ede2]">
        <div className="container py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-5">
              {blockTitle}
            </h2>
            <p className="text-base sm:text-lg text-foreground/75 leading-relaxed max-w-xl">
              {blockBody}
            </p>
          </div>
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm flex items-center justify-center">
            <img
              src={miniDevice}
              alt="BioLogic Mini device"
              className="w-3/4 h-3/4 object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="container py-14 sm:py-20">
        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-foreground/55 mb-3">
          Solution
        </p>
        <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-10">
          Air + surfaces, explained simply
        </h2>
        <ol className="grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-foreground/10 bg-white p-6"
            >
              <div className="h-9 w-9 rounded-full bg-[#e85d3a] text-white font-semibold flex items-center justify-center mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg mb-1.5">{s.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* OFFER */}
      <section className="container pb-14 sm:pb-20">
        <div className="rounded-3xl bg-[#1f5d3a] text-white p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/70 mb-2">
              Today only
            </p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl">
              {OFFER_HEAD}
            </h3>
            <p className="text-white/75 text-sm mt-1">{OFFER_SUB}</p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#e85d3a] hover:bg-[#d4501f] text-white px-7"
          >
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("offer_band")}
              data-cta={`lp_${variant}_offer`}
            >
              Shop BioLogic Mini
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-20">
        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-foreground/55 mb-3">
          FAQ
        </p>
        <h2 className="font-display font-bold tracking-tight text-3xl sm:text-4xl mb-8">
          Questions parents ask
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {closingNote && (
          <p className="mt-10 text-sm text-foreground/55 max-w-xl">
            {closingNote}
          </p>
        )}
      </section>

      {/* Sticky bottom offer bar */}
      <div className="sticky bottom-0 z-30 border-t border-foreground/10 bg-white/95 backdrop-blur">
        <div className="container py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-[#1f5d3a]" />
            <span className="font-medium">15% off + free shipping</span>
          </div>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-[#e85d3a] hover:bg-[#d4501f] text-white"
          >
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClick("sticky_bar")}
              data-cta={`lp_${variant}_sticky`}
            >
              Get offer
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
};
