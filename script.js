// initialize theme, drawer and pane navigation in one DOMContentLoaded handler
document.addEventListener('DOMContentLoaded', () => {
	// Theme toggle
	const body = document.body;
	const btn = document.getElementById('toggle-mode');
	function setTheme(mode) {
		if (mode === 'dark') {
			body.classList.add('dark-mode');
			body.classList.remove('light-mode');
			if (btn) btn.textContent = 'LIGHTMODE';
			localStorage.setItem('theme', 'dark');
		} else {
			body.classList.add('light-mode');
			body.classList.remove('dark-mode');
			if (btn) btn.textContent = 'DARKMODE';
			localStorage.setItem('theme', 'light');
		}
	}
	const saved = localStorage.getItem('theme');
	if (saved === 'dark' || saved === 'light') setTheme(saved);
	else {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		setTheme(prefersDark ? 'dark' : 'light');
	}
	if (btn) {
		btn.addEventListener('click', () => {
			setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
		});
	}

	// Drawer (mobile menu)
	const mobileBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	function setMenu(open) {
		if (!mobileMenu || !mobileBtn) return;
		mobileMenu.classList.toggle('open', open);
		mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
		mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
	}
	if (mobileBtn && mobileMenu) {
		mobileBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			setMenu(!mobileMenu.classList.contains('open'));
		});
		mobileMenu.addEventListener('click', (e) => {
			const target = e.target;
			if (target && target.matches('a.nav-link')) {
				// close after navigation
				setTimeout(() => setMenu(false), 200);
			}
		});
		document.addEventListener('click', (e) => {
			if (!mobileMenu.classList.contains('open')) return;
			if (mobileMenu.contains(e.target) || mobileBtn.contains(e.target)) return;
			setMenu(false);
		});
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
				setMenu(false);
				mobileBtn.focus();
			}
		});
	}

	// Panes: show only one pane at a time
	const panes = Array.from(document.querySelectorAll('.pane'));
	const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
	const singleSection = document.getElementById('single-section');
	const container = document.querySelector('.snap-container');

	if (panes.length && navLinks.length && singleSection) {
		function showPane(id, updateHash = true) {
			panes.forEach(p => p.classList.toggle('active', p.id === id));
			navLinks.forEach(a => {
				const target = (a.getAttribute('href') || '').replace('#', '');
				a.classList.toggle('active', target === id);
			});
			if (updateHash) history.replaceState(null, '', '#' + id);
			// scroll single-section into view (if using the snap container)
			if (container) {
				const offset = singleSection.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
				container.scrollTo({ top: offset, behavior: 'smooth' });
			} else {
				singleSection.scrollIntoView({ behavior: 'smooth' });
			}
		}

		navLinks.forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const id = (link.getAttribute('href') || '').replace('#', '') || 'home';
				showPane(id);
			});
		});

		// Initialize from hash (default home)
		const initial = (location.hash || '#home').replace('#', '') || 'home';
		setTimeout(() => showPane(initial, false), 30);
	}
});