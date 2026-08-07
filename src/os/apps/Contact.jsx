// Contact window — reads CONTACT and LINKS from content.js.
import { CONTACT, LINKS } from '../content.js';

const LINK_ITEMS = [
  { k: 'Email', href: `mailto:${LINKS.email}` },
  { k: 'LinkedIn', href: LINKS.linkedin },
  { k: 'Resonance', href: LINKS.resonance },
  { k: 'Research', href: LINKS.research },
];

export default function Contact() {
  return (
    <div className="app contact">
      <header className="contact-head">
        <h1>Contact</h1>
        <p className="contact-sub">Let&apos;s build something.</p>
      </header>

      <div className="contact-rows">
        {CONTACT.map((c) => (
          <a
            className="contact-row"
            key={c.k}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-k">{c.k}</span>
            <span className="contact-v">{c.v}</span>
            <span className="contact-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <nav className="contact-links">
        {LINK_ITEMS.map((l) => (
          <a
            className="contact-link"
            key={l.k}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.k}
          </a>
        ))}
      </nav>

      <footer className="contact-footer">
        © 2026 Ethan Yip · Builder · Researcher · Investor · New York
      </footer>
    </div>
  );
}
