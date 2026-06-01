// ===== DYNAMIC STATS =====
document.getElementById('stat-projects').textContent = document.querySelectorAll('.project-card').length + '+';
document.getElementById('stat-certificates').textContent = document.querySelectorAll('.certificate-card').length + '+';
document.getElementById('stat-experience').textContent = document.querySelector('.experience-block .timeline').querySelectorAll('.timeline-item').length + '+';



// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navBackdrop = document.getElementById('nav-backdrop');

function openMenu() {
  navMenu.classList.add('active');
  navToggle.classList.add('active');
  if (navBackdrop) navBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('active');
  navToggle.classList.remove('active');
  if (navBackdrop) navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('active') ? closeMenu() : openMenu();
});

// Close on backdrop tap
if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ===== SMOOTH SCROLL =====
// Handles ALL anchor links — nav links, nav-cta, hero buttons, etc.
function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const isMobileMenuOpen = navMenu.classList.contains('active');

  const doScroll = () => {
    const offset = navbar.offsetHeight + 20;
    const position = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: 'smooth' });
  };

  if (isMobileMenuOpen) {
    // Close the menu first, then scroll after the slide-out animation (350ms) finishes
    closeMenu();
    setTimeout(doScroll, 380);
  } else {
    doScroll();
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const title = card.querySelector('h3').textContent;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

lightbox.addEventListener('click', (e) => {
  // Close if clicking outside the image/caption, or if clicking the close button
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    closeLightbox();
  }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const btn = this.querySelector('.form-submit');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  fetch(this.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
      btn.style.transform = 'scale(1.02)';
      btn.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.4)';
      this.reset();
    } else {
      throw new Error('Failed');
    }
  })
  .catch(() => {
    btn.textContent = 'Error. Try again.';
    btn.disabled = false;
  })
  .finally(() => {
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.transform = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
    }, 3000);
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) link.style.color = 'var(--accent)';
  });
});
