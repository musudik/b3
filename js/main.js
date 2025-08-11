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
  
  // B3 Concept section animations
  const b3Section = document.querySelector('.b3-concept');
  if (b3Section) {
    // Animate B3 steps on scroll
    const b3Steps = document.querySelectorAll('.b3-step');
    const b3Why = document.querySelector('.b3-why');
    
    // Intersection Observer for animations
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          animateOnScroll.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Add initial classes for animation
    b3Steps.forEach((step, index) => {
      step.style.opacity = '0';
      step.style.transform = 'translateY(30px)';
      step.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.2}s`;
      animateOnScroll.observe(step);
    });
    
    if (b3Why) {
      b3Why.style.opacity = '0';
      b3Why.style.transform = 'translateY(30px)';
      b3Why.style.transition = 'opacity 0.5s ease, transform 0.5s ease 0.6s';
      animateOnScroll.observe(b3Why);
    }
    
    // Add event listener for animation
    document.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      b3Steps.forEach((step, index) => {
        const stepPosition = step.offsetTop + b3Section.offsetTop;
        if (scrollPosition > stepPosition) {
          step.style.opacity = '1';
          step.style.transform = 'translateY(0)';
        }
      });
      
      if (b3Why) {
        const whyPosition = b3Why.offsetTop + b3Section.offsetTop;
        if (scrollPosition > whyPosition) {
          b3Why.style.opacity = '1';
          b3Why.style.transform = 'translateY(0)';
        }
      }
    });
    
    // Add hover effects to steps
    b3Steps.forEach(step => {
      step.addEventListener('mouseenter', () => {
        step.style.transform = 'translateY(-5px)';
        step.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
      });
      
      step.addEventListener('mouseleave', () => {
        step.style.transform = 'translateY(0)';
        step.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
    });
  }
  
  // WhatsApp Button functionality
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    // Add pulse animation effect
    setInterval(() => {
      whatsappBtn.classList.add('pulse');
      setTimeout(() => {
        whatsappBtn.classList.remove('pulse');
      }, 1000);
    }, 3000);
    
    // Check if it's mobile and adjust the link accordingly
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // It's a mobile device, use the WhatsApp app
      whatsappBtn.href = whatsappBtn.href.replace('https://wa.me/', 'whatsapp://send?phone=');
    }
    
    // Adjust position when scroll-to-top button is visible
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          // Move WhatsApp button up when scroll button is visible
          whatsappBtn.style.bottom = '80px';
        } else {
          whatsappBtn.style.bottom = '20px';
        }
      });
    }
  }
  
  // Chatbot Widget positioning and initialization
  window.addEventListener('load', function() {
    // Wait for the chatbot to be initialized
    setTimeout(() => {
      const chatbotContainer = document.getElementById('__chatbotSdk__-container');
      if (chatbotContainer) {
        // Ensure it's positioned on the right side
        chatbotContainer.style.right = '20px';
        chatbotContainer.style.left = 'auto';
        
        // Adjust position on mobile devices to avoid overlap with other buttons
        if (window.innerWidth <= 768) {
          chatbotContainer.style.bottom = '80px';
        }
        
        // Ensure the chatbot doesn't conflict with the WhatsApp button
        const chatbotButton = chatbotContainer.querySelector('button');
        if (chatbotButton && whatsappBtn) {
          // Add some space between the chatbot and WhatsApp buttons
          chatbotButton.addEventListener('click', () => {
            // Check if the chatbot is open and adjust WhatsApp button visibility
            setTimeout(() => {
              const chatbotDialog = document.querySelector('.chatbot-dialog');
              if (chatbotDialog && getComputedStyle(chatbotDialog).display !== 'none') {
                whatsappBtn.style.opacity = '0.5';
              } else {
                whatsappBtn.style.opacity = '1';
              }
            }, 300);
          });
        }
      }
    }, 1000); // Wait 1 second for the chatbot to initialize
  });
}); 