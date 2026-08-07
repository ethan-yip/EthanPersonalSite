// Photos — macOS Photos–style grid with an in-window lightbox (dark mode).
import { useState, useEffect, useCallback } from 'react';
import './Photos.css';

const PHOTOS = [
  { src: '/photos/1.jpg', caption: 'At a startup / tech event, Berkeley quarter-zip and name tag.' },
  { src: '/photos/2.jpg', caption: 'On the grand staircase at Grand Central Station.' },
  { src: '/photos/3.jpg', caption: 'With a colleague in front of the ECOSOC backdrop.' },
  { src: '/photos/4.webp', caption: 'Seated at the microphone in the UN chamber.' },
  { src: '/photos/5.png', caption: 'On stage — "One more thing…"' },
  { src: '/photos/6.png', caption: 'At the UN desk, Europe / North America Youth.' },
];

export default function Photos() {
  const [index, setIndex] = useState(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  const current = isOpen ? PHOTOS[index] : null;

  return (
    <div className="app photos-app">
      <div className="photos-scroll">
        <header className="photos-head">
          <h1>Photos</h1>
          <p className="photos-sub">Talks, the UN, and building — a small library.</p>
        </header>

        <div className="photos-grid">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className="photos-thumb"
              onClick={() => setIndex(i)}
              aria-label={`Enlarge photo: ${p.caption}`}
            >
              <img src={p.src} alt={p.caption} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="photos-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            type="button"
            className="photos-lb-close"
            onClick={close}
            aria-label="Close (Esc)"
          >
            ✕
          </button>

          <button
            type="button"
            className="photos-lb-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo (←)"
          >
            ‹
          </button>

          <figure className="photos-lb-stage" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.caption} decoding="async" />
            <figcaption className="photos-lb-caption">{current.caption}</figcaption>
          </figure>

          <div className="photos-lb-count" aria-hidden="true">
            {index + 1} / {PHOTOS.length}
          </div>

          <button
            type="button"
            className="photos-lb-nav next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next photo (→)"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
