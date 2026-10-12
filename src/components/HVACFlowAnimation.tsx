import { motion } from "framer-motion";

const AirParticle = ({ delay, duration, startX, startY, endX, endY }: {
  delay: number;
  duration: number;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}) => (
  <motion.div
    className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60"
    style={{ left: startX, top: startY }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      scale: [0.5, 1, 1, 0.5],
      left: [startX, endX],
      top: [startY, endY],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const FlowLine = ({ delay, path }: { delay: number; path: string }) => (
  <motion.svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <motion.path
      d={path}
      fill="none"
      stroke="url(#flowGradient)"
      strokeWidth="0.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: [0, 1], opacity: [0, 0.6, 0.6, 0] }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <defs>
      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
  </motion.svg>
);

export const HVACFlowAnimation = () => {
  // Particles flowing through different paths in the house
  const particles = [
    // Top floor flow - left to right
    { delay: 0, duration: 4, startX: "20%", startY: "25%", endX: "80%", endY: "30%" },
    { delay: 0.5, duration: 4.5, startX: "15%", startY: "35%", endX: "85%", endY: "28%" },
    { delay: 1, duration: 4, startX: "25%", startY: "20%", endX: "75%", endY: "25%" },
    
    // Bottom floor flow - right to left  
    { delay: 0.8, duration: 4.2, startX: "85%", startY: "65%", endX: "15%", endY: "70%" },
    { delay: 1.5, duration: 4, startX: "80%", startY: "75%", endX: "20%", endY: "72%" },
    { delay: 2, duration: 4.3, startX: "90%", startY: "60%", endX: "10%", endY: "68%" },
    
    // Vertical circulation - center
    { delay: 0.3, duration: 3.5, startX: "50%", startY: "75%", endX: "48%", endY: "25%" },
    { delay: 1.2, duration: 3.8, startX: "52%", startY: "80%", endX: "50%", endY: "20%" },
    { delay: 2.2, duration: 3.5, startX: "48%", startY: "70%", endX: "52%", endY: "30%" },
    
    // Diagonal flows
    { delay: 0.6, duration: 4.5, startX: "30%", startY: "60%", endX: "70%", endY: "35%" },
    { delay: 1.8, duration: 4.2, startX: "70%", startY: "55%", endX: "30%", endY: "40%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
      {/* Subtle pulsing glow overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Flow lines */}
      <FlowLine delay={0} path="M 20 40 Q 50 35 80 45" />
      <FlowLine delay={1} path="M 80 65 Q 50 70 20 60" />
      <FlowLine delay={2} path="M 45 80 Q 48 50 50 20" />
      
      {/* Animated particles */}
      {particles.map((particle, index) => (
        <AirParticle key={index} {...particle} />
      ))}
      
      {/* Corner accent glow points */}
      <motion.div
        className="absolute top-[20%] left-[15%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/40 blur-sm"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/40 blur-sm"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, delay: 0.7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[25%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/40 blur-sm"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[15%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/40 blur-sm"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, delay: 2.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
