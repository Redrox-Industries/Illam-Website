const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
let scrollTicking = false;

const closeMenu = () => {
  toggle?.setAttribute('aria-expanded', 'false');
  header?.removeAttribute('data-open');
};

toggle?.addEventListener('click', () => {
  const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(willOpen));
  header?.toggleAttribute('data-open', willOpen);
});

menu?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a')) closeMenu();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener(
  'scroll',
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      header?.toggleAttribute(
        'data-scrolled',
        Math.max(0, window.scrollY) > 24,
      );
      scrollTicking = false;
    });
  },
  { passive: true },
);

document.querySelectorAll('[data-comparison]').forEach((comparison) => {
  const range = comparison.querySelector('[data-comparison-range]');
  range?.addEventListener('input', () => {
    comparison.style.setProperty('--split', `${range.value}%`);
  });
});

const isProtectedImage = (target) =>
  target instanceof Element &&
  Boolean(target.closest('[data-protected-image]'));

document.addEventListener('contextmenu', (event) => {
  if (isProtectedImage(event.target)) event.preventDefault();
});

document.addEventListener('dragstart', (event) => {
  if (isProtectedImage(event.target)) event.preventDefault();
});

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches;

if (!reduceMotion) {
  document.documentElement.dataset.motionReady = '';
  const targets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.dataset.revealed = '';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
  } else {
    targets.forEach((target) => (target.dataset.revealed = ''));
  }

  const parallaxImages = document.querySelectorAll('[data-parallax]');
  let framePending = false;

  const updateScrollMotion = () => {
    const scrollRange =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
    header?.style.setProperty(
      '--scroll-progress',
      String(Math.min(1, Math.max(0, progress))),
    );

    parallaxImages.forEach((image) => {
      const rect = image.parentElement?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const centerOffset =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      image.style.setProperty(
        '--parallax-y',
        `${Math.max(-18, Math.min(18, centerOffset * -18)).toFixed(2)}px`,
      );
    });
    framePending = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(updateScrollMotion);
    },
    { passive: true },
  );
  window.addEventListener('resize', updateScrollMotion, { passive: true });
  updateScrollMotion();
}
