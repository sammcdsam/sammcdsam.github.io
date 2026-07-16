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

Live at **https://mcdevitt.page** — GitHub Pages, served from `main` (root) of
`github.com/sammcdsam/sammcdsam.github.io`. Pushing to `main` deploys.

DNS (Cloudflare, DNS-only/grey-cloud): four apex `A` records to the GitHub Pages
IPs (`185.199.108–111.153`) and `www` CNAME to `sammcdsam.github.io`. The `CNAME`
file in the repo root pins the custom domain — don't delete it.

## Resume PDF

`assets/Sam-McDevitt-Resume.pdf` is generated from `resume/resume.html`:

```bash
google-chrome --headless --disable-gpu --no-sandbox \
  --print-to-pdf=assets/Sam-McDevitt-Resume.pdf --no-pdf-header-footer resume/resume.html
```

## Editing content

Everything lives in `index.html` — the copy is real resume content, not
placeholders. To change the palette or fonts, edit the token block at the top of
`css/style.css` (`:root` for light, the `data-theme="dark"` block for dark).

Deliberate choices:
- Phone number is intentionally **not** on the site (spam); email/LinkedIn/GitHub only.
- Accent color is international orange — aerospace flight-test heritage.
- Fonts load from Google Fonts (Archivo + IBM Plex Mono) with system fallbacks.
