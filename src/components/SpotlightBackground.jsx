import React, { useState, useEffect } from 'react';

const SpotlightBackground = ({ isDark }) => {
  const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let rafId;
    const handleMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setSpotlightPos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isMobile || !isDark) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        background: `radial-gradient(circle 420px at ${spotlightPos.x}px ${spotlightPos.y}px,
          rgba(255,255,255,0.032) 0%,
          rgba(255,255,255,0.018) 25%,
          transparent 70%
        )`,
      }}
    />
  );
};

export default SpotlightBackground;
