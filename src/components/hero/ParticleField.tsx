import { useEffect, useRef } from "react";

/**
 * ParticleField — cursor-driven particle emitter.
 * Particles only spawn where the mouse moves, drift briefly, then fade out.
 */
export const ParticleField = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    type P = {
      x: number; y: number; vx: number; vy: number; r: number;
      life: number; decay: number; hue: 0 | 1 | 2; phase: number;
    };

    const particles: P[] = [];
    const MAX_PARTICLES = 400;
    const pointer = { x: 0, y: 0, px: 0, py: 0, active: false, moved: false };

    const spawn = (x: number, y: number, speed: number) => {
      const count = reduce ? 1 : Math.min(6, 1 + Math.floor(speed * 0.4));
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const spd = 0.3 + Math.random() * 1.4;
        const roll = Math.random();
        const hue: 0 | 1 | 2 = roll < 0.55 ? 0 : roll < 0.8 ? 1 : 2;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 0.15,
          r: Math.random() * 2.2 + 1.1,
          life: 1,
          decay: 0.008 + Math.random() * 0.012,
          hue,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > width || y > height) {
        pointer.active = false;
        return;
      }
      if (!pointer.active) {
        pointer.px = x;
        pointer.py = y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      pointer.moved = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.moved = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, width, height);

      if (pointer.active && pointer.moved) {
        const dx = pointer.x - pointer.px;
        const dy = pointer.y - pointer.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.min(8, Math.floor(dist / 6)));
        for (let i = 1; i <= steps; i++) {
          const sx = pointer.px + (dx * i) / steps;
          const sy = pointer.py + (dy * i) / steps;
          spawn(sx, sy, dist);
        }
        pointer.px = pointer.x;
        pointer.py = pointer.y;
        pointer.moved = false;
      }

      ctx.globalCompositeOperation = "source-over";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.vx *= 0.96; p.vy *= 0.96; p.vy -= 0.005;
        p.x += p.vx; p.y += p.vy;

        const twinkle = 0.75 + Math.sin(t * 8 + p.phase) * 0.25;
        const alpha = p.life * twinkle;

        let core: string; let mid: string;
        if (p.hue === 0) {
          core = `rgba(178, 232, 207, ${alpha})`;
          mid = `rgba(178, 232, 207, ${alpha * 0.28})`;
        } else if (p.hue === 1) {
          core = `rgba(205, 245, 222, ${alpha})`;
          mid = `rgba(205, 245, 222, ${alpha * 0.3})`;
        } else {
          core = `rgba(245, 230, 200, ${alpha * 0.95})`;
          mid = `rgba(245, 230, 200, ${alpha * 0.24})`;
        }

        const haloR = p.r * 7;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
        grad.addColorStop(0, core);
        grad.addColorStop(0.4, mid);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.hue === 2
          ? `rgba(255, 245, 220, ${Math.min(1, alpha * 1.1)})`
          : `rgba(255, 255, 255, ${Math.min(1, alpha * 0.95)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};
