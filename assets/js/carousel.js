// lightweight accessible carousel (used if you add an image carousel to pages)
export default function initCarousel(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;
  const track = root.querySelector('.carousel-track');
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  let idx = 0;
  const prevBtn = root.querySelector('.carousel-prev');
  const nextBtn = root.querySelector('.carousel-next');

  function update() {
    slides.forEach((s, i) => {
      s.style.display = i === idx ? 'block' : 'none';
    });
  }
  update();

  prevBtn?.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    update();
  });
  nextBtn?.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    update();
  });
}
