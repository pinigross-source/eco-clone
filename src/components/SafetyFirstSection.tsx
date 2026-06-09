import epaAsset from "@/assets/certs/cert_0.png.asset.json";
import ispAsset from "@/assets/certs/cert_1.png.asset.json";
import simaAsset from "@/assets/certs/cert_2.png.asset.json";
import isoAsset from "@/assets/certs/cert_3.png.asset.json";
import allergyAsset from "@/assets/certs/cert_4.png.asset.json";
import madeSafeAsset from "@/assets/certs/cert_5.png.asset.json";
import sensitiveAsset from "@/assets/certs/cert_6.png.asset.json";
import ecocertAsset from "@/assets/certs/cert_7.png.asset.json";
import fdaGrasAsset from "@/assets/certs/fda_gras_v2.png.asset.json";
import ptpaAsset from "@/assets/certs/ptpa_v2.png.asset.json";

const certifications = [
  { label: "EPA Registered", image: epaAsset.url },
  { label: "FDA GRAS", image: fdaGrasAsset.url },
  { label: "PTPA Winner", image: ptpaAsset.url },
  { label: "Instituto de Salud Pública", image: ispAsset.url },
  { label: "Società Italiana di Medicina Ambientale", image: simaAsset.url },
  { label: "ISO 9001:2015", image: isoAsset.url },
  { label: "AllergyUK", image: allergyAsset.url },
  { label: "MADE SAFE®", image: madeSafeAsset.url },
  { label: "Sensitive Choice", image: sensitiveAsset.url },
  { label: "EcoCert", image: ecocertAsset.url },
];

export const SafetyFirstSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 sm:py-32 lg:py-36">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.07) 0%, transparent 70%), radial-gradient(40% 35% at 15% 100%, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center sm:mb-20">
          <h2
            className="mb-6 font-sans font-bold tracking-[-0.035em] text-[2.5rem] leading-[1.05] sm:text-[3.25rem] lg:text-[3.75rem]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Your Safety.{" "}
            <span className="text-heading-accent italic font-normal">Our Promise.</span>
          </h2>

          <p
            className="text-[1.075rem] leading-[1.7] sm:text-[1.2rem]"
            style={{ color: "hsl(var(--foreground) / 0.78)" }}
          >
            Collected from nature in its pure state, never modified and free of
            added chemicals. Our probiotics are safe and effective for children,
            people with illnesses, pets, and the elderly. Independently
            verified by leading global safety authorities.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-7">
          {certifications.map((c) => (
            <div
              key={c.label}
              title={c.label}
              className="group relative flex aspect-square items-center justify-center rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
              style={{
                background: "#ffffff",
                border: "1px solid hsl(var(--foreground) / 0.08)",
                boxShadow:
                  "0 1px 2px hsl(var(--foreground) / 0.04), 0 24px 48px -28px hsl(var(--primary) / 0.28)",
              }}
            >
              <img
                src={c.image}
                alt={`${c.label} certification`}
                loading="lazy"
                className="max-h-[78%] max-w-[82%] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Pure-nature footer line */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center lg:mt-20">
          <span
            className="text-[0.9rem] font-semibold uppercase tracking-[0.28em] sm:text-[1.05rem]"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Pure, beneficial probiotics from nature
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.9rem] font-medium uppercase tracking-[0.22em] sm:text-[1.05rem]"
            style={{ color: "hsl(var(--foreground) / 0.7)" }}
          >
            <span>No chemicals</span>
            <span style={{ color: "hsl(var(--primary))" }}>·</span>
            <span>No gases</span>
            <span style={{ color: "hsl(var(--primary))" }}>·</span>
            <span>No artificial substances</span>
          </div>
        </div>
      </div>
    </section>
  );
};
