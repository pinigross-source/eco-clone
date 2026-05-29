import certIcons from "@/assets/certifications-icons.svg";

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
        <img
          src={certIcons}
          alt="EPA Registered, FDA GRAS, AllergyUK, PTPA, ISO 9001, Italian Certification, Chilean Certification"
          width={1120}
          height={300}
          className="mx-auto w-full max-w-[1120px] h-auto object-contain [image-rendering:auto]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};
