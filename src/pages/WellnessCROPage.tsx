import { useEffect, useState } from "react";
import { ArrowRight, Check, Leaf, Sparkles, Wind } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CompactTrustStrip, MobileStickyShopCTA, ProductDecisionBlock, TrackedShopLink } from "@/components/consumer/ConsumerCRO";
import { shopifyDiscountUrl } from "@/lib/shopify";
import heroAsset from "@/assets/eb_well.avif.asset.json";
import livingAsset from "@/assets/let-it-work-living.avif.asset.json";
import ritualAsset from "@/assets/final-cta-wellness.avif.asset.json";

const BIOTICA_URL = shopifyDiscountUrl("WELLNESS", "/cart/48644373184764:1", "wellness-landing");
const MINI_URL = shopifyDiscountUrl("WELLNESS", "/cart/48644372496636:1", "wellness-landing");

const faqs = [
  {
    q: "How is this different from a conventional air purifier?",
    a: "A conventional purifier primarily filters air that reaches the machine. EnviroBiotics disperses beneficial environmental probiotics through the room so they can reach surrounding air, surfaces, and objects.",
  },
  {
    q: "Does it replace cleaning or disinfection?",
    a: "No. EnviroBiotics complements appropriate cleaning and disinfection. It is designed to work continuously between cleaning cycles.",
  },
  {
    q: "Which device is right for my room?",
    a: "BioLogic Mini is designed for personal spaces up to 300 square feet. Biotica 800 is designed for larger shared rooms up to 800 square feet.",
  },
  {
    q: "Do I have to subscribe?",
    a: "No. The device is a one-time purchase. Automatic refill delivery is optional.",
  },
  {
    q: "What maintenance is required?",
    a: "Replace the probiotic cartridge on its recommended schedule. There is no filter to wash or replace on BioLogic Mini or Biotica 800.",
  },
];

export default function WellnessCROPage() {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <section className="bg-cream pt-16 lg:pt-[124px]">
          <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-[1fr_1.05fr]">
            <div className="order-2 px-5 py-10 sm:px-10 sm:py-16 lg:order-1 lg:px-16">
              <p className="text-xs font-semibold uppercase text-sage">Environmental wellness at home</p>
              <h1 className="mt-4 max-w-[13ch] text-4xl font-bold leading-[1.03] text-ink sm:text-5xl lg:text-6xl">
                A fresher indoor environment, beyond air-only filtration.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
                EnviroBiotics uses beneficial environmental probiotics designed to work continuously across the air, surfaces, and objects around you.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-12 rounded-full px-7">
                  <TrackedShopLink route="/wellness" placement="hero_primary" product="biotica-800" destination={BIOTICA_URL}>
                    Shop Biotica 800 <ArrowRight className="h-4 w-4" />
                  </TrackedShopLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-12 rounded-full px-7">
                  <a href="#why-different">Why it is different</a>
                </Button>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70">
                {["Continuous", "Low maintenance", "Complements routine cleaning"].map((item) => (
                  <li key={item} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-sage" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="order-1 aspect-[4/3] overflow-hidden lg:order-2 lg:min-h-[640px] lg:aspect-auto">
              <img src={heroAsset.url} alt="Bright wellness-focused bedroom with an EnviroBiotics device" width={1200} height={1500} fetchPriority="high" loading="eager" decoding="async" className="h-full w-full object-cover" />
            </div>
          </div>
        </section>

        <CompactTrustStrip marks={["epa", "fda", "allergyUk", "madeSafe", "ptpa"]} />

        <ProductDecisionBlock
          route="/wellness"
          eyebrow="Recommended by room size"
          title="Start with the space where you spend the most time."
          intro="Choose a quiet personal-room device or broader coverage for a main living area."
          decisions={[
            { slug: "biotica-800", bestFor: "Main living rooms and shared spaces", installation: "Plug in and run continuously", destination: BIOTICA_URL, ctaLabel: "Shop Biotica 800", featured: true },
            { slug: "biologic-mini", bestFor: "Bedrooms and personal spaces", installation: "Rechargeable and portable", destination: MINI_URL, ctaLabel: "Shop BioLogic Mini" },
          ]}
        />

        <section id="why-different" className="scroll-mt-24 border-y border-ink/10 bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase text-sage">Why this is different</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">Your home is more than the air inside it.</h2>
                <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">Dust, dander, pollen, and organic material settle onto bedding, furniture, rugs, floors, and everyday objects. Air-only filtration cannot reach all of those places.</p>
              </div>
              <div className="grid overflow-hidden rounded-lg border border-ink/10 sm:grid-cols-2">
                <div className="bg-cream p-6 sm:p-8">
                  <Wind className="h-6 w-6 text-ink/50" />
                  <h3 className="mt-4 text-xl font-bold">Conventional air purifier</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/65">Primarily addresses material in air that passes through the machine.</p>
                </div>
                <div className="bg-sage p-6 text-primary-foreground sm:p-8">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="mt-4 text-xl font-bold">EnviroBiotics</h3>
                  <p className="mt-3 text-base leading-relaxed text-primary-foreground/90">Designed to disperse throughout the occupied room and reach air, surfaces, and objects.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
            <img src={livingAsset.url} alt="A calm living room supported by continuous environmental probiotic care" width={1600} height={1067} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover" />
            <div>
              <p className="text-xs font-semibold uppercase text-sage">Simple by design</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Place it. Power it on. Let it work.</h2>
              <div className="mt-6 space-y-5">
                {[
                  ["01", "Disperse", "The device releases a fine solution of beneficial environmental probiotics."],
                  ["02", "Travel with airflow", "Normal air movement carries them through the surrounding room."],
                  ["03", "Support balance", "They reach air, surfaces, and objects while complementing regular cleaning."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="grid grid-cols-[36px_1fr] gap-3 border-t border-ink/10 pt-5">
                    <span className="text-sm font-bold text-sage">{number}</span>
                    <div><h3 className="text-lg font-bold">{title}</h3><p className="mt-1 text-base leading-relaxed text-ink/70">{copy}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase text-sage">A practical wellness layer</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Designed to fit the routine you already have.</h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    [Wind, "Whole-room approach", "Supports the air and the places where material settles."],
                    [Leaf, "Complements cleaning", "Works between normal cleaning and disinfection cycles."],
                    [Sparkles, "Low maintenance", "No filter to wash or replace on these room devices."],
                    [Check, "No subscription required", "Buy the device once and choose how to order future refills."],
                  ].map(([Icon, title, copy]) => {
                    const ItemIcon = Icon as typeof Wind;
                    return <div key={title as string} className="border-t border-ink/10 pt-4"><ItemIcon className="h-5 w-5 text-sage" /><h3 className="mt-3 text-lg font-bold">{title as string}</h3><p className="mt-2 text-base leading-relaxed text-ink/70">{copy as string}</p></div>;
                  })}
                </div>
              </div>
              <img src={ritualAsset.url} alt="EnviroBiotics device beside a calm, linen-dressed bed" width={1600} height={1200} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-lg object-cover" />
            </div>
          </div>
        </section>

        <section className="border-y border-ink/10 bg-cream py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">Wellness questions, answered.</h2>
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`wellness-${index}`} className="border-ink/10">
                  <AccordionTrigger className="min-h-14 text-left text-base font-semibold hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-ink/70">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-ink py-16 text-primary-foreground sm:py-24">
          <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
            <h2 className="text-3xl font-bold leading-tight sm:text-5xl">Create a fresher environment around your routine.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">Start with the room where you live, rest, or recover most.</p>
            <Button asChild size="lg" className="mt-8 min-h-12 rounded-full bg-sage px-8 text-primary-foreground hover:bg-sage/90">
              <TrackedShopLink route="/wellness" placement="final_cta" product="biotica-800" destination={BIOTICA_URL}>Shop Biotica 800 <ArrowRight className="h-4 w-4" /></TrackedShopLink>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyShopCTA route="/wellness" product="biotica-800" destination={BIOTICA_URL} label="Shop Biotica 800" detail="Up to 800 sq ft · $299" visible={showSticky} />
    </div>
  );
}