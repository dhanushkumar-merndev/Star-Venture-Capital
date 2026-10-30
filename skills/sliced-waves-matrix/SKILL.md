---
name: sliced-waves-matrix
description: >-
  Interactive WebGL2 Sliced Waves canvas with dynamic wave-edge tracking, floating cards carried up and down by wave crests and troughs, full-column interactive bar hit-zones, and click-to-expand detailed cards.
---

# Sliced Waves Matrix Skill

A state-of-the-art interactive WebGL2 component combining fluid mathematical multi-ribbon waves with dynamic DOM element tracking. Floating tags ride the crests and troughs of the moving wave, and clicking either the tag or the wave slice directly expands it into an informative detailed card.

---

## Key Features & Architecture

1. **WebGL2 Instanced Shader Pipeline**:
   - High-performance instanced rendering of vertical sliced bars with halo blur, glow, erf-approximated soft edges, and composite tone-mapping.
   - Transparent alpha blending (`lightMode: true`) optimized for pure white (`#ffffff`) or light backgrounds without murky artifacts.
2. **Mathematical Fluid Wave Physics**:
   - Compound harmonic sine wave equations driven by high-precision delta time:
     $$\text{wave}(x, t, r) = 0.62 \sin(\tau f x - 1.6 t + 2.1 r) + 0.38 \sin(1.9 \tau f x + 2.25 t + 1.3 r)$$
3. **Dynamic Wave-Edge Tracking**:
   - The component exposes an `onWaveUpdate` callback triggered on every animation frame.
   - Calculates the exact screen `(x, y)` coordinates of the top ribbon's upper edge and bottom ribbon's lower edge.
   - Synchronizes DOM elements (cards, anchor rings, dashed SVG tethers) directly to the wave with 60 FPS performance without React state overhead.
4. **Interactive Bar-Click Hit Zones**:
   - Solves the UX challenge of clicking moving targets by turning the entire vertical slice of the wave (96px wide column) into a clickable hit-zone.
   - Interactive center slice pills on the wave ribbons show item numbers (`01`–`06`).
   - Clicking the sliced bar, the center pill, the tether line, or the card pill immediately expands that item.
5. **Smart Viewport Clamping**:
   - Prevents the first card on the left and the last card on the right from clipping or colliding with the screen edges:
     $$\text{clampedX} = \max(\text{halfWidth} + 36\text{px}, \min(\text{waveX}, \text{width} - \text{halfWidth} - 36\text{px}))$$

---

## Visual Design & Color Harmony

- **Ribbon Colors**:
  - `color1`: Radiant Star Red (`#ef4444`)
  - `color2`: Deep Crimson Red (`#991b1b`)
  - `color3`: Velvet Wine / Bordeaux (`#4a044e`)
- **Background**: Pure white (`#ffffff`) with subtle radial dot grid (`rgba(220, 38, 38, 0.04)` at 28px).
- **Cards**: Clean elevated white surface (`#ffffff`, border `rgba(220, 38, 38, 0.25)`, red index badge, dark slate typography).
- **Expanded State**: Elevated box-shadow (`0 25px 60px -12px rgba(153, 27, 27, 0.28)`), category badge, full descriptive text, close button, and gradient action button.

---

## File Structure

```
src/components/
├── SlicedWaves.jsx          # Core WebGL2 shader & animation engine
├── SlicedWaves.css          # Canvas container styling
├── SlicedWaveMatrix.jsx     # Wave matrix tracking, hit-zones & expanded cards
├── SlicedWaveMatrix.css     # Full-bleed layout, card styles & animations
└── mountWaveMatrix.jsx      # Standalone mount helper for HTML integration
```

---

## Complete Implementation Code

### 1. WebGL2 Shaders & Engine (`SlicedWaves.jsx`)

```javascript
'use client';

import React, { useEffect, useRef } from 'react';
import './SlicedWaves.css';

const BAR_VERTEX = `#version 300 es
in vec2 aCorner;
in vec4 aShape;
in vec4 aTop;
in vec4 aBottom;
uniform vec2 uView;
uniform float uAngle;
out vec2 vLocal;
out vec4 vShape;
out vec4 vTop;
out vec4 vBottom;
void main() {
  float halo = aShape.z + 5.0;
  float reachX = aShape.z + max(aTop.w * 2.5, halo * 2.0);
  float reachY = aShape.w + max(aTop.w * 2.5, halo * 2.0);
  vec2 local = aCorner * vec2(reachX, reachY);
  vLocal = local;
  vShape = aShape;
  vTop = aTop;
  vBottom = aBottom;
  float c = cos(uAngle);
  float s = sin(uAngle);
  vec2 p = aShape.xy + local - uView * 0.5;
  p = vec2(c * p.x - s * p.y, s * p.x + c * p.y) + uView * 0.5;
  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);
}`;

const BAR_FRAGMENT = `#version 300 es
precision highp float;
in vec2 vLocal;
in vec4 vShape;
in vec4 vTop;
in vec4 vBottom;
uniform float uGlow;
uniform float uSlices;
uniform float uBase;
uniform float uHalfBar;
uniform float uScale;
out vec4 outColor;

float erfApprox(float x) {
  float a = x * x;
  float t = 1.0 - exp(-a * (1.2732395 + 0.147 * a) / (1.0 + 0.147 * a));
  return sign(x) * sqrt(max(t, 0.0));
}

float box(float d, float h, float s) {
  float k = 0.70710678 / max(s, 0.3);
  return 0.5 * (erfApprox((h - d) * k) + erfApprox((h + d) * k));
}

void main() {
  float blur = vTop.w;
  float body = box(vLocal.x, vShape.z, blur) * box(vLocal.y, vShape.w, blur * 1.15);
  float halo = vShape.z + 5.0;
  float glow = box(vLocal.x, vShape.z, halo) * box(vLocal.y, vShape.w, halo);
  float t = clamp(vLocal.y / max(vShape.w, 0.001) * 0.5 + 0.5, 0.0, 1.0);
  vec3 color = mix(vTop.rgb, vBottom.rgb, t);
  float v = clamp(vLocal.y / max(vShape.w, 0.001), -1.0, 1.0);
  float core = exp(-pow(vLocal.x / max(vShape.z + blur * 0.5, 0.5), 2.0) * 1.5);
  body *= (1.0 + 0.35 * core) * (1.0 - 0.35 * v * v * v * v);
  if (uSlices > 0.0) {
    float cell = vShape.z / max(uHalfBar, 0.00001) / uSlices;
    float y = (uBase - vShape.y - vLocal.y) / max(cell, 0.001);
    float f = 1.0 - abs(fract(y) - 0.5) * 2.0;
    float soft = clamp(blur / max(cell, 0.001) * 1.6, 0.04, 1.0);
    body *= smoothstep(0.28 - soft, 0.28 + soft, f);
  }
  vec3 tint = color * color / max(max(color.r, max(color.g, color.b)), 0.05);
  outColor = vec4((color * body + tint * uGlow * glow * 0.16) * vBottom.w * uScale, 1.0);
}`;

const QUAD_VERTEX = `#version 300 es
in vec2 aCorner;
void main() {
  gl_Position = vec4(aCorner, 0.0, 1.0);
}`;

const COMPOSITE = `#version 300 es
precision highp float;
uniform sampler2D uLight;
uniform vec2 uResolution;
uniform float uScale;
uniform float uExposure;
uniform float uGrain;
uniform float uTime;
uniform float uFade;
uniform float uOpacity;
uniform float uLightMode;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float smootherstep(float edge, float x) {
  float t = clamp(x / max(edge, 0.0001), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec3 hdr = texelFetch(uLight, ivec2(gl_FragCoord.xy), 0).rgb / uScale * uExposure;
  vec2 uv = gl_FragCoord.xy / uResolution;
  float edge = uFade * 0.5;
  float mask = smootherstep(edge, uv.x) * smootherstep(edge, 1.0 - uv.x) * smootherstep(edge, uv.y) * smootherstep(edge, 1.0 - uv.y);
  mask *= uOpacity;
  float grain = (hash(gl_FragCoord.xy + fract(uTime * 7.31) * 113.0) - 0.5) * uGrain;
  float peak = max(hdr.r, max(hdr.g, hdr.b));
  if (uLightMode > 0.5) {
    vec3 hue = hdr / max(peak, 0.0001);
    float tone = dot(hue, vec3(0.2126, 0.7152, 0.0722));
    vec3 color = pow(clamp(hue * min(1.0, 0.66 / max(tone, 0.001)), 0.0, 1.0), vec3(1.0 / 2.2));
    float alpha = clamp((1.0 - exp(-peak * 1.1)) * 0.85 * (1.0 + grain), 0.0, 1.0) * mask;
    outColor = vec4(color * alpha, alpha);
  } else {
    vec3 mapped = 1.0 - exp(-hdr);
    mapped = mix(mapped, vec3(1.0), smoothstep(1.1, 3.2, peak) * 0.75);
    float level = max(mapped.r, max(mapped.g, mapped.b));
    mapped = clamp(mapped + grain * (0.25 + level), 0.0, 1.0) * mask;
    outColor = vec4(mapped, max(mapped.r, max(mapped.g, mapped.b)));
  }
}`;
```

---

### 2. Wave-Edge Calculation Formula

In WebGL screen space with `gl_Position.y = 1.0 - p.y / height * 2.0`, pixels run from top (0) to bottom (`height`).
- The **upper ribbon on screen** is `r = ribbons - 1` (positive vertical displacement).
- The **lower ribbon on screen** is `r = 0` (negative vertical displacement).

```javascript
// Screen coordinates for top and bottom wave edges
const topRibbonIdx = settings.ribbons - 1;
const topY = base - ycTop * scale - halfHeight;

const bottomRibbonIdx = 0;
const bottomY = base - ycBottom * scale + halfHeight;
```

---

### 3. Usage & Integration

```jsx
import SlicedWaveMatrix from './components/SlicedWaveMatrix';

export default function OverviewPage() {
  return (
    <section className="section-fullscreen" style={{ background: '#ffffff' }}>
      <SlicedWaveMatrix />
    </section>
  );
}
```

Or in vanilla HTML projects:
```javascript
import { mountWaveMatrix } from './components/mountWaveMatrix.jsx';

const container = document.getElementById('waveMount');
mountWaveMatrix(container);
```

---

## Configuration Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color1` | string | `'#ef4444'` | Dominant wave color (crimson / star red) |
| `color2` | string | `'#991b1b'` | Intermediate wave color (dark red) |
| `color3` | string | `'#4a044e'` | Deep ambient color (wine / bordeaux) |
| `ribbons` | number | `3` | Number of simultaneous undulating wave ribbons |
| `spacing` | number | `28` | Pitch distance between vertical sliced bars |
| `barWidth` | number | `0.52` | Width ratio of each vertical bar slice |
| `ribbonHeight` | number | `0.27` | Thickness scale of individual wave ribbons |
| `position` | number | `0.5` | Vertical center ratio (0.5 = vertically centered) |
| `lightMode` | boolean | `true` | True for transparent canvas over white background |
| `onWaveUpdate` | function | `callback` | Receives exact bar coordinates each animation frame |
