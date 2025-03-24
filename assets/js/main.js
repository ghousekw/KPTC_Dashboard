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
        
        // Additional translation functions for previously missed elements
        translateAllHeadings(lang);
        translateChartTitles(lang);
        translateHeaderElements(lang);
        translateStatusElements(lang);
        translateAllSpans(lang);
        translateProcessFlow(lang);
        translateTableActions(lang);
        translateButtonsAndLinks(lang);
        
        // Force translation of any remaining text
        translateMobileScrollHint(lang);
        
        // Translate bottom sections
        translateQuickAccessShortcuts(lang);
        translateKPIElements(lang);
        translateBottomButtons(lang);
        translateMonthNames(lang);
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
    
    // New translation functions for additional elements
    function translateAllHeadings(lang) {
        // Translate all headings (h1-h6)
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            } else {
                el.textContent = getTranslation(el.textContent, lang);
            }
        });
        
        // Translate KPI titles
        document.querySelectorAll('.kpi-title, .kpi-target').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
        
        document.querySelectorAll('.kpi-status').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            } else {
                el.textContent = getTranslation(el.textContent, lang);
            }
        });
    }
    
    function translateChartTitles(lang) {
        // Chart titles
        document.querySelectorAll('.chart-title').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            } else {
                el.textContent = getTranslation(el.textContent, lang);
            }
        });
        
        // Chart placeholders
        document.querySelectorAll('.placeholder-img.chart p').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
    }
    
    function translateHeaderElements(lang) {
        // Header title
        const headerTitle = document.querySelector('.header-left h1');
        if (headerTitle) {
            const iconEl = headerTitle.querySelector('i');
            if (iconEl) {
                const text = headerTitle.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                headerTitle.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        }
        
        // User profile name
        const userProfileName = document.querySelector('.user-profile span');
        if (userProfileName) {
            userProfileName.textContent = getTranslation(userProfileName.textContent, lang);
        }
    }
    
    function translateStatusElements(lang) {
        // Translate all status indicators
        document.querySelectorAll('[class*="status-"]').forEach(el => {
            if (!el.classList.contains('status-badge')) {
                const iconEl = el.querySelector('i');
                if (iconEl) {
                    const text = el.textContent.replace(iconEl.textContent, '').trim();
                    if (text) {
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    }
                } else if (el.textContent.trim()) {
                    el.textContent = getTranslation(el.textContent.trim(), lang);
                }
            }
        });
        
        // Specifically target the status card sections that are visible in the screenshots
        const statusTexts = ['In Repair', 'Awaiting QC', 'Ready for Delivery', 'Parts Pending'];
        const statusDescriptions = ['Active repair jobs', 'Pending quality checks', 'Completed and ready', 'Waiting for parts'];
        
        // Process each status card title
        document.querySelectorAll('.stat-card-title').forEach(el => {
            // Skip processing if no text content
            if (!el.textContent.trim()) return;
            
            // For each known status text, check if this element contains it
            statusTexts.forEach(status => {
                if (el.textContent.includes(status)) {
                    const iconEl = el.querySelector('i');
                    if (iconEl) {
                        const text = el.textContent.replace(iconEl.textContent, '').trim();
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    } else {
                        el.textContent = getTranslation(el.textContent.trim(), lang);
                    }
                }
            });
        });
        
        // Process each status description
        document.querySelectorAll('.stat-card-total').forEach(el => {
            // Skip processing if no text content
            if (!el.textContent.trim()) return;
            
            // For each known description, check if this element contains it
            statusDescriptions.forEach(desc => {
                if (el.textContent.includes(desc)) {
                    const iconEl = el.querySelector('i');
                    if (iconEl) {
                        const text = el.textContent.replace(iconEl.textContent, '').trim();
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    } else {
                        el.textContent = getTranslation(el.textContent.trim(), lang);
                    }
                }
            });
        });
    }
    
    function translateAllSpans(lang) {
        // Translate various span elements containing text
        document.querySelectorAll('span:not(.badge)').forEach(el => {
            // Skip already translated or empty spans
            if (el.textContent.trim() && 
                !el.closest('.menu-item') && 
                !el.closest('.language-selector') && 
                !el.closest('.user-profile') &&
                !el.parentElement.classList.contains('status-badge')) {
                
                el.textContent = getTranslation(el.textContent.trim(), lang);
            }
        });
    }
    
    function translateProcessFlow(lang) {
        // Process flow elements
        document.querySelectorAll('.process-title').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
        
        document.querySelectorAll('.process-subtitle').forEach(el => {
            el.textContent = getTranslation(el.textContent, lang);
        });
    }
    
    function translateTableActions(lang) {
        // Table action buttons titles
        document.querySelectorAll('.table-button, .action-button').forEach(el => {
            if (el.title) {
                el.title = getTranslation(el.title, lang);
            }
        });
    }
    
    function translateButtonsAndLinks(lang) {
        // Translate all buttons with text
        document.querySelectorAll('button:not(.filter-button):not(.table-button):not(.action-button)').forEach(el => {
            if (el.textContent.trim()) {
                const iconEl = el.querySelector('i');
                if (iconEl) {
                    const text = el.textContent.replace(iconEl.textContent, '').trim();
                    if (text) {
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    }
                } else {
                    el.textContent = getTranslation(el.textContent.trim(), lang);
                }
            }
        });
        
        // Translate all anchor links with text
        document.querySelectorAll('a:not(.footer-link)').forEach(el => {
            if (el.textContent.trim()) {
                const iconEl = el.querySelector('i');
                if (iconEl) {
                    const text = el.textContent.replace(iconEl.textContent, '').trim();
                    if (text) {
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    }
                } else {
                    el.textContent = getTranslation(el.textContent.trim(), lang);
                }
            }
        });
    }
    
    function translateMobileScrollHint(lang) {
        // Mobile scroll hint
        const scrollHint = document.querySelector('.mobile-scroll-hint');
        if (scrollHint) {
            const iconEl = scrollHint.querySelector('i');
            if (iconEl) {
                const text = scrollHint.textContent.replace(iconEl.textContent, '').trim();
                const translatedText = getTranslation(text, lang);
                scrollHint.innerHTML = iconEl.outerHTML + ' ' + translatedText;
            }
        }
        
        // Pagination text
        document.querySelectorAll('.table-container > div').forEach(el => {
            if (el.textContent.includes('Showing')) {
                el.textContent = getTranslation(el.textContent.trim(), lang);
            }
        });
    }
    
    // New functions to handle bottom elements
    function translateQuickAccessShortcuts(lang) {
        // Translate quick access shortcuts section
        const shortcutsTitle = document.querySelector('.shortcuts-title');
        if (shortcutsTitle) {
            shortcutsTitle.textContent = getTranslation(shortcutsTitle.textContent.trim(), lang);
        }
        
        // Translate each shortcut
        document.querySelectorAll('.shortcut-item h3, .shortcut-item p').forEach(el => {
            el.textContent = getTranslation(el.textContent.trim(), lang);
        });
        
        // Translate action buttons in shortcuts
        document.querySelectorAll('.shortcut-item button, .shortcut-item .btn').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                if (text) {
                    const translatedText = getTranslation(text, lang);
                    el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                }
            } else if (el.textContent.trim()) {
                el.textContent = getTranslation(el.textContent.trim(), lang);
            }
        });
    }
    
    function translateKPIElements(lang) {
        // Translate KPI section title
        const kpiSectionTitle = document.querySelector('.kpi-section-title');
        if (kpiSectionTitle) {
            kpiSectionTitle.textContent = getTranslation(kpiSectionTitle.textContent.trim(), lang);
        }
        
        // Translate KPI card titles
        document.querySelectorAll('.kpi-card-title').forEach(el => {
            el.textContent = getTranslation(el.textContent.trim(), lang);
        });
        
        // Translate KPI values and percentages
        document.querySelectorAll('.kpi-value, .kpi-percentage').forEach(el => {
            if (el.textContent.includes('%')) {
                // Extract percentage and translate
                const percentage = el.textContent.trim();
                el.textContent = getTranslation(percentage, lang);
            } else if (el.textContent.includes('Days')) {
                // Extract days text and translate
                const daysText = el.textContent.trim();
                el.textContent = getTranslation(daysText, lang);
            }
        });
        
        // Translate KPI targets and comparisons
        document.querySelectorAll('.kpi-target, .kpi-comparison').forEach(el => {
            el.textContent = getTranslation(el.textContent.trim(), lang);
        });
        
        // Translate KPI status indicators
        document.querySelectorAll('.kpi-status').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                if (text) {
                    const translatedText = getTranslation(text, lang);
                    el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                }
            } else if (el.textContent.trim()) {
                el.textContent = getTranslation(el.textContent.trim(), lang);
            }
        });
    }
    
    function translateBottomButtons(lang) {
        // Translate bottom action buttons
        document.querySelectorAll('.action-btn, .report-btn, .create-btn').forEach(el => {
            const iconEl = el.querySelector('i');
            if (iconEl) {
                const text = el.textContent.replace(iconEl.textContent, '').trim();
                if (text) {
                    const translatedText = getTranslation(text, lang);
                    el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                }
            } else if (el.textContent.trim()) {
                el.textContent = getTranslation(el.textContent.trim(), lang);
            }
        });
        
        // Translate button descriptions
        document.querySelectorAll('.btn-desc, .btn-subtitle').forEach(el => {
            el.textContent = getTranslation(el.textContent.trim(), lang);
        });
        
        // Specifically handle quick access cards visible in the screenshots
        const quickAccessTitles = ['Generate Reports', 'Maintenance Alerts', 'Pending Approvals', 'Create New Job Order'];
        const quickAccessDescriptions = [
            'Download Reports', 
            'Critical maintenance needed', 
            'Requires your attention', 
            'Create New Job Order'
        ];
        const quickAccessLinks = [
            'View maintenance details',
            'View all pending approvals'
        ];
        
        // Process each quick access card title
        document.querySelectorAll('.stat-card-title').forEach(el => {
            // Skip processing if no text content
            if (!el.textContent.trim()) return;
            
            // For each known title, check if this element contains it
            quickAccessTitles.forEach(title => {
                if (el.textContent.includes(title)) {
                    const iconEl = el.querySelector('i');
                    if (iconEl) {
                        const text = el.textContent.replace(iconEl.textContent, '').trim();
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    } else {
                        el.textContent = getTranslation(el.textContent.trim(), lang);
                    }
                }
            });
        });
        
        // Process each quick access description
        document.querySelectorAll('.stat-card-total').forEach(el => {
            // Skip processing if no text content
            if (!el.textContent.trim()) return;
            
            // For each known description, check if this element contains it
            quickAccessDescriptions.forEach(desc => {
                if (el.textContent.includes(desc)) {
                    const iconEl = el.querySelector('i');
                    if (iconEl) {
                        const text = el.textContent.replace(iconEl.textContent, '').trim();
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    } else {
                        el.textContent = getTranslation(el.textContent.trim(), lang);
                    }
                }
            });
        });
        
        // Process each quick access link
        document.querySelectorAll('a').forEach(el => {
            // Skip processing if no text content
            if (!el.textContent.trim()) return;
            
            // For each known link text, check if this element contains it
            quickAccessLinks.forEach(link => {
                if (el.textContent.includes(link)) {
                    const iconEl = el.querySelector('i');
                    if (iconEl) {
                        const text = el.textContent.replace(iconEl.textContent, '').trim();
                        const translatedText = getTranslation(text, lang);
                        el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                    } else {
                        el.textContent = getTranslation(el.textContent.trim(), lang);
                    }
                }
            });
        });
        
        // Handle quick access buttons specifically by content
        document.querySelectorAll('.filter-button').forEach(el => {
            if (el.textContent.includes('Download Reports') || el.textContent.includes('Create New Job Order')) {
                const iconEl = el.querySelector('i');
                if (iconEl) {
                    const text = el.textContent.replace(iconEl.textContent, '').trim();
                    const translatedText = getTranslation(text, lang);
                    el.innerHTML = iconEl.outerHTML + ' ' + translatedText;
                } else {
                    el.textContent = getTranslation(el.textContent.trim(), lang);
                }
            }
        });
    }
    
    function translateMonthNames(lang) {
        // Translate month names in charts and date selectors
        document.querySelectorAll('.chart-axis-label, .date-label').forEach(el => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            months.forEach(month => {
                if (el.textContent.includes(month)) {
                    el.textContent = el.textContent.replace(month, getTranslation(month, lang));
                }
            });
        });
    }
}); 