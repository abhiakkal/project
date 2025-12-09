// navbar.js - mobile toggle and accessible focus states
const setupHeader = () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    // toggle visibility for small screens
    const shown = nav.getAttribute('aria-hidden') === 'false';
    nav.setAttribute('aria-hidden', String(!shown));
  });

  // Close nav when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target) && window.innerWidth <= 820) {
      nav.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
};

export { setupHeader };

// When header is injected, the injector calls setupHeader by name (global). For module contexts:
window.setupHeader = setupHeader;
