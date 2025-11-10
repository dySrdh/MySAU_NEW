<div id="dataPekerjaFormPageContent">
    
    <div class="page-header">
        <a href="<?= base_url('/data-pekerja') ?>" class="back-link">
            <i class='bx bx-arrow-back'></i> Kembali ke List Data Pekerja
        </a>
    </div>

    <div class="profile-page-container">
        <div class="profile-header-box">
            <div class="profile-title-group">
                <i class='bx bxs-user-plus'></i> 
                <h2>Tambah Pekerja</h2>
            </div>
        </div>

        <div class="profile-content-wrapper">
            <form id="tambahPekerjaForm" novalidate>
                
                <div class="profile-section">
                    <h3 class="profile-section-title">Data Pribadi</h3>
                    <div class="form-layout-grid">
                        <div class="form-col-left">
                            <div class="form-field">
                                <label for="penr">Penr</label>
                                <input type="text" id="penr" class="form-input" value="<?= esc($new_penr); ?>" readonly>
                            </div>
                            <div class="form-field">
                                <label for="nama">Nama</label>
                                <input type="text" id="nama" class="form-input" placeholder="Nama Pekerja" required>
                                <span class="form-error-message" id="error-nama"></span>
                            </div>
                            <div class="form-field">
                                <label for="tempatLahir">Tempat Lahir</label>
                                <input type="text" id="tempatLahir" class="form-input" placeholder="Tempat Lahir">
                            </div>
                            
                            <div class="form-field">
                                <label for="tglLahir">Tanggal Lahir</label>
                                <div class="date-input-wrapper">
                                    <input type="text" id="tglLahir" class="form-input" placeholder="dd/mm/yyyy">
                                    <i class='bx bxs-calendar'></i> </div>
                            </div>
                            
                            <div class="form-field">
                                <label>Jenis Kelamin</label>
                                <div class="radio-group">
                                    <input type="radio" id="jkLaki" name="jenisKelamin" value="L" checked>
                                    <label for="jkLaki">Laki - Laki</label>
                                    <input type="radio" id="jkPerempuan" name="jenisKelamin" value="P">
                                    <label for="jkPerempuan">Perempuan</label>
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="agama">Agama</label>
                                <select id="agama" class="form-input">
                                    <option value="">-- Silahkan Pilih Agama --</option>
                                    <?php foreach ($dropdown_agama as $agama): ?>
                                        <option value="<?= esc($agama); ?>"><?= esc($agama); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-col-right">
                             <div class="form-field">
                                <label for="namaGadisIbu">Nama Gadis Ibu Kandung</label>
                                <input type="text" id="namaGadisIbu" class="form-input" placeholder="Harap untuk tidak menggunakan singkatan">
                            </div>
                            <div class="form-field">
                                <label for="noTelp">Nomor Telepon</label>
                                <input type="text" id="noTelp" class="form-input" placeholder="Nomor Telepon" maxlength="12">
                                <span class="form-error-message" id="error-noTelp"></span>
                            </div>
                            <div class="form-field">
                                <label for="noHp">Nomor Handphone</label>
                                <input type="text" id="noHp" class="form-input" placeholder="Nomor Handphone" maxlength="13">
                                <span class="form-error-message" id="error-noHp"></span>
                            </div>
                            <div class="form-field">
                                <label for="emergencyNum">Emergency Number</label>
                                <input type="text" id="emergencyNum" class="form-input" placeholder="Nomor Kontak Darurat" maxlength="13">
                                <span class="form-error-message" id="error-emergencyNum"></span>
                            </div>
                            <div class="form-field">
                                <label for="email">Alamat Email</label>
                                <input type="email" id="email" class="form-input" placeholder="Alamat Email aktif">
                                <span class="form-error-message" id="error-email"></span>
                            </div>
                            <div class="form-field">
                                <label for="statusNikah">Status Nikah</label>
                                <select id="statusNikah" class="form-input">
                                    <option value="">-- Silahkan Pilih Status --</option>
                                    <?php foreach ($dropdown_status_nikah as $status): ?>
                                        <option value="<?= esc($status); ?>"><?= esc($status); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Alamat</h3>
                    <div class="form-layout-grid">
                        <div class="form-col-left">
                            <div class="form-field">
                                <label for="alamatRumah">Alamat Rumah</label>
                                <textarea id="alamatRumah" class="form-input" rows="12"></textarea>
                            </div>
                        </div>
                        <div class="form-col-right">
                            <div class="form-field">
                                <label for="provinsi">Provinsi</label>
                                <select id="provinsi" class="form-input">
                                    <option value="">Pilih Provinsi</option>
                                    <?php foreach ($dropdown_provinsi as $prov): ?>
                                        <option value="<?= esc($prov['id']); ?>"><?= esc($prov['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="kota">Kota</label>
                                <select id="kota" class="form-input">
                                    <option value="">Pilih Kota</option>
                                    <?php foreach ($dropdown_kota as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="kecamatan">Kecamatan</label>
                                <select id="kecamatan" class="form-input">
                                    <option value="">Pilih Kecamatan</option>
                                    <?php foreach ($dropdown_kecamatan as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="desa">Desa / Desa</label>
                                <select id="desa" class="form-input">
                                    <option value="">Pilih Desa/Kelurahan</option>
                                    <?php foreach ($dropdown_desa as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label>RT / RW</label>
                                <div class="form-field-group">
                                    <input type="text" id="rt" class="form-input" placeholder="RT" maxlength="3">
                                    <span>/</span>
                                    <input type="text" id="rw" class="form-input" placeholder="RW" maxlength="3">
                                </div>
                                <span class="form-error-message" id="error-rt"></span>
                                <span class="form-error-message" id="error-rw"></span>
                            </div>
                            <div class="form-field">
                                <label for="kodePos">Kode POS</label>
                                <input type="text" id="kodePos" class="form-input" placeholder="Kode POS" maxlength="5">
                                <span class="form-error-message" id="error-kodePos"></span>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Nomor Identitas</h3>
                    <div class="form-layout-grid">
                        <div class="form-col-left">
                            <div class="form-field">
                                <label for="noKTP">No KTP</label>
                                <input type="text" id="noKTP" class="form-input" placeholder="Nomor KTP" maxlength="16">
                                <span class="form-error-message" id="error-noKTP"></span>
                            </div>
                            <div class="form-field">
                                <label for="noRekening">No Rekening</label>
                                <input type="text" id="noRekening" class="form-input" placeholder="Nomor Rekening" maxlength="15">
                                <span class="form-error-message" id="error-noRekening"></span>
                            </div>
                            <div class="form-field">
                                <label for="noNPWP">No NPWP</label>
                                <input type="text" id="noNPWP" class="form-input" placeholder="Nomor NPWP 16 Digit" maxlength="16">
                                <span class="form-error-message" id="error-noNPWP"></span>
                            </div>
                        </div>
                        <div class="form-col-right">
                        </div>
                    </div> 
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Pendidikan</h3>
                    <div class="form-layout-grid">
                        <div class="form-col-left">
                            <div class="form-field">
                                <label for="startDate">Start Date</label>
                                <div class="date-input-wrapper">
                                    <input type="text" id="startDate" class="form-input" placeholder="Tanggal Masuk">
                                    <i class='bx bxs-calendar'></i>
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="tingkatPendidikan">Tingkat Pendidikan *</label>
                                <select id="tingkatPendidikan" class="form-input">
                                    <option value="">-- Silahkan Pilih Tingkat Pendidikan --</option>
                                    <?php foreach ($dropdown_pendidikan as $pend): ?>
                                        <option value="<?= esc($pend); ?>"><?= esc($pend); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="jurusan">Jurusan *</label>
                                <select id="jurusan" class="form-input">
                                    <option value="">Pilih Jurusan</option>
                                    <?php foreach ($dropdown_jurusan as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="ipk">IPK *</label>
                                <input type="text" id="ipk" class="form-input" placeholder="Contoh: 3.75" maxlength="4">
                                <span class="form-error-message" id="error-ipk"></span>
                            </div>
                        </div>
                        <div class="form-col-right">
                             <div class="form-field">
                                <label for="endDate">End Date</label>
                                <div class="date-input-wrapper">
                                    <input type="text" id="endDate" class="form-input" placeholder="Tanggal Lulus">
                                    <i class='bx bxs-calendar'></i>
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="namaSekolah">Nama Sekolah *</label>
                                <select id="namaSekolah" class="form-input">
                                    <option value="">Pilih Sekolah</option>
                                    <?php foreach ($dropdown_sekolah as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="tahunLulus">Tahun Lulus *</label>
                                <input type="text" id="tahunLulus" class="form-input" placeholder="Contoh: 2025" maxlength="4">
                                <span class="form-error-message" id="error-tahunLulus"></span>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="profile-section">
                    <h3 class="profile-section-title">Penugasan Kerja</h3>
                    <div class="form-layout-grid">
                        <div class="form-col-left">
                            <div class="form-field">
                                <label for="tmtMasuk">TMT Masuk</label>
                                <div class="date-input-wrapper">
                                    <input type="text" id="tmtMasuk" class="form-input" placeholder="TMT Masuk">
                                    <i class='bx bxs-calendar'></i>
                                </div>
                            </div>
                            <div class="form-field">
                                <label for="tmtPT">TMT PT</label>
                                <div class="date-input-wrapper">
                                    <input type="text" id="tmtPT" class="form-input" placeholder="TMT PT">
                                    <i class='bx bxs-calendar'></i>
                                </div>
                            </div>
                             <div class="form-field">
                                <label for="tmtPensiun">TMT Pensiun</label>
                                <input type="text" id="tmtPensiun" class="form-input" value="9999-12-31" readonly>
                            </div>
                        </div>
                        <div class="form-col-right">
                             <div class="form-field">
                                <label for="region">Region</label>
                                <select id="region" class="form-input">
                                    <option value="">Pilih Regional Penempatan</option>
                                    <?php foreach ($dropdown_region as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="unitKerja">Unit Kerja</label>
                                <select id="unitKerja" class="form-input">
                                    <option value="">Pilih Unit Kerja Penempatan</option>
                                    <?php foreach ($dropdown_unit_kerja as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="divisi">Divisi / Team</label>
                                <select id="divisi" class="form-input">
                                    <option value="">Pilih Divisi/Team Penempatan</option>
                                    <?php foreach ($dropdown_divisi as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="form-field">
                                <label for="jabatan">Jabatan</label>
                                <select id="jabatan" class="form-input">
                                    <option value="">Pilih Jabatan Penempatan</option>
                                    <?php foreach ($dropdown_jabatan as $item): ?>
                                        <option value="<?= esc($item['id']); ?>"><?= esc($item['nama']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div> 
                </div>

                <div class="form-actions">
                    <button type="submit" id="btnSimpan" class="btn-simpan">Simpan</button>
                </div>
            </form>
        </div> 
    </div> 
</div>