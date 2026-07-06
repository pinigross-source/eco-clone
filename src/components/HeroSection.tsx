import { Link } from "@/lib/link";
import { ArrowRight } from "lucide-react";
import heroMediaAsset from "@/assets/hero-desktop-family.avif.asset.json";

// TODO: swap `heroMediaAsset.url` with the hero GIF once uploaded via Lovable Assets.
const heroMedia = heroMediaAsset.url;

const HERO_FONT = '"Hanken Grotesk", system-ui, -apple-system, sans-serif';

export const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#F4F0E7", fontFamily: HERO_FONT }}
    >
      {/* Full-bleed background media */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroMedia}
          alt="EnviroBiotics environmental probiotics in motion"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(244,240,231,0.15) 0%, rgba(244,240,231,0.55) 45%, rgba(244,240,231,0.9) 100%)",
          }}
        />
      </div>

      {/* Copy column — right-aligned on desktop, centered on mobile */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-28 pb-20 sm:px-10 sm:pt-32 sm:pb-24 lg:px-16 lg:pt-40 lg:pb-32">
        <div className="mx-auto max-w-[720px] text-center lg:mx-0 lg:ml-[40%] lg:text-left">
          <h1
            className="font-display font-bold text-balance text-foreground text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem]"
            style={{ lineHeight: 1.05, letterSpacing: "normal" }}
          >
            Your Health.
            <br />
            <strong className="font-bold">Your Choice.</strong>
          </h1>

          <p
            className="mt-6 font-display italic font-light text-heading-accent text-balance text-[1.15rem] sm:text-[1.5rem] lg:text-[1.75rem]"
            style={{ lineHeight: 1.2 }}
          >
            Healthy diet. Active lifestyle.
            <br className="hidden sm:block" />
            But true wellness starts with your indoor environment,
            <br className="hidden sm:block" />
            where you spend 90% of your life.
          </p>

          <p
            className="mt-6 mx-auto lg:mx-0 max-w-[640px] text-muted-foreground text-[1.05rem] sm:text-[1.15rem] lg:text-[1.25rem]"
            style={{ lineHeight: 1.6 }}
          >
            Restore the natural balance of your indoor ecosystem.
            <br className="hidden sm:block" />
            Reduce harmful pathogens, mold, bacteria, and allergens
            <br className="hidden sm:block" />
            with Active Environmental Probiotics®.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "#1F2328",
                color: "#F4F0E7",
                fontWeight: 600,
                fontSize: "1.08rem",
                padding: "0.72em 0.72em 0.72em 1.4em",
                minHeight: 48,
                boxShadow: "0 12px 30px -12px rgba(31,35,40,0.55)",
              }}
            >
              Choose Your System
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: 32, height: 32, background: "rgba(244,240,231,0.18)" }}
              >
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(31,35,40,0.22)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "#1F2328",
                fontWeight: 600,
                fontSize: "1.08rem",
                padding: "0.72em 1.4em",
                minHeight: 48,
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
