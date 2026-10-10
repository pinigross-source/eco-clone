import { useEffect, useRef, useState } from 'react';

/** Poster-first, viewport-gated media; never loads video with reduced motion. */
export function ExplainerVideo({ src, webm, poster, label, eager = false, className = '' }: { src: string; webm: string; poster: string; label: string; eager?: boolean; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState<boolean | null>(null);
  const [near, setNear] = useState(eager);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    const element = container.current;
    if (!element) return () => media.removeEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true);
      setVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(element);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (visible && reduced === false) void element.play().catch(() => undefined);
    else element.pause();
  }, [visible, reduced, near]);
  return <div ref={container} className={`relative overflow-hidden aspect-video ${className}`} role="img" aria-label={label}>
    <img src={poster} alt="" loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    {near && reduced === false && <video ref={video} poster={poster} autoPlay={visible} muted loop playsInline preload={eager ? 'auto' : 'metadata'} aria-hidden="true" onCanPlay={() => setReady(true)} className={`absolute inset-0 h-full w-full object-cover ${ready ? 'opacity-100' : 'opacity-0'}`}><source src={webm} type="video/webm" /><source src={src} type="video/mp4" /></video>}
  </div>;
}
