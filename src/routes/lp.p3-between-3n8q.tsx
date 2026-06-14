import { createFileRoute } from "@tanstack/react-router";
import { MiniAdLanding } from "@/components/lp/MiniAdLanding";
import heroImg from "@/assets/family-clean-home.avif";

export const Route = createFileRoute("/lp/p3-between-3n8q")({
  head: () => ({
    meta: [
      { title: "You clean the house. We help between cleanings  BioLogic Mini" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Cleaning is a moment. Indoor care can be continuous. BioLogic Mini supports the rooms your family uses most  between cleanings.",
      },
    ],
  }),
  component: () => (
    <MiniAdLanding
      variant="v3"
      campaign="meta-lp-v3-between"
      eyebrow="Cleaning-conscious parent angle"
      headline={
        <>
          You clean the house. BioLogic Mini helps support it between
          cleanings.
        </>
      }
      subhead="A simple way to support a fresher, more balanced indoor environment in the rooms your family uses most."
      heroImage={heroImg}
      heroImageAlt="Bright, tidy family home"
      primaryCta="Get 15% off + free shipping"
      sectionLabel="Core idea"
      sectionTitle="Cleaning is a moment. Indoor care can be continuous."
      sectionBody="This is for parents already cleaning often and looking for added support  not a replacement for cleaning, a complement to it."
      pillars={[
        {
          title: "After cleaning",
          body: "Home feels fresh right after cleanup.",
        },
        {
          title: "Between cleanings",
          body: "BioLogic Mini keeps supporting the indoor environment.",
        },
      ]}
      blockTitle="Where BioLogic Mini fits"
      blockBody="Regular cleaning removes visible mess. Air purifiers focus on air passing through a device. BioLogic Mini supports a fresher indoor environment with an air + surfaces approach  in the rooms you live in."
      steps={[
        {
          title: "Place it",
          body: "Choose the family room, nursery, or playroom.",
        },
        {
          title: "Activate it",
          body: "Use the refill and simple device setup.",
        },
        {
          title: "Let it run",
          body: "Quiet, continuous indoor support  no schedule required.",
        },
      ]}
      faqs={[
        {
          q: "Does it replace my cleaning routine?",
          a: "No. Keep cleaning as you do. BioLogic Mini supports the indoor environment between cleanings.",
        },
        {
          q: "What are environmental probiotics?",
          a: "Beneficial microorganisms used to support a more balanced indoor environment.",
        },
        {
          q: "How loud is it?",
          a: "Quiet enough to run continuously in living rooms, nurseries, and bedrooms.",
        },
      ]}
    />
  ),
});
