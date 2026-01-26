// ==========================================
// SPECTACULAR ABOUT PAGE - PREMIUM INTERACTIONS
// ==========================================

(function () {
    'use strict';

    // ==========================================
    // SMOOTH SCROLL CONFIGURATION
    // ==========================================

    // Enhanced smooth scroll with easing
    function smoothScrollTo(target, duration = 1200) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Easing function for ultra-smooth animation
        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // ==========================================
    // DOM READY
    // ==========================================

    document.addEventListener('DOMContentLoaded', function () {



        // ==========================================
        // ULTRA SMOOTH ANCHOR SCROLLING
        // ==========================================

        // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        //     anchor.addEventListener('click', function (e) {
        //         const href = this.getAttribute('href');

        //         if (href === '#' || href === '#!') return;

        //         const target = document.querySelector(href);
        //         if (!target) return;

        //         e.preventDefault();
        //         smoothScrollTo(target, 1200);

        //         // Update URL without jumping
        //         if (history.pushState) {
        //             history.pushState(null, null, href);
        //         }
        //     });
        // });

        // ==========================================
        // SPECTACULAR SCROLL REVEAL
        // ==========================================

        const revealConfig = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements
                    setTimeout(() => {
                        entry.target.classList.add('active');

                        // Reveal child elements with stagger
                        const children = entry.target.querySelectorAll('.content-container > *');
                        children.forEach((child, childIndex) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, childIndex * 150);
                        });
                    }, index * 100);

                    // Unobserve after animation
                    revealObserver.unobserve(entry.target);
                }
            });
        }, revealConfig);

        // Observe sections
        const sectionsToReveal = document.querySelectorAll(
            '.mission-section, .ownership-section, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right'
        );

        sectionsToReveal.forEach(section => {
            // Prepare child elements for animation
            const children = section.querySelectorAll('.content-container > *');
            children.forEach(child => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            revealObserver.observe(section);
        });

        // ==========================================
        // PARALLAX SCROLLING
        // ==========================================

        const heroSection = document.querySelector('.hero-section');
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;

            if (heroSection && scrolled < window.innerHeight) {
                const parallaxSpeed = 0.4;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // ==========================================
        // PREMIUM BUTTON RIPPLE EFFECT
        // ==========================================

        function createRipple(event) {
            const button = event.currentTarget;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                pointer-events: none;
            `;

            const existingRipple = button.querySelector('.ripple-effect');
            if (existingRipple) existingRipple.remove();

            ripple.classList.add('ripple-effect');
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 800);
        }

        // Apply to all buttons
        const buttons = document.querySelectorAll(
            '.learn-more-btn, .cta-btn, .cta-button, .contact-button'
        );

        buttons.forEach(button => {
            button.addEventListener('click', createRipple);
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
        });

        // ==========================================
        // MAGNETIC BUTTONS (Desktop Only)
        // ==========================================

        if (window.innerWidth > 992) {
            buttons.forEach(button => {
                button.addEventListener('mousemove', function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
                });

                button.addEventListener('mouseleave', function () {
                    this.style.transform = '';
                });
            });
        }

        // ==========================================
        // IMAGE HOVER EFFECTS
        // ==========================================

        const imageContainers = document.querySelectorAll('.image-container');

        imageContainers.forEach(container => {
            const img = container.querySelector('img');

            if (img) {
                container.addEventListener('mouseenter', function () {
                    img.style.transform = 'scale(1.15) rotate(2deg)';
                });

                container.addEventListener('mouseleave', function () {
                    img.style.transform = 'scale(1) rotate(0deg)';
                });

                // Mouse move parallax on images
                container.addEventListener('mousemove', function (e) {
                    const rect = this.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    img.style.transform = `scale(1.15) translate(${x * 20}px, ${y * 20}px)`;
                });

                container.addEventListener('mouseleave', function () {
                    img.style.transform = 'scale(1) translate(0, 0)';
                });
            }
        });

        // ==========================================
        // SIDEBAR NAVIGATION ACTIVE STATE
        // ==========================================

        const sidebarLinks = document.querySelectorAll('.sidebar nav a');
        const sections = Array.from(document.querySelectorAll('[id]'));

        function updateActiveNavLink() {
            const scrollPosition = window.scrollY + 200;

            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        let scrollTimeout;
        window.addEventListener('scroll', function () {
            if (!scrollTimeout) {
                window.requestAnimationFrame(function () {
                    updateActiveNavLink();
                    scrollTimeout = null;
                });
                scrollTimeout = true;
            }
        });



        // ==========================================
        // CURSOR TRAIL EFFECT (Desktop Only)
        // ==========================================

        
        
        // ==========================================
        // PERFORMANCE OPTIMIZATION
        // ==========================================

        // Lazy load images when they come into view
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));

        // ==========================================
        // CONSOLE ART
        // ==========================================

        console.log('%c✨ SPECTACULAR ABOUT PAGE ✨',
            'color: #ff6b35; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
        );
        console.log('%c🚀 All Systems Operational',
            'color: #4CAF50; font-size: 14px; font-weight: bold;'
        );
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            'color: #666;'
        );
        console.log('%c✓ Smooth Scrolling: Active\n✓ Animations: Premium\n✓ Performance: Optimized\n✓ Interactions: Enhanced',
            'color: #333; font-size: 12px; line-height: 1.8;'
        );

    });

    // ==========================================
    // DYNAMIC STYLES
    // ==========================================

    const style = document.createElement('style');
    style.textContent = `
         @keyframes ripple-effect {
             to {
                 transform: scale(2);
                 opacity: 0;
             }
         }
 
         .sidebar nav a.active {
             color: #ff6b35 !important;
             border-left-color: #ff6b35 !important;
             background: rgba(255, 107, 53, 0.08) !important;
             padding-left: 35px !important;
         }
 
         body.loaded {
             animation: fadeIn 0.3s ease-out;
         }
 
         @keyframes fadeIn {
             from { opacity: 0; }
             to { opacity: 1; }
         }
 
         /* Smooth scroll snap for sections */
        @media(min - width: 992px) {
            html {
                scroll - snap - type: y proximity;
            }

            section {
                scroll - snap - align: start;
            }
        }
        `;
    document.head.appendChild(style);

})();
