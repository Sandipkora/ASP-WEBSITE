// script.js

// Gallery setup
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const mainImage = document.getElementById('mainImage');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentSpan = document.getElementById('current');
const totalSpan = document.getElementById('total');

let index = 0;
const images = thumbs.map(t => t.dataset.full);
totalSpan.textContent = images.length;

// set initial
function showIndex(i) {
  if (i < 0) i = images.length - 1;
  if (i >= images.length) i = 0;
  index = i;
  mainImage.src = images[index];
  currentSpan.textContent = (index + 1);
  document.querySelectorAll('.thumb').forEach((t, idx) => {
    t.classList.toggle('active', idx === index);
  });
}

thumbs.forEach((t, i) => {
  t.addEventListener('click', () => showIndex(i));
});

prevBtn.addEventListener('click', () => showIndex(index - 1));
nextBtn.addEventListener('click', () => showIndex(index + 1));

// keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showIndex(index - 1);
  if (e.key === 'ArrowRight') showIndex(index + 1);
});

// init
showIndex(0);

// Accordion
document.querySelectorAll('.acc-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const isOpen = panel.style.display === 'block';
    // close all
    document.querySelectorAll('.acc-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.acc-trigger .acc-icon').forEach(ic => ic.textContent = '▸');
    if (!isOpen) {
      panel.style.display = 'block';
      btn.querySelector('.acc-icon').textContent = '▾';
    }
  });
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();
