<?php
// File: v_page_data_pribadi.php
// (Kosongkan atau isi dengan logika PHP yang relevan jika ada)
?>

<div id="profilePageContent">
    <div class="page-header">
        <a href="<?= base_url('/dashboard') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke Dashboard
        </a>
    </div>

    <div class="profile-page-container">
        
        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-user-detail'></i>
                <h2>Data Pribadi</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">
            
            <div class="profile-sections-container">

                <div class="profile-photo-section">
                    <div class="profile-photo-container">
                        <img id="profilePhoto" class="profile-photo" src="<?= base_url('images/avatar.jpg') ?>" alt="Profile Photo">
                    </div>
                    <div class="profile-photo-info">
                        <h3 id="profilePhotoName">Loading...</h3>
                        <p id="profilePhotoId">-</p>
                        <p id="profilePhotoRole">-</p>
                    </div>
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Data Diri</h3>
                    <div class="profile-grid">
                        <div class="profile-field">
                            <label>NIK</label>
                            <span id="personalNumber">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Nama Lengkap</label>
                            <span id="fullName">-</span>
                        </div>
                        <div class="profile-field">
                            <label>No. KTP</label>
                            <span id="ktpNumber">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Tempat, Tanggal Lahir</label>
                            <span id="birthPlace">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Jenis Kelamin</label>
                            <span id="gender">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Agama</label>
                            <span id="religion">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Golongan Darah</label>
                            <span id="bloodType">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Status Pernikahan</label>
                            <span id="maritalStatus">-</span>
                        </div>
                        <div class="profile-field full-width">
                            <label>Alamat</label>
                            <span id="address">-</span>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Kontak</h3>
                    <div class="profile-grid">
                        <div class="profile-field">
                            <label>Telepon</label>
                            <span id="phoneNumber">-</span>
                        </div>
                        <div class="profile-field">
                            <label>HP</label>
                            <span id="mobileNumber">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Kontak Darurat</label>
                            <span id="emergencyNumber">-</span>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Pendidikan</h3>
                    <div class="education-table"> 
                        <table>
                            <thead>
                                <tr>
                                    <th>Jenjang</th>
                                    <th>Nama Sekolah</th>
                                    <th>Status</th>
                                    <th>Fakultas/Jurusan</th>
                                    <th>IPK</th>
                                    <th>Tahun Lulus</th>
                                </tr>
                            </thead>
                            <tbody id="educationTableBody">
                                <tr>
                                    <td colspan="6" class="loading-text">Loading...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Keluarga</h3>
                    <div class="education-table"> 
                        <table>
                            <thead>
                                <tr>
                                    <th>Anggota Keluarga</th>
                                    <th>Nama</th>
                                    <th>Pendidikan</th>
                                    <th>Pekerjaan</th>
                                </tr>
                            </thead>
                            <tbody id="familyTableBody">
                                <tr>
                                    <td colspan="4" class="loading-text">Loading...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">History Mutasi Rotasi</h3>
                    <div class="education-table"> 
                        <table>
                            <thead>
                                <tr>
                                    <th>TMT Penugasan</th>
                                    <th>Jabatan</th>
                                    <th>Unit Kerja</th>
                                    <th>No. Surat Penugasan</th>
                                    <th>Tanggal Surat Penugasan</th>
                                </tr>
                            </thead>
                            <tbody id="mutationTableBody">
                                <tr>
                                    <td colspan="5" class="loading-text">Loading...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div> 
        </div> 
    </div> 
</div>