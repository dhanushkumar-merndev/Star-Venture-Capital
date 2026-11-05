import React, { useState, useEffect, useRef, useCallback } from 'react';
import SlicedWaves from './SlicedWaves';
import './SlicedWaveMatrix.css';

export const MATRIX_ITEMS = [
  {
    id: "philosophy",
    index: "01",
    tag: "01 · PHILOSOPHY",
    title: "Investment Approach",
    shortTitle: "Approach",
    desc: "Discover our 4 core pillars: High conviction, operational synergy, patient capital, and founder stewardship with an interactive 3D card deck.",
    href: "/approach.html",
    cta: "Read Investment Thesis",
    edge: "top",
    xRatio: 0.16,
    themeColor: "#ef4444"
  },
  {
    id: "sectors",
    index: "02",
    tag: "02 · SECTORS",
    title: "Investment Focus",
    shortTitle: "Focus",
    desc: "Explore our 5 strategic domains: Enterprise Software, Brand Tech, Media Production Tech, Built Spaces, and Eco Infrastructure.",
    href: "/focus.html",
    cta: "View Focus Sectors",
    edge: "bottom",
    xRatio: 0.30,
    themeColor: "#b91c1c"
  },
  {
    id: "ecosystem",
    index: "03",
    tag: "03 · ECOSYSTEM",
    title: "Star Groups Capabilities",
    shortTitle: "Capabilities",
    desc: "Understand our parent group lineage across StarTech, Growth Hub, Production, Garden, and Space Interiors, with our governance framework.",
    href: "/capabilities.html",
    cta: "Inspect Capability Map",
    edge: "top",
    xRatio: 0.44,
    themeColor: "#831843"
  },
  {
    id: "deployments",
    index: "04",
    tag: "04 · DEPLOYMENTS",
    title: "Portfolio & Syndicate",
    shortTitle: "Portfolio",
    desc: "View active co-investments, stealth deployment tracks, and ecosystem syndicate benchmarks with interactive filtering.",
    href: "/portfolio.html",
    cta: "Browse Portfolio Tracks",
    edge: "bottom",
    xRatio: 0.58,
    themeColor: "#991b1b"
  },
  {
    id: "timeline",
    index: "05",
    tag: "05 · TIMELINE",
    title: "Investment Process",
    shortTitle: "Process",
    desc: "Review our transparent 4-stage evaluation workflow from initial 5-day review to diligence, term sheets, and close.",
    href: "/process.html",
    cta: "Check Founder Timeline",
    edge: "top",
    xRatio: 0.72,
    themeColor: "#ef4444"
  },
  {
    id: "oversight",
    index: "06",
    tag: "06 · OVERSIGHT",
    title: "Governance & Oversight",
    shortTitle: "Governance",
    desc: "Learn about our investment committee governance, fiduciary integrity standards, and direct partner access protocols.",
    href: "/governance.html",
    cta: "Review Governance",
    edge: "bottom",
    xRatio: 0.86,
    themeColor: "#4a044e"
  }
];

export default function SlicedWaveMatrix({ items = MATRIX_ITEMS }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const svgLinesRef = useRef([]);
  const svgDotsRef = useRef([]);
  const barZonesRef = useRef([]);

  const currentBarXRef = useRef(items.map(it => 0));
  const expandedIndexRef = useRef(expandedIndex);
  expandedIndexRef.current = expandedIndex;
  const hoveredIndexRef = useRef(hoveredIndex);
  hoveredIndexRef.current = hoveredIndex;

  // Toggle card expansion
  const handleToggle = (idx, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedIndex(prev => (prev === idx ? null : idx));
  };

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedIndex(null);
  };

  // Click on background: If near any bar, open it; otherwise close
  const handleContainerClick = (e) => {
    if (e.target.closest('.wave-node-item') || e.target.closest('.wave-bar-hit-zone') || e.target.closest('.wave-matrix-footer-nav')) {
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    // Check if clicked close to any bar's current X position
    let closestIdx = -1;
    let minD = 55;
    for (let i = 0; i < currentBarXRef.current.length; i++) {
      const d = Math.abs(currentBarXRef.current[i] - clickX);
      if (d < minD) {
        minD = d;
        closestIdx = i;
      }
    }

    if (closestIdx !== -1) {
      setExpandedIndex(prev => (prev === closestIdx ? null : closestIdx));
    } else {
      setExpandedIndex(null);
    }
  };

  // Wave update callback triggered each frame from SlicedWaves WebGL loop
  const handleWaveUpdate = useCallback(({
    view,
    state,
    settings,
    TAU,
    frequency,
    separation,
    amplitude,
    thickness,
    base,
    sweep
  }) => {
    if (!view.bars || view.bars.length === 0) return;
    const w = state.width;
    const h = state.height;
    const t = state.time;

    items.forEach((item, idx) => {
      const nodeEl = nodesRef.current[idx];
      const lineEl = svgLinesRef.current[idx];
      const dotEl = svgDotsRef.current[idx];
      const barZoneEl = barZonesRef.current[idx];
      if (!nodeEl) return;

      const isTop = item.edge === 'top';
      const targetX = item.xRatio * w;

      // Find closest bar in view.bars
      let bestBar = view.bars[0];
      let minD = Math.abs(bestBar.sx - targetX);
      for (let i = 1; i < view.bars.length; i++) {
        const d = Math.abs(view.bars[i].sx - targetX);
        if (d < minD) {
          minD = d;
          bestBar = view.bars[i];
        }
      }

      currentBarXRef.current[idx] = bestBar.sx;

      // Ribbon calculation:
      // TOP ribbon is r = settings.ribbons - 1, and BOTTOM is r = 0.
      const r = isTop ? settings.ribbons - 1 : 0;
      const offset = (r - (settings.ribbons - 1) / 2) * separation;
      const wave =
        0.62 * Math.sin(TAU * frequency * bestBar.x - t * 1.6 + r * 2.1) +
        0.38 * Math.sin(TAU * frequency * 1.9 * bestBar.x + t * 2.25 + r * 1.3);
      const yc = offset + wave * amplitude;
      const swell = 0.5 + 0.5 * Math.sin(TAU * frequency * 0.7 * bestBar.x + t * 1.1 + r * 2.7);
      const across = bestBar.sx / Math.max(w, 1);
      const grow = Math.min(1, Math.max(0, (state.intro * sweep - across - r * 0.04) / 0.6));
      const eased = grow * grow * (3 - 2 * grow);
      const th = thickness * (0.6 + 0.4 * swell) * eased;
      const hh = th * bestBar.scale;
      const sy = base - yc * bestBar.scale;

      // Exact wave edge point
      const edgeY = isTop ? (sy - hh) : (sy + hh);
      const waveX = bestBar.sx;

      const isExpanded = expandedIndexRef.current === idx;

      // Responsive layout checks
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;

      // Position card: carried smoothly with the wave
      // Add safe boundary clamping so Card 01 and Card 06 NEVER touch screen edges
      const halfCardWidth = isExpanded 
        ? (isMobile ? Math.min(160, w * 0.44) : 185) 
        : (isMobile ? 50 : 95);
      const edgePad = isMobile ? 12 : 36;
      const clampedX = Math.max(halfCardWidth + edgePad, Math.min(waveX, w - halfCardWidth - edgePad));

      let cardY;
      let cardAnchorY;
      if (isExpanded) {
        if (isMobile) {
          // On mobile, center detailed card vertically for clean inspection
          cardY = h * 0.5;
          cardAnchorY = isTop ? cardY - 110 : cardY + 110;
        } else {
          // Detailed card on desktop: anchored comfortably inside container boundaries without clipping
          if (isTop) {
            cardY = Math.max(170, Math.min(edgeY - 145, 225));
            cardAnchorY = cardY + 115;
          } else {
            cardY = Math.min(h - 170, Math.max(edgeY + 145, h - 225));
            cardAnchorY = cardY - 115;
          }
        }
      } else {
        if (isMobile) {
          // Compact tiny card riding wave on mobile with clean vertical clearance
          const vertOffset = isTop ? 44 : 44;
          cardY = isTop ? Math.max(26, edgeY - vertOffset) : Math.min(h - 26, edgeY + vertOffset);
          cardAnchorY = isTop ? cardY + 15 : cardY - 15;
        } else {
          // Compact tiny card riding the wave up and down on desktop
          if (isTop) {
            cardY = edgeY - 60;
            cardAnchorY = cardY + 18;
          } else {
            cardY = edgeY + 60;
            cardAnchorY = cardY - 18;
          }
        }
      }

      // Update card node position
      nodeEl.style.left = `${clampedX}px`;
      nodeEl.style.top = `${cardY}px`;

      // Update clickable vertical bar hit-zone
      if (barZoneEl) {
        barZoneEl.style.left = `${waveX}px`;
      }

      // Update SVG connecting tether line (from wave edge to card)
      if (lineEl) {
        lineEl.setAttribute('x1', waveX);
        lineEl.setAttribute('y1', edgeY);
        lineEl.setAttribute('x2', clampedX);
        lineEl.setAttribute('y2', cardAnchorY);
      }

      // Update wave edge anchor pulse dot
      if (dotEl) {
        dotEl.setAttribute('cx', waveX);
        dotEl.setAttribute('cy', edgeY);
      }
    });
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="wave-matrix-wrapper"
      onClick={handleContainerClick}
      role="region"
      aria-label="Interactive Full-Screen Sliced Waves Institutional Overview"
    >
      {/* SlicedWaves Full-Screen Canvas Host */}
      <div className="wave-matrix-canvas-host">
        <SlicedWaves
          color1="#ef4444" // Radiant Star Red
          color2="#991b1b" // Deep Crimson Red
          color3="#4a044e" // Velvet Wine / Bordeaux
          ribbons={3}
          spacing={28}
          barWidth={0.52}
          ribbonHeight={0.27}
          spread={0.11}
          amplitude={0.11}
          frequency={1.05}
          speed={0.9}
          perspective={0.45}
          curve={0.5}
          blur={0.55}
          glow={1.1}
          brightness={1.35}
          position={0.5} // Perfectly centered vertically in the middle
          mouseInteraction={true}
          lightMode={true} // Transparent WebGL canvas on white background
          grain={0.04}
          onWaveUpdate={handleWaveUpdate}
        />
      </div>

      {/* SVG Connecting Tethers & Pulse Anchors */}
      <svg className="wave-matrix-svg-layer" aria-hidden="true">
        <defs>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {items.map((item, idx) => {
          const isSelected = expandedIndex === idx || hoveredIndex === idx;

          return (
            <g key={`tether-${item.id}`}>
              {/* Connecting Stem Line */}
              <line
                ref={el => (svgLinesRef.current[idx] = el)}
                stroke="#dc2626"
                strokeWidth={isSelected ? '2.5' : '1.8'}
                strokeDasharray={isSelected ? 'none' : '4 3'}
                opacity={expandedIndex === null || isSelected ? 0.95 : 0.25}
              />
              {/* Wave Edge Anchor Dot */}
              <circle
                ref={el => (svgDotsRef.current[idx] = el)}
                r={isSelected ? 6.5 : 4.5}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#waveGlow)"
                opacity={expandedIndex === null || isSelected ? 1 : 0.3}
              />
            </g>
          );
        })}
      </svg>

      {/* Vertical Clickable Bar Hit-Zones across each pillar slice */}
      <div className="wave-matrix-hit-zones-host">
        {items.map((item, idx) => (
          <div
            key={`zone-${item.id}`}
            ref={el => (barZonesRef.current[idx] = el)}
            className={`wave-bar-hit-zone ${hoveredIndex === idx ? 'is-hovered' : ''} ${expandedIndex === idx ? 'is-expanded' : ''}`}
            onClick={e => handleToggle(idx, e)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={`Click wave slice to open ${item.title}`}
            aria-label={`Open ${item.title}`}
          />
        ))}
      </div>

      {/* Interactive Floating Nodes (Carried with Wave up and down) */}
      <div className="wave-matrix-nodes-host">
        {items.map((item, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={item.id}
              ref={el => (nodesRef.current[idx] = el)}
              className={`wave-node-item ${isExpanded ? 'is-expanded' : ''}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {isExpanded ? (
                /* Detailed Card View */
                <div
                  id={`wave-expanded-card-${idx}`}
                  className="wave-detailed-card"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="wave-card-top-bar">
                    <span className="wave-card-tag">{item.tag}</span>
                    <button
                      type="button"
                      className="wave-card-close-btn"
                      onClick={handleClose}
                      aria-label="Close detailed card"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="wave-card-headline">{item.title}</h3>
                  <p className="wave-card-description">{item.desc}</p>

                  <a href={item.href} className="wave-card-action-btn">
                    <span>{item.cta}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              ) : (
                /* Compact Floating Tiny Card (Carried by Wave) */
                <button
                  id={`wave-card-${idx}`}
                  type="button"
                  className="wave-tiny-card"
                  onClick={e => handleToggle(idx, e)}
                  aria-expanded="false"
                  aria-label={`Inspect ${item.title}`}
                >
                  <span className="wave-node-num">{item.index}</span>
                  <span className="wave-node-title wave-node-title-desktop">{item.title}</span>
                  <span className="wave-node-title wave-node-title-mobile">{item.shortTitle || item.title}</span>
                  <span className="wave-node-chevron">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {item.edge === 'top' ? (
                        <polyline points="6 15 12 9 18 15" />
                      ) : (
                        <polyline points="6 9 12 15 18 9" />
                      )}
                    </svg>
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Dots for quick inspection */}
      <div className="wave-matrix-footer-nav">
        <div className="wave-footer-pill">
          <span>Overview Tracks</span>
          <div className="wave-footer-dot-nav">
            {items.map((it, idx) => (
              <button
                key={`dot-${it.id}`}
                id={`wave-dot-${idx}`}
                type="button"
                className={`wave-dot-btn ${expandedIndex === idx ? 'is-active' : ''}`}
                onClick={e => handleToggle(idx, e)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                title={it.title}
                aria-label={`Jump to ${it.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
