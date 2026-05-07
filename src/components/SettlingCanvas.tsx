import { useEffect, useRef, useCallback, useState } from "react";

const DEFS = [
  { label: "Couch", note: "Fabric absorbs & holds", pct: 72 },
  { label: "Bedding", note: "8 hrs of exposure nightly", pct: 58 },
  { label: "Pet Area", note: "Highest buildup zone", pct: 85 },
  { label: "Carpets", note: "Traps & re-releases", pct: 64 },
];

const AIR_FRAC = 0.36;
const SURF_FRAC = 0.64;
const STEP_DUR = 2400;

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

function drawIcon(ctx: CanvasRenderingContext2D, type: number, cx: number, cy: number, sz: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 1.9;
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.fillStyle = "transparent";
  const s = sz / 24, tx = cx - sz / 2, ty = cy - sz / 2;
  ctx.translate(tx, ty); ctx.scale(s, s);

  if (type === 0) {
    ctx.beginPath(); ctx.moveTo(2, 14); ctx.lineTo(22, 14); ctx.lineTo(22, 20); ctx.lineTo(2, 20); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, 11); ctx.arcTo(2, 9, 4, 9, 2); ctx.lineTo(6, 9); ctx.lineTo(6, 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22, 11); ctx.arcTo(22, 9, 20, 9, 2); ctx.lineTo(18, 9); ctx.lineTo(18, 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, 9); ctx.lineTo(6, 5); ctx.quadraticCurveTo(6, 4, 7, 4); ctx.lineTo(17, 4); ctx.quadraticCurveTo(18, 4, 18, 5); ctx.lineTo(18, 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5, 20); ctx.lineTo(5, 23); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(19, 20); ctx.lineTo(19, 23); ctx.stroke();
  } else if (type === 1) {
    ctx.beginPath(); ctx.moveTo(2, 19); ctx.lineTo(2, 12); ctx.quadraticCurveTo(2, 10, 4, 10); ctx.lineTo(20, 10); ctx.quadraticCurveTo(22, 10, 22, 12); ctx.lineTo(22, 19); ctx.lineTo(2, 19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(7, 10); ctx.lineTo(7, 14); ctx.quadraticCurveTo(7, 16, 9, 16); ctx.lineTo(15, 16); ctx.quadraticCurveTo(17, 16, 17, 14); ctx.lineTo(17, 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4, 19); ctx.lineTo(4, 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, 19); ctx.lineTo(20, 22); ctx.stroke();
  } else if (type === 2) {
    ctx.beginPath(); ctx.ellipse(12, 16, 4.5, 3.5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(7, 9.5, 2.2, 2.5, -0.2, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(12, 7.5, 2.2, 2.5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(17, 9.5, 2.2, 2.5, 0.2, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 3) {
    rrect(ctx, 2, 6, 20, 14, 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, 11); ctx.lineTo(22, 11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, 15); ctx.lineTo(22, 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, 6); ctx.lineTo(8, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, 6); ctx.lineTo(14, 20); ctx.stroke();
  }
  ctx.restore();
}

interface Surface {
  label: string;
  note: string;
  pct: number;
  x: number;
  y: number;
  w: number;
  pile: { r: number; alpha: number }[];
}

class Particle {
  x = 0; y = 0; r = 0; vx = 0; vy = 0;
  wA = 0; wF = 0; wP = 0; age = 0; base = 0; alpha = 0;
  hue = 0; state = "float"; tid = 0;
  W = 0; H = 0;

  constructor(W: number, H: number, scatter: boolean) {
    this.W = W; this.H = H;
    this.tid = Math.floor(Math.random() * DEFS.length);
    this.reset(scatter);
  }

  reset(scatter: boolean) {
    this.x = Math.random() * this.W;
    this.y = scatter ? Math.random() * this.H * AIR_FRAC * 0.9 : -20 - Math.random() * 60;
    this.r = 1.5 + Math.pow(Math.random(), 1.2) * 4.5;
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = -0.04 + Math.random() * 0.15;
    this.wA = 0.2 + Math.random() * 0.8;
    this.wF = 0.003 + Math.random() * 0.005;
    this.wP = Math.random() * Math.PI * 2;
    this.age = Math.random() * 300;
    this.base = 0.25 + (this.r / 6) * 0.6;
    this.alpha = scatter ? this.base : 0;
    this.hue = 22 + Math.random() * 18;
    this.state = "float";
  }

  respawn() {
    this.reset(true); this.state = "float";
    this.tid = Math.floor(Math.random() * DEFS.length);
  }

  update(step: number, stepProgress: number, surfaces: Surface[]) {
    this.age++;
    if (this.state === "float") {
      this.alpha += (this.base - this.alpha) * 0.04;
      this.x += this.vx + Math.sin(this.age * this.wF + this.wP) * this.wA;
      this.y += this.vy;
      const ceil = this.H * AIR_FRAC * 0.92;
      if (this.y < -15) this.y = ceil;
      if (this.y > ceil) this.y = -8;
      if (this.x < -10) this.x = this.W + 5;
      if (this.x > this.W + 10) this.x = -5;
    }
    if (this.state === "settling") {
      const t = surfaces[this.tid];
      const tx = t.x, ty = t.y - 16;
      const dx = tx - this.x, dy = ty - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const spd = Math.min(1.3 + stepProgress * 3, dist);
      this.x += (dx / dist) * spd + Math.sin(this.age * 0.012) * (0.4 * (1 - stepProgress));
      this.y += (dy / dist) * spd;
      if (dist < 30) this.alpha *= 0.989;
      if (dist < 5) {
        this.state = "fading";
        if (t.pile.length < 12) t.pile.push({ r: Math.max(0.8, this.r * 0.75), alpha: 0.55 + Math.random() * 0.3 });
      }
    }
    if (this.state === "fading") { this.alpha -= 0.022; if (this.alpha <= 0) this.state = "dead"; }
    if (step === 2 && this.state === "float") { this.alpha -= 0.003; if (this.alpha <= 0) this.state = "dead"; }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0.005 || this.state === "dead") return;
    const a = this.alpha, br = 52 + (this.r / 6) * 28;
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
    g.addColorStop(0, `hsla(${this.hue},80%,${br}%,${a * 0.75})`);
    g.addColorStop(0.4, `hsla(${this.hue},75%,${br}%,${a * 0.25})`);
    g.addColorStop(1, `hsla(${this.hue},70%,${br}%,0)`);
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue},82%,${br + 8}%,${a})`; ctx.fill();
    if (this.r > 1.5) {
      ctx.beginPath(); ctx.arc(this.x - this.r * 0.28, this.y - this.r * 0.28, this.r * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a * 0.65})`; ctx.fill();
    }
  }
}

const STEP_LABELS = [
  "Particles float invisibly",
  "They settle on surfaces",
  "Buildup is persistent & invisible",
];

const CALLOUT_MSGS = [
  { h: "Invisible particles fill the air around you", s: "Dust · Dander · Allergens · Mold spores — suspended right now" },
  { h: "Every particle is falling, continuously", s: "Gravity pulls them onto every surface in your home" },
  { h: "Surfaces become the contamination reservoir", s: "90% of indoor pollutants live here — air filters never reach it" },
];

export const SettlingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const stateRef = useRef({
    step: 0,
    stepProgress: 0,
    stepStart: 0,
    particles: [] as Particle[],
    surfaces: [] as Surface[],
    W: 0,
    H: 0,
    animId: 0,
    autoTimers: [] as ReturnType<typeof setTimeout>[],
    initialized: false,
  });
  const [activeStep, setActiveStep] = useState(0);

  // Only activate when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); io.disconnect(); } },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const buildSurfaces = useCallback((W: number, H: number, existingSurfaces: Surface[]) => {
    const padX = W * 0.045;
    const slotW = (W - padX * 2) / DEFS.length;
    return DEFS.map((d, i) => ({
      ...d,
      x: padX + slotW * i + slotW / 2,
      y: H * AIR_FRAC,
      w: slotW * 0.80,
      pile: existingSurfaces[i]?.pile ?? [],
    }));
  }, []);

  const goStep = useCallback((s: number) => {
    const st = stateRef.current;
    if (s === st.step) return;
    if (s < 2) st.surfaces.forEach(sf => (sf.pile = []));
    if (s === 0) st.particles.forEach(p => p.respawn());
    st.step = s;
    st.stepProgress = 0;
    st.stepStart = performance.now();
    setActiveStep(s);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const st = stateRef.current;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
      st.W = r.width;
      st.H = r.height;
      st.surfaces = buildSurfaces(st.W, st.H, st.surfaces);
    };

    resize();
    st.particles = Array.from({ length: 60 }, () => new Particle(st.W, st.H, true));
    st.stepStart = performance.now();

    // Auto-advance steps
    st.autoTimers.push(setTimeout(() => goStep(1), 3200));
    st.autoTimers.push(setTimeout(() => goStep(2), 6800));

    const drawBg = () => {
      const ag = ctx.createLinearGradient(0, 0, 0, st.H * AIR_FRAC);
      ag.addColorStop(0, "#ECF1FA"); ag.addColorStop(0.7, "#F1EDE8"); ag.addColorStop(1, "#F4F0EC");
      ctx.fillStyle = ag; ctx.fillRect(0, 0, st.W, st.H * AIR_FRAC);

      ctx.fillStyle = "rgba(160,140,120,.13)";
      const gs = 28;
      for (let x = gs; x < st.W; x += gs)
        for (let y = gs; y < st.H * (AIR_FRAC - 0.02); y += gs) {
          ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill();
        }

      const sg = ctx.createLinearGradient(0, st.H * AIR_FRAC, 0, st.H);
      sg.addColorStop(0, "#E8E0D5"); sg.addColorStop(1, "#DFD6CA");
      ctx.fillStyle = sg; ctx.fillRect(0, st.H * AIR_FRAC, st.W, st.H * SURF_FRAC);
    };

    const drawBadge = () => {
      const label = "Settling continuously";
      ctx.save();
      ctx.font = '500 11px "Poppins",system-ui,sans-serif';
      const tw = ctx.measureText(label).width;
      const bw = tw + 46, bh = 30, bx = st.W - bw - 18, by = 13;
      ctx.shadowColor = "rgba(45,26,14,.12)"; ctx.shadowBlur = 10; ctx.shadowOffsetY = 2;
      ctx.fillStyle = "rgba(255,255,255,.97)";
      rrect(ctx, bx, by, bw, bh, 15); ctx.fill();
      ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
      ctx.strokeStyle = "rgba(200,96,26,.3)"; ctx.lineWidth = 1.2;
      rrect(ctx, bx, by, bw, bh, 15); ctx.stroke();
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.0028);
      ctx.beginPath(); ctx.arc(bx + 19, by + 15, 7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,96,26,${0.08 + pulse * 0.07})`; ctx.fill();
      ctx.beginPath(); ctx.arc(bx + 19, by + 15, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,96,26,${0.7 + pulse * 0.3})`; ctx.fill();
      ctx.fillStyle = "rgba(45,26,14,.75)";
      ctx.textBaseline = "middle";
      ctx.fillText(label, bx + 32, by + 15);
      ctx.textBaseline = "alphabetic";
      ctx.restore();
    };

    const drawAirLabel = () => {
      ctx.save();
      ctx.font = '500 9px "Poppins",system-ui,sans-serif';
      ctx.fillStyle = "rgba(90,120,165,.5)";
      ctx.fillText("A I R   Z O N E", 20, 26);
      ctx.restore();
    };

    const drawDivider = () => {
      const dy = st.H * AIR_FRAC;
      ctx.strokeStyle = "rgba(200,96,26,.2)"; ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath(); ctx.moveTo(st.W * 0.04, dy); ctx.lineTo(st.W * 0.96, dy); ctx.stroke();
      ctx.setLineDash([]);
      const txt = "SURFACE LAYER";
      ctx.font = '600 8.5px "Poppins",system-ui,sans-serif';
      const tw = ctx.measureText(txt).width;
      const pw = tw + 28, ph = 22, px = st.W / 2 - pw / 2, py = dy - ph / 2;
      ctx.fillStyle = "#fff"; rrect(ctx, px, py, pw, ph, 11); ctx.fill();
      ctx.strokeStyle = "rgba(200,96,26,.3)"; ctx.lineWidth = 1;
      rrect(ctx, px, py, pw, ph, 11); ctx.stroke();
      ctx.fillStyle = "rgba(200,96,26,.9)";
      ctx.textAlign = "center"; ctx.fillText(txt, st.W / 2, py + 15); ctx.textAlign = "left";
    };

    const drawSurfaces = () => {
      st.surfaces.forEach((s, i) => {
        const cw = s.w;
        const cx = s.x - cw / 2;
        const titleY = 20;
        const iconSz = Math.min(cw * 0.68, 60);
        const iconY = titleY + 6 + iconSz / 2;
        const noteY = iconY + iconSz / 2 + 8;
        const buildupTop = noteY + 6;
        const dotR = 4;
        const dpr = 6;
        const dgap = 10;
        const buildupLabelH = 16;
        const maxRows = 2;
        const dotsH = maxRows * (dotR * 2 + dgap - 6);
        const pileBaseY0 = buildupTop + buildupLabelH;
        const barY0 = pileBaseY0 + dotsH + 6;
        const pctY0 = barY0 + 4 + 14;
        const ch = pctY0 + 10 - titleY + 20;

        const surfaceZoneTop = st.H * AIR_FRAC;
        const surfaceZoneH = st.H * SURF_FRAC;
        const cardTop = surfaceZoneTop + (surfaceZoneH - ch) / 2;

        const tY = cardTop + 20;
        const iY = tY + 6 + iconSz / 2;
        const nY = iY + iconSz / 2 + 8;
        const bTop = nY + 6;
        const pileBaseY = bTop + buildupLabelH;
        const barY = pileBaseY + dotsH + 6;
        const pctY = barY + 4 + 14;

        ctx.shadowColor = "rgba(45,26,14,.08)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 3;
        ctx.fillStyle = "rgba(255,255,255,.92)";
        rrect(ctx, cx, cardTop, cw, ch, 14); ctx.fill();
        ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

        const borderAlpha = s.pile.length > 5 ? Math.min(s.pile.length / 52 * 0.38, 0.32) : 0.09;
        ctx.strokeStyle = `rgba(200,96,26,${borderAlpha})`;
        ctx.lineWidth = s.pile.length > 5 ? 1.5 : 1;
        rrect(ctx, cx, cardTop, cw, ch, 14); ctx.stroke();

        ctx.font = '600 13px "Poppins",system-ui,sans-serif';
        ctx.fillStyle = "rgba(45,26,14,.92)";
        ctx.textAlign = "center";
        ctx.fillText(s.label, s.x, tY);

        drawIcon(ctx, i, s.x, iY, iconSz, "rgba(107,74,48,.65)");

        const noteFontSize = Math.min(10, cw / (s.note.length * 0.58));
        ctx.font = `400 ${noteFontSize}px "Poppins",system-ui,sans-serif`;
        ctx.fillStyle = "rgba(90,55,30,.72)";
        ctx.textAlign = "center";
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx + 4, nY - noteFontSize, cw - 8, noteFontSize + 4);
        ctx.clip();
        ctx.fillText(s.note, s.x, nY);
        ctx.restore();

        if (s.pile.length > 0) {
          ctx.font = '500 7.5px "Poppins",system-ui,sans-serif';
          ctx.fillStyle = `rgba(200,96,26,${Math.min(s.pile.length / 12, 0.7)})`;
          ctx.fillText("BUILDUP", s.x, bTop + 10);
        }
        ctx.textAlign = "left";

        const maxDots = maxRows * dpr;
        const visiblePile = s.pile.slice(0, maxDots);
        visiblePile.forEach((dot, di) => {
          const col = di % dpr;
          const row = Math.floor(di / dpr);
          const dx = s.x - ((dpr - 1) * dgap) / 2 + col * dgap;
          const dy2 = pileBaseY + row * (dotR * 2 + 2);

          const gl = ctx.createRadialGradient(dx, dy2, 0, dx, dy2, dotR * 2.8);
          gl.addColorStop(0, "rgba(200,88,26,0.35)");
          gl.addColorStop(0.7, "rgba(200,88,26,0.08)");
          gl.addColorStop(1, "rgba(200,88,26,0)");
          ctx.beginPath(); ctx.arc(dx, dy2, dotR * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = gl; ctx.fill();

          ctx.beginPath(); ctx.arc(dx, dy2, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(185,75,18,${Math.min(dot.alpha + 0.35, 0.95)})`; ctx.fill();

          ctx.beginPath(); ctx.arc(dx, dy2, dotR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(235,130,60,${dot.alpha * 0.5})`;
          ctx.lineWidth = 1; ctx.stroke();

          ctx.beginPath(); ctx.arc(dx - dotR * 0.3, dy2 - dotR * 0.35, dotR * 0.38, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,200,150,0.75)"; ctx.fill();
        });

        const barA = st.step >= 2 ? Math.min(1, st.stepProgress * 1.6) : 0;
        const barX = s.x - cw * 0.37;
        const barW = cw * 0.74 * (s.pct / 100) * barA;

        ctx.fillStyle = "rgba(200,150,100,.13)";
        rrect(ctx, barX, barY, cw * 0.74, 4, 2); ctx.fill();

        if (barW > 1) {
          const bg = ctx.createLinearGradient(barX, 0, barX + cw * 0.74, 0);
          bg.addColorStop(0, "rgba(232,133,58,.85)");
          bg.addColorStop(1, "rgba(200,96,26,.95)");
          ctx.fillStyle = bg;
          rrect(ctx, barX, barY, barW, 4, 2); ctx.fill();
        }

        if (barA > 0.4) {
          const pA = Math.min(1, (barA - 0.4) * 1.7);
          ctx.font = '600 11px "Poppins",system-ui,sans-serif';
          ctx.fillStyle = `rgba(200,96,26,${pA})`;
          ctx.textAlign = "center";
          ctx.fillText(`${s.pct}%`, s.x, pctY);
          ctx.textAlign = "left";
        }
      });
    };

    const drawCallout = () => {
      const m = CALLOUT_MSGS[st.step];
      const fade = Math.min(1, st.stepProgress * 3.5);
      const cy = st.H * (AIR_FRAC * 0.5);
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = `500 ${Math.round(Math.min(17, st.W * 0.02))}px "Poppins",system-ui,sans-serif`;
      ctx.fillStyle = `rgba(45,26,14,${0.88 * fade})`;
      ctx.fillText(m.h, st.W / 2, cy);
      ctx.font = '400 11px "Poppins",system-ui,sans-serif';
      ctx.fillStyle = `rgba(80,50,25,${0.78 * fade})`;
      ctx.fillText(m.s, st.W / 2, cy + 22);
      ctx.restore();
    };

    const loop = (now: number) => {
      st.stepProgress = Math.min(1, (now - st.stepStart) / STEP_DUR);
      const ep = 1 - Math.pow(1 - st.stepProgress, 3);

      if (st.step === 1 && ep > 0.05)
        st.particles.forEach(p => { if (p.state === "float" && Math.random() < 0.009 * ep) p.state = "settling"; });
      if (st.step === 2)
        st.particles.forEach(p => { if (p.state === "float") p.state = "fading"; });
      const dead = st.particles.filter(p => p.state === "dead");
      if (st.step === 0 && dead.length > 0) dead.forEach(p => p.respawn());

      // Reset DPR scale each frame
      const dpr2 = window.devicePixelRatio || 1;
      ctx.setTransform(dpr2, 0, 0, dpr2, 0, 0);

      drawBg();
      drawSurfaces();
      st.particles.forEach(p => { p.update(st.step, st.stepProgress, st.surfaces); p.draw(ctx); });
      drawDivider();
      drawAirLabel();
      drawBadge();
      drawCallout();

      st.animId = requestAnimationFrame(loop);
    };

    st.animId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(st.animId);
      window.removeEventListener("resize", resize);
      st.autoTimers.forEach(clearTimeout);
    };
  }, [buildSurfaces, goStep, isVisible]);

  const handleStepClick = (s: number) => {
    const st = stateRef.current;
    st.autoTimers.forEach(clearTimeout);
    st.autoTimers = [];
    goStep(s);
  };

  return (
    <div ref={containerRef} className="w-full rounded-2xl md:rounded-3xl overflow-hidden border border-border/50 bg-card shadow-xl">
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: "420px" }}
      />
      <div className="flex border-t border-border/30 bg-[hsl(30,30%,97%)]">
        {STEP_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => handleStepClick(i)}
            className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-3 cursor-pointer transition-colors duration-300 border-r border-border/30 last:border-r-0 ${
              activeStep === i ? "bg-primary/5" : "hover:bg-primary/[0.02]"
            }`}
          >
            <span
              className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[0.58rem] font-semibold flex-shrink-0 transition-all duration-300 ${
                activeStep === i
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-[1.5px] border-primary/30 text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-[0.7rem] font-medium tracking-wide leading-tight ${
                activeStep === i ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
