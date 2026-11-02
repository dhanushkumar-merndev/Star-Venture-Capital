/**
 * Star Venture Capital — Lenis Smooth Scrolling Engine
 * Powered by Lenis (https://github.com/darkroomengineering/lenis)
 */

import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenisInstance = null;

export function initSmoothScroll(options = {}) {
  // If already initialized on this page, return existing instance
  if (window.lenis) {
    return window.lenis;
  }

  // Initialize Lenis with production-grade luxury easing
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential luxury easeOutExpo
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    anchors: true,
    allowNestedScroll: true,
    autoToggle: true,
    stopInertiaOnNavigate: true,
    ...options,
  });

  window.lenis = lenis;
  lenisInstance = lenis;

  // Enhance all back-to-top buttons on the page with Lenis smooth scrolling
  document.querySelectorAll("#backToTopBtn, .back-to-top-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });
  });

  // Handle in-page hash links (e.g. href="#anchor") with Lenis scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: -80, // Account for sticky header
            duration: 1.2,
          });
        }
      }
    });
  });

  return lenis;
}

export function getLenis() {
  return lenisInstance || window.lenis || null;
}

