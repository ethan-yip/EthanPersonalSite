import { useEffect, useRef, useState } from 'react';
import Carousel from './reactbits/Carousel';

const PHOTOS = [
  { image: '/photos/1.jpg', title: 'EY', id: 1 },
  { image: '/photos/6.png', title: 'EY', id: 3 },
  { image: '/photos/3.jpg', title: 'EY', id: 4 },
  { image: '/photos/4.webp', title: 'EY', id: 5 },
  { image: '/photos/5.png', title: 'EY', id: 6 },
];

export default function HeroCarousel() {
  const ref = useRef(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hero-carousel" ref={ref}>
      {w > 0 && (
        <Carousel items={PHOTOS} baseWidth={w} autoplay autoplayDelay={3800} loop pauseOnHover />
      )}
    </div>
  );
}
