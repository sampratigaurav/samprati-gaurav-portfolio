import React from 'react';

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/** Static full-viewport noise texture. Never animated — see handoff perf notes. */
export default function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 z-[9997] pointer-events-none"
      style={{ opacity: 0.05, backgroundImage: `url("${GRAIN_SVG}")` }}
    />
  );
}
