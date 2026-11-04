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
    if (typeof particlesJS === 'function') particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": (window.matchMedia("(max-width: 768px)").matches ? 28 : 80),
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
                "enable": !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
    '<a href="contact.html" aria-label="Contact me"><i class="fas fa-envelope"></i></a>';
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


// ---------------------------------------------------------------------
// Site configuration. Flip selfHosted to true once this site is served
// from the Proxmox server; add the Uptime Kuma public status page URL.
// ---------------------------------------------------------------------
const SITE_CONFIG = {
    selfHosted: false,
    statusPageUrl: ''
};

(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ----- Theme toggle -----
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const actions = document.createElement('div');
        actions.className = 'nav-actions';
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'theme-toggle';
        const root = document.documentElement;
        const paint = () => {
            const light = root.getAttribute('data-theme') === 'light';
            toggle.innerHTML = light ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
        };
        toggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            paint();
        });
        paint();
        actions.appendChild(toggle);
        const hb = document.getElementById('hamburger');
        navbar.insertBefore(actions, hb);
    }

    // ----- Reveal email (kept out of the page source) -----
    document.querySelectorAll('.reveal-email').forEach(btn => {
        btn.addEventListener('click', () => {
            const addr = btn.dataset.u + '@' + btn.dataset.d;
            const a = document.createElement('a');
            a.href = 'mailto:' + addr;
            a.textContent = addr;
            btn.replaceWith(a);
        });
    });

    // ----- CV download button: shown only when the file exists -----
    const cv = document.getElementById('cv-btn');
    if (cv && location.protocol.startsWith('http')) {
        fetch(cv.getAttribute('href'), { method: 'HEAD' })
            .then(r => { if (r.ok) cv.hidden = false; })
            .catch(() => {});
    }

    // ----- Count-up numbers -----
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (nums.length) {
        const run = (el) => {
            const target = parseFloat(el.dataset.count);
            const dec = parseInt(el.dataset.decimals || '0', 10);
            const suffix = el.dataset.suffix || '';
            if (reduceMotion) { el.textContent = target.toFixed(dec) + suffix; return; }
            const start = performance.now();
            const dur = 1400;
            const tick = (now) => {
                const p = Math.min(1, (now - start) / dur);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = (target * eased).toFixed(dec) + suffix;
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
            }, { threshold: 0.6 });
            nums.forEach(n => io.observe(n));
        }
    }

    // ----- Terminal typing -----
    const term = document.getElementById('terminal-body');
    if (term && !reduceMotion && 'IntersectionObserver' in window) {
        const lines = Array.from(term.querySelectorAll('.t-line'));
        const texts = lines.map(l => l.textContent);
        lines.forEach(l => { l.textContent = ''; l.style.visibility = 'hidden'; });
        const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        const play = async () => {
            for (let i = 0; i < lines.length; i++) {
                const l = lines[i];
                l.style.visibility = 'visible';
                l.classList.add('t-caret');
                if (l.classList.contains('t-cmd')) {
                    for (const ch of texts[i]) { l.textContent += ch; await sleep(45); }
                    await sleep(250);
                } else {
                    l.textContent = texts[i];
                    await sleep(450);
                }
                l.classList.remove('t-caret');
            }
        };
        const tio = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { tio.disconnect(); play(); }
        }, { threshold: 0.5 });
        tio.observe(term);
    }

    // ----- Diagrams: show details for the selected block -----
    document.querySelectorAll('figure.diagram').forEach(fig => {
        const info = fig.querySelector('.dg-info');
        const nodes = fig.querySelectorAll('.dg-node');
        const show = (n) => {
            nodes.forEach(x => x.classList.toggle('is-active', x === n));
            info.innerHTML = '<strong></strong><span></span>';
            info.querySelector('strong').textContent = n.dataset.title;
            info.querySelector('span').textContent = n.dataset.text;
        };
        nodes.forEach(n => {
            n.addEventListener('mouseenter', () => show(n));
            n.addEventListener('focus', () => show(n));
            n.addEventListener('click', () => show(n));
        });
    });

    // ----- Self-hosted badge -----
    if (SITE_CONFIG.selfHosted) {
        const bottom = document.querySelector('.footer-bottom');
        if (bottom) {
            const el = document.createElement(SITE_CONFIG.statusPageUrl ? 'a' : 'p');
            el.className = 'hosted-badge';
            if (SITE_CONFIG.statusPageUrl) { el.href = SITE_CONFIG.statusPageUrl; el.target = '_blank'; el.rel = 'noopener'; }
            el.innerHTML = '<span class="pulse"></span> Served from my Proxmox home lab' + (SITE_CONFIG.statusPageUrl ? ' | live status' : '');
            bottom.appendChild(el);
        }
    }
})();
