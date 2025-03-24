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

    // Language switching functionality
    let currentLang = localStorage.getItem('kptc_lang') || 'en';
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    if (currentLang === 'ar') {
        document.body.classList.add('rtl-layout');
    }

    // Initialize language on page load
    applyLanguage(currentLang);
    
    // Language selector event
    const langSelector = document.querySelector('.language-selector');
    if (langSelector) {
        langSelector.addEventListener('click', () => {
            // Toggle language
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            
            // Save language preference
            localStorage.setItem('kptc_lang', currentLang);
            
            // Apply new language
            applyLanguage(currentLang);
            
            // Set document direction
            document.documentElement.setAttribute('lang', currentLang);
            document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            
            // Toggle RTL class
            if (currentLang === 'ar') {
                document.body.classList.add('rtl-layout');
            } else {
                document.body.classList.remove('rtl-layout');
            }
        });
    }
    
    // Function to apply translations to the page
    function applyLanguage(lang) {
        const translatableElements = document.querySelectorAll('[data-translate]');
        
        // Update all elements with data-translate attribute
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (key) {
                el.textContent = getTranslation(key, lang);
            }
        });
        
        // Update language selector text
        const langText = document.querySelector('.language-selector span');
        if (langText) {
            langText.textContent = getTranslation('Arabic', lang);
        }
        
        // Add more specific translations for placeholder text, alt text, etc.
        document.querySelectorAll('input[placeholder][data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            el.placeholder = getTranslation(key, lang);
        });
        
        // For elements without data-translate attribute, we'll handle them directly
        translateMenuItems(lang);
        translateStatCards(lang);
        translateTableHeaders(lang);
        translateFilterSection(lang);
        translateFooter(lang);
    }
    
    // Helper functions to translate specific sections
    function translateMenuItems(lang) {
        document.querySelectorAll('.menu-item span').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
    }
    
    function translateStatCards(lang) {
        document.querySelectorAll('.stat-card-title').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
        
        document.querySelectorAll('.stat-card-total').forEach(el => {
            const iconEl = el.querySelector('i');
            const textContent = el.textContent.trim();
            if (iconEl) {
                const iconHTML = iconEl.outerHTML;
                el.innerHTML = iconHTML + ' ' + getTranslation(textContent, lang);
            }
        });
    }
    
    function translateTableHeaders(lang) {
        document.querySelectorAll('th').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            } else {
                el.textContent = getTranslation(el.textContent, lang);
            }
        });
        
        document.querySelectorAll('.table-title').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
        
        document.querySelectorAll('.status-badge').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
    }
    
    function translateFilterSection(lang) {
        document.querySelectorAll('.filter-title').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
        
        document.querySelectorAll('.filter-label').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
        
        document.querySelectorAll('.filter-button').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
        
        document.querySelectorAll('option').forEach(el => {
            if (el.value === '') {
                el.textContent = getTranslation('All', lang);
            } else {
                el.textContent = getTranslation(el.textContent, lang);
            }
        });
    }
    
    function translateFooter(lang) {
        // Footer copyright text
        const footerText = document.querySelector('.footer > div:first-child');
        if (footerText) {
            footerText.textContent = getTranslation(footerText.textContent, lang);
        }
        
        // Footer links
        document.querySelectorAll('.footer-link').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        });
    }
}); 