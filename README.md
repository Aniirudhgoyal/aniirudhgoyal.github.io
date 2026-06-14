# Anirudh Goyal — Terminal Portfolio

A Bloomberg-terminal / trading-desk inspired portfolio. Green-on-black, with live
random-walk lines drifting behind every page. Pure HTML / CSS / JS — no framework, no build step.

## Pages (7, separate files)

- `index.html` — Home (boot sequence, hero, live ticker, metrics, directory)
- `experience.html` — Giesecke+Devrient internship
- `projects.html` — LOB prediction (featured) + 3 more
- `education.html` — degree, CS minor specialization (5/20 credits, GPA 10.0), Class XII
- `skills.html` — toolkit + animated proficiency bars
- `achievements.html` — JEE, Course Star, ML specialization
- `contact.html` — contact methods + message form

## The look

- **Palette:** terminal green (#00ff9c) on near-black (#050807), amber (#ffb000) as secondary signal
- **Random-walk lines:** live animated "stock chart" paths behind every page (the signature element), seeded fresh each visit, with glowing leading dots
- **Live ticker** under the nav on home (RMSE ▼15%, F1 ▲24%, Sharpe +0.34, …)
- **Boot sequence** typed on home load (`> initializing portfolio.sh OK`)
- **Terminal-window panels** with mac-style dots for sub-content
- **CRT scanline** texture overlay + vignette
- **Scroll-reveal** fade-ins, **animated proficiency bars**
- Fonts: Archivo (display), IBM Plex Sans (body), IBM Plex Mono (UI/labels)
- Respects `prefers-reduced-motion` (lines render static, reveals instant)

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

- **Netlify Drop** — drag this folder onto https://app.netlify.com/drop
- **GitHub Pages** — push to `<your-username>.github.io`, enable Pages
- **Vercel** — drag onto vercel.com/new

## Before deploying — update these

- `aniirudhgoyal` → your real GitHub username (all 6 files)
- Phone number on contact page (or remove)
- Course Star certificate, if not accurate
- Sample project GitHub links point to your profile — swap in real repo URLs
---
© 2026 Anirudh Goyal — IIT Delhi
