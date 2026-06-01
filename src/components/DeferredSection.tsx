import { useRef, useState, useEffect, type ReactNode } from "react";

interface DeferredSectionProps {
  children: ReactNode;
  /** CSS min-height for the placeholder before the section mounts */
  minHeight?: string;
  /** How far before the viewport to trigger (px). Default 400. */
  rootMargin?: string;
  /** Optional className on the wrapper */
  className?: string;
  /** Force immediate render (e.g. when URL has a hash anchor) */
  forceMount?: boolean;
}

/**
 * Defers rendering of children until the placeholder scrolls within
 * `rootMargin` of the viewport. Once mounted, stays mounted forever.
 * Reduces initial DOM node count for long pages.
 */
export const DeferredSection = ({
  children,
  minHeight = "200px",
  rootMargin = "400px",
  className,
  forceMount = false,
}: DeferredSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (forceMount) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${rootMargin} 0px ${rootMargin} 0px` }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [forceMount, rootMargin]);

  if (visible) {
    return <div className={className}>{children}</div>;
  }

  return <div ref={ref} style={{ minHeight }} className={className} />;
};
