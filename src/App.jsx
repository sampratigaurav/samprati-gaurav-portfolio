import React, { useState, useEffect, useRef, useCallback } from 'react';
import SpotlightBackground from './components/SpotlightBackground';
import ProgressBar from './components/ProgressBar';
import TypingHeadline from './components/TypingHeadline';

const LiveClock = React.memo(({ isDark }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div style={{
      fontSize: '13px',
      color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
      fontFamily: 'DM Mono, monospace',
      letterSpacing: '0.5px',
      marginBottom: '8px',
      paddingBottom: '8px',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    }}>
      {time} <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginLeft: '4px' }}>IST</span>
    </div>
  );
});

const GitHubHeatmap = React.memo(({ contributions, contribTotal, isDark }) => {
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
          {(() => {
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
          })()}
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
/* ============================================================
   DATA
   ============================================================ */
const ALL_ARTICLES = [
  { title: 'The Pendrive Problem: Origins of Version Control', cat: 'Developer Tools', date: 'Jan 17, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/version-control-origins-of-the-pendrive-problem' },
  { title: 'How Git Works: What the .git Folder Does', cat: 'Developer Tools', date: 'Jan 17, 2026', readTime: '5 min read', url: 'https://sampratigaurav.hashnode.dev/inside-git-understanding-the-git-folder' },
  { title: "Git 101: The Developer's Essential Save Tool", cat: 'Developer Tools', date: 'Jan 26, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/git-basics-developers-essential-save-tool' },
  { title: 'cURL: Talk to Servers from Your Terminal', cat: 'Developer Tools', date: 'Jan 27, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/curl-basics-communicate-with-servers-via-terminal' },
  { title: "TCP vs UDP: The Internet's Traffic Rules", cat: 'Networking', date: 'Jan 27, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/tcp-vs-udp-internet-traffic-explained' },
  { title: "DNS Explained: The Internet's Phonebook", cat: 'Networking', date: 'Jan 27, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/understanding-dns-the-internets-phonebook' },
  { title: 'TCP Explained: How Your Data Always Arrives', cat: 'Networking', date: 'Jan 27, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/how-tcp-ensures-reliable-internet-data-transfer' },
  { title: 'DNS Anatomy: Tracing the Internet with dig', cat: 'Networking', date: 'Jan 27, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/understanding-dns-tracing-with-dig' },
  { title: 'Modems, Routers & Load Balancers Explained', cat: 'Networking', date: 'Jan 27, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/modems-routers-balancers-explained' },
  { title: 'How a Browser Works: Behind the Scenes', cat: 'Networking', date: 'Jan 27, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/understanding-how-browsers-work' },
  { title: 'HTML Basics: The Skeleton of the Web', cat: 'Web Dev', date: 'Jan 30, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/html-basics-webs-structural-foundation' },
  { title: 'CSS Selectors 101: Targeting Elements with Precision', cat: 'Web Dev', date: 'Jan 30, 2026', readTime: '3 min read', url: 'https://sampratigaurav.hashnode.dev/mastering-css-selectors-precise-element-targeting' },
  { title: "Stop Typing HTML: A Beginner's Guide to Emmet", cat: 'Web Dev', date: 'Jan 30, 2026', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/learn-emmet-simplify-html-coding' },
  { title: 'Why Your Fingerprint Reader May Not Work on Linux Mint', cat: 'Linux', date: 'Jul 19, 2025', readTime: '4 min read', url: 'https://sampratigaurav.hashnode.dev/troubleshooting-fingerprint-scanners-on-linux-mint' },
];

const projects = [
  {
    id: 'syncwatch',
    name: 'SyncWatch',
    tagline: 'Watch movies together. Perfectly in sync.',
    status: 'Live · Open Source',
    tags: ['TypeScript', 'WebSockets', 'Node.js', 'Vercel'],
    liveUrl: 'https://syncwatch-eosin.vercel.app/',
    githubUrl: 'https://github.com/sampratigaurav/syncwatch',
    year: '2026',
    duration: '2 weeks',
    role: 'Solo · Full Stack',
    problem: 'Every existing tool for watching movies together remotely either requires uploading your video to a server, paying for a subscription, creating an account, or all three. I wanted something completely free, completely private, and completely frictionless.',
    solution: 'SyncWatch never touches your video file. It only sends 3 things over WebSockets: play, pause, and seek + timestamp. Your 8GB movie stays entirely on your device. The server is just a signal forwarder.',
    thought: 'The insight was that you don\'t need to share the video — you just need to share the controls. Two people watching the same local file just need to know when to press play and when to pause. That\'s a few bytes of data, not gigabytes of video.',
    architecture: [
      { step: '01', title: 'Client A loads video', desc: 'Video file stays on device. Hash is computed to verify both users have the same file.' },
      { step: '02', title: 'WebSocket room created', desc: 'Server creates a room ID. Host shares link. No accounts, no auth.' },
      { step: '03', title: 'Control signals only', desc: 'Play/pause/seek events are forwarded by server. 3 signal types. That\'s it.' },
      { step: '04', title: 'Drift correction', desc: 'Every 5 seconds, host broadcasts timestamp. Guests within 500ms are fine. Outside → silent seek.' },
    ],
    metrics: [
      { val: '<500ms', label: 'max sync drift' },
      { val: '3', label: 'signal types' },
      { val: '0', label: 'bytes uploaded' },
      { val: '5s', label: 'correction interval' },
    ],
    learnings: 'I learned more about WebSocket lifecycle management in 2 weeks than I had in months of reading. The hardest part wasn\'t the sync — it was handling edge cases: what happens when one person refreshes? When the host leaves? When both seek simultaneously? Each edge case taught me something real about distributed systems.',
    techDeep: [
      { name: 'TypeScript', reason: 'Strict typing on WebSocket message shapes prevented entire categories of bugs.' },
      { name: 'WebSockets', reason: 'HTTP polling was too slow for sub-500ms sync. WS gave us persistent bidirectional channels.' },
      { name: 'Vercel', reason: 'Free tier, zero config deployment. The Node.js server runs as a serverless function.' },
    ],
  },
  {
    id: 'portfolio',
    name: 'This Portfolio',
    tagline: 'A portfolio that is itself a project.',
    status: 'Live · Open Source',
    tags: ['React', 'Vite', 'JavaScript', 'CSS'],
    liveUrl: 'https://samprati.dev',
    githubUrl: 'https://github.com/sampratigaurav/samprati-gaurav-portfolio',
    year: '2026',
    duration: '3 days',
    role: 'Solo · Design + Dev',
    problem: 'Most student portfolios are templates. They look the same, say the same things, and are forgotten immediately. I wanted a portfolio that was itself a demonstration of what I can build.',
    solution: 'Built entirely from scratch — no UI libraries, no templates. Every interaction, animation, and feature was written by hand. The site is the proof of work.',
    thought: 'I asked myself: what would make someone remember this site? The answer wasn\'t more content — it was more personality. A terminal easter egg, a cursor that reacts to speed, a live GitHub heatmap, section headings that scramble. Each feature is small but together they say: this person actually builds things.',
    architecture: [
      { step: '01', title: 'React + Vite', desc: 'No Next.js overhead. Pure Vite for sub-second HMR and optimised production builds.' },
      { step: '02', title: 'Zero UI libraries', desc: 'Every component hand-written. No Tailwind, no MUI, no Chakra. Full control over every pixel.' },
      { step: '03', title: 'Live APIs', desc: 'GitHub contributions API, Hashnode GraphQL API, CounterAPI for visitors. All real-time.' },
      { step: '04', title: 'Performance', desc: 'Lighthouse 91/90/92/100. Memoized components, RAF-throttled events, vendor chunk splitting.' },
    ],
    metrics: [
      { val: '91', label: 'lighthouse performance' },
      { val: '100', label: 'lighthouse SEO' },
      { val: '3', label: 'live APIs' },
      { val: '0', label: 'UI libraries used' },
    ],
    learnings: 'Building in public forced me to think about every decision twice. Why this font? Why this animation timing? Why this layout? I developed a design instinct I didn\'t have before. The most important lesson: personality beats polish.',
    techDeep: [
      { name: 'React', reason: 'Component model made managing 20+ interactive features tractable without chaos.' },
      { name: 'CSS Custom Properties', reason: 'Dark/light/system themes with zero JS — just variable swaps.' },
      { name: 'IntersectionObserver', reason: 'Scroll animations without scroll event listeners. Better performance, cleaner code.' },
    ],
  },
];

const tabs = ['For Anyone', 'For Recruiters', 'For Engineers', 'For Writers'];
const sections = ['intro', 'work', 'writing', 'certs', 'about', 'contact'];
const navLabels = ['Intro', 'Work', 'Writing', 'Certs', 'About', 'Contact'];

const certs = [
  { issuer: 'Codecademy', name: 'Command Line Course', date: 'Jul 2025', tag: 'Developer Tools' },
  { issuer: 'Codecademy', name: 'Fundamentals of Cybersecurity', date: 'Jul 2025', tag: 'Cybersecurity' },
  { issuer: 'Deloitte × Forage', name: 'Cyber Job Simulation', date: 'Nov 2025', tag: 'Cybersecurity' },
  { issuer: 'Cisco Networking Academy', name: 'Introduction to Cybersecurity', date: 'Feb 2026', tag: 'Cybersecurity' },
  { issuer: 'MathWorks', name: 'MATLAB Onramp', date: '2025', tag: 'Programming' },
  { issuer: 'MathWorks', name: 'Make and Manipulate Matrices', date: '2025', tag: 'Mathematics' },
  { issuer: 'MathWorks', name: 'Calculations with Vectors & Matrices', date: '2025', tag: 'Mathematics' },
  { issuer: 'MathWorks', name: 'Solving ODEs with MATLAB', date: '2025', tag: 'Engineering' },
];

const HASHNODE_QUERY = `
  query {
    publication(host: "sampratigaurav.hashnode.dev") {
      posts(first: 3) {
        edges {
          node {
            title
            brief
            url
            publishedAt
          }
        }
      }
    }
  }
`;

/* ============================================================
   HEADLINE CONTENT PER TAB
   ============================================================ */
// HeroContent moved to TypingHeadline component

/* ============================================================
   GITHUB SVG ICON
   ============================================================ */
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const Cursor = React.memo(({ isDark }) => {
  const trailCount = 6;
  const trailRefs = useRef(Array.from({ length: trailCount }, () => React.createRef()));
  const positions = useRef(Array.from({ length: trailCount }, () => ({ x: -20, y: -20 })));
  const mouse = useRef({ x: -20, y: -20 });
  const rafRef = useRef(null);

  const lastPos = useRef({ x: -20, y: -20, time: Date.now() });
  const currentSpeed = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const now = Date.now();
      const dt = now - lastPos.current.time;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      currentSpeed.current = dt > 0 ? Math.min(distance / dt * 10, 1) : 0;
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      positions.current[0] = { ...mouse.current };
      for (let i = 1; i < trailCount; i++) {
        positions.current[i] = {
          x: positions.current[i].x + (positions.current[i-1].x - positions.current[i].x) * 0.45,
          y: positions.current[i].y + (positions.current[i-1].y - positions.current[i].y) * 0.45,
        };
      }
      
      const speed = currentSpeed.current;
      const leadSize = 4 + speed * 12; // 4px slow → 16px fast
      const trailFade = 0.3 + speed * 0.55; // faster = more visible trail
      
      trailRefs.current.forEach((ref, i) => {
        if (ref.current) {
          const size = i === 0 ? leadSize : Math.max(2, leadSize - i * 1.8);
          const opacity = i === 0 ? 0.9 : (1 - i / trailCount) * trailFade;
          ref.current.style.transform = `translate(${positions.current[i].x - size/2}px, ${positions.current[i].y - size/2}px)`;
          ref.current.style.width = `${size}px`;
          ref.current.style.height = `${size}px`;
          ref.current.style.opacity = opacity;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {Array.from({ length: trailCount }, (_, i) => (
        <div
          key={i}
          ref={trailRefs.current[i]}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            background: isDark ? '#ffffff' : '#111111',
            pointerEvents: 'none',
            zIndex: 999999,
            willChange: 'transform',
            mixBlendMode: 'normal',
          }}
        />
      ))}
    </>
  );
});

/* ============================================================
   APP
   ============================================================ */

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%&ABCDEFabcdef0123456789';

const scrambleText = (el, finalText, duration = 500) => {
  if (!el) return;
  let frame = 0;
  const totalFrames = Math.floor(duration / 30);
  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || char === '.') return char;
        if (frame / totalFrames > i / finalText.length) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
    frame++;
    if (frame >= totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 30);
};

const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth <= 768) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 80;

      if (distance < maxDist) {
        const pull = (1 - distance / maxDist) * strength;
        el.style.transform = `translate(${distX * pull}px, ${distY * pull}px)`;
        el.style.transition = 'transform 0.1s ease';
      }
    };

    const onMouseLeave = () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);
  return ref;
};

export default function App() {
  const getTimeGreeting = useCallback(() => {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hour = ist.getHours();
    if (hour >= 6 && hour < 12) return 'Good morning.';
    if (hour >= 12 && hour < 18) return 'Good afternoon.';
    if (hour >= 18 && hour < 24) return 'Good evening.';
    return "You're up late.";
  }, []);

  const [activeTab, setActiveTab] = useState('For Anyone');
  const [activeSection, setActiveSection] = useState('intro');
  const [heroKey, setHeroKey] = useState(0);
  const sectionRefs = useRef({});
  const [posts, setPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [contribTotal, setContribTotal] = useState(0);
  const [articleCount, setArticleCount] = useState(15);
  const [visitors, setVisitors] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [showKeyHint, setShowKeyHint] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: "samprati@portfolio:~$ type 'help' to see available commands" }
  ]);
  const terminalInputRef = useRef(null);
  const [lastCommit, setLastCommit] = useState(null);
  const [hoveredArticle, setHoveredArticle] = useState(null);

  /* ---- Easter Egg States ---- */
  const [keyBuffer, setKeyBuffer] = useState('');
  const [glitchActive, setGlitchActive] = useState(false);
  const [secretMessage, setSecretMessage] = useState(false);

  const [logoClicks, setLogoClicks] = useState(0);
  const [logoShake, setLogoShake] = useState(false);

  const [rageClicks, setRageClicks] = useState(0);
  const [ragePos, setRagePos] = useState({ x: 0, y: 0 });
  const [showRageToast, setShowRageToast] = useState(false);
  const rageTimer = useRef(null);

  const [greeting, setGreeting] = useState(() => {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hour = ist.getHours();
    if (hour >= 6 && hour < 12) return 'Good morning.';
    if (hour >= 12 && hour < 18) return 'Good afternoon.';
    if (hour >= 18 && hour < 24) return 'Good evening.';
    return "You're up late.";
  });

  const [timeOnSite, setTimeOnSite] = useState(0);
  const siteStartTime = useRef(Date.now());

  const [endToastShown, setEndToastShown] = useState(false);
  const [showEndToast, setShowEndToast] = useState(false);

  const [showCopyToast, setShowCopyToast] = useState(false);

  const logoRef = useMagnetic(0.35);
  const themeRef = useMagnetic(0.3);
  const tabRefs = [useMagnetic(0.25), useMagnetic(0.25), useMagnetic(0.25), useMagnetic(0.25)];
  const socialRefs = [useMagnetic(0.25), useMagnetic(0.25), useMagnetic(0.25), useMagnetic(0.25)];

  const [scrollY, setScrollY] = useState(0);

  const [activeProject, setActiveProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openProject = useCallback((project) => {
    setActiveProject(project);
    setModalVisible(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeProject = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setActiveProject(null);
      document.body.style.overflow = '';
    }, 400);
  }, []);

  const scrollSpy = useCallback(() => {
    const current = sections.find(id => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= -100 && rect.top <= window.innerHeight / 2;
    });
    if (current) setActiveSection(current);
  }, []);

  useEffect(() => {
    let rafId;
    const updateScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        scrollSpy();
      });
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollSpy]);

  // mousemove logic for spotlight moved to colocation component

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowKeyHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() - siteStartTime.current) / 60000);
      setTimeOnSite(minutes);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !endToastShown) {
            setEndToastShown(true);
            setShowEndToast(true);
            setTimeout(() => setShowEndToast(false), 3000);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, [endToastShown]);

  useEffect(() => {
    const handleCopy = (e) => {
      // Don't trigger if copying from terminal input or search input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      const selectedText = window.getSelection()?.toString().trim();
      if (!selectedText || selectedText.length < 10) return;

      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 3000);
    };

    document.addEventListener('copy', handleCopy);
    return () => document.removeEventListener('copy', handleCopy);
  }, []);



  useEffect(() => {
    const sections = ['intro', 'work', 'writing', 'certs', 'about', 'contact'];
    const tabKeys = ['1', '2', '3', '4'];
    const tabValues = ['For Anyone', 'For Recruiters', 'For Engineers', 'For Writers'];

    const handleKey = (e) => {
      // Secret word detection — type "samprati" anywhere
      setKeyBuffer(prev => {
        const next = (prev + e.key).slice(-8).toLowerCase();
        if (next === 'samprati') {
          triggerSecretWord();
          return '';
        }
        return next;
      });

      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
        setTimeout(() => terminalInputRef.current?.focus(), 50);
        return;
      }
      if (e.key === 'Escape') { 
        if (modalVisible) { closeProject(); return; }
        setTerminalOpen(false); 
        return; 
      }
      if (e.target.tagName === 'INPUT') return;

      if (tabKeys.includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        setActiveTab(tabValues[idx]);
        document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
      }

      if (e.key === 'j' || e.key === 'J') {
        const currentIndex = sections.findIndex(id => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= window.innerHeight / 2;
        });
        const next = sections[Math.min(currentIndex + 1, sections.length - 1)];
        document.getElementById(next)?.scrollIntoView({ behavior: 'smooth' });
      }

      if (e.key === 'k' || e.key === 'K') {
        const currentIndex = sections.findIndex(id => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= window.innerHeight / 2;
        });
        const prev = sections[Math.max(currentIndex - 1, 0)];
        document.getElementById(prev)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalVisible, closeProject]);

  // typing headline logic moved to colocation component

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('section-heading') && entry.target.dataset.final && !entry.target.dataset.scrambled) {
              entry.target.dataset.scrambled = 'true';
              scrambleText(entry.target, entry.target.dataset.final, 600);
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.section-heading, .section-content').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.background = isDark ? '#000' : '#f5f5f0';
    document.body.style.color = isDark ? '#fff' : '#111';
    
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/sampratigaurav-portfolio/visits/up');
        const data = await res.json();
        setVisitors(data.count);
      } catch {
        setVisitors(null);
      }
    };
    fetchVisitors();
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/sampratigaurav?y=last');
        const data = await res.json();
        setContributions(data.contributions);
        setContribTotal(data.total.lastYear ?? Object.values(data.total).reduce((a, b) => a + b, 0));
      } catch {
        setContributions([]);
      }
    };
    fetchContributions();
  }, []);



  /* ---- Last commit fetch (Feature 2) ---- */
  useEffect(() => {
    fetch('https://api.github.com/repos/sampratigaurav/syncwatch/commits?per_page=1')
      .then(r => r.json())
      .then(data => {
        if (data[0]) {
          const msg = data[0].commit.message.split('\n')[0];
          const date = new Date(data[0].commit.author.date);
          const now = new Date();
          const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
          const timeAgo = diffDays === 0 ? 'today' : diffDays === 1 ? 'yesterday' : `${diffDays} days ago`;
          setLastCommit({ msg, timeAgo });
        }
      })
      .catch(() => {});
  }, []);

  /* ---- Terminal command handler (Feature 1) ---- */
  const handleTerminalCommand = useCallback((cmd) => {
    const c = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, { type: 'input', text: `samprati@portfolio:~$ ${cmd}` }];

    const responses = {
      help: [
        '  whoami          → who is Samprati?',
        '  ls projects     → list all projects',
        '  cat resume      → open resume',
        '  contact         → get contact info',
        '  clear           → clear terminal',
        '  exit            → close terminal',
      ].join('\n'),
      whoami: '  Samprati Gaurav — 2nd year Cybersecurity undergrad at DSU Bengaluru.\n  Builder. Writer. Learning in public.\n  github.com/sampratigaurav',
      'ls projects': '  syncwatch/     → real-time video sync app\n  [more coming soon...]',
      'ls': '  syncwatch/     → real-time video sync app\n  [more coming soon...]',
      'cat resume': '  Opening resume...',
      contact: '  email  → sampratigaurav123@gmail.com\n  github → github.com/sampratigaurav\n  x      → @Sampratigaurav0\n  blog   → sampratigaurav.hashnode.dev',
      exit: '__EXIT__',
      clear: '__CLEAR__',
    };

    if (c === 'clear') {
      setTerminalHistory([{ type: 'system', text: "samprati@portfolio:~$ type 'help' to see available commands" }]);
      setTerminalInput('');
      return;
    }
    if (c === 'exit') {
      setTerminalOpen(false);
      setTerminalInput('');
      return;
    }
    if (c === 'cat resume') {
      window.open('/assets/resume.pdf', '_blank');
    }

    const output = responses[c] ?? `  command not found: ${cmd}. Type 'help' for available commands.`;
    setTerminalHistory([...newHistory, { type: 'output', text: output }]);
    setTerminalInput('');
  }, [terminalHistory]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('sampratigaurav123@gmail.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, []);

  useEffect(() => {
    const fallbackPosts = ALL_ARTICLES.slice(0, 3).map(a => ({
      title: a.title,
      url: a.url,
      publishedAt: a.date
    }));

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: HASHNODE_QUERY }),
        });
        const data = await res.json();
        const fetchedPosts = data?.data?.publication?.posts?.edges?.map(e => e.node);
        if (fetchedPosts && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else {
          setPosts(fallbackPosts);
        }
      } catch {
        // fallback to static data if fetch fails
        setPosts(fallbackPosts);
      }
    };

    const fetchArticleCount = async () => {
      try {
        const res = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query {
                publication(host: "sampratigaurav.hashnode.dev") {
                  posts(first: 50) {
                    totalDocuments
                  }
                }
              }
            `
          }),
        });
        const data = await res.json();
        const count = data?.data?.publication?.posts?.totalDocuments;
        if (count) setArticleCount(count);
      } catch {
        // keep fallback 15
      }
    };

    fetchPosts();
    fetchArticleCount();
  }, []);



  /* ---- Feature 4 Rage Click Detector ---- */
  useEffect(() => {
    const handleClick = (e) => {
      // ignore clicks on interactive elements
      if (['BUTTON','A','INPUT'].includes(e.target.tagName)) return;

      setRagePos({ x: e.clientX, y: e.clientY });
      setRageClicks(prev => {
        const next = prev + 1;
        if (next >= 5) {
          setShowRageToast(true);
          setTimeout(() => setShowRageToast(false), 2500);
          clearTimeout(rageTimer.current);
          return 0;
        }
        clearTimeout(rageTimer.current);
        rageTimer.current = setTimeout(() => setRageClicks(0), 800);
        return next;
      });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  /* ---- Feature 1 Secret Word Action ---- */
  const triggerSecretWord = useCallback(() => {
    setGlitchActive(true);
    setSecretMessage(true);
    setTimeout(() => setGlitchActive(false), 600);
    setTimeout(() => setSecretMessage(false), 3000);
  }, []);

  /* ---- Feature 2 Confetti Generator ---- */
  const triggerConfetti = useCallback(() => {
    const colors = ['#ffffff', '#4ade80', '#a855f7', '#f59e0b', '#3b82f6'];
    const container = document.body;
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: 32px;
        top: 20px;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 99999;
        animation: confettiFly ${Math.random() * 1.5 + 1}s ease-out forwards;
        --tx: ${(Math.random() - 0.5) * 600}px;
        --ty: ${Math.random() * -400 - 100}px;
        --rot: ${Math.random() * 720}deg;
      `;
      container.appendChild(particle);
      setTimeout(() => particle.remove(), 2500);
    }
  }, []);

  /* ---- Tab switch handler ---- */
  const switchTab = (tab) => {
    setActiveTab(tab);
    setHeroKey((k) => k + 1);
  };

  /* ---- Smooth scroll ---- */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={glitchActive ? 'glitch-active' : ''} style={{ position: 'relative', zIndex: 1 }}>
      <div 
        className="gradient-bg" 
        style={{ 
          display: isDark ? 'block' : 'none', 
          transform: `translateY(${scrollY * 0.08}px)` 
        }} 
      />
      <SpotlightBackground isDark={isDark} />
      {secretMessage && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 99998,
          textAlign: 'center',
          pointerEvents: 'none',
          animation: 'fadeInOut 3s ease forwards',
        }}>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            you found me.
          </div>
          <div style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: '48px',
            fontStyle: 'italic',
            color: '#fff',
            lineHeight: 1,
          }}>
            Samprati Gaurav
          </div>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            marginTop: '12px',
            letterSpacing: '2px',
          }}>
            samprati.dev
          </div>
        </div>
      )}

      {showRageToast && (
        <div style={{
          position: 'fixed',
          left: Math.min(ragePos.x, window.innerWidth - 200),
          top: ragePos.y - 48,
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
          color: isDark ? '#fff' : '#111',
          padding: '8px 16px',
          borderRadius: '100px',
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          pointerEvents: 'none',
          zIndex: 9998,
          animation: 'fadeInOut 2.5s ease forwards',
          whiteSpace: 'nowrap',
        }}>
          easy there 😅
        </div>
      )}

      {showEndToast && (
        <div style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
          color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          padding: '10px 24px',
          borderRadius: '100px',
          fontSize: '13px',
          fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic',
          pointerEvents: 'none',
          zIndex: 9996,
          whiteSpace: 'nowrap',
          animation: 'fadeInOut 3s ease forwards',
        }}>
          you made it to the end.
        </div>
      )}

      {showCopyToast && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
          color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          padding: '10px 20px',
          borderRadius: '100px',
          fontSize: '13px',
          fontFamily: 'DM Sans, sans-serif',
          pointerEvents: 'none',
          zIndex: 9996,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'fadeInOut 3s ease forwards',
        }}>
          <span>sharing is caring</span>
          <a
            href="https://samprati.dev"
            target="_blank"
            rel="noreferrer"
            style={{
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
              textDecoration: 'none',
              fontSize: '12px',
              pointerEvents: 'all',
            }}
            onMouseEnter={e => e.target.style.color = '#4A9EFF'}
            onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
          >
            samprati.dev ↗
          </a>
        </div>
      )}

      <div className="grain-overlay" style={{ zIndex: 1 }} />
      <ProgressBar isDark={isDark} />
      {!isMobile && <Cursor isDark={isDark} />}
      <div style={{ 
        position: 'fixed', 
        bottom: showToast ? '40px' : '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', 
        backdropFilter: 'blur(12px)', 
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, 
        color: isDark ? '#fff' : '#111', 
        padding: '10px 20px', 
        borderRadius: '100px', 
        fontSize: '13px', 
        fontFamily: 'DM Sans, sans-serif', 
        letterSpacing: '0.3px', 
        opacity: showToast ? 1 : 0, 
        pointerEvents: 'none', 
        zIndex: 9998, 
        transition: 'opacity 0.3s ease, bottom 0.3s ease', 
      }}> 
        ✓ Email copied to clipboard 
      </div>
      <div style={{ 
        position: 'fixed', 
        bottom: '80px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center', 
        background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', 
        backdropFilter: 'blur(12px)', 
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, 
        borderRadius: '100px', 
        padding: '8px 16px', 
        fontSize: '11px', 
        fontFamily: 'DM Sans, sans-serif', 
        color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', 
        pointerEvents: 'none', 
        zIndex: 9996, 
        opacity: showKeyHint ? 1 : 0, 
        transition: 'opacity 0.6s ease', 
        whiteSpace: 'nowrap', 
      }}> 
        {['1','2','3','4'].map(k => ( 
          <span key={k} style={{ 
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', 
            borderRadius: '4px', 
            padding: '2px 7px', 
            fontFamily: 'DM Mono, monospace', 
            fontSize: '11px', 
          }}>{k}</span> 
        ))} 
        <span>switch tabs</span> 
        <span style={{ margin: '0 4px', opacity: 0.3 }}>·</span> 
        {['J','K'].map(k => ( 
          <span key={k} style={{ 
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', 
            borderRadius: '4px', 
            padding: '2px 7px', 
            fontFamily: 'DM Mono, monospace', 
            fontSize: '11px', 
          }}>{k}</span> 
        ))} 
        <span>navigate sections</span> 
        <span style={{ margin: '0 4px', opacity: 0.3 }}>·</span>
        <span style={{
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          borderRadius: '4px',
          padding: '2px 7px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
        }}>`</span>
        <span>terminal</span>
      </div>
      <button ref={themeRef} className="theme-toggle" onClick={() => setIsDark(d => !d)} style={{ right: isMobile ? '16px' : '32px' }}>
        {isDark ? '◐' : '◑'}
      </button>

      {/* ========== TOP BAR ========== */}
      <header className="topbar">
        <a 
          ref={logoRef}
          className={`topbar-logo ${logoShake ? 'logo-shake' : ''}`} 
          href="#intro" 
          onClick={(e) => {
            e.preventDefault();
            const newCount = logoClicks + 1;
            setLogoClicks(newCount);

            if (newCount === 3) {
              setLogoShake(true);
              setTimeout(() => setLogoShake(false), 400);
            }
            if (newCount === 7) {
              setTerminalOpen(true);
              setTerminalHistory(prev => [...prev, {
                type: 'system',
                text: 'samprati@portfolio:~$ okay okay I see you 👀'
              }]);
              setTimeout(() => terminalInputRef.current?.focus(), 50);
            }
            if (newCount === 10) {
              triggerConfetti();
              setLogoClicks(0);
            }

            // still navigate to intro on first click
            if (newCount === 1) {
              document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
            }
          }} 
          style={{ color: isDark ? '#fff' : '#111' }}
        >
          S
        </a>
        <div className="topbar-tabs" style={{ display: isMobile ? 'none' : 'flex' }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              ref={tabRefs[i]}
              className={`tab-btn${activeTab === t ? ' active' : ''}`}
              onClick={() => switchTab(t)}
              style={{ color: activeTab === t ? (isDark ? '#fff' : '#111') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)') }}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* ========== LEFT SIDEBAR / MOBILE BOTTOM NAV ========== */}
      {isMobile ? (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          background: isDark ? 'rgba(0,0,0,0.92)' : 'rgba(245,245,240,0.92)',
          backdropFilter: 'blur(12px)',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 1000,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
          {['Intro','Work','Writing','Certs','About','Contact'].map(section => (
            <button
              key={section}
              onClick={() => document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === section.toLowerCase()
                  ? (isDark ? '#fff' : '#111')
                  : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                fontSize: '11px',
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer',
                padding: '8px 4px',
                fontWeight: activeSection === section.toLowerCase() ? 500 : 300,
              }}
            >
              {section}
            </button>
          ))}
        </div>
      ) : (
        <nav className="sidebar" role="navigation" aria-label="Main navigation">
          {sections.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link${activeSection === id ? ' active' : ''}`}
              style={{
                animationDelay: `${0.3 + i * 0.1}s`,
                color: activeSection === id ? (isDark ? '#fff' : '#111') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                borderColor: activeSection === id ? (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') : 'transparent'
              }}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(id);
              }}
            >
              {navLabels[i]}
            </a>
          ))}
        </nav>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main className="main-content" style={{ marginLeft: isMobile ? '0' : '120px', paddingLeft: isMobile ? '24px' : '40px', paddingRight: isMobile ? '24px' : '80px', paddingBottom: isMobile ? '80px' : '0' }}>

        {/* ===== SECTION 1 — INTRO ===== */}
        <section id="intro" className="section">
          <div className="hero-wrapper">
            <div style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '12px',
              color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
              animation: 'fadeInGreeting 1s ease forwards',
              opacity: 0,
            }}>
              {greeting}
            </div>
            <TypingHeadline key={heroKey} activeTab={activeTab} isMobile={isMobile} isDark={isDark} articleCount={articleCount} />
            {isMobile && (
              <div className="tab-scroll" style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '4px',
                marginTop: '24px',
                marginBottom: '16px',
                scrollbarWidth: 'none',
              }}>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    style={{
                      whiteSpace: 'nowrap',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      border: `1px solid ${activeTab === tab
                        ? (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)')
                        : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                      background: 'transparent',
                      color: activeTab === tab
                        ? (isDark ? '#fff' : '#111')
                        : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
                      fontSize: '12px',
                      fontFamily: 'DM Sans, sans-serif',
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
            <a
              href="/assets/resume.pdf"
              download="Samprati_Gaurav_Resume.pdf"
              style={{
                fontSize: '13px',
                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
                textDecoration: 'underline',
                cursor: 'none',
              }}
            >
              Download Resume
            </a>
            <div className="scroll-arrow" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>▾</div>
          </div>
        </section>

        {/* ===== SECTION 2 — WORK ===== */}
        <section id="work" className="section">
          <h2 className="section-heading" data-final="work." style={{ color: isDark ? '#fff' : '#111', transform: `translateY(${-scrollY * 0.02}px)` }}>work.</h2>
          <div className="section-content">
            <div className="projects-stack">
              {projects.map((p, idx) => (
                <div key={p.name} onClick={() => openProject(p)} className="project-card" style={{ cursor: 'pointer', background: isDark ? 'transparent' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}` }}>
                  <div className="project-card-icons">
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                      🌐
                    </a>
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                      <GitHubIcon />
                    </a>
                  </div>
                  <div className="project-name" style={{ color: isDark ? '#fff' : '#111' }}>{p.name}</div>
                  <p className="project-desc" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{p.tagline}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>{t}</span>
                    ))}
                  </div>
                  {/* SyncWatch — last commit badge */}
                  {idx === 0 && lastCommit && (
                    <div style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      fontSize: '11px',
                      color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)',
                      fontFamily: 'DM Mono, monospace',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}>
                      <span style={{ color: '#4ade80' }}>↑</span>
                      <span>last commit:</span>
                      <span style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>"{lastCommit.msg}"</span>
                      <span>· {lastCommit.timeAgo}</span>
                    </div>
                  )}
                  {/* Portfolio — self-referential note */}
                  {idx === 1 && (
                    <div style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      fontSize: '11px',
                      color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)',
                      fontFamily: 'DM Mono, monospace',
                    }}>
                      ✦ you are currently viewing this project
                    </div>
                  )}
                </div>
              ))}
            </div>

            {contributions.length > 0 && (
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

                {/* Header — two lines, not one */}
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

                {/* Heatmap grid — 52 weeks × 7 days */}
                <div style={{ minWidth: 'max-content' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(52, 11px)',
                    gridTemplateRows: 'repeat(7, 11px)',
                    gap: '3px',
                    width: 'fit-content',
                    margin: '0 auto',
                  }}>
                    {(() => {
                      // Slice to exactly 52 weeks = 364 days, arrange column-first (Mon→Sun per column)
                      const days = contributions.slice(-364);
                      // Pad start so first column aligns to Monday
                      const firstDow = new Date(days[0]?.date).getDay(); // 0=Sun
                      const padStart = firstDow === 0 ? 6 : firstDow - 1; // convert to Mon=0
                      const padded = [...Array(padStart).fill(null), ...days];
                      // Fill to complete grid: 52
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
                    })()}
                  </div>
                </div>

                {/* Legend + link row */}
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
            )}
          </div>
        </section>

        {/* ===== SECTION 3 — WRITING ===== */}
        <section id="writing" className="section">
          <h2 className="section-heading" data-final="writing." style={{ color: isDark ? '#fff' : '#111', transform: `translateY(${-scrollY * 0.02}px)` }}>writing.</h2>
          <div className="section-content">
            <div className="articles-list" style={{ background: 'transparent' }}>
              <div style={{ marginBottom: '20px' }}> 
                <input 
                  type="text" 
                  placeholder="search articles..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`, 
                    outline: 'none', 
                    color: isDark ? '#fff' : '#111', 
                    fontSize: '13px', 
                    fontFamily: 'DM Sans, sans-serif', 
                    padding: '8px 0', 
                    width: '100%', 
                    caretColor: isDark ? '#fff' : '#111', 
                  }} 
                  onFocus={e => e.target.style.borderBottomColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} 
                  onBlur={e => e.target.style.borderBottomColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'} 
                /> 
              </div>
              {searchQuery === '' && ( 
                <div style={{ 
                  fontSize: '11px', 
                  color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)', 
                  fontFamily: 'DM Sans, sans-serif', 
                  marginTop: '-12px', 
                  marginBottom: '20px', 
                }}> 
                  search to explore all 14 articles 
                </div> 
              )}
              {(() => {
                const filteredArticles = searchQuery.trim() === '' 
                  ? (posts && posts.length > 0 ? posts : ALL_ARTICLES.slice(0, 3))
                  : ALL_ARTICLES.filter(a => 
                      a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      a.cat.toLowerCase().includes(searchQuery.toLowerCase()) 
                    );

                if (filteredArticles.length === 0) {
                  return (
                    <div style={{ 
                      padding: '24px 0', 
                      fontSize: '13px', 
                      color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', 
                      fontFamily: 'DM Sans, sans-serif', 
                    }}> 
                      no articles match "{searchQuery}" 
                    </div>
                  );
                }

                return filteredArticles.map((article, i) => {
                  const title = article.title;
                  const url = article.url;
                  const date = article.date 
                    ? article.date 
                    : article.publishedAt 
                      ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                      : '';
                  const cat = article.cat ?? 'HASHNODE';

                  return (
                    <a 
                      key={i} 
                      className="article-row" 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        background: 'transparent', 
                        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` 
                      }}
                      onMouseEnter={() => setHoveredArticle(i)}
                      onMouseLeave={() => setHoveredArticle(null)}
                    >
                      <div>
                        <div className="article-cat" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>{cat}</div>
                        <div className="article-title" style={{ color: isDark ? '#fff' : '#111' }}>{title}</div>
                        {hoveredArticle === i && (
                          <div style={{
                            fontSize: '11px',
                            color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                            fontFamily: 'DM Mono, monospace',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '6px',
                          }}>
                            <div style={{
                              width: '60px',
                              height: '2px',
                              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                              borderRadius: '2px',
                              overflow: 'hidden',
                            }}>
                              <div style={{
                                height: '100%',
                                background: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                                borderRadius: '2px',
                                width: '0%',
                                animation: 'readingBar 0.4s ease forwards',
                              }} />
                            </div>
                            {article.readTime ?? '3 min read'}
                          </div>
                        )}
                      </div>
                      <div className="article-right">
                        <span className="article-date" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>
                          {date}
                        </span>
                        <span className="article-arrow" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>→</span>
                      </div>
                    </a>
                  );
                });
              })()}
              <a
                href="https://sampratigaurav.hashnode.dev"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', textDecoration: 'none', display: 'block', marginTop: '32px' }}
              >
                All 15 articles on sampratigaurav.hashnode.dev ↗
              </a>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4 — CERTS ===== */}
        <section id="certs" className="section">
          <h2 className="section-heading" data-final="certs." style={{ color: isDark ? '#fff' : '#111', transform: `translateY(${-scrollY * 0.02}px)` }}>certs.</h2>
          <div className="section-content">
            <div className="articles-list" style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '1px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              {certs.map((cert, i) => (
                <div
                  key={i}
                  className="reveal-row"
                  style={{
                    transitionDelay: `${i * 0.06}s`,
                    background: isDark ? '#0a0a0a' : '#fafaf7',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '140px',
                    transition: 'background 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? '#111' : '#f0f0eb'}
                  onMouseLeave={e => e.currentTarget.style.background = isDark ? '#0a0a0a' : '#fafaf7'}
                >
                  {/* Top — issuer */}
                  <div style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '10px',
                    color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    {cert.issuer}
                  </div>

                  {/* Middle — cert name */}
                  <div style={{
                    fontSize: '15px',
                    color: isDark ? '#fff' : '#111',
                    lineHeight: 1.4,
                    fontWeight: 400,
                    flex: 1,
                  }}>
                    {cert.name}
                  </div>

                  {/* Bottom — date + tag */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  }}>
                    <span style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '11px',
                      color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)',
                    }}>
                      {cert.date}
                    </span>
                    <span style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '10px',
                      color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)',
                      background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      letterSpacing: '0.5px',
                    }}>
                      {cert.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 5 — ABOUT ===== */}
        <section id="about" className="section">
          <h2 className="section-heading" data-final="about." style={{ color: isDark ? '#fff' : '#111', transform: `translateY(${-scrollY * 0.02}px)`, marginBottom: '32px' }}>about.</h2>
          <div className="section-content">
            <div className="about-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '80px 120px' }}>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
                I'm a Cybersecurity undergrad at Dayananda Sagar University, Bengaluru. I got into
                tech because I was curious about how systems break — and I stayed because I realized I
                could build things that don't.
              </p>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
                I write on Hashnode because the clearest test of understanding is whether you can
                explain it simply. 15 technical articles and counting — on networking, git internals,
                web fundamentals, and whatever I'm currently figuring out.
              </p>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
                I competed in a 24-hour Techflix Hackathon at DSU. I learn in public on X, ship on
                GitHub, and I think the most dangerous combination in tech is curiosity paired with
                consistency.
              </p>
              <p style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)' }}>
                Building something from nothing and watching it actually work — that's what keeps me
                going. Most students wait to be ready. I don't.
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 5 — CONTACT ===== */}
        <section id="contact" className="section contact-section">
          <div style={{
            position: 'relative',
            width: '260px',
            height: '340px',
            margin: '0 auto 32px',
            background: isDark ? '#000' : '#f5f5f0',
          }}>
            <img
              src="/assets/avatar.png"
              alt="Samprati Gaurav"
              loading="lazy"
              decoding="async"
              onError={e => e.currentTarget.style.display = 'none'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
                filter: 'grayscale(100%)',
                WebkitMaskImage: isDark
                  ? 'linear-gradient(to bottom, black 40%, transparent 100%)'
                  : 'linear-gradient(to bottom, black 40%, transparent 100%)',
                maskImage: isDark
                  ? 'linear-gradient(to bottom, black 40%, transparent 100%)'
                  : 'linear-gradient(to bottom, black 40%, transparent 100%)',
              }}
            />
          </div>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span
              onClick={handleCopy}
              style={{
                fontSize: '18px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textDecorationColor: 'rgba(255,255,255,0.4)',
                color: isDark ? '#fff' : '#111',
                cursor: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#4A9EFF'}
              onMouseLeave={e => e.target.style.color = isDark ? '#fff' : '#111'}
            >
              sampratigaurav123@gmail.com
            </span>
            <a
              href="mailto:sampratigaurav123@gmail.com"
              style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontSize: '12px', textDecoration: 'none' }}
            >
              or open in mail ↗
            </a>
          </div>
          <div className="contact-status" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
            <span className="dot" /> status : active
          </div>
          <div className="contact-socials">
            <a ref={socialRefs[0]} href="https://www.linkedin.com/in/sampratigaurav/" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              LinkedIn
            </a>
            <a ref={socialRefs[1]} href="https://github.com/sampratigaurav" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              GitHub
            </a>
            <a ref={socialRefs[2]} href="https://x.com/Sampratigaurav0" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              X
            </a>
            <a ref={socialRefs[3]} href="https://sampratigaurav.hashnode.dev/" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              Hashnode
            </a>
          </div>
        </section>
      </main>

      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)',
        borderRadius: '10px',
        padding: '14px 18px',
        fontSize: '12px',
        fontFamily: 'DM Sans, sans-serif',
        color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
        maxWidth: '200px',
        lineHeight: '1.6',
        zIndex: 500,
        display: isMobile ? 'none' : 'block',
      }}>
        <div style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.4)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Currently</div>
        <LiveClock isDark={isDark} />
        <div style={{ color: isDark ? '#fff' : '#111', fontSize: '13px' }}>2nd year @ DSU</div>
        <div style={{ marginTop: '4px' }}>Studying Cybersecurity</div>
        <div style={{ marginTop: '4px' }}>Building in public</div>
        {visitors !== null && (
          <div style={{
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            fontSize: '11px',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)',
            fontFamily: 'DM Sans, sans-serif',
          }}>
            {visitors.toLocaleString()} visits
          </div>
        )}
        {timeOnSite >= 2 && (
          <div style={{
            marginTop: '10px',
            paddingTop: '10px',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            fontSize: '11px',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            fontFamily: 'DM Mono, monospace',
          }}>
            you've been here {timeOnSite} min
          </div>
        )}
      </div>
      {terminalOpen && (
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
          <div style={{
            width: '100%',
            maxWidth: '640px',
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            overflow: 'hidden',
            fontFamily: 'DM Mono, monospace',
          }}>
            {/* Title bar */}
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
                <div key={i} onClick={i===0 ? () => setTerminalOpen(false) : undefined} style={{ width:12, height:12, borderRadius:'50%', background:c, cursor: i===0 ? 'none' : 'default' }} />
              ))}
              <span style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginLeft:'8px' }}>samprati@portfolio — terminal</span>
            </div>
            {/* Output */}
            <div style={{
              padding: '16px',
              minHeight: '280px',
              maxHeight: '400px',
              overflowY: 'auto',
              fontSize: '13px',
              lineHeight: '1.8',
              color: 'rgba(255,255,255,0.8)',
            }}>
              {terminalHistory.map((line, i) => (
                <div key={i} style={{
                  color: line.type === 'input' ? '#fff' : line.type === 'system' ? 'rgba(255,255,255,0.35)' : '#4ade80',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '2px',
                }}>
                  {line.text}
                </div>
              ))}
            </div>
            {/* Input */}
            <div style={{
              padding: '8px 16px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', whiteSpace:'nowrap' }}>samprati@portfolio:~$</span>
              <input
                ref={terminalInputRef}
                value={terminalInput}
                onChange={e => setTerminalInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleTerminalCommand(terminalInput);
                  if (e.key === 'Escape') setTerminalOpen(false);
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
          <div style={{ position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)', fontSize:'11px', color:'rgba(255,255,255,0.2)', fontFamily:'DM Sans, sans-serif' }}>
            press ESC or ` to close
          </div>
        </div>
      )}

      {/* MODAL JSX */}
      {activeProject && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeProject(); }}
          style={{
            position: 'fixed',
            inset: 0,
            background: isDark ? 'rgba(0,0,0,0.97)' : 'rgba(245,245,240,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 100000,
            overflowY: 'auto',
            opacity: modalVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
            padding: '40px 20px',
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
                onClick={closeProject}
                style={{
                  background: 'none',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                  color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontFamily: "'Iosevka Charon Mono', monospace",
                  fontSize: '11px',
                  cursor: 'none',
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
                {activeProject.status}
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
                {activeProject.name}
              </h1>
              <p style={{
                fontFamily: "'Iosevka Charon Mono', monospace",
                fontSize: '22px',
                fontStyle: 'italic',
                fontWeight: 300,
                color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                marginBottom: '32px',
              }}>
                {activeProject.tagline}
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
                  { label: 'Year', val: activeProject.year },
                  { label: 'Duration', val: activeProject.duration },
                  { label: 'Role', val: activeProject.role },
                ].map((m, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontFamily: "'Iosevka Charon Mono', monospace", textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{m.label}</div>
                    <div style={{ fontSize: '14px', color: isDark ? '#fff' : '#111' }}>{m.val}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', fontFamily: "'Iosevka Charon Mono', monospace", textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>Stack</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {activeProject.tags.map(t => (
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
              {activeProject.metrics.map((m, i) => (
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
              <p style={{ fontSize: '17px', color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)', lineHeight: 1.85, fontFamily: "'Iosevka Charon Mono', monospace", fontStyle: 'italic' }}>{activeProject.problem}</p>
            </div>

            {/* Solution */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>The Solution</div>
              <p style={{ fontSize: '17px', color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)', lineHeight: 1.85, fontFamily: "'Iosevka Charon Mono', monospace", fontStyle: 'italic' }}>{activeProject.solution}</p>
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
              <p style={{ fontSize: '15px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>{activeProject.thought}</p>
            </div>

            {/* Architecture diagram */}
            <div style={{ marginBottom: '64px' }}>
              <div style={{ fontFamily: "'Iosevka Charon Mono', monospace", fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>How It Works</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {activeProject.architecture.map((a, i) => (
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
                      {i < activeProject.architecture.length - 1 && (
                        <div style={{ width: '1px', flex: 1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', margin: '6px 0' }} />
                      )}
                    </div>
                    {/* Right — content */}
                    <div style={{ paddingBottom: i < activeProject.architecture.length - 1 ? '28px' : '0' }}>
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
                {activeProject.techDeep.map((t, i) => (
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
              <p style={{ fontSize: '15px', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.85 }}>{activeProject.learnings}</p>
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
                href={activeProject.liveUrl}
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
                href={activeProject.githubUrl}
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
      )}
    </div>
  );
}
