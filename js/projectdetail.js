/* ==========================================
   PROJECT DETAILS PAGE - JAVASCRIPT
   ========================================== */

   (() => {
    'use strict';
  
    // ==========================================
    // HERO IMAGE SLIDER
    // ==========================================
  
    const heroSlider = {
      slides: document.querySelectorAll('.hero-slide'),
      dotsContainer: document.getElementById('sliderDots'),
      prevBtn: document.getElementById('prevSlide'),
      nextBtn: document.getElementById('nextSlide'),
      currentIndex: 0,
      autoPlayInterval: null,
      autoPlayDelay: 5000
    };
  
    function initHeroSlider() {
      if (heroSlider.slides.length === 0) return;
  
      // Create dots
      heroSlider.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        heroSlider.dotsContainer.appendChild(dot);
      });
  
      // Event listeners
      heroSlider.prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
  
      heroSlider.nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });
  
      // Start autoplay
      startAutoPlay();
    }
  
    function goToSlide(index) {
      heroSlider.slides[heroSlider.currentIndex].classList.remove('active');
      
      const dots = heroSlider.dotsContainer.querySelectorAll('.slider-dot');
      dots[heroSlider.currentIndex].classList.remove('active');
  
      heroSlider.currentIndex = index;
  
      heroSlider.slides[heroSlider.currentIndex].classList.add('active');
      dots[heroSlider.currentIndex].classList.add('active');
    }
  
    function nextSlide() {
      const nextIndex = (heroSlider.currentIndex + 1) % heroSlider.slides.length;
      goToSlide(nextIndex);
    }
  
    function prevSlide() {
      const prevIndex = (heroSlider.currentIndex - 1 + heroSlider.slides.length) % heroSlider.slides.length;
      goToSlide(prevIndex);
    }
  
    function startAutoPlay() {
      stopAutoPlay();
      heroSlider.autoPlayInterval = setInterval(nextSlide, heroSlider.autoPlayDelay);
    }
  
    function stopAutoPlay() {
      if (heroSlider.autoPlayInterval) {
        clearInterval(heroSlider.autoPlayInterval);
      }
    }
  
    function resetAutoPlay() {
      stopAutoPlay();
      setTimeout(startAutoPlay, 2000);
    }
  
    // ==========================================
    // GALLERY LIGHTBOX
    // ==========================================
  
    const lightbox = {
      element: document.getElementById('lightbox'),
      image: document.getElementById('lightboxImage'),
      closeBtn: document.getElementById('lightboxClose'),
      prevBtn: document.getElementById('lightboxPrev'),
      nextBtn: document.getElementById('lightboxNext'),
      galleryItems: document.querySelectorAll('.gallery-item'),
      currentIndex: 0,
      images: []
    };
  
    function initLightbox() {
      if (!lightbox.element || lightbox.galleryItems.length === 0) return;
  
      // Collect all gallery images
      lightbox.galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        lightbox.images.push(img.src);
        
        item.addEventListener('click', () => {
          openLightbox(index);
        });
      });
  
      // Event listeners
      lightbox.closeBtn?.addEventListener('click', closeLightbox);
      lightbox.prevBtn?.addEventListener('click', showPrevImage);
      lightbox.nextBtn?.addEventListener('click', showNextImage);
  
      // Close on background click
      lightbox.element.addEventListener('click', (e) => {
        if (e.target === lightbox.element) {
          closeLightbox();
        }
      });
  
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.element.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
      });
    }
  
    function openLightbox(index) {
      lightbox.currentIndex = index;
      lightbox.image.src = lightbox.images[index];
      lightbox.element.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeLightbox() {
      lightbox.element.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    function showNextImage() {
      lightbox.currentIndex = (lightbox.currentIndex + 1) % lightbox.images.length;
      lightbox.image.style.opacity = '0';
      
      setTimeout(() => {
        lightbox.image.src = lightbox.images[lightbox.currentIndex];
        lightbox.image.style.opacity = '1';
      }, 200);
    }
  
    function showPrevImage() {
      lightbox.currentIndex = (lightbox.currentIndex - 1 + lightbox.images.length) % lightbox.images.length;
      lightbox.image.style.opacity = '0';
      
      setTimeout(() => {
        lightbox.image.src = lightbox.images[lightbox.currentIndex];
        lightbox.image.style.opacity = '1';
      }, 200);
    }
  
    // Add transition to lightbox image
    if (lightbox.image) {
      lightbox.image.style.transition = 'opacity 0.3s ease';
    }
  
    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
  
    function initScrollAnimations() {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
  
      // Observe elements
      const animatedElements = document.querySelectorAll(`
        .content-section,
        .info-card,
        .cta-card,
        .gallery-item
      `);
  
      animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
      });
    }
  
    // ==========================================
    // SMOOTH SCROLL TO TOP
    // ==========================================
  
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
      backButton.addEventListener('click', (e) => {
        // Optional: smooth scroll to top before navigation
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // ==========================================
    // HOVER EFFECTS
    // ==========================================
  
    // Gallery items hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
          overlay.style.opacity = '1';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
          overlay.style.opacity = '0';
        }
      });
    });
  
    // Spec items hover effect
    const specItems = document.querySelectorAll('.spec-item');
    
    specItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  
    // ==========================================
    // PARALLAX EFFECT ON HERO
    // ==========================================
  
    function initParallax() {
      const heroSlides = document.querySelectorAll('.hero-slide img');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        heroSlides.forEach(img => {
          img.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
      });
    }
  
    // ==========================================
    // STATISTICS COUNTER ANIMATION
    // ==========================================
  
    function animateCounter(element, target, duration = 2000) {
      const start = 0;
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuad = progress * (2 - progress);
        const current = Math.floor(easeOutQuad * (target - start) + start);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target.toLocaleString();
        }
      }
      
      requestAnimationFrame(update);
    }
  
    // Animate any counter elements if present
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length > 0) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
  
      counters.forEach(counter => counterObserver.observe(counter));
    }
  
    // ==========================================
    // INITIALIZE ALL
    // ==========================================
  
    function init() {
      initHeroSlider();
      initLightbox();
      initScrollAnimations();
      initParallax();
      
      console.log('✅ Project Details page initialized');
    }
  
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    // ==========================================
    // RESIZE HANDLER
    // ==========================================
  
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Refresh any position-dependent calculations
        console.log('Window resized');
      }, 250);
    });
  
  })();
  
  console.log('🏗️ Project Details ready!');