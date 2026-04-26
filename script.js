// ===== DYNAMIC STATS =====
document.getElementById('stat-projects').textContent = document.querySelectorAll('.project-card').length + '+';
document.getElementById('stat-certificates').textContent = document.querySelectorAll('.certificate-card').length + '+';
document.getElementById('stat-experience').textContent = document.querySelector('.experience-block .timeline').querySelectorAll('.timeline-item').length + '+';

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .certificate-card, .report-card, .social-link, .btn, .nav-cta');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => { cursorDot.classList.add('hover'); cursorRing.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursorDot.classList.remove('hover'); cursorRing.classList.remove('hover'); });
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = navbar.offsetHeight + 20;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: 'smooth' });
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

document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
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
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      btn.textContent = 'Message Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
      this.reset();
      setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.disabled = false; }, 3000);
    } else { throw new Error('Failed'); }
  })
  .catch(() => {
    btn.textContent = 'Error. Try again.';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = originalText; }, 3000);
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
