import BorderGlow from './reactbits/BorderGlow';

export default function Featured() {
  return (
    <section className="section featured">
      <div className="wrap">
        <BorderGlow
          className="featured-card"
          backgroundColor="#FFFFFF"
          borderRadius={20}
          glowColor="351 78 50"
          glowRadius={46}
          glowIntensity={0.85}
          coneSpread={22}
          colors={['#C8102E', '#DD6A55', '#E6A6AB']}
          animated
        >
          <div className="featured-inner">
            <span className="featured-kicker">Now — building at Resonance</span>
            <p className="featured-quote">
              The next paradigm in technology is emotional. And those who see it early
              are going to look <em>wrong</em> for a while.
            </p>
            <a className="featured-link" href="https://rsnc.ai" target="_blank" rel="noopener noreferrer">
              Resonance <span aria-hidden="true">↗</span>
            </a>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
