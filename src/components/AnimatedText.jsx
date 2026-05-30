import { useEffect, useRef, useState } from 'react';

// Per-character blur+opacity reveal — same technique as rsnc-ai
export default function AnimatedText({ text, delay = 0, stagger = 14, className = '', tag: Tag = 'span', onHoverRescramble = false }) {
  const [revealed, setRevealed] = useState([]);
  const timerRef = useRef(null);

  const reveal = (startDelay) => {
    setRevealed([]);
    const chars = [...text];
    chars.forEach((_, i) => {
      timerRef.current = setTimeout(
        () => setRevealed(r => [...r, i]),
        startDelay + i * stagger
      );
    });
  };

  useEffect(() => {
    reveal(delay);
    return () => clearTimeout(timerRef.current);
  }, [text]);

  const chars = [...text];

  return (
    <Tag
      className={className}
      onMouseEnter={onHoverRescramble ? () => reveal(0) : undefined}
      style={onHoverRescramble ? { cursor: 'default' } : undefined}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          style={{
            display: ch === ' ' ? 'inline' : 'inline-block',
            opacity: revealed.includes(i) ? 1 : 0,
            filter: revealed.includes(i) ? 'blur(0px)' : 'blur(6px)',
            transition: 'opacity 260ms ease, filter 260ms ease',
            whiteSpace: 'pre',
          }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  );
}
