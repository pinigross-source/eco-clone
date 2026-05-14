import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";

type AnimationVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "slideUp";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const variantStyles: Record<AnimationVariant, { hidden: CSSProperties; visible: CSSProperties }> = {
  fadeUp: {
    hidden: { opacity: 0, transform: "translateY(40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  fadeDown: {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
  fadeLeft: {
    hidden: { opacity: 0, transform: "translateX(-40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  fadeRight: {
    hidden: { opacity: 0, transform: "translateX(40px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  },
  scale: {
    hidden: { opacity: 0, transform: "scale(0.9)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  slideUp: {
    hidden: { opacity: 0, transform: "translateY(60px)" },
    visible: { opacity: 1, transform: "translateY(0)" },
  },
};

function useInView(ref: React.RefObject<Element | null>, { once = true, amount = 0 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback: if IntersectionObserver is missing, show immediately
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);

    // Safety net: ensure content always reveals even if observer never fires
    const fallback = window.setTimeout(() => setInView(true), 800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [ref, once, amount]);

  return inView;
}

export const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  threshold = 0.2,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isInView ? styles.visible : styles.hidden),
        transition: `opacity ${duration}s cubic-bezier(0.25,0.4,0.25,1) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.4,0.25,1) ${delay}s, filter ${duration}s cubic-bezier(0.25,0.4,0.25,1) ${delay}s`,
        willChange: isInView ? "auto" : "opacity, transform",
        overflowX: "clip",
        maxWidth: "100%",
      }}
    >
      {children}
    </div>
  );
};

// Stagger container for children animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  return (
    <div ref={ref} className={className} data-stagger-in-view={isInView ? "true" : "false"} data-stagger-delay={staggerDelay}>
      {isInView
        ? children
        : <div style={{ opacity: 0 }}>{children}</div>
      }
    </div>
  );
};

// Child item for stagger animations
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  index?: number;
}

export const StaggerItem = ({
  children,
  className = "",
  variant = "fadeUp",
  index,
}: StaggerItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [computedDelay, setComputedDelay] = useState(0);
  const styles = variantStyles[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Find parent stagger container
    const parent = el.closest("[data-stagger-delay]");
    if (!parent) return;

    const delay = parseFloat(parent.getAttribute("data-stagger-delay") || "0.1");
    // Determine index among siblings
    const siblings = Array.from(parent.querySelectorAll(":scope > [data-stagger-item], :scope > div > [data-stagger-item]"));
    const idx = index ?? siblings.indexOf(el);
    setComputedDelay(idx * delay);
  }, [index]);

  const parentInView = ref.current?.closest("[data-stagger-in-view]")?.getAttribute("data-stagger-in-view") === "true";
  // Re-check on render
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const check = () => {
      const parent = ref.current?.closest("[data-stagger-in-view]");
      setInView(parent?.getAttribute("data-stagger-in-view") === "true");
    };
    check();
    // Small delay to catch parent state change
    const t = setTimeout(check, 100);
    return () => clearTimeout(t);
  });

  return (
    <div
      ref={ref}
      data-stagger-item
      className={className}
      style={{
        ...(inView ? styles.visible : styles.hidden),
        transition: `opacity 0.5s cubic-bezier(0.25,0.4,0.25,1) ${computedDelay}s, transform 0.5s cubic-bezier(0.25,0.4,0.25,1) ${computedDelay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Parallax wrapper for subtle depth effects (lightweight CSS version)
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const Parallax = ({ children, className = "" }: ParallaxProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
