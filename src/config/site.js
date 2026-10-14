// Configuración del cliente; separada de componentes reutilizables.
export const siteConfig = Object.freeze({
  name: 'VECTOR',
  locale: 'es-AR',
  currency: 'ARS',
  contact: Object.freeze({ whatsappNumber: '5492914042633' }),
  catalog: Object.freeze({ source: 'static', staticUrl: './data/products.json', apiEndpoint: null }),
  carousel: Object.freeze({ intervalMs: 3200 })
});
