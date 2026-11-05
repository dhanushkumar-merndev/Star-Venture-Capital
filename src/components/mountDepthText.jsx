import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import DepthText from './DepthText';

export const VENTURE_PHRASES = [
  "Build What’s Next",
  "Student Founders",
  "Pre-Graduation Capital",
  "First Check",
  "University to Company"
];

// Calculate responsive mobile font size based on phrase length to guarantee fit on any screen
const getMobileFontSize = (phrase = '') => {
  const len = phrase.length;
  if (len > 20) {
    // Longest phrases: "Pre-Graduation Capital" (22), "University to Company" (21)
    return "clamp(1.15rem, 5.1vw, 1.85rem)";
  } else if (len > 14) {
    // Medium phrases: "Build What’s Next" (17), "Student Founders" (16)
    return "clamp(1.35rem, 6.2vw, 2.25rem)";
  } else {
    // Short phrases: "First Check" (11)
    return "clamp(1.6rem, 7.5vw, 2.65rem)";
  }
};

const DepthTextController = forwardRef(({
  phrases = VENTURE_PHRASES,
  initialText,
  initialDepthColor = '#dc2626',
  cycleInterval = 4200,
  autoCycle = true,
  onPhraseChange,
  ...restProps
}, ref) => {
  const phraseList = Array.isArray(phrases) && phrases.length ? phrases : VENTURE_PHRASES;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(initialText || phraseList[0]);
  const [depthColor, setDepthColor] = useState(initialDepthColor);
  const [config, setConfig] = useState(restProps);
  const [animStage, setAnimStage] = useState('visible'); // 'visible' | 'glow-out' | 'glow-in'
  const isAutoRef = useRef(autoCycle);

  // Responsive mobile state (breakpoint 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const wrapperRef = useRef(null);
  const scalerRef = useRef(null);
  const [autoScale, setAutoScale] = useState(1);

  // Track window resize for seamless mobile/desktop transitions
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile container fit check: automatically scales down if any phrase ever exceeds width
  useEffect(() => {
    if (!isMobile) {
      setAutoScale(1);
      return;
    }

    const checkFit = () => {
      if (!wrapperRef.current || !scalerRef.current) return;
      const containerWidth = wrapperRef.current.clientWidth;
      const textWidth = scalerRef.current.scrollWidth;
      if (containerWidth > 0 && textWidth > 0) {
        // Safe margin for 3D extrusion and perspective tilt
        const safeAllowedWidth = containerWidth - 16;
        if (textWidth > safeAllowedWidth) {
          const ratio = safeAllowedWidth / textWidth;
          setAutoScale(Math.min(1, Math.max(0.65, ratio)));
        } else {
          setAutoScale(1);
        }
      }
    };

    checkFit();
    const frameId = requestAnimationFrame(checkFit);
    const timeoutId = setTimeout(checkFit, 200);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [text, isMobile]);

  // Smooth Glow Transition Function
  const transitionToPhrase = (newText, newDepthColor) => {
    setAnimStage('glow-out');
    setTimeout(() => {
      setText(newText);
      if (newDepthColor) setDepthColor(newDepthColor);
      setAnimStage('glow-in');
      setTimeout(() => {
        setAnimStage('visible');
      }, 420);
    }, 380);
  };

  // Auto cycling
  useEffect(() => {
    if (!isAutoRef.current || phraseList.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIdx) => {
        const nextIdx = (prevIdx + 1) % phraseList.length;
        const nextPhrase = phraseList[nextIdx];
        transitionToPhrase(nextPhrase);
        if (onPhraseChange) onPhraseChange(nextPhrase, nextIdx);
        return nextIdx;
      });
    }, cycleInterval || 4800);

    return () => clearInterval(timer);
  }, [phraseList, cycleInterval]);

  useImperativeHandle(ref, () => ({
    setText: (val, color) => {
      isAutoRef.current = false;
      transitionToPhrase(val, color);
    },
    setDepthColor: (color) => setDepthColor(color),
    nextPhrase: () => {
      isAutoRef.current = false;
      const nextIdx = (index + 1) % phraseList.length;
      setIndex(nextIdx);
      transitionToPhrase(phraseList[nextIdx]);
    },
    resumeAuto: () => {
      isAutoRef.current = true;
    },
    getText: () => text,
    getIndex: () => index
  }));

  // Style for glow in / glow out effect
  const transitionStyle = {
    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: animStage === 'glow-out' ? 0 : 1,
    transform: animStage === 'glow-out'
      ? 'translateY(-10px) scale(0.97)'
      : animStage === 'glow-in'
        ? 'translateY(6px) scale(1.01)'
        : 'translateY(0) scale(1)',
    filter: animStage === 'glow-out'
      ? `drop-shadow(0 0 35px ${depthColor}) blur(6px)`
      : animStage === 'glow-in'
        ? `drop-shadow(0 0 25px ${depthColor}) blur(1.5px)`
        : `drop-shadow(0 0 20px rgba(220, 38, 38, 0.6)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.95))`
  };

  // Keep desktop 100% unchanged; adapt cleanly for mobile viewports
  const responsiveLayers = isMobile ? 20 : 36;
  const responsiveDepth = isMobile ? 1.5 : 2.6;
  const responsiveTilt = isMobile ? 3.8 : 6.5;
  const responsivePerspective = isMobile ? 800 : 900;
  const responsiveFontSize = isMobile
    ? getMobileFontSize(text)
    : "clamp(2.75rem, 6.8vw, 5.25rem)";

  return (
    <div ref={wrapperRef} className="depth-text-cycler-wrapper" style={transitionStyle}>
      <div
        ref={scalerRef}
        className="depth-text-scaler"
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '100%',
          transform: autoScale < 1 ? `scale(${autoScale.toFixed(3)})` : undefined,
          transformOrigin: 'center center',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <DepthText
          text={text}
          layers={responsiveLayers}
          depth={responsiveDepth}
          depthColor={depthColor}
          faceColor="#ffffff"
          gradientDepth={false}
          hoverPush={0.5}
          float={true}
          tilt={responsiveTilt}
          pointerTracking={true}
          smoothing={0.14}
          perspective={responsivePerspective}
          autoOrbit={true}
          orbitSpeed={0.3}
          fontSize={responsiveFontSize}
          fontWeight={900}
          shadow={true}
          outline={false}
          intro={false}
          {...config}
        />
      </div>
    </div>
  );
});

export function mountDepthText(containerEl, initialProps = {}) {
  if (!containerEl) return null;
  const root = createRoot(containerEl);
  let instance = null;

  const controller = {
    setText: (t, c) => instance?.setText(t, c),
    setDepthColor: (c) => instance?.setDepthColor(c),
    nextPhrase: () => instance?.nextPhrase(),
    resumeAuto: () => instance?.resumeAuto(),
    getText: () => instance?.getText(),
    destroy: () => root.unmount()
  };

  root.render(
    <DepthTextController
      ref={(ref) => {
        instance = ref;
      }}
      {...initialProps}
    />
  );

  return controller;
}
