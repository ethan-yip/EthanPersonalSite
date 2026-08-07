// ══════════════════════════════════════════════════════════════════
// Window — draggable / resizable window chrome with snap-to-tile.
// Dragging + resizing use raw pointer events (no external lib). Dragging
// the title bar near a screen edge/corner previews a tile zone; releasing
// there snaps the window to that half/quarter (macOS/tmux-style).
// ══════════════════════════════════════════════════════════════════
import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useWindows, zoneRect } from './WindowManager.jsx';
import './Window.css';

const MENUBAR_H = 28;
const TASKBAR_H = 0;
const MIN_W = 280;
const MIN_H = 160;
const EDGE = 46;   // px from an edge to trigger a half snap
const CORNER = 120; // px box in a corner to trigger a quarter snap

// Which tile zone (if any) does a pointer at (x,y) fall into?
function detectZone(x, y) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const top = MENUBAR_H;
  const bottom = vh - TASKBAR_H;
  const nearTop = y <= top + CORNER;
  const nearBot = y >= bottom - CORNER;
  const cx = x <= CORNER ? 'l' : x >= vw - CORNER ? 'r' : null;
  if (cx && nearTop) return cx === 'l' ? 'tl' : 'tr';
  if (cx && nearBot) return cx === 'l' ? 'bl' : 'br';
  if (y <= top + EDGE) return 'full';
  if (x <= EDGE) return 'left';
  if (x >= vw - EDGE) return 'right';
  return null;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 760 : false
  );
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= 760);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return mobile;
}

export default function Window({ win, children }) {
  const {
    focusWindow, closeWindow, minimizeWindow, toggleMaximize,
    moveWindow, resizeWindow, applySnap,
  } = useWindows();
  const isMobile = useIsMobile();

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [snapZone, setSnapZone] = useState(null);
  const drag = useRef(null);
  const [live, setLive] = useState(null);

  // ── dragging by the title bar ──────────────────────────────────
  const onTitlePointerDown = (e) => {
    if (isMobile || win.maximized) return;
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    focusWindow(win.id);
    drag.current = { startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };
    setDragging(true);
    setLive({ x: win.x, y: win.y });
  };
  const onTitlePointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    const nx = Math.max(0, drag.current.origX + dx);
    const ny = Math.max(MENUBAR_H, drag.current.origY + dy);
    setLive({ x: nx, y: ny });
    setSnapZone(detectZone(e.clientX, e.clientY));
  };
  const onTitlePointerUp = (e) => {
    if (!drag.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (snapZone) applySnap(win.id, snapZone);
    else if (live) moveWindow(win.id, live.x, live.y);
    drag.current = null;
    setDragging(false);
    setSnapZone(null);
    setLive(null);
  };

  // ── resizing from the bottom-right handle ──────────────────────
  const onResizePointerDown = (e) => {
    if (isMobile || win.maximized) return;
    if (e.button !== 0) return;
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    focusWindow(win.id);
    drag.current = { startX: e.clientX, startY: e.clientY, origW: win.w, origH: win.h };
    setResizing(true);
    setLive({ w: win.w, h: win.h });
  };
  const onResizePointerMove = (e) => {
    if (!drag.current) return;
    const dw = e.clientX - drag.current.startX;
    const dh = e.clientY - drag.current.startY;
    setLive({
      w: Math.max(MIN_W, drag.current.origW + dw),
      h: Math.max(MIN_H, drag.current.origH + dh),
    });
  };
  const onResizePointerUp = (e) => {
    if (!drag.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (live) resizeWindow(win.id, live.w, live.h);
    drag.current = null;
    setResizing(false);
    setLive(null);
  };

  if (win.minimized) return null;

  let style;
  if (win.maximized && !isMobile) {
    style = { left: 0, top: MENUBAR_H, width: '100vw', height: `calc(100vh - ${MENUBAR_H + TASKBAR_H}px)`, zIndex: win.z };
  } else {
    const x = dragging && live ? live.x : win.x;
    const y = dragging && live ? live.y : win.y;
    const w = resizing && live ? live.w : win.w;
    const h = resizing && live ? live.h : win.h;
    style = { left: x, top: y, width: w, height: h, zIndex: win.z };
  }

  const preview = dragging && snapZone ? zoneRect(snapZone) : null;

  return (
    <>
      {preview && (
        <div
          className="snap-preview"
          style={{ left: preview.x, top: preview.y, width: preview.w, height: preview.h }}
        />
      )}
      <motion.div
        className={`win${win.maximized ? ' is-maximized' : ''}${dragging ? ' dragging' : ''}${
          resizing ? ' resizing' : ''
        }`}
        style={style}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
        onPointerDown={() => focusWindow(win.id)}
      >
        <div
          className="win-titlebar"
          onPointerDown={onTitlePointerDown}
          onPointerMove={onTitlePointerMove}
          onPointerUp={onTitlePointerUp}
          onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
          style={{ cursor: isMobile || win.maximized ? 'default' : 'grab' }}
        >
          <div className="win-lights">
            <button className="win-light close" aria-label="Close window"
              onPointerDown={(e) => e.stopPropagation()} onClick={() => closeWindow(win.id)}>
              <span className="glyph">✕</span>
            </button>
            <button className="win-light minimize" aria-label="Minimize window"
              onPointerDown={(e) => e.stopPropagation()} onClick={() => minimizeWindow(win.id)}>
              <span className="glyph">–</span>
            </button>
            <button className="win-light maximize" aria-label="Maximize window"
              onPointerDown={(e) => e.stopPropagation()} onClick={() => toggleMaximize(win.id)}>
              <span className="glyph">+</span>
            </button>
          </div>
          <div className="win-title">{win.title}</div>
        </div>

        <div className="win-body">{children}</div>

        {!isMobile && !win.maximized && (
          <div
            className="win-resize"
            onPointerDown={onResizePointerDown}
            onPointerMove={onResizePointerMove}
            onPointerUp={onResizePointerUp}
          />
        )}
      </motion.div>
    </>
  );
}
