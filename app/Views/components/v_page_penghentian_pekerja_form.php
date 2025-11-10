<div id="penghentianFormPageContent">
    
    <div class="page-header">
        <a href="<?= base_url('/penghentian-pekerja') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke List Penghentian
        </a>
    </div>

    <div class="profile-page-container">

        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-user-plus'></i> 
                <h2>Tambah Penghentian Pekerja</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">
            
            <form id="penghentianForm">
                
                <div class="form-section-search">
                    <label for="selectPekerja">Nama Pekerja</label>
                    <select id="selectPekerja" class="form-input">
                        <option value="">-- Pilih Pekerja --</option>
                        <?php foreach ($workers_list as $worker): ?>
                            <option value="<?= esc($worker['id']); ?>"><?= esc($worker['nama']); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <button type="button" id="btnCariPekerja" class="btn-cari">Cari</button>
                </div>

                <div class="profile-section" id="workerDetailsSection" style="display: none;">
                    <h3 class="profile-section-title">Personal Details</h3>
                    <div class="profile-grid">
                        <div class="profile-field">
                            <label>Personal Number</label>
                            <span id="detailPersonalNumber">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Nama</label>
                            <span id="detailNama">-</span>
                        </div>
                        <div class="profile-field">
                            <label>No KTP</label>
                            <span id="detailNoKTP">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Tempat, Tanggal Lahir</label>
                            <span id="detailTTL">-</span>
                        </div>
                        <div class="profile-field">
                            <label>TMT Masuk</label>
                            <span id="detailTMTMasuk">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Unit Kerja</label>
                            <span id="detailUnitKerja">-</span>
                        </div>
                        <div class="profile-field">
                            <label>Jabatan</label>
                            <span id="detailJabatan">-</span>
                        </div>
                    </div>
                </div>

                <div class="profile-section" id="terminationFormSection" style="display: none;">
                    <h3 class="profile-section-title">Detail Penghentian</h3>
                    
                    <div class="form-grid-2-col"> 
                        
                        <div class="form-field"> <label for="noSurat">No Surat Penghentian</label>
                            <input type="text" id="noSurat" class="form-input" placeholder="Masukkan No Surat Penghentian">
                        </div>
                        
                        <div class="form-field"> <label for="tanggalSurat">Tanggal Surat Penghentian</label>
                            <div class="date-input-wrapper">
                                <input type="text" id="tanggalSurat" class="form-input" placeholder="dd/mm/yyyy">
                                <i class='bx bxs-calendar'></i>
                            </div>
                        </div>

                        <div class="form-field"> <label for="alasan">Alasan Penghentian</label>
                            <select id="alasan" class="form-input">
                                <option value="">Pilih Alasan Penghentian</option>
                                <option value="pensiun">Pensiun</option>
                                <option value="habis_kontrak">Habis Kontrak (PKWT)</option>
                                <option value="resign">Mengundurkan Diri</option>
                                <option value="phk">PHK Perusahaan</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>

                        <div class="form-field"> <label for="tmtPenghentian">TMT Penghentian Penugasan</label>
                            <div class="date-input-wrapper">
                                <input type="text" id="tmtPenghentian" class="form-input" placeholder="dd/mm/yyyy">
                                <i class='bx bxs-calendar'></i>
                            </div>
                        </div>
                        
                        </div> </div>

                <div class="form-actions">
                    <button type="submit" id="btnSimpan" class="btn-simpan" style="display: none;">Simpan</button>
                </div>

            </form>

        </div> </div> </div>