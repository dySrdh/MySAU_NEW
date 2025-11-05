<div id="changePasswordPageContent">

    <a href="<?= base_url('/') ?>" class="back-link">
        <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
    </a>

    <div class="change-password-container card">
        
        <div class="change-password-header">
            <div class="change-password-title-group">
                <i class='bx bxs-key'></i>
                <h2>Ganti Password</h2>
            </div>
        </div>

        <form class="change-password-form" id="changePasswordForm">
            <div class="form-body">

                <div class="form-group">
                    <label for="currentPassword">Password Saat Ini</label>
                    <div class="password-field">
                        <input type="password" id="currentPassword" name="currentPassword" required>
                        <i class='bx bxs-show password-toggle-icon' id="toggleCurrent"></i>
                    </div>
                    <span class="error-message" id="currentPasswordError"></span>
                </div>

                <div class="form-group">
                    <label for="newPassword">Password Baru</label>
                    <div class="password-field">
                        <input type="password" id="newPassword" name="newPassword" required>
                        <i class='bx bxs-show password-toggle-icon' id="toggleNew"></i>
                    </div>
                    <span class="error-message" id="newPasswordError"></span>
                </div>

                <div class="form-group">
                    <label for="reNewPassword">Ulangi Password Baru</label>
                    <div class="password-field">
                        <input type="password" id="reNewPassword" name="reNewPassword" required>
                        <i class='bx bxs-show password-toggle-icon' id="toggleReNew"></i>
                    </div>
                    <span class="error-message" id="reNewPasswordError"></span>
                </div>
            </div>

            <div class="form-footer">
                <button type="submit" class="btn-primary" id="submitBtn">
                    <i class='bx bx-save'></i> Simpan Perubahan
                </button>
            </div>
        </form>

    </div>
    
</div>
</div> <div id="toastNotification" class="toast-notification">
    <i class='bx bxs-error-circle'></i>
    <span id="toastMessage"></span>
</div>
