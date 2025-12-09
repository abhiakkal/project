// main.js — site-wide JS: minor animations, accessibility helpers
document.addEventListener('DOMContentLoaded', () => {
  // focus outlines for keyboard users
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Add subtle reveal on scroll for elements with .section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.section, .card, .project-tile').forEach(el => observer.observe(el));
});
