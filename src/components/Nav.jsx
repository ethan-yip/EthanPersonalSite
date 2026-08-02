const Sun = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const Moon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Nav({ theme, onToggleTheme }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#home" className="nav-brand">Ethan Yip</a>
        <div className="nav-links">
          <a href="#about" className="nav-link hide-sm">About</a>
          <a href="#essays" className="nav-link hide-sm">Essays</a>
          <a href="#research" className="nav-link hide-sm">Research</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
    </nav>
  );
}
