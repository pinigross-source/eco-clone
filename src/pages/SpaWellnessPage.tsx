import { lazy, Suspense, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/lib/link";
import {
  ArrowRight,
  CheckCircle2,
  Wind,
  Waves,
  Repeat,
  Leaf,
  Sparkles,
  Loader2,
  Quote,
} from "lucide-react";
import { SEOHead, organizationJsonLd } from "@/components/SEOHead";
import { trackEvent } from "@/lib/tracking";
import ebioticProOfficeAsset from "@/assets/ebiotic-pro-office.avif.asset.json";
import biologicMiniImg from "@/assets/biologic-mini-nobg-new.avif";
import biotica800Asset from "@/assets/shop/biotica-800.png.asset.json";
import spaHeroImg from "@/assets/spa-wellness-hero.jpg";
import spaTreatmentImg from "@/assets/spa-treatment-lifestyle.jpg";
import spaLoungeImg from "@/assets/spa-lounge-lifestyle.jpg";

const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const proImg = ebioticProOfficeAsset.url;
const biotica800Img = biotica800Asset.url;

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Lazy images below the fold can shift layout mid-scroll; re-align once settled.
  window.setTimeout(() => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top;
    if (Math.abs(top) > 24) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 700);
};

const steps = [
  {
    icon: Waves,
    title: "Disperse",
    body: "Beneficial environmental probiotics are atomized into a fine mist and dispersed throughout the indoor environment.",
  },
  {
    icon: Wind,
    title: "Travel with airflow",
    body: "They move with normal air circulation throughout treatment rooms, relaxation areas, corridors and shared spaces before settling onto surrounding surfaces and objects.",
  },
  {
    icon: Repeat,
    title: "Support balance",
    body: "Once deposited, the beneficial Bacillus compete for available nutrients and ecological space within the microscopic environment.",
  },
];

const benefits = [
  { icon: Repeat, title: "Continuous environmental care", body: "Designed to operate automatically between routine cleaning cycles with minimal staff involvement." },
  { icon: Waves, title: "Whole-environment approach", body: "Extends beyond air to surfaces, fabrics, furnishings and objects throughout the treated environment." },
  { icon: Leaf, title: "Beneficial biology", body: "Uses selected environmental probiotics and biological competition to help manage the microscopic environment." },
  { icon: Wind, title: "Odor management", body: "Helps address organic material associated with persistent odors rather than simply covering odors with fragrance." },
  { icon: CheckCircle2, title: "Complements your protocols", body: "Works alongside your existing cleaning and disinfection program rather than replacing it." },
  { icon: Sparkles, title: "A wellness story worth sharing", body: "Gives your spa another meaningful way to demonstrate its commitment to creating a thoughtfully managed environment for guests." },
];

const faqs = [
  {
    q: "Does EnviroBiotics replace our existing cleaning and disinfection program?",
    a: "No. EnviroBiotics complements your existing cleaning and disinfection protocols by providing continuous environmental probiotic activity between routine cleaning cycles. Your established cleaning schedule remains in place.",
  },
  {
    q: "What does \u201CEnvironmental Wellness\u201D mean?",
    a: "Environmental Wellness is the idea that wellbeing extends beyond treatments, products and services to include the environment surrounding the guest. EnviroBiotics adds beneficial environmental probiotics to that environment as another layer of ongoing environmental care.",
  },
  {
    q: "How does it differ from a conventional air purifier?",
    a: "A conventional purifier primarily treats air that physically reaches the machine. EnviroBiotics disperses environmental probiotics that travel with normal airflow and settle across surfaces and objects, so the approach covers the whole environment rather than a single airstream.",
  },
  {
    q: "Will it reach treatment-room surfaces and objects?",
    a: "That is the intent of the design. The probiotics are carried by normal air movement and settle on surrounding surfaces, including treatment tables, furniture, flooring, and fabrics, where they continue to compete for nutrients and space.",
  },
  {
    q: "Which system is right for a single room versus a multi-room facility?",
    a: "A single treatment room, reception area, or small studio is typically served by the BioLogic Mini (up to 300 sq ft) or the Biotica 800 (up to 800 sq ft). Larger spas, wellness centers, and resorts are usually specified with E-Biotic Pro, which integrates with HVAC ductwork so distribution follows the airflow you already run.",
  },
  {
    q: "What maintenance is required?",
    a: "Cartridge replacement on a set schedule: every 90 days for the BioLogic Mini and every 180 days for E-Biotic Pro. There are no filters to change on the probiotic diffuser systems.",
  },
];

const facilityTypes = [
  "Day spa",
  "Resort or hotel spa",
  "Massage studio",
  "Wellness center",
  "Fitness or recovery facility",
  "Medspa or clinic",
  "Other",
];

export default function SpaWellnessPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facilityType, setFacilityType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const facility = String(fd.get("facility") || "").trim();
    const size = String(fd.get("size") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !facility || !size) {
      setError("Please complete the required fields.");
      return;
    }

    setSubmitting(true);
    trackEvent("spa_lead_submit", { placement: "form", page: "spa-wellness" });
    try {
      const res = await fetch("/api/public/installation-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `Spa facility recommendation request: ${facility}`,
          message: [
            `Facility: ${facility}`,
            `Facility type: ${facilityType || "Not specified"}`,
            `Size / rooms: ${size}`,
            `Phone: ${phone || "Not provided"}`,
            "",
            message || "(no additional message)",
            "",
            "Source page: /spa-wellness",
          ].join("\n"),
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError("We couldn't send that just now. Please email contact@envirobiotics.com and we'll respond right away.");
    } finally {
      setSubmitting(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      {
        "@type": "WebPage",
        "@id": "https://envirobiotics.com/spa-wellness#webpage",
        url: "https://envirobiotics.com/spa-wellness",
        name: "Environmental Wellness for Spas | EnviroBiotics",
        description:
          "Probiotic environmental purification for spas, wellness centers, and resort facilities. Continuous support across air, surfaces, and objects between cleaning cycles.",
        about: { "@id": "https://envirobiotics.com/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://envirobiotics.com/" },
          { "@type": "ListItem", position: 2, name: "For Spas & Wellness Facilities", item: "https://envirobiotics.com/spa-wellness" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const primaryCta = (placement: string, className = "") => (
    <Button
      size="lg"
      variant="hero"
      className={`min-h-[48px] text-base ${className}`}
      data-cta="facility-recommendation"
      data-placement={placement}
      onClick={() => {
        trackEvent("spa_cta_click", { cta: "facility_recommendation", placement });
        scrollTo("recommendation");
      }}
    >
      Get a Facility Recommendation
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Environmental Wellness for Spas & Wellness Facilities"
        description="A biological approach to indoor environmental purification for spas, wellness centers, and resorts. Continuous probiotic support across air, surfaces, and objects."
        path="/spa-wellness"
        keywords="spa air purification, wellness center environmental probiotics, resort spa indoor environment, probiotic surface purification for spas"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="pb-28 md:pb-0">
        {/* 1. Hero */}
        <section className="relative w-full overflow-hidden bg-cream">
          <div className="relative w-full md:min-h-[88vh]">
            <img
              src={spaHeroImg}
              alt="A guest arriving at a bright, serene spa reception"
              className="absolute inset-x-0 top-0 h-[46svh] w-full object-cover object-[62%_center] md:inset-0 md:h-full md:object-center"
              width={1920}
              height={1280}
              fetchPriority="high"
              decoding="async"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[46svh] bg-gradient-to-t from-cream/90 via-transparent to-transparent md:inset-0 md:h-full md:bg-gradient-to-r md:from-cream md:from-25% md:via-cream/80 md:via-45% md:to-transparent md:to-70%"
            />
            <div className="relative mx-auto flex max-w-7xl items-start px-5 pb-12 pt-[39svh] sm:px-8 md:min-h-[88vh] md:items-center md:pb-0 md:pt-28">
              <div className="max-w-[42rem] rounded-sm bg-cream/80 p-5 backdrop-blur-[2px] sm:p-8 md:bg-transparent md:p-0 md:backdrop-blur-none">
                <p className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-sage">
                  Environmental wellness for spas
                </p>
                <h1 className="mt-5 font-display text-[2.35rem] leading-[1.04] sm:text-5xl md:text-[3.65rem] text-ink">
                  Your spa is dedicated to wellness.{" "}
                  <span className="block mt-2 italic font-normal text-ink/72">Shouldn&apos;t your environment be too?</span>
                </h1>
                <div className="mt-6 max-w-xl space-y-4 text-base sm:text-[1.05rem] leading-relaxed text-ink/75">
                  <p>
                    You carefully consider everything that contributes to your guest&apos;s wellbeing: the treatments
                    you provide, the products that touch their skin, the linens surrounding them, the water they enter
                    and the spaces where they relax.
                  </p>
                  <p>EnviroBiotics adds another dimension of care: the environment itself.</p>
                  <p>
                    Using beneficial environmental probiotics inspired by the balance found in nature, EnviroBiotics
                    works continuously throughout your spa, across surfaces, objects and the surrounding environment,
                    to help maintain a thoughtfully managed indoor environment between routine cleanings.
                  </p>
                </div>
                <p className="mt-5 font-display text-xl sm:text-2xl italic text-sage">
                  Welcome to Environmental Wellness.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {primaryCta("hero", "w-full sm:w-auto")}
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[48px] w-full sm:w-auto rounded-full border-ink/30 bg-cream/30 text-base text-ink hover:bg-cream/70 hover:text-ink"
                    data-cta="see-how-it-works"
                    data-placement="hero"
                    onClick={() => {
                      trackEvent("spa_cta_click", { cta: "how_it_works", placement: "hero" });
                      scrollTo("how-it-works");
                    }}
                  >
                    See How It Works
                  </Button>
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Natural &nbsp;•&nbsp; Biological &nbsp;•&nbsp; Continuous &nbsp;•&nbsp; Low maintenance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Wellness beyond the treatment</p>
                <h2 className="mt-4 font-display text-[1.9rem] sm:text-4xl leading-tight text-ink max-w-3xl">
                  Your guests notice every detail. The environment deserves the same care.
                </h2>
                <div className="mt-6 max-w-2xl space-y-4 text-base sm:text-lg leading-relaxed text-ink/70">
                  <p>
                    A truly exceptional spa experience is created by much more than a massage, facial or treatment.
                  </p>
                  <p>
                    It&apos;s the products that touch your guest&apos;s skin. The linens surrounding them. The
                    treatment table beneath them. The water they enter. The air they breathe. The relaxation lounge.
                    The locker room. The surfaces they touch.
                  </p>
                  <p>
                    These details collectively create an experience, even when your guests never consciously think
                    about them.
                  </p>
                  <p className="font-semibold text-ink">
                    EnviroBiotics allows your commitment to wellness to extend beyond the treatment itself, to the
                    environment surrounding every guest.
                  </p>
                </div>
              </div>
              <figure className="relative overflow-hidden rounded-sm">
                <img src={spaTreatmentImg} alt="A spa therapist preparing a sunlit treatment room" className="aspect-[4/5] w-full object-cover" width={1280} height={1600} loading="lazy" decoding="async" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-cream/90 px-5 py-4 text-sm text-ink/65 backdrop-blur-sm">
                  Treatment rooms, linens, towels, locker areas, humidity, and constant guest turnover.
                </figcaption>
              </figure>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2">
              <div className="bg-cream p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink/50">Traditional cleaning</p>
                <p className="mt-4 font-display text-xl sm:text-2xl text-ink">Essential, but periodic.</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  Your staff cleans and prepares a treatment room beautifully for the next guest. Then another guest
                  enters. Towels are used. Doors open. People move through the space. The microscopic environment
                  begins changing again.
                </p>
              </div>
              <div className="bg-sage-soft p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink/50">EnviroBiotics</p>
                <p className="mt-4 font-display text-xl sm:text-2xl text-ink">Designed to work continuously between cleaning cycles.</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  Beneficial environmental probiotics are automatically dispersed throughout the environment,
                  extending environmental care into the hours between routine cleanings.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-3xl font-display text-lg sm:text-xl leading-snug text-ink">
              <strong className="font-semibold">
                Your team cares for the room periodically. EnviroBiotics helps manage its microscopic environment
                continuously.
              </strong>
            </p>
            <p className="mt-3 text-xs sm:text-sm text-ink/55">
              EnviroBiotics complements established cleaning and disinfection protocols. It does not replace them.
            </p>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how-it-works" className="scroll-mt-24 bg-sage-soft py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.9rem] sm:text-4xl leading-tight text-ink max-w-3xl">
              Nature doesn&apos;t create balance by eliminating every microorganism.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base sm:text-lg leading-relaxed text-ink/70">
              <p>
                The world around us is naturally populated by complex communities of microorganisms. EnviroBiotics
                brings the principle of beneficial microbial competition into the built environment.
              </p>
              <p>
                Selected beneficial Bacillus environmental probiotics are atomized into microscopic droplets and
                dispersed throughout the space. They travel with normal airflow and settle onto surrounding surfaces
                and objects, where they participate in the microbial ecology of the environment.
              </p>
            </div>

            <ol className="mt-14 grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="relative border-t border-sage/35 pt-7">
                  <span className="text-xs tracking-[0.2em] text-sage">0{i + 1}</span>
                  <s.icon className="mt-4 h-6 w-6 text-sage" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Comparison */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
              Your spa isn&apos;t made of air.
            </h2>
            <div className="mt-10 overflow-hidden rounded-sm">
              <img src={spaLoungeImg} alt="Guests relaxing together in a bright wellness lounge" className="aspect-[4/3] w-full object-cover md:aspect-[16/7]" width={1600} height={1104} loading="lazy" decoding="async" />
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="border-t border-ink/15 pt-7">
                <h3 className="font-display text-xl text-ink">A conventional air purifier</h3>
                <div className="mt-3 space-y-3 text-[0.975rem] leading-relaxed text-ink/70">
                  <p>A conventional air purifier primarily addresses material that physically reaches the machine.</p>
                  <p>
                    But your guest&apos;s experience extends far beyond that airstream, to treatment tables, linens,
                    furniture, carpeting, locker rooms, relaxation areas and the many surfaces surrounding them.
                  </p>
                </div>
              </div>
              <div className="border-t-2 border-sage pt-7">
                <h3 className="font-display text-xl text-ink">EnviroBiotics</h3>
                <div className="mt-3 space-y-3 text-[0.975rem] leading-relaxed text-ink/70">
                  <p>EnviroBiotics takes a whole-environment approach.</p>
                  <p>
                    Airflow becomes the delivery mechanism, carrying beneficial environmental probiotics beyond the
                    device and throughout the treated environment.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-10 max-w-3xl font-display text-lg sm:text-xl leading-snug text-ink">
              <strong className="font-semibold">
                The difference is moving from simply thinking about air purification to thinking about Environmental
                Wellness.
              </strong>
            </p>
          </div>
        </section>

        {/* 5. Social proof */}
        <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-sage)_32%,transparent),transparent_62%)]" />
          <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-soft/80">
              Environmental wellness in practice
            </p>
            <Quote className="mx-auto mt-8 h-9 w-9 text-sage" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-2xl sm:text-4xl md:text-[2.75rem] leading-[1.2] text-cream">
              &ldquo;EnviroBiotics probiotic purification systems have proven to be instrumental in achieving the
              healthy indoor environment standards we set for our spa.&rdquo;
            </blockquote>
            <figcaption className="mt-10 text-sm sm:text-base leading-relaxed text-cream/70">
              <span className="block font-display text-lg text-cream">John Breslin</span>
              <span className="block mt-1">Regional Director Spa Operations, NE</span>
              <span className="block">OneSpaWorld</span>
              <span className="block mt-1 text-cream/55">Mandara Spa at Mohegan Sun</span>
            </figcaption>
            <div className="mt-10">{primaryCta("proof")}</div>
          </div>
        </section>

        {/* 6. Benefits */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink max-w-3xl">
              Environmental Wellness working quietly in the background.
            </h2>
            <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="border-t border-ink/12 pt-6">
                  <b.icon className="h-5 w-5 text-sage" aria-hidden="true" />
                  <dt className="mt-3 font-display text-lg text-ink">{b.title}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-ink/70">{b.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7. Science */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">The science behind the wellness</p>
            <h2 className="mt-4 font-display text-[1.9rem] sm:text-4xl leading-tight text-ink">
              Environmental Wellness sounds simple. The biology behind it is sophisticated.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-ink/70">
              <p>EnviroBiotics uses selected strains of beneficial Bacillus environmental probiotics.</p>
              <p>
                Once dispersed, these organisms are carried by normal airflow throughout the environment and onto
                surrounding surfaces and objects. There, microorganisms compete for available nutrients and
                ecological space.
              </p>
              <p>
                Research into probiotic-based environmental management has examined mechanisms including microbial
                competition and biological degradation of organic material. Published research in healthcare
                environments has also reported reductions in environmental pathogens and antimicrobial-resistance
                genes following probiotic-based environmental interventions.
              </p>
              <p className="border-l-2 border-sage pl-5 text-ink/60">
                That evidence comes from healthcare settings and is contextual: it does not prove identical outcomes
                in every spa or wellness facility.
              </p>
            </div>
            <Link
              to="/research"
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/25 px-6 text-sm text-ink transition-colors hover:bg-sage-soft"
              data-cta="research"
              data-placement="science"
              onClick={() => trackEvent("spa_cta_click", { cta: "research", placement: "science" })}
            >
              Explore the research
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 8. Brand experience */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Wellness your guests can experience</p>
              <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
                Give your guests another reason to feel good about where they are.
              </h2>
              <div className="mt-6 space-y-4 text-[0.975rem] sm:text-base leading-relaxed text-ink/70">
                <p>EnviroBiotics doesn&apos;t have to be something your guests never know about.</p>
                <p>
                  Environmental Wellness can become part of your spa&apos;s story, communicated through an elegant
                  message at reception, in a treatment room, on your website or through your staff.
                </p>
                <p>The message doesn&apos;t need to focus on bacteria, pathogens or cleaning.</p>
                <p>It simply tells your guests:</p>
              </div>
              <p className="mt-5 border-l-2 border-sage pl-5 font-display text-xl sm:text-2xl italic leading-snug text-ink">
                We&apos;ve considered another dimension of your wellbeing.
              </p>
            </div>

            <div className="relative">
              <img
                src={spaTreatmentImg}
                alt=""
                aria-hidden="true"
                className="aspect-[4/5] w-full rounded-sm object-cover"
                width={1280}
                height={1600}
                loading="lazy"
                decoding="async"
              />
              <figure
                className="relative mx-4 -mt-40 rounded-sm border border-ink/10 bg-cream p-2 shadow-[0_30px_60px_-20px_rgba(27,42,42,0.35)] sm:mx-10 sm:-mt-56"
                aria-label="Sample guest-facing signage"
              >
                <div className="border border-sage/40 px-6 py-8 text-center sm:px-9 sm:py-10">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-sage">Environmental Wellness</p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-ink/55">by EnviroBiotics&trade;</p>
                  <span aria-hidden="true" className="mx-auto mt-5 block h-px w-10 bg-sage/50" />
                  <p className="mt-5 font-display text-base sm:text-lg leading-snug text-ink">
                    Our commitment to your wellbeing extends beyond the treatments we provide.
                  </p>
                  <p className="mt-4 text-[0.85rem] leading-relaxed text-ink/65">
                    This spa incorporates EnviroBiotics environmental probiotic technology as another part of the
                    environment we&apos;ve thoughtfully created for our guests.
                  </p>
                  <p className="mt-5 font-display text-[0.95rem] sm:text-base italic leading-snug text-ink/80">
                    Because wellness isn&apos;t only about what touches you.
                    <span className="block">It&apos;s also about what surrounds you.</span>
                  </p>
                </div>
                <figcaption className="mt-2 text-center text-[0.7rem] uppercase tracking-[0.18em] text-ink/45">
                  Sample guest-facing signage
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 9. Product fit */}
        <section id="systems" className="scroll-mt-24 bg-sage-soft py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">One philosophy. A system for every spa.</p>
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl leading-tight text-ink max-w-3xl">
              Bring Environmental Wellness to spaces of virtually any size.
            </h2>

            <div className="mt-12 space-y-10">
              <article className="grid gap-6 border-t border-ink/12 pt-8 sm:grid-cols-[180px_1fr] sm:items-start">
                <img src={biologicMiniImg} alt="BioLogic Mini environmental probiotic diffuser" className="mx-auto h-40 w-auto object-contain" width={220} height={220} loading="lazy" />
                <div>
                  <h3 className="font-display text-2xl text-ink">BioLogic Mini</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sage">Individual Environmental Wellness</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    For individual treatment and massage rooms, reception areas, offices and smaller studios.
                  </p>
                  <p className="mt-2 text-sm text-ink/60">Up to 300 sq. ft. &nbsp;|&nbsp; $98</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 min-h-[44px] rounded-full border-ink/25 text-ink hover:bg-ink/5"
                    data-cta="product"
                    data-placement="systems-biologic-mini"
                  >
                    <Link to="/product/biologic-mini" onClick={() => trackEvent("spa_cta_click", { cta: "product", placement: "systems", product: "biologic-mini" })}>
                      View BioLogic Mini
                    </Link>
                  </Button>
                </div>
              </article>

              <article className="grid gap-6 border-t border-ink/12 pt-8 sm:grid-cols-[180px_1fr] sm:items-start">
                <img src={biotica800Img} alt="Biotica 800 probiotic purification system" className="mx-auto h-40 w-auto object-contain" width={220} height={220} loading="lazy" />
                <div>
                  <h3 className="font-display text-2xl text-ink">Biotica 800</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sage">Multi-Room Environmental Wellness</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    For relaxation lounges, larger treatment suites, reception areas and studio floors.
                  </p>
                  <p className="mt-2 text-sm text-ink/60">Up to 800 sq. ft. &nbsp;|&nbsp; $299</p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 min-h-[44px] rounded-full border-ink/25 text-ink hover:bg-ink/5"
                    data-cta="product"
                    data-placement="systems-biotica-800"
                  >
                    <Link to="/product/biotica-800" onClick={() => trackEvent("spa_cta_click", { cta: "product", placement: "systems", product: "biotica-800" })}>
                      View Biotica 800
                    </Link>
                  </Button>
                </div>
              </article>

              <article className="grid gap-6 border-t-2 border-sage pt-8 sm:grid-cols-[180px_1fr] sm:items-start">
                <img src={proImg} alt="E-Biotic Pro HVAC-integrated probiotic system" className="mx-auto h-40 w-full rounded-2xl object-cover sm:w-auto" width={220} height={220} loading="lazy" />
                <div>
                  <h3 className="font-display text-2xl text-ink">E-Biotic Pro</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sage">Whole-Facility Environmental Wellness</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    HVAC-integrated environmental probiotic distribution for larger spas, resorts, wellness centers and
                    multi-room facilities.
                  </p>
                  <p className="mt-2 text-sm text-ink/60">Specified by Facility</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {primaryCta("systems-pro", "w-full sm:w-auto")}
                    <Button
                      asChild
                      variant="ghost"
                      className="min-h-[44px] rounded-full text-ink hover:bg-ink/5"
                      data-cta="product"
                      data-placement="systems-ebiotic-pro"
                    >
                      <Link to="/product/ebiotic-pro" onClick={() => trackEvent("spa_cta_click", { cta: "product", placement: "systems", product: "ebiotic-pro" })}>
                        See specifications
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-14 border-y border-sage/30 bg-cream px-5 py-10 text-center sm:px-10">
              <h3 className="font-display text-2xl text-ink">Not sure which fits?</h3>
              <p className="mx-auto mt-3 max-w-xl text-[0.975rem] leading-relaxed text-ink/70">
                Tell us the size of your space and how it&apos;s used. We&apos;ll come back with a recommendation
                built around your rooms, not a generic spec sheet.
              </p>
              <div className="mt-6 flex justify-center">{primaryCta("not-sure")}</div>
            </div>
          </div>
        </section>

        {/* 10. Lead form */}
        <section id="recommendation" className="scroll-mt-24 bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">A considered recommendation, not a sales script</p>
            <h2 className="mt-4 font-display text-[1.9rem] sm:text-4xl leading-tight text-ink">
              Let us design an Environmental Wellness solution for your spa.
            </h2>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-ink/70">
              Tell us about your facility: its size, number of treatment rooms and how the space is used. Our team
              will recommend an EnviroBiotics system designed around your environment rather than a generic
              specification.
            </p>
            <p className="mt-2 text-xs text-ink/55">
              Fields marked <span aria-hidden="true">*</span> are required.
            </p>

            {submitted ? (
              <div className="mt-10 rounded-3xl border border-sage/40 bg-sage-soft p-8 text-center" role="status" aria-live="polite">
                <CheckCircle2 className="mx-auto h-9 w-9 text-sage" aria-hidden="true" />
                <p className="mt-4 font-display text-xl text-ink">Request received.</p>
                <p className="mt-2 text-[0.975rem] text-ink/70">
                  Thank you. Our team will review your facility details and follow up by email, typically within one
                  business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5 border-t border-ink/15 pt-8" noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="spa-name">Name *</Label>
                    <Input id="spa-name" name="name" required autoComplete="name" className="min-h-[48px] bg-background text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spa-email">Work email *</Label>
                    <Input id="spa-email" name="email" type="email" required autoComplete="email" className="min-h-[48px] bg-background text-base" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="spa-facility">Facility name *</Label>
                    <Input id="spa-facility" name="facility" required className="min-h-[48px] bg-background text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spa-type">Facility type</Label>
                    <Select value={facilityType} onValueChange={setFacilityType}>
                      <SelectTrigger id="spa-type" className="min-h-[48px] bg-background text-base">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {facilityTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="spa-size">Approx. square footage or rooms *</Label>
                    <Input id="spa-size" name="size" required placeholder="e.g. 4,000 sq ft / 6 treatment rooms" className="min-h-[48px] bg-background text-base" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spa-phone">Phone (optional)</Label>
                    <Input id="spa-phone" name="phone" type="tel" autoComplete="tel" className="min-h-[48px] bg-background text-base" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spa-message">Anything else? (optional)</Label>
                  <Textarea id="spa-message" name="message" rows={4} className="bg-background text-base" placeholder="Locker rooms, humidity, odor concerns, HVAC setup..." />
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">{error}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  variant="hero"
                  className="min-h-[48px] w-full text-base"
                  disabled={submitting}
                  data-cta="facility-recommendation"
                  data-placement="form-submit"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : (
                    <>Get My Facility Recommendation</>
                  )}
                </Button>
                <p className="text-xs text-ink/55">
                  Prefer email? Write to{" "}
                  <a className="underline underline-offset-2" href="mailto:contact@envirobiotics.com">contact@envirobiotics.com</a>.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="bg-cream pb-20 sm:pb-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">Questions spa teams ask</h2>
            <div className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
                    {f.q}
                    <span aria-hidden="true" className="text-sage transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Final CTA */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <img src={spaLoungeImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1104} loading="lazy" decoding="async" />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />
          <div className="relative mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cream/75">
              Wellness Beyond the Treatment&trade;
            </p>
            <h2 className="mt-5 font-display text-[1.9rem] sm:text-5xl leading-[1.1] text-cream">
              Wellness isn&apos;t just what you do.
              <span className="block italic font-normal text-cream/85">It&apos;s the environment you create.</span>
            </h2>
            <div className="mx-auto mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-cream/80">
              <p>Your guests trust you with their wellbeing.</p>
              <p>
                You carefully select the treatments they receive, the products that touch their skin, the linens
                surrounding them, the water they enter and the spaces where they relax.
              </p>
              <p>Now there is another dimension of wellness to consider.</p>
              <p className="font-display text-xl sm:text-2xl italic text-cream">The environment itself.</p>
              <p>
                EnviroBiotics brings the principles of beneficial biology into the built environment, working
                continuously and quietly in the background as another layer of care for the spaces you&apos;ve worked
                so carefully to create.
              </p>
            </div>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta("final")}
              <Button
                asChild
                variant="outline"
                className="min-h-[48px] w-full sm:w-auto rounded-full border-cream/40 bg-transparent text-base text-cream hover:bg-cream/10 hover:text-cream"
                data-cta="shop"
                data-placement="final"
              >
                <Link to="/product/biologic-mini" onClick={() => trackEvent("spa_cta_click", { cta: "shop", placement: "final", product: "biologic-mini" })}>
                  Shop a single-room system
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 p-3 backdrop-blur md:hidden">
        <Button
          size="lg"
          variant="hero"
          className="min-h-[48px] w-full text-base"
          data-cta="facility-recommendation"
          data-placement="sticky-mobile"
          onClick={() => {
            trackEvent("spa_cta_click", { cta: "facility_recommendation", placement: "sticky_mobile" });
            scrollTo("recommendation");
          }}
        >
          Get a Facility Recommendation
        </Button>
      </div>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
