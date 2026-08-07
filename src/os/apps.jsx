// ══════════════════════════════════════════════════════════════════
// App registry. Each entry:
//   { id, title, icon, Component, size:{w,h}, desktop, dock }
// `essay` is a non-desktop dynamic app used for individual essay windows.
// ══════════════════════════════════════════════════════════════════
import Terminal from './apps/Terminal.jsx';
import Whoami from './apps/Whoami.jsx';
import About from './apps/About.jsx';
import Essays from './apps/Essays.jsx';
import Essay from './apps/Essay.jsx';
import Research from './apps/Research.jsx';
import Contact from './apps/Contact.jsx';
import Photos from './apps/Photos.jsx';

export const APPS = [
  { id: 'terminal', title: 'Terminal',  icon: '📟', Component: Terminal, size: { w: 1000, h: 560 }, desktop: true, dock: true },
  { id: 'whoami',   title: 'whoami',    icon: '◈',  Component: Whoami,   size: { w: 900, h: 640 }, desktop: true, dock: true },
  { id: 'about',    title: 'About',     icon: '▤',  Component: About,    size: { w: 900, h: 560 }, desktop: true, dock: true },
  { id: 'essays',   title: 'Essays',    icon: '✎',  Component: Essays,   size: { w: 820, h: 540 }, desktop: true, dock: true },
  { id: 'research', title: 'Research',  icon: '⚗',  Component: Research, size: { w: 960, h: 640 }, desktop: true, dock: true },
  { id: 'contact',  title: 'Contact',   icon: '✉',  Component: Contact,  size: { w: 800, h: 470 }, desktop: true, dock: true },
  { id: 'photos',   title: 'Photos',    icon: '▦',  Component: Photos,   size: { w: 980, h: 640 }, desktop: true, dock: true },
  // Dynamic per-essay windows (opened with a unique id like essay:faultlines).
  { id: 'essay',    title: 'Essay',     icon: '✎',  Component: Essay,    size: { w: 940, h: 660 }, desktop: false, dock: false },
];

export const APP_MAP = Object.fromEntries(APPS.map((a) => [a.id, a]));
