import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import biologicMini from "@/assets/mini-hero-new.avif";
import lifestyle1 from "@/assets/mini-lifestyle-1.avif";
import lifestyle2 from "@/assets/mini-lifestyle-2.avif";
import lifestyleFamily from "@/assets/mini-lifestyle-family.jpg";
import lifestyle4 from "@/assets/mini-lifestyle-4.avif";
import lifestyleKitchen from "@/assets/mini-lifestyle-kitchen.jpg";
import lifestyle6 from "@/assets/mini-lifestyle-6.avif";
import lifestyleHand from "@/assets/mini-lifestyle-hand.jpg";

const galleryImages = [
  { src: biologicMini, alt: "BioLogic Mini product shot", fit: "object-contain bg-[#f5f5f5]" },
  { src: lifestyleHand, alt: "BioLogic Mini held in hand, compact portable design", fit: "object-contain bg-[#e88a1a]" },
  { src: lifestyle1, alt: "BioLogic Mini lifestyle shot" },
  { src: lifestyle2, alt: "BioLogic Mini in use" },
  { src: lifestyle4, alt: "BioLogic Mini lifestyle" },
  { src: lifestyle6, alt: "BioLogic Mini in environment" },
];

export const MiniLifestyleGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (idx: number) => setActiveIndex(idx);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % galleryImages.length);

  const current = galleryImages[activeIndex];

  return (
    <div className="relative lg:sticky lg:top-28">
      {/* Main image */}
      <div className="relative bg-muted/30 rounded-2xl overflow-hidden aspect-square md:aspect-square lg:aspect-[4/5] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={current.src}
            alt={current.alt}
            className={`w-full h-full absolute inset-0 ${current.fit || "object-cover"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            fetchPriority={activeIndex === 0 ? "high" : undefined}
            decoding="async"
          />
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-colors z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-colors z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
              idx === activeIndex
                ? "border-foreground"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
