// Modern Premium Website JavaScript
// Smooth scrolling and navigation interactions

console.log('GA-DEV Script loaded successfully');

// Add error handling for the entire script
window.addEventListener('error', function(e) {
  console.warn('GA-DEV Script Error:', e.error);
});

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing GA-DEV features');
  
  // Check if projects section exists
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    console.log('Projects section found:', projectsSection);
  } else {
    console.warn('Projects section not found!');
  }
  
  // Mobile Navigation Toggle
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.addEventListener('click', function() {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      }
    });
  }
  
  // Active Navigation Link
  const navLinks = document.querySelectorAll('.navbar-link');
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  
  // Navigation scroll effect and progress indicator
  const nav = document.querySelector('.navbar');
  const progressBar = document.getElementById('scrollProgress');
  
  function handleScroll() {
    // Navigation background
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(0, 0, 0, 0.95)';
      nav.style.backdropFilter = 'blur(25px)';
    } else {
      nav.style.background = 'rgba(0, 0, 0, 0.85)';
      nav.style.backdropFilter = 'blur(20px)';
    }
    
    // Progress indicator
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation link highlighting (using existing variables)
  function highlightActiveLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.navbar-link[href="#${id}"]`);
      
      if (navLink) {
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveLink);
  
  // Update progress indicator on scroll
  window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animateOnScroll = document.querySelectorAll('.project-card, .feature, .stat-card');
  animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Parallax effect for hero floating elements
  function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  }
  
  // Only add parallax on larger screens and if user doesn't prefer reduced motion
  if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', handleParallax);
  }
  
  // Button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Project cards 3D tilt effect
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      if (window.innerWidth > 768) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
  
  // Performance optimization: throttle scroll events
  let ticking = false;
  
  function throttledScrollHandler() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        highlightActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', throttledScrollHandler);
  
  // Initialize
  handleScroll();
  highlightActiveLink();
});

// Preload critical images
function preloadImages() {
  const images = [
    'cases/LighTeams/image_2_lighteams.png',
    'cases/Womansy/18.jpg',
    'field_image_marsandmoon_00.jpeg'
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Start preloading after page load
window.addEventListener('load', preloadImages);

// Enhanced cursor trail effect with glowing particles
function initCursorTrail() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-trail';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let lastX = 0;
  let lastY = 0;
  let particles = [];

  // Create particle
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1000);

    particles.push(particle);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create particles along the trail
    const distance = Math.sqrt((mouseX - lastX) ** 2 + (mouseY - lastY) ** 2);
    if (distance > 10) {
      createParticle(mouseX, mouseY);
      lastX = mouseX;
      lastY = mouseY;
    }
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Add hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .stack-category, .service-card, .navbar-link');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      // Create extra particles on hover
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createParticle(mouseX + (Math.random() - 0.5) * 20, mouseY + (Math.random() - 0.5) * 20);
        }, i * 50);
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Clean up particles periodically
  setInterval(() => {
    particles = particles.filter(particle => {
      if (!particle.parentNode) {
        return false;
      }
      return true;
    });
  }, 2000);
}

// Initialize cursor trail
initCursorTrail();

// Contact Form Handling
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.form-submit');
  const successMessage = document.getElementById('formSuccess');
  
  if (!form) return;
  
  // Form validation
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Telegram validation
    if (fieldName === 'telegram' && value) {
      const telegramRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
      if (!telegramRegex.test(value)) {
        isValid = false;
        errorMessage = 'Введите корректный ник в Telegram (например: @username)';
      }
    }
    
    // Name validation
    if (fieldName === 'name' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Имя должно содержать минимум 2 символа';
    }
    
    // Message validation
    if (fieldName === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Сообщение должно содержать минимум 10 символов';
    }
    
    // Show/hide error
    if (errorElement) {
      if (isValid) {
        errorElement.classList.remove('show');
        field.style.borderColor = '';
      } else {
        errorElement.classList.add('show');
        errorElement.textContent = errorMessage;
        field.style.borderColor = '#ef4444';
      }
    }
    
    return isValid;
  }
  
  // Handle audit project types
  const projectTypeSelect = document.getElementById('projectType');
  const auditDetailsGroup = document.getElementById('auditDetailsGroup');
  
  function toggleAuditDetails() {
    const selectedValue = projectTypeSelect.value;
    const isAuditProject = selectedValue.includes('audit');
    auditDetailsGroup.style.display = isAuditProject ? 'block' : 'none';
    
    if (isAuditProject) {
      auditDetailsGroup.style.animation = 'fadeInUp 0.3s ease';
    }
  }
  
  projectTypeSelect.addEventListener('change', toggleAuditDetails);

  // Real-time validation
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.style.borderColor === 'rgb(239, 68, 68)') {
        validateField(input);
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
      // Собираем данные формы
      const formData = new FormData(form);
      const data = {};
      
      // Преобразуем FormData в обычный объект
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      // Отправляем данные на сервер
      const response = await fetch('submit-form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        
        // Скрываем поле деталей аудита
        const auditDetailsGroup = document.getElementById('auditDetailsGroup');
        if (auditDetailsGroup) {
          auditDetailsGroup.style.display = 'none';
        }
      } else {
        throw new Error(result.message || 'Ошибка отправки формы');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Показываем красивый алерт об ошибке
      showErrorAlert(error.message || 'Произошла ошибка при отправке формы. Попробуйте еще раз.');
    } finally {
      // Hide loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// Show error alert function
function showErrorAlert(message) {
  // Создаем красивый алерт об ошибке
  const errorAlert = document.createElement('div');
  errorAlert.className = 'error-alert';
  errorAlert.innerHTML = `
    <div class="error-alert-content">
      <div class="error-icon">❌</div>
      <h3>Ошибка отправки</h3>
      <p>${message}</p>
      <button class="btn btn-primary" onclick="closeErrorAlert()">Понятно</button>
    </div>
  `;
  
  document.body.appendChild(errorAlert);
  
  // Анимация появления
  setTimeout(() => {
    errorAlert.classList.add('show');
  }, 100);
}

// Close error alert function
function closeErrorAlert() {
  const errorAlert = document.querySelector('.error-alert');
  if (errorAlert) {
    errorAlert.classList.remove('show');
    setTimeout(() => {
      errorAlert.remove();
    }, 300);
  }
}

// Reset form function
function resetForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  
  if (form && successMessage) {
    form.style.display = 'block';
    successMessage.classList.remove('show');
    form.reset();
    
    // Clear all error states
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(error => {
      error.classList.remove('show');
    });
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.style.borderColor = '';
    });
    
    // Hide audit details if not selected
    const projectTypeSelect = document.getElementById('projectType');
    const auditDetailsGroup = document.getElementById('auditDetailsGroup');
    if (projectTypeSelect && auditDetailsGroup) {
      const selectedValue = projectTypeSelect.value;
      const isAuditProject = selectedValue.includes('audit');
      auditDetailsGroup.style.display = isAuditProject ? 'block' : 'none';
    }
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

// Enhanced markdown parser for detailed case studies
function parseMarkdown(markdown) {
  if (!markdown) return '';
  
  let html = markdown
    // Headers with special styling
    .replace(/^### (.*$)/gim, '<h3 class="section-header">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="main-section">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="case-title">$1</h1>')
    
    // Bold and italic with enhanced styling
    .replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="emphasis">$1</em>')
    
    // Links with external styling
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="external-link">$1</a>')
    
    // Special sections
    .replace(/^(О клиенте|Задача|Решение|Результат|Вызовы|Функционал|Этапы проекта)$/gim, '<h2 class="key-section">$1</h2>')
    
    // Numbered steps
    .replace(/^(\d+)$/gm, '<div class="step-number">$1</div>')
    
    // Technology tags (lines starting with #)
    .replace(/^#([a-zA-Z0-9]+)$/gm, '<span class="tech-tag">$1</span>')
    
    // Key metrics and results (lines with numbers and + or %)
    .replace(/(\d+[\+%]?\s*[а-яё\s]*(?:пользователей|компаний|документов|месяц[а-я]*|недел[а-я]*|год[а-я]*))/gim, '<span class="metric">$1</span>')
    
    // Line breaks and paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    
    // Enhanced lists
    .replace(/^\d+\.\s+(.*)$/gm, '<li class="numbered-item">$1</li>')
    .replace(/^-\s+(.*)$/gm, '<li class="bullet-item">$1</li>')
    
    // Wrap content in paragraphs
    .replace(/^(?!<[huldst])/gm, '<p>')
    .replace(/(?<!>)$/gm, '</p>')
    
    // Clean up and structure
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6][^>]*>.*<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<div class="step-number">.*<\/div>)<\/p>/g, '$1')
    .replace(/<p>(<span class="tech-tag">.*<\/span>)<\/p>/g, '<div class="tech-tags">$1</div>')
    .replace(/<p>(<li[^>]*>.*<\/li>)<\/p>/g, '<ul class="enhanced-list">$1</ul>')
    .replace(/<\/li><br><li/g, '</li><li')
    
    // Group consecutive tech tags
    .replace(/(<\/span>)<br>(<span class="tech-tag">)/g, '$1 $2')
    .replace(/<div class="tech-tags">(<span class="tech-tag">.*<\/span>)\s*(<span class="tech-tag">.*<\/span>)/g, '<div class="tech-tags">$1 $2')
    
    // Clean up metrics
    .replace(/<p>(<span class="metric">.*<\/span>)<\/p>/g, '<div class="metrics-highlight">$1</div>')
    
    // Structure key sections
    .replace(/<h2 class="key-section">/g, '<div class="analysis-section"><h2 class="key-section">')
    .replace(/<h2 class="main-section">/g, '</div><div class="analysis-section"><h2 class="main-section">')
    
    // Close the last section
    html += '</div>';
    
  return `<div class="prose-new detailed-analysis">${html}</div>`;
}
