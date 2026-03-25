export const ALL_ARTICLES = [
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

export const projects = [
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

export const tabs = ['For Anyone', 'For Recruiters', 'For Engineers', 'For Writers'];
export const sections = ['intro', 'work', 'writing', 'certs', 'about', 'contact'];
export const navLabels = ['Intro', 'Work', 'Writing', 'Certs', 'About', 'Contact'];

export const certs = [
  { issuer: 'Codecademy', name: 'Command Line Course', date: 'Jul 2025', tag: 'Developer Tools' },
  { issuer: 'Codecademy', name: 'Fundamentals of Cybersecurity', date: 'Jul 2025', tag: 'Cybersecurity' },
  { issuer: 'Deloitte × Forage', name: 'Cyber Job Simulation', date: 'Nov 2025', tag: 'Cybersecurity' },
  { issuer: 'Cisco Networking Academy', name: 'Introduction to Cybersecurity', date: 'Feb 2026', tag: 'Cybersecurity' },
  { issuer: 'MathWorks', name: 'MATLAB Onramp', date: '2025', tag: 'Programming' },
  { issuer: 'MathWorks', name: 'Make and Manipulate Matrices', date: '2025', tag: 'Mathematics' },
  { issuer: 'MathWorks', name: 'Calculations with Vectors & Matrices', date: '2025', tag: 'Mathematics' },
  { issuer: 'MathWorks', name: 'Solving ODEs with MATLAB', date: '2025', tag: 'Engineering' },
];

export const HASHNODE_QUERY = `
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
