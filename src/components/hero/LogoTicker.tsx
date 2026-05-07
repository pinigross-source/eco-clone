import { motion } from "framer-motion";
import epaBadge from "@/assets/epa-badge.png";
import fdaBadge from "@/assets/fda-gras-badge.jpg";
import isoBadge from "@/assets/iso-badge.png";
import madeSafeBadge from "@/assets/made-safe-badge.png";
import allergyFreeBadge from "@/assets/allergy-free-badge.png";
import ptpaAward from "@/assets/ptpa-award.png";

const logos = [
  { src: fdaBadge, alt: "FDA GRAS Approved", name: "FDA GRAS" },
  { src: epaBadge, alt: "EPA Registered", name: "EPA" },
  { src: isoBadge, alt: "ISO 9001:2015 Certified", name: "ISO 9001" },
  { src: madeSafeBadge, alt: "Made Safe Certified", name: "Made Safe" },
  { src: allergyFreeBadge, alt: "Allergy Free Certified", name: "AllergyUK" },
  { src: ptpaAward, alt: "PTPA Award Winner", name: "PTPA" },
];

// Duplicate logos for seamless infinite scroll
const duplicatedLogos = [...logos, ...logos, ...logos];

export const LogoTicker = () => {
  return (
    <div className="w-full overflow-hidden py-6 md:py-8">
      {/* Header */}
      <p className="text-center text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 font-medium tracking-wide uppercase">
        Trusted Certifications & Awards
      </p>
      
      {/* Ticker container */}
      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling track */}
        <motion.div
          className="flex items-center gap-8 md:gap-12"
          animate={{
            x: [0, -100 * logos.length],
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-default"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40 p-2 md:p-3 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-border/60 transition-all duration-300">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  width="72"
                  height="72"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
