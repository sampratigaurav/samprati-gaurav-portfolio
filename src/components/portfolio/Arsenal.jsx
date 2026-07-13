import React from 'react';
import { Reveal, Eyebrow } from './primitives';
import { SKILL_CATEGORIES } from '../../data/portfolioContent';

export default function Arsenal() {
  return (
    <section
      id="skills"
      className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(40px,6vh,80px)] pb-[clamp(60px,9vh,110px)]"
    >
      <Reveal>
        <Eyebrow className="mb-3">04 / Arsenal</Eyebrow>
      </Reveal>
      <Reveal
        as="h2"
        className="font-serif font-normal text-[clamp(32px,5vw,64px)] mb-10"
      >
        What I build with
      </Reveal>

      <div
        className="grid gap-[1.5px] bg-ink border-[1.5px] border-ink"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))' }}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <Reveal key={cat.label} className="bg-paper p-6">
            <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-red mb-4">
              {cat.label}
            </div>
            <div className="flex flex-wrap gap-[7px]">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-[11px] py-[5px] border border-ink rounded-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
