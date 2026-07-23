const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

function closeMenu() {
  if (!navToggle || !siteNav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.textContent = 'Menu';
  siteNav.classList.remove('open');
  siteHeader?.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.textContent = isOpen ? 'Menu' : 'Close';
    siteNav.classList.toggle('open', !isOpen);
    siteHeader?.classList.toggle('menu-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

function updateHeader() {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 32);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    const fallback = image.dataset.fallback;
    if (fallback && image.src !== fallback) image.src = fallback;
  }, { once: true });
});

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  revealItems.forEach((item) => observer.observe(item));
}
