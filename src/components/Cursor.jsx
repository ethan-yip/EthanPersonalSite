import { useEffect, useRef } from 'react';

const SIZE = 8; // radius

export default function Cursor() {
  const ref    = useRef(null);
  const target = useRef({ x: -40, y: -40 });
  const pos    = useRef({ x: -40, y: -40 });
  const raf    = useRef(null);

  useEffect(() => {
    const onMove  = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()  => { target.current = { x: -40, y: -40 }; };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.16);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.16);
      if (ref.current) {
        ref.current.style.transform =
          `translate(${pos.current.x - SIZE}px, ${pos.current.y - SIZE}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: SIZE * 2,
        height: SIZE * 2,
        borderRadius: '50%',
        background: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        opacity: 0.9,
      }}
    />
  );
}
