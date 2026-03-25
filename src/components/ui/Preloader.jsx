import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  { delay: 0, text: '> Initiating boot sequence...' },
  { delay: 400, text: '> Mounting Aegis filesystem... [OK]' },
  { delay: 800, text: '> Decrypting portfolio assets... [OK]' },
];

const Preloader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState('typing'); // typing | split | fade

  useEffect(() => {
    const timers = [];

    BOOT_LINES.forEach(({ delay, text }) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, text]);
        }, delay)
      );
    });

    // CRT split
    timers.push(
      setTimeout(() => {
        setPhase('split');
      }, 1400)
    );

    // Fade out
    timers.push(
      setTimeout(() => {
        setPhase('fade');
      }, 1700)
    );

    // Unmount
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 2000)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`preloader-container ${phase === 'split' ? 'crt-split' : ''} ${phase === 'fade' ? 'crt-fade' : ''}`}
    >
      <div className="preloader-terminal">
        {lines.map((line, i) => (
          <div key={i} style={{ animation: 'fadeInBios 0.2s ease forwards' }}>
            {line}
          </div>
        ))}
        {phase === 'typing' && (
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '16px',
              background: '#4af626',
              animation: 'syslogBlink 0.5s step-end infinite',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Preloader;
