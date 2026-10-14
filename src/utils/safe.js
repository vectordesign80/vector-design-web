// Evita que textos externos puedan ejecutarse como HTML en el catálogo.
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

export function safeFragmentId(value) {
  const id = String(value ?? '');
  return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(id) ? id : '';
}

export function safeImageUrl(value) {
  const url = String(value ?? '').trim();
  // Se admiten rutas de archivos estáticos y URLs https explícitas, no javascript:, data: o URLs protocol-relative.
  if (/^(?!\/\/)(?:\.\/?|[a-zA-Z0-9_-])[a-zA-Z0-9_./%-]*$/.test(url) && !url.includes('..')) return url;
  if (/^https:\/\/[^\s"'<>]+$/.test(url)) return url;
  return '';
}

export function buildWhatsAppUrl({ number, brandName, productTitle }) {
  if (!/^\d{8,16}$/.test(String(number))) throw new Error('Número de WhatsApp inválido');
  const message = `Hola ${brandName}, quiero consultar por ${productTitle}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
