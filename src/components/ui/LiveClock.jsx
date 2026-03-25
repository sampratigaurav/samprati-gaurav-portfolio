import React, { useState, useEffect } from 'react';

const LiveClock = React.memo(({ isDark }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div style={{
      fontSize: '13px',
      color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
      fontFamily: 'DM Mono, monospace',
      letterSpacing: '0.5px',
      marginBottom: '8px',
      paddingBottom: '8px',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    }}>
      {time} <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginLeft: '4px' }}>IST</span>
    </div>
  );
});

export default LiveClock;
