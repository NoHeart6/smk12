// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const skillCards = document.querySelectorAll('.skill-card');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-bar');
const stats = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contactForm');
const preloader = document.querySelector('.preloader');
const typingText = document.querySelector('.typing-text');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing animation after preloader
setTimeout(() => {
    if (typingText) {
        const text = typingText.textContent;
        typeWriter(typingText, text);
    }
}, 2000);

// Scroll Handling
function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1rem 0';
    }
}

// Smooth Scroll with offset
function smoothScroll(e) {
    e.preventDefault();
    const headerHeight = header.offsetHeight;
    const target = document.querySelector(this.getAttribute('href'));
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Hamburger Menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Animation Functions
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + '+';
                setTimeout(updateCount, 50);
            } else {
                stat.textContent = target + '+';
            }
        };
        updateCount();
    });
}

// Parallax Effect
function parallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Form Handling with validation
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Validasi form
    let isValid = true;
    const errors = [];
    
    // Validasi nama
    if (!formValues.name || formValues.name.length < 3) {
        errors.push('Nama harus diisi minimal 3 karakter');
        isValid = false;
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email || !emailRegex.test(formValues.email)) {
        errors.push('Email tidak valid');
        isValid = false;
    }
    
    // Validasi pesan
    if (!formValues.message || formValues.message.length < 10) {
        errors.push('Pesan harus diisi minimal 10 karakter');
        isValid = false;
    }
    
    if (!isValid) {
        alert(errors.join('\n'));
        return;
    }
    
    // Jika valid, kirim form
    console.log('Form submitted:', formValues);
    alert('Terima kasih! Pesan Anda telah terkirim.');
    this.reset();
}

// Card Animations with hover effect
function addCardHoverEffects(cards, scale = false) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = scale ? 'scale(1.03)' : 'translateY(-10px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0) scale(1)';
        });
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skills-container')) {
                animateSkillBars();
            }
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Event Listeners
window.addEventListener('scroll', () => {
    handleScroll();
    parallax();
});
window.addEventListener('load', handleScroll);
hamburger.addEventListener('click', toggleMenu);
navLinksItems.forEach(link => link.addEventListener('click', closeMenu));
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});
if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

// Initialize Card Animations
addCardHoverEffects(skillCards);
addCardHoverEffects(projectCards, true);

// Initialize Observers
const elements = document.querySelectorAll('.hero-content, .about-content, .skills-container, .about-stats, .project-card, [data-aos]');
elements.forEach(element => observer.observe(element));