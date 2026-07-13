import React from 'react';
import { Reveal, Magnetic } from './primitives';
import { CONTACT } from '../../data/portfolioContent';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-2 bg-red text-paper border-t-[1.5px] border-ink"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(64px,11vh,150px)] text-center">
        <Reveal className="font-mono text-xs tracking-[0.18em] uppercase mb-5 opacity-85">
          08 / Contact
        </Reveal>
        <Reveal
          as="h2"
          className="font-serif font-normal text-[clamp(52px,11vw,150px)] leading-[0.9] m-0"
        >
          Let's build
          <br />
          <span className="italic">something.</span>
        </Reveal>
        <Reveal
          as="p"
          className="max-w-[440px] mx-auto mt-6 mb-[38px] text-[17px] leading-[1.5] opacity-90"
        >
          Internships, collabs, or a chat about real-time systems, security, or
          the next anime worth watching.
        </Reveal>
        <Reveal className="flex flex-wrap gap-3 justify-center mb-[34px]">
          <Magnetic
            as="a"
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 px-[30px] py-[15px] bg-paper text-ink font-semibold text-base rounded-sm"
          >
            Email me ↗
          </Magnetic>
          <Magnetic
            as="a"
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-[15px] border-[1.5px] border-paper font-semibold text-base rounded-sm"
          >
            GitHub
          </Magnetic>
          <Magnetic
            as="a"
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-[15px] border-[1.5px] border-paper font-semibold text-base rounded-sm"
          >
            LinkedIn
          </Magnetic>
        </Reveal>
        <Reveal className="font-mono text-[13px] tracking-[0.04em] opacity-90">
          {CONTACT.email} &nbsp;·&nbsp; {CONTACT.phone} &nbsp;·&nbsp;{' '}
          {CONTACT.domain}
        </Reveal>
      </div>
    </section>
  );
}
