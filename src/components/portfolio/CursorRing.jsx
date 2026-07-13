import React, { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Red-outline circle that eases toward the pointer. The rAF loop only runs
 * while the pointer is moving/settling — it stops itself once the ring has
 * caught up, rather than looping forever.
 */
export default function CursorRing() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isTouch] = useState(
    () => window.matchMedia?.('(hover: none)').matches ?? false
  );

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const cur = ref.current;
    if (!cur) return;

    let tx = -1000;
    let ty = -1000;
    let cx = -1000;
    let cy = -1000;
    let raf = 0;

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cur.style.transform = `translate(${cx}px, ${cy}px)`;
      if (Math.abs(tx - cx) < 0.5 && Math.abs(ty - cy) < 0.5) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, isTouch]);

  if (reducedMotion || isTouch) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[22px] h-[22px] z-[9996] pointer-events-none rounded-full border-2 border-red"
      style={{
        margin: '-11px 0 0 -11px',
        opacity: 0.7,
        willChange: 'transform',
        transform: 'translate(-1000px,-1000px)',
      }}
    />
  );
}
