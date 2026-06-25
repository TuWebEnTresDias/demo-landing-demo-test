(() => {
    'use strict';

    /* ============================================
       NAVBAR SCROLL
       ============================================ */

    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* ============================================
       MOBILE MENU
       ============================================ */

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link, .mobile-cta');

    const toggleMenu = () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMenu = () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ============================================
       INTERSECTION OBSERVER — SCROLL ANIMATIONS
       ============================================ */

    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        animateElements.forEach(el => observer.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('visible'));
    }

    /* ============================================
       ANIMATED COUNTERS
       ============================================ */

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000;
        const startTime = performance.now();

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.round(easedProgress * target);

            element.textContent = current.toLocaleString('es-AR');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ============================================
       CLOSE MOBILE MENU ON RESIZE
       ============================================ */

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = (e) => {
        if (e.matches) {
            closeMenu();
        }
    };

    mediaQuery.addEventListener('change', handleResize);

})();