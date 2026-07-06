export const NatureStatementSection = () => {
  return (
    <section
      aria-label="Nature statement"
      className="w-full bg-background border-t border-foreground/5"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-24 sm:py-32 lg:py-40 text-center">
        <h2
          className="font-display font-bold text-balance text-foreground text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]"
          style={{ lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Probiotics collected from nature in their pure state; nothing is modified or added.
        </h2>
        <p
          className="mt-5 sm:mt-6 font-display italic font-light text-heading-accent text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]"
          style={{ lineHeight: 1.3 }}
        >
          Nature's wisdom, imported indoors.
        </p>
      </div>
    </section>
  );
};

