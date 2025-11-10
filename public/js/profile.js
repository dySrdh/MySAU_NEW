// File: profile.js
(function() {
    'use strict';

    // Dummy data untuk profile (diperbarui)
    const profileData = {
        personalNumber: '50000067',
        fullName: 'Lee Ji-eun',
        ktpNumber: '3201234567890123',
        birthPlace: 'Seoul, 16 Mei 1993',
        gender: 'Perempuan',
        address: 'Jl. Sudirman No. 123, Jakarta Pusat',
        religion: 'Islam',
        bloodType: 'A',
        maritalStatus: 'Belum Menikah',
        phoneNumber: '+62 812-3456-7890',
        mobileNumber: '+62 812-3456-7890',
        emergencyNumber: '+62 811-2345-6789',
        role: 'Officer',
        department: 'Business & Development Department',
        // Avatar dummy online sesuai permintaan
        avatarUrl: 'https://i.pravatar.cc/150?img=48', 
        
        education: [
            {
                level: 'S1',
                school: 'Universitas Indonesia',
                status: 'Negeri',
                faculty: 'Teknik Informatika',
                gpa: '3.75',
                graduationYear: '2015'
            }
        ],
        // Data baru untuk keluarga
        family: [
            {
                relationship: 'Ayah',
                name: 'Lee Kuan Yew',
                education: 'S2',
                occupation: 'Pensiunan'
            },
            {
                relationship: 'Ibu',
                name: 'Kim Ji-won',
                education: 'SMA',
                occupation: 'Ibu Rumah Tangga'
            }
        ],
        // Data baru untuk mutasi
        mutationHistory: [
            {
                tmt: '01-01-2020',
                jobTitle: 'Junior Officer',
                unit: 'IT Department',
                letterNo: '123/HRD/MUT/2020',
                letterDate: '01-01-2020'
            },
            {
                tmt: '01-06-2023',
                jobTitle: 'Officer',
                unit: 'Business & Development Department',
                letterNo: '456/HRD/MUT/2023',
                letterDate: '01-06-2023'
            }
        ]
    };

    // Initialize profile page
    function initProfilePage() {
        // Auto scroll to top when page opens
        scrollToTop();
        
        loadProfileData();
        // setupFamilyTabs(); // <-- Dihapus
        setupReturnButton();
    }

    // Scroll to top function
    function scrollToTop() {
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }

    // Load profile data into DOM
    function loadProfileData() {
        // Profile Photo Section
        const profilePhoto = document.getElementById('profilePhoto');
        const profilePhotoName = document.getElementById('profilePhotoName');
        const profilePhotoId = document.getElementById('profilePhotoId');
        const profilePhotoRole = document.getElementById('profilePhotoRole');

        // Menggunakan avatarUrl dari profileData
        if (profilePhoto) profilePhoto.src = profileData.avatarUrl; 
        if (profilePhotoName) profilePhotoName.textContent = profileData.fullName;
        if (profilePhotoId) profilePhotoId.textContent = profileData.personalNumber;
        if (profilePhotoRole) profilePhotoRole.textContent = `${profileData.role} - ${profileData.department}`;

        // Personal Details
        document.getElementById('personalNumber').textContent = profileData.personalNumber;
        document.getElementById('fullName').textContent = profileData.fullName;
        document.getElementById('ktpNumber').textContent = profileData.ktpNumber;
        document.getElementById('birthPlace').textContent = profileData.birthPlace;
        document.getElementById('gender').textContent = profileData.gender;
        document.getElementById('address').textContent = profileData.address;
        document.getElementById('religion').textContent = profileData.religion;
        document.getElementById('bloodType').textContent = profileData.bloodType;
        document.getElementById('maritalStatus').textContent = profileData.maritalStatus;

        // Contact Details
        document.getElementById('phoneNumber').textContent = profileData.phoneNumber;
        document.getElementById('mobileNumber').textContent = profileData.mobileNumber;
        document.getElementById('emergencyNumber').textContent = profileData.emergencyNumber;

        // Load data tabel
        loadEducationData();
        loadFamilyData(); // <-- Ditambahkan
        loadMutationData(); // <-- Ditambahkan
    }

    // Load education table
    function loadEducationData() {
        const tableBody = document.getElementById('educationTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Kosongkan isi tabel

        if (profileData.education && profileData.education.length > 0) {
            profileData.education.forEach(edu => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${edu.level}</td>
                    <td>${edu.school}</td>
                    <td>${edu.status}</td>
                    <td>${edu.faculty}</td>
                    <td>${edu.gpa}</td>
                    <td>${edu.graduationYear}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6" class="no-data-text">Data Tidak Ditemukan</td></tr>';
        }
    }

    // Fungsi BARU untuk load data keluarga
    function loadFamilyData() {
        const tableBody = document.getElementById('familyTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Kosongkan isi tabel

        if (profileData.family && profileData.family.length > 0) {
            profileData.family.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.relationship}</td>
                    <td>${member.name}</td>
                    <td>${member.education}</td>
                    <td>${member.occupation}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="4" class="no-data-text">Data Tidak Ditemukan</td></tr>';
        }
    }

    // Fungsi BARU untuk load data mutasi
    function loadMutationData() {
        const tableBody = document.getElementById('mutationTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = ''; // Kosongkan isi tabel

        if (profileData.mutationHistory && profileData.mutationHistory.length > 0) {
            profileData.mutationHistory.forEach(history => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${history.tmt}</td>
                    <td>${history.jobTitle}</td>
                    <td>${history.unit}</td>
                    <td>${history.letterNo}</td>
                    <td>${history.letterDate}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="5" class="no-data-text">Data Tidak Ditemukan</td></tr>';
        }
    }

    // setupFamilyTabs(); // <-- Fungsi ini DIHAPUS

    // Setup return button
    function setupReturnButton() {
        const returnBtn = document.getElementById('returnToMainFromProfile');
        if (returnBtn) {
            returnBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (typeof window.showDashboard === 'function') {
                    window.showDashboard();
                } else {
                    const profilePage = document.getElementById('profilePageContent');
                    if (profilePage) profilePage.style.display = 'none';
                    
                    const mainDashboard = document.getElementById('mainDashboardContent');
                    if (mainDashboard) mainDashboard.style.display = 'contents';
                }
            });
        }
    }

    // Initialize when profile page is shown
    window.initProfilePage = initProfilePage;

    // Auto-initialize if profile page exists and is visible
    if (document.getElementById('profilePageContent')) {
        document.addEventListener('DOMContentLoaded', function() {
            const profilePage = document.getElementById('profilePageContent');
            if (profilePage && profilePage.style.display !== 'none') {
                initProfilePage();
            }
        });
    }

})();