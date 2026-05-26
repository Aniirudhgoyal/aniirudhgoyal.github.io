# Anirudh Goyal — Portfolio Site

A 5-page bento-grid portfolio. Pure HTML / CSS / JS, no framework, no build step.

## Pages

- `index.html` — home (hero + stat tiles + currently + stack + recognition + contact teaser)
- `experience.html` — G+D internship deep dive
- `projects.html` — featured project + 3 supporting projects
- `education.html` — IIT Delhi + earlier schooling + recognition
- `contact.html` — contact methods + message form

## Files

- `*.html` — pages (5)
- `style.css` — shared styling
- `script.js` — shared behaviour (theme, clock, typing, glow, reveal animations)
- `Anirudh_Goyal_Tech_CV.pdf` — linked from header on every page

## Local preview

```bash
# In this folder:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

**Netlify Drop** — drag this folder onto https://app.netlify.com/drop. Done. Free `*.netlify.app` URL in 30 seconds.

**GitHub Pages** — create a public repo named `<your-username>.github.io`, drop these files in, push, Settings → Pages → enable. Live at `https://<your-username>.github.io`.

**Vercel** — drag folder onto https://vercel.com/new.

## Features

- 5-page bento grid (asymmetric tile sizes: 1×1 → 6×2)
- Live IST clock (updates every 30s)
- Theme toggle (dark default, persists in localStorage)
- Floating bottom dock nav (5 sections, active state per page)
- Typing animation on the hero
- Cursor-following accent glow on interactive tiles
- Staggered tile reveal on scroll (IntersectionObserver + 1.5s failsafe)
- Mailto contact form
- Fully responsive (4-col @ 1100px, 2-col @ 700px)
- `prefers-reduced-motion` respected

## Things to update before deploying

Search and replace:
- `aniirudhgoyal` → your actual GitHub username (in all 5 HTML files)
- The "Reading" line in the Currently tile on `index.html`
- The operating-principle quote (placeholder content)
- `+91 98150 05567` → confirm real phone or remove from `contact.html`

---
© 2026 Anirudh Goyal
