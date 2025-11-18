/* ============================================================
   HERO SLIDER WITH THUMBNAILS
============================================================ */

let heroIndex = 0;

// MUST MATCH HTML ID
const slideContainer = document.getElementById('slides');
const heroSlides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb-img');
const totalSlides = heroSlides.length;

function showHeroSlide(i) {
  heroIndex = i;

  // Move slide
  slideContainer.style.transform = `translateX(-${i * 100}%)`;

  // Update thumbnails
  if (thumbs.length > 0) {
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[i].classList.add('active');
  }
}

// Next button
const nextBtn = document.querySelector('.hero-next');
if (nextBtn) {
  nextBtn.onclick = () => {
    heroIndex = (heroIndex + 1) % totalSlides;
    showHeroSlide(heroIndex);
  };
}

// Previous button
const prevBtn = document.querySelector('.hero-prev');
if (prevBtn) {
  prevBtn.onclick = () => {
    heroIndex = (heroIndex - 1 + totalSlides) % totalSlides;
    showHeroSlide(heroIndex);
  };
}

// Thumbnail click
// Thumbnail click (skip if thumbnails hidden)
if (thumbs.length > 0) {
  thumbs.forEach(t => {
    t.onclick = () => {
      const index = parseInt(t.dataset.index);
      showHeroSlide(index);
    };
  });
}

// Auto-slide
setInterval(() => {
  heroIndex = (heroIndex + 1) % totalSlides;
  showHeroSlide(heroIndex);
}, 5000);

// Initialize first slide
showHeroSlide(0);


/* ============================================================
   ACCORDION
============================================================ */

document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const isOpen = panel.style.display === 'block';

    // Close all
    document.querySelectorAll('.acc-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.acc-icon').forEach(ic => ic.textContent = '▸');

    // Open selected
    if (!isOpen) {
      panel.style.display = 'block';
      btn.querySelector('.acc-icon').textContent = '▾';
    }
  });
});


/* ============================================================
   FOOTER YEAR
============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
