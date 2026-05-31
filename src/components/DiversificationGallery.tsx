import { ScrollReveal } from "@/components/ui/scroll-reveal";
import office from "@/assets/diversification-office.jpg";
import study from "@/assets/diversification-study.jpg";
import transit from "@/assets/diversification-transit.jpg";
import gym from "@/assets/diversification-gym.jpg";

const items = [
  { img: office, label: "Offices" },
  { img: study, label: "Places of study" },
  { img: transit, label: "Transportation" },
  { img: gym, label: "Gyms" },
];

export const DiversificationGallery = () => {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-5 sm:px-6">
        <ScrollReveal variant="fadeUp" className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-muted-foreground/70 mb-5">
            Beyond the home
          </p>
          <h2 className="font-display text-[1.85rem] sm:text-[2.5rem] lg:text-[3rem] font-semibold tracking-[-0.03em] leading-[1.05] text-foreground text-balance">
            Anywhere people gather,{" "}
            <span className="text-heading-accent">surfaces collect what filters miss.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <figure
              key={it.label}
              className="group relative overflow-hidden rounded-[1.25rem] aspect-[3/4] bg-muted shadow-[0_18px_45px_-25px_hsl(var(--foreground)/0.3)]"
            >
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                decoding="async"
                width={1280}
                height={960}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
              />
              <figcaption className="absolute left-4 bottom-4 right-4 text-white">
                <span className="text-[10px] font-semibold tracking-[0.28em] uppercase opacity-80 tabular-nums">
                  0{i + 1}
                </span>
                <p className="font-display text-[1.1rem] sm:text-[1.25rem] font-semibold mt-1 tracking-[-0.01em]">
                  {it.label}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
