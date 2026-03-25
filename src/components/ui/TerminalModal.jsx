import React, { useState, useRef, useCallback, useEffect } from 'react';

const TerminalModal = ({ isOpen, onClose, isDark, onExecuteWipe }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: 'system',
      text: "samprati@portfolio:~$ type 'help' to see available commands",
    },
  ]);
  const terminalInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => terminalInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleTerminalCommand = useCallback(
    (cmd) => {
      const c = cmd.trim().toLowerCase();
      const newHistory = [
        ...terminalHistory,
        { type: 'input', text: `samprati@portfolio:~$ ${cmd}` },
      ];

      const responses = {
        help: [
          '  whoami          → who is Samprati?',
          '  ls projects     → list all projects',
          '  cat resume      → open resume',
          '  contact         → get contact info',
          '  cat public.key  → fetch my PGP public key',
          '  clear           → clear terminal',
          '  exit            → close terminal',
          '  rm -rf /        → ██████████████████',
        ].join('\n'),
        whoami:
          '  Samprati Gaurav — 2nd year Cybersecurity undergrad at DSU Bengaluru.\n  Builder. Writer. Learning in public.\n  github.com/sampratigaurav',
        'ls projects':
          '  syncwatch/     → real-time video sync app\n  [more coming soon...]',
        ls: '  syncwatch/     → real-time video sync app\n  [more coming soon...]',
        'cat resume': '  Opening resume...',
        contact:
          '  email  → sampratigaurav123@gmail.com\n  github → github.com/sampratigaurav\n  x      → @Sampratigaurav0\n  blog   → sampratigaurav.hashnode.dev',
        'cat public.key':
          '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nmQINB... [USER: Replace with your actual PGP block later] ...\n\n-----END PGP PUBLIC KEY BLOCK-----\n\n[ To send encrypted mail: encrypt message and send to sampratigaurav123@gmail.com ]',
        exit: '__EXIT__',
        clear: '__CLEAR__',
      };

      if (c === 'clear') {
        setTerminalHistory([
          {
            type: 'system',
            text: "samprati@portfolio:~$ type 'help' to see available commands",
          },
        ]);
        setTerminalInput('');
        return;
      }
      if (c === 'exit') {
        onClose();
        setTerminalInput('');
        return;
      }
      if (c === 'rm -rf /' || c === 'sudo wipe') {
        setTerminalHistory([
          ...newHistory,
          {
            type: 'output',
            text: '> CRITICAL WARNING: Executing root wipe...',
          },
        ]);
        setTerminalInput('');
        setTimeout(() => {
          onClose();
          if (onExecuteWipe) onExecuteWipe();
        }, 800);
        return;
      }
      if (c === 'cat resume') {
        window.open('/assets/resume.pdf', '_blank');
      }

      const output =
        responses[c] ??
        `  command not found: ${cmd}. Type 'help' for available commands.`;
      setTerminalHistory([...newHistory, { type: 'output', text: output }]);
      setTerminalInput('');
    },
    [terminalHistory, onClose]
  );

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

  if (!isOpen) return null;

  return (
    <div
      onClick={() => terminalInputRef.current?.focus()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '12px',
          overflow: 'hidden',
          fontFamily: 'DM Mono, monospace',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div
              key={i}
              onClick={i === 0 ? onClose : undefined}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: c,
                cursor: i === 0 ? 'pointer' : 'default',
              }}
            />
          ))}
          <span
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '12px',
              marginLeft: '8px',
            }}
          >
            samprati@portfolio — terminal
          </span>
        </div>
        {/* Output */}
        <div
          style={{
            padding: '16px',
            minHeight: '280px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontSize: '13px',
            lineHeight: '1.8',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          {terminalHistory.map((line, i) => (
            <div
              key={i}
              style={{
                color:
                  line.type === 'input'
                    ? '#fff'
                    : line.type === 'system'
                      ? 'rgba(255,255,255,0.35)'
                      : '#4ade80',
                whiteSpace: 'pre-wrap',
                marginBottom: '2px',
              }}
            >
              {line.text}
            </div>
          ))}
        </div>
        {/* Input */}
        <div
          style={{
            padding: '8px 16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              whiteSpace: 'nowrap',
            }}
          >
            samprati@portfolio:~$
          </span>
          <input
            ref={terminalInputRef}
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTerminalCommand(terminalInput);
              if (e.key === 'Escape') onClose();
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '13px',
              fontFamily: 'DM Mono, monospace',
              caretColor: '#4ade80',
              cursor: 'none',
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        press ESC or ` to close
      </div>
    </div>
  );
};

export default TerminalModal;
