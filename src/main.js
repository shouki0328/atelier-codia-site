import './styles.css';

const menuButton = document.querySelector('[data-menu-button]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    siteNav.toggleAttribute('data-open', !isOpen);
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = [...document.querySelectorAll('[data-reveal]')];
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((target) => target.setAttribute('data-visible', 'true'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  revealTargets.forEach((target) => observer.observe(target));
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const workCards = [...document.querySelectorAll('[data-work-card]')];
const resultCount = document.querySelector('[data-result-count]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.setAttribute('aria-pressed', String(selected));
    });

    let visibleCount = 0;
    workCards.forEach((card) => {
      const isVisible = filter === 'all' || card.dataset.workCard === filter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (resultCount) {
      const countLabel = resultCount.dataset.countLabel || 'studies';
      resultCount.textContent = `${visibleCount} ${countLabel}`;
    }
  });
});

const yearTarget = document.querySelector('[data-year]');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const pieceData = {
  'moon-line': {
    name: 'Moon / Line',
    meta: 'sterling silver, moonstone',
    price: 18000,
    image: '../assets/silver-moonstone.jpg'
  },
  'lumiere-petal': {
    name: 'Lumiere Petal',
    meta: 'freshwater pearl, hammered gold tone',
    price: 16000,
    image: '../assets/earrings-lumiere.jpg'
  },
  'aube-thread': {
    name: 'Aube Thread',
    meta: 'clear quartz, pearl, fine chain',
    price: 20000,
    image: '../assets/necklace-aube.jpg'
  },
  'atelier-note': {
    name: 'Atelier Note',
    meta: 'small custom piece, pearl, silver or gold tone',
    price: 22000,
    image: '../assets/atelier-workbench.jpg'
  }
};

const requestForm = document.querySelector('[data-request-form]');
const pieceSelect = document.querySelector('[data-piece-select]');
const summaryImage = document.querySelector('[data-summary-image]');
const summaryName = document.querySelector('[data-summary-name]');
const summaryMeta = document.querySelector('[data-summary-meta]');
const summaryPrice = document.querySelector('[data-summary-price]');
const summaryTotal = document.querySelector('[data-summary-total]');
const requestSuccess = document.querySelector('[data-request-success]');
const quantityInput = requestForm?.querySelector('input[name="quantity"]');
const yen = (amount) => `¥${amount.toLocaleString('ja-JP')}`;

const updateRequestSummary = () => {
  if (!pieceSelect) return;
  const selected = pieceData[pieceSelect.value] || pieceData['moon-line'];
  const quantity = Math.max(1, Number(quantityInput?.value || 1));
  if (summaryImage) {
    summaryImage.src = selected.image;
    summaryImage.alt = `${selected.name} の作品イメージ`;
  }
  if (summaryName) summaryName.textContent = selected.name;
  if (summaryMeta) summaryMeta.textContent = selected.meta;
  if (summaryPrice) summaryPrice.textContent = yen(selected.price);
  if (summaryTotal) summaryTotal.textContent = `Estimated total ${yen(selected.price * quantity)}`;
};

if (pieceSelect) {
  const requestedPiece = new URLSearchParams(window.location.search).get('piece');
  if (requestedPiece && pieceData[requestedPiece]) {
    pieceSelect.value = requestedPiece;
  }
  pieceSelect.addEventListener('change', updateRequestSummary);
  quantityInput?.addEventListener('input', updateRequestSummary);
  updateRequestSummary();
}

requestForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;
  requestSuccess.hidden = false;
  requestSuccess.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
});
