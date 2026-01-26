
// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
  constructor() {
    this.initScrollTriggers();
  }

  initScrollTriggers() {
    // Intro section animations
    gsap.from('.intro-badge', {
      scrollTrigger: {
        trigger: '.events-intro',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    gsap.from('.intro-title', {
      scrollTrigger: {
        trigger: '.events-intro',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.intro-text p', {
      scrollTrigger: {
        trigger: '.intro-text',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.4,
      ease: 'power3.out'
    });

    // Event header animations
    gsap.from('.event-date', {
      scrollTrigger: {
        trigger: '.event-showcase',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.event-info', {
      scrollTrigger: {
        trigger: '.event-showcase',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    
    // Upcoming events
    gsap.from('.upcoming-header', {
      scrollTrigger: {
        trigger: '.upcoming-events',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.upcoming-card', {
      scrollTrigger: {
        trigger: '.upcoming-grid',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }
}


/* ============================================
   SIMPLE EVENT SLIDER
   Clean, functional slider for your images
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // SLIDER SETUP
  // ============================================
  
  const slider = {
    viewport: document.getElementById('slider'),
    prevBtn: document.getElementById('sliderPrev'),
    nextBtn: document.getElementById('sliderNext'),
    images: [],
    currentIndex: 0,
    isAnimating: false,
    autoPlayInterval: null,
    autoPlayDelay: 5000 // 5 seconds
  };

  // Get all slider images
  slider.images = slider.viewport.querySelectorAll('.slider-img');
  
  // Show first image
  if (slider.images.length > 0) {
    slider.images[0].classList.add('active');
  }

  // ============================================
  // NAVIGATION FUNCTIONS
  // ============================================
  
  function goToSlide(index) {
    if (slider.isAnimating || slider.images.length === 0) return;
    
    slider.isAnimating = true;
    
    // Get current and next images
    const currentImg = slider.images[slider.currentIndex];
    const nextImg = slider.images[index];
    
    // Fade out current image
    currentImg.style.opacity = '0';
    currentImg.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      currentImg.classList.remove('active');
      
      // Fade in next image
      nextImg.classList.add('active');
      nextImg.style.opacity = '0';
      nextImg.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        nextImg.style.opacity = '1';
        nextImg.style.transform = 'scale(1)';
        
        slider.currentIndex = index;
        slider.isAnimating = false;
      }, 50);
    }, 600);
  }

  function nextSlide() {
    const nextIndex = (slider.currentIndex + 1) % slider.images.length;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (slider.currentIndex - 1 + slider.images.length) % slider.images.length;
    goToSlide(prevIndex);
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  
  // Button clicks
  if (slider.nextBtn) {
    slider.nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (slider.prevBtn) {
    slider.prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoPlay();
    }
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - prev slide
        prevSlide();
      }
      resetAutoPlay();
    }
  }

  // ============================================
  // AUTO-PLAY FUNCTIONALITY
  // ============================================
  
  function startAutoPlay() {
    slider.autoPlayInterval = setInterval(() => {
      nextSlide();
    }, slider.autoPlayDelay);
  }

  function stopAutoPlay() {
    if (slider.autoPlayInterval) {
      clearInterval(slider.autoPlayInterval);
      slider.autoPlayInterval = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause on hover
  slider.viewport.addEventListener('mouseenter', stopAutoPlay);
  slider.viewport.addEventListener('mouseleave', startAutoPlay);

  // Pause when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // ============================================
  // INITIALIZE
  // ============================================
  
  // Start auto-play
  if (slider.images.length > 1) {
    startAutoPlay();
  }

  // Add smooth transitions to all images
  slider.images.forEach(img => {
    img.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
  });

  console.log(`✅ Slider initialized with ${slider.images.length} images`);

});



// ============================================
// PARALLAX EFFECTS
// ============================================
class ParallaxEffects {
  constructor() {
    this.init();
  }

  init() {
    // Hero parallax
    gsap.to('.events-hero::before', {
      scrollTrigger: {
        trigger: '.events-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: '30%',
      ease: 'none'
    });

    // Scroll indicator fade
    gsap.to('.scroll-indicator', {
      scrollTrigger: {
        trigger: '.events-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      opacity: 0,
      y: 20,
      ease: 'none'
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize page loader
  const loader = new PageLoader();
  loader.init();

  // Initialize components
  setTimeout(() => {
    new ScrollAnimations();
    new ImageSlider();
    new CounterAnimation();
    new GridView();
    new Modal();
    new ParallaxEffects();
  }, 100);
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});