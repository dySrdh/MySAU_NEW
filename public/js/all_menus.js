// Search functionality for All Menus Page
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('menuSearchInput');
    const menuItems = document.querySelectorAll('.menu-item');
    const categorySections = document.querySelectorAll('.menu-category-section');
    const noResults = document.querySelector('.no-results');
    const menuCountSpan = document.getElementById('menuCount');

    if (!searchInput) return; // Exit if not on all menus page

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
        menuCountSpan.textContent = visibleCount;

        // Show/hide no results message
        if (!hasVisibleCategory) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
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