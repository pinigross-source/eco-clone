import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";
import {
  ArrowRight,
  SprayCan,
  Bug,
  Layers,
  Leaf,
  Clock,
  ShieldCheck,
  Sofa,
  Home,
  Building2,
  GraduationCap,
  BedDouble,
  HeartPulse,
  Store,
  Repeat,
} from "lucide-react";

const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

import roomWithout from "@/assets/bb-room-without.jpg";
import roomWith from "@/assets/bb-room-with.jpg";
import layerWide from "@/assets/bb-layer-wide.jpg";
import ctaRoom from "@/assets/bb-cta-room.jpg";

/* ── Palette: white · navy · green ──────────────────────────────── */
const NAVY = "#14284B";
const GREEN = "#2F7D4E";
const GREEN_SOFT = "#EDF5F0";
const BODY = "#3C4A5A";

const FONT = `"Poppins", "Hanken Grotesk", system-ui, -apple-system, sans-serif`;

const SHOP = "https://shop.envirobiotics.com/";

/* ── Small building blocks ───────────────────────────────────────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[11px] sm:text-xs font-semibold uppercase"
    style={{ letterSpacing: "0.22em", color: GREEN }}
  >
    {children}
  </p>
);

const H2 = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`font-bold tracking-[-0.02em] leading-[1.08] text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] ${className}`}
    style={{ fontFamily: FONT, color: NAVY }}
  >
    {children}
  </h2>
);

const Body = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={`text-[1.0625rem] sm:text-[1.125rem] lg:text-[1.25rem] leading-[1.65] ${className}`}
    style={{ color: BODY }}
  >
    {children}
  </p>
);

const PrimaryCTA = ({
  href,
  children,
  full = false,
}: {
  href: string;
  children: React.ReactNode;
  full?: boolean;
}) => (
  <a
    href={href}
    target="_top"
    rel="noopener"
    className={`inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase transition-transform duration-300 hover:-translate-y-0.5 ${
      full ? "w-full sm:w-auto" : ""
    }`}
    style={{
      background: GREEN,
      color: "#FFFFFF",
      fontSize: "0.95rem",
      letterSpacing: "0.08em",
      padding: "1.05rem 2.1rem",
      minHeight: 60,
      boxShadow: "0 16px 34px -16px rgba(47,125,78,0.7)",
    }}
  >
    {children}
    <ArrowRight className="h-5 w-5" />
  </a>
);

const RoomLabel = ({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "dark" | "green";
}) => (
  <span
    className="inline-flex items-center rounded-full px-4 py-2 text-[10px] sm:text-[11px] font-semibold uppercase"
    style={{
      letterSpacing: "0.16em",
      background: tone === "green" ? GREEN : "rgba(20,40,75,0.88)",
      color: "#FFFFFF",
    }}
  >
    {children}
  </span>
);

/* ── Page ────────────────────────────────────────────────────────── */

const BeyondBleachPage = () => {
  return (
    <div style={{ background: "#FFFFFF", fontFamily: FONT }}>
      <Navbar />

      <main id="main-content">
        {/* ───────────── HERO ───────────── */}
        <section className="relative w-full overflow-hidden pt-16 sm:pt-20">
          {/* Split imagery */}
          <div className="grid grid-cols-2 w-full h-[42vh] min-h-[260px] max-h-[420px] sm:h-[52vh] sm:max-h-[520px] lg:h-[76vh] lg:min-h-[600px] lg:max-h-[760px]">
            <div className="relative">
              <img
                src={roomWithout}
                alt="Living room without EnviroBiotics, microbes returning to surfaces after cleaning"
                className="absolute inset-0 h-full w-full object-cover"
                width={1280}
                height={1280}
                fetchPriority="high"
                decoding="async"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "rgba(20,40,75,0.18)" }}
              />
              {/* microbe dots */}
              <div aria-hidden="true" className="absolute inset-0">
                {[
                  [22, 30],
                  [46, 18],
                  [68, 38],
                  [34, 58],
                  [58, 70],
                  [80, 60],
                  [16, 74],
                ].map(([l, t], i) => (
                  <span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${l}%`,
                      top: `${t}%`,
                      width: 10,
                      height: 10,
                      background: "rgba(20,40,75,0.55)",
                      boxShadow: "0 0 0 6px rgba(20,40,75,0.12)",
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:hidden">
                <RoomLabel tone="dark">Without</RoomLabel>
              </div>
              <div className="absolute top-24 right-8 hidden lg:block">
                <RoomLabel tone="dark">Without EnviroBiotics</RoomLabel>
              </div>
            </div>

            <div className="relative">
              <img
                src={roomWith}
                alt="The same living room with a translucent green probiotic layer covering the sofa, table and floor"
                className="absolute inset-0 h-full w-full object-cover"
                width={1280}
                height={1280}
                decoding="async"
              />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-24 lg:left-8">
                <RoomLabel tone="green">
                  <span className="lg:hidden">With</span>
                  <span className="hidden lg:inline">With EnviroBiotics</span>
                </RoomLabel>
              </div>
            </div>
          </div>

          {/* Desktop overlay copy */}
          <div className="hidden lg:block pointer-events-none absolute inset-0">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[58%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="site-container relative h-full flex items-center">
              <div className="max-w-[560px] pointer-events-auto">
                <h1
                  className="font-bold tracking-[-0.03em] leading-[0.95] text-[4.5rem] xl:text-[5.25rem]"
                  style={{ color: NAVY }}
                >
                  BEYOND
                  <br />
                  <span style={{ color: GREEN }}>BLEACH</span>
                </h1>
                <p
                  className="mt-6 text-[1.3rem] leading-[1.5] max-w-[27ch]"
                  style={{ color: BODY }}
                >
                  Cleaning removes microbes today. EnviroBiotics helps support
                  your environment{" "}
                  <span style={{ color: GREEN, fontWeight: 600 }}>between</span>{" "}
                  cleanings.
                </p>
                <div className="mt-9">
                  <PrimaryCTA href="#how">See how it works</PrimaryCTA>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / tablet copy on solid white */}
          <div className="lg:hidden site-container py-10 sm:py-14 text-center">
            <h1
              className="font-bold tracking-[-0.03em] leading-[0.95] text-[3rem] sm:text-[4rem]"
              style={{ color: NAVY }}
            >
              BEYOND
              <br />
              <span style={{ color: GREEN }}>BLEACH</span>
            </h1>
            <Body className="mt-5 mx-auto max-w-[34ch]">
              Cleaning removes microbes today. EnviroBiotics helps support your
              environment between cleanings.
            </Body>
            <div className="mt-8">
              <a
                href="#how"
                className="flex w-full items-center justify-center gap-3 rounded-full font-semibold uppercase"
                style={{
                  background: GREEN,
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  letterSpacing: "0.08em",
                  minHeight: 60,
                }}
              >
                See how it works
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* ───────────── 2 · THE PROBLEM ───────────── */}
        <section id="how" className="py-20 sm:py-28 lg:py-36">
          <div className="site-container">
            <ScrollReveal>
              <div className="max-w-[760px]">
                <Eyebrow>The reality</Eyebrow>
                <H2 className="mt-5">Cleaning is a moment in time.</H2>
                <Body className="mt-7 max-w-[52ch]">
                  You clean. You disinfect. You leave.
                </Body>
                <Body className="mt-4 max-w-[52ch]">
                  But your indoor environment keeps changing. Microorganisms,
                  dust, moisture, people, pets and outdoor air continue to
                  interact with the surfaces around you.
                </Body>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="mt-14 sm:mt-20 grid gap-8 sm:gap-6 sm:grid-cols-3 max-w-[980px]">
                {[
                  { icon: SprayCan, label: "You clean" },
                  { icon: Bug, label: "Microbes return" },
                  { icon: Layers, label: "Build-up begins" },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={label} className="flex items-center gap-5 sm:block">
                    <div
                      className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full"
                      style={{ background: GREEN_SOFT }}
                    >
                      <Icon
                        className="h-9 w-9 sm:h-10 sm:w-10"
                        style={{ color: GREEN }}
                        strokeWidth={1.4}
                      />
                    </div>
                    <p
                      className="sm:mt-6 text-[1.05rem] sm:text-[1.15rem] font-semibold uppercase"
                      style={{ letterSpacing: "0.08em", color: NAVY }}
                    >
                      {label}
                    </p>
                    {i < 2 && (
                      <span
                        aria-hidden="true"
                        className="hidden sm:block mt-4 h-px w-16"
                        style={{ background: "rgba(20,40,75,0.18)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────── 3 · THE DIFFERENCE ───────────── */}
        <section style={{ background: GREEN_SOFT }} className="py-20 sm:py-28 lg:py-32">
          <div className="site-container">
            <ScrollReveal>
              <H2 className="max-w-[16ch]">
                Protection that continues between cleanings.
              </H2>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <div className="mt-10 sm:mt-14 overflow-hidden rounded-[24px]">
                <img
                  src={layerWide}
                  alt="Bright living room where a translucent green probiotic layer coats the sofa, table and floor"
                  className="w-full h-[280px] sm:h-[420px] lg:h-[560px] object-cover"
                  width={1600}
                  height={1104}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <Body className="mt-10 max-w-[62ch]">
                EnviroBiotics continuously introduces beneficial environmental
                probiotics that settle on indoor surfaces and help support
                microbial balance.
              </Body>
            </ScrollReveal>

            <div className="mt-14 grid gap-10 sm:gap-8 md:grid-cols-3">
              {[
                {
                  icon: Sofa,
                  title: "Covers surfaces",
                  copy: "Beneficial probiotics spread throughout the indoor environment.",
                },
                {
                  icon: Leaf,
                  title: "Competes naturally",
                  copy: "They compete for available space and nutrients.",
                },
                {
                  icon: Clock,
                  title: "Works continuously",
                  copy: "The probiotic environment is continually supported between regular cleanings.",
                },
              ].map(({ icon: Icon, title, copy }, i) => (
                <ScrollReveal key={title} delay={140 + i * 80}>
                  <div>
                    <Icon
                      className="h-11 w-11"
                      style={{ color: GREEN }}
                      strokeWidth={1.3}
                    />
                    <h3
                      className="mt-6 text-[1.15rem] font-semibold uppercase"
                      style={{ letterSpacing: "0.1em", color: NAVY }}
                    >
                      {title}
                    </h3>
                    <Body className="mt-3 max-w-[34ch]">{copy}</Body>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── 4 · SIMPLE COMPARISON ───────────── */}
        <section className="py-20 sm:py-28 lg:py-32">
          <div className="site-container">
            <ScrollReveal>
              <H2 className="max-w-[18ch]">
                The difference is what happens between cleanings.
              </H2>
            </ScrollReveal>

            {/* Row 1 */}
            <ScrollReveal delay={80}>
              <div
                className="mt-12 rounded-[22px] p-7 sm:p-9"
                style={{ background: "#F4F6F9" }}
              >
                <p
                  className="text-[1.05rem] font-semibold uppercase"
                  style={{ letterSpacing: "0.14em", color: NAVY }}
                >
                  Traditional cleaning
                </p>
                <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
                  {["Clean", "Disinfect", "Leave", "Microbes return"].map(
                    (step, i) => (
                      <div
                        key={step}
                        className="flex items-center gap-4 lg:gap-5"
                      >
                        <span
                          className="rounded-full px-5 py-3 text-[0.95rem] sm:text-[1.05rem] font-medium bg-white"
                          style={{ color: NAVY }}
                        >
                          {step}
                        </span>
                        {i < 3 && (
                          <ArrowRight
                            className="h-5 w-5 shrink-0"
                            style={{ color: "rgba(20,40,75,0.4)" }}
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
                <p
                  className="mt-7 flex items-center gap-2 text-[0.95rem] font-semibold uppercase"
                  style={{ letterSpacing: "0.12em", color: "rgba(20,40,75,0.6)" }}
                >
                  <Repeat className="h-4 w-4" />
                  The cycle starts again
                </p>
              </div>
            </ScrollReveal>

            {/* Row 2 */}
            <ScrollReveal delay={140}>
              <div
                className="mt-6 rounded-[22px] p-7 sm:p-9"
                style={{ background: GREEN }}
              >
                <p
                  className="text-[1.05rem] font-semibold uppercase text-white"
                  style={{ letterSpacing: "0.14em" }}
                >
                  EnviroBiotics
                </p>
                <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
                  {[
                    "Clean",
                    "Introduce environmental probiotics",
                    "Continuous environmental support",
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-4 lg:gap-5">
                      <span
                        className="rounded-full px-5 py-3 text-[0.95rem] sm:text-[1.05rem] font-medium"
                        style={{
                          background: "rgba(255,255,255,0.16)",
                          color: "#FFFFFF",
                        }}
                      >
                        {step}
                      </span>
                      {i < 2 && (
                        <ArrowRight
                          className="h-5 w-5 shrink-0"
                          style={{ color: "rgba(255,255,255,0.7)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p
                  className="mt-7 flex items-center gap-2 text-[0.95rem] font-semibold uppercase"
                  style={{ letterSpacing: "0.12em", color: "rgba(255,255,255,0.9)" }}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Works between cleanings
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───────────── 5 · FINAL CTA ───────────── */}
        <section className="relative overflow-hidden" style={{ background: NAVY }}>
          <img
            src={ctaRoom}
            alt="Modern home interior with a soft green protective layer across the floor and furniture"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={912}
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,40,75,0.96) 0%, rgba(20,40,75,0.9) 45%, rgba(20,40,75,0.55) 100%)",
            }}
          />
          <div className="site-container relative py-20 sm:py-28 lg:py-36">
            <div className="max-w-[720px]">
              <h2
                className="font-bold tracking-[-0.02em] leading-[1.08] text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] text-white"
              >
                Your indoor environment never stops changing.
                <br />
                <span style={{ color: "#7BD3A0" }}>
                  Why should your protection?
                </span>
              </h2>
              <p
                className="mt-6 text-[1.0625rem] sm:text-[1.25rem] leading-[1.6] max-w-[46ch]"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Discover continuous environmental probiotics for your home.
              </p>
              <div className="mt-10">
                <PrimaryCTA href={SHOP} full>
                  Find the right EnviroBiotics system
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── TRUST STRIP ───────────── */}
        <section className="py-16 sm:py-20">
          <div className="site-container grid gap-10 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Leaf,
                title: "Natural",
                copy: "Designed for everyday indoor environments.",
              },
              {
                icon: Clock,
                title: "Continuous",
                copy: "Works between regular cleanings.",
              },
              {
                icon: Sofa,
                title: "Surface-focused",
                copy: "Supports the spaces and objects around you.",
              },
              {
                icon: Home,
                title: "For the spaces where you live",
                copy: "Home, office, school, hospitality and more.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex items-start gap-4">
                <Icon
                  className="h-8 w-8 shrink-0"
                  style={{ color: GREEN }}
                  strokeWidth={1.4}
                />
                <div className="min-w-0">
                  <h3
                    className="text-[0.95rem] font-semibold uppercase"
                    style={{ letterSpacing: "0.1em", color: NAVY }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 text-[1rem] leading-[1.55]"
                    style={{ color: BODY }}
                  >
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────── APPLICATIONS ───────────── */}
        <section
          className="py-14 sm:py-16 border-t"
          style={{ borderColor: "rgba(20,40,75,0.1)" }}
        >
          <div className="site-container text-center">
            <p
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold uppercase"
              style={{ letterSpacing: "0.18em", color: NAVY }}
            >
              Designed for the spaces where you spend your life
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: Home, label: "Home" },
                { icon: Building2, label: "Offices" },
                { icon: GraduationCap, label: "Schools" },
                { icon: BedDouble, label: "Hospitality" },
                { icon: HeartPulse, label: "Healthcare" },
                { icon: Store, label: "Commercial spaces" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <Icon
                    className="h-8 w-8"
                    style={{ color: GREEN }}
                    strokeWidth={1.3}
                  />
                  <span
                    className="text-[0.8rem] font-medium uppercase"
                    style={{ letterSpacing: "0.1em", color: NAVY }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 text-[0.95rem] font-semibold uppercase"
                style={{ letterSpacing: "0.1em", color: GREEN }}
              >
                Explore all systems
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BeyondBleachPage;
