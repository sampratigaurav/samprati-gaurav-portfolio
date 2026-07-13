import { useEffect, useRef } from 'react';
import useReducedMotion from './useReducedMotion';

const STRENGTH = 0.3;

/** Magnetic button: translates toward the cursor on hover, snaps back on leave. */
export function useMagnetic() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (window.matchMedia?.('(hover: none)').matches) return;

    const move = (e) => {
      const b = el.getBoundingClientRect();
      const dx = (e.clientX - (b.left + b.width / 2)) * STRENGTH;
      const dy = (e.clientY - (b.top + b.height / 2)) * STRENGTH;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const reset = () => {
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', reset);
    };
  }, [reducedMotion]);

  return ref;
}

/** Card hover-lift: nudges toward the top-left corner on hover. */
export function useMagneticCard() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const enter = () => {
      el.style.transform = 'translate(-3px,-3px)';
    };
    const leave = () => {
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [reducedMotion]);

  return ref;
}
