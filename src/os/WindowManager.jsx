// ══════════════════════════════════════════════════════════════════
// WindowManager — React context + provider for the desktop window system.
//
// Window shape:
//   { id, appId, title, props, x, y, w, h, z, minimized, maximized }
//
// Consume via useWindows():
//   openWindow(appId, opts?)  opts = { id, title, props, size:{w,h} }
//   closeWindow(id) / focusWindow(id) / minimizeWindow(id)
//   toggleMaximize(id) / moveWindow(id,x,y) / resizeWindow(id,w,h)
// ══════════════════════════════════════════════════════════════════
import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { APP_MAP } from './apps.jsx';

const WindowContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows must be used within <WindowManager>');
  return ctx;
}

// Compute a cascaded/centered spawn position for a new window.
function spawnPosition(w, h, index) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const baseX = Math.max(24, (vw - w) / 2);
  const baseY = Math.max(48, (vh - h) / 2.4);
  const step = 28;
  const offset = (index % 6) * step;
  return {
    x: Math.min(baseX + offset, vw - w - 24),
    y: Math.min(baseY + offset, vh - h - 24),
  };
}

const LAYOUT = { MENUBAR_H: 28, TASKBAR_H: 0 };

// Absolute rect for a tile zone within the work area.
// eslint-disable-next-line react-refresh/only-export-components
export function zoneRect(zone) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = LAYOUT.MENUBAR_H;
  const h = vh - LAYOUT.MENUBAR_H - LAYOUT.TASKBAR_H;
  const halfW = Math.floor(vw / 2);
  const halfH = Math.floor(h / 2);
  switch (zone) {
    case 'full':  return { x: 0, y: top, w: vw, h };
    case 'left':  return { x: 0, y: top, w: halfW, h };
    case 'right': return { x: vw - halfW, y: top, w: halfW, h };
    case 'tl':    return { x: 0, y: top, w: halfW, h: halfH };
    case 'tr':    return { x: vw - halfW, y: top, w: halfW, h: halfH };
    case 'bl':    return { x: 0, y: top + halfH, w: halfW, h: halfH };
    case 'br':    return { x: vw - halfW, y: top + halfH, w: halfW, h: halfH };
    default:      return null;
  }
}

export function WindowManager({ children }) {
  const [windows, setWindows] = useState([]);
  const topZ = useRef(10);
  const spawnCount = useRef(0);

  const nextZ = useCallback(() => {
    topZ.current += 1;
    return topZ.current;
  }, []);

  const focusWindow = useCallback(
    (id) => {
      setWindows((ws) =>
        ws.map((win) =>
          win.id === id ? { ...win, z: nextZ(), minimized: false } : win
        )
      );
    },
    [nextZ]
  );

  const openWindow = useCallback(
    (appId, opts = {}) => {
      const id = opts.id || appId;
      // Singleton by id: if it already exists, focus it instead of duplicating.
      let exists = false;
      setWindows((ws) => {
        if (ws.some((w) => w.id === id)) {
          exists = true;
          return ws.map((w) =>
            w.id === id ? { ...w, z: nextZ(), minimized: false } : w
          );
        }
        const app = APP_MAP[appId] || {};
        const size = opts.size || app.size || { w: 640, h: 460 };
        const { x, y } = spawnPosition(size.w, size.h, spawnCount.current++);
        return [
          ...ws,
          {
            id,
            appId,
            title: opts.title || app.title || appId,
            props: opts.props || {},
            x,
            y,
            w: size.w,
            h: size.h,
            z: nextZ(),
            minimized: false,
            maximized: false,
          },
        ];
      });
      return { id, focused: exists };
    },
    [nextZ]
  );

  const closeWindow = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const toggleMaximize = useCallback(
    (id) => {
      setWindows((ws) =>
        ws.map((w) =>
          w.id === id ? { ...w, maximized: !w.maximized, z: nextZ() } : w
        )
      );
    },
    [nextZ]
  );

  const moveWindow = useCallback((id, x, y) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id, w, h) => {
    setWindows((ws) =>
      ws.map((win) => (win.id === id ? { ...win, w, h } : win))
    );
  }, []);

  // Snap a window to an absolute rect (used by drag-to-edge tiling).
  const setBounds = useCallback(
    (id, b) => {
      setWindows((ws) =>
        ws.map((w) =>
          w.id === id ? { ...w, ...b, maximized: false, z: nextZ() } : w
        )
      );
    },
    [nextZ]
  );

  // Snap a window to a tile zone (macOS-style drag-to-edge tiling).
  const applySnap = useCallback(
    (id, zone) => {
      const rect = zoneRect(zone);
      if (rect) setBounds(id, rect);
    },
    [setBounds]
  );

  const value = {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    setBounds,
    applySnap,
  };

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}
