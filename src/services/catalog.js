// Reglas del catálogo independientes del origen de los datos.
export function createCatalogService(productsRepository) {
  if (typeof productsRepository?.listPublishedCandidates !== 'function') {
    throw new TypeError('El repositorio no cumple el contrato de productos');
  }

  return {
    async listPublished() {
      const products = await productsRepository.listPublishedCandidates();
      return products
        .filter((item) => item && item.published !== false && typeof item.id === 'string' && typeof item.title === 'string')
        .map((item) => ({
          ...item,
          images: Array.isArray(item.images) ? item.images.filter((image) => typeof image === 'string') : [],
          details: Array.isArray(item.details) ? item.details.filter((detail) => typeof detail === 'string') : []
        }));
    },
    getFeaturedImages(published) {
      return published
        .filter((product) => product.featured === true)
        .flatMap((product) => product.images.map((image) => ({ product, image })));
    }
  };
}
