import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import DepthText from './DepthText';

export const VENTURE_PHRASES = [
  "Build What’s Next",
  "Patient Capital",
  "Transformative Ideas",
  "Enduring Ventures",
  "The Star Syndicate"
];

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

  return (
    <div className="depth-text-cycler-wrapper" style={transitionStyle}>
      <DepthText
        text={text}
        layers={36}
        depth={2.6}
        depthColor={depthColor}
        faceColor="#ffffff"
        gradientDepth={false}
        hoverPush={0.5}
        float={true}
        tilt={6.5}
        pointerTracking={true}
        smoothing={0.14}
        perspective={900}
        autoOrbit={true}
        orbitSpeed={0.3}
        fontSize="clamp(2.75rem, 6.8vw, 5.25rem)"
        fontWeight={900}
        shadow={true}
        outline={false}
        intro={false}
        {...config}
      />
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
