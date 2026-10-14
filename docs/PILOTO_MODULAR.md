# Piloto modular VECTOR — versión histórica (no la web actual)

**Fecha:** 2026-10-14
**Rama:** `dev/piloto-modular-2026-10-14`
**Propósito:** demostrar separación de catálogo, presentación, servicios y acceso a datos, sin alterar la producción real en ChatGPT Sites.

## Fuentes auditadas
- Repositorio histórico público: `vectordesign80/vector-design-web`.
- Rama original: `main` (se conserva intacta).
- Archivos inspeccionados: `index.html`, `js/app.js`, `css/styles.css`, `data/products.json`.
- **Límite:** esa versión antigua no contiene las funcionalidades vigentes de Sites (admin, planilla de pedidos, costos y ganancias). NO puede sustituir la web actual.

## Qué cambió en esta rama
- `index.html`: sustituye la carga del script monolítico por `src/main.js` en modo módulo.
- `src/config/site.js`: marca, contacto, ruta de datos y comportamiento del carrusel.
- `src/repositories/products.js`: contrato de fuente de datos y adaptadores estático/API.
- `src/services/catalog.js`: filtra publicados y obtiene destacados sin conocer la fuente de datos.
- `src/utils/safe.js`: codificación de HTML y enlaces seguros de WhatsApp.
- `src/components/product-card.js`: representación del producto.
- `src/components/carousel.js`: representación, navegación y autorreproducción, respetando preferencia de movimiento reducido.
- `src/main.js`: conecta módulos al HTML existente.
- `tests/catalog.test.mjs`: pruebas unitarias con adaptadores simulados.
- `.github/workflows/catalog-tests.yml`: ejecuta pruebas en GitHub Actions sin desplegar.
- `js/app.js` original sigue disponible como respaldo de referencia, pero esta rama no lo carga.

## Cómo probar localmente
1. Obtener **esta rama**: `git clone -b dev/piloto-modular-2026-10-14 https://github.com/vectordesign80/vector-design-web.git`.
2. Ejecutar `npm run check` y `npm test` con Node.js 22.
3. Para visualizar, servir la carpeta desde un servidor HTTP local: `python -m http.server 4173` y abrir `http://localhost:4173`.
4. Revisar catálogo y carrusel en móvil y escritorio. El uso directo de `file://` no sirve para módulos ES/fetch.
5. **NO configurar Cloudflare ni apuntar el dominio de producción** durante el piloto.

## Pasar a modo API (solo demostración)
1. Implementar endpoint GET seguro que entregue una **lista de productos públicos** con el mismo contrato JSON.
2. Cambiar `catalog.source` de `static` a `api` y `catalog.apiEndpoint` a URL permitida por CORS.
3. Mantener la UI intacta; comprobar pruebas existentes y agregar pruebas reales de red.
4. **Esto no aporta todavía administrador, cuentas ni sistema de pedidos.** Se requiere backend protegido para datos privados.

## Riesgos, pruebas y pendientes
- No existe una copia confirmada de código/medios/almacenamiento del sitio actual de ChatGPT Sites.
- Las 5 entradas de `data/products.json` corresponden al repositorio histórico, no al catálogo actual.
- La actualización en GitHub es solo rama de desarrollo, no una versión desplegada.
- Ejecutar pruebas de navegador en dispositivos reales o herramienta automatizada antes de aprobar cualquier nuevo despliegue.
- Confirmar backup íntegro, autenticación y conciliación de pedidos antes de migrar la página vigente.

## Estado
**Implementado**: modularización y scripts de prueba en esta rama.
**Probado**: suite de Node/GitHub Actions, solo si el run documentado termina en éxito.
**No probado**: apariencia visual en navegador, acceso a Sites, integración real con API y planilla.
**No publicado**: dominio `vectordesign.com.ar` sin cambios.
