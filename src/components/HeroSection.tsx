import { Link } from "@/lib/link";
import heroMediaAsset from "@/assets/hero-desktop-family.avif.asset.json";

// TODO: swap `heroMediaAsset.url` with the hero GIF once uploaded via Lovable Assets.
const heroMedia = heroMediaAsset.url;

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:grid-cols-12 lg:gap-14 lg:px-16 lg:pt-40 lg:pb-28">
        {/* Text side */}
        <div className="lg:col-span-6 xl:col-span-6">
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.035em] text-foreground">
            <span className="block text-[2.8rem] xs:text-[3.2rem] sm:text-[4rem] md:text-[4.6rem] lg:text-[5.4rem]">
              Your Health.
            </span>
            <span className="block text-[2.6rem] xs:text-[3rem] sm:text-[3.6rem] md:text-[4.2rem] lg:text-[5rem] text-heading-accent italic font-normal leading-[1]">
              Your Choice.
            </span>
          </h1>

          <p className="mt-7 max-w-xl font-serif italic text-lg sm:text-xl lg:text-2xl leading-snug text-foreground/85">
            Healthy diet. Active lifestyle.
            <br />
            But true wellness starts with your indoor environment,
            <br className="hidden sm:block" />
            where you spend 90% of your life.
          </p>

          <p className="mt-6 max-w-xl text-[1rem] sm:text-[1.05rem] leading-[1.65] text-foreground/70">
            Restore the natural balance of your indoor ecosystem. Reduce harmful pathogens, mold, bacteria, and allergens with Active Environmental Probiotics®.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.55)",
              }}
            >
              Choose Your System
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-foreground transition-all hover:-translate-y-0.5"
              style={{ borderColor: "hsl(var(--foreground) / 0.2)" }}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Media slot — GIF goes here */}
        <div className="lg:col-span-6 xl:col-span-6">
          <div
            data-hero-media-slot
            className="relative w-full overflow-hidden rounded-3xl bg-muted aspect-[4/3] sm:aspect-[5/4] lg:aspect-square"
          >
            <img
              src={heroMedia}
              alt="EnviroBiotics environmental probiotics in motion"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
