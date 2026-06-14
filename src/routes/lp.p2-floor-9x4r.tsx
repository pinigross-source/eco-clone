import { createFileRoute } from "@tanstack/react-router";
import { MiniAdLanding } from "@/components/lp/MiniAdLanding";
import heroImg from "@/assets/nursery-scandinavian-bright.jpg";

export const Route = createFileRoute("/lp/p2-floor-9x4r")({
  head: () => ({
    meta: [
      { title: "Your toddler lives closer to the floor than you do  BioLogic Mini" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Rugs, toys, couches, blankets  the surfaces your baby actually lives on. Probiotic indoor care designed for real family homes. 15% off + free shipping.",
      },
    ],
  }),
  component: () => (
    <MiniAdLanding
      variant="v2"
      campaign="meta-lp-v2-floor"
      eyebrow="Emotional parent angle"
      headline={
        <>Your toddler lives closer to the floor than you do.</>
      }
      subhead="From rugs and toys to couches and blankets, your child's indoor world includes the surfaces they touch every day."
      heroImage={heroImg}
      heroImageAlt="Bright nursery with toys on a soft rug"
      primaryCta="Get 15% off + free shipping"
      sectionLabel="Family-home story"
      sectionTitle="A family home is not a lab. It is a living room, playroom, nursery, snack zone, and nap spot."
      sectionBody="Less technical language. More warm parent empathy. BioLogic Mini supports the rooms your family actually lives in."
      pillars={[
        { title: "Rugs", body: "Play time and crawling." },
        { title: "Toys", body: "Hands, mouths, and repeats." },
        { title: "Couches", body: "Soft furniture in daily use." },
        { title: "Nursery", body: "The room parents care about most." },
      ]}
      blockTitle="Probiotic indoor care for real family homes"
      blockBody="Set it up once. Let it support your indoor environment continuously  quietly working in the background while your family lives their day."
      steps={[
        {
          title: "Place it",
          body: "Nursery, playroom, or wherever your little one spends the most time.",
        },
        {
          title: "Activate it",
          body: "Plug in, switch on, and let the probiotics disperse.",
        },
        {
          title: "Let it run",
          body: "Continuous, quiet support for the rooms your toddler lives in.",
        },
      ]}
      faqs={[
        {
          q: "Is it safe around babies and toddlers?",
          a: "Yes. BioLogic Mini uses environmental probiotics  not chemicals, fragrances, or ozone.",
        },
        {
          q: "How is it different from an air purifier?",
          a: "Air purifiers focus on air passing through the device. BioLogic Mini is positioned around air + surfaces.",
        },
        {
          q: "Is setup complicated?",
          a: "No. Place it in the room, activate it, and let it run continuously.",
        },
      ]}
    />
  ),
});
