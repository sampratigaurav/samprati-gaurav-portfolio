import React from 'react';
import { Reveal, Eyebrow } from './primitives';
import { ARCS } from '../../data/portfolioContent';

export default function Arcs() {
  return (
    <section
      id="arcs"
      className="relative z-2 bg-ink text-paper border-y-[1.5px] border-ink"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vh,110px)]">
        <Reveal>
          <Eyebrow className="mb-3">02 / Arcs</Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          className="font-serif font-normal text-[clamp(32px,5vw,64px)] mb-[46px]"
        >
          The story so far
        </Reveal>

        {ARCS.map((arc, i) => (
          <Reveal
            key={arc.numeral}
            className={`grid grid-cols-[auto_1fr] gap-[clamp(18px,3vw,44px)] py-7 border-t border-[rgba(233,227,212,0.25)] ${
              i === ARCS.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className="font-serif text-[clamp(48px,7vw,96px)] leading-[0.8] text-red">
              {arc.numeral}
            </div>
            <div>
              <div className="flex flex-wrap gap-x-4 gap-y-[10px] items-baseline mb-3">
                <h3 className="font-serif font-normal text-[clamp(24px,3.2vw,38px)] m-0">
                  {arc.role}
                </h3>
                <span className="font-semibold text-red">{arc.org}</span>
                <span className="font-mono text-xs opacity-70 ml-auto">
                  {arc.date}
                </span>
              </div>
              <ul className="m-0 p-0 list-none flex flex-col gap-[9px] text-[15.5px] leading-[1.55] opacity-[0.88]">
                {arc.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex gap-[10px]">
                    <span className="text-red">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
