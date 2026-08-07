// Research window — reads PAPERS from content.js.
import { PAPERS } from '../content.js';

export default function Research() {
  return (
    <div className="app research">
      <header className="research-head">
        <h1>Research</h1>
        <p className="research-sub">
          Interpretability and the geometry of reasoning in large language models.
        </p>
      </header>

      <ol className="paper-list">
        {PAPERS.map((p) => (
          <li className="paper" key={p.no}>
            <div className="paper-byline">
              <span className="paper-year">{p.year}</span>
              <span className="paper-dash"> — </span>
              <span className="paper-role">{p.role}</span>
            </div>
            <h2 className="paper-title">{p.title}</h2>
            <p className="paper-desc">{p.desc}</p>
            <ul className="paper-tags">
              {p.tags.map((t) => (
                <li className="paper-chip" key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
