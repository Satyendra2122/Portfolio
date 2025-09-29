document.addEventListener('DOMContentLoaded', function() {
    // Portfolio project data
    const projectData = {
        1: {
            title: "Music Streaming Platform",
            description: "Full-featured music streaming application with playlist management, social features, offline playbook, and artist analytics. Built with real-time audio processing and recommendation algorithms.",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
            technologies: ["React", "Node.js", "MongoDB", "WebAudio API", "Socket.io"],
            github: "#",
            live: "#"
        },
        2: {
            title: "Cryptocurrency Dashboard", 
            description: "Real-time cryptocurrency tracking and portfolio management application with advanced charting, price alerts, news integration, and trading simulation features.",
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
            technologies: ["Vue.js", "Python", "PostgreSQL", "Chart.js", "WebSocket"],
            github: "#",
            live: "#"
        },
        3: {
            title: "Video Conferencing Platform",
            description: "Secure video conferencing application with screen sharing, recording, chat, breakout rooms, and calendar integration. Supports up to 100 participants per call.",
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop", 
            technologies: ["Next.js", "WebRTC", "Socket.io", "MongoDB", "AWS"],
            github: "#",
            live: "#"
        }
    };

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Navigation Control
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileNav() {
        mobileNav.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMobileNav() {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Mobile menu button click
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileNav.classList.contains('active')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Mobile nav close button click
    mobileNavClose.addEventListener('click', closeMobileNav);

    // Close mobile nav when clicking outside
    mobileNav.addEventListener('click', function(e) {
        if (e.target === mobileNav) {
            closeMobileNav();
        }
    });

    // Close mobile nav when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileNav();
        });
    });

    // SPA Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const heroButtons = document.querySelectorAll('[data-section]');

    function showSection(targetSection) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const target = document.getElementById(targetSection);
        if (target) {
            target.classList.add('active');
        }

        // Update desktop nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });

        // Update mobile nav links
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);

        // Animate skill bars if skills section is shown
        if (targetSection === 'skills') {
            setTimeout(animateSkillBars, 200);
        }
    }

    // Add click handlers for desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Add click handlers for mobile navigation
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });

    // Add click handlers for hero buttons and other navigation elements
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Portfolio Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const viewProjectButtons = document.querySelectorAll('.view-project');

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Populate modal content
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-image').alt = project.title;
        document.getElementById('modal-github').href = project.github;
        document.getElementById('modal-live').href = project.live;

        // Populate technologies
        const techContainer = document.getElementById('modal-technologies');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Add event listeners for portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Add event listeners for view project buttons
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const portfolioItem = this.closest('.portfolio-item');
            const projectId = portfolioItem.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Smooth scrolling for internal links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars when skills section comes into view
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 200);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });

    // Initialize skill bars on page load if skills section is visible
    if (document.getElementById('skills').classList.contains('active')) {
        setTimeout(animateSkillBars, 500);
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home');
        }
    });

    // Set initial section based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
    }

    // Prevent scroll restoration on page reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Handle window resize - close mobile nav if window becomes large
    function handleResize() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    }

    window.addEventListener('resize', handleResize);

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add loading animation for page transitions
    function addLoadingState() {
        document.body.style.opacity = '0.9';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }

    // Enhanced navigation with loading states
    navLinks.forEach(link => {
        link.addEventListener('click', addLoadingState);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', addLoadingState);
    });

    heroButtons.forEach(button => {
        button.addEventListener('click', addLoadingState);
    });

    // Close mobile navigation on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });

    console.log('Portfolio SPA initialized successfully!');
});