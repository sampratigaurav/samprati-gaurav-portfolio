import React from 'react';
import { Reveal, Eyebrow, MagneticCard } from './primitives';
import { CERTS, EDUCATION } from '../../data/portfolioContent';

export default function Credentials() {
  return (
    <section
      id="certs"
      className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vh,110px)]"
    >
      <Reveal>
        <Eyebrow className="mb-3">06 / Credentials</Eyebrow>
      </Reveal>
      <Reveal
        as="h2"
        className="font-serif font-normal text-[clamp(32px,5vw,64px)] mb-10"
      >
        Certifications
      </Reveal>

      <div
        className="grid gap-4 mb-[clamp(40px,6vh,64px)]"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}
      >
        {CERTS.map((cert) => (
          <MagneticCard
            key={cert.name}
            className="border-[1.5px] border-ink bg-paper2 p-[22px] flex gap-4 shadow-[5px_5px_0_var(--color-ink)]"
          >
            <div className="shrink-0 w-[46px] h-[46px] rounded-full border-2 border-red text-red flex items-center justify-center font-mono text-[10px] text-center leading-none whitespace-pre-line">
              {cert.seal}
            </div>
            <div>
              <div className="font-semibold text-[15px] leading-[1.3]">
                {cert.name}
              </div>
              <div className="font-mono text-[11.5px] text-ink2 mt-[6px]">
                {cert.meta}
              </div>
            </div>
          </MagneticCard>
        ))}
      </div>

      <Reveal className="border-[1.5px] border-ink bg-ink text-paper p-[clamp(22px,3vw,36px)] grid grid-cols-[auto_1fr_auto] max-[860px]:grid-cols-1 gap-6 items-center">
        <div className="font-mono text-xs tracking-[0.1em] text-red">
          {EDUCATION.eyebrow}
        </div>
        <div>
          <h3 className="font-serif font-normal text-[clamp(22px,3vw,34px)] mb-1">
            {EDUCATION.name}
          </h3>
          <p className="text-[14.5px] opacity-85">{EDUCATION.meta}</p>
        </div>
        <div className="font-mono text-xs opacity-75 text-right whitespace-nowrap max-[860px]:text-left">
          {EDUCATION.years}
        </div>
      </Reveal>
    </section>
  );
}
