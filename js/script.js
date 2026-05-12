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

// Modal Logic
const modal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalTech = document.getElementById('modal-tech');
const modalDesc = document.getElementById('modal-desc');
const modalBtns = document.getElementById('modal-btns');

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent modal opening if clicking on a button inside the card
        if (e.target.closest('.btn')) return;

        const img = card.querySelector('.project-img').src;
        const title = card.querySelector('.project-title').textContent;
        const extendedDesc = card.querySelector('.project-extended');
        const desc = extendedDesc ? extendedDesc.innerHTML : card.querySelector('.project-desc').innerHTML;
        const tech = card.querySelector('.project-tech').innerHTML;
        const btns = card.querySelector('.project-btns').innerHTML;

        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.innerHTML = desc;
        modalTech.innerHTML = tech;
        modalBtns.innerHTML = btns;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    // Clear content after animation to stop videos from playing
    setTimeout(() => {
        if (!modal.classList.contains('open')) {
            modalImg.src = '';
            modalTitle.textContent = '';
            modalDesc.innerHTML = '';
            modalTech.innerHTML = '';
            modalBtns.innerHTML = '';
        }
    }, 300);
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});
