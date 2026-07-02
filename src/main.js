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
