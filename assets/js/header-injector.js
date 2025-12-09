// Inject header/footer components by fetching the HTML and inserting into placeholders.
// Simple reusable injector used across pages.

// Replaced/added implementation:
async function injectComponents() {
  const nodes = document.querySelectorAll('[data-inject]');
  for (const el of nodes) {
    const relPath = el.getAttribute('data-inject');
    if (!relPath) continue;
    try {
      const url = new URL(relPath, location.href).href;
      const res = await fetch(url);
      if (!res.ok) {
        console.error('Component fetch failed:', url, res.status);
        continue;
      }
      const text = await res.text();
      el.innerHTML = text;

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
