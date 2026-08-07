// About — a macOS-style "about" panel rendered inside a Window.
import { BIO, NOW, STATEMENT, META } from '../content.js';
import './About.css';

// Phrases in the bio that should link to a home page, keyed by URL.
const PHRASE_LINKS = [
  { phrase: 'Resonance', href: 'https://rsnc.ai' },
  { phrase: 'Substrate Labs', href: 'https://substrate-labs.org' },
];

const URL_RE = /(https?:\/\/[^\s)]+)/g;

function Anchor({ href, children }) {
  return (
    <a className="about-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Turn bare URLs and known phrases into anchors while keeping the rest as text.
function renderBio(text, key) {
  // First split on URLs, keeping the URL tokens.
  const urlParts = text.split(URL_RE);
  const nodes = [];

  urlParts.forEach((part, i) => {
    if (URL_RE.test(part)) {
      // reset lastIndex because URL_RE is global
      URL_RE.lastIndex = 0;
      nodes.push(
        <Anchor key={`${key}-u${i}`} href={part}>
          {part.replace(/^https?:\/\//, '')}
        </Anchor>,
      );
      return;
    }
    URL_RE.lastIndex = 0;
    nodes.push(...linkifyPhrases(part, `${key}-t${i}`));
  });

  return nodes;
}

// Link the first occurrence of each known phrase inside a plain text run.
function linkifyPhrases(text, key) {
  const phraseRe = new RegExp(
    `(${PHRASE_LINKS.map((p) => p.phrase).join('|')})`,
    'g',
  );
  const parts = text.split(phraseRe);
  return parts.map((part, i) => {
    const match = PHRASE_LINKS.find((p) => p.phrase === part);
    if (match) {
      return (
        <Anchor key={`${key}-p${i}`} href={match.href}>
          {part}
        </Anchor>
      );
    }
    return part;
  });
}

export default function About() {
  return (
    <div className="app about">
      <header className="about-head">
        <h1>{META.name}</h1>
        <p className="about-role">{META.role}</p>
        <p className="about-meta">
          <span>{META.location}</span>
          <span>{META.focus}</span>
        </p>
      </header>

      <div className="about-grid">
       <div className="about-col">
        <div className="about-bio">
          {BIO.map((para, i) => (
            <p key={i}>{renderBio(para, `bio${i}`)}</p>
          ))}
        </div>

        <figure className="about-quote">
          <blockquote>{STATEMENT.quote}</blockquote>
          <figcaption>{STATEMENT.attribution}</figcaption>
        </figure>
       </div>

       <div className="about-col">
        <p className="about-label">Currently</p>
        <div className="about-now">
        {NOW.map((n, i) => {
          const inner = (
            <>
              <span className="about-now-main">
                <span className="about-now-org">{n.org}</span>
                <span className="about-now-what">{n.what}</span>
              </span>
              <span className="about-now-side">
                <span className="about-now-when">{n.when}</span>
                {n.href && <span className="about-now-chevron">›</span>}
              </span>
            </>
          );
          return n.href ? (
            <a
              className="about-now-row"
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              {inner}
            </a>
          ) : (
            <div className="about-now-row" key={i}>
              {inner}
            </div>
          );
        })}
        </div>
       </div>
      </div>
    </div>
  );
}
