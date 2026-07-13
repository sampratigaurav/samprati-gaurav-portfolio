import React, { useEffect, useState } from 'react';
import { Reveal, Magnetic } from './primitives';
import useReducedMotion from '../../hooks/useReducedMotion';
import GithubActivity from './GithubActivity';

function AnimatedWord({ text, startIndex, italic, reducedMotion }) {
  const [shown, setShown] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <span
      className={`block overflow-hidden pb-[0.02em] ${italic ? 'italic text-red' : 'text-ink'}`}
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(0.6em)',
            transition:
              'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)',
            transitionDelay: `${0.15 + (startIndex + i) * 0.045}s`,
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <header
      id="top"
      className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] pt-[clamp(96px,15vh,150px)] pb-[clamp(20px,5vh,50px)]"
    >
      <div className="grid grid-cols-[1.15fr_0.85fr] max-[860px]:grid-cols-1 gap-[clamp(28px,4vw,64px)] items-center">
        <div>
          <Reveal className="inline-flex items-center gap-[10px] font-mono text-xs tracking-[0.16em] uppercase text-red mb-[22px]">
            <span className="w-[7px] h-[7px] bg-red inline-block" />
            Portfolio — Vol.2026 · Built in public
          </Reveal>

          <h1 className="font-serif font-normal text-[clamp(56px,11vw,148px)] leading-[0.86] tracking-[-0.01em] m-0">
            <AnimatedWord
              text="Samprati"
              startIndex={0}
              reducedMotion={reducedMotion}
            />
            <AnimatedWord
              text="Gaurav"
              startIndex={8}
              italic
              reducedMotion={reducedMotion}
            />
          </h1>

          <Reveal
            as="p"
            className="max-w-[500px] mt-[26px] text-[clamp(16px,1.7vw,19px)] leading-[1.55] text-ink2 font-medium"
          >
            Full-stack developer &amp; cybersecurity student. I build real-time
            systems, AI-integrated apps, and secure browser extensions — shipped
            loudly, in public.
          </Reveal>

          <Reveal className="flex flex-wrap gap-2 mt-6 font-mono text-xs">
            <span className="px-[12px] py-[6px] border-[1.5px] border-ink rounded-sm">
              700+ contributions
            </span>
            <span className="px-[12px] py-[6px] border-[1.5px] border-ink rounded-sm">
              20+ repos
            </span>
            <span className="px-[12px] py-[6px] border-[1.5px] border-ink rounded-sm">
              15+ articles
            </span>
          </Reveal>

          <Reveal>
            <GithubActivity />
          </Reveal>

          <Reveal className="flex flex-wrap gap-3 mt-[30px]">
            <Magnetic
              as="a"
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-[13px] bg-ink text-paper font-semibold rounded-sm"
            >
              See the work ↓
            </Magnetic>
            <Magnetic
              as="a"
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-[13px] border-[1.5px] border-ink font-semibold rounded-sm"
            >
              Get in touch
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="relative">
          <div
            className="absolute rounded-full bg-red z-0"
            style={{
              top: '-6%',
              right: '2%',
              width: 'min(78%,320px)',
              aspectRatio: '1',
            }}
          />
          <div className="relative z-1 border-[1.5px] border-ink bg-paper2 p-2 shadow-[12px_12px_0_var(--color-ink)]">
            <div className="relative aspect-[4/5] border-[1.5px] border-ink overflow-hidden">
              <img
                src="/images/hero-art.svg"
                alt="Samprati Gaurav — stylized self portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center px-1 pt-2 pb-[2px] font-mono text-[10.5px] text-ink2 tracking-[0.06em]">
              <span>FIG.01 / THE DEV</span>
              <span>BENGALURU · 2026</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-[clamp(28px,5vh,56px)] flex items-center gap-[10px] font-mono text-[11px] tracking-[0.16em] uppercase text-ink2">
        <span className="inline-block sg-bob">↓</span> Scroll — the story starts
        here
      </div>
    </header>
  );
}
