/**
 * Star Venture Capital — Master Main Controller
 * Integrated with Full-Bleed Currency Gradient ASCII & 3D DepthText Cycler
 */

import { siteConfig } from "../data/ventureData.js";
import { createGradientASCII, STAR_PALETTES } from "./gradientAscii.js";
import { mountDepthText, VENTURE_PHRASES } from "../components/mountDepthText.jsx";
import { initCardSwap } from "./cardSwap.js";
import { initEnquiryForm } from "./enquiryForm.js";
import { mountWaveMatrix } from "../components/mountWaveMatrix.jsx";
import { initSmoothScroll } from "./smoothScroll.js";

document.addEventListener("DOMContentLoaded", () => {
  // 0. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 1. Initialize Full-Bleed Currency Gradient ASCII Canvas
  const asciiBackdrop = document.getElementById("heroAsciiBackdrop");
  let asciiInstance = null;

  if (asciiBackdrop) {
    asciiInstance = createGradientASCII(asciiBackdrop, {
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
  }

  // 2. Initialize 3D DepthText Headline Cycler with Smooth Glow-in / Glow-out
  const depthMount = document.getElementById("heroDepthMount");
  let depthController = null;

  if (depthMount) {
    depthController = mountDepthText(depthMount, {
      phrases: VENTURE_PHRASES,
      initialText: VENTURE_PHRASES[0],
      initialDepthColor: STAR_PALETTES.starRed.depthColor,
      cycleInterval: 4200,
      autoCycle: true
    });
  }

  // 3. Initialize Interactive Sliced Waves Institutional Overview Matrix
  const waveMount = document.getElementById("waveMatrixMount");
  let waveController = null;
  if (waveMount) {
    waveController = mountWaveMatrix(waveMount);
  }

  // 4. Initialize Interactive Card Swap Deck
  initCardSwap(siteConfig.approach.cards);

  // 5. Initialize Founder Enquiry Form
  initEnquiryForm(siteConfig.enquiry);

  // 4. Header Scroll State
  const header = document.querySelector(".site-header");
  const updateHeaderScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // 5. Mobile Navigation Drawer
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.innerHTML = isOpen
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile drawer on link click
    mobileDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("is-open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 6. Portfolio Filtering
  const portfolioTabs = document.querySelectorAll(".portfolio-tab-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  portfolioTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;

      portfolioTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      portfolioCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 7. Back To Top
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
