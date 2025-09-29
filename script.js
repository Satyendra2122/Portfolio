// Replaced theme init/toggle with a robust DOMContentLoaded-safe implementation
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const btn = document.getElementById('toggle-mode');
    if (!btn) return; // guard: nothing to do if button missing

    function setTheme(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            btn.textContent = 'LIGHTMODE';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            btn.textContent = 'DARKMODE';
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize from localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Single toggle handler
    btn.addEventListener('click', () => {
        const currentIsDark = body.classList.contains('dark-mode');
        setTheme(currentIsDark ? 'light' : 'dark');
    });
})();

// Smooth single-page navigation & active link highlighting
(function () {
    const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
    const sections = Array.from(document.querySelectorAll('.snap-container section'));
    const container = document.querySelector('.snap-container');

    // Prevent default and scroll to target smoothly (works even if container has its own scroll)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            // If inside a scroll container, compute offset
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const offset = targetRect.top - containerRect.top + container.scrollTop;
                container.scrollTo({ top: offset, behavior: 'smooth' });
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // IntersectionObserver to mark active link and add .in-view class to sections
    if ('IntersectionObserver' in window && container) {
        const obsOptions = {
            root: container,
            rootMargin: '0px',
            threshold: 0.55
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector(`a.nav-link[href="#${id}"]`);
                if (entry.isIntersecting) {
                    // mark active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    if (link) link.classList.add('active');
                    // reveal section
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                    if (link) link.classList.remove('active');
                }
            });
        }, obsOptions);

        sections.forEach(s => observer.observe(s));
    } else {
        // Fallback: add click active behavior
        navLinks.forEach(l => l.addEventListener('click', () => {
            navLinks.forEach(x => x.classList.remove('active'));
            l.classList.add('active');
        }));
    }

    // Keyboard nav (ArrowDown / ArrowUp)
    document.addEventListener('keydown', (e) => {
        if (!container) return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            // find first section whose top is below or at current scroll
            const currentScroll = container.scrollTop;
            for (let s of sections) {
                const top = s.offsetTop;
                if (top > currentScroll + 10) {
                    container.scrollTo({ top, behavior: 'smooth' });
                    break;
                }
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            const currentScroll = container.scrollTop;
            for (let i = sections.length - 1; i >= 0; i--) {
                const s = sections[i];
                const top = s.offsetTop;
                if (top < currentScroll - 10) {
                    container.scrollTo({ top, behavior: 'smooth' });
                    break;
                }
            }
        }
    });
})();

// Drawer (single-menu) behavior — menu is the only nav location
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileBtn || !mobileMenu) return;

    function setMenu(open) {
        mobileMenu.classList.toggle('open', open);
        mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) mobileMenu.focus();
    }

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.contains('open');
        setMenu(!isOpen);
    });

    // Close when clicking a link inside the drawer
    mobileMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.matches('a.nav-link')) {
            // allow scroll behavior to start, then close the menu
            setTimeout(() => setMenu(false), 200);
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('open')) return;
        if (mobileMenu.contains(e.target) || mobileBtn.contains(e.target)) return;
        setMenu(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            setMenu(false);
            mobileBtn.focus();
        }
    });
});

// Show/hide panes inside the single section and bind nav links
document.addEventListener('DOMContentLoaded', () => {
    const panes = Array.from(document.querySelectorAll('.pane'));
    const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
    const singleSection = document.getElementById('single-section');
    const container = document.querySelector('.snap-container');

    if (!panes.length || !navLinks.length || !singleSection) return;

    function showPane(id, updateHash = true) {
        panes.forEach(p => p.classList.toggle('active', p.id === id));
        navLinks.forEach(a => {
            const target = (a.getAttribute('href') || '').replace('#', '');
            a.classList.toggle('active', target === id);
        });
        if (updateHash) {
            history.replaceState(null, '', '#' + id);
        }
        // scroll to the single section so pane is visible (if using scroll container)
        if (container) {
            const offset = singleSection.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
            container.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
            singleSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // bind nav links (desktop + drawer)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = (link.getAttribute('href') || '').replace('#', '') || 'home';
            showPane(id);
        });
    });

    // initial show based on hash or default to 'home'
    const initial = (location.hash || '#home').replace('#', '') || 'home';
    // small timeout so any initial layout settles (optional)
    setTimeout(() => showPane(initial, false), 30);
});