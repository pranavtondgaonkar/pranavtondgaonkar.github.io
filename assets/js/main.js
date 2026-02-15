/**
 * Portfolio Redesign 2024
 * Modern interactive features and animations
 */

(function() {
  'use strict';

  // Helper function: Select element(s)
  const select = (selector, all = false) => {
    const el = document.querySelector(selector);
    return all ? [...document.querySelectorAll(selector)] : el;
  };

  // Helper function: Add event listener
  const on = (type, selector, listener, all = false) => {
    const elements = all ? select(selector, true) : [select(selector)];
    elements.forEach(el => el && el.addEventListener(type, listener));
  };

  /*--------------------------------------------------------------
  # Navigation Bar Behavior
  --------------------------------------------------------------*/
  const navbar = select('#navbar');
  const navMenu = select('.nav-menu');
  const mobileToggle = select('.mobile-nav-toggle');

  // Navbar scrolled state
  const updateNavbar = () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar);
  window.addEventListener('load', updateNavbar);

  // Mobile navigation toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      document.body.classList.toggle('mobile-nav-active');

      // Toggle icon
      const icon = mobileToggle.querySelector('i');
      icon.classList.toggle('bi-list');
      icon.classList.toggle('bi-x');
    });
  }

  // Close mobile nav on link click
  on('click', '.nav-link', function() {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.body.classList.remove('mobile-nav-active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.add('bi-list');
      icon.classList.remove('bi-x');
    }
  }, true);

  /*--------------------------------------------------------------
  # Enhanced Smooth Scroll with Apple-style Easing
  --------------------------------------------------------------*/
  on('click', 'a[href^="#"]', function(e) {
    const target = this.getAttribute('href');
    if (target === '#' || !target) return;

    const targetElement = select(target);
    if (targetElement) {
      e.preventDefault();
      const offsetTop = targetElement.offsetTop - 80;

      // Apple-style smooth scroll with custom easing
      const startPosition = window.pageYOffset;
      const distance = offsetTop - startPosition;
      const duration = 800;
      let start = null;

      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }, true);

  /*--------------------------------------------------------------
  # Scroll Indicator Click
  --------------------------------------------------------------*/
  const scrollIndicator = select('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const expertiseSection = select('#expertise');
      if (expertiseSection) {
        const offsetTop = expertiseSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  /*--------------------------------------------------------------
  # Active Navigation Link on Scroll
  --------------------------------------------------------------*/
  const navLinks = select('.nav-link', true);

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 200;

    navLinks.forEach(link => {
      const hash = link.getAttribute('href');
      if (!hash || !hash.startsWith('#')) return;

      const section = select(hash);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  /*--------------------------------------------------------------
  # Back to Top Button
  --------------------------------------------------------------*/
  const backToTop = select('.back-to-top');

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    };

    window.addEventListener('scroll', toggleBackToTop);
    window.addEventListener('load', toggleBackToTop);
  }

  /*--------------------------------------------------------------
  # Project Filtering
  --------------------------------------------------------------*/
  const filterBtns = select('.filter-btn', true);
  const projectCards = select('.project-card', true);

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          if (filter === '*') {
            card.classList.remove('hidden');
          } else {
            if (card.classList.contains(filter.substring(1))) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  /*--------------------------------------------------------------
  # Scroll Reveal Animations (Intersection Observer)
  --------------------------------------------------------------*/
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with data-aos attribute
  window.addEventListener('load', () => {
    const elementsToAnimate = select('[data-aos]', true);
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  });

  /*--------------------------------------------------------------
  # Initialize AOS with Apple-style Animations
  --------------------------------------------------------------*/
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        easing: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
        once: true,
        offset: 120,
        delay: 50,
        anchorPlacement: 'top-bottom',
        mirror: false,
        disable: 'mobile'
      });
    }
  });

  /*--------------------------------------------------------------
  # Typed.js Hero Animation
  --------------------------------------------------------------*/
  window.addEventListener('load', () => {
    const typed = select('.typed');
    if (typed && typeof Typed !== 'undefined') {
      const typedStrings = typed.getAttribute('data-typed-items');
      if (typedStrings) {
        new Typed('.typed', {
          strings: typedStrings.split(','),
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 2000,
          loop: true
        });
      }
    }
  });

  /*--------------------------------------------------------------
  # GLightbox for Project Images
  --------------------------------------------------------------*/
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });
  }

  /*--------------------------------------------------------------
  # Smooth Page Load with Apple-style Fade
  --------------------------------------------------------------*/
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.4s cubic-bezier(0.28, 0.11, 0.32, 1)';
      document.body.style.opacity = '1';
    }, 50);
  });

  /*--------------------------------------------------------------
  # Staggered Animation for Hero Elements
  --------------------------------------------------------------*/
  window.addEventListener('load', () => {
    const heroElements = [
      select('.hero-greeting'),
      select('.hero-main'),
      select('.hero-subtitle'),
      select('.hero-cta'),
      select('.hero-social')
    ];

    heroElements.forEach((el, index) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.8s cubic-bezier(0.28, 0.11, 0.32, 1), transform 0.8s cubic-bezier(0.28, 0.11, 0.32, 1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 + (index * 150));
      }
    });
  });

  /*--------------------------------------------------------------
  # Enhanced Card Hover Effects with Subtle Tilt
  --------------------------------------------------------------*/
  const cards = select('.expertise-card, .project-card, .education-card, .contact-card', true);
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      this.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.01)
      `;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });

  /*--------------------------------------------------------------
  # Magnetic Button Effect
  --------------------------------------------------------------*/
  const buttons = select('.btn, .social-link', true);
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0) scale(1)';
    });
  });

  /*--------------------------------------------------------------
  # Enhanced Parallax Effects
  --------------------------------------------------------------*/
  let ticking = false;

  const applyParallax = () => {
    const scrolled = window.pageYOffset;
    const heroSection = select('#hero');

    if (heroSection && scrolled < window.innerHeight) {
      // Parallax for hero decorative grid
      const decorativeGrid = select('.hero-decorative-grid');
      if (decorativeGrid) {
        decorativeGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
        decorativeGrid.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }

      // Parallax for scroll indicator
      const scrollIndicator = select('.scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.style.opacity = 1 - (scrolled / 500);
        scrollIndicator.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        applyParallax();
      });
      ticking = true;
    }
  });

  /*--------------------------------------------------------------
  # Console Message
  --------------------------------------------------------------*/
  console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #64FFDA;');
  console.log('%cLooking at the code? Let\'s connect!', 'font-size: 14px; color: #8892B0;');
  console.log('%c🔗 https://linkedin.com/in/pranav-tondgaonkar', 'font-size: 12px; color: #64FFDA;');

})();
