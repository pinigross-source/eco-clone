export const NatureStatementSection = () => {
  return (
    <section
      aria-label="Nature statement"
      className="hidden lg:block w-full bg-background border-t border-foreground/5"
    >
      <div className="site-container py-14 sm:py-32 lg:py-40 text-center">
        <h2
          className="font-display font-bold text-balance text-foreground text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]"
          style={{ lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Probiotics collected from nature in their pure state; nothing is modified or added.
        </h2>
        <p className="mt-5 sm:mt-6 font-display font-medium text-[1.15rem] sm:text-[1.35rem] lg:text-[1.5rem] leading-[1.4] text-muted-foreground text-balance text-center max-w-4xl mx-auto">
          Nature's wisdom, imported indoors.
        </p>
      </div>
    </section>
  );
};

