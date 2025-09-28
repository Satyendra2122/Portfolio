document.getElementById("toggle-mode").addEventListener("click", function () {
    const body = document.body;
    const button = this;

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        button.textContent = "LIGHTMODE";
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        button.textContent = "DARKMODE";
    }
});

// initialize theme from localStorage (keep original toggle logic but persistent)
(function () {
    const body = document.body;
    const btn = document.getElementById("toggle-mode");

    // Initialize mode
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (btn) btn.textContent = "LIGHTMODE";
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        if (btn) btn.textContent = "DARKMODE";
    }

    if (btn) {
        btn.addEventListener("click", function () {
            const body = document.body;
            const button = this;

            if (body.classList.contains("light-mode")) {
                body.classList.remove("light-mode");
                body.classList.add("dark-mode");
                button.textContent = "LIGHTMODE";
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove("dark-mode");
                body.classList.add("light-mode");
                button.textContent = "DARKMODE";
                localStorage.setItem('theme', 'light');
            }
        });
    }
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