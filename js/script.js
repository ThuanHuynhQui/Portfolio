// Smooth scroll with easing interpolation
function navigateToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    
    const start = window.scrollY;
    const end = target.offsetTop - 68; // Offset for fixed nav
    const distance = end - start;
    const duration = 800; // milliseconds
    let startTime = null;
    
    // Easing function (ease-in-out cubic)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function scroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        
        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }
    
    requestAnimationFrame(scroll);
}

// Active nav highlight on scroll
const sections = ['home', 'projects', 'contact'];
const navBtns = document.querySelectorAll('.nav-btn');

function updateNav() {
    let current = 'home';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navBtns.forEach((btn, i) => {
        btn.classList.toggle('active', sections[i] === current);
    });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, {threshold: 0.12});

reveals.forEach(el => observer.observe(el));

window.addEventListener('scroll', updateNav, {passive: true});
updateNav();
