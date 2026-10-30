/**
 * Card Swap Deck Component
 * Directly inspired by Reference: card swap.png
 *
 * Implements an interactive 3D stacked card deck where cards can be
 * swapped, rotated to the front, and synchronized with approach tabs.
 */

export function initCardSwap(cardsData) {
  const deckWrapper = document.getElementById("cardSwapDeck");
  const indicator = document.getElementById("deckIndicator");
  const nextBtn = document.getElementById("deckNextBtn");
  const prevBtn = document.getElementById("deckPrevBtn");
  const pillButtons = document.querySelectorAll(".approach-pill-btn");

  if (!deckWrapper || !cardsData || cardsData.length === 0) return;

  let currentIndex = 0;
  const totalCards = cardsData.length;
  let cardElements = [];

  // Render cards into deck
  deckWrapper.innerHTML = "";
  cardsData.forEach((card, idx) => {
    const cardEl = document.createElement("div");
    cardEl.className = "swap-card";
    cardEl.dataset.index = idx;
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("tabindex", "0");
    cardEl.setAttribute("aria-label", `View details for ${card.title}`);

    cardEl.innerHTML = `
      <div class="swap-card-index">${card.index} · PILLAR</div>
      <h3 class="swap-card-title">${card.title}</h3>
      <p class="swap-card-summary">${card.summary}</p>
      <ul class="swap-card-bullets">
        ${card.details.map((d) => `<li>${d}</li>`).join("")}
      </ul>
    `;

    // Click card to bring to front
    cardEl.addEventListener("click", () => {
      if (idx !== currentIndex) {
        goToCard(idx);
      } else {
        nextCard();
      }
    });

    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        nextCard();
      }
    });

    deckWrapper.appendChild(cardEl);
    cardElements.push(cardEl);
  });

  function updateDeck() {
    cardElements.forEach((cardEl, idx) => {
      // Calculate relative position from front
      const diff = (idx - currentIndex + totalCards) % totalCards;

      if (diff === 0) {
        // Active top card
        cardEl.style.transform = "translate3d(0, 0, 40px) scale(1) rotate(0deg)";
        cardEl.style.opacity = "1";
        cardEl.style.zIndex = "10";
        cardEl.style.pointerEvents = "auto";
        cardEl.style.borderColor = "var(--border-medium)";
        cardEl.style.boxShadow = "var(--shadow-lg)";
      } else if (diff === 1) {
        // Second card in stack
        cardEl.style.transform = "translate3d(16px, 16px, 20px) scale(0.96) rotate(2deg)";
        cardEl.style.opacity = "0.85";
        cardEl.style.zIndex = "8";
        cardEl.style.pointerEvents = "auto";
        cardEl.style.borderColor = "var(--border-subtle)";
        cardEl.style.boxShadow = "var(--shadow-md)";
      } else if (diff === 2) {
        // Third card in stack
        cardEl.style.transform = "translate3d(32px, 32px, 0px) scale(0.92) rotate(4deg)";
        cardEl.style.opacity = "0.7";
        cardEl.style.zIndex = "6";
        cardEl.style.pointerEvents = "auto";
        cardEl.style.borderColor = "var(--border-subtle)";
        cardEl.style.boxShadow = "var(--shadow-sm)";
      } else {
        // Remaining cards deeper in stack
        cardEl.style.transform = "translate3d(48px, 48px, -20px) scale(0.88) rotate(6deg)";
        cardEl.style.opacity = "0.5";
        cardEl.style.zIndex = "4";
        cardEl.style.pointerEvents = "auto";
      }
    });

    if (indicator) {
      indicator.textContent = `0${currentIndex + 1} / 0${totalCards}`;
    }

    // Sync side pills
    pillButtons.forEach((pill, pIdx) => {
      if (pIdx === currentIndex) {
        pill.classList.add("is-active");
        pill.setAttribute("aria-selected", "true");
      } else {
        pill.classList.remove("is-active");
        pill.setAttribute("aria-selected", "false");
      }
    });
  }

  function nextCard() {
    // Perform swap animation
    const frontCard = cardElements[currentIndex];
    frontCard.style.transform = "translate3d(120px, -20px, 50px) rotate(8deg) scale(0.95)";
    frontCard.style.opacity = "0.3";

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateDeck();
    }, 180);
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateDeck();
  }

  function goToCard(index) {
    currentIndex = index;
    updateDeck();
  }

  if (nextBtn) nextBtn.addEventListener("click", nextCard);
  if (prevBtn) prevBtn.addEventListener("click", prevCard);

  // Connect side pill click events
  pillButtons.forEach((pill, idx) => {
    pill.addEventListener("click", () => {
      goToCard(idx);
    });
  });

  // Keyboard navigation for deck
  deckWrapper.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextCard();
    } else if (e.key === "ArrowLeft") {
      prevCard();
    }
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  deckWrapper.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  deckWrapper.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (diff < -50) {
      nextCard();
    } else if (diff > 50) {
      prevCard();
    }
  }, { passive: true });

  updateDeck();
}
