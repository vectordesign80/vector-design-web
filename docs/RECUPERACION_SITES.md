# Recuperación del proyecto vigente de ChatGPT Sites

**Estado:** pendiente; acceso al editor privado no disponible desde el chat actual.
**Proyecto:** VECTOR · Diseño & Impresión 3D.
**URL de publicación histórica identificada:** https://vector-design.feligrafias.chatgpt.site.
**Dominio comercial:** https://vectordesign.com.ar.
**Repositorio antiguo separado:** vectordesign80/vector-design-web.

## Problema
El repositorio anterior no equivale al sitio actual. Desde una consulta pública no se pueden recuperar con fiabilidad código fuente, configuración, autenticación, fotos privadas, archivos D1/R2 ni integraciones de la web de Sites. Un clon superficial del HTML visible no constituye respaldo del sistema.

## Procedimiento mínimo con acceso legítimo
1. Abrir **Work** en ChatGPT y elegir **Sites** en barra lateral.
2. Identificar **VECTOR · Diseño & Impresión 3D** y entrar en su editor desde el ícono de edición.
3. Confirmar la **última versión guardada/publicada**, las funciones y el dominio apuntado antes de cambiar algo.
4. En ese entorno pedir primero **auditoría de solo lectura**: listado de archivos, rutas, almacenamiento, variables/secretos (solo nombres, no valores), integraciones y registros de pedidos.
5. Solicitar **copia exportable o sincronización segura con GitHub, si la plataforma realmente lo permite**. No afirmar que existe un botón de exportación sin comprobarlo.
6. Respaldar por separado fotos/vídeos, datos de productos, pedidos y planillas por medios autorizados; comprobar restaurabilidad.
7. Si Sites no permite exportar el proyecto, planificar reconstrucción progresiva basada en comportamiento validado, activos autorizados y respaldo de datos, sin interrumpir producción.
8. Crear staging en repositorio y hosting independiente. **Jamás publicar sobre dominio real sin pruebas y autorización.**

## Prompt para ejecutar dentro de Sites en Work (sin publicar)
> Necesito migrar a una arquitectura modular independiente de ChatGPT Sites. Inspeccioná este proyecto VECTOR sin modificar la página publicada ni alterar productos, pedidos, costos, ganancias o archivos reales. Indicá versión vigente, estructura de frontend/backend, rutas y componentes, sistema de autenticación, almacenamiento y dependencias. Confirmá si es posible exportar TODO el código fuente y los recursos a un ZIP o repositorio GitHub. Si se puede, prepará una copia de desarrollo separada y respaldos verificables, sin tocar producción; si no, enumerá los obstáculos exactos y opciones de recuperación. No muestres secretos ni datos privados en el informe. Necesito inventario y verificación primero.

## Criterio para desbloquear migración
Acceso legítimo al editor y código/recursos vigentes **o** autorización para reconstruir basándose en un inventario verificable. Hacer pruebas con datos ficticios, reconciliar pedidos antes de cambiar DNS.

## Nota
La documentación oficial de OpenAI de Sites describe la edición desde Work/Sites; no constituye evidencia de que exista una función universal de exportación. Revisar: https://help.openai.com/es-419/articles/20001339-creating-and-using-chatgpt-sites
