import React from 'react';
import { MARQUEE_ITEMS } from '../../data/portfolioContent';

function MarqueeContent({ hidden }) {
  return (
    <span className="pr-6" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item, i) => (
        <React.Fragment key={i}>
          {item}
          &nbsp;✳&nbsp;{' '}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-2 overflow-hidden border-y-[1.5px] border-ink bg-red text-paper py-[11px]">
      <div className="flex w-max sg-marquee-track font-mono text-sm uppercase tracking-[0.04em] font-medium">
        <MarqueeContent />
        <MarqueeContent hidden />
      </div>
    </div>
  );
}
