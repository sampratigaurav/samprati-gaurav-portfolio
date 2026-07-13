import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    // Automatically increments the count and returns the updated value
    fetch('https://api.counterapi.dev/v1/sampratigaurav/portfolio/up')
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch((err) => console.error('Failed to count visitor:', err));
  }, []);

  return (
    <footer className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] pt-[26px] pb-11 flex flex-wrap gap-3 justify-between items-center font-mono text-[11.5px] text-ink2">
      <span>© 2026 SAMPRATI GAURAV · VOL.2026</span>
      <span>
        BENGALURU, IN — BUILT IN PUBLIC ✳
        {visitorCount !== null && (
          <span className="text-red ml-2">
            [{visitorCount.toLocaleString()} VISITS]
          </span>
        )}
      </span>
      <a href="#top" className="text-ink2 hover:text-red transition-colors">
        BACK TO TOP ↑
      </a>
    </footer>
  );
}
