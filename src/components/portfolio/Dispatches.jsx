import React from 'react';
import { Reveal, Eyebrow } from './primitives';
import GitHubHeatmap from '../GitHubHeatmap';
import { useGitHubContributions } from '../../hooks/usePortfolioData';
import { DISPATCH_STATS } from '../../data/portfolioContent';

const LEGEND_SHADES = [
  'bg-paper2 border border-line',
  'bg-[rgba(198,46,34,0.35)]',
  'bg-[rgba(198,46,34,0.65)]',
  'bg-red',
];

export default function Dispatches() {
  const { contributions } = useGitHubContributions();

  return (
    <section
      id="writing"
      className="relative z-2 bg-paper2 border-y-[1.5px] border-ink"
    >
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vh,110px)]">
        <Reveal>
          <Eyebrow className="mb-3">05 / Dispatches</Eyebrow>
        </Reveal>
        <Reveal
          as="h2"
          className="font-serif font-normal text-[clamp(32px,5vw,64px)] mb-3"
        >
          Writing &amp; open source
        </Reveal>
        <Reveal
          as="p"
          className="max-w-[620px] mb-10 text-base leading-[1.6] text-ink2"
        >
          15+ technical articles on networking — TCP/IP, DNS, HTTP — plus Linux
          and dev tooling, published on Hashnode. All in public.
        </Reveal>

        <div className="grid grid-cols-[0.8fr_1.2fr] max-[860px]:grid-cols-1 gap-[clamp(24px,4vw,52px)] items-center">
          <div className="flex flex-col gap-[22px]">
            {DISPATCH_STATS.map((stat, i) => (
              <Reveal
                key={stat.caption}
                className={`flex items-baseline gap-[14px] ${
                  i < DISPATCH_STATS.length - 1
                    ? 'border-b border-line pb-4'
                    : ''
                }`}
              >
                <span
                  className={`font-serif text-[clamp(46px,6vw,76px)] leading-[0.8] ${
                    stat.accent ? 'text-red' : ''
                  }`}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-ink2 tracking-[0.05em] whitespace-pre-line">
                  {stat.caption.replace(' ', '\n')}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal className="border-[1.5px] border-ink bg-paper p-[18px] shadow-[8px_8px_0_var(--color-ink)]">
            <div className="flex justify-between items-center mb-[14px] font-mono text-[11px] text-ink2">
              <span>CONTRIBUTION GRAPH</span>
              <span className="text-red">● 2026</span>
            </div>
            <GitHubHeatmap contributions={contributions} />
            <div className="flex gap-2 items-center justify-end mt-3 font-mono text-[10px] text-ink2">
              Less
              {LEGEND_SHADES.map((shade, i) => (
                <span key={i} className={`w-[10px] h-[10px] ${shade}`} />
              ))}
              More
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
