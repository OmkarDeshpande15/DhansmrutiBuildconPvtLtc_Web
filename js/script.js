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
    window.addEventListener('load', () => {
      hideLoader();
    });
    
    // Also check DOMContentLoaded as backup
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Give a small delay for DOM to be ready
        setTimeout(hideLoader, 800);
      });
    }
    
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

const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

document.querySelector('#close-contact-info').onclick = () =>{
   contactInfo.classList.remove('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
   searchForm.classList.remove('active');
   loginForm.classList.remove('active');
   contactInfo.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
   loop:true,
   grabCursor:true,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
   autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

var swiper = new Swiper(".reviews-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".blogs-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".logo-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      450: {
         slidesPerView: 2,
       },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 5,
      },
   },
});

document.addEventListener("DOMContentLoaded", () => {
  lightGallery(document.getElementById("layout-gallery"), {
    selector: "a",
    download: false,
    closable: true,        // ESC + close button
    plugins: [lgZoom, lgThumbnail],
    hideBarsDelay: 2000,
    backdropDuration: 300,
  });
});

  
  (function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll(".gallery-filters button");
    const items = document.querySelectorAll(".gallery-item");
    if (!filterButtons.length) return;
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.getAttribute("data-filter");
        items.forEach(item => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  })();

  /* -------------------------
     3) Nav link entrance sequence
     ------------------------- */
  (function navEntrance() {
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach((link, idx) => {
      link.classList.add("nav-appear");
      setTimeout(() => link.classList.add("show"), 120 + idx * 70);
    });
  })();

  /* -------------------------
     4) Auto-mark elements to reveal
     ------------------------- */
  (function prepareRevealTargets() {
    // Selector mapping: selector -> animation variations
    const map = [
      { sel: ".project-focus", cls: "zoom-in" },
      { sel: ".property-info", cls: "fade-up" },
      { sel: ".project-details", cls: "fade-up" },
      { sel: ".project-layout", cls: "fade-up" },
      { sel: ".layout-images img", cls: "zoom-in" },
      { sel: ".gallery", cls: "fade-up stagger" },
      { sel: ".gallery .gallery-item", cls: "fade-up" },
      { sel: ".location .map-container", cls: "fade-up" },
      { sel: ".footer-main .footer-col", cls: "fade-up" }
    ];

    map.forEach(entry => {
      const nodes = document.querySelectorAll(entry.sel);
      nodes.forEach(node => {
        node.classList.add("reveal");
        // add specific class or classes
        entry.cls.split(" ").forEach(c => node.classList.add(c));
      });
    });
  })();

  /* -------------------------
     5) IntersectionObserver to toggle .in-view and stagger children
     ------------------------- */
  (function initRevealObserver() {
    const revealEls = document.querySelectorAll(".reveal");

    if (revealEls.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // If element is a stagger container, assign delays to children
          if (el.classList.contains("stagger")) {
            const children = Array.from(el.children);
            children.forEach((child, i) => {
              // small stagger: i * step
              child.style.transitionDelay = `${i * 80}ms`;
            });
          }

          // If element is a grid of gallery items (or many items), add delays by child
          if (el.matches(".gallery") || el.matches(".gallery-grid")) {
            const items = el.querySelectorAll(".gallery-item");
            items.forEach((item, idx) => {
              item.style.transitionDelay = `${(idx % 8) * 60 + Math.floor(idx/8) * 40}ms`; // nice grid staggering
              item.classList.add("in-view"); // for safety: animate each item
            });
          }

          // For sets like footer columns, add incremental in-view
          if (el.matches(".footer-main")) {
            const cols = el.querySelectorAll(".footer-col");
            cols.forEach((c, i) => setTimeout(() => c.classList.add("in-view"), i * 120));
          }

          // Finally mark this reveal container as in view
          el.classList.add("in-view");
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  })();

  /* -------------------------
     6) Small hero slow zoom loop (non-intrusive)
     ------------------------- */
  (function heroZoomLoop() {
    const hero = document.querySelector(".project-focus");
    if (!hero) return;
    // Add a class to slowly scale up (css transition will do the rest)
    setTimeout(() => hero.classList.add("zooming"), 400);
    // Remove after 9s and re-add to create a subtle pulsate
    setInterval(() => {
      hero.classList.remove("zooming");
      void hero.offsetWidth; // force reflow
      hero.classList.add("zooming");
    }, 10000);
  })();

gsap.from(".header .logo", {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: "back.out(1.7)"
  });

  gsap.from(".navbar a", {
    y: -50,
    opacity: 0,
    stagger: 0.15,
    delay: 0.5,
    duration: 1,
    ease: "elastic.out(1, 0.7)"
  });


 


const slider = document.querySelector(".project-slider");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");

let currentIndex = 0;
const totalCards = document.querySelectorAll(".project-card").length;
const cardsPerSlide = 2;
const maxIndex = Math.ceil(totalCards / cardsPerSlide) - 1;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});


// Fade-in observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.carousel > article').forEach(article => observer.observe(article));


// ----- Fade Carousel -----
// ----- Fade Carousel -----
// Robust fade carousel initializer (safe to add to your existing JS file)
// ----- Fade Carousel Functionality -----
(function initFadeCarousel() {
  const container = document.querySelector('.carousel-container');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.carousel-card'));
  const prevBtn = container.querySelector('.carousel-btn.prev');
  const nextBtn = container.querySelector('.carousel-btn.next');

  if (!cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function showSlide(index) {
    cards.forEach((card, i) => card.classList.toggle('active', i === index));
  }

  // Initialize first slide
  showSlide(currentIndex);

  // Next button click
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showSlide(currentIndex);
  });

  // Prev button click
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showSlide(currentIndex);
  });

  // Optional: Keyboard navigation (Arrow keys)
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
})();





