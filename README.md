# Star Venture Capital · Build What's Next

Institutional venture platform for **Star Venture Capital**, a Star Groups company backing ambitious founders with patient capital, deep ecosystem synergy, and strategic operational scale.

---

## ⚡ Highlights & Key Features

- **Interactive WebGL2 Sliced Wave Matrix**: Custom WebGL2 shader ribbons flowing dynamically across the institutional overview with interactive column hit-zones and dynamic wave-riding cards.
- **3D Depth Text Cycler**: Multi-layered extruded 3D typography with mouse-tracking tilt physics and smooth glow transitions.
- **Fullbleed Currency Gradient ASCII**: Responsive canvas-based currency glyph background (`·+¢£¥€$₹`) with radial light gradients and ripple interaction.
- **Interactive 3D Card Deck**: Perspective-stacked thesis cards with touch gestures and smooth synchronized cycling.
- **Multi-Page Architecture**: High-performance architecture with dedicated subpages for Approach, Investment Focus, Capabilities, Portfolio, Process, Governance, and Founder Enquiry.
- **Institutional Brand Design**: Curated HSL color palette featuring Star Red (`#ef4444`), Crimson (`#991b1b`), and Velvet Wine (`#4a044e`) on an ultra-clean white canvas.

---

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla CSS3, JavaScript (ES Modules)
- **Interactive Micro-Frontends**: React 19, Lucide Icons
- **Graphics & Shaders**: WebGL2 GLSL Shaders, Canvas 2D
- **Build System**: Vite 8 Multi-Page Rollup Pipeline
- **Deployment**: Vercel (Configured via `vercel.json`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/dhanushkumar-merndev/Star-Venture-Capital.git
cd Star-Venture-Capital

# Install dependencies
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel

This repository is pre-configured for one-click deployment on **Vercel**:

1. Import this repository in your [Vercel Dashboard](https://vercel.com).
2. Framework Preset: **Vite** (automatically detected via `vercel.json`).
3. Output Directory: **`dist`**.
4. Build Command: `npm run build`.
5. Deploy!

---

## 📦 Reusable Skills

This project includes documented, self-contained skills in [`skills/`](./skills) ready to be reused in other projects:
- `sliced-waves-matrix`: Full-screen WebGL2 sliced wave with card physics.
- `3d-depth-text-cycler`: Extruded 3D typography component with pointer tilt.
- `fullbleed-currency-gradient-ascii`: Canvas ASCII currency glyph flow background.
- `interactive-card-swap-deck`: 3D perspective stacked cards.
- `hybrid-react-vanilla-architecture`: Multi-page static HTML + React 19 micro-frontends.

---

## 📄 License

Proprietary — Star Venture Capital / Star Groups.
