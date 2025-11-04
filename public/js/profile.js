
(function() {
    'use strict';

    // Dummy data untuk profile
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
        avatarUrl: 'images/avatar.jpg',
        education: [
            {
                level: 'S1',
                school: 'Universitas Indonesia',
                status: 'Negeri',
                faculty: 'Teknik Informatika',
                gpa: '3.75',
                graduationYear: '2015'
            }
        ]
    };

    // Initialize profile page
    function initProfilePage() {
        // Auto scroll to top when page opens
        scrollToTop();
        
        loadProfileData();
        setupFamilyTabs();
        setupReturnButton();
    }

    // Scroll to top function
    function scrollToTop() {
        // Scroll main container to top
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }
        
        // Also scroll window to top as fallback
        window.scrollTo({
            top: 0,
            behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate scroll
        });
    }

    // Load profile data into DOM
    function loadProfileData() {
        // Profile Photo Section
        const profilePhoto = document.getElementById('profilePhoto');
        const profilePhotoName = document.getElementById('profilePhotoName');
        const profilePhotoId = document.getElementById('profilePhotoId');
        const profilePhotoRole = document.getElementById('profilePhotoRole');

        if (profilePhoto) profilePhoto.src = profileData.avatarUrl;
        if (profilePhotoName) profilePhotoName.textContent = profileData.fullName;
        if (profilePhotoId) profilePhotoId.textContent = profileData.personalNumber;
        if (profilePhotoRole) profilePhotoRole.textContent = `${profileData.role} - ${profileData.department}`;

        // Personal Details
        const personalNumber = document.getElementById('personalNumber');
        const fullName = document.getElementById('fullName');
        const ktpNumber = document.getElementById('ktpNumber');
        const birthPlace = document.getElementById('birthPlace');
        const gender = document.getElementById('gender');
        const address = document.getElementById('address');
        const religion = document.getElementById('religion');
        const bloodType = document.getElementById('bloodType');
        const maritalStatus = document.getElementById('maritalStatus');

        if (personalNumber) personalNumber.textContent = profileData.personalNumber;
        if (fullName) fullName.textContent = profileData.fullName;
        if (ktpNumber) ktpNumber.textContent = profileData.ktpNumber;
        if (birthPlace) birthPlace.textContent = profileData.birthPlace;
        if (gender) gender.textContent = profileData.gender;
        if (address) address.textContent = profileData.address;
        if (religion) religion.textContent = profileData.religion;
        if (bloodType) bloodType.textContent = profileData.bloodType;
        if (maritalStatus) maritalStatus.textContent = profileData.maritalStatus;

        // Contact Details
        const phoneNumber = document.getElementById('phoneNumber');
        const mobileNumber = document.getElementById('mobileNumber');
        const emergencyNumber = document.getElementById('emergencyNumber');

        if (phoneNumber) phoneNumber.textContent = profileData.phoneNumber;
        if (mobileNumber) mobileNumber.textContent = profileData.mobileNumber;
        if (emergencyNumber) emergencyNumber.textContent = profileData.emergencyNumber;

        // Education
        loadEducationData();
    }

    // Load education table
    function loadEducationData() {
        const tableBody = document.getElementById('educationTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

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
    }

    // Setup family tabs
    function setupFamilyTabs() {
        const familyTabs = document.querySelectorAll('.family-tab');
        const familyContent = document.getElementById('familyContent');

        if (!familyContent) return;

        familyTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                familyTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');

                // Update content (dummy - no data)
                familyContent.innerHTML = '<p class="no-data-text">Data Tidak Ditemukan</p>';
            });
        });
    }

    // Setup return button
    function setupReturnButton() {
        const returnBtn = document.getElementById('returnToMainFromProfile');
        if (returnBtn) {
            returnBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Use global showDashboard function from menu_pages.js
                if (typeof window.showDashboard === 'function') {
                    window.showDashboard();
                } else {
                    // Fallback
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