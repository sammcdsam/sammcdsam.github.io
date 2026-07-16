# sam-mcdevitt-portfolio

Personal portfolio site for Sam McDevitt — machine learning engineer.

Static site, no build step: plain HTML, CSS, and vanilla JS.

## Structure

```
index.html        — single-page site (hero, work, experience, project, skills, contact)
css/style.css     — all styles; theme tokens at the top (light + dark)
js/main.js        — theme toggle, mobile nav, scroll reveals, hero canvas animation
assets/favicon.svg
```

## Preview locally

Open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Any static host works. Two easy options:

**GitHub Pages**
```bash
git init && git add -A && git commit -m "Portfolio site"
gh repo create sammcdsam.github.io --public --source=. --push
# → https://sammcdsam.github.io  (enable Pages: Settings → Pages → main branch)
```

**Netlify / Cloudflare Pages / Vercel** — drag-and-drop the folder or connect the
repo; no build command, publish directory is the repo root.

For the custom domain (`mcdevitt.page`), add it in your host's domain settings and
point DNS at it.

## Editing content

Everything lives in `index.html` — the copy is real resume content, not
placeholders. To change the palette or fonts, edit the token block at the top of
`css/style.css` (`:root` for light, the `data-theme="dark"` block for dark).

Deliberate choices:
- Phone number is intentionally **not** on the site (spam); email/LinkedIn/GitHub only.
- Accent color is international orange — aerospace flight-test heritage.
- Fonts load from Google Fonts (Archivo + IBM Plex Mono) with system fallbacks.
