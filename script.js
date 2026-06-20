/* ════════════════════════════════════════════════════════════
   NAITIK NIGOTIYA PORTFOLIO — SCRIPT
   Premium Dark Skeuomorphic Design System
   ════════════════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════════════════════════
// PARTICLE SYSTEM (Ambient Background)
// ════════════════════════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.18;
      this.speedY = (Math.random() - 0.5) * 0.18;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.hue  = Math.random() < 0.3 ? 350 : 220; // red or blue-grey
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  const COUNT = Math.min(80, Math.floor(W * H / 15000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(draw);
  }
  draw();
})();


// ════════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════════
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('nav-menu');
const navBackdrop = document.getElementById('nav-backdrop');

// Scroll — add scrolled class
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile toggle
function openMenu() {
  navMenu.classList.add('active');
  hamburger.classList.add('active');
  navBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('active');
  hamburger.classList.remove('active');
  navBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('active') ? closeMenu() : openMenu();
});

navBackdrop.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });


// ════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ════════════════════════════════════════════════════════════
function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const doScroll = () => {
    const offset = navbar.offsetHeight + 24;
    const position = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: 'smooth' });
  };

  if (navMenu.classList.contains('active')) {
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


// ════════════════════════════════════════════════════════════
// ACTIVE NAV LINK (Intersection-Observer based)
// ════════════════════════════════════════════════════════════
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

// Mapping section IDs to nav button IDs
const sectionNavMap = {
  'home':         'nav-home',
  'about':        'nav-about',
  'skills':       'nav-skills',
  'services':     'nav-services',
  'projects':     'nav-projects',
  'certificates': 'nav-certificates',
  'experience':   'nav-experience',
  'contact':      'nav-contact',
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navBtns.forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById(sectionNavMap[id]);
      if (activeBtn) activeBtn.classList.add('active');
    }
  });
}, {
  rootMargin: '-30% 0px -60% 0px',
});

sections.forEach(s => sectionObserver.observe(s));


// ════════════════════════════════════════════════════════════
// REVEAL ON SCROLL (Intersection Observer)
// ════════════════════════════════════════════════════════════
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Unobserve after animation for performance
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px',
});

revealElements.forEach(el => revealObserver.observe(el));


// ════════════════════════════════════════════════════════════
// BUTTON SKEUOMORPHIC PRESS EFFECT
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.btn, .nav-cta-btn').forEach(btn => {
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(1px) scale(0.98)';
  });
  btn.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});


// ════════════════════════════════════════════════════════════
// LIGHTBOX
// ════════════════════════════════════════════════════════════
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose   = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.certificate-card').forEach(card => {
  card.addEventListener('click', () => {
    const img   = card.querySelector('img');
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

lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});


// ════════════════════════════════════════════════════════════
// CONTACT FORM
// ════════════════════════════════════════════════════════════
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const btn = this.querySelector('.form-submit');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(180deg, #5ecc88 0%, #27ae60 100%)';
        btn.style.opacity = '1';
        btn.style.boxShadow = '0 6px 20px rgba(46,204,113,0.35)';
        this.reset();
      } else {
        throw new Error('Failed');
      }
    })
    .catch(() => {
      btn.innerHTML = 'Error — Try again';
      btn.style.opacity = '1';
      btn.disabled = false;
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.style.opacity = '1';
        btn.disabled = false;
      }, 3500);
    });
  });
}


// ════════════════════════════════════════════════════════════
// SERVICE CHIPS SELECTION LOGIC
// ════════════════════════════════════════════════════════════
const serviceChips = document.querySelectorAll('.service-chip');
const serviceSelect = document.getElementById('form-service');

if (serviceChips.length > 0 && serviceSelect) {
  serviceChips.forEach(chip => {
    chip.addEventListener('click', function() {
      // Remove active class from all chips
      serviceChips.forEach(c => c.classList.remove('active'));
      // Add active class to clicked chip
      this.classList.add('active');
      
      // Update select value
      const val = this.getAttribute('data-value');
      serviceSelect.value = val;
      
      // Trigger change event just in case
      serviceSelect.dispatchEvent(new Event('change'));
      
      // Visual feedback on the select
      serviceSelect.style.borderColor = 'rgba(230, 57, 70, 0.55)';
      setTimeout(() => {
        serviceSelect.style.borderColor = '';
      }, 500);
    });
  });
}


// ════════════════════════════════════════════════════════════
// STAT COUNTER ANIMATION
// ════════════════════════════════════════════════════════════
// Dynamically calculate and update stat counts on page load
(function initDynamicStats() {
  const projectsCount = document.querySelectorAll('#projects .project-card').length;
  const certificatesCount = document.querySelectorAll('#certificates .certificate-card').length;
  const firstExpBlock = document.querySelector('#experience .experience-block');
  const rolesCount = firstExpBlock ? firstExpBlock.querySelectorAll('.timeline-item').length : 0;

  const projectsEl = document.querySelector('[data-stat="projects"]');
  const certificatesEl = document.querySelector('[data-stat="certificates"]');
  const rolesEl = document.querySelector('[data-stat="roles"]');

  if (projectsEl) {
    projectsEl.textContent = projectsCount;
    projectsEl.setAttribute('data-target', projectsCount);
  }
  if (certificatesEl) {
    certificatesEl.textContent = certificatesCount;
    certificatesEl.setAttribute('data-target', certificatesCount);
  }
  if (rolesEl) {
    rolesEl.textContent = rolesCount;
    rolesEl.setAttribute('data-target', rolesCount);
  }
})();

function animateCounter(el, target, duration = 1400) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
      el.setAttribute('data-target', target);
      animateCounter(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));


// ════════════════════════════════════════════════════════════
// CURSOR GLOW EFFECT (subtle ambient red follow)
// ════════════════════════════════════════════════════════════
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(230,57,70,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transition: opacity 0.5s ease;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  `;
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    currentX = lerp(currentX, mouseX, 0.06);
    currentY = lerp(currentY, mouseY, 0.06);
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();


// ════════════════════════════════════════════════════════════
// HERO CTA RIPPLE EFFECT
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-anim 0.5s linear;
      background: rgba(255,255,255,0.2);
      width: 100px;
      height: 100px;
      left: ${x - 50}px;
      top: ${y - 50}px;
      pointer-events: none;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Inject ripple keyframe dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ════════════════════════════════════════════════════════════
// SCROLL TO TOP BUTTON
// ════════════════════════════════════════════════════════════
(function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
