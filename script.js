// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const yearSpan = document.getElementById('year');

// Initialize Particle.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    yearSpan.textContent = new Date().getFullYear();
    
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#3498db"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3498db",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Add scroll animation to elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Mobile menu (slide-in drawer)
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

const navSocial = document.createElement('li');
navSocial.className = 'nav-item nav-social';
navSocial.innerHTML =
    '<a href="https://www.linkedin.com/in/teboho-motholo-2589ba160" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>' +
    '<a href="https://github.com/TebohoMotholo" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>' +
    '<a href="mailto:motholoteboho@yahoo.com" aria-label="Email"><i class="fas fa-envelope"></i></a>';
navMenu.appendChild(navSocial);

hamburger.setAttribute('role', 'button');
hamburger.setAttribute('tabindex', '0');
hamburger.setAttribute('aria-label', 'Toggle menu');
hamburger.setAttribute('aria-controls', 'nav-menu');
hamburger.setAttribute('aria-expanded', 'false');

function setMenu(open) {
    hamburger.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    navOverlay.classList.toggle('active', open);
    document.body.classList.toggle('menu-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setMenu(!navMenu.classList.contains('active'));
    }
});
navOverlay.addEventListener('click', () => setMenu(false));
navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) setMenu(false);
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skills on scroll into view
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        const progress = skill.querySelector('.progress');
        const progressText = progress.querySelector('.progress-text');
        const targetWidth = parseFloat(getComputedStyle(progress).getPropertyValue('--progress-width'));

        progress.style.width = '0%';
        progressText.textContent = '0%';

        let currentWidth = 0;
        const interval = setInterval(() => {
            if (currentWidth >= targetWidth) {
                clearInterval(interval);
            } else {
                currentWidth++;
                progress.style.width = currentWidth + '%';
                progressText.textContent = currentWidth + '%';
            }
        }, 50);
    });
}

// Detect scroll into view
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight - 100 && rect.bottom >= 0
    );
}

function triggerSkillAnimationOnce() {
    const skillSection = document.querySelector('#skills');
    if (isInViewport(skillSection) && !skillSection.classList.contains('animated')) {
        skillSection.classList.add('animated');
        animateSkills();
    }
}

window.addEventListener('scroll', triggerSkillAnimationOnce);
window.addEventListener('load', triggerSkillAnimationOnce);

function toggleDetails(entry) {
    const isActive = entry.classList.contains("active");

    // Collapse all other entries
    document.querySelectorAll('.job-entry').forEach(e => {
        if (e !== entry) e.classList.remove("active");
    });

    // Toggle clicked entry
    entry.classList.toggle("active", !isActive);
}

// Document viewer for qualification and certificate files
(function () {
    const buttons = document.querySelectorAll('.view-btn');
    if (!buttons.length) return;

    // Hide a View button when its file has not been uploaded yet (only checkable over http/https)
    if (location.protocol.startsWith('http')) {
        buttons.forEach(btn => {
            fetch(btn.dataset.file, { method: 'HEAD' })
                .then(r => { if (!r.ok) btn.hidden = true; })
                .catch(() => {});
        });
    }

    const modal = document.createElement('div');
    modal.className = 'doc-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'doc-modal-title');
    modal.innerHTML =
        '<div class="doc-modal-box">' +
        '<div class="doc-modal-head"><h3 id="doc-modal-title"></h3>' +
        '<div class="doc-modal-actions"><a class="doc-open" target="_blank" rel="noopener">Open in new tab</a>' +
        '<button type="button" class="doc-close" aria-label="Close">&times;</button></div></div>' +
        '<div class="doc-modal-body"></div></div>';
    document.body.appendChild(modal);

    const titleEl = modal.querySelector('#doc-modal-title');
    const bodyEl = modal.querySelector('.doc-modal-body');
    const openEl = modal.querySelector('.doc-open');
    const closeBtn = modal.querySelector('.doc-close');
    let lastFocus = null;

    function openDoc(btn) {
        const file = btn.dataset.file;
        const title = btn.dataset.title || 'Document';
        lastFocus = btn;
        titleEl.textContent = title;
        openEl.href = file;
        bodyEl.innerHTML = '';
        if (/\.pdf($|\?)/i.test(file)) {
            const obj = document.createElement('object');
            obj.data = file;
            obj.type = 'application/pdf';
            const fb = document.createElement('div');
            fb.className = 'doc-fallback';
            fb.innerHTML = '<p>Your browser cannot show this PDF here.</p><p><a target="_blank" rel="noopener">Open the PDF</a></p>';
            fb.querySelector('a').href = file;
            obj.appendChild(fb);
            bodyEl.appendChild(obj);
        } else {
            const im = document.createElement('img');
            im.src = file;
            im.alt = title;
            im.onerror = () => { bodyEl.innerHTML = '<div class="doc-fallback"><p>This document could not be loaded.</p></div>'; };
            bodyEl.appendChild(im);
        }
        modal.hidden = false;
        document.body.classList.add('modal-open');
        closeBtn.focus();
    }

    function closeDoc() {
        modal.hidden = true;
        bodyEl.innerHTML = '';
        document.body.classList.remove('modal-open');
        if (lastFocus) lastFocus.focus();
    }

    buttons.forEach(btn => btn.addEventListener('click', () => openDoc(btn)));
    closeBtn.addEventListener('click', closeDoc);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeDoc(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeDoc(); });
})();

const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Thanks for your message!");
            form.reset();
        } else {
            alert("Oops! Something went wrong. Try again.");
        }
    });
});
