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

  if (isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        backgroundImage: `
          linear-gradient(to right, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px),
          linear-gradient(to bottom, ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        WebkitMaskImage: `radial-gradient(circle 350px at ${spotlightPos.x}px ${spotlightPos.y}px, black 10%, transparent 80%)`,
        maskImage: `radial-gradient(circle 350px at ${spotlightPos.x}px ${spotlightPos.y}px, black 10%, transparent 80%)`,
      }}
    />
  );
};

export default SpotlightBackground;
