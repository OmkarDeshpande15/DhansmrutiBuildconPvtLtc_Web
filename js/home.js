// ==================== PREMIUM CONSTRUCTION WEBSITE JS ====================

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

// ==================== HERO SLIDER ====================
(() => {
    const slider = document.querySelector(".slider");
    if (!slider) return;
  
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const prevBtn = slider.querySelector(".slider-arrow.left");
    const nextBtn = slider.querySelector(".slider-arrow.right");
    const dotsContainer = slider.querySelector(".slider-dots");
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoSlideTimer;
    const autoSlideDelay = 5000; // Changed to 5s for better experience
  
    // Create pagination dots
    function createDots() {
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          goToSlide(i);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    }
  
    // Activate specific slide with smooth transition
    function activateSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
      updateDots(index);
    }
  
    // Update dot indicators
    function updateDots(index) {
      const dots = Array.from(dotsContainer.querySelectorAll("button"));
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  
    // Navigate to specific slide
    function goToSlide(index) {
      if (index === currentIndex) return;
      currentIndex = index;
      activateSlide(currentIndex);
    }
  
    // Next slide
    function nextSlide() {
      goToSlide((currentIndex + 1) % slideCount);
    }
  
    // Previous slide
    function prevSlide() {
      goToSlide((currentIndex - 1 + slideCount) % slideCount);
    }
  
    // Auto-slide functionality
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, autoSlideDelay);
    }
  
    function stopAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    }
  
    function resetAutoSlide() {
      stopAutoSlide();
      setTimeout(startAutoSlide, 2000);
    }
  
    // Initialize slider
    function init() {
      createDots();
      activateSlide(currentIndex);
      startAutoSlide();
  
      // Event listeners
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
  
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
  
      // Pause on hover
      slider.addEventListener("mouseenter", stopAutoSlide);
      slider.addEventListener("mouseleave", startAutoSlide);
  
      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          nextSlide();
          resetAutoSlide();
        } else if (e.key === "ArrowLeft") {
          prevSlide();
          resetAutoSlide();
        }
      });
    }
  
    // Start when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();
  
  // ==================== MOBILE NAVIGATION ====================
  (() => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
  
    if (!hamburger || !navMenu) return;
  
    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });
  
    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  })();
  
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

  // ==================== MAIN SECTIONS SCROLL REVEAL ====================
  function initMainSectionsReveal() {
    // Enhanced observer for main sections - continuous observation
    const sectionObserverOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Section enters viewport - show it
          entry.target.classList.add("visible");
          
          // Also reveal child elements with stagger
          const children = entry.target.querySelectorAll(
            ".sector-card.scroll-reveal, .story-text-content.scroll-reveal, " +
            ".story-images-grid.scroll-reveal, .leader-slider.scroll-reveal, " +
            ".ceo-content.scroll-reveal, .ceo-image-wrapper.scroll-reveal, " +
            ".map-container.scroll-reveal, .stats-bar.scroll-reveal"
          );
          
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("visible");
            }, index * 150); // Stagger by 150ms
          });
        } else {
          // Section leaves viewport - hide it and its children
          entry.target.classList.remove("visible");
          
          const children = entry.target.querySelectorAll(
            ".sector-card.scroll-reveal, .story-text-content.scroll-reveal, " +
            ".story-images-grid.scroll-reveal, .leader-slider.scroll-reveal, " +
            ".ceo-content.scroll-reveal, .ceo-image-wrapper.scroll-reveal, " +
            ".map-container.scroll-reveal, .stats-bar.scroll-reveal"
          );
          
          children.forEach(child => {
            child.classList.remove("visible");
          });
        }
        // Keep observing continuously - don't unobserve
      });
    }, sectionObserverOptions);

    // Observe main content sections
    const mainSections = document.querySelectorAll(
      ".sectors-section.scroll-reveal, .our-story-section.scroll-reveal, " +
      ".leader-section.scroll-reveal, .ceo-letter-section.scroll-reveal, " +
      ".map-section.scroll-reveal"
    );

    if (mainSections.length > 0) {
      mainSections.forEach(section => {
        // Ensure section is hidden initially
        if (!section.classList.contains("visible")) {
          section.style.opacity = "0";
          section.style.transform = "translateY(40px)";
        }
        // Keep observing continuously
        sectionObserver.observe(section);
      });
    }

    // Also observe stats bar separately if it exists
    const statsBar = document.querySelector(".stats-bar.scroll-reveal");
    if (statsBar) {
      if (!statsBar.classList.contains("visible")) {
        statsBar.style.opacity = "0";
        statsBar.style.transform = "translateY(30px)";
      }
      
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Stats bar enters viewport - show it
            entry.target.classList.add("visible");
          } else {
            // Stats bar leaves viewport - hide it
            entry.target.classList.remove("visible");
          }
          // Keep observing continuously - don't unobserve
        });
      }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
      
      statsObserver.observe(statsBar);
    }
  }

  // Initialize scroll reveal when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initScrollReveal();
      initMainSectionsReveal();
    });
  } else {
    // DOM is already ready
    initScrollReveal();
    initMainSectionsReveal();
  }
  // ==================== sector-card LINKS ====================
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sector-card').forEach(card => {
      card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        console.log('Redirecting to:', link);
        window.location.href = link;
      });
    });
  });
  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  (() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        
        // Skip if href is just "#"
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (!target) return;
  
        e.preventDefault();
        
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      });
    });
  })();
  
  // ==================== NUMBER COUNTER ANIMATION ====================
  // Use this for stats section (Years of Experience, Projects Completed, etc.)
  function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = progress * (2 - progress);
      const current = Math.floor(easeOutQuad * (end - start) + start);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString();
      }
    };
    
    requestAnimationFrame(step);
  }
  
  // Initialize counters when they come into view
  (() => {
    const counterElements = document.querySelectorAll(".counter");
    if (counterElements.length === 0) return;
  
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute("data-target"));
          const duration = parseInt(target.getAttribute("data-duration")) || 2000;
          
          animateCounter(target, 0, endValue, duration);
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
  
    counterElements.forEach(counter => counterObserver.observe(counter));
  })();
  
  // ==================== PARALLAX EFFECT ====================
  // Subtle parallax for hero section and other backgrounds
  (() => {
    const parallaxElements = document.querySelectorAll(".parallax");
    if (parallaxElements.length === 0) return;
  
    let ticking = false;
  
    function updateParallax() {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute("data-speed") || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    }
  
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  })();
  
  // ==================== LAZY LOADING IMAGES ====================
  (() => {
    const lazyImages = document.querySelectorAll("img[data-src]");
    if (lazyImages.length === 0) return;
  
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });
  
    lazyImages.forEach(img => imageObserver.observe(img));
  })();
  
  // ==================== FORM VALIDATION (if you have contact form) ====================
  (() => {
    const forms = document.querySelectorAll(".contact-form");
    if (forms.length === 0) return;
  
    forms.forEach(form => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        
        try {
          // Add your form submission logic here
          // Example: await fetch('/api/contact', { method: 'POST', body: formData });
          
          // Success state
          submitBtn.textContent = "Sent Successfully!";
          submitBtn.style.background = "#10b981";
          
          // Reset form
          form.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = "";
          }, 3000);
          
        } catch (error) {
          // Error state
          submitBtn.textContent = "Error! Try Again";
          submitBtn.style.background = "#ef4444";
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = "";
          }, 3000);
        }
      });
    });
  })();
  
  // ==================== PAGE LOAD ANIMATION ====================
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    
    // Trigger any initial animations
    const heroText = document.querySelector(".slide.active .slide-text");
    if (heroText) {
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }
  });
  
  // ==================== PERFORMANCE OPTIMIZATION ====================
  // Debounce function for resize events
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
  
  // Optimized resize handler
  window.addEventListener("resize", debounce(() => {
    // Add any resize-dependent calculations here
    console.log("Window resized");
  }, 250));
  
  console.log("🏗️ Premium Construction Website - All systems loaded!");


// ==================== PREMIUM LEADERSHIP SLIDER ====================
(() => {
  // Slider state
  let currentSlide = 0;
  let isAnimating = false;
  let autoplayInterval = null;
  
  // DOM elements
  const slides = document.querySelectorAll('.leader-slide');
  const track = document.querySelector('.leader-track');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const leaderSection = document.querySelector('.leader-section');
  
  if (!track || slides.length === 0) {
    console.warn('Leadership slider elements not found');
    return;
  }
  
  const totalSlides = slides.length;

  // ==================== CORE SLIDER FUNCTIONS ====================
  
  // Update slider position with smooth animation
  function updateSlider(instant = false) {
    if (isAnimating && !instant) return;
    
    isAnimating = true;
    const slideWidth = slides[0].offsetWidth;
    
    // Smooth transform with cubic-bezier
    track.style.transition = instant ? 'none' : 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    
    // Update indicators
    updateIndicators();
    
    // Update navigation button states
    updateButtonStates();
    
    // Reset animation lock after transition
    setTimeout(() => {
      isAnimating = false;
    }, instant ? 0 : 800);
  }

  // Update indicator dots
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.removeAttribute('aria-current');
      }
    });
  }

  // Update button disabled states
  function updateButtonStates() {
    if (totalSlides <= 1) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    
    // Enable circular navigation
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  // ==================== NAVIGATION FUNCTIONS ====================
  
  // Next slide
  function nextSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoplay();
  }

  // Previous slide
  function prevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoplay();
  }

  // Go to specific slide
  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    currentSlide = index;
    updateSlider();
    resetAutoplay();
  }

  // ==================== AUTOPLAY FUNCTIONALITY ====================
  
  function startAutoplay() {
    if (totalSlides <= 1) return;
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 6000); // 6 seconds per slide
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    setTimeout(startAutoplay, 3000); // Resume after 3 seconds of inactivity
  }

  // ==================== EVENT LISTENERS ====================
  
  // Button controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      // Add click animation
      nextBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        nextBtn.style.transform = '';
      }, 150);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      // Add click animation
      prevBtn.style.transform = 'scale(0.9)';
      setTimeout(() => {
        prevBtn.style.transform = '';
      }, 150);
    });
  }

  // Indicator controls
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      // Add ripple effect
      indicator.style.transform = 'scale(1.3)';
      setTimeout(() => {
        indicator.style.transform = '';
      }, 200);
    });
  });

  // ==================== KEYBOARD NAVIGATION ====================
  
  document.addEventListener('keydown', (e) => {
    // Only respond if slider is in viewport
    const rect = leaderSection.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    }
  });

  // ==================== TOUCH/SWIPE SUPPORT ====================
  
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    handleSwipe();
    resetAutoplay();
  });

  function handleSwipe() {
    const swipeThreshold = 75; // Minimum distance for swipe
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // ==================== MOUSE DRAG SUPPORT ====================
  
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.cursor = 'grabbing';
    stopAutoplay();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.pageX;
  });

  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    resetAutoplay();
  });

  // ==================== PAUSE ON HOVER ====================
  
  if (leaderSection) {
    leaderSection.addEventListener('mouseenter', stopAutoplay);
    leaderSection.addEventListener('mouseleave', startAutoplay);
  }

  // ==================== VISIBILITY CHANGE ====================
  
  // Pause autoplay when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // ==================== RESPONSIVE RESIZE ====================
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSlider(true); // Instant update on resize
    }, 250);
  });

  // ==================== INTERSECTION OBSERVER ====================
  
  // Animate elements when they come into view
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Start autoplay when section is visible
        if (entry.target === leaderSection) {
          startAutoplay();
        }
      } else {
        // Stop autoplay when section is not visible
        if (entry.target === leaderSection) {
          stopAutoplay();
        }
      }
    });
  }, observerOptions);

  if (leaderSection) {
    observer.observe(leaderSection);
  }

  // ==================== ACCESSIBILITY ENHANCEMENTS ====================
  
  // Announce slide changes to screen readers
  function announceSlideChange() {
    const announcement = `Slide ${currentSlide + 1} of ${totalSlides}`;
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = announcement;
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  }

  // ==================== BOOK APPOINTMENT TRACKING ====================
  
  const bookButtons = document.querySelectorAll('.book-appointment');
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('📅 Book appointment clicked for slide:', currentSlide + 1);
      
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Optional: Add analytics tracking here
      // gtag('event', 'click', { event_category: 'Leadership', event_label: 'Book Appointment' });
    });
  });

  // ==================== INITIALIZATION ====================
  
  function init() {
    updateSlider(true);
    
    // Add grab cursor
    track.style.cursor = 'grab';
    
    // Log initialization
    console.log(`🏗️ Leadership slider initialized with ${totalSlides} slides`);
    
    // Accessibility
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Leadership carousel');
    
    // Add CSS for screen reader only content
    if (!document.querySelector('.sr-only-styles')) {
      const style = document.createElement('style');
      style.className = 'sr-only-styles';
      style.textContent = `
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .button-ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          width: 100px;
          height: 100px;
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

console.log('✅ Premium Leadership slider ready!');
// ==================== MAP SECTION FUNCTIONS ====================

// Hide loading overlay when iframe loads
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      setTimeout(() => {
        overlay.classList.add('hidden');
      }, 500);
    }
  }
  
  // Fullscreen functionality
  function openFullscreen() {
    const iframe = document.getElementById('mapIframe');
    if (!iframe) return;
    
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  }
  
  // Refresh map with loading indicator
  function refreshMap() {
    const iframe = document.getElementById('mapIframe');
    const overlay = document.getElementById('loadingOverlay');
    
    if (!iframe || !overlay) return;
    
    // Show loading
    overlay.classList.remove('hidden');
    
    // Reload iframe
    const src = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = src;
    }, 100);
  }
  
  // ==================== RESPONSIVE IFRAME HEIGHT ====================
  (() => {
    function adjustIframeHeight() {
      const iframe = document.getElementById('mapIframe');
      if (!iframe) return;
      
      const width = window.innerWidth;
      
      if (width < 480) {
        iframe.style.height = '400px';
      } else if (width < 768) {
        iframe.style.height = '500px';
      } else if (width < 1024) {
        iframe.style.height = '550px';
      } else {
        iframe.style.height = '625px';
      }
    }
  
    // Adjust on load and resize
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', adjustIframeHeight);
    } else {
      adjustIframeHeight();
    }
    
    window.addEventListener('resize', debounce(adjustIframeHeight, 250));
  })();
  
  // ==================== MAP INTERACTION TRACKING ====================
  (() => {
    let iframeInteracted = false;
    
    window.addEventListener('blur', () => {
      const iframe = document.getElementById('mapIframe');
      if (iframe && document.activeElement === iframe && !iframeInteracted) {
        console.log('User interacted with map');
        iframeInteracted = true;
        // Add your analytics tracking here if needed
      }
    });
  })();
  
  // ==================== SECTORS CARD SCROLL REVEAL ====================
  (() => {
    const sectorCards = document.querySelectorAll('.sector-card');
    if (sectorCards.length === 0) return;
  
    const cardObserverOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px'
    };
  
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, cardObserverOptions);
  
    sectorCards.forEach(card => {
      cardObserver.observe(card);
    });
  })();
  
  // ==================== ENHANCED SCROLL ANIMATIONS ====================
  (() => {
    // More aggressive observation for all animated elements
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for elements that use it
          entry.target.classList.add('visible');
          
          // Trigger CSS animations
          if (entry.target.style.animation) {
            entry.target.style.animation = entry.target.style.animation;
          }
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
      .fade-in,
      .slide-left,
      .slide-right,
      .scale-in,
      .section-header,
      .map-container,
      .sector-card,
      .map-stats .stat-item
    `);
  
    animatedElements.forEach(el => observer.observe(el));
  })();
  



  // ==================== STAT COUNTER ANIMATION ====================
  (() => {
    const counters = document.querySelectorAll('.stat-item h3, .counter');
    if (counters.length === 0) return;
    
    const speed = 200; // Lower = faster
  
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        if (!target) return;
        
        const count = +counter.innerText.replace(/\D/g, ''); // Remove non-digits
  
        const increment = target / speed;
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment) + '+';
          setTimeout(updateCount, 5);
        } else {
          counter.innerText = target.toLocaleString() + '+';
        }
      };
  
      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCount();
            counterObserver.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
  
      counterObserver.observe(counter);
    });
  })();
  
  // ==================== SMOOTH SCROLL ENHANCEMENTS ====================
  (() => {
    // Enhanced smooth scrolling with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#' || href === '#!') return;
        
        const target = document.querySelector(href);
        if (!target) return;
  
        e.preventDefault();
        
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offsetTop = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, href);
      });
    });
  })();
  
  // ==================== KEYBOARD ACCESSIBILITY ====================
  (() => {
    // Make map buttons keyboard accessible
    const mapButtons = document.querySelectorAll('.map-button');
    mapButtons.forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
    
    // Make sector cards keyboard accessible
    const sectorCards = document.querySelectorAll('.sector-card');
    sectorCards.forEach((card, index) => {
      // Add tabindex if not already present
      if (!card.hasAttribute('tabindex')) {
        card.setAttribute('tabindex', '0');
      }
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
      
      // Add focus styles
      card.addEventListener('focus', () => {
        card.style.outline = '3px solid var(--accent-orange)';
        card.style.outlineOffset = '4px';
      });
      
      card.addEventListener('blur', () => {
        card.style.outline = 'none';
      });
    });
  })();
  
  // ==================== PARALLAX EFFECT FOR SECTORS ====================
  (() => {
    const sectorBgs = document.querySelectorAll('.sector-bg');
    if (sectorBgs.length === 0) return;
  
    let ticking = false;
  
    function updateParallax() {
      sectorBgs.forEach(bg => {
        const card = bg.closest('.sector-card');
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const scrollPercent = (rect.top - window.innerHeight) / (window.innerHeight + rect.height);
        
        if (scrollPercent > -1 && scrollPercent < 1) {
          const yPos = scrollPercent * 30; // Adjust multiplier for more/less effect
          bg.style.transform = `translateY(${yPos}px) scale(1)`;
        }
      });
      
      ticking = false;
    }
  
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  })();
  
  // ==================== HOVER SOUND EFFECT (OPTIONAL) ====================
  // Uncomment if you want subtle audio feedback on interactions
  /*
  (() => {
    const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBSp+zPLaizsIGGS563qxTBAMUKvj8LRiHAU2jdXuyH0vBQ==');
    hoverSound.volume = 0.1;
    
    const interactiveElements = document.querySelectorAll('.sector-card, .map-button, .browse-link');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {}); // Ignore errors
      });
    });
  })();
  */
  
  // ==================== PERFORMANCE MONITORING ====================
  // Log performance metrics (optional - remove in production)
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.group('🏗️ Performance Metrics');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Connect Time: ${connectTime}ms`);
        console.log(`Render Time: ${renderTime}ms`);
        console.groupEnd();
      }, 0);
    });
  }
  
  // ==================== UTILITY: DEBOUNCE FUNCTION ====================
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
  
  console.log('✅ Map & Sectors sections enhanced and ready!');







// Animate numbers
const counters = document.querySelectorAll('.stat-item h3');
const speed = 200; // lower = faster

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace(/\D/g,''); // remove plus sign

    const increment = target / speed;

    if(count < target) {
      counter.innerText = Math.ceil(count + increment) + '+';
      setTimeout(updateCount, 5);
    } else {
      counter.innerText = target.toLocaleString() + '+';
    }
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});


// ==================== STATS COUNTER ANIMATION ====================

(() => {
    const statItems = document.querySelectorAll('.stat-item h3');
    if (statItems.length === 0) return;
  
    // Enhanced counter with easing
    function animateCounter(element, target, duration = 2000) {
      const startTime = performance.now();
      const startValue = 0;
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - ease out cubic
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(startValue + (target - startValue) * easeOutCubic);
        
        // Update display with formatting
        element.textContent = current.toLocaleString() + '+';
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target.toLocaleString() + '+';
          
          // Add completion pulse
          element.style.transform = 'scale(1.2)';
          setTimeout(() => {
            element.style.transform = '';
          }, 300);
        }
      }
      
      requestAnimationFrame(update);
    }
  
    // ==================== INTERSECTION OBSERVER FOR STATS ====================
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.getAttribute('data-target'));
          
          if (!targetValue || isNaN(targetValue)) {
            console.warn('⚠️ No data-target attribute found on:', target);
            return;
          }
          
          // Start animation
          animateCounter(target, targetValue, 2500);
          
          // Unobserve after animation
          statsObserver.unobserve(target);
          
          console.log('📊 Counter animated:', targetValue);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px'
    });
  
    // Observe all stat numbers
    statItems.forEach(stat => {
      statsObserver.observe(stat);
    });
  
  })();
  
  // ==================== STATS BAR HOVER EFFECTS ====================
  
  (() => {
    const statsBar = document.querySelector('.stats-bar');
    const statItems = document.querySelectorAll('.stat-item');
    
    if (!statsBar || statItems.length === 0) return;
  
    // ==================== 3D TILT EFFECT ON STATS BAR ====================
    
    statsBar.addEventListener('mousemove', (e) => {
      const rect = statsBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 10;
      
    });
  
  
    // ==================== INDIVIDUAL STAT ITEM EFFECTS ====================
    
    statItems.forEach((item, index) => {
      // Staggered hover effect
      item.addEventListener('mouseenter', () => {
        // Highlight this item
        item.style.zIndex = '10';
        
        // Dim others slightly
        statItems.forEach((otherItem, otherIndex) => {
          if (otherIndex !== index) {
            otherItem.style.opacity = '0.6';
            otherItem.style.transform = 'scale(0.95)';
          }
        });
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.zIndex = '';
        
        // Restore all items
        statItems.forEach(otherItem => {
          otherItem.style.opacity = '';
          otherItem.style.transform = '';
        });
      });
      
      // Click effect
      item.addEventListener('click', () => {
        console.log('📊 Stat clicked:', item.querySelector('p')?.textContent);
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 107, 53, 0.4);
          transform: translate(-50%, -50%);
          animation: statRipple 0.6s ease-out;
          pointer-events: none;
        `;
        
        item.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  
    // Add ripple animation CSS
    if (!document.querySelector('#stat-ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'stat-ripple-animation';
      style.textContent = `
        @keyframes statRipple {
          from {
            width: 0;
            height: 0;
            opacity: 1;
          }
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  
  })();
  
  // ==================== LEARN MORE BUTTON ENHANCEMENTS ====================
  
  (() => {
    const learnBtn = document.querySelector('.learn-btn');
    if (!learnBtn) return;
  
    // Add magnetic effect
    learnBtn.addEventListener('mousemove', (e) => {
      const rect = learnBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.3;
      const moveY = y * 0.3;
      
      learnBtn.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-3px)`;
    });
  
    learnBtn.addEventListener('mouseleave', () => {
      learnBtn.style.transform = '';
    });
  
    // Click tracking
    learnBtn.addEventListener('click', (e) => {
      console.log('🔗 Learn More clicked');
      
      // Ripple effect
      const rect = learnBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%);
        animation: buttonRipple 0.6s ease-out;
        pointer-events: none;
      `;
      
      learnBtn.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  
    // Add button ripple animation
    if (!document.querySelector('#button-ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'button-ripple-animation';
      style.textContent = `
        @keyframes buttonRipple {
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
  
  })();
  
  // ==================== PARALLAX SCROLL EFFECT ====================
 // ==================== AWARD-WINNING ABOUT SECTION - GSAP ANIMATIONS ====================

// NOTE: Make sure to include GSAP library in your HTML:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

(() => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
      console.warn('⚠️ GSAP not loaded. Falling back to CSS animations.');
      return;
    }
  
    gsap.registerPlugin(ScrollTrigger);
  
    // DOM Elements
    const aboutWrapper = document.querySelector('.about-wrapper');
    const aboutSection = document.querySelector('.about-section');
    const aboutText = document.querySelector('.about-text');
    const aboutImages = document.querySelector('.about-images');
    const mainImg = document.querySelector('.about-img.main-img');
    const overlapImg = document.querySelector('.about-img.overlap-img');
    const learnBtn = document.querySelector('.learn-btn');
  
    if (!aboutSection) {
      console.warn('⚠️ About section not found');
      return;
    }
  
    // ==================== PARALLAX SCROLL EFFECT ====================
    
    // Main section parallax
    gsap.to(aboutSection, {
      y: -100,
      scrollTrigger: {
        trigger: aboutWrapper,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        // markers: true // Uncomment for debugging
      }
    });
  
    // Image parallax (opposite directions)
    if (mainImg) {
      gsap.to(mainImg, {
        y: -80,
        scrollTrigger: {
          trigger: aboutWrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }
  
    if (overlapImg) {
      gsap.to(overlapImg, {
        y: 60,
        scrollTrigger: {
          trigger: aboutWrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }
  
    // ==================== MOUSE PARALLAX EFFECT ====================
    
    if (aboutSection && mainImg && overlapImg) {
      aboutSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 40;
        const yPos = (clientY / innerHeight - 0.5) * 40;
        
        // Main image follows cursor
        gsap.to(mainImg, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
        
        // Overlap image moves opposite
        gsap.to(overlapImg, {
          x: -xPos * 0.6,
          y: -yPos * 0.6,
          duration: 1,
          ease: "power2.out"
        });
      });
  
      // Reset on mouse leave
      aboutSection.addEventListener('mouseleave', () => {
        gsap.to([mainImg, overlapImg], {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
  
    // ==================== MAGNETIC BUTTON EFFECT ====================
    
    if (learnBtn) {
      learnBtn.addEventListener('mouseenter', function() {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      });
  
      learnBtn.addEventListener('mouseleave', function() {
        gsap.to(this, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
  
      learnBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(this, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.4,
          ease: "power2.out"
        });
      });
  
      // Click ripple effect
      learnBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.5);
          transform: translate(-50%, -50%);
          pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.appendChild(ripple);
        
        gsap.to(ripple, {
          width: 400,
          height: 400,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove()
        });
        
        console.log('🔗 Learn More clicked');
      });
    }
  
    // ==================== IMAGE HOVER EFFECTS ====================
    
    const allImages = document.querySelectorAll('.about-img');
    
    allImages.forEach(img => {
      img.addEventListener('mouseenter', function() {
        gsap.to(this, {
          scale: 1.05,
          y: -10,
          duration: 0.6,
          ease: "power3.out"
        });
      });
  
      img.addEventListener('mouseleave', function() {
        gsap.to(this, {
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        });
      });
  
      // Click effect
      img.addEventListener('click', function() {
        console.log('🖼️ Image clicked');
        
        gsap.to(this, {
          scale: 1.08,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    });
  
    // ==================== HEADING HOVER EFFECT ====================
    
    const heading = document.querySelector('.about-text h1');
    
    if (heading) {
      heading.addEventListener('mouseenter', function() {
        gsap.to(this, {
          x: 10,
          duration: 0.5,
          ease: "power2.out"
        });
      });
  
      heading.addEventListener('mouseleave', function() {
        gsap.to(this, {
          x: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
  
    // ==================== SCROLL REVEAL ANIMATION ====================
    
    // Enhanced scroll-triggered animations
    gsap.from(aboutSection, {
      scrollTrigger: {
        trigger: aboutWrapper,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
        // markers: true // Uncomment for debugging
      },
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out"
    });
  
    // Stagger text elements
    if (aboutText) {
      gsap.from('.about-text > *', {
        scrollTrigger: {
          trigger: aboutText,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  
    // ==================== INTERSECTION OBSERVER (FALLBACK) ====================
    
    // For browsers that don't support ScrollTrigger well
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    if (aboutSection) {
      observer.observe(aboutSection);
    }
  
    // ==================== KEYBOARD ACCESSIBILITY ====================
    
    // Make images keyboard accessible
    allImages.forEach(img => {
      if (!img.hasAttribute('tabindex')) {
        img.setAttribute('tabindex', '0');
      }
      
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
    });
  
    // ==================== PERFORMANCE OPTIMIZATION ====================
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(0.1); // Slow down all animations
      console.log('⚡ Reduced motion enabled');
    }
  
    // ==================== 3D TILT EFFECT ON SECTION ====================
    
    if (aboutSection) {
      aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        gsap.to(aboutSection, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.5,
          ease: "power1.out"
        });
      });
  
      aboutSection.addEventListener('mouseleave', () => {
        gsap.to(aboutSection, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
  
    // ==================== SCROLL INDICATOR ANIMATION ====================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
      // Fade out on scroll
      gsap.to(scrollIndicator, {
        opacity: 0,
        scrollTrigger: {
          trigger: aboutWrapper,
          start: 'top top',
          end: 'top -100',
          scrub: true
        }
      });
    }
  
    // ==================== CONSOLE LOGGING ====================
    
    console.log('🏆 Award-winning About section initialized!');
    console.log('📊 Features active:');
    console.log('  ✓ Parallax scroll');
    console.log('  ✓ Mouse parallax');
    console.log('  ✓ Magnetic button');
    console.log('  ✓ 3D tilt effect');
    console.log('  ✓ Image hover animations');
    console.log('  ✓ Scroll reveal');
  
  })();
  
  // ==================== ADD SCROLL INDICATOR TO HTML ====================
  
  // Automatically inject scroll indicator if it doesn't exist
  (() => {
    const wrapper = document.querySelector('.about-wrapper');
    if (!wrapper || document.querySelector('.scroll-indicator')) return;
    
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <span>Scroll</span>
      <div class="scroll-line"></div>
    `;
    
    wrapper.appendChild(indicator);
  })();
  // ==================== ACCESSIBILITY ENHANCEMENTS ====================
  
  (() => {
    // Make images keyboard accessible
    const aboutImages = document.querySelectorAll('.about-img');
    
    aboutImages.forEach(img => {
      if (!img.hasAttribute('tabindex')) {
        img.setAttribute('tabindex', '0');
      }
      
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          img.click();
        }
      });
    });
  
    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
      .about-img:focus {
        outline: 3px solid var(--accent-orange);
        outline-offset: 4px;
      }
      .learn-btn:focus {
        outline: 3px solid var(--accent-orange);
        outline-offset: 4px;
      }
    `;
    document.head.appendChild(style);
  
  })();
  
  // ==================== PERFORMANCE MONITORING ====================
  
  if (window.performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.group('📊 About Section Performance');
        console.log('Load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms');
        console.log('DOM Interactive:', Math.round(perfData.domInteractive - perfData.fetchStart) + 'ms');
        console.groupEnd();
      }, 0);
    });
  }
  
  console.log('✅ About section & Stats enhanced!');

  // ============================================
// OUR STORY SECTION - PREMIUM ANIMATIONS
// ============================================

gsap.registerPlugin(ScrollTrigger);

function initOurStoryAnimations() {

  // ============================================
  // 1. TEXT CONTENT - Slide in from left
  // ============================================
  gsap.to('.story-text-content', {
    scrollTrigger: {
      trigger: '.our-story-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  // ============================================
  // 2. HEADING - Reveal word by word
  // ============================================
  
  // Split heading into words for animation
  const headingMain = document.querySelector('.heading-main');
  const headingHighlights = document.querySelectorAll('.heading-highlight');

  // Animate main heading
  gsap.from(headingMain, {
    scrollTrigger: {
      trigger: '.story-text-content',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Animate highlight lines with stagger
  gsap.from(headingHighlights, {
    scrollTrigger: {
      trigger: '.story-text-content',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    stagger: 0.15,
    delay: 0.3,
    ease: 'power2.out'
  });

  // ============================================
  // 3. DESCRIPTION - Fade up
  // ============================================
  gsap.to('.story-description', {
    scrollTrigger: {
      trigger: '.story-text-content',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });

  // ============================================
  // 4. IMAGE GRID - Slide in from right
  // ============================================
  gsap.to('.story-images-grid', {
    scrollTrigger: {
      trigger: '.our-story-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  // ============================================
  // 5. IMAGES - Sequential reveal with scale
  // ============================================
  
  const images = [
    { selector: '.top-image', delay: 0.3 },
    { selector: '.bottom-left-image', delay: 0.5 },
    { selector: '.bottom-right-image', delay: 0.7 }
  ];

  images.forEach(({ selector, delay }) => {
    gsap.from(`${selector} .story-img`, {
      scrollTrigger: {
        trigger: '.story-images-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      scale: 1.3,
      opacity: 0,
      duration: 1.2,
      delay: delay,
      ease: 'power3.out'
    });
  });

  // ============================================
  // 6. BADGES - Pop in animation
  // ============================================
  
  gsap.to('.image-badge', {
    scrollTrigger: {
      trigger: '.story-images-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.2,
    delay: 1,
    ease: 'back.out(2)',
    onStart: function() {
      gsap.set('.image-badge', { scale: 0 });
    }
  });

  // ============================================
  // 7. BADGE ICONS - Rotate on reveal
  // ============================================
  
  gsap.from('.badge-icon', {
    scrollTrigger: {
      trigger: '.story-images-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    rotation: -180,
    scale: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.2,
    ease: 'back.out(1.7)'
  });

  // ============================================
  // 8. PARALLAX EFFECT - Text & Images
  // ============================================
  
  gsap.to('.story-text-content', {
    scrollTrigger: {
      trigger: '.our-story-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: -50,
    ease: 'none'
  });

  gsap.to('.story-images-grid', {
    scrollTrigger: {
      trigger: '.our-story-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: 50,
    ease: 'none'
  });

  // ============================================
  // 9. FLOATING ANIMATION - Badges
  // ============================================
  
  gsap.to('.badge-top', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.badge-bottom', {
    y: 10,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
  });

  // ============================================
  // 10. IMAGE TILT EFFECT ON HOVER
  // ============================================
  
  const imageWrappers = document.querySelectorAll('.story-image-wrapper');

  imageWrappers.forEach(wrapper => {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(wrapper, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(wrapper, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // ============================================
  // 11. HEADING GRADIENT ANIMATION
  // ============================================
  
  const storyHeading = document.querySelector('.story-heading');
  
  if (storyHeading) {
    storyHeading.addEventListener('mouseenter', () => {
      gsap.to('.heading-highlight', {
        backgroundPosition: '200% center',
        duration: 2,
        ease: 'power2.inOut',
        stagger: 0.1
      });
    });
  }

  // ============================================
  // 12. MAGNETIC EFFECT ON BADGES
  // ============================================
  
  imageWrappers.forEach(wrapper => {
    const badge = wrapper.querySelector('.image-badge');
    
    if (badge) {
      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(badge, {
          x: (x - rect.width / 2) * 0.1,
          y: (y - rect.height / 2) * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      wrapper.addEventListener('mouseleave', () => {
        gsap.to(badge, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }
  });

}

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', initOurStoryAnimations);

// Refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', initDreamBuildAnimations);

// Refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
// ============================================
// CEO LETTER SECTION - PREMIUM ANIMATIONS
// ============================================

gsap.registerPlugin(ScrollTrigger);

function initCEOLetterAnimations() {

  // ============================================
  // 1. TEXT CONTENT - Slide in from left
  // ============================================
  gsap.to('.ceo-content', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    x: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  // ============================================
  // 2. DECORATIVE LINE - Expand from left
  // ============================================
  gsap.to('.ceo-content::before', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    scaleX: 1,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out'
  });

  // ============================================
  // 3. QUOTE ICON - Fade in
  // ============================================
  gsap.to('.ceo-heading::before', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out'
  });

  // ============================================
  // 4. HEADING - Fade up with split animation
  // ============================================
  
  const heading = document.querySelector('.ceo-heading');
  if (heading) {
    const lines = heading.querySelectorAll('br');
    
    gsap.from(heading.childNodes, {
      scrollTrigger: {
        trigger: '.ceo-content',
        start: 'top 70%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  // ============================================
  // 5. DESCRIPTION - Fade up
  // ============================================
  gsap.to('.ceo-description', {
    scrollTrigger: {
      trigger: '.ceo-content',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });

  // ============================================
  // 6. BUTTON - Slide up with bounce
  // ============================================
  gsap.to('.ceo-letter-btn', {
    scrollTrigger: {
      trigger: '.ceo-content',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 1.2,
    ease: 'back.out(1.4)'
  });

  // ============================================
  // 7. CEO IMAGE - Reveal with scale
  // ============================================
  gsap.to('.ceo-image-wrapper', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out'
  });

  gsap.from('.ceo-img', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    scale: 1.15,
    duration: 1.5,
    delay: 0.3,
    ease: 'power3.out'
  });

  // ============================================
  // 8. IMAGE ACCENT - Pulse animation
  // ============================================
  gsap.to('.image-accent', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    duration: 1.5,
    delay: 1,
    ease: 'power2.out'
  });

  // Continuous pulse
  gsap.to('.image-accent', {
    scale: 1.2,
    opacity: 0.3,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // ============================================
  // 9. PARALLAX EFFECT - Text & Image
  // ============================================
  gsap.to('.ceo-content', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: -40,
    ease: 'none'
  });

  gsap.to('.ceo-img', {
    scrollTrigger: {
      trigger: '.ceo-letter-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: 60,
    ease: 'none'
  });

  // ============================================
  // 10. BUTTON ARROW - Pulse animation
  // ============================================
  gsap.to('.btn-arrow', {
    x: 5,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // ============================================
  // 11. MAGNETIC BUTTON EFFECT
  // ============================================
  const ceoButton = document.querySelector('.ceo-letter-btn');
  const ceoContent = document.querySelector('.ceo-content');

  if (ceoButton && ceoContent) {
    ceoContent.addEventListener('mousemove', (e) => {
      const rect = ceoButton.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - btnCenterX;
      const distanceY = e.clientY - btnCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic effect within 150px radius
      if (distance < 150) {
        const pullStrength = (150 - distance) / 150;
        gsap.to(ceoButton, {
          x: distanceX * pullStrength * 0.25,
          y: distanceY * pullStrength * 0.25,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(ceoButton, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });

    ceoContent.addEventListener('mouseleave', () => {
      gsap.to(ceoButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  // ============================================
  // 12. IMAGE MOUSE MOVE - Subtle tilt
  // ============================================
  const imageWrapper = document.querySelector('.ceo-image-wrapper');

  if (imageWrapper) {
    imageWrapper.addEventListener('mousemove', (e) => {
      const rect = imageWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 40;
      const rotateX = (centerY - y) / 40;

      gsap.to('.ceo-img', {
        rotationY: rotateY,
        rotationX: rotateX,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });

    imageWrapper.addEventListener('mouseleave', () => {
      gsap.to('.ceo-img', {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  // ============================================
  // 13. TITLE HIGHLIGHT UNDERLINE - Animate on scroll
  // ============================================
  ScrollTrigger.create({
    trigger: '.ceo-heading',
    start: 'top 70%',
    onEnter: () => {
      const highlight = document.querySelector('.ceo-title-highlight');
      if (highlight) {
        gsap.to('.ceo-title-highlight::after', {
          width: '100%',
          duration: 1,
          delay: 1.5,
          ease: 'power3.out'
        });
      }
    }
  });

}

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', initCEOLetterAnimations);

// Refresh on resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});