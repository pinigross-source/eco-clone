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
      </div>
    </section>
  );
};

