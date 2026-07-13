import React from 'react';
import { Reveal, Eyebrow, Magnetic, MagneticCard, Chip } from './primitives';
import { FEATURED_PROJECT, PROJECTS } from '../../data/portfolioContent';

function LinkButton({ link }) {
  const solid = link.variant === 'solid';
  return (
    <Magnetic
      as="a"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-[7px] px-5 py-[11px] font-semibold text-sm rounded-sm ${
        solid ? 'bg-red text-paper' : 'border-[1.5px] border-ink'
      }`}
    >
      {link.label}
    </Magnetic>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative z-2 max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vh,110px)]"
    >
      <div className="flex items-baseline justify-between gap-5 mb-3">
        <Reveal>
          <Eyebrow>03 / The Work</Eyebrow>
        </Reveal>
        <Reveal as="div" className="font-mono text-xs text-ink2">
          03 CARDS
        </Reveal>
      </div>
      <Reveal
        as="h2"
        className="font-serif font-normal text-[clamp(32px,5vw,64px)] mb-11"
      >
        Things I've built
      </Reveal>

      {/* Featured card */}
      <MagneticCard
        as="article"
        className="border-[1.5px] border-ink bg-paper2 shadow-[10px_10px_0_var(--color-ink)] overflow-hidden mb-[22px]"
      >
        <div className="flex justify-between items-center px-4 py-[10px] border-b-[1.5px] border-ink font-mono text-xs tracking-[0.06em]">
          <span>{FEATURED_PROJECT.code}</span>
          <span className="text-red">{FEATURED_PROJECT.tag}</span>
        </div>
        <div className="grid grid-cols-2 max-[860px]:grid-cols-1">
          <div
            className="relative aspect-[16/11] border-r-[1.5px] border-ink max-[860px]:border-r-0 max-[860px]:border-b-[1.5px] overflow-hidden"
            style={{
              backgroundImage:
                'radial-gradient(var(--color-ink) 0.8px, transparent 1.2px)',
              backgroundSize: '6px 6px',
            }}
          >
            <img
              src={FEATURED_PROJECT.image}
              alt={`${FEATURED_PROJECT.title} screenshot`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-[clamp(20px,2.6vw,34px)] flex flex-col">
            <h3 className="font-serif font-normal text-[clamp(28px,3.6vw,44px)] mb-1 leading-none">
              {FEATURED_PROJECT.title}
            </h3>
            <p className="mb-[14px] font-semibold text-[15px]">
              {FEATURED_PROJECT.subtitle}
            </p>
            <ul className="mb-[18px] p-0 list-none flex flex-col gap-[9px] text-[14.5px] leading-[1.5] text-ink2">
              {FEATURED_PROJECT.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-[9px]">
                  <span className="text-red">→</span>
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-[7px] mb-[22px]">
              {FEATURED_PROJECT.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <div className="mt-auto flex gap-[10px]">
              {FEATURED_PROJECT.links.map((link) => (
                <LinkButton key={link.label} link={link} />
              ))}
            </div>
          </div>
        </div>
      </MagneticCard>

      {/* Two smaller cards */}
      <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-[22px]">
        {PROJECTS.map((project) => (
          <MagneticCard
            key={project.code}
            as="article"
            className="border-[1.5px] border-ink bg-paper2 shadow-[8px_8px_0_var(--color-ink)] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-[14px] py-[9px] border-b-[1.5px] border-ink font-mono text-[11.5px]">
              <span>{project.code}</span>
              <span className="text-red">{project.tag}</span>
            </div>
            <div
              className="relative aspect-[16/10] border-b-[1.5px] border-ink overflow-hidden"
              style={{
                backgroundImage:
                  'radial-gradient(var(--color-ink) 0.8px, transparent 1.2px)',
                backgroundSize: '6px 6px',
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif font-normal text-[28px] mb-1">
                {project.title}
              </h3>
              <p className="mb-3 text-sm text-ink2 leading-[1.5]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-[6px] mb-[18px]">
                {project.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="mt-auto flex gap-[10px]">
                {project.links.map((link) => (
                  <LinkButton key={link.label} link={link} />
                ))}
              </div>
            </div>
          </MagneticCard>
        ))}
      </div>
    </section>
  );
}
