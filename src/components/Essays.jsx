import { Link } from 'react-router-dom';

const ESSAYS = [
  {
    no: '01', title: 'Fault Lines', href: '/essays/faultlines',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ricciardo_Verstappen_Vettel_Spain_2016.jpg/960px-Ricciardo_Verstappen_Vettel_Spain_2016.jpg',
    desc: 'What Toto Wolff and Mercedes get structurally right about blame, accountability, and high-performance culture — and how SF gets it backwards.',
  },
  {
    no: '02', title: 'By Invitation Only', href: '/essays/byinvitationonly',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg/960px-San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg',
    desc: 'Why the most talent-dense teams — from Anthropic to the United Nations — are built the exact opposite of open, meritocratic hiring.',
  },
  {
    no: '03', title: 'The Ultimate Outside Insider', href: '/essays/ultimateoutsideinsider',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/James_Dyson_4.jpg/960px-James_Dyson_4.jpg',
    desc: 'Why every founder in SF starts to sound the same, and the discipline that protects the position worth holding.',
  },
];

export default function Essays() {
  return (
    <section id="essays" className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="sec-title">Essays</h2>
          <p className="sec-sub">The Hidden Curriculum of Leadership — part personal notes, part research.</p>
        </div>

        <div className="essay-grid">
          {ESSAYS.map((e, i) => (
            <Link key={e.href} to={e.href} viewTransition className={`essay-card reveal d${i}`}>
              <div className="essay-thumb">
                <img src={e.img} alt={e.title} loading="lazy" decoding="async" />
              </div>
              <div className="essay-body">
                <h3 className="essay-title">{e.title}</h3>
                <p className="essay-desc">{e.desc}</p>
                <span className="essay-cta">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
