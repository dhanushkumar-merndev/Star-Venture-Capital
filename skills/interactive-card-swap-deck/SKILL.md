---
name: interactive-card-swap-deck
description: >-
  3D perspective stacked interactive card deck with physics-based card cycling, synchronized navigation pills, swipe gestures, and keyboard navigation.
---

# Interactive 3D Card Swap Deck Skill

An interactive card deck pattern that displays a collection of items (such as investment thesis pillars, core principles, or product features) stacked in physical 3D perspective. Clicking anywhere on the deck flips the front card smoothly with spring physics and rotates it to the back.

---

## Technical Mechanism

1. **Layered 3D Perspective Stack**:
   - The deck container sets `perspective: 1000px`.
   - Each card is assigned an offset index $i \in [0, N-1]$ relative to the current active card:
     $$\text{transform} = \text{translateY}(i \times 14\text{px}) \times \text{translateZ}(-i \times 32\text{px}) \times \text{scale}(1 - i \times 0.045)$$
2. **Spring Swap Physics**:
   - When swapped, the top card moves up and out (`translateY(-80px) rotateX(12deg) scale(1.05)`), fades, and re-enters at the bottom of the stack with cubic-bezier transition (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
3. **Synchronized Navigation Bridge**:
   - Connected to side-by-side selection pills, arrow keys, and previous/next buttons.

---

## Integration Code

```javascript
import { initCardSwap } from './src/scripts/cardSwap.js';

const deckData = [
  {
    id: "conviction",
    index: "01",
    title: "High-Conviction Selectivity",
    summary: "Concentrated annual deployment ensuring deep executive attention.",
    details: ["Focused portfolio", "Partner communication", "Decisive approvals"]
  },
  {
    id: "synergy",
    index: "02",
    title: "Operational Capability Bridge",
    summary: "Connecting ventures with engineering, media, and facilities.",
    details: ["Workflow automation", "Brand scaling", "Workspace architecture"]
  }
];

initCardSwap(deckData);
```
