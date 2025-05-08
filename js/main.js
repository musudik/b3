// Highlight active nav link
// Dark mode toggle

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar nav a');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Dark mode toggle
  const toggleBtn = document.getElementById('darkModeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      // Change icon
      if(document.body.classList.contains('light-mode')) {
        toggleBtn.innerHTML = '🌙';
        toggleBtn.title = 'Switch to dark mode';
      } else {
        toggleBtn.innerHTML = '☀️';
        toggleBtn.title = 'Switch to light mode';
      }
    });
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if(mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('show');
      // Add animation to hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
      
      // Close menu when clicking outside
      document.addEventListener('click', function closeMenu(e) {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && mainNav.classList.contains('show')) {
          mainNav.classList.remove('show');
          spans.forEach(span => span.classList.remove('active'));
        }
      });
      
      // Close menu when clicking links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if(mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            spans.forEach(span => span.classList.remove('active'));
          }
        });
      });
    });
  }
  
  // Property listings carousel functionality
  const prevArrow = document.getElementById('prevArrow');
  const nextArrow = document.getElementById('nextArrow');
  const propertySlider = document.getElementById('propertySlider');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  
  if(propertySlider && prevArrow && nextArrow) {
    const cardWidth = propertySlider.querySelector('.listing-card')?.offsetWidth || 300;
    const gap = 24; // 1.5rem gap
    const itemWidth = cardWidth + gap;
    let currentIndex = 0;
    const totalItems = propertySlider.querySelectorAll('.listing-card').length;
    const visibleItems = Math.floor(propertySlider.offsetWidth / itemWidth) || 1;
    const maxIndex = Math.max(0, totalItems - visibleItems);
    
    function updateCarousel() {
      const translateX = -currentIndex * itemWidth;
      propertySlider.style.transform = `translateX(${translateX}px)`;
      
      // Update dots
      carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    prevArrow.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateCarousel();
    });
    
    nextArrow.addEventListener('click', () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateCarousel();
    });
    
    // Handle dot navigation
    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = Math.min(maxIndex, index);
        updateCarousel();
      });
    });
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if(filterButtons.length) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(b => b.classList.remove('active'));
          // Add active class to clicked button
          btn.classList.add('active');
          
          // Here you would typically filter the properties
          // For now we'll just reset the carousel
          currentIndex = 0;
          updateCarousel();
        });
      });
    }
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if(scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if(window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });
    
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}); 