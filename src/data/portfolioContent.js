export const NAV_LINKS = [
  { href: '#work', label: '/work' },
  { href: '#arcs', label: '/arcs' },
  { href: '#skills', label: '/arsenal' },
  { href: '#writing', label: '/writing' },
  { href: '/assets/resume.pdf', label: '/resume↗', external: true },
];

export const MARQUEE_ITEMS = [
  'Building in public',
  'React',
  'Node.js',
  'TypeScript',
  'Cybersecurity',
  'Real-time systems',
  'WebRTC',
  '700+ contributions',
];

export const REG_CARD = {
  id: 'REG.CARD #ENG24CY0156',
  rows: [
    { label: 'NAME', value: 'Samprati Gaurav' },
    { label: 'CLASS', value: 'Full-stack + Cybersec' },
    { label: 'BASE', value: 'Bengaluru, IN' },
    { label: 'UNIV', value: "DSU · B.Tech '28" },
    { label: 'SPECIALTY', value: 'Real-time systems', accent: true },
  ],
};

export const GALLERY = [
  { id: 'anime', num: '01', label: 'ANIME', src: '/images/gallery-anime.svg' },
  {
    id: 'animals',
    num: '02',
    label: 'ANIMALS',
    src: '/images/gallery-animals.svg',
  },
  { id: 'f1', num: '03', label: 'F1', src: '/images/gallery-f1.svg' },
  {
    id: 'running',
    num: '04',
    label: 'RUNNING',
    src: '/images/gallery-running.svg',
  },
  {
    id: 'tennis',
    num: '05',
    label: 'TENNIS',
    src: '/images/gallery-tennis.svg',
  },
];

export const ARCS = [
  {
    numeral: 'I',
    role: 'Machine Learning Intern',
    org: 'FlyRank AI · Remote',
    date: 'JUN 2026 — PRESENT',
    bullets: [
      'Developed and optimized ML models for real-time data analysis, improving prediction accuracy by 15%.',
      'Collaborated cross-functionally to integrate AI solutions into existing products, lifting engagement.',
    ],
  },
  {
    numeral: 'II',
    role: 'Campus Ambassador',
    org: 'E-Cell, IIT Bombay',
    date: 'JUL 2026 — PRESENT',
    bullets: [
      'Spearheaded outreach engaging 500+ students in entrepreneurship workshops, growing campus startup culture.',
      'Organized networking events with industry leaders, opening mentorship for aspiring founders.',
      'Ran peer mentorship sessions, guiding students to refine ideas and build pitch decks.',
    ],
  },
];

export const FEATURED_PROJECT = {
  code: 'C1 · SYNCWATCH',
  tag: '#2026 · FEATURED',
  title: 'SyncWatch',
  subtitle: 'Real-time P2P media sync platform',
  image: '/images/project-syncwatch.svg',
  bullets: [
    'Distributed A/V sync engine (Socket.io + WebRTC) hitting sub-second frame coordination across peers.',
    'Custom client-side audio fingerprinting (Web Audio API) matching encodings at >0.85 correlation.',
    'Manifest V3 Chrome extension with Shadow DOM isolation and PBKDF2-secured account-less rooms.',
  ],
  tech: ['React', 'TypeScript', 'Socket.io', 'WebRTC', 'Redis', 'Chrome MV3'],
  links: [
    {
      label: 'Live ↗',
      href: 'https://syncwatch-eosin.vercel.app',
      variant: 'solid',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/sampratigaurav/syncwatch',
      variant: 'outline',
    },
  ],
};

export const PROJECTS = [
  {
    code: 'C2 · SAMPRATI.DEV',
    tag: '#2026',
    title: 'Interactive Portfolio',
    image: '/images/project-portfolio.svg',
    description:
      'A dev portfolio with a global command palette, live GitHub contribution heatmap, and custom cybersecurity-themed UI. Reusable state hooks, CI/CD on Vercel.',
    tech: ['React', 'Vite', 'Vercel'],
    links: [
      { label: 'Live ↗', href: 'https://www.samprati.dev', variant: 'solid' },
      {
        label: 'GitHub',
        href: 'https://github.com/sampratigaurav',
        variant: 'outline',
      },
    ],
  },
  {
    code: 'C3 · DISTILL',
    tag: '#2026',
    title: 'Distill',
    image: '/images/project-distill.svg',
    description:
      'ML data-poisoning detection platform. Full-stack app (Next.js + Python API) detecting poisoning in ML pipelines, with Docker containerization and automated CI.',
    tech: ['Next.js', 'Python', 'Docker', 'GH Actions'],
    links: [
      {
        label: 'GitHub ↗',
        href: 'https://github.com/sampratigaurav',
        variant: 'outline',
      },
    ],
  },
];

export const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks',
    items: ['React.js', 'Next.js', 'Node.js', 'Express', 'Flask', 'Tailwind'],
  },
  {
    label: 'DB & Systems',
    items: ['MySQL', 'MongoDB', 'Redis', 'DBMS', 'Networks', 'OS'],
  },
  {
    label: 'Cloud & Tools',
    items: [
      'AWS',
      'Vercel',
      'Docker',
      'GH Actions',
      'Socket.io',
      'WebRTC',
      'Supabase',
      'Firebase',
    ],
  },
  {
    label: 'Security & AI',
    items: [
      'PBKDF2 Crypto',
      'Chrome MV3',
      'Cybersec Fundamentals',
      'AI Agent Workflows',
    ],
  },
];

export const DISPATCH_STATS = [
  { value: '700+', caption: 'contributions this year', accent: true },
  { value: '20+', caption: 'open-source repositories' },
  { value: '15+', caption: 'technical articles' },
];

export const CERTS = [
  {
    seal: 'CLL\nMSP',
    name: 'Certified LLM Security Professional (CLLMSP)',
    meta: 'Red Team Leaders · Jun 2026',
  },
  {
    seal: '◆',
    name: 'Cyber Job Simulation',
    meta: 'Deloitte Australia · Nov 2025',
  },
  {
    seal: '◆',
    name: 'Introduction to Cybersecurity',
    meta: 'Cisco Networking Academy · Feb 2026',
  },
  { seal: '›_', name: 'Command Line Course', meta: 'Codecademy · Jul 2025' },
];

export const EDUCATION = {
  eyebrow: '07 / EDU',
  name: 'Dayananda Sagar University, Bengaluru',
  meta: 'B.Tech, Computer Science (Cybersecurity) · ID ENG24CY0156 · Activities: E-Cell, Basketball, Badminton',
  years: '2024 — 2028',
};

export const CONTACT = {
  email: 'sampratigaurav123@gmail.com',
  phone: '+91 74882 88878',
  domain: 'samprati.dev',
  github: 'https://github.com/sampratigaurav',
  linkedin: 'https://www.linkedin.com/in/sampratigaurav',
};
