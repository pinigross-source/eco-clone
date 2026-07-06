import { motion } from "framer-motion";
import caSchool from "@/assets/clients/ca-school.png";
import cityOfDreams from "@/assets/clients/city-of-dreams.png";
import ganther from "@/assets/clients/ganther.png";
import grandHyatt from "@/assets/clients/grand-hyatt.png";
import medone from "@/assets/clients/medone.png";
import brooklynNets from "@/assets/clients/brooklyn-nets.svg.asset.json";
import cbre from "@/assets/clients/cbre.png.asset.json";
import kempegowda from "@/assets/clients/kempegowda.png.asset.json";
import theHari from "@/assets/clients/the-hari.png.asset.json";
import imgAcademy from "@/assets/clients/img-academy.png.asset.json";
import morpheusCodNuwa from "@/assets/clients/morpheus-cod-nuwa.png.asset.json";
import carePartners from "@/assets/clients/care-partners.png.asset.json";
import melco from "@/assets/clients/melco.png.asset.json";
import shangriLa from "@/assets/clients/shangri-la.png.asset.json";
import croceRossa from "@/assets/clients/croce-rossa-italiana.png.asset.json";
import theFarm from "@/assets/clients/the-farm-san-benito.jpg.asset.json";

const logos = [
  { src: grandHyatt, alt: "Grand Hyatt", scale: 1.5 },
  { src: brooklynNets.url, alt: "Brooklyn Nets", scale: 2 },
  { src: shangriLa.url, alt: "Shangri-La Hotels and Resorts" },
  { src: cityOfDreams, alt: "City of Dreams Macau", scale: 1.6 },
  { src: croceRossa.url, alt: "Croce Rossa Italiana" },
  { src: caSchool, alt: "Canadian International School of Hong Kong" },
  { src: medone, alt: "MedOne", scale: 1.6 },
  { src: ganther, alt: "Ganther" },
  { src: melco.url, alt: "Melco" },
  { src: cbre.url, alt: "CBRE" },
  { src: theHari.url, alt: "The Hari Hong Kong" },
  { src: imgAcademy.url, alt: "IMG Academy" },
  { src: kempegowda.url, alt: "Kempegowda International Airport Bengaluru" },
  { src: carePartners.url, alt: "Care Partners Country Terrace" },
  { src: morpheusCodNuwa.url, alt: "Morpheus, COD Macau, Nüwa" },
  { src: theFarm.url, alt: "The Farm at San Benito" },
];


const track = [...logos, ...logos];

export const TrustedPlacesSection = () => {
  return (
    <section
      aria-label="Trusted by leading venues"
      className="border-b border-border bg-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-6 pb-14 sm:px-10 sm:pt-8 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="mb-10 flex flex-col items-center gap-6 sm:mb-14">
          <span className="h-px w-16 sm:w-20" style={{ background: "hsl(var(--primary))" }} />
          <p className="font-display font-medium text-[1.15rem] sm:text-[1.35rem] lg:text-[1.5rem] leading-[1.4] text-muted-foreground text-balance text-center max-w-4xl">
            EnviroBiotics already protect people in Hospitals, emergency care, nursing homes, schools, Hotels, and airports.
          </p>
          <span className="h-px w-16 sm:w-20" style={{ background: "hsl(var(--primary))" }} />
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

          <motion.div
            className="flex items-center gap-16 sm:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {track.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex h-28 flex-shrink-0 items-center justify-center sm:h-24"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-20 w-auto object-contain sm:h-16"
                  style={logo.scale ? { transform: `scale(${logo.scale})`, transformOrigin: "center" } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <h3 className="mt-10 sm:mt-12 font-display font-medium text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem] leading-[1.3] text-foreground text-balance text-center mx-auto max-w-3xl lg:max-w-5xl">
          Let EnviroBiotics protect everyone at your home, office, and on the go.
        </h3>
      </div>
    </section>
  );
};
