document.addEventListener('DOMContentLoaded', function() {
    // Portfolio project data
    const projectData = {
        1: {
            title: "Music Streaming Platform",
            description: "Full-featured music streaming application with playlist management, social features, offline playback, and artist analytics. Built with real-time audio processing and recommendation algorithms.",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format",
            technologies: ["React", "Node.js", "MongoDB", "WebAudio API", "Socket.io"],
            github: "#",
            live: "#"
        },
        2: {
            title: "Cryptocurrency Dashboard", 
            description: "Real-time cryptocurrency tracking and portfolio management application with advanced charting, price alerts, news integration, and trading simulation features.",
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format",
            technologies: ["Vue.js", "Python", "PostgreSQL", "Chart.js", "WebSocket"],
            github: "#",
            live: "#"
        },
        3: {
            title: "Video Conferencing Platform",
            description: "Secure video conferencing application with screen sharing, recording, chat, breakout rooms, and calendar integration. Supports up to 100 participants per call.",
            image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop&auto=format", 
            technologies: ["Next.js", "WebRTC", "Socket.io", "MongoDB", "AWS"],
            github: "#",
            live: "#"
        }
    };

    // Theme Toggle Functionality - FIXED VERSION
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isToggling = false; // Prevent multiple rapid clicks
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        // Initialize theme based on saved preference or system preference
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
            
            console.log('Initializing theme:', initialTheme);
            
            if (initialTheme === 'dark') {
                body.classList.add('dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                body.classList.remove('dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        }

        // Toggle theme function with debouncing
        function toggleTheme() {
            if (isToggling) return; // Prevent rapid clicks
            isToggling = true;
            
            const isDark = body.classList.contains('dark');
            console.log('Toggling theme. Current is dark:', isDark);
            
            if (isDark) {
                // Switch to light mode
                body.classList.remove('dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'light');
                console.log('Switched to light mode');
            } else {
                // Switch to dark mode
                body.classList.add('dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'dark');
                console.log('Switched to dark mode');
            }
            
            // Reset toggle lock after animation
            setTimeout(() => {
                isToggling = false;
            }, 300);
        }

        // Initialize theme on page load
        initializeTheme();

        // Add multiple event listeners to ensure responsiveness
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });

        // Add touch event for mobile
        themeToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        themeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                initializeTheme();
            }
        });

        // Ensure button is always clickable
        themeToggle.style.pointerEvents = 'auto';
        themeToggle.style.cursor = 'pointer';
    }

    // Mobile Navigation Control
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileNav() {
        if (mobileNav) {
            mobileNav.classList.add('active');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
        document.body.style.overflow = '';
    }

    // Mobile menu button click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    // Mobile nav close button click
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when clicking outside
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            if (e.target === mobileNav) {
                closeMobileNav();
            }
        });
    }

    // Close mobile nav when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileNav();
        });
    });

    // SPA Navigation System
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const heroButtons = document.querySelectorAll('[data-section]');

    function showSection(targetSection) {
        console.log('Navigating to section:', targetSection);
        
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

        // Update URL hash without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, `#${targetSection}`);
        } else {
            window.location.hash = targetSection;
        }

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Animate skill bars if skills section is shown
        if (targetSection === 'skills') {
            setTimeout(animateSkillBars, 300);
        }
    }

    // Add click handlers for desktop navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });

    // Add click handlers for mobile navigation
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
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
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            if (width) {
                // Stagger animation for better visual effect
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, index * 100);
            }
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
        if (!project || !modal) return;

        // Populate modal content
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        const modalGithub = document.getElementById('modal-github');
        const modalLive = document.getElementById('modal-live');

        if (modalTitle) modalTitle.textContent = project.title;
        if (modalDescription) modalDescription.textContent = project.description;
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
        }
        if (modalGithub) modalGithub.href = project.github;
        if (modalLive) modalLive.href = project.live;

        // Populate technologies
        const techContainer = document.getElementById('modal-technologies');
        if (techContainer) {
            techContainer.innerHTML = '';
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techContainer.appendChild(span);
            });
        }

        // Show modal with animation
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Animate modal entrance
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    function closeModal() {
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 200);
        }
        document.body.style.overflow = '';
    }

    // Add event listeners for portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            if (projectId) {
                openModal(projectId);
            }
        });
    });

    // Add event listeners for view project buttons
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const portfolioItem = this.closest('.portfolio-item');
            if (portfolioItem) {
                const projectId = portfolioItem.getAttribute('data-project-id');
                if (projectId) {
                    openModal(projectId);
                }
            }
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
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Contact Form Handler with Enhanced Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            // Enhanced validation
            const errors = [];
            
            if (!name || name.length < 2) {
                errors.push('Name must be at least 2 characters long.');
            }
            
            if (!email) {
                errors.push('Email is required.');
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    errors.push('Please enter a valid email address.');
                }
            }
            
            if (!subject || subject.length < 3) {
                errors.push('Subject must be at least 3 characters long.');
            }
            
            if (!message || message.length < 10) {
                errors.push('Message must be at least 10 characters long.');
            }

            if (errors.length > 0) {
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Simulate API call delay
                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`);
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });

        // Real-time form validation feedback
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;

            // Remove previous error styling
            field.style.borderColor = '';

            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = value && emailRegex.test(value);
                    break;
                case 'text':
                    isValid = value && value.length >= 2;
                    break;
                case 'textarea':
                    isValid = value && value.length >= 10;
                    break;
            }

            if (!isValid && value) {
                field.style.borderColor = '#ef4444';
            } else if (isValid) {
                field.style.borderColor = '#10b981';
            }
        }
    }

    // Intersection Observer for scroll animations
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
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        }
    });

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
    function initializeSection() {
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            showSection(initialHash);
        } else {
            showSection('home');
        }
    }

    // Prevent scroll restoration on page reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Handle window resize - responsive behavior
    function handleResize() {
        if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
        enforceDesktopMode();
    }

    window.addEventListener('resize', handleResize);

    // Desktop mode detection and enforcement
    function enforceDesktopMode() {
        const isDesktop = window.innerWidth > 768;
        
        if (isDesktop) {
            // Force desktop navigation to be visible
            const desktopNav = document.querySelector('.nav-desktop');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const mobileNavElement = document.querySelector('.mobile-nav');
            
            if (desktopNav) {
                desktopNav.style.display = 'flex';
            }
            if (mobileBtn) {
                mobileBtn.style.display = 'none';
            }
            if (mobileNavElement && !mobileNavElement.classList.contains('active')) {
                mobileNavElement.style.display = 'none';
            }
            
            // Restore body scroll if mobile nav was open
            document.body.style.overflow = '';
        } else {
            // Mobile mode
            const desktopNav = document.querySelector('.nav-desktop');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (desktopNav) {
                desktopNav.style.display = 'none';
            }
            if (mobileBtn) {
                mobileBtn.style.display = 'flex';
            }
        }
    }

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Image is already loaded due to src attribute, just unobserve
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Smooth scrolling for better UX
    function addSmoothTransition() {
        document.body.style.transition = 'opacity 0.2s ease';
        document.body.style.opacity = '0.95';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }

    // Enhanced navigation with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', addSmoothTransition);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', addSmoothTransition);
    });

    heroButtons.forEach(button => {
        button.addEventListener('click', addSmoothTransition);
    });

    // Close mobile navigation on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
            if (modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        }
    });

    // Initialize page
    setTimeout(() => {
        enforceDesktopMode();
        initializeSection();
        
        // Initialize skill bars if skills section is active
        const skillsSection = document.getElementById('skills');
        if (skillsSection && skillsSection.classList.contains('active')) {
            setTimeout(animateSkillBars, 500);
        }
    }, 100);

    // Page load complete - remove any loading states
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Debug information
    console.log('Portfolio SPA initialized successfully!');
    console.log('Features loaded:');
    console.log('- Background image switching (fixed)');
    console.log('- Timeline with visible borders in dark mode (fixed)');
    console.log('- Theme toggle system (fixed - more responsive)');
    console.log('- Mobile responsive navigation');
    console.log('- SPA routing system');
    console.log('- Portfolio modals');
    console.log('- Contact form validation');
    console.log('- Smooth animations');
});