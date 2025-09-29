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
});