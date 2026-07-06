import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl, shopifyUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroAsset from "@/assets/FamilyLP.avif.asset.json";
const heroImg = heroAsset.url;
import kitchenAsset from "@/assets/The_kitchen_counter.avif.asset.json";
import livingAsset from "@/assets/The_living_room_floor.avif.asset.json";
import bedroomAsset from "@/assets/The_bedroom_you_rest_in.avif.asset.json";
import kidsAsset from "@/assets/The_playroom_and_beyond.avif.asset.json";
const kitchenImg = kitchenAsset.url;
const livingImg = livingAsset.url;
const bedroomImg = bedroomAsset.url;
const kidsImg = kidsAsset.url;
import cleanHome from "@/assets/family-clean-home.jpg";
import miniProduct from "@/assets/biologic-mini-new.jpg.asset.json";
import bioticaProduct from "@/assets/biotica-800-new.jpg.asset.json";
import bundleProduct from "@/assets/bundle-product.webp.asset.json";

const PROMO = "FAMILY";
const withDiscount = (url: string, code = PROMO) =>
  `${url}${url.includes("?") ? "&" : "?"}discount=${code}`;

const BIOTICA_URL = withDiscount(shopifyProductUrl("biotica-800", "active-families"));
const MINI_URL = withDiscount(shopifyProductUrl("biologic-mini", "active-families"));
const BUNDLE_URL = withDiscount(shopifyUrl("/products/home-complete-bundle", "active-families"));

const DISPLAY = `"Helvetica Neue", "Inter", system-ui, -apple-system, sans-serif`;

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

const rooms = [
  {
    title: "The kitchen counter",
    body: "Where meals get made, spills happen, and hands rest between bites. A cleaner ecosystem here means less residue building up between wipes.",
    image: kitchenImg,
  },
  {
    title: "The living room floor",
    body: "Where kids sprawl, guests kick off shoes, and everything eventually lands. Balance the surface layer without harsh cleaners or fragrance.",
    image: livingImg,
  },
  {
    title: "The bedroom you rest in",
    body: "Where a third of your life happens. Cleaner bedding, softer air, quieter nights, so recovery keeps up with an active week.",
    image: bedroomImg,
  },
  {
    title: "The playroom and beyond",
    body: "Where the toys, rugs, and pillows collect what a vacuum cannot. Continuous, quiet care for every surface a small hand touches.",
    image: kidsImg,
  },
];

const faqs = [
  {
    q: "Is it safe for kids, pets, and pregnant women?",
    a: "Yes. EnviroBiotics uses beneficial probiotic strains that are non toxic and non irritating. There are no sprays, no fragrances, and no harsh chemicals in the home.",
  },
  {
    q: "How is this different from an air purifier?",
    a: "Air purifiers filter what floats past them. EnviroBiotics works on the surfaces themselves, breaking down organic residue on floors, fabrics, counters, and bedding, so the source stops feeding the air.",
  },
  {
    q: "Do I need to change anything about my routine?",
    a: "No. The unit runs quietly in the background 24/7. Keep cleaning the way you already do. EnviroBiotics handles what your cleaner cannot reach.",
  },
  {
    q: "Which unit is right for a family home?",
    a: "For most active homes we suggest the Biotica 800 for open living spaces, plus a BioLogic Mini for a nursery or primary bedroom. The bundle covers both.",
  },
];

const ActiveFamiliesLandingPage = () => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string, evt?: string) => {
    e.preventDefault();
    if (evt) trackEvent(evt);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title="A Layer of Wellness for Active Families | EnviroBiotics"
        description="For families who eat well, move often, and want an easier way to keep the home cleaner. EnviroBiotics quietly balances the surfaces you live on."
        path="/active-families"
      />

      <Navbar />
      <main className="bg-white text-[#1A1A1A] pt-16 lg:pt-[124px]" style={{ fontFamily: DISPLAY }}>
        {/* HERO — Sonos-style cinematic, bright */}
        <section className="relative w-full overflow-hidden bg-white text-neutral-900 min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-124px)] flex items-center justify-center">
          {/* Full-bleed bright image */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImg}
              alt="Family moving through a bright, natural Scandinavian style home"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1920}
              height={1080}
            />
            {/* subtle light wash for text legibility, no dark tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/10 to-white/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-14 pb-32 text-center sm:pt-16 sm:pb-36 lg:pt-20 lg:pb-40">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-600">
              <span className="h-px w-8 bg-neutral-400/60" />
              <span>Active Families</span>
              <span className="h-1 w-1 rounded-full bg-neutral-400" />
              <span>EnviroBiotics</span>
              <span className="h-px w-8 bg-neutral-400/60" />
            </div>

            <p className="mb-5 text-[17px] font-light italic tracking-wide text-neutral-700 sm:text-xl">
              Add a layer of wellness. Effortlessly.
            </p>

            <h1
              className="font-medium tracking-tight text-neutral-900 [text-shadow:0_1px_2px_rgba(255,255,255,0.6)]"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}
            >
              Healthy diet.
              <br />
              Active lifestyle.
            </h1>

            <p className="mt-8 max-w-xl text-[15.5px] font-light leading-relaxed text-neutral-700 sm:text-[17px]">
              You eat clean. You move often. You choose better. EnviroBiotics
              keeps working quietly in the background, so the home you built
              for wellness keeps up with the life you live.
            </p>

            <a
              href="#rooms"
              onClick={(e) => scrollTo(e, "rooms", "click_family_hero_cta")}
              className="group mt-10 inline-flex items-center rounded-full bg-neutral-900 px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-neutral-800 active:scale-[0.98]"
            >
              See how it fits your home
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Trust rail — anchored bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-black/5 bg-white/70 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-4 text-[10.5px] font-medium uppercase tracking-[0.28em] text-neutral-700">
              {["Family safe", "No sprays or fragrance", "Runs 24/7, silently"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFIT STRIP */}
        <section className="border-b border-black/5 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {[
                "Works on the surfaces you live on",
                "Reduces allergens, mold, and odor",
                "No harsh chemicals, no filters",
                "Quiet enough to forget it is there",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#10B981]" strokeWidth={2.5} />
                  <span className="text-[15px] font-medium leading-[1.4] text-black/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#F4F6F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white px-8 py-16 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.08)] sm:px-12 sm:py-20 lg:px-20">
                <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl" />

                <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
                  <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      How it works
                    </div>
                    <h2
                      className="font-bold tracking-tight text-neutral-900"
                      style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 0.95 }}
                    >
                      Wellness for the ecosystem you live in.
                    </h2>
                  </div>

                  <div className="relative md:border-l md:border-neutral-200 md:pl-8">
                    <p className="text-[16.5px] leading-[1.65] text-neutral-600 sm:text-[18px]">
                      You already think about the ecosystem inside your body.
                      EnviroBiotics does the same thing for the ecosystem inside
                      your home.
                    </p>
                    <p className="mt-5 text-[16.5px] leading-[1.65] text-neutral-600 sm:text-[18px]">
                      Beneficial probiotics settle onto surfaces and quietly
                      break down the residue that harmful microbes, allergens,
                      and odor feed on.{" "}
                      <span className="font-medium text-emerald-700">
                        Continuously, naturally, and completely in the background.
                      </span>
                    </p>
                    <div className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white">
                        Bio
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Proven probiotic technology
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ROOMS */}
        <section id="rooms" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
            <div className="mb-14 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Every room your family uses
              </p>
              <h2
                className="mt-3 font-semibold tracking-tight text-neutral-900"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.02 }}
              >
                One quiet layer of care, everywhere you live.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {rooms.map((room) => (
                <Reveal key={room.title}>
                  <article className="group overflow-hidden rounded-[28px] bg-[#f5f5f7]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="px-7 py-8 sm:px-9 sm:py-10">
                      <h3 className="text-[22px] font-semibold tracking-tight text-neutral-900 sm:text-[24px]">
                        {room.title}
                      </h3>
                      <p className="mt-3 text-[15.5px] leading-relaxed text-neutral-600">
                        {room.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROMISE STRIP */}
        <section
          className="relative flex min-h-[420px] items-center overflow-hidden py-24 sm:min-h-[520px] sm:py-32"
          style={{
            backgroundImage: `linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.55)), url(${cleanHome})`,
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="mx-auto max-w-[1000px] px-6 text-center text-white sm:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
              The promise
            </p>
            <h2
              className="mt-4 font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.05 }}
            >
              You do the healthy work. We handle what you cannot see.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/80">
              EnviroBiotics runs while you cook, train, work, and rest. It never
              interrupts. It just quietly makes the home a better place to keep
              being your best.
            </p>
          </div>
        </section>

        {/* PICK YOUR FIT */}
        <section id="pick" className="scroll-mt-20 bg-[#f5f5f7] py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-12">
            <div className="mb-14 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Pick your fit
              </p>
              <h2
                className="mt-3 font-semibold tracking-tight text-neutral-900"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.02 }}
              >
                Match the coverage to your home.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "BioLogic Mini",
                  desc: "Bedrooms, nurseries, and rooms up to 400 sq ft.",
                  url: MINI_URL,
                  event: "click_family_card_mini",
                  tag: "For focused rooms",
                  image: miniProduct.url,
                },
                {
                  name: "Biotica 800",
                  desc: "Open living spaces and family rooms up to 800 sq ft.",
                  url: BIOTICA_URL,
                  event: "click_family_card_biotica",
                  tag: "For open plans",
                  featured: true,
                  image: bioticaProduct.url,
                },
                {
                  name: "Home Complete Bundle",
                  desc: "Full coverage for the family home, room by room.",
                  url: BUNDLE_URL,
                  event: "click_family_card_bundle",
                  tag: "Best value",
                  image: bundleProduct.url,
                },
              ].map((p) => (
                <Reveal key={p.name}>
                  <div
                    className={`relative flex h-full flex-col rounded-[28px] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] sm:p-10 ${
                      p.featured ? "ring-1 ring-emerald-500/40" : ""
                    }`}
                  >
                    <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-6 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] ${
                        p.featured
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {p.tag}
                    </span>
                    <h3 className="mt-6 text-[24px] font-semibold tracking-tight text-neutral-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                      {p.desc}
                    </p>
                    <div className="mt-8 flex-1" />
                    <a
                      href={p.url}
                      onClick={() => trackEvent(p.event)}
                      className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Choose {p.name.split(" ")[0]}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-[900px] px-6 sm:px-10">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Questions from active families
              </p>
              <h2
                className="mt-3 font-semibold tracking-tight text-neutral-900"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.05 }}
              >
                Straightforward answers.
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-neutral-200">
                  <AccordionTrigger className="text-left text-[16.5px] font-medium text-neutral-900 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15.5px] leading-relaxed text-neutral-600">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-neutral-950 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[900px] px-6 text-center sm:px-10">
            <h2
              className="font-semibold tracking-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05 }}
            >
              Bring wellness into the walls of your home.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">
              One quiet layer of care, working around the clock, so your family
              can keep moving.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={BUNDLE_URL}
                onClick={() => trackEvent("click_family_final_bundle")}
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-[14px] font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                Shop the family bundle
                <ArrowRight className="ml-3 h-4 w-4" />
              </a>
              <a
                href="#pick"
                onClick={(e) => scrollTo(e, "pick", "click_family_final_pick")}
                className="inline-flex items-center rounded-full border border-white/30 px-8 py-4 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Compare options
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ActiveFamiliesLandingPage;
