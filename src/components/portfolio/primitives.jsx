import React from 'react';
import useReveal from '../../hooks/useReveal';
import { useMagnetic, useMagneticCard } from '../../hooks/useMagnetic';

export function Reveal({
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...props
}) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(26px)',
        transition:
          'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)',
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Magnetic({
  as: Tag = 'a',
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useMagnetic();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transition: 'transform .35s cubic-bezier(.2,.7,.2,1)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function MagneticCard({
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useMagneticCard();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ transition: 'transform .4s cubic-bezier(.2,.7,.2,1)', ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`font-mono text-xs tracking-[0.18em] uppercase text-red ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({ children, className = '' }) {
  return (
    <span
      className={`font-mono text-[11px] px-[9px] py-1 border border-ink rounded-sm ${className}`}
    >
      {children}
    </span>
  );
}
