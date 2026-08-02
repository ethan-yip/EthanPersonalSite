const NOW = [
  { org: 'Resonance', what: 'Chief of Staff, Engineering & Technology', when: '2026', href: 'https://rsnc.ai' },
  { org: 'Substrate Labs', what: 'Research — Mechanistic Interpretability', when: '2026', href: 'https://substrate-labs.org' },
  { org: 'HTSI Global', what: 'Director — Founder Ecosystems', when: '2025', href: null },
  { org: 'United Nations', what: 'Youth Delegate — ECOSOC', when: '2025', href: null },
  { org: 'LvlUp Ventures', what: 'VC in Residence — AI & Software', when: '2025', href: null },
  { org: 'Amazon Web Services', what: 'Machine Learning — Former', when: '2026', href: null },
];

function NowItem({ org, what, when, href }) {
  const inner = (
    <>
      <span className="now-role">
        <span className="org">{org}</span>
        <span className="what">{what}</span>
      </span>
      <span className="now-when">{when}</span>
    </>
  );
  return href
    ? <a className="now-item" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <div className="now-item">{inner}</div>;
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="sec-title">About</h2>
        </div>

        <div className="about-grid">
          <div className="about-prose reveal">
            <p>
              Started coding games at 9. By 12, I was teaching CS to 50+ kids at my
              middle school. At 15, I flew into SF alone with no plan and scaled from
              zero to a team of 7 in a month.
            </p>
            <p>
              Now I&rsquo;m Chief of Staff at <a href="https://rsnc.ai" target="_blank" rel="noopener noreferrer">Resonance</a>,
              building emotional intelligence for humanoid agents. I research mechanistic
              interpretability at <a href="https://substrate-labs.org" target="_blank" rel="noopener noreferrer">Substrate Labs</a> —
              the geometric characterization of how large language models reason.
            </p>
            <p className="muted">
              I also run HTSI Global, back early-stage AI founders, and represent youth
              at the United Nations. Philosophy is the lens I bring to all of it.
            </p>
          </div>

          <div className="now reveal d1">
            <div className="now-title lbl">Currently</div>
            {NOW.map(x => <NowItem key={x.org} {...x} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
