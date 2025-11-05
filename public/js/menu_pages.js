// =========================================
// NAVIGATION MANAGER FOR SEPARATE PAGES
// =========================================

(function() {
    'use strict';

    // Initialize navigation on page load
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🧭 Navigation Manager Initialized');
        console.log('📍 Current Page:', CURRENT_PAGE);
        
        setupNavigationLinks();
        setupProfileDropdown();
    });

    // Setup all navigation links
    function setupNavigationLinks() {
        // View All Menus button (from dashboard)
        const viewAllMenusBtn = document.getElementById('viewAllMenusBtn');
        if (viewAllMenusBtn) {
            viewAllMenusBtn.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('all-menus');
            });
        }

        // View History link (from profile dropdown)
        const viewHistoryLink = document.getElementById('viewHistoryLink');
        if (viewHistoryLink) {
            viewHistoryLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('history');
            });
        }

        // Data Pribadi link (from profile dropdown)
        const profileLink = document.querySelector('a[href*="profile"]');
        if (profileLink && profileLink.closest('.profile-dropdown-menu')) {
            profileLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('profile');
            });
        }

        // Return to dashboard buttons (on each page)
        document.querySelectorAll('[id^="returnToMain"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo('dashboard');
            });
        });

        // Menu widget items (clickable menu cards)
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const linkUrl = this.getAttribute('data-link') || this.querySelector('a')?.getAttribute('href');
                if (linkUrl && linkUrl !== '#') {
                    navigateTo(linkUrl);
                }
            });
        });
    }

    // Setup profile dropdown
    function setupProfileDropdown() {
        const profileBtn = document.getElementById('profile-settings-btn');
        const profileMenu = document.getElementById('profile-dropdown-menu');
        const profileArrow = document.getElementById('profile-arrow-icon');

        if (profileBtn && profileMenu && profileArrow) {
            profileBtn.addEventListener('click', function(event) {
                const isShowing = profileMenu.classList.toggle('show');
                profileArrow.className = isShowing ? 'bx bxs-chevron-up' : 'bx bxs-chevron-down';
                event.stopPropagation();
            });

            window.addEventListener('click', function(event) {
                if (profileMenu.classList.contains('show') && !profileMenu.contains(event.target)) {
                    profileMenu.classList.remove('show');
                    profileArrow.className = 'bx bxs-chevron-down';
                }
            });
        }
    }

    // Navigate to different pages
    function navigateTo(page) {
        console.log('🚀 Navigating to:', page);
        
        // Clean up page name
        page = page.replace(/^\/+/, ''); // Remove leading slashes
        
        // Construct full URL
        let targetUrl = BASE_URL;
        
        switch(page) {
            case 'dashboard':
            case 'home':
                targetUrl += '/';
                break;
            case 'all-menus':
                targetUrl += '/all-menus';
                break;
            case 'history':
                targetUrl += '/history';
                break;
            case 'profile':
                targetUrl += '/profile';
                break;
            case 'presensi':
                targetUrl += '/presensi';
                break;
            case 'data-presensi':
                targetUrl += '/data-presensi';
                break;
            default:
                targetUrl += '/' + page;
        }
        
        // Navigate using window.location
        window.location.href = targetUrl;
    }

    // Expose navigation function globally
    window.navigateTo = navigateTo;

})();

// =========================================
// SEARCH FUNCTIONALITY FOR ALL MENUS PAGE
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('menuSearchInput');
    
    // Only run if we're on the all-menus page
    if (!searchInput || CURRENT_PAGE !== 'all-menus') return;

    const menuItems = document.querySelectorAll('.menu-item');
    const categorySections = document.querySelectorAll('.menu-category-section');
    const noResults = document.querySelector('.no-results');
    const menuCountSpan = document.getElementById('menuCount');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;
        let hasVisibleCategory = false;

        // Loop through each category section
        categorySections.forEach(section => {
            const categoryMenus = section.querySelectorAll('.menu-item');
            let categoryHasVisible = false;

            // Check each menu in this category
            categoryMenus.forEach(item => {
                const menuName = item.getAttribute('data-name');
                
                if (menuName.includes(searchTerm)) {
                    item.style.display = 'flex';
                    categoryHasVisible = true;
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide category based on if it has visible items
            if (categoryHasVisible) {
                section.style.display = 'block';
                hasVisibleCategory = true;
            } else {
                section.style.display = 'none';
            }
        });

        // Update count
        if (menuCountSpan) {
            menuCountSpan.textContent = visibleCount;
        }

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = hasVisibleCategory ? 'none' : 'block';
        }
    });

    // Clear search on ESC key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            this.dispatchEvent(new Event('input'));
            this.blur();
        }
    });
});