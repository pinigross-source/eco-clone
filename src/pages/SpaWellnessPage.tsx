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
import hospitalityAsset from "@/assets/biz-hospitality.jpg.asset.json";
import ebioticProOfficeAsset from "@/assets/ebiotic-pro-office.avif.asset.json";
import biologicMiniImg from "@/assets/biologic-mini-nobg-new.avif";
import biotica800Asset from "@/assets/shop/biotica-800.png.asset.json";

const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const heroImg = hospitalityAsset.url;
const proImg = ebioticProOfficeAsset.url;
const biotica800Img = biotica800Asset.url;

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const steps = [
  {
    icon: Waves,
    title: "Disperse",
    body: "The system releases beneficial environmental probiotics into the occupied space in a fine, invisible mist.",
  },
  {
    icon: Wind,
    title: "Travel with airflow",
    body: "They move with normal air movement, reaching treatment rooms, corridors, and the surfaces in between.",
  },
  {
    icon: Repeat,
    title: "Support balance",
    body: "Once settled, they compete for the nutrients and ecological space that unwanted organisms rely on \u2014 across air, surfaces, and objects.",
  },
];

const benefits = [
  { icon: Repeat, title: "Continuous operation", body: "Designed to work between cleaning cycles, day and night, without staff involvement." },
  { icon: Waves, title: "Whole-environment approach", body: "Air, surfaces, fabrics, and objects \u2014 not only what passes through a machine." },
  { icon: Leaf, title: "Biological competition", body: "Beneficial organisms compete for resources instead of relying on chemical residues." },
  { icon: Wind, title: "Odor management", body: "Can help address the organic material associated with lingering odors in treatment and locker areas." },
  { icon: CheckCircle2, title: "Complements your protocols", body: "Sits alongside your existing cleaning and disinfection routine \u2014 it does not replace it." },
  { icon: Sparkles, title: "Low maintenance", body: "Cartridge replacement on a simple schedule. No filters to change on the diffuser systems." },
];

const faqs = [
  {
    q: "Does this replace normal cleaning or disinfection?",
    a: "No. EnviroBiotics is designed to complement your existing cleaning and disinfection protocols by working continuously in between them. Your cleaning schedule stays exactly as it is.",
  },
  {
    q: "How does it differ from a conventional air purifier?",
    a: "A conventional purifier primarily treats air that physically reaches the machine. EnviroBiotics disperses environmental probiotics that travel with normal airflow and settle across surfaces and objects, so the approach covers the whole environment rather than a single airstream.",
  },
  {
    q: "Will it reach treatment-room surfaces and objects?",
    a: "That is the intent of the design. The probiotics are carried by normal air movement and settle on surrounding surfaces \u2014 treatment tables, furniture, flooring, and fabrics \u2014 where they continue to compete for nutrients and space.",
  },
  {
    q: "Which system is right for a single room versus a multi-room facility?",
    a: "A single treatment room, reception area, or small studio is typically served by the BioLogic Mini (up to 300 sq ft) or the Biotica 800 (up to 800 sq ft). Larger spas, wellness centers, and resorts are usually specified with E-Biotic Pro, which integrates with HVAC ductwork so distribution follows the airflow you already run.",
  },
  {
    q: "What maintenance is required?",
    a: "Cartridge replacement on a set schedule \u2014 every 90 days for the BioLogic Mini and every 180 days for E-Biotic Pro. There are no filters to change on the probiotic diffuser systems.",
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
          subject: `Spa facility recommendation request \u2014 ${facility}`,
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
        <section className="relative w-full overflow-hidden">
          <div className="relative min-h-[78vh] md:min-h-[86vh] w-full">
            <img
              src={heroImg}
              alt="Serene, sunlit spa reception with natural wood, soft light, and plants"
              className="absolute inset-0 h-full w-full object-cover"
              width={1600}
              height={1600}
              fetchPriority="high"
              decoding="async"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/25 md:bg-gradient-to-r md:from-ink/90 md:via-ink/60 md:to-transparent"
            />
            <div className="relative mx-auto flex min-h-[78vh] md:min-h-[86vh] max-w-6xl items-end md:items-center px-5 sm:px-8 pb-14 md:pb-0 pt-28">
              <div className="max-w-2xl">
                <p className="text-[0.7rem] sm:text-xs uppercase tracking-[0.22em] text-cream/75">
                  Environmental wellness for spas
                </p>
                <h1 className="mt-5 font-display text-[2rem] leading-[1.12] sm:text-5xl md:text-[3.4rem] text-cream">
                  Your spa is dedicated to wellness.{" "}
                  <span className="italic font-normal text-cream/85">Shouldn&apos;t your environment be too?</span>
                </h1>
                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-cream/85">
                  EnviroBiotics takes a different, biological approach to indoor environmental purification.
                  Beneficial environmental probiotics are dispersed continuously, working across air, surfaces,
                  and objects to complement the cleaning you already do.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {primaryCta("hero", "w-full sm:w-auto")}
                  <Button
                    size="lg"
                    variant="outline"
                    className="min-h-[48px] w-full sm:w-auto rounded-full border-cream/45 bg-transparent text-base text-cream hover:bg-cream/10 hover:text-cream"
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
                <p className="mt-6 text-sm text-cream/70">
                  Continuous &nbsp;•&nbsp; Low maintenance &nbsp;•&nbsp; Complements routine cleaning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Problem */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink max-w-3xl">
              Your clients notice every detail. The microscopic environment deserves the same care.
            </h2>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ink/70">
              You already control the treatments, the skincare, the water, the fragrance. The environment around
              them is harder to see: treatment tables and linens, robes and towels, carpeting and locker rooms,
              showers and humidity, and a steady turnover of guests through every room.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2">
              <div className="bg-cream p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink/50">Traditional cleaning</p>
                <p className="mt-4 font-display text-xl sm:text-2xl text-ink">Essential, but periodic.</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  It resets a room to a clean baseline. The moment the next guest walks in, the environment begins
                  to change again.
                </p>
              </div>
              <div className="bg-sage-soft p-7 sm:p-9">
                <p className="text-xs uppercase tracking-[0.18em] text-ink/50">EnviroBiotics</p>
                <p className="mt-4 font-display text-xl sm:text-2xl text-ink">Designed to work continuously.</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  It runs between cleaning cycles, supporting the environment in the hours your team isn&apos;t in
                  the room. It does not replace cleaning or disinfection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how-it-works" className="scroll-mt-24 bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-cream max-w-3xl">
              Nature doesn&apos;t create healthy environments by sterilizing them.
            </h2>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-cream/75">
              In a balanced environment, organisms compete for the same nutrients and the same space. EnviroBiotics
              applies that principle indoors: beneficial environmental probiotics are dispersed into the occupied
              space and compete for the resources and ecological room that unwanted organisms depend on.
            </p>

            <ol className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="text-xs tracking-[0.2em] text-cream/45">0{i + 1}</span>
                  <s.icon className="mt-4 h-6 w-6 text-sage" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-cream/70">{s.body}</p>
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
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="border-t border-ink/15 pt-7">
                <h3 className="font-display text-xl text-ink">A conventional air purifier</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  Primarily addresses the material that physically reaches the machine. Everything outside that
                  airstream &mdash; the table your guest lies on, the robe they wear, the floor they walk across &mdash;
                  is untouched by it.
                </p>
              </div>
              <div className="border-t-2 border-sage pt-7">
                <h3 className="font-display text-xl text-ink">EnviroBiotics</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                  Takes a whole-environment approach: treatment rooms, massage tables, reception areas, furniture,
                  floors and carpeting, locker rooms, surfaces, objects &mdash; and the air that moves between them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Social proof */}
        <section className="bg-sage-soft py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <Quote className="mx-auto h-7 w-7 text-sage" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-xl sm:text-3xl leading-snug text-ink">
              &ldquo;EnviroBiotics probiotic purification systems have proven to be instrumental in achieving the
              healthy indoor environment standards we set for our spa.&rdquo;
            </blockquote>
            <figcaption className="mt-7 text-sm leading-relaxed text-ink/70">
              <span className="block font-medium text-ink">John Breslin</span>
              Regional Director Spa Operations, NE &mdash; OneSpaWorld
              <span className="block mt-1 text-ink/55">Mandara Spa at Mohegan Sun</span>
            </figcaption>
            <div className="mt-9">{primaryCta("proof")}</div>
          </div>
        </section>

        {/* 6. Benefits */}
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
              What it brings to a wellness facility
            </h2>
            <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="border-t border-ink/12 pt-6">
                  <b.icon className="h-5 w-5 text-sage" aria-hidden="true" />
                  <dt className="mt-3 font-display text-lg text-ink">{b.title}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-ink/70">{b.body}</dd>
                </div>
              ))}
              <div className="border-t border-ink/12 pt-6">
                <Sparkles className="h-5 w-5 text-sage" aria-hidden="true" />
                <dt className="mt-3 font-display text-lg text-ink">A wellness story worth telling</dt>
                <dd className="mt-2 text-[0.975rem] leading-relaxed text-ink/70">
                  A sustainability-aligned approach your guests can understand in a sentence.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* 7. Science */}
        <section className="bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-cream">
              A biological approach grounded in environmental microbiology.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-cream/75">
              <p>
                A 2024 peer-reviewed review describes environmental probiotic cleaning as a biological approach in
                which beneficial organisms compete for nutrients and habitat, and discusses the biological
                degradation of organic material along with potential odor-control mechanisms.
              </p>
              <p>
                Published studies in healthcare environments have reported reductions in environmental pathogens and
                in antimicrobial-resistance genes following probiotic-based environmental interventions.
              </p>
              <p className="text-cream/60">
                That evidence comes from healthcare settings and is contextual: it does not prove identical outcomes
                in every spa or wellness facility.
              </p>
            </div>
            <Link
              to="/research"
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cream/35 px-6 text-sm text-cream transition-colors hover:bg-cream/10"
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
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 sm:px-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
                More than clean. An environment that reflects your brand.
              </h2>
              <p className="mt-6 text-[0.975rem] sm:text-base leading-relaxed text-ink/70">
                Environmental wellness is easy to make visible. A line at reception, a note in the treatment room,
                a paragraph on your website &mdash; it tells guests that the care extends past the treatment itself.
              </p>
              <figure className="mt-8 border-l-2 border-sage pl-6">
                <blockquote className="font-display text-lg sm:text-xl italic leading-snug text-ink">
                  &ldquo;Our commitment to wellness doesn&apos;t stop with the treatments we provide. We&apos;ve
                  incorporated environmental probiotic purification as another part of the environment we create for
                  our guests.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink/55">Sample guest-facing statement</figcaption>
              </figure>
            </div>
            <img
              src={proImg}
              alt="Calm, softly lit interior with an EnviroBiotics system supporting the environment"
              className="h-full w-full rounded-3xl object-cover"
              width={900}
              height={1100}
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* 9. Product fit */}
        <section id="systems" className="scroll-mt-24 bg-sage-soft py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
              Which EnviroBiotics system fits your spa?
            </h2>

            <div className="mt-12 space-y-10">
              <article className="grid gap-6 border-t border-ink/12 pt-8 sm:grid-cols-[180px_1fr] sm:items-start">
                <img src={biologicMiniImg} alt="BioLogic Mini environmental probiotic diffuser" className="mx-auto h-40 w-auto object-contain" width={220} height={220} loading="lazy" />
                <div>
                  <h3 className="font-display text-2xl text-ink">BioLogic Mini</h3>
                  <p className="mt-1 text-sm text-ink/60">Up to 300 sq ft &middot; $98</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    Individual treatment and massage rooms, reception desks, offices, and smaller studios. Ultra-quiet,
                    cordless, 90-day cartridge.
                  </p>
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
                  <p className="mt-1 text-sm text-ink/60">Up to 800 sq ft &middot; $299</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    Broader distribution for relaxation lounges, larger treatment suites, reception areas, and studio
                    floors.
                  </p>
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
                  <p className="mt-1 text-sm text-ink/60">Multi-room facilities &middot; HVAC-integrated &middot; Specified per facility</p>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-ink/70">
                    For larger spas, wellness centers, resorts, and multi-room facilities. It installs into existing
                    ductwork and distributes with the airflow you already run, with a 180-day cartridge.
                  </p>
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

            <div className="mt-14 rounded-3xl bg-cream p-8 text-center sm:p-10">
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
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-ink">
              Get a facility recommendation
            </h2>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-ink/70">
              Share a few details and our team will respond with a system recommendation for your space. Fields
              marked <span aria-hidden="true">*</span> are required.
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
              <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate={false}>
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
                    <>Get a Facility Recommendation</>
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
        <section className="bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="font-display text-[1.75rem] sm:text-4xl leading-tight text-cream">
              Make wellness more than a service you provide.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/75">
              You already think carefully about what touches your clients. Now think about what surrounds them.
            </p>
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
