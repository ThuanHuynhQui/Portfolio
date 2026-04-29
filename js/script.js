// Smooth scroll
function navigateToSection(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
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
