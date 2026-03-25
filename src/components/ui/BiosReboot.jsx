import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  'Initializing boot sequence...',
  'Checking memory sectors... [OK]',
  'Mounting Aegis decentralized registry... [OK]',
  'Initializing Duet subsystems... [OK]',
  'Connecting to Bangalore servers... [OK]',
  'Restoring UI environment...',
];

const BiosReboot = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(
        () => {
          setVisibleLines((prev) => [...prev, line]);
        },
        (i + 1) * 700
      );
    });

    const totalTime = BOOT_LINES.length * 700 + 800;
    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalTime);

    return () => clearTimeout(completeTimer);
  }, [onComplete]);

  return (
    <div className="bios-overlay">
      {visibleLines.map((line, i) => (
        <div
          key={i}
          style={{
            opacity: 1,
            animation: 'fadeInBios 0.3s ease forwards',
          }}
        >
          {line}
        </div>
      ))}
      {visibleLines.length < BOOT_LINES.length && (
        <span style={{ animation: 'syslogBlink 0.5s step-end infinite' }}>
          _
        </span>
      )}
    </div>
  );
};

export default BiosReboot;
