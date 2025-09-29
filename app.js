// Portfolio data from provided JSON
const portfolioData = {
  "personal_info": {
    "name": "Taylor Brooks",
    "title": "Full Stack Developer", 
    "tagline": "Transforming ideas into powerful digital solutions",
    "location": "San Diego, CA",
    "email": "taylor@example.com",
    "phone": "+1 (555) 321-9876",
    "bio": "I'm a passionate full-stack developer with 4+ years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies, with a focus on creating intuitive user experiences and scalable architectures."
  },
  "skills": [
    {"name": "JavaScript", "level": 93, "category": "Frontend"},
    {"name": "React", "level": 90, "category": "Frontend"},
    {"name": "Vue.js", "level": 85, "category": "Frontend"},
    {"name": "TypeScript", "level": 88, "category": "Frontend"},
    {"name": "HTML/CSS", "level": 95, "category": "Frontend"},
    {"name": "Node.js", "level": 85, "category": "Backend"},
    {"name": "Python", "level": 82, "category": "Backend"},
    {"name": "MongoDB", "level": 84, "category": "Database"},
    {"name": "PostgreSQL", "level": 80, "category": "Database"},
    {"name": "AWS", "level": 75, "category": "Cloud"},
    {"name": "Docker", "level": 78, "category": "DevOps"},
    {"name": "Git", "level": 92, "category": "Tools"}
  ],
  "portfolio": [
    {
      "id": 1,
      "title": "Music Streaming Platform",
      "description": "Full-featured music streaming application with playlist management, social features, offline playback, and artist analytics. Built with real-time audio processing and recommendation algorithms.",
      "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      "technologies": ["React", "Node.js", "MongoDB", "WebAudio API", "Socket.io"],
      "github": "#",
      "live": "#"
    },
    {
      "id": 2,
      "title": "Cryptocurrency Dashboard", 
      "description": "Real-time cryptocurrency tracking and portfolio management application with advanced charting, price alerts, news integration, and trading simulation features.",
      "image": "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
      "technologies": ["Vue.js", "Python", "PostgreSQL", "Chart.js", "WebSocket"],
      "github": "#",
      "live": "#"
    },
    {
      "id": 3,
      "title": "Video Conferencing Platform",
      "description": "Secure video conferencing application with screen sharing, recording, chat, breakout rooms, and calendar integration. Supports up to 100 participants per call.",
      "image": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop", 
      "technologies": ["Next.js", "WebRTC", "Socket.io", "MongoDB", "AWS"],
      "github": "#",
      "live": "#"
    }
  ],
  "experience": [
    {
      "company": "NextGen Software",
      "position": "Senior Full Stack Developer",
      "duration": "2023 - Present",
      "description": "Lead development of cutting-edge web applications and guide technical architecture decisions. Collaborate with cross-functional teams to deliver high-quality software solutions.",
      "achievements": [
        "Architected scalable applications serving 150K+ active users",
        "Reduced server costs by 40% through performance optimization", 
        "Led development team of 5 engineers on flagship product",
        "Implemented automated testing reducing bugs by 75%"
      ]
    },
    {
      "company": "CodeCraft Solutions",
      "position": "Full Stack Developer",
      "duration": "2021 - 2023", 
      "description": "Developed responsive web applications using modern JavaScript frameworks. Worked closely with designers and product managers to translate requirements into technical solutions.",
      "achievements": [
        "Built 18+ web applications with 99.9% uptime",
        "Improved user engagement by 55% through UX optimization",
        "Integrated 25+ third-party APIs and payment systems",
        "Mentored 2 junior developers in modern development practices"
      ]
    },
    {
      "company": "Digital Innovations Inc",
      "position": "Frontend Developer", 
      "duration": "2020 - 2021",
      "description": "Focused on creating intuitive user interfaces and implementing responsive design principles. Collaborated with backend developers to integrate APIs and ensure seamless user experiences.",
      "achievements": [
        "Created 10+ responsive web interfaces with modern design",
        "Improved page load speeds by 65% through optimization",
        "Established component library used across 12+ projects", 
        "Achieved 100% accessibility compliance on all projects"
      ]
    }
  ],
  "social_links": [
    {
      "platform": "GitHub",
      "url": "https://github.com",
      "icon": "fab fa-github"
    },
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com", 
      "icon": "fab fa-linkedin"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com",
      "icon": "fab fa-twitter"
    },
    {
      "platform": "Email",
      "url": "mailto:taylor@example.com",
      "icon": "fas fa-envelope"
    }
  ]
};

// Current active page
let currentPage = 'home';

// DOM elements
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  mobileMenuBtn: document.getElementById('mobile-menu-btn'),
  mobileNavOverlay: document.getElementById('mobile-nav-overlay'),
  mobileNav: document.getElementById('mobile-nav'),
  mobileNavClose: document.getElementById('mobile-nav-close'),
  projectModal: document.getElementById('project-modal'),
  modalClose: document.getElementById('modal-close'),
  contactForm: document.getElementById('contact-form'),
  header: document.getElementById('header')
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 TRUE SPA Portfolio initializing...');
  initializeApp();
});

function initializeApp() {
  console.log('📱 Initializing TRUE SPA features...');
  
  // CRITICAL: Force initial SPA state immediately
  enforceInitialSPAState();
  
  // Initialize core features
  initTheme();
  initSPANavigation();
  initMobileMenu();
  initPortfolioModal();
  initContactForm();
  initScrollEffects();
  initLoadingAnimation();
  
  console.log('✅ TRUE SPA initialized successfully!');
  console.log(`👋 Welcome to ${portfolioData.personal_info.name}'s Portfolio`);
}

// CRITICAL FIX: Force initial SPA state
function enforceInitialSPAState() {
  console.log('🔧 ENFORCING TRUE SPA STATE - Hiding all sections except home...');
  
  // Get all page sections
  const allSections = document.querySelectorAll('.page-section');
  
  // Force hide ALL sections first
  allSections.forEach(section => {
    section.style.display = 'none';
    section.classList.remove('active');
  });
  
  // Force show ONLY home section
  const homeSection = document.getElementById('home');
  if (homeSection) {
    homeSection.style.display = 'flex';
    homeSection.classList.add('active');
    currentPage = 'home';
    
    // Ensure home is properly centered
    homeSection.style.alignItems = 'center';
    homeSection.style.justifyContent = 'center';
    homeSection.style.textAlign = 'center';
    homeSection.style.minHeight = '100vh';
    
    console.log('✅ HOME section is now the ONLY visible section');
  }
  
  // Update navigation
  updateActiveNavLinks('home');
  
  // Disable any scroll behavior that might show other sections
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 100);
}

// CRITICAL FIX: TRUE SPA NAVIGATION
function initSPANavigation() {
  console.log('🧭 Initializing FIXED SPA navigation...');
  
  // Get all navigation links (desktop + mobile)
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const heroButtons = document.querySelectorAll('.hero-buttons a');
  
  // Add click handlers to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', handleSPANavigation);
  });
  
  // Add click handlers to hero buttons
  heroButtons.forEach(button => {
    button.addEventListener('click', handleSPANavigation);
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    const hash = window.location.hash || '#home';
    const pageId = hash.substring(1);
    showPage(pageId, false); // Don't update history
  });
  
  // Prevent any scroll-based navigation
  window.addEventListener('scroll', (e) => {
    // Don't allow scroll to reveal other sections
    if (currentPage === 'home') {
      window.scrollTo(0, 0);
    }
  });
  
  console.log('✅ FIXED SPA navigation initialized');
}

// CRITICAL FIX: Proper SPA navigation handler
function handleSPANavigation(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const targetId = e.target.getAttribute('href');
  if (!targetId || !targetId.startsWith('#')) return;
  
  const pageId = targetId.substring(1);
  console.log(`🧭 SPA Navigation to: ${pageId}`);
  
  showPage(pageId);
  
  // Close mobile menu if open
  if (elements.mobileNav.classList.contains('active')) {
    closeMobileMenu();
  }
}

// CRITICAL FIX: Show only ONE page at a time (ENFORCED SPA)
function showPage(pageId, updateHistory = true) {
  console.log(`📄 ENFORCING SPA: Showing ONLY page: ${pageId}`);
  
  // Step 1: FORCE hide ALL sections with !important overrides
  const allSections = document.querySelectorAll('.page-section');
  allSections.forEach(section => {
    section.style.setProperty('display', 'none', 'important');
    section.classList.remove('active');
  });
  
  // Step 2: FORCE show ONLY the target section
  const targetSection = document.getElementById(pageId);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Special handling for home page (needs flex for centering)
    if (pageId === 'home') {
      targetSection.style.setProperty('display', 'flex', 'important');
      targetSection.style.setProperty('align-items', 'center', 'important');
      targetSection.style.setProperty('justify-content', 'center', 'important');
      targetSection.style.setProperty('text-align', 'center', 'important');
      targetSection.style.setProperty('min-height', '100vh', 'important');
      targetSection.style.setProperty('padding-top', '0', 'important');
      console.log('🏠 Home page FORCED to display with flex centering');
      
      // Force scroll to top for home
      window.scrollTo(0, 0);
    } else {
      targetSection.style.setProperty('display', 'block', 'important');
      targetSection.style.setProperty('padding-top', '70px', 'important');
      console.log(`📋 ${pageId} page FORCED to display as block`);
      
      // Scroll to top of section
      window.scrollTo(0, 0);
    }
    
    // Update current page tracker
    currentPage = pageId;
    
    // Update navigation active states
    updateActiveNavLinks(pageId);
    
    // Update browser URL
    if (updateHistory) {
      history.pushState({ page: pageId }, '', `#${pageId}`);
    }
    
    // Trigger animations for new page
    triggerPageAnimations(targetSection);
    
    console.log(`✅ SPA: Successfully showing ONLY ${pageId}`);
    console.log(`🔧 Debug: Current visible sections:`, 
      Array.from(document.querySelectorAll('.page-section')).map(s => ({
        id: s.id, 
        display: s.style.display, 
        active: s.classList.contains('active')
      }))
    );
  } else {
    console.error(`❌ Page not found: ${pageId}`);
  }
}

function updateActiveNavLinks(pageId) {
  // Remove active from all nav links
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active to current page links
  document.querySelectorAll(`[href="#${pageId}"]`).forEach(link => {
    link.classList.add('active');
  });
}

function triggerPageAnimations(section) {
  // Reset and trigger animations
  const animatedElements = section.querySelectorAll('.portfolio-item, .timeline-item, .skill-category');
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }, index * 100);
  });
}

// Theme Management
function initTheme() {
  console.log('🎨 Initializing theme system...');
  
  // Check for saved theme or use system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  console.log(`🎨 Initial theme: ${initialTheme}`);
  setTheme(initialTheme);
  
  // Theme toggle event listener
  elements.themeToggle.addEventListener('click', function() {
    console.log('🎨 Theme toggle clicked!');
    toggleTheme();
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      console.log(`🎨 System theme changed to: ${e.matches ? 'dark' : 'light'}`);
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  console.log('✅ Theme system initialized');
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  console.log(`🎨 Toggling theme from ${currentTheme} to ${newTheme}`);
  
  setTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  
  console.log(`✅ Theme toggled successfully to ${newTheme}`);
}

function setTheme(theme) {
  console.log(`🎨 Setting theme to: ${theme}`);
  
  // Set the data attribute for theme
  document.documentElement.setAttribute('data-color-scheme', theme);
  
  // Update the theme toggle icon
  const icon = elements.themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    console.log('🌞 Icon changed to sun (dark mode active)');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    console.log('🌙 Icon changed to moon (light mode active)');
  }
  
  // Add smooth transition effect
  elements.themeToggle.style.transform = 'scale(0.8)';
  setTimeout(() => {
    elements.themeToggle.style.transform = 'scale(1)';
  }, 150);
  
  console.log(`✅ Theme ${theme} applied successfully`);
}

// Mobile Menu Management
function initMobileMenu() {
  console.log('📱 Initializing mobile menu...');
  
  elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  elements.mobileNavClose.addEventListener('click', closeMobileMenu);
  elements.mobileNavOverlay.addEventListener('click', closeMobileMenu);
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && elements.mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  console.log('✅ Mobile menu initialized');
}

function toggleMobileMenu() {
  const isActive = elements.mobileNav.classList.contains('active');
  
  if (isActive) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  elements.mobileMenuBtn.classList.add('active');
  elements.mobileNav.classList.add('active');
  elements.mobileNavOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  elements.mobileMenuBtn.classList.remove('active');
  elements.mobileNav.classList.remove('active');
  elements.mobileNavOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// FIXED: Portfolio Modal Management
function initPortfolioModal() {
  console.log('🖼️ Initializing FIXED portfolio modals...');
  
  // Wait for DOM to be ready, then attach modal handlers
  setTimeout(() => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    console.log(`🖼️ Found ${portfolioItems.length} portfolio items`);
    
    // Add click handlers to portfolio items
    portfolioItems.forEach(item => {
      const projectId = parseInt(item.getAttribute('data-project'));
      console.log(`🖼️ Attaching modal handler to project ${projectId}`);
      
      // Remove any existing handlers first
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
      
      // Handle clicks on the entire portfolio item
      newItem.addEventListener('click', (e) => {
        // Don't open modal if clicking on external links
        if (e.target.closest('a[target="_blank"]')) {
          console.log('🖼️ External link clicked, not opening modal');
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        console.log(`🖼️ Portfolio item clicked - Opening modal for project ${projectId}`);
        openProjectModal(projectId);
      });
      
      // Handle view project button specifically
      const viewBtn = newItem.querySelector('.view-project');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(`🖼️ View project button clicked for ${projectId}`);
          openProjectModal(projectId);
        });
      }
    });
    
    // Modal close handlers
    if (elements.modalClose) {
      elements.modalClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjectModal();
      });
    }
    
    const modalOverlay = elements.projectModal?.querySelector('.modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjectModal();
      });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.projectModal?.classList.contains('show')) {
        closeProjectModal();
      }
    });
    
    console.log('✅ FIXED Portfolio modals initialized');
  }, 500); // Small delay to ensure DOM is ready
}

function openProjectModal(projectId) {
  console.log(`🖼️ OPENING modal for project ID: ${projectId}`);
  
  const project = portfolioData.portfolio.find(p => p.id === projectId);
  
  if (project) {
    console.log(`🖼️ Found project: ${project.title}`);
    
    // Populate modal content
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDemo = document.getElementById('modal-demo');
    const modalGithub = document.getElementById('modal-github');
    const techContainer = document.getElementById('modal-tech');
    
    if (modalImage) modalImage.src = project.image;
    if (modalImage) modalImage.alt = project.title;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDescription) modalDescription.textContent = project.description;
    if (modalDemo) modalDemo.href = project.live;
    if (modalGithub) modalGithub.href = project.github;
    
    // Update technologies
    if (techContainer) {
      techContainer.innerHTML = '';
      project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
      });
    }
    
    // Show modal with animation
    if (elements.projectModal) {
      elements.projectModal.classList.remove('hidden');
      // Force reflow
      elements.projectModal.offsetHeight;
      setTimeout(() => {
        elements.projectModal.classList.add('show');
      }, 10);
      
      document.body.style.overflow = 'hidden';
      console.log(`✅ Modal successfully opened for ${project.title}`);
    } else {
      console.error('❌ Modal element not found');
    }
  } else {
    console.error(`❌ Project with ID ${projectId} not found in data`);
  }
}

function closeProjectModal() {
  console.log('🖼️ Closing project modal...');
  if (elements.projectModal) {
    elements.projectModal.classList.remove('show');
    setTimeout(() => {
      elements.projectModal.classList.add('hidden');
      document.body.style.overflow = '';
      console.log('✅ Modal closed successfully');
    }, 300);
  }
}

// Contact Form Management with Demo Notice
function initContactForm() {
  console.log('📧 Initializing contact form...');
  
  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const formInputs = elements.contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });
  }
  
  console.log('✅ Contact form initialized with demo notice');
}

function handleFormSubmit(e) {
  e.preventDefault();
  console.log('📧 Demo form submission attempted...');
  
  const formData = new FormData(elements.contactForm);
  const fields = {
    name: formData.get('name')?.trim(),
    email: formData.get('email')?.trim(),
    subject: formData.get('subject')?.trim(),
    message: formData.get('message')?.trim()
  };
  
  console.log('📧 Demo form data:', fields);
  
  // Validate all fields
  let isValid = true;
  Object.keys(fields).forEach(fieldName => {
    const field = elements.contactForm.querySelector(`[name="${fieldName}"]`);
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  if (isValid) {
    console.log('✅ Demo form validation passed');
    showDemoSubmissionSuccess();
    elements.contactForm.reset();
    
    // Clear any remaining errors
    Object.keys(fields).forEach(fieldName => {
      clearFieldError({ target: elements.contactForm.querySelector(`[name="${fieldName}"]`) });
    });
  } else {
    console.log('❌ Demo form validation failed');
  }
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  let errorMessage = '';
  
  // Required field validation
  if (!value) {
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }
  // Email validation
  else if (fieldName === 'email' && !isValidEmail(value)) {
    errorMessage = 'Please enter a valid email address';
  }
  // Message length validation
  else if (fieldName === 'message' && value.length < 10) {
    errorMessage = 'Message must be at least 10 characters long';
  }
  // Name validation
  else if (fieldName === 'name' && value.length < 2) {
    errorMessage = 'Name must be at least 2 characters long';
  }
  // Subject validation
  else if (fieldName === 'subject' && value.length < 3) {
    errorMessage = 'Subject must be at least 3 characters long';
  }
  
  if (errorMessage) {
    showFieldError(errorElement, errorMessage);
    return false;
  } else {
    clearFieldError(e);
    return true;
  }
}

function showFieldError(errorElement, message) {
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = document.getElementById(`${field.name}-error`);
  if (errorElement) {
    errorElement.classList.remove('show');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showDemoSubmissionSuccess() {
  console.log('🎉 Showing demo success notification...');
  
  // Create success notification
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <div>
        <strong>Demo Form Submitted!</strong>
        <p>This was a demonstration. In a live website, your message would be sent via email service integration (SendGrid, Mailgun, etc.) with proper backend processing.</p>
      </div>
    </div>
  `;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  notification.querySelector('.success-content').style.cssText = `
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-weight: 500;
  `;
  
  notification.querySelector('.success-content p').style.cssText = `
    margin: 4px 0 0 0;
    font-size: 13px;
    opacity: 0.9;
    font-weight: normal;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 6000);
}

// Scroll Effects
function initScrollEffects() {
  console.log('📜 Initializing scroll effects...');
  
  // Header background on scroll (when applicable)
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY > 50;
    elements.header.classList.toggle('scrolled', scrolled);
  }, 10));
  
  console.log('✅ Scroll effects initialized');
}

// Loading Animation
function initLoadingAnimation() {
  console.log('🔄 Initializing loading animations...');
  
  // Page load animation
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
  
  // Hero text animation on load (only when home is visible)
  const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-title, .hero-description, .hero-buttons, .scroll-indicator');
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 200 + (index * 200));
  });
  
  console.log('✅ Loading animations initialized');
}

// Utility Functions
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

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Portfolio modal keyboard support
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('view-project') || focusedElement.classList.contains('portfolio-item')) {
      e.preventDefault();
      const projectId = parseInt(focusedElement.getAttribute('data-project') || focusedElement.closest('.portfolio-item').getAttribute('data-project'));
      openProjectModal(projectId);
    }
  }
  
  // SPA Navigation with keyboard shortcuts
  if (e.key >= '1' && e.key <= '6' && e.altKey) {
    e.preventDefault();
    const pages = ['home', 'about', 'skills', 'portfolio', 'experience', 'contact'];
    const pageIndex = parseInt(e.key) - 1;
    if (pages[pageIndex]) {
      showPage(pages[pageIndex]);
    }
  }
});

// Make portfolio items focusable for accessibility
setTimeout(() => {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const titleElement = item.querySelector('.portfolio-title');
    if (titleElement) {
      item.setAttribute('aria-label', `View details for ${titleElement.textContent}`);
    }
  });
}, 1000);

// Console welcome message with debug info
console.log(`
🚀 FIXED TRUE SPA Portfolio Website Loaded!
👨‍💻 Built with ENFORCED Single Page Application architecture  
🎨 Design System: Custom CSS Variables with Dark/Light Theme
📱 Features: TRUE SPA (only one section visible), Responsive, Accessible

${portfolioData.personal_info.name} - ${portfolioData.personal_info.title}
📧 ${portfolioData.personal_info.email}
📍 ${portfolioData.personal_info.location}

🔧 FIXED SPA Features:
✅ Only ONE section visible at any time (ENFORCED)
✅ Navigation properly hides all, shows one
✅ FIXED Portfolio modals now working
✅ Background images with theme switching  
✅ Contact form with demo explanation
✅ Mobile-responsive navigation

🐛 Debug Features:
- window.debugSPA - Debug object with navigation controls
- Alt + 1-6 for quick page navigation
- Console logging for all SPA state changes

📧 Contact Form Notice:
This is a demonstration portfolio. In a real deployment, messages would need:
- Backend server (Node.js, PHP, Python, etc.)
- Email service (SendGrid, Mailgun, AWS SES, etc.)  
- Form handling service (Netlify Forms, Formspree, etc.)
`);

// Debug object for troubleshooting
window.debugSPA = {
  data: portfolioData,
  elements: elements,
  showPage: showPage,
  toggleTheme: toggleTheme,
  openProjectModal: openProjectModal,
  closeProjectModal: closeProjectModal,
  enforceInitialSPAState: enforceInitialSPAState,
  getCurrentPage: () => currentPage,
  getAllPages: () => {
    return Array.from(document.querySelectorAll('.page-section')).map(section => ({
      id: section.id,
      isActive: section.classList.contains('active'),
      display: section.style.display,
      visible: section.offsetHeight > 0 && section.offsetWidth > 0
    }));
  },
  forceShowHome: () => {
    console.log('🔧 Debug: Force showing home page...');
    showPage('home');
  },
  testSPABehavior: () => {
    console.log('🔧 Debug: Testing TRUE SPA behavior...');
    const pages = ['about', 'skills', 'portfolio', 'experience', 'contact', 'home'];
    let index = 0;
    const interval = setInterval(() => {
      showPage(pages[index]);
      console.log(`🔧 Showing: ${pages[index]} | All pages:`, window.debugSPA.getAllPages());
      index++;
      if (index >= pages.length) {
        clearInterval(interval);
        console.log('🔧 SPA test complete - should have shown only one section at a time');
      }
    }, 1500);
  },
  testModals: () => {
    console.log('🔧 Debug: Testing modal functionality...');
    [1, 2, 3].forEach((id, index) => {
      setTimeout(() => {
        console.log(`🔧 Testing modal ${id}`);
        openProjectModal(id);
        setTimeout(() => {
          closeProjectModal();
        }, 1000);
      }, index * 2000);
    });
  }
};

console.log('🔧 Enhanced debug tools available at window.debugSPA');
