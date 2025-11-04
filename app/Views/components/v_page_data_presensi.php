<!-- Return Link OUTSIDE main container -->
<a href="#" class="return-link" id="returnToMainFromDataPresensi">
    <i class='bx bx-chevron-left'></i> Return to Main Page
</a>

<!-- Main Container -->
<div class="data-presensi-page-container card">
    
    <!-- Header dengan Box/Card Design -->
    <div class="data-presensi-header-box">
        <div class="data-presensi-title-group">
            <i class='bx bxs-calendar-check'></i>
            <h2>List Presensi Pekerja</h2>
        </div>
        
        <div class="data-presensi-controls-group">
            <button class="btn-filter-month" id="dataPresensiMonthFilterButton">
                <span>November 2025</span> <i class='bx bxs-down-arrow'></i>
            </button>
        </div>
    </div>

    <!-- Presensi Table -->
    <div class="data-presensi-content-scroll" id="dataPresensiContentScroll">
        <div class="data-presensi-table-container">
            <table class="presensi-table">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Jam Masuk</th>
                        <th>Jam Pulang</th>
                        <th>Lokasi Masuk</th>
                        <th>Lokasi Pulang</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
                <tbody id="presensiTableBody">
                    <!-- Data will be loaded by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

</div>

<!-- Modal Filter Bulan -->
<div class="modal-backdrop" id="dataPresensiMonthFilterModal" style="display:none;">
    <div class="modal-content month-filter-modal">
        <div class="month-filter-header">
            <h3 id="dataPresensiFilterYear">2025</h3>
        </div>
        <div class="month-filter-grid">
            <span class="month-item" data-month="Jan">Jan</span>
            <span class="month-item" data-month="Feb">Feb</span>
            <span class="month-item" data-month="Mar">Mar</span>
            <span class="month-item" data-month="Apr">Apr</span>
            <span class="month-item" data-month="May">May</span>
            <span class="month-item" data-month="Jun">Jun</span>
            <span class="month-item" data-month="Jul">Jul</span>
            <span class="month-item" data-month="Aug">Aug</span>
            <span class="month-item" data-month="Sep">Sep</span>
            <span class="month-item" data-month="Oct">Oct</span>
            <span class="month-item" data-month="Nov">Nov</span>
            <span class="month-item" data-month="Dec">Dec</span>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="cancelDataPresensiMonthFilter">
                <i class='bx bx-x'></i> Cancel
            </button>
        </div>
    </div>
</div>

<!-- Modal Detail Presensi -->
<div class="modal-backdrop" id="presensiDetailModal" style="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <i class='bx bxs-map modal-icon'></i>
            <h3>Detail Lokasi Presensi</h3>
        </div>
        <div class="modal-body">
            <div class="detail-field">
                <label>Tanggal</label>
                <span id="detailDate">-</span>
            </div>
            <div class="detail-field">
                <label>Waktu</label>
                <span id="detailTime">-</span>
            </div>
            <div class="detail-field">
                <label>Jenis Presensi</label>
                <span id="detailType">-</span>
            </div>
            <div class="detail-field">
                <label>Koordinat</label>
                <span id="detailCoordinates">-</span>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" id="closePresensiDetailModal">
                <i class='bx bx-x'></i> Close
            </button>
        </div>
    </div>
</div>