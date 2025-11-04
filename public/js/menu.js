// =======================================================
// FUNGSI UNTUK MENU DINAMIS - TOP 10 MOST USED
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('appMenuGrid');

    // --- Logika Menu Dashboard (Top 10) ---
    if (typeof ALL_MENUS_DATA !== 'undefined' && menuGrid) {
        // Ambil data urutan dari in-memory storage
        const usageData = getMenuUsageData();
        
        // Urutkan menu master (dari PHP) berdasarkan data usage
        const sortedMenus = sortMenusByUsage(ALL_MENUS_DATA, usageData);
        
        // Ambil hanya 10 menu teratas
        const top10Menus = sortedMenus.slice(0, 10);
        
        // Render menu yang sudah diurutkan (hanya 10)
        renderMenus(top10Menus, menuGrid);
        
        // Tambahkan listener untuk melacak klik menu
        menuGrid.addEventListener('click', (event) => {
            const menuLink = event.target.closest('.menu-item');
            if (menuLink && menuLink.dataset.menuId) {
                // Jangan lakukan apa-apa jika user klik kanan/tengah
                if (event.button !== 0) return; 

                const menuId = parseInt(menuLink.dataset.menuId);
                const menuUrl = menuLink.dataset.menuUrl;
                
                updateMenuUsage(menuId);
                
                // Handle navigation untuk halaman khusus
                event.preventDefault();
                handleMenuNavigation(menuUrl);
            }
        });
    }
    // --- Akhir Logika Menu Dashboard ---
});


/**
 * Handle navigation untuk menu yang diklik
 */
function handleMenuNavigation(menuUrl) {
    console.log('🔵 Navigating to:', menuUrl);
    
    // List halaman yang sudah dibuat
    const specialPages = ['profile', 'presensi', 'data-presensi', 'history'];
    
    if (specialPages.includes(menuUrl)) {
        // Use functions from menu_pages.js
        switch(menuUrl) {
            case 'profile':
                if (typeof window.showProfilePage === 'function') {
                    window.showProfilePage();
                }
                break;
            case 'presensi':
                if (typeof window.showPresensiPage === 'function') {
                    window.showPresensiPage();
                }
                break;
            case 'data-presensi':
                if (typeof window.showDataPresensiPage === 'function') {
                    window.showDataPresensiPage();
                }
                break;
            case 'history':
                if (typeof window.showHistoryPage === 'function') {
                    window.showHistoryPage();
                }
                break;
            default:
                console.warn('Page not implemented:', menuUrl);
                break;
        }
    } else {
        // For other menus, show alert
        alert(`Menu "${menuUrl}" belum tersedia`);
    }
}

/**
 * Get menu usage data from in-memory storage
 */
function getMenuUsageData() {
    if (!window.menuUsageData) {
        window.menuUsageData = [];
    }
    return window.menuUsageData;
}

/**
 * Memperbarui in-memory storage dengan ID menu yang baru diklik.
 */
function updateMenuUsage(clickedId) {
    let usageData = getMenuUsageData();
    
    // Hapus ID jika sudah ada (untuk dipindahkan ke depan)
    usageData = usageData.filter(id => id !== clickedId);
    
    // Tambahkan ID ke paling depan (paling baru)
    usageData.unshift(clickedId);
    
    // Simpan maksimal 50 menu terakhir untuk performa
    if (usageData.length > 50) {
        usageData = usageData.slice(0, 50);
    }
    
    window.menuUsageData = usageData;
}

/**
 * Me-render HTML untuk semua menu berdasarkan urutan.
 */
function renderMenus(menuData, menuGrid) {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = ''; // Kosongkan grid
    
    menuData.forEach(menu => {
        const menuHtml = `
            <a href="#" 
               class="menu-item" 
               data-menu-id="${menu.id}"
               data-menu-url="${menu.link_url}"> 
                
                <i class='${menu.icon_class}'></i>
                <span>${menu.name}</span>
            </a>
        `;
        menuGrid.insertAdjacentHTML('beforeend', menuHtml);
    });
}

/**
 * Mengatur urutan menu berdasarkan data usage.
 */
function sortMenusByUsage(masterList, usageData) {
    // Buat Peta (Map) untuk pencarian cepat berdasarkan ID
    const masterMap = new Map(masterList.map(menu => [menu.id.toString(), menu]));
    
    let sortedList = [];
    
    // 1. Tambahkan menu yang ada di usageData (sesuai urutan)
    usageData.forEach(id => {
        const menu = masterMap.get(id.toString());
        if (menu) {
            sortedList.push(menu);
            masterMap.delete(id.toString()); // Hapus dari peta agar tidak duplikat
        }
    });
    
    // 2. Tambahkan sisa menu (menu baru) yang tidak ada di usageData
    sortedList.push(...masterMap.values());
    
    return sortedList;
}

// Expose functions globally if needed
window.handleMenuNavigation = handleMenuNavigation;