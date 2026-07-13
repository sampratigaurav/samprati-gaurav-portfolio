import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] pt-[26px] pb-11 flex flex-wrap gap-3 justify-between items-center font-mono text-[11.5px] text-ink2">
      <span>© 2026 SAMPRATI GAURAV · VOL.2026</span>
      <span>BENGALURU, IN — BUILT IN PUBLIC ✳</span>
      <a href="#top" className="text-ink2 hover:text-red">
        BACK TO TOP ↑
      </a>
    </footer>
  );
}
