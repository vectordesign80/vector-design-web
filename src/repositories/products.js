// Contrato: un adaptador debe implementar listPublishedCandidates(): Promise<Array<Product>>.
// La UI consume CatalogService y nunca consulta JSON ni API directamente.
async function readProducts(response) {
  if (!response.ok) throw new Error('No se pudo cargar el catálogo');
  const body = await response.json();
  if (!Array.isArray(body)) throw new TypeError('Formato de catálogo inválido');
  return body;
}

export function createStaticProductRepository({ url, fetchImpl = fetch }) {
  if (!url) throw new Error('Falta la ubicación del catálogo estático');
  return {
    async listPublishedCandidates() {
      return readProducts(await fetchImpl(url));
    }
  };
}

// Preparado para migración: no proporciona backend ni autenticación.
export function createApiProductRepository({ endpoint, fetchImpl = fetch }) {
  if (!endpoint) throw new Error('Falta la dirección de la API');
  return {
    async listPublishedCandidates() {
      return readProducts(await fetchImpl(endpoint, { headers: { Accept: 'application/json' } }));
    }
  };
}
