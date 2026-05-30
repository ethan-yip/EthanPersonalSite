import { useEffect, useRef } from 'react';

const ROLES = [
  {
    company: 'HTSI Global',
    role: 'Founder & Global Director',
    date: 'Aug 2025 – Present',
    bullets: [
      '8% acceptance rate competitive startup program across 4 continents',
      '20+ investor partners including UNESCO, Learning Planet Institute, UN University',
      'Financing and mentoring cohort teams; partnership support to 75+ additional teams',
    ],
  },
  {
    company: 'LvlUp Ventures',
    role: 'Venture Capitalist in Residence',
    date: 'Dec 2025 – Present',
    bullets: [
      'Sourcing and due diligence on early-stage AI/Infrastructure deals',
      '$250M+ AUM fund — focused on pre-seed and seed stage',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Incoming ML Engineer Intern',
    date: 'Summer 2026',
    bullets: [
      'Incoming machine learning engineering internship',
    ],
    incoming: true,
  },
  {
    company: 'United Nations ECOSOC',
    role: 'Youth Delegate — Youth Forum 2026',
    date: 'Mar 2026',
    bullets: [
      'Represented youth perspectives on "Innovate, Unite and Transform: Youth Shaping the Road to 2030"',
      'Engaged policymakers on AI and technology for economic and social advancement',
    ],
  },
  {
    company: 'Celestify',
    role: 'Co-Founder',
    date: 'Nov 2025 – Feb 2026',
    bullets: [
      'Unified execution layer for founders — reduces cognitive overhead across distributed workflows',
      'Led fundraising, product distribution, and team building in SF Bay Area',
    ],
  },
  {
    company: 'Constellation Technologies',
    role: 'Co-Founder — Nova Accelerator & Star Hack League',
    date: 'Jun 2023 – Present',
    bullets: [
      'Portfolio teams raised $130K+; community of student founders, mentors, and investors',
      'Built international hackathon rating algorithm (Python + Firebase)',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="container">
        <div className="section-wrap">
          <span className="section-bg-num">02</span>

          <div className="section-label reveal">
            <span className="section-num">02</span>
            <span className="section-rule" />
            Experience
          </div>

          <div className="timeline">
            {ROLES.map((r, i) => (
              <div key={i} className={`timeline-item reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="timeline-dot" style={r.incoming ? { borderColor: 'var(--muted)', background: 'transparent' } : {}} />
                <div className="timeline-header">
                  <span className="timeline-company">
                    {r.company}
                    {r.incoming && (
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-b)', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginLeft: 12 }}>
                        Incoming
                      </span>
                    )}
                  </span>
                  <span className="timeline-date">{r.date}</span>
                </div>
                <div className="timeline-role">{r.role}</div>
                <ul className="timeline-desc">
                  {r.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
