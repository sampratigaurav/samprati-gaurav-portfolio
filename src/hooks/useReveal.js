import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * IntersectionObserver-based scroll reveal. Fires once, with a safety
 * timeout in case the observer never triggers (e.g. element already
 * off-screen in a weird layout state).
 */
export default function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);

    const safety = setTimeout(() => setVisible(true), 3500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [reducedMotion]);

  return [ref, visible];
}
