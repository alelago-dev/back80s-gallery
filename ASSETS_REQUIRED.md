# Assets required to complete Claude fix

This branch already contains the fixed `index.html`, `app.js`, and `vhs-fixes.css`, and all known corrupt/base64 legacy assets have been removed.

Do NOT merge this branch until the following five binary files from `back80s-gallery-fixed.zip` are uploaded under `assets/` exactly as listed.

| Path | Size | SHA-256 |
|---|---:|---|
| `assets/cover.webp` | 278092 bytes | `c4beca6d33c7b8ace91f99c5c91a289d0bd29f90fbced42b8593e2e11cdd6efd` |
| `assets/logo.png` | 139426 bytes | `d7982cb65f15efed7bf6154d1fbd4a1e6b6bd7aaf884ccd8ac443e81fc101dc8` |
| `assets/vhs-label.webp` | 19290 bytes | `a22c6d7d80925726ffef072f52a9da5aea286ad78afd87a6e9244fb0e2b00703` |
| `assets/vhs-insert.mp4` | 480598 bytes | `6affea11f622df96fb6a8b55413447d73ef2295c4d7482ee657cde76b4575f73` |
| `assets/vhs-insert-poster.jpg` | 30931 bytes | `633886f96f38dd7ab830f01d44ebc9336bec6fab8a383093759bad5467b0254c` |

After uploading them, verify the five raw files are reachable from the branch/deployment and that their byte sizes match. Then merge to `main` and verify production URLs under `https://back80s-gallery.vercel.app/assets/` plus the rendered VHS and gallery logo.
