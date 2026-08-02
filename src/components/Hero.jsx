import HeroCarousel from './HeroCarousel';

const INDEX = [
  { n: '01', t: 'Resonance', y: 'Chief of Staff · 2026' },
  { n: '02', t: 'Substrate Labs', y: 'Interpretability · 2026' },
  { n: '03', t: 'HTSI Global × United Nations', y: 'Director · 2025' },
];

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="wrap">
        <div className="hero-meta reveal">
          <span className="lbl">Builder — Researcher — Investor</span>
          <span className="lbl">New York · Est. 2026</span>
        </div>

        <h1 className="hero-mega reveal d1">
          <span className="line">I Build What</span>
          <span className="line">I Can&rsquo;t <span className="red">Find</span></span>
        </h1>

        <div className="hero-lower">
          <div className="hero-info reveal d2">
            <div className="hero-copy">
              <p className="hero-statement">
                Chief of Staff, Engineering &amp; Technology at{' '}
                <a className="inline" href="https://rsnc.ai" target="_blank" rel="noopener noreferrer">Resonance</a> —
                building emotional intelligence for humanoid agents.
              </p>
              <p className="hero-aside">
                Outside work I read philosophy, keep up my Latin, and write essays. Usually
                about the things that keep me up at night.
              </p>
            </div>

            <ol className="hero-index">
              {INDEX.map(x => (
                <li key={x.t}>
                  <span className="t">{x.t}</span>
                  <span className="y">{x.y}</span>
                </li>
              ))}
            </ol>

            <div className="hero-links">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ethan@rsnc.ai" target="_blank" rel="noopener noreferrer">Email ↗</a>
              <a href="https://www.linkedin.com/in/yip-ethan" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://rsnc.ai" target="_blank" rel="noopener noreferrer">Resonance ↗</a>
            </div>

            <div className="hero-actions">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ethan@rsnc.ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get in touch →</a>
              <a href="#about" className="btn btn-ghost">About</a>
            </div>
          </div>

          <div className="hero-media reveal d2">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </header>
  );
}
