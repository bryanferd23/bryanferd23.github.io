// Performance optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Dark mode with localStorage persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon', savedTheme !== 'dark');
        icon.classList.toggle('fa-sun', savedTheme === 'dark');
    }

    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        
        // Save preference
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Optimized form submission with validation
    const contactForm = document.getElementById('contactForm');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const validateForm = () => {
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();
        return subject.length > 0 && message.length > 10;
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Please fill in all fields with valid content.');
            return;
        }
        
        const subject = encodeURIComponent(subjectInput.value.trim());
        const message = encodeURIComponent(messageInput.value.trim());
        const mailtoLink = `mailto:ferdz.waine.mai@gmail.com?subject=${subject}&body=${message}`;
        
        window.location.href = mailtoLink;
        contactForm.reset();
    };
    
    contactForm.addEventListener('submit', handleFormSubmit);

    // Optimized element visibility with requestAnimationFrame
    const showElements = () => {
        requestAnimationFrame(() => {
            document.querySelectorAll('.project-card, .about-content, .form-group').forEach(elem => {
                elem.style.opacity = 1;
                elem.style.transform = 'none';
            });
        });
    };
    showElements();

    // Hamburger menu functionality
    const toggleMenu = () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    };
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    hamburger.addEventListener('click', toggleMenu);

    // Close menu functionality
    const closeMenu = () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        links.forEach(link => link.classList.remove('fade'));
    };
    links.forEach(link => link.addEventListener('click', closeMenu));

    // Optimized AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            easing: 'ease-out',
            offset: 100
        });
    }

    // Optimized Intersection Observer with reduced threshold
    const certCards = document.querySelectorAll('.cert-card');
    
    if (certCards.length > 0) {
        const certObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            entry.target.style.opacity = 1;
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100); // Reduced delay for better performance
                    });
                    certObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.05,
            rootMargin: '50px'
        });

        // Initialize card styles more efficiently
        certCards.forEach(card => {
            Object.assign(card.style, {
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease'
            });
            certObserver.observe(card);
        });
    }

    // About Section Animation on Scroll
    const aboutItems = document.querySelectorAll('.about-animate');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    aboutItems.forEach(item => {
        aboutObserver.observe(item);
    });

    // Contact Form Button Spinner & Feedback
    const contactFormBtn = document.querySelector('.submit-btn');
    const btnText = contactFormBtn.querySelector('.btn-text');
    const btnSpinner = contactFormBtn.querySelector('.btn-spinner');
    const formStatus = document.getElementById('formStatus');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';
        formStatus.textContent = '';
        setTimeout(() => {
            btnSpinner.style.display = 'none';
            btnText.style.display = 'inline';
            formStatus.textContent = 'Message sent!';
            formStatus.style.color = '#00b894';
            setTimeout(() => { formStatus.textContent = ''; }, 3000);
            contactForm.reset();
        }, 1200);
    });

    // Reduced motion preference (kept for accessibility)
    function setReducedMotion() {
        const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.body.setAttribute('data-reduced-motion', prefersReduce ? 'reduce' : 'auto');
    }
    setReducedMotion();

    // Cert Modal
    const certLinks = document.querySelectorAll('.cert-link');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certImage');
    const certPrevBtn = document.querySelector('.cert-prev');
    const certNextBtn = document.querySelector('.cert-next');
    const certCloseBtn = certModal.querySelector('.close');
    const certImages = [
        'resources/cert1.jpg',
        'resources/cert2.jpg',
        'resources/cert3.jpg'
    ];
    let currentCertIndex = 0;

    function openCertModal(index) {
        if (certModal.style.display !== 'block') {
            certModal.style.display = 'block';
            setTimeout(() => certModal.classList.add('show'), 50);
            certModal.focus();
        }
        currentCertIndex = (index + certImages.length) % certImages.length;
        certModalImg.src = certImages[currentCertIndex];
        certModalImg.setAttribute('aria-label', `Certificate ${currentCertIndex + 1} of ${certImages.length}`);
    }
    
    function closeCertModal() {
        certModal.classList.remove('show');
        setTimeout(() => {
            certModal.style.display = 'none';
            certModalImg.src = '';
        }, 300);
    }
    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const idx = parseInt(this.getAttribute('data-cert-index'));
            openCertModal(idx);
        });
    });
    if (certPrevBtn) certPrevBtn.addEventListener('click', () => openCertModal(currentCertIndex - 1));
    if (certNextBtn) certNextBtn.addEventListener('click', () => openCertModal(currentCertIndex + 1));
    if (certCloseBtn) certCloseBtn.addEventListener('click', closeCertModal);
    
    // Close modal when clicking outside the image
    certModal.addEventListener('click', function(e) {
        // Only close if clicking on the modal backdrop (not on the image or navigation buttons)
        if (e.target === certModal) {
            closeCertModal();
        }
    });
    
    window.addEventListener('keydown', function(e) {
        if (certModal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') openCertModal(currentCertIndex - 1);
            if (e.key === 'ArrowRight') openCertModal(currentCertIndex + 1);
            if (e.key === 'Escape') closeCertModal();
        }
    });


    // Optimized 3D Tilt effect with throttling
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (window.innerWidth > 900 && tiltCards.length > 0) {
        tiltCards.forEach(card => {
            const handleMouseMove = throttle((e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 6; // Reduced intensity
                const rotateY = ((x - centerX) / centerX) * 6;
                
                requestAnimationFrame(() => {
                    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });
            }, 16); // ~60fps
            
            const handleMouseLeave = () => {
                requestAnimationFrame(() => {
                    card.style.transform = '';
                });
            };
            
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    }

    // --- Timeline Expand/Collapse ---
    const timelineToggles = document.querySelectorAll('.timeline-toggle');
    timelineToggles.forEach(btn => {
        btn.addEventListener('click', function() {
            const listId = btn.getAttribute('aria-controls');
            const list = document.getElementById(listId);
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            // Collapse all others
            timelineToggles.forEach(b => {
                const l = document.getElementById(b.getAttribute('aria-controls'));
                b.setAttribute('aria-expanded', 'false');
                if (l) l.hidden = true;
            });
            // Expand this one if it was closed
            if (!expanded) {
                btn.setAttribute('aria-expanded', 'true');
                if (list) list.hidden = false;
                btn.textContent = 'Hide Details';
            } else {
                btn.setAttribute('aria-expanded', 'false');
                if (list) list.hidden = true;
                btn.textContent = 'Show Details';
            }
        });
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
    // Set initial button text
    if (timelineToggles.length) {
        timelineToggles.forEach(btn => btn.textContent = 'Show Details');
    }
});
