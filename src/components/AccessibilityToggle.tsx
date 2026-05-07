import { useState, useEffect } from "react";
import { Accessibility, X, Type, Eye, MousePointer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "a11y-preferences";

interface A11yPreferences {
  largeText: boolean;
  highContrast: boolean;
  focusIndicators: boolean;
  reducedMotion: boolean;
}

const defaultPrefs: A11yPreferences = {
  largeText: false,
  highContrast: false,
  focusIndicators: false,
  reducedMotion: false,
};

export const AccessibilityToggle = () => {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultPrefs, ...JSON.parse(saved) } : defaultPrefs;
    } catch {
      return defaultPrefs;
    }
  });

  // Apply classes to <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("a11y-large-text", prefs.largeText);
    root.classList.toggle("a11y-high-contrast", prefs.highContrast);
    root.classList.toggle("a11y-focus-indicators", prefs.focusIndicators);
    root.classList.toggle("a11y-reduced-motion", prefs.reducedMotion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const toggle = (key: keyof A11yPreferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => setPrefs(defaultPrefs);

  const hasAny = Object.values(prefs).some(Boolean);

  const options = [
    { key: "largeText" as const, label: "Larger Text", icon: Type },
    { key: "highContrast" as const, label: "High Contrast", icon: Eye },
    { key: "focusIndicators" as const, label: "Focus Indicators", icon: MousePointer },
    { key: "reducedMotion" as const, label: "Reduced Motion", icon: Zap },
  ];

  return (
    <div className="fixed right-3 z-[60] top-[96px] md:top-auto md:bottom-6 md:right-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden absolute right-0 top-full mt-3 md:top-auto md:bottom-full md:mt-0 md:mb-3"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Accessibility</h3>
              {hasAny && (
                <button
                  onClick={resetAll}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Reset all accessibility settings"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="p-2">
              {options.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                    prefs[key]
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  aria-pressed={prefs[key]}
                  aria-label={`${prefs[key] ? "Disable" : "Enable"} ${label}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  <div
                    className={cn(
                      "w-8 h-5 rounded-full relative transition-colors",
                      prefs[key] ? "bg-primary" : "bg-input"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-background shadow-sm transition-transform",
                        prefs[key] ? "translate-x-3.5" : "translate-x-0.5"
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all",
          "border border-border",
          hasAny
            ? "bg-primary text-primary-foreground"
            : "bg-card text-foreground hover:bg-muted"
        )}
        aria-label={open ? "Close accessibility menu" : "Open accessibility menu"}
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Accessibility className="w-5 h-5" />}
      </button>
    </div>
  );
};
