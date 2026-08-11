import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let t = 0;
    let running = true;

    const getParticleCount = () => {
      const vw = window.innerWidth;
      if (vw < 480) return 40;
      if (vw < 768) return 70;
      if (vw < 1024) return 110;
      return 180;
    };

    let PARTICLE_COUNT = getParticleCount();
    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number; hue: number };
    let particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const newCount = getParticleCount();
      if (newCount !== PARTICLE_COUNT) {
        PARTICLE_COUNT = newCount;
      }
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.6 + 0.4,
          o: Math.random() * 0.5 + 0.1,
          hue: Math.random() > 0.5 ? 220 : 265,
        });
      }
    };

    // Debounced resize — only update dimensions, don't recreate particles unless needed
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        const newCount = getParticleCount();
        if (newCount !== PARTICLE_COUNT) {
          initParticles();
        }
      }, 150);
    };

    // Pause when tab not visible
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    initParticles();
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    const draw = () => {
      if (!running) return;
      t += 0.0033;
      ctx.clearRect(0, 0, w, h);

      const gx = Math.sin(t * 0.3) * 0.3 + 0.5;
      const gy = Math.cos(t * 0.27) * 0.3 + 0.5;
      const grad = ctx.createRadialGradient(w * gx, h * gy, 0, w * gx, h * gy, Math.max(w, h) * 0.8);
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.08)');
      grad.addColorStop(0.4, 'rgba(124, 58, 237, 0.04)');
      grad.addColorStop(1, 'rgba(5, 5, 5, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 3; i++) {
        const ang = t * 0.2 + i * 2.1;
        const cx = w * 0.5 + Math.cos(ang) * w * 0.2;
        const cy = h * 0.5 + Math.sin(ang) * h * 0.2;
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.5);
        rg.addColorStop(0, i === 0 ? 'rgba(37,99,235,0.04)' : 'rgba(124,58,237,0.03)');
        rg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        const flick = 0.6 + Math.sin(t * 2 + p.x * 0.01) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.o * flick})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, ${p.o})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // connections — O(n²) but n is small and capped
      const maxD2 = 14000;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const o = (1 - d2 / maxD2) * 0.08;
            ctx.strokeStyle = `rgba(140,160,255,${o})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.06), transparent 60%), radial-gradient(ellipse 60% 50% at 70% 70%, rgba(124,58,237,0.04), transparent 60%)',
        }}
      />

      {/* Subtle full-width atmospheric tint — black → dark navy → indigo, mirrors the hero gradient so the entire site feels cohesive */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 30%, rgba(8,9,20,0.4) 55%, rgba(14,17,48,0.5) 80%, rgba(17,19,54,0.55) 100%)',
        }}
      />

      <div className="absolute inset-0 grid-fade opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 75%)',
          }}
        />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="noise-overlay absolute inset-0 opacity-[0.03] mix-blend-overlay" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(5,5,5,0.9), transparent 60%), radial-gradient(ellipse 100% 80% at 50% 0%, rgba(5,5,5,0.6), transparent 50%)',
        }}
      />
    </div>
  );
}
