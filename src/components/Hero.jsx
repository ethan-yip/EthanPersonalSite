import ImagePanel from './ImagePanel';

export default function Hero({ ready }) {
  return (
    <section id="home" className="hero">

      {/* Left — narrative */}
      <div className="hero-text">

        <h1
          className="hero-headline"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}
        >
          {"I build what I can't find.".split('').map((ch, i) => (
            <span
              key={i}
              className="hero-headline-char"
              style={{ display: ch === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="hero-tagline" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease 0.7s' }}>
          <em>Cogito, ergo sum</em> — I think, therefore I am. (Descartes)
        </p>

        <div className="hero-narrative-rule" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease 0.9s' }} />

        <div className="hero-narrative" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease 1s' }}>
          <p>
            Started coding games at 9. By 12, I was teaching CS to 50+ kids at the Middle School.
            At 15, I flew into SF alone with no plan, and scaled from zero to a team of 7 in a month.
          </p>
          <p>
            Now I run <span className="highlight">HTSI Global</span>, a startup program
            backing and mentoring founders across Asia, Africa, LATAM, and North America with the United Nations.
          </p>
          <p>
            I source early-stage AI deals at <strong>LvlUp Ventures</strong>.{' '}
            I represent youth at the <strong>UN ECOSOC Forum</strong> and <strong>UN General Assembly</strong>.{' '}
            I'm joining <strong>Amazon Web Services</strong> for Machine Learning this summer.
          </p>
          <p>
            I also do ML research — geometric characterization of LLM reasoning manifolds,
            and broader work on how large language models think. Philosophy is the lens
            I bring to all of it.{' '}
            <strong><em>My essays connect that thinking to tech and leadership.</em></strong><span className="blink"> ░</span>
          </p>
        </div>

        <a
          href="mailto:ethanyip28@gmail.com"
          className="hero-email"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease 1.1s' }}
        >
          ethanyip28@gmail.com
        </a>

        <nav className="hero-nav" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease 1.2s' }}>
          <a href="https://www.linkedin.com/in/yip-ethan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="hero-nav-dot" />
          <a href="#essays">Essays</a>
          <span className="hero-nav-dot" />
          <a href="#research">Research</a>
          <span className="hero-nav-dot" />
          <a href="#contact">Contact</a>
        </nav>

      </div>

      {/* Right — image panel */}
      <div className="hero-panel" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease 0.7s' }}>
        <ImagePanel />
      </div>

    </section>
  );
}
