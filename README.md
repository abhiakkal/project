# Portfolio — Abhineet Akkal

Project
-------
Static portfolio website presenting a hero, featured projects, skills, and contact CTA. Built with semantic HTML, custom CSS, Bootstrap utilities, and small ES module scripts for reusable header/footer injection and simple UI behaviors.

Quick links
-----------
- Live preview (local): http://localhost:8000/index.html
- Main file: `index.html`
- Component fragments: `components/header.html`, `components/footer.html`
- Assets: `assets/css/`, `assets/js/`, `assets/img/`
- Project pages: `projects/`, `about/`, `contact/`

Local setup (Windows)
---------------------
1. Open PowerShell and clone the repo:
   ```
   git clone <repo-url> c:\Users\abhia\webdev\project
   cd c:\Users\abhia\webdev\project
   ```

2. Start a local server (choose one):
   - VS Code Live Server: Open the folder in VS Code → Right-click `index.html` → Open with Live Server.
   - Python HTTP server:
     ```
     python -m http.server 8000
     ```
     Open http://localhost:8000/index.html

3. Verify component injection:
   - Open DevTools (F12) → Console should show no fetch errors for `/components/header.html` and `/components/footer.html`.

How it works
------------
- Reusable fragments: pages include placeholders like `<div data-inject="/components/header.html"></div>`.
- `assets/js/header-injector.js` (ES module) fetches these fragments on DOMContentLoaded and inserts them into the DOM.
- Important: `fetch()` requires HTTP(S). Serving via `file://` will fail.

Key development notes
---------------------
- Use semantic elements (`main`, `section`, `article`, `figure`) and ARIA attributes for accessibility.
- Keep `.card` elements vertically consistent with `display:flex; flex-direction:column;` and use `margin-top:auto` on the footer to align buttons.
- For responsive images, use `max-width:100%` and constrain container widths.
- External links should include `target="_blank" rel="noopener"`.

Paths and deployment
--------------------
- The project currently uses root-absolute asset paths (e.g. `assets/...`). On GitHub Pages or other subpath deployments, either:
  - Convert asset links to relative paths, or
  - Add `<base href="/repo-name/">` in `<head>` (update when deployed).
- GitHub Pages:
  - Push to GitHub. In Settings → Pages, select branch and root folder. Test and fix asset paths if served under `/repo-name/`.

Troubleshooting
---------------
- Component fetch errors: confirm server is running and paths are correct.
- 404 images: verify leading slash vs relative path depending on deployment base.
- Accessibility issues: run Chrome Lighthouse and correct color contrast, semantic markup, and keyboard focus order.

Testing & QA
------------
- Run Lighthouse (Chrome DevTools) for accessibility, performance and SEO checks.
- Manual keyboard navigation and screen-reader spot checks.
- Validate HTML/CSS via W3C validators if needed.

Contributing
------------
- Open issues or PRs for fixes or content updates.
- Keep changes small and document JS/CSS behavior in comments.

References & credits
--------------------
- MDN Web Docs — HTML, CSS, Fetch API
- Bootstrap 5.3 docs
- WebAIM accessibility resources
- Google Lighthouse
- 15-puzzle algorithm resources (for linked project)

Contact
-------
Author: Abhineet Akkal  
Project directory: `c:\Users\abhia\webdev\project`

License
-------
Content and code in this repository are by the author unless otherwise noted. Third-party libraries retain their licenses (e.g., Bootstrap).