import { Fragment, lazy, Suspense, useState } from "react";
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
  CircleDashed,
  Wind,
  Star,
  Check,
  X,
  Phone,
  FlaskConical,
  Baby,
  HelpCircle,
  Power,
  RefreshCw,
  Play,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

import roomWithout from "@/assets/bb-room-without.jpg";
import roomWith from "@/assets/bb-room-with.jpg";
import ctaRoom from "@/assets/bb-cta-room.jpg";
import logo from "@/assets/logo.avif";
import miniLifestyle from "@/assets/biologic-mini-landscape.jpg.asset.json";
import bioticaLifestyle from "@/assets/biotica-800-landscape.jpg.asset.json";
import protectionBiotica from "@/assets/protection-biotica.png.asset.json";


const miniLifestyleUrl = miniLifestyle.url;
const bioticaLifestyleUrl = bioticaLifestyle.url;



/* ── Palette ─────────────────────────────────────────────────────── */
const NAVY = "#16305B";
const GREEN = "#2E9E5B";
const GREEN_DEEP = "#1D8A4E";
const PALE = "#EDF3EE";
const ORANGE = "#E8823C";
const BODY = "#2E3B4A";
const GREY = "#5A6470";
const LINE = "#E3E8EE";

const FONT_HEAD = `"Poppins", system-ui, -apple-system, sans-serif`;
const FONT_BODY = `"Inter", system-ui, -apple-system, sans-serif`;

const SHOP = "https://shop.envirobiotics.com/";
const PHONE = "(833) 692-3883";
const PHONE_HREF = "tel:+18336923883";

/* ── Placeholder rendering: [[text]] → dotted grey underline ─────── */
const PH = ({ children }: { children: string }) => (
  <span
    style={{
      textDecoration: "underline",
      textDecorationStyle: "dotted",
      textDecorationColor: "#96A0AA",
      textUnderlineOffset: "3px",
    }}
  >
    {children}
  </span>
);

const T = ({ children }: { children: string }) => (
  <>
    {children.split(/(\[\[[^\]]*\]\])/g).map((part, i) =>
      part.startsWith("[[") && part.endsWith("]]") ? (
        <PH key={i}>{part.slice(2, -2)}</PH>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    )}
  </>
);

/* ── Building blocks ─────────────────────────────────────────────── */

const IconCircle = ({
  children,
  size = 72,
  tone = "navy",
}: {
  children: React.ReactNode;
  size?: number;
  tone?: "navy" | "green";
}) => (
  <div
    aria-hidden
    className="flex shrink-0 items-center justify-center rounded-full"
    style={{
      width: size,
      height: size,
      border: `1px solid ${tone === "green" ? "#BFDCC9" : "#D7DEE7"}`,
      color: tone === "green" ? GREEN : NAVY,
      background: "#FFFFFF",
    }}
  >
    {children}
  </div>
);

const Arrow = () => (
  <ArrowRight aria-hidden className="hidden h-5 w-5 shrink-0 md:block" style={{ color: "#9AA7B5" }} />
);

const PILL_BASE =
  "bb-focus inline-flex items-center justify-center gap-3 rounded-full font-semibold uppercase transition-transform duration-300 hover:-translate-y-0.5 w-full sm:w-auto";

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
    className={`${PILL_BASE} ${className}`}
    style={{
      background: GREEN,
      color: "#FFFFFF",
      fontSize: "0.95rem",
      letterSpacing: "0.04em",
      padding: "1rem 2rem",
      minHeight: 56,
      height: 56,
      boxSizing: "border-box",
      border: "1px solid transparent",
      boxShadow: "0 16px 34px -18px rgba(46,158,91,0.75)",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DEEP)}
    onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
  >
    {children}
    <ArrowRight aria-hidden className="h-5 w-5" />
  </a>
);

const OutlineCTA = ({
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
    className={`${PILL_BASE} ${className}`}
    style={{
      border: `1px solid rgba(22,48,91,0.35)`,
      color: NAVY,
      background: "#FFFFFF",
      fontSize: "0.95rem",
      letterSpacing: "0.04em",
      padding: "1rem 2rem",
      minHeight: 56,
      height: 56,
      boxSizing: "border-box",
      boxShadow: "0 16px 34px -18px rgba(22,48,91,0.20)",
    }}
  >
    {children}
    <ArrowRight aria-hidden className="h-5 w-5" />
  </a>
);

/* Circular icon + label + caption */
const IconStat = ({
  icon,
  label,
  caption,
  size = 72,
  tone = "green",
  className = "",
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  caption: React.ReactNode;
  size?: number;
  tone?: "navy" | "green";
  className?: string;
}) => (
  <div className={`flex flex-col items-center text-center ${className}`}>
    <IconCircle size={size} tone={tone}>
      {icon}
    </IconCircle>
    <p
      className="mt-4 text-[15px] font-bold uppercase leading-[1.3] tracking-[0.08em]"
      style={{ color: NAVY }}
    >
      {label}
    </p>
    <p className="mt-2 text-[15px] leading-[1.6]" style={{ color: GREY }}>
      {caption}
    </p>
  </div>
);


const PLACES = [
  "Sofa cushions",
  "Mattresses",
  "Curtains and blinds",
  "Carpet and rugs",
  "Grout lines",
  "Behind the toilet",
  "Inside the hamper",
  "Pet beds and crates",
  "Vents and returns",
  "Under the fridge",
  "Basement walls",
  "Car interiors",
];

const TABLE_ROWS: [string, string, string][] = [
  ["Step 1", "Clean", "Clean"],
  ["Step 2", "Disinfect with toxic chemicals", "Introduce beneficial probiotics"],
  ["Step 3", "Surfaces momentarily sit empty", "Beneficial probiotics occupy surfaces"],
  ["Step 4", "Microorganisms return", "Competition for food begins immediately"],
  [
    "Step 5",
    "Pathogenic buildup returns",
    "Probiotics outcompete pathogens, reducing their buildup",
  ],
  ["Step 6", "Odors return", "Fresher, balanced environment maintained"],
  ["Step 7", "Repeat the cycle", "Continuous balanced environment created"],
];


// Real verified reviews from the EnviroBiotics Shopify store (Judge.me).
const REVIEWS: [string, string][] = [
  [
    "EnviroBiotics has made a huge difference in the quality of my sleep. I no longer wake up stuffy, congested, or exhausted. I highly recommend their products.",
    "Greg H., MD. Verified buyer",
  ],
  [
    "Excellent product, keeps my bedroom fresh and free of pathogens. Better then any filter!",
    "Zvi Sharf. Verified buyer",
  ],
  [
    "I've been allergic to cats and dogs my whole life, and my family insisted on getting them anyway. Getting it up and running was straightforward and fit easily into my home without disrupting daily life. Once I implemented the environmental probiotics, my indoor environment genuinely changed and I felt tremendous relief from my allergies.",
    "Randy W. Verified buyer",
  ],
];


const BeyondBleachPage = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div style={{ fontFamily: FONT_BODY, background: "#FFFFFF", fontSize: 18, lineHeight: 1.6 }}>
      <style>{`
        .bb-focus:focus-visible { outline: 3px solid ${ORANGE}; outline-offset: 3px; }
        .bb-page :focus-visible { outline: 3px solid ${ORANGE}; outline-offset: 3px; }
        .bb-head { font-family: ${FONT_HEAD}; font-weight: 700; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1.06; }
        @media (prefers-reduced-motion: reduce) {
          .bb-page *, .bb-page *::before, .bb-page *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
          .bb-focus:hover { transform: none !important; }
        }
      `}</style>



      <div className="bb-page">
        <Navbar />

        {/* Phone number strip: visible tel: link alongside the nav */}
        <div
          className="w-full pt-[100px] lg:pt-[120px]"
          style={{ background: "#F2F2F0", borderBottom: `1px solid ${LINE}` }}
        >
          <div className="site-container flex justify-center py-2 lg:justify-end">

            <a
              href={PHONE_HREF}
              className="bb-focus inline-flex items-center gap-2 text-[15px] font-semibold"
              style={{ color: NAVY }}
            >
              <Phone aria-hidden className="h-4 w-4" />
              {PHONE}
            </a>
          </div>
        </div>

        <main id="main-content">
          {/* ══════════ 2 · HERO ══════════ */}
          <section className="relative w-full overflow-hidden bg-white pt-6 sm:pt-8 lg:pt-10">
            <div className="site-container py-8 text-center sm:py-10 lg:py-12">
              <h1
                className="bb-head text-[2.8rem] sm:text-[3.6rem] lg:text-[4.4rem]"
                style={{ color: NAVY, fontWeight: 800, lineHeight: 0.95 }}
              >
                Beyond
                <br />
                <span style={{ color: GREEN }}>Bleach</span>
              </h1>

              <p
                className="mx-auto mt-5 max-w-[52ch] text-[1.15rem] leading-[1.6] sm:text-[1.3rem]"
                style={{ color: BODY, fontWeight: 600 }}
              >
                Cleaning doesn&rsquo;t stop what happens tomorrow.
              </p>
              <p
                className="mx-auto mt-4 max-w-[56ch] text-[1.0625rem] leading-[1.6] sm:text-[1.125rem]"
                style={{ color: GREY }}
              >
                You clean today. Tomorrow your indoor environment begins changing again.
                Microorganisms return. Dust returns. Odors return. The question isn&rsquo;t{" "}
                <strong style={{ color: BODY }}>whether</strong> they&rsquo;ll return. It&rsquo;s{" "}
                <strong style={{ color: BODY }}>what returns first.</strong>
              </p>
              <p
                className="mx-auto mt-4 max-w-[56ch] text-[1.0625rem] font-semibold leading-[1.6] sm:text-[1.125rem]"
                style={{ color: NAVY }}
              >
                What if your home could continuously help protect itself between cleanings?
                That&rsquo;s where EnviroBiotics is different.
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <PrimaryCTA href={SHOP}>Shop EnviroBiotics</PrimaryCTA>
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className={PILL_BASE}
                  style={{
                    border: `1px solid rgba(22,48,91,0.35)`,
                    color: NAVY,
                    background: "#FFFFFF",
                    fontSize: "0.95rem",
                    letterSpacing: "0.04em",
                    padding: "1rem 2rem",
                    minHeight: 56,
                  }}
                >
                  <Play aria-hidden className="h-5 w-5" />
                  See how it works
                </button>
              </div>

              <p className="mt-5 text-[15px] leading-[1.6]" style={{ color: GREY }}>
                <span aria-hidden style={{ color: ORANGE }}>
                  ★★★★★
                </span>{" "}
                Rated by families across North America · 30-day money back guarantee
              </p>

            </div>

            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:text-white [&>button]:hover:text-white/80">
                <div className="aspect-video w-full">
                  {videoOpen && (
                    <iframe
                      src="https://player.vimeo.com/video/1041721190?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                      title="How EnviroBiotics Works"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </section>

          {/* ══════════ 3 · BEFORE / AFTER BAND ══════════ */}
          <section className="relative grid grid-cols-1 sm:grid-cols-2">
            {/* LEFT */}
            <div className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[560px]">
              <img
                src={roomWithout}
                alt="Living room shown in grayscale without EnviroBiotics"
                className="absolute inset-0 h-full w-full object-cover"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "rgba(20,26,34,0.34)" }} />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6 lg:left-auto lg:right-6 lg:translate-x-0">
                <span
                  className="inline-block whitespace-nowrap rounded-md px-3 py-1.5 text-[15px] font-semibold uppercase tracking-[0.1em] text-white"
                  style={{ background: "rgba(10,14,20,0.9)" }}
                >
                  Without EnviroBiotics
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 lg:left-auto lg:right-6 lg:max-w-[280px]">
                <p
                  className="rounded-md px-3 py-2 text-[15px] font-semibold leading-[1.4] text-white"
                  style={{ background: "rgba(10,14,20,0.9)" }}
                >
                  The surface is left empty and Nothing competing for it
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[560px]">
              <img
                src={roomWith}
                alt="Living room with a green protective probiotic layer over the surfaces"
                className="absolute inset-0 h-full w-full object-cover"
                width={1024}
                height={1024}
                fetchPriority="high"
              />
              <div className="absolute left-1/2 top-4 -translate-x-1/2 sm:top-6 lg:left-6 lg:translate-x-0">
                <span
                  className="inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-[15px] font-semibold uppercase tracking-[0.1em] text-white"
                  style={{ background: GREEN_DEEP }}
                >
                  With EnviroBiotics
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 lg:left-auto lg:right-6 lg:max-w-[280px]">
                <p
                  className="rounded-md px-3 py-2 text-[15px] font-semibold leading-[1.4] text-white"
                  style={{ background: "rgba(10,14,20,0.9)" }}
                >
                  Beneficial probiotics already established
                </p>
              </div>
            </div>

            {/* VS badge */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
              <span
                aria-hidden
                className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                style={{ background: "#FFFFFF", color: NAVY, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35)" }}
              >
                VS
              </span>
            </div>
          </section>

          {/* ══════════ 3B · FIGHTING NATURE ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container py-16 sm:py-20 lg:py-24">
              <h2
                className="bb-head mx-auto max-w-[24ch] text-center text-[1.9rem] sm:text-[2.4rem]"
                style={{ color: NAVY, lineHeight: 1.12 }}
              >
                We&rsquo;ve been fighting nature for more than 100 years.
                <br />
                <span style={{ color: GREEN }}>Maybe it&rsquo;s time to work with it instead.</span>
              </h2>
              <div
                className="mx-auto mt-8 max-w-[68ch] space-y-4 text-[18px] leading-[1.65]"
                style={{ color: BODY }}
              >
                <p>
                  For generations we&rsquo;ve been taught that creating a healthy home is simple.{" "}
                  <strong>Kill the germs.</strong>
                </p>
                <p>
                  That philosophy changed medicine forever. It helped stop infectious diseases. It
                  made surgery safer. It transformed public health. It saved millions of lives.
                </p>
                <p>
                  But today science recognizes something equally important.{" "}
                  <strong>Not all microorganisms are harmful.</strong> Many are beneficial and
                  classified as probiotics.
                </p>
                <p>
                  In fact, trillions of beneficial bacteria live inside your body, helping regulate
                  digestion, immunity, metabolism and many other essential functions.
                </p>
                <p style={{ color: NAVY, fontWeight: 600 }}>
                  So why do we still treat our homes as though every microorganism should be
                  eliminated?
                </p>
              </div>
            </div>
          </section>

          {/* ══════════ 4 · CLEANING IS A MOMENT IN TIME ══════════ */}
          <section id="how" className="w-full bg-white">
            <div className="site-container grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:py-24">
              <div>
                <h2 className="bb-head text-[2rem] sm:text-[2.5rem]" style={{ color: NAVY }}>
                  Cleaning only lasts
                  <br />
                  <span style={{ color: GREEN }}>a moment in time.</span>
                </h2>
                <div className="mt-6 space-y-4 text-[18px] leading-[1.6]" style={{ color: BODY }}>
                  <p>
                    Disinfectants work while you&rsquo;re cleaning. But once they dry, your indoor
                    environment immediately begins changing again.
                  </p>
                  <p>
                    Family members move through the house, introducing new microorganisms. Every
                    time a door opens or the HVAC system cycles, microscopic particles spread
                    through your home. Pets deposit dander and organic debris.
                  </p>
                  <p>
                    The process never stops. That&rsquo;s why{" "}
                    <strong>cleaning is a moment in time</strong>, while your indoor environment is
                    constantly changing. The question isn&rsquo;t whether your home will be
                    recolonized. It&rsquo;s <strong>what will colonize it first.</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
                {[
                  {
                    icon: <SprayCan className="h-8 w-8" strokeWidth={1.4} />,
                    label: "You clean",
                    caption: "The surface is cleared. Nothing living on it.",
                    tone: "green" as const,
                  },
                  {
                    icon: <CircleDashed className="h-8 w-8" strokeWidth={1.4} />,
                    label: "New microorganisms arrive",
                    caption: "Organic matter begins to accumulate again.",
                    tone: "navy" as const,
                  },
                  {
                    icon: <Bug className="h-8 w-8" strokeWidth={1.4} />,
                    label: "Odors & allergens return",
                    caption: "And the cycle starts over. You clean again.",
                    tone: "navy" as const,
                  },
                ].map((s, i) => (

                  <Fragment key={s.label}>
                    <IconStat icon={s.icon} label={s.label} caption={s.caption} tone={s.tone} />
                    {i < 2 && (
                      <div className="hidden items-start justify-center pt-8 sm:flex">
                        <Arrow />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ 4B · NATURE LEAVES NO EMPTY SPACES ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container pb-16 sm:pb-20 lg:pb-24">
              <div
                className="mx-auto max-w-[70ch] rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
                style={{ background: PALE, borderLeft: `4px solid ${GREEN}` }}
              >
                <h2 className="bb-head text-[1.8rem] sm:text-[2.2rem]" style={{ color: NAVY, lineHeight: 1.15 }}>
                  Nature doesn&rsquo;t leave <span style={{ color: GREEN }}>empty spaces empty.</span>
                </h2>
                <div className="mt-6 space-y-4 text-[18px] leading-[1.65]" style={{ color: BODY }}>
                  <p>Think about your lawn.</p>
                  <p>
                    When healthy grass fills the yard, weeds struggle to grow. Not because the weeds
                    disappear, but because healthy grass already occupies the available space.
                  </p>
                  <p>
                    Indoor environments work the same way. When microorganisms are removed,
                    something else begins growing immediately.
                  </p>
                  <p style={{ color: GREEN_DEEP, fontWeight: 600 }}>
                    The question isn&rsquo;t whether the microbes return. It&rsquo;s which microbes
                    return first.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ 5 · A COMPLETELY DIFFERENT PHILOSOPHY ══════════ */}
          <section className="w-full" style={{ background: PALE }}>
            <div className="grid lg:grid-cols-2">
              <div className="order-2 flex items-center lg:order-1">
                <div className="w-full px-5 py-14 sm:px-8 sm:py-16 lg:py-24 lg:pl-[max(1.5rem,calc((100vw-1440px)/2+2rem))] lg:pr-14">
                  <h2 className="bb-head text-[2rem] sm:text-[2.5rem]" style={{ color: NAVY }}>
                    A completely
                    <br />
                    <span style={{ color: GREEN }}>different philosophy.</span>
                  </h2>
                  <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6]" style={{ color: BODY }}>
                    EnviroBiotics doesn&rsquo;t try to sterilize your home. It helps restore balance.
                    Instead of relying on chemicals, EnviroBiotics continuously disperses carefully
                    selected environmental probiotics that create a micro-flora coating on indoor
                    surfaces. Once there, they occupy surfaces, compete for nutrients, break down
                    organic residues and support a balanced, healthier indoor microbiome.
                  </p>
                  <p className="mt-3 text-[18px] font-semibold" style={{ color: GREEN_DEEP }}>
                    Rather than masking problems, EnviroBiotics creates conditions that prevent them
                    from developing.
                  </p>



                  <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
                    {[
                      {
                        icon: <Sofa className="h-7 w-7" strokeWidth={1.4} />,
                        label: "Covers surfaces",
                        caption:
                          "Probiotics settle across the room, not only where the cloth went.",
                      },
                      {
                        icon: <Leaf className="h-7 w-7" strokeWidth={1.4} />,
                        label: "Competes naturally",
                        caption:
                          "They hold the space and nutrients unwanted microorganisms need.",
                      },
                      {
                        icon: <Clock className="h-7 w-7" strokeWidth={1.4} />,
                        label: "Works continuously",
                        caption:
                          "Protection stays active through the days between cleanings.",
                      },
                    ].map((f, i) => (
                      <div
                        key={f.label}
                        className={i > 0 ? "sm:border-l sm:pl-6" : ""}
                        style={i > 0 ? { borderColor: "#D6E3DA" } : undefined}
                      >
                        <IconStat
                          icon={f.icon}
                          label={f.label}
                          caption={f.caption}
                          size={64}
                          className="!items-start !text-left"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative order-1 min-h-[320px] sm:min-h-[420px] lg:order-2 lg:min-h-[640px]">
                <img
                  src={protectionBiotica.url}
                  alt="The Biotica 800 environmental probiotic device on a wooden table"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* ══════════ 6 · YOU CAN'T WIPE A SOFA ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
              <div>
                <h2 className="bb-head text-[2rem] sm:text-[2.5rem]" style={{ color: NAVY }}>
                  You can wipe a counter.
                  <br />
                  <span style={{ color: GREEN }}>You can&rsquo;t wipe a sofa.</span>
                </h2>
                <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6]" style={{ color: BODY }}>
                  Disinfectant works where the cloth goes. The rest of the room stays as it was, and
                  that is where the smell lives.
                </p>
                <div
                  className="mt-7 max-w-[54ch] px-5 py-5 text-[18px] leading-[1.6]"
                  style={{ background: PALE, borderLeft: `4px solid ${GREEN}`, color: BODY }}
                >
                  EnviroBiotics needs no cloth. The probiotics disperse through the room and settle
                  on the surfaces the air reaches, including the twelve on this list.
                </div>
              </div>

              <div>
                <p
                  className="text-[15px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: NAVY }}
                >
                  Places you can&rsquo;t wipe
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {PLACES.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[18px]" style={{ color: BODY }}>
                      <X aria-hidden className="mt-1 h-4 w-4 shrink-0" style={{ color: ORANGE }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ══════════ 7 · THE DIFFERENCE ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container pb-16 sm:pb-20 lg:pb-24">
              <h2
                className="bb-head text-center text-[1.7rem] sm:text-[2.1rem]"
                style={{ color: NAVY, lineHeight: 1.15 }}
              >
                The difference is what happens{" "}
                <span style={{ color: GREEN }}>between cleanings.</span>
              </h2>

              <div className="mt-10 space-y-4 sm:mt-12">
                {/* Traditional */}
                <div
                  className="grid overflow-hidden rounded-xl sm:grid-cols-[210px_1fr]"
                  style={{ background: "#F5F7FA" }}
                >
                  <div
                    className="flex items-center px-6 py-5 text-[15px] font-bold uppercase leading-[1.2] tracking-[0.04em] text-white sm:py-8"
                    style={{ background: NAVY }}
                  >
                    Traditional cleaning
                  </div>
                  <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    {[
                      { icon: <SprayCan className="h-6 w-6" strokeWidth={1.4} />, label: "Clean" },
                      { icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />, label: "Disinfect" },
                      { icon: <Wind className="h-6 w-6" strokeWidth={1.4} />, label: "Leave" },
                      { icon: <Bug className="h-6 w-6" strokeWidth={1.4} />, label: "" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <IconCircle size={56}>{s.icon}</IconCircle>
                        {s.label && (
                          <span
                            className="text-[15px] font-semibold uppercase tracking-[0.08em]"
                            style={{ color: NAVY }}
                          >
                            {s.label}
                          </span>
                        )}
                        {i < 3 && <Arrow />}
                      </div>
                    ))}
                    <div className="sm:ml-2">
                      <p className="text-[15px] font-bold uppercase tracking-[0.08em]" style={{ color: NAVY }}>
                        Microbes return
                      </p>
                      <p className="text-[15px]" style={{ color: GREY }}>
                        The cycle starts again.
                      </p>
                    </div>
                  </div>
                </div>

                {/* VS */}
                <div className="flex justify-center">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold"
                    style={{ background: "#FFFFFF", color: NAVY, border: `1px solid ${LINE}` }}
                  >
                    vs
                  </span>
                </div>

                {/* EnviroBiotics */}
                <div
                  className="grid overflow-hidden rounded-xl sm:grid-cols-[210px_1fr]"
                  style={{ background: PALE }}
                >
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
                        className="text-[15px] font-semibold uppercase tracking-[0.08em]"
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
                        className="max-w-[12ch] text-[15px] font-semibold uppercase leading-[1.3] tracking-[0.08em]"
                        style={{ color: GREEN_DEEP }}
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
                          className="max-w-[18ch] text-[15px] font-bold uppercase leading-[1.3] tracking-[0.08em]"
                          style={{ color: GREEN_DEEP }}
                        >
                          Continuous environmental support
                        </p>
                        <p className="text-[15px]" style={{ color: GREY }}>
                          Protection that works between cleanings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison table */}
              <div className="mt-12 overflow-hidden rounded-xl" style={{ border: `1px solid ${LINE}` }}>
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    What happens after cleaning with disinfectant alone compared with disinfectant
                    plus EnviroBiotics
                  </caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="w-[26%] px-3 py-4 text-[15px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-white sm:w-[24%] sm:px-5"
                        style={{ background: NAVY }}
                      >
                        What happens
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-[15px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-white sm:px-5"
                        style={{ background: NAVY }}
                      >
                        Traditional disinfectant cleaning
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-[15px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-white sm:px-5"
                        style={{ background: GREEN_DEEP }}
                      >
                        EnviroBiotics

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map(([label, a, b]) => (
                      <tr key={label} style={{ borderTop: `1px solid ${LINE}` }}>
                        <th
                          scope="row"
                          className="px-3 py-4 align-top text-[15px] font-bold leading-[1.5] sm:px-5 sm:text-[16px]"
                          style={{ color: NAVY, background: "#F7F9FB" }}
                        >
                          {label}
                        </th>
                        <td
                          className="px-3 py-4 align-top text-[15px] leading-[1.5] sm:px-5 sm:text-[16px]"
                          style={{ color: BODY }}
                        >
                          {a}
                        </td>
                        <td
                          className="px-3 py-4 align-top text-[15px] leading-[1.5] sm:px-5 sm:text-[16px]"
                          style={{ color: BODY, background: PALE }}
                        >
                          <T>{b}</T>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[15px] leading-[1.6]" style={{ color: GREY }}>
                EnviroBiotics disperses naturally throughout the entire room, reaching surfaces that
                traditional cleaning simply can&rsquo;t.
              </p>

            </div>
          </section>

          {/* ══════════ 8 · THE DEVICES ══════════ */}
          <section className="w-full" style={{ background: PALE }}>
            <div className="site-container py-16 sm:py-20 lg:py-24">
              <h2
                className="bb-head text-center text-[1.9rem] sm:text-[2.4rem]"
                style={{ color: NAVY, lineHeight: 1.1 }}
              >
                Choose the right
                <br />
                <span style={{ color: GREEN }}>EnviroBiotics system.</span>
              </h2>
              <p
                className="mx-auto mt-5 max-w-[56ch] text-center text-[18px] leading-[1.6]"
                style={{ color: BODY }}
              >
                No installation. No plumbing. No filters. No app. Set it down and switch it on.
              </p>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                {[
                  {
                    photo: miniLifestyleUrl,
                    alt: "The Biologic Mini environmental probiotic device on a kitchen counter",
                    pill: "Up to 300 sq ft",
                    name: "Biologic Mini",
                    price: "$[[98]]",
                    body: "Perfect for rooms up to 300 sq ft like bedrooms, bathrooms, home offices, dorm rooms and nurseries.",
                    cta: "Add the Biologic Mini",
                    primary: false,
                  },
                  {
                    photo: bioticaLifestyleUrl,
                    alt: "The Biotica 800 environmental probiotic device on a wooden table",
                    pill: "Up to 800 sq ft",
                    name: "Biotica 800",
                    price: "$[[299]]",
                    body: "Perfect for rooms up to 800 sq ft like living rooms, finished basements, open floor plans, studios and small homes.",
                    cta: "Add the Biotica 800",
                    primary: true,
                  },
                ].map((d) => (

                  <article
                    key={d.name}
                    className="flex h-full flex-col overflow-hidden rounded-2xl bg-white"
                    style={{ border: `1px solid ${LINE}` }}
                  >
                    <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-2xl bg-[#F5F5F3]">
                      <img
                        src={d.photo}
                        alt={d.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span
                        className="absolute left-4 top-4 inline-block rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] shadow-sm backdrop-blur-sm"
                        style={{ background: "white", color: NAVY }}
                      >
                        {d.pill}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <h3
                        className="bb-head text-[1.5rem]"
                        style={{ color: NAVY, textTransform: "none", letterSpacing: "-0.01em" }}
                      >
                        {d.name}, <T>{d.price}</T>
                      </h3>

                      <p className="mt-3 flex-1 text-[18px] leading-[1.6]" style={{ color: BODY }}>
                        {d.body}
                      </p>
                      <div className="mt-6">
                        {d.primary ? (
                          <PrimaryCTA href={SHOP}>{d.cta}</PrimaryCTA>
                        ) : (
                          <OutlineCTA href={SHOP}>{d.cta}</OutlineCTA>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-14 grid gap-10 sm:grid-cols-3">
                <IconStat
                  icon={<Power className="h-7 w-7" strokeWidth={1.4} />}
                  label="Set it down"
                  caption="Pick the room that bothers you most, put it on a shelf or counter, and switch it on. Nothing to install."
                />
                <IconStat
                  icon={<Leaf className="h-7 w-7" strokeWidth={1.4} />}
                  label="It works on its own"
                  caption="Beneficial probiotics disperse through the room and settle onto the surfaces you can't reach with a cloth."
                />
                <IconStat
                  icon={<RefreshCw className="h-7 w-7" strokeWidth={1.4} />}
                  label={
                    <>
                      Change the cartridge every <T>{"[[3]]"}</T> months
                    </>
                  }
                  caption="A light on the device shows when the cartridge runs low. Order a refill when you want one, or set up automatic delivery. No subscription required either way."
                />
              </div>
            </div>
          </section>

          {/* ══════════ 9 · SAFETY ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container py-16 sm:py-20 lg:py-24">
              <h2
                className="bb-head mx-auto max-w-[22ch] text-center text-[1.7rem] sm:text-[2.2rem]"
                style={{ color: NAVY, lineHeight: 1.15 }}
              >
                &ldquo;You want me to put bacteria in my house?&rdquo;
              </h2>
              <div
                className="mx-auto mt-6 max-w-[66ch] space-y-4 text-center text-[18px] leading-[1.65]"
                style={{ color: BODY }}
              >
                <p>Fair question. Here&rsquo;s the difference. These aren&rsquo;t disease-causing bacteria.</p>
                <p>
                  They&rsquo;re carefully selected environmental probiotics, chosen because they
                  naturally establish a balanced, healthier microbial balance.
                </p>
                <p style={{ color: GREY }}>
                  Our technology has undergone extensive independent safety testing and carries
                  multiple third-party recognitions, including:
                </p>
              </div>

              <ul className="mx-auto mt-8 flex max-w-[70ch] flex-wrap justify-center gap-3">
                {[
                  "EPA Registered",
                  "MADE SAFE®",
                  "Allergy UK",
                  "Sensitive Choice Australia",
                  "Parent Tested Parent Approved",
                ].map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold"
                    style={{ background: PALE, color: NAVY, border: `1px solid #D6E3DA` }}
                  >
                    <Check aria-hidden className="h-4 w-4" style={{ color: GREEN }} />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <IconStat
                  icon={<Baby className="h-6 w-6" strokeWidth={1.4} />}
                  size={64}
                  label="Family and pet friendly"
                  caption="Designed for everyday use in homes with children and pets."
                />
                <IconStat
                  icon={<Wind className="h-6 w-6" strokeWidth={1.4} />}
                  size={64}
                  label="No fumes, no bleach smell"
                  caption="Nothing harsh to breathe, which matters if someone in the house has asthma or allergies."
                />
                <IconStat
                  icon={<FlaskConical className="h-6 w-6" strokeWidth={1.4} />}
                  size={64}
                  label="Independently tested"
                  caption="Extensive independent safety testing and multiple third-party recognitions."
                />
                <IconStat
                  icon={<HelpCircle className="h-6 w-6" strokeWidth={1.4} />}
                  size={64}
                  label="What it isn't"
                  caption="Not a disinfectant, not a pesticide, not a fragrance. Not intended to diagnose, treat, cure or prevent any disease."
                />
              </div>

            </div>
          </section>

          {/* ══════════ 10 · REVIEWS ══════════ */}
          <section className="w-full" style={{ background: PALE }}>
            <div className="site-container py-16 sm:py-20 lg:py-24">
              <h2
                className="bb-head text-center text-[1.8rem] sm:text-[2.3rem]"
                style={{ color: NAVY, lineHeight: 1.15 }}
              >
                Real customers. <span style={{ color: GREEN }}>Real homes.</span>
              </h2>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {REVIEWS.map(([quote, name], i) => (
                  <figure
                    key={i}
                    className="rounded-2xl bg-white p-6 sm:p-8"
                    style={{ border: `1px solid ${LINE}` }}
                  >
                    <div className="flex gap-1" aria-label="Five out of five stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          aria-hidden
                          className="h-5 w-5"
                          style={{ color: ORANGE, fill: ORANGE }}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-5 text-[18px] leading-[1.6]" style={{ color: BODY }}>
                      <T>{quote}</T>
                    </blockquote>
                    <hr className="my-5" style={{ borderColor: LINE }} />
                    <figcaption className="text-[15px]" style={{ color: GREY }}>
                      <T>{name}</T>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════ 10B · CLEANING AND NATURE ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container py-16 sm:py-20 lg:py-24">
              <h2
                className="bb-head mx-auto max-w-[26ch] text-center text-[1.8rem] sm:text-[2.3rem]"
                style={{ color: NAVY, lineHeight: 1.15 }}
              >
                It&rsquo;s not about choosing between{" "}
                <span style={{ color: GREEN }}>cleaning and nature.</span>
              </h2>
              <div
                className="mx-auto mt-8 max-w-[70ch] space-y-4 text-[18px] leading-[1.65]"
                style={{ color: BODY }}
              >
                <p>
                  Keep cleaning dirt and grime. Keep disinfecting when it is appropriate.
                  Disinfection is appropriate when there is a known or suspected infectious risk,
                  including:
                </p>
                <ul className="space-y-3">
                  {[
                    "After someone in the home has been sick with a contagious illness",
                    "Food preparation areas where contamination with raw meat, poultry or seafood has occurred",
                    "Bathrooms after exposure to bodily fluids",
                    "During outbreaks of illnesses such as norovirus or influenza, when public health guidance recommends disinfecting high-touch surfaces",
                    "Mold or sewage remediation, where specialized cleaning and disinfection protocols are part of the remediation process",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0" style={{ color: GREEN }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>In these situations, disinfectants remain an important and appropriate tool.</p>
                <p style={{ color: NAVY, fontWeight: 600 }}>
                  But ask yourself one question. What happens between cleanings?
                </p>
                <p style={{ color: GREEN_DEEP, fontWeight: 600 }}>
                  That&rsquo;s where EnviroBiotics works, 24 hours a day, every day.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════ 11 · NAVY CTA BAND ══════════ */}

          <section className="relative w-full overflow-hidden" style={{ background: NAVY }}>
            <img
              src={ctaRoom}
              alt=""
              aria-hidden
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
                  "linear-gradient(90deg, rgba(22,48,91,0.97) 0%, rgba(22,48,91,0.94) 46%, rgba(22,48,91,0.45) 66%, rgba(22,48,91,0.1) 100%)",
              }}
            />
            <div className="site-container relative z-10 py-16 sm:py-20 lg:py-24">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="bb-head text-[1.9rem] text-white sm:text-[2.4rem]" style={{ lineHeight: 1.1 }}>
                    Your indoor environment
                    <br />
                    never stops changing.
                    <br />
                    <span style={{ color: "#8BE0A6" }}>Why should your protection?</span>
                  </h2>
                  <div className="mt-6 flex items-center gap-3">
                    <Leaf aria-hidden className="h-5 w-5" style={{ color: "#8BE0A6" }} strokeWidth={1.5} />
                    <span aria-hidden className="h-px w-24" style={{ background: "rgba(255,255,255,0.4)" }} />
                  </div>
                  <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.6]" style={{ color: "#DCE3EC" }}>
                    Traditional cleaning removes yesterday&rsquo;s mess. EnviroBiotics continuously
                    helps create a healthier indoor microbiome for tomorrow. Not simply cleaner.
                    Balanced. Not simply disinfected. Continuously managed.
                  </p>
                  <p className="mt-4 max-w-[46ch] text-[18px] font-semibold leading-[1.6]" style={{ color: "#8BE0A6" }}>
                    Purify your home the way Mother Nature purifies hers, with probiotics.
                  </p>


                  <div
                    className="mt-8 max-w-[46ch] rounded-xl p-6"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.28)" }}
                  >
                    <h3
                      className="bb-head text-[1.15rem] text-white"
                      style={{ letterSpacing: "0.02em" }}
                    >
                      Try it for 30 days
                    </h3>
                    <p className="mt-3 text-[18px] leading-[1.6]" style={{ color: "#E4EAF2" }}>
                      If your home doesn&rsquo;t smell different, send it back and we&rsquo;ll refund
                      you. Keep the cartridge.
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        "No return shipping cost",
                        "No restocking fee",
                        "No subscription to cancel",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2 text-[16px]" style={{ color: "#BFF0D0" }}>
                          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-2 text-[16px]" style={{ color: "#BFF0D0" }}>
                        <Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />
                        <span>
                          Talk to a person:{" "}
                          <a href={PHONE_HREF} className="bb-focus font-semibold underline">
                            {PHONE}
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="lg:flex lg:justify-center">
                  <PrimaryCTA href={SHOP}>Choose your system today</PrimaryCTA>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════ 12 · TRUST STRIP ══════════ */}
          <section className="w-full border-b bg-white" style={{ borderColor: LINE }}>
            <div className="site-container grid gap-8 py-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-0">
              {[
                {
                  icon: <Wind className="h-6 w-6" strokeWidth={1.4} />,
                  title: "No filters",
                  copy: "Nothing to clean or replace but the cartridge.",
                },
                {
                  icon: <RefreshCw className="h-6 w-6" strokeWidth={1.4} />,
                  title: "No subscription",
                  copy: "Order refills when you want them.",
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.4} />,
                  title: "30-day guarantee",
                  copy: "Full refund, no return shipping.",
                },
                {
                  icon: <Phone className="h-6 w-6" strokeWidth={1.4} />,
                  title: "Real phone support",
                  copy: "Mon–Fri, 9AM–4PM ET.",
                },
              ].map((t, i) => (
                <div
                  key={t.title}
                  className={`flex items-start gap-4 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
                  style={i > 0 ? { borderColor: LINE } : undefined}
                >
                  <IconCircle size={56} tone="green">
                    {t.icon}
                  </IconCircle>
                  <div className="min-w-0">
                    <p
                      className="text-[15px] font-bold uppercase leading-[1.25] tracking-[0.08em]"
                      style={{ color: NAVY }}
                    >
                      {t.title}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-[1.6]" style={{ color: GREY }}>
                      {t.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════ 13 · SPACES STRIP ══════════ */}
          <section className="w-full bg-white">
            <div className="site-container grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
              <div>
                <p
                  className="text-center text-[15px] font-semibold uppercase tracking-[0.14em] lg:text-left"
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
                      <span aria-hidden style={{ color: NAVY }}>
                        {a.icon}
                      </span>
                      <span
                        className="mt-2 text-[15px] font-semibold uppercase leading-[1.3] tracking-[0.06em]"
                        style={{ color: NAVY }}
                      >
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="flex flex-col items-center gap-2 lg:items-end lg:border-l lg:pl-14"
                style={{ borderColor: LINE }}
              >
                <img src={logo} alt="EnviroBiotics" className="h-9 w-auto" loading="lazy" />
                <p
                  className="text-[15px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: GREEN_DEEP }}
                >
                  Continuous. Natural. Proactive.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* ══════════ 14 · FOOTER ══════════ */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

export default BeyondBleachPage;
