import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Package } from "lucide-react";
import ebioticInstallationCover from "@/assets/ebiotic-pro-install-cover.avif";

const InstallationVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden bg-card border border-border shadow-lg"
    >
      <div className="aspect-video relative bg-foreground/5">
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={ebioticInstallationCover}
                alt="E-Biotic Pro Installation Guide Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Play Button */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl group-hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </motion.div>
              </motion.div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/90">
                  <Package className="w-5 h-5" />
                  <span className="font-medium text-sm">Quick Start Guide</span>
                </div>
                <span className="text-white/70 text-sm">Click to play</span>
              </div>
            </motion.div>
          ) : (
            <motion.iframe
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src="https://player.vimeo.com/video/1085737785?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              title="E-Biotic Pro - Quick Start Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </AnimatePresence>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
          <Play className="w-4 h-4" />
          Quick Start Guide
        </div>
        <h3 className="font-display font-bold text-lg mb-2">E-Biotic Pro Installation</h3>
        <p className="text-sm text-muted-foreground">
          Official quick start guide showing everything you need to know to set up your E-Biotic Pro system.
        </p>
      </div>
    </motion.div>
  );
};

export default InstallationVideoPlayer;
