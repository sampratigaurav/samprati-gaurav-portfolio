import React, { useMemo } from 'react';

const GitHubHeatmap = React.memo(({ contributions, contribTotal, isDark }) => {
  // UseMemo to prevent calculating the 364 days array on every render!
  const gridCells = useMemo(() => {
    if (!contributions || contributions.length === 0) return [];

    const days = contributions.slice(-364);
    const firstDow = new Date(days[0]?.date).getDay();
    const padStart = firstDow === 0 ? 6 : firstDow - 1;
    const padded = [...Array(padStart).fill(null), ...days];
    const colors = isDark
      ? ['rgba(255,255,255,0.04)', '#1a3a1a', '#2d6a2d', '#3d9e3d', '#4ade80']
      : ['rgba(0,0,0,0.07)', '#1a3a1a', '#2d6a2d', '#3d9e3d', '#4ade80'];
    const borders = isDark
      ? ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0.18)', 'rgba(74,222,128,0.4)']
      : ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.14)', 'rgba(0,0,0,0.18)', 'rgba(74,222,128,0.4)'];
    
    while (padded.length < 52 * 7) padded.push(null);

    return padded.map((day, i) => (
      <div
        key={i}
        title={day ? `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}` : ''}
        style={{
          width: '11px',
          height: '11px',
          borderRadius: '2px',
          background: day ? (colors[day.level] ?? colors[0]) : 'transparent',
          border: day ? `1px solid ${borders[day.level] ?? borders[0]}` : 'none',
          transition: 'transform 0.15s ease',
          cursor: day ? 'none' : 'default',
        }}
        onMouseEnter={e => { if (day) e.currentTarget.style.transform = 'scale(1.8)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      />
    ));
  }, [contributions, isDark]);

  return (
    <div style={{
      maxWidth: '760px',
      margin: '56px auto 0',
      padding: '28px 32px',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
      borderRadius: '12px',
      background: isDark ? 'transparent' : '#fff',
      overflowX: 'auto',
      overflowY: 'hidden',
      boxSizing: 'border-box',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '10px',
          color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: 'DM Sans, sans-serif',
          marginBottom: '6px',
        }}>
          GitHub Activity
        </div>
        <div style={{
          fontSize: '14px',
          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {contribTotal} contributions in the last year
        </div>
      </div>

      <div style={{ minWidth: 'max-content' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(52, 11px)',
          gridTemplateRows: 'repeat(7, 11px)',
          gap: '3px',
          width: 'fit-content',
          margin: '0 auto',
        }}>
          {gridCells}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '14px',
      }}>
        <a
          href="https://github.com/sampratigaurav"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#4A9EFF'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
        >
          github.com/sampratigaurav ↗
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)', fontFamily: 'DM Sans, sans-serif' }}>Less</span>
          {(isDark ? ['rgba(255,255,255,0.04)','#1a3a1a','#2d6a2d','#3d9e3d','#4ade80'] : ['rgba(0,0,0,0.07)','#1a3a1a','#2d6a2d','#3d9e3d','#4ade80']).map((c, i) => (
            <div key={i} style={{
              width: '11px', height: '11px',
              borderRadius: '2px',
              background: c,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
            }} />
          ))}
          <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)', fontFamily: 'DM Sans, sans-serif' }}>More</span>
        </div>
      </div>
    </div>
  );
});

export default GitHubHeatmap;
