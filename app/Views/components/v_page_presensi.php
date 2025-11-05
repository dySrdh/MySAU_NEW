<a href="#" class="back-link" id="returnToMainFromPresensi">
    <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
</a>

<div class="presensi-page-container card">
    
    <div class="presensi-header-box">
        <div class="presensi-title-group">
            <i class='bx bxs-time'></i>
            <h2>Presensi Online</h2>
        </div>
    </div>

    <div class="presensi-content-wrapper">
        <div class="presensi-container">
            
            <div class="presensi-info-datetime-box">
                <div class="worker-info">
                    <h3 id="presensiWorkerName">Lee Ji-eun</h3>
                    <p class="worker-subtitle">Officer - Business & Development Department</p>
                </div>
                <div class="datetime-info">
                    <i class='bx bx-time-five'></i>
                    <span id="currentDateTime">03 November 2025 14:57:39</span>
                </div>
            </div>

            <div class="presensi-section">
                <label class="section-label"><i class='bx bx-camera'></i> Foto Presensi</label>
                <div class="camera-box" id="cameraBox">
                    <video id="cameraVideo" autoplay playsinline></video>
                    <canvas id="cameraCanvas" style="display: none;"></canvas>
                    <div class="camera-overlay" id="cameraOverlay">
                        <i class='bx bx-camera'></i>
                        <p>Klik untuk mengaktifkan kamera</p>
                    </div>
                    <img id="capturedImage" style="display: none;" alt="Captured">
                    
                    <button class="btn-retake-overlay hidden-button" id="retakePhotoBtn">
                        <i class='bx bx-refresh'></i>
                    </button>
                </div>
                <div class="camera-buttons">
                    <button class="btn-camera" id="activateCameraBtn">
                        <i class='bx bx-camera'></i> Aktifkan Kamera
                    </button>
                </div>
            </div>

            <div class="presensi-section">
                <label class="section-label"><i class='bx bx-map'></i> Lokasi Presensi</label>
                <div class="location-grid">
                    <div class="location-field">
                        <label>Latitude</label>
                        <input type="text" id="latitudeInput" readonly placeholder="Menunggu lokasi...">
                    </div>
                    <div class="location-field">
                        <label>Longitude</label>
                        <input type="text" id="longitudeInput" readonly placeholder="Menunggu lokasi...">
                    </div>
                </div>
            </div>

            <div class="presensi-section">
                <label class="section-label"><i class='bx bx-list-ul'></i> Jenis Presensi</label>
                <select id="presensiTypeSelect">
                    <option value="">Pilih Jenis Presensi</option>
                    <option value="masuk">Presensi Masuk</option>
                    <option value="pulang">Presensi Pulang</option>
                </select>
            </div>

            <div class="presensi-submit-section">
                <button class="btn-submit-presensi" id="submitPresensiBtn" disabled>
                    <i class='bx bx-check-circle'></i> Submit Presensi
                </button>
            </div>

        </div>
    </div>

</div>


<div class="modal-backdrop" id="presensiSuccessModal" style="display:none;">
    <div class="modal-content modal-success">
        <div class="modal-header">
            <i class='bx bx-check-circle modal-icon success-icon'></i>
            <h3>Presensi Berhasil</h3>
        </div>
        <div class="modal-body">
            <p>Presensi Anda telah berhasil tercatat pada sistem.</p>
            <div class="success-details">
                <p><strong>Waktu:</strong> <span id="successTime"></span></p>
                <p><strong>Jenis:</strong> <span id="successType"></span></p>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-primary" id="closeSuccessModal">
                <i class='bx bx-check'></i> OK
            </button>
        </div>
    </div>
</div>