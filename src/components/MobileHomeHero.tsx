import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import posterWebpAsset from "@/assets/mobile-home-hero-poster.webp.asset.json";
import posterJpgAsset from "@/assets/mobile-home-hero-poster.jpg.asset.json";
import videoWebmAsset from "@/assets/mobile-home-hero-loop.webm.asset.json";
import videoMp4Asset from "@/assets/mobile-home-hero-loop.mp4.asset.json";
import "./mobile-home-hero.css";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

export function MobileHomeHero() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const transitionPendingRef = useRef(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as NavigatorWithConnection).connection;
    const constrainedConnection = connection?.saveData === true || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
    const mobileViewport = window.matchMedia("(max-width: 767px)").matches;

    if (mobileViewport && !reducedMotion && !constrainedConnection) {
      setVideoEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!videoEnabled) return;
    const video = videoRefs.current[0];
    if (!video) return;
    video.load();
    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, [videoEnabled]);

  return (
    <section className="mobile-home-hero" aria-labelledby="mobile-home-hero-title">
      <div className="mobile-home-hero__media">
        <picture>
          <source srcSet={posterWebpAsset.url} type="image/webp" />
          <img
            className="mobile-home-hero__poster"
            src={posterJpgAsset.url}
            alt="A mother and daughter sitting on the living-room rug with their dog, a BioLogic Mini on the table beside them."
            width="800"
            height="600"
            fetchPriority="high"
          />
        </picture>
        {[0, 1].map((index) => (
          <video
            key={index}
            ref={(element) => {
              videoRefs.current[index] = element;
            }}
            className={`mobile-home-hero__video${videoReady && activeVideo === index ? " is-active" : ""}`}
            muted
            playsInline
            autoPlay={index === 0}
            preload={index === 0 ? "none" : "auto"}
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => {
              if (index === 0) setVideoReady(true);
            }}
            onCanPlay={() => {
              if (index === 0) setVideoReady(true);
            }}
            onTimeUpdate={(event) => {
              if (index !== activeVideo || transitionPendingRef.current) return;
              const current = event.currentTarget;
              if (!Number.isFinite(current.duration) || current.duration - current.currentTime > 1.1) return;

              const nextIndex = index === 0 ? 1 : 0;
              const next = videoRefs.current[nextIndex];
              if (!next || next.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;

              transitionPendingRef.current = true;
              next.currentTime = 0;
              void next.play().then(() => {
                setActiveVideo(nextIndex);
                window.setTimeout(() => {
                  current.pause();
                  current.currentTime = 0;
                  transitionPendingRef.current = false;
                }, 900);
              }).catch(() => {
                transitionPendingRef.current = false;
              });
            }}
            onEnded={(event) => {
              if (index !== activeVideo || transitionPendingRef.current) return;
              event.currentTarget.currentTime = 0;
              void event.currentTarget.play().catch(() => undefined);
            }}
          >
            {videoEnabled ? <source src={videoWebmAsset.url} type="video/webm" /> : null}
            {videoEnabled ? <source src={videoMp4Asset.url} type="video/mp4" /> : null}
          </video>
        ))}
      </div>

      <div className="mobile-home-hero__content">
        <p className="mobile-home-hero__eyebrow">Beyond air filtration</p>
        <h1 id="mobile-home-hero-title" className="mobile-home-hero__title">
          You take probiotics. Your home doesn’t.
        </h1>
        <p className="mobile-home-hero__support">
          Same idea, for the rooms you live in: probiotics released automatically into your indoor environment.&nbsp;
        </p>
        <p className="mobile-home-hero__offer">
          <strong>Kits from $98.</strong>
          <span>Device plus first cartridge. No subscription required.</span>
        </p>
        <a
          className="mobile-home-hero__button"
          href="#find-your-system"
          onClick={(e) => {
            e.preventDefault();
            trackEvent("homepage_cta_click", { placement: "hero" });
            document
              .getElementById("find-your-system")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Choose Your System
          <span className="mobile-home-hero__button-icon" aria-hidden="true">
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>
        <button
          type="button"
          className="mobile-home-hero__link"
          onClick={() => {
            setVideoOpen(true);
            trackEvent("click_see_how_it_works_video", { placement: "hero_mobile" });
          }}
        >
          <Play className="w-4 h-4" />
          Watch how it works
        </button>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:text-white [&>button]:hover:text-white/80">
          <div className="aspect-video w-full">
            {videoOpen && (
              <iframe
                src="https://player.vimeo.com/video/1146300437?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                title="See How EnviroBiotics Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}