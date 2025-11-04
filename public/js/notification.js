// ===========================================
// SCRIPT NOTIFIKASI (Diperbarui dengan Filter Tab)
// ===========================================

// --- Data Notifikasi Palsu ---
const DUMMY_NOTIFICATIONS = [
    {
        id: 1,
        type: 'task',
        avatar: 'https://placehold.co/40x40/E6F0FF/0D6EFD?text=LJ',
        text: '<strong>Lee Ji-eun</strong> telah mengundang Anda untuk bergabung dalam tugas <strong>Redesain Halaman Beranda MySau</strong>.',
        timestamp: '15 menit yang lalu',
        taskId: 1700000000000, // ID Asli dari Seeder
        unread: true
    },
    {
        id: 2,
        type: 'task',
        avatar: 'https://placehold.co/40x40/E6F0FF/0D6EFD?text=LJ',
        text: '<strong>Lee Ji-eun</strong> telah mengundang Anda untuk bergabung dalam tugas <strong>Redesain Website SAU Work</strong>.',
        timestamp: '30 menit yang lalu',
        taskId: 124, // ID palsu (tidak akan berfungsi)
        unread: true
    },
    {
        id: 3,
        type: 'inbox',
        avatar: 'https://placehold.co/40x40/F8F9FA/6C757D?text=SA',
        text: '<strong>System Admin</strong>: Pembaruan sistem akan dilakukan malam ini.',
        timestamp: '1 jam yang lalu',
        unread: true
    },
    {
        id: 4,
        type: 'inbox',
        avatar: 'https://placehold.co/40x40/F8F9FA/6C757D?text=KA',
        text: '<strong>Karina</strong> hari ini berulang tahun!',
        timestamp: '2 jam yang lalu',
        unread: false
    },
    {
        id: 5,
        type: 'task',
        avatar: 'https://placehold.co/40x40/E6F0FF/0D6EFD?text=LJ',
        text: '<strong>Lee Ji-eun</strong> telah menyelesaikan tugas <strong>Membuat Ikon Baru</strong>.',
        timestamp: '1 hari yang lalu',
        taskId: 125, // ID palsu (tidak akan berfungsi)
        unread: false
    }
];


document.addEventListener('DOMContentLoaded', () => {

    // --- Ambil Elemen DOM ---
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationClose = document.getElementById('notificationClose');
    const notificationList = document.getElementById('notificationList');
    const notificationEmpty = document.getElementById('notificationEmpty');
    const mainBadge = document.getElementById('notificationCount'); // Badge di lonceng
    
    // Elemen Tab
    const tabsContainer = document.querySelector('.notification-tabs');
    const allTabs = document.querySelectorAll('.notification-tab');
    const allBadge = document.getElementById('allBadge');
    const inboxBadge = document.getElementById('inboxBadge');
    const tasksBadge = document.getElementById('tasksBadge');
    
    
    // --- FUNGSI BARU: Memperbarui List Berdasarkan Filter ---
    function updateList(filter = 'all') {
        if (!notificationList) return;

        let notificationsToRender = DUMMY_NOTIFICATIONS;

        // 1. Terapkan filter
        if (filter === 'inbox') {
            notificationsToRender = DUMMY_NOTIFICATIONS.filter(n => n.type === 'inbox');
        } else if (filter === 'task') {
            notificationsToRender = DUMMY_NOTIFICATIONS.filter(n => n.type === 'task');
        }
        // 'all' akan menggunakan DUMMY_NOTIFICATIONS (default)

        // 2. Cek jika hasil filter kosong
        if (notificationsToRender.length === 0) {
            if (notificationEmpty) notificationEmpty.style.display = 'block';
            if (notificationList) notificationList.style.display = 'none';
            notificationList.innerHTML = '';
            return;
        }

        // 3. Tampilkan list & render item
        if (notificationEmpty) notificationEmpty.style.display = 'none';
        if (notificationList) notificationList.style.display = 'block';
        
        notificationList.innerHTML = ''; // Kosongkan list
        
        notificationsToRender.forEach(item => {
            const isTask = item.type === 'task';
            const unreadClass = item.unread ? 'unread' : '';
            const metaClass = isTask ? 'task-meta' : '';
            
            const taskLinkHtml = isTask ? 
                `<a href="#" class="notification-task-link" data-task-id="${item.taskId}">Task Details</a>` : '';

            const itemHtml = `
                <div class="notification-item ${unreadClass}" data-id="${item.id}">
                    <img src="${item.avatar}" alt="Avatar" class="notification-item-avatar">
                    <div class="notification-item-content">
                        <p>${item.text}</p>
                        <div class="notification-item-meta ${metaClass}">
                            <span class="notification-item-timestamp">${item.timestamp}</span>
                            ${taskLinkHtml}
                        </div>
                    </div>
                </div>
            `;
            notificationList.innerHTML += itemHtml;
        });

        // 4. Pasang listener ke link Task Details (setelah render)
        attachTaskLinkListeners();
    }


    // --- Fungsi untuk inisialisasi badge (dijalankan sekali) ---
    function initializeBadges() {
        // 1. Hitung jumlah total
        const allCount = DUMMY_NOTIFICATIONS.length;
        const inboxCount = DUMMY_NOTIFICATIONS.filter(n => n.type === 'inbox').length;
        const tasksCount = DUMMY_NOTIFICATIONS.filter(n => n.type === 'task').length;
        const unreadCount = DUMMY_NOTIFICATIONS.filter(n => n.unread).length;

        // 2. Set Badge di Lonceng (hanya unread)
        if (mainBadge) {
            if (unreadCount > 0) {
                mainBadge.textContent = unreadCount;
                mainBadge.style.display = 'flex';
            } else {
                mainBadge.style.display = 'none';
            }
        }
        
        // 3. Set Badge di Tab (total per kategori)
        if (allBadge) allBadge.textContent = allCount;
        if (inboxBadge) inboxBadge.textContent = inboxCount;
        if (tasksBadge) tasksBadge.textContent = tasksCount;
    }


    // --- Pasang Event Listener ---
    function attachTaskLinkListeners() {
        const taskLinks = document.querySelectorAll('.notification-task-link');
        taskLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const taskId = link.dataset.taskId;
                if (!taskId) return;

                if (typeof window.openTaskDetailModal === 'function') {
                    window.openTaskDetailModal(parseInt(taskId));
                    if (notificationDropdown) notificationDropdown.classList.remove('show');
                } else {
                    console.error('Fungsi window.openTaskDetailModal tidak ditemukan!');
                    alert('Error: Tidak dapat membuka detail task.');
                }
            });
        });
    }

    // --- Logika Buka/Tutup Dropdown ---
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationDropdown) notificationDropdown.classList.toggle('show');
        });
    }
    
    if (notificationClose) {
        notificationClose.addEventListener('click', () => {
            if (notificationDropdown) notificationDropdown.classList.remove('show');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });


    // --- PERBAIKAN: Tambahkan Event Listener untuk Tab ---
    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.notification-tab');
            if (!clickedTab) return; // Jangan lakukan apa-apa jika klik di luar tombol tab

            // 1. Hapus 'active' dari semua tab
            allTabs.forEach(tab => tab.classList.remove('active'));
            
            // 2. Tambahkan 'active' ke tab yang di-klik
            clickedTab.classList.add('active');

            // 3. Ambil tipe filter
            const filterType = clickedTab.dataset.tab; // 'all', 'inbox', atau 'task'

            // 4. Panggil fungsi update list dengan filter baru
            updateList(filterType);
        });
    }


    // --- Inisialisasi Saat Halaman Dimuat ---
    initializeBadges(); // Set angka di badge (dijalankan sekali)
    updateList('all');  // Tampilkan list "All" saat pertama dibuka
});

