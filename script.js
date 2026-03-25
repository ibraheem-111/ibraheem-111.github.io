// ===== ACCESSIBILITY & USER PREFERENCES =====

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===== SIDEBAR ELEMENTS =====

const sidebar = document.getElementById('sidebar');
const sidebarToggleDesktop = document.getElementById('sidebarToggle');
const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const STORAGE_KEY = 'sidebarCollapsed';
let isMobile = window.innerWidth <= 768;

// ===== SIDEBAR STATE MANAGEMENT =====

function initializeSidebar() {
    if (!sidebar) {
        return;
    }

    if (!isMobile) {
        const isCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';
        sidebar.classList.toggle('collapsed', isCollapsed);
    }
}

function closeMobileSidebar() {
    if (!sidebar || !sidebarOverlay || !sidebarToggleMobile) {
        return;
    }

    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    sidebarToggleMobile.classList.remove('active');
    sidebarToggleMobile.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
}

if (sidebarToggleDesktop && sidebar) {
    sidebarToggleDesktop.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem(STORAGE_KEY, String(isCollapsed));
        sidebarToggleDesktop.setAttribute('aria-expanded', String(!isCollapsed));
    });
}

if (sidebarToggleMobile && sidebar && sidebarOverlay) {
    sidebarToggleMobile.addEventListener('click', () => {
        const isActive = sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active', isActive);
        sidebarToggleMobile.classList.toggle('active', isActive);
        sidebarToggleMobile.setAttribute('aria-expanded', String(isActive));
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
}

sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (isMobile) {
            closeMobileSidebar();
        }
    });
});

// ===== RESPONSIVE HANDLING =====

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;

        if (wasMobile && !isMobile) {
            closeMobileSidebar();
            initializeSidebar();
        }

        if (!wasMobile && isMobile && sidebar) {
            sidebar.classList.remove('collapsed');
        }
    }, 250);
});

// ===== OPTIONAL IN-PAGE SMOOTH SCROLL =====

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetSelector = anchor.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

// ===== KEYBOARD SUPPORT =====

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        closeMobileSidebar();
    }
});

// ===== INITIALIZE =====

initializeSidebar();
