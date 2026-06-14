import { createFileRoute } from "@tanstack/react-router";
import { MiniAdLanding } from "@/components/lp/MiniAdLanding";
import heroImg from "@/assets/mini-lifestyle-family-new.avif";

export const Route = createFileRoute("/lp/p4-learn-5j6w")({
  head: () => ({
    meta: [
      { title: "What are environmental probiotics?  BioLogic Mini" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "A plain-English explainer for parents who want to understand environmental probiotics before buying. Air + surfaces support for your family home.",
      },
    ],
  }),
  component: () => (
    <MiniAdLanding
      variant="v4"
      campaign="meta-lp-v4-learn"
      eyebrow="Education angle"
      headline={<>Meet probiotic indoor care for your family home.</>}
      subhead="BioLogic Mini uses environmental probiotics to help support a fresher indoor environment  including the spaces your family touches every day."
      heroImage={heroImg}
      heroImageAlt="BioLogic Mini in a family living room"
      primaryCta="Get 15% off"
      secondaryCta="Learn more"
      sectionLabel="Simple education"
      sectionTitle="What are environmental probiotics?"
      sectionBody="Think of them as beneficial microorganisms used to support balance in indoor environments. The message stays calm, practical, and compliant  no medical claims, no fear."
      pillars={[
        {
          title: "Air",
          body: "The piece most products focus on.",
        },
        {
          title: "Surfaces",
          body: "Toys, couches, rugs  where life actually happens.",
        },
      ]}
      blockTitle="How BioLogic Mini works"
      blockBody="Plug it in. Environmental probiotics disperse through the space. The device quietly supports a fresher indoor environment, day after day, in the rooms your family uses most."
      steps={[
        {
          title: "Plug in",
          body: "Place it in a key room  bedroom, nursery, playroom, or living room.",
        },
        {
          title: "Release",
          body: "Environmental probiotics disperse through the space.",
        },
        {
          title: "Support",
          body: "Helps support a fresher indoor environment  continuously.",
        },
      ]}
      faqs={[
        {
          q: "Are environmental probiotics safe at home?",
          a: "Yes. They are beneficial microorganisms long used to support balance in indoor environments.",
        },
        {
          q: "How is BioLogic Mini different from an air purifier?",
          a: "Air purifiers clean air passing through the device. BioLogic Mini supports both air and the surfaces your family touches.",
        },
        {
          q: "How long does it take to set up?",
          a: "A few minutes. Place it, activate it, and let it run.",
        },
        {
          q: "Can I return it if it isn't a fit?",
          a: "Yes. BioLogic Mini ships with a 30-day money-back guarantee.",
        },
      ]}
      closingNote="EnviroBiotics does not make medical or health treatment claims. BioLogic Mini is designed to support a fresher, more balanced indoor environment."
    />
  ),
});
