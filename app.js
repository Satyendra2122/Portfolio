// Portfolio projects data from provided JSON
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
  ]
};

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

// Current active section
let currentSection = 'home';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  initTheme();
  initSPANavigation();
  initMobileNavigation();
  initPortfolioModal();
  initContactForm();
  initSkillsAnimation();
  initHeroButtons();
  fixImageLoading();
  
  // Show home section by default
  showSection('home');
}

// SPA NAVIGATION - CORE FUNCTIONALITY
function initSPANavigation() {
  // Handle desktop navigation links
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', handleSectionNavigation);
  });
  
  // Handle mobile navigation links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', handleSectionNavigation);
  });
}

function handleSectionNavigation(e) {
  e.preventDefault();
  const targetSection = e.target.getAttribute('href').replace('#', '');
  showSection(targetSection);
  
  // Close mobile menu if open
  if (elements.mobileNav.classList.contains('active')) {
    closeMobileMenu();
  }
}

// CRITICAL: Show only one section at a time
function showSection(sectionId) {
  // Hide all sections immediately
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
  });
  
  // Show target section with fade animation
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    // Set display first
    targetSection.style.display = 'block';
    
    // Force reflow then add active class for animation
    targetSection.offsetHeight;
    
    // Add active class with slight delay for smooth fade
    setTimeout(() => {
      targetSection.classList.add('active');
    }, 50);
    
    // Update current section
    currentSection = sectionId;
    
    // Update navigation active states
    updateNavigationStates(sectionId);
    
    // Trigger section-specific animations
    if (sectionId === 'skills') {
      setTimeout(() => animateSkillBars(), 500);
    }
    
    // Scroll to top of the new section
    window.scrollTo(0, 0);
  }
}

function updateNavigationStates(activeSection) {
  // Update desktop navigation
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  desktopNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${activeSection}`) {
      link.classList.add('active');
    }
  });
  
  // Update mobile navigation
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${activeSection}`) {
      link.classList.add('active');
    }
  });
}

// Hero buttons functionality
function initHeroButtons() {
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const targetSection = e.target.getAttribute('data-section');
      if (targetSection) {
        showSection(targetSection);
      }
    });
  });
}

// Skills animation
function initSkillsAnimation() {
  // Skills will be animated when the section is shown
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    }, index * 100);
  });
}

// Fix image loading issues
function fixImageLoading() {
  const portfolioImages = document.querySelectorAll('.portfolio-image img');
  portfolioImages.forEach((img, index) => {
    img.style.backgroundColor = 'var(--color-secondary)';
    
    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: var(--color-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-secondary);
        font-size: var(--font-size-lg);
      `;
      placeholder.innerHTML = '<i class="fas fa-image"></i>';
      this.parentNode.replaceChild(placeholder, this);
    });
    
    img.addEventListener('load', function() {
      this.style.opacity = '0';
      setTimeout(() => {
        this.style.opacity = '1';
        this.style.transition = 'opacity 0.3s ease';
      }, 100);
    });
  });
}

// Theme Management with Background Image Switching
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  setTheme(theme);
  
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-color-scheme', theme);
  const icon = elements.themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  
  elements.themeToggle.style.transform = 'scale(0.8)';
  setTimeout(() => {
    elements.themeToggle.style.transform = 'scale(1)';
  }, 150);
  
  // Log theme change for debugging background images
  console.log(`Theme switched to: ${theme}`);
}

// Mobile Navigation Management
function initMobileNavigation() {
  elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  elements.mobileNavClose.addEventListener('click', closeMobileMenu);
  elements.mobileNavOverlay.addEventListener('click', closeMobileMenu);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && elements.mobileNav.classList.contains('active')) {
      closeMobileMenu();
    }
  });
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

// Portfolio Modal Management
function initPortfolioModal() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modalOverlay = elements.projectModal.querySelector('.modal-overlay');
  
  portfolioItems.forEach(item => {
    const projectId = parseInt(item.getAttribute('data-project'));
    
    item.addEventListener('click', (e) => {
      if (e.target.closest('a[target="_blank"]')) {
        return;
      }
      e.preventDefault();
      openProjectModal(projectId);
    });
    
    const viewBtn = item.querySelector('.view-project');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        openProjectModal(projectId);
      });
    }
    
    const externalLinks = item.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  });
  
  elements.modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.projectModal.classList.contains('show')) {
      closeProjectModal();
    }
  });
}

function openProjectModal(projectId) {
  const project = portfolioData.portfolio.find(p => p.id === projectId);
  
  if (project) {
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-image').alt = project.title;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-demo').href = project.live;
    document.getElementById('modal-github').href = project.github;
    
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
      const techTag = document.createElement('span');
      techTag.className = 'tech-tag';
      techTag.textContent = tech;
      techContainer.appendChild(techTag);
    });
    
    elements.projectModal.classList.remove('hidden');
    elements.projectModal.offsetHeight;
    setTimeout(() => {
      elements.projectModal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  elements.projectModal.classList.remove('show');
  setTimeout(() => {
    elements.projectModal.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

// Contact Form Management
function initContactForm() {
  elements.contactForm.addEventListener('submit', handleFormSubmit);
  
  const formInputs = elements.contactForm.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(elements.contactForm);
  const fields = {
    name: formData.get('name')?.trim(),
    email: formData.get('email')?.trim(),
    subject: formData.get('subject')?.trim(),
    message: formData.get('message')?.trim()
  };
  
  let isValid = true;
  Object.keys(fields).forEach(fieldName => {
    const field = elements.contactForm.querySelector(`[name="${fieldName}"]`);
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });
  
  if (isValid) {
    showSubmissionSuccess();
    elements.contactForm.reset();
    
    Object.keys(fields).forEach(fieldName => {
      clearFieldError({ target: elements.contactForm.querySelector(`[name="${fieldName}"]`) });
    });
  }
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);
  
  let errorMessage = '';
  
  if (!value) {
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }
  else if (fieldName === 'email' && !isValidEmail(value)) {
    errorMessage = 'Please enter a valid email address';
  }
  else if (fieldName === 'message' && value.length < 10) {
    errorMessage = 'Message must be at least 10 characters long';
  }
  else if (fieldName === 'name' && value.length < 2) {
    errorMessage = 'Name must be at least 2 characters long';
  }
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

function showSubmissionSuccess() {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="success-content">
      <i class="fas fa-check-circle"></i>
      <span>Thank you! Your message has been sent successfully.</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-success);
    color: white;
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
    align-items: center;
    gap: 12px;
    font-weight: 500;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Navigate between sections with arrow keys (when not in form fields)
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    const sections = ['home', 'about', 'skills', 'portfolio', 'experience', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
      e.preventDefault();
      showSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      showSection(sections[currentIndex - 1]);
    }
  }
  
  // Portfolio navigation
  if (e.key === 'Enter' || e.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('view-project') || focusedElement.classList.contains('portfolio-item')) {
      e.preventDefault();
      const projectId = parseInt(focusedElement.getAttribute('data-project') || focusedElement.closest('.portfolio-item').getAttribute('data-project'));
      openProjectModal(projectId);
    }
  }
});

// Make portfolio items focusable for accessibility
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', `View details for ${item.querySelector('.portfolio-title').textContent}`);
});

// Page Load Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Console welcome message
console.log(`
🚀 Portfolio SPA with Background Images Loaded Successfully!
👨‍💻 Single Page Application with True Section Switching
🎨 Design System: Custom CSS Variables with Dark/Light Theme
🖼️ Background Images: Theme-based switching between light/dark workspace images
📱 Features: SPA Navigation, Responsive, Accessible

${portfolioData.personal_info.name} - ${portfolioData.personal_info.title}
📧 ${portfolioData.personal_info.email}
📍 ${portfolioData.personal_info.location}

Portfolio Projects: ${portfolioData.portfolio.length} featured projects
Navigation: Click links to switch sections - only one visible at a time!
Keyboard: Use arrow keys to navigate between sections!
Theme: Toggle theme switches background images automatically!
`);

// Export for testing/debugging
window.portfolioApp = {
  data: portfolioData,
  elements: elements,
  showSection: showSection,
  currentSection: () => currentSection,
  toggleTheme: toggleTheme,
  openProjectModal: openProjectModal,
  closeProjectModal: closeProjectModal
};