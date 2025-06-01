document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Refactored dark mode toggle
    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    };
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Refactored smooth scrolling
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        if (targetId === '#') {
            // If the href is just '#', scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Otherwise, scroll to the specified element
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error(`Element with id "${targetId}" not found`);
            }
        }
    };
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Refactored header scroll effect
    const handleHeaderScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.style.transform = `translateY(${scrollTop > lastScrollTop ? '-100%' : '0'})`;
        lastScrollTop = scrollTop;
    };
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', handleHeaderScroll);

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

    // Refactored Intersection Observer
    const handleIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    const fadeObserver = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    // Intersection Observer for fade-in effect
    const fadeElems = document.querySelectorAll('.project-card, .about-content, .form-group');
    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(elem);
    });

    // Refactored hamburger menu functionality
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

    // Refactored close menu functionality
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

    


    // Certificate modal functionality
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certImage');
    const closeBtn = document.querySelector('#certModal .close');
    const certLinks = document.querySelectorAll('.cert-link');
    let scrollPosition = 0;

    const openModal = (imgSrc) => {
        scrollPosition = window.pageYOffset;
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
        setTimeout(() => modal.classList.add('show'), 50);
    };

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition);
        }, 300);
    };

    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-image');
            openModal(imgSrc);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });


});
