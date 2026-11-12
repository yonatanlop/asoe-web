# Sitio web ASOE

Sitio estático de la Asociación de Economistas de la UPTC (HTML, CSS y JavaScript). Se genera con Node, sin dependencias.

## Uso

```bash
npm run build                 # genera dist/ (producción)
PREVIEW=1 npm run build       # versión preliminar: noindex, aviso y marcas "Por confirmar"
npm run serve                 # http://localhost:8080
```

## Dónde editar

- **Contenido** (textos, eventos, junta, galería, contacto): `src/data/content.js`
- **Diseño**: `src/assets/css/styles.css`
- **Estructura de las páginas**: `tools/build.js`
- **Imágenes**: `src/assets/img/` (optimizadas con `tools/optimize*.js` a partir de los originales, que no se versionan)

Datos pendientes de confirmar por ASOE: buscar `PENDIENTE` en `src/data/content.js`. El build los lista como advertencia.

## Despliegue

- **Preliminar:** al hacer push a `main`, GitHub Actions construye la imagen (nginx) y la publica en GHCR. El despliegue a la VM se activa con la variable de repositorio `DEPLOY_ENABLED=true` y los secrets `ORACLE_VM_HOST`, `ORACLE_VM_USER` y `ORACLE_VM_SSH_KEY`.
- **Producción (cPanel):** `npm run build`, comprimir el contenido de `dist/` (incluido `.htaccess`) y extraerlo en `public_html`.
