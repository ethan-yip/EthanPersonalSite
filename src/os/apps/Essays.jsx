// Index of essays. Each row opens a dedicated essay window.
import { ESSAYS } from '../content.js';
import { useWindows } from '../WindowManager.jsx';

export default function Essays() {
  const { openWindow } = useWindows();

  const open = (essay) =>
    openWindow('essay', {
      id: `essay:${essay.slug}`,
      title: essay.title,
      props: { slug: essay.slug },
    });

  return (
    <div className="app">
      <h1>Essays</h1>
      <p className="muted">
        The Hidden Curriculum of Leadership — writing on culture, talent, and building.
      </p>
      <div style={{ marginTop: 18 }}>
        {ESSAYS.map((e) => (
          <button key={e.slug} className="app-item" onClick={() => open(e)}>
            <div>
              <span className="item-no">{e.no}</span>
              <span className="item-title">{e.title}</span>
              {e.date && (
                <span className="muted" style={{ marginLeft: 10, fontSize: 12 }}>
                  {e.date}
                </span>
              )}
            </div>
            <div className="item-desc">{e.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
