import React, { useEffect, useState } from 'react';

const ProjectModal = ({ project, isOpen, onClose, isDark }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        background: isDark ? 'rgba(0,0,0,0.97)' : 'rgba(245,245,240,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 100000,
        overflowY: 'auto',
        opacity: isVisible && isOpen ? 1 : 0,
        transition: 'opacity 0.4s ease',
        padding: '40px 20px',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: "'Iosevka Charon Mono', monospace",
      }}>

        {/* Close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
        }}>
          <span style={{
            fontFamily: "'Iosevka Charon Mono', monospace",
            fontSize: '11px',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Case Study
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              borderRadius: '6px',
              padding: '6px 14px',
              fontFamily: "'Iosevka Charon Mono', monospace",
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'; e.target.style.color = isDark ? '#fff' : '#111'; }}
            onMouseLeave={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'; e.target.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'; }}
          >
            ESC to close ✕
          </button>
        </div>

        {/* Hero */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontFamily: "'Iosevka Charon Mono', monospace",
            fontSize: '11px',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {project.status}
          </div>
          <h1 style={{
            fontFamily: "'Iosevka Charon Mono', monospace",
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: isDark ? '#fff' : '#111',
            lineHeight: 1,
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>
            {project.name}
          </h1>
          <p style={{
            fontFamily: "'Iosevka Charon Mono', monospace",
            fontSize: '22px',
            fontStyle: 'italic',
            fontWeight: 300,
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            marginBottom: '32px',
          }}>
            {project.tagline}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            paddingTop: '24px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          }}>
            {[
              { label: 'Year', val: project.year },
              { label: 'Duration', val: project.duration },
              { label: 'Role', val: project.role },
            ].map((m, i) => (
              <div key={i}>
                <div style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontFamily: "'Iosevka Charon Mono', monospace", textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{m.label}</div>
                <div style={{ fontSize: '14px', color: isDark ? '#fff' : '#111' }}>{m.val}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontFamily: "'Iosevka Charon Mono', monospace", textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Stack</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {project.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontFamily: "'Iosevka Charon Mono', monospace", background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '4px' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '64px',
        }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '10px',
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '32px', fontStyle: 'italic', color: isDark ? '#fff' : '#111', lineHeight: 1, marginBottom: '6px' }}>{m.val}</div>
              <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '1px' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Problem</div>
          <p style={{ fontSize: '17px', color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)', lineHeight: 1.85, fontFamily: "'Iosevka Charon Mono', monospace", fontStyle: 'italic' }}>{project.problem}</p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Solution</div>
          <p style={{ fontSize: '17px', color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)', lineHeight: 1.85, fontFamily: "'Iosevka Charon Mono', monospace", fontStyle: 'italic' }}>{project.solution}</p>
        </div>

        {/* Thought process */}
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          borderLeft: `3px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
          borderRadius: '0 10px 10px 0',
          padding: '24px 28px',
          marginBottom: '64px',
        }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>My Thought Process</div>
          <p style={{ fontSize: '15px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>{project.thought}</p>
        </div>

        {/* Architecture diagram */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>How It Works</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {project.architecture.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '0', alignItems: 'stretch' }}>
                {/* Left — step number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '24px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Iosevka Charon Mono', monospace",
                    fontSize: '11px',
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                    flexShrink: 0,
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  }}>
                    {a.step}
                  </div>
                  {i < project.architecture.length - 1 && (
                    <div style={{ width: '1px', flex: 1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', margin: '6px 0' }} />
                  )}
                </div>
                {/* Right — content */}
                <div style={{ paddingBottom: i < project.architecture.length - 1 ? '28px' : '0' }}>
                  <div style={{ fontSize: '15px', color: isDark ? '#fff' : '#111', fontWeight: 500, marginBottom: '6px', marginTop: '6px' }}>{a.title}</div>
                  <div style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', lineHeight: 1.7, fontFamily: "'Iosevka Charon Mono', monospace" }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech deep dive */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Technical Decisions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {project.techDeep.map((t, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '20px',
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '10px',
                padding: '16px 20px',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: "'Iosevka Charon Mono', monospace",
                  fontSize: '12px',
                  color: isDark ? '#fff' : '#111',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>{t.name}</div>
                <div style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>{t.reason}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Learnings */}
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>What I Learned</div>
          <p style={{ fontSize: '15px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.85 }}>{project.learnings}</p>
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          gap: '12px',
          paddingTop: '32px',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          marginBottom: '80px',
        }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#000',
              borderRadius: '6px',
              fontFamily: "'Iosevka Charon Mono', monospace",
              fontSize: '12px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            ↗ View Live
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 24px',
              background: 'transparent',
              color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
              borderRadius: '6px',
              fontFamily: "'Iosevka Charon Mono', monospace",
              fontSize: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'; e.target.style.color = isDark ? '#fff' : '#111'; }}
            onMouseLeave={e => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'; e.target.style.color = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'; }}
          >
            GitHub ↗
          </a>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
