import { useState, useRef, useCallback, useEffect } from 'react';

const IMGS = [
  '/photos/1.jpg',
  '/photos/2.jpg',
  '/photos/3.jpg',
  '/photos/4.webp',
  '/photos/5.png',
  '/photos/6.png',
];

const ROTS_POOL   = ['-1.5deg','1deg','-0.8deg','2deg','-1deg','1.5deg'];
const DURS_POOL   = ['7.2s','9.5s','8s','6.8s','10s','7.6s'];
const DELAYS_POOL = ['0s','-4s','-2.5s','-6s','-8s','-3s'];
const ANIMS       = ['float1','float2','float3'];
const SOLID_COLORS = ['#D9D1C4','#C8BDB0','#E0D8CC'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const imgs   = shuffle(IMGS).slice(0, 3);
const rots   = shuffle(ROTS_POOL).slice(0, 3);
const durs   = shuffle(DURS_POOL).slice(0, 3);
const delays = shuffle(DELAYS_POOL).slice(0, 3);

const CELLS = imgs.map((src, i) => ({
  src,
  rot:   rots[i],
  dur:   durs[i],
  delay: delays[i],
  anim:  ANIMS[i],
  color: SOLID_COLORS[i],
}));

const NAV_H   = 56;
const PAD     = 8;   // outer padding
const COL_GAP = 10;  // gap between left and right columns
const ROW_GAP = 8;   // gap between images 1 and 3 in left column

export default function ImagePanel() {
  const panelRef = useRef(null);
  const imgRefs  = useRef([]);
  const [sizes, setSizes] = useState(null);

  const recalc = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const els = imgRefs.current.filter(Boolean);
    if (els.length < CELLS.length) return;
    if (els.some(img => !img.complete || !img.naturalWidth)) return;

    const W = panel.clientWidth;
    const H = panel.clientHeight;

    // Area below the nav bar
    const aTop = NAV_H + PAD;
    const aH   = H - aTop - PAD;
    const aW   = W - PAD * 2;

    // Left column (imgs 0, 2) | right column (img 1)
    // Each column gets half the width minus the gap between them
    const colW = (aW - COL_GAP) / 2;

    const ratios = els.map(img => img.naturalWidth / img.naturalHeight);

    // Fit an image into (maxW × maxH), preserving aspect ratio, no cropping
    const fit = (ratio, maxW, maxH) => {
      let w = maxW;
      let h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      return { w, h };
    };

    // Left column: images 0 (top) and 2 (bottom) share the available height
    const leftH = (aH - ROW_GAP) / 2;
    const s0 = fit(ratios[0], colW, leftH);
    const s2 = fit(ratios[2], colW, leftH);

    // Right column: image 1 can use the full available height
    const s1 = fit(ratios[1], colW, aH);

    const rightColLeft = PAD + colW + COL_GAP;

    setSizes([
      // top-left
      { w: s0.w, h: s0.h, top: aTop,                  left: PAD },
      // middle-right (vertically centered in right column)
      { w: s1.w, h: s1.h, top: aTop + (aH - s1.h) / 2, left: rightColLeft },
      // bottom-left
      { w: s2.w, h: s2.h, top: aTop + aH - s2.h,       left: PAD },
    ]);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const ro = new ResizeObserver(recalc);
    ro.observe(panel);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <div ref={panelRef} className="image-panel">
      {CELLS.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width:  sizes ? sizes[i].w   : 'auto',
            height: sizes ? sizes[i].h   : 'auto',
            top:    sizes ? sizes[i].top : 0,
            left:   sizes ? sizes[i].left: 0,
            zIndex: i + 1,
            rotate: c.rot,
            animation: `${c.anim} ${c.dur} ease-in-out ${c.delay} infinite`,
            overflow: 'hidden',
          }}
        >
          <img
            ref={el => { imgRefs.current[i] = el; }}
            src={c.src}
            alt=""
            style={{ width: '100%', height: '100%', display: 'block', objectFit: 'fill' }}
            onLoad={recalc}
            onError={e => {
              e.currentTarget.style.display = 'none';
              const sib = e.currentTarget.nextElementSibling;
              if (sib) sib.style.display = 'block';
            }}
          />
          <div style={{ background: c.color, display: 'none', width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  );
}
