// ══════════════════════════════════════════════════════════════════
// Terminal — a small terminal emulator app.
// Typing is captured by an offscreen input; Enter runs commands,
// Up/Down walk history, Tab autocompletes command names.
// Output is a list of styled DOM "lines" (arrays of colored segments).
// ══════════════════════════════════════════════════════════════════
import { useState, useRef, useEffect, useCallback } from 'react';
import { useShell } from '../shell.js';
import { APPS } from '../apps.jsx';
import { PORTRAIT_LINES, NAME_BANNER } from '../portrait.js';
import { META, LINKS, ESSAYS, STATEMENT } from '../content.js';
import './Terminal.css';

// A "line" is an array of segments: { t: text, c: className }.
const seg = (t, c) => ({ t, c: c || '' });
const line = (...segs) => segs;
const text = (t, c) => [seg(t, c)];
const blank = () => '__spacer__';

// Accent colors the `theme` command cycles through.
const ACCENTS = ['blue', 'cyan', 'purple', 'pink', 'green', 'gold'];

// neofetch-style hero (arch `neofetch`/`screenfetch` style): ASCII portrait
// on the LEFT, ASCII name banner + info on the RIGHT. Rendered as one special
// "line" ('__hero__') so it can seed the initial scrollback and be reprinted
// by the `neofetch` command.
function NeofetchHero() {
  return (
    <div className="nf">
      <pre className="nf-portrait" aria-hidden="true">{PORTRAIT_LINES.join('\n')}</pre>
      <div className="nf-right">
        <pre className="nf-banner">{NAME_BANNER.replace(/^\n/, '')}</pre>
        <div className="nf-id">
          <span className="t-cyan t-bold">{META.name}</span>
          <span className="t-dim">{'  —  ' + META.tagline}</span>
        </div>
        <div className="nf-role t-dim">{META.role}</div>
        <dl className="nf-kv">
          <dt>OS</dt><dd>yip-os v2.0</dd>
          <dt>host</dt><dd>ethan@yip-os</dd>
          <dt>location</dt><dd>{META.location}</dd>
          <dt>focus</dt><dd>{META.focus}</dd>
        </dl>

        <div className="nf-cmds">
          <div className="nf-cmds-label">commands</div>
          <div className="nf-cmds-grid">
            {[
              ['about', 'bio & what I do'],
              ['essays', 'writing'],
              ['research', 'papers'],
              ['contact', 'reach me'],
              ['photos', 'gallery'],
              ['whoami', 'identity'],
              ['theme', 'accent color'],
              ['classic', 'the old site'],
              ['help', 'all commands'],
            ].map(([c, d]) => (
              <span className="nf-cmd" key={c}>
                <span className="c">{c}</span>
                <span className="d">{d}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="nf-hint">
          <span className="t-dim">type a command above, or click an icon in the Dock</span>
        </div>
      </div>
    </div>
  );
}

// bannerLines returns the hero sentinel; renderLine turns it into <NeofetchHero/>.
function bannerLines() {
  return ['__hero__'];
}

// The initial scrollback: just the hero (hint lives inside it).
function initialLines() {
  return [...bannerLines(), blank()];
}

export default function Terminal() {
  const { open } = useShell();
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [focused, setFocused] = useState(true);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const print = useCallback((...newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  // auto-scroll to bottom on new output
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  // ── command registry ───────────────────────────────────────────
  const openApp = useCallback(
    (appId, opts) => open(appId, opts),
    [open]
  );

  const commands = {
    help: () => {
      const rows = [
        ['help', 'show this list'],
        ['whoami', 'identity + open the whoami window'],
        ['about', 'bio & what I do now'],
        ['essays', 'list essays · open essay <n> · essays <slug>'],
        ['research', 'papers & interpretability work'],
        ['contact', 'ways to reach me'],
        ['photos', 'photo gallery'],
        ['links', 'email / linkedin / resonance'],
        ['ls', 'list openable apps'],
        ['open <app>', 'open an app window'],
        ['neofetch', 'system info + portrait'],
        ['theme', 'cycle accent color'],
        ['classic', 'open the classic (old) site'],
        ['date', 'current date/time'],
        ['echo <text>', 'print text'],
        ['clear', 'clear the screen'],
      ];
      const out = [text('available commands', 't-purple t-bold'), blank()];
      rows.forEach(([c, d]) =>
        out.push(line(seg('  ' + c.padEnd(13), 't-cyan'), seg(d, 't-dim')))
      );
      return out;
    },

    whoami: () => {
      openApp('whoami');
      return [
        line(seg(META.name, 't-cyan t-bold')),
        text(META.tagline, 't-dim'),
        text('→ opened whoami', 't-green'),
      ];
    },

    about: () => {
      openApp('about');
      return [text('→ opened about', 't-green')];
    },

    research: () => {
      openApp('research');
      return [text('→ opened research', 't-green')];
    },

    contact: () => {
      openApp('contact');
      return [text('→ opened contact', 't-green')];
    },

    photos: () => {
      openApp('photos');
      return [text('→ opened photos', 't-green')];
    },

    essays: (args) => {
      // `essays <slug>` or `essays <n>` opens directly; bare prints the list.
      if (args[0]) return openEssayArg(args);
      openApp('essays');
      const out = [text('essays', 't-purple t-bold'), blank()];
      ESSAYS.forEach((e) =>
        out.push(
          line(
            seg('  ' + e.no + '  ', 't-dim'),
            seg(e.title, 't-cyan'),
            seg('  (' + e.slug + ')', 't-dim')
          )
        )
      );
      out.push(blank());
      out.push(text("open one with: open essay <n>   e.g. 'open essay 1'", 't-dim'));
      return out;
    },

    open: (args) => {
      if (!args.length) return [text('usage: open <app>   (try: ls)', 't-yellow')];
      // support: open essay <n|slug>
      if (args[0] === 'essay') return openEssayArg(args.slice(1));
      const target = args[0].toLowerCase();
      const app = APPS.find((a) => a.id === target && a.desktop);
      if (!app) return [text(`no such app: ${target}. try 'ls'`, 't-red')];
      openApp(app.id);
      return [text(`→ opened ${app.id}`, 't-green')];
    },

    ls: () => {
      const out = [text('openable apps', 't-purple t-bold'), blank()];
      APPS.filter((a) => a.desktop).forEach((a) =>
        out.push(line(seg('  ' + a.icon + '  ', ''), seg(a.id, 't-cyan')))
      );
      return out;
    },

    links: () => printLinks(),
    social: () => printLinks(),

    clear: () => {
      setLines([]);
      return null;
    },

    classic: () => {
      setTimeout(() => { window.location.href = '/classic'; }, 250);
      return [text('→ launching classic site…', 't-green')];
    },

    date: () => [text(new Date().toString(), 't-teal')],

    echo: (args) => [text(args.join(' '), '')],

    theme: () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-accent') || 'cyan';
      const next = ACCENTS[(ACCENTS.indexOf(current) + 1) % ACCENTS.length];
      root.setAttribute('data-accent', next);
      return [line(seg('accent → ', 't-dim'), seg(next, 't-accent t-bold'))];
    },

    sudo: () => [
      line(seg('sudo: ', 't-dim'), seg('permission denied', 't-red')),
      text("nice try. you're not root here. 🙂", 't-dim'),
    ],

    neofetch: () => bannerLines(),
  };

  // Helper: open an essay by index (1-based) or slug.
  function openEssayArg(args) {
    if (!args.length) return [text('usage: open essay <n|slug>', 't-yellow')];
    const key = String(args[0]).toLowerCase();
    let essay = ESSAYS.find((e) => e.slug === key);
    if (!essay) {
      const n = parseInt(key, 10);
      if (!Number.isNaN(n)) essay = ESSAYS[n - 1];
    }
    if (!essay) return [text(`no such essay: ${key}. try 'essays'`, 't-red')];
    openApp('essay', {
      id: `essay:${essay.slug}`,
      title: essay.title,
      props: { slug: essay.slug },
    });
    return [text(`→ opened "${essay.title}"`, 't-green')];
  }

  function printLinks() {
    return [
      text('links', 't-purple t-bold'),
      blank(),
      line(seg('  email     ', 't-accent'), { t: LINKS.email, c: 'link', href: `mailto:${LINKS.email}` }),
      line(seg('  linkedin  ', 't-accent'), { t: LINKS.linkedin, c: 'link', href: LINKS.linkedin }),
      line(seg('  resonance ', 't-accent'), { t: LINKS.resonance, c: 'link', href: LINKS.resonance }),
      line(seg('  research  ', 't-accent'), { t: LINKS.research, c: 'link', href: LINKS.research }),
      blank(),
      line(seg('“' + STATEMENT.quote + '”', 't-dim')),
      line(seg('  — ' + STATEMENT.attribution, 't-dim')),
    ];
  }

  // ── run a command string ───────────────────────────────────────
  const run = (raw) => {
    const cmd = raw.trim();
    // echo the prompt + entered command into the scrollback
    print([
      seg('ethan', 'term-user'),
      seg('@', 'term-at'),
      seg('yip-os', 'term-host'),
      seg(':', 'term-sep'),
      seg('~', 'term-path'),
      seg('$ ', 'term-sep'),
      seg(cmd, ''),
    ]);

    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIndex(-1);

    const [name, ...args] = cmd.split(/\s+/);
    const handler = commands[name.toLowerCase()];
    if (!handler) {
      print(line(seg('command not found: ', 't-red'), seg(name, 't-red t-bold'), seg("  try 'help'", 't-dim')));
      return;
    }
    const result = handler(args);
    if (result) print(...result, blank());
  };

  // ── keyboard handling ──────────────────────────────────────────
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= history.length) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const names = Object.keys(commands);
      const matches = names.filter((n) => n.startsWith(input.trim()));
      if (matches.length === 1) setInput(matches[0] + ' ');
      else if (matches.length > 1) {
        print(line(...matches.map((m) => seg(m + '  ', 't-cyan'))));
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  // render one output line
  const renderLine = (l, i) => {
    if (l === '__spacer__') return <div className="term-line spacer" key={i} />;
    if (l === '__hero__') return <NeofetchHero key={i} />;
    // <pre> banner segments
    if (Array.isArray(l) && l.length === 1 && l[0].pre) {
      return (
        <pre className="t-banner" key={i}>
          {l[0].t}
        </pre>
      );
    }
    return (
      <div className="term-line" key={i}>
        {l.map((s, j) =>
          s.href ? (
            <a className="term-a" key={j} href={s.href} target="_blank" rel="noreferrer">
              {s.t}
            </a>
          ) : (
            <span className={s.c} key={j}>
              {s.t}
            </span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="term term-glow" onClick={focusInput}>
      <div className="term-scroll" ref={scrollRef}>
        {lines.map(renderLine)}
      </div>

      <div className="term-inputline">
        <span className="term-prompt">
          <span className="term-user">ethan</span>
          <span className="term-at">@</span>
          <span className="term-host">yip-os</span>
          <span className="term-sep">:</span>
          <span className="term-path">~</span>
          <span className="term-sep">$ </span>
        </span>
        <span className="term-inputwrap">
          <span className="term-typed">{input}</span>
          <span className={`term-cursor${focused ? '' : ' hidden'}`} />
          <input
            ref={inputRef}
            className="term-hidden-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
            spellCheck="false"
            autoComplete="off"
            aria-label="terminal input"
          />
        </span>
      </div>
    </div>
  );
}
