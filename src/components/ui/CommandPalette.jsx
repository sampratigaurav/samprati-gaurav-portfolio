import React, { useState, useEffect, useRef } from 'react';

const CommandPalette = ({ isDark, toggleTheme, onExecuteWipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    { id: 'work', label: 'Navigate: Work', type: 'nav' },
    { id: 'writing', label: 'Navigate: Writing', type: 'nav' },
    { id: 'theme', label: 'Toggle Theme', type: 'action' },
    { id: 'resume', label: 'Download Resume', type: 'action' },
    { id: 'wipe', label: 'Execute Wipe', type: 'danger' },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const executeAction = (action) => {
    setIsOpen(false);
    if (action.id === 'work') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action.id === 'writing') {
      document
        .getElementById('writing')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else if (action.id === 'theme') {
      if (toggleTheme) toggleTheme();
    } else if (action.id === 'resume') {
      window.open('/assets/resume.pdf', '_blank');
    } else if (action.id === 'wipe') {
      if (onExecuteWipe) onExecuteWipe();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredActions.length) % filteredActions.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        executeAction(filteredActions[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          background: isDark ? '#111' : '#fff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          borderRadius: '12px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <div
          style={{
            padding: '16px',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <input
            ref={inputRef}
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: isDark ? '#fff' : '#111',
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
        </div>
        <div style={{ padding: '8px' }}>
          {filteredActions.length === 0 ? (
            <div
              style={{
                padding: '16px',
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                textAlign: 'center',
                fontSize: '14px',
              }}
            >
              No results found.
            </div>
          ) : (
            filteredActions.map((action, i) => (
              <div
                key={action.id}
                onClick={() => executeAction(action)}
                onMouseEnter={() => setSelectedIndex(i)}
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background:
                    selectedIndex === i
                      ? isDark
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.05)'
                      : 'transparent',
                  borderRadius: '6px',
                  color:
                    action.type === 'danger'
                      ? '#ff4b4b'
                      : isDark
                        ? '#fff'
                        : '#111',
                  fontSize: '14px',
                }}
              >
                <span>{action.label}</span>
                {selectedIndex === i && (
                  <span style={{ fontSize: '12px', opacity: 0.5 }}>↵</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
