import React, { useMemo } from 'react';

const SHADES = [
  'bg-paper2 border border-line',
  'bg-[rgba(198,46,34,0.30)]',
  'bg-[rgba(198,46,34,0.55)]',
  'bg-[rgba(198,46,34,0.80)]',
  'bg-red',
];

/** Deterministic seeded fallback so the graph never renders empty while data loads/fails. */
function seededCells(count) {
  let seed = 42;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const cells = [];
  for (let i = 0; i < count; i++) {
    const v = rnd();
    let level = 0;
    if (v > 0.42) level = 1;
    if (v > 0.62) level = 2;
    if (v > 0.8) level = 3;
    if (v > 0.92) level = 4;
    cells.push({ level, date: null, count: null });
  }
  return cells;
}

export default function GitHubHeatmap({ contributions }) {
  const cells = useMemo(() => {
    if (!contributions || contributions.length === 0)
      return seededCells(52 * 7);

    const days = contributions.slice(-364);
    const firstDow = new Date(days[0]?.date).getDay();
    const padStart = firstDow === 0 ? 6 : firstDow - 1;
    const padded = [...Array(padStart).fill(null), ...days];
    while (padded.length < 52 * 7) padded.push(null);

    return padded.map((day) =>
      day
        ? { level: Math.min(day.level, 4), date: day.date, count: day.count }
        : { level: -1 }
    );
  }, [contributions]);

  return (
    <div
      className="grid gap-[3px] overflow-x-auto"
      style={{ gridTemplateRows: 'repeat(7,1fr)', gridAutoFlow: 'column' }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          title={
            cell.date
              ? `${cell.date}: ${cell.count} contribution${cell.count !== 1 ? 's' : ''}`
              : ''
          }
          className={`w-[11px] h-[11px] rounded-sm ${cell.level < 0 ? '' : SHADES[cell.level]}`}
        />
      ))}
    </div>
  );
}
