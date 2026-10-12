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
    category: "Mold & Musty Spaces",
    text: "After dealing with toxic mold, EnviroBiotics helped me feel comfortable in my home again.",
    rating: 5,
    avatar: "T",
    image: testimonialTinaHuang,
  },
  {
    name: "Jay, NJ",
    category: "Pet Owner",
    text: "Six months in, I sleep through the night now. My wife says the bedroom doesn't feel like our cats live there anymore.",
    rating: 5,
    avatar: "J",
    image: testimonialDogOwner,
  },
  {
    name: "Sarah K.",
    category: "Allergy Relief",
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
  <div className="flex min-h-[260px] h-full flex-col rounded-lg border border-border/70 bg-background/80 p-7 shadow-[0_18px_50px_-34px_hsl(var(--foreground)/0.16)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-34px_hsl(var(--foreground)/0.22)] sm:p-9">
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
    <section id="testimonials" className="home-testimonials bg-card py-20 sm:py-28 lg:py-36">
      <div className="site-container">
        <ScrollReveal variant="fadeUp" className="mb-12 text-center sm:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            Testimonials
          </p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.06] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Protecting thousands{" "}
            <span className="text-heading-accent">of families.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1} className="mb-12">
           <figure className="mx-auto max-w-3xl rounded-lg border border-border/70 bg-background/80 p-8 shadow-[0_24px_70px_-40px_hsl(var(--foreground)/0.24)] backdrop-blur-xl sm:p-12">
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
