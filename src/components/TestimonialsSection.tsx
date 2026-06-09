import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import testimonialDogOwner from "@/assets/testimonial-dog-owner.avif";
import testimonialTinaHuang from "@/assets/testimonial-tina-huang.avif";
import ptpaAward from "@/assets/ptpa-award.png";

const featuredTestimonial = {
  name: "PTPA Tester",
  category: "Parent Tested Parent Approved",
  text: "We're sleeping better and waking up more refreshed. The overall comfort in our space has improved.",
  rating: 5,
};

// Only homepage-promise reviews: sleep, pets, musty odors, allergens, family spaces.
const allTestimonials = [
  {
    name: "Tina Huang, Ph.D.",
    category: "Mold & musty spaces",
    text: "After dealing with toxic mold, EnviroBiotics was vital to helping me feel comfortable in my home again.",
    rating: 5,
    avatar: "T",
    image: testimonialTinaHuang,
  },
  {
    name: "Marcus R.",
    category: "Pet owner",
    text: "Six months in. I sleep through the night now. My wife says the bedroom doesn't feel like our cats live there anymore.",
    rating: 5,
    avatar: "M",
    image: testimonialDogOwner,
  },
  {
    name: "Sarah K.",
    category: "Allergy relief",
    text: "Year-round dust mite reactions used to wake me up congested. After a month with the Mini in our bedroom, mornings feel different.",
    rating: 5,
    avatar: "S",
  },
  {
    name: "David & Priya N.",
    category: "Family spaces",
    text: "We wanted something simple for the nursery. Quiet, easy to live with, and we feel better about the room our daughter sleeps in.",
    rating: 5,
    avatar: "D",
  },
];

const TestimonialCard = ({ name, category, text, rating, avatar, image }: {
  name: string; category: string; text: string; rating: number; avatar: string; image?: string;
}) => (
  <div className="bg-background/60 backdrop-blur-xl rounded-3xl p-7 sm:p-9 h-full flex flex-col min-h-[260px] shadow-[0_10px_40px_-15px_hsl(var(--foreground)/0.08)] hover:shadow-[0_20px_60px_-20px_hsl(var(--foreground)/0.14)] transition-shadow duration-500">
    <span className="text-[10px] font-semibold uppercase tracking-wider text-eyebrow-accent mb-4">{category}</span>
    <div className="flex gap-0.5 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-foreground leading-relaxed mb-6 flex-grow">"{text}"</p>
    <div className="flex items-center gap-3 pt-5 mt-auto">
      {image ? (
        <img src={image} alt={name} className="w-9 h-9 rounded-full object-cover" width="36" height="36" loading="lazy" decoding="async" />
      ) : (
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{avatar}</div>
      )}
      <p className="font-semibold text-sm text-foreground">{name}</p>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="pt-32 pb-12 sm:pt-44 sm:pb-14 lg:pt-56 lg:pb-20 bg-card">
      <div className="container max-w-5xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
            Real homes.{" "}
            <span className="text-heading-accent">Real surfaces.</span>{" "}
            Real changes.
          </h2>
          <p className="mt-3 text-xs text-muted-foreground/50 italic">
            Already at 5000+ homes.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1} className="mb-12">
          <figure className="max-w-3xl mx-auto bg-background/70 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_25px_80px_-30px_hsl(var(--primary)/0.25)]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img src={ptpaAward} alt="Parent Tested Parent Approved" className="w-16 h-16 object-contain flex-shrink-0" loading="lazy" decoding="async" width="64" height="64" />
              <div className="text-center sm:text-left">
                <div className="flex justify-center sm:justify-start gap-0.5 mb-3">
                  {[...Array(featuredTestimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl font-display font-medium text-foreground leading-snug mb-3">
                  "{featuredTestimonial.text}"
                </blockquote>
                <figcaption className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {featuredTestimonial.name} · {featuredTestimonial.category}
                </figcaption>
              </div>
            </div>
          </figure>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <Carousel opts={{ align: "start", loop: false, slidesToScroll: 1 }} className="w-full">
            <CarouselContent className="-ml-4">
              {allTestimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <TestimonialCard {...t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-border hover:bg-foreground hover:text-background rounded-full" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-border hover:bg-foreground hover:text-background rounded-full" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
};
