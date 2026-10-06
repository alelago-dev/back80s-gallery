# back80s-gallery

Archivo estático VHS de Back to the 80s, publicado desde `main` en Vercel.

- Septiembre: `#/2026-09-05-vorterix`, 205 fotos.
- Halloween: `#/2026-10-03-vorterix`, 149 fotos.

Los archivos `manifests/<slug>.json` contienen los nombres reales de cada álbum, en orden de presentación. Septiembre conserva el orden del listado anterior; Halloween usa el orden de los archivos originales subidos a R2. Los 354 archivos fueron comprobados por HTTP a través del rewrite antes de publicar.

La galería obtiene únicamente los manifests locales; no consulta Supabase. Todas las fotos y descargas usan `/photos/<slug>/<nombre codificado>`, con el rewrite y la caché existentes de `vercel.json` hacia Cloudflare R2. Las portadas viven en `assets/`.

Para agregar un álbum, incorporar su manifest y portada, registrar sus datos en `app.js` y su cassette en `index.html`. Comprobar cantidad, nombres únicos y disponibilidad de cada imagen antes de publicar. No se necesitan claves en el navegador.
