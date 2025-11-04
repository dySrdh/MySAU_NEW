// presensi.js - Presensi Online Page Logic

(function() {
    'use strict';

    let cameraStream = null;
    let capturedImageData = null;
    let currentLocation = null;

    // Initialize presensi page
    function initPresensiPage() {
        // Auto scroll to top when page opens
        scrollToTop();
        
        updateDateTime();
        setupCameraControls();
        setupLocationCapture();
        setupPresensiTypeSelect();
        setupSubmitButton();
        setupReturnButton();
        setupSuccessModal();

        // Update datetime every second
        setInterval(updateDateTime, 1000);
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
            behavior: 'instant'
        });
    }

    // Update current date and time
    function updateDateTime() {
        const now = new Date();
        const options = { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const formatted = now.toLocaleDateString('id-ID', options);
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = formatted;
        }
    }

    // Setup camera controls
    function setupCameraControls() {
        const activateBtn = document.getElementById('activateCameraBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');
        const cameraOverlay = document.getElementById('cameraOverlay');

        if (activateBtn) {
            activateBtn.addEventListener('click', activateCamera);
        }
        
        if (retakeBtn) {
            // Ensure retake button has hidden class initially
            retakeBtn.classList.add('hidden-button');
            retakeBtn.addEventListener('click', retakePhoto);
        }
        
        if (cameraOverlay) {
            cameraOverlay.addEventListener('click', activateCamera);
        }
    }

    // Activate camera
    async function activateCamera() {
        const video = document.getElementById('cameraVideo');
        const overlay = document.getElementById('cameraOverlay');
        const activateBtn = document.getElementById('activateCameraBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');

        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });

            video.srcObject = cameraStream;
            overlay.classList.add('hidden');
            
            // Change button to "Ambil Foto"
            activateBtn.innerHTML = '<i class="bx bx-camera"></i> Ambil Foto';
            activateBtn.onclick = capturePhoto;
            activateBtn.classList.remove('hidden-button');
            
            // Make sure retake button is hidden when camera is active
            if (retakeBtn) {
                retakeBtn.classList.add('hidden-button');
            }

        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.');
        }
    }

    // Capture photo from camera
    function capturePhoto() {
        const video = document.getElementById('cameraVideo');
        const canvas = document.getElementById('cameraCanvas');
        const capturedImage = document.getElementById('capturedImage');
        const activateBtn = document.getElementById('activateCameraBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');

        if (!video || !canvas || !capturedImage) {
            console.error('Missing required elements for photo capture');
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        capturedImageData = canvas.toDataURL('image/jpeg');
        capturedImage.src = capturedImageData;
        capturedImage.style.display = 'block';
        video.style.display = 'none';

        // Stop camera stream
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }

        // Update button visibility using classes
        if (activateBtn) {
            activateBtn.classList.add('hidden-button');
            console.log('Activate button hidden');
        }
        
        if (retakeBtn) {
            retakeBtn.classList.remove('hidden-button');
            console.log('Retake button shown');
        }

        checkFormValidity();
    }

    // Retake photo
    function retakePhoto() {
        console.log('Retake photo clicked');
        
        const video = document.getElementById('cameraVideo');
        const capturedImage = document.getElementById('capturedImage');
        const activateBtn = document.getElementById('activateCameraBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');

        video.style.display = 'block';
        capturedImage.style.display = 'none';
        capturedImageData = null;

        // Show activate button, hide retake button using classes
        if (activateBtn) {
            activateBtn.classList.remove('hidden-button');
        }
        if (retakeBtn) {
            retakeBtn.classList.add('hidden-button');
        }

        // Re-activate camera
        activateCamera();
        checkFormValidity();
    }

    // Setup location capture
    function setupLocationCapture() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    currentLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    
                    const latInput = document.getElementById('latitudeInput');
                    const lonInput = document.getElementById('longitudeInput');
                    
                    if (latInput) latInput.value = currentLocation.latitude.toFixed(6);
                    if (lonInput) lonInput.value = currentLocation.longitude.toFixed(6);
                    
                    checkFormValidity();
                },
                (error) => {
                    console.error('Error getting location:', error);
                    
                    // For simulation, use dummy coordinates
                    currentLocation = {
                        latitude: -6.2088,
                        longitude: 106.8456
                    };
                    
                    const latInput = document.getElementById('latitudeInput');
                    const lonInput = document.getElementById('longitudeInput');
                    
                    if (latInput) latInput.value = currentLocation.latitude;
                    if (lonInput) lonInput.value = currentLocation.longitude;
                }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser ini.');
        }
    }

    // Setup presensi type select
    function setupPresensiTypeSelect() {
        const select = document.getElementById('presensiTypeSelect');
        if (select) {
            select.addEventListener('change', checkFormValidity);
        }
    }

    // Check if form is valid
    function checkFormValidity() {
        const submitBtn = document.getElementById('submitPresensiBtn');
        const typeSelect = document.getElementById('presensiTypeSelect');
        
        if (!submitBtn || !typeSelect) return;
        
        const hasImage = capturedImageData !== null;
        const hasLocation = currentLocation !== null;
        const hasType = typeSelect.value !== '';

        submitBtn.disabled = !(hasImage && hasLocation && hasType);
    }

    // Setup submit button
    function setupSubmitButton() {
        const submitBtn = document.getElementById('submitPresensiBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', submitPresensi);
        }
    }

    // Submit presensi
    function submitPresensi() {
        const typeSelect = document.getElementById('presensiTypeSelect');
        if (!typeSelect) return;
        
        const presensiType = typeSelect.value;
        const now = new Date();

        // Format data untuk disimpan
        const presensiRecord = {
            id: Date.now(), // unique ID
            date: formatDateIndonesian(now),
            jamMasuk: presensiType === 'masuk' ? formatTime(now) : '-',
            jamPulang: presensiType === 'pulang' ? formatTime(now) : '-',
            lokasiMasuk: presensiType === 'masuk' ? `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}` : '-',
            lokasiPulang: presensiType === 'pulang' ? `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}` : '-',
            keterangan: 'Hadir',
            timestamp: now.getTime(),
            foto: capturedImageData // Simpan foto untuk keperluan future
        };

        // Simpan ke localStorage
        savePresensiToLocalStorage(presensiRecord);

        // Show success modal
        showSuccessModal(presensiType, now);

        // Reset form after short delay
        setTimeout(resetForm, 2000);
    }

    // Helper: Format date in Indonesian
    function formatDateIndonesian(date) {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        
        const dayName = days[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayName}, ${day} ${month} ${year}`;
    }

    // Helper: Format time
    function formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Save presensi to localStorage
    function savePresensiToLocalStorage(record) {
        try {
            // Get existing data
            let presensiData = JSON.parse(localStorage.getItem('presensiData') || '[]');
            
            // Check if there's already a record for today
            const todayDate = record.date;
            const existingIndex = presensiData.findIndex(item => item.date === todayDate);
            
            if (existingIndex !== -1) {
                // Update existing record
                if (record.jamMasuk !== '-') {
                    presensiData[existingIndex].jamMasuk = record.jamMasuk;
                    presensiData[existingIndex].lokasiMasuk = record.lokasiMasuk;
                }
                if (record.jamPulang !== '-') {
                    presensiData[existingIndex].jamPulang = record.jamPulang;
                    presensiData[existingIndex].lokasiPulang = record.lokasiPulang;
                }
            } else {
                // Add new record
                presensiData.unshift(record); // Add to beginning of array
            }
            
            // Save back to localStorage
            localStorage.setItem('presensiData', JSON.stringify(presensiData));
            
            console.log('Presensi saved successfully:', record);
        } catch (error) {
            console.error('Error saving presensi:', error);
        }
    }

    // Show success modal
    function showSuccessModal(type, time) {
        const modal = document.getElementById('presensiSuccessModal');
        const successTime = document.getElementById('successTime');
        const successType = document.getElementById('successType');

        if (!modal || !successTime || !successType) return;

        const options = { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        successTime.textContent = time.toLocaleDateString('id-ID', options);
        successType.textContent = type === 'masuk' ? 'Presensi Masuk' : 'Presensi Pulang';

        modal.style.display = 'flex';
    }

    // Setup success modal
    function setupSuccessModal() {
        const closeBtn = document.getElementById('closeSuccessModal');
        const modal = document.getElementById('presensiSuccessModal');

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    }

    // Reset form
    function resetForm() {
        const video = document.getElementById('cameraVideo');
        const capturedImage = document.getElementById('capturedImage');
        const overlay = document.getElementById('cameraOverlay');
        const activateBtn = document.getElementById('activateCameraBtn');
        const retakeBtn = document.getElementById('retakePhotoBtn');
        const typeSelect = document.getElementById('presensiTypeSelect');

        if (video) video.style.display = 'block';
        if (capturedImage) capturedImage.style.display = 'none';
        if (overlay) overlay.classList.remove('hidden');
        capturedImageData = null;

        if (activateBtn) {
            activateBtn.innerHTML = '<i class="bx bx-camera"></i> Aktifkan Kamera';
            activateBtn.onclick = activateCamera;
            activateBtn.classList.remove('hidden-button');
        }
        
        if (retakeBtn) {
            retakeBtn.classList.add('hidden-button');
        }

        if (typeSelect) typeSelect.value = '';
        checkFormValidity();
    }

    // Setup return button
    function setupReturnButton() {
        const returnBtn = document.getElementById('returnToMainFromPresensi');
        if (returnBtn) {
            returnBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Stop camera if running
                if (cameraStream) {
                    cameraStream.getTracks().forEach(track => track.stop());
                    cameraStream = null;
                }

                // Use global showDashboard function from menu_pages.js
                if (typeof window.showDashboard === 'function') {
                    window.showDashboard();
                } else {
                    // Fallback
                    const presensiPage = document.getElementById('presensiPageContent');
                    if (presensiPage) presensiPage.style.display = 'none';
                    
                    const mainDashboard = document.getElementById('mainDashboardContent');
                    if (mainDashboard) mainDashboard.style.display = 'contents';
                }

                // Reset form
                resetForm();
            });
        }
    }

    // Initialize when presensi page is shown
    window.initPresensiPage = initPresensiPage;

    // Auto-initialize if presensi page exists on load
    if (document.getElementById('presensiPageContent')) {
        document.addEventListener('DOMContentLoaded', function() {
            const presensiPage = document.getElementById('presensiPageContent');
            if (presensiPage && presensiPage.style.display !== 'none') {
                initPresensiPage();
            }
        });
    }

})();