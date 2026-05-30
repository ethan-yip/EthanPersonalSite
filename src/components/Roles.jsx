import { useEffect, useRef } from 'react';

const ROLES = [
  {
    org: 'HTSI Global',
    title: 'Founder & Director',
    badge: 'Active',
    badgeType: 'active',
    points: [
      '8% acceptance rate — competitive global program',
      '20+ investor partners: UNESCO, Learning Planet, UN University',
      'Teams across Asia, Africa, LATAM & North America',
    ],
    note: 'Aligned with UN SDG 4 & 9 · htstartup.org',
  },
  {
    org: 'LvlUp Ventures',
    title: 'VC in Residence',
    badge: 'Active',
    badgeType: 'active',
    points: [
      '$250M+ AUM — early-stage AI & infrastructure',
      'Sourcing deals and leading due diligence',
      'SF Bay Area, Remote',
    ],
    note: 'Pre-seed & seed stage focus',
  },
  {
    org: 'United Nations',
    title: 'Youth Delegate — ECOSOC Forum',
    badge: '2026',
    badgeType: '',
    points: [
      'UN Economic & Social Council Youth Forum, NYC',
      'Represented youth on technology & innovation',
      '"Innovate, Unite and Transform: Youth Shaping 2030"',
    ],
    note: 'Nominated by UNESCO, UN University, Learning Planet',
  },
  {
    org: 'Amazon Web Services',
    title: 'ML Engineer Intern',
    badge: 'Incoming',
    badgeType: 'incoming',
    points: [
      'Machine learning engineering',
      'Summer 2026',
    ],
    note: '',
  },
];

export default function Roles() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="roles-section" ref={sectionRef}>
      <div className="roles-header">
        <span className="roles-header-label">Current Roles</span>
        <span className="roles-header-rule" />
        <span className="roles-header-count">4 positions</span>
      </div>

      <div className="roles-grid">
        {ROLES.map((r, i) => (
          <div key={i} className={`role-card reveal reveal-delay-${i % 2}`}>
            <div className="role-card-top">
              <span className="role-org">{r.org}</span>
              {r.badge && (
                <span className={`role-badge ${r.badgeType}`}>{r.badge}</span>
              )}
            </div>
            <div className="role-title">{r.title}</div>
            <ul className="role-points">
              {r.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
            {r.note && <div className="role-note">{r.note}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
