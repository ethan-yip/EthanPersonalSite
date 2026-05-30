import { useEffect, useRef, useState } from 'react';

const BAR_DURATION = 900;

export default function IntroAnimation({ onDone }) {
  const overlayRef = useRef(null);
  const barRef     = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bar     = barRef.current;
    if (!overlay || !bar) return;

    // kick off bar fill
    const t1 = setTimeout(() => {
      bar.style.transition = `width ${BAR_DURATION}ms cubic-bezier(0.4, 0, 0.15, 1)`;
      bar.style.width = '100%';
    }, 80);

    // fade out after bar completes + brief hold
    const t2 = setTimeout(() => {
      overlay.style.transition = 'opacity 300ms ease-out';
      overlay.style.opacity = '0';
    }, 80 + BAR_DURATION + 100);

    // unmount
    const t3 = setTimeout(() => {
      setGone(true);
      onDone?.();
    }, 80 + BAR_DURATION + 100 + 320);

    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-d)',
        fontSize: 'clamp(20px, 2.8vw, 34px)',
        fontWeight: 300,
        color: 'var(--text)',
        letterSpacing: '0.18em',
        animation: 'fadeIn 0.5s ease forwards',
      }}>
        Ethan Yip
      </span>

      <div style={{
        width: 'min(180px, 38vw)',
        height: '1px',
        background: 'var(--line)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: '0%',
            background: 'var(--accent)',
          }}
        />
      </div>
    </div>
  );
}
