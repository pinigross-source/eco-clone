import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Power,
  DoorOpen, Lightbulb, Footprints, Sofa,
  Fan, UtensilsCrossed, Keyboard, PawPrint, Layers,
  ArrowDown, Check
} from "lucide-react";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";

interface Particle {
  id: number;
  delay: number;
  duration: number;
  size: number;
  targetX: number;
  targetY: number;
}

// Apple-style cubic bezier
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Restrained palette
const ACCENT = "rgb(14, 165, 233)";        // sky-500
const ACCENT_SOFT = "rgba(14, 165, 233, 0.18)";
const CONFIRM = "rgb(16, 185, 129)";       // emerald-500
const NEUTRAL = "rgb(71, 85, 105)";        // slate-600

const mobileHotspots = [
  { x: 10, y: 12, label: "Door handles", icon: DoorOpen },
  { x: 90, y: 12, label: "Kitchen", icon: UtensilsCrossed },
  { x: 6, y: 45, label: "Vents", icon: Fan },
  { x: 94, y: 45, label: "Furniture", icon: Sofa },
  { x: 10, y: 82, label: "Floor", icon: Footprints },
  { x: 90, y: 82, label: "Pet areas", icon: PawPrint },
];

const desktopOnlyHotspots = [
  { x: 30, y: 12, label: "Keyboards", icon: Keyboard },
  { x: 70, y: 12, label: "Light switches", icon: Lightbulb },
  { x: 30, y: 82, label: "Carpets", icon: Layers },
];

const allHotspots = [...mobileHotspots, ...desktopOnlyHotspots];

// Fewer, calmer particles
const generateParticles = (): Particle[] => {
  const particles: Particle[] = [];
  allHotspots.forEach((hotspot, hotspotIndex) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        id: hotspotIndex * 2 + i,
        delay: hotspotIndex * 0.12 + i * 0.5,
        duration: 3.4 + Math.random() * 0.6,
        size: 3 + Math.random() * 2,
        targetX: hotspot.x + (Math.random() - 0.5) * 6,
        targetY: hotspot.y + (Math.random() - 0.5) * 6,
      });
    }
  });
  return particles;
};

export const ActiveDefenseToggle = () => {
  const [isActive, setIsActive] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isProtected, setIsProtected] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      if (isActive) {
        setParticles(generateParticles());
        const t = setTimeout(() => setIsProtected(true), 2200);
        return () => clearTimeout(t);
      }
    }
  }, [hasInitialized, isActive]);

  // Slower auto-toggle for breathing room
  useEffect(() => {
    const id = setInterval(() => setIsActive(prev => !prev), 12000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return;
    if (isActive) {
      setParticles(generateParticles());
      setIsProtected(false);
      const t = setTimeout(() => setIsProtected(true), 2200);
      return () => clearTimeout(t);
    } else {
      setParticles([]);
      setIsProtected(false);
    }
  }, [isActive, hasInitialized]);

  const iconColor = !isActive ? NEUTRAL : (isProtected ? CONFIRM : ACCENT);

  const renderHotspot = (
    spot: typeof allHotspots[number],
    index: number,
    keyPrefix: string,
    extraClass = ""
  ) => {
    const Icon = spot.icon;
    return (
      <motion.div
        key={`${keyPrefix}-${index}`}
        className={`absolute z-20 ${extraClass}`}
        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 + index * 0.03, duration: 0.7, ease: EASE_OUT_EXPO }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Soft accent halo — only when protected, no pulsing */}
          <motion.div
            className="absolute rounded-full blur-xl pointer-events-none"
            style={{ width: 56, height: 56, left: -4, top: -4 }}
            animate={{
              backgroundColor: isActive && isProtected ? ACCENT_SOFT : "rgba(0,0,0,0)",
              opacity: isActive && isProtected ? 0.9 : 0,
            }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          />

          {/* Hotspot chip — hairline border, frosted */}
          <motion.div
            className="relative w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-white/85 backdrop-blur-md"
            animate={{
              boxShadow: isActive && isProtected
                ? "0 1px 2px rgba(15,23,42,0.06), 0 0 0 1px rgba(14,165,233,0.25)"
                : "0 1px 2px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.06)",
            }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <motion.div
              animate={{ color: iconColor }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={1.5} />
            </motion.div>

            {/* Subtle confirmation tick — replaces shield badge */}
            <AnimatePresence>
              {isActive && isProtected && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white flex items-center justify-center"
                  style={{ boxShadow: "0 0 0 1px rgba(16,185,129,0.5)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.05 + index * 0.03, duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  <Check className="w-2 h-2 md:w-2.5 md:h-2.5" strokeWidth={3} style={{ color: CONFIRM }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Quiet label — tracked, no background */}
          <span
            className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.12em] font-medium text-slate-500"
          >
            {spot.label}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Container — neutral hairline, soft shadow */}
      <div
        className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-white"
        style={{
          boxShadow: `
            0 1px 2px rgba(15, 23, 42, 0.04),
            0 12px 40px -12px rgba(15, 23, 42, 0.10)
          `,
          border: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      >
        <div className="relative aspect-[5/5] sm:aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7] bg-white">

          {/* Whisper of texture */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15,23,42) 0.5px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Hotspots */}
          {mobileHotspots.map((spot, i) => renderHotspot(spot, i, "mobile"))}
          {desktopOnlyHotspots.map((spot, i) =>
            renderHotspot(spot, i + mobileHotspots.length, "desktop", "hidden md:block")
          )}

          {/* Particles — solid accent, no rainbow */}
          <AnimatePresence>
            {isActive && particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full z-30 pointer-events-none"
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: ACCENT,
                  boxShadow: `0 0 ${particle.size * 2}px rgba(14,165,233,0.5)`,
                }}
                initial={{ left: "50%", top: "50%", scale: 0, opacity: 0 }}
                animate={{
                  left: `${particle.targetX}%`,
                  top: `${particle.targetY}%`,
                  scale: [0, 1, 0.6, 0],
                  opacity: [0, 0.7, 0.5, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: EASE_OUT_EXPO,
                }}
              />
            ))}
          </AnimatePresence>

          {/* Single, slow expanding ring */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute rounded-full z-10 pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  border: "1px solid rgba(14,165,233,0.25)",
                }}
                initial={{ width: 100, height: 100, opacity: 0.4 }}
                animate={{
                  width: ["100px", "180%"],
                  height: ["100px", "180%"],
                  opacity: [0.35, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                  ease: EASE_OUT_EXPO,
                }}
              />
            )}
          </AnimatePresence>

          {/* Status pill — hairline, light weight */}
          <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
              className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full backdrop-blur-md bg-white/80"
              style={{ boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.06)" }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{ backgroundColor: isActive ? CONFIRM : NEUTRAL }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              />
              <span className="text-xs md:text-sm font-medium tracking-wide text-slate-700">
                {isActive ? "Protected" : "Vulnerable"}
              </span>
            </motion.div>
          </div>

          {/* Centered device */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pt-12 md:pt-16 -mb-4">
            <AnimatePresence mode="wait">
              {!isActive && (
                <motion.div
                  key="filter"
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  <div className="w-20 h-24 md:w-32 md:h-40 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-1 md:gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-5 md:w-2 md:h-6 bg-slate-400 rounded-full"
                          animate={{ opacity: [0.4, 0.7, 0.4] }}
                          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Fan className="w-10 h-10 md:w-12 md:h-12 text-slate-500" strokeWidth={1.5} />
                    </motion.div>
                    <div className="flex flex-col items-center gap-0.5">
                      {[0, 1].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -3, 0], opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                        >
                          <ArrowDown className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 md:mt-6 text-center">
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 block tracking-tight">
                      Traditional Air Filter
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-medium block mt-2 text-slate-500 tracking-wide">
                      Treats only passing air
                    </span>
                  </div>
                </motion.div>
              )}

              {isActive && (
                <motion.div
                  key="biologic"
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                >
                  {/* Single soft breathing glow */}
                  <motion.div
                    className="absolute rounded-full blur-3xl pointer-events-none"
                    style={{
                      width: 280,
                      height: 280,
                      left: "50%",
                      top: "45%",
                      translateX: "-50%",
                      translateY: "-50%",
                      background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)",
                    }}
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Device with gentle float */}
                  <motion.div
                    className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 lg:w-64 md:h-56 lg:h-64"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src={biologicMini}
                      alt="BioLogic Mini Device"
                      width="256"
                      height="256"
                      decoding="async"
                      className="w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(14,165,233,0.35)]"
                      style={{ imageRendering: "auto" }}
                    />
                  </motion.div>

                  <div className="mt-1 md:mt-2 text-center">
                    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 block tracking-tight">
                      EnviroBiotics
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-medium block mt-2 text-slate-500 tracking-wide">
                      Treats all surfaces
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="relative border-t border-slate-100 p-3 md:p-5 bg-white">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">

            {/* Power button — quieter */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={() => setIsActive(!isActive)}
                aria-label={isActive ? "Turn off active defense" : "Turn on active defense"}
                className={`relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full transition-all duration-700 ease-out ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 1px 2px rgba(15,23,42,0.1), 0 8px 24px -8px rgba(14,165,233,0.45)"
                    : "0 1px 2px rgba(15,23,42,0.04), inset 0 0 0 1px rgba(15,23,42,0.06)",
                }}
              >
                <Power className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
              </button>
              <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-slate-500">
                {isActive ? "On" : "Off"}
              </span>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-100" />

            {/* Dynamic copy */}
            <div className="flex-1 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isActive ? "active" : "passive"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="max-w-xl"
                >
                  <p className="text-base md:text-xl font-display font-semibold mb-1 md:mb-1.5 tracking-tight text-slate-900">
                    {isActive
                      ? "Active probiotics reach every surface."
                      : "Passive filters miss the real problem."}
                  </p>
                  <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed hidden md:block">
                    {isActive
                      ? "Beneficial probiotics spread throughout your space — to door handles, vents, keyboards, and every surface where bacteria hide."
                      : "Air filters only treat what passes through them. Surfaces, where 90% of contaminants live, remain completely untouched."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Legend — quieter */}
            <div className="hidden md:flex md:flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="text-slate-500 tracking-wide">Untreated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                <span className="text-slate-500 tracking-wide">Treating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: CONFIRM }} />
                <span className="text-slate-500 tracking-wide">Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="hidden md:block text-center text-xs text-slate-400 mt-4 tracking-wide">
        Press the power button to see the difference
      </p>
    </div>
  );
};
