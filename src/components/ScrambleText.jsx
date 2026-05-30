import { useState, useEffect, useRef } from 'react';

// Latin alphabet + Greek letters — nod to the National Latin Exam Gold Medal
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩІÏÎ·';

export default function ScrambleText({ text, delay = 0, className = '', onHoverRescramble = false }) {
  const [display, setDisplay] = useState(() =>
    text.split('').map(c => (c === ' ' ? ' ' : POOL[0])).join('')
  );
  const iterRef = useRef(0);
  const rafRef  = useRef(null);
  const timerRef = useRef(null);

  const scramble = (startDelay = 0) => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    iterRef.current = 0;

    timerRef.current = setTimeout(() => {
      const step = () => {
        iterRef.current += 0.28;
        setDisplay(
          text.split('').map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iterRef.current) return ch;
            return POOL[Math.floor(Math.random() * POOL.length)];
          }).join('')
        );
        if (iterRef.current < text.length) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(text);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }, startDelay);
  };

  useEffect(() => {
    scramble(delay);
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={onHoverRescramble ? () => scramble(0) : undefined}
      style={onHoverRescramble ? { cursor: 'default' } : undefined}
    >
      {display}
    </span>
  );
}
