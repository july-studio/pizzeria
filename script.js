document.addEventListener("DOMContentLoaded", function () {
  const whatsappBtn = document.querySelector(".btn--whatsapp");
  let ticking = false;

  function toggleButtonVisibility() {
    if (window.scrollY > 300) {
      whatsappBtn.classList.add("is-visible");
    } else {
      whatsappBtn.classList.remove("is-visible");
    }
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      window.requestAnimationFrame(toggleButtonVisibility);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  toggleButtonVisibility();
});

// ==========================================
// 2. Langsames Scrollen zum Menü (2 Sekunden)
// ==========================================

// Wir suchen alle Links, die auf "#menu" zeigen
const menuLinks = document.querySelectorAll('a[href="#menu"]');

menuLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Verhindert das harte Springen

    const targetId = this.getAttribute("href"); // holt "#menu"
    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    // Berechnung der Position
    // "- 80" ist der Abstand nach oben (Header/Luft)
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - 80;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    // HIER KANNST DU DIE GESCHWINDIGKEIT ÄNDERN:
    const duration = 2000; // 2000ms = 2 Sekunden

    let start = null;

    // Die Animations-Schleife
    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      // Formel für sanftes Starten und Stoppen (Ease-in-out)
      const ease =
        progress / duration < 0.5
          ? (2 * progress * progress) / (duration * duration)
          : 1 - Math.pow((-2 * progress) / duration + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
  });
});

// ==========================================
// 3. Accordion Menu
// ==========================================

const accordionButtons = document.querySelectorAll(".btn--menu");

accordionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.nextElementSibling;
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    // Toggle aria-expanded
    this.setAttribute("aria-expanded", !isExpanded);

    // Toggle content visibility
    if (content) {
      content.classList.toggle("is-open");
    }
  });
});
