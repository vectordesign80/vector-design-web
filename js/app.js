const grid = document.querySelector('#product-grid');
const carousel = document.querySelector('[data-carousel]');
const dots = document.querySelector('[data-carousel-dots]');
const prevButton = document.querySelector('[data-carousel-prev]');
const nextButton = document.querySelector('[data-carousel-next]');
const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
});

let featuredProducts = [];
let activeSlide = 0;
let carouselTimer;

const money = (value) => value ? formatter.format(value) : 'Consultar';
const whatsappUrl = (title) => `https://wa.me/5492914042633?text=${encodeURIComponent(`Hola VECTOR, quiero consultar por ${title}.`)}`;

const productCard = (product, index) => `
  <article class="card product-card" style="--card-index:${index}">
    <a class="product-media" href="#${product.id}" aria-label="Ver ${product.title}">
      <img src="${product.images?.[0] || ''}" alt="${product.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <span>${product.badge || product.category || 'VECTOR'}</span>
    </a>
    <div class="product-body">
      <p class="product-category">${product.category || 'Producto VECTOR'}</p>
      <h3 id="${product.id}">${product.title}</h3>
      <p>${product.description || ''}</p>
      <ul>${(product.details || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      <div class="product-footer">
        <div class="price">${money(product.price)}</div>
        <a class="mini-button" href="${whatsappUrl(product.title)}" target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
      </div>
    </div>
  </article>
`;

const carouselSlide = (product, index) => `
  <article class="carousel-slide ${index === 0 ? 'is-active' : ''}" data-slide="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
    <div class="slide-copy">
      <p class="eyebrow dark">${product.badge || 'Destacado'}</p>
      <h3>${product.title}</h3>
      <p>${product.short || product.description || ''}</p>
      <div class="slide-meta">
        <strong>${money(product.price)}</strong>
        <span>${product.category || 'Producto VECTOR'}</span>
      </div>
      <div class="hero-actions">
        <a class="button primary" href="${whatsappUrl(product.title)}" target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
        <a class="button secondary" href="#${product.id}">Ver producto</a>
      </div>
    </div>
    <div class="slide-gallery">
      <img class="slide-main-image" src="${product.images?.[0] || ''}" alt="${product.title}">
      <div class="slide-thumbs" aria-hidden="true">
        ${(product.images || []).slice(1, 5).map((image) => `<img src="${image}" alt="">`).join('')}
      </div>
    </div>
  </article>
`;

const setSlide = (index) => {
  if (!featuredProducts.length) return;
  activeSlide = (index + featuredProducts.length) % featuredProducts.length;
  document.querySelectorAll('[data-slide]').forEach((slide, slideIndex) => {
    const active = slideIndex === activeSlide;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
  dots?.querySelectorAll('button').forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === activeSlide);
    dot.setAttribute('aria-current', dotIndex === activeSlide ? 'true' : 'false');
  });
};

const startCarousel = () => {
  window.clearInterval(carouselTimer);
  if (featuredProducts.length > 1) {
    carouselTimer = window.setInterval(() => setSlide(activeSlide + 1), 5200);
  }
};

fetch('data/products.json')
  .then((response) => response.json())
  .then((products) => {
    const published = products.filter((product) => product.published !== false);

    if (!published.length) {
      grid.innerHTML = '<div class="card"><h3>Catálogo en preparación</h3><p>Estamos cargando nuestros productos personalizados.</p></div>';
      carousel.innerHTML = '<article class="carousel-empty"><h3>Destacados en preparación</h3><p>Pronto vas a ver los productos principales de VECTOR.</p></article>';
      return;
    }

    grid.innerHTML = published.map(productCard).join('');
    featuredProducts = published.filter((product) => product.featured);
    carousel.innerHTML = featuredProducts.map(carouselSlide).join('');
    dots.innerHTML = featuredProducts.map((product, index) => `<button type="button" aria-label="Ver destacado ${index + 1}"></button>`).join('');

    prevButton?.addEventListener('click', () => {
      setSlide(activeSlide - 1);
      startCarousel();
    });
    nextButton?.addEventListener('click', () => {
      setSlide(activeSlide + 1);
      startCarousel();
    });
    dots?.querySelectorAll('button').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        setSlide(index);
        startCarousel();
      });
    });

    carousel?.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
    carousel?.addEventListener('mouseleave', startCarousel);

    setSlide(0);
    startCarousel();
  })
  .catch(() => {
    grid.innerHTML = '<div class="card"><h3>VECTOR Design 3D</h3><p>Catálogo próximamente.</p></div>';
  });
