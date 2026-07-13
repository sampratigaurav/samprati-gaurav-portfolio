import React from 'react';
import { Reveal, Eyebrow, MagneticCard } from './primitives';
import { REG_CARD, GALLERY } from '../../data/portfolioContent';

export default function Profile() {
  return (
    <section
      id="about"
      className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vh,110px)]"
    >
      <Reveal>
        <Eyebrow className="mb-[34px]">01 / Profile</Eyebrow>
      </Reveal>

      <div className="grid grid-cols-[0.9fr_1.1fr] max-[860px]:grid-cols-1 gap-[clamp(28px,4vw,60px)] items-start">
        {/* Reg card */}
        <MagneticCard className="border-[1.5px] border-ink bg-paper2 shadow-[8px_8px_0_var(--color-ink)]">
          <div className="flex justify-between items-center px-3 py-[9px] border-b-[1.5px] border-ink font-mono text-[11px] tracking-[0.06em]">
            <span>{REG_CARD.id}</span>
            <span className="text-red">◆ ACTIVE</span>
          </div>
          <div
            className="relative aspect-square border-b-[1.5px] border-ink overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(var(--color-ink) 0.8px, transparent 1.2px)',
              backgroundSize: '7px 7px',
            }}
          >
            <img
              src="/images/portrait.svg"
              alt="Samprati Gaurav portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-[14px] py-4 flex flex-col gap-[11px] text-[13px]">
            {REG_CARD.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between gap-[10px] ${
                  i > 0 ? 'border-t border-dashed border-line pt-[11px]' : ''
                }`}
              >
                <span className="font-mono text-[11px] text-ink2">
                  {row.label}
                </span>
                <span
                  className={`font-semibold text-right ${row.accent ? 'text-red' : ''}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </MagneticCard>

        {/* Bio */}
        <div>
          <Reveal
            as="h2"
            className="font-serif font-normal text-[clamp(30px,4.4vw,58px)] leading-[1.02] tracking-[-0.01em] mb-[22px]"
            style={{ textWrap: 'balance' }}
          >
            A builder who ships loudly, breaks things safely, and{' '}
            <span className="italic text-red">documents everything.</span>
          </Reveal>
          <Reveal
            as="p"
            className="mb-[18px] text-[17px] leading-[1.68] text-ink2"
          >
            <span className="float-left font-serif text-[62px] leading-[0.8] pr-3 pt-[6px] text-red">
              F
            </span>
            ull-stack developer and cybersecurity student specializing in React,
            Node.js, and Python. I build real-time systems, AI-integrated apps,
            and secure browser extensions — with a hackathon team-lead streak
            and a built-in-public record across 20+ open-source repos and 700+
            contributions this year.
          </Reveal>
          <Reveal as="p" className="text-[17px] leading-[1.68] text-ink2">
            When I'm not shipping, I'm writing about networking and systems
            internals, on the court, or somewhere between an anime rewatch and
            the next side project.
          </Reveal>
        </div>
      </div>

      {/* Off the clock gallery */}
      <Reveal className="mt-[clamp(44px,6vh,72px)]">
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-serif italic text-[clamp(24px,3vw,36px)]">
            Off the clock
          </span>
          <span className="font-mono text-[11px] text-ink2 tracking-[0.06em]">
            — things I love
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          {GALLERY.map((item) => (
            <GalleryFigure key={item.id} item={item} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function GalleryFigure({ item }) {
  return (
    <MagneticCard
      as="figure"
      className="m-0 border-[1.5px] border-ink bg-paper2 p-[7px] shadow-[5px_5px_0_var(--color-ink)]"
    >
      <div className="aspect-[3/4] border border-ink overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover"
        />
      </div>
      <figcaption className="font-mono text-[10.5px] pt-[7px] text-ink2">
        {item.num} · {item.label}
      </figcaption>
    </MagneticCard>
  );
}
