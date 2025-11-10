document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===============================================
    //           INISIALISASI FLATPICKR (KALENDER)
    // ===============================================
    
    // Opsi konfigurasi umum
    const flatpickrConfig = {
        dateFormat: "d/m/Y", // Format dd/mm/yyyy
        allowInput: true,     // Memperbolehkan mengetik manual
    };
    
    // Terapkan ke semua field tanggal
    flatpickr("#tglLahir", flatpickrConfig);
    flatpickr("#startDate", flatpickrConfig);
    flatpickr("#endDate", flatpickrConfig);
    flatpickr("#tmtMasuk", flatpickrConfig);
    flatpickr("#tmtPT", flatpickrConfig);


    // ===============================================
    //           KODE VALIDASI & FORM
    // ===============================================
    const form = document.getElementById('tambahPekerjaForm');
    if (!form) {
        return;
    }

    // --- Ambil semua input & error span ---
    const inputs = {
        nama: document.getElementById('nama'),
        noTelp: document.getElementById('noTelp'),
        noHp: document.getElementById('noHp'),
        emergencyNum: document.getElementById('emergencyNum'),
        email: document.getElementById('email'),
        rt: document.getElementById('rt'),
        rw: document.getElementById('rw'),
        kodePos: document.getElementById('kodePos'),
        noKTP: document.getElementById('noKTP'),
        noRekening: document.getElementById('noRekening'),
        noNPWP: document.getElementById('noNPWP'),
        tahunLulus: document.getElementById('tahunLulus'),
        ipk: document.getElementById('ipk'),
    };

    const errorSpans = {
        nama: document.getElementById('error-nama'),
        noTelp: document.getElementById('error-noTelp'),
        noHp: document.getElementById('error-noHp'),
        emergencyNum: document.getElementById('error-emergencyNum'),
        email: document.getElementById('error-email'),
        rt: document.getElementById('error-rt'),
        rw: document.getElementById('error-rw'),
        kodePos: document.getElementById('error-kodePos'),
        noKTP: document.getElementById('error-noKTP'),
        noRekening: document.getElementById('error-noRekening'),
        noNPWP: document.getElementById('error-noNPWP'),
        tahunLulus: document.getElementById('error-tahunLulus'),
        ipk: document.getElementById('error-ipk'),
    };

    // ===============================================
    //           LOGIKA INPUT FILTER (SAAT MENGETIK)
    // ===============================================

    // Fungsi untuk memfilter HANYA ANGKA
    function filterNumericInput(event) {
        // Ganti semua karakter non-digit (selain 0-9) dengan string kosong
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

    // Fungsi untuk memfilter ANGKA dan SATU TITIK (untuk IPK)
    function filterFloatInput(event) {
        let value = event.target.value;
        // Hapus semua kecuali angka dan titik
        value = value.replace(/[^0-9.]/g, ''); 
        
        // Pastikan hanya ada satu titik
        const parts = value.split('.');
        if (parts.length > 2) {
            // Jika ada lebih dari satu titik, gabungkan kembali
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        event.target.value = value;
    }

    // Terapkan filter ke input yang relevan
    const numericFields = ['noTelp', 'noHp', 'emergencyNum', 'rt', 'rw', 'kodePos', 'noKTP', 'noRekening', 'noNPWP', 'tahunLulus'];
    numericFields.forEach(field => {
        if (inputs[field]) {
            // Gunakan event 'input' agar bekerja di mobile dan saat paste
            inputs[field].addEventListener('input', filterNumericInput);
        }
    });

    // Terapkan filter IPK
    if (inputs.ipk) {
        inputs.ipk.addEventListener('input', filterFloatInput);
    }

    // ===============================================
    //           LOGIKA VALIDASI SUBMIT (SAAT SIMPAN)
    // ===============================================

    // --- Fungsi Helper Validasi ---
    const isNumeric = (value) => /^[0-9]+$/.test(value);
    const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isLength = (value, length) => value.length === length;
    const isMinMax = (value, min, max) => value.length >= min && value.length <= max;
    const isFloat = (value) => /^[0-4](\.\d{1,2})?$/.test(value); // Untuk IPK 0.00 - 4.00

    function showError(field, message) {
        if (inputs[field]) {
            inputs[field].classList.add('is-invalid');
        }
        if (errorSpans[field]) {
            errorSpans[field].textContent = message;
        }
    }

    function clearErrors() {
        for (const field in inputs) {
            if (inputs[field]) {
                inputs[field].classList.remove('is-invalid');
            }
        }
        for (const field in errorSpans) {
            if (errorSpans[field]) {
                errorSpans[field].textContent = '';
            }
        }
    }

    // --- Fungsi Validasi Utama ---
    function validateForm() {
        clearErrors();
        let isValid = true;

        const values = {};
        for (const field in inputs) {
            if (inputs[field]) {
                values[field] = inputs[field].value.trim();
            }
        }

        // Nama
        if (!values.nama) {
            showError('nama', 'Nama wajib diisi.');
            isValid = false;
        }

        // No HP (Wajib, 10-13 digit)
        if (!values.noHp) {
            showError('noHp', 'Nomor Handphone wajib diisi.');
            isValid = false;
        } else if (!isMinMax(values.noHp, 10, 13)) {
            showError('noHp', 'Harus antara 10 s/d 13 digit.');
            isValid = false;
        }

        // Email
        if (!values.email) {
            showError('email', 'Email wajib diisi.');
            isValid = false;
        } else if (!isEmail(values.email)) {
            showError('email', 'Format email tidak valid (harus ada @).');
            isValid = false;
        }

        // No KTP (Wajib, 16 digit)
        if (!values.noKTP) {
            showError('noKTP', 'No KTP wajib diisi.');
            isValid = false;
        } else if (!isLength(values.noKTP, 16)) {
            showError('noKTP', 'Harus tepat 16 digit.');
            isValid = false;
        }

        // RT (Wajib, 3 digit)
        if (!values.rt) {
            showError('rt', 'RT wajib diisi.');
            isValid = false;
        } else if (!isLength(values.rt, 3)) {
            showError('rt', 'RT harus 3 digit angka (contoh: 001).');
            isValid = false;
        }

        // RW (Wajib, 3 digit)
        if (!values.rw) {
            showError('rw', 'RW wajib diisi.');
            isValid = false;
        } else if (!isLength(values.rw, 3)) {
            showError('rw', 'RW harus 3 digit angka (contoh: 002).');
            isValid = false;
        }

        // Kode POS (Wajib, 5 digit)
        if (!values.kodePos) {
            showError('kodePos', 'Kode POS wajib diisi.');
            isValid = false;
        } else if (!isLength(values.kodePos, 5)) {
            showError('kodePos', 'Harus 5 digit angka.');
            isValid = false;
        }
        
        // No NPWP (Wajib, 16 digit)
        if (!values.noNPWP) {
            showError('noNPWP', 'No NPWP wajib diisi.');
            isValid = false;
        } else if (!isLength(values.noNPWP, 16)) {
            showError('noNPWP', 'Harus 16 digit angka (sesuai format baru).');
            isValid = false;
        }
        
        // No Rekening (Wajib, 8-15 digit)
        if (!values.noRekening) {
            showError('noRekening', 'No Rekening wajib diisi.');
            isValid = false;
        } else if (!isMinMax(values.noRekening, 8, 15)) {
            showError('noRekening', 'Harus antara 8 s/d 15 digit.');
            isValid = false;
        }
        
        // Tahun Lulus (Wajib, 4 digit)
        if (!values.tahunLulus) {
            showError('tahunLulus', 'Tahun Lulus wajib diisi.');
            isValid = false;
        } else if (!isLength(values.tahunLulus, 4)) {
            showError('tahunLulus', 'Harus 4 digit angka (contoh: 2025).');
            isValid = false;
        }
        
        // IPK (Wajib, format 0.00 - 4.00)
        if (!values.ipk) {
            showError('ipk', 'IPK wajib diisi.');
            isValid = false;
        } else if (!isFloat(values.ipk)) {
            showError('ipk', 'Format tidak valid (contoh: 3.75). Maks 4.00.');
            isValid = false;
        }
        
        // Validasi Opsional
        if (values.noTelp && !isMinMax(values.noTelp, 8, 12)) {
             showError('noTelp', 'Jika diisi, harus angka 8-12 digit.');
             isValid = false;
        }
        
        if (values.emergencyNum && !isMinMax(values.emergencyNum, 10, 13)) {
             showError('emergencyNum', 'Jika diisi, harus angka 10-13 digit.');
             isValid = false;
        }

        return isValid;
    }

    // --- Event Listener untuk Form Submit ---
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Selalu hentikan submit

        if (validateForm()) {
            // Jika semua valid
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.penr = inputs.penr.value; // Ambil readonly field
            
            console.log('Data Siap Dikirim ke API:', data);
            alert('Validasi Berhasil! Data (dummy) "disimpan". Cek console untuk lihat datanya.');
            
            // (Nanti di sini kamu panggil API)
            // fetch('/api/tambah-pekerja', { method: 'POST', body: JSON.stringify(data) })
            //   .then(res => res.json())
            //   .then(result => {
            //       if (result.success) {
            //           window.location.href = BASE_URL + '/data-pekerja';
            //       } else {
            //           alert('Gagal menyimpan data: ' + result.message);
            //       }
            //   });

        } else {
            // Jika tidak valid
            console.log('Validasi gagal. Silakan perbaiki error.');
            const firstError = form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

});