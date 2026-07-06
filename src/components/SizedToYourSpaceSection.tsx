import { ScrollReveal } from "@/components/ui/scroll-reveal";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";
import biotica800 from "@/assets/biotica800-hero.avif";

const CERTS = [
  "EPA Registered",
  "FDA GRAS",
  "AllergyUK",
  "PTPA Winner",
  "MADE SAFE®",
];

type Product = {
  tag: string;
  name: string;
  subline: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  shopUrl: string;
  learnUrl: string;
};

const products: Product[] = [
  {
    tag: "Up to 300 sq ft",
    name: "BioLogic Mini",
    subline: "Portable · a single room",
    body: "Your personal, take-anywhere unit. Compact enough to plug in at home and pack for the road.",
    imageSrc: biologicMini,
    imageAlt: "BioLogic Mini probiotic air purifier next to a phone on a wooden table",
    shopUrl: "https://shop.envirobiotics.com/products/biologic-mini",
    learnUrl: "/product/biologic-mini",
  },
  {
    tag: "300 to 800 sq ft",
    name: "Biotica 800",
    subline: "Set-and-forget · a larger shared space",
    body: "Set-and-forget coverage for the spaces you spend the most time in.",
    imageSrc: biotica800,
    imageAlt: "Biotica 800 ecological balancing system on a wooden table with reading glasses",
    shopUrl: "https://shop.envirobiotics.com/products/biotica-800",
    learnUrl: "/product/biotica-800",
  },
];

export const SizedToYourSpaceSection = () => {
  return (
    <section id="find-your-system" className="py-24 sm:py-32 lg:py-36 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 mx-auto text-center">
            <h2 className="font-display font-bold text-foreground">
              <span
                className="block text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem] text-balance"
                style={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
              >
                Find the system
              </span>
              <span
                className="block mt-1 sm:mt-2 font-display italic font-light text-heading-accent text-[1.5rem] sm:text-[2rem] lg:text-[2.35rem]"
                style={{ lineHeight: 1.2 }}
              >
                that suits your space.
              </span>
            </h2>
            <p
              className="mt-8 font-semibold text-foreground max-w-2xl mx-auto text-[1.1rem] sm:text-[1.25rem] lg:text-[1.35rem]"
              style={{ lineHeight: 1.5 }}
            >
              Risk-free for 30 days. Try it at home. If it does not fit your needs, return it for a full refund. No questions asked.
            </p>
          </div>

        </ScrollReveal>

        {/* Products */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {products.map((p) => (
            <ScrollReveal key={p.name} variant="fadeUp">
              <article className="group rounded-2xl border border-foreground/10 bg-card overflow-hidden hover:border-foreground/20 transition-colors h-full flex flex-col relative">
                <div className="absolute z-10 m-5">
                  <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground bg-background/85 backdrop-blur px-3 py-1.5 rounded-full border border-foreground/10">
                    {p.tag}
                  </span>
                </div>
                <div className="relative w-full bg-gradient-to-b from-muted/40 to-muted/10 aspect-[4/3] min-h-[260px] flex items-center justify-center p-10">
                  <img
                    src={p.imageSrc}
                    alt={p.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-2xl font-display font-bold text-foreground">
                    {p.name}
                  </h4>
                  <p className="mt-1 text-sm text-heading-accent italic mb-5">
                    {p.subline}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    {p.body}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <a
                      href={p.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
                      }}
                    >
                      Buy
                    </a>
                    <a
                      href={p.learnUrl}
                      className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-all hover:-translate-y-0.5"
                      style={{ borderColor: "hsl(var(--foreground) / 0.2)" }}
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Certifications */}
        <ScrollReveal>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {CERTS.map((c) => (
              <li
                key={c}
                className="inline-flex items-center rounded-xl border border-foreground/10 bg-card px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80"
              >
                {c}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
};
