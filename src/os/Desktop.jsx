// ══════════════════════════════════════════════════════════════════
// Desktop — a macOS-style shell.
// Wallpaper + a mac-style boot, a top menubar, floating windows
// (draggable / resizable / closable, with drag-to-edge tiling), and a
// bottom Dock of app icons. The Terminal is one of the apps.
// ══════════════════════════════════════════════════════════════════
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { WindowManager, useWindows } from './WindowManager.jsx';
import { ShellContext } from './shell.js';
import Window from './Window.jsx';
import Wallpaper from './Wallpaper.jsx';
import AppIcon from './AppIcon.jsx';
import { APPS, APP_MAP } from './apps.jsx';
import './theme.css';
import './apps/app.css';
import './Desktop.css';

const DOCK_APPS = APPS.filter((a) => a.desktop);
const TERM_SIZE = { w: 1000, h: 560 };
const MENUS = ['File', 'Edit', 'View', 'Window', 'Help'];

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const d = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  return <span className="menubar-clock">{d}  {t}</span>;
}

function Shell() {
  const { windows, openWindow, focusWindow } = useWindows();

  const shell = useMemo(() => ({ open: (id, opts) => openWindow(id, opts) }), [openWindow]);

  // Open the Terminal immediately on load.
  useEffect(() => {
    openWindow('terminal', { size: TERM_SIZE });
  }, [openWindow]);

  const isOpen = (id) => windows.some((w) => w.appId === id || w.id === id);
  const openApp = (id) => {
    const existing = windows.find((w) => w.appId === id || w.id === id);
    if (existing) focusWindow(existing.id);
    else openWindow(id, id === 'terminal' ? { size: TERM_SIZE } : undefined);
  };

  const focused = windows
    .filter((w) => !w.minimized)
    .sort((a, b) => a.z - b.z)
    .at(-1);
  const appName = focused ? focused.title : 'Finder';

  return (
    <ShellContext.Provider value={shell}>
      <div className="desktop">
        <Wallpaper />

        {/* menubar */}
        <div className="menubar">
          <span className="menubar-logo">◈</span>
          <span className="menubar-app">{appName}</span>
          <nav className="menubar-menus">
            {MENUS.map((m) => (
              <span key={m} className="menubar-menu">{m}</span>
            ))}
          </nav>
          <span className="menubar-spacer" />
          <Clock />
        </div>

        {/* windows */}
        <AnimatePresence>
          {windows.map((win) => {
            const app = APP_MAP[win.appId];
            if (!app) return null;
            const Comp = app.Component;
            return (
              <Window key={win.id} win={win}>
                <Comp {...win.props} />
              </Window>
            );
          })}
        </AnimatePresence>

        {/* dock */}
        <div className="dock">
          <div className="dock-inner">
            {DOCK_APPS.map((a) => (
              <button
                key={a.id}
                className={`dock-item${isOpen(a.id) ? ' running' : ''}`}
                onClick={() => openApp(a.id)}
                aria-label={a.id}
              >
                <span className="dock-tip">{a.title}</span>
                <span className="dock-icon"><AppIcon id={a.id} /></span>
                <span className="dock-dot" />
              </button>
            ))}
          </div>
        </div>

        <div className="os-scanlines" />
      </div>
    </ShellContext.Provider>
  );
}

export default function Desktop() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-os', '');
    if (!root.getAttribute('data-accent')) root.setAttribute('data-accent', 'blue');
    return () => root.removeAttribute('data-os');
  }, []);

  return (
    <WindowManager>
      <Shell />
    </WindowManager>
  );
}
