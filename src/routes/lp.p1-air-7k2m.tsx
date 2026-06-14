import { createFileRoute } from "@tanstack/react-router";
import { MiniAdLanding } from "@/components/lp/MiniAdLanding";
import heroImg from "@/assets/hero-scandinavian-family.jpg";

export const Route = createFileRoute("/lp/p1-air-7k2m")({
  head: () => ({
    meta: [
      { title: "Parents: your air purifier has one blind spot  BioLogic Mini" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Air purifiers focus on the air. Your child also touches rugs, toys, couches, and blankets. Meet BioLogic Mini  air + surface support for family homes.",
      },
    ],
  }),
  component: () => (
    <MiniAdLanding
      variant="v1"
      campaign="meta-lp-v1-air"
      eyebrow="TikTok continuation angle"
      headline={<>Parents: your air purifier has one blind spot.</>}
      subhead="Your child's world is not just air. It's rugs, toys, couches, blankets, and tiny hands touching everything."
      heroImage={heroImg}
      heroImageAlt="Family playing on a living room rug"
      sectionLabel="Problem"
      sectionTitle="Most solutions focus only on the air."
      sectionBody="Parents know the real home environment includes all the surfaces kids touch every day  not just the air passing through a filter."
      pillars={[
        { title: "Air", body: "Important, but only one part of the home." },
        {
          title: "Surfaces",
          body: "Rugs, couches, toys, bedding, and play zones.",
        },
      ]}
      blockTitle="Everyday touchpoints"
      blockBody="BioLogic Mini is designed for the way children actually use a home  not the way a lab imagines one. Air + surfaces, in the rooms that matter most."
      steps={[
        {
          title: "Place it",
          body: "Set BioLogic Mini in the family room, nursery, or play area.",
        },
        {
          title: "Let it run",
          body: "It releases environmental probiotics into the indoor space.",
        },
        {
          title: "Support freshness",
          body: "Helps support a fresher, more balanced indoor environment.",
        },
      ]}
      faqs={[
        {
          q: "What are environmental probiotics?",
          a: "Beneficial microorganisms used to support a more balanced indoor environment.",
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
