// ===== SIDEBAR NAVIGATION =====

const sidebar = document.getElementById('sidebar');
const sidebarToggleDesktop = document.getElementById('sidebarToggle');
const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const STORAGE_KEY = 'sidebarCollapsed';
let isMobile = window.innerWidth <= 768;

// Initialize sidebar state from localStorage (desktop only)
function initializeSidebar() {
    if (!isMobile) {
        const isCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
        }
    }
}

// Desktop toggle
if (sidebarToggleDesktop) {
    sidebarToggleDesktop.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem(STORAGE_KEY, isCollapsed);
        sidebarToggleDesktop.setAttribute('aria-expanded', !isCollapsed);
    });
}

// Mobile toggle
if (sidebarToggleMobile) {
    sidebarToggleMobile.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        sidebarToggleMobile.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        sidebarToggleMobile.setAttribute('aria-expanded', isActive);
    });
}

// Close sidebar on overlay click
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        sidebarToggleMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
        sidebarToggleMobile.setAttribute('aria-expanded', false);
    });
}

// Close sidebar on link click (mobile)
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            sidebarToggleMobile.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        // Update active state
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        if (wasMobile && !isMobile) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            sidebarToggleMobile.classList.remove('active');
            document.body.style.overflow = 'auto';
            initializeSidebar();
        }

        if (!wasMobile && isMobile) {
            sidebar.classList.remove('collapsed');
        }
    }, 250);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active link on scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

let scrollTimer;
window.addEventListener('scroll', () => {
    if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
            updateActiveLink();
            scrollTimer = null;
        }, 100);
    }
});

// Escape key closes mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        sidebarToggleMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Initialize
initializeSidebar();
updateActiveLink();

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
}); 