/* ==================================================
   COMMON JAVASCRIPT - Updated with Logo Swap
   Save as: js/common.js
================================================== */

(function () {
  'use strict';

  // ==================== CONFIGURATION ====================

  const config = {
    // Logo paths
    whiteLogo: 'images/white_logo-removebg.png',
    blackLogo: 'images/logo.png',

    // Scroll threshold
    scrollThreshold: 60,

    // Transition speed
    transitionSpeed: 300
  };

  // ==================== INITIALIZE COMMON SCRIPTS ====================

  function initializeCommonScripts() {
    initLoader();
    initNavbarWithLogoSwap(); // Updated function
    initMobileMenu();
    highlightActiveNavLink();
  }

  // ==================== PAGE LOADER ====================

  function initLoader() {
    const loader = document.getElementById("pageLoader");
    const body = document.body;

    if (!loader) return;

    const showLoader = () => {
      body.classList.add("loading");
      loader.style.display = "flex";
      loader.classList.remove("hidden");
    };

    const hideLoader = () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        body.classList.remove("loading");
        setTimeout(() => {
          loader.style.display = "none";
        }, 600);
      }, 1200);
    };

    // Initial load
    showLoader();

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
      setTimeout(hideLoader, 5000);
    }

    // Show loader on internal navigation
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link || !link.href) return;

      if (link.href.startsWith("#") || link.href.startsWith("javascript:")) {
        return;
      }

      const currentHost = location.hostname;
      const linkHost = new URL(link.href, location.href).hostname;

      if (currentHost === linkHost) {
        showLoader();
      }
    });

    // Back/forward cache fix
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        showLoader();
        setTimeout(hideLoader, 300);
      }
    });
  }

  // ==================== NAVBAR WITH LOGO SWAP ====================

  function initNavbarWithLogoSwap() {
    const navbar = document.querySelector(".navbar");
    const logoImg = document.querySelector(".logo img");

    if (!navbar || !logoImg) {
      console.error('⚠️ Navbar or logo image not found!');
      return;
    }

    // Set initial logo (white)
    logoImg.src = config.whiteLogo;
    logoImg.style.transition = `opacity ${config.transitionSpeed}ms ease`;

    // Logo swap function
    function swapLogo(useWhiteLogo) {
      const newLogo = useWhiteLogo ? config.whiteLogo : config.blackLogo;

      // Only swap if different
      if (logoImg.src.includes(useWhiteLogo ? 'white_logo' : 'logo.png')) {
        return;
      }

      // Smooth transition
      logoImg.style.opacity = '0';

      setTimeout(() => {
        logoImg.src = newLogo;
        logoImg.style.opacity = '1';
      }, config.transitionSpeed / 2);
    }

    // Scroll handler with logo swap
    let isScrolled = false;

    function handleScroll() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const shouldBeScrolled = scrollPosition > config.scrollThreshold;

      // Only update if state changed
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;

        if (isScrolled) {
          // Scrolled down - use BLACK logo
          navbar.classList.add("scrolled");
          swapLogo(false);
        } else {
          // At top - use WHITE logo
          navbar.classList.remove("scrolled");
          swapLogo(true);
        }
      }
    }

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    // Preload logos for smooth transitions
    const whiteLogoImg = new Image();
    const blackLogoImg = new Image();
    whiteLogoImg.src = config.whiteLogo;
    blackLogoImg.src = config.blackLogo;

    console.log('✅ Navbar with logo swap initialized');
  }

  // ==================== MOBILE MENU ====================

  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const body = document.body;

    if (!hamburger || !navMenu) return;

    // Toggle menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }

  // ==================== HIGHLIGHT ACTIVE NAV LINK ====================

  function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ==================== START INITIALIZATION ====================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommonScripts);
  } else {
    initializeCommonScripts();
  }

})();

console.log('✅ Common scripts initialized with logo swap!');