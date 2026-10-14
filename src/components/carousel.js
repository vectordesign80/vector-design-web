import { escapeHtml, safeFragmentId, safeImageUrl } from '../utils/safe.js';

export function renderCarousel({ container, dots, slides }) {
  if (!slides.length) {
    container.innerHTML = '<article class="carousel-empty"><h3>Destacados en preparación</h3><p>Pronto vas a ver novedades.</p></article>';
    dots.replaceChildren();
    return;
  }
  container.innerHTML = slides.map((item, index) => {
    const title = escapeHtml(item.product.title);
    return `<a class="carousel-slide ${index === 0 ? 'is-active' : ''}" data-slide="${index}"
      href="#${safeFragmentId(item.product.id)}" aria-label="Ver ${title}"
      aria-hidden="${index === 0 ? 'false' : 'true'}" tabindex="${index === 0 ? '0' : '-1'}">
      <img src="${escapeHtml(safeImageUrl(item.image))}" alt="${title}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <span>Ver producto</span>
    </a>`;
  }).join('');
  dots.innerHTML = slides.map((_, index) =>
    `<button type="button" aria-label="Ver foto destacada ${index + 1}"></button>`
  ).join('');
}

export function mountCarousel({ container, dots, previous, next, slides, intervalMs = 3200, win = window }) {
  if (!slides.length) return () => {};
  const slideElements = [...container.querySelectorAll('[data-slide]')];
  const dotElements = [...dots.querySelectorAll('button')];
  let current = 0;
  let timer;
  const reducedMotion = win.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;

  function choose(index) {
    current = (index + slides.length) % slides.length;
    slideElements.forEach((slide, n) => {
      const active = current === n;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.setAttribute('tabindex', active ? '0' : '-1');
    });
    dotElements.forEach((dot, n) => {
      dot.classList.toggle('is-active', current === n);
      dot.setAttribute('aria-current', String(current === n));
    });
  }

  function stop() { win.clearInterval(timer); timer = undefined; }
  function start() {
    stop();
    if (!reducedMotion && slides.length > 1 && !win.document?.hidden) {
      timer = win.setInterval(() => choose(current + 1), intervalMs);
    }
  }
  previous?.addEventListener('click', () => { choose(current - 1); start(); });
  next?.addEventListener('click', () => { choose(current + 1); start(); });
  dotElements.forEach((dot, index) => dot.addEventListener('click', () => { choose(index); start(); }));
  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);
  container.addEventListener('focusin', stop);
  container.addEventListener('focusout', start);
  win.document?.addEventListener('visibilitychange', () => win.document.hidden ? stop() : start());
  choose(0);
  start();
  return stop;
}
