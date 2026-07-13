# Handoff: samprati.dev — Portfolio Redesign (“Manga Zine” direction)

## Overview
A complete redesign of Samprati Gaurav's personal portfolio (samprati.dev). The visual
direction is an **editorial manga/zine**: warm bone paper, black ink, one bold
Van Gogh / hinomaru red accent, monospace terminal labels, an elegant serif display
face, 1-bit "dithered" halftone textures, offset drop-shadow frames, and drag-and-drop
image panels for anime/character/pet artwork. Tasteful, performant motion throughout.

All content in this design is sourced from Samprati's real résumé and should be treated
as the source of truth.

## About the Design Files
The files in this bundle are a **design reference created in HTML** — a prototype showing
the intended look and behavior. It is **not production code to copy verbatim**. The task
is to **recreate this design in the existing codebase** (React 19 + Vite, per the current
samprati.dev repo) using its established patterns, component structure, and libraries.

- `Portfolio.dc.html` is written in a proprietary component runtime and will **not** run in
  a normal React app as-is. Read it as a spec: the markup, inline styles, and the logic
  class describe exactly what to build. Reimplement it as idiomatic React components with
  your styling approach of choice (plain CSS / CSS Modules / Tailwind — the repo already
  uses Tailwind).
- Ignore the `<x-dc>`, `data-reveal`, `data-magnetic`, `renderVals()` scaffolding as
  *framework detail* — but DO reproduce the **behavior** they encode (described below).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all
specified. Recreate the UI pixel-accurately. Exact hex values, fonts, and measurements are
in **Design Tokens** below.

## Tech Target
- **Framework:** React 19 + Vite (existing repo). If starting fresh, React + Vite is the
  intended stack.
- **Styling:** Tailwind CSS is already in the repo; either Tailwind or CSS Modules is fine.
  Keep the design-token values below exact.
- **Fonts:** Google Fonts — `Instrument Serif` (display), `Space Grotesk` (body/UI),
  `JetBrains Mono` (labels/eyebrows/stats).
- **Routing:** Samprati wanted multi-page routing. The prototype is a single scroll with
  in-page anchors; implementing it as one scrolling page with a sticky anchor nav is fine,
  or split sections into routes (`/`, `/work`, `/about`, `/writing`, `/contact`) with
  React Router — your call. Anchor IDs are provided so either works.

---

## Global Layout & Chrome

**Page container:** max content width `1240px`, centered, horizontal padding
`clamp(20px, 5vw, 64px)`. Background is the paper color; text is ink.

**Sticky nav (fixed, z above all):**
- Height `62px`, paper background at ~82% opacity with `backdrop-filter: blur(8px)`,
  bottom border `1.5px solid ink`.
- Left: a `15px` solid **red circle** + `SAMPRATI GAURAV` (Space Grotesk 700, 15px,
  letter-spacing 0.02em).
- Right (mono, 12px, color = ink2): links `/work` `/arcs` `/arsenal` `/writing`
  `/resume↗` and a solid-red **“Let's talk”** button (`border-radius: 2px`, paper text).
- Hidden on ≤860px (replace with a mobile menu or keep the logo + CTA only).

**Fixed decorative layers:**
1. **Film grain** — full-viewport fixed overlay, SVG `feTurbulence` noise
   (`baseFrequency 0.8`, 2 octaves), `opacity: 0.05`, `pointer-events: none`. Static.
2. **Cursor ring** — a `22px` circle with `2px solid red` border, `opacity 0.7`, that
   follows the mouse with easing (see Interactions). Hidden on touch devices.

Every major section uses a mono **eyebrow** label: `NN / SECTION` in red
(JetBrains Mono, 12px, letter-spacing 0.18em, uppercase).

---

## Screens / Sections (top to bottom)

### 1. Hero  (`#top`)
- **Purpose:** Immediate identity + credibility.
- **Layout:** 2-column grid `1.15fr / 0.85fr`, gap `clamp(28px,4vw,64px)`, vertically
  centered. Collapses to 1 column ≤860px. Top padding `clamp(96px,15vh,150px)`.
- **Left column:**
  - Eyebrow row: small red square + `PORTFOLIO — VOL.2026 · BUILT IN PUBLIC`.
  - **Name headline** `Samprati` (ink) / `Gaurav` (italic, red) — Instrument Serif 400,
    `font-size: clamp(56px, 11vw, 148px)`, `line-height: 0.86`, letter-spacing -0.01em.
    Each letter animates in (see Interactions). "Gaurav" line is `font-style: italic`.
  - Sub-paragraph (max-width 500px, Space Grotesk 500, `clamp(16px,1.7vw,19px)`,
    line-height 1.55, color ink2):
    *"Full-stack developer & cybersecurity student. I build real-time systems,
    AI-integrated apps, and secure browser extensions — shipped loudly, in public."*
  - **Stat chips** (mono 12px, `1.5px solid ink`, radius 2px, padding 6/12):
    `700+ contributions` · `20+ repos` · `15+ articles`.
  - **CTAs:** `See the work ↓` (solid ink, paper text) and `Get in touch`
    (`1.5px solid ink` outline). Both radius 2px, padding 13/24, weight 600.
  - Below the grid: a mono scroll hint `↓ SCROLL — THE STORY STARTS HERE` (the arrow bobs).
- **Right column (hero panel):**
  - A large **solid red circle** ("sun"), ~`min(78%,320px)` diameter, positioned
    `top:-6% right:2%`, sitting *behind* the frame (z 0).
  - A framed **image slot**: outer `1.5px solid ink` on paper2 with `8px` padding and a
    hard **offset shadow `12px 12px 0 ink`**; inner `1.5px solid ink`, `aspect-ratio 4/5`,
    `overflow:hidden`. Placeholder copy: *"Drop your art / anime self"*.
  - Caption row under the frame (mono 10.5px, ink2): `FIG.01 / THE DEV` and
    `BENGALURU · 2026`.

### 2. Marquee ticker
- Full-bleed **red bar**, `1.5px solid ink` top and bottom, paper-colored text, padding
  `11px 0`. Mono 14px uppercase, letter-spacing 0.04em.
- Content scrolls left infinitely (duplicate the string twice, translateX 0 → -50%,
  26s linear infinite). Content:
  `Building in public ✳ React ✳ Node.js ✳ TypeScript ✳ Cybersecurity ✳ Real-time systems ✳ WebRTC ✳ 700+ contributions ✳`

### 3. Profile  (`#about`, eyebrow `01 / PROFILE`)
- **Layout:** 2-column grid `0.9fr / 1.1fr`, gap `clamp(28px,4vw,60px)`, items start.
  Collapses to 1 column ≤860px.
- **Left — “Reg card” character sheet** (border 1.5px ink, bg paper2, shadow `8px 8px 0 ink`):
  - Header bar (border-bottom 1.5px ink, mono 11px): `REG.CARD #ENG24CY0156` and
    red `◆ ACTIVE`.
  - Square **image slot** with a **halftone dot background**
    (`radial-gradient(ink 0.8px, transparent 1.2px)`, `background-size: 7px 7px`),
    aspect-ratio 1, border-bottom 1.5px ink. Placeholder *"Drop a portrait"*.
  - Stat rows (13px), each label mono 11px ink2 on the left, value 600 on the right,
    dashed divider between rows:
    - NAME → Samprati Gaurav
    - CLASS → Full-stack + Cybersec
    - BASE → Bengaluru, IN
    - UNIV → DSU · B.Tech '28
    - SPECIALTY → Real-time systems  *(value in red)*
- **Right — bio:**
  - Serif headline (Instrument Serif 400, `clamp(30px,4.4vw,58px)`, line-height 1.02):
    *"A builder who ships loudly, breaks things safely, and* **documents everything.***"*
    (the last clause italic + red).
  - Paragraph with a **drop cap** on the first letter (Instrument Serif, 62px, red, floated
    left): the professional-summary text —
    *"Full-stack developer and cybersecurity student specializing in React, Node.js, and
    Python. I build real-time systems, AI-integrated apps, and secure browser extensions —
    with a hackathon team-lead streak and a built-in-public record across 20+ open-source
    repos and 700+ contributions this year."*
  - Second paragraph:
    *"When I'm not shipping, I'm writing about networking and systems internals, on the
    court, or somewhere between an anime rewatch and the next side project."*
- **“Off the clock” gallery wall:** italic serif label `Off the clock` + mono
  `— things I love`. A responsive grid (`repeat(auto-fit, minmax(150px,1fr))`, gap 16px) of
  5 framed **image slots**, each a `<figure>` with `1.5px solid ink`, `7px` padding,
  `5px 5px 0 ink` shadow, inner `aspect-ratio 3/4`, and a mono caption:
  `01 · NARUTO`, `02 · YOUR NAME`, `03 · CATS`, `04 · DOGS`, `05 · HOOPS`.

### 4. Arcs / Experience  (`#arcs`, eyebrow `02 / ARCS`)
- **Full-bleed dark section:** background = ink, text = paper. Serif section title
  *"The story so far"* (`clamp(32px,5vw,64px)`).
- Two entries, each a 2-column grid `auto / 1fr`, gap `clamp(18px,3vw,44px)`, separated by
  thin translucent rules (`1px solid rgba(233,227,212,0.25)`):
  - **Giant serif chapter numeral** in red: `I`, `II` (`clamp(48px,7vw,96px)`, line-height 0.8).
  - Header row: serif role title + red org + right-aligned mono date.
  - Red-arrow (`→`) bullet list, 15.5px, opacity 0.88.
  - **ARC I — Machine Learning Intern · FlyRank AI · Remote · JUN 2026 — PRESENT**
    - Developed and optimized ML models for real-time data analysis, improving prediction accuracy by 15%.
    - Collaborated cross-functionally to integrate AI solutions into existing products, lifting engagement.
  - **ARC II — Campus Ambassador · E-Cell, IIT Bombay · JUL 2026 — PRESENT**
    - Spearheaded outreach engaging 500+ students in entrepreneurship workshops, growing campus startup culture.
    - Organized networking events with industry leaders, opening mentorship for aspiring founders.
    - Ran peer mentorship sessions, guiding students to refine ideas and build pitch decks.

### 5. The Work / Projects  (`#work`, eyebrow `03 / THE WORK`, right meta `03 CARDS`)
Serif title *"Things I've built"*. Cards styled like collectible/trading cards: border
1.5px ink, bg paper2, header bar with mono `Cn · NAME` + red `#2026`, hard offset shadows.
- **Featured — SyncWatch** (big card, header `C1 · SYNCWATCH` / `#2026 · FEATURED`,
  shadow `10px 10px 0 ink`): internal 2-col grid (image left with halftone dot bg,
  aspect 16/11; content right).
  - Title `SyncWatch` (serif), subtitle **Real-time P2P media sync platform**.
  - Red-arrow bullets:
    - Distributed A/V sync engine (Socket.io + WebRTC) hitting sub-second frame coordination across peers.
    - Custom client-side audio fingerprinting (Web Audio API) matching encodings at >0.85 correlation.
    - Manifest V3 Chrome extension with Shadow DOM isolation and PBKDF2-secured account-less rooms.
  - Tech chips (mono 11px, 1px solid ink, radius 2px): React · TypeScript · Socket.io ·
    WebRTC · Redis · Chrome MV3.
  - Links: **Live ↗** (solid red, paper text) → https://syncwatch-eosin.vercel.app ;
    **GitHub** (outline) → https://github.com/sampratigaurav/syncwatch .
- **Two smaller cards** side by side (grid `1fr 1fr`, gap 22px, shadow `8px 8px 0 ink`),
  each: header bar, image slot (halftone dot bg, aspect 16/10), serif title, description,
  tech chips, links.
  - **C2 · Interactive Portfolio (samprati.dev)** — *"A dev portfolio with a global command
    palette, live GitHub contribution heatmap, and custom cybersecurity-themed UI. Reusable
    state hooks, CI/CD on Vercel."* Chips: React · Vite · Vercel. Links: Live ↗
    → https://www.samprati.dev ; GitHub → https://github.com/sampratigaurav .
  - **C3 · Distill** — *"ML data-poisoning detection platform. Full-stack app (Next.js +
    Python API) detecting poisoning in ML pipelines, with Docker containerization and
    automated CI."* Chips: Next.js · Python · Docker · GH Actions. Link: GitHub ↗
    → https://github.com/sampratigaurav .

### 6. Arsenal / Skills  (`#skills`, eyebrow `04 / ARSENAL`)
Serif title *"What I build with"*. A grid of category panels
(`repeat(auto-fit, minmax(210px,1fr))`) separated by `1.5px` ink gaps (grid gap = 1.5px on
an ink background, panels = paper) so hairlines read as ink rules. Each panel: mono red
category label + wrap of chips (14px, `1px solid ink`, radius 2px). Categories (verbatim
from résumé):
- **Languages:** Python, JavaScript, TypeScript, SQL, HTML5, CSS3
- **Frameworks:** React.js, Next.js, Node.js, Express, Flask, Tailwind
- **DB & Systems:** MySQL, MongoDB, Redis, DBMS, Networks, OS
- **Cloud & Tools:** AWS, Vercel, Docker, GH Actions, Socket.io, WebRTC, Supabase, Firebase
- **Security & AI:** PBKDF2 Crypto, Chrome MV3, Cybersec Fundamentals, AI Agent Workflows

### 7. Dispatches / Writing & Open Source  (`#writing`, eyebrow `05 / DISPATCHES`)
- **Section background = paper2**, ink top/bottom borders.
- Serif title *"Writing & open source"* + intro:
  *"15+ technical articles on networking — TCP/IP, DNS, HTTP — plus Linux and dev tooling,
  published on Hashnode. All in public."*
- 2-column grid `0.8fr / 1.2fr`:
  - **Left — big stats:** three rows, each a huge serif number + mono two-line caption.
    `700+` (red) contributions this year · `20+` open-source repositories · `15+` technical
    articles. Rows divided by `1px solid line`.
  - **Right — contribution heatmap** (a stylized GitHub-style graph, decorative): a bordered
    paper card (shadow `8px 8px 0 ink`) with header `CONTRIBUTION GRAPH` + red `● 2026`.
    Grid of **52 weeks × 7 days** of `11px` rounded squares, gap 3px, `grid-auto-flow: column`,
    `grid-template-rows: repeat(7,1fr)`. 5 intensity shades from empty → red:
    `paper2 (1px line border)`, `rgba(198,46,34,0.30)`, `0.55`, `0.80`, `red`. Below it a
    `Less ▢▢▢▢ More` legend. Intensities are pseudo-random (seeded) in the prototype;
    if you have real GitHub data, drive it from that instead.

### 8. Credentials + Education  (`#certs`, eyebrow `06 / CREDENTIALS`)
- Serif title *"Certifications"*. Grid `repeat(auto-fit, minmax(240px,1fr))`, gap 16px, of 4
  cards (border 1.5px ink, bg paper2, shadow `5px 5px 0 ink`), each a `46px` circular red
  **seal** (2px red border, red glyph/text) + name + mono issuer·date:
  - Certified LLM Security Professional (CLLMSP) — Red Team Leaders · Jun 2026
  - Cyber Job Simulation — Deloitte Australia · Nov 2025
  - Introduction to Cybersecurity — Cisco Networking Academy · Feb 2026
  - Command Line Course — Codecademy · Jul 2025
- **Education strip** (full-width dark card, bg ink, paper text), 3-col grid
  `auto / 1fr / auto`: mono `07 / EDU` (red) · serif *"Dayananda Sagar University,
  Bengaluru"* + line *"B.Tech, Computer Science (Cybersecurity) · ID ENG24CY0156 ·
  Activities: E-Cell, Basketball, Badminton"* · right mono `2024 — 2028`.

### 9. Contact  (`#contact`, eyebrow `08 / CONTACT`)
- **Full-bleed red section**, paper text, centered.
- Giant serif *"Let's build"* / *"something."* (second line italic),
  `clamp(52px, 11vw, 150px)`, line-height 0.9.
- Sub: *"Internships, collabs, or a chat about real-time systems, security, or the next
  anime worth watching."*
- Buttons: **Email me ↗** (solid paper bg, ink text) → mailto:sampratigaurav123@gmail.com ;
  **GitHub** (paper outline) → https://github.com/sampratigaurav ;
  **LinkedIn** (paper outline) → https://www.linkedin.com/in/sampratigaurav *(confirm handle)*.
- Mono contact line: `sampratigaurav123@gmail.com · +91 74882 88878 · samprati.dev`.

### 10. Footer
Mono 11.5px, ink2, space-between row: `© 2026 SAMPRATI GAURAV · VOL.2026` ·
`BENGALURU, IN — BUILT IN PUBLIC ✳` · `BACK TO TOP ↑` (anchors to `#top`).

---

## Interactions & Behavior
All motion is tasteful and **must stay performant** (see Performance notes).

1. **Letter-by-letter hero reveal.** Each letter of the name starts `opacity:0` +
   `translateY(0.6em)`, transitions over `0.7s cubic-bezier(.2,.7,.2,1)` with a per-letter
   `transition-delay` of `0.15s + index*0.045s`, revealed on mount.
2. **Scroll reveal.** Elements marked for reveal start `opacity:0` + `translateY(26px)` and
   transition to visible (`0.8s cubic-bezier(.2,.7,.2,1)`) when they enter the viewport, via
   `IntersectionObserver` (threshold 0.1, `rootMargin: 0px 0px -8% 0px`), each firing once.
   Include a safety timeout (~3.5s) that reveals everything in case the observer never fires.
3. **Magnetic buttons.** On hover, buttons translate toward the cursor by
   `delta * 0.3` (recompute from `getBoundingClientRect` center on `mousemove`), snapping
   back to 0 on `mouseleave`, transition `0.35s cubic-bezier(.2,.7,.2,1)`. Disable on
   `(hover: none)` devices.
4. **Card lift.** Cards/figures nudge `translate(-3px,-3px)` on hover (transition
   `0.4–0.45s cubic-bezier(.2,.7,.2,1)`), which makes the hard offset shadow read as depth.
5. **Cursor ring.** A red-outline circle lerps toward the pointer (`pos += (target-pos)*0.18`
   per frame). **Important:** run the rAF loop only while the pointer is moving and stop it
   when idle/settled (don't loop forever). Hide on touch devices.
6. **Marquee.** Infinite horizontal scroll via CSS transform (26s linear), content
   duplicated for a seamless loop.

## State Management
Minimal — this is a mostly static marketing page.
- Reveal/animation state is transient DOM/observer state; no global store needed.
- Optional: theme values (accent color, paper tone, grain on/off, cursor on/off) as
  simple state/props if you want the same tweakability the prototype has (defaults below).
- If you wire the heatmap to real data, fetch GitHub contributions (or precompute at build).
- The prototype's image "slots" are a prototype-only convenience. In production, replace them
  with real `<img>` assets (Samprati's artwork, portrait, pet/anime images, and project
  screenshots) served from `/public` or an asset pipeline.

## Design Tokens
**Colors**
- `--paper` (background): `#E9E3D4`   (cool-grey alt: `#EDECE7`)
- `--paper2` (panels): `#E0D8C4`      (cool-grey alt: `#E3E2DC`)
- `--ink` (text/borders): `#17130D`
- `--ink2` (muted text): `#5A5140`
- `--red` (accent): `#C62E22`   (alt options offered: `#D14A3A`, `#1F6F5C`, `#2E4A9E`)
- `--line` (hairlines): `#C8BEA6`  (cool-grey alt: `#D3D2CB`)
- Selection: red bg, paper text. Link hover: red.

**Typography**
- Display: **Instrument Serif** (400, and italic). Used for the name, section titles, big
  numbers, project/role titles. Tight line-heights (0.8–1.1).
- Body / UI: **Space Grotesk** (400/500/600/700).
- Mono / labels: **JetBrains Mono** (400/500/700) — eyebrows, chips, captions, dates, stats.
- Key sizes: hero name `clamp(56px,11vw,148px)`; section titles `clamp(32px,5vw,64px)`;
  contact headline `clamp(52px,11vw,150px)`; body 15–19px; mono labels 10.5–14px;
  eyebrow letter-spacing 0.18em uppercase.

**Shape / depth**
- Border radius: **2px** on buttons/chips (deliberately crisp), **50%** on circles/seals.
  No large rounded corners anywhere.
- Borders: `1.5px solid ink` on cards/nav; `1px solid ink` on chips; `1px dashed line` for
  internal dividers.
- **Signature offset shadows** (no blur): `5px 5px 0 ink`, `8px 8px 0 ink`,
  `10px 10px 0 ink`, `12px 12px 0 ink`.
- Halftone texture: `radial-gradient(ink 0.8px, transparent 1.2px)` at `6–7px` tile.
- Grain: SVG `feTurbulence` overlay at `opacity 0.05`.

**Spacing**
- Section vertical padding: `clamp(60px,9vh,110px)` (hero larger, some strips smaller).
- Content max-width `1240px`; horizontal padding `clamp(20px,5vw,64px)`.
- Responsive breakpoint used: **860px** (two-column grids collapse to one).

**Default theme values** (if reproducing the tweak controls): accent `#C62E22`,
paper tone `Bone`, grain on, cursor ring on.

## Performance Notes (learned while building — please honor)
- **Do not** animate large blurred elements (big `filter: blur()` blobs) on an infinite
  loop — it saturates the compositor and can make the tab unresponsive. This design uses
  **crisp** shapes (solid red circle, offset shadows, halftone) precisely to avoid that.
- Keep the grain **static**; don't animate it, and avoid `mix-blend-mode` on a full-viewport
  layer.
- The cursor rAF loop must **stop when idle**, not run forever.
- Respect `prefers-reduced-motion`: consider disabling the letter reveal, cursor ring, and
  marquee for users who request reduced motion.

## Assets
The prototype ships **no bitmap assets** — every photo/illustration is a placeholder "slot".
For production, supply real images:
- Hero panel — Samprati's artwork / anime-style self portrait.
- Profile portrait — a real photo or avatar.
- “Off the clock” gallery — 5 images: Naruto, Your Name, cats, dogs, basketball
  (use properly-licensed or personal images; anime frames are copyrighted — prefer personal
  fan-art, owned images, or link-outs).
- Project cards — real screenshots of SyncWatch, samprati.dev, and Distill.
Fonts load from Google Fonts (Instrument Serif, Space Grotesk, JetBrains Mono).

## Files
- `Portfolio.dc.html` — the full hi-fi design reference (markup + inline styles + the JS
  logic class describing all interactions). Primary spec.
- `image-slot.js` — the prototype's drag-drop image placeholder web component. **Prototype
  only** — replace slots with real `<img>` elements in production; included only so the
  reference file renders.
- `Portfolio v1 (scandi).dc.html` *(optional, not included by default)* — an earlier
  "clean Scandinavian" direction, superseded by this one.
