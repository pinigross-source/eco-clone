import { Fragment, lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  SprayCan,
  Bug,
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
  DoorOpen,
  Sparkles,
} from "lucide-react";

const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

import roomWithout from "@/assets/bb-room-without.jpg";
import roomWith from "@/assets/bb-room-with.jpg";
import layerWide from "@/assets/bb-layer-wide.jpg";
import ctaRoom from "@/assets/bb-cta-room.jpg";
import logo from "@/assets/logo.avif";

/* ── Palette: white · navy · green ──────────────────────────────── */
const NAVY = "#14284B";
const GREEN = "#2F7D4E";
const GREEN_TINT = "#F3F7F2";
const BODY = "#42505F";
const LINE = "#E3E8EE";

const FONT = `"Poppins", "Hanken Grotesk", system-ui, -apple-system, sans-serif`;

const SHOP = "https://shop.envirobiotics.com/";

/* ── Building blocks ─────────────────────────────────────────────── */

const IconCircle = ({
  children,
  size = 88,
  tone = "navy",
}: {
  children: React.ReactNode;
  size?: number;
  tone?: "navy" | "green";
}) => (
  <div
    className="flex shrink-0 items-center justify-center rounded-full"
    style={{
      width: size,
      height: size,
      border: `1.5px solid ${tone === "green" ? "#BFDCC9" : "#D7DEE7"}`,
      color: tone === "green" ? GREEN : NAVY,
      background: "#FFFFFF",
    }}
  >
    {children}
  </div>
);

const Arrow = () => (
  <ArrowRight className="hidden h-5 w-5 shrink-0 md:block" style={{ color: "#9AA7B5" }} />
);

const PrimaryCTA = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_top"
    rel="noopener"
    className={`inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    style={{
      background: GREEN,
      color: "#FFFFFF",
      fontSize: "0.95rem",
      letterSpacing: "0.04em",
      padding: "1rem 2rem",
      minHeight: 58,
      boxShadow: "0 16px 34px -18px rgba(47,125,78,0.75)",
    }}
  >
    {children}
    <ArrowRight className="h-5 w-5" />
  </a>
);

/* Hero annotation: dot + hairline + label */
const Note = ({
  children,
  side,
}: {
  children: React.ReactNode;
  side: "left" | "right";
}) => (
  <div
    className={`hidden items-center gap-2 lg:flex ${
      side === "left" ? "flex-row-reverse text-right" : "text-left"
    }`}
  >
    <span
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{
        background: side === "left" ? "#FFFFFF" : "#8BE0A6",
        boxShadow: `0 0 0 3px ${side === "left" ? "rgba(0,0,0,0.25)" : "rgba(139,224,166,0.35)"}`,
      }}
    />
    <span className="h-px w-8 shrink-0" style={{ background: "rgba(255,255,255,0.75)" }} />
    <span
      className="max-w-[190px] rounded-md px-2.5 py-1.5 text-[13px] font-semibold leading-[1.35] backdrop-blur-[2px]"
      style={{
        color: "#FFFFFF",
        background: "rgba(15,23,32,0.62)",
        boxShadow: "0 6px 18px -8px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </span>

  </div>
);

/* Floating microbe marks on the "without" half */
const MICROBES = [
  { t: 18, l: 34, s: 26, o: 0.75 },
  { t: 30, l: 62, s: 18, o: 0.6 },
  { t: 41, l: 22, s: 22, o: 0.7 },
  { t: 52, l: 55, s: 30, o: 0.8 },
  { t: 63, l: 30, s: 18, o: 0.6 },
  { t: 72, l: 68, s: 24, o: 0.7 },
  { t: 85, l: 44, s: 20, o: 0.65 },
  { t: 25, l: 82, s: 16, o: 0.5 },
];

const BeyondBleachPage = () => {
  return (
    <div style={{ fontFamily: FONT, background: "#FFFFFF" }}>
      <Navbar />

      <main id="main-content">
        {/* ══════════ HERO ══════════ */}
        <section className="relative w-full overflow-hidden bg-white pt-[72px] sm:pt-20 lg:pt-[132px]">
          {/* Text block above the picture */}
          <div className="site-container py-8 text-center sm:py-10 lg:py-12">
            <h1
              className="font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem]"
              style={{ color: NAVY }}
            >
              Beyond
              <br />
              <span style={{ color: GREEN }}>Bleach</span>
            </h1>
            <p
              className="mx-auto mt-4 max-w-[38ch] text-[1.0625rem] leading-[1.6] sm:text-[1.1875rem] lg:mt-5 lg:max-w-[46ch] lg:text-[1.25rem]"
              style={{ color: BODY }}
            >
              Cleaning removes microbes today. EnviroBiotics helps support your environment{" "}
              <span style={{ color: GREEN, fontWeight: 700 }}>between</span> cleanings.
            </p>
            <div className="mt-6 flex justify-center lg:mt-7">
              <PrimaryCTA href="#how" className="w-full sm:w-auto">
                See how it works
              </PrimaryCTA>
            </div>
          </div>

          {/* Split image pair */}
          <div className="relative grid h-[340px] grid-cols-2 sm:h-[420px] lg:h-[540px] xl:h-[600px]">
            {/* LEFT — without */}
            <div className="relative overflow-hidden">
              <img
                src={roomWithout}
                alt="Living room without EnviroBiotics, desaturated"
                className="absolute inset-0 h-full w-full object-cover"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "rgba(30,38,48,0.28)" }}
              />
              {/* microbes */}
              {MICROBES.map((m, i) => (
                <Bug
                  key={i}
                  aria-hidden
                  className="absolute hidden lg:block"
                  style={{
                    top: `${m.t}%`,
                    left: `${m.l}%`,
                    width: m.s,
                    height: m.s,
                    color: "#1A1F26",
                    opacity: m.o,
                  }}
                />
              ))}

              {/* label */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6 lg:left-auto lg:right-6 lg:translate-x-0">
                <span
                  className="inline-block whitespace-nowrap rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[11px]"
                  style={{ background: "rgba(31,41,55,0.85)" }}
                >
                  Without EnviroBiotics
                </span>
              </div>
              {/* annotations */}
              <div className="absolute right-5 top-[50%] hidden lg:block">
                <Note side="left">Microbes return immediately</Note>
              </div>
              <div className="absolute right-5 top-[68%] hidden lg:block">
                <Note side="left">Build-up continues</Note>
              </div>
            </div>

            {/* RIGHT — with */}
            <div className="relative overflow-hidden">
              <img
                src={roomWith}
                alt="Living room with a green protective probiotic layer"
                className="absolute inset-0 h-full w-full object-cover"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6 lg:left-6 lg:translate-x-0">
                <span
                  className="inline-block whitespace-nowrap rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[11px]"
                  style={{ background: GREEN }}
                >
                  With EnviroBiotics
                </span>
              </div>
              <div className="absolute right-6 top-[38%] hidden lg:block">
                <Note side="right">Beneficial probiotics create a protective layer on surfaces</Note>
              </div>
              <div className="absolute right-6 top-[62%] hidden lg:block">
                <Note side="right">Helps maintain a healthier microbial balance</Note>
              </div>
            </div>

            {/* VS badge */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                style={{ background: "#FFFFFF", color: NAVY, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35)" }}
              >
                VS
              </span>
            </div>
          </div>
        </section>


        {/* ══════════ 2 · CLEANING IS A MOMENT IN TIME ══════════ */}
        <section id="how" className="w-full border-t" style={{ borderColor: LINE, background: "#FFFFFF" }}>
          <div className="site-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <h2
                className="font-extrabold uppercase leading-[1.06] tracking-[-0.02em] text-[2rem] sm:text-[2.5rem]"
                style={{ color: NAVY }}
              >
                Cleaning is
                <br />
                <span style={{ color: GREEN }}>a moment in time.</span>
              </h2>
              <div className="mt-6 space-y-1.5 text-[1.0625rem] leading-[1.7]" style={{ color: BODY }}>
                <p>You clean, you disinfect, you leave.</p>
                <p>But microbes start returning right away.</p>
                <p>The cycle begins again.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
              {[
                {
                  icon: <SprayCan className="h-9 w-9" strokeWidth={1.4} />,
                  title: "You clean",
                  copy: "Surfaces look clean and fresh.",
                  tone: "green" as const,
                },
                {
                  icon: <Bug className="h-9 w-9" strokeWidth={1.4} />,
                  title: "Microbes return",
                  copy: "Microorganisms return quickly and naturally.",
                  tone: "navy" as const,
                },
                {
                  icon: <Sparkles className="h-9 w-9" strokeWidth={1.4} />,
                  title: "Build-up begins",
                  copy: "Dust, residues and moisture create the perfect conditions.",
                  tone: "navy" as const,
                },
              ].map((s, i) => (
                <Fragment key={s.title}>
                  <div className="flex flex-col items-center text-center">
                    <IconCircle tone={s.tone}>{s.icon}</IconCircle>
                    <p
                      className="mt-4 text-[13px] font-bold uppercase tracking-[0.1em]"
                      style={{ color: NAVY }}
                    >
                      {s.title}
                    </p>
                    <p className="mt-2 max-w-[22ch] text-[14px] leading-[1.55]" style={{ color: BODY }}>
                      {s.copy}
                    </p>
                  </div>
                  {i < 2 && (
                    <div className="flex justify-center pt-9">
                      <Arrow />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 3 · PROTECTION THAT CONTINUES ══════════ */}
        <section className="w-full" style={{ background: GREEN_TINT }}>
          <div className="grid lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex items-center">
              <div className="w-full px-5 py-14 sm:px-8 sm:py-16 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-1440px)/2+2rem))] lg:pr-14">
                <h2
                  className="font-extrabold uppercase leading-[1.06] tracking-[-0.02em] text-[2rem] sm:text-[2.5rem]"
                  style={{ color: NAVY }}
                >
                  Protection that
                  <br />
                  <span style={{ color: GREEN }}>continues between cleanings.</span>
                </h2>
                <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.7]" style={{ color: BODY }}>
                  EnviroBiotics continuously introduces beneficial environmental probiotics
                  that settle on surfaces and help maintain a healthier microbial balance.
                </p>
                <p className="mt-2 text-[1.0625rem] font-medium" style={{ color: GREEN }}>
                  It&rsquo;s nature working for you.
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
                  {[
                    {
                      icon: <Sofa className="h-7 w-7" strokeWidth={1.4} />,
                      t1: "Covers",
                      t2: "surfaces",
                      copy: "Beneficial probiotics spread throughout the indoor environment.",
                    },
                    {
                      icon: <Leaf className="h-7 w-7" strokeWidth={1.4} />,
                      t1: "Competes",
                      t2: "naturally",
                      copy: "They compete for space and nutrients with unwanted microorganisms.",
                    },
                    {
                      icon: <Clock className="h-7 w-7" strokeWidth={1.4} />,
                      t1: "Works",
                      t2: "continuously",
                      copy: "The probiotic environment is continually supported between cleanings.",
                    },
                  ].map((f, i) => (
                    <div
                      key={f.t1}
                      className={i > 0 ? "sm:border-l sm:pl-6" : ""}
                      style={i > 0 ? { borderColor: "#D6E3DA" } : undefined}
                    >
                      <IconCircle size={64} tone="green">
                        {f.icon}
                      </IconCircle>
                      <p
                        className="mt-4 text-[13px] font-bold uppercase leading-[1.3] tracking-[0.08em]"
                        style={{ color: NAVY }}
                      >
                        {f.t1}
                        <br />
                        <span style={{ color: GREEN }}>{f.t2}</span>
                      </p>
                      <p className="mt-2 text-[14px] leading-[1.55]" style={{ color: BODY }}>
                        {f.copy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[640px]">
              <img
                src={layerWide}
                alt="Living room surfaces covered by a translucent green probiotic layer"
                className="absolute inset-0 h-full w-full object-cover"
                width={1536}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ══════════ 4 · THE DIFFERENCE ══════════ */}
        <section className="w-full bg-white">
          <div className="site-container py-16 sm:py-20 lg:py-24">
            <h2
              className="text-center font-extrabold uppercase leading-[1.15] tracking-[-0.02em] text-[1.6rem] sm:text-[2.1rem]"
              style={{ color: NAVY }}
            >
              The difference is what happens{" "}
              <span style={{ color: GREEN }}>between cleanings.</span>
            </h2>

            <div className="mt-10 space-y-4 sm:mt-12">
              {/* Traditional */}
              <div className="grid overflow-hidden rounded-xl sm:grid-cols-[210px_1fr]" style={{ background: "#F5F7FA" }}>
                <div
                  className="flex items-center px-6 py-5 text-[15px] font-bold uppercase leading-[1.2] tracking-[0.04em] text-white sm:py-8"
                  style={{ background: NAVY }}
                >
                  Traditional
                  <br className="hidden sm:block" /> cleaning
                </div>
                <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  {[
                    { icon: <SprayCan className="h-6 w-6" strokeWidth={1.4} />, label: "Clean" },
                    { icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />, label: "Disinfect" },
                    { icon: <DoorOpen className="h-6 w-6" strokeWidth={1.4} />, label: "Leave" },
                    { icon: <Bug className="h-6 w-6" strokeWidth={1.4} />, label: "" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <IconCircle size={56}>{s.icon}</IconCircle>
                      {s.label && (
                        <span
                          className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                          style={{ color: NAVY }}
                        >
                          {s.label}
                        </span>
                      )}
                      {i < 3 && <Arrow />}
                    </div>
                  ))}
                  <div className="sm:ml-2">
                    <p
                      className="text-[13px] font-bold uppercase tracking-[0.08em]"
                      style={{ color: NAVY }}
                    >
                      Microbes return
                    </p>
                    <p className="text-[13px]" style={{ color: BODY }}>
                      The cycle starts again.
                    </p>
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="flex justify-center">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold"
                  style={{ background: "#FFFFFF", color: NAVY, border: `1px solid ${LINE}` }}
                >
                  VS
                </span>
              </div>

              {/* EnviroBiotics */}
              <div className="grid overflow-hidden rounded-xl sm:grid-cols-[210px_1fr]" style={{ background: GREEN_TINT }}>
                <div
                  className="flex items-center px-6 py-5 text-[15px] font-bold uppercase leading-[1.2] tracking-[0.04em] text-white sm:py-8"
                  style={{ background: GREEN }}
                >
                  EnviroBiotics
                </div>
                <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <div className="flex items-center gap-4">
                    <IconCircle size={56} tone="green">
                      <SprayCan className="h-6 w-6" strokeWidth={1.4} />
                    </IconCircle>
                    <span
                      className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: NAVY }}
                    >
                      Clean
                    </span>
                    <Arrow />
                  </div>
                  <div className="flex items-center gap-4">
                    <IconCircle size={56} tone="green">
                      <Leaf className="h-6 w-6" strokeWidth={1.4} />
                    </IconCircle>
                    <span
                      className="max-w-[12ch] text-[13px] font-semibold uppercase leading-[1.3] tracking-[0.08em]"
                      style={{ color: GREEN }}
                    >
                      Introduce probiotics
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-px w-16 md:block"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg, ${GREEN} 0 6px, transparent 6px 12px)`,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <IconCircle size={56} tone="green">
                      <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />
                    </IconCircle>
                    <div>
                      <p
                        className="max-w-[16ch] text-[13px] font-bold uppercase leading-[1.3] tracking-[0.08em]"
                        style={{ color: GREEN }}
                      >
                        Continuous environmental support
                      </p>
                      <p className="text-[13px]" style={{ color: BODY }}>
                        Protection that works between cleanings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 5 · FINAL CTA ══════════ */}
        <section className="relative w-full overflow-hidden" style={{ background: NAVY }}>
          <img
            src={ctaRoom}
            alt="Bright living room protected by environmental probiotics"
            className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-[62%]"
            width={1536}
            height={1024}
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,40,75,0.97) 0%, rgba(20,40,75,0.92) 38%, rgba(20,40,75,0.35) 62%, rgba(20,40,75,0.05) 100%)",
            }}
          />
          <div className="site-container relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-extrabold uppercase leading-[1.1] tracking-[-0.02em] text-[1.9rem] sm:text-[2.4rem] text-white">
                  Your indoor environment
                  <br />
                  never stops changing.
                  <br />
                  <span style={{ color: "#7ED09B" }}>Why should your protection?</span>
                </h2>
                <div className="mt-6 flex items-center gap-3">
                  <Leaf className="h-5 w-5" style={{ color: "#7ED09B" }} strokeWidth={1.5} />
                  <span className="h-px w-24" style={{ background: "rgba(255,255,255,0.35)" }} />
                </div>
                <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-[1.7] text-white/85">
                  Discover continuous environmental probiotics for your home.
                </p>
              </div>
              <div className="lg:flex lg:justify-center">
                <PrimaryCTA href={SHOP} className="w-full lg:w-auto">
                  Find the right EnviroBiotics system
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ TRUST STRIP ══════════ */}
        <section className="w-full border-b bg-white" style={{ borderColor: LINE }}>
          <div className="site-container grid gap-8 py-10 sm:grid-cols-2 sm:gap-0 lg:grid-cols-4">
            {[
              {
                icon: <Leaf className="h-6 w-6" strokeWidth={1.4} />,
                title: "Natural",
                copy: "Safe for your family, pets and home.",
              },
              {
                icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />,
                title: "Effective",
                copy: "Designed to support a healthier environment.",
              },
              {
                icon: <Clock className="h-6 w-6" strokeWidth={1.4} />,
                title: "24/7 Support",
                copy: "Works continuously between cleanings.",
              },
              {
                icon: <Home className="h-6 w-6" strokeWidth={1.4} />,
                title: "For the spaces where you live",
                copy: "Home, office and everywhere in between.",
              },
            ].map((t, i) => (
              <div
                key={t.title}
                className={`flex items-start gap-4 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
                style={i > 0 ? { borderColor: LINE } : undefined}
              >
                <IconCircle size={52} tone="green">
                  {t.icon}
                </IconCircle>
                <div className="min-w-0">
                  <p
                    className="text-[13px] font-bold uppercase leading-[1.25] tracking-[0.08em]"
                    style={{ color: NAVY }}
                  >
                    {t.title}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5]" style={{ color: BODY }}>
                    {t.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ APPLICATIONS ══════════ */}
        <section className="w-full bg-white">
          <div className="site-container grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
            <div>
              <p
                className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] lg:text-left"
                style={{ color: NAVY }}
              >
                Designed for the spaces where you spend your life
              </p>
              <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
                {[
                  { icon: <Home className="h-6 w-6" strokeWidth={1.4} />, label: "Home" },
                  { icon: <Building2 className="h-6 w-6" strokeWidth={1.4} />, label: "Offices" },
                  { icon: <GraduationCap className="h-6 w-6" strokeWidth={1.4} />, label: "Schools" },
                  { icon: <BedDouble className="h-6 w-6" strokeWidth={1.4} />, label: "Hospitality" },
                  { icon: <HeartPulse className="h-6 w-6" strokeWidth={1.4} />, label: "Healthcare" },
                  { icon: <Store className="h-6 w-6" strokeWidth={1.4} />, label: "Commercial spaces" },
                ].map((a) => (
                  <div key={a.label} className="flex flex-col items-center text-center">
                    <span style={{ color: NAVY }}>{a.icon}</span>
                    <span
                      className="mt-2 text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.08em]"
                      style={{ color: NAVY }}
                    >
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 lg:items-end lg:border-l lg:pl-14" style={{ borderColor: LINE }}>
              <img src={logo} alt="EnviroBiotics" className="h-9 w-auto" loading="lazy" />
              <p
                className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: GREEN }}
              >
                Continuous. Natural. Proactive.
              </p>
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
