document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Dark mode toggle
    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    };
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(document.getElementById('subject').value);
        const message = encodeURIComponent(document.getElementById('message').value);
        const mailtoLink = `mailto:ferdz.waine.mai@gmail.com?subject=${subject}&body=${message}`;
        
        window.location.href = mailtoLink;
        document.getElementById('contactForm').reset();
    });

    // Show all elements without scroll effects
    document.querySelectorAll('.project-card, .about-content, .form-group').forEach(elem => {
        elem.style.opacity = 1;
        elem.style.transform = 'none';
    });

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

    AOS.init({
        duration: 1000,
        once: true
    });

    // Intersection Observer for certifications with fade-in effect
    const certCards = document.querySelectorAll('.cert-card');
    
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay to each card
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // 200ms delay between each card
                certObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initialize card styles
    certCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        certObserver.observe(card);
    });

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
    window.addEventListener('keydown', function(e) {
        if (certModal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') openCertModal(currentCertIndex - 1);
            if (e.key === 'ArrowRight') openCertModal(currentCertIndex + 1);
            if (e.key === 'Escape') closeCertModal();
        }
    });


    // 3D Tilt effect for .tilt-card
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        if (window.innerWidth > 900) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * 8;
                const rotateY = ((x - centerX) / centerX) * 8;
                card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
    });

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
