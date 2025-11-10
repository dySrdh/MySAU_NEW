(function() {
    'use strict';

    // Fungsi inisialisasi untuk halaman Data Pending
    function initDataPendingPage() {
        console.log("Data Pending Pekerja Page Initialized");
        
        // CATATAN:
        // Nantinya, di sinilah kamu akan menginisialisasi
        // library DataTables.js untuk membuat tabelnya
        // menjadi interaktif (search, sort, pagination).
        //
        // Contohnya akan seperti ini:
        //
        // $('#pendingWorkerTable').DataTable({
        //     "pageLength": 10,
        //     "lengthMenu": [10, 25, 50, 100]
        // });
    }

    // Menjadikan fungsi ini global
    window.initDataPendingPage = initDataPendingPage;

})();