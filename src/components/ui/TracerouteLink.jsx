import React, { useState, useRef, useCallback, useEffect } from 'react';

const TracerouteLink = ({ href, children, className = '', style = {} }) => {
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    clearTimers();

    intervalRef.current = setInterval(() => {
      const a = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      setTooltipText(`Resolving: 192.168.${a}.${b}`);
    }, 50);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTooltipText(`Target Acquired: ${href}`);
    }, 300);
  }, [href, clearTimers]);

  const handleMouseMove = useCallback((e) => {
    setTooltipPos({ x: e.clientX + 14, y: e.clientY - 30 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    clearTimers();
    setTooltipText('');
  }, [clearTimers]);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
      {isHovering && tooltipText && (
        <div
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            background: 'rgba(0,0,0,0.92)',
            color: '#4ade80',
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid rgba(74,222,128,0.2)',
            pointerEvents: 'none',
            zIndex: 99999,
            whiteSpace: 'nowrap',
            animation: 'fadeInBios 0.15s ease',
          }}
        >
          {tooltipText}
        </div>
      )}
    </>
  );
};

export default TracerouteLink;
