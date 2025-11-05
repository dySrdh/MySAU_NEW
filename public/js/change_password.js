/*
  FILE: public/js/change_password.js
  PERBAIKAN: Mengganti alert() dengan notifikasi toast kustom.
*/

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Ambil Semua Elemen ---
    const form = document.getElementById('changePasswordForm');
    const submitBtn = document.getElementById('submitBtn');
    
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const reNewPasswordInput = document.getElementById('reNewPassword');

    const currentPasswordError = document.getElementById('currentPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const reNewPasswordError = document.getElementById('reNewPasswordError');

    // --- 2. Fungsi Helper (Hanya Tulisan Merah) ---
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // --- 3. Logika Toggle Ikon Mata (Password) ---
    const toggleIcons = document.querySelectorAll('.password-toggle-icon');
    toggleIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.replace('bxs-show', 'bxs-hide');
            } else {
                passwordInput.type = 'password';
                this.classList.replace('bxs-hide', 'bxs-show');
            }
        });
    });

    // --- 4. Fungsi Validasi ---
    
    // (A) Validasi Password Lama (Via Server)
    async function validateCurrentPassword() {
        const password = currentPasswordInput.value;
        if (password.length === 0) {
            clearError(currentPasswordError);
            return false;
        }
        try {
            const response = await fetch(BASE_URL + '/api/user/check-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                body: JSON.stringify({ currentPassword: password })
            });
            if (!response.ok) {
                showError(currentPasswordError, 'Tidak dapat terhubung ke server.');
                return false;
            }
            const data = await response.json();
            if (data.isValid) {
                clearError(currentPasswordError);
                return true;
            } else {
                showError(currentPasswordError, 'Password saat ini salah!');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            showError(currentPasswordError, 'Terjadi error saat validasi.');
            return false;
        }
    }

    // (B) Validasi Password Baru (Minimal 8 karakter)
    function validateNewPassword() {
        const password = newPasswordInput.value;
        if (password.length > 0 && password.length < 8) {
            showError(newPasswordError, 'Password baru minimal 8 karakter.');
            return false;
        } else {
            clearError(newPasswordError);
            if (reNewPasswordInput.value.length > 0) {
                validatePasswordMatch();
            }
            return true;
        }
    }

    // (C) Validasi Ulangi Password (Harus cocok)
    function validatePasswordMatch() {
        const newPassword = newPasswordInput.value;
        const reNewPassword = reNewPasswordInput.value;
        if (reNewPassword.length > 0 && newPassword !== reNewPassword) {
            showError(reNewPasswordError, 'Password baru tidak cocok!');
            return false;
        } else {
            clearError(reNewPasswordError);
            return true;
        }
    }

    // --- 5. Pasang Event Listeners ---

    currentPasswordInput.addEventListener('blur', validateCurrentPassword);
    newPasswordInput.addEventListener('keyup', validateNewPassword);
    reNewPasswordInput.addEventListener('blur', validatePasswordMatch);

    // --- 6. Validasi Saat Submit ---
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            const isCurrentValid = await validateCurrentPassword();
            const isNewValid = validateNewPassword();
            const isMatchValid = validatePasswordMatch();

            if (isCurrentValid && isNewValid && isMatchValid) {
                // TODO: Kirim data ke server
                showToast('Password berhasil diperbarui!'); // Notifikasi sukses
                // (Contoh: form.submit();)
            } else {
                // ▼ INI PERBAIKANNYA ▼
                showToast('Periksa kembali, masih ada yang salah!');
            }
        });
    }

    // --- 7. FUNGSI BARU UNTUK NOTIFIKASI TOAST ---
    
    let toastTimer; // Variabel untuk menyimpan timer
    
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        const toastMessage = document.getElementById('toastMessage');
        
        if (!toast || !toastMessage) return;

        // Set pesan
        toastMessage.textContent = message;

        // Hapus timer lama jika ada (mencegah bug)
        clearTimeout(toastTimer);

        // Tampilkan toast
        toast.classList.add('show');

        // Sembunyikan toast setelah 3 detik
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // 3000 milidetik = 3 detik
    }

});