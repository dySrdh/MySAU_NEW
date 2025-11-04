// =========================================
// PAGE NAVIGATION SYSTEM
// =========================================

// DOM Elements
const mainDashboardContent = document.getElementById('mainDashboardContent');
const allMenusPageContent = document.getElementById('allMenusPageContent');
const historyPageContent = document.getElementById('historyPageContent');
const profilePageContent = document.getElementById('profilePageContent');
const presensiPageContent = document.getElementById('presensiPageContent');
const dataPresensiPageContent = document.getElementById('dataPresensiPageContent');

// Get base URL - remove trailing slash if exists
const getCleanBaseURL = () => {
    if (typeof BASE_URL === 'undefined') {
        console.error('BASE_URL not defined!');
        return window.location.origin + '/';
    }
    return BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
};

// =========================================
// HIDE ALL PAGES
// =========================================
function hideAllPages() {
    if (mainDashboardContent) mainDashboardContent.style.display = 'none';
    if (allMenusPageContent) allMenusPageContent.style.display = 'none';
    if (historyPageContent) historyPageContent.style.display = 'none';
    if (profilePageContent) profilePageContent.style.display = 'none';
    if (presensiPageContent) presensiPageContent.style.display = 'none';
    if (dataPresensiPageContent) dataPresensiPageContent.style.display = 'none';
}

// =========================================
// PAGE NAVIGATION FUNCTIONS
// =========================================

function showDashboard() {
    console.log('📍 Navigating to: Dashboard');
    hideAllPages();
    if (mainDashboardContent) mainDashboardContent.style.display = 'contents';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'home' }, 'Dashboard', baseURL);
    updatePageState('home');
}

function showAllMenusPage() {
    console.log('📍 Navigating to: All Menus');
    hideAllPages();
    if (allMenusPageContent) allMenusPageContent.style.display = 'contents';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'menus' }, 'All Menus', `${baseURL}menus`);
    updatePageState('menus');
    
    // Render menus
    renderAllMenusCards();
}

function showHistoryPage() {
    console.log('📍 Navigating to: Task History');
    hideAllPages();
    if (historyPageContent) historyPageContent.style.display = 'flex';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'history' }, 'Task History', `${baseURL}tasks/history`);
    updatePageState('history');
    
    if (typeof loadHistoryTasks === 'function') {
        loadHistoryTasks();
    }
}

function showProfilePage() {
    console.log('📍 Navigating to: Profile');
    hideAllPages();
    if (profilePageContent) profilePageContent.style.display = 'flex';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'profile' }, 'Data Pribadi', `${baseURL}profile`);
    updatePageState('profile');
    
    if (typeof window.initProfilePage === 'function') {
        window.initProfilePage();
    }
}

function showPresensiPage() {
    console.log('📍 Navigating to: Presensi');
    hideAllPages();
    if (presensiPageContent) presensiPageContent.style.display = 'flex';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'presensi' }, 'Presensi Online', `${baseURL}presensi`);
    updatePageState('presensi');
    
    if (typeof window.initPresensiPage === 'function') {
        window.initPresensiPage();
    }
}

function showDataPresensiPage() {
    console.log('📍 Navigating to: Data Presensi');
    hideAllPages();
    if (dataPresensiPageContent) dataPresensiPageContent.style.display = 'flex';
    
    const baseURL = getCleanBaseURL();
    window.history.pushState({ page: 'data-presensi' }, 'Data Presensi', `${baseURL}data-presensi`);
    updatePageState('data-presensi');
    
    if (typeof window.initDataPresensiPage === 'function') {
        window.initDataPresensiPage();
    }
}

// =========================================
// RENDER ALL MENUS CARDS
// =========================================

function renderAllMenusCards() {
    console.log('🎨 Rendering All Menus Cards...');
    
    if (typeof ALL_MENUS_DATA === 'undefined' || !ALL_MENUS_DATA || ALL_MENUS_DATA.length === 0) {
        console.error('❌ ALL_MENUS_DATA not defined or empty!');
        const container = document.getElementById('menusContentContainer');
        if (container) {
            container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 40px;">No menus available</p>';
        }
        return;
    }

    console.log('📊 Found', ALL_MENUS_DATA.length, 'menus');

    // Group menus by category
    const menusByCategory = {};
    ALL_MENUS_DATA.forEach(menu => {
        const category = menu.category || 'Uncategorized';
        if (!menusByCategory[category]) {
            menusByCategory[category] = [];
        }
        menusByCategory[category].push(menu);
    });

    console.log('📁 Categories:', Object.keys(menusByCategory));

    const container = document.getElementById('menusContentContainer');
    if (!container) {
        console.error('❌ menusContentContainer not found!');
        return;
    }

    container.innerHTML = '';

    // Render each category
    Object.keys(menusByCategory).forEach(category => {
        console.log(`  📂 Rendering category: ${category} (${menusByCategory[category].length} items)`);
        
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category-section';
        
        const categoryTitleDiv = document.createElement('div');
        categoryTitleDiv.className = 'category-title';
        
        const categoryIcon = document.createElement('i');
        categoryIcon.className = 'bx bxs-category';
        categoryTitleDiv.appendChild(categoryIcon);
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryTitleDiv.appendChild(categoryTitle);
        
        categorySection.appendChild(categoryTitleDiv);
        
        const menuGrid = document.createElement('div');
        menuGrid.className = 'menu-grid';
        
        // Render each menu item
        menusByCategory[category].forEach(menu => {
            const menuItem = document.createElement('a');
            menuItem.className = 'menu-item';
            menuItem.href = '#';
            menuItem.setAttribute('data-menu-url', menu.link_url);
            menuItem.innerHTML = `
                <i class="${menu.icon_class}"></i>
                <span>${menu.name}</span>
            `;
            
            // Add click event
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔵 Menu clicked:', menu.name, '→', menu.link_url);
                handleMenuNavigation(menu.link_url);
            });
            
            menuGrid.appendChild(menuItem);
        });
        
        categorySection.appendChild(menuGrid);
        container.appendChild(categorySection);
    });

    console.log('✅ All menus rendered successfully!');
}

// =========================================
// HANDLE MENU NAVIGATION
// =========================================
function handleMenuNavigation(menuUrl) {
    console.log('🔵 Navigating to:', menuUrl);
    
    switch(menuUrl) {
        case 'profile':
            showProfilePage();
            break;
        case 'presensi':
            showPresensiPage();
            break;
        case 'data-presensi':
            showDataPresensiPage();
            break;
        case 'history':
            showHistoryPage();
            break;
        default:
            alert(`Menu "${menuUrl}" belum tersedia`);
            break;
    }
}

// =========================================
// UPDATE PAGE STATE
// =========================================

function updatePageState(page) {
    console.log('✅ Current page:', page);
    document.body.setAttribute('data-page', page);
}

// =========================================
// HANDLE BROWSER BACK/FORWARD
// =========================================

window.addEventListener('popstate', (event) => {
    console.log('🔙 Browser navigation detected', event.state);
    
    if (event.state && event.state.page) {
        const page = event.state.page;
        
        if (page === 'home') {
            showDashboardWithoutPush();
        } else if (page === 'menus') {
            showAllMenusPageWithoutPush();
        } else if (page === 'history') {
            showHistoryPageWithoutPush();
        } else if (page === 'profile') {
            showProfilePageWithoutPush();
        } else if (page === 'presensi') {
            showPresensiPageWithoutPush();
        } else if (page === 'data-presensi') {
            showDataPresensiPageWithoutPush();
        }
    } else {
        const path = window.location.pathname;
        
        if (path.includes('menus')) {
            showAllMenusPageWithoutPush();
        } else if (path.includes('tasks/history')) {
            showHistoryPageWithoutPush();
        } else if (path.includes('profile')) {
            showProfilePageWithoutPush();
        } else if (path.includes('presensi') && !path.includes('data-presensi')) {
            showPresensiPageWithoutPush();
        } else if (path.includes('data-presensi')) {
            showDataPresensiPageWithoutPush();
        } else {
            showDashboardWithoutPush();
        }
    }
});

// Internal navigation functions (without pushState)
function showDashboardWithoutPush() {
    console.log('📍 Showing Dashboard (no push)');
    hideAllPages();
    if (mainDashboardContent) mainDashboardContent.style.display = 'contents';
    updatePageState('home');
}

function showAllMenusPageWithoutPush() {
    console.log('📍 Showing All Menus (no push)');
    hideAllPages();
    if (allMenusPageContent) allMenusPageContent.style.display = 'contents';
    updatePageState('menus');
    renderAllMenusCards();
}

function showHistoryPageWithoutPush() {
    console.log('📍 Showing History (no push)');
    hideAllPages();
    if (historyPageContent) historyPageContent.style.display = 'flex';
    updatePageState('history');
    
    if (typeof loadHistoryTasks === 'function') {
        loadHistoryTasks();
    }
}

function showProfilePageWithoutPush() {
    console.log('📍 Showing Profile (no push)');
    hideAllPages();
    if (profilePageContent) profilePageContent.style.display = 'flex';
    updatePageState('profile');
    
    if (typeof window.initProfilePage === 'function') {
        window.initProfilePage();
    }
}

function showPresensiPageWithoutPush() {
    console.log('📍 Showing Presensi (no push)');
    hideAllPages();
    if (presensiPageContent) presensiPageContent.style.display = 'flex';
    updatePageState('presensi');
    
    if (typeof window.initPresensiPage === 'function') {
        window.initPresensiPage();
    }
}

function showDataPresensiPageWithoutPush() {
    console.log('📍 Showing Data Presensi (no push)');
    hideAllPages();
    if (dataPresensiPageContent) dataPresensiPageContent.style.display = 'flex';
    updatePageState('data-presensi');
    
    if (typeof window.initDataPresensiPage === 'function') {
        window.initDataPresensiPage();
    }
}

// =========================================
// INITIALIZE ON PAGE LOAD
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page navigation system initialized');
    console.log('📊 Available data:', {
        BASE_URL: typeof BASE_URL !== 'undefined' ? BASE_URL : 'NOT DEFINED',
        CURRENT_PAGE: typeof CURRENT_PAGE !== 'undefined' ? CURRENT_PAGE : 'NOT DEFINED',
        ALL_MENUS_DATA: typeof ALL_MENUS_DATA !== 'undefined' ? ALL_MENUS_DATA.length + ' menus' : 'NOT DEFINED'
    });
    
    let currentPage = 'home';
    
    if (typeof CURRENT_PAGE !== 'undefined' && CURRENT_PAGE) {
        currentPage = CURRENT_PAGE;
        console.log('📍 Page from PHP:', currentPage);
    } else {
        const path = window.location.pathname;
        console.log('📍 Current path:', path);
        
        if (path.includes('menus')) {
            currentPage = 'menus';
        } else if (path.includes('tasks/history')) {
            currentPage = 'history';
        } else if (path.includes('profile')) {
            currentPage = 'profile';
        } else if (path.includes('data-presensi')) {
            currentPage = 'data-presensi';
        } else if (path.includes('presensi')) {
            currentPage = 'presensi';
        }
        console.log('📍 Page from URL:', currentPage);
    }
    
    const baseURL = getCleanBaseURL();
    
    setTimeout(() => {
        if (currentPage === 'menus') {
            console.log('🎯 Initializing MENUS page...');
            showAllMenusPageWithoutPush();
            window.history.replaceState({ page: 'menus' }, 'All Menus', `${baseURL}menus`);
        } else if (currentPage === 'history') {
            console.log('🎯 Initializing HISTORY page...');
            showHistoryPageWithoutPush();
            window.history.replaceState({ page: 'history' }, 'Task History', `${baseURL}tasks/history`);
        } else if (currentPage === 'profile') {
            console.log('🎯 Initializing PROFILE page...');
            showProfilePageWithoutPush();
            window.history.replaceState({ page: 'profile' }, 'Data Pribadi', `${baseURL}profile`);
        } else if (currentPage === 'presensi') {
            console.log('🎯 Initializing PRESENSI page...');
            showPresensiPageWithoutPush();
            window.history.replaceState({ page: 'presensi' }, 'Presensi Online', `${baseURL}presensi`);
        } else if (currentPage === 'data-presensi') {
            console.log('🎯 Initializing DATA PRESENSI page...');
            showDataPresensiPageWithoutPush();
            window.history.replaceState({ page: 'data-presensi' }, 'Data Presensi', `${baseURL}data-presensi`);
        } else {
            console.log('🎯 Initializing HOME page...');
            showDashboardWithoutPush();
            window.history.replaceState({ page: 'home' }, 'Dashboard', baseURL);
        }
        
        attachNavigationListeners();
    }, 100);
});

// =========================================
// ATTACH NAVIGATION LISTENERS
// =========================================

function attachNavigationListeners() {
    // View All Menus button
    const viewAllMenusBtn = document.getElementById('viewAllMenusBtn');
    if (viewAllMenusBtn) {
        viewAllMenusBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 View All Menus clicked');
            showAllMenusPage();
        });
    }
    
    // Back to Main button
    const backToMainBtn = document.getElementById('backToMainBtn');
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 Back to Main clicked');
            showDashboard();
        });
    }
    
    // View History link
    const viewHistoryLink = document.getElementById('viewHistoryLink');
    if (viewHistoryLink) {
        viewHistoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 View History clicked');
            showHistoryPage();
        });
    }
    
    // Back to Home buttons (generic)
    const backToHomeButtons = document.querySelectorAll('[data-navigate="home"]');
    backToHomeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('🔵 Back to Home clicked');
            showDashboard();
        });
    });
}

// =========================================
// EXPOSE FUNCTIONS GLOBALLY
// =========================================

window.showDashboard = showDashboard;
window.showAllMenusPage = showAllMenusPage;
window.showHistoryPage = showHistoryPage;
window.showProfilePage = showProfilePage;
window.showPresensiPage = showPresensiPage;
window.showDataPresensiPage = showDataPresensiPage;
window.handleMenuNavigation = handleMenuNavigation;
window.renderAllMenusCards = renderAllMenusCards;