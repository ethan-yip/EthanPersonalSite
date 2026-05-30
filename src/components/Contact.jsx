import { useEffect, useRef } from 'react';

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="contact" ref={ref}>
      <h2 className="contact-heading reveal">
        Building something <em>ambitious?</em>
      </h2>
      <p className="contact-sub reveal">
        Founder, investor, researcher, or someone with a weird idea — I want to hear from you.
      </p>

      <div className="contact-links">
        <a href="mailto:ethanyip28@gmail.com" className="contact-link reveal reveal-d1">
          <div>
            <div className="contact-link-label">Email</div>
            <div className="contact-link-value">ethanyip28@gmail.com</div>
          </div>
          <span className="contact-link-arrow">↗</span>
        </a>
        <a
          href="https://www.linkedin.com/in/yip-ethan"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link reveal reveal-d2"
        >
          <div>
            <div className="contact-link-label">LinkedIn</div>
            <div className="contact-link-value">linkedin.com/in/yip-ethan</div>
          </div>
          <span className="contact-link-arrow">↗</span>
        </a>
      </div>

      <footer className="footer">
        <span className="footer-mono">EY</span>
        <span className="footer-copy">© 2026 Ethan Yip</span>
      </footer>
    </section>
  );
}
