import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import testimonialDogOwner from "@/assets/testimonial-dog-owner.avif";
import testimonialTinaHuang from "@/assets/testimonial-tina-huang.avif";
import ptpaAward from "@/assets/ptpa-award.png";

const ptpaTestimonials = [
  {
    name: "PTPA Reviewer",
    text: "The indoor environment feels noticeably fresher. We've been impressed with how the space feels after consistent use.",
    rating: 5,
  },
  {
    name: "PTPA Tester",
    text: "We're sleeping better and waking up more refreshed. The overall comfort in our space has improved.",
    rating: 5,
  },
];

const allTestimonials = [
  {
    name: "Tina Huang, Ph.D.",
    category: "Mold recovery",
    text: "After dealing with toxic mold and sick building syndrome, EnviroBiotics was vital to helping me feel comfortable in my home again.",
    rating: 5,
    avatar: "T",
    image: testimonialTinaHuang,
  },
  {
    name: "Jennifer L.",
    category: "Classroom",
    text: "In my 4th grade classroom, the musty odor disappeared within a week. Students stopped complaining about the smell.",
    rating: 5,
    avatar: "J",
  },
  {
    name: "Jay NJ",
    category: "Pet owner",
    text: "My home used to have noticeable pet odors. With EnviroBiotics running, the difference has been remarkable.",
    rating: 5,
    avatar: "J",
    image: testimonialDogOwner,
  },
  {
    name: "Shannon Terrell",
    category: "Classroom",
    text: "After installing EnviroBiotics, coworkers started commenting on how much better my room smelled.",
    rating: 5,
    avatar: "S",
  },
  {
    name: "Joshua B.",
    category: "Facility",
    text: "After installing EnviroBiotics in a care facility, odors disappeared within a week. Installation was easy.",
    rating: 5,
    avatar: "J",
  },
  {
    name: "Captain Jim H.",
    category: "Marine",
    text: "We had a persistent odor on our boat that nothing could eliminate. EnviroBiotics removed it within days.",
    rating: 5,
    avatar: "J",
  },
];

const TestimonialCard = ({ name, category, text, rating, avatar, image }: {
  name: string; category: string; text: string; rating: number; avatar: string; image?: string;
}) => (
  <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 h-full flex flex-col min-h-[240px]">
    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-4">{category}</span>
    <div className="flex gap-0.5 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-sm text-foreground leading-relaxed mb-6 flex-grow">"{text}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
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
    <section id="testimonials" className="py-12 sm:py-10 lg:py-12 bg-card">
      <div className="container max-w-5xl mx-auto">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/60 mb-6">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-bold leading-[1.06] tracking-[-0.03em] text-foreground max-w-3xl mx-auto">
            What people{" "}
            <span className="text-primary">notice.</span>
          </h2>
          <p className="mt-4 text-xs text-muted-foreground/50 italic">
            Individual results vary by space and conditions.
          </p>
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

        {/* PTPA Award + Testimonials */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-16">
          <div className="max-w-3xl mx-auto bg-background border border-border/60 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-8">
              <img src={ptpaAward} alt="Parent Tested Parent Approved" className="w-16 h-16 object-contain" loading="lazy" decoding="async" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-foreground">Parent Tested Parent Approved</p>
                <p className="text-xs text-muted-foreground">100% recommend · 100% satisfaction rating</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {ptpaTestimonials.map((t, i) => (
                <div key={i} className="bg-card rounded-xl p-5 border border-border/40">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">"{t.text}"</p>
                  <p className="text-xs font-medium text-muted-foreground">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
