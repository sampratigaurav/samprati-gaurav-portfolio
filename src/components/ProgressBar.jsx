import React, { useState, useEffect } from 'react';

const ProgressBar = ({ isDark }) => {
  const [scrollWidth, setScrollWidth] = useState('0%');

  useEffect(() => {
    let rafId;
    const updateScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        setScrollWidth(pct + '%');
      });
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scroll-bar" style={{ width: scrollWidth, background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)' }} />
  );
};

export default ProgressBar;
