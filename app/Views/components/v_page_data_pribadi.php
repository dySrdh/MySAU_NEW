<!-- Return Link OUTSIDE main container -->
<a href="#" class="return-link" id="returnToMainFromProfile">
    <i class='bx bx-chevron-left'></i> Return to Main Page
</a>

<!-- Main Container -->
<div class="profile-page-container card">
    
    <!-- Header dengan Box/Card Design -->
    <div class="profile-header-box">
        <div class="profile-title-group">
            <i class='bx bxs-user-detail'></i>
            <h2>Data Pribadi</h2>
        </div>
    </div>

    <!-- Profile Content -->
    <div class="profile-content-wrapper">
        <div class="profile-sections-container">
            
            <!-- Profile Photo Section -->
            <div class="profile-photo-section">
                <div class="profile-photo-container">
                    <img src="images/avatar.jpg" alt="Profile Photo" class="profile-photo" id="profilePhoto">
                </div>
                <div class="profile-photo-info">
                    <h3 id="profilePhotoName">Lee Ji-eun</h3>
                    <p id="profilePhotoId">50000067</p>
                    <p id="profilePhotoRole">Officer - Business & Development Department</p>
                </div>
            </div>

            <!-- Personal Details Section -->
            <div class="profile-section">
                <h3 class="profile-section-title">PERSONAL DETAILS</h3>
                <div class="profile-grid">
                    <div class="profile-field">
                        <label>Personal Number</label>
                        <span id="personalNumber">50000067</span>
                    </div>
                    <div class="profile-field">
                        <label>Nama</label>
                        <span id="fullName">Lee Ji-eun</span>
                    </div>
                    <div class="profile-field">
                        <label>No KTP</label>
                        <span id="ktpNumber">3201234567890123</span>
                    </div>
                    <div class="profile-field">
                        <label>Tempat, Tanggal Lahir</label>
                        <span id="birthPlace">Seoul, 16 Mei 1993</span>
                    </div>
                    <div class="profile-field">
                        <label>Jenis Kelamin</label>
                        <span id="gender">Perempuan</span>
                    </div>
                    <div class="profile-field">
                        <label>Alamat</label>
                        <span id="address">Jl. Sudirman No. 123, Jakarta Pusat</span>
                    </div>
                    <div class="profile-field">
                        <label>Agama</label>
                        <span id="religion">Islam</span>
                    </div>
                    <div class="profile-field">
                        <label>Golongan Darah</label>
                        <span id="bloodType">A</span>
                    </div>
                    <div class="profile-field">
                        <label>Status Pernikahan</label>
                        <span id="maritalStatus">Belum Menikah</span>
                    </div>
                </div>
            </div>

            <!-- Contact Details Section -->
            <div class="profile-section">
                <h3 class="profile-section-title">CONTACT DETAILS</h3>
                <div class="profile-grid">
                    <div class="profile-field">
                        <label>No Telepon</label>
                        <span id="phoneNumber">+62 812-3456-7890</span>
                    </div>
                    <div class="profile-field">
                        <label>No Handphone</label>
                        <span id="mobileNumber">+62 812-3456-7890</span>
                    </div>
                    <div class="profile-field">
                        <label>Emergency Number</label>
                        <span id="emergencyNumber">+62 811-2345-6789</span>
                    </div>
                </div>
            </div>

            <!-- Education Section -->
            <div class="profile-section">
                <h3 class="profile-section-title">EDUCATION</h3>
                <div class="education-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Tingkat Pendidikan</th>
                                <th>Nama Sekolah</th>
                                <th>Status Sekolah</th>
                                <th>Fakultas</th>
                                <th>Nilai/IPK</th>
                                <th>Tahun Lulus</th>
                            </tr>
                        </thead>
                        <tbody id="educationTableBody">
                            <tr>
                                <td>S1</td>
                                <td>Universitas Indonesia</td>
                                <td>Negeri</td>
                                <td>Teknik Informatika</td>
                                <td>3.75</td>
                                <td>2015</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Family Section -->
            <div class="profile-section">
                <h3 class="profile-section-title">FAMILY</h3>
                <div class="family-tabs">
                    <button class="family-tab active" data-tab="html">HTML</button>
                    <button class="family-tab" data-tab="css">CSS</button>
                    <button class="family-tab" data-tab="javascript">JavaScript</button>
                    <button class="family-tab" data-tab="php">PHP</button>
                    <button class="family-tab" data-tab="wawancara">Wawancara</button>
                    <button class="family-tab" data-tab="sack">Sack</button>
                    <button class="family-tab" data-tab="anggular">Anggular</button>
                </div>
                <div class="family-content" id="familyContent">
                    <p class="no-data-text">Data Tidak Ditemukan</p>
                </div>
            </div>

        </div>
    </div>

</div>