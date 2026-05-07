import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InteractiveIconProps {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  index: number;
}

export const InteractiveIcon = ({ icon: Icon, label, sublabel, index }: InteractiveIconProps) => {
  return (
    <motion.div
      className="flex items-center justify-center md:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <motion.div
        className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/10 flex-shrink-0 relative overflow-hidden"
          whileHover={{
            backgroundColor: "hsl(var(--primary) / 0.2)",
            borderColor: "hsl(var(--primary) / 0.3)",
          }}
        >
          {/* Pulse ring on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-5 lg:w-5 text-primary" />
          </motion.div>
        </motion.div>
        <div className="text-left">
          <motion.span
            className="block text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-foreground leading-tight font-sans"
            whileHover={{ color: "hsl(var(--primary))" }}
          >
            {label}
          </motion.span>
          <span className="block text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-muted-foreground leading-tight font-sans">
            {sublabel}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
