import { motion } from "framer-motion";
import caSchool from "@/assets/clients/ca-school.png";
import cityOfDreams from "@/assets/clients/city-of-dreams.png";
import ganther from "@/assets/clients/ganther.png";
import grandHyatt from "@/assets/clients/grand-hyatt.png";
import iconsGroup from "@/assets/clients/icons-group.png";
import medone from "@/assets/clients/medone.png";

const logos = [
  { src: grandHyatt, alt: "Grand Hyatt" },
  { src: cityOfDreams, alt: "City of Dreams Macau" },
  { src: caSchool, alt: "Canadian International School of Hong Kong" },
  { src: medone, alt: "MedOne" },
  { src: ganther, alt: "Ganther" },
  { src: iconsGroup, alt: "Melco, The Hari, Kempegowda International Airport, Brooklyn Nets, Wheelock Properties, Harriman, Care Partners, IMG Academy, Morpheus, COD Macau, CBRE, Waihong Services Group, Nüwa, Citygate Outlets" },
];

const track = [...logos, ...logos];

export const TrustedPlacesSection = () => {
  return (
    <section
      aria-label="Trusted by leading venues"
      className="border-b border-border bg-background"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Already protecting the places people trust most
        </h2>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

          <motion.div
            className="flex items-center gap-12 sm:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {track.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex h-20 flex-shrink-0 items-center justify-center sm:h-24"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full w-auto max-w-[220px] object-contain sm:max-w-[260px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
