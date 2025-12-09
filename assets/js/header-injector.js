// Inject header/footer components by fetching the HTML and inserting into placeholders.
// Simple reusable injector used across pages.

async function inject(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const url = el.dataset.inject;
  if (!url) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch ' + url);
    const html = await res.text();
    el.innerHTML = html;

    // After injecting header/footer, run header setup if present
    if (selector === '#site-header') {
      setupHeader();
    } else if (selector === '#site-footer') {
      const y = new Date().getFullYear();
      const yearEl = document.getElementById('year');
      if (yearEl) yearEl.textContent = y;
    }
  } catch (err) {
    console.error('Injector error', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  inject('#site-header');
  inject('#site-footer');
});
