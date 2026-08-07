// STUB — enriched later by the ascii agent (portrait) but functional now.
import { PORTRAIT_LINES, NAME_BANNER } from '../portrait.js';
import { META, LINKS } from '../content.js';

export default function Whoami() {
  return (
    <div className="app">
      <div className="neofetch">
        <pre aria-hidden="true">{PORTRAIT_LINES.join('\n')}</pre>
        <div className="info">
          <pre className="banner">{NAME_BANNER}</pre>
          <p className="tagline">{META.tagline}</p>
          <dl className="kv">
            <dt>name</dt><dd>{META.name}</dd>
            <dt>role</dt><dd>{META.role}</dd>
            <dt>location</dt><dd>{META.location}</dd>
            <dt>focus</dt><dd>{META.focus}</dd>
            <dt>email</dt>
            <dd><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></dd>
            <dt>linkedin</dt>
            <dd><a href={LINKS.linkedin} target="_blank" rel="noreferrer">/in/yip-ethan</a></dd>
            <dt>resonance</dt>
            <dd><a href={LINKS.resonance} target="_blank" rel="noreferrer">rsnc.ai</a></dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
