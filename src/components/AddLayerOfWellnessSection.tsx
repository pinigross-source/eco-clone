import { Link } from "@/lib/link";
import { ArrowRight } from "lucide-react";
import nurseryImg from "@/assets/nursery-baby-blocks.png.asset.json";
import petsImg from "@/assets/testimonial-dog-owner.avif";
import familyImg from "@/assets/mini-lifestyle-family-v4.avif";
import bedroomImg from "@/assets/bedroom-allergy-16.avif.asset.json";

type Row = {
  eyebrow: string;
  tag: string;
  title: string;
  italic: string;
  body: string;
  pairedTitle: string;
  pairedBody: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
  imageLeft?: boolean;
};

const rows: Row[] = [
  {
    eyebrow: "For Parents",
    tag: "Nursery",
    title: "Clean air is great.",
    italic: "But the floor is the playground of your child.",
    body:
      "Dust, dander, mold, and other contaminants don't stay in the air. They settle onto cribs, rugs, toys, and every surface your child touches. Over time, these pollutants can contribute to allergies, irritation, and restless sleep.",
    pairedTitle: "What you get",
    pairedBody:
      "EnviroBiotics® restores the natural balance of your indoor ecosystem, helping reduce harmful pathogens and surface contaminants throughout the room. Its quiet, automatic 24/7 dispersion reaches the surfaces traditional air purifiers can't. EPA-registered technology and PTPA (Parent Tested Parent Approved) endorsement provide trusted performance and peace of mind.",
    primaryLabel: "Buy a Solution",
    primaryHref: "/shop",
    secondaryLabel: "Learn more",
    secondaryHref: "/how-it-works",
    image: nurseryImg.url,
    imageAlt: "Mother holding her newborn in a calm nursery with an EnviroBiotics device nearby",
    imageLeft: true,
  },
  {
    eyebrow: "For Pet Homes",
    tag: "Pets",
    title: "Love the pet.",
    italic: "Not the dander.",
    body:
      "Pet dander, allergens, microbes, and odors don't stay in the air. They settle on furniture, bedding, rugs, and even your pet's coat and skin, contributing to odors, allergies, and general discomfort.",
    pairedTitle: "What you get",
    pairedBody:
      "EnviroBiotics® restores the natural balance of your indoor ecosystem, helping reduce pet dander, harmful pathogens, allergens, and odor-causing microbes on the surfaces your pets contact every day. The result is a fresher, healthier home for both pets and people.",
    primaryLabel: "Explore pet-friendly care",
    primaryHref: "/blog/best-air-purifier-for-pet-owners",
    secondaryLabel: "Learn more",
    secondaryHref: "/how-it-works",
    image: petsImg,
    imageAlt: "Young boy resting his forehead against a golden retriever",
    imageLeft: false,
  },
  {
    eyebrow: "For Active Families",
    tag: "Family",
    title: "Healthy diet. Active lifestyle.",
    italic: "Add a layer of wellness; Effortlessly",
    body:
      "Invisible contaminants, harmful microbes, and allergens hide in cracks, crevices, fabrics, and on everyday objects—places conventional cleaners and air purifiers simply can't reach.",
    pairedTitle: "What you get",
    pairedBody:
      "Continuous, whole-home protection for your air, surfaces, and everyday objects. EnviroBiotics® quietly restores the natural balance of your indoor ecosystem 24/7, helping reduce harmful pathogens, mold, allergens, and odor-causing microbes—without harsh chemicals or noisy filters.",
    primaryLabel: "Find your fit",
    primaryHref: "/lp/parent",
    secondaryLabel: "Learn more",
    secondaryHref: "/how-it-works",
    image: familyImg,
    imageAlt: "Mother and child running barefoot across a bright wood floor",
    imageLeft: true,
  },
  {
    eyebrow: "For Allergy Sufferers",
    tag: "Bedroom",
    title: "You wake up congested.",
    italic: "These that share your bed are the reason.",
    body:
      "You spend nearly a third of your life in bed. Unfortunately, so do dust mites. Their allergens accumulate in mattresses and bedding, contributing to nighttime congestion, restless sleep, and asthma symptoms.",
    pairedTitle: "What you get",
    pairedBody:
      "Quiet, automatic 24/7 protection that helps reduce dust mite allergens and other indoor contaminants where you sleep—creating a healthier bedroom, where your immune system can rest and heal.",
    primaryLabel: "Build your bedroom setup",
    primaryHref: "/lp/allergy",
    secondaryLabel: "Learn more",
    secondaryHref: "/how-it-works",
    image: bedroomImg.url,
    imageAlt: "Woman sleeping peacefully with an EnviroBiotics device on the bedside table",
    imageLeft: false,
  },
];

const WellnessRow = ({ row }: { row: Row }) => {
  const imageEl = (
    <div className="relative min-h-[380px] sm:min-h-[500px] lg:min-h-[620px] bg-white overflow-hidden">
      <img
        src={row.image}
        alt={row.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <span className="text-[12px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/70">
          For {row.eyebrow.replace(/^For\s+/i, "")}
        </span>
        <span className="inline-flex items-center rounded-full border border-foreground/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
          {row.tag}
        </span>
      </div>
      <h3
        className="font-display font-bold text-foreground text-[1.85rem] sm:text-4xl lg:text-[2.75rem] mb-2 sm:mb-3"
        style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
      >
        {row.title}
      </h3>
      <p
        className="font-display italic font-light text-heading-accent text-[1.45rem] sm:text-[1.85rem] lg:text-[2.1rem] mb-4 sm:mb-6"
        style={{ lineHeight: 1.2 }}
      >
        {row.italic}
      </p>
      <p
        className="text-muted-foreground max-w-md text-[1.05rem] sm:text-[1.15rem] mb-6 sm:mb-8"
        style={{ lineHeight: 1.6 }}
      >
        {row.body}
      </p>


      <div className="flex flex-wrap items-center gap-4">
        <Link
          to={row.primaryHref}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[0.72rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] bg-foreground text-background transition-all hover:-translate-y-0.5"
        >
          {row.primaryLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to={row.secondaryHref}
          className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-[0.72rem] sm:text-[0.8rem] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-foreground hover:bg-foreground/5 transition-colors"
        >
          {row.secondaryLabel}
        </Link>
      </div>
    </div>
  );


  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch rounded-3xl border border-foreground/10 bg-card overflow-hidden">
      {row.imageLeft ? (
        <>
          {imageEl}
          {textEl}
        </>
      ) : (
        <>
          <div className="lg:hidden">{imageEl}</div>
          {textEl}
          <div className="hidden lg:block">{imageEl}</div>
        </>
      )}
    </article>
  );
};

export const AddLayerOfWellnessSection = () => {
  return (
    <section
      aria-label="Built for the life you actually live"
      className="w-full bg-background py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="font-display font-bold text-foreground">
            <span
              className="block text-balance text-[2.25rem] sm:text-[3.25rem] lg:text-[4rem]"
              style={{ lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Add a layer of wellness.
            </span>
            <span
              className="block mt-1 sm:mt-2 text-balance text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem]"
              style={{ lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Protecting everyone in every environment.
            </span>
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {rows.map((r) => (
            <WellnessRow key={r.tag} row={r} />
          ))}
        </div>

      </div>
    </section>
  );
};
