// Renders a single long-form essay inside a window. Reads structured block
// arrays from content.js (ESSAYS[].body) and maps each block to typography.
import { ESSAYS } from '../content.js';
import './Essay.css';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="essay-h2">
          {block.marker && <span className="essay-h2-marker">{block.marker}</span>}
          <span className="essay-h2-text">{block.text}</span>
        </h2>
      );
    case 'p':
      return (
        <p className="essay-para" dangerouslySetInnerHTML={{ __html: block.html }} />
      );
    case 'pull':
      return <blockquote className="essay-pull">{block.text}</blockquote>;
    case 'callout':
      return (
        <div className="essay-callout">
          <span className="essay-callout-rule" aria-hidden="true" />
          <div
            className="essay-callout-text"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </div>
      );
    case 'img':
      return (
        <figure className="essay-figure">
          <img src={block.src} alt={block.alt || block.caption || ''} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'hr':
      return <hr className="essay-hr" />;
    default:
      return null;
  }
}

export default function Essay({ slug }) {
  const essay = ESSAYS.find((e) => e.slug === slug);

  if (!essay) {
    return (
      <div className="app">
        <p className="muted">essay not found: {String(slug)}</p>
      </div>
    );
  }

  const blocks = Array.isArray(essay.body) ? essay.body : [];

  return (
    <div className="app essay-app">
      <article className="essay-doc">
        <header className="essay-head">
          {essay.eyebrow && <div className="essay-eyebrow">{essay.eyebrow}</div>}
          <h1 className="essay-title">{essay.title}</h1>
          <div className="essay-byline">
            <span>Ethan Yip</span>
            {essay.date && (
              <>
                <span className="essay-byline-dot" aria-hidden="true" />
                <span>{essay.date}</span>
              </>
            )}
          </div>
        </header>

        {blocks
          .filter((block) => block.type !== 'eyebrow')
          .map((block, i) => (
            <Block key={i} block={block} />
          ))}

        {essay.sources?.length > 0 && (
          <section className="essay-sources">
            <div className="essay-sources-label">Sources</div>
            <ul className="essay-sources-list">
              {essay.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <span className="essay-source-label">{s.label}</span>
                    <span className="essay-source-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
