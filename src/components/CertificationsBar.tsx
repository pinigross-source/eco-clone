import certIcons from "@/assets/certifications-icons.svg";
import fdaLogo from "@/assets/fda-gras.png.asset.json";

export const CertificationsBar = () => {
  return (
    <section
      aria-label="Certifications and trust badges"
      className="border-y border-border bg-background"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-10 sm:py-6 lg:px-16">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Trusted by leading certifications
        </p>
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-center gap-0">
          <img
            src={fdaLogo.url}
            alt="FDA GRAS Approved"
            className="h-16 w-auto shrink-0 sm:h-20 lg:h-24 object-contain"
            loading="lazy"
            decoding="async"
          />
          <img
            src={certIcons}
            alt="EPA Registered, AllergyUK, PTPA, ISO 9001, Italian Certification, Chilean Certification"
            width={1120}
            height={300}
            className="-ml-6 w-full max-w-[1120px] h-auto object-contain [image-rendering:auto] sm:-ml-7 lg:-ml-8"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
