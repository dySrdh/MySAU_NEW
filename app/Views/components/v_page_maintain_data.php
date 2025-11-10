<?php
// File: v_page_maintain_data.php
?>

<div id="maintainDataPageContent">
    
    <div class="page-header">
        <a href="<?= base_url('/dashboard') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
        </a>
    </div>

    <div class="maintain-data-container">

        <a href="<?= base_url('data-pekerja') ?>" class="maintain-data-card">
            <h3>Data Utama Pekerja</h3>
            <p>Menu untuk melihat list Pekerja</p>
        </a>

        <a href="<?= base_url('data-pending-pekerja') ?>" class="maintain-data-card">
            <h3>Approver Pekerja</h3>
            <p>Menu untuk Approver User</p>
        </a>

        <a href="<?= base_url('maintain-data-presensi') ?>" class="maintain-data-card">
            <h3>Data Presensi</h3>
            <p>Menu untuk maintain presensi pekerja</p>
        </a>
        <a href="<?= base_url('penghentian-pekerja') ?>" class="maintain-data-card">
            <h3>Penghentian Pekerja</h3>
            <p>Menu untuk Penghentian Pekerja (PHK)</p>
        </a>

    </div>
</div>