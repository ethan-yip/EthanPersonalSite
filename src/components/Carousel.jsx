import { useState, useEffect, useCallback } from 'react';

// Replace these with real image paths when ready: { src: '/photos/photo1.jpg' }
const SLIDES = [
  { src: null, label: 'A' },
  { src: null, label: 'B' },
  { src: null, label: 'C' },
  { src: null, label: 'D' },
];

const PlaceholderSlide = ({ label }) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-alt, #EDE7DC)',
    flexDirection: 'column',
    gap: 12,
  }}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.18 }}>
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="0.75"/>
      <line x1="6" y1="6" x2="42" y2="42" stroke="currentColor" strokeWidth="0.75"/>
      <line x1="42" y1="6" x2="6" y2="42" stroke="currentColor" strokeWidth="0.75"/>
    </svg>
    <span style={{
      fontFamily: 'var(--font-b)',
      fontSize: 9,
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      opacity: 0.5,
    }}>
      Photo {label}
    </span>
  </div>
);

const ChevronLeft = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const id = setInterval(next, 4800);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="carousel">
      {/* Crimson corner marks */}
      <div className="carousel-corner carousel-corner-tl">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="0" y1="0" x2="16" y2="0" stroke="var(--accent)" strokeWidth="1.5"/>
          <line x1="0" y1="0" x2="0" y2="16" stroke="var(--accent)" strokeWidth="1.5"/>
        </svg>
      </div>
      <div className="carousel-corner carousel-corner-br">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="16" y1="16" x2="0" y2="16" stroke="var(--accent)" strokeWidth="1.5"/>
          <line x1="16" y1="16" x2="16" y2="0" stroke="var(--accent)" strokeWidth="1.5"/>
        </svg>
      </div>

      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div key={i} className="carousel-slide">
            {slide.src
              ? <img src={slide.src} alt={`Slide ${i + 1}`} />
              : <PlaceholderSlide label={slide.label} />
            }
          </div>
        ))}
      </div>

      <div className="carousel-arrows">
        <button className="carousel-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft />
        </button>
        <button className="carousel-arrow" onClick={next} aria-label="Next">
          <ChevronRight />
        </button>
      </div>

      <div className="carousel-nav">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
