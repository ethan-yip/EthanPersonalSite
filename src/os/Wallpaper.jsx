// ══════════════════════════════════════════════════════════════════
// Wallpaper — the desktop background.
// A high-res sky/mountain painting with a subtle live canvas layer:
// slow drifting cloud-haze + faint light motes, so the sky breathes.
// Respects prefers-reduced-motion (falls back to the static image).
// ══════════════════════════════════════════════════════════════════
import { useRef, useEffect } from 'react';
import './Wallpaper.css';

export default function Wallpaper() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // keep it a still image

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1;
    let raf = 0, running = false, last = 0;
    let haze = [], motes = [];

    const rand = (a, b) => a + Math.random() * (b - a);

    function build() {
      // slow horizontal cloud-haze drifting across the sky
      haze = [];
      for (let i = 0; i < 6; i++) {
        haze.push({
          x: rand(-0.2, 1.1) * W,
          y: rand(H * 0.06, H * 0.62),
          r: rand(220, 520),
          sp: rand(5, 16),
          a: rand(0.02, 0.05),
          // pale sky whites with a faint cool/pink cast to match the clouds
          col: ['248,252,255', '224,236,255', '238,226,244'][i % 3],
        });
      }
      // faint drifting light motes (dust / snow sparkle)
      const n = Math.max(18, Math.min(46, Math.round(W / 42)));
      motes = [];
      for (let i = 0; i < n; i++) {
        motes.push({
          x: rand(0, W), y: rand(0, H),
          r: rand(0.5, 1.7),
          vx: rand(4, 16), vy: rand(-6, 6),
          a: rand(0.15, 0.5),
          tw: rand(0.5, 2), phase: rand(0, 6.28),
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function frame(ts) {
      if (!running) return;
      if (!last) last = ts;
      let dt = (ts - last) / 1000; last = ts;
      if (dt > 0.1) dt = 0.1;
      const t = ts / 1000;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // ── drifting cloud-haze ──
      for (const h of haze) {
        h.x += h.sp * dt;
        if (h.x - h.r > W) h.x = -h.r;
        const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
        g.addColorStop(0, `rgba(${h.col},${h.a})`);
        g.addColorStop(1, `rgba(${h.col},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(h.x - h.r, h.y - h.r, h.r * 2, h.r * 2);
      }

      // ── faint light motes ──
      for (const m of motes) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.x > W + 5) m.x = -5;
        if (m.y > H + 5) m.y = -5;
        if (m.y < -5) m.y = H + 5;
        const flick = 0.6 + 0.4 * Math.sin(t * m.tw + m.phase);
        ctx.fillStyle = `rgba(255,255,255,${(m.a * flick).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 6.2832);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(frame);
    }

    function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

    resize();
    start();
    const onResize = () => resize();
    const onVis = () => (document.hidden ? stop() : start());
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="wallpaper" aria-hidden="true">
      <img
        className="wallpaper-img"
        src="/wallpaper/sky-peaks.webp"
        alt=""
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget;
          if (!el.dataset.fb) { el.dataset.fb = '1'; el.src = '/wallpaper/sky-peaks.png'; }
        }}
      />
      <canvas className="wallpaper-fx" ref={canvasRef} />
      <div className="wallpaper-scrim" />
    </div>
  );
}
