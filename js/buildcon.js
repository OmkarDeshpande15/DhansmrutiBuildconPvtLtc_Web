// ==================== TEXTILE LANDING PAGE JAVASCRIPT ====================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧵 Textile Landing Page Loaded!');
    
    // Initialize all features
    initScrollAnimations();
    initParallax();
    initButtonEffects();
    initImageAnimations();
    initCounters();
});

// ==================== SCROLL ANIMATIONS ====================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for feature cards
                const delay = entry.target.dataset.card ? 
                    parseInt(entry.target.dataset.card) * 150 : 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe about section
    const aboutContent = document.querySelector('.about-content');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutContent) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        aboutObserver.observe(aboutContent);
        if (aboutImage) aboutObserver.observe(aboutImage);
    }

    // Observe benefits section
    const benefitsImage = document.querySelector('.benefits-image');
    const benefitsContent = document.querySelector('.benefits-content');
    
    if (benefitsImage && benefitsContent) {
        const benefitsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    benefitsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        benefitsObserver.observe(benefitsImage);
        benefitsObserver.observe(benefitsContent);
    }
}

// ==================== PARALLAX EFFECT ====================

function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const decorativeNumber = document.querySelector('.decorative-number');
    
    if (!heroSection) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;
        
        // Only apply parallax when hero is visible
        if (scrolled < heroHeight) {
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
            
            if (decorativeNumber) {
                decorativeNumber.style.transform = `translateY(${scrolled * 0.3}px)`;
                decorativeNumber.style.opacity = 1 - (scrolled / heroHeight) * 1.5;
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ==================== BUTTON EFFECTS ====================

function initButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-secondary');
    
    buttons.forEach(button => {
        // Magnetic effect
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
        
        // Click ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            console.log('🔘 Button clicked:', this.textContent.trim());
        });
    });
    
    // Add ripple animation to stylesheet
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                from {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                to {
                    width: 400px;
                    height: 400px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== IMAGE ANIMATIONS ====================

function initImageAnimations() {
    const images = document.querySelectorAll('.main-about-img, .benefits-img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Dim other cards
            featureCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restore all cards
            featureCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
}

// ==================== PRICE COUNTERS ====================

function initCounters() {
    const priceCards = document.querySelectorAll('.price-card');
    
    if (priceCards.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const amount = entry.target.querySelector('.amount');
                if (amount && !amount.dataset.animated) {
                    animateCounter(amount);
                    amount.dataset.animated = 'true';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    priceCards.forEach(card => observer.observe(card));
}

function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// ==================== SCROLL INDICATOR FADE ====================

(() => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    let ticking = false;
    
    function updateScrollIndicator() {
        const scrolled = window.pageYOffset;
        const opacity = Math.max(0, 1 - (scrolled / 300));
        
        scrollIndicator.style.opacity = opacity;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollIndicator);
            ticking = true;
        }
    });
})();

// ==================== PERFORMANCE MONITORING ====================

window.addEventListener('load', () => {
    if (window.performance) {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.group('📊 Page Performance');
            console.log('Load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
            console.log('DOM Interactive:', Math.round(perfData.domInteractive - perfData.fetchStart) + 'ms');
            console.groupEnd();
        }, 0);
    }
});

// ==================== ACCESSIBILITY ====================

// Keyboard navigation for interactive elements
document.querySelectorAll('.feature-card, .price-card').forEach(element => {
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
    }
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animationDuration = '0.01ms';
        element.style.transitionDuration = '0.01ms';
    });
    console.log('⚡ Reduced motion enabled');
}

console.log('✅ All textile page features initialized!');
// ==================== GALLERY SECTION ONLY - JAVASCRIPT ====================

(function() {
    'use strict';

    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

    function initGallery() {
        console.log('🎨 Gallery Section Initialized!');
        
        initScrollAnimations();
        init3DTiltEffect();
        initViewDetailsButtons();
        initImageLightbox();
        initCardClickHandlers();
        initKeyboardNavigation();
        
        console.log('✅ All gallery features loaded!');
    }

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    
    function initScrollAnimations() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        if (galleryCards.length === 0) return;
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -80px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.gallery || 0) * 150;
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        galleryCards.forEach(card => observer.observe(card));
    }

    // ==================== 3D TILT EFFECT ====================
    
    function init3DTiltEffect() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * 10; // Max 10 degrees
                const rotateY = ((centerX - x) / centerX) * 10;
                
                this.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale(1.02)
                `;
                this.style.transition = 'transform 0.1s ease-out';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ==================== VIEW DETAILS BUTTON HANDLERS ====================
    
    function initViewDetailsButtons() {
        const viewButtons = document.querySelectorAll('.view-details');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                
                const card = this.closest('.gallery-card');
                const productName = card.querySelector('.gallery-title')?.textContent || 'Product';
                const description = card.querySelector('.overlay-content p')?.textContent || '';
                
                console.log('👁️ View Details clicked:', productName);
                
                // Create ripple effect
                createRipple(this, e);
                
                // Show details (customize this to your needs)
                showProductDetails(productName, description);
            });
        });
    }

    // ==================== RIPPLE EFFECT ====================
    
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%)';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // ==================== PRODUCT DETAILS MODAL ====================
    
    function showProductDetails(name, description) {
        // Create custom modal or alert
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <h2>${name}</h2>
                <p>${description}</p>
                <div class="modal-actions">
                    <button class="btn-primary">Request Quote</button>
                    <button class="btn-secondary">Learn More</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => closeModal(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
        
        // Add modal styles if not exists
        addModalStyles();
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    function addModalStyles() {
        if (document.querySelector('#product-modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'product-modal-styles';
        style.textContent = `
            .product-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .product-modal.active {
                opacity: 1;
            }
            
            .modal-content {
                background: #fff;
                padding: 3rem;
                max-width: 600px;
                width: 90%;
                border-radius: 12px;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .product-modal.active .modal-content {
                transform: scale(1);
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                border-radius: 50%;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #e67e22;
            }
            
            .modal-content h2 {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #0a0a0a;
            }
            
            .modal-content p {
                font-size: 1.1rem;
                line-height: 1.6;
                color: #666;
                margin-bottom: 2rem;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
            }
            
            .modal-actions button {
                flex: 1;
                padding: 1rem 2rem;
                border: none;
                cursor: pointer;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .btn-primary {
                background: #e67e22;
                color: #fff;
            }
            
            .btn-primary:hover {
                background: #d35400;
            }
            
            .btn-secondary {
                background: transparent;
                border: 2px solid #e67e22;
                color: #e67e22;
            }
            
            .btn-secondary:hover {
                background: #e67e22;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== IMAGE LIGHTBOX ====================
    
    function initImageLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-image img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightbox(this);
            });
            
            // Add cursor pointer
            img.style.cursor = 'zoom-in';
        });
    }

    function openLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">${img.alt}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        // Close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => closeLightbox(lightbox));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox(lightbox);
        });
        
        // Keyboard support
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        console.log('🔍 Lightbox opened:', img.alt);
    }

    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    }

    // ==================== CARD CLICK HANDLERS ====================
    
    function initCardClickHandlers() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking button or image
                if (e.target.closest('.view-details') || 
                    e.target.closest('.gallery-image img')) {
                    return;
                }
                
                const title = this.querySelector('.gallery-title')?.textContent;
                console.log('🖼️ Gallery card clicked:', title);
                
                // Add pulse effect
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
    }

    // ==================== KEYBOARD NAVIGATION ====================
    
    function initKeyboardNavigation() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        const viewButtons = document.querySelectorAll('.view-details');
        
        // Make cards keyboard accessible
        galleryCards.forEach((card, index) => {
            if (!card.hasAttribute('tabindex')) {
                card.setAttribute('tabindex', '0');
            }
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
        
        // Make buttons keyboard accessible
        viewButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    // ==================== HOVER EFFECTS FOR OTHER CARDS ====================
    
    function initCardDimming() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Dim other cards
                galleryCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.style.opacity = '0.6';
                        otherCard.style.filter = 'blur(2px)';
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Restore all cards
                galleryCards.forEach(otherCard => {
                    otherCard.style.opacity = '1';
                    otherCard.style.filter = 'blur(0)';
                });
            });
        });
    }

    // Optional: Initialize card dimming
    // initCardDimming();

    // ==================== LAZY LOADING IMAGES ====================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('.gallery-image img[data-src]');
        
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ==================== PERFORMANCE MONITORING ====================
    
    function logPerformance() {
        if (!window.performance) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.group('⚡ Gallery Performance');
                    console.log('DOM Interactive:', Math.round(perfData.domInteractive) + 'ms');
                    console.log('Load Complete:', Math.round(perfData.loadEventEnd) + 'ms');
                    console.groupEnd();
                }
            }, 0);
        });
    }

    logPerformance();

    // ==================== REDUCED MOTION SUPPORT ====================
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.gallery-card, .gallery-image img').forEach(element => {
            element.style.transition = 'none';
        });
        console.log('⚡ Reduced motion enabled');
    }

})();

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('🎨 Gallery JavaScript Loaded Successfully!');
 // ==================== NAVBAR SCROLL EFFECT ====================
  (() => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
  
    let lastScroll = 0;
    const scrollThreshold = 100;
  
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
  
      // Add shadow when scrolled
      if (currentScroll > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
  
      lastScroll = currentScroll;
    });
  })();
  
  // ==================== SCROLL REVEAL ANIMATIONS ====================
  function initScrollReveal() {
    // Intersection Observer for scroll animations - continuous observation
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element enters viewport - show it
          entry.target.classList.add("visible");
        } else {
          // Element leaves viewport - hide it
          entry.target.classList.remove("visible");
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const animatedElements = document.querySelectorAll(".scroll-reveal");
    
    if (animatedElements.length > 0) {
      animatedElements.forEach(el => {
        // Ensure element is hidden initially
        if (!el.classList.contains("visible")) {
          el.style.opacity = "0";
          el.style.transform = "translateY(50px)";
        }
        // Keep observing continuously - don't unobserve
        observer.observe(el);
      });
    }
  }
// ==================== PAGE LOADER ====================
(() => {
    const pageLoader = document.getElementById('pageLoader');
    const body = document.body;
    
    if (!pageLoader) return;
    
    // Function to show loader
    function showLoader() {
      body.classList.add('loading');
      pageLoader.style.display = 'flex';
      pageLoader.classList.remove('hidden');
    }
    
    // Function to hide loader
    function hideLoader() {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
          pageLoader.style.display = 'none';
        }, 600);
      }, 1500); // Increased minimum display time for better visibility
    }
    
    // Show loader immediately on page load
    showLoader();
    
    // Hide loader when page is fully loaded
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      // Wait for all resources to load
      window.addEventListener('load', hideLoader);
      
      // Fallback: hide after maximum 5 seconds
      setTimeout(hideLoader, 5000);
    }
    
    // Show loader on page navigation (link clicks)
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('#')) {
        // Check if it's an internal link
        const currentHost = window.location.hostname;
        const linkHost = new URL(link.href, window.location.href).hostname;
        
        if (linkHost === currentHost || linkHost === '') {
          // Show loader immediately when internal link is clicked
          showLoader();
        }
      }
    });
    
    // Also handle browser back/forward buttons
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        // Page was loaded from cache, show loader briefly
        showLoader();
        setTimeout(hideLoader, 300);
      }
    });
  })();
  