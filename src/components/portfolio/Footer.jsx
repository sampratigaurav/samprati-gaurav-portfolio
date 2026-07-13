import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] pt-[26px] pb-11 flex flex-wrap gap-4 justify-between items-center font-mono text-[11.5px] text-ink2">
      <span>© 2026 SAMPRATI GAURAV · VOL.2026</span>
      <span className="flex items-center gap-2">
        BENGALURU, IN — BUILT IN PUBLIC ✳
        <img
          src="https://hits.sh/sampratigaurav.vercel.app.svg?style=for-the-badge&label=VISITS&color=c62e22&labelColor=17130D"
          alt="Visitor Count"
          className="h-[18px] ml-1 opacity-90 hover:opacity-100 transition-opacity"
        />
      </span>
      <a href="#top" className="text-ink2 hover:text-red transition-colors">
        BACK TO TOP ↑
      </a>
    </footer>
  );
}
