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

[![Live Site](https://img.shields.io/badge/Live-samprati.dev-17130D?style=for-the-badge&logo=vercel&logoColor=e9e3d4)](https://samprati.dev)
[![React](https://img.shields.io/badge/React-19-17130D?style=for-the-badge&logo=react&logoColor=c62e22)](https://react.dev)
[![TailwindCSS v4](https://img.shields.io/badge/Tailwind-v4-17130D?style=for-the-badge&logo=tailwindcss&logoColor=e9e3d4)](https://tailwindcss.com)

</div>

---

## Overview

This is the source code for my personal portfolio, visually inspired by the **Brutalist / Manga Zine** aesthetic. It's built with high-contrast borders, stark typography, raw grid layouts, and a meticulously curated three-color palette to break away from standard, template-driven web design.

The portfolio serves as proof of work: a fast, responsive React application integrating live GitHub activity, aesthetic marquee banners, custom hover states, and pure typographic hierarchies.

---

## Design System

The site adheres to a strict design language that gives it a print-like, editorial feel:

### Color Palette
- ![#e9e3d4](https://via.placeholder.com/15/e9e3d4/000000?text=+) **Paper (`#e9e3d4`)** — The foundational background, simulating physical, slightly aged paper.
- ![#17130d](https://via.placeholder.com/15/17130d/000000?text=+) **Ink (`#17130d`)** — Deep, rich black for primary text, thick brutalist borders, and strong silhouettes.
- ![#c62e22](https://via.placeholder.com/15/c62e22/000000?text=+) **Red (`#c62e22`)** — The single accent color, used for terminal logs, highlights, and critical emphasis.

### Typography
- **Instrument Serif** — For massive, editorial-style headings.
- **Space Grotesk** — For readable, modern body copy.
- **JetBrains Mono** — For metadata, navigation tags, and the live terminal log.

---

## Feature Highlights

- **Live GitHub Syslog Tracker** — A terminal-style blinking ticker that fetches and cycles through real-time push/star/create events from the GitHub Events API.
- **Brutalist Grid Layouts** — Custom CSS grid architectures for project cards, work experience, and credential showcases, heavily utilizing strict 1.5px ink borders.
- **Film Strip Grain Overlay** — A subtle, fixed noise overlay (`GrainOverlay.jsx`) that adds texture and cohesion to the entire document.
- **Dynamic CSS Marquee** — An infinite, purely CSS-driven marquee for the skills/tools showcase.
- **Magnetic Nav Primitives** — Custom framer-motion style primitive wrappers (`<Magnetic />`) for micro-interactions on hover.
- **Visitor Counter** — A live, ad-blocker immune badge tracking total portfolio visitors via `counterapi.dev`.

---

## Tech Stack

| Category | Choice | 
|---|---|
| **Framework** | React 19 | 
| **Styling** | TailwindCSS v4 |
| **Bundler** | Vite 6 |
| **Icons** | Phosphor Icons / Heroicons (via SVG) | 
| **Minifier** | Terser |
| **Formatting** | Prettier + Husky + lint-staged |
| **Deployment** | Vercel |

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

### Environment

No `.env` file required. All API calls are public and unauthenticated. The visitor counter and GitHub live activity feed are fetched client-side with graceful fallbacks.

---

## Deployment

The site deploys automatically to Vercel on every push to `main`.

```bash
npm run build     # Production build with Terser minification
npm run preview   # Preview production build locally
```

---

## License

MIT — use whatever you want, attribution appreciated but not required.

---

<div align="center">

Built with curiosity and consistency.

**[samprati.dev](https://samprati.dev)** · [GitHub](https://github.com/sampratigaurav) · [X](https://x.com/Sampratigaurav0) · [Hashnode](https://sampratigaurav.hashnode.dev) · [LinkedIn](https://www.linkedin.com/in/sampratigaurav/)

</div>
