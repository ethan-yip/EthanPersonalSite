import { useEffect, useRef, useState } from 'react';

const STATS = [
  { end: 20,  suffix: '+', label: 'Investor\nPartners' },
  { end: 8,   suffix: '%', label: 'HTSI\nAcceptance Rate' },
  { end: 250, suffix: 'M+', label: 'AUM Supported\n(LvlUp)' },
  { end: 4,   suffix: '',  label: 'Continents\nReached' },
];

const TAGS = [
  'Python', 'PyTorch', 'React', 'SwiftUI', 'Flutter',
  'Firebase', 'MongoDB', 'English (Native)', 'Mandarin',
];

function CountUp({ end, suffix, active }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * end));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, end]);

  return <>{val}{suffix}</>;
}

export default function About() {
  const sectionRef = useRef(null);
  const statsRef   = useRef(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach(el => obs.observe(el));

    const statsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); statsObs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) statsObs.observe(statsRef.current);

    return () => { obs.disconnect(); statsObs.disconnect(); };
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-wrap">
          <span className="section-bg-num">01</span>

          <div className="section-label reveal">
            <span className="section-num">01</span>
            <span className="section-rule" />
            About
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p className="reveal reveal-delay-1">
                I started as an operator. <strong>Built things, broke things</strong>, flew into SF alone
                with no real plan and went zero to one in four weeks. Along the way I've worn a lot of
                hats: early startup founder, engineer, VC, mentor, advisor, hackathon organizer.
              </p>
              <p className="reveal reveal-delay-2">
                Now I run <strong>HTSI Global</strong> — a competitive startup program with an 8%
                acceptance rate, working with 20+ investor sponsors and institutional partners
                across Asia, Africa, LATAM, and North America. Recognized by UNESCO, the Learning
                Planet Institute, and UN University. Aligned with UN SDGs 4 and 9.
              </p>
              <p className="reveal reveal-delay-3">
                Beyond that: sourcing AI deals at <strong>LvlUp Ventures</strong> ($250M+ AUM),
                incoming <strong>ML Engineer at AWS</strong> (Summer 2026), and representing youth
                perspectives at the <strong>UN ECOSOC Youth Forum</strong>. I also conduct ML research —
                my current paper on geometric characterization of LLM reasoning manifolds is under
                review at the ICML Mechanistic Interpretability Workshop.
              </p>

              <div className="about-tags reveal reveal-delay-4">
                {TAGS.map(t => <span key={t} className="about-tag">{t}</span>)}
              </div>
            </div>

            <div ref={statsRef} className="about-stats reveal reveal-delay-2">
              {STATS.map((s, i) => (
                <div key={i} className="stat">
                  <div className="stat-num">
                    <CountUp end={s.end} suffix={s.suffix} active={statsActive} />
                  </div>
                  <div className="stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
