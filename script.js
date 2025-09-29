// All JavaScript removed as requested.
// Image paths to remember:
//   ./img/bg-img4-light.jpg
//   ./img/bg-img2-dark.jpg
//   ./logo.svg
document.addEventListener('DOMContentLoaded', () => {
	const body = document.body;
	const btn = document.getElementById('toggle-mode');
	const navLinks = Array.from(document.querySelectorAll('.nav-link'));
	const panes = Array.from(document.querySelectorAll('.pane'));

	function setTheme(mode){
		if(mode==='dark'){
			body.classList.add('dark-mode');body.classList.remove('light-mode');
			if(btn){btn.textContent='LIGHTMODE';btn.setAttribute('aria-pressed','true')}
			localStorage.setItem('theme','dark');
		}else{
			body.classList.add('light-mode');body.classList.remove('dark-mode');
			if(btn){btn.textContent='DARKMODE';btn.setAttribute('aria-pressed','false')}
			localStorage.setItem('theme','light');
		}
	}

	// init theme
	const saved = localStorage.getItem('theme');
	if(saved==='dark' || saved==='light') setTheme(saved);
	else setTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

	if(btn) btn.addEventListener('click', ()=> setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark'));

	function showPane(id){
		panes.forEach(p => p.classList.toggle('active', p.id===id));
		navLinks.forEach(a => a.classList.toggle('active', (a.dataset.target===id)));
		history.replaceState(null,'','#'+id);
	}

	navLinks.forEach(link=>{
		link.addEventListener('click', e=>{
			e.preventDefault();
			const id = link.dataset.target || (link.getAttribute('href')||'').replace('#','') || 'home';
			showPane(id);
		});
	});

	// initial pane
	const initial = (location.hash || '#home').replace('#','') || 'home';
	showPane(initial);

	// mobile drawer controls
	const mobileBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileToggle = document.getElementById('mobile-toggle');

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

		// close when clicking outside
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

		// close drawer when a link inside is clicked (pane handler will run separately)
		mobileMenu.addEventListener('click', (e) => {
			const a = e.target.closest('a.nav-link');
			if (a) setTimeout(() => setMenu(false), 120);
		});
	}

	// mobile theme toggle should reuse desktop toggle behavior
	if (mobileToggle) {
		mobileToggle.addEventListener('click', () => {
			const desktopBtn = document.getElementById('toggle-mode');
			if (desktopBtn) desktopBtn.click();
			else {
				// fallback: toggle classes directly
				const isDark = document.body.classList.contains('dark-mode');
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