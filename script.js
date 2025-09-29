// All JavaScript removed as requested.
// Image paths to remember:
//   ./img/bg-img4-light.jpg
//   ./img/bg-img2-dark.jpg
//   ./logo.svg

document.addEventListener('DOMContentLoaded', () => {
	// Theme handling
	const body = document.body;
	const btn = document.getElementById('toggle-mode');

	function setTheme(mode) {
		if (mode === 'dark') {
			body.classList.add('dark-mode');
			body.classList.remove('light-mode');
			if (btn) { btn.textContent = 'LIGHTMODE'; btn.setAttribute('aria-pressed', 'true'); }
			localStorage.setItem('theme', 'dark');
		} else {
			body.classList.add('light-mode');
			body.classList.remove('dark-mode');
			if (btn) { btn.textContent = 'DARKMODE'; btn.setAttribute('aria-pressed', 'false'); }
			localStorage.setItem('theme', 'light');
		}
	}

	// init theme
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

	// Pane navigation
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	const panes = Array.from(document.querySelectorAll('.pane'));

	function showPane(id) {
		panes.forEach(p => p.classList.toggle('active', p.id === id));
		navLinks.forEach(a => a.classList.toggle('active', (a.dataset.target === id)));
		// update hash without scrolling
		history.replaceState(null, '', '#' + id);
	}

	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const id = link.dataset.target || (link.getAttribute('href') || '').replace('#','') || 'home';
			showPane(id);
		});
	});

	// initial pane from hash or default to home
	const initial = (location.hash || '#home').replace('#','') || 'home';
	showPane(initial);

	// Mobile drawer logic
	const mobileBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileToggle = document.getElementById('mobile-toggle'); // button inside drawer

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

		// close on outside click
		document.addEventListener('click', (e) => {
			if (!mobileMenu.classList.contains('open')) return;
			if (mobileMenu.contains(e.target) || mobileBtn.contains(e.target)) return;
			setMenu(false);
		});

		// close on Escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
				setMenu(false);
				mobileBtn.focus();
			}
		});

		// close drawer when a nav link inside is clicked (and navigate)
		mobileMenu.addEventListener('click', (e) => {
			const a = e.target.closest('a.nav-link');
			if (a) {
				// allow pane handler to run (already attached to .nav-link), then close drawer
				setTimeout(() => setMenu(false), 150);
			}
		});
	}

	// Wire mobile theme toggle to the same theme logic
	if (mobileToggle) {
		mobileToggle.addEventListener('click', () => {
			// reuse desktop toggle behavior: toggle based on body class
			const isDark = document.body.classList.contains('dark-mode');
			// trigger the same setTheme function defined earlier
			// find desktop button to reuse text update and persistence
			const desktopBtn = document.getElementById('toggle-mode');
			// call the same logic by simulating click on desktop button if exists
			if (desktopBtn) desktopBtn.click();
			else {
				// fallback: directly toggle classes and localStorage
				if (isDark) {
					document.body.classList.remove('dark-mode');
					document.body.classList.add('light-mode');
					mobileToggle.textContent = 'DARKMODE';
					localStorage.setItem('theme', 'light');
				} else {
					document.body.classList.remove('light-mode');
					document.body.classList.add('dark-mode');
					mobileToggle.textContent = 'LIGHTMODE';
					localStorage.setItem('theme', 'dark');
				}
			}
		});
	}
});