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
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');

        // Initialize theme based on saved preference or default to light
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            console.log('Initializing theme:', savedTheme);
            
            if (savedTheme === 'dark') {
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

        // Toggle theme function
        function toggleTheme() {
            const isDark = body.classList.contains('dark');
            console.log('Current theme is dark:', isDark);
            
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
        }

        // Initialize theme on page load
        initializeTheme();

        // Add click event listener
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }

    // Mobile Navigation Control - FIXED VERSION
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

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
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    // Mobile nav close button click
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileNav();
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileNav();
            }
        }
    });

    // Close mobile nav when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileNav();
        });
    });

    // SPA Navigation - ENHANCED
    const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');
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
        desktopNavLinks.forEach(link => {
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
            setTimeout(animateSkillBars, 300);
        }

        // Update URL without page reload
        if (targetSection !== 'home') {
            window.history.pushState({ section: targetSection }, '', `#${targetSection}`);
        } else {
            window.history.pushState({ section: targetSection }, '', window.location.pathname);
        }
    }

    // Add click handlers for desktop navigation
    desktopNavLinks.forEach(link => {
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
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            }
        });
    }

    // Portfolio Modal Functionality
    const modal = document.getElementById('project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const viewProjectButtons = document.querySelectorAll('.view-project');

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project || !modal) return;

        console.log('Opening modal for project:', projectId);

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

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
        }
        document.body.style.overflow = '';
    }

    // Add event listeners for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent opening modal if clicking on overlay button
            if (e.target.closest('.view-project')) {
                return;
            }
            
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
            e.preventDefault();
            
            const projectCard = this.closest('.project-card');
            if (projectCard) {
                const projectId = projectCard.getAttribute('data-project-id');
                if (projectId) {
                    openModal(projectId);
                }
            }
        });
    });

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileNav();
            }
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
            if (submitButton) {
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
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
    function initializeSection() {
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            showSection(initialHash);
        } else {
            showSection('home');
        }
        
        // Initialize skill bars if skills section is active
        if (initialHash === 'skills') {
            setTimeout(animateSkillBars, 500);
        }
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
            
            if (desktopNav) {
                desktopNav.style.display = 'flex';
            }
            if (mobileBtn) {
                mobileBtn.style.display = 'none';
            }
            
            // Restore body scroll if mobile nav was open
            if (!modal || modal.classList.contains('hidden')) {
                document.body.style.overflow = '';
            }
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
                    setTimeout(animateSkillBars, 300);
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

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add smooth loading animation
    function addLoadingState() {
        document.body.style.transition = 'opacity 0.2s ease';
        document.body.style.opacity = '0.95';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 150);
    }

    // Enhanced navigation with loading states
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', addLoadingState);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', addLoadingState);
    });

    heroButtons.forEach(button => {
        button.addEventListener('click', addLoadingState);
    });

    // Prevent scroll restoration on page reload
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Initialize everything
    setTimeout(() => {
        enforceDesktopMode();
        initializeSection();
        
        // Add loaded class to body for any CSS transitions
        document.body.classList.add('loaded');
        
        console.log('Portfolio SPA initialized successfully!');
        console.log('Current theme:', body.classList.contains('dark') ? 'dark' : 'light');
        console.log('Desktop mode enforcement active');
        console.log('Theme system loaded');
        console.log('Mobile navigation system ready');
        console.log('Portfolio modal system ready');
    }, 100);

    // Debug helpers
    window.debugSPA = {
        showSection: showSection,
        toggleTheme: () => themeToggle?.click(),
        openModal: openModal,
        closeModal: closeModal,
        animateSkillBars: animateSkillBars
    };
});