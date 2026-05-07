import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Sparkles, Power, 
  DoorOpen, Lightbulb, Footprints, Sofa, 
  Fan, UtensilsCrossed, Keyboard, PawPrint, Layers,
  ArrowDown
} from "lucide-react";
import biologicMini from "@/assets/biologic-mini-nobg-new.avif";

interface Particle {
  id: number;
  delay: number;
  duration: number;
  size: number;
  targetX: number;
  targetY: number;
  angle: number;
}

// Hotspot locations - mobile shows corners only, desktop shows all
const mobileHotspots = [
  // Corners only for mobile
  { x: 10, y: 12, label: "Door handles", icon: DoorOpen },
  { x: 90, y: 12, label: "Kitchen", icon: UtensilsCrossed },
  { x: 6, y: 45, label: "Vents", icon: Fan },
  { x: 94, y: 45, label: "Furniture", icon: Sofa },
  { x: 10, y: 82, label: "Floor", icon: Footprints },
  { x: 90, y: 82, label: "Pet areas", icon: PawPrint },
];

// Additional hotspots for desktop - full grid
const desktopOnlyHotspots = [
  { x: 30, y: 12, label: "Keyboards", icon: Keyboard },
  { x: 70, y: 12, label: "Light switches", icon: Lightbulb },
  { x: 30, y: 82, label: "Carpets", icon: Layers },
];

// Combined for desktop
const allHotspots = [...mobileHotspots, ...desktopOnlyHotspots];

// Generate particles that travel from center to each hotspot - slower
const generateParticles = (): Particle[] => {
  const particles: Particle[] = [];
  
  allHotspots.forEach((hotspot, hotspotIndex) => {
    // Create multiple particles per hotspot
    for (let i = 0; i < 4; i++) {
      const angle = Math.atan2(hotspot.y - 50, hotspot.x - 50);
      particles.push({
        id: hotspotIndex * 4 + i,
        delay: hotspotIndex * 0.2 + i * 0.35, // Slower stagger
        duration: 2.8 + Math.random() * 0.8, // Slower duration
        size: 4 + Math.random() * 4,
        targetX: hotspot.x + (Math.random() - 0.5) * 8,
        targetY: hotspot.y + (Math.random() - 0.5) * 8,
        angle,
      });
    }
  });
  
  return particles;
};

export const ActiveDefenseToggle = () => {
  const [isActive, setIsActive] = useState(true); // Start with EnviroBiotics active
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hotspotPhase, setHotspotPhase] = useState<'red' | 'blue' | 'green'>('red');
  const [hasInitialized, setHasInitialized] = useState(false);

  // Initialize particles on mount when starting active
  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      if (isActive) {
        setParticles(generateParticles());
        setHotspotPhase('red');
        const blueTimer = setTimeout(() => setHotspotPhase('blue'), 1200);
        const greenTimer = setTimeout(() => setHotspotPhase('green'), 3500);
        return () => {
          clearTimeout(blueTimer);
          clearTimeout(greenTimer);
        };
      }
    }
  }, [hasInitialized, isActive]);

  // Auto-toggle effect
  useEffect(() => {
    const autoToggleInterval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 8000); // Toggle every 8 seconds (slower)
    
    return () => clearInterval(autoToggleInterval);
  }, []);

  useEffect(() => {
    if (!hasInitialized) return; // Skip on first render, handled by init effect
    
    if (isActive) {
      setParticles(generateParticles());
      setHotspotPhase('red');
      const blueTimer = setTimeout(() => setHotspotPhase('blue'), 1200);
      const greenTimer = setTimeout(() => setHotspotPhase('green'), 3500);
      return () => {
        clearTimeout(blueTimer);
        clearTimeout(greenTimer);
      };
    } else {
      setParticles([]);
      setHotspotPhase('red');
    }
  }, [isActive, hasInitialized]);

  const getHotspotColor = (phase: 'red' | 'blue' | 'green') => {
    if (!isActive) {
      return {
        bg: 'rgb(239, 68, 68)',
        glow: 'rgba(239, 68, 68, 0.4)',
        border: 'rgba(239, 68, 68, 0.6)',
        iconBg: 'rgba(239, 68, 68, 0.12)',
      };
    }
    
    if (phase === 'red') {
      return {
        bg: 'rgb(239, 68, 68)',
        glow: 'rgba(239, 68, 68, 0.4)',
        border: 'rgba(239, 68, 68, 0.6)',
        iconBg: 'rgba(239, 68, 68, 0.12)',
      };
    }
    
    if (phase === 'blue') {
      return {
        bg: 'rgb(56, 189, 248)',
        glow: 'rgba(56, 189, 248, 0.4)',
        border: 'rgba(56, 189, 248, 0.6)',
        iconBg: 'rgba(56, 189, 248, 0.12)',
      };
    }
    
    return {
      bg: 'rgb(34, 197, 94)',
      glow: 'rgba(34, 197, 94, 0.4)',
      border: 'rgba(34, 197, 94, 0.6)',
      iconBg: 'rgba(34, 197, 94, 0.12)',
    };
  };

  const colors = getHotspotColor(hotspotPhase);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Main container with elegant glow */}
      <div 
        className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-primary/15"
        style={{
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.05),
            0 10px 30px -5px rgba(0, 0, 0, 0.08),
            0 0 0 1px hsl(var(--primary) / 0.05),
            0 0 60px -10px hsl(var(--primary) / 0.15)
          `,
        }}
      >
        {/* Background visualization */}
        <div className="relative aspect-[5/5] sm:aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7] bg-gradient-to-b from-slate-50 to-white">
          
          {/* Clean subtle background */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                hsl(210 20% 98%) 0%, 
                hsl(210 15% 99%) 50%,
                hsl(0 0% 100%) 100%
              )`,
            }}
          />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(210 10% 70%) 0.5px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Hotspots with icons - mobile shows fewer */}
          {mobileHotspots.map((spot, index) => {
            const Icon = spot.icon;
            return (
              <motion.div
                key={`mobile-${index}`}
                className="absolute z-20"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.04, type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute rounded-full blur-lg"
                    style={{
                      width: 64,
                      height: 64,
                      left: -8,
                      top: -8,
                    }}
                    animate={{
                      backgroundColor: colors.glow,
                      scale: isActive && hotspotPhase === 'green' ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ 
                      backgroundColor: { duration: 0.3, delay: index * 0.05 },
                      scale: { duration: 2, repeat: Infinity, delay: index * 0.1 }
                    }}
                  />
                  
                  {/* Icon container - smaller on mobile */}
                  <motion.div
                    className="relative w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg border-2 bg-card"
                    animate={{
                      borderColor: colors.border,
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.div
                      animate={{ color: colors.bg }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Icon className="w-4 h-4 md:w-6 md:h-6" />
                    </motion.div>
                    
                    {/* Shield overlay when protected */}
                    <AnimatePresence>
                      {isActive && hotspotPhase === 'green' && (
                        <motion.div
                          className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
                        >
                          <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Label - hidden on mobile to prevent overlap */}
                  <motion.span
                    className="hidden md:block absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-lg bg-card border border-border shadow-md"
                    animate={{ color: colors.bg }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {spot.label}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}

          {/* Desktop-only hotspots - hidden on mobile */}
          {desktopOnlyHotspots.map((spot, index) => {
            const Icon = spot.icon;
            return (
              <motion.div
                key={`desktop-${index}`}
                className="absolute z-20 hidden md:block"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + (index + mobileHotspots.length) * 0.04, type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute rounded-full blur-lg"
                    style={{
                      width: 64,
                      height: 64,
                      left: -8,
                      top: -8,
                    }}
                    animate={{
                      backgroundColor: colors.glow,
                      scale: isActive && hotspotPhase === 'green' ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ 
                      backgroundColor: { duration: 0.3, delay: index * 0.05 },
                      scale: { duration: 2, repeat: Infinity, delay: index * 0.1 }
                    }}
                  />
                  
                  {/* Icon container */}
                  <motion.div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border-2 bg-card"
                    animate={{
                      borderColor: colors.border,
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <motion.div
                      animate={{ color: colors.bg }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    
                    {/* Shield overlay when protected */}
                    <AnimatePresence>
                      {isActive && hotspotPhase === 'green' && (
                        <motion.div
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
                        >
                          <Shield className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Label - visible on desktop */}
                  <motion.span
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-lg bg-card border border-border shadow-md"
                    animate={{ color: colors.bg }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {spot.label}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {isActive && particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full z-30"
                style={{
                  width: particle.size,
                  height: particle.size,
                  background: `radial-gradient(circle, rgba(56, 189, 248, 1) 0%, rgba(34, 197, 94, 0.8) 100%)`,
                  boxShadow: `0 0 ${particle.size * 3}px rgba(56, 189, 248, 0.8)`,
                }}
                initial={{
                  left: '50%',
                  top: '50%',
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  left: `${particle.targetX}%`,
                  top: `${particle.targetY}%`,
                  scale: [0, 1.5, 1, 0.5],
                  opacity: [0, 1, 0.9, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </AnimatePresence>

          {/* Expanding wave rings when activated */}
          <AnimatePresence>
            {isActive && (
              <>
                {[0, 0.4, 0.8].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 z-10"
                    style={{
                      left: '50%',
                      top: '50%',
                      translateX: '-50%',
                      translateY: '-50%',
                      borderColor: i === 0 ? 'rgba(56, 189, 248, 0.4)' : i === 1 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)',
                    }}
                    initial={{ width: 100, height: 100, opacity: 0.8 }}
                    animate={{ 
                      width: ['100px', '200%'], 
                      height: ['100px', '200%'],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Status indicator - centered at top */}
          <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
              className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-1.5 md:py-2 rounded-full backdrop-blur-md border-2 shadow-xl"
              animate={{
                backgroundColor: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                borderColor: isActive ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                animate={{
                  backgroundColor: isActive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                  scale: isActive ? [1, 1.3, 1] : 1,
                }}
                transition={{ scale: { duration: 1, repeat: Infinity } }}
              />
              <motion.span
                className="text-sm md:text-lg font-bold"
                animate={{
                  color: isActive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                }}
              >
                {isActive ? 'Protected' : 'Vulnerable'}
              </motion.span>
            </motion.div>
          </div>

          {/* Centered device container - only one device at a time */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pt-12 md:pt-16 -mb-4">
            
            <AnimatePresence mode="wait">
              {/* Traditional Air Filter - shown in passive mode */}
              {!isActive && (
                <motion.div
                  key="filter"
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Limited range circle */}
                  <motion.div
                    className="absolute rounded-full border-2 border-dashed border-red-300/50"
                    style={{ 
                      width: 160, 
                      height: 160, 
                      left: '50%',
                      top: '45%',
                      translateX: '-50%',
                      translateY: '-50%',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* Air purifier illustration */}
                  <div className="w-20 h-24 md:w-32 md:h-40 bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl border-2 border-slate-300 shadow-lg flex flex-col items-center justify-center gap-1 md:gap-2">
                    {/* Top vents */}
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-5 md:w-2 md:h-6 bg-slate-600 rounded-full"
                          animate={{ opacity: [0.5, 0.9, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    
                    {/* Fan icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Fan className="w-10 h-10 md:w-12 md:h-12 text-slate-600" />
                    </motion.div>
                    
                    {/* Arrows showing air being sucked IN */}
                    <div className="flex flex-col items-center gap-0.5">
                      {[0, 1].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            y: [0, -4, 0],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <ArrowDown className="w-4 h-4 text-slate-700" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Caption - outside device container for proper alignment */}
                  <div className="mt-5 md:mt-6 text-center">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-slate-700 block">
                      Traditional Air Filter
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-semibold block mt-2 px-4 md:px-5 py-1.5 md:py-2 rounded-full border text-red-500 bg-red-50 border-red-200">
                      Treats only passing air
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Mini Biologic - shown in active mode */}
              {isActive && (
                <motion.div
                  key="biologic"
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Outer pulsing glow - larger on desktop */}
                  <motion.div
                    className="absolute rounded-full blur-3xl hidden md:block"
                    style={{ 
                      width: 360, 
                      height: 360, 
                      left: '50%',
                      top: '40%',
                      translateX: '-50%',
                      translateY: '-50%',
                      background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(34, 197, 94, 0.25) 40%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Inner pulsing glow - visible on mobile too */}
                  <motion.div
                    className="absolute rounded-full blur-2xl"
                    style={{ 
                      width: 140, 
                      height: 140, 
                      left: '50%',
                      top: '45%',
                      translateX: '-50%',
                      translateY: '-50%',
                      background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(34, 197, 94, 0.3) 50%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.85, 0.6],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Device image - larger on mobile and desktop */}
                  <motion.div 
                    className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 lg:w-64 md:h-56 lg:h-64"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img 
                      src={biologicMini} 
                      alt="BioLogic Mini Device" 
                      width="256"
                      height="256"
                      decoding="async"
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.8)] sm:drop-shadow-[0_0_40px_rgba(56,189,248,0.9)] md:drop-shadow-[0_0_60px_rgba(56,189,248,0.8)]"
                      style={{ imageRendering: 'auto' }}
                    />
                    
                    {/* Emission sparkles - positioned to the right of device, transitions to green */}
                    <motion.div
                      className="absolute top-1/4 -right-6 md:-right-10 lg:-right-12"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: [1, 1.15, 1],
                      }}
                      transition={{ 
                        opacity: { duration: 0.4 },
                        scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      <motion.div
                        animate={{
                          color: hotspotPhase === 'green' ? 'rgb(34, 197, 94)' : 'rgb(56, 189, 248)',
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                          filter: hotspotPhase === 'green' 
                            ? 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.9))' 
                            : 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.9))'
                        }}
                      >
                        <Sparkles className="w-7 h-7 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Additional sparkle accent - left side on desktop, also transitions */}
                    <motion.div
                      className="absolute top-1/3 -left-4 md:-left-8 hidden md:block"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <motion.div
                        animate={{
                          color: hotspotPhase === 'green' ? 'rgb(34, 197, 94)' : 'rgb(56, 189, 248)',
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                          filter: hotspotPhase === 'green' 
                            ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))' 
                            : 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))'
                        }}
                      >
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Caption - balanced sizing, moved up */}
                  <div className="mt-1 md:mt-2 text-center">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 block">
                      EnviroBiotics
                    </span>
                    <span className="text-sm sm:text-base md:text-lg font-semibold block whitespace-nowrap mt-1 md:mt-1.5 px-4 md:px-6 py-1 md:py-2 rounded-full border-2 text-green-700 bg-green-50 border-green-300">
                       Treats all surfaces
                     </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom content panel - clean neutral background */}
        <div className="relative border-t border-slate-200 p-2.5 md:p-5 bg-slate-50">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            
            {/* Power button - grayer styling */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setIsActive(!isActive)}
                aria-label={isActive ? "Turn off active defense" : "Turn on active defense"}
                className={`relative flex items-center justify-center w-11 h-11 md:w-16 md:h-16 rounded-full transition-all duration-500 border-3 md:border-4 ${
                  isActive 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)]' 
                    : 'bg-slate-200 border-slate-300 hover:border-slate-400 hover:bg-slate-300'
                }`}
              >
                <Power className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-500'
                }`} />
                
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-400"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.8, 0, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </button>
              <span className={`text-xs font-bold transition-colors duration-300 ${
                isActive ? 'text-green-600' : 'text-slate-500'
              }`}>
                {isActive ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-14 bg-border/50" />

            {/* Dynamic copy */}
            <div className="flex-1 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isActive ? 'active' : 'passive'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-xl mx-auto"
                >
                  <p className="text-base md:text-xl lg:text-2xl font-display font-bold mb-1 md:mb-2 tracking-tight">
                    {isActive ? (
                      <span className="text-green-600">Active probiotics reach every surface.</span>
                    ) : (
                      <span className="text-red-600">Passive filters miss the real problem.</span>
                    )}
                  </p>
                  <p className="text-sm md:text-lg text-slate-600 leading-relaxed hidden md:block">
                    {isActive ? (
                      "Beneficial probiotics spread throughout your space, to door handles, vents, keyboards, and every surface where bacteria hide."
                    ) : (
                      "Air filters only treat what passes through them. Surfaces, where 90% of contaminants live, remain completely untouched."
                    )}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Color legend - bigger dots and text */}
            <div className="hidden md:flex md:flex-col gap-4 md:gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-slate-600 font-medium">Contaminated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                <span className="text-slate-600 font-medium">Treating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-slate-600 font-medium">Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction hint - hidden on mobile */}
      <motion.p
        className="hidden md:block text-center text-xs text-muted-foreground mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <span className="inline-flex items-center gap-2">
          <motion.span 
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Press the power button to see the difference
        </span>
      </motion.p>
    </div>
  );
};
