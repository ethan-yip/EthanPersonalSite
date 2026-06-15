import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cursor from '../components/Cursor';
import './Faultlines.css';

const Sun = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const Moon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}

function Pullquote({ children }) {
  return (
    <blockquote className="essay-pullquote reveal">
      {children}
    </blockquote>
  );
}

function SectionHead({ marker, title }) {
  return (
    <div className="essay-section-head reveal">
      {marker && <span className="essay-section-num">{marker}</span>}
      <h2 className="essay-section-title">{title}</h2>
    </div>
  );
}

function Src({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="essay-inline-src">
      {children}
    </a>
  );
}

export default function UltimateOutsideInsider() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light'
  );
  const progress = useReadingProgress();
  const bodyRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const els = bodyRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Cursor />

      {/* Reading progress bar */}
      <div className="reading-bar" style={{ transform: `scaleX(${progress})` }} />

      {/* Nav */}
      <nav className="nav">
        <Link to="/" className="nav-logo">EY</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">← home</Link>
          <button
            className="theme-toggle"
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      </nav>

      <article ref={bodyRef}>

        {/* ── Hero ─────────────────────────────────── */}
        <header className="essay-hero">
          <div className="essay-hero-inner">

            <div className="essay-eyebrow reveal">
              The Hidden Curriculum of Leadership &nbsp;·&nbsp; Essay 3
            </div>

            <div className="essay-title-block">
              <h1 className="essay-display-title reveal" style={{ fontSize: 'clamp(40px, 5.8vw, 84px)' }}>
                The Ultimate Outside Insider
              </h1>
              <div className="essay-title-aside reveal">
                <div className="essay-title-aside-label">On</div>
                <div className="essay-title-aside-desc">
                </div>
              </div>
            </div>

            <div className="essay-byline reveal">
              <span>by Ethan Yip</span>
              <span className="essay-byline-dot" />
              <span>2026</span>
            </div>

          </div>
        </header>

        {/* ── Body ─────────────────────────────────── */}
        <div className="essay-body">

        </div>

      </article>
    </>
  );
}
