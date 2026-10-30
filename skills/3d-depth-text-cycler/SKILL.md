---
name: 3d-depth-text-cycler
description: >-
  3D multi-layered extruded typography component with CSS 3D perspective, interactive pointer-tracking tilt, auto-orbit physics, and headline cycling with smooth glow-in/glow-out filter transitions.
---

# 3D Depth Text Cycler Skill

A high-performance CSS 3D extruded typography engine that creates physical depth through hardware-accelerated text layering. Includes pointer-tracking orbital tilt, hover depth displacement, and an automatic headline cycler with multi-stage glow transitions.

---

## Architecture & How It Works

1. **Z-Axis Extrusion via Layering**:
   - Rather than relying on heavy WebGL text mesh generators, the component stacks $N$ (e.g. 36) layered `<span>` elements positioned absolutely in a 3D-perspective container.
   - Each layer is translated back along the Z-axis:
     $$\text{translateZ}(-i \times \text{step})$$
   - Layers 1 to $N-1$ are rendered in `depthColor` (e.g. `#dc2626`) to form the extruded sides, while layer 0 is rendered in `faceColor` (e.g. `#ffffff`) as the crisp front face.

2. **Pointer Tracking & Auto-Orbit Physics**:
   - Calculates normalized mouse coordinates $(X, Y) \in [-1, 1]$.
   - Applies smooth exponential damping (smoothing factor = 0.14) to eliminate jitter:
     $$\text{currentAngle} = \text{currentAngle} + (\text{targetAngle} - \text{currentAngle}) \times \text{smoothing}$$
   - When idle, an auto-orbit trigonometric cycle gently rocks the text in 3D space.

3. **Glow-In / Glow-Out Transition Stage**:
   - Text cycler uses a 3-stage state machine (`visible` $\rightarrow$ `glow-out` $\rightarrow$ `glow-in` $\rightarrow$ `visible`):
     - `glow-out`: Scales down to 0.97, blurs to 6px, and blooms with a 35px drop-shadow.
     - `glow-in`: Phrase switches, scales to 1.01, reduces blur to 1.5px.
     - `visible`: Returns smoothly to 1.0 with sharp contrast.

---

## Component Files

- [`src/components/DepthText.jsx`](file:///d:/Education/Internship/Star%20Ventures/src/components/DepthText.jsx): Core 3D layered text engine
- [`src/components/DepthText.css`](file:///d:/Education/Internship/Star%20Ventures/src/components/DepthText.css): Perspective & layer transform rules
- [`src/components/mountDepthText.jsx`](file:///d:/Education/Internship/Star%20Ventures/src/components/mountDepthText.jsx): Cycler controller and mount bridge

---

## Usage in React & Next.js

```jsx
import DepthText from './components/DepthText';

export default function HeroHeadline() {
  return (
    <DepthText
      text="Build What’s Next"
      layers={36}
      depth={2.6}
      depthColor="#dc2626"
      faceColor="#ffffff"
      tilt={6.5}
      pointerTracking={true}
      autoOrbit={true}
      orbitSpeed={0.3}
      fontSize="clamp(2.75rem, 6.8vw, 5.25rem)"
      fontWeight={900}
    />
  );
}
```

---

## Usage in Vanilla HTML & Vite Projects

```html
<div id="heroDepthMount"></div>

<script type="module">
  import { mountDepthText } from './src/components/mountDepthText.jsx';

  const depthController = mountDepthText(document.getElementById("heroDepthMount"), {
    phrases: [
      "Build What’s Next",
      "Patient Capital",
      "Transformative Ideas",
      "Enduring Ventures"
    ],
    initialDepthColor: '#dc2626',
    cycleInterval: 4200,
    autoCycle: true
  });
</script>
```

---

## Controller API Reference

| Method | Parameters | Description |
| :--- | :--- | :--- |
| `setText(val, color?)` | `text: string, color?: string` | Transitions immediately to the specified text with glow effect. |
| `setDepthColor(color)` | `color: string` | Updates the extruded depth color dynamically. |
| `nextPhrase()` | none | Manually advances to the next phrase in the cycler list. |
| `resumeAuto()` | none | Resumes automated timer cycling. |
| `destroy()` | none | Cleanly unmounts React root and clears intervals. |
