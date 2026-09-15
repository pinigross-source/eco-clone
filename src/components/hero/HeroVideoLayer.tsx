import { useEffect, useRef, useState } from "react";
import heroWebmAsset from "@/assets/hero-loop-forward.webm.asset.json";
import heroMp4Asset from "@/assets/hero-loop-forward.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";

const VIDEO_WEBM = heroWebmAsset.url;
const VIDEO_MP4 = heroMp4Asset.url;
const POSTER = heroPosterAsset.url;

/** True when the visitor asked the OS to reduce motion. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** True on a metered or very slow connection, or when Data Saver is on. */
function useSavesData() {
  const [save, setSave] = useState(false);
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!c) return;
    const slow = c.effectiveType === "slow-2g" || c.effectiveType === "2g";
    setSave(Boolean(c.saveData) || slow);
  }, []);
  return save;
}

/** True once the viewport is at least `min` CSS pixels wide. */
function useIsWide(min = 768) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    setWide(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [min]);
  return wide;
}

const MEDIA_CLASS =
  "absolute inset-0 h-full w-full object-cover object-[85%_bottom] md:object-[90%_center] lg:object-center";

/**
 * Looping background layer for the desktop hero.
 * Poster paints immediately; the video fades in on canplay and is skipped
 * entirely for reduced-motion, data-saver and narrow viewports.
 */
export const HeroVideoLayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const savesData = useSavesData();
  const isWide = useIsWide();

  const stillOnly = reducedMotion || savesData || !isWide;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || stillOnly) return;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => undefined);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? tryPlay() : el.pause()), {
      threshold: 0.01,
    });
    io.observe(el);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [stillOnly]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className={MEDIA_CLASS}
      />

      {!stillOnly && (
        <video
          ref={videoRef}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          onCanPlay={() => setReady(true)}
          className={[
            MEDIA_CLASS,
            "transition-opacity duration-700 ease-out motion-reduce:transition-none",
            ready ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default HeroVideoLayer;
