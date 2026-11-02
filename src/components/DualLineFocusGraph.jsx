import React, { useState, useEffect, useRef } from 'react';
import './DualLineFocusGraph.css';

/**
 * 6 Investment Focus Sectors
 * 3 allocated to the Bold Gradient Line, 3 allocated to the Thin Gradient Line.
 */
export const FOCUS_SECTORS = [
  {
    id: "software",
    index: "01",
    lineType: "bold",
    edge: "top", // tag pill positioned above peak
    tag: "Digital Core",
    title: "Enterprise Software & Workflows",
    shortTitle: "Enterprise Software",
    description: "Vertical SaaS, intelligent workflow automation, CRM/HRMS architectures, and proprietary business tooling that power modern enterprise productivity and mission-critical operations.",
    criteria: [
      "Clear, measurable ROI for mid-to-large business buyers",
      "High net revenue retention and multi-product expansion potential",
      "Proprietary data moats and deeply entrenched daily workflows",
    ],
    synergy: "StarTech India · Enterprise Systems & Workflow Automation",
    enquirySector: "Enterprise Software & Workflows",
    themeColor: "#DC2626",
    xRatio: 0.125,
  },
  {
    id: "brand-consumer",
    index: "02",
    lineType: "bold",
    edge: "bottom", // tag pill positioned below trough
    tag: "Consumer & Commerce",
    title: "Brand Tech & Consumer Platforms",
    shortTitle: "Brand & Commerce",
    description: "Technology-enabled direct-to-consumer platforms, digital commerce infrastructure, and high-engagement consumer experiences with sustainable acquisition economics.",
    criteria: [
      "Distinct brand positioning and proven organic customer affinity",
      "Sustainable customer acquisition unit economics and payback cycles",
      "Scalable, transparent supply chain and fulfillment integration",
    ],
    synergy: "Star Growth Hub · Brand Identity & Performance Marketing",
    enquirySector: "Brand & Consumer Tech",
    themeColor: "#E11D48",
    xRatio: 0.283,
  },
  {
    id: "creative-media",
    index: "03",
    lineType: "bold",
    edge: "top", // tag pill positioned above peak
    tag: "Media & Culture",
    title: "Media Production & Creative Tech",
    shortTitle: "Creative Media Tech",
    description: "Digital storytelling platforms, production automation, modern content distribution channels, and rich-media interactive technologies redefining creative economies.",
    criteria: [
      "Scalable creator and studio production workflows",
      "IP ownership and digital distribution leverage",
      "High audience engagement, retention, and community loyalty",
    ],
    synergy: "Star Production · Cinematic Media & Video Storytelling",
    enquirySector: "Media & Content Production Tech",
    themeColor: "#991B1B",
    xRatio: 0.442,
  },
  {
    id: "built-spaces",
    index: "04",
    lineType: "bold",
    edge: "bottom", // tag pill positioned below trough
    tag: "Built Environment",
    title: "Tech-Enabled Spaces & Interiors",
    shortTitle: "Tech-Enabled Spaces",
    description: "Smart workspace solutions, commercial architectural tech, IoT-integrated building design, and modular commercial interior ecosystems for modern commercial enterprises.",
    criteria: [
      "Rapid deployment architectural frameworks",
      "Enterprise commercial real estate integration",
      "Resource efficiency, acoustic wellness, and modern ergonomics",
    ],
    synergy: "Star Space Interiors · High-Performance Workspaces",
    enquirySector: "Built Environment & Space Tech",
    themeColor: "#701A75",
    xRatio: 0.600,
  },
  {
    id: "eco-landscapes",
    index: "05",
    lineType: "bold",
    edge: "top", // tag pill positioned above peak
    tag: "Eco & Sustainability",
    title: "Sustainable Living & Eco Infrastructure",
    shortTitle: "Eco Infrastructure",
    description: "Vertical biophilic designs, commercial plant ecosystems, urban greening, and environmental maintenance tech creating wellness-certified forward developments.",
    criteria: [
      "Demonstrated environmental, air quality, and wellness impact",
      "Long-term recurring commercial service contracts",
      "Modular, sustainable installation frameworks and IoT monitoring",
    ],
    synergy: "Star Garden · Biophilic Architecture & Sustainable Landscaping",
    enquirySector: "Sustainable Living & Eco Infrastructure",
    themeColor: "#4C0519",
    xRatio: 0.758,
  },
  {
    id: "fintech-rails",
    index: "06",
    lineType: "bold",
    edge: "bottom", // tag pill positioned below trough
    tag: "Fintech & Capital Rails",
    title: "Financial Infrastructure & Capital Rails",
    shortTitle: "Fintech & Capital Rails",
    description: "Next-generation institutional liquidity rails, compliance automation, alternative lending engines, and embedded capital workflows driving modern enterprise commerce.",
    criteria: [
      "Regulated compliance architecture and defensible risk models",
      "High transaction velocity and compounding processing volume",
      "Embedded B2B payment rails and seamless treasury settlement",
    ],
    synergy: "Star Capital Syndicate · Institutional Co-Investment Network",
    enquirySector: "Other Transformative Industry",
    themeColor: "#3B0764",
    xRatio: 0.917,
  },
];

export default function DualLineFocusGraph({
  sectors = FOCUS_SECTORS,
  initialExpanded = null,
}) {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(initialExpanded);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'bold' | 'thin'
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1 = Normal Slow, 0.35 = Ultra Slow, 0 = Paused

  // Real-time animation coordinates
  const [graphState, setGraphState] = useState({
    boldPath: '',
    thinPath: '',
    nodes: sectors.map((s) => ({
      x: s.xRatio * 1200,
      dotY: s.edge === 'top' ? 178 : 342,
      pillY: s.edge === 'top' ? 122 : 398,
      tetherEndY: s.edge === 'top' ? 140 : 380,
    })),
  });

  const animFrameRef = useRef(null);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const speedRef = useRef(speedMultiplier);
  speedRef.current = speedMultiplier;

  // Viewport IntersectionObserver to trigger slow-motion cascade from up to below
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Replay slow motion transition
  const handleReplayTransition = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setIsRevealed(true);
    }, 60);
  };

  // Keyboard navigation for expanded card modal (ESC to close, Left/Right to cycle)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (expandedIndex === null) return;

      if (e.key === 'Escape') {
        setExpandedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setExpandedIndex((prev) => (prev === null ? 0 : (prev + 1) % sectors.length));
      } else if (e.key === 'ArrowLeft') {
        setExpandedIndex((prev) => (prev === null ? 0 : (prev - 1 + sectors.length) % sectors.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedIndex, sectors.length]);

  /**
   * 60fps Mathematical Animation Loop
   * - SVG ViewBox: 1200 x 520
   * - Line 1 (Bold): Pure harmonic sine wave with strictly alternating peaks & troughs
   * - Line 2 (Thin): Exact counter-phase harmonic wave (DNA double-helix structure)
   * - Symmetrical rigid motion: When Line 1 moves UP, Line 2 moves DOWN in the same opposite direction
   * - Zero unwanted secondary waves or chaotic multi-frequency interference
   */
  useEffect(() => {
    const svgWidth = 1200;
    const svgHeight = 520;
    const numPoints = 48; // Smooth 48-point resolution for clean curvature
    const stepX = svgWidth / (numPoints - 1);
    const lambda = 380;
    const k = (2 * Math.PI) / lambda;
    const phi0 = 150 * k - Math.PI / 2; // Anchors Station 1 at exact mathematical peak

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = Math.min(64, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      // Update time according to speed multiplier
      timeRef.current += delta * speedRef.current;
      const t = timeRef.current;

      // When a card is actively expanded, reduce speed to 25% for calm inspection
      const activeSpeed = expandedIndex !== null ? 0.25 : 1.0;
      const effectiveT = t * activeSpeed;

      // Symmetrical rigid vertical motion (Lines move upward and downward, not an amplitude breath effect)
      // Fixed rigid amplitude — curvature stays perfectly consistent
      const baseAmp = 82;
      // Rigid vertical translation (Line 1 translates upward while Line 2 translates downward, and vice-versa)
      const vertShift = 22 * Math.sin(effectiveT * 0.0016);
      const phaseRock = phi0;

      // 1. Calculate Bold Line Points (Line 1: primary trajectory moving upward and downward)
      const boldPoints = [];
      for (let i = 0; i < numPoints; i++) {
        const x = i * stepX;
        const theta = k * x - phaseRock;
        const sinVal = Math.sin(theta);
        const y = 260 - vertShift - baseAmp * sinVal;
        boldPoints.push({ x, y });
      }

      // 2. Calculate Thin Line Points (Line 2: counter-directional DNA strand moving in opposite vertical direction)
      const thinPoints = [];
      for (let i = 0; i < numPoints; i++) {
        const x = i * stepX;
        const theta = k * x - phaseRock;
        const sinVal = Math.sin(theta);
        const y = 260 + vertShift + baseAmp * sinVal;
        thinPoints.push({ x, y });
      }

      // Smooth Cubic Bézier Spline generator
      const createSplinePath = (pts) => {
        if (!pts.length) return '';
        let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
        for (let i = 0; i < pts.length - 1; i++) {
          const p0 = pts[i === 0 ? 0 : i - 1];
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

          const cp1x = p1.x + (p2.x - p0.x) / 5.5;
          const cp1y = p1.y + (p2.y - p0.y) / 5.5;
          const cp2x = p2.x - (p3.x - p1.x) / 5.5;
          const cp2y = p2.y - (p3.y - p1.y) / 5.5;

          d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
        }
        return d;
      };

      const boldPath = createSplinePath(boldPoints);
      const thinPath = createSplinePath(thinPoints);

      // 3. Compute dynamic, perfectly aligned positions for each sector
      // Strictly alternating pattern: Odd sectors (01, 03, 05) sit ABOVE on crests; Even sectors (02, 04, 06) sit BELOW on troughs
      const nodes = sectors.map((sector) => {
        const targetX = sector.xRatio * svgWidth;
        const theta = k * targetX - phaseRock;
        const sinVal = Math.sin(theta);
        // Rigid vertical translation with the bold line:
        // Crests (01, 03, 05): dotY = (260 - baseAmp) - vertShift (ABOVE)
        // Troughs (02, 04, 06): dotY = (260 + baseAmp) - vertShift (BELOW)
        const dotY = 260 - vertShift - baseAmp * sinVal;

        const isTop = sector.edge === 'top';
        const offset = 56;
        const rawPillY = isTop ? dotY - offset : dotY + offset;
        const pillY = Math.max(34, Math.min(svgHeight - 34, rawPillY));
        const tetherEndY = isTop ? pillY + 18 : pillY - 18;

        return {
          x: targetX,
          dotY,
          pillY,
          tetherEndY,
        };
      });

      setGraphState({
        boldPath,
        thinPath,
        nodes,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [sectors, expandedIndex]);

  const activeSector = expandedIndex !== null ? sectors[expandedIndex] : null;

  return (
    <div
      ref={containerRef}
      className="dual-focus-graph-section"
      role="region"
      aria-label="Interactive Dual-Line Investment Focus Graph"
    >
      <div className={`dual-focus-container ${isRevealed ? 'is-revealed' : ''}`}>
        
        {/* Top Control Toolbar */}
        <div className="dual-focus-toolbar">
          <div className="dual-focus-controls">
            {/* Speed / Motion Controls */}
            <button
              type="button"
              className={`graph-ctrl-btn ${speedMultiplier === 1 ? 'is-active' : ''}`}
              onClick={() => setSpeedMultiplier(1)}
              title="Standard slow motion drift"
              aria-label="Slow motion drift"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Slow Motion</span>
            </button>

            <button
              type="button"
              className={`graph-ctrl-btn ${speedMultiplier === 0.35 ? 'is-active' : ''}`}
              onClick={() => setSpeedMultiplier(0.35)}
              title="Calm ultra slow motion"
              aria-label="Ultra slow motion"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Ultra Slow</span>
            </button>

            <button
              type="button"
              className={`graph-ctrl-btn ${speedMultiplier === 0 ? 'is-active' : ''}`}
              onClick={() => setSpeedMultiplier((prev) => (prev === 0 ? 1 : 0))}
              title="Pause or resume wave motion"
              aria-label="Pause/Resume wave motion"
            >
              {speedMultiplier === 0 ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Replay Transition */}
            <button
              type="button"
              className="graph-ctrl-btn"
              onClick={handleReplayTransition}
              title="Replay slow-motion cascade view transition from top to bottom"
              aria-label="Replay view transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Replay Transition</span>
            </button>
          </div>
        </div>

        {/* Visual Canvas Frame (Hosts both SVG Graph & HTML Pill Overlay) */}
        <div className="graph-canvas-frame">
          
          {/* ======================================================================
              SVG LAYER: Dynamic Lines, Circular Red Dots & Vertical Tether Guides
              ====================================================================== */}
          <svg
            className="dual-focus-svg"
            viewBox="0 0 1200 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              {/* Bold Line Gradient: Red -> Dark Red -> Vine (Cabernet) */}
              <linearGradient id="boldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="28%" stopColor="#DC2626" />
                <stop offset="65%" stopColor="#991B1B" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>

              {/* Thin Line Gradient: Rose Red -> Crimson -> Vine / Deep Plum */}
              <linearGradient id="thinLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F87171" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#B91C1C" stopOpacity="0.9" />
                <stop offset="72%" stopColor="#701A75" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B0764" stopOpacity="0.88" />
              </linearGradient>

              {/* Bold Glow Bloom Filter */}
              <filter id="boldLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Standard SVG Drop Shadow for Red Dot (No square CSS filter artifacts) */}
              <filter id="dotGlowSimple" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#DC2626" floodOpacity="0.75" />
              </filter>
            </defs>

            {/* Horizontal Zero-Datum Harmonic Guide */}
            <line
              x1="30"
              y1="260"
              x2="1170"
              y2="260"
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.65"
            />

            {/* LINE 2: Thin Gradient Line (Stroke 1.8px, counter-directional slow drift) */}
            {(filterMode === 'all' || filterMode === 'thin') && (
              <path
                d={graphState.thinPath}
                fill="none"
                stroke="url(#thinLineGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={expandedIndex !== null ? 0.35 : 0.88}
                style={{ transition: 'opacity 0.3s ease' }}
              />
            )}

            {/* LINE 1: Bold Gradient Line (Stroke 3.8px, forward-directional slow drift) */}
            {(filterMode === 'all' || filterMode === 'bold') && (
              <path
                d={graphState.boldPath}
                fill="none"
                stroke="url(#boldLineGrad)"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#boldLineGlow)"
                opacity={1}
                style={{ transition: 'opacity 0.3s ease' }}
              />
            )}

            {/* TETHERS & CIRCULAR RED DOTS (Exact X and Y Alignment on the Line) */}
            {sectors.map((sector, idx) => {
              const node = graphState.nodes[idx];
              if (!node) return null;
              const isSelected = expandedIndex === idx;
              const isHovered = hoveredIndex === idx;

              if (filterMode === 'bold' && sector.lineType !== 'bold') return null;
              if (filterMode === 'thin' && sector.lineType !== 'thin') return null;

              return (
                <g
                  key={`svg-node-${sector.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpandedIndex(isSelected ? null : idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open details for Sector ${sector.index}: ${sector.title}`}
                >
                  {/* Vertical Tether Dashed Line (Directly from dot to pill edge) */}
                  <line
                    x1={node.x}
                    y1={node.dotY}
                    x2={node.x}
                    y2={node.tetherEndY}
                    stroke="#DC2626"
                    strokeWidth={isSelected || isHovered ? '2' : '1.5'}
                    strokeDasharray={isSelected || isHovered ? 'none' : '3 3'}
                    opacity={isSelected || isHovered ? 1 : 0.65}
                    style={{ transition: 'all 0.2s ease' }}
                  />

                  {/* Pulsing Sonar Ring Halo */}
                  <circle
                    cx={node.x}
                    cy={node.dotY}
                    r={isSelected ? 16 : isHovered ? 14 : 11}
                    fill="none"
                    stroke="#DC2626"
                    className="node-sonar-ping"
                  />

                  {/* Circular Red Dot Core (Centered EXACTLY on the line vertex) */}
                  <circle
                    cx={node.x}
                    cy={node.dotY}
                    r={isSelected ? 8.5 : isHovered ? 8 : 6.8}
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="2.4"
                    filter="url(#dotGlowSimple)"
                    style={{ transition: 'r 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  />

                  {/* Center Sparkle Glint */}
                  <circle
                    cx={node.x - 1.5}
                    cy={node.dotY - 1.5}
                    r="1.6"
                    fill="#FFFFFF"
                    opacity="0.9"
                  />
                </g>
              );
            })}
          </svg>

          {/* ======================================================================
              HTML OVERLAY LAYER: 100% Aligned Interactive Pill Badges
              ====================================================================== */}
          <div className={`graph-html-overlay ${expandedIndex !== null ? 'has-active-node' : ''}`}>
            {sectors.map((sector, idx) => {
              const node = graphState.nodes[idx];
              if (!node) return null;
              const isSelected = expandedIndex === idx;
              const isHovered = hoveredIndex === idx;

              if (filterMode === 'bold' && sector.lineType !== 'bold') return null;
              if (filterMode === 'thin' && sector.lineType !== 'thin') return null;

              return (
                <button
                  key={`pill-${sector.id}`}
                  type="button"
                  id={`focus-pill-${idx}`}
                  className={`focus-node-pill pill-cascade-${idx} ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  style={{
                    left: `${(node.x / 1200) * 100}%`,
                    top: `${(node.pillY / 520) * 100}%`,
                  }}
                  onClick={() => setExpandedIndex(isSelected ? null : idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-expanded={isSelected}
                  aria-label={`Inspect Sector ${sector.index}: ${sector.title}`}
                >
                  <span className="pill-index">{sector.index}</span>
                  <span className="pill-divider" aria-hidden="true">·</span>
                  <span className="pill-title">{sector.shortTitle}</span>
                  <svg className="pill-chevron" width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              );
            })}
          </div>

          {/* ======================================================================
              CLICK-TO-EXPAND MODAL CARD
              ====================================================================== */}
          {activeSector && (
            <div
              className="expanded-card-backdrop"
              onClick={() => setExpandedIndex(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`expanded-title-${activeSector.id}`}
            >
              <div
                className="expanded-card-modal"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Row: Category Tag, Line Type, Close Button */}
                <div className="expanded-header-row">
                  <div className="expanded-tag-meta">
                    <span className="expanded-tag-pill">
                      {activeSector.index} · {activeSector.tag}
                    </span>
                    <span className="expanded-line-type">
                      <span
                        className={`expanded-line-type-indicator ${
                          activeSector.edge === 'top' ? 'bold-line' : 'thin-line'
                        }`}
                        aria-hidden="true"
                      ></span>
                      {activeSector.edge === 'top' ? 'Ascent Crest Trajectory' : 'Foundation Valley Trajectory'}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="expanded-close-btn"
                    onClick={() => setExpandedIndex(null)}
                    aria-label="Close detailed card"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Sector Headline Title */}
                <h2
                  id={`expanded-title-${activeSector.id}`}
                  className="expanded-title"
                >
                  {activeSector.title}
                </h2>

                {/* Thesis Description */}
                <p className="expanded-desc">
                  {activeSector.description}
                </p>

                {/* Key Evaluation Fit Criteria */}
                <div className="expanded-criteria-block">
                  <div className="expanded-criteria-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 14 14"></polyline>
                    </svg>
                    <span>Key Evaluation Fit Criteria</span>
                  </div>
                  <ul className="expanded-criteria-list">
                    {activeSector.criteria.map((item, i) => (
                      <li key={i} className="expanded-criteria-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Star Groups Synergy Alignment */}
                <div className="expanded-synergy-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                  <span>
                    <strong>Ecosystem Capability Bridge:</strong> {activeSector.synergy}
                  </span>
                </div>

                {/* Modal Footer Controls */}
                <div className="expanded-modal-footer">
                  <div className="expanded-nav-btn-group">
                    <button
                      type="button"
                      className="expanded-nav-arrow-btn"
                      onClick={() =>
                        setExpandedIndex((prev) =>
                          prev === 0 ? sectors.length - 1 : prev - 1
                        )
                      }
                      aria-label="Previous sector"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                      <span>Prev</span>
                    </button>

                    <button
                      type="button"
                      className="expanded-nav-arrow-btn"
                      onClick={() =>
                        setExpandedIndex((prev) => (prev + 1) % sectors.length)
                      }
                      aria-label="Next sector"
                    >
                      <span>Next</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>

                  <a
                    href={`/enquiry.html?sector=${encodeURIComponent(activeSector.enquirySector)}`}
                    className="expanded-cta-btn"
                  >
                    <span>Pitch in {activeSector.tag}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
