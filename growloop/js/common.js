/**
 * common.js
 * Perilaku yang dipakai di semua halaman: menandai menu sidebar yang
 * sedang aktif berdasarkan nama file, dan toggle dropdown profil.
 */

document.addEventListener('DOMContentLoaded', () => {
    markActiveNavItem();
    setupProfileDropdown();
});

function markActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.nav-item').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
        }
    });
}

function setupProfileDropdown() {
    const profileButton = document.querySelector('.sidebar-profile');
    if (!profileButton) return;
    profileButton.addEventListener('click', () => {
        // Placeholder: di aplikasi nyata, ini akan membuka menu profil.
        profileButton.setAttribute('aria-expanded', profileButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
}
