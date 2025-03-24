// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu button (only visible on mobile)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    // Responsive behavior
    function handleWindowResize() {
        const isDesktop = window.innerWidth > 768;
        
        if (isDesktop) {
            // On desktop, ensure sidebar is visible and reset mobile view
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            if (mobileMenuBtn) {
                // Force hide the mobile menu button with important flag on desktop
                mobileMenuBtn.style.display = 'none !important';
                // Add a class to apply !important via CSS
                mobileMenuBtn.classList.remove('mobile-visible');
            }
        } else {
            // On mobile, show the menu button
            if (mobileMenuBtn) {
                mobileMenuBtn.style.display = 'flex';
                // Add a class to control visibility via CSS
                mobileMenuBtn.classList.add('mobile-visible');
            }
        }
    }
    
    // Run on page load
    handleWindowResize();
    
    // Add window resize listener
    window.addEventListener('resize', handleWindowResize);
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
    }
    
    // Overlay click to close sidebar
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Close sidebar with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }
    });
}); 