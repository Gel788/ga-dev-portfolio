// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal-in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Parallax hero subtle
const hero = document.querySelector('.hero');
if (hero) {
  const onScroll = () => {
    const y = Math.min(window.scrollY, 300);
    hero.style.transform = `translateY(${y * 0.06}px)`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// 3D tilt for cards
const cards = document.querySelectorAll('.card.project');
cards.forEach((card) => {
  let raf = 0;
  const rect = () => card.getBoundingClientRect();
  const onMove = (ev) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (ev.clientX - cx) / (r.width / 2);
      const dy = (ev.clientY - cy) / (r.height / 2);
      const rotX = (dy * -4).toFixed(2);
      const rotY = (dx * 4).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(raf);
    card.style.transform = '';
  };
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
});

// Animated brand gradient
const brandEl = document.querySelector('.brand');
if (brandEl) {
  brandEl.classList.add('brand-animated');
}

// Active nav links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = Array.from(document.querySelectorAll('.site-nav .links a'));
const setActive = () => {
  const fromTop = window.scrollY + 72;
  let currentId = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    if (top <= fromTop) currentId = sec.id;
  });
  navLinks.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : '';
    a.classList.toggle('active', id && id === currentId);
  });
};
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Smooth scroll with offset
navLinks.forEach((a) => {
  const href = a.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - 68;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// To top
const toTop = document.getElementById('toTop');
if (toTop) {
  const toggleBtn = () => { toTop.classList.toggle('show', window.scrollY > 420); };
  window.addEventListener('scroll', toggleBtn, { passive: true });
  toggleBtn();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Create floating particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  const colors = ['#ff6b35', '#f7931e', '#cc5500', '#8b3a00'];
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    
    particle.style.animation = `floatUp ${duration}s ${delay}s infinite linear`;
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Respect reduced motion
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mq.matches) {
  if (hero) hero.style.transform = '';
  cards.forEach((c) => { c.replaceWith(c.cloneNode(true)); });
  // Remove particles for reduced motion users
  const particlesContainer = document.querySelector('.particles');
  if (particlesContainer) particlesContainer.remove();
}

