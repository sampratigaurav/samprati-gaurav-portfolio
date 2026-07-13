import React from 'react';
import { Magnetic } from './primitives';
import { NAV_LINKS } from '../../data/portfolioContent';

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9998] h-[62px] flex items-center justify-between px-[clamp(18px,4vw,44px)] border-b-[1.5px] border-ink backdrop-blur-[8px]"
      style={{
        background: 'color-mix(in srgb, var(--color-paper) 82%, transparent)',
      }}
    >
      <a
        href="#top"
        className="flex items-center gap-[10px] font-bold text-[15px] tracking-[0.02em]"
      >
        <span className="w-[15px] h-[15px] rounded-full bg-red inline-block" />
        SAMPRATI GAURAV
      </a>
      <div className="flex items-center gap-[clamp(12px,2vw,26px)] font-mono text-xs tracking-[0.04em] max-[860px]:hidden">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="text-ink2 hover:text-red"
          >
            {link.label}
          </a>
        ))}
        <Magnetic
          as="a"
          href="#contact"
          className="inline-flex items-center px-[15px] py-[7px] bg-red text-paper font-semibold rounded-sm"
        >
          Let's talk
        </Magnetic>
      </div>
    </nav>
  );
}
