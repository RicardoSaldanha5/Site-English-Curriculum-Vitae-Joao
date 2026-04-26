// ========================================
// INITIALIZE AOS (Animate On Scroll)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 50
    });
});

// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('.section, .hero');
window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// STATISTICS COUNTER ANIMATION
// ========================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Intersection Observer for statistics
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ========================================
// SKILLS PROGRESS BARS ANIMATION
// ========================================

const skillProgressBars = document.querySelectorAll('.skill-progress-fill');
const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            setTimeout(function() {
                entry.target.style.width = progress + '%';
            }, 200);
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillProgressBars.forEach(bar => {
    skillsObserver.observe(bar);
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================

window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const bg = document.querySelector('.hero-background');
    if (bg) {
        bg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========================================
// TYPING EFFECT FOR HERO SUBTITLE (Optional enhancement)
// ========================================

const heroSubtitle = document.querySelector('.hero-description');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    const words = originalText.split(' • ');
    let currentIndex = 0;
    
    function rotateText() {
        heroSubtitle.style.opacity = '0';
        setTimeout(function() {
            heroSubtitle.textContent = words[currentIndex];
            heroSubtitle.style.opacity = '1';
            currentIndex = (currentIndex + 1) % words.length;
        }, 300);
    }
    
    // Uncomment to enable text rotation
    // setInterval(rotateText, 3000);
}

// ========================================
// CARD HOVER 3D EFFECT
// ========================================

const cards = document.querySelectorAll('.experience-card, .publication-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// TIMELINE ANIMATION OBSERVER
// ========================================

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// ========================================
// LAZY LOADING FOR IMAGES (if needed)
// ========================================

const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ========================================
// FORM VALIDATION (if contact form is added)
// ========================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Simple validation
        if (!name.value.trim()) {
            showError(name, 'Por favor, insira seu nome');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Por favor, insira um email válido');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showError(message, 'Por favor, insira uma mensagem');
            isValid = false;
        }
        
        if (isValid) {
            // Form submission logic here
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#ef4444';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.style.borderColor = '#ef4444';
    
    setTimeout(function() {
        error.remove();
        input.style.borderColor = '';
    }, 3000);
}

// ========================================
// COPY EMAIL TO CLIPBOARD
// ========================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        const email = this.getAttribute('href').replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(function() {
                showNotification('Email copiado para a área de transferência!');
            });
        }
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScrollHandler = debounce(function() {
    // Heavy scroll operations here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// ========================================
// EASTER EGG - Console Message
// ========================================

console.log('%c👨‍🎨 Ricardo Saldanha - Currículo Interativo', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c🎨 Professor de Artes | Arquiteto | Reabilitação Psicomotora', 'font-size: 14px; color: #10b981;');
console.log('%c✉️ Contato: saldanha05@gmail.com', 'font-size: 12px; color: #f97316;');
console.log('%c📍 Valença do Minho, Portugal', 'font-size: 12px; color: #6b7280;');
console.log('%c\n🚀 Interessado em colaborar? Entre em contato!', 'font-size: 14px; font-weight: bold; color: #2563eb;');

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#sobre';
skipLink.className = 'skip-link';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 0;
    background: #2563eb;
    color: white;
    padding: 10px;
    z-index: 10000;
    transition: top 0.3s;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-100px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Focus management for modal/menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.click();
    }
});

// ========================================
// PRINT OPTIMIZATION
// ========================================

window.addEventListener('beforeprint', function() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.pageBreakInside = 'avoid';
    });
});

// ========================================
// SERVICE WORKER REGISTRATION (for PWA - optional)
// ========================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // window.addEventListener('load', function() {
    //     navigator.serviceWorker.register('/sw.js').then(function(registration) {
    //         console.log('ServiceWorker registered:', registration);
    //     }).catch(function(error) {
    //         console.log('ServiceWorker registration failed:', error);
    //     });
    // });
}

// ========================================
// ANALYTICS TRACKING (placeholder)
// ========================================

function trackEvent(category, action, label) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('Button', 'Click', this.textContent);
    });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('External Link', 'Click', this.href);
    });
});

console.log('🎉 Site carregado com sucesso! Todas as funcionalidades estão ativas.');