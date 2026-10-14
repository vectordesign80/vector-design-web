import test from 'node:test';
import assert from 'node:assert/strict';
import { createStaticProductRepository, createApiProductRepository } from '../src/repositories/products.js';
import { createCatalogService } from '../src/services/catalog.js';
import { buildWhatsAppUrl, escapeHtml, safeFragmentId, safeImageUrl } from '../src/utils/safe.js';
import { createProductCard } from '../src/components/product-card.js';

const fake = [
  { id: 'example', title: 'Chopp Olimpo', images: ['/img.png'], details: [], featured: true },
  { id: 'draft', title: 'Borrador', published: false, images: [], details: [] },
  { id: 'another', title: 'Soporte', published: true, images: ['one.jpg', 'two.jpg'], details: [], featured: true }
];
const okFetch = async () => ({ ok: true, json: async () => fake });

test('el repositorio estático obtiene datos y servicio excluye borradores', async () => {
  const r = createStaticProductRepository({ url: './data/products.json', fetchImpl: okFetch });
  const service = createCatalogService(r);
  const products = await service.listPublished();
  assert.equal(products.length, 2);
  assert.deepEqual(products.map((p) => p.id), ['example', 'another']);
  assert.equal(service.getFeaturedImages(products).length, 3);
});

test('cambiar adaptador a API no modifica servicio', async () => {
  const calls = [];
  const repository = createApiProductRepository({
    endpoint: '/api/products',
    fetchImpl: async (...args) => { calls.push(args); return { ok: true, json: async () => fake }; }
  });
  const service = createCatalogService(repository);
  assert.equal((await service.listPublished()).length, 2);
  assert.equal(calls[0][0], '/api/products');
});

test('un formato inválido produce error controlado', async () => {
  const repository = createStaticProductRepository({
    url: 'invalid.json', fetchImpl: async () => ({ ok: true, json: async () => ({ products: [] }) })
  });
  await assert.rejects(createCatalogService(repository).listPublished(), /inválido/);
});

test('URL de WhatsApp contextual codifica nombres correctamente', () => {
  const url = buildWhatsAppUrl({ number: '5492914042633', brandName: 'VECTOR', productTitle: 'Chopp Olimpo & 74' });
  assert.ok(url.startsWith('https://wa.me/5492914042633?text='));
  assert.ok(decodeURIComponent(url.split('text=')[1]).includes('Chopp Olimpo & 74.'));
});

test('la presentación neutraliza caracteres HTML no confiables', () => {
  assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
  assert.equal(safeFragmentId('x" onmouseover="alert(1)'), '');
  assert.equal(safeImageUrl('javascript:alert(1)'), '');
  assert.equal(safeImageUrl('assets/products/item.svg'), 'assets/products/item.svg');
  const html = createProductCard({
    id: 'ok', title: '<img onerror=alert(1)>', category: 'test', images: [],
    details: ['<script>'], price: 10
  }, 0, { locale: 'es-AR', currency: 'ARS', name: 'VECTOR', contact: { whatsappNumber: '5492914042633' } });
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('<img onerror=alert(1)>'));
});
