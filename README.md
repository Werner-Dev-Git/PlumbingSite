# Cape Town Plumbing

Static marketing site for a Cape Town plumbing business. Plain HTML, CSS and
JavaScript — no build step, no dependencies to install.

**Live site:** https://werner-dev-git.github.io/PlumbingSite/

## Structure

```
index.html            # the entire page
assets/css/style.css  # site styles
assets/js/main.js     # interactions
assets/images/        # logo + H2o.glb 3D model
assets/svg/           # plumbing icon set
```

## Running locally

Open `index.html` directly, or serve the folder so the 3D model and fetches
work over http:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Every push to `main` is published to GitHub Pages by
[.github/workflows/static.yml](.github/workflows/static.yml), which uploads the
repository as-is — no build required.
