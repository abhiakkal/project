// Inject header/footer components by fetching the HTML and inserting into placeholders.
// Simple reusable injector used across pages.

// Replaced/added implementation:
async function injectComponents() {
  const nodes = document.querySelectorAll('[data-inject]');
  for (const el of nodes) {
    const relPath = el.getAttribute('data-inject');
    if (!relPath) continue;
    try {
      // Resolve component path robustly:
      // - If relPath is an absolute URL, use it as-is.
      // - If relPath starts with '/', resolve against origin (domain root).
      // - Otherwise resolve it relative to the project root as determined by the
      //   location of this script (assets/js/header-injector.js), which keeps
      //   component fetches working from pages in subfolders.
      let url;
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(relPath)) {
        url = relPath;
      } else if (relPath.startsWith('/')) {
        url = new URL(relPath, location.origin).href;
      } else {
        // import.meta.url gives the URL of this module script; go up two levels
        // from assets/js -> project root, then resolve the component path.
        const projectRoot = new URL('../../', import.meta.url).href;
        url = new URL(relPath.replace(/^\.\//, ''), projectRoot).href;
      }
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Component fetch failed:', url, res.status);
        continue;
      }
      const text = await res.text();
      el.innerHTML = text;

        // Ensure brand/home link in injected header points to the site's base
        // so clicks from subpages go to the correct GitHub Pages project root.
        try {
          const baseTag = document.querySelector('base');
          const baseHref = baseTag ? baseTag.getAttribute('href') : null;
          const brand = el.querySelector('.brand');
          if (brand) {
            // Prefer the explicit repo root '/project/' so clicks always land on
            // the GitHub Pages project root. If a <base> tag is present and
            // explicitly points to the repo (contains '/project'), use that.
            // This avoids treating './' as '/' which causes 404s on Pages.
            const repoPath = '/project/';
            let computedPath = repoPath;
            try {
              if (baseHref && baseHref.includes(repoPath)) {
                computedPath = new URL(baseHref, location.origin).pathname;
              }
            } catch (e) {
              // ignore and use fallback
            }
            brand.setAttribute('href', computedPath);
            console.debug('header-injector: set brand href ->', computedPath);
          }
        } catch (e) {
          console.error('header-injector: failed to normalize brand href', e);
        }

      // Execute any scripts in injected HTML in page context
      const scripts = Array.from(el.querySelectorAll('script'));
      for (const old of scripts) {
        const script = document.createElement('script');
        if (old.src) {
          script.src = new URL(old.getAttribute('src'), url).href;
          script.async = false;
        } else {
          script.textContent = old.textContent;
        }
        // copy attributes (type, nomodule, etc.)
        for (const attr of old.getAttributeNames()) {
          if (attr === 'src') continue;
          script.setAttribute(attr, old.getAttribute(attr));
        }
        old.parentNode.replaceChild(script, old);
      }
    } catch (err) {
      console.error('Injection error for', relPath, err);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}

// If the site or an extension hijacks navigation (pushState/replaceState) we
// won't get a full page reload; listen for location changes and re-run the
// injector so header/footer remain present after client-side navigation.
(function() {
  // Patch history methods to emit a custom event
  const origPush = history.pushState;
  history.pushState = function(...args) {
    const ret = origPush.apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  const origReplace = history.replaceState;
  history.replaceState = function(...args) {
    const ret = origReplace.apply(this, args);
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  // popstate also indicates navigation (back/forward)
  window.addEventListener('popstate', () => window.dispatchEvent(new Event('locationchange')));

  // On locationchange, re-run injection (async, ignore errors)
  window.addEventListener('locationchange', () => {
    try {
      injectComponents();
    } catch (err) {
      // non-fatal
      console.error('Re-injection failed after navigation', err);
    }
  });
})();
