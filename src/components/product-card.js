import { escapeHtml, safeFragmentId, safeImageUrl, buildWhatsAppUrl } from '../utils/safe.js';

export function createProductCard(product, index, config) {
  const money = new Intl.NumberFormat(config.locale, {
    style: 'currency', currency: config.currency, maximumFractionDigits: 0
  });
  const price = Number.isFinite(product.price) && product.price > 0 ? money.format(product.price) : 'Consultar';
  const id = safeFragmentId(product.id);
  const image = safeImageUrl(product.images?.[0]);
  const title = escapeHtml(product.title);
  const link = escapeHtml(buildWhatsAppUrl({
    number: config.contact.whatsappNumber, brandName: config.name, productTitle: product.title
  }));
  return `
  <article class="card product-card" style="--card-index:${Math.max(0, index)}">
    <a class="product-media" href="#${id}" aria-label="Ver ${title}">
      <img src="${escapeHtml(image)}" alt="${title}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <span>${escapeHtml(product.badge || product.category || config.name)}</span>
    </a>
    <div class="product-body">
      <p class="product-category">${escapeHtml(product.category || 'Producto')}</p>
      <h3 id="${id}">${title}</h3>
      <p>${escapeHtml(product.description)}</p>
      <ul>${product.details.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <div class="product-footer">
        <div class="price">${price}</div>
        <a class="mini-button" href="${link}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
      </div>
    </div>
  </article>`;
}
