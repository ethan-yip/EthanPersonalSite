import { useEffect, useRef } from 'react';

export default function DotGrid({ theme }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -2000, y: -2000 });
  const dotsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const initDots = () => {
      const w = canvas.width;
      const h = canvas.height;
      const count = Math.max(60, Math.floor((w * h) / 7000));
      dotsRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return { x, y, ox: x, oy: y, vx: 0, vy: 0, r: Math.random() * 1.2 + 0.4, isRed: Math.random() < 0.055 };
      });
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const LINK  = 140;
    const REPEL = 110;
    const FORCE = 0.14;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const dotBase  = dark ? 'rgba(246,241,233,' : 'rgba(27,23,19,';
      const lineBase = dark ? 'rgba(246,241,233,' : 'rgba(27,23,19,';
      const red      = dark ? 'rgba(224,20,46,'   : 'rgba(196,18,48,';

      const { x: mx, y: my } = mouseRef.current;

      // Subtle crimson glow around cursor
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
      grd.addColorStop(0, dark ? 'rgba(196,18,48,0.04)' : 'rgba(196,18,48,0.025)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const dots = dotsRef.current;

      // Physics update
      dots.forEach(d => {
        const dx = mx - d.x;
        const dy = my - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = ((REPEL - dist) / REPEL) * FORCE;
          d.vx -= (dx / dist) * f * 1.8;
          d.vy -= (dy / dist) * f * 1.8;
        }
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
      });

      // Lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            const a = (1 - dist / LINK) * 0.16;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = lineBase + a + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.isRed ? red + '0.45)' : dotBase + '0.32)';
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
