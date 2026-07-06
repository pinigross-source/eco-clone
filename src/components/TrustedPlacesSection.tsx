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

const logos = [
  { src: grandHyatt, alt: "Grand Hyatt" },
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
  { src: brooklynNets.url, alt: "Brooklyn Nets" },
  { src: croceRossa.url, alt: "Croce Rossa Italiana" },
];


const track = [...logos, ...logos];

export const TrustedPlacesSection = () => {
  return (
    <section
      aria-label="Trusted by leading venues"
      className="border-b border-border bg-white"
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-6 pb-24 sm:px-10 sm:pt-8 sm:pb-32 lg:px-16 lg:pb-40">
        <div className="mb-10 flex flex-col items-center gap-4 sm:mb-14">
          <span className="h-px w-12 sm:w-16" style={{ background: "hsl(var(--primary))" }} />
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70 sm:text-base lg:text-lg">
            Already protecting the places people trust most
          </h2>
          <span className="h-px w-12 sm:w-16" style={{ background: "hsl(var(--primary))" }} />
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
      </div>
    </section>
  );
};
