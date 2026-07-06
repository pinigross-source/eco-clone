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
import kitchenImg from "@/assets/health-scandi-kitchen.jpg";
import livingImg from "@/assets/family-living-cozy.jpg";
import bedroomImg from "@/assets/health-scandi-bedroom.jpg";
import kidsImg from "@/assets/difference-kidsroom.jpg";
import cleanHome from "@/assets/family-clean-home.jpg";

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
      <main
        className="relative text-[#1A1A1A]"
        style={{
          fontFamily: DISPLAY,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* HERO */}
        <section className="relative w-full overflow-hidden">
          <div
            className="absolute inset-0 -z-0"
            style={{
              background:
                "linear-gradient(to top right, #f6f8f4 0%, #fbf9f4 55%, #f2f6fa 100%)",
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-20 pt-24 sm:px-10 sm:pb-24 sm:pt-28 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pb-32 lg:pt-32">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                <span>Active Families</span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                <span>EnviroBiotics</span>
              </div>
              <h1
                className="font-bold tracking-tight text-neutral-900"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)", lineHeight: 0.92 }}
              >
                Healthy diet. Active lifestyle.
              </h1>
              <p className="mt-6 text-[20px] italic text-neutral-600">
                Add a layer of wellness. Effortlessly.
              </p>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-neutral-600">
                You eat clean. You move often. You choose better. But invisible
                contaminants and microbes still settle into fabrics, cracks, and
                everyday objects your family touches. EnviroBiotics keeps working
                in the background, so the home you built for wellness keeps up
                with the life you live.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#rooms"
                  onClick={(e) => scrollTo(e, "rooms", "click_family_hero_cta")}
                  className="group inline-flex items-center rounded-full bg-neutral-900 px-8 py-4 text-[14px] font-medium text-white transition-all hover:bg-neutral-800"
                >
                  See how it fits your home
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-neutral-500">
                {["Family safe", "No sprays or fragrance", "Runs 24/7, silently"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-[#10B981]" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[16/11] overflow-hidden rounded-[2.5rem] bg-neutral-100 shadow-2xl">
                <img
                  src={heroImg}
                  alt="Family moving through a bright, natural Scandinavian style home"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width={1600}
                  height={1100}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-emerald-100/50 blur-3xl" />
              <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full bg-amber-100/50 blur-3xl" />
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
          className="relative overflow-hidden py-24 sm:py-32"
          style={{
            backgroundImage: `url(${cleanHome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-[1000px] px-6 text-center sm:px-10">
            <div className="mx-auto max-w-[820px] rounded-2xl bg-black/45 px-8 py-12 text-white backdrop-blur-sm sm:px-12 sm:py-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                The promise
              </p>
              <h2
                className="mt-4 font-semibold tracking-tight"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.6rem)", lineHeight: 1.05, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
              >
                You do the healthy work. We handle what you cannot see.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/90">
                EnviroBiotics runs while you cook, train, work, and rest. It never
                interrupts. It just quietly makes the home a better place to keep
                being your best.
              </p>
            </div>
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
                },
                {
                  name: "Biotica 800",
                  desc: "Open living spaces and family rooms up to 800 sq ft.",
                  url: BIOTICA_URL,
                  event: "click_family_card_biotica",
                  tag: "For open plans",
                  featured: true,
                },
                {
                  name: "Home Complete Bundle",
                  desc: "Full coverage for the family home, room by room.",
                  url: BUNDLE_URL,
                  event: "click_family_card_bundle",
                  tag: "Best value",
                },
              ].map((p) => (
                <Reveal key={p.name}>
                  <div
                    className={`relative flex h-full flex-col rounded-[28px] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] sm:p-10 ${
                      p.featured ? "ring-1 ring-emerald-500/40" : ""
                    }`}
                  >
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
