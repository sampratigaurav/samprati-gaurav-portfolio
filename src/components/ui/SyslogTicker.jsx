import React, { useState, useEffect } from 'react';

const SyslogTicker = ({ logs, isDark }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!logs || logs.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % logs.length);
        setFade(true); // trigger fade in
      }, 500); // wait for fade out
    }, 4000);

    return () => clearInterval(interval);
  }, [logs]);

  if (!logs || logs.length === 0) return null;

  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '12px',
        color: isDark ? '#4ade80' : 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '24px',
        height: '24px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {logs[currentIndex]}
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '14px',
            background: isDark ? '#4ade80' : 'rgba(0,0,0,0.6)',
            marginLeft: '6px',
            animation: 'syslogBlink 1s step-end infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes syslogBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SyslogTicker;
