<div align="center">

```
███████╗ █████╗ ███╗   ███╗██████╗ ██████╗  █████╗ ████████╗██╗
██╔════╝██╔══██╗████╗ ████║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║
███████╗███████║██╔████╔██║██████╔╝██████╔╝███████║   ██║   ██║
╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ ██╔══██╗██╔══██║   ██║   ██║
███████║██║  ██║██║ ╚═╝ ██║██║     ██║  ██║██║  ██║   ██║   ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝
```

**samprati.dev — Personal Portfolio of Samprati Gaurav**

*2nd-year Cybersecurity student at DSU Bengaluru. I ship real things. Here's proof.*

[![Live Site](https://img.shields.io/badge/Live-samprati.dev-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://samprati.dev)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-91%2F100-4ade80?style=for-the-badge&logo=lighthouse&logoColor=white)](#performance)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](#license)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Feature Highlights](#feature-highlights)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Easter Eggs](#easter-eggs)
- [Performance](#performance)
- [Security Headers](#security-headers)
- [Deployment](#deployment)
- [Design Decisions](#design-decisions)
- [License](#license)

---

## Overview

This is not a template. Every line of code, every animation, every interaction was written from scratch — no UI libraries, no Tailwind, no component kits. The portfolio is itself the proof of work: a React application that integrates live GitHub activity, Hashnode articles, real-time IST clock, a functional terminal, a command palette, and a suite of Easter eggs — all while scoring 91 on Lighthouse performance.

Built in 3 days. Zero boilerplate. Open source.

---

## Live Demo

> **[samprati.dev](https://samprati.dev)**

<div align="center">

| Section | Description |
|---|---|
| **Intro** | Typing headline, dynamic tab views, live GitHub syslog ticker |
| **Work** | Project cards with 3D tilt, case study modals, last-commit badge |
| **Writing** | Searchable article list, live Hashnode GraphQL sync |
| **Certs** | Grid layout with issuer, date, and tag metadata |
| **About** | Two-column prose layout |
| **Contact** | RGB glitch avatar, traceroute social links, live IST clock widget |

</div>

---

## Feature Highlights

### Core UI
- **Custom Cursor** — velocity-sensitive trail with 6-node physics, per-element variant states (`project`, `pointer`, `terminal`)
- **Smooth Scroll** — `@studio-freight/lenis` for buttery momentum
- **Scroll Velocity Skew** — `skewY()` applied to cards and rows based on scroll delta, RAF-throttled
- **Dark / Light Mode** — CSS-variable swap, persists across sections
- **Spotlight Background** — radial CSS mask synced to mouse position, reveals animated grid
- **Network Background** — `<canvas>` particle mesh, mouse-reactive, theme-aware

### Data & Live APIs
- **GitHub Contributions Heatmap** — 52-week grid from `jogruber.de` proxy, level-coded colors
- **GitHub Activity Syslog** — real-time push/create/star events as rotating terminal-style ticker
- **Hashnode GraphQL** — fetches latest 3 posts and total article count live
- **Last Commit Badge** — polls the SyncWatch repo for the most recent commit message and relative time
- **Visitor Count** — live counter via `counterapi.dev`

### Interactions
- **Terminal** — open with `` ` ``, supports `whoami`, `ls projects`, `cat resume`, `contact`, `cat public.key`, `clear`, `exit`, and `rm -rf /`
- **Command Palette** — `Cmd/Ctrl + K`, searchable actions with arrow-key navigation
- **Section Navigation** — `J` / `K` to move between sections, `1–4` to switch tabs
- **Project Modal** — full case study with problem, solution, architecture diagram, tech decisions, learnings, and metrics
- **3D Card Tilt** — `perspective` + `rotateX/Y` on mousemove, with radial glare overlay
- **Article Search** — instant filter across all 14 articles, with empty state

### Easter Eggs
- **Type "samprati"** — triggers a glitch effect and full-screen identity reveal
- **Click the logo 10×** — confetti burst
- **Rage click (5× rapid)** — contextual toast
- **`rm -rf /`** in terminal — DOM wipe animation, followed by BIOS-style reboot sequence
- **End of page** — "you made it to the end." toast
- **Copy text** — "sharing is caring" toast with site link
- **Time-aware greeting** — morning / afternoon / evening / "you're up late"
- **Time-on-site tracker** — shows "you've been here N min" in the status widget after 2 minutes

---

## Tech Stack

| Category | Choice | Reason |
|---|---|---|
| **Framework** | React 19 | Component model for 20+ interactive features |
| **Bundler** | Vite 6 | Sub-second HMR, vendor chunk splitting |
| **Minifier** | Terser | `drop_console`, `drop_debugger` in production |
| **Scroll** | Lenis 1.0 | Smooth momentum without scroll-jacking |
| **Sound** | use-sound + Howler | Hover/clack/thump with mute toggle |
| **CAPTCHA** | @marsidev/react-turnstile | Bot protection on contact |
| **XSS Guard** | DOMPurify | Sanitizes all dynamic HTML |
| **Analytics** | @vercel/analytics | Zero-config, privacy-friendly |
| **Speed** | @vercel/speed-insights | Core Web Vitals monitoring |
| **Formatting** | Prettier + Husky + lint-staged | Pre-commit auto-format |
| **Deployment** | Vercel | Free tier, global edge, instant rollbacks |
| **Fonts** | Locally served WOFF2 | No render-blocking remote requests |

**Zero UI libraries. Zero Tailwind. Zero CSS frameworks.**

---

## Project Structure

```
samprati-gaurav-portfolio/
├── public/
│   ├── assets/
│   │   ├── fonts/           # DM Sans, DM Mono, Instrument Serif (WOFF2)
│   │   ├── sounds/          # hover.mp3, clack.mp3, thump.mp3
│   │   ├── avatar.png       # contact section photo
│   │   ├── resume.pdf       # downloadable resume
│   │   ├── og-image.svg     # Open Graph card
│   │   └── og-image.html    # OG image source template
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── googlecbd48a3255f4555e.html
│
├── src/
│   ├── components/
│   │   ├── SpotlightBackground.jsx   # Mouse-tracking grid reveal
│   │   ├── ProgressBar.jsx           # Scroll progress bar
│   │   ├── TypingHeadline.jsx        # Tab-aware typing animation
│   │   ├── GitHubHeatmap.jsx         # Memoized 52-week contribution grid
│   │   └── ui/
│   │       ├── LiveClock.jsx         # IST clock, 1s interval
│   │       ├── GitHubIcon.jsx        # SVG icon component
│   │       ├── TerminalModal.jsx     # Full terminal emulator
│   │       ├── ProjectModal.jsx      # Case study overlay
│   │       ├── SyslogTicker.jsx      # Rotating GitHub activity feed
│   │       ├── BiosReboot.jsx        # Post-wipe boot sequence
│   │       ├── NetworkBackground.jsx # Canvas particle network
│   │       ├── TracerouteLink.jsx    # IP-resolving link hover
│   │       ├── CommandPalette.jsx    # Cmd+K palette
│   │       └── SafeHtml.jsx          # DOMPurify wrapper
│   │
│   ├── data/
│   │   └── constants.js      # ALL_ARTICLES, projects, tabs, sections, certs
│   │
│   ├── hooks/
│   │   ├── usePortfolioData.js  # API hooks: GitHub, Hashnode, visitors
│   │   └── useDomWiper.js       # rm -rf / DOM animation
│   │
│   ├── App.jsx               # Main application (~900 lines)
│   ├── main.jsx              # React root
│   └── index.css             # All styles (~1000 lines, zero frameworks)
│
├── index.html                # SEO meta, schema.org, OG tags
├── vite.config.js
├── vercel.json               # Security headers
├── .prettierrc
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18.0.0`
- npm `>= 8.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/sampratigaurav/samprati-gaurav-portfolio.git
cd samprati-gaurav-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev       # Start Vite dev server at localhost:5173
npm run build     # Production build with Terser minification
npm run preview   # Preview production build locally
npm run prepare   # Initialize Husky git hooks
```

### Environment

No `.env` file required. All API calls are public and unauthenticated. The visitor counter, GitHub contributions, and Hashnode articles are fetched client-side with graceful fallbacks.

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `` ` `` | Toggle terminal |
| `Cmd/Ctrl + K` | Open command palette |
| `1` `2` `3` `4` | Switch between persona tabs |
| `J` | Scroll to next section |
| `K` | Scroll to previous section |

---

## Easter Eggs

There are 8 hidden interactions. Here's one to get you started:

```
type "samprati" anywhere on the page
```

Find the rest yourself. Or read the source.

---

## Performance

Measured with Lighthouse on the production build at `samprati.dev`:

| Metric | Score |
|---|---|
| Performance | 91 |
| Accessibility | 90 |
| Best Practices | 92 |
| SEO | 100 |

### Key optimizations

- **Vendor chunk split** — React + ReactDOM isolated in `vendor.js`, cached separately
- **Local fonts** — WOFF2 files served from `/public/assets/fonts/`, `font-display: swap`
- **RAF-throttled scroll handlers** — `requestAnimationFrame` wraps all scroll events
- **Memoized components** — `React.memo` on `GitHubHeatmap`, `LiveClock`, `Cursor`
- **`useMemo` on heatmap grid** — 364-cell calculation runs only when data or theme changes
- **IntersectionObserver** for scroll animations — no scroll listeners, no layout thrash
- **`will-change: transform`** on animated elements — promotes to compositor layer
- **`terser`** with `drop_console: true` — zero console output in production
- **No source maps** in production (`sourcemap: false`)
- **Passive event listeners** — `{ passive: true }` on all mousemove/scroll handlers

---

## Security Headers

Configured in `vercel.json` for all routes:

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Blocks camera, microphone, geolocation, FLoC |
| `Content-Security-Policy` | `default-src 'self'` with explicit allowlists |

The `/admin` and `/wp-admin` routes render a honeypot login page that logs attempts.

---

## Deployment

The site deploys automatically to Vercel on every push to `main`.

```bash
# Manual deploy via Vercel CLI
npm i -g vercel
vercel --prod
```

**Build output:** `dist/` (~750KB total, ~110KB gzipped JS)

```
assets/vendor-[hash].js    ~26KB gzip   (React + ReactDOM)
assets/howler-[hash].js    ~22KB gzip   (audio engine, lazy)
assets/index-[hash].js     ~130KB gzip  (app code + all deps)
```

---

## Design Decisions

**Why no UI library?**
Full pixel control. Every hover state, every timing curve, every border radius was deliberate. Copying a component library's aesthetic would have made this feel generic.

**Why no TypeScript?**
Deliberate for this project. The portfolio was built on a 3-day deadline. TypeScript would have added friction without meaningful benefit at this scale. SyncWatch (the sister project) uses TypeScript.

**Why `@studio-freight/lenis` over native smooth scroll?**
Native CSS `scroll-behavior: smooth` doesn't allow momentum control or scroll velocity reads, both of which power the skew effect on cards.

**Why `DOMPurify`?**
The article descriptions from Hashnode's GraphQL API return HTML strings. Rendering them unsanitized would be an XSS vector. DOMPurify strips everything dangerous before React touches it.

**Why local fonts?**
Remote font requests block rendering. Serving WOFF2 from the same origin eliminates the DNS lookup, TCP handshake, and TLS negotiation that would otherwise add 100–300ms on first load.

---

## License

MIT — use whatever you want, attribution appreciated but not required.

---

<div align="center">

Built with curiosity and consistency.

**[samprati.dev](https://samprati.dev)** · [GitHub](https://github.com/sampratigaurav) · [X](https://x.com/Sampratigaurav0) · [Hashnode](https://sampratigaurav.hashnode.dev) · [LinkedIn](https://www.linkedin.com/in/sampratigaurav/)

</div>
