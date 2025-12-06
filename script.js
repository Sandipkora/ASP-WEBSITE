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

/--------------------------/
// Simple accordion toggle (separate file)
document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    const btn = item.querySelector('.item-btn');
    const panel = item.querySelector('.item-panel');

    // Click toggles this panel; close others
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('active');

      // close any other active
      document.querySelectorAll('.item-btn.active').forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove('active');
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanel = otherBtn.closest('.item').querySelector('.item-panel');
          if (otherPanel) otherPanel.classList.remove('expanded');
        }
      });

      if (isActive) {
        // collapse
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('expanded');
      } else {
        // expand
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('expanded');
      }
    });

    // keyboard toggle support (Enter / Space)
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const tabs = Array.from(document.querySelectorAll('.ut-tab'));
  const panels = Array.from(document.querySelectorAll('.ut-panel'));

  function activateTab(tab) {
    // deactivate all tabs/panels
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => {
      p.hidden = true;
      p.classList.remove('active');
    });

    // activate clicked
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const targetId = tab.getAttribute('data-target');
    const panel = document.getElementById(targetId);
    if (panel) {
      panel.hidden = false;
      panel.classList.add('active');
      // change the border color of the content card to tab color
      const color = tab.getAttribute('data-color') || '#F4A424';
      const contentCard = panel.querySelector('.ut-content');
      if (contentCard) {
        contentCard.style.borderColor = color;
      }
      // focus for accessibility
      contentCard?.focus?.();
    }
  }

  // initial activation
  const initial = tabs.find(t => t.classList.contains('active')) || tabs[0];
  if (initial) activateTab(initial);

  // click & keyboard support
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabs[(idx + 1) % tabs.length];
        next.focus();
        activateTab(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
        activateTab(prev);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  // update on resize to keep visuals consistent
  window.addEventListener('resize', () => {
    const active = document.querySelector('.ut-tab.active');
    if (active) activateTab(active);
  });
});