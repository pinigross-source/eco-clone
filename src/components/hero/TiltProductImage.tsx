import { useState, useRef } from "react";
import { motion } from "framer-motion";
import surfacesHero from "@/assets/surfaces-hero-desktop.avif";
import surfacesHeroMobile from "@/assets/surfaces-hero-mobile.avif";

interface TiltProductImageProps {
  className?: string;
}

export const TiltProductImage = ({ className = "" }: TiltProductImageProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Limit rotation to ±15 degrees
    const maxRotation = 15;
    const rotationY = (mouseX / (rect.width / 2)) * maxRotation;
    const rotationX = -(mouseY / (rect.height / 2)) * maxRotation;
    
    setRotateX(rotationX);
    setRotateY(rotationY);
    
    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      {/* Glow effect behind image */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/25 via-accent/20 to-transparent rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl"
        animate={{
          scale: [1.1, 1.15, 1.1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 3D tilting container */}
      <motion.div
        className="relative"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main image */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl">
          <picture>
            <source media="(max-width: 767px)" srcSet={surfacesHeroMobile} type="image/avif" />
            <img 
              src={surfacesHero} 
              alt="EnviroBiotics protecting everyday surfaces - desk, remote, door handle with probiotic shield" 
              className="w-full h-auto transition-all duration-300"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </picture>
          
          {/* Glare overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
            }}
            animate={{
              opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Subtle overlay gradient for depth */}
          <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
        </div>
        
        {/* Floating depth elements - appear to float above the image */}
        <motion.div
          className="absolute -top-3 -left-3 w-12 h-12 md:w-16 md:h-16 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 flex items-center justify-center"
          style={{ transform: "translateZ(40px)" }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-primary text-xs md:text-sm font-bold">24/7</span>
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-2 border border-border/50 shadow-lg"
          style={{ transform: "translateZ(50px)" }}
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <p className="text-[10px] md:text-xs text-muted-foreground">Active Protection</p>
          <p className="text-xs md:text-sm font-semibold text-primary">Probiotics Working</p>
        </motion.div>
      </motion.div>
      
      {/* Floating accent particles around the image */}
      <motion.div 
        className="absolute top-1/4 -left-4 w-3 h-3 bg-primary/60 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 -right-6 w-2 h-2 bg-accent rounded-full"
        animate={{
          y: [0, 12, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary-glow/50 rounded-full"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};
