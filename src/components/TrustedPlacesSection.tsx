import { motion } from "framer-motion";
import caSchoolAsset from "@/assets/clients/ca-school.png.asset.json";
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
import theFarm from "@/assets/clients/the-farm-san-benito.jpg.asset.json";

const caSchool = caSchoolAsset.url;

const logos = [
  { src: grandHyatt, alt: "Grand Hyatt", scale: 1.5 },
  { src: brooklynNets.url, alt: "Brooklyn Nets", scale: 2 },
  { src: shangriLa.url, alt: "Shangri-La Hotels and Resorts" },
  { src: cityOfDreams, alt: "City of Dreams Macau", scale: 1.6 },
  { src: caSchool, alt: "Canadian International School of Hong Kong", scale: 1.5 },
  { src: medone, alt: "MedOne", scale: 1.6 },
  { src: ganther, alt: "Ganther" },
  { src: melco.url, alt: "Melco", scale: 1.5 },
  { src: cbre.url, alt: "CBRE" },
  { src: theHari.url, alt: "The Hari Hong Kong", scale: 1.5 },
  { src: imgAcademy.url, alt: "IMG Academy" },
  { src: kempegowda.url, alt: "Kempegowda International Airport Bengaluru", scale: 1.5 },
  { src: carePartners.url, alt: "Care Partners Country Terrace", scale: 1.5 },
  { src: morpheusCodNuwa.url, alt: "Morpheus, COD Macau, Nüwa", scale: 1.5 },
  { src: theFarm.url, alt: "The Farm at San Benito", scale: 1.6 },
];


const track = [...logos, ...logos];

export const TrustedPlacesSection = () => {
  return (
    <section
      aria-label="Trusted by leading venues"
      className="home-trusted-places border-b border-border bg-card"
    >
      <div className="site-container py-14 sm:py-20 lg:py-24">
        <div className="mb-8 flex flex-col items-center gap-5 sm:mb-12">
          <span className="h-px w-16 bg-eyebrow-accent sm:w-20" />
          <p className="font-display font-medium text-[1.05rem] sm:text-[1.35rem] lg:text-[1.5rem] leading-[1.4] text-muted-foreground text-balance text-center max-w-4xl">
            EnviroBiotics already protect people in Hospitals, emergency care, nursing homes, schools, Hotels, and airports.
          </p>
          <span className="h-px w-16 bg-eyebrow-accent sm:w-20" />
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-card to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-card to-transparent sm:w-24" />

          <motion.div
            className="flex items-center gap-10 sm:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {track.map((logo, i) => (
              <div
                key={`${logo.alt}-${i}`}
                className="flex h-20 w-32 flex-shrink-0 items-center justify-center sm:h-24 sm:w-44"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width="176"
                  height="96"
                  className="max-h-14 sm:max-h-16 w-auto max-w-full object-contain"
                  style={logo.scale ? { transform: `scale(${logo.scale})`, transformOrigin: "center" } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}

          </motion.div>
        </div>

        <h3 className="mx-auto mt-8 max-w-3xl text-balance text-center font-display text-[1.125rem] font-medium leading-[1.3] text-foreground sm:mt-10 sm:text-[1.5rem] lg:max-w-5xl lg:text-[1.75rem]">
          Let EnviroBiotics protect everyone at your home, office, and on the go.
        </h3>
      </div>
    </section>
  );
};
