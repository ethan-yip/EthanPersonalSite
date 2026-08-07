// ══════════════════════════════════════════════════════════════════
// AppIcon — icons that mirror real macOS apps (Terminal, Mail, Photos,
// Notes, Contacts, Books, an atom for research). Recognizable motifs,
// each in its own colorway.
// ══════════════════════════════════════════════════════════════════

const R = 23; // squircle corner radius

function Grad({ id, from, to }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

const gloss = <rect x="4" y="4" width="92" height="40" rx={R} fill="#ffffff" opacity="0.10" />;

export default function AppIcon({ id }) {
  switch (id) {
    case 'terminal':
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-terminal" from="#3b4358" to="#111520" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-terminal)" />
          {gloss}
          <circle cx="23" cy="22" r="3" fill="#f2758c" />
          <circle cx="34" cy="22" r="3" fill="#ffca6a" />
          <circle cx="45" cy="22" r="3" fill="#8fd08a" />
          <text x="22" y="72" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="32" fill="#d3dae8">&gt;_</text>
        </svg>
      );

    case 'contact': // Mail
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-contact" from="#5db0ff" to="#2f7ff0" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-contact)" />
          {gloss}
          <rect x="22" y="33" width="56" height="38" rx="7" fill="#fff" />
          <path d="M25 38 L50 57 L75 38" fill="none" stroke="#2f7ff0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'photos': // Photos pinwheel on white
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <rect x="4" y="4" width="92" height="92" rx={R} fill="#fdfdff" />
          <g transform="translate(50 50)" style={{ mixBlendMode: 'multiply' }}>
            {['#f5515f', '#ff8a3d', '#ffcf3d', '#8fd15a', '#3fc1c9', '#4d90ff', '#7a6ff0', '#f26fb2'].map((c, i) => (
              <ellipse key={i} cx="0" cy="-17" rx="9" ry="17" fill={c} opacity="0.9" transform={`rotate(${i * 45})`} />
            ))}
          </g>
        </svg>
      );

    case 'essays': // Notes
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><clipPath id="ic-essays-clip"><rect x="4" y="4" width="92" height="92" rx={R} /></clipPath></defs>
          <g clipPath="url(#ic-essays-clip)">
            <rect x="4" y="4" width="92" height="92" fill="#fcfcfe" />
            <rect x="4" y="4" width="92" height="30" fill="#ffd64a" />
            <rect x="22" y="47" width="56" height="4.5" rx="2.2" fill="#c9cdd6" />
            <rect x="22" y="58" width="56" height="4.5" rx="2.2" fill="#c9cdd6" />
            <rect x="22" y="69" width="38" height="4.5" rx="2.2" fill="#c9cdd6" />
          </g>
        </svg>
      );

    case 'whoami': // Contacts silhouette
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-whoami" from="#f6f2ea" to="#d9cfbd" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-whoami)" />
          <rect x="4" y="4" width="92" height="40" rx={R} fill="#ffffff" opacity="0.35" />
          <circle cx="50" cy="41" r="13" fill="#8f8676" />
          <path d="M28 80 a22 22 0 0 1 44 0 Z" fill="#8f8676" />
        </svg>
      );

    case 'about': // Books
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-about" from="#ffbe63" to="#ff8a3d" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-about)" />
          {gloss}
          <path d="M50 33 C42 28 31 28 25 31 L25 69 C31 66 42 66 50 71 Z" fill="#ffffff" />
          <path d="M50 33 C58 28 69 28 75 31 L75 69 C69 66 58 66 50 71 Z" fill="#eef1f7" />
          <rect x="49" y="33" width="2" height="38" fill="#e0863a" opacity="0.5" />
        </svg>
      );

    case 'research': // atom
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-research" from="#8ad673" to="#3fae55" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-research)" />
          {gloss}
          <g stroke="#fff" strokeWidth="3.2" fill="none" opacity="0.96">
            <ellipse cx="50" cy="50" rx="27" ry="11" />
            <ellipse cx="50" cy="50" rx="27" ry="11" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="27" ry="11" transform="rotate(120 50 50)" />
          </g>
          <circle cx="50" cy="50" r="6.5" fill="#fff" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className="ai-svg" aria-hidden="true">
          <defs><Grad id="ic-default" from="#6f9bf0" to="#3b5bdb" /></defs>
          <rect x="4" y="4" width="92" height="92" rx={R} fill="url(#ic-default)" />
          {gloss}
          <rect x="32" y="32" width="36" height="36" rx="8" fill="#fff" opacity="0.9" />
        </svg>
      );
  }
}
