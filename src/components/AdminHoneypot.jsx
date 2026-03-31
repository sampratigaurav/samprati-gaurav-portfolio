import React, { useState } from 'react';

const AdminHoneypot = () => {
  const [isLockdown, setIsLockdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLockdown(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 3500);
  };

  if (isLockdown) {
    return (
      <div
        className="glitch-active"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          color: '#ff0000',
          fontFamily: 'monospace',
          padding: '40px',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontSize: '24px',
          lineHeight: '1.5',
        }}
      >
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div>{'> UNAUTHORIZED ACCESS ATTEMPT DETECTED.'}</div>
          <div
            style={{
              animation: 'blink 1s step-end infinite',
              animationDelay: '0.4s',
            }}
          >
            {'> LOGGING IP ADDRESS TO MAINFRAME...'}
          </div>
          <div
            style={{
              animation: 'blink 1s step-end infinite',
              animationDelay: '0.8s',
            }}
          >
            {'> INITIATING LOCKDOWN...'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          background: '#242424',
          padding: '40px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid #333',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              color: '#fff',
              fontSize: '24px',
              fontWeight: '500',
              margin: 0,
            }}
          >
            Corporate Gateway
          </h2>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>
            Authorized Personnel Only
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label
              style={{
                display: 'block',
                color: '#aaa',
                fontSize: '13px',
                marginBottom: '8px',
              }}
            >
              Username
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '12px',
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                color: '#aaa',
                fontSize: '13px',
                marginBottom: '8px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px',
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: '16px',
              padding: '12px',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '15px',
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHoneypot;
