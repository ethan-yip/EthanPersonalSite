import { useEffect, useRef, useState } from 'react';

const SERIES = [
  {
    name: 'The Hidden Curriculum of Leadership',
    author: 'Ethan Yip',
    essays: [
      { num: '0', title: 'Access Isn\'t Enough' },
      { num: '1', title: '—' },
      { num: '2', title: '—' },
    ],
  },
];

function SeriesRow({ series }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className="series-block">
      <button
        className="series-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="series-name">{series.name}</span>
        <span className="series-toggle" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>

      <div
        ref={bodyRef}
        className="series-body"
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <div className="series-meta">Authored by {series.author}</div>
        {series.essays.map((e, i) => (
          <div key={i} className="essay-row">
            <span className="essay-num">Essay {e.num}</span>
            <span
              className="essay-title"
              style={{ opacity: e.title === '—' ? 0.28 : 1 }}
            >
              {e.title === '—' ? e.title : <strong>{e.title}</strong>}
            </span>
            <span className="essay-badge">Draft</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Essays() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="essays" className="essays" ref={ref}>
      <div className="essays-top reveal">
        <h2 className="essays-heading">Essays</h2>
      </div>

      <div className="reveal reveal-d1">
        {SERIES.map((s, i) => <SeriesRow key={i} series={s} />)}
      </div>

      <div className="essays-footer reveal reveal-d2">
        <span className="essays-footer-note">Get notified when they publish.</span>
        <a href="mailto:ethanyip28@gmail.com?subject=Essay Updates" className="essays-notify">
          Notify me →
        </a>
      </div>
    </section>
  );
}
