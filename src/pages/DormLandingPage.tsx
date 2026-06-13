import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, Play, ShoppingCart } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import { shopifyProductUrl } from "@/lib/shopify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import biologicMiniImg from "@/assets/shop/biologic-mini.png";
import finalCtaProductImg from "@/assets/dorm/dorm-unpacking.avif";
import videoPosterImg from "@/assets/dorm/dorm-video-poster.avif";
import heroImg from "@/assets/dorm/dorm-hero-moving-in.jpg";
import unpackingImg from "@/assets/dorm/dorm-move-in-bag.avif";
import ventDustImg from "@/assets/dorm/dorm-vent-dust.avif";
import bathroomImg from "@/assets/dorm/dorm-bathroom-moisture.avif";
import particlesImg from "@/assets/dorm/dorm-airborne-particles.avif";
import tiredImg from "@/assets/dorm/dorm-tired-student.avif";
import sneezeImg from "@/assets/dorm/dorm-sneezing.jpg";
import focusImg from "@/assets/dorm/dorm-losing-focus.jpg";
import cleanRoomImg from "@/assets/dorm/dorm-clean-bedroom.avif";
import productOnDeskImg from "@/assets/dorm/dorm-product-on-desk.jpg";
import miniHeroImg from "@/assets/dorm/dorm-mini-hero.png";
import readingImg from "@/assets/dorm/dorm-student-reading.jpg";
import dropoffImg from "@/assets/dorm/dorm-parent-dropoff.avif";
import studyingImg from "@/assets/dorm/dorm-students-studying.jpg";

const BIOLOGIC_MINI_PRODUCT = {
  name: "BioLogic Mini",
  description: "Cordless probiotic air and surface device for dorm rooms",
  price: 9800,
  image: biologicMiniImg,
  category: "device" as const,
};
const SHOPIFY_BUY_URL = shopifyProductUrl("biologic-mini", "dorm");

/* ---------- Reveal-on-scroll wrapper (no framer-motion) ---------- */
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
      { threshold: 0.12 }
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

/* ---------- Sonos-style video player with centered round play button ---------- */
const VideoPlayer = ({ src, poster, title }: { src: string; poster: string; title: string }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-foreground/5 shadow-2xl ring-1 ring-foreground/10">
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={poster}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl ring-1 ring-white/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white sm:h-24 sm:w-24 lg:h-28 lg:w-28">
            <span className="absolute inset-0 rounded-full bg-white/30 blur-xl transition-opacity duration-300 group-hover:opacity-70" />
            <Play
              className="relative ml-1 h-8 w-8 fill-foreground text-foreground sm:h-10 sm:w-10 lg:h-12 lg:w-12"
              strokeWidth={1.5}
            />
          </span>
        </button>
      )}
    </div>
  );
};

const DormLandingPage = () => {
  const [showSticky, setShowSticky] = useState(false);
  const isLoading = false;

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBuyNow = () => {
    trackEvent("click_buy_dorm_landing");
    window.location.href = SHOPIFY_BUY_URL;
  };

  const handleAddToCart = () => {
    window.location.href = SHOPIFY_BUY_URL;
  };

  return (
    <>
      <SEOHead
        title="Biologic Mini™ for Dorm Rooms | EnviroBiotics"
        description="A quietly powerful way to help your student start the year in a cleaner, calmer dorm. Cordless. Whisper-quiet. Probiotic by nature."
        path="/dorm"
      />

      <main className="bg-background text-foreground">
        {/* ============ 1. HERO ============ */}
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
          <img
            src={heroImg}
            alt="Student moving into a dorm room"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
          />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-white sm:text-base lg:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                Biologic Mini™ for Dorms
              </p>
              <h1
                className="font-display font-bold tracking-[-0.035em] text-white text-[2.75rem] leading-[1.02] sm:text-[clamp(3rem,8vw,6.25rem)]"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                The dorm room
                <br />
                you can&apos;t see.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white sm:text-xl lg:text-[1.6rem] lg:leading-[1.35] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                Your dorm room may look clean, but it&apos;s one of the highest-risk environments
                for mold, allergens, and illness on campus.
              </p>
              <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/90 sm:text-lg lg:text-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                EnviroBiotics creates a protective, hypoallergenic safe zone, without chemicals.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  size="lg"
                  className="h-14 rounded-full bg-white px-8 text-base font-semibold text-foreground hover:bg-white/90"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Get Biologic Mini™
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <a
                  href="#how-it-works"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 px-7 text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  How it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. UNKNOWN ENVIRONMENT ============ */}
        <section className="bg-background py-24 sm:py-32 lg:py-40">
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-24 lg:px-16">
            <Reveal className="lg:col-span-8">
              <div className="relative">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28),0_20px_40px_-20px_rgba(0,0,0,0.12)]">
                  <img
                    src={unpackingImg}
                    alt="Student unpacking boxes in a sunlit dorm"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-x-16 -bottom-8 h-12 rounded-[50%] bg-foreground/15 blur-3xl" />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-4">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Move-in day
              </p>
              <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                An environment you don&apos;t control.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Older buildings. Shared HVAC. Years of previous tenants. Most dorm rooms aren&apos;t
                as clean as they look.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ 3. WHY DORM ROOMS ARE A PROBLEM (DARK) ============ */}
        <section className="bg-[#F5F3EE] py-24 text-foreground sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1480px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                The reality
              </p>
              <h2 className="max-w-3xl font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[4rem] lg:leading-[1.04]">
                Why dorm rooms
                <br className="hidden sm:block" /> are a problem.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Hundreds of students. Shared systems. Years of buildup. The risks are quiet,
                but they add up fast.
              </p>
            </Reveal>

            {/* 4 risk tiles */}
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {[
                { img: ventDustImg, title: "Shared air systems", caption: "Spread germs across rooms and floors." },
                { img: bathroomImg, title: "Humidity & older buildings", caption: "Lead to mold growth in walls, vents, and corners." },
                { img: particlesImg, title: "High illness transmission", caption: "Close quarters move bugs quickly." },
                { img: tiredImg, title: "Surfaces rarely disinfected", caption: "Desks, fabrics, and door handles go untouched for weeks." },
              ].map((item, i) => (
                <Reveal key={item.title}>
                  <div
                    className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-base font-semibold text-white sm:text-lg">{item.title}</p>
                      <p className="mt-1 text-sm leading-snug text-white/80">{item.caption}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Science stat + solution */}
            <Reveal>
              <div className="mt-20 border-t border-foreground/10 pt-16 text-center sm:mt-24 sm:pt-20">
                <p className="mx-auto max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.5rem]">
                  Up to <span className="text-primary">80%</span> of contaminants live on
                  surfaces, not in the air.
                </p>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Air purifiers don&apos;t purify contaminated surfaces. EnviroBiotics purifies
                  surfaces, objects, and air.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 5. PRODUCT REVEAL ============ */}
        <section className="relative overflow-hidden bg-[hsl(var(--primary-soft))] py-28 sm:py-36 lg:py-44">
          <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-16 px-6 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Introducing
              </p>
              <h2 className="font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[4.75rem] lg:leading-[1]">
                Biologic Mini™
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Small device. Quietly working. A natural way to help balance the dorm environment,
                without chemicals.
              </p>

              <ul className="mt-10 space-y-4">
                {[
                  "Cordless and refillable",
                  "Whisper-quiet, runs in the background",
                  "Set it once, change cartridges every 90 days",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-base text-foreground">
                    <Check className="mt-1 h-5 w-5 flex-none text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={handleBuyNow}
                  size="lg"
                  className="h-14 rounded-full bg-foreground px-8 text-base font-semibold text-background hover:bg-foreground/90"
                >
                  Buy now · $98
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <button
                  onClick={handleAddToCart}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-foreground/15 px-7 text-base font-medium text-foreground transition hover:bg-foreground/5"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to cart
                </button>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.28),0_20px_40px_-20px_rgba(0,0,0,0.12)]">
                  <img
                    src={miniHeroImg}
                    alt="Biologic Mini held up against a bright sky"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-x-16 -bottom-8 h-12 rounded-[50%] bg-foreground/15 blur-3xl" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 6. HOW IT WORKS ============ */}
        <section id="how-it-works" className="bg-background py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-16">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  How it works
                </p>
                <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                  How the Biologic Mini™ works.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Three simple steps. No chemicals. Quietly working in the background, day and night.
                </p>
              </div>
            </Reveal>

            {/* Cinematic full-width video */}
            <Reveal>
              <div className="mt-14 sm:mt-20">
                <VideoPlayer
                  src="https://player.vimeo.com/video/1146300437?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                  poster={videoPosterImg}
                  title="How EnviroBiotics Works"
                />
              </div>
            </Reveal>

            {/* Steps row beneath video */}
            <Reveal>
              <ol className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-12">
                {[
                  {
                    step: "01",
                    title: "Release",
                    copy: "The device disperses microscopic beneficial probiotics into the room's air.",
                  },
                  {
                    step: "02",
                    title: "Settle & Coat",
                    copy: "Probiotics land on every surface: beds, desks, fabrics, and the air itself.",
                  },
                  {
                    step: "03",
                    title: "Protect & Clean",
                    copy: "They consume the food harmful microbes need, helping prevent growth and creating microbial balance.",
                  },
                ].map((item) => (
                  <li key={item.step} className="border-t border-border pt-6">
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
            </Reveal>

            {/* Reassurance bar */}
            <Reveal>
              <ul className="mt-16 flex flex-col flex-wrap items-start justify-center gap-x-10 gap-y-4 border-t border-border pt-10 text-base text-foreground sm:flex-row sm:items-center sm:text-center">
                <li className="flex items-start gap-3 sm:items-center">
                  <Check className="mt-1 h-5 w-5 flex-none text-primary sm:mt-0" />
                  No harsh chemicals, no fragrance
                </li>
                <li className="flex items-start gap-3 sm:items-center">
                  <Check className="mt-1 h-5 w-5 flex-none text-primary sm:mt-0" />
                  Helps reduce odors over time
                </li>
                <li className="flex items-start gap-3 sm:items-center">
                  <Check className="mt-1 h-5 w-5 flex-none text-primary sm:mt-0" />
                  Safe to use around roommates and pets
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ============ 7. TRANSFORMATION ============ */}
        <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
          <img
            src={cleanRoomImg}
            alt="A bright, clean dorm bedroom"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
            <Reveal>
              <h2
                className="max-w-3xl font-display text-5xl font-bold tracking-[-0.03em] text-white sm:text-6xl lg:text-[5rem] lg:leading-[1.02]"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
              >
                Cleaner. Calmer.
                <br /> More focused.
              </h2>
            </Reveal>
          </div>
        </section>

        {/* ============ 8. EMOTIONAL CLOSE ============ */}
        <section className="bg-background py-24 sm:py-32 lg:py-40">
          <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20 lg:px-16">
            <Reveal className="lg:col-span-6">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src={dropoffImg}
                  alt="Family hugging on move-in day"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                A better start
              </p>
              <h2 className="font-display text-4xl font-bold tracking-[-0.025em] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                A better environment is a better college experience.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                Send them off with something that quietly looks after the space they call home.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img src={readingImg} alt="Student reading" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img src={studyingImg} alt="Students studying" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 9. FINAL CTA ============ */}
        <section className="bg-[hsl(var(--primary-soft))] py-28 sm:py-36 lg:py-44">
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
            <Reveal>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                Biologic Mini™
              </p>
              <h2 className="font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[5rem] lg:leading-[1.02]">
                Create a healthier dorm, naturally.
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                One small device. A quietly better space. Free shipping on every Biologic Mini™.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  size="lg"
                  className="h-14 rounded-full bg-foreground px-10 text-base font-semibold text-background hover:bg-foreground/90"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Buy now · $98</>}
                </Button>
              </div>
              <div className="relative mx-auto mt-20 max-w-5xl lg:max-w-6xl xl:max-w-7xl">
                <div className="relative overflow-hidden rounded-[2.5rem] ring-1 ring-black/[0.06] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.22),0_20px_40px_-20px_rgba(0,0,0,0.10)]">
                  <img
                    src={finalCtaProductImg}
                    alt="Bright dorm room with student unpacking on move-in day"
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-x-16 -bottom-8 h-12 rounded-[50%] bg-foreground/15 blur-2xl" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 10. FAQ ============ */}
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
                  Is Biologic Mini™ safe to use in a shared dorm room?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Yes. It uses beneficial environmental probiotics, no harsh chemicals, no fragrance,
                  and is safe to use around roommates and pets.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="text-left text-base font-medium">
                  Is it noisy at night?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  No. Biologic Mini™ is whisper-quiet and designed to run in the background while
                  your student sleeps or studies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="text-left text-base font-medium">
                  How long does one cartridge last?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  About 90 days of continuous use. Refills can be set up on a recurring schedule so
                  your student never has to think about it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="text-left text-base font-medium">
                  Will it work in an older building with shared HVAC?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  That&apos;s exactly where it shines. Biologic Mini™ helps reduce odors and balance
                  the immediate environment around the dorm room.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="text-left text-base font-medium">
                  Can roommates share one?
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Yes. One Biologic Mini™ is designed to cover a typical dorm room comfortably.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
            <p className="text-sm font-semibold text-foreground">Biologic Mini™</p>
            <p className="text-xs text-muted-foreground">$98 · Free shipping</p>
          </div>
          <Button
            onClick={handleBuyNow}
            disabled={isLoading}
            className="h-11 rounded-full bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy now"}
          </Button>
        </div>
      </div>

      {/* Subscription upsell + in-app cart removed  checkout happens on Shopify */}
    </>
  );
};

export default DormLandingPage;
