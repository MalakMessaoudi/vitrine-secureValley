/**
 * SecureValley JS functionality
 * Pure Vanilla JavaScript for high performance
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon animation class if needed here
            const hamburger = menuToggle.querySelector('.hamburger');
            if(navMenu.classList.contains('active')) {
                hamburger.style.backgroundColor = 'transparent';
                menuToggle.style.setProperty('--c-white', 'transparent'); // visual trick
                menuToggle.classList.add('is-active');
            } else {
                hamburger.style.backgroundColor = '';
                menuToggle.classList.remove('is-active');
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Run once on load to catch initial state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 3. Intersection Observer for Scroll Animations (Performance Friendly)
    const animElements = document.querySelectorAll('.fade-in-element, .slide-up-element');
    
    // Check if IntersectionObserver is supported (modern browsers)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // 15% of the element visible
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop watching once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach(el => {
            scrollObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        animElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // 4. Update Active Nav Link Based on Scroll Position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for sticky header offset
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // 5. Dark/Light Mode Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Load preference from local storage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
        }

        themeBtn.addEventListener('click', () => {
            const tempTheme = document.documentElement.getAttribute('data-theme');
            if (tempTheme === 'light') {
                document.documentElement.removeAttribute('data-theme'); // default is dark
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
