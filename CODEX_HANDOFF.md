# CODEX HANDOFF — Back to the 80s Photo Gallery

## Goal
Continue and stabilize the existing static photo gallery for Back to the 80s. The repo is already connected to Vercel and Supabase. The main issue to fix first is broken visual asset handling (cover/logo/VHS label), not the photo gallery logic itself.

## Repo / deploy
- GitHub: https://github.com/alelago-dev/back80s-gallery
- Production: https://back80s-gallery.vercel.app/
- Branch: `main`
- Stack: plain HTML + CSS + vanilla JS

## Supabase
- Project ref: `ieuamsitzobqczpbwzze`
- Project URL: `https://ieuamsitzobqczpbwzze.supabase.co`
- Public bucket: `event-photos`
- Event folder: `2026-09-05-vorterix/`
- Photos: exactly 205
- Approx total optimized size: 113 MB

The current `app.js` already lists images directly from Supabase Storage, sorts them, renders a masonry-like gallery, opens a lightbox, supports previous/next, download, keyboard navigation and hash routing. Preserve that if it works.

## Event metadata
- Event: Back to the 80s
- Date: Saturday 5 September 2026
- Venue: Teatro Vorterix
- City: Buenos Aires
- Photo count: 205
- Next event teaser: Back to the 80s Halloween — 3 Oct 2026 — Teatro Vorterix

## Desired home experience
The home should be almost entirely a VHS/VCR experience. No generic landing-page sections.

Desired interaction:
1. A fixed VHS sleeve / cover is visible.
2. A VCR is visible below/in front.
3. A physical black VHS cassette is partially protruding from the VCR.
4. The sleeve/cover stays fixed.
5. User clicks/taps the cassette.
6. The cassette animates into the VCR.
7. Status changes `STANDBY` → `INSERTING` → `PLAY`.
8. After about 1–1.5 s, navigate to `#/2026-09-05-vorterix`.

Visual language: authentic 1985 VHS / videoclub nostalgia, not gaming/cyberpunk. CRT scanlines, LEDs, soft glow and mechanical depth are fine if subtle.

## VHS cassette details
The cassette should have two reels and a vintage pirate-style label centered between them. Avoid giant `PHOTO ARCHIVE` lettering on the cassette.

Suggested metadata under the VCR:
- `05·09·2026`
- `205 FOTOS · TEATRO VORTERIX`
- CTA: `▶ TOCÁ EL VIDEOCASSETTE`

## Gallery page
Keep the dark CRT visual style and photo grid.

Header requirements:
- Use the REAL original Back to the 80s logo image, visibly sized around 180–250 px desktop.
- Under the logo: `PHOTO ARCHIVE`
- Then: `▶ PLAYING · 05 SEP 2026`
- Large title: `BACK TO THE 80S`
- The large title may have a subtle cyan/magenta CRT glitch, but must remain readable.
- Subtitle: `SÁBADO 5 DE SEPTIEMBRE · 2026 · TEATRO VORTERIX · BUENOS AIRES`
- Meta: `205 FOTOS · Tocá una foto para verla grande`

Preserve:
- black background
- subtle CRT/scanlines
- masonry-style grid
- subtle hover
- photo numbering
- lightbox
- prev/next
- download

## Mobile
Most users will arrive from Instagram. Mobile is critical.
- VCR should fit the viewport
- cassette must be clearly visible and easy to tap
- animation must be smooth
- gallery about 2 columns
- lightbox touch-friendly

## IMPORTANT: current broken area
Before adding features, inspect and CLEAN UP the asset approach.

There were multiple failed attempts to upload binary images through connectors, followed by base64 workarounds. Current/recent repo may contain some or all of:
- `assets-loader.js`
- `assets/*.b64`
- `assets/back80s-logo.webp`
- `assets/vhs-sep05.webp`
- `assets/logo-live.webp`
- `assets/cover-live.webp`
- `vhs-fixes.css`

Do NOT trust those files just because they exist. Some were truncated/corrupted and production showed only alt text / black placeholders.

Preferred repair:
1. Inspect the current repo and recent commits.
2. Remove unnecessary base64/runtime loader hacks.
3. Use normal image assets with normal `src` URLs.
4. Prefer simple names such as:
   - `assets/logo.png`
   - `assets/cover.webp`
   - `assets/vhs-label.jpg`
5. Verify the files are valid binaries and that their production URLs return actual images.
6. Only then change layout/style.

Do not report success merely because Vercel build/deploy says SUCCESS. Verify the actual production image URLs and visually inspect the rendered page.

## Original assets
The user has the original source images outside the repo and can upload them to Codex. Priority assets:
1. Original Back to the 80s PNG logo
2. Preferred Freddie / stage photo for the cover (performer viewed from behind, crowd visible)
3. Vintage pirate VHS label image

A ZIP was prepared in ChatGPT named `back80s-gallery-assets.zip`. If Codex cannot see that chat attachment, ask the user to upload the ZIP into the Codex task.

## Do not touch
- Do NOT modify the separate project `back80s-app`
- Do NOT alter sales tables or event financial logic
- This gallery is independent; Supabase is used here for photo storage only

## Suggested first task
Before editing anything, inspect:
- `index.html`
- `styles.css`
- `vhs-fixes.css`
- `app.js`
- `assets-loader.js`
- `assets/`
- recent commits if useful

Then tell the user briefly:
- what is currently broken
- which files you will remove/replace
- what you will verify in production

Then implement the cleanup and the VHS insert interaction.

## User style / language
UI copy should be Argentine Spanish. Use accents correctly: `Tocá`, `Subí`, `Reviví`.
