// =======================================================
// FUNGSI UNTUK MENU DINAMIS - TOP 10 MOST USED
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('appMenuGrid');

    if (typeof ALL_MENUS_DATA !== 'undefined' && menuGrid) {
        
        // FIX 1: "Flatten" data dari Objek Kategori menjadi Array
        const flatMasterList = Object.values(ALL_MENUS_DATA).flat();
        
        const usageData = getMenuUsageData();
        const sortedMenus = sortMenusByUsage(flatMasterList, usageData);
        
        // Ini akan mengambil 10 item (jika data Anda 10) atau 6 item (jika data Anda 6)
        const top10Menus = sortedMenus.slice(0, 10);
        
        renderMenus(top10Menus, menuGrid);
        
        menuGrid.addEventListener('click', (event) => {
            const menuLink = event.target.closest('.menu-item');
            if (menuLink && menuLink.dataset.menuId) {
                if (event.button !== 0) return; 

                const menuId = parseInt(menuLink.dataset.menuId);
                const menuUrl = menuLink.dataset.menuUrl;
                
                updateMenuUsage(menuId);
                
                event.preventDefault();
                handleMenuNavigation(menuUrl);
            }
        });
    }
});

/**
 * Handle navigation untuk menu yang diklik
 */
function handleMenuNavigation(menuUrl) {
    console.log('🔵 Navigating to:', menuUrl);
    
    // --- INI PERBAIKANNYA ---
    // Logika SPA (specialPages, switch-case) telah dihapus.
    // Semua link sekarang akan di-redirect.
    
    if (menuUrl.startsWith('http://') || menuUrl.startsWith('https://')) {
         window.location.href = menuUrl;
    } else {
         // Mengarahkan browser ke halaman baru
         // Contoh: /profile, /presensi, /data-presensi
         window.location.href = BASE_URL + '/' + menuUrl;
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
    usageData = usageData.filter(id => id !== clickedId);
    usageData.unshift(clickedId);
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
    menuGrid.innerHTML = '';
    
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
    if (!Array.isArray(masterList)) {
        console.error("Data menu (masterList) bukan array!", masterList);
        return [];
    }
    const masterMap = new Map(masterList.map(menu => [menu.id.toString(), menu]));
    
    let sortedList = [];
    
    usageData.forEach(id => {
        const menu = masterMap.get(id.toString());
        if (menu) {
            sortedList.push(menu);
            masterMap.delete(id.toString());
        }
    });
    
    sortedList.push(...masterMap.values());
    
    return sortedList;
}

window.handleMenuNavigation = handleMenuNavigation;