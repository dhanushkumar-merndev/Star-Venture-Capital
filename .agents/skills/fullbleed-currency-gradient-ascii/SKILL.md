---
name: fullbleed-currency-gradient-ascii
description: >-
  High-performance 2D Canvas ASCII background with currency glyph morphing (·+¢£¥€$₹), radial color gradient flow, interactive mouse ripples, and click wave pulses.
---

# Full-Bleed Currency Gradient ASCII Skill

A high-performance interactive Canvas background engine that renders dynamic ASCII particle grids formatted with currency glyphs (`·+¢£¥€$₹`). Features smooth mathematical density flow, color palette morphing, pointer disturbance waves, and interactive click ripple pulses.

---

## Technical Features

1. **Cellular Grid Engine**:
   - Divides the screen into equal cell sizes (e.g. 18px).
   - Dynamically scales to `window.devicePixelRatio` with max render dimension limits to ensure high-DPI sharpness without GPU exhaustion.
2. **Currency Glyph Density Scale**:
   - Uses an ordered brightness density ramp:
     `'  ·+¢£¥€$₹'`
   - Glyphs morph dynamically based on 2D flow fields and time delta.
3. **Interactive Click & Pointer Physics**:
   - Tracks cursor position and generates local radial displacement waves.
   - Click events spawn expanding shockwaves (`clickEffect: "wave"`) that ripple through the ASCII characters.
4. **Curated Brand Palettes**:
   - Built-in palettes: `starRed`, `crimsonWine`, `goldBullion`, `emeraldTech`.

---

## Integration in Vanilla JS / Vite / React

```javascript
import { createGradientASCII, STAR_PALETTES } from './src/scripts/gradientAscii.js';

const canvasBackdrop = document.getElementById("heroAsciiBackdrop");

const asciiInstance = createGradientASCII(canvasBackdrop, {
  colors: STAR_PALETTES.starRed.colors,
  characters: '  ·+¢£¥€$₹',
  autoMorph: true,
  cellSize: 18,
  density: 0.85,
  glyphOpacity: 0.95,
  glow: 0.42,
  speed: 0.85,
  flow: 0.65,
  softness: 0.48,
  grain: 0.08,
  mouseInteraction: true,
  clickEffect: "wave"
});
```

---

## Configuration Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `colors` | string[] | `['#dc2626', '#991b1b', ...]` | Array of hex color stops for the gradient flow |
| `characters` | string | `'  ·+¢£¥€$₹'` | Character ramp ordered from low to high density |
| `cellSize` | number | `18` | Size in pixels for each ASCII grid cell |
| `density` | number | `0.85` | Particle density factor across the canvas |
| `glyphOpacity` | number | `0.95` | Maximum opacity of rendered glyphs |
| `glow` | number | `0.42` | Radial canvas drop-shadow and bloom intensity |
| `speed` | number | `0.85` | Animation time scale factor |
| `clickEffect` | string | `'wave'` | Click ripple mode: `'wave'`, `'burst'`, or `'none'` |
