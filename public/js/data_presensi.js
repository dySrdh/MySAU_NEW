// data_presensi.js - Data Presensi Page Logic

(function() {
    'use strict';

    let currentMonth = 'November';
    let currentYear = 2025;

    // Initialize data presensi page
    function initDataPresensiPage() {
        loadPresensiData();
        setupMonthFilter();
        setupReturnButton();
    }

    // Load presensi data into table
    function loadPresensiData() {
        const tableBody = document.getElementById('presensiTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        // Get data from localStorage
        const presensiData = getPresensiFromLocalStorage();

        if (presensiData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6" style="text-align:center;color:#999;padding:40px;">Tidak ada data presensi untuk ditampilkan</td>';
            tableBody.appendChild(row);
            return;
        }

        presensiData.forEach(data => {
            const row = document.createElement('tr');
            
            const statusClass = data.keterangan.toLowerCase().replace(' ', '-');
            
            row.innerHTML = `
                <td>${data.date}</td>
                <td>${data.jamMasuk}</td>
                <td>${data.jamPulang}</td>
                <td class="clickable" data-location="${data.lokasiMasuk}" data-time="${data.jamMasuk}" data-type="Masuk" data-date="${data.date}">
                    ${data.lokasiMasuk}
                </td>
                <td class="clickable" data-location="${data.lokasiPulang}" data-time="${data.jamPulang}" data-type="Pulang" data-date="${data.date}">
                    ${data.lokasiPulang}
                </td>
                <td><span class="status-badge ${statusClass}">${data.keterangan}</span></td>
            `;
            
            tableBody.appendChild(row);
        });

        // Add click listeners to location cells
        setupLocationClickListeners();
    }

    // Get presensi from localStorage
    function getPresensiFromLocalStorage() {
        try {
            const data = localStorage.getItem('presensiData');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading presensi data:', error);
            return [];
        }
    }

    // Setup location click listeners
    function setupLocationClickListeners() {
        const clickableCells = document.querySelectorAll('.clickable');
        
        clickableCells.forEach(cell => {
            cell.addEventListener('click', function() {
                const location = this.getAttribute('data-location');
                const time = this.getAttribute('data-time');
                const type = this.getAttribute('data-type');
                const date = this.getAttribute('data-date');

                if (location && location !== '-') {
                    showLocationDetail(date, time, type, location);
                }
            });
        });
    }

    // Show location detail modal
    function showLocationDetail(date, time, type, location) {
        const modal = document.getElementById('presensiDetailModal');
        const detailDate = document.getElementById('detailDate');
        const detailTime = document.getElementById('detailTime');
        const detailType = document.getElementById('detailType');
        const detailCoordinates = document.getElementById('detailCoordinates');

        if (!modal) return;
        
        if (detailDate) detailDate.textContent = date;
        if (detailTime) detailTime.textContent = time;
        if (detailType) detailType.textContent = `Presensi ${type}`;
        if (detailCoordinates) detailCoordinates.textContent = location;

        modal.style.display = 'flex';
    }

    // Setup month filter
    function setupMonthFilter() {
        const filterBtn = document.getElementById('dataPresensiMonthFilterButton');
        const modal = document.getElementById('dataPresensiMonthFilterModal');
        const cancelBtn = document.getElementById('cancelDataPresensiMonthFilter');
        const closeDetailBtn = document.getElementById('closePresensiDetailModal');

        // Open filter modal
        if (filterBtn && modal) {
            filterBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                updateMonthFilterDisplay();
            });
        }

        // Close filter modal
        if (cancelBtn && modal) {
            cancelBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close detail modal
        if (closeDetailBtn) {
            closeDetailBtn.addEventListener('click', () => {
                const detailModal = document.getElementById('presensiDetailModal');
                if (detailModal) detailModal.style.display = 'none';
            });
        }

        // Month selection
        if (modal) {
            const monthItems = modal.querySelectorAll('.month-item');
            monthItems.forEach(item => {
                item.addEventListener('click', function() {
                    monthItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    currentMonth = getFullMonthName(this.getAttribute('data-month'));
                    
                    if (filterBtn) {
                        const span = filterBtn.querySelector('span');
                        if (span) span.textContent = `${currentMonth} ${currentYear}`;
                    }
                    
                    modal.style.display = 'none';
                    
                    loadPresensiData();
                });
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }

        const detailModal = document.getElementById('presensiDetailModal');
        if (detailModal) {
            detailModal.addEventListener('click', (e) => {
                if (e.target === detailModal) {
                    detailModal.style.display = 'none';
                }
            });
        }
    }

    // Update month filter display
    function updateMonthFilterDisplay() {
        const modal = document.getElementById('dataPresensiMonthFilterModal');
        if (!modal) return;

        const monthItems = modal.querySelectorAll('.month-item');
        const currentShortMonth = getShortMonthName(currentMonth);

        monthItems.forEach(item => {
            if (item.getAttribute('data-month') === currentShortMonth) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Helper: Get full month name
    function getFullMonthName(shortName) {
        const months = {
            'Jan': 'January', 'Feb': 'February', 'Mar': 'March',
            'Apr': 'April', 'May': 'May', 'Jun': 'June',
            'Jul': 'July', 'Aug': 'August', 'Sep': 'September',
            'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
        };
        return months[shortName] || shortName;
    }

    // Helper: Get short month name
    function getShortMonthName(fullName) {
        const months = {
            'January': 'Jan', 'February': 'Feb', 'March': 'Mar',
            'April': 'Apr', 'May': 'May', 'June': 'Jun',
            'July': 'Jul', 'August': 'Aug', 'September': 'Sep',
            'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
        };
        return months[fullName] || fullName;
    }

    // Setup return button
    function setupReturnButton() {
        const returnBtn = document.getElementById('returnToMainFromDataPresensi');
        if (returnBtn) {
            returnBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (typeof window.showDashboard === 'function') {
                    window.showDashboard();
                } else {
                    const dataPresensiPage = document.getElementById('dataPresensiPageContent');
                    if (dataPresensiPage) dataPresensiPage.style.display = 'none';
                    
                    const mainDashboard = document.getElementById('mainDashboardContent');
                    if (mainDashboard) mainDashboard.style.display = 'contents';
                }
            });
        }
    }
    
    // --- INI BAGIAN PERBAIKANNYA ---
    
    // 1. Selalu ekspos fungsi init untuk v_home.php
    window.initDataPresensiPage = initDataPresensiPage;

    // 2. Selalu pasang listener untuk data_presensi.php (halaman mandiri)
    document.addEventListener('DOMContentLoaded', function() {
        const dataPresensiPage = document.getElementById('dataPresensiPageContent');
        
        // Cek apakah div #dataPresensiPageContent ada di halaman ini
        if (dataPresensiPage) {
            // Cek apakah kita di v_home.php (dimana div-nya 'none')
            // ATAU di data_presensi.php (dimana style-nya 'none')
            if (dataPresensiPage.style.display !== 'none') {
                 initDataPresensiPage();
            }
        }
    });

})();