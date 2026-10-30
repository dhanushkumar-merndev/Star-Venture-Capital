# Star Ventures — Production Skills & Component Architecture

This directory contains the complete, detailed, production-ready skills and architectural patterns used across the Star Venture Capital application. Each skill is packaged with full code, mathematical formulas, GLSL shaders, integration instructions, and configuration guides so you can copy and deploy them directly into future projects.

---

## Skills Index

| Skill | Directory | Core Capabilities |
| :--- | :--- | :--- |
| **Sliced Waves Matrix** | [`skills/sliced-waves-matrix/SKILL.md`](./sliced-waves-matrix/SKILL.md) | WebGL2 multi-ribbon sliced wave canvas, wave crest/trough tracking, floating cards carried by waves, interactive bar hit-zones, and click-to-expand thesis cards. |
| **3D Depth Text Cycler** | [`skills/3d-depth-text-cycler/SKILL.md`](./3d-depth-text-cycler/SKILL.md) | Multi-layered 3D extruded typography, pointer-tracking tilt, auto-orbit physics, and headline cycling with smooth glow-in/glow-out transitions. |
| **Currency Gradient ASCII** | [`skills/fullbleed-currency-gradient-ascii/SKILL.md`](./fullbleed-currency-gradient-ascii/SKILL.md) | High-performance 2D Canvas ASCII matrix, dynamic currency glyph morphing (`·+¢£¥€$₹`), mouse wave ripples, and interactive click pulses. |
| **3D Interactive Card Deck** | [`skills/interactive-card-swap-deck/SKILL.md`](./interactive-card-swap-deck/SKILL.md) | Perspective-stacked interactive card deck with click-to-cycle physics, keyboard accessibility, and state indicators. |
| **Hybrid React + Vanilla Vite** | [`skills/hybrid-react-vanilla-architecture/SKILL.md`](./hybrid-react-vanilla-architecture/SKILL.md) | Multi-page HTML application pattern with React 19 micro-frontends mounted via `createRoot`, Vite Rollup multi-input bundling, and vanilla DOM event bridges. |

---

## How to Reuse These Skills in Any New Project

### 1. Vite + React / Next.js
Copy the relevant component folder (`src/components/...`) and import the React component directly:
```jsx
import SlicedWaveMatrix from './components/SlicedWaveMatrix';
import DepthText from './components/DepthText';
```

### 2. Vanilla HTML / Multi-Page Apps
Use the mount helper functions (`mountWaveMatrix`, `mountDepthText`, `createGradientASCII`):
```html
<div id="waveMount"></div>
<script type="module">
  import { mountWaveMatrix } from './components/mountWaveMatrix.jsx';
  mountWaveMatrix(document.getElementById('waveMount'));
</script>
```

### 3. Agentic IDE Customizations
These skills are compatible with Antigravity, Claude Code, Cursor, and Gemini agents. You can place them in `.agents/skills/` or reference them in your IDE prompt to build identical components in future codebases.
