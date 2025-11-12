<div id="strukturOrganisasiPageContent">
    
    <!-- Tombol Kembali -->
    <div class="page-header">
        <a href="<?= base_url('/dashboard') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
        </a>
    </div>

    <!-- Kotak Putih Utama -->
    <div class="profile-page-container">

        <!-- Judul Halaman -->
        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bx-sitemap'></i>
                <h2>Struktur Organisasi</h2>
            </div>
        </div>

        <!-- Wrapper Konten (isi) -->
        <div class="profile-content-wrapper">

            <!-- Search Bar -->
            <div class="org-chart-search-bar">
                <input type="text" id="employeeSearchInput" placeholder="Cari nama karyawan...">
                <button id="employeeSearchButton" class="btn-search">
                    <i class='bx bx-search'></i> Cari
                </button>
            </div>

            <!-- Kontainer Bagan -->
            <div class="org-chart-container">
                
                <!-- 
                  Ganti <div> target
                  Library ini akan menggambar di dalam <div> ini.
                  Kita beri style height agar library-nya punya "kanvas".
                -->
                <div id="d3-chart-container" style="width:100%; height:70vh;"></div> 

            </div> <!-- Akhir .org-chart-container -->

        </div> <!-- Akhir .profile-content-wrapper -->

    </div> <!-- Akhir .profile-page-container -->

</div>