import { siteConfig } from './config/site.js';
import { createStaticProductRepository, createApiProductRepository } from './repositories/products.js';
import { createCatalogService } from './services/catalog.js';
import { createProductCard } from './components/product-card.js';
import { renderCarousel, mountCarousel } from './components/carousel.js';

const grid = document.querySelector('#product-grid');
const carousel = document.querySelector('[data-carousel]');
const dots = document.querySelector('[data-carousel-dots]');
const repo = siteConfig.catalog.source === 'api'
  ? createApiProductRepository({ endpoint: siteConfig.catalog.apiEndpoint })
  : createStaticProductRepository({ url: siteConfig.catalog.staticUrl });
const service = createCatalogService(repo);

async function showCatalog() {
  if (!grid || !carousel || !dots) return;
  try {
    const published = await service.listPublished();
    if (!published.length) {
      grid.innerHTML = '<div class="card"><h3>Catálogo en preparación</h3><p>Estamos cargando productos.</p></div>';
    } else {
      grid.innerHTML = published.map((item, index) => createProductCard(item, index, siteConfig)).join('');
    }
    const slides = service.getFeaturedImages(published);
    renderCarousel({ container: carousel, dots, slides });
    mountCarousel({
      container: carousel, dots, slides,
      previous: document.querySelector('[data-carousel-prev]'),
      next: document.querySelector('[data-carousel-next]'),
      intervalMs: siteConfig.carousel.intervalMs
    });
  } catch (error) {
    console.error('Error al cargar el catálogo:', error);
    grid.innerHTML = '<div class="card"><h3>Catálogo temporalmente no disponible</h3><p>Podés consultarnos por WhatsApp.</p></div>';
  }
}
showCatalog();
