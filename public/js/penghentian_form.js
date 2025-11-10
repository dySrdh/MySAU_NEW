(function() {
    'use strict';

    // Ambil elemen-elemen penting
    const selectPekerja = document.getElementById('selectPekerja');
    const btnCariPekerja = document.getElementById('btnCariPekerja');
    
    const workerDetailsSection = document.getElementById('workerDetailsSection');
    const terminationFormSection = document.getElementById('terminationFormSection');
    const btnSimpan = document.getElementById('btnSimpan');

    // Ambil elemen span untuk diisi
    const detailPersonalNumber = document.getElementById('detailPersonalNumber');
    const detailNama = document.getElementById('detailNama');
    const detailNoKTP = document.getElementById('detailNoKTP');
    const detailTTL = document.getElementById('detailTTL');
    const detailTMTMasuk = document.getElementById('detailTMTMasuk');
    const detailUnitKerja = document.getElementById('detailUnitKerja');
    const detailJabatan = document.getElementById('detailJabatan');

    // Fungsi untuk mengisi detail pekerja
    function fillWorkerDetails(details) {
        detailPersonalNumber.textContent = details.personal_number || '-';
        detailNama.textContent = details.nama || '-';
        detailNoKTP.textContent = details.no_ktp || '-';
        detailTTL.textContent = details.ttl || '-';
        detailTMTMasuk.textContent = details.tmt_masuk || '-';
        detailUnitKerja.textContent = details.unit_kerja || '-';
        detailJabatan.textContent = details.jabatan || '-';
    }

    // Fungsi untuk mereset/menyembunyikan form
    function resetForm() {
        fillWorkerDetails({}); // Kosongkan semua field
        workerDetailsSection.style.display = 'none';
        terminationFormSection.style.display = 'none';
        btnSimpan.style.display = 'none';
    }

    // Event listener untuk tombol "Cari"
    if (btnCariPekerja) {
        btnCariPekerja.addEventListener('click', function() {
            const selectedId = selectPekerja.value;

            if (!selectedId) {
                alert('Silakan pilih seorang pekerja terlebih dahulu.');
                resetForm();
                return;
            }

            // Ambil data detail dari variabel global (dari Controller)
            const workerDetails = ALL_WORKER_DETAILS[selectedId];

            if (workerDetails) {
                // Isi data dan tampilkan form
                fillWorkerDetails(workerDetails);
                workerDetailsSection.style.display = 'block';
                terminationFormSection.style.display = 'block';
                btnSimpan.style.display = 'block';
            } else {
                alert('Data detail untuk pekerja tersebut tidak ditemukan.');
                resetForm();
            }
        });
    }

    // Event listener untuk form submit
    const form = document.getElementById('penghentianForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Hentikan submit form standar
            
            // Di sini nanti kamu kumpulkan semua data form
            const formData = {
                personal_number: detailPersonalNumber.textContent,
                no_surat: document.getElementById('noSurat').value,
                tgl_surat: document.getElementById('tanggalSurat').value,
                alasan: document.getElementById('alasan').value,
                tmt_penghentian: document.getElementById('tmtPenghentian').value
            };

            console.log('Data Siap Dikirim ke API:', formData);
            alert('Data (dummy) "disimpan". Cek console untuk lihat datanya.');
            
            // (Nanti di sini kamu panggil API)
            // fetch('/api/simpan-penghentian', { method: 'POST', body: JSON.stringify(formData) })
            //   .then(...)
        });
    }

})();