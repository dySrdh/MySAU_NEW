<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> <!-- Perbaikan: Harusnya UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Struktur Organisasi - My SAU</title>
    
    <!-- Asumsi path ini benar -->
    <link rel="stylesheet" href="<?= base_url('css/global.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/home.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/notification.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/menu_pages.css') ?>">
    <link rel="stylesheet" href="<?= base_url('css/profile.css') ?>">
    
    <!-- FILE CSS BARU UNTUK STRUKTUR -->
    <link rel="stylesheet" href="<?= base_url('css/struktur_organisasi.css') ?>">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    
    <!-- ============================================== -->
    <!--     PERBAIKAN LAYOUT & HORIZONTAL SCROLL       -->
    <!-- ============================================== -->
    <style>
        /* Mencegah header dan container menyebabkan overflow */
        .main-header {
            width: 100%;
            padding: 0 30px;
            box-sizing: border-box; /* PENTING: agar padding tidak menambah lebar */
        }

        .main-container {
            display: grid;
            grid-template-columns: 1fr; /* Cukup 1 kolom */
            padding-left: 0;
            width: 100%; /* PENTING: batasi lebar */
            box-sizing: border-box;
            overflow-x: hidden; /* PENTING: 'menjepit' konten */
        }

        /* Konten halaman mengambil lebar penuh dari grid */
        #strukturOrganisasiPageContent {
            grid-column: 1 / -1;
            width: 100%;
            box-sizing: border-box;
            overflow-x: hidden; /* PENTING: 'menjepit' konten */
        }
        
        /* Tombol sidebar di-hide (sesuai kode Anda) */
        .header-menu-toggle {
            display: none; 
        }
    </style>
</head>
<body>

    <!-- Header Anda -->
    <?= $this->include('components/v_header') ?>

    <div class="main-container">
        
        <!-- Konten Halaman Struktur Organisasi Anda -->
        <?= $this->include('components/v_page_struktur_organisasi') ?>

    </div>

    <!-- Modal Anda -->
    <?= $this->include('components/v_modals_todo') ?>

    <!-- Variabel JS -->
    <script>
        const BASE_URL = "<?= base_url() ?>";
        const CURRENT_PAGE = "struktur-organisasi"; 
        const ALL_WORKERS_DATA = <?= json_encode($workers_json ?? []) ?>; 
    </script>
    
    <!-- Script Halaman -->
    <script src="<?= base_url('js/menu_pages.js') ?>"></script>
    <script src="<?= base_url('js/notification.js') ?>"></script>
    
    <!-- Library D3 -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3-flextree@2.1.2/build/d3-flextree.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3-org-chart@3.1.1/build/d3-org-chart.min.js"></script>
    
    <!-- SCRIPT JS BARU UNTUK STRUKTUR -->
    <script src="<?= base_url('js/struktur_organisasi.js') ?>"></script>

</body>
</html>