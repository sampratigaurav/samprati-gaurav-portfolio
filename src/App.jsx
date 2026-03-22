import { useState, useEffect, useRef } from 'react';

/* ============================================================
   DATA
   ============================================================ */
const ALL_ARTICLES = [
  { title: 'The Pendrive Problem: Origins of Version Control', cat: 'Developer Tools', date: 'Jan 17, 2026', url: 'https://sampratigaurav.hashnode.dev/version-control-origins-of-the-pendrive-problem' },
  { title: 'How Git Works: What the .git Folder Does', cat: 'Developer Tools', date: 'Jan 17, 2026', url: 'https://sampratigaurav.hashnode.dev/inside-git-understanding-the-git-folder' },
  { title: "Git 101: The Developer's Essential Save Tool", cat: 'Developer Tools', date: 'Jan 26, 2026', url: 'https://sampratigaurav.hashnode.dev/git-basics-developers-essential-save-tool' },
  { title: 'cURL: Talk to Servers from Your Terminal', cat: 'Developer Tools', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/curl-basics-communicate-with-servers-via-terminal' },
  { title: "TCP vs UDP: The Internet's Traffic Rules", cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/tcp-vs-udp-internet-traffic-explained' },
  { title: "DNS Explained: The Internet's Phonebook", cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/understanding-dns-the-internets-phonebook' },
  { title: 'TCP Explained: How Your Data Always Arrives', cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/how-tcp-ensures-reliable-internet-data-transfer' },
  { title: 'DNS Anatomy: Tracing the Internet with dig', cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/understanding-dns-tracing-with-dig' },
  { title: 'Modems, Routers & Load Balancers Explained', cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/modems-routers-balancers-explained' },
  { title: 'How a Browser Works: Behind the Scenes', cat: 'Networking', date: 'Jan 27, 2026', url: 'https://sampratigaurav.hashnode.dev/understanding-how-browsers-work' },
  { title: 'HTML Basics: The Skeleton of the Web', cat: 'Web Dev', date: 'Jan 30, 2026', url: 'https://sampratigaurav.hashnode.dev/html-basics-webs-structural-foundation' },
  { title: 'CSS Selectors 101: Targeting Elements with Precision', cat: 'Web Dev', date: 'Jan 30, 2026', url: 'https://sampratigaurav.hashnode.dev/mastering-css-selectors-precise-element-targeting' },
  { title: "Stop Typing HTML: A Beginner's Guide to Emmet", cat: 'Web Dev', date: 'Jan 30, 2026', url: 'https://sampratigaurav.hashnode.dev/learn-emmet-simplify-html-coding' },
  { title: 'Why Your Fingerprint Reader May Not Work on Linux Mint', cat: 'Linux', date: 'Jul 19, 2025', url: 'https://sampratigaurav.hashnode.dev/troubleshooting-fingerprint-scanners-on-linux-mint' },
];

const project = {
  name: 'SyncWatch',
  desc: 'Watch movies together with anyone — perfectly in sync. No uploads, no accounts, no streaming. Your video file never leaves your device.',
  tags: ['TypeScript', 'WebSockets', 'Node.js', 'Vercel'],
  liveUrl: 'https://syncwatch-eosin.vercel.app/',
  githubUrl: 'https://github.com/sampratigaurav/syncwatch',
};

const tabs = ['For Anyone', 'For Recruiters', 'For Engineers', 'For Writers'];
const sections = ['intro', 'work', 'writing', 'certs', 'about', 'contact'];
const navLabels = ['Intro', 'Work', 'Writing', 'Certs', 'About', 'Contact'];

const certs = [
  { issuer: 'Deloitte × Forage', name: 'Cyber Job Simulation', date: 'Nov 2025' },
  { issuer: 'Cisco', name: 'ICS/SCADA Security Certificate', date: 'Feb 2026' },
  { issuer: 'MathWorks', name: 'MATLAB Onramp', date: '2025' },
  { issuer: 'MathWorks', name: 'Make and Manipulate Matrices', date: '2025' },
  { issuer: 'MathWorks', name: 'Calculations with Vectors & Matrices', date: '2025' },
  { issuer: 'MathWorks', name: 'Solving ODEs with MATLAB', date: '2025' },
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
function HeroContent({ displayedText, isTypingDone, isDark }) {
  return (
    <>
      {displayedText}
      {!isTypingDone && (
        <span style={{ 
          display: 'inline-block', 
          width: '3px', 
          height: '0.85em', 
          background: isDark ? '#fff' : '#111', 
          marginLeft: '4px', 
          verticalAlign: 'middle', 
          animation: 'cursorBlink 0.8s step-end infinite', 
        }} />
      )}
    </>
  );
}

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

const Cursor = ({ isDark }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: isDark ? '#fff' : '#111',
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
        mixBlendMode: 'normal',
      }}
    />
  );
};

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [activeTab, setActiveTab] = useState('For Anyone');
  const [activeSection, setActiveSection] = useState('intro');
  const [heroKey, setHeroKey] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const sectionRefs = useRef({});
  const [posts, setPosts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [contributions, setContributions] = useState([]);
  const [contribTotal, setContribTotal] = useState(0);
  const [articleCount, setArticleCount] = useState(15);
  const [visitors, setVisitors] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [showKeyHint, setShowKeyHint] = useState(true);
  const [istTime, setIstTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowKeyHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setIstTime(ist);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = ['intro', 'work', 'writing', 'certs', 'about', 'contact'];
    const tabKeys = ['1', '2', '3', '4'];
    const tabValues = ['For Anyone', 'For Recruiters', 'For Engineers', 'For Writers'];

    const handleKey = (e) => {
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
  }, []);

  useEffect(() => {
    const headlines = {
      'For Anyone': 'Building things, breaking them, understanding why.',
      'For Recruiters': "2nd-year Cybersecurity student. I ship real things. Here's proof.",
      'For Engineers': 'Driven by curiosity, open source, and the question — how does this actually work?',
      'For Writers': `${articleCount} technical articles. If I can't explain it clearly, I don't understand it yet.`
    };

    const fullText = headlines[activeTab] || '';
    setDisplayedText('');
    setIsTypingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [activeTab, articleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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

  useEffect(() => {
    const updateScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollWidth(pct + '%');
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('sampratigaurav123@gmail.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

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

  /* ---- Scroll spy ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
    <>
      <div className="grain-overlay" />
      <div className="scroll-bar" style={{ width: scrollWidth, background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)' }} />
      <Cursor isDark={isDark} />
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
      </div>
      <button className="theme-toggle" onClick={() => setIsDark(d => !d)}>
        {isDark ? '◐' : '◑'}
      </button>

      {/* ========== TOP BAR ========== */}
      <header className="topbar">
        <a className="topbar-logo" href="#intro" onClick={() => scrollTo('intro')} style={{ color: isDark ? '#fff' : '#111' }}>
          S
        </a>
        <div className="topbar-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn${activeTab === t ? ' active' : ''}`}
              onClick={() => switchTab(t)}
              style={{ color: activeTab === t ? (isDark ? '#fff' : '#111') : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)') }}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* ========== LEFT SIDEBAR ========== */}
      <nav className="sidebar">
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

      {/* ========== MAIN CONTENT ========== */}
      <div className="main-content">

        {/* ===== SECTION 1 — INTRO ===== */}
        <section id="intro" className="section">
          <div className="hero-wrapper">
            <h1 key={heroKey} className="hero-headline hero-enter" style={{ color: isDark ? '#fff' : '#111' }}>
              <HeroContent displayedText={displayedText} isTypingDone={isTypingDone} isDark={isDark} />
            </h1>
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
          <h2 className="section-heading" style={{ color: isDark ? '#fff' : '#111' }}>work.</h2>
          <div className="section-content">
            <div className="projects-stack">
              <div className="project-card" style={{ background: isDark ? 'transparent' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}` }}>
                <div className="project-card-icons">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    🌐
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>
                    <GitHubIcon />
                  </a>
                </div>
                <div className="project-name" style={{ color: isDark ? '#fff' : '#111' }}>{project.name}</div>
                <p className="project-desc" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((t) => (
                    <span key={t} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>{t}</span>
                  ))}
                </div>
              </div>
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
          <h2 className="section-heading" style={{ color: isDark ? '#fff' : '#111' }}>writing.</h2>
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
                    >
                      <div>
                        <div className="article-cat" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>{cat}</div>
                        <div className="article-title" style={{ color: isDark ? '#fff' : '#111' }}>{title}</div>
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
          <h2 className="section-heading" style={{ color: isDark ? '#fff' : '#111' }}>certs.</h2>
          <div className="section-content">
            <div className="articles-list" style={{ background: 'transparent' }}>
              {certs.map((c, i) => (
                <div 
                  key={i} 
                  className="article-row" 
                  style={{ 
                    paddingTop: '18px', 
                    paddingBottom: '18px', 
                    background: 'transparent', 
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` 
                  }}
                >
                  <div>
                    <div className="article-cat" style={{ fontFamily: 'monospace', color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>{c.issuer}</div>
                    <div className="article-title" style={{ color: isDark ? '#fff' : '#111' }}>{c.name}</div>
                  </div>
                  <div className="article-right">
                    <span className="article-date" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)' }}>{c.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SECTION 5 — ABOUT ===== */}
        <section id="about" className="section">
          <h2 className="section-heading" style={{ color: isDark ? '#fff' : '#111' }}>about.</h2>
          <div className="section-content">
            <div className="about-grid">
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
            <a href="https://www.linkedin.com/in/sampratigaurav/" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              LinkedIn
            </a>
            <a href="https://github.com/sampratigaurav" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              GitHub
            </a>
            <a href="https://x.com/Sampratigaurav0" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              X
            </a>
            <a href="https://sampratigaurav.hashnode.dev/" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#4A9EFF'} onMouseLeave={e => e.target.style.color = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)'}>
              Hashnode
            </a>
          </div>
        </section>
      </div>

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
      }}>
        <div style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.4)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Currently</div>
        {istTime && ( 
          <div style={{ 
            fontSize: '13px', 
            color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)', 
            fontFamily: 'DM Mono, monospace', 
            letterSpacing: '0.5px', 
            marginBottom: '8px', 
            paddingBottom: '8px', 
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, 
          }}> 
            {istTime} <span style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginLeft: '4px' }}>IST</span> 
          </div> 
        )}
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
      </div>
    </>
  );
}
